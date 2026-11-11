# ARC Coordinated Classroom Repair — 10 Findings 3

Date: 2026-11-10  
Status: Local corrected candidate; independent source review required  
Starting candidate: `ca7c0129138ef6a416ac616c321d2f98b85731fd` / `2c0425c2fae02541a489a161418a172ada3e488e`  
Rollback: `rollback/pre-coordinated-classroom-repair-10-findings-3`

## Production blocker reproduced

The installed-Edge rehearsal restored a task-owned fictional Schema 8 / IndexedDB 14 / 74-store database, then reproduced the observed production shape exactly: four Grading Periods, zero GradebookPolicyVersion records, zero GradebookEntry records, and retained finalized AssessmentResults. Before configuration, Quarter 2 resolved normally, the complete assignment/assessment ledger remained visible, and ARC explicitly withheld the official weighted/current grade.

## Governing decision and correction

The weights are not a new policy. `ARC_MASTER_PRODUCT_AUTHORITY.md` and the category-weights section of `ARC_ASSESSMENT_GRADEBOOK_DESIGN.md` already record the instructor-approved WT/AWT policy: Skills & Competency 50%, Fabrication & Projects 25%, Technical Knowledge 15%, and Workplace & Shop Practices 10%, with the accepted A/B/C/D/F scale and NYA renormalization rules.

ARC now provides a one-time instructor-controlled establishment action for an otherwise unconfigured installation. It requires the exact typed confirmation `ESTABLISH APPROVED WT-AWT POLICY`, an explicit instructor-authorization checkbox, a current Grading Period, and zero conflicting policy records. The persisted record carries its approving instructor, timestamp, governing-document provenance, and explicit-action evidence. ARC refuses a duplicate approved record and refuses to replace an existing draft or other WT/AWT policy silently.

This local task did not execute that action against production. Any Samsung or production mutation remains separately authorized and recovery-gated.

## Gradebook behavior

- Source assignments, completed assessments, corrections, scores, dates, and handoff state remain visible when no approved policy record exists.
- An instructor may explicitly record an eligible finalized owner source in the ARC Gradebook before weighted calculation is configured; duplicate identity remains fail-closed.
- The UI clearly labels this state as source-ledger visibility, not an official weighted, posted, or synchronized grade.
- After fictional instructor establishment, the same Quarter 2 data calculates under the exact 50/25/15/10 record. No Student score, posting, external synchronization, weekly finalization, Evidence, competency, or qualification is fabricated.
- Daily Workplace rows and the provisional weekly total remain visible and deduplicated; existing weekly finalization remains unchanged.

## Verification

- Gradebook owner tests: `16/16`, including exact confirmation, frozen weights, audit provenance, duplicate refusal, and existing-draft refusal.
- Complete JavaScript inventory: `186/186`.
- Static regression: `47/47`.
- Installed Edge: zero-policy before state; source-ledger visibility; explicit single source handoff; duplicate-handoff refusal; audited one-time fictional policy establishment; duplicate-policy refusal; Quarter 2 weighted calculation; daily/provisional Workplace; History/Undo refusal; WT/AWT dual-period coverage; online, offline reload, full-process cold restart; and isolated 74-store backup/restore parity.

## Preserved boundaries

Candidate 2 functionality, frozen branding, 114-path authority closure, Schema 8 / IndexedDB 14 / 74 stores, V8 authority, real-Student protections, OneDrive custody, assignment/history semantics, manual school-gradebook transfer, and all accepted earlier repairs remain unchanged. No GitHub, deployment, release evidence, Samsung, production record, policy record, real Student, V8 transition, or instructional-content operation occurred.
