# ARC Schedule Reference Lifecycle Integrity Repair 7 — 2026-10-05

## Authority and boundary

Repair 7 began from local Repair 6 commit `5d8a161b9bf6ab089eca4435e017ff0b63483ed4`, tree `9f303ffd23cf2949aac762ce00d6411c938a64c7`, with rollback `rollback/pre-academic-administration-schedule-parity-repair-7`. Normal ARC remains Schema 7 / `V7_ONLY`.

Independent review confirmed Repairs 2–6 and reproduced a current/future Date Override retaining a Bell reference after that Bell was retired. The resulting `scheduleForDate()` projection reported an ordinary school day with no Bell and no periods, while Backup/Recovery reported healthy. Repair 7 closes that reference-lifecycle gap without changing normal ARC UI or authority routing.

## Completed repair

- Bell retirement now refuses active current/future instructional Weekly Schedule Modes, Date Overrides, and Calendar Days that depend on the Bell. `AUTHORITY_IN_USE` includes dependent type, identity, date/effective range, and Bell identity. Noninstructional records do not acquire a Bell dependency from an incidental retained ID.
- Schedule Mode retirement now refuses an active today/future Date Override that names the mode.
- Refusals occur inside the existing correction transaction, preserving the Bell/Mode record and audit state atomically.
- `scheduleForDate()` fails closed with `SCHEDULE_AUTHORITY_UNAVAILABLE` for current/future unavailable Schedule Mode or instructional Bell authority. Noninstructional days remain valid without a Bell.
- Ended active modes and past dated authority may use retained retired Bell records, preserving readable history. Deliberately retired historical-mode selection remains the single documented `UNRESOLVED` lifecycle point.
- Backup/Recovery validates Bell references from weekly modes, dated overrides, and calendar days, plus Schedule Mode references from overrides. It distinguishes current/future active requirements, ended retained history, and noninstructional Bell independence.
- Bell period identity protections from Repairs 5–6 remain in force. Referenced Bell times remain editable through the accepted audited operation.

## Verification

The focused Repair 7 suite covers 20 cases: current/future Bell and Mode retirement refusal, ended-history allowance, atomic failures, fail-safe reads, every noninstructional day type, Backup missing/inactive references, noninstructional retained Bell behavior, time editing, and the explicit unresolved retired-mode boundary.

Repair 6 and Repairs 2–5 focused suites, academic administration and adapter suites, all converted academic consumers, Attendance, Booth, unified history, Daily Teaching, Curriculum/Pacing, Backup/Recovery, cutover/configuration, parity/static/parse, and the complete JavaScript suite remain closeout gates.

## Preserved authority and prohibitions

- Existing editable Schedule Setup, calendar, Planning Period, Section movement, Semester Transition, historical academic hierarchy, and Daily Teaching noninstructional semantics remain intact.
- No Schema, IndexedDB version, store, build identifier, service-worker cache, or normal `index.html` change occurred.
- No production/Samsung access, academic configuration, real Student data, publication, deployment, dual write, normal-v8 activation, or authority transfer occurred.

Repair 7 is local engineering evidence pending independent review. The deliberately retired historical Weekly Schedule Mode readback rule remains `UNRESOLVED`; no policy was invented.
