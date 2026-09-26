'use strict';
const scenes=[
 ['THOR','01-thor','#69d8ff'],['IRON MAN','02-iron-man','#e96675'],['CAPTAIN AMERICA','03-captain-america','#5caaff'],['HULK','04-hulk','#94e869'],['LOKI','05-loki','#b2ec76'],['DOCTOR STRANGE','06-doctor-strange','#ffb979'],['SPIDER-MAN','07-spider-man','#f67f88'],['BLACK PANTHER','08-black-panther','#ab80ff'],['VIBRANIUM','09-vibranium','#7ceaff'],['THE WITCHER','10-witcher','#bcd8f1']
];
const wallpaper=document.body.classList.contains('wallpaper');
const panes=[document.querySelector('#scene-a'),document.querySelector('#scene-b')];let active=0,index=0,transitioning=false;
const art=document.querySelector('#art'),title=document.querySelector('#title'),count=document.querySelector('#count');
const powerNames=['MJOLNIR / LIGHTNING','ARC REACTOR / REPULSOR','SHIELD / KINETIC TRAIL','GAMMA / SHOCKWAVE','ILLUSION / GREEN MAGIC','MYSTIC PORTAL','WEB / SWING TRAIL','VIBRANIUM SUIT / CLAWS','VIBRANIUM / ENERGY CORE','SILVER SWORD / SIGNS'];
function imagePath(file,ext){return `scenes/${file}.${ext}`}
function show(n){if(transitioning)return;transitioning=true;n=(n+scenes.length)%scenes.length;const [name,file,color]=scenes[n],img=new Image();img.onload=()=>{const next=1-active;panes[next].style.backgroundImage=`url("${img.src}")`;panes[next].classList.add('active');panes[active].classList.remove('active');active=next;index=n;art.classList.remove('enter');art.src=imagePath(file,'svg');art.style.setProperty('--accent',color);title.textContent=name;count.textContent=`${String(n+1).padStart(2,'0')} / ${scenes.length} · ${powerNames[n]}`;requestAnimationFrame(()=>art.classList.add('enter'));new Image().src=imagePath(scenes[(n+1)%scenes.length][1],'jpg');transitioning=false};img.onerror=()=>{transitioning=false};img.src=imagePath(file,'jpg')}
show(0);let interval=setInterval(()=>show(index+1),5000);document.addEventListener('visibilitychange',()=>{if(document.hidden){clearInterval(interval);interval=null}else if(!interval){interval=setInterval(()=>show(index+1),5000)}});
if(!wallpaper){const form=document.querySelector('#search-form');form.addEventListener('submit',e=>{e.preventDefault();const q=form.querySelector('input').value.trim();if(q)location.href='https://www.google.com/search?q='+encodeURIComponent(q)})}
const canvas=document.querySelector('#particles'),ctx=canvas.getContext('2d');let w=0,h=0,dpr=1,stars=[];function resize(){w=innerWidth;h=innerHeight;dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);stars=Array.from({length:Math.min(125,Math.ceil(w*h/15000))},()=>({x:Math.random()*w,y:Math.random()*h,r:.35+Math.random()*1.5,v:.08+Math.random()*.25,a:.15+Math.random()*.55,p:Math.random()*7}))}addEventListener('resize',resize);resize();function frame(t){if(!document.hidden&&!matchMedia('(prefers-reduced-motion: reduce)').matches){ctx.clearRect(0,0,w,h);for(const s of stars){s.y-=s.v;if(s.y<-4){s.y=h+4;s.x=Math.random()*w}ctx.fillStyle=`rgba(180,225,255,${s.a*(.7+.3*Math.sin(t*.001+s.p))})`;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fill()}drawPower(t)}requestAnimationFrame(frame)}requestAnimationFrame(frame);

// Canvas-only power effects. The desktop wallpaper and the New Tab share this renderer.
function drawPower(t){
 const x=w*(w<720?.68:.75),y=h*.51,k=Math.min(w/1400,h/800,1.45),phase=t*.001;
 ctx.save();ctx.translate(x,y);ctx.scale(k,k);ctx.globalCompositeOperation='screen';
 const color=scenes[index][2];
 function ring(r,c=color,width=2,start=0,end=Math.PI*2){ctx.beginPath();ctx.arc(0,0,r,start,end);ctx.strokeStyle=c;ctx.lineWidth=width;ctx.stroke()}
 function line(points,c=color,width=3,blur=14){ctx.beginPath();ctx.moveTo(...points[0]);for(const p of points.slice(1))ctx.lineTo(...p);ctx.strokeStyle=c;ctx.lineWidth=width;ctx.shadowColor=c;ctx.shadowBlur=blur;ctx.stroke();ctx.shadowBlur=0}
 function spark(px,py,r=2,c=color){ctx.beginPath();ctx.arc(px,py,r,0,Math.PI*2);ctx.fillStyle=c;ctx.shadowColor=c;ctx.shadowBlur=18;ctx.fill();ctx.shadowBlur=0}
 function pulse(r,speed=.9){const p=(phase*speed)%1;ring(r+p*130,`rgba(194,230,255,${(1-p)*.35})`,2)}
 switch(index){
  case 0: // Thor: three branching bolts from the hammer head.
   for(let b=0;b<3;b++){let points=[[-55+b*22,-58]];for(let j=1;j<7;j++)points.push([-70+b*45+Math.sin(phase*9+j*3+b)*20-j*7,-58-j*47]);line(points,b===1?'#d9faff':'#59c9ff',b===1?4:2,28);spark(...points[points.length-1],2.5)}pulse(55,1.4);break;
  case 1: // Iron Man: reactor pulse and outward repulsor beam.
   ring(35+Math.sin(phase*7)*4,'#a6f9ff',5);ring(50,'#ef7083',2);line([[0,12],[110,100],[440,290]],'#8ceeff',13,38);line([[0,12],[110,100],[440,290]],'#e7ffff',3,12);for(let j=0;j<9;j++){const q=(phase*.38+j/9)%1;spark(q*420,18+q*265+Math.sin(j*8)*30,1+q*2)}break;
  case 2: // Captain America: spinning concentric shield arcs.
   ctx.save();ctx.rotate(phase*.65);for(let j=0;j<4;j++)ring(63+j*22,['#e65a71','#e6f8ff','#508ffa','#c9f7ff'][j],j===0?5:3,Math.PI*.15,Math.PI*1.85);ctx.restore();pulse(88,.8);break;
  case 3: // Hulk: expanding gamma shockwaves and debris.
   for(let j=0;j<3;j++){const q=(phase*.32+j/3)%1;ring(30+q*230,`rgba(141,255,92,${(1-q)*.6})`,6*(1-q)+1)}for(let j=0;j<16;j++){const a=j*2.399,rr=80+((phase*35+j*19)%190);spark(Math.cos(a)*rr,Math.sin(a)*rr,2+(j%3),'#b7ff7c')}break;
  case 4: // Loki: emerald illusion ribbons orbiting the crown.
   for(let j=0;j<3;j++){ctx.save();ctx.rotate(phase*(j%2?-.35:.48)+j*2.1);ctx.beginPath();ctx.ellipse(0,0,180-j*30,50+j*18,0,.2,Math.PI*1.7);ctx.strokeStyle=['#7efc8c','#b4f371','#e8cb70'][j];ctx.lineWidth=3;ctx.shadowColor='#75ff86';ctx.shadowBlur=23;ctx.stroke();ctx.restore()}ctx.shadowBlur=0;break;
  case 5: // Strange: mystic portal with rotating spokes.
   for(let j=0;j<4;j++)ring(90+j*26,j%2?'#f6a95f':'#e9bdff',2,phase*(j%2?-1:1),phase*(j%2?-1:1)+Math.PI*1.72);ctx.save();ctx.rotate(phase*.35);for(let j=0;j<12;j++){const a=j*Math.PI/6;line([[Math.cos(a)*98,Math.sin(a)*98],[Math.cos(a)*176,Math.sin(a)*176]],'#ffc27e',1,12)}ctx.restore();break;
  case 6: // Spider-Man: web spokes and catching strands.
   for(let j=0;j<12;j++){const a=j*Math.PI/6+phase*.08;line([[0,0],[Math.cos(a)*208,Math.sin(a)*208]],'#b7ddff',1.5,7)}for(let r=45;r<210;r+=42){ctx.beginPath();for(let j=0;j<=12;j++){const a=j*Math.PI/6+phase*.08;const q=r+(j%2?9:0);j?ctx.lineTo(Math.cos(a)*q,Math.sin(a)*q):ctx.moveTo(Math.cos(a)*q,Math.sin(a)*q)}ctx.closePath();ctx.strokeStyle='#8dbfff99';ctx.lineWidth=1.4;ctx.stroke()}break;
  case 7: // Black Panther: purple kinetic absorption and three claws.
   for(let j=0;j<3;j++){const q=(phase*.5+j/3)%1;ring(80+q*145,`rgba(181,115,255,${(1-q)*.48})`,3)}for(let j=-1;j<=1;j++){const dy=j*36;line([[85,-95+dy],[180,-10+dy],[240,5+dy]],'#bd7cff',4,26)}break;
  case 8: // Vibranium: crystalline hexagons with pulsing core.
   for(let j=0;j<4;j++){ctx.save();ctx.rotate(phase*.17+j*.24);ctx.beginPath();for(let n=0;n<=6;n++){const a=n*Math.PI/3;const r=65+j*34;n?ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r):ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.strokeStyle=j%2?'#9c7cff':'#75efff';ctx.lineWidth=2.5;ctx.shadowColor='#7cf2ff';ctx.shadowBlur=15;ctx.stroke();ctx.restore()}spark(0,0,12+Math.sin(phase*4)*4,'#dcffff');break;
  case 9: // Witcher: sword sweep and blue Aard sign.
   ctx.save();ctx.rotate(Math.sin(phase*1.7)*.15);line([[-175,170],[0,-155],[155,-245]],'#d6edff',6,28);line([[-82,-45],[95,46]],'#c9f2ff',4,20);ctx.restore();for(let j=0;j<3;j++){const q=(phase*.37+j/3)%1;ring(50+q*160,`rgba(185,230,255,${(1-q)*.36})`,2,Math.PI*.1,Math.PI*.95)}break;
 }
 ctx.restore();
}
