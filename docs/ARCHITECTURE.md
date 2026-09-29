# ChatPet Architecture

## v0.8

Browser -> app.js -> Brain Router -> Local Brain+ / Advanced Cloud / AUTO

### Local
Browser -> brain/router.js -> brain/local.js

### Advanced Cloud
Browser -> brain/router.js -> brain/cloud.js -> /api/chat -> Vercel -> self-hosted model

The cloud adapter sends up to 20 recent messages and aborts a request after 25 seconds.

### AUTO
Browser -> brain/router.js -> /health
- Cloud online + model configured -> Advanced Cloud
- Otherwise -> Local Brain+
- Cloud failure -> Local Brain+ fallback

## Server configuration

Optional Vercel environment variables:
- MODEL_URL
- MODEL_NAME
- MODEL_API_KEY
- MODEL_AUTH_HEADER
- MODEL_AUTH_PREFIX
- MODEL_SYSTEM_PROMPT
- MODEL_TEMPERATURE
- MODEL_MAX_TOKENS

Secrets remain server-side.

## Health

`GET /health` reports online status, version, Advanced Cloud capability, model configuration, authentication configuration, maximum context messages, and token limit without returning secrets.

## DuckDNS

Browser -> www.chatpet.duckdns.org -> Vercel -> /api/chat -> model endpoint

DuckDNS is only the public hostname layer.

## Future

Browser -> Brain Router -> Local Brain+ / Advanced Cloud -> additional brains -> Pre-1.0 -> ChatPet AI
