# Teguh Web Portfolio

> *"I'm not a developer. I've never written a line of production code in my life. But I just shipped a live portfolio with a built-in AI assistant, and I did it in days, not months."*

🌐 **Live site → [teguh-web-portfolio.vercel.app](https://teguh-web-portfolio.vercel.app/)**

---

## How this started

I've been working in Customer Experience and Business Operations for years. Building dashboards, deploying AI agents, running analytics pipelines, onboarding hundreds of companies to HRIS software. The work was technical, the output was real, but I never had a place that showed *who I am* and *what I've built* in a way that felt honest and modern.

The standard options felt wrong. A PDF resume is flat. LinkedIn is noisy. A generic portfolio template felt like wearing someone else's clothes.

So I decided to build my own. Without a developer background. Using AI as my co-builder.

---

## What I built (and how)

This portfolio is a **bento-grid, dark/light-mode web app** with a feature I'm genuinely proud of: a **live AI assistant**, trained on my resume, that can answer any question a recruiter or hiring manager might have before we've even spoken.

Ask it anything. *What results did he deliver? How does he work with AI? Is he a good fit for this role?* It answers from my actual experience, bounded strictly to my profile.

The whole thing was built through **vibe coding** — using AI tools as a creative and technical partner, describing what you want, iterating in real time, and shipping something that works. No bootcamp. No stack overflow rabbit holes. Just clear thinking, good prompts, and a lot of iteration.

**Under the hood:**
- Single-file static site (`index.html`) — no framework, no build step
- AI chat powered by **Groq** (`openai/gpt-oss-120b`) via a serverless function
- **Resume source is live** — AI reads directly from Google Docs on every query (5-min cache). Update your CV in Google Docs → AI answers reflect it within minutes, no redeploy needed
- **Download CV** pulls the latest PDF export directly from Google Docs — always up to date
- Content-editable directly from the UI via a PIN-protected Edit Mode
  - All section titles editable
  - Photos uploadable with drag-to-reposition precision control
  - Export edits as `profile.json` → push → Vercel redeploys
- Assets (photos, project screenshots) stored as separate files in `/images/` — not bloated into JSON
- Dark / light mode, fully responsive, ocean × indigo theme, Inter font
- Local dev server (`server.js`) — run with `node server.js`, no Vercel account needed

---

## Running locally

```bash
# 1. Clone the repo
git clone https://github.com/XperTS1/teguh-portfolio-bento-grid-AI-integrated.git
cd teguh-portfolio-bento-grid-AI-integrated

# 2. Add your Groq API key
echo "GROQ_API_KEY=your_key_here" > .env.local

# 3. Start the local server
node server.js

# 4. Open http://localhost:3000
```

Get a free Groq API key at [console.groq.com](https://console.groq.com).

---

## What this project means to me

This is more than a portfolio. It's proof of something I believe deeply:

**You don't need a developer title to build developer-grade things.**

The gap between "I have an idea" and "this is live on the internet" used to be massive, filled with years of learning syntax, debugging environments, and dependency hell. That gap is closing fast. And the people who learn to close it — who can think clearly about what they want and use AI to build it — are going to do things that weren't possible before.

I'm one of those people. This portfolio is the evidence.

---

*Built entirely with AI assistance. Designed with intention. Deployed with one push.*

**→ [teguh-web-portfolio.vercel.app](https://teguh-web-portfolio.vercel.app/)**
