# Stage 14 P10B-A1 — Curriculum, Standards & Section Pacing Authority Design Freeze

## Boundary and starting authority

P10B-A1 begins from accepted P10A commit `c16ffbc9274dfb9b50100b249a565081d4b76332`, tree `1321a28698aa8550e7249ad288ba40da7747c7b7`. Logical Schema 8, IndexedDB structural version 11, and the 54-store manifest remain unchanged. Academic authority remains `V7_ONLY`.

This milestone freezes design authority only. It adds no runtime service, store, adapter, user interface, seed data, production data, or publication asset. The `curriculum-standards` and `pacing` parity rows remain `not-started` because a frozen contract is not service or behavioral evidence.

## Accepted source reconciliation

The design uses the following accepted sources without treating display text as identity:

| Source | Accepted meaning | Design consequence |
|---|---|---|
| `TECHNICAL_STANDARDS` | Separate WT and AWT standard codes, exact wording, order, and current essential flags | Reconcile through a reviewed catalog manifest. Preserve the exact source text and course ownership. Do not generate target IDs from labels. |
| `ESSENTIAL_STANDARDS` | The same current course-scoped essential selections used by the pacing coverage monitor | Essential is explicit designation authority scoped to a reviewed course catalog version. It is not inferred from lesson/map use. |
| `MASTER_CURRICULUM_MAPS` | Separate WT and AWT quarter/unit sequences with timeframe, focus, standards text, targets, criteria, strategies, and assessment | Reconcile approved maps as immutable course-specific versions with ordered items. Preserve raw standards text until every structured link is reviewed. |
| `MASTER_LESSON_BANKS` | Course-specific reusable/numbered lessons linked by prose/code to standards and scheduled by the pacing planner | Retain as P10C source authority. P10B-A1 freezes only nullable future Lesson references and does not convert lessons. |
| `state.pacingPlans` | Per-Section anchor, Open Shop inclusion, ordered lesson items, forecast/actual dates, duration, deferral, and status | Existing records are transactional pilot state and are not production authority. The behaviors establish the future event contract. |
| `state.sectionCurriculumProgress` | One independently movable current map position per Section | Current records are transactional pilot state. Future position is derived from the Section pacing event stream, not a second mutable truth. |
| `state.pacingHistorySnapshots` | Semester/manual snapshots of Section plan, map position, durations, and summary | Existing records are discarded; the immutable snapshot behavior is retained. |
| `state.sectionArchives` | Semester Transition capture of Section, roster, pacing plan, and map position | Existing fictional archives are discarded. Academic identity remains owned by P4/P2; pacing closeout becomes an immutable pacing snapshot. |
| P7 competency definitions/versions | Stable WT/AWT competency identity, version, order, and language | Curriculum stores references to exact P7 competency versions. It never copies competency definitions or proficiency policy. |

The existing UI establishes these retained behaviors: WT and AWT are separate; one master course map can serve multiple Sections; each Section moves independently; forecasts use the academic calendar; an instructor can set or clear position, build/reorder a plan, change duration or anchor, include/exclude Open Shop, record completed/partial/moved/extended work, inspect history, and preserve pacing during Semester Transition. Forecast dates are rebuildable projections rather than independent authority.

## Frozen entity contracts

All records use stable opaque IDs issued by the v8 storage service. Proposed IDs in a reconciliation manifest are reviewed values; codes, labels, array positions, and hashes are never identity. Every mutable authority uses `revision`, `createdAt`, `createdBy`, `updatedAt`, `updatedBy`, and an explicit reason where correction is allowed. Immutable records reject update.

### StandardCatalog

Stable identity for one authoritative standards catalog.

- `standardCatalogId` — primary key.
- `courseId` — exact WT or AWT Course authority from P4.
- `catalogCode`, `title` — instructor-facing identity from the reviewed source.
- `sourceAuthorityKey`, `sourceType`, `sourceReference` — provenance for the repository/source catalog; source-photo authority remains unresolved until reconciled.
- `lifecycle` — `active` or `retired`; retirement never deletes versions or links.
- `revision` and audit fields.

One catalog belongs to one Course. Sharing a catalog between WT and AWT requires a future affirmative reviewed decision; it is never inferred from matching wording.

### StandardCatalogVersion

Immutable reviewed publication of a StandardCatalog.

- `standardCatalogVersionId` — primary key.
- `standardCatalogId`, `versionNumber`, `versionLabel`.
- `sourceHash`, `sourceRevision`, `reviewManifestId`, `approvedAt`, `approvedBy`.
- `supersedesStandardCatalogVersionId` — nullable prior publication.
- `lifecycle` — `active`, `superseded`, or `retired`.
- immutable creation/audit fields.

The source hash proves the exact reviewed collection. Activating a replacement version does not rewrite historical consumers.

### StandardDefinition

Stable identity for one standard inside one course catalog.

- `standardId` — primary key.
- `standardCatalogId`, `courseId`.
- `externalCode` — exact source code such as the accepted WT/AWT code; not the primary key.
- `displayOrder`.
- `lifecycle` — `active` or `retired`.
- revision/audit fields.

The pair `(standardCatalogId, externalCode)` is unique while active. Code correction requires reviewed reconciliation; identity does not silently change.

### StandardVersion

Immutable wording and provenance for a StandardDefinition.

- `standardVersionId` — primary key.
- `standardId`, `standardCatalogVersionId`, `versionNumber`.
- `wording` — exact reviewed authoritative text.
- `sourceHash`, `reviewManifestId`.
- `supersedesStandardVersionId` — nullable.
- `lifecycle` — `active`, `superseded`, or `retired`.
- immutable creation/audit fields.

Curriculum and historical consumers reference `standardVersionId`, never the mutable current Standard projection.

### EssentialStandardDesignation

Append-first instructor/admin authority; it is not a property inferred from use.

- `essentialStandardDesignationId` — primary key.
- `courseId`, `standardCatalogVersionId`, `standardId`, `standardVersionId`.
- `designation` — `essential` or `not_essential`.
- `reason`, `recordedAt`, `recordedBy`.
- `chainRevision`, `supersedesEssentialStandardDesignationId`, `lifecycle` (`active`, `superseded`, or `void`).

Existing behavior supports course/catalog scope, not School Year or Section scope. P10B-A1 therefore freezes designation at Course plus exact catalog/standard version. It does not invent effective dates or yearly essential selections. A change appends a new chain head; correction/void never edits or deletes the prior designation. The current projection selects the latest valid chain head. No service may automatically promote a standard to essential.

### CurriculumMap

Stable identity for a course curriculum map.

- `curriculumMapId` — primary key.
- `courseId`, `mapCode`, `title`.
- `sourceAuthorityKey`, `sourceReference`.
- `lifecycle` — `active` or `retired`.
- revision/audit fields.

WT and AWT maps are distinct. A universal welding map is not inferred.

### CurriculumMapVersion

Immutable reviewed map publication.

- `curriculumMapVersionId` — primary key.
- `curriculumMapId`, `courseId`, `versionNumber`, `versionLabel`.
- `sourceHash`, `reviewManifestId`, `approvedAt`, `approvedBy`.
- `supersedesCurriculumMapVersionId`, `lifecycle`.
- immutable creation/audit fields.

Historical pacing plans retain their exact map version. A corrected or revised map creates a replacement version and new items/links; it never mutates an earlier version.

### CurriculumMapItem

Immutable ordered unit/item within one map version.

- `curriculumMapItemId` — primary key.
- `curriculumMapVersionId`, `courseId`.
- `parentCurriculumMapItemId` — nullable hierarchy for quarter/unit without encoding array position as identity.
- `itemType` — reviewed structural type such as the existing quarter or unit.
- `itemCode` — nullable source code.
- `orderPath` — deterministic ordered path within the immutable version.
- `timeframeText`, `focus`, `rawStandardsText`, `learningTargets`, `successCriteria`, `instructionalStrategies`, `assessmentText` — exact reviewed source content.
- `approximateDuration` — nullable; descriptive pacing only, never a mastery threshold.
- immutable creation/provenance fields.

`rawStandardsText` preserves ranges and prose such as `WT 1-4` when exact member links are not established. It must not be parsed into invented links.

### CurriculumItemStandardLink

Normalized immutable relationship from a map item to an exact StandardVersion.

- `curriculumItemStandardLinkId` — primary key.
- `curriculumMapVersionId`, `curriculumMapItemId`, `standardCatalogVersionId`, `standardVersionId`.
- `relationshipType` — reviewed relationship supplied by the manifest; no default is inferred.
- `reviewManifestId`, immutable audit fields.

### CurriculumItemCompetencyLink

Normalized immutable relationship from a map item to an exact P7 CompetencyVersion.

- `curriculumItemCompetencyLinkId` — primary key.
- `curriculumMapVersionId`, `curriculumMapItemId`, `competencyId`, `competencyVersionId`.
- `relationshipType` — reviewed relationship supplied by the manifest.
- `reviewManifestId`, immutable audit fields.

These links reference P7 authority and contain no competency name, statement, proficiency level, or conversion copy.

### SectionPacingPlan

Stable scoped plan identity and immutable baseline reference; current operational position is derived from events.

- `sectionPacingPlanId` — primary key.
- `sectionId`, `courseId`, `schoolYearId`, `semesterId`.
- `gradingPeriodId` — nullable because one plan may cross grading-period boundaries.
- `curriculumMapVersionId`.
- `status` — `draft`, `active`, or `closed`; activation and close are events/audited transitions.
- `createdFrom` — reviewed origin (`blank`, `curriculum_map`, or later approved template/lesson source); no P10B-A1 conversion data is implied.
- `revision` and audit fields used only for concurrency/lifecycle metadata.

At most one active plan exists for `(sectionId, semesterId)`. No record for a future Semester means exactly `unknown/not configured`; services must not synthesize a plan or copy the prior Semester.

### SectionPacingEvent

Append-first source of live Section sequencing and progress truth.

- `sectionPacingEventId` — primary key.
- `sectionPacingPlanId`, `sectionId`, `courseId`, `schoolYearId`, `semesterId`, nullable `gradingPeriodId`.
- `sequence` — monotonically increasing within the plan.
- `eventType` — bounded to retained actions: plan activation/close; item add/remove/reorder; anchor/Open Shop setting change; map position set/clear; planned-duration adjustment; completed/partial/not-started-move-forward/extend progress; and correction/void.
- `pacingItemId` — nullable stable identity introduced by the item-add event.
- `curriculumMapItemId` — nullable exact map item.
- `lessonPlanVersionId` — nullable reserved reference for P10C; P10B-A1 creates no Lesson authority.
- `instructionDate`, `effectiveAt`, `payload` — event-specific reviewed values; payload is validated by event type.
- `reason`, `recordedAt`, `recordedBy`.
- `supersedesSectionPacingEventId`, `chainRevision`, `lifecycle` (`active`, `superseded`, or `void`).

Events preserve instructor adjustments and actual progress without rewriting the plan. Correction appends a replacement/void event linked to the incorrect event. The deterministic projection folds nonvoid chain heads in sequence order. Derived forecast dates, completion risk, and current position are rebuildable and are not persisted as competing truth.

### SectionPacingSnapshot

Immutable closeout/readback record for Semester Transition, manual history capture, and recovery verification.

- `sectionPacingSnapshotId` — primary key.
- `sectionPacingPlanId`, `sectionId`, `courseId`, `schoolYearId`, `semesterId`, nullable `gradingPeriodId`.
- `curriculumMapVersionId`, `throughSequence`.
- `snapshotType` — `semester_transition`, `manual_history`, or `recovery_checkpoint`, matching retained workflows.
- `projection` — canonical serialized plan/item/current-position/duration/progress state.
- `projectionHash`, `createdAt`, `createdBy`, `reason`.
- `supersedesSectionPacingSnapshotId` — nullable only for an explicitly corrected snapshot; the original remains immutable.

Semester Transition closes/snapshots only an existing plan. An unknown future schedule produces no future pacing plan. Continue/fresh/end choices remain academic transition authority; pacing records only consume the resulting Section/Semester IDs and never create them.

## Why versions, links, and events are separate stores

- Mutable embedded standards would allow wording to change underneath historical maps and lessons.
- Embedded essential flags would erase who designated or corrected them.
- Mutable map item arrays would change historical ordering and references.
- Normalized Standard and Competency links provide referential checks and queryable coverage without copying owning records.
- Mutable Section plan arrays would lose adjustment, correction, and actual-progress history.
- Snapshots cannot replace events: snapshots support frozen closeout/readback while events explain the sequence that produced it.
- Events cannot replace immutable content versions: curriculum revision and classroom progress are different authorities.

## Proposed normalized stores and indexes

The names below are frozen for P10B-A2. `unique` and `multiEntry` refer to IndexedDB index behavior; compound keys are arrays.

| Store | Key path | Required indexes |
|---|---|---|
| `standard_catalogs` | `standardCatalogId` | `by_course` → `courseId`; `by_source` → `[sourceAuthorityKey, catalogCode]` unique; `by_lifecycle` → `lifecycle` |
| `standard_catalog_versions` | `standardCatalogVersionId` | `by_catalog` → `standardCatalogId`; `by_catalog_version` → `[standardCatalogId, versionNumber]` unique; `by_source_hash` → `[standardCatalogId, sourceHash]`; `by_lifecycle` → `lifecycle` |
| `standard_definitions` | `standardId` | `by_catalog` → `standardCatalogId`; `by_course` → `courseId`; `by_catalog_code` → `[standardCatalogId, externalCode]` unique; `by_lifecycle` → `lifecycle` |
| `standard_versions` | `standardVersionId` | `by_standard` → `standardId`; `by_catalog_version` → `standardCatalogVersionId`; `by_standard_version` → `[standardId, versionNumber]` unique; `by_lifecycle` → `lifecycle` |
| `essential_standard_designations` | `essentialStandardDesignationId` | `by_scope` → `[courseId, standardCatalogVersionId, standardVersionId]`; `by_standard` → `standardId`; `by_supersedes` → `supersedesEssentialStandardDesignationId`; `by_lifecycle` → `lifecycle` |
| `curriculum_maps` | `curriculumMapId` | `by_course` → `courseId`; `by_course_code` → `[courseId, mapCode]` unique; `by_lifecycle` → `lifecycle` |
| `curriculum_map_versions` | `curriculumMapVersionId` | `by_map` → `curriculumMapId`; `by_course` → `courseId`; `by_map_version` → `[curriculumMapId, versionNumber]` unique; `by_source_hash` → `[curriculumMapId, sourceHash]`; `by_lifecycle` → `lifecycle` |
| `curriculum_map_items` | `curriculumMapItemId` | `by_map_version` → `curriculumMapVersionId`; `by_parent` → `parentCurriculumMapItemId`; `by_order` → `[curriculumMapVersionId, orderPath]` unique; `by_course` → `courseId` |
| `curriculum_item_standard_links` | `curriculumItemStandardLinkId` | `by_item` → `curriculumMapItemId`; `by_standard_version` → `standardVersionId`; `by_map_version` → `curriculumMapVersionId`; `by_unique_link` → `[curriculumMapItemId, standardVersionId, relationshipType]` unique |
| `curriculum_item_competency_links` | `curriculumItemCompetencyLinkId` | `by_item` → `curriculumMapItemId`; `by_competency_version` → `competencyVersionId`; `by_map_version` → `curriculumMapVersionId`; `by_unique_link` → `[curriculumMapItemId, competencyVersionId, relationshipType]` unique |
| `section_pacing_plans` | `sectionPacingPlanId` | `by_section` → `sectionId`; `by_scope` → `[sectionId, schoolYearId, semesterId]`; `by_map_version` → `curriculumMapVersionId`; `by_status` → `status` |
| `section_pacing_events` | `sectionPacingEventId` | `by_plan` → `sectionPacingPlanId`; `by_plan_sequence` → `[sectionPacingPlanId, sequence]` unique; `by_section_effective` → `[sectionId, effectiveAt]`; `by_item` → `pacingItemId`; `by_curriculum_item` → `curriculumMapItemId`; `by_supersedes` → `supersedesSectionPacingEventId`; `by_lifecycle` → `lifecycle` |
| `section_pacing_snapshots` | `sectionPacingSnapshotId` | `by_plan` → `sectionPacingPlanId`; `by_section_semester` → `[sectionId, semesterId]`; `by_type` → `snapshotType`; `by_created` → `createdAt`; `by_projection_hash` → `projectionHash` |

The minimum structural target is therefore logical Schema 8, IndexedDB structural version **12**, and **67 stores**: the existing 54 plus these 13. P10B-A2 may stop if browser/platform validation proves an index cannot represent the frozen key shape, but it may not rename, merge, or remove these authorities without returning for design review.

## v7 reconciliation classification

| v7 authority | Disposition | Exact treatment |
|---|---|---|
| `TECHNICAL_STANDARDS` | `RECONCILE_AND_PORT` | Human-reviewed WT and AWT catalog manifest; exact code/wording/order/source hash; stable target IDs; unresolved source-photo differences stop affected rows. |
| `ESSENTIAL_STANDARDS` and matching essential booleans | `RECONCILE_AND_PORT` | Reconcile consistency, then create explicit course/catalog-version designation chains. No automatic selection. |
| `MASTER_CURRICULUM_MAPS` | `RECONCILE_AND_PORT` | Human-reviewed WT/AWT map/version/item manifest. Preserve exact raw standards text; create only verified Standard/Competency links. |
| `MASTER_LESSON_BANKS` | `RECONCILE_AND_PORT` in P10C, not A1/A2 | Retain as reviewed source for later Lesson authority. A1 records relationships only; no Lesson records are created. |
| `state.pacingPlans` | transactional records `DISCARD`; reusable definition candidate `UNRESOLVED` until manifest review | Do not import Section records, actual/forecast dates, or statuses. A reviewer may later identify an approved reusable sequence, but none is inferred from pilot data. |
| `state.sectionCurriculumProgress` | `DISCARD` | Do not import fictional current positions. Future production positions begin through authorized v8 events. |
| `state.pacingHistorySnapshots` | `DISCARD` | Do not import fictional history. Preserve the snapshot capability for new v8 authority. |
| `state.sectionArchives` | `DISCARD` for current records; concept split across owning authorities | Do not import fictional roster/Section/pacing archives. P4/P2 owns academic history; new pacing snapshots own future pacing closeout. |
| Legacy course-wide `state.curriculumProgress` | `DISCARD` | It is explicitly preserved only for legacy read/migration safety and does not control current Section position. |
| P7 competency definitions/versions | existing v8 authority; `RETAIN_OUTSIDE_V8` for this import | Reference exact P7 IDs/versions. Do not create a second competency catalog. |
| Teaching Tips derived from lessons | `RETAIN_OUTSIDE_V8` pending Resource authority | Preserve derivation with the future owning Lesson version; do not persist tips independently. |
| Resources | `UNRESOLVED` | No shared Resource identity, approval lifecycle, or populated catalog is sufficiently defined. P10B-A1 creates no Resource entity or store. |

Every `RECONCILE_AND_PORT` family requires a machine-readable, human-reviewed manifest with source identity/hash, proposed target ID, course scope, version, disposition, reviewer, and unresolved fields. This document authorizes no manifest execution or content import.

## Deterministic projections and correction semantics

1. Current standards resolve active catalog version → active definitions → latest valid immutable Standard versions → latest nonvoid essential designation chain head.
2. A Curriculum Map projection is one immutable `CurriculumMapVersion`, ordered by item `orderPath`, with normalized links joined by exact version IDs.
3. Historical consumers retain the exact catalog/map/standard/competency versions recorded at creation; later activation never rebases them.
4. Current Section pacing folds active event-chain heads through `by_plan_sequence`. Equal or repeated effective dates do not reorder events; sequence is authoritative display/fold order and does not invent event chronology beyond recorded order.
5. A correction appends a superseding or void event/designation. It cannot update the original record.
6. Map revision creates a new version and new immutable item/link set. Existing plans remain on the prior version until an explicit instructor action creates or revises a plan; no automatic migration occurs.
7. Snapshot readback verifies `throughSequence` and `projectionHash`. Snapshot correction appends a replacement snapshot while retaining the original.
8. Calendar eligibility and forecast dates are derived through P2/P3 academic/calendar projections. They are not embedded as a second calendar authority.

## Consumer interfaces

Later consumers must use read-only projections and command services rather than stores directly.

### Curriculum/Standards query interface

- `getCourseStandards({ courseId, catalogVersionId?, includeRetired? })`
- `getEssentialStandards({ courseId, catalogVersionId })`
- `getCurriculumMap({ courseId, curriculumMapVersionId? })`
- `getCurriculumItem({ curriculumMapItemId })`
- `getCurriculumCoverage({ curriculumMapVersionId })`

Returned records include exact stable/version IDs and provenance. Coverage distinguishes verified links from unresolved `rawStandardsText`; it never claims coverage from prose parsing.

### Section pacing query/command interface

- `getSectionPacing({ sectionId, semesterId, asOfSequence? })` — returns `configured: false` when no plan exists.
- `getSectionPacingHistory({ sectionId, semesterId })`
- `previewPacingCommand(command)` — validates scope/revision and returns before/after projection without write.
- `appendPacingCommand(command)` — writes one atomic event or correction chain with expected revision/sequence.
- `createPacingSnapshot({ sectionPacingPlanId, snapshotType, reason })`
- `previewSemesterPacingCloseout({ sectionId, fromSemesterId, toSemesterId? })`
- `closeSemesterPacing({ sectionId, fromSemesterId, choice, recoveryPointId, reason })`

### P10C Lesson Plan boundary

Lesson Plans may select exact `standardVersionId`, `curriculumMapItemId`, and `competencyVersionId` values returned by the query interface. A Lesson version may be referenced from a pacing item through `lessonPlanVersionId`. Lesson services may not edit Standards, Maps, essential designations, Section position, or pacing events. `MASTER_LESSON_BANKS` conversion, Lesson approval/versioning, and lesson-to-Activity/Evidence Opportunity behavior remain P10C decisions.

### Class Forecast boundary

Class Forecast consumes `getSectionPacing`, P2/P3 calendar context, and existing owning Project/Attendance/Booth projections. It may display derived forecast dates, current position, upcoming items, and risk. It persists no forecast row, pacing status, curriculum position, standard coverage, or readiness conclusion. Any approved action is sent as a pacing command to the owning service and returns the new authoritative projection.

## Recovery and P10B-A2 structural requirements

P10B-A2 must implement an ordered 11→12 migration that creates only the 13 frozen stores and indexes. It must update the exact store manifest, initialization/integrity validation, metadata and migration logs, backup/export/restore/readback/checksum coverage, protected-production compatibility inspection, isolated fixtures, and static contracts. Representative 54-store databases must preserve every existing store and byte-equivalent record. Failed/interrupted upgrade tests must prove the pre-upgrade protected recovery package remains restorable.

P10B-A2 remains structural only: no content manifests, curriculum imports, production upgrade, services, adapters, UI, Lesson Plans, or Forecast conversion.

## Unresolved decisions and explicit exclusions

- Verified external/source-photo reconciliation for the standards catalogs and any wording differences.
- Human-reviewed stable ID mapping for every approved standard, map, item, and relationship.
- Relationship types for each exact Curriculum→Standard and Curriculum→Competency link.
- Whether any v7 Section pacing sequence represents an approved reusable template. No template entity/store is frozen because the accepted runtime has no independent reusable pacing-template authority; auto-build schedules Lesson Bank entries into a Section transaction.
- P10C Lesson Plan identity, approval/version lifecycle, scheduling, and conversion manifests.
- Resource identity, approval lifecycle, catalog population, Lesson/Activity links, and delivery UI.
- Any pacing/mastery threshold, automatic advancement rule, universal WT/AWT sequence, calendar dates, future-semester schedule, or essential selection.
- Production import, real Student data, classroom authority transfer, dual write, publication, Samsung upgrade, and normal-UI reconnection.

## Exact P10B-A2 authorization required

Authorize **P10B-A2 — Curriculum, Standards & Section Pacing Structural Foundation** from the accepted P10B-A1 commit/tree. The authorization must explicitly permit logical Schema 8 to remain unchanged while IndexedDB advances from 11/54 stores to 12/67 stores by adding exactly the 13 stores and indexes frozen here. It must require complete manifest, initialization, integrity, migration, backup/export/restore/readback/checksum, compatibility, failed-upgrade, and recovery verification against isolated representative databases.

It must explicitly prohibit content reconciliation/import, production/Samsung database upgrade, runtime domain services, adapters/UI, Lesson Plan or Class Forecast conversion, real Student data, academic authority transfer, dual write, publication/deployment, and any store/schema change beyond the frozen 11→12 addition. Full P10B implementation resumes only after P10B-A2 is locally accepted and a later authorization supplies reviewed content manifests and service boundaries.
