const ChatPet = (() => {
  const KEY = "chatpet:v0.5:conversation";
  const SETTINGS = "chatpet:v0.5:settings";
  const MAX = 20, WINDOW = 60000;
  const state = { messages: [], timestamps: [], memory: true, theme: 0, brain: "local", cloudOnline: false };
  const $ = selector => document.querySelector(selector);

  function escapeHtml(value) { return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (Array.isArray(saved)) state.messages = saved.slice(-50);
      const settings = JSON.parse(localStorage.getItem(SETTINGS) || "{}");
      if (settings.brain === "cloud" || settings.brain === "local") state.brain = settings.brain;
      if (settings.theme) state.theme = 1;
    } catch { state.messages = []; }
    document.body.classList.toggle("light", state.theme === 1);
  }
  function save() { if (state.memory) localStorage.setItem(KEY, JSON.stringify(state.messages.slice(-50))); }
  function saveSettings() { localStorage.setItem(SETTINGS, JSON.stringify({ brain: state.brain, theme: state.theme })); }
  function add(role, content) { state.messages.push({role,content,time:Date.now()}); state.messages=state.messages.slice(-50); save(); render(); }
  function render() {
    const box=$("#messages"); if(!box)return;
    if(!state.messages.length) box.innerHTML='<div class="message system">🐾 ChatPet v0.5 está listo. Escribe /help para ver los comandos.</div>';
    else box.innerHTML=state.messages.map(m=>'<div class="message '+(m.role==="user"?"user":"bot")+'">'+escapeHtml(m.content)+'</div>').join("");
    $("#messageCount").textContent=state.messages.length; box.scrollTop=box.scrollHeight;
    $("#memoryState").textContent=state.memory?"LOCAL":"OFF";
    $("#brainState").textContent=state.brain==="cloud"?"CLOUD":"LOCAL v0.5";
    $("#brainStatus").textContent=state.brain==="cloud"?(state.cloudOnline?"CLOUD BRAIN":"CLOUD OFFLINE"):"LOCAL BRAIN+";
    $("#memoryBtn").textContent="Memory: "+(state.memory?"ON":"OFF");
    $("#brainBtn").textContent="Brain: "+state.brain.toUpperCase();
    $("#chatSub").textContent=state.brain==="cloud"?"Cloud Brain · /api/chat · fallback ready":"Local Brain+ · browser inference · fallback ready";
  }
  function allowed(){const now=Date.now();state.timestamps=state.timestamps.filter(t=>now-t<WINDOW);if(state.timestamps.length>=MAX)return false;state.timestamps.push(now);return true;}
  function command(input){
    const cmd=input.toLowerCase().trim();
    if(cmd==="/help") return "🛠️ Comandos: /help · /status · /memory · /clear · /export · /brain · /about";
    if(cmd==="/status") return "📊 ChatPet v0.5 | Brain "+state.brain.toUpperCase()+" | Cloud "+(state.cloudOnline?"ONLINE":"OFFLINE")+" | Memoria "+(state.memory?"ON":"OFF")+" | "+state.messages.length+" mensajes.";
    if(cmd==="/brain") { state.brain=state.brain==="local"?"cloud":"local"; saveSettings(); render(); return "🧠 Brain cambiado a "+state.brain.toUpperCase()+"."; }
    if(cmd==="/memory") { state.memory=!state.memory; if(!state.memory)localStorage.removeItem(KEY); render(); return "💾 Memoria local: "+(state.memory?"ACTIVADA":"DESACTIVADA")+"."; }
    if(cmd==="/clear") { state.messages=[]; localStorage.removeItem(KEY); render(); return "🧹 Conversación y memoria local limpiadas."; }
    if(cmd==="/export") { exportData(); return "📦 Exportación JSON preparada."; }
    if(cmd==="/about") return "🐾 ChatPet v0.5: Local + Cloud Brain experimental. El frontend no contiene credenciales privadas.";
    return null;
  }
  function exportData(){
    const blob=new Blob([JSON.stringify({version:"0.5",exportedAt:new Date().toISOString(),messages:state.messages},null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="chatpet-v0.5-memory.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  function importData(file){
    const reader=new FileReader();
    reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!Array.isArray(data.messages))throw new Error();state.messages=data.messages.filter(m=>m&&typeof m.content==="string").slice(-50);save();render();add("bot","📥 Memoria importada correctamente.");}catch{add("bot","⚠️ No pude importar ese archivo JSON.");}};
    reader.readAsText(file);
  }
  async function cloudReply(input, previous) {
    if(!window.ChatPetCloudBrain) throw new Error("Cloud adapter unavailable");
    return await window.ChatPetCloudBrain.reply(input, previous);
  }
  async function send(input){
    const clean=input.trim();if(!clean)return;
    const result=command(clean);
    if(result!==null){if(clean==="/clear")return;add("bot",result);return;}
    if(!allowed()){add("bot","⏳ Límite temporal alcanzado. Espera un poco y vuelve a intentarlo.");return;}
    const previous=state.messages.slice(); add("user",clean); $("#typing").hidden=false;
    try {
      let response;
      if(state.brain==="cloud") {
        try {
          response=await cloudReply(clean,previous);
          state.cloudOnline=true;
        } catch {
          state.cloudOnline=false;
          response=window.ChatPetLocalBrain?window.ChatPetLocalBrain.reply(clean,previous):"🐾 Local Brain no cargado.";
          response="☁️ Cloud Brain no respondió. Activé Local Brain+ como fallback.\n\n"+response;
        }
      } else {
        response=window.ChatPetLocalBrain?window.ChatPetLocalBrain.reply(clean,previous):"🐾 Local Brain no cargado.";
      }
      add("bot",response);
    } finally { $("#typing").hidden=true; render(); }
  }
  function diagnostics(){alert("ChatPet v0.5\nBrain: "+state.brain.toUpperCase()+"\nCloud: "+(state.cloudOnline?"ONLINE":"OFFLINE")+"\nMessages: "+state.messages.length+"\nMemory: "+(state.memory?"ON":"OFF")+"\nExternal provider: "+(state.brain==="cloud"?"server endpoint":"none"));}
  async function checkCloud(){
    try { const response=await fetch("/health",{cache:"no-store"}); if(!response.ok)throw new Error(); state.cloudOnline=true; } catch { state.cloudOnline=false; }
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
    $("#brainBtn").addEventListener("click",()=>{state.brain=state.brain==="local"?"cloud":"local";saveSettings();render();if(state.brain==="cloud")checkCloud();});
    $("#themeBtn").addEventListener("click",()=>{state.theme=state.theme?0:1;document.body.classList.toggle("light",state.theme===1);saveSettings();});
    $("#diagnosticsBtn").addEventListener("click",diagnostics);
  }
  return {init};
})();
document.addEventListener("DOMContentLoaded",ChatPet.init);