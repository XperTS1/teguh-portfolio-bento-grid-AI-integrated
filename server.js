// Local dev server — replaces `vercel dev` without needing a Vercel account.
// Usage: node server.js
// Reads GROQ_API_KEY from .env.local automatically.

const http = require("http");
const fs = require("fs");
const path = require("path");

// Load .env.local
const envPath = path.join(__dirname, ".env.local");
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, "utf8")
    .split("\n")
    .forEach((line) => {
      const [k, ...rest] = line.split("=");
      if (k && k.trim() && !k.trim().startsWith("#")) {
        process.env[k.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
      }
    });
}

const PORT = 3000;
const ROOT = __dirname;

const DOC_ID = "1jOuzwezYQ1KTYdAsgUYu0ffU5Al1EzScqOtmO4dR094";
const GDOC_URL = `https://docs.google.com/document/d/${DOC_ID}/export?format=txt`;
const CACHE_TTL = 5 * 60 * 1000;
let cvCache = { text: null, ts: 0 };

async function fetchCV() {
  if (cvCache.text && Date.now() - cvCache.ts < CACHE_TTL) return cvCache.text;
  try {
    const r = await fetch(GDOC_URL);
    if (r.ok) cvCache = { text: await r.text(), ts: Date.now() };
  } catch {}
  return cvCache.text;
}

const MIME = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":   "application/javascript",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf":  "application/pdf",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
};

async function handleChat(req, res) {
  if (req.method !== "POST") {
    res.writeHead(405); res.end("Method not allowed"); return;
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "GROQ_API_KEY not set in .env.local" }));
    return;
  }

  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", async () => {
    try {
      const parsed = JSON.parse(body);
      const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

      const cvText = await fetchCV();
      const system = parsed.system || "";
      const fullSystem = cvText
        ? `=== RESUME (live from Google Docs) ===\n${cvText}\n=== END RESUME ===\n\n${system}`
        : system;

      const upstream = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          temperature: 0.4,
          max_tokens: 800,
          messages: [{ role: "system", content: fullSystem }, ...(parsed.messages || [])],
        }),
      });

      const data = await upstream.json();
      if (!upstream.ok) {
        res.writeHead(upstream.status, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: (data.error && data.error.message) || "Groq error" }));
        return;
      }

      const text = data?.choices?.[0]?.message?.content || "";
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ text }));
    } catch (e) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: e.message }));
    }
  });
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // CORS headers for local dev
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (pathname === "/api/chat") {
    handleChat(req, res);
    return;
  }

  // Serve static files
  let filePath = path.join(ROOT, pathname === "/" ? "index.html" : pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  // If directory, serve index.html inside it
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end("Not found: " + pathname); return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || "application/octet-stream";
  res.writeHead(200, { "Content-Type": contentType });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`\n  Local dev server running at http://localhost:${PORT}\n`);
  console.log(`  GROQ_API_KEY: ${process.env.GROQ_API_KEY ? "✓ loaded" : "✗ not found — check .env.local"}`);
});
