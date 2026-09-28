# ARC Stage 14 — No-Regression Parity P5

## Boundary and authority

P5 converts Attendance and out-of-room Pass workflows through the P4 academic scope contract. Normal ARC remains `V7_ONLY`: every accepted instructor action still performs one Schema 7 mutation through `ArcAttendanceAuthorityAdapter.runLegacy`. Isolated v8 verification is hard-bound to `arc_classroom_v8_p5_verification`. There is no dual write and no access to `arc_classroom_v8`.

`ArcAcademicConsumerProjection` supplies the stable Student, Enrollment, Schedule Assignment, Section, Course, School Year, and Semester context. The Attendance adapter refuses a missing Student identity or a Section that differs from the effective P4 placement. Attendance and Pass services do not reconstruct academic scope.

## Converted service behavior

- All accepted Attendance states use the existing append-first Attendance authority.
- A changed status creates a correction against the current record and carries its expected revision.
- Pass start and return remain separate from Attendance and do not infer an Attendance change.
- A Student cannot have a second active Pass.
- Deterministic readback supplies current Attendance rows, exact status counts, Pass history, active Passes, and elapsed duration.
- Reopening the repository rebuilds the same projection from persisted records.
- Unexcused and Excused Attendance produce review proposals through the existing Stage 8 boundary. Gradebook state changes only after explicit instructor confirmation.

The accepted normal Attendance screen, quick Pass controls, active duration display, and Student profile Attendance/Pass panels are preserved. Their live mutation handlers now pass through the exclusive authority adapter. This is authority wiring and adds no visual redesign.

## Evidence and limits

Automated evidence covers all Attendance states, append-first corrections, stale revisions, stable Student identity, duplicate names, Section movement mismatch refusal, Pass start/return/duration/history, active Pass refusal, reload readback, transaction rollback in the underlying repository, reviewed grade decisions, normal UI routing, cache/Pages inclusion, and Schema 8 / IndexedDB 10 preservation.

The parity rows `attendance`, `passes`, and `attendance-pass-history` remain `service-ready`. They are not marked UI connected or accepted because production continues to use v7 authority and Samsung verification has not occurred. The separate `student-history` row remains open; P5 converts only the Attendance/Pass portion shown in Student workflows.

## Samsung verification requirement

After a separately authorized publication and isolated fixture preparation, verify in the installed PWA and direct Chrome: every Attendance status; a correction and reload; Pass start, live duration, background/foreground, return, history, and active-Pass refusal; duplicate-name identity; Section movement scope; Student profile parity; orientation and sleep/wake. Confirm that Pass actions never change Attendance and Attendance never changes a grade without an instructor-confirmed review.

## Proposed next bounded stage

**P6 — Convert Project and Technical domain workflows** may convert the existing Project assignment/build/checkpoint/rubric and Technical assignment/test transaction workflows through the P4 academic scope. It must preserve shared cross-view Project state, append-first assessment history, Gradebook handoff boundaries, and the existing instructor UI. It must not absorb the still-open unified Student-history row, switch classroom authority, dual write, mutate production, or require a structural database change without stopping for review.
