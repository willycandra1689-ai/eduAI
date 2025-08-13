/* app.js - EduAI prototype logic
   - 7 subjects with materials, bilingual video lists
   - mini-assessment (3 soal per subject)
   - plan generation & localStorage
   - simulated chatbot (rule-based), optional: hook to OpenAI
*/

const subjects = [
  {
    id: 'matematika', name: 'Matematika',
    intro: 'Matematika: aljabar, geometri, trigonometri, dan pemecahan soal.' ,
    content: 'Ringkasan: Fokus pada pemahaman konsep, latihan soal bertahap, dan strategi problem solving.',
    videos: {
      id: [
        {title: 'Belajar Matematika: Dasar Aljabar (contoh video Indonesia)', url: 'https://www.youtube.com/results?search_query=aljabar+dasar+matematika+indonesia', source: 'YouTube'}
      ],
      en: [
        {title: 'Khan Academy — Algebra (Khan Academy site)', url: 'https://www.khanacademy.org/math/algebra', source: 'Khan Academy'},
        {title: 'Khan Academy — Math playlists (YouTube channel)', url: 'https://www.youtube.com/user/khanacademy', source: 'Khan Academy'}
      ]
    },
    quiz: [
      {q: 'Berapa hasil 12 ÷ 4?', opts: ['2','3','4'], a:1},
      {q: 'Jika 3x=15, x = ?', opts: ['5','6','4'], a:0},
      {q: 'Bentuk pecahan dari 0.2 adalah?', opts: ['1/4','1/5','2/9'], a:1}
    ]
  },
  {
    id: 'bahasa_indonesia', name: 'Bahasa Indonesia',
    intro: 'Bahasa Indonesia: memahami teks, tata bahasa, dan menulis ringkas yang efektif.',
    content: 'Ringkasan: Fokus pada membaca kritis, struktur kalimat, dan praktik menulis singkat.',
    videos: {
      id: [ {title: 'Belajar Bahasa Indonesia - Materi & Contoh', url: 'https://www.youtube.com/results?search_query=bahan+bahasa+indonesia', source: 'YouTube'} ],
      en: [ {title: 'Indonesian language basics (Intro videos)', url: 'https://www.youtube.com/results?search_query=learn+indonesian+basics', source: 'YouTube'} ]
    },
    quiz: [
      {q: 'Sinonim kata "cepat" adalah?', opts: ['Lambat','Lekas','Lega'], a:1},
      {q: 'Tanda baca yang mengakhiri seruan adalah?', opts: ['.',',','!'], a:2},
      {q: 'Kalimat tanya diawali dengan kata...', opts: ['Apakah','Karena','Namun'], a:0}
    ]
  },
  {
    id: 'fisika', name: 'Fisika',
    intro: 'Fisika: konsep gaya, gerak, energi, dan gelombang.',
    content: 'Ringkasan: Pendekatan konsepual dengan eksperimen sederhana, baik teoretik maupun praktik.',
    videos: {
      id: [ {title: 'Fisika: Konsep Dasar Gerak (video Indonesia)', url: 'https://www.youtube.com/results?search_query=fisika+gerak+konsep+indonesia', source: 'YouTube'} ],
      en: [ {title: 'Khan Academy — Physics', url: 'https://www.khanacademy.org/science/physics', source: 'Khan Academy'} ]
    },
    quiz: [
      {q: 'Satuan percepatan dalam SI adalah?', opts: ['m/s','m/s^2','kg'], a:1},
      {q: 'Hukum Newton I berkaitan dengan?', opts: ['Gaya','Inersia','Momentum'], a:1},
      {q: 'Energi kinetik bergantung pada...', opts: ['Massa & Kecepatan','Hanya Massa','Hanya Kecepatan'], a:0}
    ]
  },
  {
    id: 'bahasa_inggris', name: 'Bahasa Inggris',
    intro: 'Bahasa Inggris: membangun kosakata, tata bahasa, dan kemampuan berbicara dasar.',
    content: 'Ringkasan: Latihan membaca, frasa umum, dan latihan percakapan singkat.',
    videos: {
      id: [ {title: 'Bahasa Inggris dasar - pelajaran (Indonesia)', url: 'https://www.youtube.com/results?search_query=bahasa+inggris+dasar+indonesia', source: 'YouTube'} ],
      en: [ {title: 'English lessons (basic) — playlists', url: 'https://www.youtube.com/results?search_query=english+lessons+beginner', source: 'YouTube'} ]
    },
    quiz: [
      {q: 'Translate: "Saya pergi ke sekolah" into English', opts: ['I go to school','I going to school','I am goes to school'], a:0},
      {q: 'Choose the correct article: "__ apple"', opts: ['A','An','The'], a:1},
      {q: 'Plural of "child" is?', opts: ['Childs','Children','Childes'], a:1}
    ]
  },
  {
    id: 'kimia', name: 'Kimia',
    intro: 'Kimia: struktur atom, tabel periodik, dan reaksi sederhana.',
    content: 'Ringkasan: Pelajari dasar atom, ikatan kimia, dan reaksi dasar lewat contoh nyata.',
    videos: {
      id: [ {title: 'Kimia dasar - materi & contoh', url: 'https://www.youtube.com/results?search_query=kimia+dasar+materi', source: 'YouTube'} ],
      en: [ {title: 'Chemistry basics — playlists', url: 'https://www.youtube.com/results?search_query=chemistry+basics+lessons', source: 'YouTube'} ]
    },
    quiz: [
      {q: 'Atom terdiri dari...', opts: ['Proton, neutron, elektron','Proton & elektron saja','Elektron & neutron saja'], a:0},
      {q: 'Simbol untuk air adalah?', opts: ['H2O','O2','HO'], a:0},
      {q: 'Tabel periodik mengelompokkan elemen berdasarkan...', opts: ['Nomor atom','Warna','Ukuran'], a:0}
    ]
  },
  {
    id: 'sejarah', name: 'Sejarah',
    intro: 'Sejarah: peristiwa penting, kronologi, dan sebab-akibat perubahan sosial.',
    content: 'Ringkasan: Fokus pada garis waktu, tokoh kunci, dan dampak historis.',
    videos: {
      id: [ {title: 'Sejarah Indonesia - ringkasan (ID)', url: 'https://www.youtube.com/results?search_query=sejarah+indonesia+ringkasan', source: 'YouTube'} ],
      en: [ {title: 'World history intro — playlists', url: 'https://www.youtube.com/results?search_query=world+history+overview', source: 'YouTube'} ]
    },
    quiz: [
      {q: 'Proklamasi kemerdekaan Indonesia dibacakan pada tahun?', opts: ['1945','1950','1939'], a:0},
      {q: 'Salah satu pahlawan nasional adalah?', opts: ['Soekarno','Einstein','Newton'], a:0},
      {q: 'Perang dunia II berakhir pada tahun?', opts: ['1945','1938','1950'], a:0}
    ]
  },
  {
    id: 'informatika', name: 'Informatika',
    intro: 'Informatika: algoritma dasar, struktur data sederhana, dan konsep pemrograman.',
    content: 'Ringkasan: Latihan berpikir komputasional, pseudocode, dan contoh kode singkat.',
    videos: {
      id: [ {title: 'Dasar pemrograman & algoritma (ID)', url: 'https://www.youtube.com/results?search_query=algoritma+dasar+pemrograman+indonesia', source: 'YouTube'} ],
      en: [ {title: 'Intro to Algorithms & CS (videos)', url: 'https://www.youtube.com/results?search_query=introduction+to+algorithms', source: 'YouTube'} ]
    },
    quiz: [
      {q: 'Apa yang dimaksud algoritma?', opts: ['Urutan langkah menyelesaikan masalah','Program komputer','Bahasa pemrograman'], a:0},
      {q: 'Tipe data yang menampung teks disebut?', opts: ['Integer','String','Boolean'], a:1},
      {q: 'Operator logika "AND" menghasilkan true jika...', opts: ['Semua operand true','Salah satu true','Semua operand false'], a:0}
    ]
  }
];

// ----- DOM refs -----
const subjectsRow = document.getElementById('subjectsRow');
const subjectDetail = document.getElementById('subjectDetail');
const subName = document.getElementById('subName');
const subIntro = document.getElementById('subIntro');
const subContent = document.getElementById('subContent');
const videosId = document.getElementById('videosId');
const videosEn = document.getElementById('videosEn');
const metaInfo = document.getElementById('metaInfo');
const miniQuizArea = document.getElementById('miniQuizArea');
const startAssessmentBtn = document.getElementById('startAssessmentBtn');
const saveSubjectBtn = document.getElementById('saveSubjectBtn');

// chat refs
const chatLog = document.getElementById('chatLog');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatSubject = document.getElementById('chatSubject');

let activeSubject = null;

// initialize subjects buttons
function initSubjects(){
  subjects.forEach(s => {
    const btn = document.createElement('button');
    btn.className = 'subject-btn';
    btn.textContent = s.name;
    btn.onclick = () => openSubject(s.id);
    subjectsRow.appendChild(btn);

    // chat subject options
    const opt = document.createElement('option'); opt.value = s.id; opt.textContent = s.name; chatSubject.appendChild(opt);
  })
}

function openSubject(id){
  activeSubject = subjects.find(x => x.id === id);
  // highlight
  document.querySelectorAll('.subject-btn').forEach(b => b.classList.toggle('active', b.textContent === activeSubject.name));
  // fill detail
  subName.textContent = activeSubject.name;
  subIntro.textContent = activeSubject.intro;
  subContent.textContent = activeSubject.content;
  metaInfo.textContent = `Sumber: ${activeSubject.videos.id[0].source} / ${activeSubject.videos.en[0].source}`;

  // videos
  videosId.innerHTML = '';
  activeSubject.videos.id.forEach(v => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${v.url}" target="_blank">${v.title}</a> <span class="muted">(${v.source})</span>`;
    videosId.appendChild(li);
  });
  videosEn.innerHTML = '';
  activeSubject.videos.en.forEach(v => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="${v.url}" target="_blank">${v.title}</a> <span class="muted">(${v.source})</span>`;
    videosEn.appendChild(li);
  });

  // mini quiz area
  buildMiniQuiz(activeSubject);

  subjectDetail.classList.remove('hidden');
}

function buildMiniQuiz(subject){
  miniQuizArea.innerHTML = '';
  subject.quiz.forEach((q,i)=>{
    const div = document.createElement('div');
    div.innerHTML = `<p><strong>Q${i+1}.</strong> ${q.q}</p>`;
    q.opts.forEach((opt,idx)=>{
      div.innerHTML += `<label style="display:block;margin:4px 0"><input type="radio" name="mq${i}" value="${idx}"> ${opt}</label>`;
    })
    miniQuizArea.appendChild(div);
  });
  const btn = document.createElement('button'); btn.className='primary'; btn.textContent='Kirim Jawaban';
  btn.onclick = () => gradeMiniQuiz(subject);
  miniQuizArea.appendChild(btn);
}

function gradeMiniQuiz(subject){
  let score = 0; const total = subject.quiz.length;
  for(let i=0;i<total;i++){
    const radios = document.getElementsByName(`mq${i}`);
    const checked = Array.from(radios).find(r=>r.checked);
    if(checked && parseInt(checked.value,10)===subject.quiz[i].a) score++;
  }
  alert(`Skor: ${score} / ${total}`);
  // derive level and build plan automatically
  const level = score === total ? 'advanced' : score >= Math.ceil(total/2) ? 'intermediate' : 'beginner';
  const prof = { name: localStorage.getItem('eduai_name') || 'Siswa', subject: subject.id, derivedScore: score, derivedLevel: level };
  localStorage.setItem('eduai_profile', JSON.stringify(prof));
  const plan = buildPlan(subject, prof);
  savePlan(subject.id, plan);
  renderPlans();
}

// plan generation (multi-session)
function buildPlan(subject, profile){
  const tmpl = [
    'Inti konsep & penjelasan singkat',
    'Video belajar & ringkasan',
    'Latihan soal bertahap',
    'Aplikasi / proyek mini',
    'Refleksi & kuis penguat'
  ];
  const sessions = tmpl.map((t,i)=>({id:`${subject.id}_s${i+1}`, title:t, duration: 20 + i*10, activities: generateActivities(subject, profile), complete:false}));
  return {createdAt:Date.now(), subject:subject.id, learner:profile.name||'Siswa', sessions};
}

function generateActivities(subject, profile){
  // pick resources based on bandwidth saved in profile (if any)
  // simple selection: text + video links
  const vidEn = subject.videos.en[0]?.url || '#';
  const vidId = subject.videos.id[0]?.url || '#';
  return [`Ringkasan teks`, `Video (ID): ${vidId}`, `Video (EN): ${vidEn}`];
}

function savePlan(subjectId, plan){
  let all = JSON.parse(localStorage.getItem('eduai_plans')||'{}');
  all[subjectId]=plan; localStorage.setItem('eduai_plans', JSON.stringify(all));
}

function renderPlans(){
  const area = document.getElementById('plansArea');
  const all = JSON.parse(localStorage.getItem('eduai_plans')||'{}');
  if(Object.keys(all).length===0){ area.innerHTML='Belum ada rencana.'; return; }
  area.innerHTML='';
  Object.values(all).forEach(plan=>{
    const div = document.createElement('div'); div.className='plan-item';
    const left = document.createElement('div');
    left.innerHTML=`<strong>${getSubjectName(plan.subject)}</strong><div class="muted">${plan.learner} • ${new Date(plan.createdAt).toLocaleString()}</div>`;
    const right = document.createElement('div');
    right.innerHTML=`<button class="outline" onclick='openPlan("${plan.subject}")'>Lihat</button>`;
    div.appendChild(left); div.appendChild(right);
    area.appendChild(div);
  })
}

function getSubjectName(id){ return subjects.find(s=>s.id===id)?.name||id }

function openPlan(subjectId){
  const all = JSON.parse(localStorage.getItem('eduai_plans')||'{}');
  const plan = all[subjectId];
  if(!plan) return alert('Rencana tidak ditemukan');
  // show modal-like details in plansArea
  const area = document.getElementById('plansArea');
  area.innerHTML='';
  const head = document.createElement('div'); head.className='card';
  head.innerHTML=`<h3>${getSubjectName(plan.subject)}</h3><p class="muted">${plan.learner} • dibuat ${new Date(plan.createdAt).toLocaleString()}</p>`;
  area.appendChild(head);
  plan.sessions.forEach(s => {
    const p = document.createElement('div'); p.className='plan-item';
    p.innerHTML=`<div><strong>${s.title}</strong><div class='muted'>${s.duration} menit • ${s.activities.join(' • ')}</div></div><div><button class='primary' onclick='toggleSession("${plan.subject}","${s.id}")'>${s.complete? 'Selesai':'Tandai Selesai'}</button></div>`;
    area.appendChild(p);
  })
}

function toggleSession(subjectId, sessionId){
  const all = JSON.parse(localStorage.getItem('eduai_plans')||'{}');
  const plan = all[subjectId];
  if(!plan) return;
  const s = plan.sessions.find(x=>x.id===sessionId); if(s) s.complete = !s.complete; all[subjectId]=plan; localStorage.setItem('eduai_plans', JSON.stringify(all)); openPlan(subjectId);
  updateProgressUI();
}

function updateProgressUI(){
  const all = JSON.parse(localStorage.getItem('eduai_plans')||'{}');
  const totalSessions = Object.values(all).reduce((acc,pl)=>acc+pl.sessions.length,0);
  const done = Object.values(all).reduce((acc,pl)=>acc+pl.sessions.filter(s=>s.complete).length,0);
  const container = document.getElementById('progressContainer');
  if(totalSessions===0) container.innerHTML='Belum ada progress.'; else container.innerHTML=`<p>Selesai ${done} / ${totalSessions} sesi • <strong>${Math.round(done/totalSessions*100)}%</strong></p>`;
}

// export
function exportPlan(){
  const all = localStorage.getItem('eduai_plans')||'{}';
  const blob = new Blob([all], {type:'application/json'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href=url; a.download='eduai_plans.json'; a.click(); URL.revokeObjectURL(url);
}

function resetAll(){ if(confirm('Reset semua data?')){ localStorage.removeItem('eduai_plans'); localStorage.removeItem('eduai_profile'); localStorage.removeItem('eduai_name'); location.reload(); }}

// ----- chat simulation (rule-based) -----
function appendChat(message, who='bot'){
  const div = document.createElement('div'); div.className = 'chat-bubble ' + (who==='user'?'user':'bot'); div.innerHTML = message; chatLog.appendChild(div); chatLog.scrollTop = chatLog.scrollHeight; }

function sendChat(e){ e.preventDefault(); const text = chatInput.value.trim(); const subj = chatSubject.value; if(!text) return false; appendChat(text,'user'); chatInput.value=''; // simple rule-based response
  setTimeout(()=>{
    const resp = generateChatResponse(subj, text);
    appendChat(resp,'bot');
  },500);
  return false; }

function generateChatResponse(subjectId, text){
  // normalize
  const t = text.toLowerCase();
  const subj = subjects.find(s=>s.id===subjectId) || subjects[0];
  // simple keyword rules
  if(t.includes('apa itu') || t.includes('jelas') || t.includes('jelaskan')){
    // explanation of key concept: pick first sentence of content
    return `Penjelasan singkat untuk *${subj.name}*: ${subj.content}`;
  }
  if(t.includes('contoh') || t.includes('berikan contoh')){
    return `Contoh singkat (${subj.name}): Coba kerjakan soal latihan yang ada di modul atau tonton video yang direkomendasikan.`;
  }
  if(t.match(/(rumus|formula|bagaimana)/)){
    return `Untuk pertanyaan rumus atau langkah: jelaskan topik spesifiknya (mis. rumus kecepatan, cara menyelesaikan persamaan kuadrat)`;
  }
  // fallback
  return `Maaf, saya belum mengenali pertanyaan itu. Coba tanyakan dengan kata kunci seperti 'jelaskan', 'contoh', atau 'rumus'. Atau klik video & materi untuk referensi.`;
}

// ----- navigation -----
function showSection(id){
  document.querySelectorAll('.page, header').forEach(el => el.classList.remove('active'));
  if(id==='home') document.querySelector('header').classList.add('active'); else document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.target===id));
}

document.addEventListener('DOMContentLoaded', ()=>{
  initSubjects(); renderPlans(); updateProgressUI();
});

/*
  OPTIONAL: Integrasi ChatGPT
  ---------------------------
  Jika kamu ingin menghubungkan chatbot ke OpenAI, kamu bisa menambahkan fungsi fetch ke endpoint OpenAI
  dan memasukkan API key. Contoh (JANGAN letakkan API key di kode yang di-publish):

  async function callOpenAI(prompt){
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST', headers:{ 'Content-Type':'application/json', 'Authorization':'Bearer YOUR_API_KEY' },
      body: JSON.stringify({ model: 'gpt-4o-mini', messages:[{role:'user', content: prompt}] })
    });
    const data = await res.json(); return data.choices?.[0]?.message?.content || 'Tidak mendapat jawaban.';
  }

  Kemudian di sendChat(), gunakan callOpenAI() untuk mendapatkan jawaban nyata.
  Catatan: bila membuka file lokal (file://) browser bisa memblokir request; disarankan deploy di server / GitHub Pages.
*/
