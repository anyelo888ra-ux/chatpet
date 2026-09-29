import { normalizeMessages, providerName, requestModel } from "./lib/model.js";

function json(res, status, body) {
  res.status(status).setHeader("Cache-Control", "no-store").json(body);
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
    const systemPrompt = process.env.MODEL_SYSTEM_PROMPT || "You are ChatPet, an open-source AI assistant. Be helpful, concise, safe, honest, and clear. Use conversation context when relevant. Never claim to be human.";
    const temperatureRaw = Number(process.env.MODEL_TEMPERATURE);
    const temperature = Number.isFinite(temperatureRaw) ? Math.max(0, Math.min(2, temperatureRaw)) : 0.7;
    const maxTokens = Math.max(64, Math.min(4096, Number(process.env.MODEL_MAX_TOKENS) || 1024));
    const history = normalizeMessages(req.body?.history);

    if (!modelUrl) {
      return json(res, 200, {
        reply: "☁️ ChatPet AI v1.0.0 está listo, pero no hay un MODEL_URL configurado. Conecta un modelo self-hosted para activar la IA real.",
        brain: "chatpet-ai",
        version: "1.0.0",
        modelConfigured: false,
        provider: providerName()
      });
    }

    const started = Date.now();
    const result = await requestModel({
      modelUrl,
      modelName,
      messages: [
        { role: "system", content: systemPrompt },
        ...history,
        { role: "user", content: message }
      ],
      temperature,
      maxTokens,
      apiKey,
      authHeader,
      authPrefix,
      systemPrompt
    });

    return json(res, 200, {
      reply: result.reply,
      brain: "chatpet-ai",
      version: "1.0.0",
      model: result.model,
      provider: result.provider,
      contextMessages: history.length,
      latencyMs: Date.now() - started
    });
  } catch (error) {
    const detail = error?.name === "AbortError" ? "Model request timeout" : "Model request failed";
    return json(res, 502, { error: detail });
  }
}
