/* Reusable on-screen numeric keypad. Digits shown as dots only. */
function Keypad(displayId,keysId,max){
  let v='';const d=$(displayId),k=$(keysId);
  const draw=()=>{d.replaceChildren();for(let i=0;i<v.length;i++)d.append(document.createElement('i'));d.setAttribute('aria-label',v.length+' / '+max)};
  ['1','2','3','4','5','6','7','8','9','clear','0','del'].forEach(x=>{
    const b=el('button',{type:'button',class:'key'+(isNaN(x)?' sm':'')});
    if(x==='clear')b.dataset.t='clearAll';else if(x==='del')b.dataset.t='del';else b.textContent=x;
    b.onclick=()=>{if(x==='clear')v='';else if(x==='del')v=v.slice(0,-1);else if(v.length<max)v+=x;draw()};
    k.append(b)});
  draw();
  // Also accept a physical keyboard on desktop/laptop while this keypad screen is active.
  document.addEventListener('keydown',e=>{
    const screen=d.closest('.screen');
    if(!screen || !screen.classList.contains('active'))return;
    if(e.ctrlKey || e.metaKey || e.altKey)return;
    if(e.target && /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName))return;
    if(/^\\d$/.test(e.key)){
      e.preventDefault();
      if(v.length<max){v+=e.key;draw()}
    }else if(e.key==='Backspace'){
      e.preventDefault();v=v.slice(0,-1);draw();
    }else if(e.key==='Escape'){
      v='';draw();
    }
  });
  return{get value(){return v},clear(){v='';draw()}};
}
const validId=v=>/^\d+$/.test(v)&&v.length>=CONFIG.idMin&&v.length<=CONFIG.idMax;
