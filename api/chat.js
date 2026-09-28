function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  return history
    .filter(item => item && ["user", "assistant", "bot"].includes(item.role) && typeof item.content === "string")
    .slice(-8)
    .map(item => ({
      role: item.role === "bot" ? "assistant" : item.role,
      content: item.content.slice(0, 4000)
    }));
}

function json(res, status, body) {
  res.status(status).setHeader("Cache-Control", "no-store").json(body);
}

function extractReply(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content.map(part => typeof part === "string" ? part : part?.text || "").join("").trim();
  }
  if (typeof data?.reply === "string") return data.reply;
  if (typeof data?.response === "string") return data.response;
  return "";
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    return res.status(204).end();
  }

  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  try {
    const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";
    if (!message) return json(res, 400, { error: "message is required" });
    if (message.length > 4000) return json(res, 413, { error: "message too long" });

    const modelUrl = process.env.MODEL_URL || "";
    const modelName = process.env.MODEL_NAME || "local-model";
    const apiKey = process.env.MODEL_API_KEY || "";
    const authHeader = process.env.MODEL_AUTH_HEADER || "Authorization";
    const authPrefix = process.env.MODEL_AUTH_PREFIX ?? "Bearer ";

    if (!modelUrl) {
      return json(res, 200, {
        reply: "☁️ Cloud Brain+ está conectado, pero no hay un MODEL_URL configurado. Añade tu endpoint self-hosted en Vercel.",
        brain: "cloud+",
        version: "0.6",
        modelConfigured: false
      });
    }

    const headers = { "Content-Type": "application/json" };
    if (apiKey) headers[authHeader] = authPrefix + apiKey;

    const started = Date.now();
    const response = await fetch(modelUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "system",
            content: "You are ChatPet Cloud Brain+. Be helpful, concise, safe, and honest. Do not claim to be a human. Use the conversation context when relevant."
          },
          ...cleanHistory(req.body?.history),
          { role: "user", content: message }
        ],
        temperature: 0.7,
        max_tokens: 512
      })
    });

    if (!response.ok) throw new Error("Model HTTP " + response.status);

    const data = await response.json();
    const reply = extractReply(data);
    if (!reply.trim()) throw new Error("Unsupported model response format");

    return json(res, 200, {
      reply: reply.trim(),
      brain: "cloud+",
      version: "0.6",
      model: modelName,
      latencyMs: Date.now() - started
    });
  } catch {
    return json(res, 502, { error: "Cloud Brain+ request failed" });
  }
}
