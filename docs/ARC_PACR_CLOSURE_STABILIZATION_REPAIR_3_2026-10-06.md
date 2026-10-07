# ARC PACR Closure Stabilization / Repair 3

Date: 2026-10-06
Starting authority: `97788283128686978f0fd3f147608bab8b4ae693` / `918dff7d35262e40ec37b2adb1384b3ac316e364`
Rollback: `rollback/pre-production-academic-configuration-reconciliation-closure-repair-3`
Authority state: Schema 7 / `V7_ONLY`

## Status

**PACR CLOSURE STABILIZATION / REPAIR 3 — LOCAL CANDIDATE / INDEPENDENT CLOSURE REVIEW PENDING**

This repair closes the audited PACR operation-lifecycle failure family as one bounded correction. It does not authorize publication, physical execution, production access, package event 13, Student data, v8 activation, authority transfer, or dual writing.

## Durable lifecycle and recovery

The existing Production Academic Configuration manifest now carries one of three explicit states:

- `configuration-in-progress` before the first owner write;
- `configuration-written-pending-reopen` after the academic and schedule owners finish;
- `configured-pending-activation` only after exact preclose and reopened verification.

Each lifecycle record binds the attempt ID, academic/schedule/migration fingerprints, verified recovery checksum and filename, operator, exact publication commit/tree, rollback reference, `V7_ONLY`, `academicAuthorityTransferred: false`, and `realStudentDataAuthorized: false`.

A later coordinator classifies either nonfinal state as `RECOVERY_REQUIRED`. It will not prepare, apply, or infer a resume. Unrecognized partial academic or schedule authority fails closed. Interrupted-operation recovery requires the exact externally loaded and verified recovery package, original operator/publication/rollback authority, and the confirmation `RESTORE VERIFIED PRE-CONFIGURATION RECOVERY`.

## Externally verified recovery prerequisite

Preparation still creates and downloads the verified recovery package, but the in-memory result is not apply authority. The exact downloaded JSON must be loaded and verified again. Its database identity and complete store count/checksum baseline must match the live protected database. This same process establishes a fresh preparation after a page reload.

Once apply enters its write path, preparation is consumed. Every caught failure discards cached connections and services, obtains a fresh connection and fresh Backup/Recovery service, restores the frozen recovery, obtains another fresh connection, and proves complete-store parity. Restore or parity failure remains a hard stop.

## Exact semantic closure

One deterministic postcondition checks the reviewed plan against owning-service readback before close and after a fresh reopen. It verifies:

- the exact canonical WT/AWT Courses;
- School Year, Semester, Grading Period, and current-Semester Section authority;
- Bell Schedules and the one reviewed default weekly Schedule Mode;
- Calendar Events with time/reminder data and exact Date Overrides;
- effective Section Placements and separate Planning Placement;
- no future-Semester placements;
- zero Students, Enrollments, and Schedule Assignments;
- exact lifecycle fingerprints, recovery, publication, rollback, and authority fields;
- unchanged checksums for every store outside PACR's academic/schedule authority.

The last condition keeps accepted instructional package history at 12 events, preserves all 124 reference-only Lessons and their eligibility boundary, prevents package event 13, and detects any unrelated store mutation. The final manifest status is written only after reopened verification, then read back and checked.

## Operation and publication binding

The coordinator refuses simultaneous or reentrant prepare, recovery-load, apply, interrupted recovery, summary, state-inspection, and reopen operations. The engineering controller disables every PACR action/input while any action runs.

The engineering URL must supply `publicationCommit` and `publicationTree`. Missing or mismatched values block destructive preparation and application. No future publication SHA is hard-coded.

The bounded runtime/cache identity is `stage2-production-academic-configuration-closure-1`. The coordinator, HTML query keys, service-worker asset entries, and Pages live-verification assertions use that exact value. Normal `index.html` remains unchanged and does not load PACR.

## Verification evidence

- PACR reconciliation and closure suite: 40/40.
- Retained Production Academic Configuration: 8/8.
- Schedule migration: 17/17.
- Academic Cutover: 17/17.
- Schedule Cutover Closure Stabilization: 5/5, including 50,000/50,000 resolver agreement, 2,500 weekly cases with zero false results, five unsafe shadow-removal refusals, and 192 mutation transitions.
- Resolved Bell coverage: 25/25.
- Academic Administration: 30/30.
- Backup/Recovery: 20/20.
- Schedule adapter, academic consumer, Attendance, and Curriculum/Pacing retained suites passed.
- Repository-wide static, parse, diff, and complete JavaScript results are recorded in the final local closeout.

No Samsung or production operation was performed. Historical deliberately retired Weekly Schedule Mode readback remains `UNRESOLVED`; this repair does not choose policy for it.

## Semantic Oracle Correction — PACR-CLOSURE-R3-01

The closure postcondition now derives its expected academic and schedule meaning independently from the frozen reviewed configuration and migration plan. Owner command results supply generated IDs only through an explicit opaque identity-binding map. They no longer supply expected labels, dates, Bell periods, weekly Bell or instruction mappings, Calendar Event content, Date Override meaning, Section or Planning periods, or lifecycle authority.

The durable lifecycle records the opaque bindings instead of retaining owner-created content as its semantic oracle. All accepted Repair 3 recovery, interruption, fresh-service rollback, exact-store parity, final-status promotion, reentry, publication binding, runtime identity, package-history, and reference-only Lesson protections remain in force.

Adversarial tests now persist nine wrong-but-stable states: Bell content, weekly Bell mapping, weekly instruction mode, Calendar Event content, Date Override instruction, Section placement period, Planning period, academic label, and final lifecycle authority. Every case fails with `SEMANTIC_POSTCONDITION_FAILED` and restores exact preconfiguration parity. The focused PACR suite is 41/41. No runtime/cache identifier changed because this correction was not published.
