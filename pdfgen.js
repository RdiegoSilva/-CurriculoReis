/* Gera o PDF do currículo com TEXTO REAL (dá para selecionar e copiar).
   Lê o currículo já desenhado na tela (#page) e redesenha com jsPDF. */
(function(){
  var PW=595.28, PH=841.89, LW=820;           // A4 em pt; largura do currículo em px
  var K=PW/LW, PXH=PH/K;                      // pt por px; altura de uma página em px

  function parseColor(s){
    if(!s||s==='transparent')return null;
    var m=s.match(/rgba?\(([^)]+)\)/);
    if(m){var p=m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1};}
    m=s.match(/color\(srgb\s+([^)]+)\)/);
    if(m){var q=m[1].split(/[\s/]+/).filter(Boolean).map(parseFloat);return{r:q[0]*255,g:q[1]*255,b:q[2]*255,a:q.length>3?q[3]:1};}
    return null;
  }
  function px(v){var n=parseFloat(v);return isNaN(n)?null:n;}
  function radiusOf(cs,w,h){
    var v=cs.borderTopLeftRadius||'0px';
    var r=v.indexOf('%')>-1?Math.min(w,h)*parseFloat(v)/100:(parseFloat(v)||0);
    return Math.max(0,Math.min(r,Math.min(w,h)/2));
  }
  function fontKey(cs){
    var fam=(cs.fontFamily||'').split(',')[0].replace(/['"]/g,'').trim().toLowerCase();
    var f='helvetica';
    if(/courier|mono/.test(fam))f='courier';
    else if(/playfair|merriweather|georgia|times|garamond|serif/.test(fam)&&!/sans/.test(fam))f='times';
    var b=parseInt(cs.fontWeight,10)>=600||cs.fontWeight==='bold';
    var i=cs.fontStyle==='italic';
    return{f:f,s:b&&i?'bolditalic':b?'bold':i?'italic':'normal'};
  }
  var MAP={'●':'•','○':'o','→':'>','←':'<','✓':'v','★':'*','–':'–'};
  function clean(t){
    var out='';
    for(var ch of t){
      if(MAP[ch]!==undefined){out+=MAP[ch];continue;}
      var c=ch.codePointAt(0);
      if((c>=32&&c<=126)||(c>=160&&c<=255)||c===0x2013||c===0x2014||c===0x2018||c===0x2019||c===0x201C||c===0x201D||c===0x2022||c===0x2026||c===0x20AC||c===10)out+=ch;
      else if(c===0x00A0)out+=' ';
    }
    return out;
  }

  function collect(page){
    var ops=[],pr=page.getBoundingClientRect(),ox=pr.left,oy=pr.top;
    function rectOf(el){var r=el.getBoundingClientRect();return{x:r.left-ox,y:r.top-oy,w:r.width,h:r.height};}

    function gradientOps(cs,R,rad,out){
      var bi=cs.backgroundImage;if(!bi||bi.indexOf('gradient')<0)return false;
      var cols=(bi.match(/rgba?\([^)]*\)|color\(srgb[^)]*\)/g)||[]).map(parseColor).filter(Boolean);
      if(!cols.length)return false;
      var horizontal=true,ang=bi.match(/(-?[\d.]+)deg/);
      if(ang){var a=((parseFloat(ang[1])%360)+360)%360;horizontal=!((a<45||a>315)||(a>135&&a<225));}
      else if(/to (bottom|top)/.test(bi))horizontal=false;
      var N=40;
      for(var i=0;i<N;i++){
        var t=(i+.5)/N,p=t*(cols.length-1),k=Math.min(cols.length-2,Math.floor(p));if(cols.length===1)k=0;
        var c0=cols[k],c1=cols[Math.min(k+1,cols.length-1)],f=cols.length===1?0:p-k;
        var c={r:c0.r+(c1.r-c0.r)*f,g:c0.g+(c1.g-c0.g)*f,b:c0.b+(c1.b-c0.b)*f,a:c0.a};
        var seg=horizontal?{x:R.x+R.w*i/N,y:R.y,w:R.w/N+.6,h:R.h}:{x:R.x,y:R.y+R.h*i/N,w:R.w,h:R.h/N+.6};
        out.push({t:'rect',x:seg.x,y:seg.y,w:seg.w,h:seg.h,r:0,c:c});
      }
      return true;
    }

    function pseudo(el,cs,R,which){
      var ps=getComputedStyle(el,which);
      if(!ps||ps.display==='none'||ps.content==='none'||ps.content==='normal')return;
      var bg=parseColor(ps.backgroundColor);if(!bg||bg.a===0)return;
      var w=px(ps.width),h=px(ps.height);if(!w||!h)return;
      var x,y;
      if(ps.position==='absolute'){
        var l=px(ps.left),t=px(ps.top);if(l===null||t===null)return;
        x=R.x+l;y=R.y+t;
      }else{
        var padL=px(cs.paddingLeft)||0,bl=px(cs.borderLeftWidth)||0;
        x=R.x+bl+padL;
        var lh=px(cs.lineHeight)||(px(cs.fontSize)*1.4);
        y=cs.display==='flex'||cs.display==='inline-flex'?R.y+(R.h-h)/2:R.y+(lh-h)/2;
        if(which==='::after')return;
      }
      var op=parseFloat(ps.opacity);if(!isNaN(op)&&op<1)bg.a*=op;
      ops.push({t:'rect',x:x,y:y,w:w,h:h,r:radiusOf(ps,w,h),c:bg});
    }

    function lines(node){
      var t=node.nodeValue,range=document.createRange(),out=[],cur=null;
      for(var i=0;i<t.length;i++){
        var ch=t[i],sp=/\s/.test(ch);
        range.setStart(node,i);range.setEnd(node,i+1);
        var rs=range.getClientRects();if(!rs.length)continue;
        var rc=rs[0];
        if(sp&&!cur)continue;
        if(cur&&Math.abs(rc.top-cur.top)<Math.max(2,rc.height*.45)&&rc.left>=cur.right-2){
          cur.text+=ch;if(!sp)cur.right=rc.right;
        }else{
          if(sp)continue;
          if(cur)out.push(cur);
          cur={text:ch,left:rc.left,right:rc.right,top:rc.top,bottom:rc.bottom};
        }
      }
      if(cur)out.push(cur);
      return out;
    }

    function walk(el){
      var cs=getComputedStyle(el);
      if(cs.display==='none'||cs.visibility==='hidden'||parseFloat(cs.opacity)===0)return;
      var R=rectOf(el),tag=el.tagName;
      if(tag==='SCRIPT'||tag==='STYLE')return;
      var rad=radiusOf(cs,R.w,R.h);
      var bg=parseColor(cs.backgroundColor);
      var op=parseFloat(cs.opacity);
      if(bg&&bg.a>0){if(op<1)bg.a*=op;ops.push({t:'rect',x:R.x,y:R.y,w:R.w,h:R.h,r:rad,c:bg});}
      gradientOps(cs,R,rad,ops);
      // bordas
      var sides=[['Top',0],['Right',1],['Bottom',2],['Left',3]],bw={},bc={},uniform=true,first=null;
      sides.forEach(function(s){
        var w=px(cs['border'+s[0]+'Width'])||0,st=cs['border'+s[0]+'Style'],c=parseColor(cs['border'+s[0]+'Color']);
        if(st==='none'||st==='hidden'||!c||c.a===0)w=0;
        bw[s[0]]=w;bc[s[0]]=c;
        var key=w+'|'+(c?[c.r,c.g,c.b,c.a].join(','):'');
        if(first===null)first=key;else if(first!==key)uniform=false;
      });
      if(bw.Top>0&&uniform&&rad>0){
        ops.push({t:'stroke',x:R.x+bw.Top/2,y:R.y+bw.Top/2,w:R.w-bw.Top,h:R.h-bw.Top,r:Math.max(0,rad-bw.Top/2),lw:bw.Top,c:bc.Top});
      }else{
        if(bw.Top>0)ops.push({t:'rect',x:R.x,y:R.y,w:R.w,h:bw.Top,r:0,c:bc.Top});
        if(bw.Bottom>0)ops.push({t:'rect',x:R.x,y:R.y+R.h-bw.Bottom,w:R.w,h:bw.Bottom,r:0,c:bc.Bottom});
        if(bw.Left>0)ops.push({t:'rect',x:R.x,y:R.y,w:bw.Left,h:R.h,r:0,c:bc.Left});
        if(bw.Right>0)ops.push({t:'rect',x:R.x+R.w-bw.Right,y:R.y,w:bw.Right,h:R.h,r:0,c:bc.Right});
      }
      if(el.classList&&el.classList.contains('cv-entry'))ops.push({t:'blk',x:R.x,y:R.y,w:R.w,h:R.h});
      pseudo(el,cs,R,'::before');
      if(tag==='IMG'){
        try{
          var img=el,cw=Math.round(R.w*2),ch=Math.round(R.h*2);
          if(cw>0&&ch>0&&img.naturalWidth){
            var cv=document.createElement('canvas');cv.width=cw;cv.height=ch;
            var g=cv.getContext('2d'),rr=rad*2;
            if(rr>0){g.beginPath();if(g.roundRect)g.roundRect(0,0,cw,ch,rr);else g.rect(0,0,cw,ch);g.clip();}
            var sc=Math.max(cw/img.naturalWidth,ch/img.naturalHeight),dw=img.naturalWidth*sc,dh=img.naturalHeight*sc;
            g.drawImage(img,(cw-dw)/2,(ch-dh)/2,dw,dh);
            ops.push({t:'img',x:R.x,y:R.y,w:R.w,h:R.h,d:cv.toDataURL(rr>0?'image/png':'image/jpeg',.92),f:rr>0?'PNG':'JPEG'});
          }
        }catch(e){}
        return;
      }
      for(var n=el.firstChild;n;n=n.nextSibling){
        if(n.nodeType===1)walk(n);
        else if(n.nodeType===3&&/\S/.test(n.nodeValue)){
          var fk=fontKey(cs),col=parseColor(cs.color)||{r:0,g:0,b:0,a:1},fs=px(cs.fontSize)||14;
          var tt=cs.textTransform,ls=px(cs.letterSpacing)||0;
          lines(n).forEach(function(L){
            var s=L.text;
            if(tt==='uppercase')s=s.toUpperCase();else if(tt==='lowercase')s=s.toLowerCase();
            ops.push({t:'text',s:s,x:L.left-ox,y:L.top-oy,w:L.right-L.left,h:L.bottom-L.top,fs:fs,f:fk.f,st:fk.s,c:col,ls:ls,hd:/^H[1-6]$/.test(tag)});
          });
        }
      }
      pseudo(el,cs,R,'::after');
    }
    walk(page);
    return ops;
  }

  var MG=40; // margem (px) no topo/rodapé das páginas seguintes
  function breaks(ops){
    var blocks=ops.filter(function(o){return o.t==='text'||o.t==='img'||o.t==='blk';}),end=0;
    blocks.forEach(function(o){end=Math.max(end,o.y+o.h);});
    var b=[0],caps=[PXH-MG];
    while(b[b.length-1]+caps[caps.length-1]<end){
      var last=b[b.length-1],target=last+caps[caps.length-1];
      for(var pass=0;pass<2;pass++)blocks.forEach(function(o){
        var top=o.y,bot=o.y+o.h;
        if(top<target&&bot>target+1&&top>last+100)target=Math.min(target,top-1);
        else if(o.hd&&bot<=target&&bot>target-70&&top>last+100)target=Math.min(target,top-1);
      });
      b.push(target);caps.push(PXH-2*MG);
    }
    return {b:b,caps:caps};
  }

  async function build(name){
    var page=document.getElementById('page');
    if(!window.jspdf||!page)throw new Error('jsPDF indisponível');
    if(document.fonts&&document.fonts.ready)await document.fonts.ready;
    var saved={zoom:page.style.zoom,w:page.style.width,mw:page.style.minWidth,mh:page.style.minHeight,ma:page.style.margin,sh:page.style.boxShadow,fx:page.style.flex};
    page.style.zoom='1';page.style.width=LW+'px';page.style.minWidth=LW+'px';page.style.margin='0';page.style.boxShadow='none';page.style.flex='none';page.style.minHeight=PXH+'px';
    var ops,total,st=document.createElement('style');
    st.textContent='#page,#page *{animation:none!important;transition:none!important}';document.head.appendChild(st);
    try{
      var H=page.scrollHeight,n=Math.max(1,Math.ceil(H/PXH-.003));
      page.style.minHeight=(n*PXH)+'px';
      ops=collect(page);total=page.getBoundingClientRect().height;
    }finally{
      st.remove();
      page.style.zoom=saved.zoom;page.style.width=saved.w;page.style.minWidth=saved.mw;page.style.minHeight=saved.mh;page.style.margin=saved.ma;page.style.boxShadow=saved.sh;page.style.flex=saved.fx;
      if(window.fitZoom)window.fitZoom();
    }
    var BR=breaks(ops),bk=BR.b,pages=bk.length;
    var doc=new window.jspdf.jsPDF({unit:'pt',format:'a4',orientation:'portrait',compress:true});
    doc.setProperties({title:name||'Currículo'});
    var hasGS=!!doc.GState;
    function setAlpha(a){if(hasGS)doc.setGState(new doc.GState({opacity:Math.max(0,Math.min(1,a))}));}
    for(var p=0;p<pages;p++){
      if(p>0)doc.addPage();
      var y0=bk[p],y1=p<pages-1?bk[p+1]:y0+BR.caps[p],off=p>0?MG:0,yb=y0-off+PXH;
      (function(y0,y1,off,yb,p){
      ops.forEach(function(o){
        if(o.t==='text'){
          var base=o.y+o.h*.8;if(base<y0||base>=y1)return;
          var s=clean(o.s);if(!s.replace(/\s/g,''))return;
          doc.setFont(o.f,o.st);doc.setFontSize(o.fs*K);
          doc.setTextColor(Math.round(o.c.r),Math.round(o.c.g),Math.round(o.c.b));
          setAlpha(o.c.a);
          var tw=o.w*K,w0=doc.getTextWidth(s),n=s.length,opt={baseline:'alphabetic'};
          if(n>1){var cs=(tw-w0)/(n-1),lim=o.fs*K*.18;cs=Math.max(-lim,Math.min(lim,cs));if(Math.abs(cs)>.01)opt.charSpace=cs;}
          doc.text(s,o.x*K,(base-y0+off)*K,opt);
          return;
        }
        var top=o.y,bot=o.y+o.h;
        if(o.t==='img'){if(top<y0||top>=y1)return;setAlpha(1);doc.addImage(o.d,o.f,o.x*K,(o.y-y0+off)*K,o.w*K,o.h*K);return;}
        if(bot<=y0||top>=y1)return;
        var big=o.h>PXH*.3,reachesEnd=bot>=total-1;
        var a=(big&&p>0&&top<y0)?y0-off:Math.max(top,y0);
        var b=(big&&(bot>y1||reachesEnd))?yb:Math.min(bot,y1);
        var whole=(a===top&&b===bot);
        if(o.t==='rect'){
          setAlpha(o.c.a);doc.setFillColor(Math.round(o.c.r),Math.round(o.c.g),Math.round(o.c.b));
          if(o.r>0&&whole)doc.roundedRect(o.x*K,(a-y0+off)*K,o.w*K,(b-a)*K,o.r*K,o.r*K,'F');
          else doc.rect(o.x*K,(a-y0+off)*K,o.w*K,(b-a)*K,'F');
        }else if(o.t==='stroke'&&whole){
          setAlpha(o.c.a);doc.setDrawColor(Math.round(o.c.r),Math.round(o.c.g),Math.round(o.c.b));doc.setLineWidth(o.lw*K);
          doc.roundedRect(o.x*K,(a-y0+off)*K,o.w*K,(b-a)*K,o.r*K,o.r*K,'S');
        }
      });
      })(y0,y1,off,yb,p);
      setAlpha(1);
    }
    return doc;
  }

  window.cvBuildPdf=build;
  window.cvDownloadPdf=async function(name){
    var doc=await build(name);
    doc.save((name||'Curriculo')+'.pdf');
  };
})();
