/* Kiosk session: inactivity warning -> countdown -> full wipe. Also wipes when finished. */
let idleT,cdT;
const clearTimers=()=>{clearTimeout(idleT);clearInterval(cdT)};
function resetIdle(){
  if($('#sessDlg').open)return;
  clearTimers();if(cur==='home')return;
  idleT=setTimeout(showWarn,Math.max(CONFIG.idleMs-CONFIG.warnMs,0));
}
function showWarn(){
  let s=Math.ceil(CONFIG.warnMs/1000);$('#sessCount').textContent=s;
  if(!$('#sessDlg').open)$('#sessDlg').showModal();
  cdT=setInterval(()=>{s--;$('#sessCount').textContent=s;if(s<=0)go('home')},1000);
}
function keepSession(){$('#sessDlg').close();clearTimers();resetIdle()}
function endSession(){
  clearTimers();sid++;busy=false;
  flow=null;patient=null;sel={};list=[];ticket=null;dirSel=null;hist=[];
  $$('dialog').forEach(d=>{if(d.open)d.close()});
  if(typeof idPad!=='undefined'){idPad.clear();otpPad.clear()}
  $('#regForm').reset();$('#regErr').hidden=true;
  if(lang!==CONFIG.defaultLang)setLang(CONFIG.defaultLang);
}
['click','touchstart','keydown','input'].forEach(ev=>addEventListener(ev,resetIdle,{passive:true,capture:true}));
