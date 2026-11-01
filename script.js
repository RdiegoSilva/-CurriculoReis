const COLORS = ['#8a5a3b','#2f5d4f','#3a5a8a','#8a2f4f','#4a4a4a','#b8632f','#5a3a8a'];
let data = {
  nome:'', cargo:'', email:'', tel:'', cidade:'', link:'', resumo:'', foto:'', capa:'', shape:'50%', cnh:'', disp:'', sal:'', extra:'',
  exp:[], edu:[], course:[], skills:[], lang:[], project:[], social:[], ref:[],
  show:{cargo:true,email:true,tel:true,cidade:true,link:true}, theme:'c-azul', align:'', font:"'Inter',sans-serif", color:'#2f5d8a', customFonts:[]
};

function uid(){return 'id'+Math.random().toString(36).slice(2,9);}
function toggleSec(h){h.parentElement.classList.toggle('open');}

/* ---------- dynamic list helpers ---------- */
function addExp(v){
  const item = v || {id:uid(), cargo:'', empresa:'', periodo:'', desc:''};
  data.exp.push(item); renderExpForm(); render();
}
function addEdu(v){
  const item = v || {id:uid(), curso:'', instituicao:'', periodo:''};
  data.edu.push(item); renderEduForm(); render();
}
function addCourse(v){
  const item = v || {id:uid(), nome:'', instituicao:'', ano:''};
  data.course.push(item); renderCourseForm(); render();
}
function addLang(v){
  const item = v || {id:uid(), idioma:'', nivel:'Intermediário'};
  data.lang.push(item); renderLangForm(); render();
}
function addProject(v){
  const item = v || {id:uid(), nome:'', link:'', desc:''};
  data.project.push(item); renderProjectForm(); render();
}
function addSocial(v){
  const item = v || {id:uid(), label:'', url:''};
  data.social.push(item); renderSocialForm(); render();
}
function addRef(v){
  const item = v || {id:uid(), nome:'', contato:'', relacao:''};
  data.ref.push(item); renderRefForm(); render();
}
function removeItem(arrName,id){
  data[arrName] = data[arrName].filter(x=>x.id!==id);
  ({exp:renderExpForm, edu:renderEduForm, course:renderCourseForm, lang:renderLangForm,
    project:renderProjectForm, social:renderSocialForm, ref:renderRefForm})[arrName]();
  render();
}

function renderExpForm(){
  const c = document.getElementById('listExp'); c.innerHTML='';
  data.exp.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Experiência</strong><button class="btn btn-sm btn-danger" onclick="removeItem('exp','${it.id}')">remover</button></div>
      <label>Cargo</label><input type="text" value="${esc(it.cargo)}" oninput="it_(data.exp,'${it.id}','cargo',this.value)">
      <label>Empresa</label><input type="text" value="${esc(it.empresa)}" oninput="it_(data.exp,'${it.id}','empresa',this.value)">
      <label>Período</label><input type="text" placeholder="Jan 2022 – Atual" value="${esc(it.periodo)}" oninput="it_(data.exp,'${it.id}','periodo',this.value)">
      <label>Descrição</label><textarea oninput="it_(data.exp,'${it.id}','desc',this.value)">${esc(it.desc)}</textarea>`;
    c.appendChild(el);
  });
}
function renderEduForm(){
  const c = document.getElementById('listEdu'); c.innerHTML='';
  data.edu.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Formação</strong><button class="btn btn-sm btn-danger" onclick="removeItem('edu','${it.id}')">remover</button></div>
      <label>Curso / grau</label><input type="text" value="${esc(it.curso)}" oninput="it_(data.edu,'${it.id}','curso',this.value)">
      <label>Instituição</label><input type="text" value="${esc(it.instituicao)}" oninput="it_(data.edu,'${it.id}','instituicao',this.value)">
      <label>Período</label><input type="text" placeholder="2019 – 2023" value="${esc(it.periodo)}" oninput="it_(data.edu,'${it.id}','periodo',this.value)">`;
    c.appendChild(el);
  });
}
function renderCourseForm(){
  const c = document.getElementById('listCourse'); c.innerHTML='';
  data.course.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Curso</strong><button class="btn btn-sm btn-danger" onclick="removeItem('course','${it.id}')">remover</button></div>
      <label>Nome do curso</label><input type="text" value="${esc(it.nome)}" oninput="it_(data.course,'${it.id}','nome',this.value)">
      <label>Instituição</label><input type="text" value="${esc(it.instituicao)}" oninput="it_(data.course,'${it.id}','instituicao',this.value)">
      <label>Ano</label><input type="text" value="${esc(it.ano)}" oninput="it_(data.course,'${it.id}','ano',this.value)">`;
    c.appendChild(el);
  });
}
function renderLangForm(){
  const c = document.getElementById('listLang'); c.innerHTML='';
  data.lang.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Idioma</strong><button class="btn btn-sm btn-danger" onclick="removeItem('lang','${it.id}')">remover</button></div>
      <label>Idioma</label><input type="text" value="${esc(it.idioma)}" oninput="it_(data.lang,'${it.id}','idioma',this.value)">
      <label>Nível</label>
      <select onchange="it_(data.lang,'${it.id}','nivel',this.value)">
        ${['Básico','Intermediário','Avançado','Fluente','Nativo'].map(n=>`<option ${n===it.nivel?'selected':''}>${n}</option>`).join('')}
      </select>`;
    c.appendChild(el);
  });
}
function renderProjectForm(){
  const c = document.getElementById('listProject'); c.innerHTML='';
  data.project.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Projeto</strong><button class="btn btn-sm btn-danger" onclick="removeItem('project','${it.id}')">remover</button></div>
      <label>Nome do projeto</label><input type="text" value="${esc(it.nome)}" oninput="it_(data.project,'${it.id}','nome',this.value)">
      <label>Link (opcional)</label><input type="text" placeholder="github.com/..." value="${esc(it.link)}" oninput="it_(data.project,'${it.id}','link',this.value)">
      <label>Descrição</label><textarea oninput="it_(data.project,'${it.id}','desc',this.value)">${esc(it.desc)}</textarea>`;
    c.appendChild(el);
  });
}
function renderSocialForm(){
  const c = document.getElementById('listSocial'); c.innerHTML='';
  data.social.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Link</strong><button class="btn btn-sm btn-danger" onclick="removeItem('social','${it.id}')">remover</button></div>
      <label>Rótulo</label><input type="text" placeholder="Portfólio, GitHub, Instagram..." value="${esc(it.label)}" oninput="it_(data.social,'${it.id}','label',this.value)">
      <label>URL</label><input type="text" placeholder="https://..." value="${esc(it.url)}" oninput="it_(data.social,'${it.id}','url',this.value)">`;
    c.appendChild(el);
  });
}
function renderRefForm(){
  const c = document.getElementById('listRef'); c.innerHTML='';
  data.ref.forEach(it=>{
    const el = document.createElement('div'); el.className='item-card';
    el.innerHTML = `
      <div class="item-head"><strong>Referência</strong><button class="btn btn-sm btn-danger" onclick="removeItem('ref','${it.id}')">remover</button></div>
      <label>Nome</label><input type="text" value="${esc(it.nome)}" oninput="it_(data.ref,'${it.id}','nome',this.value)">
      <label>Relação</label><input type="text" placeholder="Ex-gestor, Professor..." value="${esc(it.relacao)}" oninput="it_(data.ref,'${it.id}','relacao',this.value)">
      <label>Contato</label><input type="text" placeholder="email ou telefone" value="${esc(it.contato)}" oninput="it_(data.ref,'${it.id}','contato',this.value)">`;
    c.appendChild(el);
  });
}
function it_(arr,id,key,val){ const o=arr.find(x=>x.id===id); if(o){o[key]=val; render();} }
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

/* skills as tags */
document.getElementById('skillInput').addEventListener('keydown', e=>{
  if(e.key==='Enter' && e.target.value.trim()){
    data.skills.push(e.target.value.trim()); e.target.value=''; renderSkills(); render();
  }
});
function renderSkills(){
  const c = document.getElementById('listSkills'); c.innerHTML='';
  data.skills.forEach((s,i)=>{
    const chip = document.createElement('span');
    chip.style.cssText='display:inline-flex;align-items:center;gap:6px;background:var(--bg);border:1px solid var(--line);padding:4px 9px;border-radius:14px;font-size:12px;margin:0 6px 6px 0;';
    chip.innerHTML = `${esc(s)} <b style="cursor:pointer;color:#b6432f" onclick="data.skills.splice(${i},1);renderSkills();render();">×</b>`;
    c.appendChild(chip);
  });
}

/* personal fields */
['nome','cargo','email','tel','cidade','link','resumo','cnh','disp','sal','extra'].forEach(k=>{
  document.getElementById('f_'+k).addEventListener('input', e=>{ data[k]=e.target.value; render(); });
});

/* photo */
document.getElementById('btnPhoto').onclick = ()=>document.getElementById('photoInput').click();
document.getElementById('photoInput').addEventListener('change', e=>{
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{ data.foto = ev.target.result; updatePhotoPreview(); render(); };
  reader.readAsDataURL(file);
});
function updatePhotoPreview(){
  const img = document.getElementById('photoPreview');
  if(data.foto){ img.src=data.foto; img.classList.remove('empty'); }
  else { img.removeAttribute('src'); img.classList.add('empty'); img.alt='sem foto'; }
}

/* theme / font / color / shape controls */
document.getElementById('shapeSel').onchange = e=>{ data.shape=e.target.value; render(); };
document.getElementById('themeSel').onchange = e=>{ data.theme=e.target.value; render(); };
document.getElementById('fontSel').onchange = e=>{ data.font=e.target.value; render(); };
const swatchWrap = document.getElementById('swatches');
COLORS.forEach(c=>{
  const s = document.createElement('div'); s.className='swatch'; s.style.background=c;
  s.onclick=()=>{ data.color=c; render(); pulsePage(); };
  swatchWrap.appendChild(s);
});

/* ---------- render preview ---------- */
const SHOW_DEF={cargo:true,cargoLabel:true,email:true,tel:true,cidade:true,link:true};
function roleHtml(){return data.cargo?(data.cargoLabel===false?'':'<span class="rl">Cargo desejado:</span> ')+esc(data.cargo):'';}
function render(){
  const real=data,sh=Object.assign({},SHOW_DEF,real.show||{});
  data=Object.assign({},real,{cargoLabel:sh.cargoLabel,cargo:sh.cargo?real.cargo:'',email:sh.email?real.email:'',tel:sh.tel?real.tel:'',cidade:sh.cidade?real.cidade:'',link:sh.link?real.link:''});
  try{renderInner();}finally{data=real;}
  syncUI();
}
function lvlDots(n){const k={'Básico':2,'Intermediário':3,'Avançado':4,'Fluente':5,'Nativo':5}[n]||3;return '<span class="lvl">'+[1,2,3,4,5].map(i=>'<i'+(i<=k?' class="on"':'')+'></i>').join('')+'</span>';}
function renderInner(){
  const page = document.getElementById('page');
  const T=TPL_MAP[data.theme];
  (page._v||[]).forEach(k=>page.style.removeProperty(k));page._v=[];
  if(T){page.className='page tp L-'+T.l+(T.x?' '+T.x:'');Object.entries(T.v).forEach(([k,v])=>{page.style.setProperty('--'+k,v);page._v.push('--'+k);});}
  else page.className='page theme-'+data.theme+(data.theme==='lightside'?' theme-sidebar':'');
  const layout=T?T.l:(data.theme==='sidebar'||data.theme==='lightside'?'side':data.theme==='creative'?'band':'single');
  page.classList.toggle('nophoto',!data.foto);
  if(data.align)page.classList.add('al-'+data.align);
  if(T&&layout==='side'&&(data.align==='left'||data.align==='right')){
    const w=((T.v.gtc||'250px 1fr').match(/\d+px/)||['250px'])[0],r=data.align==='right';
    page.style.setProperty('--gtc',r?'1fr '+w:w+' 1fr');page.style.setProperty('--so',r?'2':'0');page._v.push('--gtc','--so');
  }
  page.style.setProperty('--cv-font', data.font);
  page.style.setProperty('--cv-accent', data.color);
  page.style.setProperty('--cv-shape', data.shape||'50%');
  document.getElementById('photoPreview').parentElement.style.setProperty('--shape', data.shape||'50%');
  Array.from(swatchWrap.children).forEach((s,i)=> s.classList.toggle('active', COLORS[i]===data.color));

  const photoImg = data.foto ? `<img class="cv-photo" src="${data.foto}">` : '';
  const contactLines=()=>[['E-mail',data.email],['Cidade',data.cidade],['Telefone',data.tel],['Site',data.link]].filter(x=>x[1]).map(([l,v])=>`<div><b>${l}:</b> ${esc(v)}</div>`).join('');
  const contactClassic = `<div class="contact cl">${contactLines()}</div>`;

  const projectHtml = data.project.length ? data.project.map(x=>`
    <div class="cv-entry"><div class="t">${esc(x.nome)||'Projeto'}</div>
    ${x.link?`<div class="d">${esc(x.link)}</div>`:''}${x.desc?`<p>${esc(x.desc)}</p>`:''}</div>`).join('') : '';

  const socialHtml = data.social.length ? data.social.map(x=>`<a href="${esc(x.url)}" target="_blank">${esc(x.label)||esc(x.url)}</a>`).join('') : '';

  const refHtml = data.ref.length ? data.ref.map(x=>`
    <div class="cv-entry"><div class="t">${esc(x.nome)}</div>
    <div class="d">${[esc(x.relacao),esc(x.contato)].filter(Boolean).join(' · ')}</div></div>`).join('') : '';

  const expHtml = data.exp.length ? data.exp.map(x=>`
    <div class="cv-entry"><div class="t">${esc(x.cargo)||'Cargo'}${x.empresa?' — '+esc(x.empresa):''}</div>
    <div class="d">${esc(x.periodo)}</div>${x.desc?`<p>${esc(x.desc)}</p>`:''}</div>`).join('') : `<p class="empty-note">Nenhuma experiência adicionada</p>`;

  const eduHtml = data.edu.length ? data.edu.map(x=>`
    <div class="cv-entry"><div class="t">${esc(x.curso)||'Curso'}</div>
    <div class="d">${esc(x.instituicao)}${x.periodo?' · '+esc(x.periodo):''}</div></div>`).join('') : `<p class="empty-note">Nenhuma formação adicionada</p>`;

  const courseHtml = data.course.length ? data.course.map(x=>`
    <div class="cv-entry"><div class="t">${esc(x.nome)||'Curso'}</div>
    <div class="d">${esc(x.instituicao)}${x.ano?' · '+esc(x.ano):''}</div></div>`).join('') : `<p class="empty-note">Nenhum curso adicionado</p>`;

  const langHtml = data.lang.length ? data.lang.map(x=>`<div class="cv-entry lang"><span class="t">${esc(x.idioma)}</span> <span class="d">— ${esc(x.nivel)}</span>${lvlDots(x.nivel)}</div>`).join('') : '';
  const skillsHtml = data.skills.length ? `<div class="tags">${data.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div>` : '';

  let html = '';
  if(layout==='side'){
    html = `
    <div class="side">
      ${photoImg}
      <div class="cv-name">${esc(data.nome)||'Seu Nome'}</div>
      <div class="cv-role">${roleHtml()}</div>
      <h4>Contato</h4>
      <div class="contact">${contactLines()}</div>
      ${data.skills.length?`<h4>Habilidades</h4><div class="tags">${data.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div>`:''}
      ${data.lang.length?`<h4>Idiomas</h4>${langHtml}`:''}
      ${data.social.length?`<h4>Links</h4><div class="social">${socialHtml}</div>`:''}
    </div>
    <div class="main">
      ${data.resumo?`<div class="cv-sec"><h3>Resumo</h3><p style="font-size:12.5px;color:inherit;line-height:1.6">${esc(data.resumo)}</p></div>`:''}
      <div class="cv-sec tl"><h3>Experiência</h3>${expHtml}</div>
      <div class="cv-sec tl"><h3>Formação</h3>${eduHtml}</div>
      ${data.course.length?`<div class="cv-sec tl"><h3>Cursos</h3>${courseHtml}</div>`:''}
      ${data.project.length?`<div class="cv-sec tl"><h3>Projetos</h3>${projectHtml}</div>`:''}
      ${data.ref.length?`<div class="cv-sec"><h3>Referências</h3>${refHtml}</div>`:''}
    </div>`;
  } else if(layout==='band'){
    html = `
    <div class="cv-head">
      ${photoImg}
      <div>
        <div class="cv-name">${esc(data.nome)||'Seu Nome'}</div>
        <div class="cv-role">${roleHtml()}</div>
        ${contactClassic}
      </div>
    </div>
    <div class="cv-grid">
      <div class="col-left">
        ${data.skills.length?`<div class="cv-sec"><h3>Habilidades</h3><div class="tags">${data.skills.map(s=>`<span>${esc(s)}</span>`).join('')}</div></div>`:''}
        ${data.lang.length?`<div class="cv-sec"><h3>Idiomas</h3>${langHtml}</div>`:''}
        ${data.social.length?`<div class="cv-sec"><h3>Links</h3><div class="social">${socialHtml}</div></div>`:''}
        ${data.ref.length?`<div class="cv-sec"><h3>Referências</h3>${refHtml}</div>`:''}
      </div>
      <div class="col-right">
        ${data.resumo?`<div class="cv-sec"><h3>Resumo</h3><p style="font-size:12.5px;color:inherit;line-height:1.6">${esc(data.resumo)}</p></div>`:''}
        <div class="cv-sec tl"><h3>Experiência</h3>${expHtml}</div>
        <div class="cv-sec tl"><h3>Formação</h3>${eduHtml}</div>
        ${data.course.length?`<div class="cv-sec tl"><h3>Cursos</h3>${courseHtml}</div>`:''}
        ${data.project.length?`<div class="cv-sec tl"><h3>Projetos</h3>${projectHtml}</div>`:''}
      </div>
    </div>`;
  } else {
    html = `
    <div class="cv-head">
      ${photoImg}
      <div>
        <div class="cv-name">${esc(data.nome)||'Seu Nome'}</div>
        <div class="cv-role">${roleHtml()}</div>
        ${contactClassic}
      </div>
    </div>
    ${data.resumo?`<div class="cv-sec"><h3>Resumo</h3><p style="font-size:13px;color:inherit;line-height:1.6">${esc(data.resumo)}</p></div>`:''}
    <div class="cv-sec tl"><h3>Experiência profissional</h3>${expHtml}</div>
    <div class="cv-sec tl"><h3>Formação acadêmica</h3>${eduHtml}</div>
    ${data.course.length?`<div class="cv-sec tl"><h3>Cursos e certificações</h3>${courseHtml}</div>`:''}
    ${data.project.length?`<div class="cv-sec tl"><h3>Projetos</h3>${projectHtml}</div>`:''}
    ${data.skills.length?`<div class="cv-sec"><h3>Habilidades</h3>${skillsHtml}</div>`:''}
    ${data.lang.length?`<div class="cv-sec"><h3>Idiomas</h3>${langHtml}</div>`:''}
    ${data.social.length?`<div class="cv-sec"><h3>Links</h3><div class="social">${socialHtml}</div></div>`:''}
    ${data.ref.length?`<div class="cv-sec"><h3>Referências</h3>${refHtml}</div>`:''}`;
  }
  document.getElementById('page').innerHTML = html;
  syncUI();
}

/* ---------- persistence ---------- */
function save(){
  try{ localStorage.setItem('cv_data', JSON.stringify(data)); toast('Currículo salvo neste navegador ✓'); }
  catch(e){ toast('Não foi possível salvar'); }
}
function load(){
  try{
    const raw = localStorage.getItem('cv_data');
    if(raw){ data = Object.assign(data, JSON.parse(raw)); }
  }catch(e){}
}
document.getElementById('btnSave').onclick = save;
document.getElementById('btnPrint').onclick = ()=>doPrint();
document.getElementById('btnClear').onclick = ()=>{
  if(confirm('Limpar todos os dados?')){
    try{localStorage.removeItem('cv_data');}catch(e){}
    location.reload();
  }
};
document.getElementById('btnExport').onclick = ()=>{
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = (data.nome||'curriculo').replace(/\s+/g,'_')+'_backup.json';
  a.click();
};
document.getElementById('btnImport').onclick = ()=>document.getElementById('importInput').click();
document.getElementById('importInput').addEventListener('change', e=>{
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = ev=>{
    try{
      const parsed = JSON.parse(ev.target.result);
      data = Object.assign(data, parsed);
      refreshAllForms(); toast('Backup carregado ✓');
    }catch(err){ toast('Arquivo de backup inválido'); }
  };
  reader.readAsText(file);
});

function refreshAllForms(){
  if(!(TPL_MAP[data.theme]||['classic','sidebar','minimal','creative','lightside','executive','timeline','ats'].includes(data.theme))){data.theme='c-azul';data.color=TPL_MAP['c-azul'].c;}
  data.show=Object.assign({},SHOW_DEF,data.show||{});
  document.querySelectorAll('[data-show]').forEach(i=>{i.checked=!!data.show[i.dataset.show];});
  ['nome','cargo','email','tel','cidade','link','resumo','cnh','disp','sal','extra'].forEach(k=> document.getElementById('f_'+k).value = data[k]||'');
  document.getElementById('themeSel').value = data.theme;
  document.getElementById('fontSel').value = data.font;
  document.getElementById('shapeSel').value = data.shape||'50%';
  updatePhotoPreview();
  renderExpForm(); renderEduForm(); renderCourseForm(); renderLangForm(); renderSkills();
  renderProjectForm(); renderSocialForm(); renderRefForm(); renderCustomFonts();
  render();
}

/* ---------- UI extras ---------- */
function toast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(toast._t);toast._t=setTimeout(()=>t.classList.remove('show'),2200);}
function pulsePage(){const p=document.getElementById('page');p.classList.remove('pulse');void p.offsetWidth;p.classList.add('pulse');}
function syncUI(){
  updateDash();fitZoom();photoUI();contactUI();if(typeof railUI==='function')railUI();
  const on=(sel,attr,val)=>document.querySelectorAll(sel).forEach(b=>b.classList.toggle('active',b.dataset[attr]===val));
  on('[data-tpl]','tpl',data.theme);on('[data-align]','align',data.align||'');on('[data-font]','font',data.font);on('[data-shape]','shape',data.shape||'50%');
  ['exp','edu','course','project','social','ref','lang','skills'].forEach(k=>{const el=document.querySelector('.badge[data-count="'+k+'"]');if(el){const n=data[k].length;el.textContent=n;el.classList.toggle('on',n>0);}});
  const chk=[data.nome,data.cargo,data.email,data.tel,data.cidade,data.resumo,data.foto,data.exp.length,data.edu.length,data.skills.length];
  const pct=Math.round(chk.filter(Boolean).length/chk.length*100);
  document.getElementById('progFill').style.width=pct+'%';document.getElementById('progTxt').textContent=pct+'% completo';
  document.documentElement.style.setProperty('--tc',data.color);
  document.querySelectorAll('.swatch').forEach((s,i)=>s.classList.toggle('active',COLORS[i]===data.color));
  document.getElementById('colorPick').value=data.color;
}
const BLEED={hm:'-46px -50px 24px',hp:'36px 50px 26px',nc:'#fff',rc:'rgba(255,255,255,.85)'};
const CEN={hd:'column',ha:'center',hj:'center'};
const DK={pbg:'#14171f',tx:'#d9dce6',mu:'#8b93a7',tgbg:'rgba(255,255,255,.1)',h3bd:'1px solid rgba(255,255,255,.16)'};
const A='var(--cv-accent)';
const TPLS=[
['c-azul','Clássico Azul','Clássicos','single','#2f5d8a',{hb:'3px solid '+A}],
['c-acad','Acadêmico','Clássicos','single','#7a1f2b',{...CEN,hb:'1px solid #999',hp:'0 0 16px',nc:'#111',ntt:'uppercase',nls:'.1em',nfs:'27px',nw:'700',h3ta:'center',h3ls:'.18em',h3c:'#222',h3bd:'none'}],
['c-jur','Jurídico','Clássicos','single','#1d2b4f',{...CEN,hb:'4px double '+A,hp:'0 0 16px',ntt:'uppercase',nls:'.16em',nfs:'26px',h3bd:'none',h3bl:'4px solid '+A,h3pd:'0 0 0 9px',h3c:'#1d2b4f'}],
['c-cinza','Formal Cinza','Clássicos','single','#4a4a4a',{hb:'2px solid '+A,h3bg:'#eeeeee',h3pd:'5px 10px',h3bd:'none',h3c:'#222'}],
['c-bord','Bordô Elegante','Clássicos','single','#7a1f3d',{...CEN,hb:'1px solid '+A,hp:'0 0 14px',nw:'600',rls:'.2em',rtt:'uppercase',h3tt:'none',h3fs:'16px',h3fw:'600',h3bd:'1px solid '+A}],
['c-oliva','Verde Oliva','Clássicos','single','#5a6b2f',{h3bd:'2px solid '+A,h3pd:'0 0 4px',h3c:'#333',ps:'104px',nc:'#333',pbd:'3px solid '+A}],
['m-esm','Lateral Esmeralda','Modernos','side','#1f7a5a',{}],
['m-graf','Lateral Grafite','Modernos','side','#c98a55',{sbg:'#2b2f38',sfg:'#f1f1f1',sbd:'4px solid '+A}],
['m-ind','Lateral Direita Índigo','Modernos','side','#4c4cc4',{so:'2',gtc:'1fr 250px'}],
['m-larga','Lateral Larga','Modernos','side','#b8632f',{gtc:'300px 1fr'}],
['m-fina','Lateral Fina','Modernos','side','#2c6e91',{gtc:'200px 1fr'}],
['m-areia','Lateral Areia','Modernos','side','#a0522d',{sbg:'#efe9df',sfg:'#3a332a',sbd:'4px solid '+A}],
['m-faixa','Faixa Corporativa','Modernos','single','#0f6b6b',{...BLEED,hbg:A}],
['m-duas','Duas Colunas Azul','Modernos','band','#3a5a8a',{...BLEED,hbg:A}],
['n-linha','Minimal Linha','Minimalistas','single','#333333',{h3bd:'none',h3ls:'.2em',h3c:'#111',h3fs:'11px',hb:'1px solid #ddd',nc:'#111',nw:'600'}],
['n-esp','Minimal Espaçado','Minimalistas','single','#6b7280',{...CEN,h3ta:'center',h3bd:'none',h3ls:'.25em',h3fs:'11px',nw:'300',nls:'.12em',ntt:'uppercase',nc:'#222',nfs:'28px',hp:'0 0 8px'}],
['n-cards','Minimal Cartões','Minimalistas','single','#0ea5a4',{ebg:'#f6f7f8',epad:'10px 12px',er:'8px',h3bd:'none',h3c:'#222'}],
['n-pb','Preto e Branco','Minimalistas','single','#111111',{h3bd:'2px solid #111',h3c:'#111',nc:'#111',tgbg:'none',tgc:'#111'}],
['n-mono','Tipográfico','Minimalistas','single','#444444',{h3tt:'lowercase',h3fs:'15px',h3ls:'0',h3bd:'none',nls:'-.02em',nfs:'34px',nc:'#111',tgr:'0'}],
['n-nord','Nórdico','Minimalistas','single','#5b7c99',{pbg:'#fafaf7',h3bd:'none',h3bl:'3px solid '+A,h3pd:'0 0 0 9px',h3c:'#3d4b57',hb:'1px solid #e6e4dc'}],
['k-pes','Banda Pêssego','Criativos','band','#e07a5f',{...BLEED,hbg:A,pbg:'#fffaf5'}],
['k-neon','Banda Vibrante','Criativos','band','#7c3aed',{...BLEED,hbg:'linear-gradient(120deg,'+A+',#ec4899)',h3bd:'none',h3bl:'3px solid '+A,h3pd:'0 0 0 8px'}],
['k-time','Timeline Pontos','Criativos','single','#2f8f6a',{edot:'block',ebd:'2px solid rgba(0,0,0,.12)',epad:'0 0 4px 18px',h3bd:'none'}],
['k-time2','Timeline Duas Colunas','Criativos','band','#d97706',{...BLEED,hbg:'#1f2937',edot:'block',ebd:'2px solid rgba(0,0,0,.12)',epad:'0 0 4px 18px'}],
['k-tag','Etiquetas','Criativos','single','#e11d74',{h3bg:A,h3c:'#fff',h3pd:'4px 12px',h3bd:'none',h3ls:'.06em',h3fs:'12px',h3d:'inline-block',h3r:'20px',tgr:'4px'}],
['k-card','Cartões Coloridos','Criativos','single','#0284c7',{ebg:'color-mix(in srgb,var(--cv-accent) 8%,#fff)',epad:'10px 14px',er:'10px',ebd:'4px solid '+A,h3bd:'none'}],
['d-not','Noturno','Escuros','single','#7dd3fc',{...DK,hb:'1px solid rgba(255,255,255,.15)'}],
['d-ouro','Grafite e Ouro','Escuros','side','#d4a94a',{...DK,sbg:'#0d0f14',sfg:'#f1e9d2',sbd:'4px solid '+A}],
['d-lnoite','Lateral Noite','Escuros','side','#a78bfa',{...DK,sbg:'#1e2233',sfg:'#eef0ff',so:'2',gtc:'1fr 250px'}],
['d-carv','Carvão Faixa','Escuros','band','#f59e0b',{...DK,...BLEED,hbg:'#0d0f14'}],
['d-marin','Azul Marinho','Escuros','single','#5eead4',{...DK,pbg:'#0b1f3a',tx:'#dbe7f5',mu:'#8fb0d3',hb:'1px solid rgba(255,255,255,.2)'}],
['d-neon','Preto Neon','Escuros','single','#39ff88',{...DK,pbg:'#050505',h3bd:'1px solid '+A,nls:'.05em'}]
].map(([id,name,cat,l,c,v])=>({id,name,cat,l,c,v}));
/* geração de +100 modelos: 20 estruturas x 6 estilos */
const N='rgba(128,128,128,.35)',DKMIX='color-mix(in srgb,var(--cv-accent) 24%,#0a0c11)';
const PAL=['#2f5d8a','#1f7a5a','#7a1f3d','#c2410c','#4c4cc4','#0f766e','#b45309','#be185d','#3f6212','#0369a1'];
const PALD=['#7dd3fc','#a78bfa','#f59e0b','#5eead4','#f472b6','#a3e635','#fb923c','#93c5fd','#fde047','#f87171'];
const SKINS=[{n:'Claro',v:{}},{n:'Creme',v:{pbg:'#fffaf0',tx:'#3b342a',mu:'#8a7f6f'}},{n:'Cinza',v:{pbg:'#f4f5f8',tx:'#2a2d34',mu:'#7a808f'}},
{n:'Carvão',d:1,v:{...DK}},{n:'Marinho',d:1,v:{...DK,pbg:'#0b1f3a',tx:'#dbe7f5',mu:'#8fb0d3'}},{n:'Floresta',d:1,v:{...DK,pbg:'#0e1d17',tx:'#d6eadf',mu:'#8fb5a3'}}];
const SKEL=[
{n:'Linha Fina',cat:'Minimalistas',l:'single',v:{hb:'1px solid '+N,h3bd:'none',h3ls:'.2em',h3fs:'11px',nw:'600'}},
{n:'Centralizado',cat:'Clássicos',l:'single',v:{...CEN,hb:'1px solid '+N,hp:'0 0 16px',h3ta:'center',h3bd:'none',h3ls:'.18em'}},
{n:'Faixa',cat:'Modernos',l:'single',v:{},bleed:1},
{n:'Lateral',cat:'Modernos',l:'side',v:{}},
{n:'Lateral Dir.',cat:'Modernos',l:'side',v:{so:'2',gtc:'1fr 250px'}},
{n:'Lateral Larga',cat:'Modernos',l:'side',v:{gtc:'300px 1fr'}},
{n:'Lateral Fina',cat:'Modernos',l:'side',v:{gtc:'200px 1fr'}},
{n:'Duas Colunas',cat:'Modernos',l:'band',v:{},bleed:1},
{n:'Duas Col. Clean',cat:'Minimalistas',l:'band',v:{hb:'2px solid '+A,hp:'0 0 18px'}},
{n:'Timeline',cat:'Criativos',l:'single',v:{edot:'block',ebd:'2px solid '+N,epad:'0 0 4px 18px',h3bd:'none'}},
{n:'Cartões',cat:'Criativos',l:'single',v:{ebg:'rgba(128,128,128,.12)',epad:'10px 12px',er:'8px',h3bd:'none'}},
{n:'Etiquetas',cat:'Criativos',l:'single',v:{h3bg:A,h3c:'var(--pbg,#fff)',h3pd:'4px 12px',h3bd:'none',h3d:'inline-block',h3r:'20px',h3fs:'12px',tgr:'4px'}},
{n:'Marcador',cat:'Clássicos',l:'single',v:{h3bd:'none',h3bl:'4px solid '+A,h3pd:'0 0 0 9px',hb:'1px solid '+N}},
{n:'Duplo',cat:'Clássicos',l:'single',v:{...CEN,hb:'4px double '+A,hp:'0 0 16px',h3bd:'3px double '+N,h3ta:'center',nls:'.12em',ntt:'uppercase',nfs:'26px'}},
{n:'Títulos em Bloco',cat:'Modernos',l:'single',v:{h3bg:'rgba(128,128,128,.16)',h3pd:'5px 10px',h3bd:'none',hb:'3px solid '+A}},
{n:'Tipográfico',cat:'Minimalistas',l:'single',v:{h3tt:'lowercase',h3fs:'15px',h3ls:'0',h3bd:'none',nls:'-.02em',nfs:'36px',tgr:'0'}},
{n:'Espaçado',cat:'Minimalistas',l:'single',v:{...CEN,hp:'0 0 8px',h3ta:'center',h3bd:'none',h3ls:'.25em',h3fs:'11px',nw:'300',nls:'.12em',ntt:'uppercase',nfs:'28px'}},
{n:'Foto Grande',cat:'Criativos',l:'single',v:{ps:'132px',pbd:'4px solid '+A,hb:'3px solid '+A,nfs:'32px'}},
{n:'Quadro',cat:'Clássicos',l:'single',v:{pgb:'10px solid '+A,h3bd:'1px solid '+N}},
{n:'Duas Faixas',cat:'Criativos',l:'single',v:{hb:'6px solid '+A,hp:'0 0 16px',h3bd:'2px solid '+A,h3pd:'0 0 3px',h3d:'inline-block'}}];
SKINS.forEach((sk,si)=>SKEL.forEach((k,ki)=>{
  const c=(sk.d?PALD:PAL)[(si*7+ki*3)%10];let v={...sk.v,...k.v};
  if(k.bleed)v={...v,...BLEED,hbg:sk.d?DKMIX:A};
  if(k.l==='side'&&sk.d){v.sbg=DKMIX;v.sfg='#eef1ff';}
  TPLS.push({id:'g'+si+'-'+ki,name:k.n+' · '+sk.n,cat:sk.d?'Escuros':k.cat,l:k.l,c,v});
}));
const NEWT=[
['b-azul','Bolinhas Azul','Bolinhas','single','#2563eb',{h3bd:'none',hb:'1px solid '+N,hp:'0 0 16px'}],
['b-lat','Bolinhas Lateral','Bolinhas','side','#0f766e',{dotc:'#fff',h3bd:'none'}],
['b-latd','Bolinhas Lateral Direita','Bolinhas','side','#7c3aed',{dotc:'#fff',so:'2',gtc:'1fr 250px',h3bd:'none'}],
['b-faixa','Bolinhas Faixa','Bolinhas','single','#0ea5e9',{...BLEED,hbg:A,h3bd:'none'}],
['b-duas','Bolinhas Duas Colunas','Bolinhas','band','#e11d48',{...BLEED,hbg:A,h3bd:'none'}],
['b-min','Bolinhas Minimal','Bolinhas','single','#111827',{...CEN,hb:'1px solid '+N,hp:'0 0 16px',h3bd:'none',nw:'600'}],
['b-noite','Bolinhas Noturno','Bolinhas','single','#38bdf8',{...DK,h3bd:'none',hb:'1px solid rgba(255,255,255,.15)'}],
['b-ouro','Bolinhas Grafite e Ouro','Bolinhas','side','#d4a94a',{...DK,sbg:'#0d0f14',sfg:'#f1e9d2',sbd:'4px solid '+A,dotc:'#d4a94a',h3bd:'none'}],
['b-verde','Bolinhas Verde Duas Col.','Bolinhas','band','#16a34a',{hb:'3px solid '+A,hp:'0 0 16px',h3bd:'none'}],
['b-coral','Bolinhas Coral','Bolinhas','single','#f97316',{...BLEED,hbg:'linear-gradient(120deg,'+A+',#ec4899)',pbg:'#fffaf5',h3bd:'none'}]
].map(([id,name,cat,l,c,v])=>({id,name,cat,l,c,v,x:'dots',top:true}));
TPLS.push(...NEWT);
const TPL_MAP={};TPLS.forEach(t=>TPL_MAP[t.id]=t);
function thumbHTML(T){
  const v=T.v,fix=x=>(x||'').replace(/var\(--cv-accent\)/g,'var(--tc)');
  let cls='thumb tt-'+T.l+((T.cat==='Escuros'||/^#[01]/.test(v.pbg||''))?' dk':'')+(T.x?' dt':''),st='background:'+(v.pbg||'#fff');
  if(T.l==='side'){st+=';--sb:'+(fix(v.sbg)||'var(--tc)');if(v.so==='2')cls+=' r';}
  else if(v.hbg){st+=';--sb:'+(fix(v.hbg)||'var(--tc)');cls+=' bd';}
  else if(v.hd==='column')cls+=' ce';
  return '<div class="'+cls+'" style="'+st+'"><i></i><b></b><b></b><b></b></div>';
}
document.getElementById('tplGrid').insertAdjacentHTML('beforeend',TPLS.filter(t=>!t.top).map(t=>'<button class="tpl" data-tpl="'+t.id+'" data-cat="'+t.cat+'">'+thumbHTML(t)+'<span>'+t.name+'</span></button>').join(''));
document.getElementById('tplGrid').insertAdjacentHTML('afterbegin',NEWT.map(t=>'<button class="tpl" data-tpl="'+t.id+'" data-cat="'+t.cat+'">'+thumbHTML(t)+'<span>'+t.name+'</span></button>').join(''));
document.getElementById('tplCount').textContent='· '+document.querySelectorAll('.tpl').length+' modelos';
document.getElementById('cats').innerHTML=['Todos','Bolinhas','Clássicos','Modernos','Minimalistas','Criativos','Escuros'].map((c,i)=>'<button class="cat'+(i?'':' active')+'" data-cat="'+c+'">'+c+'</button>').join('');
function filterTpl(){const q=document.getElementById('tplSearch').value.trim().toLowerCase(),c=document.querySelector('.cat.active').dataset.cat;document.querySelectorAll('.tpl').forEach(t=>{t.style.display=((c==='Todos'||t.dataset.cat===c)&&(!q||t.textContent.toLowerCase().includes(q)))?'':'none';});}
document.querySelectorAll('.cat').forEach(b=>b.onclick=()=>{document.querySelectorAll('.cat').forEach(x=>x.classList.toggle('active',x===b));filterTpl();});
document.getElementById('tplSearch').addEventListener('input',filterTpl);
document.querySelectorAll('[data-tpl]').forEach(b=>b.onclick=()=>{data.theme=b.dataset.tpl;const T=TPL_MAP[data.theme];if(T)data.color=T.c;document.getElementById('themeSel').value=data.theme;render();pulsePage();});
document.querySelectorAll('[data-font]').forEach(b=>b.onclick=()=>{data.font=b.dataset.font;document.getElementById('fontSel').value=data.font;render();pulsePage();});
document.querySelectorAll('[data-shape]').forEach(b=>b.onclick=()=>{data.shape=b.dataset.shape;document.getElementById('shapeSel').value=data.shape;render();pulsePage();});
document.getElementById('colorPick').addEventListener('input',e=>{data.color=e.target.value;render();pulsePage();});
document.getElementById('btnTheme').onclick=()=>{
  const r=document.documentElement;
  if(r.dataset.theme==='dark'){delete r.dataset.theme;try{localStorage.setItem('cv_theme2','light');}catch(e){}}
  else{r.dataset.theme='dark';try{localStorage.setItem('cv_theme2','dark');}catch(e){}}
};
try{if(localStorage.getItem('cv_theme2')==='dark')document.documentElement.dataset.theme='dark';}catch(e){}
let zMul=1;
function fitZoom(){
  const sc=document.getElementById('canvasScroll'),pg=document.getElementById('page');if(!sc||!pg||!sc.clientWidth)return;
  const base=Math.min(1.25,(sc.clientWidth-40)/820),z=Math.max(.25,base*zMul);
  pg.style.zoom=z;const l=document.getElementById('zoomLbl');if(l)l.textContent=Math.round(z*100)+'%';
}

/* ---------- fontes personalizadas ---------- */
const _loadedFonts=new Set();
const famOf=f=>"'"+f.name+"',sans-serif";
function loadCustomFont(f){
  if(_loadedFonts.has(f.name))return;_loadedFonts.add(f.name);
  if(f.google){const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family='+encodeURIComponent(f.name).replace(/%20/g,'+')+':wght@400;700&display=swap';document.head.appendChild(l);}
  else if(typeof FontFace!=='undefined'){new FontFace(f.name,'url("'+f.url+'")').load().then(ff=>{document.fonts.add(ff);render();}).catch(()=>toast('Não foi possível ler essa fonte'));}
}
function renderCustomFonts(){
  const c=document.getElementById('customFonts');c.innerHTML='';
  (data.customFonts||[]).forEach((f,i)=>{
    loadCustomFont(f);
    const b=document.createElement('button');b.className='chip';b.dataset.font=famOf(f);b.style.fontFamily=famOf(f);
    b.innerHTML='Aa '+esc(f.name)+'<small>'+(f.google?'Google Font':'Sua fonte')+' · <u data-del="'+i+'">remover</u></small>';
    b.onclick=e=>{
      if(e.target.dataset.del!==undefined){if(data.font===famOf(f))data.font="'Inter',sans-serif";data.customFonts.splice(i,1);renderCustomFonts();render();return;}
      data.font=famOf(f);render();
    };
    c.appendChild(b);
  });
}
function addCustomFont(f){(data.customFonts=data.customFonts||[]).push(f);data.font=famOf(f);renderCustomFonts();render();}
document.getElementById('btnFont').onclick=()=>document.getElementById('fontInput').click();
document.getElementById('fontInput').addEventListener('change',e=>{
  const file=e.target.files[0];if(!file)return;
  const r=new FileReader();
  r.onload=ev=>{addCustomFont({name:file.name.replace(/\.[^.]+$/,'').replace(/[^\w ]/g,' ').trim().slice(0,30)||'Fonte',url:ev.target.result});toast('Fonte carregada ✓');};
  r.readAsDataURL(file);e.target.value='';
});
document.getElementById('btnGf').onclick=()=>{
  const i=document.getElementById('gfName'),n=i.value.replace(/['"<>]/g,'').trim();
  if(!n)return;i.value='';addCustomFont({name:n,google:true});
};

/* ---------- importar texto ---------- */
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z ]/g,' ').replace(/\s+/g,' ').trim();
const SECS={resumo:['resumo','resumo profissional','objetivo','objetivo profissional','sobre mim','perfil','perfil profissional','summary','about me','about','objective','profile'],
exp:['experiencia','experiencia profissional','experiencias','historico profissional','atuacao profissional','experience','work experience','employment history'],
edu:['formacao','formacao academica','educacao','escolaridade','education','academic background'],
course:['cursos','cursos e certificacoes','certificacoes','qualificacoes','cursos complementares','treinamentos','courses','certifications'],
skills:['habilidades','competencias','skills','conhecimentos','tecnologias','ferramentas','habilidades tecnicas','hard skills','soft skills'],
lang:['idiomas','linguas','languages'],project:['projetos','projects','portfolio'],ref:['referencias','references'],
social:['links','redes sociais','contato','contatos','contact','social']};
const SECMAP={};Object.entries(SECS).forEach(([k,a])=>a.forEach(x=>SECMAP[x]=k));
function headerOf(l){
  const t=l.replace(/^[#=*_\s]+|[=*_\s]+$/g,'');
  const m=t.match(/^([^:]{2,40}):\s*(.*)$/);
  if(m&&SECMAP[norm(m[1])])return{k:SECMAP[norm(m[1])],rest:m[2]};
  const n=norm(t.replace(/[:\-–—]+$/,''));
  return t.length<40&&SECMAP[n]?{k:SECMAP[n],rest:''}:null;
}
const RE_EMAIL=/[\w.+-]+@[\w-]+(?:\.[\w-]+)+/;
const RE_URL=/(?:https?:\/\/|www\.)[^\s|,;]+|(?:linkedin|github|gitlab|behance|dribbble|instagram)\.com\/[^\s|,;]+|\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.(?:com|dev|io|app|net|org|br|me|co)\b(?:\/[^\s|,;]*)?/i;
const RE_CITY=/^[A-Za-zÀ-ÿ' .]{2,}\s*[,\-–\/]\s*[A-Z]{2}$/;
const digits=x=>x.replace(/\D/g,'');
const MES='(?:jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez|feb|apr|may|aug|sep|oct|dec)[a-zç]*\\.?';
const D1='(?:'+MES+'\\s*(?:de\\s*)?|\\d{1,2}\\/)?(?:19|20)\\d{2}';
const PT=new RegExp('('+D1+')\\s*(?:[-–—]|até|a|to)\\s*('+D1.replace('(?:19|20)\\d{2}','(?:(?:19|20)\\d{2}|atual|presente|hoje|present|current|now)')+')','i');
const PY=/\b(?:19|20)\d{2}\b/;
const clean=x=>(x||'').replace(/\(\s*\)/g,'').replace(/^[\s(),|–—\-\/@:]+|[\s(),|–—\-\/@:]+$/g,'').trim();
const split2=(x,loose=true)=>{const m=x.match(loose?/\s+[-–—|@]\s+|\s{2,}|\s+(?:na|no|em|at)\s+/i:/\s+[-–—|]\s+|\s{2,}/);return m?[x.slice(0,m.index),x.slice(m.index+m[0].length)]:[x,''];};
const blocks=arr=>{const o=[];let c=[];arr.forEach(x=>{if(x===''){if(c.length)o.push(c);c=[];}else c.push(x);});if(c.length)o.push(c);return o;};
const hostLabel=u=>{const h=u.replace(/^https?:\/\//,'').replace(/^www\./,'').split(/[./]/)[0];return h.charAt(0).toUpperCase()+h.slice(1);};
function eatContact(seg,o){
  seg=seg.trim();if(!seg)return true;
  const kv=seg.match(/^(e ?-?mail|telefone|celular|fone|whatsapp|tel|cidade|endere[cç]o|localiza[cç][aã]o|linkedin|site|github|portf[oó]lio)\s*:\s*(.+)$/i);
  if(kv)seg=kv[2].trim();
  let m=seg.match(RE_EMAIL);if(m){o.email=o.email||m[0];return true;}
  m=seg.match(RE_URL);if(m){o.urls.push(m[0]);return true;}
  if(/^[+\d\s().-]{10,}$/.test(seg)&&digits(seg).length>=10){o.tel=o.tel||seg;return true;}
  if(RE_CITY.test(seg)||(kv&&/cidade|endere|local/i.test(kv[1]))){o.cidade=o.cidade||seg;return true;}
  return false;
}
function parseTop(lines,o){
  const rest=[];
  lines.filter(Boolean).forEach(l=>{
    const kv=l.match(/^(nome|name|cargo|profiss[aã]o|t[ií]tulo|fun[cç][aã]o)\s*:\s*(.+)$/i);
    if(kv){const k=norm(kv[1]);if(k==='nome'||k==='name')o.nome=kv[2].trim();else o.cargo=kv[2].trim();return;}
    const left=l.split(/\s*[|•·]\s*|\s{3,}/).filter(sg=>!eatContact(sg,o));
    if(left.length)rest.push(left.join(' | '));
  });
  if(!o.nome&&rest.length)o.nome=rest.shift();
  if(!o.cargo&&rest.length&&rest[0].length<80)o.cargo=rest.shift();
  if(rest.length)o.extra=rest.join(' ');
}
function entriesOf(arr){
  let bl=blocks(arr);
  if(bl.length===1){
    const L=bl[0],ps=L.map((x,i)=>PT.test(x)?i:-1).filter(i=>i>=0);
    if(ps.length>1){
      const st=[];
      ps.forEach(p=>{let q=(p>0&&!L[p-1].startsWith('• ')&&!PT.test(L[p-1])&&L[p-1].length<90)?p-1:p;if(st.length&&q<=st[st.length-1])q=p;st.push(q);});
      bl=st.map((q,k)=>L.slice(q,st[k+1]??L.length));
      if(st[0]>0)bl.unshift(L.slice(0,st[0]));
    }
  }
  return bl;
}
function parseExp(b){
  let L=[...b],period='';
  const pi=L.findIndex(x=>PT.test(x));
  if(pi>=0){const m=L[pi].match(PT);period=m[0].replace(/\s+/g,' ');L[pi]=clean(L[pi].replace(m[0],''));L=L.filter(Boolean);}
  let [cargo,empresa]=split2(L.shift()||'');
  if(!empresa&&L.length&&!L[0].startsWith('• ')&&L[0].length<70&&!/[.!?]$/.test(L[0]))empresa=L.shift();
  return{id:uid(),cargo:clean(cargo),empresa:clean(empresa),periodo:period,desc:L.join('\n')};
}
function parseEdu(arr){
  const flat=arr.filter(Boolean),bl=blocks(arr);
  const one=x=>{x=x.replace(/^•\s*/,'');return !!split2(x,false)[1]||PT.test(x)||PY.test(x);};
  const items=(bl.length===1&&flat.every(one))?flat.map(x=>[x]):entriesOf(arr);
  return items.map(L=>{
    L=L.map(x=>x.replace(/^•\s*/,''));let period='';
    const pi=L.findIndex(x=>PT.test(x));
    if(pi>=0){const m=L[pi].match(PT);period=m[0].replace(/\s+/g,' ');L[pi]=clean(L[pi].replace(m[0],''));}
    else{const yi=L.findIndex(x=>PY.test(x));if(yi>=0){period=L[yi].match(PY)[0];L[yi]=clean(L[yi].replace(PY,''));}}
    L=L.filter(Boolean);
    let [a,b]=split2(L.shift()||'',false);if(!b&&L.length)b=L.shift();
    return{id:uid(),curso:clean(a),instituicao:clean(b),periodo:period};
  }).filter(x=>x.curso);
}
const LV=[[/b[aá]sic|inicia/i,'Básico'],[/intermedi|m[eé]dio/i,'Intermediário'],[/avan[cç]|advanced/i,'Avançado'],[/fluen/i,'Fluente'],[/nativ|native|materna/i,'Nativo']];
function applyText(text){
  const secs={top:[]};let cur='top';
  text.replace(/\r/g,'').split('\n').forEach(raw=>{
    const l=raw.replace(/^\s*[-•*·▪●■◦►]\s+/,'• ').trim();
    if(!l){secs[cur].push('');return;}
    const h=l.startsWith('• ')?null:headerOf(l);
    if(h){cur=h.k;secs[cur]=secs[cur]||[];if(h.rest)secs[cur].push(h.rest);return;}
    secs[cur].push(l);
  });
  const o={urls:[]},socials=[];parseTop(secs.top,o);
  (secs.social||[]).filter(Boolean).forEach(l=>{
    const u=RE_EMAIL.test(l)?null:l.match(RE_URL);
    if(u)socials.push({label:l.slice(0,u.index).replace(/[:\-–\s]+$/,'').trim()||hostLabel(u[0]),url:u[0]});
    else l.split(/\s*[|•·]\s*/).forEach(sg=>eatContact(sg,o));
  });
  const d=data,got=[];
  ['nome','cargo','email','tel','cidade'].forEach(k=>{if(o[k])d[k]=o[k];});
  if(o.urls.length)d.link=o.urls[0];
  const so=[...o.urls.slice(1).map(u=>({label:hostLabel(u),url:u})),...socials];
  if(so.length){d.social=so.map(x=>({id:uid(),...x}));got.push(so.length+' links');}
  const res=(secs.resumo||[]).filter(Boolean).join(' ').replace(/• /g,'');
  if(res){d.resumo=res;got.push('resumo');}else if(o.extra&&!d.resumo)d.resumo=o.extra;
  const set=(k,arr,lbl)=>{if(arr.length){d[k]=arr;got.push(arr.length+' '+lbl);}};
  if(secs.exp)set('exp',entriesOf(secs.exp).map(parseExp).filter(x=>x.cargo||x.empresa),'experiência(s)');
  if(secs.edu)set('edu',parseEdu(secs.edu),'formação(ões)');
  if(secs.course)set('course',parseEdu(secs.course).map(x=>({id:x.id,nome:x.curso,instituicao:x.instituicao,ano:x.periodo})),'curso(s)');
  if(secs.skills){const sk=[];secs.skills.filter(Boolean).forEach(x=>{x=x.replace(/^•\s*/,'');const c=x.indexOf(':');if(c>0&&c<28)x=x.slice(c+1);x.split(/[,;|•·]| - /).map(z=>z.trim()).filter(z=>z&&z.length<=40).forEach(z=>{if(!sk.some(q=>q.toLowerCase()===z.toLowerCase()))sk.push(z);});});set('skills',sk,'habilidade(s)');}
  if(secs.lang){const lg=[];secs.lang.filter(Boolean).flatMap(x=>x.replace(/^•\s*/,'').split(/[;|,]/)).forEach(sg=>{const nm=clean(sg.split(/\s*[-–—:(]\s*/)[0]);if(!nm)return;const lv=LV.find(([r])=>r.test(sg));lg.push({id:uid(),idioma:nm,nivel:lv?lv[1]:'Intermediário'});});set('lang',lg,'idioma(s)');}
  if(secs.project)set('project',blocks(secs.project).map(L=>{let link='';const ln=L.map(x=>{const u=x.match(RE_URL);if(u){link=link||u[0];return clean(x.replace(u[0],''));}return x;}).filter(Boolean);return{id:uid(),nome:clean((ln.shift()||'').replace(/^•\s*/,'')),link,desc:ln.join('\n')};}).filter(x=>x.nome),'projeto(s)');
  if(secs.ref)set('ref',blocks(secs.ref).map(L=>{L=[...L];const [nm,rl]=split2((L.shift()||'').replace(/^•\s*/,''));const ct=[];let rel=rl;L.forEach(x=>{x=x.replace(/^•\s*/,'');if(RE_EMAIL.test(x)||digits(x).length>=10)ct.push(x);else if(!rel)rel=x;});return{id:uid(),nome:clean(nm),relacao:clean(rel),contato:ct.join(' · ')};}).filter(x=>x.nome),'referência(s)');
  return got.length?'Preenchido: '+got.join(', ')+' ✓':'Não encontrei seções. Use títulos como Experiência e Formação.';
}
const SAMPLE=`Fulana de Tal
Designer de Produto
fulana@email.com | (85) 99999-0000 | Icapuí, CE
linkedin.com/in/anasouza | github.com/anasouza

Resumo
Designer com 5 anos de experiência em produtos digitais, focada em pesquisa e interfaces acessíveis.

Experiência
Designer de Produto - Studio Aurora (Jan 2022 - Atual)
• Liderei o redesign do app principal
• Aumentei a conversão em 18%

Designer Júnior - Agência Onda (2019 - 2021)
• Criei identidades visuais para 30+ clientes

Formação
Design Gráfico - Universidade Federal do Ceará (2015 - 2019)

Cursos
UX Research - Alura (2021)
Figma Avançado - Udemy (2020)

Habilidades
Figma, Photoshop, Pesquisa com usuários, Prototipagem

Idiomas
Inglês - Avançado
Espanhol - Básico`;
const $m=id=>document.getElementById(id);
const openM=()=>$m('txtModal').classList.add('open'),closeM=()=>$m('txtModal').classList.remove('open');
$m('btnText').onclick=openM;$m('txtClose').onclick=closeM;
$m('txtModal').addEventListener('click',e=>{if(e.target.id==='txtModal')closeM();});
$m('txtFile').onclick=()=>$m('txtFileInput').click();
$m('txtFileInput').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{$m('txtArea').value=ev.target.result;};r.readAsText(f);e.target.value='';});
$m('txtSample').onclick=()=>{$m('txtArea').value=SAMPLE;};
function doFill(pdf){
  const t=$m('txtArea').value.trim();if(!t){toast('Cole ou carregue um texto primeiro');return;}
  const msg=applyText(t);refreshAllForms();closeM();toast(msg);
  if(pdf)setTimeout(()=>doPrint(),500);
}
$m('txtFill').onclick=()=>doFill(false);$m('txtPdf').onclick=()=>doFill(true);

/* ---------- navegação mobile / app ---------- */

document.getElementById('btnPrint2').onclick=()=>doPrint();
document.getElementById('btnPrintNative').onclick=()=>{const m=document.querySelector('.menu');if(m)m.removeAttribute('open');printBrowser();};
document.getElementById('btnTheme2').onclick=()=>document.getElementById('btnTheme').click();
document.getElementById('btnText2').onclick=()=>document.getElementById('btnText').click();
let _ip=null;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();_ip=e;document.getElementById('btnInstall').hidden=false;});
document.getElementById('btnInstall').onclick=async()=>{if(!_ip)return;_ip.prompt();try{await _ip.userChoice;}catch(e){}_ip=null;document.getElementById('btnInstall').hidden=true;};
window.addEventListener('appinstalled',()=>toast('App instalado ✓'));

/* ---------- tela de boas-vindas ---------- */
function hasSavedCV(){
  try{const raw=localStorage.getItem('cv_data');if(!raw)return false;const p=JSON.parse(raw);return !!(p.nome||p.cargo||p.resumo||(p.exp&&p.exp.length));}catch(e){return false;}
}
(function initWelcome(){
  const w=document.getElementById('welcome');
  if(hasSavedCV()){
    document.getElementById('wTitle').textContent='Que bom te ver de novo!';
    document.getElementById('wSub').textContent='Encontrei um currículo salvo neste navegador. Quer continuar de onde parou ou começar um novo do zero?';
    document.getElementById('wResume').hidden=false;
  }
  w.classList.add('open');
  function reveal(){w.classList.remove('open');document.documentElement.classList.add('revealed');setTimeout(fitZoom,550);}
  document.getElementById('wResume').onclick=reveal;
  document.getElementById('wStart').onclick=()=>{
    if(hasSavedCV()){
      if(!confirm('Isso apaga o currículo salvo e começa um novo. Continuar?'))return;
      try{localStorage.removeItem('cv_data');}catch(e){}
      location.reload();
    } else reveal();
  };
  document.getElementById('wText').onclick=()=>{reveal();document.getElementById('btnText').click();};
})();

/* ---------- foto de capa ---------- */
function socialIcon(url){
  url=(url||'').toLowerCase();
  if(url.includes('whatsapp')||url.includes('wa.me'))return '💬';
  if(url.includes('instagram'))return '📷';
  if(url.includes('youtube')||url.includes('youtu.be'))return '▶️';
  if(url.includes('linkedin'))return '💼';
  if(url.includes('github'))return '💻';
  if(url.includes('facebook'))return '📘';
  if(url.includes('tiktok'))return '🎵';
  if(url.includes('twitter')||url.includes('x.com'))return '✖️';
  if(url.includes('behance'))return '🎨';
  if(url.includes('mailto:')||url.includes('@'))return '✉️';
  return '🔗';
}
function applyHeroBg(){
  const hero=document.querySelector('.dhero'),bg=document.querySelector('.dhero-bg');
  if(!hero||!bg)return;
  if(data.capa){hero.classList.add('has-capa');bg.style.backgroundImage="url('"+data.capa+"')";}
  else{hero.classList.remove('has-capa');bg.style.backgroundImage='';}
}
/* ---------- dashboard único: nav lateral, objetivo e estatísticas ---------- */
function updateDash(){applyHeroBg();}
document.querySelectorAll('#appSide .pf-nav').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#appSide .pf-nav').forEach(x=>x.classList.remove('active'));b.classList.add('active');
  const t=document.getElementById(b.dataset.jump);
  t&&t.scrollIntoView&&t.scrollIntoView({behavior:'smooth',block:'start'});
});
const $dm=id=>document.getElementById(id);
$dm('btnDesign').onclick=()=>$dm('designModal').classList.add('open');
$dm('designClose').onclick=()=>$dm('designModal').classList.remove('open');
$dm('designModal').addEventListener('click',e=>{if(e.target.id==='designModal')$dm('designModal').classList.remove('open');});

/* init */
load();
refreshAllForms();
fitZoom();

/* ---------- PDF, pré-visualização e navegação ---------- */
function doPrint(){
  render();
  const nome=((data.nome||'Curriculo').trim()+' - Curriculo').replace(/[\\/:*?"<>|]/g,'');
  if(!window.cvDownloadPdf){printBrowser();return;}
  try{toast('Gerando PDF…');}catch(e){}
  window.cvDownloadPdf(nome).then(()=>{try{toast('PDF baixado');}catch(e){}}).catch(err=>{console.error(err);printBrowser();});
}
function printBrowser(){
  render();
  const t=document.title;document.title=((data.nome||'Curriculo').trim()+' - Curriculo').replace(/[\\/:*?"<>|]/g,'');
  const back=()=>{document.title=t;};
  window.addEventListener('afterprint',back,{once:true});
  const go=()=>setTimeout(()=>window.print(),120);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(go,go);else go();
}
$dm('btnDesign2').onclick=()=>$dm('btnDesign').click();
$dm('zIn').onclick=()=>{zMul=Math.min(2,zMul+.1);fitZoom();};
$dm('zOut').onclick=()=>{zMul=Math.max(.4,zMul-.1);fitZoom();};
$dm('zFit').onclick=()=>{zMul=1;fitZoom();};
addEventListener('resize',fitZoom);
if(window.ResizeObserver)new ResizeObserver(fitZoom).observe($dm('canvasScroll'));
function showPane(p){
  $dm('app').classList.toggle('show-preview',p==='view');
  $dm('mEdit').classList.toggle('active',p!=='view');$dm('mView').classList.toggle('active',p==='view');
  setTimeout(fitZoom,30);
}
$dm('mEdit').onclick=()=>showPane('edit');$dm('mView').onclick=()=>showPane('view');
fitZoom();


/* ---------- painel de modelos: abre só quando pedido ---------- */
function openDesign(){
  const m=$dm('designModal');
  m.style.setProperty('--tb',document.querySelector('.topbar').offsetHeight+'px');
  const menu=document.querySelector('.menu');if(menu)menu.removeAttribute('open');
  if(innerWidth<=980)showPane('view');
  m.classList.add('open');
}
function closeDesign(){$dm('designModal').classList.remove('open');}
$dm('btnDesign').onclick=openDesign;
$dm('btnDesign2').onclick=()=>{$dm('designModal').classList.contains('open')?closeDesign():openDesign();};
$dm('designClose').onclick=closeDesign;
addEventListener('keydown',e=>{if(e.key==='Escape')closeDesign();});
document.querySelectorAll('[data-show]').forEach(i=>i.addEventListener('change',()=>{
  data.show=Object.assign({},SHOW_DEF,data.show||{});data.show[i.dataset.show]=i.checked;document.querySelectorAll('[data-show="'+i.dataset.show+'"]').forEach(x=>{x.checked=i.checked;});render();
}));


/* ---------- foto (detecta se há ou não), contato e posição ---------- */
function photoUI(){
  const st=document.getElementById('photoState'),bt=document.getElementById('btnPhotoDel');if(!st||!bt)return;
  st.textContent=data.foto?'Foto adicionada.':'Sem foto: o currículo é montado sem espaço para foto.';
  bt.hidden=!data.foto;
}
document.getElementById('btnPhotoDel').onclick=()=>{data.foto='';updatePhotoPreview();render();};
function contactUI(){
  document.querySelectorAll('[data-val]').forEach(e=>{const v=data[e.dataset.val];e.textContent=v||'não preenchido';e.style.opacity=v?'1':'.55';});
}
['nome','cargo','email','tel','cidade','link'].forEach(k=>document.getElementById('f_'+k).addEventListener('input',contactUI));
document.querySelectorAll('[data-align]').forEach(b=>b.onclick=()=>{data.align=b.dataset.align;render();pulsePage();});
photoUI();contactUI();



/* ---------- seletor de seções (lado esquerdo) ---------- */
var RSECS=[['sec-personal','Dados pessoais','Foto, nome, cargo e contato'],['sec-exp','Experiência profissional','Onde você já trabalhou'],['sec-edu','Formação acadêmica','Escola, curso e faculdade'],['sec-skills','Habilidades','O que você sabe fazer'],['sec-project','Projetos','Trabalhos que você realizou'],['sec-course','Cursos e certificações','Cursos e certificados'],['sec-lang','Idiomas','Línguas e nível'],['sec-social','Contato e redes','Links e redes sociais'],['sec-ref','Referências','Pessoas que podem indicar você'],['sec-extra','Informações adicionais','CNH, disponibilidade e mais']];
var rCur='sec-personal';
function showRail(id,noScroll){
  const i=RSECS.findIndex(x=>x[0]===id);if(i<0)return;rCur=id;
  document.querySelectorAll('.ecard').forEach(c=>c.classList.toggle('is-on',c.id===id));
  document.querySelectorAll('.rail-item').forEach(b=>b.classList.toggle('active',b.dataset.jump===id));
  document.getElementById('edTitle').textContent=RSECS[i][1];document.getElementById('edSub').textContent=RSECS[i][2];
  const pv=document.getElementById('edPrev'),nx=document.getElementById('edNext');
  pv.disabled=i===0;nx.textContent=i===RSECS.length-1?'Ver currículo ✓':'Próximo ›';
  if(!noScroll)document.getElementById('edScroll').scrollTop=0;
  const a=document.querySelector('.rail-item.active');if(a&&a.scrollIntoView)a.scrollIntoView({block:'nearest'});
}
function railUI(){
  const n=(k)=>Array.isArray(data[k])?data[k].length:0,v=id=>{const e=document.getElementById(id);return e&&e.value.trim();};
  const cnt={'sec-exp':n('exp'),'sec-edu':n('edu'),'sec-skills':n('skills'),'sec-project':n('project'),'sec-course':n('course'),'sec-lang':n('lang'),'sec-social':n('social'),'sec-ref':n('ref')};
  cnt['sec-personal']=(data.nome&&data.cargo)?'✓':'';
  cnt['sec-extra']=(v('f_cnh')||v('f_disp')||v('f_sal')||v('f_extra'))?'✓':'';
  document.querySelectorAll('[data-rb]').forEach(e=>{const c=cnt[e.dataset.rb];e.textContent=c?c:'';});
}
document.querySelectorAll('.rail-item').forEach(b=>b.onclick=()=>showRail(b.dataset.jump));
document.getElementById('edPrev').onclick=()=>{const i=RSECS.findIndex(x=>x[0]===rCur);if(i>0)showRail(RSECS[i-1][0]);};
document.getElementById('edNext').onclick=()=>{
  const i=RSECS.findIndex(x=>x[0]===rCur);
  if(i<RSECS.length-1)showRail(RSECS[i+1][0]);
  else if(innerWidth<=980)showPane('view');else toast('Tudo pronto! Confira ao lado e baixe o PDF 😊');
};
['f_cnh','f_disp','f_sal','f_extra'].forEach(id=>document.getElementById(id).addEventListener('input',railUI));
showRail('sec-personal',true);railUI();
