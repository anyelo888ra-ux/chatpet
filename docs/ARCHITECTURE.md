# ChatPet Architecture

## v0.1

The public web layer and future inference layer are intentionally separated.

Browser -> index.html, style.css, app.js -> Demo Brain

Future path: Browser -> brain adapter -> local/open model or self-hosted inference server

## GitHub Pages

GitHub Pages hosts the static frontend. It must not contain private API keys, service credentials, or other secrets.

## Brain

The current browser brain is a deterministic demonstration, not a large language model. A future adapter should accept conversation/context and return generated text plus optional model and latency metadata.

## Limits

Client-side limits are only a demonstration. A real public deployment must enforce abuse/fair-use limits on the server because browser code can be modified by visitors.

## Privacy

The prototype stores conversation history in browser localStorage. A future server mode must document what is stored, for how long, and whether operators can access it.

## Domain

chatpet.duckdns.org can later point to a public backend or another deployment. The domain does not change the GitHub Pages architecture.
