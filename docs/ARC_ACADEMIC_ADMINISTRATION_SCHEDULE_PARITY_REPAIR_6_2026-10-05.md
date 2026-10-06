# ARC Historical Schedule / Academic Hierarchy Integrity Repair 6 — 2026-10-05

## Authority and boundary

Repair 6 began from local Repair 5 commit `8e56c68eca837d721a6aa32f2b2f54ab17f3d841`, tree `e0e1fb12e43e5ded4744ac4ffc6e05379c40baef`, with rollback `rollback/pre-academic-administration-schedule-parity-repair-6`. Normal ARC remains Schema 7 / `V7_ONLY`.

Independent review found that Repair 5 treated lifecycle as temporal currency for period identity, allowed archived Semesters or Grading Periods to fall outside corrected parent dates, and did not audit retained academic hierarchy dates in Backup/Recovery.

## Completed repair

- Effective Section resolution classifies placement period authority by the placement's bounded end date. Ended history may resolve through any retained active or retired Bell definition; current/future placement requires an active Bell definition. Placement remains Bell-template independent.
- Bell correction/retirement calculates the post-correction union of active period codes and refuses removal of the last active definition required by current/future Section or Planning authority. Ended history does not block retirement because the retired Bell record retains its period identity.
- School Year correction validates every retained Semester, including archived history. A proposed Year boundary that excludes any retained Semester fails atomically with dependent-history context; archived Semester dates are never silently rewritten.
- Semester correction similarly validates every retained Grading Period, regardless lifecycle. A proposed Semester boundary that excludes retained quarter history fails atomically without rewriting it.
- Backup/Recovery audits every retained Semester, Grading Period, and Section for parent existence, valid dates, containment, and School-Year/Semester lineage. Archived records remain valid history only when structurally inside their retained parents.
- Backup/Recovery uses temporal placement scope rather than lifecycle to choose period authority: ended rows use retained Bell history; current/future rows require active Bell authority.

## Preserved authority

- New and current mutations still use active Bell-period authority.
- Repairs 2–5 remain intact: editable Bell times, Bell-independent placement, accepted calendar semantics, future-conflict protection, exact-start Semester Transition protection, atomic dependent-boundary corrections, global period normalization, Backup schedule collision checks, and Daily Teaching no-class semantics.
- Future Semester schedule may remain unknown. Historical records remain append-first and readable.
- No new overlap, grading-period, report-catalog, or unrelated product policy was introduced.
- Normal `index.html` remains Schema 7 / `V7_ONLY`; no visible workflow or authority routing changed.

## Verification boundary

The Repair 6 focused suite covers historical and current period identity, Bell retirement, atomic active/archived hierarchy protection, failure nonmutation, retained hierarchy Backup integrity, and valid current/history cases. Repairs 2–5 and all academic, consumer, Attendance, Booth, Student History, Daily Teaching, Curriculum/Pacing, Backup/Recovery, cutover, production-configuration, parity, static, parse, and complete JavaScript gates remain required for closeout.

## Preserved prohibitions

No production database or Samsung was accessed. No academic configuration, real Student data, instructional package transition, Lesson policy/content change, publication, deployment, dual write, normal-v8 activation, or authority transfer occurred. No Schema, IndexedDB version, store, build identifier, or service-worker cache authority changed.

Repair 6 remains local engineering evidence pending independent review. Production migration/application, Student/Enrollment/Schedule Assignment coordination, publication/build-cache work, production-shaped browser verification, Samsung verification, and authority transition remain separately authorized boundaries.
