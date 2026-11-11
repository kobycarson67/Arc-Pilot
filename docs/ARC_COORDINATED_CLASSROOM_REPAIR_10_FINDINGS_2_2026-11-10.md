# ARC Coordinated Classroom Repair — 10 Findings 2

Date: 2026-11-10
Status: Local candidate; independent source review required
Starting candidate: `ac4d5b904a8955dc38c18a1c5e6f8ddeb37a9888` / `d4453919fd2e69ab136d154c452d03e87bbad8aa`

## Corrected classroom behavior

- The Gradebook assignment ledger is occurrence-based. It merges StudentActivity assignment truth with AssessmentResult revisions and shows assigned, awaiting-grade, make-up, excused, withdrawn, completed, and corrected rows with assigned/scored dates and exact scores. Blank work remains blank and is never converted to zero.
- Gradebook startup resolves Quarter 2 from the accepted academic calendar and selects the existing approved `WT-AWT` policy only when it applies to both active instructional courses. It does not create, duplicate, or infer a policy.
- Gradebook views show daily Workplace owner results and one deduplicated running weekly total labeled provisional. Existing weekly finalization and instructor handoff remain the only final grade path.
- Student History projects the complete mixed-domain owner record. Assignment audit events expose only bounded withdraw/restore Undo or Redo, include dependent attempts/finalizations/results, require preserved-grade confirmation where applicable, and refuse destructive graded withdrawal or reversal behind a later dependent action.
- The normal shell tolerates only the brief verified Batch B projection-cache bootstrap gap; it does not fall back to legacy authority or suppress later projection errors.

## Integrated fictional-data evidence

- Installed Edge resolved the actual school date to `Q2` and the existing approved `WT-AWT` policy, posted an explicit `0/12` Technical score through the P6/P9 owners, and produced a working Gradebook calculation.
- The same rehearsal retained unresolved assignments beside the Completed occurrence, showed two daily Workplace rows as one `9/20` provisional week without duplicate counting, and proved that simply reviewing an unexcused day-specific assignment created no result.
- Actual StudentActivity withdraw/restore produced reversible audit lineage. A destructive withdrawal of graded work was refused with `GRADED_WITHDRAWAL_REQUIRES_RETENTION`; History converged across activity, Gradebook, Attendance, Workplace, Project, Competency, Pass, Behavior, Safety, and Academic owners.
- Dedicated WT/AWT dual-period tests preserved one Course Enrollment and shared grades while keeping exact-Section Attendance. Online reload, offline reload, full-process cold restart, and isolated Schema 8 / IndexedDB 14 / 74-store restore parity passed.

## Boundaries

No database schema, authority state, grading weights, weekly finalization rule, production record, real Student, Samsung state, GitHub branch, release evidence, deployment, instructional acceptance, or school policy was changed. The authority closure remains 114 paths and all mutating browser evidence used task-owned fictional data.
