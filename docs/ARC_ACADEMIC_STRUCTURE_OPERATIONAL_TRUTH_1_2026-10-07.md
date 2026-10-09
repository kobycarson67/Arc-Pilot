# ARC Academic Structure Operational Truth 1

**Status:** Repair 3 local implementation candidate pending independent review
**Starting authority:** `074a08a52da19046a62b4c936eb924386e8a5abb` / tree `0d4d530204008fbf031c57106cff3272f9a80654`  
**Classroom authority:** Schema 7 / `V7_ONLY`

## Purpose

Normal ARC now owns explicit, instructor-editable academic boundaries alongside its accepted Schedule Setup workflow. The instructor can record the known School Year, known Semesters, nested Grading Periods, and the current Semester without using the PACR engineering page. Calendar Event titles are never treated as academic-boundary authority.

This milestone does not configure protected v8 production, run PACR Prepare or Apply, create classroom transactions, activate v8, or transfer authority.

## Normal ARC authority

The optional Schema-7 `academicStructure` object has version `1` and contains:

- one stable, hidden School Year key plus its instructor-facing label and exact start/end dates;
- one or more known Semesters, each with a stable hidden key, code, label, exact dates, and order;
- one or more Grading Periods under each known Semester, each with a stable hidden key, code, label, exact dates, and order;
- `currentSemesterKey`, which must reference one configured Semester.

Older Schema-7 states without this object remain valid and render **Not configured**. ARC does not synthesize dates from the existing School Year/Semester labels or Calendar Events.

The Schedule Setup editor generates internal identities once and never exposes them as editable instructor fields. Initial configuration must exactly match the current operational School Year and Semester labels. Later ordinary edits may correct dates, Grading Periods, and known future Semester definitions, but may not rename the active School Year or active Semester and may not change `currentSemesterKey`. This preserves the academic scope used by current roster, Enrollment, grade, project, attendance, and other classroom records without rewriting those records.

Semester Transition remains the sole normal workflow that advances active academic scope. Within the same School Year, it offers only configured Semesters later than the active Semester, updates `state.semester` and `academicStructure.currentSemesterKey` together, and appends an `academicStructureHistory` record with exact before/after values, timestamp, reason, and source.

When the current scope is Semester 1 and Semester 2 is not configured, Semester Transition stays blocked and directs the instructor to add Semester 2 in Academic Structure when the school provides it. It does not infer Semester 2 or offer the next School Year. When Semester 2 is configured, Semester Transition offers only that configured same-year Semester and keeps the School Year fixed. Only a current final Semester 2 with no later configured Semester exposes the accepted editable next-School-Year path and defaults to `suggestedNextAcademicYear(...)` plus Semester 1. The instructor still chooses Continue, Fresh Class, End, and Planning placement. A successful cross-year transition preserves the outgoing structure as history, records `after: null` with source `normal-arc-school-year-transition`, updates the explicit operational labels, and removes the active `academicStructure`. The new year therefore remains honestly **Not configured** until the instructor enters exact boundaries. PACR capture omits Academic Structure and PACR Review remains blocked during that interval.

All target, choice, period, and Academic Structure conditions are prevalidated. The mutation path keeps a complete before-state and restores it if any later in-memory operation fails. Ordinary Academic Structure saves still append exact history and do not mutate Sections, Planning, students, enrollment, pacing, grades, Calendar Events, date overrides, or other classroom records.

## Validation and unknown future authority

ARC fails closed for malformed or non-round-tripping ISO dates, reversed ranges, Semester dates outside the School Year, overlapping Semesters, duplicate Semester identity/code/order, Grading Period dates outside the parent Semester, overlapping Grading Periods, duplicate Grading Period identity/code/order, and an unknown current Semester.

A future Semester may remain absent. Its Sections and Planning placement remain unknown. An absent Semester 2 blocks preview and apply atomically without changing labels, Enrollments, Sections, Planning, Academic Structure, or history. Calendar Events, School Year end dates, current schedules, and prior-year patterns cannot synthesize it. When Academic Structure is configured, Semester Transition offers only another known Semester; the instructor must first add a future Semester through normal Schedule Setup before explicitly creating that Semester's class and Planning schedule. Merely adding its academic dates creates no placement authority. The underlying `transitionSchoolYear()` authority also refuses direct cross-year calls from Semester 1.

## Backup, restore, and history

The existing full-state JSON backup/export/import path preserves `academicStructure` and `academicStructureHistory` exactly. Current-state validation checks the structure and requires its selected current Semester to agree with the existing Schema-7 current labels. Old backups with no Academic Structure remain valid. No schema-version increment is required for the optional object.

## PACR capture boundary

`ArcV7ScheduleConfigurationCapture` still performs one same-origin read of `weld_v013`. Its whitelist now includes the exact current Academic Structure plus the current legacy labels. It excludes Academic Structure history, Students, Attendance, and all other private or transactional families. An absent structure stays absent; a malformed present structure refuses capture.

The PACR engineering controller populates its Academic Configuration field only from a successfully captured structure. If none exists, it clears that field and directs the instructor to normal ARC Settings → Schedule Setup → Academic Structure. The engineering page remains review/execution tooling and is not the ordinary editor.

## Preserved operational schedule

The corrected live schedule configuration is unchanged. In particular, December 14 remains:

```json
{"dayType":"pd","scheduleId":"regular","instructionMode":"none"}
```

No Academic Structure operation changes Bell Schedules, weekday modes, Calendar Events, date overrides, Section periods, or Planning placement.

## Build and cache integration

Repair 3 advances both ARC build and shell/cache authority with suffix `academic-structure-operational-truth-1-repair-3` after the accepted Repair 2 suffix. The PACR schedule-capture and page-controller assets retain their accepted Repair 1 query revision because their bytes and semantics did not change. Update activation remains instructor controlled through the existing `SKIP_WAITING` message path; Repair 3 adds no forced install-time activation and does not redesign the service-worker strategy.

## Repair 3 verification

- Academic Structure focused behavior: `22/22`.
- Production Academic Configuration: `10/10`.
- PACR reconciliation/closure: `46/46`.
- Required schedule migration, Academic Cutover, schedule closure, Academic Administration, Backup/Recovery, Schedule Adapter, Attendance, Curriculum/Pacing, and update suites: passed.
- Pages live-verification contract: passed locally as a static contract; no deployment was run.
- Static regression: `47/47`.
- Complete JavaScript test inventory with full Git history: `118/118` files.
- Modified JavaScript and normal ARC inline script parse: passed.
- `git diff --check`: passed.

## Boundaries

- No publication, deployment, remote update, Samsung access, or production database access.
- No PACR Prepare or Apply.
- No Student, Enrollment, Schedule Assignment, package event 13, Lesson acceptance, dual write, normal-v8 activation, or authority transfer.
- The deliberately retired historical Weekly Schedule Mode question remains unresolved.
- Independent review and later separately authorized publication/physical verification remain required.

