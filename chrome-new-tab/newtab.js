const defaults = [
  {name:'Claude',url:'https://claude.ai/',color:'#a66b51'},
  {name:'ChatGPT',url:'https://chatgpt.com/',color:'#245b50'},
  {name:'WhatsApp',url:'https://web.whatsapp.com/',color:'#168f5b'},
  {name:'Ostad',url:'https://ostad.app/',color:'#b68b1b'},
  {name:'GitHub',url:'https://github.com/',color:'#253448'},
  {name:'Instagram',url:'https://www.instagram.com/',color:'#bc3183'},
  {name:'Facebook',url:'https://www.facebook.com/',color:'#1e71d5'},
  {name:'LinkedIn',url:'https://www.linkedin.com/',color:'#176a9d'}
];
const $ = (id) => document.getElementById(id);
const editor = $('editor');
const prefs = $('preferences');
const canvas = $('particles');
const scenes = [
  ['Moon','wallpaper.jpg'],
  ['Earth · Orbit','scenes/02-earth-orbit.jpg'],
  ['Mercury','scenes/03-mercury.jpg'],
  ['Venus','scenes/04-venus.jpg'],
  ['Earth · Planet','scenes/05-earth-planet.jpg'],
  ['Mars','scenes/06-mars.jpg'],
  ['Jupiter','scenes/07-jupiter.jpg'],
  ['Saturn','scenes/08-saturn.jpg'],
  ['Uranus','scenes/09-uranus.jpg'],
  ['Neptune','scenes/10-neptune.jpg'],
  ['Sun','scenes/11-sun.jpg'],
  ['Satellite','scenes/12-satellite.jpg']
];
let shortcuts = defaults;
let editing = -1;
let sceneIndex=0,activeLayer=$('slide-a'),slideshowTimer=0,rotateScenes=true,customPhoto=false,sceneRequest=0;
const customLayer=$('custom-photo');

function sceneUrl(index){return chrome.runtime.getURL(scenes[index][1])}
function setCaption(){ $('scene-caption').textContent=`${String(sceneIndex+1).padStart(2,'0')} / 12 · ${scenes[sceneIndex][0].toUpperCase()}`; }
function refreshSlideshowTimer(){
  clearInterval(slideshowTimer);slideshowTimer=0;
  if(rotateScenes&&!customPhoto&&!document.hidden){
    slideshowTimer=setInterval(()=>showScene((sceneIndex+1)%scenes.length),5000);
  }
}
function prefetchNext(){const image=new Image();image.src=sceneUrl((sceneIndex+1)%scenes.length)}
function showScene(index){
  if(customPhoto)return;
  const request=++sceneRequest;
  const image=new Image();image.src=sceneUrl(index);
  image.onload=()=>{
    if(request!==sceneRequest||customPhoto)return;
    const next=activeLayer===$('slide-a')?$('slide-b'):$('slide-a');
    next.style.backgroundImage=`url("${image.src}")`;
    next.classList.add('active');activeLayer.classList.remove('active');activeLayer=next;
    sceneIndex=index;setCaption();prefetchNext();
  };
  image.onerror=()=>{if(request===sceneRequest)prefetchNext()};
}
function showCustomPhoto(data){
  customPhoto=true;sceneRequest++;customLayer.style.backgroundImage=`url("${data}")`;
  customLayer.classList.add('active');document.body.classList.add('custom-photo');
  refreshSlideshowTimer();
}
function restoreScenes(){
  customPhoto=false;customLayer.classList.remove('active');
  customLayer.style.backgroundImage='';document.body.classList.remove('custom-photo');
  refreshSlideshowTimer();prefetchNext();
}
$('previous-scene').addEventListener('click',()=>{showScene((sceneIndex+scenes.length-1)%scenes.length);refreshSlideshowTimer()});
$('next-scene').addEventListener('click',()=>{showScene((sceneIndex+1)%scenes.length);refreshSlideshowTimer()});
$('slideshow-toggle').addEventListener('change',async e=>{
  rotateScenes=e.target.checked;await chrome.storage.local.set({rotateScenes});refreshSlideshowTimer();
});

function safeUrl(input){
  try { const url = new URL(input.trim()); return ['https:','http:'].includes(url.protocol) ? url.href : null; }
  catch { return null; }
}
function render(){
  const container = $('shortcuts');
  container.replaceChildren();
  shortcuts.forEach((item,index)=>{
    const wrap=document.createElement('div'); wrap.className='shortcut-wrap';
    const link=document.createElement('a'); link.className='shortcut'; link.href=item.url; link.title=item.name;
    const icon=document.createElement('span'); icon.className='circle'; icon.textContent=item.name.slice(0,1).toUpperCase();
    icon.style.setProperty('--icon-color',item.color || '#315b84');
    const label=document.createElement('span'); label.className='label'; label.textContent=item.name;
    link.append(icon,label);
    const edit=document.createElement('button'); edit.className='edit-shortcut'; edit.type='button';
    edit.textContent='⋯'; edit.title=`Edit ${item.name}`; edit.setAttribute('aria-label',`Edit ${item.name}`);
    edit.addEventListener('click',()=>openEditor(index));
    wrap.append(link,edit); container.append(wrap);
  });
}
function openEditor(index){
  editing=index; $('editor-form').reset(); $('error').textContent='';
  $('editor-title').textContent=index<0?'Add shortcut':'Edit shortcut';
  $('delete').hidden=index<0;
  if(index>=0){ $('name').value=shortcuts[index].name; $('url').value=shortcuts[index].url; }
  editor.showModal(); $('name').focus();
}
async function save(){ await chrome.storage.local.set({shortcuts}); render(); }
$('add').addEventListener('click',()=>openEditor(-1));
$('editor-form').addEventListener('submit',async e=>{
  e.preventDefault();
  const name=$('name').value.trim(); const url=safeUrl($('url').value);
  if(!name||!url){$('error').textContent='Enter a name and a valid http(s) URL.';return;}
  const previous=shortcuts[editing];
  const entry={name,url,color:previous?.color || '#315b84'};
  if(editing<0)shortcuts.push(entry); else shortcuts[editing]=entry;
  await save();editor.close();
});
$('delete').addEventListener('click',async()=>{
  if(editing<0)return;
  shortcuts.splice(editing,1);await save();editor.close();
});
$('settings').addEventListener('click',()=>{ $('wallpaper-status').textContent='';prefs.showModal(); });
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
for(const dialog of [editor,prefs])dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
$('wallpaper').addEventListener('change',e=>{
  const file=e.target.files?.[0];if(!file)return;
  if(!['image/png','image/jpeg','image/webp'].includes(file.type)){ $('wallpaper-status').textContent='Choose a PNG, JPEG, or WebP photo.';return; }
  const image=new Image(); const objectUrl=URL.createObjectURL(file);
  image.onload=async()=>{
    const canvas=document.createElement('canvas');
    const scale=Math.min(1,1920/image.width,1200/image.height);
    canvas.width=Math.max(1,Math.round(image.width*scale));canvas.height=Math.max(1,Math.round(image.height*scale));
    canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
    const data=canvas.toDataURL('image/jpeg',.78);
    URL.revokeObjectURL(objectUrl);
    try { await chrome.storage.local.set({wallpaper:data});showCustomPhoto(data);$('wallpaper-status').textContent='Your photo is displayed. Restore the space slideshow anytime.'; }
    catch { $('wallpaper-status').textContent='Photo is too large to save. Try a smaller image.'; }
  };
  image.onerror=()=>{URL.revokeObjectURL(objectUrl);$('wallpaper-status').textContent='Could not open that photo.'};
  image.src=objectUrl;
});
$('reset-wallpaper').addEventListener('click',async()=>{
  await chrome.storage.local.remove('wallpaper');restoreScenes();$('wallpaper-status').textContent='Space slideshow restored.';
});
let particlesEnabled=true;
const motionOK=!window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const ctx=canvas.getContext('2d',{alpha:true});
let stars=[];let width=0,height=0,ratio=1,frame=0,animationId=0;
function sizeParticles(){
  ratio=Math.min(devicePixelRatio||1,2); width=innerWidth;height=innerHeight;
  canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
  ctx.setTransform(ratio,0,0,ratio,0,0);
  const count=Math.min(115,Math.max(36,Math.floor(width*height/11000)));
  stars=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,r:Math.random()*1.6+.35,v:.07+Math.random()*.24,phase:Math.random()*6.3,hue:Math.random()>.38?190:268}));
}
function drawParticles(){
  animationId=0;
  if(!particlesEnabled||document.hidden)return;
  ctx.clearRect(0,0,width,height);
  frame++;
  for(const star of stars){
    const alpha=.22+.48*(.5+.5*Math.sin(frame*.017+star.phase));
    ctx.beginPath();ctx.fillStyle=`hsla(${star.hue},100%,83%,${alpha})`;
    ctx.shadowBlur=star.r>1.35?12:5;ctx.shadowColor=star.hue===190?'#69ceff':'#ae81ff';
    ctx.arc(star.x,star.y,star.r,0,Math.PI*2);ctx.fill();
    star.y-=star.v;star.x+=Math.sin(frame*.006+star.phase)*.055;
    if(star.y<0){star.y=height;star.x=Math.random()*width}
  }
  ctx.shadowBlur=0;
  if(motionOK)animationId=requestAnimationFrame(drawParticles);
}
function updateParticleVisibility(){
  canvas.hidden=!particlesEnabled;
  if(!particlesEnabled){cancelAnimationFrame(animationId);animationId=0;ctx.clearRect(0,0,width,height)}
  else if(!animationId)animationId=requestAnimationFrame(drawParticles);
}
$('particle-toggle').addEventListener('change',async e=>{
  particlesEnabled=e.target.checked;
  await chrome.storage.local.set({particlesEnabled});updateParticleVisibility();
});
addEventListener('resize',()=>{sizeParticles();if(!motionOK&&particlesEnabled)drawParticles()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&particlesEnabled)updateParticleVisibility();refreshSlideshowTimer()});
chrome.storage.local.get(['shortcuts','wallpaper','particlesEnabled','rotateScenes']).then(data=>{
  if(Array.isArray(data.shortcuts))shortcuts=data.shortcuts.filter(x=>x&&typeof x.name==='string'&&safeUrl(x.url));
  rotateScenes=data.rotateScenes!==false;$('slideshow-toggle').checked=rotateScenes;
  if(typeof data.wallpaper==='string'&&data.wallpaper.startsWith('data:image/jpeg;base64,'))showCustomPhoto(data.wallpaper);
  else refreshSlideshowTimer();
  setCaption();prefetchNext();
  particlesEnabled=data.particlesEnabled!==false;$('particle-toggle').checked=particlesEnabled;
  sizeParticles();updateParticleVisibility();
  render();
});
