const toggle=document.querySelector('.menu-toggle');
const menu=document.querySelector('#mobile-menu');
if(toggle&&menu){
  const header=document.querySelector('.site-header');
  const close=()=>{toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open menu');menu.hidden=true;document.body.classList.remove('menu-open');header?.classList.remove('menu-active')};
  toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close menu':'Open menu');menu.hidden=!open;document.body.classList.toggle('menu-open',open);header?.classList.toggle('menu-active',open)});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  window.addEventListener('resize',()=>{if(window.innerWidth>960)close()});
}
const siteHeader=document.querySelector('.site-header');
const mobileBook=document.querySelector('.mobile-book-bar');
const pageHero=document.querySelector('.hero, .inner-hero');
const siteFooter=document.querySelector('.site-footer');
const syncScrollUI=()=>{
  siteHeader?.classList.toggle('scrolled',window.scrollY>80);
  if(mobileBook&&pageHero&&siteFooter){
    const pastHero=window.scrollY>pageHero.offsetTop+pageHero.offsetHeight-60;
    const beforeFooter=siteFooter.getBoundingClientRect().top>window.innerHeight-30;
    mobileBook.classList.toggle('is-visible',window.innerWidth<=620&&pastHero&&beforeFooter);
  }
};
syncScrollUI();
window.addEventListener('scroll',syncScrollUI,{passive:true});
window.addEventListener('resize',syncScrollUI);
const booking=document.querySelector('[data-booking-form]');
if(booking){
  const inDate=booking.elements.checkin,outDate=booking.elements.checkout;
  const parseUS=value=>{
    const match=/^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
    if(!match)return null;
    const month=Number(match[1]),day=Number(match[2]),year=Number(match[3]);
    const date=new Date(year,month-1,day);
    return date.getFullYear()===year&&date.getMonth()===month-1&&date.getDate()===day?date:null;
  };
  for(const field of [inDate,outDate]){
    field.addEventListener('input',()=>{
      const digits=field.value.replace(/\D/g,'').slice(0,8);
      field.value=[digits.slice(0,2),digits.slice(2,4),digits.slice(4)].filter(Boolean).join('/');
      field.setCustomValidity('');
    });
  }
  booking.addEventListener('submit',event=>{
    event.preventDefault();
    if(!booking.reportValidity())return;
    const checkin=parseUS(inDate.value),checkout=parseUS(outDate.value);
    const today=new Date();today.setHours(0,0,0,0);
    if(!checkin||checkin<today){inDate.setCustomValidity('Enter a valid future check-in date in MM/DD/YYYY format.');inDate.reportValidity();return}
    if(!checkout||checkout<=checkin){outDate.setCustomValidity('Check-out must be after check-in. Use MM/DD/YYYY.');outDate.reportValidity();return}
    window.open('https://hotels.cloudbeds.com/en/reservation/ivsspZ?currency=usd','_blank','noopener,noreferrer');
  });
}
const roomScroller=document.querySelector('.rooms-scroller');
document.querySelector('[data-room-prev]')?.addEventListener('click',()=>roomScroller?.scrollBy({left:-(roomScroller.querySelector('.strip-card')?.getBoundingClientRect().width||320)-20,behavior:'smooth'}));
document.querySelector('[data-room-next]')?.addEventListener('click',()=>roomScroller?.scrollBy({left:(roomScroller.querySelector('.strip-card')?.getBoundingClientRect().width||320)+20,behavior:'smooth'}));
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;form.querySelector('.form-status').textContent=form.dataset.success;form.reset()}));
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
const rewardNumbers=document.querySelectorAll('[data-count]');
if(rewardNumbers.length&&'IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    observer.unobserve(entry.target);entry.target.classList.add('is-counted');
    const start=performance.now(),numbers=entry.target.querySelectorAll('[data-count]');
    const frame=now=>{
      const progress=Math.min((now-start)/1000,1);
      const eased=1-Math.pow(1-progress,3);
      numbers.forEach(number=>number.textContent=`${Math.round(Number(number.dataset.count)*eased)}%`);
      if(progress<1)requestAnimationFrame(frame);
    };
    numbers.forEach(number=>number.textContent='0%');
    requestAnimationFrame(frame);
  }),{threshold:.3});
  observer.observe(document.querySelector('.tier-badges'));
}
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealItems=document.querySelectorAll('.feature-layout > *, .section-head, .strip-card, .extra-card, .location-content > *, .rewards-grid > *, .detail-room, .split > *, .photo-grid img, .guide-card, .form-layout > *, .faq-list details, .site-footer .footer-grid > div');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.06,rootMargin:'0px 0px -15px 0px'});
  revealItems.forEach((item,index)=>{item.style.setProperty('--reveal-delay',`${(index%3)*65}ms`);item.classList.add('reveal-ready');observer.observe(item)});
}
document.querySelectorAll('[data-us-date]').forEach(field=>field.addEventListener('input',()=>{
  const digits=field.value.replace(/\D/g,'').slice(0,8);
  field.value=[digits.slice(0,2),digits.slice(2,4),digits.slice(4)].filter(Boolean).join('/');
}));
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const progress=document.createElement('div');
  progress.className='scroll-progress';progress.setAttribute('aria-hidden','true');
  document.body.prepend(progress);
  const syncProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`};
  syncProgress();window.addEventListener('scroll',syncProgress,{passive:true});
  const addFx=(section,count,make)=>{
    if(!section)return;
    const layer=document.createElement('div');layer.className='fx-layer';layer.setAttribute('aria-hidden','true');
    for(let i=0;i<count;i++){
      const el=make();
      el.style.left=`${Math.random()*100}%`;
      el.style.setProperty('--drift',`${(Math.random()-.5)*80}px`);
      el.style.animationDuration=`${8+Math.random()*8}s`;
      el.style.animationDelay=`${-Math.random()*12}s`;
      layer.append(el);
    }
    section.prepend(layer);
  };
  addFx(document.querySelector('.pool-block'),14,()=>{const b=document.createElement('span');b.className='fx-bubble';const size=10+Math.random()*26;b.style.width=b.style.height=`${size}px`;return b});
  addFx(document.querySelector('.pelican-block'),9,()=>{const n=document.createElement('span');n.className='fx-note';n.textContent=Math.random()>.5?'♪':'♫';return n});
}
