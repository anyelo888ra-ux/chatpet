# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.1

The first version runs entirely in the browser. It does not require a commercial AI API key or send messages to an external AI provider.

The current brain is intentionally small. It demonstrates conversation state, local memory, commands, rate limiting, and a replaceable inference layer.

## Structure

- GitHub Pages: public web interface.
- Browser app: HTML/CSS/JavaScript.
- Local storage: optional local conversation history.
- Brain layer: replaceable future model interface.
- Limits: local demo fair-use limits.

## Roadmap

1. Improve the browser brain.
2. Add a real local/open-model adapter.
3. Add a server-side inference option.
4. Add privacy controls and configurable memory.
5. Add tests and contribution tooling.
6. Support multiple open model backends without requiring a proprietary API.

Planned domain: chatpet.duckdns.org

See docs/ARCHITECTURE.md and docs/CONTRIBUTING.md.
