# ARC Sidebar Hubs, Gradebook, Attendance, and Technical Repair 1

Date: 2026-11-09
Status: LOCAL CANDIDATE — INDEPENDENT SOURCE REVIEW REQUIRED

## Controlling navigation rule

- Sidebar destinations are program-wide hubs.
- Fast Roster actions are shortcuts scoped to the currently selected class.
- Sidebar Gradebook opens every class with class, course, Student, and category filters.
- Fast Roster Gradebook opens the selected class directly.
- Sidebar Attendance & Passes retains the whole-program history dashboard, time-window filters, and line graphs.
- Fast Roster Attendance opens direct selected-class entry.

## Technical Assignment repair

- The Sidebar Technical Assignments destination is a program-wide WT/AWT definition bank with direct creation.
- Definitions may be saved without assignment or assigned to explicitly selected Students in an explicitly selected class.
- New assignments begin as `Assigned / Not started`; creation and assignment dates remain separate.
- Worksheet/type metadata is retained by the authoritative P6 version.
- Duplicate assignment is refused.
- Removal archives the definition while preserving prior Student work, grades, revisions, and History.
- Missing attendance for day-specific work remains `unknown` and requires teacher review; it never silently creates a zero, exemption, or grade.
- The retained Student-profile and legacy assignment paths now use the same authoritative assignment boundary: newly assigned work starts `Assigned / Not started`, retains Worksheet/type and assigned-date metadata, and refuses exact-version duplicates.
- Bank synchronization and opening a scoring surface are read-only with respect to assignment creation. Historical records are not silently rewritten.

## Dual-period and grading boundaries

- P6 and P9 reads honor the exact requested Section when a Student has same-course assignments in multiple periods.
- Shared course work and grades continue to follow the stable Course Enrollment.
- Attendance remains Section-specific.
- No grade, rating, Evidence record, qualification, or attendance consequence is fabricated.

## Verification

- Focused repair tests: 10/10.
- Complete JavaScript inventory: 184/184.
- Static regression: 47/47.
- Installed Microsoft Edge: Student-profile Worksheet assignment under recorded Present attendance; program-wide hubs; class-direct shortcuts; missing-attendance teacher review; two graded fictional Worksheets from each period of one dual-period WT Student and one dual-period AWT Student in class and central Gradebooks; online reload; offline reload; full-process cold restart; and exact 74-store backup/restore all passed with task-owned fictional data.
- The mechanically reviewed release closure remains 114 authority assets.

## Preserved boundaries

No GitHub publication, deployment, release-evidence change, Samsung access, production record access, database schema change, authority transfer, OneDrive production mutation, or instructional-content acceptance occurred. Existing production Students, grades, academic and P4–P10C V8 authority, real-Student authorization, and recovery custody are unchanged.
