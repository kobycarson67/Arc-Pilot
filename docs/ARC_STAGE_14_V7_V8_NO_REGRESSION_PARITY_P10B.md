# Stage 14 P10B — Curriculum, Standards & Section Pacing Domain Authority

## Authority and boundary

P10B begins from P10B-A2 commit `a9732d6251a5739fffdf50f7e587c3a42946a73a`, tree `d4bacff70999b9689aa98acd6eb86b0f6262e7ee`. It implements the P10B-A1 frozen contracts over the P10B-A2 Schema 8 / IndexedDB 12 / 67-store structure. Academic authority remains `V7_ONLY`.

`ArcV8CurriculumPacing` is the single owning domain service. `ArcCurriculumPacingAuthorityAdapter` preserves exactly one accepted legacy operation under `V7_ONLY` and permits v8 execution only when hard-bound to `arc_classroom_v8_p10b_verification`. It rejects production `arc_classroom_v8`, performs no dual write or fallback, and is not connected to normal ARC UI or publication assets.

Only clearly fictional isolated fixtures were used. No `TECHNICAL_STANDARDS`, `ESSENTIAL_STANDARDS`, `MASTER_CURRICULUM_MAPS`, pacing data, or other v7 content was imported.

## Repository and service architecture

The service owns the frozen stable and immutable authorities:

- stable Standard Catalogs with immutable Catalog Versions;
- stable Standard Definitions with immutable wording Versions;
- explicit append-first Essential Standard Designation chains;
- stable WT/AWT Curriculum Maps with immutable Map Versions and ordered immutable items;
- explicit reviewed item links to exact Standard Versions and P7 Competency Versions;
- Section/Semester-scoped Pacing Plans;
- append-first Pacing Events and correction/void chains;
- immutable SHA-256-verified Pacing Snapshots.

The read interface is exactly `getCourseStandards`, `getEssentialStandards`, `getCurriculumMap`, `getCurriculumItem`, `getCurriculumCoverage`, `getSectionPacing`, and `getSectionPacingHistory`.

The pacing command interface is exactly `previewPacingCommand`, `appendPacingCommand`, `createPacingSnapshot`, `previewSemesterPacingCloseout`, and `closeSemesterPacing`.

The service adds no store, schema change, mutable projection store, Lesson Plan authority, Forecast authority, or Resource authority.

## Immutable version and correction model

Catalog, Standard, and Curriculum Map revisions create new immutable version records with explicit predecessor references. Existing wording, version provenance, ordered map items, and exact links remain unchanged and readable. Historical plans remain pinned to the exact Map Version selected when the plan was created.

Essential Standard authority is an explicit instructor/admin designation. A correction appends a new chain member, marks the prior chain member superseded, preserves reason/operator/time, and never infers an essential selection from map use.

Curriculum links require an explicit relationship type on every record. The service neither supplies a global default nor parses `rawStandardsText` into invented Standard links. Coverage reports verified exact links separately from unresolved raw prose.

## Pacing derivation model

Each plan belongs to one Section, Course, School Year, Semester, and exact Curriculum Map Version. No plan is created for a future Semester unless explicitly commanded. Absence returns `configured: false` and `reason: unknown/not configured`.

Current pacing is rebuilt by selecting current nonvoid event-chain heads and folding them in monotonically increasing plan sequence. Sequence supplies deterministic fold order; equal effective dates do not invent chronology. Current position, ordered pacing items, duration, Open Shop inclusion, anchor, progress status, and plan status are projections rather than competing persisted truth.

Corrections append a replacement or void event and retain the original. Commands require the expected plan revision and last sequence. Preview uses the same validation and fold logic without writing. Different Sections may reference the same Map Version while retaining independent event streams and current positions.

Snapshots contain the exact projection, through-sequence, and SHA-256 projection hash. History readback verifies the hash. Semester closeout creates the transition snapshot, appends the close event, and updates the plan atomically behind a required verified recovery-point reference. It never fabricates a future plan or schedule, regardless of continue/fresh/end choice.

## Verification evidence

Isolated tests prove:

- WT/AWT separation and cross-course refusal;
- immutable Catalog, Standard, and Map version history;
- explicit designation correction and stale-chain refusal;
- deterministic item ordering and exact Standard/P7 Competency version references;
- unresolved prose remaining unresolved;
- independent Section positions on one map;
- append-first pacing correction and stale revision/sequence refusal;
- preview without mutation;
- snapshot hashing and immutable readback;
- atomic Semester closeout and injected failure rollback;
- absent future-Semester plans remaining absent;
- deterministic service reopen/readback;
- no consumer-specific persisted truth;
- exclusive nonproduction adapter behavior with no fallback or dual write.

## Human reconciliation still required

- Human-reviewed stable IDs for every approved catalog, Standard, Map, item, and link.
- Exact source wording/order/hash reconciliation, including source-photo discrepancies.
- Explicit Essential Standard selections.
- Explicit relationship type for each Curriculum-to-Standard and Curriculum-to-Competency link.
- Decision whether any reusable pacing sequence is approved; transactional v7 progress remains excluded.
- P10C Lesson Plan identity/version/approval and conversion manifests.
- Resource authority, which remains unresolved.
- Normal Curriculum Hub and planner UI conversion, Class Forecast consumption, production import, and Samsung activation.

## Updated 47-row parity inventory

| Capability ID | State |
|---|---|
| `academic-year-semester` | `service-ready` |
| `grading-periods` | `service-ready` |
| `sections` | `service-ready` |
| `schedule-setup` | `service-ready` |
| `school-calendar` | `service-ready` |
| `bell-schedules` | `service-ready` |
| `planning-period` | `service-ready` |
| `section-period-placement` | `service-ready` |
| `semester-transition` | `service-ready` |
| `student-records` | `service-ready` |
| `student-directory-search` | `service-ready` |
| `roster-management` | `service-ready` |
| `student-movement` | `service-ready` |
| `dashboard-class-context` | `service-ready` |
| `fast-roster` | `service-ready` |
| `attendance` | `service-ready` |
| `passes` | `service-ready` |
| `attendance-pass-history` | `service-ready` |
| `curriculum-standards` | `service-ready` |
| `lesson-plans` | `not-started` |
| `pacing` | `service-ready` |
| `class-forecast` | `not-started` |
| `notifications` | `not-started` |
| `project-library` | `service-ready` |
| `project-assignment` | `service-ready` |
| `project-checkpoints` | `service-ready` |
| `project-rubric` | `service-ready` |
| `competency-catalog` | `service-ready` |
| `competency-assessment` | `service-ready` |
| `reassessment` | `service-ready` |
| `technical-assessments` | `service-ready` |
| `open-shop` | `service-ready` |
| `workplace` | `service-ready` |
| `safety` | `service-ready` |
| `behavior-incidents` | `service-ready` |
| `gradebook` | `service-ready` |
| `manual-posting` | `service-ready` |
| `photo-capture` | `service-ready` |
| `student-work-library` | `service-ready` |
| `student-history` | `service-ready` |
| `booth-manager` | `service-ready` |
| `general-inventory` | `not-started` |
| `material-inventory` | `not-started` |
| `backup-restore` | `service-ready` |
| `app-update-pwa` | `accepted` |
| `navigation-shell` | `accepted` |
| `simulation-isolation` | `accepted` |

The program now has 39 service-ready rows, five not-started rows, and three accepted rows. No row is UI-connected or Samsung-verified through P10B.

## Samsung and next boundary

Samsung production remains untouched at its separately accepted Schema 8 / IDB-10 / 53-store authority. Before physical P10B verification, later authority must publish an exact reconciled build, create and verify a new protected recovery point, explicitly authorize ordered 10→11→12 production upgrade, verify all 67 stores and integrity, import only a human-approved content manifest, connect the retained normal UI under an approved authority transition, and run WT/AWT, independent-Section, correction, reload/offline, closeout, and rollback checks. P10B supplies no Samsung evidence.

The proposed next bounded stage is **P10C — Lesson Plan Authority Design/Implementation Boundary** after the instructor approves its identity, immutable version, approval, scheduling, and conversion contracts. If the priority is proving current Curriculum/Pacing behavior in normal ARC first, a separately bounded P10B UI-adapter stage may precede P10C. Either stage must preserve `V7_ONLY`, avoid production and content import, and leave Class Forecast and Resources outside scope unless separately authorized.
