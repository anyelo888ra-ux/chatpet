export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({
    status: "online",
    version: "0.5",
    brain: "cloud",
    modelConfigured: Boolean(process.env.MODEL_URL)
  });
}
