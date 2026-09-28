# ChatPet Architecture

## v0.6

Browser -> app.js -> Brain Adapter -> Local Brain+ or Cloud Brain+ -> self-hosted model

### Local mode

Browser -> brain/local.js -> local response

### Cloud mode

Browser -> brain/cloud.js -> /api/chat -> Vercel Function -> self-hosted model endpoint

## Cloud Brain+ environment

The Vercel Function reads `MODEL_URL`, optional `MODEL_NAME`, optional `MODEL_API_KEY`, optional `MODEL_AUTH_HEADER`, and optional `MODEL_AUTH_PREFIX`.

The browser never receives these environment values.

## Model protocol

ChatPet sends an OpenAI-compatible request with `model`, `messages`, `temperature`, and `max_tokens`.

Accepted response formats include `choices[0].message.content`, `reply`, and `response`, plus simple content-part arrays containing text.

## Health

`GET /health` reports online status, version, brain type, whether `MODEL_URL` is configured, and whether a model API key is configured. No secret value is returned.

## Security

Do not put model credentials in frontend JavaScript. Keep `MODEL_API_KEY` in Vercel Environment Variables when authentication is needed. Use HTTPS for public deployments.

## DuckDNS

DuckDNS is only the custom hostname layer:

Browser -> chatpet.duckdns.org -> Vercel -> /api/chat -> model endpoint

The DuckDNS hostname does not host the AI model by itself.

## Future path

Browser -> brain adapter -> Local Brain+ / Cloud Brain+ -> Multi-Brain -> Advanced Cloud -> ChatPet AI
