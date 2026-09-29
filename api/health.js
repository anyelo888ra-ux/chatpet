export default function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    status: "online",
    version: "0.8",
    brain: "advanced-cloud",
    modelConfigured: Boolean(process.env.MODEL_URL),
    authConfigured: Boolean(process.env.MODEL_API_KEY),
    advancedCloud: true,
    maxContextMessages: 20,
    maxTokens: Math.max(64, Math.min(2048, Number(process.env.MODEL_MAX_TOKENS) || 768))
  });
}
