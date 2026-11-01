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
const mobileBook=document.querySelector('.mobile-book-bar');
const pageHero=document.querySelector('.hero, .inner-hero');
const siteFooter=document.querySelector('.site-footer');
const syncScrollUI=()=>{
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
  const revealItems=document.querySelectorAll('.feature-layout > *, .section-head, .strip-card, .extra-card, .location-content > *, .rewards-grid > *, .detail-room, .split > *, .photo-grid img, .guide-card, .form-layout > *, .faq-list details');
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}
  }),{threshold:.06,rootMargin:'0px 0px -15px 0px'});
  revealItems.forEach((item,index)=>{item.style.setProperty('--reveal-delay',`${(index%3)*65}ms`);item.classList.add('reveal-ready');observer.observe(item)});
}
document.querySelectorAll('[data-us-date]').forEach(field=>field.addEventListener('input',()=>{
  const digits=field.value.replace(/\D/g,'').slice(0,8);
  field.value=[digits.slice(0,2),digits.slice(2,4),digits.slice(4)].filter(Boolean).join('/');
}));
// Native date pickers: no past dates, departure after arrival
const pickers=[...document.querySelectorAll('[data-date-picker]')];
if(pickers.length){
  const today=new Date();today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
  pickers.forEach(field=>{field.min=today.toISOString().slice(0,10);field.addEventListener('click',()=>{try{field.showPicker()}catch(e){}})});
  const [arrive,depart]=pickers;
  if(depart)arrive.addEventListener('change',()=>{depart.min=arrive.value||arrive.min;if(depart.value&&depart.value<=arrive.value)depart.value=''});
}
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
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
  addFx(document.querySelector('.pelican-block'),9,()=>{const n=document.createElement('span');n.className='fx-note';n.textContent=Math.random()>.5?'♪':'♫';return n});
  addFx(document.querySelector('.pool-block'),14,()=>{const b=document.createElement('span');b.className='fx-bubble';const size=10+Math.random()*26;b.style.width=b.style.height=`${size}px`;return b});
}
// Booking bar date range calendar and guests dropdown
const searchForm=document.querySelector('[data-booking-form]');
if(searchForm){
  const inField=searchForm.elements.checkin,outField=searchForm.elements.checkout;
  const pad=n=>String(n).padStart(2,'0');
  const fmt=d=>`${pad(d.getMonth()+1)}/${pad(d.getDate())}/${d.getFullYear()}`;
  const same=(a,b)=>a&&b&&a.toDateString()===b.toDateString();
  const today=new Date();today.setHours(0,0,0,0);
  const monthNames=['January','February','March','April','May','June','July','August','September','October','November','December'];
  let start=null,end=null,picking='in',view=new Date(today.getFullYear(),today.getMonth(),1);
  let guestTrigger=null,guestPanel=null;
  const cal=document.createElement('div');
  cal.className='picker-panel calendar-panel';cal.setAttribute('role','dialog');cal.setAttribute('aria-label','Choose your dates');
  searchForm.append(cal);
  const closeAll=()=>{
    cal.classList.remove('is-open');
    guestPanel?.classList.remove('is-open');
    guestTrigger?.setAttribute('aria-expanded','false');
    searchForm.querySelectorAll('.is-active').forEach(el=>el.classList.remove('is-active'));
  };
  const monthHTML=base=>{
    const first=new Date(base.getFullYear(),base.getMonth(),1),days=new Date(base.getFullYear(),base.getMonth()+1,0).getDate();
    let html=`<div class="cal-month"><h4>${monthNames[base.getMonth()]} ${base.getFullYear()}</h4><div class="cal-grid">`+['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>`<span class="dow">${d}</span>`).join('');
    html+='<span></span>'.repeat(first.getDay());
    for(let d=1;d<=days;d++){
      const date=new Date(base.getFullYear(),base.getMonth(),d),cls=['cal-day'];
      if(same(date,today))cls.push('today');
      if(same(date,start))cls.push('is-start');
      if(same(date,end))cls.push('is-end');
      if(start&&end&&date>start&&date<end)cls.push('in-range');
      const off=date<today||(picking==='out'&&start&&date<=start);
      html+=`<button type="button" class="${cls.join(' ')}" data-date="${date.getTime()}" aria-label="${monthNames[date.getMonth()]} ${d}, ${date.getFullYear()}"${off?' disabled':''}${same(date,start)||same(date,end)?' aria-pressed="true"':''}>${d}</button>`;
    }
    return html+'</div></div>';
  };
  const render=()=>{
    const next=new Date(view.getFullYear(),view.getMonth()+1,1);
    const atStart=view.getFullYear()===today.getFullYear()&&view.getMonth()===today.getMonth();
    cal.innerHTML=`<div class="cal-head"><button type="button" class="cal-nav" data-cal="-1" aria-label="Previous month"${atStart?' disabled':''}>←</button><strong>${picking==='in'?'Select check-in':'Select check-out'}</strong><button type="button" class="cal-nav" data-cal="1" aria-label="Next month">→</button></div><div class="cal-months">${monthHTML(view)}${monthHTML(next)}</div><div class="cal-foot"><span>${start?fmt(start):'Check-in'} → ${end?fmt(end):'Check-out'}</span><button type="button" data-cal-clear>Clear dates</button></div>`;
  };
  const markActive=field=>{searchForm.querySelectorAll('.is-active').forEach(el=>el.classList.remove('is-active'));field.closest('label').classList.add('is-active')};
  const openCal=which=>{
    closeAll();
    picking=which==='out'&&start?'out':'in';
    markActive(picking==='in'?inField:outField);
    const focus=start||today;
    view=new Date(focus.getFullYear(),focus.getMonth(),1);
    render();cal.classList.add('is-open');
  };
  for(const [field,which] of [[inField,'in'],[outField,'out']]){
    field.readOnly=true;field.setAttribute('aria-haspopup','dialog');
    field.addEventListener('click',e=>{e.stopPropagation();openCal(which)});
    field.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '||e.key==='ArrowDown'){e.preventDefault();openCal(which)}});
  }
  cal.addEventListener('click',e=>{
    e.stopPropagation();
    const nav=e.target.closest('[data-cal]');
    if(nav){view=new Date(view.getFullYear(),view.getMonth()+Number(nav.dataset.cal),1);render();return}
    if(e.target.closest('[data-cal-clear]')){start=end=null;inField.value=outField.value='';picking='in';markActive(inField);render();return}
    const day=e.target.closest('.cal-day');
    if(!day||day.disabled)return;
    const date=new Date(Number(day.dataset.date));
    if(picking==='in'){
      start=date;end=null;inField.value=fmt(date);outField.value='';inField.setCustomValidity('');
      picking='out';markActive(outField);render();
    }else{
      end=date;outField.value=fmt(date);outField.setCustomValidity('');
      closeAll();guestTrigger?.focus();
    }
  });
  const select=searchForm.elements.guests;
  if(select){
    select.classList.add('guest-select');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
    guestTrigger=document.createElement('button');
    guestTrigger.type='button';guestTrigger.className='guest-trigger';
    guestTrigger.setAttribute('aria-haspopup','listbox');guestTrigger.setAttribute('aria-expanded','false');
    const label=()=>`<span>${select.value}</span><svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>`;
    guestTrigger.innerHTML=label();
    guestPanel=document.createElement('ul');
    guestPanel.className='picker-panel guest-panel';guestPanel.setAttribute('role','listbox');guestPanel.setAttribute('aria-label','Guests');
    [...select.options].forEach((opt,i)=>{const li=document.createElement('li');li.setAttribute('role','option');li.dataset.index=i;li.textContent=opt.text;guestPanel.append(li)});
    const host=select.closest('label');
    host.append(guestTrigger,guestPanel);
    let focusIndex=select.selectedIndex;
    const sync=()=>guestPanel.querySelectorAll('li').forEach((li,i)=>{li.setAttribute('aria-selected',String(i===select.selectedIndex));li.classList.toggle('is-focus',i===focusIndex)});
    const choose=i=>{select.selectedIndex=i;guestTrigger.innerHTML=label();closeAll();guestTrigger.focus()};
    const openGuests=()=>{closeAll();focusIndex=select.selectedIndex;sync();host.classList.add('is-active');guestPanel.classList.add('is-open');guestTrigger.setAttribute('aria-expanded','true')};
    guestTrigger.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();guestPanel.classList.contains('is-open')?closeAll():openGuests()});
    guestTrigger.addEventListener('keydown',e=>{
      const open=guestPanel.classList.contains('is-open');
      if(e.key==='ArrowDown'||e.key==='ArrowUp'){
        e.preventDefault();
        if(!open){openGuests();return}
        focusIndex=(focusIndex+(e.key==='ArrowDown'?1:-1)+select.options.length)%select.options.length;sync();
      }else if((e.key==='Enter'||e.key===' ')&&open){e.preventDefault();choose(focusIndex)}
    });
    guestPanel.addEventListener('click',e=>{e.stopPropagation();const li=e.target.closest('li');if(li)choose(Number(li.dataset.index))});
  }
  document.addEventListener('click',e=>{if(!searchForm.contains(e.target))closeAll()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
}
// Room strip dots: one per card, synced to scroll position
const roomStrip=document.querySelector('.rooms-scroller');
if(roomStrip){
  const cards=[...roomStrip.querySelectorAll('.strip-card')];
  const dots=document.createElement('div');
  dots.className='room-dots';dots.setAttribute('aria-label','Choose a room');
  cards.forEach((card,i)=>{
    const dot=document.createElement('button');
    dot.type='button';dot.setAttribute('aria-label',`Show ${card.querySelector('h3').textContent}`);
    dot.addEventListener('click',()=>roomStrip.scrollTo({left:card.offsetLeft-roomStrip.offsetLeft,behavior:'smooth'}));
    dots.append(dot);
  });
  roomStrip.after(dots);
  const syncDots=()=>{
    const maxScroll=roomStrip.scrollWidth-roomStrip.clientWidth;
    let active=cards.findIndex(card=>card.offsetLeft-roomStrip.offsetLeft>=roomStrip.scrollLeft-10);
    if(roomStrip.scrollLeft>=maxScroll-10)active=cards.length-1;
    [...dots.children].forEach((dot,i)=>dot.setAttribute('aria-current',String(i===active)));
  };
  syncDots();
  roomStrip.addEventListener('scroll',syncDots,{passive:true});
  window.addEventListener('resize',syncDots);
}
// Gentle hero parallax (transform only, off under reduced motion)
const heroPhoto=document.querySelector('.hero-image');
if(heroPhoto&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  // Clip the moving photo inside the hero so it never paints over the next section
  const clip=document.createElement('div');
  clip.style.cssText='position:absolute;inset:0;z-index:-2;overflow:hidden';
  heroPhoto.before(clip);clip.append(heroPhoto);
  heroPhoto.style.zIndex='auto';
  let ticking=false;
  const drift=()=>{heroPhoto.style.transform=`translate3d(0,${Math.min(scrollY,900)*0.18}px,0) scale(1.06)`;ticking=false};
  drift();
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(drift)}},{passive:true});
}
