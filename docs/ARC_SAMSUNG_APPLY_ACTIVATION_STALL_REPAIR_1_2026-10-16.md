# ARC Samsung Apply/Activation Stall Repair 1

**Date:** 2026-10-16  
**Starting authority:** published commit `38a8e7336ff39f3f34fc125ea624898458e1f991`, tree `89fd877a6d4fd5f4064a1ba672d4485285b52941`  
**Rollback:** `rollback/pre-samsung-apply-activation-stall-repair-1`  
**Status:** local candidate; independent review required; unpublished

## Reproduced failure

The Samsung wording came from the older installed build ending `end-to-end-academic-activation-integration-rehearsal-1`. That controller treated any installed waiting worker as ready and, after the instructor clicked Apply, sent only `{type: "SKIP_WAITING"}`. The independently verified new worker deliberately rejected bare `SKIP_WAITING` as unqualified. The old controller had no response channel, so it could not show the refusal and remained on “Applying update… ARC will reopen when ready.” The waiting worker stayed installed and the older application stayed visible.

An isolated installed Microsoft Edge run reproduced that exact sequence under `/Arc-Pilot/` before the repair: verified waiting release present, old UI ready, one Apply click, no controller takeover, and timeout while the old build remained displayed. No classroom record or authority mutation occurred.

## Bounded repair

1. The waiting worker now recognizes only the exact historical one-field `{type: "SKIP_WAITING"}` request from an existing window inside its own ARC scope while an older active worker exists.
2. That compatibility request cannot activate arbitrary code. The new worker first revalidates its exact independently approved release cache, build identity, complete 103-asset closure, receipt, and `verified_waiting` sentinel. Only then does it write `activation_requested` and call `skipWaiting()`.
3. The nonce/token transport remains required for current ARC clients. Its existing bare-message refusal remains intact outside the narrow service-worker compatibility boundary.
4. Worker role is now owned by that worker's install/activate lifecycle. An active worker no longer misclassifies itself as waiting merely because the registration contains a different waiting worker; candidate bytes cannot become the active routing source before Apply.
5. Current App & Updates now validates the exact activation response and waits for the requested worker to become both active and controlling. A delayed takeover is reported as an explicit stop condition rather than an endless applying state or an early reload claim.

## Verification

- Focused controller, transport, and service-worker tests cover exact response binding, delayed takeover, stale/malformed response refusal, verified legacy compatibility, active/unverified refusal, scoped-source checks, and active/waiting role separation.
- Installed Edge passed the exact legacy-build transition with two clients open. One Apply click promoted the verified release in 6.6 seconds and replaced the old visible build.
- A second Edge run passed the published instructor-first predecessor through the modern nonce/token path.
- Both runs preserved 74 stores, `V8_AUTHORITATIVE` academic/schedule authority, P5–P10 `V7_ONLY`, false real-Student authorization, exact legacy bytes, cold restart, offline restart, honest predecessor recovery status, and checksum-exact 74-store backup/restore.
- Task-owned registrations, caches, databases, profiles, and loopback servers were cleaned up. Samsung and production were not accessed.

## Remaining release boundary

This repair changes application and service-worker bytes. A future publication requires a new immutable Git-byte manifest, independent review, a new canonical compatibility receipt, guarded publication, and an updated release-evidence channel. The existing instructor-first receipt must not be reused for this candidate.

