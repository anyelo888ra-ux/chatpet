# ChatPet 🐾🧠

ChatPet is an open-source experiment to build a transparent, community-driven AI chat platform.

## v0.6 — Cloud Brain+

ChatPet v0.6 upgrades the Vercel Cloud Brain integration while preserving Local Brain+.

- Local Brain+ and Cloud Brain+ can be switched from the UI.
- `brain/cloud.js` is the cloud adapter.
- Cloud mode uses the `/api/chat` Vercel Function.
- The browser never receives model credentials.
- `/health` reports model configuration.
- Optional server-side model authentication is supported.
- OpenAI-compatible responses plus simple `reply` / `response` formats are supported.
- Cloud responses include model name and latency.
- Failed or unconfigured Cloud Brain+ requests fall back to Local Brain+.
- Up to 8 recent messages are sent as context.
- No commercial AI API key is included in the repository.

## Vercel deployment

ChatPet is designed to run from the repository root as a Vercel project. The API Functions are `api/chat.js` and `api/health.js`.

Environment variables for a compatible self-hosted model endpoint:

- `MODEL_URL` — model HTTP endpoint.
- `MODEL_NAME` — optional model name.
- `MODEL_API_KEY` — optional server-side secret.
- `MODEL_AUTH_HEADER` — optional header name, default `Authorization`.
- `MODEL_AUTH_PREFIX` — optional prefix, default `Bearer `.

Keep any secret only in Vercel Environment Variables.

## DuckDNS custom domain

ChatPet can use a DuckDNS hostname such as `chatpet.duckdns.org` instead of a paid `.ai` domain. The hostname is only the public address; the AI inference endpoint is still hosted separately.

After Vercel is working:

1. Create the DuckDNS hostname.
2. Add `chatpet.duckdns.org` in the Vercel project domain settings.
3. Follow the DNS record Vercel displays for that domain.
4. Keep GitHub Pages offline if it is no longer needed.
5. Test `https://chatpet.duckdns.org/` and `/health`.

## Roadmap

1. ~~v0.1: Demo Brain~~
2. ~~v0.2: Local Brain~~
3. ~~v0.3: Stronger Local/Context Engine~~
4. ~~v0.4: Advanced Brain Preparation~~
5. ~~v0.5: Cloud Brain~~
6. **v0.6: Cloud Brain+**
7. v0.7: Multi-Brain
8. v0.8: Advanced Cloud
9. v0.9: Pre-1.0
10. v1.0: ChatPet AI

Planned domain: chatpet.duckdns.org

## Project Status

ChatPet v0.6 is an experimental Local + Cloud Brain+ prototype. The Vercel integration is ready for a compatible self-hosted inference endpoint; the repository itself does not include a commercial API key or a full language model.
