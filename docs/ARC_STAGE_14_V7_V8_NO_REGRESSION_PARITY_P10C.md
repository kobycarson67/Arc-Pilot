# ARC Stage 14 P10C — Lesson Plan Domain Authority

## Authority and boundary

P10C starts from commit `98f7114040e699f241ec91daada972b3cf610c02`, tree `92478c352e4782278d11fe15305a2e1952c5e8c0`, and binds the P10C-A1 design plus P10C-A2 Schema 8 / IndexedDB 13 / 73-store structure. Rollback authority is `rollback/pre-stage-14-parity-program-p10c`. Academic authority remains `V7_ONLY`.

`ArcV8LessonPlans` is the isolated owning service. `ArcLessonAuthorityAdapter` preserves exactly one explicit legacy operation under `V7_ONLY`; v8 execution is accepted only for `arc_classroom_v8_p10c_verification`. Production `arc_classroom_v8` is rejected. There is no dual write, fallback mutation, normal UI connection, Auto Build activation, content import, publication, or Samsung access.

## Repository and service architecture

The service uses only the six approved stores:

- `lesson_definitions` for stable course-owned identity, code, numbered/reusable classification, provenance, lifecycle, and revision;
- `lesson_versions` for immutable instructional content and predecessor lineage;
- four normalized link stores for exact Standard, Competency, Curriculum, and Activity/Evidence-declaration version references.

Lesson content includes title, Learning Targets, Criteria for Success, Engagement Strategies, assessment, optional reviewed checks/phases/raw source standards, provenance, source hash, operator, reason, and timestamps. Learning Targets require `I am learning to ` and Criteria require `I can `.

Reads are `getLessonDefinition`, `getLessonVersion`, `getCourseLessons`, `getLessonRelationships`, `getLessonsForCurriculumItem`, `getLessonCoverage`, `getLessonPlanbookProjection`, and `getAutoBuildEligibleLessons`. Commands are `createLessonDefinition`, `createLessonVersionBundle`, `createLessonCorrectionVersion`, and `archiveLessonDefinition`.

## Version and correction model

A LessonDefinition retains stable identity and Course ownership. Exact course-local code duplicates and reviewed source-identity duplicates refuse. Similar titles are allowed because no duplicate-reconciliation policy has been approved.

A LessonVersion is created as a complete atomic bundle. A correction requires the current exact predecessor and expected LessonDefinition revision, creates the next monotonically numbered version, records `supersedesLessonVersionId`, and marks the prior version superseded. Prior content and normalized links remain readable by exact `lessonVersionId`. Stale corrections refuse. An injected link-write failure rolls back the new version, prior-version lifecycle change, and every relationship write.

Archiving is revision-safe and removes the definition from ordinary active selection without deleting versions or historical references.

## Relationship validation

- Standard links require an exact P10B Standard Version, its exact Catalog Version, and matching Lesson Course.
- Competency links require an exact P7 Competency Version whose owning definition applies to the Lesson Course.
- Curriculum links require an exact P10B Map Version and Item with matching map and Course lineage.
- Activity links require an exact P6 Activity Version, a declaration owned by that version, and matching Course applicability.
- Every link requires an explicit relationship type. No vocabulary, mapping, or link is inferred.

Lesson records copy no Standard, Competency, Curriculum, or Activity definition. A Lesson operation creates no Activity assignment, Evidence, grade, pacing record, placement, or forecast truth.

## Auto Build and placement boundary

`getAutoBuildEligibleLessons` deterministically returns only active numbered Lesson definitions with their exact active versions, sorted numerically. It writes nothing and makes no duration, range, calendar, pacing, or relationship decision.

P10B remains the exclusive Section/date placement authority through `section_pacing_plans`, `section_pacing_events`, and `section_pacing_snapshots`. P10C implements neither `previewLessonAutoBuild` nor `commitLessonAutoBuild`.

## Verification evidence

Fictional isolated tests prove WT/AWT separation; stable identity; numbered/reusable behavior; exact-duplicate refusal without near-duplicate policy invention; immutable versions; correction and historical reads; approved sentence stems; all four normalized relationship types; cross-course refusal; search/filter/lifecycle projections; stale conflicts; transaction rollback; reload persistence; deterministic Auto Build-facing reads; Planbook projection; and zero downstream writes.

No `MASTER_LESSON_BANKS` row or real instructional content was imported.

## Remaining reconciliation and product decisions

- Human-reviewed stable IDs, source keys/hashes, duplicate dispositions, and all real WT/AWT Lesson content.
- Exact Standard, Competency, Curriculum, Activity, and Evidence-declaration link manifests and relationship types.
- Whether unproven runtime Lesson edits are approved.
- Any draft/review/approval workflow.
- Resources and Teaching Tips authority.
- Weekly Focus, Weekly Plans, Plan Preflight, administrative output, and external Planbook state.
- UI reconnection and Auto Build activation.

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
| `lesson-plans` | `service-ready` |
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

P10C yields 40 service-ready rows, four not-started rows, and three accepted rows. No row is newly UI-connected, Samsung-verified, or accepted.

## Samsung and next boundary

Samsung production remains at its separately accepted Schema 8 / IDB 10 / 53-store authority and was not accessed. Physical Lesson verification later requires an explicitly authorized published tree, verified production recovery, ordered structural upgrade, human-reviewed content manifest, normal UI adapter, offline/reload checks, WT/AWT filtering, exact historical-version behavior, and proof that Lesson actions do not create Evidence or competing placement truth.

The proposed next bounded stage is **P10C-UI/Auto Build — Reconnect the existing Lesson Plan Bank and P10B Auto Build workflow** after approving whether UI reconnection may use fictional isolated verification before real content reconciliation. That stage must preserve `V7_ONLY`, keep production untouched, use P10B for all placement writes, and leave Resources, Weekly planning, approval workflow, Plan Preflight, and external Planbook state outside scope unless separately authorized.
