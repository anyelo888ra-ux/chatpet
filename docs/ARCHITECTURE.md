# ChatPet Architecture

## v0.5

Browser -> app.js -> Brain Adapter -> Local Brain+ or Cloud Brain

### Local mode

Browser -> brain/local.js -> local response

### Cloud mode

Browser -> brain/cloud.js -> /api/chat -> server/index.js -> self-hosted model endpoint

v0.5 adds:
- replaceable Cloud Brain adapter
- Local / Cloud brain switching
- Cloud health check at /health
- automatic Local Brain+ fallback when Cloud Brain fails
- limited recent context sent to the cloud endpoint
- self-hosted Node server skeleton
- no private credentials in the static frontend

## Cloud Server

The server in server/index.js is designed to sit between the public browser and a separately hosted model/inference service.

The server accepts:
- POST /api/chat
- GET /health

The browser never needs a model credential. Model credentials or private inference configuration belong on the server side.

The v0.5 server can be connected to an OpenAI-compatible or other self-hosted inference layer by extending the server's model adapter. The repository does not include a commercial API key.

## Memory

Conversation history is stored in browser localStorage only while local memory is enabled.

When Cloud Brain is selected, only the recent context needed for the request is sent to the Cloud Brain endpoint.

## Limits

The client-side 20 messages/minute limit is only a prototype fair-use mechanism. Public cloud limits must be enforced server-side.

The server also limits request size and recent context length.

## Security

GitHub Pages must never contain API keys, service credentials, or private inference credentials.

For a public deployment, configure CORS to the exact frontend origin instead of leaving the default wildcard.

## Future path

Browser -> brain adapter -> local/open model -> self-hosted inference -> Cloud Brain+

The interface should not need to be rebuilt when the inference backend changes.
