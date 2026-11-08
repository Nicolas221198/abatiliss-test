const carousel=document.querySelector('#hero-carousel');
if(carousel){
 const slides=[['industrie-illustration.jpg','Bâtiments industriels'],['bureau.jpg','Bureaux'],['facade.jpg','Façades']];
 const image=carousel.querySelector('img'),label=carousel.querySelector('.slide-label'),dots=carousel.querySelector('.dots');
 const motion=matchMedia('(prefers-reduced-motion: reduce)');let index=0,paused=motion.matches,hover=false,timer;
 slides.forEach(([src,title],i)=>{const img=new Image();img.src=src;const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Afficher ${title}`);b.addEventListener('click',()=>{paused=true;show(i);sync()});dots.append(b)});
 function show(i){index=(i+slides.length)%slides.length;image.src=slides[index][0];if(!motion.matches)image.animate([{opacity:.3},{opacity:1}],{duration:550,easing:'ease-out'});image.alt=slides[index][1]+' — photo d’illustration, pas un chantier Abatiliss';label.textContent=`${index+1} / ${slides.length} · ${slides[index][1]}`;[...dots.children].forEach((b,j)=>b.setAttribute('aria-pressed',String(j===index)))}
 function sync(){clearInterval(timer);if(!paused&&!hover&&!document.hidden)timer=setInterval(()=>show(index+1),3000)}
 carousel.querySelector('[data-action="prev"]').addEventListener('click',()=>{paused=true;show(index-1);sync()});
 carousel.querySelector('[data-action="next"]').addEventListener('click',()=>{paused=true;show(index+1);sync()});
 carousel.addEventListener('mouseenter',()=>{hover=true;sync()});carousel.addEventListener('mouseleave',()=>{hover=false;sync()});
 carousel.addEventListener('focusin',()=>{paused=true;sync()});
 carousel.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();paused=true;show(index+(e.key==='ArrowRight'?1:-1));sync()}});
 motion.addEventListener('change',()=>{if(motion.matches)paused=true;sync()});document.addEventListener('visibilitychange',sync);
 show(0);sync();
}