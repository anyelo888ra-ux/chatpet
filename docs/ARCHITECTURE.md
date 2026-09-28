# ChatPet Architecture

## v0.4

Browser -> index.html / style.css / app.js -> brain/local.js -> local response

v0.4 expands the local layer with:
- intent detection
- token-based similarity
- recent conversation context
- local memory toggle
- JSON import/export
- developer commands
- diagnostics
- typing state

No private credentials are stored in the static frontend.

## Future path

Browser -> brain adapter -> local/open model -> optional self-hosted inference server -> Cloud Brain

The interface should not need to be rebuilt when the inference backend changes.

## Memory

Conversation history is stored in browser localStorage only while local memory is enabled.

## Limits

The client-side 20 messages/minute limit is only a prototype fair-use mechanism. Public cloud limits must be enforced server-side.

## Security

GitHub Pages must never contain API keys, service credentials, or private inference credentials.
