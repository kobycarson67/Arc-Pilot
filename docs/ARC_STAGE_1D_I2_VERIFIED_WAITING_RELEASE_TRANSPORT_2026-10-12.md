# ARC Stage 1D-I2 — Verified Waiting-Release Transport

Date: 2026-10-12
Status: LOCAL, UNPUBLISHED, NON-ENFORCING candidate pending independent review
Starting authority: `cb1c9047f058e0c424a8df84c512f51eb9881ba4`, tree `dba39ef883997fd9be7f68cbc3c0134d38a77948`
Rollback: `rollback/pre-stage-1d-i2-local-implementation`

## Boundary

Stage 1D-I2 adds only the verified waiting-release transport approved by the accepted I2 specification. It does not provision a production compatibility record, enforce provenance for an existing installation, change academic or transaction authority, or alter any ARC database, activation marker, recovery package or classroom record.

Normal academic and schedule authority remains the already accepted v8 authority where physically activated. P5–P10 transaction adapters remain `V7_ONLY`. Real Student data remains unauthorized by this work.

## Transport contract

- One strict `ARC_RUNTIME_RELEASE_TRANSPORT` version 1 message protocol binds every request and response to a nonce.
- A waiting worker accepts canonical release-manifest and independently supplied receipt bytes only when the external receipt hash, release ID, manifest hash, closure hash, build identity and reviewed asset count all agree.
- The worker fetches each reviewed authority asset from the same origin with redirect refusal, writes only a release-specific staging cache, and then independently verifies exact byte count and SHA-256 closure.
- The reviewed closure moved mechanically from 97 to 98 assets solely because `src/arc_runtime_release_transport.js` became an authority executable.
- A verified cache stores canonical manifest, receipt and lifecycle evidence. An incomplete stage is removed on failure; previous caches are retained.
- `Apply` requires the exact release identity, hashes, receipt hash, apply nonce and one-use apply token. Bare `SKIP_WAITING` is refused.
- The active worker acknowledges health only after the normal application reports successful initialization with the exact verified release identity.
- A verified active release serves only its verified authority closure. Missing verified content fails closed; it does not fall through to network or an older cache.
- Legacy or unidentified workers retain the existing update path. A feature check keeps the new shell compatible while a legacy controller is still serving the previous update-controller module.

## User-controlled update behavior

ARC continues to stage updates without applying them automatically. The existing update control inspects the waiting worker, reports whether the candidate is verified, and applies only after the instructor chooses Apply. The service worker does not call `skipWaiting()` during install and does not delete previous caches during activation.

The engineering activation surface can inspect, provision, check and explicitly apply a fictional/review candidate. These controls do not write activation, compatibility, recovery or database authority.

## Isolated Microsoft Edge evidence

The installed Microsoft Edge executable ran against a new task-owned profile, loopback-only server, real Cache Storage, real service workers and isolated IndexedDB using fictional/zero-Student records.

Directly executed proof covered:

- six Semester 1 Sections in periods 1, 2, 3, 4, 5 and 7, Planning period 6, WT/AWT separation, Friday Open Shop, Sunday no school, December 14 PD/no instruction and no invented future Semester placement;
- legacy active worker plus candidate waiting worker;
- independently generated fictional canonical release manifest and receipt for the exact 98-asset closure;
- verified staging, explicit Apply, verified active normal shell, warm reload, offline reload and complete Edge-process cold restart;
- retention of every previous cache;
- exact application-state and activation-marker byte parity across the transport transition;
- exact recovery rollback to the original Schema 7 bytes;
- missing-Bell, missing-period and marker/hint fail-closed gates; and
- removal of the task-owned database, service worker, caches, local storage and Edge profile.

One browser-discovered rollout defect was corrected: the new normal shell now feature-detects `markApplicationHealthy()` while the legacy active worker can still serve an older update-controller module. Failed browser attempts and their causes are retained as lineage in the external review evidence.

The verified worker correctly refused the repository's nonproduct test-harness URL because it is outside the 98-asset authority closure. For rollback and final negative-test cleanup only, the disposable rehearsal profile explicitly unregistered its task-owned worker before loading that test harness. No product source or reviewed closure was expanded for engineering machinery.

## Verification gates

- I2 adversarial cases I2-01 through I2-40: passed.
- Retained Core and I1 provenance/closure/inspector cases: passed.
- Retained academic activation, six-section, schedule, recovery, update/cache and P5–P10 `V7_ONLY` coverage: passed.
- Static contract: 47/47 passed.
- Complete full-history JavaScript inventory: 140/140 passed.
- Changed JavaScript parse checks and `git diff --check`: passed.
- Real installed Edge rehearsal: passed with the scope and exception documented above.

Exact command output, raw Git identities, per-file hashes and browser evidence are retained in the dated external review package.

## Remaining gates

This candidate is not published or independently accepted. Publication A, an independently accepted release receipt for the publication, Samsung delivery, physical compatibility provisioning, I3 enforcement and later P4–P10 authority cutovers remain separately authorized stages.
