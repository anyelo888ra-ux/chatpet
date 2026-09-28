const http = require("node:http");

const PORT = Number(process.env.PORT || 8787);
const MODEL_URL = process.env.MODEL_URL || "";
const MODEL_NAME = process.env.MODEL_NAME || "local-model";
const MAX_BODY = 12000;
const MAX_HISTORY = 8;

function send(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": process.env.CORS_ORIGIN || "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  });
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
      if (body.length > MAX_BODY) {
        reject(new Error("Body too large"));
        req.destroy();
      }
    });
    req.on("end", () => resolve(body));
    req.on("error", reject);
  });
}

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(item => item && ["user", "bot"].includes(item.role) && typeof item.content === "string")
    .slice(-MAX_HISTORY)
    .map(item => ({
      role: item.role === "bot" ? "assistant" : "user",
      content: item.content.slice(0, 4000)
    }));
}

async function askModel(message, history) {
  if (!MODEL_URL) {
    return "☁️ Cloud Brain está conectado, pero no hay un MODEL_URL configurado. Conecta un modelo local/self-hosted para generar respuestas reales.";
  }

  const messages = [
    {
      role: "system",
      content: "You are ChatPet Cloud Brain. Be helpful, concise, and safe. Do not claim to be a human."
    },
    ...history,
    { role: "user", content: message }
  ];

  const response = await fetch(MODEL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: MODEL_NAME,
      messages,
      temperature: 0.7,
      max_tokens: 512
    })
  });

  if (!response.ok) {
    throw new Error("Model HTTP " + response.status);
  }

  const data = await response.json();
  const reply =
    data?.choices?.[0]?.message?.content ??
    data?.reply ??
    data?.response;

  if (typeof reply !== "string" || !reply.trim()) {
    throw new Error("Unsupported model response format");
  }

  return reply.trim();
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});

  if (req.method === "GET" && req.url === "/health") {
    return send(res, 200, {
      status: "online",
      version: "0.5",
      brain: "cloud",
      modelConfigured: Boolean(MODEL_URL)
    });
  }

  if (req.method !== "POST" || req.url !== "/api/chat") {
    return send(res, 404, { error: "Not found" });
  }

  try {
    const raw = await readBody(req);
    const data = JSON.parse(raw || "{}");
    const message = typeof data.message === "string" ? data.message.trim() : "";

    if (!message) return send(res, 400, { error: "message is required" });
    if (message.length > 4000) return send(res, 413, { error: "message too long" });

    const reply = await askModel(message, cleanHistory(data.history));
    return send(res, 200, { reply, brain: "cloud", version: "0.5" });
  } catch (error) {
    return send(res, 500, { error: "Cloud Brain request failed" });
  }
});

server.listen(PORT, () => {
  console.log(`ChatPet Cloud Brain v0.5 listening on port ${PORT}`);
});
