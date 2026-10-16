# ARC Instructor-First Release Delivery Preparation

**Published predecessor:** `bd7a046f071f43d930cd53169da39918b04a8feb`, tree `552efbbffdd816e0c6fbcea2f510f1cd8a4f8dbb`

**Starting local candidate:** `609aed50dcdd69f85483b952da104e16e03d9537`, tree `722dc941a0b51ef5ebeac7507b807dced257fa8a`

**Rollback:** `rollback/pre-instructor-first-release-delivery-preparation`

**Scope:** local release delivery preparation; unpublished; no Samsung or production access

## Bounded correction

The original installed-Edge evidence used the candidate worker's loopback-only query URL to force a new registration. That proved staging and Apply, but did not prove the actual first delivery from the published predecessor's unchanged `./sw.js` registration.

The rehearsal now pins baseline bytes to the exact published predecessor and calls its existing `registration.update()` path. It also begins with the configured release-evidence channel unavailable. The candidate installs as a waiting worker, remains `LEGACY_UNIDENTIFIED`, exposes no Apply, and leaves the published app active. When fictional accepted evidence becomes available, the old App & Updates check sends its existing release query. The waiting worker retries the canonical evidence bootstrap, verifies all 103 authority assets, and returns the exact nonce-bound Apply proof. Concurrent retries share one bootstrap promise.

This retry changes no approval rule. Missing, malformed, mutable, redirected, stale, mismatched, or unaccepted evidence still fails closed. Bare `SKIP_WAITING` remains refused, and Apply remains an explicit instructor action.

## Release-evidence channel contract

The configured mutable pointer is:

`https://raw.githubusercontent.com/kobycarson67/Arc-Pilot/release-evidence/arc-update-channel-v1.json`

The channel is an operational distribution and custody boundary on the repository's raw-content service. It is **not a cryptographically independent trust domain** from the application repository. The approved threat model excludes malicious control of GitHub, CI, the origin, or the device. Independent review is represented by exact reviewer-controlled receipt bytes and governance, while the instructor retains consequential approval.

The evidence branch uses this layout:

```text
arc-update-channel-v1.json                         # mutable pointer on release-evidence
releases/<application-commit>/manifest.json       # committed before channel update
releases/<application-commit>/receipt.json        # exact externally reviewed receipt
```

The channel must point to manifest and receipt URLs under the exact first evidence commit SHA, never a branch name. The deterministic channel preparation script validates canonical manifest and receipt bytes, exact reviewer acceptance, immutable path shapes, release identities, hashes, and asset count before writing the pointer.

Observed raw-content behavior on 2026-10-15:

- an immutable existing Git blob returned `200`, no redirect, `Access-Control-Allow-Origin: *`, `Cross-Origin-Resource-Policy: cross-origin`, and `Cache-Control: max-age=300`;
- the configured channel returned `404`, no redirect, and the same CORS policy because it has not been created;
- installed Edge successfully fetched the configured channel URL shape, immutable evidence URLs, and same-origin `/Arc-Pilot/` assets in the isolated rehearsal;
- browser-standard CORS is viable for Android Chrome. No Samsung or Android device acceptance is claimed.

## Publication and evidence activation order

1. Independently accept the final local candidate commit/tree and review package.
2. Create the publication rollback reference and rerun full-history local gates.
3. Push the exact candidate branch, require candidate Regression success, verify remote `main` has not moved, then fast-forward `main` without force.
4. Require main Regression, Pages deployment, Pages Live Verification, and byte-level verification of all 103 authority assets plus 11 reviewed visual assets.
5. Generate the manifest from the immutable published commit, not a checkout:

   `node scripts/generate_arc_runtime_release_manifest.js --root . --contract runtime/arc_authority_closure_v1.json --out <manifest-path>`

6. Obtain an independent ChatGPT reviewer decision and exact canonical receipt for that manifest. Codex must not issue its own accepted receipt.
7. Commit only the exact manifest and accepted receipt to the `release-evidence` branch. Record that evidence commit SHA.
8. Generate the channel pointer using that immutable SHA:

   `node scripts/prepare_arc_update_release_channel.js --manifest <manifest-path> --receipt <receipt-path> --evidence-commit <40-char-evidence-sha> --repository-prefix https://raw.githubusercontent.com/kobycarson67/Arc-Pilot/ --manifest-path releases/<application-commit>/manifest.json --receipt-path releases/<application-commit>/receipt.json --out arc-update-channel-v1.json`

9. Commit the channel pointer as a second evidence-branch commit. Verify the mutable channel, both immutable URLs, canonical bytes, hashes, CORS, no redirects, published Pages bytes, 103/11 graphs, and release identity.
10. Only after all prior steps pass may a separately authorized Samsung delivery begin.

No final publication manifest, receipt, evidence commit, channel hash, or reviewer decision is invented by this preparation milestone.

## One-time Samsung journey

The installed predecessor already has the safe verified transport client and explicit Apply control, but does not have the candidate's automatic evidence distribution UI. The tested bridge is therefore:

1. keep Samsung closed throughout publication and evidence-channel activation;
2. verify current classroom recovery custody before any device update under a separate physical authorization;
3. open the installed ARC only after Pages and the complete evidence channel are live;
4. in the existing App & Updates screen, choose **Check for Update** once;
5. the unchanged `./sw.js` registration discovers the candidate; the waiting worker obtains and verifies exact evidence and 103 assets;
6. if network or evidence was temporarily unavailable, choose **Check for Update** again; the same waiting worker safely retries and Apply remains unavailable until verification completes;
7. choose **Reload & Update** only when the old screen reports **Update found — ready to apply**;
8. after reload, verify academic context, six Sections, Planning, Friday/Open Shop, Students and current classroom workflows, then close and cold-reopen ARC and verify offline use;
9. export and verify a fresh 74-store data recovery package after the update.

The first transition cannot offer code rollback to the predecessor because that predecessor predates recovery-capable verified code caches. The current classroom data backup remains the recovery authority. Once this candidate becomes healthy, later compatible verified releases can retain it as a selectable code recovery target. This limitation must be visible in the physical authorization; no old bare `SKIP_WAITING`, forced reload, or automatic Apply is permitted.

## Local verification result

- exact predecessor bytes controlled the initial normal app;
- unchanged `./sw.js` update discovery;
- unavailable evidence failed closed with no Apply;
- old App & Updates query recovered after evidence appeared;
- configured channel and immutable evidence URL shapes were observed;
- 103 authority assets and 11 reviewed visual assets;
- one explicit Apply, normal reload, complete Edge-process restart, and offline restart;
- academic authority sentinel preserved; P5–P10 remained `V7_ONLY`; real Student data remained unauthorized;
- all 74 stores survived; backup/restore matched exact per-store checksums;
- task-owned database, caches, registrations, profile, and server were cleaned up.

This is local fictional evidence. It is neither independent acceptance nor Samsung acceptance.
