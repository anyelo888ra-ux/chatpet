# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.4 — Local Brain+ Expansion

ChatPet v0.4 expands the browser-based brain and developer experience while keeping the project fully local.

- Runs entirely in the browser.
- No commercial AI API key is required.
- No external AI provider receives the chat.
- Conversation memory remains in browser localStorage while enabled.
- The UI and brain remain separated.
- Intent detection and token similarity improve local responses.
- Recent conversation context is used when generating responses.
- Memory can be enabled, disabled, cleared, exported, and imported.
- JSON conversation export/import is available.
- Developer commands are available directly from the chat.
- Diagnostics and typing state are included.
- The current Local Brain+ is still lightweight and rule/context based; it is **not yet a large language model**.
- The architecture remains prepared for a stronger local/open model later.

## Structure

- GitHub Pages: public web interface.
- app.js: chat UI, local memory, commands, import/export, diagnostics, and local fair-use demo limit.
- brain/local.js: v0.4 Local Brain+ with intent detection, similarity, and recent context.
- style.css: ChatPet interface and theme styling.
- assets/: banner, icon, and favicon SVG assets.
- Local storage: recent conversation history and local settings.
- Future brain adapter: replaceable inference layer.

## Developer Commands

- `/help` — show available commands.
- `/status` — show ChatPet status.
- `/memory` — toggle local memory.
- `/clear` — clear the current local conversation.
- `/export` — export conversation memory as JSON.
- `/about` — show project information.

## Roadmap

1. ~~v0.1: Demo Brain~~
2. ~~v0.2: Local Brain~~
3. ~~v0.3: Stronger Local/Context Engine~~
4. **v0.4: Advanced Brain Preparation**
5. v0.5: Cloud Brain
6. v0.6: Cloud Brain+
7. v0.7: Multi-Brain
8. v0.8: Advanced Cloud
9. v0.9: Pre-1.0
10. v1.0: ChatPet AI

Planned domain: chatpet.duckdns.org

See docs/ARCHITECTURE.md and docs/CONTRIBUTING.md.

## Project Status

ChatPet v0.4 is an experimental browser-based AI prototype. The current brain does not use a full language model yet. Future versions may add stronger local/open inference and eventually a cloud-based brain.
