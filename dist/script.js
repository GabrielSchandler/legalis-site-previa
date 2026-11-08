const header=document.querySelector('.site-header');
const menuButton=document.querySelector('.menu-toggle');
const mobileNav=document.querySelector('.mobile-nav');
const progress=document.querySelector('.scroll-progress');
const comparison=document.querySelector('.comparison');
const compareRange=document.querySelector('#compare-range');

function updateScroll(){
  header.classList.toggle('scrolled',window.scrollY>24);
  const max=document.documentElement.scrollHeight-window.innerHeight;
  progress.style.width=`${max>0?(window.scrollY/max)*100:0}%`;
}

function closeMenu(){
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','Abrir menu');
  mobileNav.hidden=true;
  header.classList.remove('menu-active');
  document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')==='true';
  if(open){closeMenu();return}
  menuButton.setAttribute('aria-expanded','true');
  menuButton.setAttribute('aria-label','Fechar menu');
  mobileNav.hidden=false;
  header.classList.add('menu-active');
  document.body.classList.add('menu-open');
  mobileNav.querySelector('a')?.focus();
});
mobileNav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus()}});
window.addEventListener('resize',()=>{if(window.innerWidth>980&&menuButton.getAttribute('aria-expanded')==='true')closeMenu()});
window.addEventListener('scroll',updateScroll,{passive:true});
updateScroll();

/* Títulos: cada linha (separada por <br>) ganha sua própria máscara */
document.querySelectorAll('.section-title,.final-cta h2,.gallery-heading h3').forEach(title=>{
  const parts=title.innerHTML.split(/<br\s*\/?>/i);
  title.innerHTML=parts.map((part,i)=>`<span class="tl" style="--li:${i}"><span>${part.trim()}</span></span>`).join('');
});
/* Listas entram em sequência (60–90ms); seções isoladas entram de uma vez */
document.querySelectorAll('.service-grid,.gallery-grid,.method-steps,.blog-grid').forEach(list=>{
  [...list.querySelectorAll(':scope>.reveal')].forEach((item,i)=>item.style.setProperty('--d',`${Math.min(i,5)*80}ms`));
});
function settle(el){
  const delay=parseFloat(getComputedStyle(el).getPropertyValue('--d'))||0;
  setTimeout(()=>{el.style.setProperty('--d','0s');el.classList.add('revealed')},delay+1300);
}
if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');settle(entry.target);observer.unobserve(entry.target)}})
  },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
  /* A galeria abre como cortina: o item começa sem área visível, então quem dispara é a grade */
  document.querySelectorAll('.reveal').forEach(el=>{if(!el.closest('.gallery-grid'))observer.observe(el)});
  const grid=document.querySelector('.gallery-grid');
  if(grid){const gio=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;gio.disconnect();grid.querySelectorAll('.reveal').forEach(el=>{el.classList.add('visible');settle(el)})},{threshold:.15});gio.observe(grid)}
}else{
  document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
}

let compareTouched=false;
const setSplit=v=>{comparison.style.setProperty('--split',`${v}%`);compareRange.value=v};
compareRange.addEventListener('input',()=>{compareTouched=true;setSplit(compareRange.value)});
compareRange.addEventListener('pointerdown',()=>{compareTouched=true;comparison.classList.add('is-dragging')});
window.addEventListener('pointerup',()=>comparison.classList.remove('is-dragging'));
document.querySelector('#year').textContent=new Date().getFullYear();

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

const reviewsMarquee=document.querySelector('.reviews-marquee');
const reviewsTrack=document.querySelector('.reviews-marquee-track');
const reviewsGroup=document.querySelector('.reviews-group');
const reviewsMotion=document.querySelector('.reviews-motion');
const reviewsDuplicate=reviewsGroup.cloneNode(true);
reviewsDuplicate.setAttribute('aria-hidden','true');
reviewsDuplicate.inert=true;
reviewsTrack.append(reviewsDuplicate);
reviewsMarquee.classList.add('is-ready');
let reviewsPaused=false;
function syncReviewsMotion(){
  reviewsMarquee.classList.toggle('is-paused',reviewsPaused||document.hidden);
  reviewsMarquee.classList.toggle('is-reduced-motion',reduceMotion.matches);
  reviewsMotion.disabled=reduceMotion.matches;
  reviewsMotion.setAttribute('aria-pressed',String(reviewsPaused));
  reviewsMotion.setAttribute('aria-label',reduceMotion.matches?'Movimento reduzido ativado':reviewsPaused?'Retomar movimento das avaliações':'Pausar movimento das avaliações');
  reviewsMotion.innerHTML=reviewsPaused?'<svg class="ico" viewBox="0 0 20 20" aria-hidden="true" style="fill:currentColor"><path d="M7 5.5v9l7.5-4.5z"/></svg> Retomar':'<svg class="ico" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg> Pausar';
}
reviewsMotion.addEventListener('click',()=>{reviewsPaused=!reviewsPaused;syncReviewsMotion()});
document.addEventListener('visibilitychange',syncReviewsMotion);
reduceMotion.addEventListener('change',syncReviewsMotion);
syncReviewsMotion();

const serviceNames={
  polimento:'Polimento técnico',
  vitrificacao:'Vitrificação',
  higienizacao:'Higienização interna',
  lavagem:'Lavagem técnica',
  farois:'Restauração de faróis',
  micro:'Micro pintura'
};
const serviceGalleries={
  polimento:[
    ['polimento-vertical.webp','Polimento em andamento','Profissional da Legalis realizando polimento técnico'],
    ['equipe-legalis.webp','Cuidado em cada etapa','Equipe da Legalis trabalhando no acabamento de um veículo'],
    ['polimento-tecnico.webp','Técnica e precisão','Profissional da Legalis trabalhando na pintura de um carro'],
    ['ilustracao-polimento.webp','Polimento de precisão','Imagem ilustrativa de aplicação de politriz na pintura',true]
  ],
  vitrificacao:[
    ['veiculo-creta.webp','Pintura valorizada','Veículo atendido pela Legalis com pintura brilhante'],
    ['veiculo-meriva.webp','Acabamento valorizado','Veículo atendido pela Legalis após tratamento'],
    ['ilustracao-vitrificacao.webp','Aplicação de proteção','Imagem ilustrativa de aplicação de revestimento cerâmico',true]
  ],
  higienizacao:[
    ['higienizacao-interna.webp','Higienização interna','Bancos em processo de higienização na Legalis'],
    ['detalhamento-interior.webp','Detalhes do interior','Cuidado dos detalhes no interior do veículo'],
    ['ilustracao-higienizacao.webp','Limpeza dos bancos','Imagem ilustrativa de higienização de banco com extratora',true]
  ],
  lavagem:[
    ['lavagem-tecnica.webp','Lavagem técnica','Lavagem técnica de veículo atendido pela Legalis'],
    ['detalhe-grade.webp','Atenção aos detalhes','Limpeza da grade de um veículo'],
    ['ilustracao-lavagem.webp','Cuidado na lavagem','Imagem ilustrativa de lavagem com luva de microfibra',true]
  ],
  farois:[
    ['farol-depois.webp','Farol restaurado','Farol após tratamento realizado pela Legalis'],
    ['farol-antes.webp','Antes do tratamento','Farol antes da restauração realizada pela Legalis'],
    ['ilustracao-farois.webp','Restauração em andamento','Imagem ilustrativa de polimento de um farol',true]
  ],
  micro:[
    ['micro-pintura.webp','Micro pintura','Trabalho de micro pintura da Legalis'],
    ['ilustracao-micro-pintura.webp','Retoque localizado','Imagem ilustrativa de retoque localizado na pintura',true]
  ]
};

const servicePreviewStates=[];
const previewObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{const state=servicePreviewStates.find(item=>item.button===entry.target);if(state)state.visible=entry.isIntersecting})
},{rootMargin:'80px'}):null;
document.querySelectorAll('.service-gallery-trigger').forEach(button=>{
  const photos=serviceGalleries[button.dataset.galleryService];
  const first=button.querySelector('img');
  first.classList.add('service-slide','is-current');
  first.alt='';
  const second=document.createElement('img');
  second.className='service-slide';
  second.src=`assets/${photos[1][0]}`;
  second.alt='';
  second.setAttribute('aria-hidden','true');
  second.decoding='async';
  second.loading='lazy';
  button.insertBefore(second,first.nextSibling);
  const count=document.createElement('span');
  count.className='service-photo-count';
  count.setAttribute('aria-hidden','true');
  count.textContent=`1 de ${photos.length}`;
  button.append(count);
  const source=document.createElement('span');
  source.className='service-photo-source';
  source.textContent='Acervo Legalis';
  button.append(source);
  button.dataset.previewFile=photos[0][0];
  const state={button,photos,layers:[first,second],active:0,index:0,count,source,visible:!previewObserver,busy:false};
  servicePreviewStates.push(state);
  previewObserver?.observe(button);
});
function advanceServicePreview(state){
  if(state.busy)return;
  const nextIndex=(state.index+1)%state.photos.length;
  const next=state.photos[nextIndex];
  state.busy=true;
  const preload=new Image();
  preload.onload=()=>{
    const nextLayer=state.layers[1-state.active];
    nextLayer.src=`assets/${next[0]}`;
    requestAnimationFrame(()=>{
      nextLayer.classList.add('is-current');
      state.layers[state.active].classList.remove('is-current');
      state.active=1-state.active;
      state.index=nextIndex;
      state.button.dataset.previewFile=next[0];
      state.count.textContent=`${nextIndex+1} de ${state.photos.length}`;
      state.source.textContent=next[3]?'Imagem ilustrativa':'Acervo Legalis';
      state.busy=false;
    });
  };
  preload.onerror=()=>{state.busy=false};
  preload.src=`assets/${next[0]}`;
}
setInterval(()=>{
  if(reduceMotion.matches||document.hidden)return;
  servicePreviewStates.forEach(state=>{
    if(state.visible&&!state.button.matches(':hover,:focus-visible'))advanceServicePreview(state);
  });
},4200);

const galleryDialog=document.querySelector('.gallery-dialog');
const galleryStage=document.querySelector('.gallery-dialog-stage');
const galleryImage=document.querySelector('.gallery-dialog-image');
const galleryBackdrop=document.querySelector('.gallery-dialog-backdrop');
const galleryTitle=document.querySelector('#gallery-dialog-title');
const galleryCategory=document.querySelector('.gallery-dialog-category');
const galleryDescription=document.querySelector('.gallery-dialog-description');
const galleryCount=document.querySelector('.gallery-dialog-count');
const galleryProgress=document.querySelector('.gallery-dialog-progress span');
const galleryThumbnails=document.querySelector('.gallery-thumbnails');
const galleryAutoplayToggle=document.querySelector('.gallery-autoplay-toggle');
const galleryBottomTitle=document.querySelector('.gallery-bottom-copy strong');
let galleryPhotos=[];
let galleryIndex=0;
let galleryTimer;
let galleryOpener=null;
let galleryPaused=false;
let galleryService='polimento';

function buildGalleryThumbnails(){
  galleryThumbnails.replaceChildren();
  galleryThumbnails.setAttribute('aria-label',`Fotos de ${serviceNames[galleryService]}`);
  galleryPhotos.forEach(([file,title],index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.className='gallery-thumb';
    button.setAttribute('aria-label',`Ver foto ${index+1} de ${serviceNames[galleryService]}: ${title}`);
    const img=document.createElement('img');
    img.src=`assets/${file}`;
    img.alt='';
    img.loading='lazy';
    button.append(img);
    button.addEventListener('click',()=>{showPhoto(index);restartGalleryTimer()});
    galleryThumbnails.append(button);
  });
}
function showPhoto(index){
  galleryIndex=(index+galleryPhotos.length)%galleryPhotos.length;
  const [file,title,alt,illustrative]=galleryPhotos[galleryIndex];
  galleryImage.src=`assets/${file}`;
  galleryBackdrop.src=`assets/${file}`;
  galleryImage.alt=alt;
  galleryTitle.textContent=title;
  galleryCategory.textContent=serviceNames[galleryService].toUpperCase();
  galleryDescription.textContent=illustrative?'Imagem ilustrativa gerada para apresentar o serviço':'Fotografia do acervo da Legalis';
  galleryDescription.classList.toggle('is-illustrative',Boolean(illustrative));
  galleryCount.textContent=`${galleryIndex+1} de ${galleryPhotos.length}`;
  galleryProgress.style.width=`${100/galleryPhotos.length}%`;
  galleryProgress.style.transform=`translateX(${galleryIndex*100}%)`;
  [...galleryThumbnails.children].forEach((thumb,i)=>thumb.setAttribute('aria-current',String(i===galleryIndex)));
  const activeThumb=galleryThumbnails.children[galleryIndex];
  galleryThumbnails.scrollTo({left:activeThumb.offsetLeft-galleryThumbnails.clientWidth/2+activeThumb.clientWidth/2,behavior:reduceMotion.matches?'instant':'smooth'});
  galleryStage.classList.remove('photo-enter');
  void galleryStage.offsetWidth;
  galleryStage.classList.add('photo-enter');
  const next=new Image();
  next.src=`assets/${galleryPhotos[(galleryIndex+1)%galleryPhotos.length][0]}`;
}
function stopGalleryTimer(){clearInterval(galleryTimer)}
function startGalleryTimer(){
  stopGalleryTimer();
  if(reduceMotion.matches||document.hidden||!galleryDialog.open||galleryPaused)return;
  galleryTimer=setInterval(()=>showPhoto(galleryIndex+1),6500);
}
function restartGalleryTimer(){stopGalleryTimer();startGalleryTimer()}
function syncGalleryAutoplay(){
  galleryAutoplayToggle.disabled=reduceMotion.matches;
  galleryAutoplayToggle.setAttribute('aria-pressed',String(galleryPaused));
  galleryAutoplayToggle.setAttribute('aria-label',reduceMotion.matches?'Movimento reduzido ativado':galleryPaused?'Retomar apresentação de fotos':'Pausar apresentação de fotos');
  galleryAutoplayToggle.innerHTML=galleryPaused?'<svg class="ico" viewBox="0 0 20 20" aria-hidden="true" style="fill:currentColor"><path d="M7 5.5v9l7.5-4.5z"/></svg>':'<svg class="ico" viewBox="0 0 20 20" aria-hidden="true"><path d="M7 5v10M13 5v10"/></svg>';
}
function openGallery(event){
  galleryOpener=event.currentTarget;
  galleryService=galleryOpener.dataset.galleryService;
  galleryPhotos=serviceGalleries[galleryService];
  const file=galleryOpener.dataset.galleryFile||galleryOpener.dataset.previewFile;
  const start=galleryPhotos.findIndex(photo=>photo[0]===file);
  galleryBottomTitle.textContent=serviceNames[galleryService].toUpperCase();
  buildGalleryThumbnails();
  galleryDialog.showModal();
  galleryPaused=false;
  syncGalleryAutoplay();
  showPhoto(start>=0?start:0);
  galleryDialog.querySelector('.gallery-close').focus();
  startGalleryTimer();
}
document.querySelectorAll('[data-gallery-service]').forEach(button=>button.addEventListener('click',openGallery));
document.querySelector('.gallery-close').addEventListener('click',()=>galleryDialog.close());
document.querySelector('.gallery-prev').addEventListener('click',()=>{showPhoto(galleryIndex-1);restartGalleryTimer()});
document.querySelector('.gallery-next').addEventListener('click',()=>{showPhoto(galleryIndex+1);restartGalleryTimer()});
galleryAutoplayToggle.addEventListener('click',()=>{galleryPaused=!galleryPaused;syncGalleryAutoplay();restartGalleryTimer()});
galleryDialog.addEventListener('close',()=>{stopGalleryTimer();galleryOpener?.focus()});
galleryDialog.addEventListener('click',event=>{if(event.target===galleryDialog)galleryDialog.close()});
let touchStartX=0;
galleryStage.addEventListener('touchstart',event=>{touchStartX=event.changedTouches[0].screenX},{passive:true});
galleryStage.addEventListener('touchend',event=>{
  const distance=event.changedTouches[0].screenX-touchStartX;
  if(Math.abs(distance)>55){showPhoto(galleryIndex+(distance<0?1:-1));restartGalleryTimer()}
},{passive:true});
document.addEventListener('keydown',event=>{
  if(!galleryDialog.open)return;
  if(event.key==='ArrowRight'){event.preventDefault();showPhoto(galleryIndex+1);restartGalleryTimer()}
  if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(galleryIndex-1);restartGalleryTimer()}
});
document.addEventListener('visibilitychange',()=>document.hidden?stopGalleryTimer():startGalleryTimer());
reduceMotion.addEventListener('change',()=>{syncGalleryAutoplay();reduceMotion.matches?stopGalleryTimer():startGalleryTimer()});
syncGalleryAutoplay();

/* =====================================================================
   2026 · O estúdio acende: poeira na luz, faixa de brilho e rolagem
   ===================================================================== */
const heroSection=document.querySelector('.hero');
const heroMedia=document.querySelector('.hero-media');
const heroContent=document.querySelector('.hero-content');
const calm=reduceMotion.matches;

/* Depois da entrada, a faixa de luz volta a passar de tempos em tempos (pausa fora da tela) */
if(heroSection&&!calm){
  setTimeout(()=>heroSection.classList.add('is-awake'),4200);
  if('IntersectionObserver' in window){
    new IntersectionObserver(([e])=>heroSection.classList.toggle('is-offscreen',!e.isIntersecting)).observe(heroSection);
  }
}

/* Poeira dourada suspensa na luz do estúdio — mais densa à direita, onde está a luz */
const dust=document.querySelector('.hero-dust');
if(dust&&!calm){
  const ctx=dust.getContext('2d');
  const sprite=document.createElement('canvas');sprite.width=sprite.height=32;
  const sg=sprite.getContext('2d');const g=sg.createRadialGradient(16,16,0,16,16,16);
  g.addColorStop(0,'rgba(255,240,205,1)');g.addColorStop(.25,'rgba(240,205,140,.55)');g.addColorStop(1,'rgba(217,184,120,0)');
  sg.fillStyle=g;sg.fillRect(0,0,32,32);
  let W=0,H=0,dpr=1,motes=[],running=false,visible=true,last=0;
  const make=(fresh)=>{const bias=Math.pow(Math.random(),.55);return{x:(.25+bias*.75)*W,y:fresh?Math.random()*H:H+20,r:(.6+Math.random()*2)*dpr,vx:(.02+Math.random()*.08)*dpr,vy:-(.05+Math.random()*.18)*dpr,a:.15+Math.random()*.55,t:Math.random()*6.28,s:.4+Math.random()*1.2}};
  const size=()=>{dpr=Math.min(window.devicePixelRatio||1,1.5);W=dust.width=Math.round(dust.clientWidth*dpr);H=dust.height=Math.round(dust.clientHeight*dpr);const n=window.innerWidth<650?28:Math.min(70,Math.round(window.innerWidth/22));motes=Array.from({length:n},()=>make(true))};
  const frame=(now)=>{
    if(!running)return;
    const dt=Math.min(48,now-(last||now));last=now;
    ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';
    for(const m of motes){
      m.t+=dt*.001*m.s;m.x+=m.vx*dt*.06+Math.sin(m.t)*.12*dpr;m.y+=m.vy*dt*.06;
      if(m.y<-20||m.x>W+20)Object.assign(m,make(false));
      const tw=.55+.45*Math.sin(m.t*2.3);const d=m.r*6;
      ctx.globalAlpha=m.a*tw;ctx.drawImage(sprite,m.x-d/2,m.y-d/2,d,d);
    }
    requestAnimationFrame(frame);
  };
  const start=()=>{if(running||!visible||document.hidden)return;running=true;last=0;requestAnimationFrame(frame)};
  const stop=()=>{running=false};
  size();
  setTimeout(()=>{dust.classList.add('is-on');start()},1200);
  window.addEventListener('resize',()=>{clearTimeout(dust._r);dust._r=setTimeout(size,200)});
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start());
  if('IntersectionObserver' in window)new IntersectionObserver(([e])=>{visible=e.isIntersecting;visible?start():stop()}).observe(heroSection);
}

/* Comparador: uma demonstração curta na primeira vez que aparece */
if(comparison&&!calm&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(([e])=>{
    if(!e.isIntersecting)return;io.disconnect();
    const keys=[[0,50],[650,72],[1450,30],[2150,50]];const t0=performance.now()+350;
    const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    const step=now=>{
      if(compareTouched)return;const t=now-t0;if(t<0){requestAnimationFrame(step);return}
      const i=keys.findIndex(([k],j)=>t>=k&&t<(keys[j+1]?.[0]??Infinity));
      if(i<0||i===keys.length-1){setSplit(50);return}
      const [a,va]=keys[i],[b,vb]=keys[i+1];setSplit((va+(vb-va)*ease((t-a)/(b-a))).toFixed(2));requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },{threshold:.55});
  io.observe(comparison);
}

/* Rolagem suave (Lenis) e o topo reagindo à rolagem (GSAP ScrollTrigger) */
window.addEventListener('load',()=>{
  if(calm)return;
  let lenis=null;
  if(window.Lenis){
    lenis=new window.Lenis({duration:1.1,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t))});window.lenis=lenis;
    if(window.gsap&&window.ScrollTrigger){lenis.on('scroll',window.ScrollTrigger.update);window.gsap.ticker.add(t=>lenis.raf(t*1000));window.gsap.ticker.lagSmoothing(0)}
    else{const raf=t=>{lenis.raf(t);requestAnimationFrame(raf)};requestAnimationFrame(raf)}
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',ev=>{
      const id=a.getAttribute('href');if(id.length<2)return;const target=document.querySelector(id);if(!target)return;
      ev.preventDefault();lenis.scrollTo(target,{offset:id==='#inicio'?0:-(header.offsetHeight+8),duration:1.3});
    }));
    new MutationObserver(()=>document.body.classList.contains('menu-open')?lenis.stop():lenis.start()).observe(document.body,{attributes:true,attributeFilter:['class']});
    mobileNav.setAttribute('data-lenis-prevent','');
  }
  if(!window.gsap||!window.ScrollTrigger||!heroSection)return;
  const {gsap,ScrollTrigger}=window;gsap.registerPlugin(ScrollTrigger);
  /* A foto desce mais devagar que o texto (camada decorativa, deslocamento pequeno) */
  ScrollTrigger.create({trigger:heroSection,start:'top top',end:'bottom top',scrub:true,onUpdate:self=>{
    const p=self.progress;heroMedia.style.translate=`0 ${(p*14).toFixed(2)}%`;heroMedia.style.scale=String(1+p*.06);
  }});
  gsap.to(heroContent,{yPercent:-14,opacity:.15,ease:'none',scrollTrigger:{trigger:heroSection,start:'top top',end:'bottom top',scrub:true}});
  ScrollTrigger.refresh();
});
