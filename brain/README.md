# ChatPet Brain

## v0.2 Local Brain

The v0.2 browser app loads brain/local.js as its first dedicated brain module.

The Local Brain is lightweight and uses:
- local language rules
- recent user-message context
- simple question/context handling

It does **not** claim to be a full language model.

## Future versions

The brain layer is designed to be replaceable:

v0.2 Local Brain
-> v0.3 stronger local/context engine
-> v0.4 advanced brain preparation
-> v0.5 Cloud Brain
-> v1.0 ChatPet AI

A future implementation can connect an open/local model without exposing private credentials in the GitHub Pages frontend.
