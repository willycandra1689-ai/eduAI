/* =========================================================
   Edu AI — Versi Ramah Anak
   - Rekomendasi belajar (AI simulasi)
   - Materi & mini quiz
   - Quiz generator
   - Progress tracking
   - Maskot "Bibo"
========================================================= */

/* ----- NAV ----- */
const nav = document.getElementById('nav');
const burger = document.getElementById('burger');
const navBtns = document.querySelectorAll('.nav-btn');

burger?.addEventListener('click', ()=> nav.classList.toggle('open'));
navBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const id = btn.dataset.target;
    if(!id) return;
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    navBtns.forEach(b=>b.classList.toggle('active', b===btn));
    nav.classList.remove('open');
  });
});
document.querySelectorAll('[data-goto]').forEach(el=> el.addEventListener('click', ()=>{
  const t = el.getAttribute('data-goto');
  document.querySelector(`.nav-btn[data-target="${t}"]`)?.click();
}));

/* ----- MASKOT ----- */
const mascotBtn = document.getElementById('mascotBtn');
const mascotPop = document.getElementById('mascotPop');
mascotBtn?.addEventListener('click', ()=>{
  mascotPop.classList.toggle('show');
});
document.addEventListener('click', (e)=>{
  if(!mascotPop.contains(e.target) && e.target!==mascotBtn) mascotPop.classList.remove('show');
});

/* ----- DATA ----- */
const SUBJECTS = [
  {
    id:'ai-dasar', name:'AI Dasar', icon:'🤖',
    intro:'Kenalan dengan kecerdasan buatan dan contoh di sekitar kita.',
    content:'Belajar konsep dasar AI, data, pola, dan etika penggunaan AI secara sederhana.',
    videos:{
      id:[{title:'Apa itu AI? (pencarian ID)', url:'https://www.youtube.com/results?search_query=apa+itu+AI', source:'YouTube'}],
      en:[{title:'Intro to AI', url:'https://www.youtube.com/results?search_query=introduction+to+AI', source:'YouTube'}]
    },
    quiz:[
      {q:'AI adalah...', opts:['Kecerdasan buatan','Awan internet','Alat gambar'], a:0},
      {q:'Supervised learning pakai...', opts:['Data berlabel','Data hilang','Tanpa data'], a:0},
      {q:'Contoh etika AI?', opts:['Hindari bias','Ganti warna','Perbesar font'], a:0}
    ]
  },
  {
    id:'ml-pemula', name:'Machine Learning', icon:'🧩',
    intro:'Belajar ML dasar: data, fitur, latih, dan uji.',
    content:'Kenali dataset, fitur-target, dan kenapa overfitting bikin model “terlalu hafal”.',
    videos:{
      id:[{title:'ML dasar Indonesia', url:'https://www.youtube.com/results?search_query=machine+learning+dasar+indonesia', source:'YouTube'}],
      en:[{title:'ML for beginners', url:'https://www.youtube.com/results?search_query=machine+learning+for+beginners', source:'YouTube'}]
    },
    quiz:[
      {q:'Training model itu...', opts:['Menyesuaikan parameter dengan data','Menggambar model','Mewarnai data'], a:0},
      {q:'Overfitting itu...', opts:['Terlalu hapal data latih','Model cepat','Data bersih'], a:0},
      {q:'Dataset dibagi...', opts:['Train & Test','Merah & Biru','Pagi & Malam'], a:0}
    ]
  },
  {
    id:'matematika', name:'Matematika', icon:'📐',
    intro:'Aljabar, geometri, dan berhitung seru.',
    content:'Fokus ke pemahaman konsep dan latihan bertahap yang menyenangkan.',
    videos:{
      id:[{title:'Aljabar dasar (ID)', url:'https://www.youtube.com/results?search_query=aljabar+dasar+indonesia', source:'YouTube'}],
      en:[{title:'Khan Academy — Algebra', url:'https://www.khanacademy.org/math/algebra', source:'Khan Academy'}]
    },
    quiz:[
      {q:'12 ÷ 4 = ?', opts:['2','3','4'], a:1},
      {q:'3x = 15, x = ?', opts:['5','6','7'], a:0},
      {q:'0,2 = ?', opts:['1/4','1/5','2/9'], a:1}
    ]
  },
  {
    id:'ipa', name:'IPA', icon:'🧪',
    intro:'Gaya, gerak, energi, dan percobaan sederhana.',
    content:'Eksperimen mini untuk paham konsep secara nyata.',
    videos:{
      id:[{title:'Konsep gerak (ID)', url:'https://www.youtube.com/results?search_query=fisika+gerak+konsep+indonesia', source:'YouTube'}],
      en:[{title:'Physics basics', url:'https://www.youtube.com/results?search_query=physics+basics', source:'YouTube'}]
    },
    quiz:[
      {q:'Satuan percepatan SI?', opts:['m/s','m/s²','kg'], a:1},
      {q:'Hukum Newton I tentang...', opts:['Inersia','Gaya','Momentum'], a:0},
      {q:'Energi kinetik dipengaruhi...', opts:['Massa & Kecepatan','Hanya massa','Hanya kecepatan'], a:0}
    ]
  },
  {
    id:'bahasa', name:'Bahasa Indonesia', icon:'📖',
    intro:'Membaca, menulis, dan kosakata.',
    content:'Latihan memahami teks dan menulis kalimat yang rapi.',
    videos:{
      id:[{title:'Bahasa Indonesia - materi', url:'https://www.youtube.com/results?search_query=bahasa+indonesia+materi', source:'YouTube'}],
      en:[{title:'Learn Indonesian basics', url:'https://www.youtube.com/results?search_query=learn+indonesian+basics', source:'YouTube'}]
    },
    quiz:[
      {q:'Sinonim "cepat"?', opts:['Lambat','Lekas','Lega'], a:1},
      {q:'Akhir kalimat seruan?', opts:['.','!','?'], a:1},
      {q:'Kalimat tanya diawali...', opts:['Apakah','Karena','Namun'], a:0}
    ]
  },
  {
    id:'informatika', name:'Informatika', icon:'💻',
    intro:'Algoritma, logika dasar, dan pseudocode.',
    content:'Belajar langkah-langkah menyelesaikan masalah dengan teratur.',
    videos:{
      id:[{title:'Algoritma dasar (ID)', url:'https://www.youtube.com/results?search_query=algoritma+dasar+pemrograman+indonesia', source:'YouTube'}],
      en:[{title:'Intro to CS', url:'https://www.youtube.com/results?search_query=introduction+to+computer+science', source:'YouTube'}]
    },
    quiz:[
      {q:'Algoritma adalah...', opts:['Urutan langkah','Program','Aplikasi'], a:0},
      {q:'Tipe data teks?', opts:['Integer','String','Boolean'], a:1},
      {q:'AND true jika...', opts:['Semua true','Salah satu true','Semua false'], a:0}
    ]
  }
];

/* ----- REKOMENDASI (AI SIMULASI) ----- */
const recoForm = document.getElementById('recoForm');
const planArea = document.getElementById('planArea');
const exportBtn = document.getElementById('exportBtn');
const importInput = document.getElementById('importInput');
const resetBtn = document.getElementById('resetBtn');

recoForm?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const p = Object.fromEntries(new FormData(recoForm).entries());
  localStorage.setItem('kid_name', p.name);
  const plan = buildPlan(p);
  savePlan(plan.subject, plan);
  renderPlan(plan);
  renderPlansList();
  updateProgressUI();
  // efek kecil "confetti" sederhana
  confettiEmoji('🎉');
});

exportBtn?.addEventListener('click', ()=>{
  const all = localStorage.getItem('kid_plans')||'{}';
  const blob = new Blob([all], {type:'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'eduai_plans.json'; a.click();
  URL.revokeObjectURL(a.href);
});

importInput?.addEventListener('change', (e)=>{
  const f = e.target.files?.[0]; if(!f) return;
  const reader = new FileReader();
  reader.onload = ()=>{
    try{
      localStorage.setItem('kid_plans', reader.result);
      renderPlansList(); updateProgressUI();
      alert('Berhasil import ✅');
    }catch{ alert('Gagal import'); }
  };
  reader.readAsText(f);
});

resetBtn?.addEventListener('click', ()=>{
  if(confirm('Hapus semua data?')){
    localStorage.removeItem('kid_plans');
    localStorage.removeItem('kid_name');
    location.reload();
  }
});

function buildPlan(p){
  const n = parseInt(p.time,10)>=60 ? 6 : parseInt(p.time,10)>=30 ? 5 : 4;
  const styleAdd = {
    visual:['lihat gambar lucu','baca infografis mini'],
    auditori:['dengar ringkasan audio','cerita singkat'],
    kinestetik:['praktek kecil','buat catatan warna-warni']
  }[p.style] || ['ringkasan'];

  const lowNet = p.bandwidth==='low';
  const deviceHint = p.device==='smartphone' ? 'tugas pendek' : 'tugas standar';

  const base = [
    'ringkasan konsep seru',
    lowNet ? 'materi teks ringan (offline)' : 'tonton video rekomendasi',
    p.goal==='projek' ? 'projek mini' : 'latihan langkah demi langkah',
    p.goal==='ujian' ? 'drill soal & review' : 'refleksi singkat'
  ];

  const sessions = Array.from({length:n}).map((_,i)=>({
    id:`${p.topic}_s${i+1}`,
    title: sessionTitle(i, p.goal),
    duration: parseInt(p.time,10),
    activities: [...base, styleAdd[i % styleAdd.length], deviceHint],
    complete:false
  }));

  return {
    createdAt: Date.now(),
    learner: p.name || 'Siswa',
    subject: p.topic,
    profile: p,
    sessions
  };
}
function sessionTitle(i, goal){
  const t = [
    'Kenalan Materi', goal==='projek'?'Rancang Projek':'Contoh Seru',
    'Latihan Bertahap', goal==='ujian'?'Drill Cepat':'Aplikasi Nyata',
    'Refleksi & Catatan', 'Uji Diri'
  ];
  return t[i] || `Sesi ${i+1}`;
}

function savePlan(subjectId, plan){
  const all = JSON.parse(localStorage.getItem('kid_plans')||'{}');
  all[subjectId] = plan;
  localStorage.setItem('kid_plans', JSON.stringify(all));
}

function renderPlan(plan){
  planArea.classList.remove('muted');
  planArea.innerHTML = `
    <div class="row" style="justify-content:space-between;align-items:center">
      <strong>${getName(plan.subject)} • ${plan.learner}</strong>
      <span class="muted">${new Date(plan.createdAt).toLocaleString()} • ${plan.sessions.length} sesi • ${plan.profile.time} mnt</span>
    </div>
    ${plan.sessions.map(s=>`
      <div class="session" data-sub="${plan.subject}" data-id="${s.id}">
        <div>
          <strong>🧩 ${s.title}</strong>
          <div class="muted">${s.duration} menit • ${s.activities.join(' • ')}</div>
        </div>
        <button data-action="toggle">${s.complete?'Selesai ✅':'Tandai Selesai'}</button>
      </div>
    `).join('')}
  `;
  planArea.querySelectorAll('[data-action="toggle"]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const wrap = b.closest('.session');
      toggleSession(wrap.dataset.sub, wrap.dataset.id);
    });
  });
}
function toggleSession(subjectId, sessionId){
  const all = JSON.parse(localStorage.getItem('kid_plans')||'{}');
  const plan = all[subjectId]; if(!plan) return;
  const ses = plan.sessions.find(x=>x.id===sessionId);
  if(ses){ ses.complete = !ses.complete; all[subjectId]=plan; localStorage.setItem('kid_plans', JSON.stringify(all)); renderPlan(plan); }
  renderPlansList(); updateProgressUI();
}

function renderPlansList(){
  const area = document.getElementById('plansArea'); if(!area) return;
  const all = JSON.parse(localStorage.getItem('kid_plans')||'{}');
  if(Object.keys(all).length===0){ area.textContent='Belum ada rencana.'; return; }
  area.innerHTML = '';
  Object.values(all).forEach(pl=>{
    const done = pl.sessions.filter(s=>s.complete).length;
    const div = document.createElement('div'); div.className='item';
    div.innerHTML = `
      <div><strong>${getName(pl.subject)}</strong><div class="muted">${pl.learner} • ${done}/${pl.sessions.length} selesai</div></div>
      <div><button class="btn light" data-open="${pl.subject}">Buka</button></div>
    `;
    area.appendChild(div);
  });
  area.querySelectorAll('[data-open]').forEach(b=>{
    b.addEventListener('click', ()=>{
      const all = JSON.parse(localStorage.getItem('kid_plans')||'{}');
      const plan = all[b.getAttribute('data-open')];
      document.querySelector('.nav-btn[data-target="reco"]').click();
      renderPlan(plan);
      window.scrollTo({top:0, behavior:'smooth'});
    });
  });
}

function updateProgressUI(){
  const el = document.getElementById('progressContainer');
  const all = JSON.parse(localStorage.getItem('kid_plans')||'{}');
  const total = Object.values(all).reduce((a,p)=>a+p.sessions.length,0);
  const done = Object.values(all).reduce((a,p)=>a+p.sessions.filter(s=>s.complete).length,0);
  if(total===0){ el.textContent='Belum ada progress.'; return; }
  const pct = Math.round(done/total*100);
  el.innerHTML = `
    <p>Selesai ${done}/${total} sesi — <strong>${pct}%</strong> 🎯</p>
    <div style="height:14px;border:2px solid var(--border);border-radius:999px;background:#fff;overflow:hidden">
      <div style="height:100%;width:${pct}%;background:linear-gradient(90deg, var(--sky), var(--mint))"></div>
    </div>
  `;
}

function getName(id){ return SUBJECTS.find(s=>s.id===id)?.name || id; }

/* ----- MATERI ----- */
const subjectsRow = document.getElementById('subjectsRow');
const subjectDetail = document.getElementById('subjectDetail');
const subName = document.getElementById('subName');
const subIntro = document.getElementById('subIntro');
const subContent = document.getElementById('subContent');
const videosId = document.getElementById('videosId');
const videosEn = document.getElementById('videosEn');
const metaInfo = document.getElementById('metaInfo');
const miniQuizArea = document.getElementById('miniQuizArea');

function initSubjects(){
  SUBJECTS.forEach(s=>{
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = `${s.icon} ${s.name}`;
    chip.addEventListener('click', ()=>{
      subjectsRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
      chip.classList.add('active');
      openSubject(s.id);
    });
    subjectsRow.appendChild(chip);
  });
}
function openSubject(id){
  const s = SUBJECTS.find(x=>x.id===id); if(!s) return;
  subName.textContent = `${s.icon} ${s.name}`;
  subIntro.textContent = s.intro;
  subContent.textContent = s.content;
  metaInfo.textContent = `Sumber: ${s.videos.id[0]?.source || '-'} / ${s.videos.en[0]?.source || '-'}`;

  videosId.innerHTML = '';
  s.videos.id.forEach(v=>{
    const li = document.createElement('li');
    li.innerHTML = `<a href="${v.url}" target="_blank" rel="noopener">${v.title}</a> <span class="muted">(${v.source})</span>`;
    videosId.appendChild(li);
  });
  videosEn.innerHTML = '';
  s.videos.en.forEach(v=>{
    const li = document.createElement('li');
    li.innerHTML = `<a href="${v.url}" target="_blank" rel="noopener">${v.title}</a> <span class="muted">(${v.source})</span>`;
    videosEn.appendChild(li);
  });

  buildMiniQuiz(s);
  subjectDetail.classList.remove('hidden');
}
function buildMiniQuiz(s){
  miniQuizArea.innerHTML = '';
  s.quiz.forEach((q,i)=>{
    const wrap = document.createElement('div');
    wrap.className = 'bubble';
    wrap.style.marginBottom = '8px';
    wrap.innerHTML = `<p><strong>Q${i+1}.</strong> ${q.q}</p>`;
    q.opts.forEach((opt,idx)=>{
      const id = `opt_${s.id}_${i}_${idx}`;
      wrap.innerHTML += `
        <label style="display:block;margin:4px 0">
          <input type="radio" name="mq_${s.id}_${i}" value="${idx}" id="${id}" />
          ${opt}
        </label>`;
    });
    miniQuizArea.appendChild(wrap);
  });
  const btn = document.createElement('button');
  btn.className = 'btn light';
  btn.textContent = 'Periksa';
  btn.addEventListener('click', ()=>{
    let score=0;
    s.quiz.forEach((q,i)=>{
      const sel = document.querySelector(`input[name="mq_${s.id}_${i}"]:checked`);
      if(sel && parseInt(sel.value,10)===q.a) score++;
    });
    alert(`Skormu: ${score} / ${s.quiz.length} 🎉`);
  });
  miniQuizArea.appendChild(btn);
}

/* ----- QUIZ GENERATOR ----- */
const quizSetup = document.getElementById('quizSetup');
const quizArea = document.getElementById('quizArea');
const checkQuizBtn = document.getElementById('checkQuiz');
const quizResult = document.getElementById('quizResult');
let currentQuiz = null;

quizSetup?.addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = Object.fromEntries(new FormData(quizSetup).entries());
  const s = SUBJECTS.find(x=>x.id===fd.qTopic) || SUBJECTS[0];
  const extra = fd.qLevel==='advanced' ? 2 : fd.qLevel==='intermediate' ? 1 : 0;
  currentQuiz = buildQuiz(s.quiz, extra);
  renderQuiz(currentQuiz);
  quizResult.textContent='';
  checkQuizBtn.disabled = false;
});
checkQuizBtn?.addEventListener('click', ()=>{
  if(!currentQuiz) return;
  const {score,total,msg} = gradeQuiz(currentQuiz);
  quizResult.innerHTML = `Nilai: <strong>${score}/${total}</strong> — ${msg}`;
  confettiEmoji(score/total>=0.6 ? '✨' : '💪');
});

function buildQuiz(base, extra){
  const items = base.map(q=>({...q}));
  for(let i=0;i<extra;i++){
    items.push({q:'Refleksi: sebutkan 1 contoh penerapan materi ini.', opts:['Sudah','Belum','Nanti'], a:0});
  }
  return items;
}
function renderQuiz(items){
  quizArea.classList.remove('muted');
  quizArea.innerHTML = items.map((q,iq)=>`
    <div class="bubble" style="margin-bottom:8px">
      <p><strong>${iq+1}.</strong> ${q.q}</p>
      ${q.opts.map((o,io)=>`
        <label style="display:block;margin:4px 0">
          <input type="radio" name="q_${iq}" value="${io}"> ${o}
        </label>`).join('')}
    </div>
  `).join('');
}
function gradeQuiz(items){
  let score=0;
  items.forEach((q,iq)=>{
    const sel = document.querySelector(`input[name="q_${iq}"]:checked`);
    if(sel && parseInt(sel.value,10)===q.a) score++;
  });
  const total = items.length;
  const ratio = score/total;
  const msg = ratio>=0.8 ? 'Hebat! Kamu siap tantangan baru 🎯' :
              ratio>=0.5 ? 'Bagus! Tinggal sedikit lagi 😄' :
              'Tidak apa-apa, kita ulangi pelan-pelan ya 🌈';
  return {score,total,msg};
}

/* ----- UTIL ----- */
function confettiEmoji(emoji='🎉'){
  for(let i=0;i<12;i++){
    const s = document.createElement('div');
    s.textContent = emoji;
    s.style.position='fixed';
    s.style.left = Math.random()*100+'vw';
    s.style.top = '-20px';
    s.style.fontSize = (16 + Math.random()*16)+'px';
    s.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
    s.style.zIndex = 9999;
    document.body.appendChild(s);
    requestAnimationFrame(()=>{
      s.style.transform = `translateY(${80+Math.random()*90}vh) rotate(${Math.random()*360}deg)`;
      s.style.opacity = '0';
    });
    setTimeout(()=> s.remove(), 1300);
  }
}

/* ----- INIT ----- */
document.addEventListener('DOMContentLoaded', ()=>{
  initSubjects();
  // auto pilih topik pertama
  subjectsRow.querySelector('.chip')?.click();
  renderPlansList();
  updateProgressUI();
});


// GANTI bagian ini dengan API key kamu
const OPENAI_API_KEY = ""
const chatContainer = document.getElementById("chatContainer");
const aiForm = document.getElementById("aiForm");
const userInput = document.getElementById("userInput");
const recommendationList = document.getElementById("recommendationList");

let chatHistory = [];

function addMessage(content, sender) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", sender);
    messageEl.textContent = content;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function updateRecommendations(recommendations) {
    recommendationList.innerHTML = "";
    recommendations.forEach(rec => {
        const li = document.createElement("li");
        li.textContent = rec;
        recommendationList.appendChild(li);
    });
}

async function askAI(question) {
    addMessage(question, "user");
    chatHistory.push({ role: "user", content: question });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Kamu adalah asisten belajar yang ramah anak dan suka memberikan penjelasan sederhana. Setelah menjawab pertanyaan, tambahkan 3 rekomendasi topik belajar lain yang relevan dalam format JSON: {\"rekomendasi\": [\"topik1\", \"topik2\", \"topik3\"]} di bagian akhir jawaban." },
                ...chatHistory
            ],
            max_tokens: 500
        })
    });

    const data = await response.json();
    const aiReplyRaw = data.choices?.[0]?.message?.content || "Maaf, aku tidak bisa menjawab sekarang.";

    // Pisahkan jawaban dan rekomendasi JSON
    let answerText = aiReplyRaw;
    let recommendations = [];

    try {
        const jsonMatch = aiReplyRaw.match(/\{[\s\S]*\}$/);
        if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            recommendations = parsed.rekomendasi || [];
            answerText = aiReplyRaw.replace(jsonMatch[0], "").trim();
        }
    } catch (e) {
        console.warn("Gagal parsing rekomendasi:", e);
    }

    addMessage(answerText, "ai");
    chatHistory.push({ role: "assistant", content: aiReplyRaw });

    if (recommendations.length > 0) {
        updateRecommendations(recommendations);
    }
}

aiForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const question = userInput.value.trim();
    if (question) {
        askAI(question);
        userInput.value = "";
    }
});

// contoh: beri efek pulse pada tombol setelah submit
const sendBtn = document.querySelector('.send-btn');
aiForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const question = userInput.value.trim();
  if (!question) return;
  // beri efek
  sendBtn.classList.add('pulse');
  setTimeout(()=> sendBtn.classList.remove('pulse'), 700);
  // panggil fungsi biasa
  askAI(question);
  userInput.value = '';
});
