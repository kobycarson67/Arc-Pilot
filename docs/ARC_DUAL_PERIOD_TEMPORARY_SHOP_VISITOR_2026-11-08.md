# ARC Dual-Period Enrollment and Temporary Shop Visitor — Local Candidate

Date: 2026-11-08

Status: LOCAL / UNPUBLISHED / INDEPENDENT REVIEW REQUIRED

Accepted predecessor: `f8b32f091b9e0e22b3aafa2596d1dcb560dd8b34`

Rollback: `rollback/pre-complete-dual-period-temporary-shop-visitors-1`

## Implemented boundary

- One active WT or AWT Course Enrollment may own multiple active Schedule Assignments only when their effective Sections occupy distinct periods. A conventional single-Section Enrollment remains unchanged.
- A same-period collision, duplicate Section assignment, wrong Enrollment, stale revision, and wrong-owner request remain fail closed.
- Academic projections expose every effective Section context and exact Section-specific Student scope.
- Attendance remains independently owned per Section and scheduled session. Shared Enrollment identity prevents duplicate Projects, competencies, grades, and Student History.
- Fast Roster can check an enrolled WT Student into an AWT Section, or an enrolled AWT Student into a WT Section, as a temporary physical visitor through the existing Supplemental Session owner, then check that session out explicitly.
- The physical roster includes scheduled Students and current authorized visitors, while preserving the visitor's home academic context.
- Fast Roster, Booth Manager, Class Forecast, Workplace/Safety/Behavior, and Student History derive the same physical-presence facts from existing owners. Supplemental Booth assignment and release require the exact active Session; no new store or source of truth was introduced.

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
  - one AWT Enrollment and one WT Enrollment each projected into two different periods;
  - one conventional WT Enrollment remained assigned to one Section;
  - independent Present/Tardy Attendance records per Section;
  - zero duplicate Gradebook entries;
  - enrolled WT-to-AWT and AWT-to-WT temporary visits;
  - supplemental Booth, Workplace, Safety, Forecast, Booth Manager, and Student History projections retained home Enrollment ownership;
  - one assignment move and one assignment end preserved the shared Enrollment and other assignment;
  - no scheduled Attendance created for the visitor;
  - non-enrolled visitor refused;
  - missed checkout surfaced for instructor review;
  - exact 74-store backup/restore count parity;
  - full browser-process cold restart preserved both WT/AWT assignment sets and sessions;
  - established verified-release rehearsal passed explicit Apply, three cold starts, offline restart, and exact 74-store restore.

## Decisions not invented

1. Whether temporary visitors require a structured permission category or approval beyond the required free-text instructor reason.
2. What attendance, safety, or conduct follow-up applies to a missed checkout. ARC only presents the unresolved session.
3. Whether attendance consequences in one Section affect another Section. ARC preserves independent records and makes no inference.
4. How an external SIS should display or transfer one shared Course grade when a Student has multiple Section assignments.

These are product/school policy decisions, not defects in the bounded implementation.
