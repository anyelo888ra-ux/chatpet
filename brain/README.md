# ChatPet Brain

## v0.5

ChatPet now has a replaceable brain layer:

- `brain/local.js` — browser Local Brain+
- `brain/cloud.js` — Cloud Brain adapter

The adapter boundary lets the UI choose a brain without changing the chat interface.

### Cloud Brain

The Cloud Brain adapter sends a message and up to 8 recent messages to the same-origin `/api/chat` endpoint.

If the endpoint is unavailable or returns an error, the UI falls back to Local Brain+.

The cloud adapter contains no API key.

## Future

v0.5 Local + Cloud Brain
-> v0.6 Cloud Brain+
-> v0.7 Multi-Brain
-> v1.0 ChatPet AI

A future implementation can connect an open/local model or self-hosted inference service on the server side.
