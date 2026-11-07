/* Screen flows: identify -> verify -> book / check-in / reprint, and registration. Each async step ignores
   its result if the session ended meanwhile (sid guard) and prevents double taps (busy). */
const idPad=Keypad('#idDisplay','#idKeys',CONFIG.idMax);
const otpPad=Keypad('#otpDisplay','#otpKeys',CONFIG.otpLen);

async function guarded(btn,fn){
  if(busy)return;busy=true;btn&&(btn.disabled=true);const mine=sid;
  try{await fn(mine)}finally{if(mine===sid){busy=false;btn&&(btn.disabled=false)}else if(btn)btn.disabled=false}
}
const fail=r=>msg(t(ERR[r.code]||'errServer'));

$('#idNext').onclick=()=>{
  if(!validId(idPad.value)){msg(t('idShort'));return}
  guarded($('#idNext'),async mine=>{
    const r=await Api.lookup(idPad.value);if(mine!==sid)return;
    idPad.clear();                                       // sensitive input cleared right after use
    if(!r.ok){r.code==='NOT_FOUND'?go('nf'):fail(r);return}
    patient=r.patient;go('otp');
  });
};
$('#otpNext').onclick=()=>{
  if(otpPad.value.length!==CONFIG.otpLen){msg(t('errOtp'));return}
  guarded($('#otpNext'),async mine=>{
    const r=await Api.verifyOtp(otpPad.value);if(mine!==sid)return;
    otpPad.clear();if(!r.ok){fail(r);return}
    hist=['home'];                                       // verified: back from here goes home, not to the code screen
    if(flow==='checkin'||flow==='reprint'){
      const a=await Api.appointments(patient);if(mine!==sid)return;
      list=a.list;go('appts',null,false);
    }else go('dept',null,false);
  });
};
async function pickAppt(a){
  if(flow==='reprint'){showTicket(a,a.checkedIn?'in':'book',false);return}
  guarded(null,async mine=>{
    const r=await Api.checkIn(a);if(mine!==sid)return;
    if(!r.ok){fail(r);return}
    showTicket(r.appt,'in',r.already);
  });
}
function showTicket(a,kind,already){ticket={appt:a,kind,already};go('ticket')}

$('#bookBtn').onclick=()=>guarded($('#bookBtn'),async mine=>{
  const r=await Api.book(patient,sel.dept,sel.doc,sel.date,sel.time);if(mine!==sid)return;
  if(!r.ok){fail(r);if(r.code==='SLOT_TAKEN'){sel.time=null;loadSlots();go('slot',null,false)}return}
  showTicket(r.appt,'book',false);
});

/* Registration */
$('#regForm').addEventListener('submit',e=>{
  e.preventDefault();
  const f={name:$('#rName').value.trim(),id:$('#rId').value.trim(),dob:$('#rDob').value,phone:$('#rPhone').value.trim(),lang:$('#rLang').value};
  const dob=new Date(f.dob),okDob=f.dob&&dob<new Date()&&dob.getFullYear()>1900;
  const bad={rName:f.name.length<3,rId:!validId(f.id),rDob:!okDob,rPhone:!/^\+?\d{8,15}$/.test(f.phone),rConsent:!$('#rConsent').checked};
  Object.entries(bad).forEach(([k,v])=>{const n=$('#'+k);(n.closest('.field')||n.closest('.check')).classList.toggle('err',v)});
  const anyBad=Object.values(bad).some(Boolean);$('#regErr').hidden=!anyBad;if(anyBad)return;
  guarded(e.submitter,async mine=>{
    const r=await Api.register(f);if(mine!==sid)return;
    $('#rId').value='';
    if(!r.ok){fail(r);return}
    patient=r.patient;go('otp');
  });
});
