# ARC Academic Administration / Schedule Parity Repair 1

**Date:** 2026-10-04

**Authority state:** Schema 7 / `V7_ONLY`

**Starting authority:** commit `9017aad6b45f74ef076c682ac442cf5edb95280b`, tree `222bf7bd3be458551aa8aada456519d2efe290b8`

## Purpose and product contract

The accepted Schema-7 Schedule Setup, calendar, Planning Period, Section movement, and Semester Transition workflows are the product contract. The inactive v8 academic-administration layer had narrowed or changed parts of that contract: Planning was encoded as a synthetic Bell Schedule period, weekly defaults omitted instruction mode, calendar days were reduced to two types, and several existing UI actions lacked isolated-v8 equivalents.

Instructor authority for this repair requires all operational schedule values to remain editable inside ARC. Bell times, calendar dates, weekday modes, Planning placement, Section placement, and Semester changes are data. The supplied 2026–27 configuration is migration/parity evidence, not a permanent default for v8. PD/In-Service means no regular classes.

## Parity reconciliation

| Existing Schema-7 behavior | Repaired isolated-v8 representation | Local proof | Remaining difference |
|---|---|---|---|
| Bell templates contain times for ordinary periods 1–7 | Bell periods have ordinary codes/times only; Planning identity is rejected | Bell/Planning focused tests | Normal UI still writes Schema 7 under `V7_ONLY` |
| Planning is separate and swaps with an occupying Section | Effective-dated `planning-period-placement` infrastructure authority and atomic move command | Planning movement, history, rollback tests | No production authority or data exists |
| Section move supports empty, class swap, and Planning swap | One transaction closes prior placements and appends replacements | Section movement, occupancy, failure rollback tests | Student/Enrollment/Schedule Assignment coordination remains an activation prerequisite |
| Weekday defaults select both Bell Schedule and instruction mode | Each weekday stores `bellScheduleId` plus `regular`, `open_shop`, `special`, or `none` | Monday–Thursday and Friday Open Shop tests | Isolated only |
| Calendar preserves `school`, `no_school`, `holiday`, `pd`, `other` | Day type and instruction mode remain separate; any non-school type resolves to `none` | Five-type/four-mode and PD tests | Isolated only |
| Single/range overrides, clear, event add/delete | Override records, lifecycle retirement, and before/after audit evidence | Clear/range/event history tests | Normal UI remains on its accepted single Schema-7 path |
| Semester Transition supports Continue, Fresh Class, End, unknown future schedule, and editable Planning | Preview/apply uses ordinary period codes plus separate Planning authority and retains history | Transition and unknown-future tests | Full acceptance is blocked on Student/Enrollment/Schedule Assignment transition authority |
| Existing state should transfer without re-entry | Pure read-only migration planner projects an explicit Schema-7 snapshot and flags missing academic boundaries | Supplied-fixture lossless/dynamic-input tests | Planner is deliberately not connected to production configuration `apply()` |

## Implemented repair

- `ArcV8AcademicAdministration` now separates Planning placement from Bell templates, retains weekly instruction mode, preserves the five calendar day types, forces non-school days to no instruction, and exposes deterministic schedule source/readback.
- Atomic isolated commands cover Planning moves, Section moves/swaps, calendar override clear, and calendar event retirement. Prior records remain queryable and changes append audit evidence.
- `ArcScheduleAuthorityAdapter` delegates the existing action names to those owner commands only in its hard-bound isolated verification mode. It still has no dual write or production fallback.
- `ArcV8ScheduleConfigurationMigration` is inert and read only. It accepts explicit input and returns a nonapplying migration plan. It has no DOM, `localStorage`, IndexedDB, or production database access.
- The supplied school configuration was added under `tests/fixtures` because lossless migration verification requires durable test evidence. This is the one necessary path beyond the handoff's likely list. Runtime code does not load it.
- The sole normal-ARC data correction changes `2026-12-14` from `pd + regular` to `pd + none`. No Schedule Setup control, UI flow, navigation, localStorage authority, or normal adapter wiring changed.

## Boundaries preserved

- Normal `index.html` remains Schema 7 and creates `ArcScheduleAuthorityAdapter` with `V7_ONLY`.
- No production database was opened or mutated.
- No academic configuration, Student, Enrollment, Schedule Assignment, package, Lesson, or instructional-reference authority changed.
- No current school value was added to the instructional-reference checksum boundary.
- No production import/apply operation was added to the migration planner.
- No push, publication, deployment, Samsung action, normal-v8 activation, dual write, or authority transfer occurred.

## Remaining cutover gate

Before Production Academic Configuration or academic authority transfer, ARC still needs a separately reviewed integration that supplies explicit School Year, Semester, and Grading Period identities/boundaries, applies the reviewed schedule migration plan through owning services, coordinates Student/Enrollment/Schedule Assignment Semester changes, and verifies the normal UI against production-shaped isolated authority. Missing structured boundaries must not be inferred from calendar event titles.

This local repair is engineering evidence only. It does not make the repaired rows accepted, Samsung verified, or authoritative in the classroom.
