const {JSDOM,VirtualConsole}=require('jsdom');const path=require('path');
const errors=[];const vc=new VirtualConsole();vc.on('jsdomError',e=>errors.push(e.message));
let pass=0,fail=0;const ok=(c,n)=>{c?pass++:fail++;console.log((c?'PASS ':'FAIL ')+n)};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 const dom=await JSDOM.fromFile(path.resolve(__dirname,'../index.html'),{runScripts:'dangerously',resources:'usable',pretendToBeVisual:true,virtualConsole:vc,
  beforeParse(w){w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','')};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open')};w.scrollTo=()=>{};w.print=()=>{w.__printed=true}}});
 const w=dom.window,d=w.document;await sleep(600);
 const ev=s=>w.eval(s),$=s=>d.querySelector(s),click=s=>$(s).click(),active=()=>$('.screen.active').id;
 const key=(pad,n)=>[...d.querySelectorAll(pad+' .key')].find(b=>b.textContent===String(n)).click();
 const type=(pad,s)=>[...s].forEach(c=>key(pad,c));
 const dlgOpen=()=>$('#dlg').open, closeDlg=()=>click('#dlgClose');
 const tiles=s=>[...d.querySelectorAll(s+' .tile')];
 const identify=async(flowSel,id)=>{click(flowSel);type('#idKeys',id);click('#idNext');await sleep(500);type('#otpKeys','1234');click('#otpNext');await sleep(600)};

 ok($('#navbar').hidden,'no back bar on home');
 click('[data-flow="book"]');ok(active()==='id'&&!$('#navbar').hidden,'back/home bar visible on inner screens');
 click('#backBtn');ok(active()==='home','Back button returns to home');
 // ---- BOOKING
 await identify('[data-flow="book"]','123456');ok(active()==='dept','ID + OTP -> departments');
 ok(tiles('#dept').length===6,'departments rendered from data');
 tiles('#dept')[0].click();ok(active()==='doctor','dept -> doctors');
 click('#backBtn');ok(active()==='dept','Back from doctors -> departments');
 tiles('#dept')[0].click();tiles('#doctor')[0].click();await sleep(400);ok(active()==='slot','doctor -> slots');
 const free=[...d.querySelectorAll('#slotGrid .slot')].filter(b=>!b.disabled);ok(free.length>0,'free slots listed, taken ones disabled');
 const doc=ev('sel.doc'),date=ev('sel.date'),time=ev('sel.slots.filter(s=>s.free)[1].time');
 free[1].click();ok(active()==='review','slot -> review');
 click('#bookBtn');await sleep(600);ok(active()==='ticket','booked -> ticket');
 ok(!!w.localStorage.getItem('meditouch.atm.demo.db.v1'),'patient and appointment data saved in localStorage');
 const isolated=await ev(`Api.appointments({key:'different-patient'})`);ok(isolated.list.length===0,'appointments are isolated per patient');
 const tk=$('#ticketBox').textContent;
 ok(/APT-\d{4}-\d{6}/.test(tk)&&/Cardiology/.test(tk)&&/Room/.test(tk)&&/D\*{4} P\*{4}/.test(tk),'ticket has appt no, dept, room, masked name');
 ok(!!$('#ticketBox .tk-bar svg rect'),'barcode rendered');ok(!/Queue No/.test(tk),'no queue number before check-in');
 click('#tkPrint');ok(ev('!!window.__printed'),'print dialog requested');closeDlg();
 click('#backBtn');ok(active()==='home','Back from final ticket goes home (no re-booking)');
 // ---- double booking
 const r2=await ev(`Api.book({key:'x'},'cardio','${doc}','${date}','${time}')`);ok(!r2.ok&&r2.code==='SLOT_TAKEN','same slot cannot be booked twice');
 // ---- CHECK-IN
 await identify('[data-flow="checkin"]','123456');ok(active()==='appts'&&tiles('#appts').length>=1,'appointments listed');
 const todays=tiles('#appts').find(t=>/Cardiology/.test(t.textContent));todays.click();await sleep(500);
 ok(active()==='ticket'&&/C-001/.test($('#ticketBox').textContent),'check-in gives queue C-001');
 click('[data-go="home"].btn');
 await identify('[data-flow="checkin"]','123456');tiles('#appts').find(t=>/Checked in/.test(t.textContent)).click();await sleep(500);
 ok(/C-001/.test($('#ticketBox').textContent)&&/already/i.test($('#tkSub').textContent),'repeat check-in reuses ticket (no duplicate)');
 click('#homeBtn');
 // ---- REPRINT
 await identify('[data-flow="reprint"]','123456');tiles('#appts')[0].click();ok(active()==='ticket','reprint shows ticket');click('#homeBtn');
 // ---- REGISTER
 click('[data-flow="book"]');type('#idKeys','000999');click('#idNext');await sleep(500);ok(active()==='nf','unknown ID -> not found screen');
 click('#nf .btn.fill');ok(active()==='register','-> register form');
 click('#regForm button[type=submit]');ok(!$('#regErr').hidden,'empty form rejected');
 $('#rName').value='Test Person';$('#rId').value='000999';$('#rDob').value='1990-01-01';$('#rPhone').value='0501234567';$('#rConsent').checked=true;
 $('#regForm').dispatchEvent(new w.Event('submit',{cancelable:true}));await sleep(500);ok(active()==='otp','valid registration -> OTP');
 const fresh=await ev(`Api.appointments(patient)`);ok(fresh.list.length===0,'newly registered patient has no appointment until booking');
 type('#otpKeys','1111');click('#otpNext');await sleep(400);ok(dlgOpen()&&active()==='otp','wrong OTP rejected');closeDlg();
 click('#homeBtn');
 const dup=await ev(`Api.register({id:'123456',name:'X Y Z'})`);ok(!dup.ok&&dup.code==='DUPLICATE','duplicate registration blocked');
 // ---- DIRECTORY + LANGUAGE
 click('[data-go="dir"]');tiles('#dir')[0].click();ok(d.querySelectorAll('#dirDetail li').length>=3,'directions shown');
 d.querySelector('[data-lang="ar"]').click();ok(d.documentElement.dir==='rtl'&&/المبنى/.test($('#dirDetail').textContent),'Arabic RTL re-renders dynamic content');
 click('#homeBtn');ok(d.documentElement.lang==='en'&&active()==='home','home resets language');
 // ---- SESSION
 ev('CONFIG.idleMs=1500;CONFIG.warnMs=1000');click('[data-flow="book"]');type('#idKeys','12');click('#help');
 await sleep(700);ok($('#sessDlg').open,'idle warning appears (over another dialog)');
 await sleep(1400);ok(active()==='home'&&ev('idPad.value')===''&&![...d.querySelectorAll('dialog')].some(x=>x.open),'expiry wipes input, dialogs, returns home');
 ok(errors.length===0,'no script errors '+JSON.stringify(errors));
 console.log(`\n${pass} passed, ${fail} failed`);process.exit(fail?1:0);
})();
