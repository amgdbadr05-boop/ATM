/* Rendering helpers. All dynamic values go through textContent/append (no HTML injection). */
const el=(tag,attrs={},kids=[])=>{const e=document.createElement(tag);for(const k in attrs)e.setAttribute(k,attrs[k]);[].concat(kids).forEach(c=>e.append(c));return e};
const loc=()=>lang==='ar'?'ar-u-nu-latn':'en-GB';
const fmtDate=(d,long)=>new Intl.DateTimeFormat(loc(),long?{weekday:'long',day:'numeric',month:'long',year:'numeric'}:{weekday:'short',day:'numeric',month:'short'}).format(new Date(d+'T12:00:00'));
const fmtTime=(d,tm)=>new Intl.DateTimeFormat(loc(),{hour:'numeric',minute:'2-digit'}).format(new Date(d+'T'+tm+':00'));
const maskName=n=>n.trim().split(/\s+/).map(w=>w[0]+'****').join(' ');
const clear=s=>{const c=$(s);c.replaceChildren();return c};
const tile=(title,sub,fn,extra)=>{const b=el('button',{class:'tile',type:'button'},[el('b',{},title),el('span',{},sub)]);if(extra)b.append(extra);b.onclick=fn;return b};
const row=(l,v)=>el('div',{class:'trow'},[el('span',{},l),el('b',{},v)]);

function renderStep(){
  const f=FLOWS[flow],i=f?f.indexOf(cur):-1,s=$('#'+cur+' .step');
  if(i<0||!s)return;
  s.textContent=t('step').replace('{n}',i+1).replace('{m}',f.length);
  $('#'+cur+' .bar i').style.width=((i+1)/f.length*100)+'%';
}
function renderDepts(){const c=clear('#deptList');DEPTS.forEach(d=>c.append(tile(nm(d.name),t('tFloor')+' '+d.floor+' · '+t('tRoom')+' '+d.room,()=>{sel={dept:d.id};go('doctor')})))}
function renderDoctors(){const d=deptById(sel.dept),c=clear('#docList');if(!d)return;d.doctors.forEach(x=>c.append(tile(nm(x.name),nm(d.name),()=>{sel.doc=x.id;sel.date=Api.dates()[0];sel.time=null;loadSlots();go('slot')})))}
function renderSlots(){
  const chips=clear('#dateChips');
  Api.dates().forEach(d=>{const b=el('button',{class:'chip'+(d===sel.date?' on':''),type:'button',role:'tab','aria-selected':d===sel.date},fmtDate(d));b.onclick=()=>{sel.date=d;sel.time=null;loadSlots()};chips.append(b)});
  const g=clear('#slotGrid'),sl=sel.slots||[],any=sl.some(s=>s.free);
  sl.forEach(s=>{const b=el('button',{class:'slot',type:'button'},fmtTime(sel.date,s.time));b.disabled=!s.free;b.onclick=()=>{sel.time=s.time;go('review')};g.append(b)});
  $('#noSlots').hidden=any||!sl.length;
}
async function loadSlots(){const mine=sid,d=sel.date,doc=sel.doc;const s=await Api.slots(doc,d);if(mine!==sid||d!==sel.date)return;sel.slots=s;renderSlots()}
function renderReview(){
  const d=deptById(sel.dept),doc=d&&d.doctors.find(x=>x.id===sel.doc),b=clear('#revBox');if(!doc||!sel.time)return;
  b.append(row(t('lblDept'),nm(d.name)),row(t('lblDoc'),nm(doc.name)),row(t('lblDate'),fmtDate(sel.date,true)),row(t('lblTime'),fmtTime(sel.date,sel.time)),row(t('lblPlace'),nm(BUILDING)+' · '+t('tFloor')+' '+d.floor+' · '+t('tRoom')+' '+d.room));
}
function renderAppts(){
  const c=clear('#apptList');$('#noAppts').hidden=list.length>0;
  list.forEach(a=>{const d=deptById(a.deptId),doc=d.doctors.find(x=>x.id===a.docId);
    c.append(tile(nm(d.name)+' · '+fmtTime(a.date,a.time),fmtDate(a.date)+' · '+nm(doc.name),()=>pickAppt(a),el('em',{class:'badge'+(a.checkedIn?' in':'')},t(a.checkedIn?'stIn':'stBooked'))))});
}
function renderTicket(){
  if(!ticket)return;
  const a=ticket.appt,d=deptById(a.deptId),doc=d.doctors.find(x=>x.id===a.docId),b=clear('#ticketBox');
  $('#tkHead').textContent=t(ticket.kind==='in'?'tkIn':'tkBook');
  $('#tkSub').textContent=t(ticket.already?'already':ticket.kind==='in'?'ticketIn':'ticketBook');
  b.append(el('div',{class:'tk-head'},[el('b',{},'MEDITOUCH ATM'),el('span',{},nm(HOSPITAL))]),el('div',{class:'tk-title'},t(ticket.kind==='in'?'tkIn':'tkBook')),
    row(t('tApt'),a.id));
  if(a.queueNo)b.append(el('div',{class:'tk-queue'},[el('small',{},t('tQ')),el('strong',{},a.queueNo)]));
  const rep=fromMin(toMin(a.time)-CONFIG.reportByMin);
  b.append(row(t('tPat'),maskName(patient?patient.name:'Demo Patient')),row(t('lblDept'),nm(d.name)),row(t('lblDoc'),nm(doc.name)),
    row(t('tBld'),nm(BUILDING)),row(t('tFloor'),String(d.floor)),row(t('tRoom'),d.room),row(t('tDate'),fmtDate(a.date,true)),row(t('tTime'),fmtTime(a.date,a.time)),row(t('tReport'),fmtTime(a.date,rep)),
    el('div',{class:'tk-dir'},[el('b',{},t('tDir')),el('ol',{},routeSteps(d).map(s=>el('li',{},s)))]));
  const bc=el('div',{class:'tk-bar',dir:'ltr'});bc.innerHTML=code39(a.id);b.append(bc,el('small',{class:'tk-code'},a.id),el('p',{class:'tk-keep'},t('tKeep')));
}
function renderDir(){
  const c=clear('#dirList');DIRECTORY.forEach(d=>{const b=tile(nm(d.name),t('tFloor')+' '+d.floor+' · '+t('tRoom')+' '+d.room,()=>{dirSel=d.id;renderDir()});if(d.id===dirSel)b.classList.add('on');c.append(b)});
  const box=clear('#dirDetail'),d=dirSel&&deptById(dirSel);box.hidden=!d;if(!d)return;
  box.append(el('h3',{},nm(d.name)),row(t('tBld'),nm(BUILDING)),row(t('tFloor'),String(d.floor)),row(t('tRoom'),d.room),el('ol',{class:'route'},routeSteps(d).map(s=>el('li',{},s))));
}
const RENDER={dept:renderDepts,doctor:renderDoctors,slot:renderSlots,review:renderReview,appts:renderAppts,ticket:renderTicket,dir:renderDir};
function renderDynamic(){
  $('#demoBanner').hidden=CONFIG.mode!=='demo';
  $('#otpDemo').textContent=CONFIG.mode==='demo'?t('otpDemo').replace('{code}',CONFIG.demoOtp):'';
  renderStep();if(RENDER[cur])RENDER[cur]();
}
