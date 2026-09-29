window.ChatPetCloudBrain = (() => {
  const ENDPOINT = "/api/chat";
  const TIMEOUT_MS = 25000;

  async function reply(input, messages = []) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          message: String(input).slice(0, 4000),
          history: messages.slice(-20).map(m => ({
            role: m.role,
            content: String(m.content).slice(0, 4000)
          }))
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "Cloud Brain+ HTTP " + response.status);
      if (!data || typeof data.reply !== "string") throw new Error("Invalid Cloud Brain+ response");
      return data.reply;
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("Cloud Brain+ timeout");
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  return { reply };
})();
