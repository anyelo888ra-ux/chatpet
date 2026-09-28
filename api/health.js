export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    status: "online",
    version: "0.7",
    brain: "multi-brain",
    modelConfigured: Boolean(process.env.MODEL_URL),
    authConfigured: Boolean(process.env.MODEL_API_KEY)
  });
}
