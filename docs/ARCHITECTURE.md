# ChatPet Architecture

## v0.2

The public web layer and brain layer are now separated:

Browser -> index.html / style.css / app.js -> brain/local.js -> local response

The v0.2 brain is a lightweight browser engine using local rules and recent conversation context. It is intentionally not presented as a large language model.

## Future path

Browser -> brain adapter -> local/open model -> optional self-hosted inference server -> Cloud Brain

The interface should not need to be rebuilt when the inference backend changes.

## GitHub Pages

GitHub Pages hosts the static frontend. It must not contain private API keys, service credentials, or other secrets.

## Memory

The prototype stores recent conversation history in browser localStorage. v0.2 uses a new storage key so old v0.1 state does not silently mix with the new version.

## Limits

Client-side limits are only a demonstration. A real public deployment must enforce abuse/fair-use limits on the server.

## Domain

chatpet.duckdns.org can later point to a public backend or another deployment.
