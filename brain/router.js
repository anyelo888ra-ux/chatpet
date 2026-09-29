window.ChatPetBrainRouter = (() => {
  const MODES = ["local", "cloud", "auto"];
  function next(mode) { const i=Math.max(0,MODES.indexOf(mode)); return MODES[(i+1)%MODES.length]; }
  function label(mode) { return mode==="cloud"?"CLOUD+":mode==="auto"?"AUTO":"LOCAL+"; }
  async function reply(mode,input,previous,state) {
    const local=()=>window.ChatPetLocalBrain?window.ChatPetLocalBrain.reply(input,previous):"🐾 Local Brain+ no cargado.";
    const cloud=async()=>{ if(!window.ChatPetCloudBrain) throw new Error("Cloud adapter unavailable"); return await window.ChatPetCloudBrain.reply(input,previous); };
    if(mode==="local") return {reply:local(),used:"local",cloud:false};
    if(mode==="cloud") return {reply:await cloud(),used:"cloud",cloud:true};
    if(state?.cloudOnline && state?.modelConfigured) {
      try { return {reply:await cloud(),used:"cloud",cloud:true}; }
      catch { return {reply:"☁️ Advanced Cloud no respondió. AUTO cambió a Local Brain+.\n\n"+local(),used:"local",cloud:false,fallback:true}; }
    }
    return {reply:"⚡ AUTO: Advanced Cloud no está disponible. Usando Local Brain+.\n\n"+local(),used:"local",cloud:false};
  }
  return {MODES,next,label,reply};
})();
