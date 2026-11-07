/* DEMO reference data. Replace with API data later. Names/rooms are placeholders, not real hospital records. */
const HOSPITAL={en:'ST. JUDE HEALTH CENTER',ar:'مركز سانت جود الصحي'};
const nm=o=>o[lang]||o.en;
const mkDocs=(p,names)=>names.map((n,i)=>({id:p+(i+1),name:{en:'Dr. Demo '+n[0],ar:'د. تجريبي '+n[1]}}));
const DEPTS=[
 {id:'cardio',prefix:'C',name:{en:'Cardiology',ar:'القلب'},floor:2,room:'205',elev:'B',doctors:mkDocs('c',[['A','أ'],['B','ب']])},
 {id:'derma',prefix:'D',name:{en:'Dermatology',ar:'الجلدية'},floor:1,room:'112',elev:'A',doctors:mkDocs('d',[['C','ج'],['D','د']])},
 {id:'ortho',prefix:'O',name:{en:'Orthopedics',ar:'العظام'},floor:3,room:'310',elev:'B',doctors:mkDocs('o',[['E','هـ'],['F','و']])},
 {id:'neuro',prefix:'N',name:{en:'Neurology',ar:'الأعصاب'},floor:3,room:'322',elev:'B',doctors:mkDocs('n',[['G','ز']])},
 {id:'peds',prefix:'P',name:{en:'Pediatrics',ar:'الأطفال'},floor:1,room:'130',elev:'A',doctors:mkDocs('p',[['H','ح'],['I','ط']])},
 {id:'ent',prefix:'E',name:{en:'ENT',ar:'الأنف والأذن والحنجرة'},floor:2,room:'214',elev:'B',doctors:mkDocs('e',[['J','ي']])}
];
const BUILDING={en:'Main Building',ar:'المبنى الرئيسي'};
const SERVICES=[
 {id:'outp',service:true,name:{en:'Outpatient',ar:'العيادات الخارجية'},floor:1,room:'101'},
 {id:'lab',service:true,name:{en:'Laboratory',ar:'المختبر'},floor:1,room:'120'},
 {id:'pharm',service:true,name:{en:'Pharmacy',ar:'الصيدلية'},floor:1,room:'140'}
];
const DIRECTORY=DEPTS.concat(SERVICES);
const deptById=id=>DIRECTORY.find(d=>d.id===id);
function routeSteps(d){
  const s=[t('s_lobby')];
  if(d.elev)s.push(t('s_elev').replace('{e}',d.elev));
  s.push(t('s_floor').replace('{f}',d.floor),t('s_recep').replace('{d}',nm(d.name)),t('s_room').replace('{r}',d.room));
  return s;
}
