# ARC Classroom Ready Batch A — P4–P7 Source-to-Workflow Integration

Date: 2026-10-13
Status: local candidate; independent review required
Starting commit: `c3971d9e36df1c67768ffa24e8d73b2b967977f4`
Starting tree: `9bd738090fed425228f5edd610c6eb09825cb796`
Rollback: `rollback/pre-classroom-ready-batch-a-p4-p7-local-implementation`

## Scope completed

Batch A connects the already implemented P4–P7 owners to the existing normal ARC workflows under one explicit authority gate:

- P4 Student identity, Enrollment, effective Section placement, profile lifecycle, roster add/drop/re-enroll, and movement;
- P5 daily roster Attendance, append-first corrections, Pass start/return, and Student history;
- P6 Project definitions/versions, Student assignment, Project instances, checkpoints, operational need, four-criterion rubric, Technical Activities/Attempts, reassessment history, and explicit `AssessmentResult` handoff;
- P7 exact WT/AWT Competency versions, Evidence/Override correction history, Needs Evidence, revoke, exact deep links, and read-only Open Shop projection.

`ArcBatchAAuthorityActivation` is the single Batch A gate. It requires the accepted production database and instructional package identity, the existing academic `V8_AUTHORITATIVE` marker, complete P4 identity bindings, healthy Schema 8 / IndexedDB 14 / 74-store authority, and explicit prohibition of real Student data. Construction is inert. There is no fallback mutation or dual write.

`ArcBatchAProjection` is read-only. It joins records from the P4–P7 owners for normal ARC presentation and persists no competing Student, Attendance, Project, Technical, Competency, Evidence, or Open Shop truth.

## Authority boundary

| Domain | Local isolated Batch A candidate | Production/classroom state after this milestone |
|---|---|---|
| P4 Student/Enrollment | `V8_AUTHORITATIVE` through existing academic owner and Batch A gate | No production change |
| P5 Attendance/Passes | `V8_AUTHORITATIVE` through `ArcV8Attendance` | No production change |
| P6 Project/Activity/Technical | `V8_AUTHORITATIVE` through existing P6 owners | No production change |
| P7 Competency/Evidence/Open Shop | `V8_AUTHORITATIVE` through `ArcV8Evidence` and read-only projection | No production change |
| P8 Workplace/Safety/Behavior | `V7_ONLY` | Unchanged |
| P9 Gradebook | `V7_ONLY` | Unchanged; P6 emits an explicit handoff only |
| P10 Curriculum/Pacing/Lessons | `V7_ONLY` | Unchanged |

The P7 UI can record an explicit rating, Needs Evidence, correction, or revoke. No missing Evidence strategy is inferred. P6 completion does not automatically mutate Gradebook. The 124 reference-only Lessons remain outside ordinary scheduling and Auto Build.

## Normal workflow preservation

The existing `index.html` screens remain the product interface. Their commands now route through the exclusive adapters when the Batch A gate is active. Under `V7_ONLY`, the same handlers retain their accepted Schema-7 behavior. P4–P7 authoritative refresh uses one shared projection; no page-local arrays become domain authority.

Normal ARC startup remains inert unless an existing valid academic activation marker is present and the Batch A gate independently succeeds. A failed Batch A gate fails closed and does not silently mix v7 and v8 writes.

## Release authority closure

The mechanically discovered authority closure grows from 98 to exactly 100 assets for only:

- `src/arc_batch_a_authority_activation.js`
- `src/arc_batch_a_projection.js`

No test harness, fixture, documentation, or unrelated runtime entered the closure. The release-manifest, waiting-release transport, verified routing, service-worker closure, and update tests require the exact 100-asset graph. The eleven reviewed visual assets remain outside authority closure and retain their accepted verified routing.

## Isolated Edge rehearsal

The real installed Microsoft Edge executable ran the actual normal ARC application with a new task-owned profile and the physical database name `arc_classroom_v8_batch_a_verification`. All classroom records were fictional.

The rehearsal proved:

- accepted six-Section Semester 1 topology with WT/AWT separation and Planning period 6;
- zero starting Students, Enrollments, and Schedule Assignments;
- one fictional Student created through P4 and retained after cold restart;
- P5 tardy Attendance plus completed Pass history;
- P6 Project and Technical assignment persistence;
- P7 rating → Needs Evidence → revoke history with no fabricated strategy and no residual current rating;
- warm navigation, background/foreground, offline reload, and complete Edge-process cold restart;
- P8 Workplace, P9 Gradebook, and P10 Curriculum/Pacing/Lesson adapters remained `V7_ONLY`;
- exact V7 rollback custody bound to SHA-256 `e5b45fe28c7a0b1693a9f4b7156fbfca14a0b7dc584c3771c2e15435d3469978`;
- complete 74-store backup, destructive task-database restore, exact post-restore checksum/count parity, and successful reopen;
- final deletion of the task-owned database, caches, registrations, and local storage.

The rehearsal did not access Samsung or production and is not physical acceptance.

## Verification

- complete discovered JavaScript inventory: `146/146` files passed;
- static regression: `47/47` checks passed;
- installed Edge rehearsal: phases 1–3 passed;
- source parse and exact allowlist checks passed;
- `git diff --check` passed;
- closure: exact `100` authority assets;
- database: Schema 8 / IndexedDB 14 / `74` stores;
- normal production publication, deployment, Samsung access, production mutation, real Student authorization, and authority transfer: none.

## Parity evidence

The 47-row frozen contract remains at its existing lifecycle states. Batch A supplies isolated normal-shell behavioral and recovery evidence for the existing P4–P7 `service-ready` rows, but it does not advance them to `ui-connected`, `behaviorally-verified`, `samsung-verified`, or `accepted` because the candidate is local, unpublished, and not physically accepted. P8–P10 remain `V7_ONLY`.

## Remaining Classroom Ready work

1. Independent review and acceptance of this consolidated Batch A candidate.
2. Separately authorized publication and exact-release verification if accepted.
3. Separately authorized physical Samsung rehearsal before any production P4–P7 authority transition.
4. A separately approved real-Student authorization and recovery checkpoint.
5. P8–P10 source-to-workflow integration under later bounded stages.

No subsequent stage is authorized by this milestone.
