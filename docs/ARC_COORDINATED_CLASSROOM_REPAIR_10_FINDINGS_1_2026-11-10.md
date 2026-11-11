# ARC Coordinated Classroom Repair — 10 Findings 1

Date: 2026-11-10

Status: LOCAL CANDIDATE / INDEPENDENT REVIEW REQUIRED

Baseline: `2fb90efd8290a74ebee61f3ebe43eaa450147ded`

Rollback: `rollback/pre-coordinated-classroom-repair-10-findings-1`

## Completed repair

1. Attendance changes now reconcile Workplace eligibility for the exact Student, date, and Section. Present, Tardy, and Left Early are eligible; Absent and nonapplicable contexts refuse Workplace scoring.
2. Workplace provides an explicit instructor-confirmed **No Work Completed — 0/10** action. It records a zero without fabricating work, assessment evidence, or qualification.
3. The Dashboard logo is preloaded and eagerly fetched so it is available with the first shell paint.
4. Practice and Skill Challenge libraries now provide instructor-owned create, version, copy, assign, archive, and restore workflows through the existing P6 authority. Starter drafts remain locked; Practice remains non-graded and nonqualifying.
5. Student History now describes Undo/Redo eligibility and refusal reasons for assignment audit events instead of presenting unavailable controls without explanation.
6. Completed Technical grades project into Student History with assignment title, date, activity type, points, and superseding correction lineage.
7. Pass display is capped at the authoritative Section end when a Student has not returned, while the actual return timestamp remains unchanged. Not-returned accountability is explicit.
8. Gradebook resolves the active grading period and exposes an assignment ledger with Section, assignment, activity type, points possible, and grade linkage.
9. Technical scoring opens on active unresolved work by default and retains an explicit resolved-work view.
10. Attendance-derived assignment state is advisory and instructor reviewed. Blank scores remain unscored; an explicitly committed zero is a completed score. Score commit and StudentActivity completion occur through the accepted owners without automatic Evidence, competency, or qualification.

## Preserved authority

- Schema 8 / IndexedDB 14 / 74 stores are unchanged.
- Academic and production authority contracts, exclusive ownership, real-Student authorization, and no-dual-write protections are unchanged.
- No production record, Samsung, OneDrive production package, GitHub branch, deployment, or release-evidence state was accessed or changed.
- All browser and recovery tests use task-owned fictional data.

## Verification

- Focused coordinated repair: `10/10`.
- Complete JavaScript regression inventory: `186/186` test files.
- Static regression: `47/47`.
- Installed-Edge, offline/cold restart, Simulation isolation, and exact 74-store backup/restore evidence are included in the dated review package.

## Remaining policy boundaries

- Attendance eligibility is an input to instructor review; ARC does not invent a school consequence or automatic grade.
- A missed pass return remains an accountability flag; ARC does not invent disciplinary action.
- No Work Completed requires explicit instructor confirmation and does not create competency Evidence.
- Grade-period naming and dates continue to come from the accepted academic configuration; ARC does not infer an institutional grading calendar.
- Existing review-only starter drafts remain locked. New instructor-created definitions become assignable only through the explicit **Create Approved Definition** action.
