# ARC Stage 14 — Cutover Implementation Stage 2

## Local implementation checkpoint

Stage 2 implements the bounded academic cutover capability for Student, Course, School Year, Semester, Grading Period, Section, Course Enrollment, Enrollment Schedule Assignment, effective-date rosters, and atomic section moves.

The real browser `arc_classroom_v8` database has not been initialized. This module is not loaded by `index.html` or `sw.js`. Production activation, v7 academic-write shutdown, and Samsung acceptance therefore have not occurred. Current classroom authority remains `V7_ONLY`; the target after all gates is `V8_AUTHORITATIVE` for the complete academic domain.

## Instructor decisions implemented

- Manual instructor entry is the initial Student and roster source inside ARC.
- Student identity is an immutable v8 UUID; duplicate names are allowed and never reconciled by name.
- Stable Course authority is exactly `arc-course-wt` / `WT` / `Welding Technology` and `arc-course-awt` / `AWT` / `Advanced Welding Technology`.
- School Year, Semester, Grading Period, Section, period, and roster placement are manually configured.
- A single instructor/operator supplies actor provenance without embedding a permanent single-user identity assumption.
- No SIS, roster import, external synchronization, pilot import, or synthetic production identity exists.
- `calendarEvents` and `calendarOverrides` remain unresolved and untouched.

## Implementation

`ArcV8AcademicCutover` composes `ArcV8Academic` and `ArcV8BackupRecovery`. Its preflight requires the exact Stage 1 manifests, protected production identity, healthy integrity audit, verified complete recovery package, and zero later-domain records.

The manual adapter provides Course verification, academic hierarchy setup, Section configuration, Student creation, Enrollment, effective assignment, atomic move, lifecycle closure/archive, date-based grading-period resolution, deterministic roster, and setup summary. In production mode it refuses Student and Enrollment creation while real student data remains unauthorized.

The local checkpoint manifest records `authorityState: V7_ONLY`, `targetAuthorityState: V8_AUTHORITATIVE`, `productionActivated: false`, `samsungVerified: false`, and `v7WritesDisabled: false`. It cannot be mistaken for accepted production transfer.

`ArcV8Academic` now also enforces:

- exact stable WT/AWT manifest compatibility;
- Semester containment within School Year;
- Grading Period containment within Semester;
- Enrollment containment within School Year;
- one nonvoid Student/Course/School-Year Enrollment;
- Schedule Assignment containment within Enrollment;
- existing parent, scope, overlap, revision, lifecycle, and atomic-move rules.

## Remaining acceptance gates

The immediate protected-production initialization procedure and its authorization boundary are recorded in `ARC_SCHEMA_V8_STAGE_14_STAGE_2_PRODUCTION_INITIALIZATION_CHECKPOINT.md`.

1. Separately authorize and execute real-browser Stage 1 initialization.
2. Verify the protected empty production database and create the Stage 2 recovery point.
3. Wire and publish the bounded academic consumers only after those gates.
4. Prove every academic read/write uses v8 and independent v7 academic writes stop.
5. After production initialization and bounded academic-consumer activation, run the production academic cutover checks in the installed Samsung PWA and direct Chrome. The isolated engineering bridge and Cleanup Isolation Repair 1 lifecycle checkpoint are physically accepted, but they do not substitute for this production authority-transition verification.
6. Keep real Student production data prohibited until the separate Stage 15 authorization.

## Status

- Stage 14 / Cutover Implementation Stage 2: **ENGINEERING PHYSICAL CHECKPOINT ACCEPTED — ACADEMIC AUTHORITY TRANSITION NOT FORMALLY ACCEPTED**
- Academic Classroom Authority: **V7_ONLY**
- Production Readiness: **NOT ACHIEVED**
- Classroom Readiness: **NOT ACHIEVED**
- Real Student Production Data: **NOT AUTHORIZED**
