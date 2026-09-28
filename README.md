# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.5 — Cloud Brain

ChatPet v0.5 introduces the first Cloud Brain architecture while preserving the Local Brain+.

- Local Brain+ and Cloud Brain can be switched from the UI.
- `brain/cloud.js` provides a replaceable cloud adapter.
- Cloud mode uses the `/api/chat` endpoint.
- The frontend never stores model API keys or private server credentials.
- A `/health` endpoint reports Cloud Brain availability.
- If Cloud Brain fails, ChatPet automatically falls back to Local Brain+.
- Up to 8 recent messages can be sent as context to the Cloud Brain endpoint.
- A self-hosted Node server is included under `server/`.
- The server is prepared for a local/open or self-hosted inference backend.
- The current repository does not contain a commercial AI API key.
- Local memory, JSON import/export, commands, diagnostics, and themes remain available.

## Structure

- GitHub Pages: public web interface.
- `app.js`: chat UI, memory, commands, brain switching, health checks, and fallback.
- `brain/local.js`: v0.4 Local Brain+ engine.
- `brain/cloud.js`: v0.5 Cloud Brain adapter.
- `server/index.js`: self-hosted Cloud Brain HTTP server.
- `server/package.json`: Node server metadata and start script.
- `style.css`: ChatPet interface and light/dark themes.
- `assets/`: banner, icon, and favicon SVG assets.
- `docs/ARCHITECTURE.md`: architecture and deployment notes.

## Developer Commands

- `/help` — show available commands.
- `/status` — show Local/Cloud status.
- `/memory` — toggle local memory.
- `/clear` — clear the current local conversation.
- `/export` — export conversation memory as JSON.
- `/brain` — switch between Local and Cloud Brain.
- `/about` — show project information.

## Cloud Brain Server

The included server requires Node.js 18+.

From the `server/` directory:

```bash
npm start
```

The server listens on port 8787 by default.

Endpoints:

- `GET /health`
- `POST /api/chat`

The v0.5 server is an integration layer, not a full LLM by itself. It is intentionally prepared for a separately hosted local/open inference service.

## Roadmap

1. ~~v0.1: Demo Brain~~
2. ~~v0.2: Local Brain~~
3. ~~v0.3: Stronger Local/Context Engine~~
4. ~~v0.4: Advanced Brain Preparation~~
5. **v0.5: Cloud Brain**
6. v0.6: Cloud Brain+
7. v0.7: Multi-Brain
8. v0.8: Advanced Cloud
9. v0.9: Pre-1.0
10. v1.0: ChatPet AI

Planned domain: chatpet.duckdns.org

See `docs/ARCHITECTURE.md` and `docs/CONTRIBUTING.md`.

## Project Status

ChatPet v0.5 is an experimental Local + Cloud Brain prototype. The Cloud Brain infrastructure is ready for a separately hosted inference backend; the repository itself does not include a commercial AI API key or a full language model.
