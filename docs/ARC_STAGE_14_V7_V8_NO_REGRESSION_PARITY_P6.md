# ARC Stage 14 — No-Regression Parity P6

## Boundary and authority

P6 converts Project, Activity, Technical Assignment, Test, assessment-finalization, and their explicit Gradebook handoff boundaries through the P4 academic scope contract. Normal ARC remains `V7_ONLY`: each accepted instructor action executes exactly one existing Schema 7 mutation through `ArcProjectTechnicalAuthorityAdapter.runLegacy`. Isolated v8 verification is hard-bound to `arc_classroom_v8_p6_verification`. There is no dual write and no access to `arc_classroom_v8`.

The adapter derives Student, Enrollment, Schedule Assignment, Section, Course, School Year, and Semester identity from `ArcAcademicConsumerProjection`. It rejects missing identity and Section disagreement. Domain callers do not supply a competing reconstruction of academic truth.

## Converted workflow authority

- Reusable Project, Technical Assignment, and Test definitions remain separate from Student assignment and instance history.
- Exact approved Activity Versions are assignable to an individual, selected Students, or Section roster recipients.
- Stable recipient identity supports duplicate names and reuses one definition for later Students without consuming it.
- Student Activities and Attempts preserve workflow, authorized Test reassessment, stale conflicts, and append-first history.
- Project assignment creates Student-specific Project Instance, Build, and initial operational need authority.
- Checkpoint events preserve Started, Ready for Review, Needs More Work, Verified, Reopened, and Corrected state, including notes and measurements.
- Manual Project needs remain operational context and do not become grades or competency evidence.
- Project rubric assessment, correction, and finalization remain append-first.
- Technical assessment finalization preserves natural earned/possible points from the exact Activity Version.
- Project and Technical handoff creates only the explicit finalized AssessmentResult source needed by later Gradebook conversion. P6 does not create or convert GradebookEntry transaction authority.

## Normal UI and shared projection

The accepted Project library, class/selected/individual assignment, Student Project assessment, checkpoint controls, stage/need controls, Technical editor, class Technical scoring, and individual Technical scoring handlers are retained and routed through the exclusive adapter. P6 makes no visual redesign.

The isolated Project projection returns one shared Project/checkpoint/operational object to Student Projects, Fast Roster, Class Forecast, and Booth Project context. Forecast and Fast Roster do not receive persisted domain state.

## Evidence and limits

Automated evidence covers reusable definition/version separation, individual and selected recipients, stable identity and duplicate names, Activity attempts, Project instances/builds, checkpoint review/Verify/Needs More Work, notes/measurements, manual needs, rubric/finalization, Technical natural points, explicit AssessmentResult handoff, stale conflicts and transaction rollback in the owning services, reopen persistence, and cross-view convergence.

Parity evidence advances `project-library` to `service-ready` and records P6 evidence for `project-assignment`, `project-checkpoints`, `project-rubric`, and `technical-assessments`. `class-forecast` remains open because P6 proves only its Project projection input. Gradebook remains outside P6 transaction conversion. Competency/Evidence, Workplace/Safety, and unified Student history remain unchanged.

## Samsung verification requirement

After separately authorized publication and isolated fixture preparation, verify in installed PWA and direct Chrome: create and reuse a Project definition; individual and selected/class assignment including duplicate names; independent Student histories; checkpoint Start, Ready for Review, Needs More Work, Verify, note, measurement, and manual need; agreement across Student, Fast Roster, Forecast, and Booth context; Project rubric finalization/correction; Technical Assignment and Test creation, assignment, natural-point scoring, correction/reassessment rules, reload, background/foreground, rotation, and sleep/wake. Confirm that no Forecast/Fast Roster truth is persisted and that no GradebookEntry is created by P6.

## Proposed next bounded stage

**P7 — Convert Competency, Evidence, Reassessment, and Open Shop workflows** may connect the accepted competency catalog, manual rating history, reassessment, evidence derivation/override, exact deep links, and read-only Open Shop recommendations through the P4 academic scope. It must preserve the approved `60/75/90/100` conversion, WT/AWT distinction, instructor authority, and full prior history. It must not convert Gradebook transactions, Workplace/Safety, or full unified Student history, switch classroom authority, dual write, mutate production, or require a structural database change without stopping for review.
