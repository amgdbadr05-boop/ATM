/* Navigation. Back = previous screen. Home (or finishing) ends the session. */
const FLOWS={book:['id','otp','dept','doctor','slot','review'],register:['register','otp','dept','doctor','slot','review'],checkin:['id','otp','appts'],reprint:['id','otp','appts']};
const FINAL=new Set(['ticket']);
function startFlow(f){flow=f;patient=null;sel={};list=[];ticket=null}
function go(id,subKey,push=true){
  if(id==='home')endSession();else if(push&&cur!==id)hist.push(cur);
  cur=id;
  const inFlow=FLOWS[flow]&&FLOWS[flow].includes(id);
  curSub=subKey||(inFlow?'sub_'+flow:$('#'+id).dataset.subT)||'subHome';
  $$('.screen').forEach(s=>s.classList.toggle('active',s.id===id));
  $('#sub').textContent=t(curSub);
  $('#navbar').hidden=id==='home';
  if(id==='id')idPad.clear();if(id==='otp')otpPad.clear();
  if(FINAL.has(id))hist=['home'];                      // back from a finished ticket goes home, never re-submits
  renderDynamic();
  const h=$('#'+id+' h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}
  scrollTo({top:0});resetIdle();
}
function goBack(){go(hist.pop()||'home',null,false)}
