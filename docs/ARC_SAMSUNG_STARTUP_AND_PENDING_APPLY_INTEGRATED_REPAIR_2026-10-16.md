# ARC Samsung Startup and Pending Apply Integrated Repair

Date: 2026-10-16

Status: local candidate; independent review pending

Starting commit: `034ec9ff648072d712dc570e356b97e1c252f3cd`

Starting tree: `33f125e04958e5c2e2612b52803bc528d7737b7a`

## Reproduced behavior and causes

The exact older visible build from `0be5f9f4e140c3778d8ac58f380c3eed72d83cb2` was installed in isolated Microsoft Edge under the real `/Arc-Pilot/` scope, then offered the current candidate through the existing release-evidence boundary. The pre-repair run recorded 2,346 ms staging and a 6,618 ms explicit Apply. It also confirmed that the older screen labels any installed waiting worker ready before it can inspect the verified release identity.

Three coupled causes were found:

1. the candidate worker's `install` event awaited remote evidence and complete authority-asset staging, so unavailable or slow evidence held the browser installation lifecycle open;
2. a waiting-worker status query awaited the same unbounded remote fetch instead of reporting the current fail-closed state promptly;
3. every controlled navigation and authority-asset request repeated complete cache evidence and 103-asset hashing. This made otherwise local cold starts depend on redundant cryptographic work. An early unverified result also had to be invalidated when staging later completed.

## Bounded correction

- Worker installation now completes after the ordinary shell cache and durable waiting-role record. It performs no remote evidence read and exposes no automatic activation.
- Waiting-worker queries return the current state immediately, start single-flight verification in the background, and bound each release-evidence fetch to five seconds. An unavailable candidate remains `LEGACY_UNIDENTIFIED`; Apply is unavailable at the transport boundary.
- The exact historical one-field `SKIP_WAITING` bridge still accepts only an in-scope ARC window and now explicitly completes independent evidence and full-cache verification before `applyLegacyVerified()` can activate.
- Verified routing memoizes one complete release-cache verification per service-worker lifecycle. Staging completion, replay, lifecycle sentinel writes, and recovery selection invalidate that memo. Explicit provision, Apply, health, and recovery operations retain their accepted exact validation.
- Build, shell, and release-transport identities advance to `samsung-startup-pending-apply-integrated-repair-1`. Authority closure remains exactly 103 assets and the reviewed visual set remains exactly 11 assets.

No database, schema, store, academic marker, classroom record, compatibility receipt, recovery package, domain authority, or production state is changed by this repair.

## Installed Edge verification

The final rehearsal used a new task-owned Edge profile, fictional academic sentinel data, a second open client, and an injected 50 ms delay for every authority-asset response.

| Check | Result |
| --- | --- |
| Slow verified staging | 10,405 ms; queries remained responsive and Apply remained unavailable until verification completed |
| Explicit old-client Apply | 1,827 ms; exactly one activation; offline during takeover |
| Full process cold restart 1 | 239 ms |
| Full process cold restart 2 | 253 ms |
| Full process cold restart 3 | 386 ms |
| Offline restart | 424 ms |
| Storage and authority | IDB 14, exactly 74 stores, academic `V8_AUTHORITATIVE`, P5–P10 `V7_ONLY`, real Student authorization false |
| Legacy state | exact SHA-256 unchanged across update and restarts |
| Recovery | verified 74-store backup, destructive fictional mutation, restore, and exact per-store checksum parity |
| Cleanup | task registration, caches, profile database, and loopback harness removed |

The rehearsal used no Samsung device, production database, real Student record, production recovery file, or authority transfer.

## Boundary and next gate

This is an unpublished local candidate. Publication, release-manifest creation for a published Git identity, independent compatibility approval, release-channel change, Samsung staging or Apply, and production authority changes all remain separately gated.
