
    const PIN_CODE = "9999";   // your private PIN — change in production

    const P = {
      name: "Teguh Saputra Monoarfa", nick: "Teguh", location: "Jakarta, Indonesia",
      email: "teguhsaputra412@gmail.com",
      linkedin: "https://www.linkedin.com/in/teguhsaputra412/",
      whatsapp: "https://api.whatsapp.com/send/?phone=6282291648646&text&type=phone_number&app_absent=0",
      resumeUrl: "/CV_Teguh_Saputra_Monoarfa.pdf", resumeData: null, resumeName: null, photo: null
    };

    const D = {
      brand: "Teguh Web Portfolio",
      status: "Open to opportunities · Growth · BizOps · AI Ops",
      ai_h: "Ask my AI anything <span class=\"grad\">about my experience.</span>",
      ai_tag: "This portfolio has a built-in AI assistant trained on my resume. Get straight answers about my work, impact, and skills — before we even talk.",
      ai_hello: "Hi! I'm Teguh's AI assistant, and I know his resume inside out. Ask me about his experience, impact, projects, or how he works with AI. 👋",
      suggest: [],
      ai_ph: "Type your question…  e.g. What are his biggest achievements?",
      hero_h1: "Growth &amp; <em>Business Operations</em> generalist who builds with AI.",
      role: "Product Consultant & Implementation · KantorKu HRIS (Dealls)",
      bio: "Built a Customer Experience function from the ground up at a B2B SaaS, led CS teams across regional e-commerce (Lazada PH, Temu EU), and run operations across tooling, data, and AI. I think in CSAT, churn, retention, and adoption — then build the dashboards and AI agents that move them, learning and shipping with AI every day.",
      chips: ["CX Strategy", "Analytics", "AI Agents", "Prompt Engineering", "Implementation"],
      metrics: [
        { display: "97.9%", cap: "CSAT achieved (KantorKu)" },
        { display: "300+", cap: "companies onboarded to HRIS" },
        { display: "6,000+", cap: "headcount under management" },
        { display: "82%", cap: "fewer Tier-2 escalations (Temu)" }
      ],
      exp: [
        { yr: "Nov 2024 — now", role: "Product Consultant & Implementation Specialist", co: "Dealls · KantorKu HRIS (B2B SaaS)", d: "Rebuilt the CX function end-to-end; ran the CSAT dashboard & weekly reporting (97.9% CSAT, 82.4% ISS); led HRIS implementation across 300+ companies / 6,000+ headcount with <15-day time-to-value & 100% retention; owned prompt engineering & deployment of the KIRA AI agent." },
        { yr: "Jun — Nov 2024", role: "Customer Service Team Leader", co: "Transcosmos · Lazada (PH Market)", d: "Led 15 agents to 71.85% CSAT; daily coaching & calibration. Fast-tracked from SME to Team Leader in 2 months." },
        { yr: "Jan — Jun 2024", role: "Customer Resolution Senior Specialist (Tier 2)", co: "Teleperformance · Temu (EU Market)", d: "Handled complex Tier 2 escalations; authored documentation that cut Tier 2 escalation volume by 82%. Promoted Tier 1 → Tier 2 in 1 month." }
      ],
      edu: [{ school: "Universitas Negeri Gorontalo (UNG)", meta: "Bachelor of Communication · 2016 – 2023", gpa: "GPA 3.65 / 4.00" }],
      cert: ["BISINDO Level 2 — Indonesian Sign Language (2026)", "Alibaba Cloud Academy — Big Data Certified (2024)", "DBS Foundation Coding Camp — ML Developer (2024)", "Indosat IOH ID.CAMP — Data Scientist Program (2023)", "Lintasarta Cloudeka Digischool — ML Program (2023)"],
      skills: ["Prompt Engineering", "AI Agents", "Python", "SQL", "Tableau", "Excel / Sheets", "Google Apps Script", "Vercel", "Netlify", "CX Strategy", "Churn & Retention", "KPI & Reporting", "Vendor Evaluation", "JIRA", "Confluence", "Coda"],
      beyond: [
        { t: "🤖 Learning & Building with AI", d: "Daily AI use, prompt engineering & agent building as a long-term focus." },
        { t: "⚙️ Vibe Coding", d: "Ships dashboards & internal tools with AI — no formal dev background." },
        { t: "🧰 AI Platforms", d: "Claude, ChatGPT, Gemini, Deepseek, Ollama, Groq." }
      ],
      proj: [
        { name: "KIRA — CX AI Agent", cap: "📸 KIRA agent screenshot", desc: "Prompt engineering & integration of an internal AI agent, now a daily tool across teams.", tag: "AI · Prompt Engineering", img: null },
        { name: "Knowledge Base Dashboard", cap: "📸 KB dashboard screenshot", desc: "FAQs, KB articles & video tutorials in one product knowledge hub.", tag: "Vercel · Knowledge Mgmt", img: null },
        { name: "CX Analytics Dashboard", cap: "📸 CSAT/ISS dashboard", desc: "CSAT & ISS analytics: KPI cards, trends, leaderboard, Voice of Customer.", tag: "Data Viz · Reporting", img: null },
        { name: "Client Analytics Dashboard", cap: "📸 client dashboard", desc: "Client database with churn, renewal & retention tracking.", tag: "Analytics · Retention", img: null },
        { name: "User Onboarding Program", cap: "📸 onboarding flow", desc: "End-to-end onboarding & training, translating business needs into product solutions.", tag: "Implementation · Enablement", img: null }
      ],
      custom: [],
      cta_h: "Let's talk.",
      cta_p: "Open to Growth, BizOps & AI-focused roles."
    };

    let editMode = false, metricsAnimated = false;
    const $ = id => document.getElementById(id);
    const EDITABLE = new Set(['brand', 'status', 'hero_h1', 'role', 'bio', 'ai_h', 'ai_tag', 'cta_h', 'cta_p']);
    const HTMLK = new Set(['hero_h1', 'ai_h']);
    const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const ICON_LOCK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="11" width="15" height="9.5" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    const ICON_UNLOCK = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4.5" y="11" width="15" height="9.5" rx="2"/><path d="M8 11V7a4 4 0 0 1 7.5-1.3"/></svg>';

    function ed(arr, idx, field) { return editMode ? `contenteditable="true" data-arr="${arr}" data-idx="${idx}" data-field="${field || ''}"` : ''; }
    function ep(field) { return editMode ? `contenteditable="true" data-p="${field}"` : ''; }
    function del(arr, i) { return `<span class="del" data-del="${arr}" data-i="${i}" title="Delete">×</span>`; }
    function parseMetric(s) { const m = String(s).match(/^([\d.,]+)(.*)$/); if (!m) return { n: null, suf: '', dec: 0 }; const ns = m[1].replace(/,/g, ''); return { n: parseFloat(ns), suf: m[2], dec: (ns.split('.')[1] || '').length }; }

    function render() {
      document.body.classList.toggle('editing', editMode);
      document.title = D.brand;
      document.querySelectorAll('[data-k]').forEach(el => {
        const k = el.dataset.k;
        if (HTMLK.has(k) || el.dataset.html) el.innerHTML = D[k]; else el.textContent = D[k];
        el.contentEditable = (editMode && EDITABLE.has(k));
      });
      // brand: accent only the last word in view mode
      const bEl = $('brand');
      if (editMode) { bEl.textContent = D.brand; }
      else { const w = D.brand.trim().split(/\s+/); const last = w.pop() || ''; bEl.innerHTML = (w.length ? esc(w.join(' ')) + ' ' : '') + '<span class="grad">' + esc(last) + '</span>'; }
      $('chatinput').placeholder = D.ai_ph;
      // photo / identity
      $('photoName').textContent = P.name; $('photoLoc').textContent = "📍 " + P.location;
      const ph = $('photoPh');
      if (P.photo) { ph.style.backgroundImage = `url(${P.photo})`; ph.textContent = ""; }
      else { ph.style.backgroundImage = ""; ph.textContent = editMode ? "[ click to upload photo ]" : "[ profile photo ]"; }
      ph.classList.toggle('editable', editMode);
      // contact
      $('cmName').innerHTML = `👤 <span ${ep('name')}>${esc(P.name)}</span>`;
      $('cmLoc').innerHTML = `📍 <span ${ep('location')}>${esc(P.location)}</span>`;
      $('cmEmail').innerHTML = `✉ <span ${ep('email')}>${esc(P.email)}</span>`;
      $('contactEdit').innerHTML = editMode ? `
    <div class="cedit"><b>LinkedIn:</b> <span ${ep('linkedin')}>${esc(P.linkedin)}</span></div>
    <div class="cedit"><b>WhatsApp:</b> <span ${ep('whatsapp')}>${esc(P.whatsapp)}</span></div>
    <div class="cedit"><b>Resume path (/public):</b> <span ${ep('resumeUrl')}>${esc(P.resumeUrl)}</span></div>` : '';
      $('ctaEmail').href = "mailto:" + P.email; $('ctaLi').href = P.linkedin; $('ctaWa').href = P.whatsapp;
      const cv = $('ctaCV');
      if (P.resumeData) { cv.href = P.resumeData; cv.setAttribute('download', P.resumeName || 'CV_Teguh.pdf'); }
      else { cv.href = P.resumeUrl; cv.setAttribute('download', ''); }
      cv.onclick = null;
      // chips
      $('chips').innerHTML = D.chips.map((c, i) => `<span class="chip" ${ed('chips', i)}>${esc(c)}${del('chips', i)}</span>`).join('');
      // metrics
      renderMetrics();
      // experience
      $('expList').innerHTML = D.exp.map((e, i) => `<div class="exp-item">${del('exp', i)}<div class="exp-yr" ${ed('exp', i, 'yr')}>${esc(e.yr)}</div><div style="flex:1"><div class="exp-role" ${ed('exp', i, 'role')}>${esc(e.role)}</div><div class="exp-co" ${ed('exp', i, 'co')}>${esc(e.co)}</div><div class="exp-desc" ${ed('exp', i, 'd')}>${esc(e.d)}</div></div></div>`).join('');
      // education
      $('eduBlock').innerHTML = D.edu.map((e, i) => `<div class="edu-item">${del('edu', i)}<div class="edu-school" ${ed('edu', i, 'school')}>${esc(e.school)}</div><div class="edu-meta" ${ed('edu', i, 'meta')}>${esc(e.meta)}</div><div class="edu-gpa" ${ed('edu', i, 'gpa')}>${esc(e.gpa)}</div></div>`).join('');
      $('certList').innerHTML = D.cert.map((c, i) => `<li><span ${ed('cert', i)}>${esc(c)}</span>${del('cert', i)}</li>`).join('');
      // skills
      $('skillRow').innerHTML = D.skills.map((s, i) => `<span class="sk" ${ed('skills', i)}>${esc(s)}${del('skills', i)}</span>`).join('');
      // beyond
      $('beyondList').innerHTML = D.beyond.map((b, i) => `<div class="it">${del('beyond', i)}<div class="t" ${ed('beyond', i, 't')}>${esc(b.t)}</div><div class="d" ${ed('beyond', i, 'd')}>${esc(b.d)}</div></div>`).join('');
      // projects
      $('projGrid').innerHTML = D.proj.map((p, i) => { const cover = p.img ? `style="background-image:url(${p.img})"` : ''; return `<div class="proj">${del('proj', i)}<div class="cap ${editMode ? 'editable' : ''}" data-proj-img="${i}" ${cover}>${p.img ? '' : esc(p.cap)}</div><div class="body"><h4 ${ed('proj', i, 'name')}>${esc(p.name)}</h4><p ${ed('proj', i, 'desc')}>${esc(p.desc)}</p><div class="tag" ${ed('proj', i, 'tag')}>${esc(p.tag)}</div></div></div>`; }).join('');
      document.querySelectorAll('[data-proj-img]').forEach(el => { el.onclick = editMode ? () => pickProjImg(+el.dataset.projImg) : null; });
      // custom sections
      renderCustom();
      // suggestions
      renderSuggest();
    }

    function renderSuggest() {
      const sug = $('suggest');
      if (editMode) {
        sug.innerHTML = D.suggest.map((s, i) => `<span class="sedit" contenteditable="true" data-arr="suggest" data-idx="${i}" data-field="">${esc(s)}${del('suggest', i)}</span>`).join('') + `<button class="addbtn" data-add="suggest" style="margin:0">+ Add suggestion</button>`;
      } else {
        sug.innerHTML = D.suggest.map(s => `<button>${esc(s)}</button>`).join('');
        sug.querySelectorAll('button').forEach(b => b.onclick = () => send(b.textContent));
      }
    }
    function renderCustom() {
      $('customWrap').innerHTML = D.custom.map((sec, i) => {
        const items = sec.items.map((it, j) => `<div class="it"><span class="del" data-delc="${i}" data-iidx="${j}" title="Delete">×</span><div class="t" ${editMode ? `contenteditable="true" data-citem="${i}" data-iidx="${j}" data-field="t"` : ''}>${esc(it.t)}</div><div class="d" ${editMode ? `contenteditable="true" data-citem="${i}" data-iidx="${j}" data-field="d"` : ''}>${esc(it.d)}</div></div>`).join('');
        return `<div class="cell c-custom">${del('custom', i)}<div class="label" ${editMode ? `contenteditable="true" data-ctitle="${i}"` : ''}>${esc(sec.title)}</div>${items}<button class="addbtn" data-addc="${i}">+ Add item</button></div>`;
      }).join('');
    }
    function renderMetrics() {
      const wrap = $('metricWrap');
      wrap.innerHTML = D.metrics.map((m, i) => {
        if (editMode) return `<div class="cell c-metric">${del('metrics', i)}<div class="num" contenteditable="true" data-arr="metrics" data-idx="${i}" data-field="display">${esc(m.display)}</div><div class="cap" contenteditable="true" data-arr="metrics" data-idx="${i}" data-field="cap">${esc(m.cap)}</div></div>`;
        const p = parseMetric(m.display);
        const inner = p.n != null ? `<span class="v">${metricsAnimated ? fmt(p.n, p.dec) : '0'}</span><span class="suf">${esc(p.suf)}</span>` : `<span class="v">${esc(m.display)}</span>`;
        return `<div class="cell c-metric"><div class="num num-feat" data-n="${p.n}" data-dec="${p.dec}">${inner}</div><div class="cap">${esc(m.cap)}</div></div>`;
      }).join('') + (editMode ? `<div class="cell c-metric addcard" data-add="metrics">＋</div>` : '');
      if (!editMode && !metricsAnimated) { animateMetrics(); metricsAnimated = true; }
    }
    function fmt(n, dec) { const f = dec ? (+n).toFixed(dec) : Math.round(n).toString(); const p = f.split('.'); p[0] = p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); return p.join('.'); }
    function animateMetrics() {
      $('metricWrap').querySelectorAll('.num[data-n]').forEach(numEl => {
        const n = parseFloat(numEl.dataset.n); if (isNaN(n)) return; const dec = +numEl.dataset.dec || 0; const v = numEl.querySelector('.v'); const t0 = performance.now();
        (function s(t) { const pr = Math.min((t - t0) / 1100, 1); v.textContent = fmt(pr * pr * (3 - 2 * pr) * n, dec); if (pr < 1) requestAnimationFrame(s); })(t0);
      });
    }

    /* write-back */
    document.addEventListener('input', e => {
      const t = e.target; if (!t.isContentEditable) return; const ds = t.dataset;
      if (ds.k !== undefined) { D[ds.k] = (HTMLK.has(ds.k) || ds.html) ? t.innerHTML : t.textContent; }
      else if (ds.arr !== undefined) { if (ds.field) D[ds.arr][+ds.idx][ds.field] = t.textContent; else D[ds.arr][+ds.idx] = t.textContent; }
      else if (ds.ctitle !== undefined) { D.custom[+ds.ctitle].title = t.textContent; }
      else if (ds.citem !== undefined) { D.custom[+ds.citem].items[+ds.iidx][ds.field] = t.textContent; }
      else if (ds.p !== undefined) { P[ds.p] = t.textContent; if (ds.p === 'email') $('ctaEmail').href = "mailto:" + P.email; if (ds.p === 'linkedin') $('ctaLi').href = P.linkedin; if (ds.p === 'whatsapp') $('ctaWa').href = P.whatsapp; }
    });

    /* add / delete (delegated) */
    const NEW = {
      chips: () => "New tag", suggest: () => "New question?",
      metrics: () => ({ display: "100%", cap: "New metric" }),
      exp: () => ({ yr: "Year", role: "New role", co: "Company", d: "What you did and the impact." }),
      edu: () => ({ school: "School / University", meta: "Degree · Years", gpa: "GPA / score" }),
      cert: () => "New certification (Year)", skills: () => "New skill",
      beyond: () => ({ t: "🔧 New item", d: "Short description." }),
      proj: () => ({ name: "New Project", cap: "📸 add a screenshot", desc: "Describe what you built and the impact.", tag: "Category · Tag", img: null }),
      custom: () => ({ title: "New Section", items: [{ t: "Item title", d: "Description." }] })
    };
    document.addEventListener('click', e => {
      const add = e.target.closest('[data-add]'); if (add) { D[add.dataset.add].push(NEW[add.dataset.add]()); render(); return; }
      const addc = e.target.closest('[data-addc]'); if (addc) { D.custom[+addc.dataset.addc].items.push({ t: "New item", d: "Description." }); render(); return; }
      const delc = e.target.closest('[data-delc]'); if (delc) { D.custom[+delc.dataset.delc].items.splice(+delc.dataset.iidx, 1); render(); return; }
      const d = e.target.closest('[data-del]'); if (d) { D[d.dataset.del].splice(+d.dataset.i, 1); render(); }
    });

    /* images + resume */
    $('photoPh').addEventListener('click', () => { if (editMode) pickImg(d => { P.photo = d; render(); }); });
    function pickImg(cb) { const i = document.createElement('input'); i.type = 'file'; i.accept = 'image/*'; i.onchange = ev => { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => cb(r.result); r.readAsDataURL(f); }; i.click(); }
    function pickProjImg(i) { pickImg(d => { D.proj[i].img = d; render(); }); }
    $('resumeBtn').onclick = () => { const i = document.createElement('input'); i.type = 'file'; i.accept = 'application/pdf'; i.onchange = ev => { const f = ev.target.files[0]; if (!f) return; const r = new FileReader(); r.onload = () => { P.resumeData = r.result; P.resumeName = f.name; render(); alert('Resume ready. Click "Download CV" to test.'); }; r.readAsDataURL(f); }; i.click(); };

    /* theme */
    $('themeBtn').onclick = () => { const n = document.body.dataset.theme === 'dark' ? 'light' : 'dark'; document.body.dataset.theme = n; $('themeBtn').textContent = n === 'dark' ? '🌙' : '☀️'; };

    /* PIN edit */
    $('editBtn').innerHTML = ICON_LOCK;
    $('editBtn').onclick = () => {
      if (editMode) { editMode = false; $('editBtn').classList.remove('active'); $('editBtn').innerHTML = ICON_LOCK; render(); }
      else { $('pinErr').style.display = 'none'; $('pinInput').value = ''; $('pinModal').classList.add('show'); setTimeout(() => $('pinInput').focus(), 60); }
    };
    function tryPin() { if ($('pinInput').value === PIN_CODE) { $('pinModal').classList.remove('show'); editMode = true; $('editBtn').classList.add('active'); $('editBtn').innerHTML = ICON_UNLOCK; render(); } else { $('pinErr').style.display = 'block'; $('pinInput').value = ''; $('pinInput').focus(); } }
    $('pinOk').onclick = tryPin; $('pinInput').addEventListener('keydown', e => { if (e.key === 'Enter') tryPin(); }); $('pinCancel').onclick = () => $('pinModal').classList.remove('show');

    /* export */
    $('exportBtn').onclick = () => { const out = { profile: { name: P.name, nick: P.nick, location: P.location, email: P.email, linkedin: P.linkedin, whatsapp: P.whatsapp, resumeUrl: P.resumeUrl, photo: P.photo }, content: D }; $('jsonOut').value = JSON.stringify(out, null, 2); $('modal').classList.add('show'); };
    $('closeModal').onclick = () => $('modal').classList.remove('show');
    $('copyJson').onclick = () => { $('jsonOut').select(); try { document.execCommand('copy'); const b = $('copyJson'); b.textContent = '✓'; setTimeout(() => b.textContent = 'Copy', 1200); } catch (e) { } };

    /* AI chat */
    function buildContext() {
      return `You are the AI assistant embedded on the portfolio website of Teguh Saputra Monoarfa (nickname Teguh). Your ONLY job is to answer questions about Teguh based on his uploaded resume. Reply in English or Indonesia. Be warm, concise (2-5 sentences), specific, and use his real numbers. Speak about him in third person. Emphasize his technical and AI work when relevant. If a question is unrelated to Teguh's professional profile, politely say you can only answer questions about Teguh's background and suggest what they could ask.

=== RESUME ===
NAME: Teguh Saputra Monoarfa. Location: Jakarta, Indonesia. Email: teguhsaputra412@gmail.com. LinkedIn: linkedin.com/in/teguhsaputra412.
TITLE: Growth & Business Operations generalist | Product Consultant & Implementation | Customer Experience.
SUMMARY: Built a CX function from the ground up at a B2B SaaS, led CS teams across regional e-commerce (Lazada PH, Temu EU), runs operations across tooling, data and AI. Thinks in CSAT, churn, retention, feature adoption; builds reporting tools and dashboards; translates user needs into processes and product decisions. Detail-oriented, fast learner, deeply committed to learning and building with AI.
EXPERIENCE:
1) Dealls, Jakarta — Product Consultant & Implementation Specialist, KantorKu HRIS (B2B SaaS) — Nov 2024–Present. Rebuilt the CX function (team restructuring, knowledge base, quarterly targets). Designed & ran CSAT dashboard + weekly reporting: 97.9% CSAT and 82.4% ISS. Identified churn drivers (feature mismatch, failed adoption) and fed them to Product & Engineering. Managed HRIS implementation across 300+ companies / 6,000+ headcount; time-to-value <15 days; 100% retention (2026). Owned prompt engineering & deployment of internal AI agent KIRA (daily team tool). Analyzed chat history across personas (HR Admin, Employee, Prospect) with AI tools to produce structured FAQs, product insights, recommendations.
2) Transcosmos Indonesia, Yogyakarta — Customer Service Team Leader, Lazada (PH) — Jun–Nov 2024. Led 15 agents; 71.85% CSAT; daily coaching; promoted SME → Team Leader in 2 months.
3) Teleperformance Indonesia, Yogyakarta — Customer Resolution Senior Specialist (Tier 2), Temu (EU) — Jan–Jun 2024. Complex Tier 2 escalations; documentation reduced Tier 2 escalation volume by 82%; promoted Tier 1 → Tier 2 in 1 month.
SKILLS: CX strategy, dashboards & reporting, knowledge management, vendor evaluation, onboarding & training, churn & retention analysis, KPI tracking; Python, SQL, Excel, Google Sheets, Tableau, EDA, visualization; JIRA, Confluence, Trello, Coda; AI/LLM & prompt engineering; Claude, ChatGPT, Gemini, Deepseek, Ollama, Groq; Vercel, Netlify, Google Apps Script; team management, coaching, cross-functional collaboration. Languages: Bahasa Indonesia (native), English (professional working), Indonesian Sign Language BISINDO Level 2.
PROJECTS: User Onboarding & Training Program; Prompt Engineering & Integration of CX AI Agent KIRA; Product Knowledge Base Dashboard; CX Analytics Dashboard (CSAT & ISS); Client Analytics Dashboard (churn, renewal & retention).
EDUCATION: Universitas Negeri Gorontalo (UNG), Bachelor of Communication, 2016–2023, GPA 3.65/4.00.
CERTIFICATIONS: BISINDO Level 2 (2026); Alibaba Cloud Big Data Certified (2024); DBS Foundation Coding Camp ML Developer (2024); Indosat IOH ID.CAMP Data Scientist (2023); Lintasarta Cloudeka Digischool ML (2023).
=== END RESUME ===`;
    }
    const box = $('chatbox'), input = $('chatinput'), sendBtn = $('chatsend'), history = [];
    function addMsg(text, who) { const el = document.createElement('div'); el.className = 'msg ' + who; el.textContent = text; box.appendChild(el); box.scrollTop = box.scrollHeight; return el; }
    async function send(q) {
      if (!q.trim()) return;
      if (!box.classList.contains('show')) { box.classList.add('show'); addMsg(D.ai_hello, 'bot'); }
      input.value = ''; sendBtn.disabled = true;
      addMsg(q, 'me');
      const typing = document.createElement('div'); typing.className = 'msg bot'; typing.innerHTML = '<div class="typing"><span></span><span></span><span></span></div>'; box.appendChild(typing); box.scrollTop = box.scrollHeight;
      history.push({ role: 'user', content: q });
      try {
        const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ system: buildContext(), messages: history }) });
        const data = await res.json();
        const txt = (data.text || "").trim() || (data.error ? ("⚠ " + data.error) : "Sorry, something went wrong. Try again.");
        typing.remove(); addMsg(txt, 'bot'); history.push({ role: 'assistant', content: txt });
      } catch (e) { typing.remove(); addMsg("Couldn't reach the AI service. Locally, set GROQ_API_KEY in .env.local and run `vercel dev`. On Vercel, add it under Settings → Environment Variables.", 'bot'); }
      sendBtn.disabled = false; input.focus();
    }
    sendBtn.onclick = () => send(input.value);
    input.addEventListener('keydown', e => { if (e.key === 'Enter') send(input.value) });

    (async function init() {
      try { const r = await fetch('/data/profile.json', { cache: 'no-store' }); if (r.ok) { const j = await r.json(); if (j.profile) Object.assign(P, j.profile); if (j.content) Object.assign(D, j.content); } } catch (e) { }
      render();
      setTimeout(() => document.body.classList.add('loaded'), 900);
    })();
  