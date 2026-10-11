# Stage 14 — Academic Activation Samsung Module Loading Repair 1

**Date:** 2026-10-10
**Starting authority:** `cba321e0595b4647be2348e7c5b7af054d98ae11` / `37a7d951e11f0d34d0519d14fd97df8c0ebd9895`
**Rollback:** `rollback/pre-academic-activation-samsung-module-loading-repair-1`
**Classroom authority:** Schema 7 / `V7_ONLY`

## Confirmed failure

The Samsung-reported `Projection.createAuthoritativeCache is not a function` error was reproduced in installed Microsoft Edge with an isolated profile, the actual published service worker, and the projection bytes from pre-Activation commit `6ae89f9218dd307521c56936abca045c19dc0c9b` stored at the published unversioned projection cache key. The read-only **Read activation status** action returned the exact reported TypeError.

The cause was mixed module generations. The engineering page requested `arc_academic_consumer_projection.js` without a version query while requesting the activation coordinator, production provider, and page controller with the Repair 5 query. The cache-first non-navigation service-worker path could therefore return an older projection global to a current activation coordinator. Load order was correct and no global replacement was found.

## Repair

- The engineering activation page now loads projection, activation, production provider, and controller with the coherent revision `academic-activation-samsung-module-loading-repair-1`.
- The service-worker precache includes those exact query-keyed assets while retaining the normal unversioned projection and activation URLs used by normal ARC.
- The projection publishes its exact module revision.
- The activation owner refuses a missing or mismatched projection API with `ACADEMIC_PROJECTION_MODULE_INCOMPATIBLE` and an App & Updates remediation message.
- The engineering controller performs the same compatibility preflight before constructing the production coordinator. All controls remain disabled when the module set is incompatible.
- Pages live-verification contracts require the repaired query keys.
- Service-worker installation remains waiting/user controlled; no install-time `skipWaiting` was added.

## Preserved boundaries

No database, schema, PACR fingerprint, recovery contract, activation confirmation, academic record, Student record, or transaction-domain authority changed. Normal ARC remains Schema 7 / `V7_ONLY`; Samsung protected production was not accessed; PACR was not rerun; academic authority was not activated.

## Verification boundary

Focused tests cover stale projection refusal, clean-current composition, read-only Inspect/Status routing, query-key separation, service-worker precache coherence, and user-controlled activation. The required full regression and isolated Edge old-cache/clean-current evidence are recorded in the final review package. A later Samsung read-only retry requires independent acceptance and separate publication first.
