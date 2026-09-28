window.ChatPetCloudBrain = (() => {
  const ENDPOINT = "/api/chat";

  async function reply(input, messages = []) {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: String(input),
        history: messages.slice(-8).map(m => ({
          role: m.role,
          content: String(m.content).slice(0, 4000)
        }))
      })
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(data?.error || "Cloud Brain+ HTTP " + response.status);
    }
    if (!data || typeof data.reply !== "string") {
      throw new Error("Invalid Cloud Brain+ response");
    }
    return data.reply;
  }

  return { reply };
})();
