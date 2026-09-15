# ARC regression tests

Run the permanent dependency-free gate from the repository root:

```bash
python tests/regression_static.py
```

The gate protects contracts that should never disappear silently: the `weld_v013` storage key, schema/migration/recovery paths, grade and attendance engines, pacing, projects, Technical scoring, behavior, photo adapters, PWA installability/offline shell, older-Safari syntax compatibility, and a basic client-secret guardrail.

GitHub Actions runs this gate automatically on `main`, `dev/**`, and pull requests to `main`.

## Release rule

A version is not promoted to the known-good baseline merely because this static gate passes. Feature-specific behavioral tests and actual-device tests remain required where applicable. The hosted PWA must also be tested on unrestricted hardware for installation, camera, offline reopening, and storage behavior.

## Privacy rule

Never commit real student records, classroom backup JSON, student photos, Microsoft tokens, client secrets, passwords, or other private school data to this repository. Regression fixtures committed here must be fictional/synthetic only.
