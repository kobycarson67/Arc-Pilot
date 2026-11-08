# ARC Dual-Period AWT and Temporary Shop Visitor — Local Candidate

Date: 2026-11-08

Status: LOCAL / UNPUBLISHED / INDEPENDENT REVIEW REQUIRED

Baseline: `3bf030e71e808eb6489089b127fa94ffe38d25a0`

Rollback: `rollback/pre-dual-period-temporary-shop-visitor-1`

## Implemented boundary

- One active AWT Course Enrollment may own multiple active Schedule Assignments only when their effective Sections occupy distinct periods.
- A same-period collision, duplicate Section assignment, wrong Enrollment, stale revision, and wrong-owner request remain fail closed.
- Academic projections expose every effective Section context and exact Section-specific Student scope.
- Attendance remains independently owned per Section and scheduled session. Shared Enrollment identity prevents duplicate Projects, competencies, grades, and Student History.
- Fast Roster can check in an already-enrolled Student as a temporary physical visitor through the existing Supplemental Session owner, then check that session out explicitly.
- The physical roster includes scheduled Students and current authorized visitors, while preserving the visitor's home academic context.
- Existing Booth and Workplace/Safety/Behavior owners accept the exact active Supplemental Session context; no new store or source of truth was introduced.

## Preserved safety rules

- Temporary presence does not create Enrollment, scheduled Attendance, Gradebook entries, Evidence, qualification, or duplicated academic progress.
- A Student without an active welding Enrollment is ineligible; ARC does not fabricate a school-wide visitor identity.
- A prior-day Supplemental Session with no checkout is surfaced for instructor review. ARC does not silently expire it, count it as current presence, or invent a disciplinary/attendance consequence.
- Production authority, real-student authorization, Schema 8 / IndexedDB 14 / 74 stores, recovery, and exclusive ownership contracts are unchanged.

## Verification

- Focused P4, projection, P5, Batch A, P8, launch, and new dual-period/visitor suites passed.
- Complete JavaScript inventory: `180/180`.
- Static regression: `47/47`.
- Installed Microsoft Edge, task-owned profile and fictional data:
  - one AWT Enrollment projected into Periods 1 and 5;
  - independent Present/Tardy Attendance records per Section;
  - zero duplicate Gradebook entries;
  - enrolled WT Student checked into AWT Fast Roster as a temporary visitor;
  - supplemental Booth and positive Workplace context retained home Enrollment ownership;
  - no scheduled Attendance created for the visitor;
  - non-enrolled visitor refused;
  - missed checkout surfaced for instructor review;
  - exact 74-store backup/restore count parity;
  - full browser-process cold restart preserved both assignments and sessions;
  - established verified-release rehearsal passed explicit Apply, three cold starts, offline restart, and exact 74-store restore.

## Decisions not invented

1. Whether temporary visitors require a structured permission category or approval beyond the required free-text instructor reason.
2. What attendance, safety, or conduct follow-up applies to a missed checkout. ARC only presents the unresolved session.
3. Whether attendance consequences in one Section affect another Section. ARC preserves independent records and makes no inference.
4. How an external SIS should display or transfer one shared Course grade when a Student has multiple Section assignments.

These are product/school policy decisions, not defects in the bounded implementation.
