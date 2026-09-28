const ChatPet = (() => {
  const KEY = "chatpet:v0.3:conversation";
  const MAX = 20;
  const WINDOW = 60000;
  const state = { messages: [], timestamps: [] };
  const $ = selector => document.querySelector(selector);

  function escapeHtml(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }
  function load() {
    try { const saved = JSON.parse(localStorage.getItem(KEY) || "[]"); if (Array.isArray(saved)) state.messages = saved.slice(-50); }
    catch { state.messages = []; }
  }
  function save() { localStorage.setItem(KEY, JSON.stringify(state.messages.slice(-50))); }
  function add(role, content) {
    state.messages.push({ role, content, time: Date.now() });
    state.messages = state.messages.slice(-50);
    save();
    render();
  }
  function render() {
    const box = $("#messages");
    if (!box) return;
    if (!state.messages.length) box.innerHTML = '<div class="message system">🐾 ChatPet v0.2 está listo. Prueba “hola”, “help” o pregunta por el Local Brain.</div>';
    else box.innerHTML = state.messages.map(message => '<div class="message ' + (message.role === "user" ? "user" : "bot") + '">' + escapeHtml(message.content) + "</div>").join("");
    $("#messageCount").textContent = state.messages.length;
    box.scrollTop = box.scrollHeight;
  }
  function allowed() {
    const now = Date.now();
    state.timestamps = state.timestamps.filter(time => now - time < WINDOW);
    if (state.timestamps.length >= MAX) return false;
    state.timestamps.push(now);
    return true;
  }
  function send(input) {
    const clean = input.trim();
    if (!clean) return;
    if (!allowed()) { add("bot", "⏳ Límite temporal alcanzado. Espera un poco y vuelve a intentarlo."); return; }
    const previous = state.messages.slice();
    add("user", clean);
    setTimeout(() => {
      const response = window.ChatPetLocalBrain ? window.ChatPetLocalBrain.reply(clean, previous) : "🐾 El Local Brain todavía no está cargado. Recarga la página.";
      add("bot", response);
    }, 120);
  }
  function init() {
    load(); render();
    const form = $("#chatForm"), input = $("#input");
    form.addEventListener("submit", event => { event.preventDefault(); send(input.value); input.value = ""; $("#charCount").textContent = "0 / 2000"; input.focus(); });
    input.addEventListener("input", () => $("#charCount").textContent = input.value.length + " / 2000");
    $("#clearBtn").addEventListener("click", () => { state.messages = []; localStorage.removeItem(KEY); render(); });
  }
  return { init };
})();
document.addEventListener("DOMContentLoaded", ChatPet.init);