# ARC Stage 1D-I1 — Read-Only Bootstrap Inspector

Date: 2026-10-12
Classification: local, unpublished, non-enforcing provenance inspection
Starting Core: `79d5f0d0dda73b35d439fa8bbc60960add98a46f` / `b033c92bb7d5cad33a73d10f98374d2ca0c4ed06`
Rollback: `rollback/pre-stage-1d-i1-read-only-bootstrap-inspector`

## Implemented boundary

I1 composes the accepted Stage 1D-Core manifest, receipt, compatibility-record and cache-closure validators inside the existing engineering academic-activation page. It inspects only caller-supplied marker/hint/record projections and injected read-only worker/cache evidence.

The coordinator exposes only `inspect()` and inert constants. It has no approval, persistence, cache mutation, worker message, update, recovery, activation, rollback, database or authority-transfer operation. Results are explicitly `nonEnforcing:true` and `transfersAuthority:false`.

URL-supplied commit/tree values are retained only as an untrusted diagnostic. They never establish worker or publication identity. A worker must expose a release identity through the injected read interface; the current legacy worker does not, so an actual current-browser inspection reports `WORKER_RELEASE_ID_UNAVAILABLE` rather than deriving identity from its URL.

## Read-only browser contract

The default engineering-page adapter may:

- read `navigator.serviceWorker.getRegistration()`;
- read active/waiting worker script URL and lifecycle state;
- enumerate cache names;
- open an already-existing named cache after confirming it exists;
- read cached response bytes and keys through the accepted Core verifier.

It does not register or message a worker, call `skipWaiting`, create a missing cache, add/put/delete cache entries, access IndexedDB, use local/session storage, import evidence, or alter an authority marker. Tests also support a fully injected fictional browser reader and trap database/storage/cache writes.

## Structured diagnostics

The inspector reports agreement only when the exact canonical manifest, independently accepted receipt, marker identity, hint relationship, one current approved compatibility record, chosen worker release identity and cached authority closure agree. Missing, malformed, stale, mixed, ambiguous, offline or unavailable evidence remains visible in structured diagnostics. Diagnostic agreement is not approval and cannot open an authority gate.

## Reviewed closure change

The real engineering-page source graph changed from 94 to 97 authority-bearing assets. Exactly three reachable executables were reviewed and added:

1. `src/arc_runtime_provenance.js` — canonical release/receipt/record and marker-identity validation;
2. `src/arc_service_worker_closure.js` — injected read-only exact cache-byte verification;
3. `src/arc_runtime_provenance_bootstrap.js` — non-enforcing I1 composition and diagnostics.

The generator still discovers the graph mechanically. Missing, modified, duplicate or unexpected transitive executables remain fail-closed, and an unreviewed fourth executable produces `SOURCE_GRAPH_DRIFT`.

## Detached custody correction

The original archives and damaged detached documents remain unchanged. Four superseding documents were created outside the repository:

- source manifest: `d46ead73253d03375410554582cf65af5ee680e6b795d285c38ec439282786a7`;
- source receipt: `978dffa964ea4b727f74b0c934729f6a84a3b5abebd9affc121585167a2d0012`;
- bootstrap-review receipt: `8973c8acf0095dfae65af0ad818e0c62584242e8e636fdd5fd46724e750107f5`;
- local custody re-verification: `29c51bea2f56814975d77ceeac0b140547fa2811e86d0e39da5b3b82bb7ec66a`.

The independently named supplement was unavailable locally. I1 does not claim independent verification of these corrected documents.

## Authority and stop boundary

Normal `index.html`, `sw.js`, `app-build.js`, update handling, activation owner/provider, Backup/Recovery, storage, adapters and deployment remain unchanged. No database, cache, marker, recovery package, Samsung device or production data was accessed or changed. Existing academic authority and P5–P10 states remain exactly as before.

I1 is a local review candidate only. I2, Publication A, compatibility provisioning, enforcement, real Student authorization and any authority transfer require separate review and authorization.

## Local verification

- accepted Core provenance: `17/17`;
- accepted Core closure verifier: `5/5`;
- expanded release-manifest/source-graph suite: `11/11`;
- I1 coordinator adversarial suite: `11/11`;
- real engineering-page composition: `4/4`;
- retained activation composition/Bell compatibility: `17/17`;
- static regression: `47/47`;
- changed-JavaScript parse checks: `5/5`;
- focused update/cache/live-contract files: `4/4`;
- complete full-history JavaScript inventory: `138/138` test files;
- exact nine-path allowlist and `git diff --check`: passed.

These are local test results. No browser, Samsung, production, publication or deployment verification was performed for I1.
