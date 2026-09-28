window.ChatPetLocalBrain = (() => {
  const rules = [
    { test: /^(hi|hello|hey|hola|buenas|ey)\b/i, reply: "¡Hola! 🐾 Soy ChatPet. Mi Local Brain v0.3 está funcionando." },
    { test: /\b(version|versión)\b/i, reply: "Estoy en ChatPet v0.3: Local Brain+. Ahora manejo mejor el contexto reciente y las intenciones." },
    { test: /\b(api key|apikey)\b/i, reply: "ChatPet v0.3 no necesita una API key. El cerebro actual funciona localmente en tu navegador." },
    { test: /\b(github|repositorio)\b/i, reply: "ChatPet es open-source. El frontend y el cerebro local pueden evolucionar sin depender de un proveedor comercial." },
    { test: /\b(ayuda|help)\b/i, reply: "Prueba saludos, preguntas sobre ChatPet, Local Brain, memoria, GitHub o continúa una conversación para probar el contexto." },
    { test: /\b(local brain|cerebro local)\b/i, reply: "El Local Brain+ v0.3 procesa tu mensaje dentro del navegador y puede usar contexto reciente sin enviar la conversación a un proveedor de IA." },
    { test: /\b(memoria|memory|recuerd)\b/i, reply: "La memoria de ChatPet sigue siendo local: el historial se guarda en localStorage de este navegador." },
    { test: /\b(límite|limite|limits?)\b/i, reply: "El límite del prototipo sigue siendo local y sirve como fair-use de demostración." }
  ];

  function normalize(text) {
    return text.trim().replace(/\s+/g, " ");
  }

  function keywords(text) {
    return new Set((text.toLowerCase().match(/[a-záéíóúñ0-9]+/gi) || []).filter(word => word.length > 2));
  }

  function similarity(a, b) {
    const aa = keywords(a), bb = keywords(b);
    if (!aa.size || !bb.size) return 0;
    let common = 0;
    for (const word of aa) if (bb.has(word)) common++;
    return common / Math.max(aa.size, bb.size);
  }

  function recentContext(messages) {
    return messages.filter(message => message.role === "user").slice(-5);
  }

  function reply(input, messages = []) {
    const clean = normalize(input);
    for (const rule of rules) {
      if (rule.test.test(clean)) return rule.reply;
    }

    const recent = recentContext(messages);
    if (recent.length) {
      const best = recent.map(message => ({ message, score: similarity(clean, message.content) }))
        .sort((a, b) => b.score - a.score)[0];

      if (best && best.score >= 0.45) {
        return "🐾 Esto parece relacionado con lo que dijiste antes: “" + best.message.content + "”. El contexto reciente se mantiene localmente.";
      }
    }

    if (clean.endsWith("?")) {
      return "🐾 Buena pregunta. Todavía soy un cerebro local ligero, pero v0.3 entiende mejor el contexto reciente.";
    }

    return "🐾 Entiendo: “" + clean + "”. Estoy procesando esto con el Local Brain+ v0.3, directamente en tu navegador.";
  }

  return { reply };
})();