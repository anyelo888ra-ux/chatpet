window.ChatPetLocalBrain = (() => {
  const intents = [
    {name:"greeting",patterns:[/^(hi|hello|hey|hola|buenas|ey)\b/i],reply:"¡Hola! 🐾 Soy ChatPet. Mi Local Brain v0.4 está funcionando."},
    {name:"version",patterns:[/\b(version|versión|release)\b/i],reply:"Estoy en ChatPet v0.4: Local Brain+. Esta versión añade memoria controlable, comandos, import/export, diagnóstico y mejor contexto."},
    {name:"api",patterns:[/\b(api key|apikey|clave)\b/i],reply:"ChatPet v0.4 no necesita una API key comercial. El cerebro actual funciona localmente en tu navegador."},
    {name:"github",patterns:[/\b(github|repositorio|open.?source)\b/i],reply:"ChatPet es open-source y está diseñado para que el cerebro pueda cambiar de implementación sin rehacer la interfaz."},
    {name:"help",patterns:[/\b(ayuda|help|qué puedes|que puedes)\b/i],reply:"Puedo responder sobre ChatPet, detectar intenciones básicas, usar contexto reciente y reconocer comandos del modo desarrollador."},
    {name:"brain",patterns:[/\b(local brain|cerebro local|cerebro)\b/i],reply:"El Local Brain+ v0.4 combina reglas, intención, similitud de mensajes y contexto reciente. Sigue siendo un motor ligero, no un LLM."},
    {name:"memory",patterns:[/\b(memoria|memory|recuerd)\b/i],reply:"La memoria de ChatPet es local y ahora puede activarse o desactivarse desde el panel."},
    {name:"limits",patterns:[/\b(límite|limite|limits?|rate)\b/i],reply:"El prototipo usa un límite local de 20 mensajes por minuto. Es una demostración, no una protección de servidor."}
  ];
  const stop=new Set(["que","como","para","este","esta","esto","con","los","las","una","uno","por","del","the","and","you","can","are"]);
  function normalize(text){return text.trim().replace(/\s+/g," ");}
  function tokens(text){return new Set((text.toLowerCase().match(/[a-záéíóúñ0-9]+/gi)||[]).filter(w=>w.length>2&&!stop.has(w)));}
  function similarity(a,b){const aa=tokens(a),bb=tokens(b);if(!aa.size||!bb.size)return 0;let common=0;for(const w of aa)if(bb.has(w))common++;return common/Math.max(aa.size,bb.size);}
  function detectIntent(text){for(const intent of intents)if(intent.patterns.some(p=>p.test(text)))return intent;return null;}
  function recent(messages){return messages.filter(m=>m.role==="user").slice(-8);}
  function reply(input,messages=[]){
    const clean=normalize(input), intent=detectIntent(clean);
    if(intent)return intent.reply;
    const history=recent(messages);
    if(history.length){
      const best=history.map(message=>({message,score:similarity(clean,message.content)})).sort((a,b)=>b.score-a.score)[0];
      if(best&&best.score>=0.5)return "🐾 Esto conecta con algo que dijiste antes: “"+best.message.content+"”. Estoy usando ese contexto local.";
    }
    if(/^(por qué|porque|why)\b/i.test(clean))return "🐾 Aún no tengo razonamiento profundo, pero puedo relacionar palabras y contexto reciente en esta versión.";
    if(clean.endsWith("?"))return "🐾 Buena pregunta. Puedo analizarla con mi motor local, aunque todavía no tengo las capacidades de un LLM.";
    return "🐾 Entiendo: “"+clean+"”. Local Brain+ v0.4 procesó el mensaje sin salir del navegador.";
  }
  return {reply,detectIntent,similarity};
})();