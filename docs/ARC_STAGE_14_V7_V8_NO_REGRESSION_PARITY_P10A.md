# Stage 14 P10A — Unified Student History and Audit Projection

## Authority and isolation

P10A begins from accepted P9 commit `9312f4a2de0af1a64414514ad3b1ef7e732411fe`, tree `74bc25bd0661a79747078349e31ccac8b13d60bb`. Schema 8, IndexedDB 11, and the 54-store manifest remain unchanged. Academic authority remains `V7_ONLY`.

`ArcStudentHistoryProjection` is read-only and hard-bound in isolated verification to `arc_classroom_v8_p10a_verification`. Normal ARC retains its accepted Schema 7 Student Profile, Enrollment History, and Recent History behavior through the adapter's `V7_ONLY` path. The projection has no write API, creates no store, persists no timeline, and does not become academic, operational, Evidence, or Gradebook authority.

## Projection model

The projection reads existing owning records from P4–P9 and emits one history item per owning record. Each item retains:

- owning store, record type, and record ID;
- stable Student and applicable Enrollment identity;
- effective Course, School Year, Semester, Section, and Schedule Assignment context;
- source time value, normalized timestamp, and whether the time is effective, occurrence, or recorded time;
- action/type and lifecycle;
- supersession, correction, reassessment, chain revision, and sequence relationships;
- original provenance and a stable link back to the owning view where available.

The included domains are Student/profile lifecycle and effective academic placement, Attendance and Passes, Activity/Technical and Projects, Evidence/reassessment/Overrides, Workplace and Safety, private Behavior/Incidents, and Gradebook results/revisions/manual posting/snapshots.

Ordering is timestamp descending. Equal timestamps use a stable domain rank and owning-source identity. Every equal-time item declares `chronologyWithinTimestamp: 'not asserted'`; the tie break is display determinism and does not claim one event happened before another.

Corrections are not collapsed. Prior and replacement records remain individually visible with `supersedesRecordId`, `supersededByRecordId`, lifecycle, and `currentTruth`. Reassessment remains distinct from correction. Pass records include derived elapsed minutes while retaining their owning event.

## Privacy boundary

Behavior/Incident records appear only when both conditions are true:

1. projection mode is `instructor-student`; and
2. `instructorAuthorized` is explicitly true.

They are excluded from `general-class` and `student-facing` projections. An instructor Student-history request without explicit authorization fails. Behavior records remain private, retain `gradeEffect: 'none'`, and do not flow into Workplace explanations, Gradebook, or other consumers.

## Verification and parity state

The `student-history` parity row advances from `not-started` to `service-ready` based on isolated projection, lineage, privacy, ordering, deep-link, duplicate-name, movement, and reload tests. It is not UI-connected, Samsung-verified, or accepted. No other parity state advances.

The build/cache suffix is `parity-p10a-unified-student-history-1`. The projection is loaded in normal ARC only in `V7_ONLY` mode and is included in cache and Pages asset verification.

## Remaining production-critical parity inventory

P10A does not place the overall parity program near completion. Forty-four production-critical rows remain unaccepted: 37 are `service-ready`, and seven are `not-started`.

### Service-ready but still requiring later UI, behavioral, Samsung, production, or acceptance gates

1. `academic-year-semester` — School Year and current Semester
2. `grading-periods` — Grading Periods / Quarters
3. `sections` — Sections and class identity
4. `schedule-setup` — Schedule Setup
5. `school-calendar` — School calendar, ranges, events, and overrides
6. `bell-schedules` — Bell schedule templates and period times
7. `planning-period` — Planning Period
8. `section-period-placement` — Section period placement and correction
9. `semester-transition` — Semester Transition
10. `student-records` — Student create, edit, archive
11. `student-directory-search` — Student directory and global search
12. `roster-management` — Roster add/drop/re-enrollment
13. `student-movement` — Effective-dated Student Section movement
14. `dashboard-class-context` — Dashboard, class selector, and current-class context
15. `fast-roster` — Fast Roster
16. `attendance` — Daily Attendance
17. `passes` — Out-of-room Passes
18. `attendance-pass-history` — Student Attendance and Pass history
19. `project-library` — Project Library / Bank
20. `project-assignment` — Student Project assignment
21. `project-checkpoints` — Project checkpoints and operational need
22. `project-rubric` — Project rubric, correction, and finalization
23. `competency-catalog` — WT/AWT competency catalog and statements
24. `competency-assessment` — Competency assessment, Overrides, and current rating
25. `reassessment` — Reassessment and competency history
26. `technical-assessments` — Technical Assignments and Tests
27. `open-shop` — Open Shop recommendations
28. `workplace` — Daily and weekly Workplace
29. `safety` — Safety incidents and Evidence qualification
30. `behavior-incidents` — Separate Behavior and Incident documentation
31. `gradebook` — ARC Gradebook
32. `manual-posting` — Manual school-gradebook posting workflow
33. `photo-capture` — Student photo capture/upload
34. `student-work-library` — Student Work Library
35. `student-history` — Unified Student history and audit
36. `booth-manager` — Booth Manager and physical assignment
37. `backup-restore` — Instructor-facing backup/export/import/restore

### Not-started production-critical rows

1. `curriculum-standards` — Curriculum and Standards
2. `lesson-plans` — Lesson Plans / Lesson Bank
3. `pacing` — Section Pacing Planner and history
4. `class-forecast` — Class Forecast
5. `notifications` — Notifications and planning reminders
6. `general-inventory` — General Inventory
7. `material-inventory` — Material Inventory

## Next boundary

The next bounded stage should be selected from the seven not-started rows under separate authority. A coherent next stage is Curriculum/Standards plus Section Pacing authority because Lesson Plans and Class Forecast depend on that shared instructional context. P10A does not start that work.
