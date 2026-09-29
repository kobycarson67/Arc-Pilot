# ARC Stage 14 P10C-A1 — Lesson Plan Authority Design Freeze

## 1. Authority and boundary

This design freeze starts from P10B-UI commit `cb1c07b075e3852abae08f82a5f5d22dd2dea950`, tree `f72e0f64647e43dd536098a10cfbd3983b375c54`. Logical Schema 8, local IndexedDB 12, 67 stores, runtime behavior, UI, build/cache authority, service worker, production, Samsung state, and academic authority `V7_ONLY` remain unchanged.

P10C-A1 freezes the minimum durable Lesson Plan contracts below the accepted v7 Lesson Plan Bank and Auto Build workflows. It creates no records and imports no content.

## 2. Existing v7 requirements inventory

### Lesson Plan Bank

`MASTER_LESSON_BANKS` contains 124 source rows:

| Course | Numbered | Reusable | Total | Codes |
|---|---:|---:|---:|---|
| WT | 47 | 4 | 51 | `1`–`47`, `R1`–`R4` |
| AWT | 67 | 6 | 73 | `1`–`67`, `R1`–`R6` |

Every source row currently has `code`, `title`, `reusable`, `standards`, `learningTargets`, `criteria`, `strategies`, and `assessment`. `ensurePlanningModel` copies missing master rows into course-specific `state.lessonBank` and preserves the master identifier as `id` and `masterId`. The UI:

- switches WT/AWT;
- shows numbered, reusable, and total counts;
- searches title, standards, targets, and criteria;
- filters numbered versus reusable Lessons;
- displays Title, Standards to Select in Planbook, Learning Targets, Criteria for Success, strategies, Assessment, and optional derived Teaching Tips;
- schedules a reusable Lesson entry without modifying that master entry.

The accepted source field `strategies` is displayed today as **Engaging Instructional Strategies**. Approved future administrative terminology is **Engagement Strategies**. Reconciliation must preserve the source value and map the reviewed display terminology; A1 does not rewrite content.

### Individual scheduling and planner behavior

`scheduleLessonFromBank` selects a course Lesson and a current Section, asks for estimated instructional periods, and `confirmScheduleLesson` adds an independent pacing item containing the Lesson identity, title snapshot, planned and remaining duration, status, actual dates, original forecast dates, forecast dates, and creation time. It explicitly leaves the master Lesson unchanged.

The planner supports Section selection, anchor date, optional Open Shop inclusion, ordered pacing items, duration adjustment, reorder, removal, and status changes. Partial and Completed record actual instructional dates. Move Forward records no instruction. Completed items retain actual history. Semester transition creates Section pacing-history snapshots; completed observations may inform later estimated durations.

Calendar eligibility comes from the accepted academic/schedule authority: weekends, holidays, no-school days, PD/no-instruction days, and Special Activity are excluded; Open Shop is excluded unless the instructor enables it.

### Auto Build

`showAutoBuildPacing` and `confirmAutoBuildPacing` currently:

1. use only nonreusable numeric Lessons, ordered by numeric code;
2. suggest the first unscheduled code;
3. let the instructor choose inclusive start/end codes;
4. let the instructor select uniform, historical average, latest-year, or conservative duration;
5. require a fallback duration when historical evidence is unavailable;
6. optionally replace unfinished items only after confirmation;
7. always retain completed items and actual history;
8. skip Lessons already scheduled;
9. add independent pacing items referencing the reusable Lesson;
10. calculate forecasts from the Section plan and eligible calendar days;
11. preserve original forecasts for newly scheduled unfinished items;
12. report added, skipped, historical, and fallback counts.

Auto Build currently does not create or edit Lesson content, Curriculum Maps, Section positions, standards, competencies, Activities, Evidence, or calendar authority.

### Planbook boundary

The existing bank provides the content needed for external Planbook entry. Planbook has no ARC persistence, lifecycle, identifier, or write authority. Future ARC may generate a Planbook-oriented or administrator-facing projection, but must derive it from Lesson and classroom authorities without making Planbook a second source of truth.

## 3. Frozen entity contracts

### LessonDefinition

`LessonDefinition` is the stable reusable identity across corrections and versions.

Required fields:

- `lessonId`: immutable stable UUID;
- `courseId`: exact WT or AWT Course authority;
- `lessonCode`: instructor-visible course-local code such as `12` or `R3`;
- `reusableKind`: `numbered` or `reusable`, preserving current behavior without inferring pedagogy;
- `lifecycle`: `active` or `archived`;
- `createdAt`, `createdBy`, `updatedAt`, `updatedBy`;
- `revision` for conflict-safe lifecycle changes;
- optional reviewed `sourceAuthorityKey` and `sourceRecordKey` for reconciliation provenance.

`lessonId`, Course ownership, and source provenance cannot be changed by a correction. Archiving removes a definition from ordinary new selection but does not invalidate prior versions or pacing history. No cross-course equivalence is inferred between similarly coded WT and AWT Lessons.

### LessonVersion

`LessonVersion` is immutable instructional content. Required fields:

- `lessonVersionId`, `lessonId`, and monotonically increasing `versionNumber`;
- `title`;
- `learningTargets[]`, each retaining the approved **“I am learning to …”** stem;
- `successCriteria[]`, each retaining the approved **“I can …”** stem;
- `engagementStrategies`;
- `assessment`;
- optional `checksForUnderstanding[]` only when reviewed source authority supplies them;
- optional `instructionalPhases[]` only when reviewed source authority supplies them;
- `sourceHash`, `sourceAuthorityKey`, `provenanceNote`;
- `supersedesLessonVersionId` for replacement lineage;
- `lifecycle`: `active`, `superseded`, or `retired`;
- operator, reason, and timestamps.

Standards, competencies, Curriculum items, and Activities are explicit links, not copied definitions or unverified prose parsing. Existing raw standards prose may be retained as `sourceStandardsText[]` during reconciliation so unresolved mapping remains visible; it is not an authoritative Standard relationship.

Once created, a LessonVersion is never edited. A correction creates a complete replacement version and supersedes the prior version. Historical P10B pacing events keep the exact `lessonVersionId` used. A later version never changes prior placements, snapshots, Planbook projections, or instructional history.

No Lesson approval workflow is frozen. Creation of an immutable active version requires explicit instructor/operator action and provenance, but whether a separate draft/review/approval lifecycle is required remains unresolved.

### Explicit relationship records

Each relationship belongs to one exact `lessonVersionId`:

- Lesson → Standard points to `standardVersionId` and its owning `standardCatalogVersionId` from P10B.
- Lesson → Competency points to `competencyId` and exact `competencyVersionId` from P7.
- Lesson → Curriculum points to `curriculumMapVersionId` and exact `curriculumMapItemId` from P10B.
- Lesson → Activity points to exact P6 `versionId` and may point to an existing `declarationId` where reviewed Evidence-opportunity authority exists.

Every link carries a reviewed `relationshipType`, order, provenance, operator, reason, and timestamps. A1 does not freeze a global relationship-type vocabulary or infer links from prose. Links are immutable with the Lesson version; changing links requires a replacement Lesson version bundle.

### Section/date-specific instructional use

A reusable Lesson and its Section/date use are separate authorities. No new Lesson-placement store is approved because P10B already owns this truth:

- `section_pacing_plans` owns Section, School Year, Semester, Grading Period, and Curriculum Map version scope;
- `section_pacing_events` owns ordered placement and correction history;
- `ITEM_ADDED` owns the stable pacing item and exact `lessonPlanVersionId` reference;
- its payload owns order and planned duration;
- `ANCHOR_CHANGED`, `OPEN_SHOP_CHANGED`, `ITEM_REORDERED`, `DURATION_ADJUSTED`, and `ITEM_REMOVED` own scheduling adjustments;
- `PARTIAL`, `COMPLETED`, `MOVED_FORWARD`, and `EXTENDED` own instructional progress and occurrence date;
- correction/void lineage preserves history;
- `section_pacing_snapshots` preserves immutable readback and Semester closeout.

Lesson services may not persist Section position, dates, forecasts, status, duration, actual instruction, or Semester closeout. P10B consumers retain the exact Lesson version reference. Future Semester placement remains absent until an instructor creates or approves a plan.

## 4. Correction, lifecycle, and history rules

1. Stable Lesson identity is never replaced by a title or code.
2. Content and relationship corrections create a new immutable LessonVersion bundle.
3. Prior versions remain readable and retain their source hash and provenance.
4. Archiving a LessonDefinition blocks ordinary new selection without deleting history.
5. Section placement changes are append-first P10B pacing events.
6. A reschedule never changes a LessonVersion.
7. Calendar changes rebuild derived eligible dates through academic authority; they do not rewrite the Lesson or fabricate instruction.
8. Historical projections display supersession, correction, removal, and void lineage rather than treating all rows as simultaneously current.
9. Operator, reason, timestamps, expected revision, and expected pacing sequence are required on corrective commands.
10. No Lesson record creates Evidence. Evidence exists only when an approved P6 Activity/Evidence declaration and P7 Evidence transaction establish it.

## 5. Minimum normalized storage target

P10C-A2 requires exactly six new stores. Embedded arrays are appropriate for atomic immutable Lesson content. External authority relationships require normalized link stores. Separate Lesson placement/event stores are rejected because they would duplicate P10B pacing truth.

| Store | Primary key | Required indexes |
|---|---|---|
| `lesson_definitions` | `lessonId` | `by_course` → `courseId`; `by_course_code` → `[courseId, lessonCode]` unique; `by_lifecycle` → `lifecycle`; `by_source` → `[sourceAuthorityKey, sourceRecordKey]` unique where populated |
| `lesson_versions` | `lessonVersionId` | `by_lesson` → `lessonId`; `by_lesson_version` → `[lessonId, versionNumber]` unique; `by_lifecycle` → `lifecycle`; `by_source_hash` → `[lessonId, sourceHash]` unique |
| `lesson_version_standard_links` | `lessonStandardLinkId` | `by_lesson_version` → `lessonVersionId`; `by_standard_version` → `standardVersionId`; `by_catalog_version` → `standardCatalogVersionId`; `by_unique_link` → `[lessonVersionId, standardVersionId, relationshipType]` unique |
| `lesson_version_competency_links` | `lessonCompetencyLinkId` | `by_lesson_version` → `lessonVersionId`; `by_competency_version` → `competencyVersionId`; `by_unique_link` → `[lessonVersionId, competencyVersionId, relationshipType]` unique |
| `lesson_version_curriculum_links` | `lessonCurriculumLinkId` | `by_lesson_version` → `lessonVersionId`; `by_map_version` → `curriculumMapVersionId`; `by_curriculum_item` → `curriculumMapItemId`; `by_unique_link` → `[lessonVersionId, curriculumMapItemId, relationshipType]` unique |
| `lesson_version_activity_links` | `lessonActivityLinkId` | `by_lesson_version` → `lessonVersionId`; `by_activity_version` → `activityVersionId`; `by_declaration` → `declarationId`; `by_unique_link` → `[lessonVersionId, activityVersionId, relationshipType]` unique |

The minimum structural target is **logical Schema 8 / IndexedDB 13 / 73 stores**, an ordered **12 → 13** migration adding only these six empty stores and structural metadata. P10C-A1 does not implement it.

Structural integrity must later validate Course ownership, exact parent versions, Standard catalog/version lineage, Curriculum item/map version lineage, Competency definition/version lineage, Activity definition/version lineage, optional declaration ownership, and the rule that every relationship Course is compatible with the owning Lesson Course. Validation must not invent missing mappings.

## 6. Frozen Auto Build contract

Auto Build is a Lesson/P10B coordination command, not its own authority.

### Inputs

- exact Section pacing plan, revision, and sequence from P10B;
- course-scoped active numbered LessonDefinitions and exact active LessonVersions;
- instructor-selected inclusive sequence boundary or explicit ordered selection;
- instructor-selected duration model and fallback duration;
- P10B pacing history observations when the selected model uses them;
- P2/P3 instructional calendar projection and explicit Open Shop setting;
- optional instructor-approved replacement of unfinished pacing items.

### Preview

`previewLessonAutoBuild` is read-only. It returns exact Lesson version references, items to retain/remove/add, durations and their provenance, skipped duplicates, eligible-date forecast, warnings, expected plan revision/sequence, and a deterministic preview fingerprint. Preview creates no Lesson, link, pacing event, forecast record, or future plan.

### Commit

`commitLessonAutoBuild` requires the accepted preview fingerprint, current expected revision/sequence, operator, and reason. It atomically appends the necessary P10B removal/addition events or changes nothing. It references existing `lessonVersionId` values only. Completed pacing items and actual history cannot be removed. Commit persists no calculated forecast outside P10B and creates no Lesson definition/version/link.

The existing choices and confirmation remain instructor controlled. Auto Build never selects standards, essential designations, competencies, Activities, Evidence qualification, Curriculum position, future Semester plans, or mastery policy.

## 7. Frozen interfaces

### Lesson reads

- `getLessonDefinition({ lessonId })`
- `getLessonVersion({ lessonVersionId })`
- `getCourseLessons({ courseId, lifecycle, reusableKind })`
- `getLessonRelationships({ lessonVersionId })`
- `getLessonsForCurriculumItem({ curriculumMapVersionId, curriculumMapItemId })`
- `getLessonCoverage({ courseId, curriculumMapVersionId })`
- `getLessonPlanbookProjection({ lessonVersionId })`

`getLessonPlanbookProjection` returns the exact approved Lesson fields and relationships needed for external entry. It writes nothing and does not claim submission.

### Lesson commands

- `createLessonDefinition`
- `createLessonVersionBundle`
- `createLessonCorrectionVersion`
- `archiveLessonDefinition`

Version bundle commands create immutable content and reviewed links atomically. A separate approval command is not frozen.

### Placement and Auto Build

- existing P10B `getSectionPacing` and `getSectionPacingHistory` remain the placement reads;
- existing P10B pacing commands remain individual placement commands;
- `previewLessonAutoBuild`
- `commitLessonAutoBuild`

### Consumer rules

- Curriculum Hub may read `getLessonsForCurriculumItem`; it may not store a Lesson list in Curriculum authority.
- Pacing displays exact Lesson versions referenced by P10B events.
- Auto Build reads Lessons and commits only P10B events.
- Class Forecast reads P10B pacing plus Lesson display projections and persists no Lesson/placement truth.
- The normal Lesson Plan workflow uses Lesson reads/commands and P10B placement commands; it does not edit P10B, P7, or P6 definitions indirectly.
- Planbook/weekly administrative output is a derived projection or later approved immutable administrative snapshot; it is never Lesson source authority.

## 8. v7 reconciliation classification

| Existing authority/data | Classification | Required treatment |
|---|---|---|
| `MASTER_LESSON_BANKS` 124 source rows | `RECONCILE_AND_PORT` | Human-review every WT/AWT identity, field, provenance, Standard/Curriculum/Competency/Activity link, and unresolved raw standards string before any import. |
| Approved reusable instructional fields in `state.lessonBank` that match reviewed source | `RECONCILE_AND_PORT` candidate | Reconcile by source key/hash; never assume a runtime copy is newer or approved. |
| Runtime copies created by `lessonBankSeedVersion` | `DISCARD` as duplicate persistence | Port the reviewed reusable source once; do not import seeded clones as additional Lessons. |
| Unproven local edits or extra runtime Lesson rows | `UNRESOLVED` | Require instructor review and provenance; do not silently merge or discard. |
| `state.pacingPlans`, pacing items, forecast dates, status, and `lastAutoBuild` | `DISCARD` for production import | Pilot/fictional transactional placement is not reusable content. New production P10B authority starts from approved configuration. |
| `state.pacingHistorySnapshots` and learned durations | `DISCARD` for production import | Do not train production estimates from fictional/pilot scheduling history. Future observations rebuild under P10B. |
| `sectionArchives` Lesson/pacing transaction fragments | `DISCARD` for production import | Do not carry fictional Section history into production. |
| Teaching Tips | `RETAIN_OUTSIDE_V8` | They remain a derived helper over Lesson content until separately approved as Lesson content or Resource authority. |
| External Planbook records/submission state | `RETAIN_OUTSIDE_V8` | No accepted ARC authority exists. ARC provides a projection without claiming external submission. |
| Normal Lesson UI and consumer projections | `REBUILD_IN_V8` | Preserve interaction behavior while replacing reads/writes with exclusive adapters after service authority exists. |
| Weekly Focus, Weekly Plans, Plan Preflight, administrative approval/snapshots | `UNRESOLVED` for P10C implementation scope | Approved architecture exists, but exact runtime and store contracts require later bounded authority. |
| Resources | `UNRESOLVED` | No Resource identity, version, approval, provenance, or lifecycle is frozen. A Lesson may expose a nullable future relationship only. |

Reusable content survives only through a reviewed manifest with source hashes, stable IDs, exact Course scope, version numbers, relationship dispositions, counts, and instructor approval. Transactional scheduling/history is not included in that manifest.

## 9. Unresolved decisions

- Exact reviewed mappings for all raw `standards` strings to P10B Standard versions.
- Exact Curriculum item, P7 Competency version, P6 Activity version, and Evidence declaration links.
- Whether any unproven runtime Lesson edits are approved content.
- Whether a separate Lesson draft/review/approval workflow is required.
- Exact relationship-type vocabularies and prerequisite structures.
- Checks for Understanding and instructional phase content for existing rows where no source field exists.
- Weekly Focus, differentiated pathway, weekly administrative snapshot, reflection, Plan Preflight, print/PDF/Word, and submission lifecycle stores.
- Resource identity, lifecycle, approval, provenance, media, and Lesson relationship.
- Whether historical duration models may use only current-year, multi-year, or instructor-selected cohorts beyond the accepted current choices.
- Final user-facing terminology migration from source `strategies` to approved **Engagement Strategies** without altering historical content.

None of these decisions may be inferred during structural implementation or content import.

## 10. Parity state and next authorization

The `lesson-plans` row remains `not-started`. A design contract does not make the service, normal UI, Samsung behavior, content, or production authority ready. P10B `curriculum-standards` and `pacing` remain `service-ready`; all other parity states remain unchanged.

P10C-A2 requires explicit authorization to preserve Schema 8, advance IndexedDB exactly **12 → 13**, and increase the manifest exactly **67 → 73 stores** by adding the six approved empty stores and indexes. It must update initialization, integrity, migration history, backup/export/checksum/readback/restore, protected compatibility inspection, fixtures, and static contracts; test populated 67-store upgrade preservation and failed-upgrade recovery; import no Lesson content; implement no Lesson services, UI, Auto Build, Weekly Plans, Planbook, Resources, or production upgrade; keep `lesson-plans` `not-started`; remain isolated and `V7_ONLY`; and stop after a clean local structural commit.
