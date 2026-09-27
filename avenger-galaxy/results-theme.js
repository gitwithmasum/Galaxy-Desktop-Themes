'use strict';
// A small, removable Galaxy layer on search results. Search content belongs to its engine.
(() => {
  if (!new URLSearchParams(location.search).has('q')) return;
  if (document.getElementById('masum-avenger-galaxy-host')) return;
  const host=document.createElement('div');
  host.id='masum-avenger-galaxy-host';
  host.style.cssText='position:fixed;inset:0;z-index:2147483646;pointer-events:none';
  const shadow=host.attachShadow({mode:'closed'});
  const style=document.createElement('style');
  style.textContent=`
    *{box-sizing:border-box} .top{position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#39d5ff,#a862ff,#ef6c9e,#39d5ff);background-size:250% 100%;animation:flow 8s linear infinite;box-shadow:0 0 15px #5ddcff;pointer-events:none}
    .card{position:absolute;right:20px;bottom:20px;width:267px;border:1px solid #69c6ff70;border-radius:16px;padding:13px 15px 15px;background:linear-gradient(135deg,#071329ee,#1c1540eb);color:#eaf6ff;font-family:Segoe UI,system-ui,sans-serif;box-shadow:0 12px 45px #02061890,0 0 28px #62bfff35;backdrop-filter:blur(15px);pointer-events:auto;overflow:hidden}
    .card:before{content:'✦  ·    ✦      ·       ✦   ·    ✦';position:absolute;inset:9px auto auto 15px;color:#b2ebff8c;font-size:9px;letter-spacing:18px;white-space:nowrap;animation:twinkle 3s ease-in-out infinite;pointer-events:none}
    .mark{position:relative;font:600 10px Consolas,monospace;letter-spacing:.17em;color:#86dfff;margin-top:17px}.heading{position:relative;font-weight:750;letter-spacing:.08em;margin-top:5px;font-size:14px}.site{margin-top:6px;color:#b2bfda;font-size:11px}.close{position:absolute;right:9px;top:8px;background:transparent;border:0;color:#c8deef;font-size:18px;cursor:pointer}.close:hover{color:white}.toggle{margin-top:11px;background:#1b4771;border:1px solid #79d6ff70;color:#e8f7ff;border-radius:8px;padding:6px 10px;cursor:pointer;font-size:11px}.toggle:hover{background:#276497}.compact{width:auto;padding:8px 11px}.compact .mark,.compact .heading,.compact .site,.compact .close{display:none}.compact .toggle{margin:0}@keyframes flow{to{background-position:250% 0}}@keyframes twinkle{50%{opacity:.32}}@media(max-width:520px){.card{right:10px;bottom:10px;width:210px}}@media(prefers-reduced-motion:reduce){.top,.card:before{animation:none}}
  `;
  const top=document.createElement('div');top.className='top';
  const card=document.createElement('aside');card.className='card';card.setAttribute('aria-label','Avenger Galaxy search decoration');
  const engine=location.hostname.includes('bing')?'BING':location.hostname.includes('duckduckgo')?'DUCKDUCKGO':'GOOGLE';
  const label=document.createElement('div');label.className='mark';label.textContent='MASUM BILLAH / AVENGER GALAXY';
  const heading=document.createElement('div');heading.className='heading';heading.textContent='SEARCH RESULTS';
  const site=document.createElement('div');site.className='site';site.textContent=`${engine} · GALAXY VIEW`;
  const close=document.createElement('button');close.className='close';close.type='button';close.setAttribute('aria-label','Remove Galaxy overlay');close.textContent='×';close.addEventListener('click',()=>host.remove());
  const toggle=document.createElement('button');toggle.className='toggle';toggle.type='button';toggle.textContent='MINIMIZE';toggle.addEventListener('click',()=>{const mini=card.classList.toggle('compact');toggle.textContent=mini?'✦ GALAXY':'MINIMIZE'});
  card.append(label,heading,site,close,toggle);shadow.append(style,top,card);document.body.append(host);
  const inputStyle=document.createElement('style');inputStyle.textContent='textarea[name="q"]:focus,input[name="q"]:focus{outline:2px solid #55d7ff!important;box-shadow:0 0 19px #5dcbff75!important}';document.documentElement.append(inputStyle);
  close.addEventListener('click',()=>inputStyle.remove());
})();
