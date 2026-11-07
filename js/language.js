/* Language switching (EN / AR with RTL) */
const t=k=>(T[lang]&&T[lang][k])||T.en[k]||k;
function setLang(l){
  lang=l;
  document.documentElement.lang=l;
  document.documentElement.dir=l==='ar'?'rtl':'ltr';
  $$('[data-t]').forEach(e=>{e.textContent=t(e.dataset.t)});
  $('#langBtn').textContent=(l==='ar'?'العربية':'English')+' ▾';
  $('#langMenu').classList.remove('open');
  $('#sub').textContent=t(curSub);
  renderDynamic();
}
