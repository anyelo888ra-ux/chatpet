# ChatPet Brain

This directory is reserved for the inference layer.

The v0.1 browser app uses a tiny deterministic demo brain in app.js. It is not a large language model.

## Future goal

Build a replaceable adapter around an open/local model so ChatPet can run without a commercial API key.

Possible backends include a model running on the user's machine, a self-hosted inference server, or another open-source inference runtime.

Do not put model secrets, private credentials, or server administration credentials in GitHub Pages frontend code.
