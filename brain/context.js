window.ChatPetContext = (() => {
  const MAX_MESSAGES = 24;
  const MAX_CHARS_PER_MESSAGE = 4000;
  function normalize(messages = []) {
    if (!Array.isArray(messages)) return [];
    return messages.filter(m => m && ["user","bot","assistant"].includes(m.role) && typeof m.content === "string")
      .slice(-MAX_MESSAGES)
      .map(m => ({ role: m.role === "bot" ? "assistant" : m.role, content: String(m.content).trim().slice(0, MAX_CHARS_PER_MESSAGE) }))
      .filter(m => m.content);
  }
  function recent(messages = []) { return normalize(messages); }
  return { MAX_MESSAGES, MAX_CHARS_PER_MESSAGE, normalize, recent };
})();