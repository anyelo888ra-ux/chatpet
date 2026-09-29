function json(res, status, body) {
  res.status(status).setHeader("Cache-Control", "no-store").json(body);
}

export default async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed" });

  const gateway = process.env.WEB_TOOL_URL || "";
  if (!gateway) return json(res, 200, {
    available: false,
    answer: "🌐 Web access is not configured. Set WEB_TOOL_URL to a self-hosted browsing gateway."
  });

  const url = typeof req.body?.url === "string" ? req.body.url.trim() : "";
  const question = typeof req.body?.question === "string" ? req.body.question.trim() : "";
  if (!/^https?:\/\//i.test(url)) return json(res, 400, { error: "A valid http(s) URL is required" });
  if (!question) return json(res, 400, { error: "question is required" });
  if (url.length > 2000 || question.length > 4000) return json(res, 413, { error: "Input too long" });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);
  try {
    const response = await fetch(gateway, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, question }),
      signal: controller.signal
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error("Web gateway HTTP " + response.status);
    if (typeof data.answer !== "string") throw new Error("Invalid web gateway response");
    return json(res, 200, { available: true, answer: data.answer.slice(0, 12000), url });
  } catch (error) {
    return json(res, 502, { error: error?.name === "AbortError" ? "Web gateway timeout" : "Web gateway failed" });
  } finally {
    clearTimeout(timeout);
  }
}