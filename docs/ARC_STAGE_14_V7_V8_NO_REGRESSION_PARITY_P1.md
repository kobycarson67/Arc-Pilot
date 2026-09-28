# ARC Stage 14 — P1 Frozen V7→V8 No-Regression Parity Contract

## Authority

This document records completion of **P1 — Freeze the parity contract**. The completed Stage 14 v7→v8 Classroom Functional Parity Audit is the governing cutover inventory.

**The accepted ARC application is the product. Schema 8 is its data engine.**

- Starting authority: commit `991cbdb6ad1b13f897ce08cc96f88e9d725bfb43`, tree `99c95af65fe3c8d37136dd3b5be378ac4e758bac`
- Rollback reference: `rollback/pre-stage-14-parity-program-p1`
- Academic authority: `V7_ONLY`
- Normal classroom runtime: Schema 7
- v8 foundation: Schema 8 / IndexedDB structural version 10
- Production mutation: prohibited and not performed
- Real Student data in v8: prohibited and not authorized

The deterministic machine-readable contract is [`../parity/stage14_v7_v8_parity_contract.js`](../parity/stage14_v7_v8_parity_contract.js). Its canonical JSON SHA-256 is `18a2d9428d908ca14f8cab6a767dd3bf6a66cdf369d712ff8da17f6b66d363c3`.

## Registry semantics

The registry freezes 47 production-critical capability rows. Every row records the v7 source and anchors, instructor action, observable result, persistent state, cross-view consumers, required v8 authority and adapter, allowed differences, history/correction behavior, recovery expectation, Samsung requirement, retirement authority, and verification evidence.

Allowed status progression is:

1. `not-started`
2. `service-ready`
3. `ui-connected`
4. `behaviorally-verified`
5. `samsung-verified`
6. `accepted`

`retired-by-instructor` is an explicit terminal path requiring instructor identity, time, and reason. A row cannot become `accepted` merely because a v8 store or service exists.

Current frozen totals:

| Status | Rows |
|---|---:|
| `not-started` | 21 |
| `service-ready` | 23 |
| `ui-connected` | 0 |
| `behaviorally-verified` | 0 |
| `samsung-verified` | 0 |
| `accepted` | 3 |
| `retired-by-instructor` | 0 |

The three accepted rows are the application-update/PWA authority, navigation shell, and isolated simulation infrastructure. Their automated, Samsung, and acceptance evidence is recorded in the registry. This acceptance does not transfer academic authority.

## Frozen capability inventory

| Domain | Contract rows |
|---|---|
| Academic and calendar | School Year/Semester; Grading Periods; Sections; Schedule Setup; school calendar; bell schedules; Planning Period; Section period placement; Semester Transition |
| Students and cross-view context | Student records; directory/search; roster management; movement; Dashboard/class context; Fast Roster |
| Attendance | Attendance; passes; attendance/pass history |
| Instruction and planning | Curriculum/standards; Lesson Plans; pacing; Class Forecast; notifications |
| Projects | Project Library; assignment; checkpoints; rubric |
| Competencies and activities | Competency catalog; assessment; reassessment; Technical assessments; Open Shop |
| Workplace and behavior | Workplace; Safety; Behavior/Incidents |
| Gradebook | ARC Gradebook; manual school-gradebook posting |
| Artifacts and history | Photo capture; Student Work Library; Student history |
| Shop and inventory | Booth Manager; General Inventory; Material Inventory |
| Recovery and platform | Backup/restore; app update/PWA; navigation shell; simulation isolation |

The machine-readable rows are the exact authority when this summary and a row differ.

## Cutover gate

V8 classroom authority cannot be accepted until every retained production-critical row is operational through v8 with normal ARC UI, durable storage, history/correction behavior, recovery, cross-view agreement, automated regression, and required Samsung verification. A capability may instead be retired only through explicit instructor review and approval recorded in its row.

Until that gate is satisfied:

- authority remains `V7_ONLY`;
- Production Academic Configuration remains paused;
- v7 writes remain enabled;
- dual writing remains prohibited;
- no real Student data is authorized in v8 production;
- Stage 3 and actual authority transfer remain prohibited.

## P1 verification and recovery

The contract test enforces the exact inventory and ordering, complete fields, legal forward-only status transitions, acceptance evidence, retirement authority, repository source anchors, Schema 7 normal-runtime boundary, absence from normal runtime/service-worker loading, deep immutability, and the canonical fingerprint.

P1 added documentation and test authority only. It did not access `arc_classroom_v8`, change IndexedDB, change the service worker or build, publish, deploy, push, modify remotes, or require Samsung interaction. Recovery is Git-only: return to the verified rollback reference if the P1 documentation/test authority must be abandoned.

## Proposed P2 boundary

The next separately authorized stage is **P2 — Complete academic-administration authority**. Its maximum scope is:

- bell-schedule templates and period start/end times;
- weekly/default schedule modes;
- Planning Period;
- instructional/noninstructional calendar days;
- calendar events and date-specific overrides;
- safe, effective-dated historical Section placement;
- revision-safe School Year, Semester, and Grading Period corrections;
- operator, reason, timestamp, before/after audit;
- deterministic readback and conflict protection.

P2 must resolve the Stage 13 calendar/override blocker, preserve Semester 1 history when later schedules change, and allow an unknown future Semester schedule to remain unconfigured. It should remain on Schema 8 / IndexedDB 10. If a structural version change is necessary, P2 must stop before that change and request authorization.

P2 does not reconnect normal UI; that is P3. It also does not mutate production, configure production academics, create Students/Enrollments/Schedule Assignments, enable dual write, transfer authority, disable v7 writes, import transactions, publish/deploy, or begin Stage 3. `V7_ONLY` remains mandatory.
