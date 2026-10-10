# ARC Stage 14 — Academic Authority Activation 1

Date: 2026-10-09
Status: local activation candidate; production activation and publication are not authorized
Starting authority: `6ae89f9218dd307521c56936abca045c19dc0c9b` / `d65a4d5d1e70c1966f282530fc37fb7aa091a7f5`
Rollback: `rollback/pre-academic-authority-activation-1`
Normal classroom authority: Schema 7 / `V7_ONLY`

## Candidate boundary

This milestone adds an explicit, fail-closed `V8_AUTHORITATIVE` mode only to the P3 schedule and P4 academic adapters. Production mode is hard-bound to `arc_classroom_v8` and accepts only an in-process verified gate issued by `ArcAcademicAuthorityActivation`. Merely finding the production database cannot enable the mode.

The activation owner is inert at construction. Its later, separately authorized physical operation must validate Schema 8 / IDB14 / 74 stores, the exact configured PACR state and fingerprints, zero Student/Enrollment/Schedule Assignment rows, the accepted available instructional-reference package, schedule semantics, absence of invented future placements, healthy Backup/Recovery, and a verified complete preactivation recovery package. It retains exact `weld_v013` rollback bytes, writes one deterministic activation marker, and exposes one bounded recovery path.

No activation was executed in this milestone.

## Read and compatibility architecture

`ArcAcademicConsumerProjection` now provides one initialized snapshot cache for authoritative operation. Each synchronous normal-ARC consumer derives its requested date, selected Section, current period, roster, and Student scope from the same cached v8 snapshot. Successful academic/schedule mutations invalidate the cache; an invalidated or uninitialized cache fails closed.

Normal ARC retains its accepted visual and interaction model through a nonpersistent compatibility view. That view is derived only from v8 Course, School Year, Semester, Section placement, Student, Enrollment, Schedule Assignment, Bell, Mode, Calendar, Override, and Planning authority. It never fabricates or writes durable Schema-7 academic records.

Selected Schema-7 source Section IDs translate only through PACR identity bindings to stable v8 UUIDs. Display-name matching is prohibited.

## Schema-7 persistence boundary

When the authoritative gate is active, normal whole-state `weld_v013` saves may persist later-domain changes, but academic and schedule families are replaced with their exact retained preactivation v7 rollback values before serialization. This prevents nonacademic saves from regenerating academic truth while preserving the exact rollback dataset.

Legacy academic and schedule callbacks fail closed under `V8_AUTHORITATIVE`; no dual write exists.

## Semester Transition

`ArcV8AcademicSemesterTransition` coordinates the accepted P3 schedule transition with P4 Enrollment/Schedule Assignment history under one verified full-database recovery boundary. It preserves continue/fresh/end semantics:

- continue preserves Student identity, closes the prior assignment, and appends the target assignment;
- a cross-School-Year continue closes the prior Enrollment and appends the new-year Enrollment;
- fresh and end do not carry prior Students into replacement Sections;
- unknown future schedule remains a nonmutating `FUTURE_SCHEDULE_UNKNOWN` result;
- any second-phase failure restores the complete pretransition database and requires exact parity.

Pacing remains owned by Curriculum/Pacing and is not moved to this candidate. The transition result records that boundary rather than persisting competing pacing truth.

## Student-data boundary

The accepted gate records `realStudentDataAuthorized: false`. Production create Student and re-enrollment operations refuse with `REAL_STUDENT_DATA_NOT_AUTHORIZED`; no legacy fallback runs. No Student fixture or production Student data was created.

## Frozen domains

Attendance/Pass, Project/Technical, Competency/Evidence, Workplace/Safety/Behavior, Gradebook transactions, Curriculum/Pacing transactions, Lesson transactions, Booth, media/artifacts, and all other later domains remain instantiated as `V7_ONLY`. They may consume the shared P4 scope where already authorized, but their mutation authority does not change.

## Verification and remaining physical boundary

Focused evidence covers activation preconditions, exact gate provenance, projection convergence, cache invalidation, selection translation, protected whole-state saves, rollback, cold rehydration, Student refusal, nonacademic freeze, and recovery-backed Semester Transition behavior. The completed local verification includes:

- Academic Authority Activation: 14/14;
- Academic Semester Transition coordinator: 5/5;
- P3 Schedule authority adapter: 8/8;
- P4 Academic Consumer Projection: 10/10;
- PACR reconciliation/closure: 46/46;
- Academic Structure: 22/22;
- Academic Administration: 30/30;
- Academic Cutover: 17/17;
- Schedule Cutover Closure/oracles: 5/5, including 50,000 exact-date cases and 2,500 implicit-weekly cases;
- Backup/Recovery: 20/20;
- Production Academic Configuration: 10/10;
- Schedule Configuration Migration: 17/17;
- App Update Controller: 10/10 plus index integration;
- Pages live-verification contract: passed;
- static regression: 47/47;
- complete JavaScript inventory: 121/121;
- modified JavaScript and inline-script parse checks: passed;
- `git diff --check`: passed.

A later independently reviewed publication and a separately authorized physical Samsung activation procedure are still required. This milestone does not transfer authority, disable live v7, or mark Classroom Ready.

The deliberately retired historical Weekly Schedule Mode readback policy remains `UNRESOLVED`.
