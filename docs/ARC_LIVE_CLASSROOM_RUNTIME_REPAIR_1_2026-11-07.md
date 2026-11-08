# ARC Live Classroom Runtime Repair 1

Status: **LOCAL CANDIDATE — INDEPENDENT REVIEW REQUIRED**

Published baseline: `3943f05e847a5318c5cd8bee10f45ca905e57501`

Published tree: `d5c5145aa4b6583ba7848fcc2d78e08c167528aa`

## Defect and correction

The production P4–P10C transition wrote its three coordinated authority records correctly, but normal ARC misclassified the production record as task-owned verification because the routing branch depended on `window.__ARC_PHYSICAL_DB`. That global belongs only to isolated browser fixtures and is absent on Samsung.

Normal ARC now derives an immutable database identity from the already-open, accepted `ArcV8Storage` owner and connection. The installed academic runtime refuses unless that identity is exactly:

- database `arc_classroom_v8`;
- logical Schema 8;
- IndexedDB version 14;
- 74 stores.

An `ARC_LIVE_CLASSROOM_PILOT_AUTHORITY` record enters the production path only when both its logical and physical database identities match that accepted runtime identity. Any mismatch fails closed with `PILOT_PRODUCTION_DATABASE_REQUIRED`. The separate nonproduction unified-verification branch still requires the named task-owned database and `window.__ARC_PHYSICAL_DB`; it still refuses with `UNIFIED_NONPRODUCTION_DATABASE_REQUIRED` outside that harness.

No global is defined in production, no authority check is bypassed, and no production transition is performed by this repair.

## Retained authority boundaries

- Academic authority remains `V8_AUTHORITATIVE`.
- The published/physical production state remains P4–P10C `V7_ONLY` until a later accepted release and guarded physical transition.
- `realStudentDataAuthorized` remains `false`.
- Dual write remains prohibited.
- Production activation, rollback, release evidence, OneDrive custody, and real-Student authorization remain separate evidence-bound gates.
- Original Lessons remain `reference_only`; replacement Lessons remain `DRAFT_INSTRUCTOR_REVIEW`.

## Verification design

The new source regression proves exact production identity checks, retained nonproduction refusal, and an exact baseline-plus-suffix build/cache identity. The installed-Edge regression uses a task-owned profile and fictional data to prove:

1. pre-cutover V7 startup;
2. academic V8 activation and a production-shaped P4–P10C transition;
3. normal-shell rehydration with `typeof window.__ARC_PHYSICAL_DB === "undefined"`;
4. P4–P10C `V8_AUTHORITATIVE`, no dual write, and real-Student writes refused;
5. fictional Simulation workflow and exact Live-state isolation;
6. offline reload and full-process cold restart;
7. exact activation-bound rollback with 957/957 record parity;
8. post-rollback Academic V8 with P4–P10C `V7_ONLY` and real-Student writes refused.

Publication, Samsung operation, OneDrive mutation, production authority transfer, and real-Student authorization are outside this local repair checkpoint.
