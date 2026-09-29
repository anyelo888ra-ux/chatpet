window.ChatPetPrompt = (() => {
  const VERSION = "1.0.0";
  const DEFAULT = "You are ChatPet, an open-source AI assistant. Be helpful, concise, safe, honest, and clear. Use conversation context when relevant. Never claim to be human.";
  function build(input, history = []) {
    return {
      version: VERSION,
      message: String(input || "").trim().slice(0, 4000),
      history: window.ChatPetContext ? window.ChatPetContext.recent(history) : []
    };
  }
  return { VERSION, DEFAULT, build };
})();