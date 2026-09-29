window.ChatPetPrompt = (() => {
  const DEFAULT = "You are ChatPet, an open-source AI assistant. Be helpful, concise, safe, honest, and clear. Use conversation context when relevant. Never claim to be human.";

  function build(input, history = []) {
    return {
      message: String(input || "").trim().slice(0, 4000),
      history: window.ChatPetContext ? window.ChatPetContext.recent(history) : history.slice(-24)
    };
  }

  return { DEFAULT, build };
})();
