/* Plain-language health education for kiosk visitors. General information only. */
const HEALTH_TOPICS={
 visit:{
  en:{title:"Before your visit",intro:"A little preparation can make your hospital visit easier.",
   sections:[
    ["What to bring",["Your appointment ticket or confirmation message.","A valid identity document and hospital card, if you have one.","A list of medicines you currently take, including dose if known.","Previous test results, referral letters, and relevant medical records.","Your glasses, hearing aids, or mobility aid if you use them."]],
    ["Before you leave home",["Check the appointment date, time, clinic, and building.","Ask the clinic whether you need to fast or prepare for a test. Do not fast unless instructed.","Arrive early enough to check in and find the clinic.","If you need an interpreter, wheelchair, or other assistance, contact the hospital in advance."]],
    ["At the hospital",["Check in at the kiosk or reception as instructed.","Keep your ticket and listen for your queue number.","Tell staff about allergies, pregnancy, and important changes in your health.","Ask questions if instructions are unclear."]]
   ]},
  ar:{title:"قبل زيارتك",intro:"يساعدك الاستعداد البسيط على جعل زيارتك للمستشفى أسهل.",sections:[
   ["ما الذي تحضره؟",["تذكرة الموعد أو رسالة التأكيد.","وثيقة هوية سارية وبطاقة المستشفى إن وجدت.","قائمة بالأدوية التي تستخدمها حالياً والجرعات إن كنت تعرفها.","نتائج الفحوصات السابقة وخطابات الإحالة والسجلات الطبية المهمة.","النظارات أو السماعات أو وسيلة المساعدة على الحركة إذا كنت تستخدمها."]],
   ["قبل مغادرة المنزل",["تحقق من تاريخ الموعد ووقته والعيادة والمبنى.","اسأل العيادة إن كان يلزم الصيام أو التحضير لفحص. لا تصم إلا إذا طُلب منك ذلك.","احضر مبكراً بما يكفي لتسجيل الوصول والعثور على العيادة.","اتصل بالمستشفى مسبقاً إذا كنت تحتاج إلى مترجم أو كرسي متحرك أو مساعدة أخرى."]],
   ["في المستشفى",["سجل الوصول في الكشك أو مكتب الاستقبال حسب التعليمات.","احتفظ بالتذكرة وانتبه إلى رقم الدور.","أخبر الموظفين عن الحساسية والحمل وأي تغير مهم في صحتك.","اطرح الأسئلة إذا لم تكن التعليمات واضحة."]]
  ]}
 },
 tests:{
  en:{title:"Common tests explained",intro:"Your healthcare team will explain which test you need and why.",
   sections:[
    ["Blood test",["A healthcare worker takes a small sample of blood, usually from a vein in your arm.","The sample is sent to a laboratory to measure things such as blood cells, sugar, or cholesterol.","Some blood tests require fasting; many do not. Follow the instructions given for your specific test."]],
    ["X-ray",["An X-ray uses a small amount of radiation to create pictures of bones and some body structures.","Tell the team if you may be pregnant before the examination.","You may be asked to remove jewellery or metal objects from the area being examined."]],
    ["Ultrasound",["Ultrasound uses sound waves to make pictures inside the body; it does not use ionising radiation.","Some scans need a full bladder or an empty stomach. Check your appointment instructions."]],
    ["CT and MRI scans",["A CT scan uses X-rays to create detailed cross-sectional images.","An MRI uses a strong magnetic field and radio waves. Tell staff about implants, metal fragments, or devices in your body before an MRI.","Follow the preparation and contrast-dye instructions provided by the imaging team."]]
   ]},
  ar:{title:"شرح الفحوصات الشائعة",intro:"سيشرح لك فريق الرعاية الفحص المطلوب وسبب الحاجة إليه.",sections:[
   ["تحليل الدم",["يأخذ أحد العاملين الصحيين عينة صغيرة من الدم، غالباً من وريد الذراع.","ترسل العينة إلى المختبر لقياس أمور مثل خلايا الدم أو السكر أو الكوليسترول.","تتطلب بعض التحاليل الصيام، بينما لا يتطلبه كثير منها. اتبع تعليمات الفحص المحدد لك."]],
   ["الأشعة السينية",["تستخدم الأشعة السينية كمية صغيرة من الإشعاع لإنتاج صور للعظام وبعض أجزاء الجسم.","أخبر الفريق إذا كان هناك احتمال للحمل قبل الفحص.","قد يُطلب منك إزالة المجوهرات أو الأغراض المعدنية من المنطقة المراد تصويرها."]],
   ["الموجات فوق الصوتية",["تستخدم الموجات فوق الصوتية موجات صوتية لتصوير ما داخل الجسم ولا تستخدم الإشعاع المؤين.","تتطلب بعض الفحوص امتلاء المثانة أو إفراغ المعدة. تحقق من تعليمات موعدك."]],
   ["التصوير المقطعي والرنين المغناطيسي",["يستخدم التصوير المقطعي الأشعة السينية لإنتاج صور مقطعية مفصلة.","يستخدم الرنين المغناطيسي مجالاً مغناطيسياً قوياً وموجات راديوية. أخبر الموظفين عن أي زرعات أو شظايا معدنية أو أجهزة داخل جسمك قبل الفحص.","اتبع تعليمات التحضير واستخدام مادة التباين التي يقدمها فريق التصوير."]]
  ]}
 },
 medicines:{
  en:{title:"Using medicines safely",intro:"Medicines can help when used correctly. If you are unsure, ask a pharmacist or clinician.",
   sections:[
    ["When you collect a medicine",["Check that the name on the label is yours.","Check the medicine name, strength, dose, and expiry date.","Ask what the medicine is for and how to take it.","Tell the pharmacist about allergies, pregnancy, and all other medicines or supplements you use."]],
    ["When you take medicine",["Follow the label and your prescriber's instructions. Do not change the dose yourself.","Do not share your medicines with another person.","Do not double a dose if you miss one unless a healthcare professional tells you to.","Store medicines as directed and keep them away from children."]],
    ["If you have a problem",["Ask a pharmacist or clinician about side effects or possible interactions.","Seek urgent medical help for severe allergic symptoms such as difficulty breathing or swelling of the face or throat.","Do not stop a prescribed medicine without advice, unless you are experiencing a severe emergency reaction."]]
   ]},
  ar:{title:"استخدام الأدوية بأمان",intro:"قد تساعد الأدوية عند استخدامها بشكل صحيح. اسأل الصيدلي أو الطبيب إذا لم تكن متأكداً.",sections:[
   ["عند استلام الدواء",["تحقق من أن الاسم على الملصق يخصك.","تحقق من اسم الدواء وتركيزه وجرعته وتاريخ انتهاء الصلاحية.","اسأل عن سبب استخدام الدواء وطريقة تناوله.","أخبر الصيدلي عن الحساسية والحمل وجميع الأدوية أو المكملات الأخرى التي تستخدمها."]],
   ["عند تناول الدواء",["اتبع الملصق وتعليمات الطبيب. لا تغير الجرعة بنفسك.","لا تشارك دواءك مع شخص آخر.","لا تضاعف الجرعة إذا نسيت جرعة إلا إذا نصحك مختص صحي بذلك.","احفظ الأدوية حسب التعليمات وبعيداً عن متناول الأطفال."]],
   ["إذا واجهت مشكلة",["اسأل الصيدلي أو الطبيب عن الآثار الجانبية أو التفاعلات المحتملة.","اطلب مساعدة طبية عاجلة عند ظهور أعراض حساسية شديدة مثل صعوبة التنفس أو تورم الوجه أو الحلق.","لا توقف دواءً موصوفاً دون استشارة، إلا إذا حدثت استجابة طارئة شديدة."]]
  ]}
 },
 services:{
  en:{title:"Hospital services and hours",intro:"The directory below describes the example services available in this kiosk demonstration. Confirm current locations and hours with hospital staff.",
   sections:[
    ["Outpatient clinics",["See the department directory for clinic locations and appointment details.","Arrive at the clinic before your appointment time and check in as instructed."]],
    ["Laboratory",["The laboratory collects and processes samples requested by your healthcare team.","Preparation requirements depend on the test. Confirm fasting or collection instructions before arriving."]],
    ["Pharmacy",["The pharmacy dispenses medicines prescribed or approved by your healthcare team.","Bring your prescription and ask the pharmacist if you have questions about use or storage."]],
    ["Opening hours and accessibility",["Opening hours, service availability, and room locations can change.","Ask reception for today's hours, accessibility support, and the best route to a service."]]
   ]},
  ar:{title:"خدمات المستشفى وساعات العمل",intro:"يوضح الدليل أدناه خدمات نموذجية في نسخة العرض هذه. تحقق من المواقع وساعات العمل الحالية لدى موظفي المستشفى.",sections:[
   ["العيادات الخارجية",["راجع دليل الأقسام لمعرفة مواقع العيادات وتفاصيل المواعيد.","احضر إلى العيادة قبل موعدك وسجل الوصول حسب التعليمات."]],
   ["المختبر",["يجمع المختبر العينات التي يطلبها فريق الرعاية الصحية ويحللها.","تعتمد متطلبات التحضير على نوع الفحص. تحقق من تعليمات الصيام أو جمع العينة قبل الحضور."]],
   ["الصيدلية",["تصرف الصيدلية الأدوية التي وصفها أو وافق عليها فريق الرعاية الصحية.","أحضر الوصفة واسأل الصيدلي إذا كانت لديك أسئلة عن الاستخدام أو التخزين."]],
   ["ساعات العمل وإمكانية الوصول",["قد تتغير ساعات العمل وتوفر الخدمات ومواقع الغرف.","اسأل الاستقبال عن ساعات اليوم وخدمات المساعدة وأفضل طريق للوصول."]]
  ]}
 },
 wellness:{
  en:{title:"Everyday steps for better health",intro:"Small, regular habits can support your health. Choose changes that are safe and realistic for you.",
   sections:[
    ["Eat a varied diet",["Include vegetables, fruit, whole grains, and suitable sources of protein.","Choose water regularly and limit sugary drinks.","Follow advice from your healthcare team if you have a condition that needs a specific diet."]],
    ["Move your body",["Try regular movement that suits your ability, such as walking, stretching, or gentle activity.","Start gradually and increase activity at a comfortable pace.","Ask a clinician what activity is safe if you have symptoms or a health condition."]],
    ["Sleep and stress",["Keep a regular sleep and wake time where possible.","Make time to relax and stay connected with people you trust.","Seek support if stress, low mood, or sleep problems persist and affect daily life."]],
    ["Prevent illness",["Wash your hands with soap and water regularly.","Keep recommended vaccinations up to date.","Avoid tobacco and seek support if you want to stop smoking.","Attend recommended health checks and screening."]]
   ]},
  ar:{title:"خطوات يومية لصحة أفضل",intro:"يمكن للعادات الصغيرة المنتظمة أن تدعم صحتك. اختر تغييرات آمنة وواقعية بالنسبة لك.",sections:[
   ["تناول غذاء متنوع",["تناول الخضروات والفواكه والحبوب الكاملة ومصادر البروتين المناسبة.","اشرب الماء بانتظام وقلل المشروبات المحلاة.","اتبع نصيحة فريق الرعاية إذا كانت لديك حالة تتطلب نظاماً غذائياً خاصاً."]],
   ["حرك جسمك",["حاول ممارسة حركة منتظمة تناسب قدرتك، مثل المشي أو التمدد أو النشاط الخفيف.","ابدأ تدريجياً وزد النشاط بوتيرة مريحة.","اسأل الطبيب عن النشاط الآمن إذا كانت لديك أعراض أو حالة صحية."]],
   ["النوم والتوتر",["حافظ قدر الإمكان على مواعيد منتظمة للنوم والاستيقاظ.","خصص وقتاً للاسترخاء والتواصل مع أشخاص تثق بهم.","اطلب الدعم إذا استمر التوتر أو انخفاض المزاج أو اضطراب النوم وأثر في حياتك اليومية."]],
   ["الوقاية من المرض",["اغسل يديك بالماء والصابون بانتظام.","حافظ على تلقي اللقاحات الموصى بها.","تجنب التبغ واطلب المساعدة إذا أردت الإقلاع عن التدخين.","احضر الفحوصات الدورية وبرامج الكشف المبكر الموصى بها."]]
  ]}
 }
};
function renderHealthTopic(id){
 const topic=HEALTH_TOPICS[id],data=topic&&topic[lang]||topic&&topic.en;
 if(!data)return;
 $('#healthTitle').textContent=data.title;
 $('#healthIntro').textContent=data.intro;
 const c=$('#healthContent');c.replaceChildren();
 data.sections.forEach(([heading,items])=>{
  const section=el('section',{class:'health-section'});
  section.append(el('h3',{},heading));
  const ul=el('ul');
  items.forEach(item=>ul.append(el('li',{},item)));
  section.append(ul);c.append(section);
 });
 $('#healthDisclaimer').textContent=lang==='ar'
 ?'هذه معلومات تثقيفية عامة وليست تشخيصاً أو خطة علاج. اتبع تعليمات فريقك الصحي. في حالة الطوارئ أو صعوبة التنفس أو ألم الصدر الشديد، اطلب المساعدة الطبية العاجلة فوراً.'
 :'This is general education, not a diagnosis or treatment plan. Follow your healthcare team’s advice. For an emergency, trouble breathing, or severe chest pain, seek urgent medical help immediately.';
}
