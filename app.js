const ChatPet = (() => {
  const KEY = "chatpet:v0.8:conversation";
  const SETTINGS = "chatpet:v0.8:settings";
  const MAX = 20, WINDOW = 60000;
  const state = { messages: [], timestamps: [], memory: true, theme: 0, brain: "local", cloudOnline: false, modelConfigured: false, lastUsedBrain: "local", cloudContext: 20 };
  const $ = selector => document.querySelector(selector);

  function escapeHtml(value) { return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) state.messages = saved.slice(-50);
      const settings = JSON.parse(localStorage.getItem(SETTINGS) || "{}");
      if (["local","cloud","auto"].includes(settings.brain)) state.brain = settings.brain;
      if (settings.theme) state.theme = 1;
    } catch { state.messages = []; }
    document.body.classList.toggle("light", state.theme === 1);
  }
  function save() { if (state.memory) localStorage.setItem(KEY, JSON.stringify(state.messages.slice(-50))); }
  function saveSettings() { localStorage.setItem(SETTINGS, JSON.stringify({ brain: state.brain, theme: state.theme })); }
  function add(role, content) { state.messages.push({role,content,time:Date.now()}); state.messages=state.messages.slice(-50); save(); render(); }
  function render() {
    const box=$("#messages"); if(!box)return;
    if(!state.messages.length) box.innerHTML='<div class="message system">🐾 ChatPet v0.8 está listo. Escribe /help para ver los comandos.</div>';
    else box.innerHTML=state.messages.map(m=>'<div class="message '+(m.role==="user"?"user":"bot")+'">'+escapeHtml(m.content)+'</div>').join("");
    $("#messageCount").textContent=state.messages.length; box.scrollTop=box.scrollHeight;
    $("#memoryState").textContent=state.memory?"LOCAL":"OFF";
    $("#brainState").textContent=window.ChatPetBrainRouter ? window.ChatPetBrainRouter.label(state.brain) : state.brain.toUpperCase();
    $("#brainStatus").textContent=state.brain==="cloud"?(state.cloudOnline?"CLOUD BRAIN+":"CLOUD OFFLINE"):state.brain==="auto"?"AUTO BRAIN":"LOCAL BRAIN+";
    $("#memoryBtn").textContent="Memory: "+(state.memory?"ON":"OFF");
    $("#brainBtn").textContent="Brain: "+(window.ChatPetBrainRouter ? window.ChatPetBrainRouter.label(state.brain) : state.brain.toUpperCase());
    $("#chatSub").textContent=state.brain==="cloud"?"Advanced Cloud · /api/chat · fallback ready":state.brain==="auto"?"Multi-Brain AUTO · advanced cloud when ready · local fallback":"Local Brain+ · browser inference · fallback ready";
  }
  function allowed(){const now=Date.now();state.timestamps=state.timestamps.filter(t=>now-t<WINDOW);if(state.timestamps.length>=MAX)return false;state.timestamps.push(now);return true;}
  function command(input){
    const cmd=input.toLowerCase().trim();
    if(cmd==="/help") return "🛠️ Comandos: /help · /status · /memory · /clear · /export · /brain · /about";
    if(cmd==="/status") return "📊 ChatPet v0.8 | Brain "+state.brain.toUpperCase()+" | Cloud "+(state.cloudOnline?"ONLINE":"OFFLINE")+" | Modelo "+(state.modelConfigured?"CONFIGURADO":"NO CONFIGURADO")+" | Contexto cloud "+state.cloudContext+" | Memoria "+(state.memory?"ON":"OFF")+" | "+state.messages.length+" mensajes.";
    if(cmd==="/brain") { state.brain=window.ChatPetBrainRouter?window.ChatPetBrainRouter.next(state.brain):(state.brain==="local"?"cloud":"local"); saveSettings(); render(); checkCloud(); return "🧠 Brain cambiado a "+(window.ChatPetBrainRouter?window.ChatPetBrainRouter.label(state.brain):state.brain.toUpperCase())+"."; }
    if(cmd==="/memory") { state.memory=!state.memory; if(!state.memory)localStorage.removeItem(KEY); render(); return "💾 Memoria local: "+(state.memory?"ACTIVADA":"DESACTIVADA")+"."; }
    if(cmd==="/clear") { state.messages=[]; localStorage.removeItem(KEY); render(); return "🧹 Conversación y memoria local limpiadas."; }
    if(cmd==="/export") { exportData(); return "📦 Exportación JSON preparada."; }
    if(cmd==="/about") return "🐾 ChatPet v0.8: Local Brain+ + Multi-Brain + Advanced Cloud. Las credenciales y la configuración del modelo permanecen en el servidor.";
    return null;
  }
  function exportData(){
    const blob=new Blob([JSON.stringify({version:"0.8",exportedAt:new Date().toISOString(),messages:state.messages},null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="chatpet-v0.8-memory.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  function importData(file){
    const reader=new FileReader();
    reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!Array.isArray(data.messages))throw new Error();state.messages=data.messages.filter(m=>m&&typeof m.content==="string").slice(-50);save();render();add("bot","📥 Memoria importada correctamente.");}catch{add("bot","⚠️ No pude importar ese archivo JSON.");}};
    reader.readAsText(file);
  }
  async function send(input){
    const clean=input.trim();if(!clean)return;
    const result=command(clean);
    if(result!==null){if(clean==="/clear")return;add("bot",result);return;}
    if(!allowed()){add("bot","⏳ Límite temporal alcanzado. Espera un poco y vuelve a intentarlo.");return;}
    const previous=state.messages.slice(); add("user",clean); $("#typing").hidden=false;
    try {
      if(!window.ChatPetBrainRouter) throw new Error("Brain Router unavailable");
      const result=await window.ChatPetBrainRouter.reply(state.brain, clean, previous, state);
      state.lastUsedBrain=result.used;
      if(result.cloud) state.cloudOnline=true;
      add("bot",result.reply);
    } catch {
      state.cloudOnline=false; state.lastUsedBrain="local";
      const response=window.ChatPetLocalBrain?window.ChatPetLocalBrain.reply(clean,previous):"🐾 Local Brain no cargado.";
      add("bot","☁️ Brain seleccionado no respondió. Activé Local Brain+ como fallback.\n\n"+response);
    } finally { $("#typing").hidden=true; render(); }
  }
  function diagnostics(){alert("ChatPet v0.8\nBrain: "+state.brain.toUpperCase()+"\nCloud: "+(state.cloudOnline?"ONLINE":"OFFLINE")+"\nModel configured: "+(state.modelConfigured?"YES":"NO")+"\nCloud context: "+state.cloudContext+" messages\nMessages: "+state.messages.length+"\nMemory: "+(state.memory?"ON":"OFF")+"\nLast used brain: "+state.lastUsedBrain+"\nProvider: server-side endpoint");}
  async function checkCloud(){
    try {
      const response=await fetch("/health",{cache:"no-store"}); if(!response.ok)throw new Error();
      const data=await response.json(); state.cloudOnline=data.status==="online"; state.modelConfigured=Boolean(data.modelConfigured); state.cloudContext=Number(data.maxContextMessages)||20;
    } catch { state.cloudOnline=false; state.modelConfigured=false; state.cloudContext=20; }
    render();
  }
  function init(){
    load(); render(); checkCloud();
    const form=$("#chatForm"),input=$("#input");
    form.addEventListener("submit",e=>{e.preventDefault();send(input.value);input.value="";$("#charCount").textContent="0 / 4000";input.focus();});
    input.addEventListener("input",()=>$("#charCount").textContent=input.value.length+" / 4000");
    $("#clearBtn").addEventListener("click",()=>{state.messages=[];localStorage.removeItem(KEY);render();});
    $("#exportBtn").addEventListener("click",exportData);
    $("#importInput").addEventListener("change",e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value="";});
    $("#memoryBtn").addEventListener("click",()=>{state.memory=!state.memory;if(!state.memory)localStorage.removeItem(KEY);else save();render();});
    $("#brainBtn").addEventListener("click",()=>{state.brain=window.ChatPetBrainRouter?window.ChatPetBrainRouter.next(state.brain):(state.brain==="local"?"cloud":"local");saveSettings();render();checkCloud();});
    $("#themeBtn").addEventListener("click",()=>{state.theme=state.theme?0:1;document.body.classList.toggle("light",state.theme===1);saveSettings();});
    $("#diagnosticsBtn").addEventListener("click",diagnostics);
  }
  return {init};
})();
document.addEventListener("DOMContentLoaded",ChatPet.init);
