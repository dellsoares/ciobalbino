'use strict';
/* ================================================================
 * CONFIGURAÇÕES QUE VOCÊ PODE ALTERAR SEM MEXER NO RESTO DO SITE
 * ================================================================ */
const SITE_CONFIG = {
  // Playlist publicada na seção de músicas; URL também presente no HTML.
  spotifyPlaylist: 'https://open.spotify.com/playlist/2mIjDdqF05UR5wZkpZ9Y6H?si=vgKpvegySnS_VXifX1J1XQ',
  // Vídeo vertical de destaque do YouTube (ID):
  heroVideo: 'Nay-JKsupvg',
  bookingWhatsApp: '5531994828741',
  liveClips: [
    { video: 'NmB6MWJaHL0', title: 'A energia' },
    { video: 'd_DBWETpuSM', title: 'O encontro' },
    { video: '4Acr3ZLBUcM', title: 'A voz' },
    { video: '0-2QeFGoD6s', title: 'O palco' }
  ]
};

const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
document.documentElement.classList.add('js');
qs('#current-year').textContent = new Date().getFullYear();

// Menu responsivo.
const menuToggle = qs('#menu-toggle');
const mobileNav = qs('#mobile-nav');
function closeMenu(){mobileNav.hidden=true;menuToggle.setAttribute('aria-expanded','false');menuToggle.setAttribute('aria-label','Abrir menu');}
menuToggle.addEventListener('click',()=>{
  mobileNav.hidden=!mobileNav.hidden;
  const opened = !mobileNav.hidden;
  menuToggle.setAttribute('aria-expanded',String(opened));
  menuToggle.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');
});
qsa('#mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

// Indicador de avanço e aparecimento suave de blocos.
let scrollQueued=false;
function updateProgress(){
  const max=document.documentElement.scrollHeight-innerHeight;
  qs('#scroll-progress').style.width=(max>0?(scrollY/max)*100:0)+'%';scrollQueued=false;
}
window.addEventListener('scroll',()=>{if(!scrollQueued){requestAnimationFrame(updateProgress);scrollQueued=true;}},{passive:true});
updateProgress();
if('IntersectionObserver' in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.06});
 qsa('.reveal').forEach(el=>observer.observe(el));
}else{qsa('.reveal').forEach(el=>el.classList.add('is-visible'));}

// A playlist oficial está incorporada diretamente no HTML. Não depende de JS.

// Vídeos: modal acionado pelo usuário; YouTube não carrega no primeiro paint.
const modal=qs('#video-modal');const modalFrame=qs('#modal-frame');const modalTitle=qs('#modal-title');
const closeModalButton=qs('#close-modal');let beforeOpen=null;
function cleanYoutubeId(input){const str=String(input||'');return /^[A-Za-z0-9_-]{11}$/.test(str)?str:null;}
function openVideo(id,title,vertical=false){
 id=cleanYoutubeId(id);if(!id)return;
 beforeOpen=document.activeElement;
 modalTitle.textContent=title||'Ció Balbino / Vídeo';
 modal.hidden=false;modal.classList.toggle('is-portrait',vertical);document.body.classList.add('modal-open');
 const iframe=document.createElement('iframe');
 iframe.src=`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
 iframe.title=title||'Vídeo de Ció Balbino';
 iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;
 iframe.referrerPolicy='strict-origin-when-cross-origin';
 modalFrame.replaceChildren(iframe);closeModalButton.focus();
}
function closeModal(){modal.hidden=true;modal.classList.remove('is-portrait');modalFrame.replaceChildren();document.body.classList.remove('modal-open');beforeOpen?.focus();}
// O YouTube é 16:9, mas o conteúdo importante está no centro (story).
// Não editamos nem baixamos o vídeo: recortamos somente as laterais via CSS.
const heroStart = qs('#hero-video-start');
const heroPlayer = qs('#hero-inline-player');
const heroFrameCrop = qs('#hero-iframe-crop');
heroStart.addEventListener('click',()=>{
  heroStart.hidden=true;
  heroPlayer.hidden=false;
  const iframe=document.createElement('iframe');
  iframe.src=`https://www.youtube-nocookie.com/embed/${SITE_CONFIG.heroVideo}?autoplay=1&rel=0&playsinline=1`;
  iframe.title='Ció Balbino / Vídeo principal em enquadramento vertical';
  iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen=true;
  iframe.referrerPolicy='strict-origin-when-cross-origin';
  heroFrameCrop.replaceChildren(iframe);
});
qs('#hero-close-player').addEventListener('click',()=>{
  heroPlayer.hidden=true;heroFrameCrop.replaceChildren();heroStart.hidden=false;heroStart.focus();
});
closeModalButton.addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&!modal.hidden)closeModal();});

// Playlist editorial de videoclipes: a seleção atualiza a capa e reproduz sob demanda.
let selectedVideoId='apNPnAftig0';let selectedVideoName='Astronauta';
qsa('.video-choice').forEach(button=>button.addEventListener('click',()=>{
 selectedVideoId=button.dataset.id;selectedVideoName=button.dataset.name;
 qsa('.video-choice').forEach(b=>{const current=b===button;b.classList.toggle('active',current);b.setAttribute('aria-pressed',String(current));});
 qs('#feature-video-image').src=`https://i.ytimg.com/vi/${selectedVideoId}/hqdefault.jpg`;
 qs('#feature-video-image').alt=`Capa do vídeo ${selectedVideoName}`;
 qs('#feature-video-title').textContent=selectedVideoName;
 qs('#feature-video-button').setAttribute('aria-label',`Assistir ${selectedVideoName}`);
}));
qs('#feature-video-button').addEventListener('click',()=>openVideo(selectedVideoId,`Ció Balbino / ${selectedVideoName}`));

// Galeria horizontal com navegação (mouse, toque, teclado, botões).
const track=qs('#gallery-track');
function scrollGallery(direction){
 const item=track.querySelector('.gallery-item');
 const gap=parseFloat(getComputedStyle(track).gap)||18;
 track.scrollBy({left:direction*(item.getBoundingClientRect().width+gap),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
qs('#gallery-prev').addEventListener('click',()=>scrollGallery(-1));
qs('#gallery-next').addEventListener('click',()=>scrollGallery(1));


// Reprodutores Shorts 9:16: ativados dentro do próprio cartão.
const shortPosters=new Map(qsa('.short-shell').map(shell=>[shell,shell.querySelector('.short-play')]));
qsa('[data-live-video]').forEach(button=>{
  button.addEventListener('click',()=>{
    const id=cleanYoutubeId(button.dataset.liveVideo);
    if(!id) return;
    const shell=button.closest('.short-shell');
    if(!shell) return;
    const iframe=document.createElement('iframe');
    iframe.src=`https://www.youtube.com/embed/${encodeURIComponent(id)}?autoplay=1&playsinline=1&rel=0`;
    iframe.title=`Short de Ció Balbino / ${button.dataset.liveTitle || 'Ao vivo'}`;
    iframe.loading='eager';
    iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen=true;
    iframe.referrerPolicy='strict-origin-when-cross-origin';
    iframe.setAttribute('aria-label','Vídeo do YouTube no cartão vertical');
    // Só um vídeo em reprodução por vez, evita áudio simultâneo.
    qsa('.short-shell iframe').forEach(old=>{
      const oldCard=old.closest('.short-shell');
      if(oldCard && oldCard !== shell){
        const poster=shortPosters.get(oldCard);
        if(poster) oldCard.replaceChildren(poster);
      }
    });
    shell.replaceChildren(iframe);
  });
});

// Linha do tempo: interação por clique, setas e rotação suave enquanto visível.
const timeline=qs('#timeline-interactive');
const timelineYears=Object.keys(JSON.parse(timeline.dataset.years)).map(Number).sort((a,b)=>a-b);
const showsByYear=JSON.parse(timeline.dataset.years);
let activeTimelineIndex=0;
let timelineTimer=null;
let timelineInteracted=false;
let timelineInView=false;
const timelineButtons=qsa('.timeline-year-button');
function showTimelineYear(index,manual=false){
  activeTimelineIndex=(index+timelineYears.length)%timelineYears.length;
  const year=timelineYears[activeTimelineIndex];
  const events=showsByYear[year] || [];
  timelineButtons.forEach(btn=>{
    const active=Number(btn.dataset.year)===year;
    btn.classList.toggle('is-active',active);
    btn.setAttribute('aria-selected',String(active));
    btn.tabIndex=active?0:-1;
  });
  qs('#timeline-panel-year').textContent=String(year);
  qs('#timeline-panel').setAttribute('aria-labelledby','year-'+year);
  qs('#timeline-events').replaceChildren(...events.map(name=>{
    const li=document.createElement('li');
    const star=document.createElement('span');star.className='timeline-mark';star.textContent='✳';
    li.append(star,document.createTextNode(name));return li;
  }));
  const panel=qs('#timeline-panel');
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches){
    panel.style.animation='none';void panel.offsetWidth;panel.style.animation='';
  }
  qs('#timeline-counter').textContent=`${String(activeTimelineIndex+1).padStart(2,'0')} / 07 • ${year}`;
  if(manual){timelineInteracted=true;stopTimelineAuto();}
}
function stopTimelineAuto(){if(timelineTimer){clearInterval(timelineTimer);timelineTimer=null;}}
function startTimelineAuto(){
  if(timelineTimer || timelineInteracted || !timelineInView || matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  timelineTimer=setInterval(()=>showTimelineYear(activeTimelineIndex+1),5800);
}
timelineButtons.forEach(btn=>{
 btn.addEventListener('click',()=>showTimelineYear(timelineYears.indexOf(Number(btn.dataset.year)),true));
 btn.addEventListener('keydown',e=>{
   const i=timelineYears.indexOf(Number(btn.dataset.year));
   if(e.key==='ArrowRight'||e.key==='ArrowLeft'){
      e.preventDefault(); const next=(i+(e.key==='ArrowRight'?1:-1)+timelineYears.length)%timelineYears.length;
      showTimelineYear(next,true);timelineButtons[next].focus();
   }
 });
});
qs('#timeline-prev').addEventListener('click',()=>showTimelineYear(activeTimelineIndex-1,true));
qs('#timeline-next').addEventListener('click',()=>showTimelineYear(activeTimelineIndex+1,true));
if('IntersectionObserver' in window){
 const tObs=new IntersectionObserver(entries=>{
   timelineInView=entries[0].isIntersecting;
   if(timelineInView)startTimelineAuto();else stopTimelineAuto();
 },{threshold:.28});
 tObs.observe(timeline);
}
timeline.addEventListener('mouseenter',stopTimelineAuto);
timeline.addEventListener('mouseleave',startTimelineAuto);
timeline.addEventListener('focusin',stopTimelineAuto);
timeline.addEventListener('focusout',()=>setTimeout(startTimelineAuto,0));

// WhatsApp: replica a mecânica do site de referência (oculta durante o scroll).
const whatsappBtn=qs('#whatsapp-float');
let whatsappScrollTimer;
window.addEventListener('scroll',()=>{
 whatsappBtn.classList.add('is-scrolling');
 clearTimeout(whatsappScrollTimer);
 whatsappScrollTimer=setTimeout(()=>whatsappBtn.classList.remove('is-scrolling'),250);
},{passive:true});

// Contato: mantém a configuração em um único local.
const whatsappText=encodeURIComponent('Olá, gostaria de saber sobre a contratação de um show do Ció Balbino.');
qs('#booking-whatsapp').href=`https://wa.me/${SITE_CONFIG.bookingWhatsApp}?text=${whatsappText}`;
whatsappBtn.href=`https://wa.me/${SITE_CONFIG.bookingWhatsApp}?text=${whatsappText}`;
