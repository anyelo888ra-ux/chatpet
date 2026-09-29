window.ChatPetCloudBrain = (() => {
  const ENDPOINT = "/api/chat";
  const TIMEOUT_MS = 60000;

  async function reply(input, messages = []) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const request = window.ChatPetPrompt
        ? window.ChatPetPrompt.build(input, messages)
        : {
            message: String(input).slice(0, 4000),
            history: window.ChatPetContext ? window.ChatPetContext.recent(messages) : messages.slice(-24)
          };

      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify(window.ChatPetVision?.attach(request) || request)
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || "ChatPet AI HTTP " + response.status);
      if (!data || typeof data.reply !== "string") throw new Error("Invalid ChatPet AI response");
      return data.reply;
    } catch (error) {
      if (error?.name === "AbortError") throw new Error("ChatPet AI timeout");
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  return { reply };
})();
