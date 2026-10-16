# ARC Instructor-First Update & Recovery

**Starting authority:** published commit `bd7a046f071f43d930cd53169da39918b04a8feb`, tree `552efbbffdd816e0c6fbcea2f510f1cd8a4f8dbb`
**Rollback:** `rollback/pre-instructor-first-update-recovery-1`
**Scope:** bounded local update, installation, code-recovery, and verification engineering

## Instructor workflow

Normal ARC Settings now presents the update workflow in ordinary classroom language:

1. **Check for verified update** obtains a separately reviewed release declaration and asks the waiting service worker to stage it.
2. **Check update status** reports durable staging progress. Leaving the page does not convert an in-progress stage into a failed release.
3. **Stop waiting** stops only the page from waiting for a reply. It does not delete or approve the worker's background candidate.
4. **Install verified update** appears only after the exact waiting release, receipt, closure, and cache have verified. Installation still requires an explicit instructor action.
5. **Use last verified ARC code** is offered only when a compatible, healthy, recovery-capable prior code cache exists. It requires the exact confirmation `USE LAST VERIFIED ARC CODE`.

Routine use does not ask the instructor for commit hashes, manifest hashes, receipt uploads, or service-worker terminology. Those identities remain enforced internally and visible in engineering evidence.

## GitHub Pages scope correction

The Samsung failure reported an extra cache asset named `Arc-Pilot/app-build.js`. Cache API keys are absolute URLs, while the reviewed release manifest uses repository-relative paths. Comparing the absolute request path directly to the manifest path duplicated the GitHub Pages project scope.

The closure verifier now receives the exact service-worker scope and normalizes every Cache API request against that scope before comparison. It rejects another origin, a path outside the scope, queries, fragments, traversal encodings, case collisions, duplicates, missing assets, extra assets, and byte changes. `/Arc-Pilot/app-build.js` therefore maps to exactly `app-build.js`; it cannot become `Arc-Pilot/app-build.js`.

## Independent release evidence

ARC obtains a strictly canonical `ARC_UPDATE_RELEASE_CHANNEL` document from the configured external evidence origin. The declaration binds one immutable manifest URL and one immutable receipt URL to exact SHA-256 values, release identity, closure identity, asset count, date, and the accepted independent reviewer authority. Same-origin declarations, mutable evidence URLs, redirects, altered bytes, mismatched identities, and unaccepted reviewer authority fail closed.

This local candidate configures the distribution boundary and normal workflow. It does not create or approve the external review receipt, publish the evidence channel, or publish ARC. A future publication must supply independently accepted evidence for that exact publication before the automatic stage can succeed.

## Recovery boundary

Code recovery and classroom-data recovery remain separate operations.

- Code recovery selects a complete, verified, previously healthy code cache. It performs no IndexedDB or local classroom-state write.
- Data restore continues through the existing verified Backup/Recovery service and its 74-store integrity and parity contract.
- A prior code release is selectable only when its recorded Schema, IndexedDB, store count, domain authority, and recovery capability match the current application.
- The published predecessor predates this recovery selector. The rehearsal therefore reported code recovery unavailable honestly while proving data backup and restore remained available.
- The worker retains verified prior caches. It does not silently activate one, silently Apply an update, or delete a prior cache during the update flow.

## Safety matrix

| Condition | Result | Data or authority effect |
|---|---|---|
| No network or missing evidence | Current ARC remains usable; update is not offered | None |
| Same-origin, mutable, redirected, malformed, stale, or mismatched evidence | Fail closed before staging approval | None |
| Slow stage | Durable progress can be inspected; page waiting can be stopped | Candidate cache only |
| Interrupted stage or worker termination | Incomplete state is detected; exact retry replaces only the unverified candidate | Prior verified caches and classroom data preserved |
| Mixed, missing, extra, redirected, or out-of-scope asset | Verification fails; Apply remains unavailable | Candidate cache rejected |
| Verified waiting release | Instructor sees a ready state; no automatic Apply | None until explicit Apply |
| Explicit Apply | Exact nonce and release-bound token activate the verified worker | Code controller changes; classroom data unchanged |
| Compatible healthy prior code | Exact confirmation may select the prior verified cache | Code routing only |
| Incompatible or pre-capability prior code | Code rollback is unavailable | Data restore remains separate |
| Corrupt recovery selection | Fail closed without legacy or network fallback | None |

## Installed Edge evidence

A new task-owned Microsoft Edge profile exercised the real normal application at `http://127.0.0.1:48941/Arc-Pilot/`.

- The published starting worker controlled the first load.
- The candidate waiting worker independently staged and verified all **103 authority assets** and retained the **11 reviewed visual assets**.
- The former `Arc-Pilot/app-build.js` mismatch was reproduced as the input shape and normalized to `app-build.js`.
- The published predecessor's unchanged `./sw.js` registration discovered the candidate through `registration.update()`. The old normal App & Updates interface recognized the verified waiting worker.
- When the configured evidence endpoint was initially unavailable, the waiting worker failed closed with no Apply. The old App & Updates check safely retried the same waiting worker after fictional evidence became available.
- One explicit Apply activated the release and reloaded the normal application.
- Exact legacy-state bytes, a fictional academic-authority sentinel, `P5–P10 = V7_ONLY`, `realStudentDataAuthorized = false`, and all **74 stores** survived Apply, reload, full Edge-process restart, and offline restart.
- A complete 74-store backup verified, a temporary mutation was introduced, restore removed it, and every per-store checksum matched the pre-mutation package.
- Task-owned registrations, caches, and the rehearsal database were removed. Samsung and production were not accessed.

## Authority boundary

This milestone changes no schema, IndexedDB version, store, classroom record, academic marker, compatibility record, package event, Lesson acceptance, or transaction-domain authority. Existing academic authority is preserved. P5–P10 remain `V7_ONLY`, real Student data remains unauthorized, and publication, deployment, Samsung delivery, and production update execution require separate authorization.
