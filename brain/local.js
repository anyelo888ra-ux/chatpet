window.ChatPetLocalBrain = (() => {
  const rules = [
    { test: /^(hi|hello|hey|hola|buenas|ey)\b/i, reply: "¡Hola! 🐾 Soy ChatPet. Mi cerebro local v0.2 está funcionando." },
    { test: /\b(version|versión)\b/i, reply: "Estoy en ChatPet v0.2: Local Brain. La interfaz y el cerebro ya están separados para futuras versiones." },
    { test: /\b(api key|apikey)\b/i, reply: "ChatPet v0.2 no necesita una API key. El cerebro actual funciona localmente en tu navegador." },
    { test: /\b(github|repositorio)\b/i, reply: "ChatPet es open-source. El frontend puede seguir en GitHub Pages mientras el cerebro evoluciona." },
    { test: /\b(ayuda|help)\b/i, reply: "Puedes hablar conmigo, preguntar por mi versión, preguntar qué es el Local Brain o escribir cualquier mensaje para probar el contexto local." },
    { test: /\b(local brain|cerebro local)\b/i, reply: "El Local Brain v0.2 procesa tu mensaje dentro del navegador. No envía la conversación a un proveedor de IA." },
    { test: /\b(límite|limite|limits?)\b/i, reply: "El límite del prototipo sigue siendo local y sirve como fair-use de demostración. En una futura versión cloud, los límites reales deberán estar en el servidor." }
  ];

  function normalize(text) {
    return text.trim().replace(/\s+/g, " ");
  }

  function recentContext(messages) {
    return messages.filter(message => message.role === "user").slice(-3).map(message => message.content).join(" ");
  }

  function reply(input, messages) {
    const clean = normalize(input);
    for (const rule of rules) {
      if (rule.test.test(clean)) return rule.reply;
    }
    const context = recentContext(messages);
    if (context && context.toLowerCase().includes(clean.toLowerCase()) && clean.length > 3) {
      return "🐾 Recuerdo que acabas de mencionar: “" + clean + "”. El contexto de esta conversación se mantiene localmente.";
    }
    if (clean.endsWith("?")) {
      return "🐾 Buena pregunta. Todavía soy un cerebro local ligero, así que mi conocimiento es limitado, pero ya puedo usar el contexto reciente de la conversación.";
    }
    return "🐾 Entiendo: “" + clean + "”. Estoy procesando esto con el Local Brain v0.2, directamente en tu navegador.";
  }

  return { reply };
})();