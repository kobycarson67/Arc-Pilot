# ARC Stage 14 — P2 Complete Academic-Administration Authority

## Authority and scope

P2 begins from P1 commit `0bb485eafc40195cad1cb650a63dffc6a00490d4`, tree `71ed8e4efae656f777e2db1ed296b7d5cb1885b3`.

- Rollback: `rollback/pre-stage-14-parity-program-p2`
- Academic authority remains `V7_ONLY`.
- Normal ARC remains Schema 7 and is not connected to P2.
- Schema 8 remains IndexedDB structural version 10 with 53 stores.
- P2 uses the existing `infrastructure_records` store; it creates no store or index.
- Production Academic Configuration remains paused.
- No production database is accessed or mutated.

## Implemented authority

`ArcV8AcademicAdministration` supplies:

- named Bell Schedule templates with ordered, nonoverlapping `HH:MM` periods;
- explicit `Instructional` and `Planning` period types;
- effective-dated weekly/default schedule modes whose weekday entries reference Bell Schedule identities;
- authoritative `Instructional` and `Noninstructional` calendar days;
- ranged informational calendar events;
- one active date-specific override per school date;
- effective-dated Section placements tied to an existing Section, School Year, optional known Semester, Bell Schedule, and period code;
- deterministic date schedule and historical Section-placement projections;
- revision-safe corrections for School Years, Semesters, Grading Periods, and P2 administration records;
- operator, reason, timestamp, before/after, and verified-recovery evidence in append-only audit records;
- deterministic sorted readback after service reopen.

An unknown future-semester schedule is valid. Creating a Semester does not create Sections or placements. A later known placement is added with effective dates. Period changes use a later nonoverlapping placement rather than rewriting earlier placement truth. Corrections to erroneous records remain visible through before/after audit authority.

## Validation and conflict rules

- Bell periods require unique codes, valid times, supported types, and no overlap.
- Active default weekly modes cannot overlap.
- Calendar-day and date-override identities are unique per date.
- Schedule references must resolve to active P2 authority.
- Section placements must remain within School Year and optional Semester dates.
- A Section cannot have overlapping active placements.
- Period definitions in a Bell Schedule become immutable once an effective mode or placement references them; a later schedule uses a new template and effective mode/placement.
- Academic-boundary corrections cannot invalidate child Semesters or Grading Periods.
- Every correction requires the expected revision and fails closed on stale input.
- Stable academic identities remain immutable.

## Recovery behavior

Before a correction, the caller must invoke `prepareRecovery()`. The supplied complete v8 backup service must return a package that passes completed-package verification. P2 returns the downloadable package and a one-use token. The exact token is consumed by one correction, and its filename, SHA-256 package checksum, preparation time, and verified state are stored with the audit event.

Failure to create or verify recovery stops before mutation. A missing, wrong, reused, or stale recovery token is rejected. Existing Stage 11 backup/export/restore authority includes `infrastructure_records`, so all P2 records and audit events are covered without a storage-version change.

## Parity evidence

The frozen registry advances only these rows to `service-ready` or adds P2 service evidence:

- School Year and current Semester
- Grading Periods / Quarters
- Schedule Setup service authority
- school calendar, events, and overrides
- Bell Schedule templates and period times
- Planning Period
- Section period placement and correction

Schedule Setup receives P2 automated evidence but remains `not-started` as a complete parity row because its accepted normal UI and Semester Transition coordinator are still absent. The other listed rows remain short of `ui-connected`, `behaviorally-verified`, `samsung-verified`, and `accepted`. Semester Transition remains `not-started`.

The post-P2 canonical contract SHA-256 is `b424f3e1d2f6ca899432918a866faa762edc9ddff8e7a657167c62e30088f172`.

## Explicit exclusions

P2 does not change normal ARC UI, Dashboard/class detection, Schedule Setup, calendar controls, Semester Transition, Students, Enrollments, Schedule Assignments, v7 writes, build/cache publication, authority state, production configuration, or real Student authorization. It performs no dual write and introduces no v7 adapter.

## Proposed P3 boundary

The next separately authorized stage is **P3 — Reconnect existing Schedule Setup/calendar UI**.

P3 may preserve and reconnect the accepted normal ARC controls for Schedule Setup, Bell Schedules, Planning Period, Section placement, school calendar/range editing, date overrides, roster-management entry points, and Semester Transition. It must use the P2 service and shared projections rather than introduce a second academic implementation.

Semester Transition must be atomic and reviewable, support continue/fresh/end decisions, allow an unknown future schedule, preserve effective history, provide preview and verified recovery, and prove deterministic readback. Routine corrections must remain available inside normal ARC.

P3 must not transfer academic authority, disable v7 writes, enable dual write, mutate production, authorize real Student data, publish/deploy without separate authority, or begin P4/Stage 3. Because normal ARC is still Schema 7, any proposed write routing or transition strategy that would require dual writing or premature authority transfer is a stop condition requiring instructor review.
