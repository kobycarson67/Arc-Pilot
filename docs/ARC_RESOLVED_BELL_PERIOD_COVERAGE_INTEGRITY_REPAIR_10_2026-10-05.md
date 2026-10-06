# ARC Resolved Bell Period Coverage Integrity Repair 10

**Date:** 2026-10-05

**Starting authority:** `2a946a5461e3d878f60ce19b944c4afa08a309d5` / `7ec09f8cacb93590dc1d60c315219e210ce3e0f2`

**Rollback:** `rollback/pre-academic-administration-schedule-parity-repair-10`

**Normal classroom authority:** Schema 7 / `V7_ONLY`

## Purpose

Repair 10 closes the resolved Bell-period coverage gap. An instructional date is usable only when its resolved Bell Schedule contains every period identity required by the active Section and Planning placements effective on that date.

## Implemented authority

- The shared Repair 8 resolver now derives effective Section and Planning period requirements after applying the accepted Date Override, Calendar Day, named/default Mode, weekday, and Bell precedence.
- Missing period coverage fails closed with `BELL_MISSING_REQUIRED_PERIOD`, exact missing period codes, and affected placement identities.
- Noninstructional dates remain Bell-period independent.
- A pure weekly interval/weekday validator covers ordinary instructional dates that have no persisted Calendar Day or Date Override. It requires an actual weekday occurrence inside the overlap of Mode and placement intervals.
- Exact named-Mode reuse outside a Mode's default range remains supported and is validated at the requested date.
- Bell, Mode, dated authority, Section placement, Planning placement, movement/swap, academic-boundary correction, and Semester Transition transactions validate the projected post-write authority before commit.
- Backup/Recovery applies the same date resolver and weekly coverage helper under the `resolved_bell_period_coverage` category while retaining the earlier global period-identity checks.

## Preserved product behavior

- Section and Planning placements remain Bell-template independent and store only global period identity.
- Bell start/end times remain editable when the retained identities cover applicable schedules.
- Repair 8 precedence, Repair 9 projected Mode mutation safety, five day types, four instruction modes, Friday Open Shop, historical Bell retention, and Repairs 2–9 remain intact.
- The deliberately retired historical Weekly Schedule Mode readback question remains `UNRESOLVED`.
- No Schema, IndexedDB, store, build, cache, service worker, normal UI, package, Lesson, production, Samsung, Student, dual-write, activation, or authority-transfer change is included.

## Verification contract

Focused coverage includes explicit and implicit dates, Section and Planning periods, valid and invalid Mode/Bell changes, movement rollback, Semester Transition, academic-boundary expansion, noninstructional dates, exact Backup/Recovery agreement, complete healthy coverage, and the unchanged historical-policy boundary.
