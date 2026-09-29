import { providerName } from "./lib/model.js";

export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  res.setHeader("Cache-Control", "no-store");
  const maxTokens = Math.max(64, Math.min(4096, Number(process.env.MODEL_MAX_TOKENS) || 1024));
  const timeoutMs = Math.max(5000, Math.min(60000, Number(process.env.MODEL_TIMEOUT_MS) || 30000));
  res.status(200).json({
    status: "online",
    version: "0.9.5",
    brain: "pre-1.0-final-candidate",
    modelConfigured: Boolean(process.env.MODEL_URL),
    authConfigured: Boolean(process.env.MODEL_API_KEY),
    provider: providerName(),
    maxContextMessages: 24,
    maxTokens,
    timeoutMs,
    realModelReady: Boolean(process.env.MODEL_URL)
  });
}
