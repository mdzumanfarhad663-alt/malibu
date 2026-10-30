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
const header=document.querySelector('.site-header');
if(document.body.classList.contains('home-page')&&header){
  const syncHeader=()=>header.classList.toggle('scrolled',window.scrollY>60);
  syncHeader();window.addEventListener('scroll',syncHeader,{passive:true});
}
const booking=document.querySelector('[data-booking-form]');
if(booking){
  const inDate=booking.elements.checkin,outDate=booking.elements.checkout;
  const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
  inDate.min=today.toISOString().slice(0,10);outDate.min=inDate.min;
  inDate.addEventListener('change',()=>{outDate.min=inDate.value;if(outDate.value&&outDate.value<=inDate.value)outDate.value='' });
  booking.addEventListener('submit',e=>{e.preventDefault();if(!booking.reportValidity())return;if(outDate.value<=inDate.value){outDate.setCustomValidity('Check-out must be after check-in.');outDate.reportValidity();return}outDate.setCustomValidity('');window.open('https://hotels.cloudbeds.com/en/reservation/ivsspZ?currency=usd','_blank','noopener,noreferrer')});
  outDate.addEventListener('change',()=>outDate.setCustomValidity(''));
}
document.querySelectorAll('[data-demo-form]').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;form.querySelector('.form-status').textContent=form.dataset.success;form.reset()}));
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  const revealItems=document.querySelectorAll('.feature-layout > *, .section-head, .strip-card, .extra-card, .location-content > *, .rewards-grid > *, .detail-room, .split > *, .photo-grid img, .guide-card, .form-layout > *, .faq-list details, .site-footer .footer-grid > div');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.06,rootMargin:'0px 0px -15px 0px'});
  revealItems.forEach((item,index)=>{item.style.setProperty('--reveal-delay',`${(index%3)*65}ms`);item.classList.add('reveal-ready');observer.observe(item)});
}
