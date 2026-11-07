/* Transient UI state. Patient and appointment data are persisted by api.js in localStorage. */
let lang='en', cur='home', curSub='subHome', hist=[], sid=0;
let flow=null, patient=null, sel={}, list=[], ticket=null, dirSel=null, busy=false;
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
