# ChatPet Brain

## v0.8 — Advanced Cloud

- `brain/local.js` — Local Brain+
- `brain/cloud.js` — Advanced Cloud adapter
- `brain/router.js` — selects LOCAL+, CLOUD+, or AUTO

### Modes

**LOCAL+** keeps inference in the browser.

**CLOUD+** sends the conversation to same-origin `/api/chat`. v0.8 sends up to 20 recent messages and uses a 25 second request timeout.

**AUTO** checks cloud readiness and uses Advanced Cloud when configured; otherwise it uses Local Brain+.

If a Cloud response fails, ChatPet falls back to Local Brain+.

No API key is stored in frontend JavaScript.

## Roadmap

v0.8 Advanced Cloud -> v0.9 Pre-1.0 -> v1.0 ChatPet AI

Future brains can be added behind the router without rewriting the chat UI.
