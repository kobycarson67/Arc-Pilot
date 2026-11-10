# ARC Technical Assignment, History, Sidebar, and Dual-Period Coordinated Repair 1

**Date:** 2026-11-09
**Starting authority:** `1a328257aed1a3161bc12e3c90aefeb3ce892c10` / tree `54ac02d7bc7547fba6b13f6628141573fe32d33f`
**Rollback:** `rollback/pre-technical-assignment-history-sidebar-dual-period-coordinated-repair-1`
**Scope:** local implementation and fictional-data verification only

## Completed repair

- Reusable Technical definitions now create distinct assignment occurrences by version, Section, assigned date, and optional same-day occurrence label. Only the exact same occurrence is refused as a duplicate, so recurring Measurement Worksheets remain reusable.
- Fast Roster Technical scoring includes a searchable **Assign from Bank** path with whole-class and selected-Student recipients.
- An individual Student assignment can be withdrawn without deleting its definition, scores, grade lineage, or History. Restoration and dependency-aware Undo use append-only audit events.
- Archived bank definitions can be restored. Historical assigned and graded work remains readable throughout archive/restore.
- A correction to completed Technical work creates a superseding assessment result and Gradebook correction revision instead of overwriting the earlier grade.
- Student History projects Technical assignment, withdrawal, restoration, and workflow audit events with explicit Undo availability and refusal explanations.
- Sidebar Lesson Plans and Curriculum & Standards open program-wide v8-safe hubs. Intentionally gated production pacing remains gated.
- One stable WT or AWT Course Enrollment is visible in every assigned Section. Course work and grades remain shared while Attendance remains Section-specific.
- Assigned work renders as **Assigned / Not started**. Missing Attendance remains unknown and teacher-reviewed; no grade, Evidence, rating, qualification, or History entry is fabricated.

## Verification

- Focused Technical/History/sidebar/dual-period suite: `7/7`.
- Complete JavaScript inventory: `185/185` files passed.
- Static regression: `47/47` passed.
- Installed Microsoft Edge, task-owned fictional database:
  - distinct dated occurrences and exact-duplicate refusal;
  - Fast Roster bank picker;
  - withdraw → restore audit lineage;
  - archive → restore bank lifecycle;
  - Lesson Plans and Curriculum central hubs;
  - WT/AWT dual-period visibility, independent Attendance, and shared Course grades;
  - controlled online reload, offline reload, and full process cold restart;
  - Schema 8 / IndexedDB 14 / 74 stores;
  - verified backup and isolated restore with exact record-count parity.

## Preserved boundaries

- Existing Student identity, Enrollments, Project progress, grades, assessment revisions, and History are preserved.
- Production and academic authority are unchanged; no dual write, schema/store change, real-Student record, Samsung operation, OneDrive production operation, publication, deployment, or instructional-content acceptance occurred.
- Withdrawal of graded work is non-destructive: the grade and audit lineage remain. ARC does not invent a policy that deletes completed work.
- Same-day repetition requires an explicit occurrence label; this preserves intentional recurrence without weakening duplicate protection.

The exact final commit and tree are recorded in the external review manifest because a Git commit cannot embed its own object ID.
