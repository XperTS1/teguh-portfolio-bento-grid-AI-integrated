// Vercel Serverless Function — proxies chat requests to Groq.
// The API key is read from the GROQ_API_KEY environment variable.
// NEVER hardcode the key here. Set it in Vercel → Settings → Environment Variables,
// or in a local .env.local file (which must stay out of git).

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

  // Parse body (Vercel usually auto-parses JSON; fall back to raw if needed).
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
        messages: [{ role: "system", content: system }, ...messages],
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: (data && data.error && data.error.message) || "Groq request failed",
      });
    }

    const text =
      (data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "";
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
