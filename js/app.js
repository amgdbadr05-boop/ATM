/* Entry point: global events. Loaded last. */
document.addEventListener('click',e=>{
  if(!e.target.closest('.lang'))$('#langMenu').classList.remove('open');
  const g=e.target.closest('[data-go]');
  if(g){if(g.dataset.flow)startFlow(g.dataset.flow);go(g.dataset.go);return}
  if(e.target.closest('[data-back]'))goBack();
});
$('#backBtn').onclick=goBack;
$('#langBtn').onclick=()=>{const o=$('#langMenu').classList.toggle('open');$('#langBtn').setAttribute('aria-expanded',o)};
$$('#langMenu button').forEach(b=>b.onclick=()=>setLang(b.dataset.lang));
$('#help').onclick=()=>msg(t('helpMsg'));
$('#tkPrint').onclick=()=>{window.print();msg(t('printMsg'))};   // can only confirm the request was sent, not the paper output
$('#tkDir').onclick=()=>{dirSel=ticket.appt.deptId;go('dir')};
$('#dlgClose').onclick=()=>$('#dlg').close();
$('#sessKeep').onclick=keepSession;
$('#sessEnd').onclick=()=>go('home');
$('#sessDlg').addEventListener('cancel',e=>e.preventDefault());
setLang(CONFIG.defaultLang);resetIdle();

/* Health information navigation */
document.addEventListener('click',e=>{
  const topic=e.target.closest('[data-health-topic]');
  if(topic){renderHealthTopic(topic.dataset.healthTopic);go('healthDetail');return}
});
$('#healthBack').onclick=goBack;
