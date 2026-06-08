const DOC_ID = "1jOuzwezYQ1KTYdAsgUYu0ffU5Al1EzScqOtmO4dR094";
const GDOC_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=txt`;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

let cvCache = { text: null, ts: 0 };

async function fetchCV() {
  if (cvCache.text && Date.now() - cvCache.ts < CACHE_TTL) return cvCache.text;
  try {
    const r = await fetch(GDOC_URL);
    if (r.ok) {
      cvCache = { text: await r.text(), ts: Date.now() };
    }
  } catch {}
  return cvCache.text;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY is not set. Add it in Vercel → Settings → Environment Variables.",
    });
  }

  let body = req.body;
  if (!body || typeof body === "string") {
    try {
      body = JSON.parse(body || (await readRaw(req)));
    } catch {
      body = {};
    }
  }

  const system = typeof body.system === "string" ? body.system : "";
  const messages = Array.isArray(body.messages) ? body.messages : [];
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

  const cvText = await fetchCV();
  const fullSystem = cvText
    ? `=== RESUME (live from Google Docs) ===\n${cvText}\n=== END RESUME ===\n\n${system}`
    : system;

  try {
    const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.4,
        max_tokens: 800,
        messages: [{ role: "system", content: fullSystem }, ...messages],
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: (data && data.error && data.error.message) || "Groq request failed",
      });
    }

    const text = data?.choices?.[0]?.message?.content || "";
    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "Upstream error: " + (e && e.message ? e.message : String(e)) });
  }
}

function readRaw(req) {
  return new Promise((resolve) => {
    let d = "";
    req.on("data", (c) => (d += c));
    req.on("end", () => resolve(d));
  });
}
