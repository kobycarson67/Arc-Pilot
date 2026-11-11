# ARC Batch B Multi-Section Startup Repair 1

## Authority and baseline

This bounded local repair starts from accepted Candidate 3 commit `7882125517dd6b0e3b6ff52e2aaa0324aa05a66b`, tree `1aee33b00ed9ff80e1d0c4ed8effa2936aa5b4f5`. Rollback reference `rollback/pre-batch-b-multi-section-startup-repair-1` resolves to that exact commit.

Student identity remains durable across Sections and periods. A selected Section remains instructional context, not Student identity. Academic, P4–P10C, Gradebook, release, database, and real-student authority contracts are unchanged.

## Confirmed defect

Candidate 3 built the Batch B startup projection from every active Student while also applying the selected Section ID to every Student. On the physical Samsung, 25 valid Students existed, only six belonged to the selected Period 5 AWT Section, and all 25 had at least one valid P4 scope. The invalid combined context caused `ACADEMIC_SCOPE_REQUIRED` before application health acknowledgement.

The protected records were valid. No data repair was appropriate.

## Correction

- Program-wide Batch B startup continues to load every active Student.
- The context now selects a per-Student Section scope: the selected Section is preferred only when that Student has a legitimate P4 scope there; otherwise the Student's own effective P4 scope is used.
- The Batch B projection accepts the explicit per-Student Section map and retains the existing strict `studentView()` refusal for missing or invalid Student/Section pairs.
- Section switches rebuild the program projection with the same rule, so Section-specific instructor views retain exact scope while Students in other Sections remain available to program-wide owners.
- Application-health acknowledgement now exposes a bounded state and error code for missing worker proof, mismatched acknowledgement, or transport failure. It still runs only after successful academic startup and only the verified worker can return `ACTIVE_HEALTHY` or `RECOVERY_ACTIVE_HEALTHY`.

No schema, store, authority owner, policy, Student, Enrollment, grade, attendance, pass, Workplace, History, release protocol, nonce, sentinel, or cache-selection behavior changed.

## Verification

- Focused Batch B projection: `5/5` PASS.
- Multi-section startup regression: `4/4` PASS.
- App Update Controller: `20/20` PASS.
- Batch B normal-shell integration: `5/5` PASS.
- Complete JavaScript inventory: `187/187` files PASS.
- Static regression: `47/47` PASS.
- Authority closure: exactly 114 approved assets; build and shell identities advanced together.
- Installed Edge, task-owned fictional database: Schema 8 / IndexedDB 14 / 74 stores; 25 Students; 26 Schedule Assignments; six selected Period 5 AWT Students; one legitimate AWT dual-period Student.
- Installed Edge startup: all 25 Batch B projections loaded; six used selected-Section scope; 19 retained another valid Section scope; switching to Period 2 WT produced four selected scopes plus 21 other program scopes.
- Installed Edge offline restart: 25 Students, 25 Batch B views, and 74 stores remained available.
- Localhost release health correctly remained refused with `ACTIVE_VERIFIED_RELEASE_REQUIRED`; it did not claim `active_healthy` without immutable verified-release proof.

All browser records were fictional and task-owned. No Samsung or production database operation occurred during implementation.

## Release and recovery boundary

This source remains pending genuine independent technical review. Passing local verification is not compatibility acceptance, publication, Samsung adoption, or physical acceptance.

The November 10 production backup is materially stale. Even after independent source acceptance and guarded publication, Samsung delivery remains blocked until a current production recovery package passes exact upload/download bytes, SHA-256, package integrity, isolated 74-store restoration, and canonical parity under the established retention policy. The current Samsung `RECOVERY_REQUIRED` shell may prevent the ordinary in-app backup workflow; no replacement production-backup mechanism is authorized here.
