# Changelog

## v1.0.0 — ChatPet AI

- Promoted the project from Pre-1.0 Final Candidate to the v1.0.0 ChatPet AI release.
- Unified browser and API release metadata at v1.0.0.
- Kept LOCAL+, CLOUD+, and AUTO brain modes.
- Kept self-hosted OpenAI-compatible and Ollama providers.
- Kept Local Brain+ as the safe local fallback when a real model is unavailable.
- Increased the cloud adapter timeout to support slower self-hosted models.
- Kept provider credentials server-side.


## v0.9.5 — Pre-1.0 Final Candidate

- Finalized release version metadata across the app and API.
- Hardened context normalization and prompt preparation.
- Kept LOCAL+, CLOUD+, and AUTO brain modes.
- Kept self-hosted OpenAI-compatible and Ollama provider support.
- Kept Local Brain+ fallback for unavailable real-model backends.
- Prepared the repository for the v1.0.0 milestone.

## v0.9.2 — Stability Patch

- Hardened local conversation loading against malformed stored data.
- Hardened JSON import validation and normalizes imported roles.
- Added /eastereggs developer command.
- Updated release metadata and cache-busting to v0.9.2.
- Kept the Pre-1.0 real-model architecture unchanged.

## v0.9.1 — Maintenance + Easter Eggs

- Fixed the Local Brain response text still reporting v0.4.
- Updated the UI and frontend cache-busting to v0.9.1.
- Updated the local conversation/settings storage namespace to v0.9.1.
- Updated JSON export naming and version metadata.
- Added harmless Local Brain easter eggs.
- Kept the v0.9 Pre-1.0 real-model architecture unchanged.

## v0.9.0 — Pre-1.0

- Real-model provider abstraction.
- OpenAI-compatible backend.
- Native Ollama backend.
- Context and prompt preparation layers.
- Model readiness diagnostics.
- AUTO mode with Local Brain+ fallback.
