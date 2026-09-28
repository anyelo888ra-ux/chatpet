const ChatPet = (() => {
  const KEY = "chatpet:v0.4:conversation";
  const MAX = 20, WINDOW = 60000;
  const state = { messages: [], timestamps: [], memory: true, theme: 0 };
  const $ = selector => document.querySelector(selector);

  function escapeHtml(value) { return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
  function load() { try { const saved=JSON.parse(localStorage.getItem(KEY)||"[]"); if(Array.isArray(saved)) state.messages=saved.slice(-50); } catch { state.messages=[]; } }
  function save() { if(state.memory) localStorage.setItem(KEY,JSON.stringify(state.messages.slice(-50))); }
  function add(role,content) { state.messages.push({role,content,time:Date.now()}); state.messages=state.messages.slice(-50); save(); render(); }
  function render() {
    const box=$("#messages"); if(!box)return;
    if(!state.messages.length) box.innerHTML='<div class="message system">🐾 ChatPet v0.4 está listo. Escribe /help para ver los comandos.</div>';
    else box.innerHTML=state.messages.map(m=>'<div class="message '+(m.role==="user"?"user":"bot")+'">'+escapeHtml(m.content)+'</div>').join("");
    $("#messageCount").textContent=state.messages.length; box.scrollTop=box.scrollHeight;
    $("#memoryState").textContent=state.memory?"LOCAL":"OFF";
  }
  function allowed(){const now=Date.now();state.timestamps=state.timestamps.filter(t=>now-t<WINDOW);if(state.timestamps.length>=MAX)return false;state.timestamps.push(now);return true;}
  function command(input){
    const cmd=input.toLowerCase().trim();
    if(cmd==="/help") return "🛠️ Comandos: /help · /status · /memory · /clear · /export · /about";
    if(cmd==="/status") return "📊 ChatPet v0.4 | Local Brain+ | Memoria "+(state.memory?"ON":"OFF")+" | "+state.messages.length+" mensajes.";
    if(cmd==="/memory") { state.memory=!state.memory; if(!state.memory)localStorage.removeItem(KEY); render(); return "💾 Memoria local: "+(state.memory?"ACTIVADA":"DESACTIVADA")+"."; }
    if(cmd==="/clear") { state.messages=[]; localStorage.removeItem(KEY); render(); return "🧹 Conversación y memoria local limpiadas."; }
    if(cmd==="/export") { exportData(); return "📦 Exportación JSON preparada."; }
    if(cmd==="/about") return "🐾 ChatPet v0.4: Local Brain+ experimental. Sin API comercial. Todo el procesamiento del prototipo ocurre en el navegador.";
    return null;
  }
  function exportData(){
    const blob=new Blob([JSON.stringify({version:"0.4",exportedAt:new Date().toISOString(),messages:state.messages},null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download="chatpet-v0.4-memory.json";a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  }
  function importData(file){
    const reader=new FileReader();
    reader.onload=()=>{try{const data=JSON.parse(reader.result);if(!Array.isArray(data.messages))throw new Error();state.messages=data.messages.filter(m=>m&&typeof m.content==="string").slice(-50);save();render();add("bot","📥 Memoria importada correctamente.");}catch{add("bot","⚠️ No pude importar ese archivo JSON.");}};
    reader.readAsText(file);
  }
  function send(input){
    const clean=input.trim();if(!clean)return;
    const result=command(clean);
    if(result!==null){if(clean==="/clear")return;add("bot",result);return;}
    if(!allowed()){add("bot","⏳ Límite temporal alcanzado. Espera un poco y vuelve a intentarlo.");return;}
    const previous=state.messages.slice();add("user",clean);$("#typing").hidden=false;
    setTimeout(()=>{const response=window.ChatPetLocalBrain?window.ChatPetLocalBrain.reply(clean,previous):"🐾 Local Brain no cargado.";$("#typing").hidden=true;add("bot",response);},220);
  }
  function diagnostics(){alert("ChatPet v0.4\\nBrain: Local Brain+\\nMessages: "+state.messages.length+"\\nMemory: "+(state.memory?"ON":"OFF")+"\\nStorage: "+(localStorage.getItem(KEY)? "active":"empty")+"\\nExternal AI: none");}
  function init(){
    load();render();
    const form=$("#chatForm"),input=$("#input");
    form.addEventListener("submit",e=>{e.preventDefault();send(input.value);input.value="";$("#charCount").textContent="0 / 4000";input.focus();});
    input.addEventListener("input",()=>$("#charCount").textContent=input.value.length+" / 4000");
    $("#clearBtn").addEventListener("click",()=>{state.messages=[];localStorage.removeItem(KEY);render();});
    $("#exportBtn").addEventListener("click",exportData);
    $("#importInput").addEventListener("change",e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value="";});
    $("#memoryBtn").addEventListener("click",()=>{state.memory=!state.memory;if(!state.memory)localStorage.removeItem(KEY);else save();$("#memoryBtn").textContent="Memory: "+(state.memory?"ON":"OFF");render();});
    $("#themeBtn").addEventListener("click",()=>{document.body.classList.toggle("light");});
    $("#diagnosticsBtn").addEventListener("click",diagnostics);
  }
  return {init};
})();
document.addEventListener("DOMContentLoaded",ChatPet.init);