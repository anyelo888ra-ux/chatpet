# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.3 — Local Brain

ChatPet v0.3 moves the conversation engine into a dedicated local brain module.

- Runs entirely in the browser.
- No commercial AI API key is required.
- No external AI provider receives the chat.
- Conversation memory remains in browser localStorage.
- The UI and brain are now separated.
- The current Local Brain is lightweight and rule/context based; it is **not yet a large language model**.
- The architecture is prepared for a stronger local/open model later.

## Structure

- GitHub Pages: public web interface.
- app.js: chat UI, local memory, and local fair-use demo limit.
- brain/local.js: v0.3 Local Brain.
- Local storage: recent conversation history.
- Future brain adapter: replaceable inference layer.

## Roadmap

1. ~~Browser demo brain~~
2. **v0.3: Local Brain**
3. v0.3: stronger local/context engine
4. v0.4: advanced brain preparation
5. v0.5: Cloud Brain
6. v0.6: Cloud Brain+
7. v0.7: Multi-Brain
8. v0.8: Advanced Cloud
9. v0.9: Pre-1.0
10. v1.0: ChatPet AI

Planned domain: chatpet.duckdns.org

See docs/ARCHITECTURE.md and docs/CONTRIBUTING.md.


## v0.3 — Local Brain+

v0.3 adds:
- SVG banner, icon, and favicon in `assets/`
- improved local intent matching
- better recent-conversation similarity
- browser-only context processing
- no commercial AI API key required

The current brain is still a lightweight rule/context engine, not a full large language model.
