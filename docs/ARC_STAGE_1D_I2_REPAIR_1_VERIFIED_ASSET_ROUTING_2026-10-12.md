# ARC Stage 1D-I2 Repair 1 — Verified Asset Routing

Date: 2026-10-12
Status: LOCAL, UNPUBLISHED, NON-ENFORCING candidate pending independent review
Starting authority: `5bf6e328c3f01fc92edd585fa6be043c8fcd5cc5`, tree `f166135948c8e3da042ff7d34552f3c09dac17cc`
Rollback: `rollback/pre-stage-1d-i2-repair-1-verified-asset-routing`

## Reproduced defect

The accepted I2 worker correctly restricted navigation and authority-bearing files to the exact verified release cache. Its verified-active fetch branch applied the same restriction to every other same-origin request. The 98-asset authority closure deliberately excludes ordinary reviewed presentation files, so requests such as `icons/icon-192.png` returned HTTP 503 after the verified release became active.

The affected reviewed non-authority graph is exactly eleven files: five brand assets referenced by `index.html` CSS and six icon files referenced by `index.html` or `app.webmanifest`. They remain outside the authority closure because they do not execute authority or determine academic/classroom truth.

## Bounded correction

The worker now classifies only those eleven exact, case-sensitive same-scope paths as reviewed non-authority static assets. They use the existing normal ARC cache with these restrictions:

- cache-first exact normalized path lookup, including stable offline reuse;
- same-origin network fetch with reload semantics and redirect refusal when the cache is empty;
- successful, nonredirected same-origin responses only are cached;
- case aliases, traversal encodings, out-of-scope requests and unreviewed paths fail closed;
- navigation remains exclusive to the complete verified release cache; and
- every authority-bearing or unknown same-origin file remains exclusive to exact verified release bytes and returns HTTP 503 when absent.

The authority closure remains exactly 98 assets. No icon or brand file was added to that closure. No manifest, compatibility, update-controller, application-shell, storage, database, recovery or authority contract changed.

## Reviewed non-authority paths

- `assets/brand/runtime/arc-titanium-industrial-background-1440.webp`
- `assets/brand/runtime/arc-welding-compact-lockup-720.png`
- `assets/brand/runtime/arc-welding-dashboard-hero-1440.webp`
- `assets/brand/runtime/arc-welding-lettermark-720.png`
- `assets/brand/runtime/arc-welding-primary-logo-960.png`
- `icons/apple-touch-icon-180.png`
- `icons/favicon-32.png`
- `icons/icon-192.png`
- `icons/icon-512.png`
- `icons/icon-maskable-192.png`
- `icons/icon-maskable-512.png`

## Preserved boundaries

- Update activation remains an explicit instructor action. Install still does not call `skipWaiting()`.
- Previous caches remain available; no cache cleanup or replacement policy was added.
- Existing academic activation, marker, recovery and rollback custody remain unchanged.
- P5–P10 transaction adapters remain `V7_ONLY`.
- No compatibility record is provisioned and no existing installation is placed under provenance enforcement by this repair.

## Verification

The bounded routing suite exercises every one of the eleven reviewed paths online and offline, query aliases, exact cached bytes, navigation and authority exclusivity, unsafe/case/traversal refusal, redirects, cross-origin responses, missing files and legacy-unverified behavior.

Retained I2 cases I2-01 through I2-40, Core, I1, source-closure, update-controller and application integration suites pass without weakening their assertions. The complete full-history repository gate, static 47-check contract, parse and diff checks, and an isolated installed Microsoft Edge first-upgrade rehearsal are required before closeout. Browser evidence is retained externally and does not become product source.

## Remaining gates

This local repair is not independently accepted or published. Publication A, an accepted compatibility receipt for an actual publication, Samsung delivery, physical compatibility provisioning, later enforcement, and later P4–P10 authority cutovers remain separately gated.
