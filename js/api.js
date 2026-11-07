/* API layer: persistent local demo adapter. Replace with a secured server API for production.
   Patient and appointment records are isolated by patient key and persisted in localStorage. */
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const pad=(n,l)=>String(n).padStart(l,'0');
const ymd=d=>d.getFullYear()+'-'+pad(d.getMonth()+1,2)+'-'+pad(d.getDate(),2);
const hash=s=>{let h=5381;for(const c of s)h=((h<<5)+h+c.charCodeAt(0))>>>0;return h.toString(36)};
const toMin=s=>{const [h,m]=s.split(':');return +h*60+ +m};
const fromMin=m=>pad(Math.floor(m/60),2)+':'+pad(m%60,2);

const DB_KEY='meditouch.atm.demo.db.v1';
function loadDb(){
  const empty=()=>({patients:new Map(),appts:[],taken:new Set(),queue:{},seq:0});
  try{
    const raw=localStorage.getItem(DB_KEY);if(!raw)return empty();
    const saved=JSON.parse(raw);
    return {
      patients:new Map(Array.isArray(saved.patients)?saved.patients:[]),
      appts:Array.isArray(saved.appts)?saved.appts:[],
      taken:new Set(Array.isArray(saved.taken)?saved.taken:[]),
      queue:saved.queue&&typeof saved.queue==='object'?saved.queue:{},
      seq:Number.isInteger(saved.seq)&&saved.seq>=0?saved.seq:0
    };
  }catch(err){console.warn('MediTouch local data could not be loaded:',err);return empty()}
}
const Db=loadDb();
function persistDb(){
  try{
    localStorage.setItem(DB_KEY,JSON.stringify({
      patients:[...Db.patients.entries()],appts:Db.appts,taken:[...Db.taken],queue:Db.queue,seq:Db.seq
    }));
    return true;
  }catch(err){console.error('MediTouch local data could not be saved:',err);return false}
}
function timeline(){const a=[];for(let m=toMin(CONFIG.slotStart);m<=toMin(CONFIG.slotEnd);m+=CONFIG.slotMinutes)a.push(fromMin(m));return a}
function slotFree(doc,date,time){
  if(Db.taken.has([doc,date,time].join('|')))return false;
  if(parseInt(hash(doc+date+time),36)%4===0)return false;
  if(date===ymd(new Date())){const n=new Date();if(toMin(time)<=n.getHours()*60+n.getMinutes())return false}
  return true;
}
const Api={
  async lookup(id){
    await sleep(250);const k=hash(id);let p=Db.patients.get(k);
    if(!p){if(id.startsWith('000'))return{ok:false,code:'NOT_FOUND'};p={key:k,name:'Demo Patient'};Db.patients.set(k,p);persistDb()}
    return{ok:true,patient:{key:k,name:p.name}};
  },
  async verifyOtp(c){await sleep(250);return c===CONFIG.demoOtp?{ok:true}:{ok:false,code:'BAD_OTP'}},
  async register(f){
    await sleep(300);const k=hash(f.id);if(Db.patients.has(k))return{ok:false,code:'DUPLICATE'};
    Db.patients.set(k,{key:k,name:f.name});persistDb();return{ok:true,patient:{key:k,name:f.name}};
  },
  dates(){const a=[];for(let i=0;i<CONFIG.daysAhead;i++){const d=new Date();d.setDate(d.getDate()+i);a.push(ymd(d))}return a},
  async slots(doc,date){await sleep(120);return timeline().map(time=>({time,free:slotFree(doc,date,time)}))},
  async book(p,deptId,docId,date,time){
    await sleep(300);
    if(!p||!Db.patients.has(p.key))return{ok:false,code:'NOT_FOUND'};
    if(!slotFree(docId,date,time))return{ok:false,code:'SLOT_TAKEN'};
    Db.taken.add([docId,date,time].join('|'));
    const a={id:'APT-'+new Date().getFullYear()+'-'+pad(++Db.seq,6),pk:p.key,deptId,docId,date,time,checkedIn:false,queueNo:null};
    Db.appts.push(a);persistDb();return{ok:true,appt:a};
  },
  async appointments(p){
    await sleep(200);
    const own=Db.appts.filter(a=>a.pk===p.key).sort((x,y)=>(x.date+x.time).localeCompare(y.date+y.time));
    return{ok:true,list:own};
  },
  async checkIn(a){
    await sleep(300);
    const saved=Db.appts.find(x=>x.id===a.id&&x.pk===a.pk);
    if(!saved)return{ok:false,code:'NOT_FOUND'};
    if(saved.checkedIn)return{ok:true,appt:saved,already:true};
    if(saved.date!==ymd(new Date()))return{ok:false,code:'NOT_TODAY'};
    const d=deptById(saved.deptId);Db.queue[d.id]=(Db.queue[d.id]||0)+1;
    saved.queueNo=d.prefix+'-'+pad(Db.queue[d.id],3);saved.checkedIn=true;persistDb();
    return{ok:true,appt:saved,already:false};
  }
};
const ERR={NOT_FOUND:'nfT',DUPLICATE:'errDup',BAD_OTP:'errOtp',SLOT_TAKEN:'errTaken',NOT_TODAY:'errNotToday',SERVER:'errServer'};
