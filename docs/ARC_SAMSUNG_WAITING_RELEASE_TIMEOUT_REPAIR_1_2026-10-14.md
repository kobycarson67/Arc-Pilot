# ARC Samsung Waiting Release Timeout Repair 1

**Starting authority:** published commit `5d2fb9b689a39eac745a1123e4808e63475eba6a`, tree `1dc63bb442152b56812a1eddc51ef13b1447a4db`  
**Rollback:** `rollback/pre-samsung-waiting-release-timeout-repair-1`  
**Scope:** local release transport, engineering page, cache identity, and direct verification only

## Diagnosis

The engineering page abandoned every service worker request after 10 seconds. A legitimate 102-asset sequential fetch can exceed that window while the service worker remains alive through `event.waitUntil()`. The page therefore reported `WORKER_RESPONSE_TIMEOUT` without knowing whether staging was still running, complete, or interrupted.

The deterministic candidate cache also had no durable staging marker. A terminated worker could leave a partial cache that `query` and `cacheStatus` reported only as `LEGACY_UNIDENTIFIED`; an exact retry attempted full verification of that incomplete cache and could not restart safely. Concurrent same-release requests could enter the cache path independently.

Real Edge verification exposed one adjacent lifecycle fact: when every controlled client closes, Edge may promote the verified waiting worker without an explicit `skipWaiting()`. The accepted user-controlled Apply rule therefore requires a promoted-but-unapplied cache to remain nonrouting while still being discoverable and explicitly applicable.

## Bounded correction

- Provision messages receive a bounded 180-second page response window; ordinary release messages retain a 15-second bound. A page timeout closes its channel and reports `successClaimed:false` with an instruction to inspect status.
- The worker writes a canonical, release-bound staging marker with bounded progress before and during download. `query` and `cacheStatus` distinguish `STAGING_IN_PROGRESS` and `STAGING_INCOMPLETE`; neither state exposes Apply.
- Same-release concurrent requests join one staging promise. A different release is refused while staging is active.
- Fetch, redirect, origin, closure, manifest, receipt, and sentinel validation remain exact. Fetch or verification failure removes only the candidate cache. An exact retry removes only an unverified candidate; a corrupted cache bearing a verified sentinel still fails closed.
- If Edge promotes an unapplied verified worker after a full process restart, the cache is reported as `VERIFIED_RELEASE_PENDING_APPLY`. It remains excluded from normal verified routing. The engineering page may query that active worker and perform the same nonce and identity bound explicit Apply. An active worker may resume only its exact interrupted candidate.
- The engineering surface defaults to the reviewed 102-asset count. The shell cache, release-transport marker, and page revision advance together; the established build contract remains stable and the authority graph remains exactly 102 assets and the reviewed visual graph remains exactly 11 assets.

## Isolated Edge evidence

The installed Microsoft Edge rehearsal used a new task-owned profile, a loopback server, fictional canonical manifests and receipts, and no database records.

- A 102-asset page-driven stage took 18,514 ms and returned `VERIFIED_WAITING` without the historical 10-second failure.
- Explicit status recognized the completed release; exact replay performed no second fetch pass.
- Verified status remained readable offline.
- An injected mid-fetch HTTP failure returned `ASSET_FETCH_FAILED` and removed the candidate cache.
- A 12-second final-asset delay completed and verified.
- Forced service worker target termination produced `STAGING_INCOMPLETE`; exact retry completed.
- A full Edge process restart produced `VERIFIED_RELEASE_PENDING_APPLY`, active worker role, `applyAvailable:true`, and no Apply invocation.
- Prior caches remained present throughout. Cleanup removed the task registration, caches, database state, and profile.

The rehearsal recorded zero Apply calls, zero database writes, zero authority transfers, and no production access.

## Verification

- Complete full-history JavaScript inventory: **151/151 test files passed**.
- Static regression: **47/47 checks passed**.
- Focused release transport: **37/37 cases passed**.
- Engineering page composition: **10/10 cases passed**.
- Mechanically discovered source closure: **102 authority assets**, **11 reviewed non-authority visual assets**, no graph drift.
- Changed JavaScript parse checks: **9/9 passed**.
- Normal-shell deployment smoke: passed.
- `git diff --check`: passed.

## Authority boundary

This repair changes no schema, IndexedDB version, store, academic marker, recovery package, compatibility receipt, classroom owner, or domain adapter. Existing academic authority is preserved. P4 through P10 production authority is unchanged, real Student data remains unauthorized, and no release was published or staged on Samsung.
