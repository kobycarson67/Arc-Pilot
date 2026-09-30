# ARC Recovered Source Authority Findings

## Checkpoint boundary

This documentation/source-authority checkpoint starts from commit `1548d3b1e1fe3dd4e0cb1e63be135f3e60a617df`, tree `022a3f8c84f5ea17e8a5d3d47929712ac53da66b`, and rollback `rollback/pre-source-authority-preservation`. Academic authority remains `V7_ONLY`. P10D-R1B has not begun.

The archive contains 25 byte-preserved originals. `source-manifest.json` is the exact inventory and checksum authority.

## South Dakota Standards comparison

The controlling institutional sources are South Dakota Department of Education Welding Technology course `13207` and Advanced Welding Technology course `13208`, adopted May 2022. Welding Technology has no prerequisite. Advanced Welding Technology requires Welding Technology.

The official sources contain 9 WT and 20 AWT sub-indicators. Current ARC contains the same 29 codes in the same order.

Two exact-wording discrepancies exist:

1. **WT 2.2:** The official wording says `American National Standards Institute (ANSI)/American Welding Society (AWS) A3.0`; current ARC abbreviates this to `ANSI/AWS A3.0`.
2. **AWT 2.2:** The official wording uses the same expanded organization names; current ARC abbreviates them to `ANSI/AWS A3.0`.

The other 27 statements match exactly. Current ARC does not preserve official course code, adoption date, prerequisite/course metadata, parent Standard statements, or Webb levels/labels in `TECHNICAL_STANDARDS`. This checkpoint reports those differences and changes neither runtime nor P10D.

## Essential Standards authority

The instructor explicitly confirmed that orange highlighting was applied while creating the curriculum maps to identify selected Essential Standards. The highlighted standards photographs and recovered curriculum maps independently agree.

- WT: `WT 1.1`, `WT 2.1`, `WT 3.3`, `WT 4.3`.
- AWT: `AWT 1.1`, `AWT 3.2`, `AWT 5.3`, `AWT 6.1`, `AWT 7.3`, `AWT 9.1`.

These are instructor-selected Essential Standards, not South Dakota DOE designations. No additional Essential Standard is inferred. Current ARC's ten selections match exactly.

## Curriculum and competency authority

The recovered WT and AWT curriculum maps are instructor design authority. They preserve separate course sequences, Essential and Supporting Standards, targets, criteria, strategies, assessments, flexible pacing, coherent semester entry, Core/Extension/temporary Placement pathways, differentiation, Open Shop, remediation, reassessment, extension, and continuing versus incoming/transfer handling. Different Sections and Students may legitimately progress at different rates and complexity.

The recovered competency guides preserve 26 WT and 34 AWT competencies, course-specific descriptors and Standard relationships. Their governing scale is:

- `0` Not Assessed
- `1` Introduced = 60%
- `2` Developing = 75%
- `3` Proficient = 90%
- `4` Advanced = 100%

The Master Plan statement that Level 4 is Proficient is superseded.

The existing 124 `MASTER_LESSON_BANKS` lessons remain preservation/reconciliation input. The instructor has determined that they require redesign because they do not represent differentiation sufficiently well. P10C proves identity and immutable-version authority; it does not approve those Lessons as sufficient future instruction. Future replacement versions may improve differentiation, scaffolding, engagement, formative checking, feedback, student ownership, and instructional adjustment without destroying history.

## Administrative instructional rubrics

The two-page Lesson Plan Review Rubric is faithfully transcribed in `transcriptions/lesson-plan-review-rubric.md`. It preserves all descriptors for Essential Standards, Learning Targets, Success Criteria, Engagement Strategies, Assessment, and Lesson Plan Submission.

The four-page Oelrichs School Instructional Walk-through Rubric is faithfully transcribed in `transcriptions/instructional-walkthrough-rubric.md`. It preserves Domain 3 #1-#5, Domain 2 #1-#2, every rating descriptor, and the complete Evidence Observed checklist.

Both are institutional/administrative design constraints. ARC must not calculate administrator scores or claim observations, feedback, approvals, or submission status that did not occur.

## Weekly Lesson Plan generator continuity

Weekly Lesson Plan generation is a required future capability in the **Administrative** sidebar area. Friday preparation targets the upcoming week for instructor review/edit and export/submission. It derives known facts from calendar/schedule, Sections, pacing, Curriculum, Standards/Essential Standards, approved Lesson versions, targets, criteria, strategies, differentiation, and checks for understanding without mutating those authorities.

The recovered WT/AWT weekly plans are administration-accepted output examples, not institutional policy. Their practical structure is Weekly Focus; Standards; Learning Targets; Criteria for Success; day-by-day Planned Instruction & Student Learning; Checks for Understanding / Assessment; Differentiation; Engagement Strategies; and Resources / Materials.

## SLO and data-cycle authority

The complete three-page `Oelrichs Data Cycles - Unit Cycles, Growth Cycles, SLO` form is faithfully structured in `transcriptions/oelrichs-data-cycles-slo.md`.

**SLO Documentation** is a required on-demand Administrative generator. ARC may prepopulate only facts supported by authentic ARC records. It must not invent rationale/reflection, IEP-specific decisions, reteaching/extension decisions, administrator feedback/approval, or signatures. Required pre-assessment and final-assessment attachments remain actual source artifacts. SLO reporting reuses ARC evidence/history rather than creating parallel evidence.

## FERPA and privacy cross-reference

`FERPA Statement Updated 2024.pdf` is Oelrichs School District institutional privacy authority. It addresses inspection/access, amendment, consent and authorized disclosures, transfer disclosures, and complaint rights. This checkpoint makes no new legal interpretation.

Later privacy/readiness review must apply the source to Student/profile and Enrollment records; grades, assessment and competency evidence; Attendance and Passes; Workplace and Safety; private Behavior/Incident records; photos/artifacts; backup and recovery packages; synchronization and device replacement; administrator exports; and future student/family-facing access. Access control, legitimate educational interest, disclosure/export controls, retention, device security, recovery access, and audit behavior require explicit product/security review before real-student authority transfer.

## OneDrive and offline-first continuity

The instructor's state-provided education OneDrive account is the approved durable synchronization/backup destination. ARC is neither local-only nor cloud-required.

Intended model:

`device-local/offline working storage -> verified automatic synchronization/recovery -> state-provided education OneDrive`

Implemented today: durable device-local IndexedDB foundations; verified local backup packages, SHA-256 integrity/readback, complete-store/media coverage, verified pre-restore recovery, staged/atomic activation, rollback/protection mode, and offline PWA operation.

Missing/planned: OneDrive authentication and authorization, automatic synchronization, durable pending-sync state, conflict/version protocol, verified upload/readback, deterministic retry/resume, non-destructive concurrent-change handling, remote recovery selection, device-replacement recovery workflow, encryption/key management decisions, privacy/security review, and production/Samsung verification. ARC must never claim cloud protection before verified success. OneDrive synchronization is not implemented by this checkpoint.

## Calendar and other boundaries

No calendar date, bell schedule, Planning Period, Section placement, or future Semester 2 schedule is frozen as source content. These remain instructor-maintained operational authority. Unknown future schedules remain valid.

Teaching Tips remain accepted derived Lesson functionality. Resources remain unresolved as an independent durable authority; source Resources/Materials text is preserved without inventing a Resource catalog. External Planbook remains external state. Future roadmap preservation does not automatically create present parity blockers.

## P10D-R1B recommendation

R1B may now treat the two Standards source-verification gates as evidence-supplied. It should:

1. consume the official PDF transcription and deterministic comparison;
2. record the two abbreviation discrepancies explicitly;
3. freeze the ten instructor-selected Essential Standards with their three-part provenance;
4. apply R1A's content/optional-relationship separation;
5. leave candidate-only relationships absent;
6. update only source-dependent dispositions and never import content in the same step.

Subsequent parity work should separately plan human-reviewed instructional-content import, production structural upgrade, Administrative Weekly Plan/SLO generators, FERPA/privacy readiness, and OneDrive/offline synchronization. None is implemented or accepted by this checkpoint.
