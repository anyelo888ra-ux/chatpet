# ChatPet Architecture

## v0.7

Browser -> app.js -> Brain Router -> Local Brain+ / Cloud Brain+ / AUTO

### Local
Browser -> brain/router.js -> brain/local.js

### Cloud
Browser -> brain/router.js -> brain/cloud.js -> /api/chat -> Vercel -> self-hosted model

### AUTO
Browser -> brain/router.js -> /health
- Cloud online + model configured -> Cloud Brain+
- Otherwise -> Local Brain+
- Cloud failure -> Local Brain+ fallback

## Security

Model credentials stay in Vercel Environment Variables and never enter frontend JavaScript.

## Health

`GET /health` reports online status, version, multi-brain type, model configuration, and authentication configuration without returning secrets.

## DuckDNS

Browser -> www.chatpet.duckdns.org -> Vercel -> /api/chat -> model endpoint

DuckDNS is only the public hostname layer.

## Future

Browser -> Brain Router -> Local Brain+ / Cloud Brain+ -> additional brains -> Advanced Cloud -> ChatPet AI
