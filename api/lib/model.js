function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages
    .filter(item => item && ["system", "user", "assistant", "bot"].includes(item.role) && typeof item.content === "string")
    .slice(-24)
    .map(item => ({
      role: item.role === "bot" ? "assistant" : item.role,
      content: item.content.trim().slice(0, 4000)
    }))
    .filter(item => item.content);
}

function extractOpenAIReply(data) {
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map(part => typeof part === "string" ? part : part?.text || "").join("").trim();
  if (typeof data?.reply === "string") return data.reply;
  if (typeof data?.response === "string") return data.response;
  return "";
}

function extractOllamaReply(data) {
  return typeof data?.message?.content === "string" ? data.message.content : "";
}

function providerName() {
  const provider = (process.env.MODEL_PROVIDER || "openai-compatible").toLowerCase();
  return provider === "ollama" ? "ollama" : "openai-compatible";
}

async function requestModel({ modelUrl, modelName, messages, temperature, maxTokens, apiKey, authHeader, authPrefix, systemPrompt }) {
  const provider = providerName();
  const controller = new AbortController();
  const timeoutMs = Math.max(5000, Math.min(60000, Number(process.env.MODEL_TIMEOUT_MS) || 30000));
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const headers = { "Content-Type": "application/json" };
    if (apiKey && provider !== "ollama") headers[authHeader] = authPrefix + apiKey;

    const payload = provider === "ollama"
      ? {
          model: modelName,
          messages,
          stream: false,
          options: { temperature, num_predict: maxTokens }
        }
      : {
          model: modelName,
          messages,
          temperature,
          max_tokens: maxTokens
        };

    const response = await fetch(modelUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error("Model HTTP " + response.status);

    const reply = provider === "ollama" ? extractOllamaReply(data) : extractOpenAIReply(data);
    if (!reply.trim()) throw new Error("Unsupported model response format");

    return {
      reply: reply.trim(),
      provider,
      model: modelName,
      timeoutMs
    };
  } finally {
    clearTimeout(timer);
  }
}

export { normalizeMessages, providerName, requestModel };
