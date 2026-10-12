# ARC Stage 1D-Core — Inert Provenance Foundation

Date: 2026-10-11
Classification: local cutover-enabling maintenance; no runtime integration or authority transfer
Starting authority: published `0be5f9f4e140c3778d8ac58f380c3eed72d83cb2`, tree `67dd96263a7e4d1db8fc347db2f02ea35030c68f`
Rollback: `rollback/pre-stage-1d-core-local-implementation`

## Scope completed

Stage 1D-Core implements pure, inert building blocks only:

- strict duplicate-key-aware JSON parsing and deterministic canonical JSON;
- raw-byte SHA-256 release manifests without receipt/self-hash circularity;
- exact Schema 8 / IndexedDB 14 / 74-store and domain-bound validation;
- independently accepted compatibility-receipt validation under the approved accidental/stale/mixed-asset threat model;
- immutable in-memory compatibility-record validation, idempotent replay, supersession/denial lineage, ambiguity refusal, marker/recovery binding, and exact manifest/receipt binding;
- mechanically discovered authority dependency closure checked against a reviewed 94-asset contract;
- pure injected-cache verification that reads simulated bytes but cannot promote, delete, register, or mutate caches;
- fictional fixtures and C-01 through C-20 adversarial coverage.

## Runtime release-manifest contract

The manifest identifies exact raw bytes for every approved authority-bearing dependency discovered from:

- normal `index.html` script, stylesheet, and manifest references;
- `sw.js` `importScripts`, `CORE` declaration, and literal `CORE.push` dependencies;
- every current engineering HTML surface and its local dependencies;
- CSS `url(...)` references, classified explicitly as authority-bearing or reviewed visual-only material.

The generator requires a clean Git index/worktree, reads current HEAD/tree, rejects source-graph drift, and validates the `app-build.js` build identity against the closure contract. It refuses missing, extra, unclassified, ambiguous, unsafe, redirected, cross-origin, or dynamically loaded executable dependencies.

The release identifier is derived from the canonical manifest body after asset closure hashing. The final manifest SHA is derived after adding the release ID. A later independent receipt references the completed manifest; the manifest never references its future receipt.

## Compatibility records

Core defines record shape and in-memory validation only. It performs no persistence.

- contract: `arc-academic-schedule-v1`;
- historical activation marker represented only by its stable identity SHA-256;
- exact release/manifest/closure/receipt/publication/build binding;
- exact prewrite recovery checksum;
- Schema 8 / IDB14 / 74 stores;
- P5–P10 authorities remain `V7_ONLY`;
- `realStudentDataAuthorized:false`;
- `transfersAuthority:false`;
- append-only approval, supersession, and denial history;
- no time expiry.

The minimum approved threat model does not protect against malicious control of the hosting origin, CI, or device.

## Closure contract result

The reviewed current closure contains 94 authority-bearing files. Visual-only PNG/WebP/SVG/ICO dependencies are mechanically discovered and explicitly classified outside the authority hash set. A future loaded executable or safety-critical dependency changes the graph and fails until the contract is reviewed.

## Explicit nonchanges

No changes were made to:

- `index.html`, `sw.js`, `app-build.js`, or update behavior;
- academic activation owner/provider/page or P3/P4 adapters;
- P5–P10 adapters or authority states;
- storage, schema, stores, database, backup, restore, PACR, markers, or recovery files;
- deployment/CI workflows or user-facing pages.

The modules are not loaded by normal ARC or the service worker. They cannot affect current classroom behavior.

## Verification

Fresh local verification for the candidate tree passed:

- runtime provenance `17/17`;
- service-worker closure `5/5`;
- release-manifest generator `7/7`;
- combined focused `29/29` with C-01 through C-20 all mapped;
- static `47/47`;
- complete full-history JavaScript inventory `136/136` test files;
- parse `6/6`;
- exact 17-file source boundary and `git diff --check`.

Historical Edge/Samsung evidence was not rerun and must not be represented as Stage 1D-Core verification.

## Open Integration boundary

Stage 1D-Integration remains unauthorized and blocked by an accepted bootstrap sequence for an already activated installation. Core does not choose or implement that sequence. No receipt import, service-worker enforcement, compatibility-record persistence, publication, physical operation, or authority transfer occurred.

## Next bounded decision

Independent review should accept or reject the Core commit/tree. A consolidated Project Source refresh is recommended after independent acceptance and before an Integration handoff because Core adds substantive implementation and test bytes. It must be a new dated export and must not replace prior shared sources.
