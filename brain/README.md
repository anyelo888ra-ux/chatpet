# ChatPet Brain

## v0.7 — Multi-Brain

- `brain/local.js` — Local Brain+
- `brain/cloud.js` — Cloud Brain+ adapter
- `brain/router.js` — selects LOCAL+, CLOUD+, or AUTO

### Modes

**LOCAL+** keeps inference in the browser.

**CLOUD+** sends the conversation to same-origin `/api/chat`.

**AUTO** checks Cloud readiness and uses Cloud Brain+ when configured; otherwise it uses Local Brain+.

If a Cloud response fails, ChatPet falls back to Local Brain+.

No API key is stored in frontend JavaScript.

## Roadmap

v0.7 Multi-Brain -> v0.8 Advanced Cloud -> v0.9 Pre-1.0 -> v1.0 ChatPet AI

Future brains can be added behind the router without rewriting the chat UI.
