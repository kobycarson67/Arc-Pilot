# ARC Schema v8 Stage 4 — Project Runtime Foundation

Stage 4 advanced the isolated `arc_classroom_v8` database from IndexedDB structural version 3 to 4; Stages 5 and 6 subsequently advance it through 5 and 6. ARC schema authority remains 8, the classroom runtime remains schema 7, and application version remains 0.18. The classroom UI does not read this foundation.

## Persisted authority

| Store | Key | Indexes |
|---|---|---|
| `project_instances` | `projectId` | unique `by_student_activity`; `by_student`; `by_enrollment`; `by_workflow` |
| `project_build_attempts` | `buildId` | `by_project`; unique `by_project_sequence`; `by_state` |
| `project_checkpoint_events` | `eventId` | `by_project`; `by_build`; `by_checkpoint`; `by_occurred_at` |
| `project_manual_need_events` | `needEventId` | `by_project`; `by_occurred_at` |
| `project_rubric_assessments` | `rubricAssessmentId` | `by_project`; `by_lifecycle`; `by_rubric_version` |

The ordered `indexeddb-3-to-4` migration creates only these stores and records successful completion. Earlier infrastructure, academic, and Activity stores are preserved in place.

## Project identity and checkpoints

A `ProjectInstance` may be created only for a `StudentActivity` whose exact `ActivityVersion` belongs to a Project `ActivityDefinition`. It stores the immutable StudentActivity, Student, Enrollment, and Version references plus workflow, timestamps, context, pacing metadata, provenance, and revision. It contains no grade, competency evidence, Booth, artifact, blob, or inventory quantity.

Checkpoint definitions are immutable configuration on the exact Project `ActivityVersion`. Each definition has a stable code, display name, order, enabled state, description, instructor review requirement, and optional structured measurement configuration. Used Version locking from Stage 3 therefore locks the checkpoint sequence used by a Project.

## Logical Project and physical Builds

One logical Project normally exists per Project StudentActivity. Build 1 is created atomically with the Project and the initial manual `Ready to Work` need. Builds have independent identity, sequence, state, outcome, start/end timestamps, restart reason, authorization, lifecycle, provenance, and revision.

An instructor authorized restart atomically closes or scraps the current Build and creates the next sequence. The StudentActivity and Project identities remain unchanged. Prior checkpoint history remains attached to the old Build; the new Build starts with an independent checkpoint stream. No `ActivityAttempt` reassessment is created and no checkpoint state carries forward by assumption. A failed transaction leaves both records unchanged.

## Append first checkpoint and need history

Checkpoint progress is represented by immutable events: Entered, Started, Ready to Work, Ready for Review, Instructor Review, Needs More Work, Verified, Reopened, and explicit Corrected events. Events reference the Project, Build, exact Version checkpoint code, time, actor, optional note/context/measurement, provenance, and an optional superseded event. Old events are not edited to express current state.

Manual operational needs are also append first. The latest manual value remains underlying authority. The deterministic projection rebuilds checkpoint states, current checkpoint, next checkpoint, review requirement, and displayed need from exact Version definitions, the active/latest Build, checkpoint events, and manual need events.

Projection priority is:

1. A checkpoint waiting for review displays `Instructor Review — <Checkpoint Name>`.
2. Otherwise the latest manual Project need is displayed.

Ready for Review never overwrites `Ready to Work`. Needs More Work returns the checkpoint to in progress and removes the derived review. Verified advances to the next applicable checkpoint and exposes the preserved manual need. Reloading and rebuilding the projection produces the same result; no duplicate current state is persisted.

## Workflow, concurrency, and active Project rule

Stage 4 supports Active, In Progress, Paused — Completion Opportunity Preserved, Ready for Final Assessment, Finalized, and the three approved Closed states. The service validates allowed transitions. Time and grading period boundaries do not finalize or fail a Project.

Project workflow, manual need, restart/Build, and finalization operations use optimistic Project and/or Build revisions. Stale writes fail with structured conflicts. IDs and parent references are immutable. A student normally has one active Project; an explicit instructor authorization is required to create another. Non Project Activities do not count.

## Rubric and finalization

Project rubric assessments persist all four criterion treatments, rubric version/configuration, lifecycle, actors/timestamps, provenance, revision, and optional correction/supersession authority:

- Measurement & Dimensional Accuracy
- Fit-Up & Fabrication
- Welding Quality
- Workmanship & Finished Quality

Applicable criteria receive equal weight. Four applicable criteria are 25 percent each. A legitimate N/A is excluded and the remaining criteria redistribute equally; N/A is never scored as zero. The percentage is rebuildable from criterion results. Corrections append a superseding rubric assessment and preserve the prior record.

Normal finalization requires Ready for Final Assessment and a finalized rubric. It atomically completes the active Build and finalizes the Project. Ordinary post finalization restart or reassessment solely to improve a grade is blocked. Approved closure states can close without inventing a rubric or grade.

## Taylor test fixture

The test only Taylor Reed fixture uses WT, Welding Coupon Holder Version 1, and the Version bound sequence Material Preparation → Fit-Up → Tack & Pre-Weld Check. It proves Material Preparation verification, Fit-Up work and review, derived `Instructor Review — Fit-Up`, preservation of manual `Ready to Work`, verification advancement to Tack & Pre-Weld Check, deterministic reload, and the separate Needs More Work path. No production Taylor record is seeded.

## Explicit boundaries

- Stage 4 creates no v8 Booth store and does not persist Booth 4 or `boothId` in a Project.
- It creates no Evidence Source/Record, competency derivation, override, AssessmentResult, GradebookEntry, Workplace, Safety, Attendance, supplemental session, Artifact, photo, or blob authority.
- Checkpoint and rubric records are future evidence source points only.
- `weld_v013`, v7 photo authority, pilot data, and simulation data are never read, reset, migrated, or modified.
- The build does not connect the classroom UI to v8. Production/Classroom Readiness is not achieved.
