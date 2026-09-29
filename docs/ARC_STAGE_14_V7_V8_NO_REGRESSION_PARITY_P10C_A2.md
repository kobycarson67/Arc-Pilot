# ARC Stage 14 P10C-A2 — Lesson Plan Structural Foundation

## Authority and boundary

- Starting authority: commit `2dd61c58c86b8ab8a9dd9315648c359a6a4720dc`, tree `7bfd6578d30d5f6dfd1ca5110c0a0c13ce6ace94`.
- Frozen design authority: `ARC_STAGE_14_V7_V8_NO_REGRESSION_PARITY_P10C_A1.md`.
- Rollback authority: `rollback/pre-stage-14-parity-program-p10c-a2`.
- Academic authority remains `V7_ONLY`.
- Logical schema remains Schema 8. Local isolated structural authority advances from IndexedDB 12 / 67 stores to IndexedDB 13 / 73 stores.
- The protected Samsung production database remains at its separately deployed Schema 8 / IndexedDB 10 / 53-store authority.

P10C-A2 is structural only. It imports no Lesson content and adds no Lesson repository, service, command, projection, UI adapter, Auto Build, Resource, Weekly Focus, Weekly Plan, Plan Preflight, approval, or Planbook behavior.

## Exact store contract

| Store | Primary key | Indexes |
|---|---|---|
| `lesson_definitions` | `lessonId` | `by_course(courseId)`; unique `by_course_code(courseId, lessonCode)`; `by_lifecycle(lifecycle)`; unique `by_source(sourceAuthorityKey, sourceRecordKey)` |
| `lesson_versions` | `lessonVersionId` | `by_lesson(lessonId)`; unique `by_lesson_version(lessonId, versionNumber)`; `by_lifecycle(lifecycle)`; unique `by_source_hash(lessonId, sourceHash)` |
| `lesson_version_standard_links` | `lessonStandardLinkId` | `by_lesson_version(lessonVersionId)`; `by_standard_version(standardVersionId)`; `by_catalog_version(standardCatalogVersionId)`; unique `by_unique_link(lessonVersionId, standardVersionId, relationshipType)` |
| `lesson_version_competency_links` | `lessonCompetencyLinkId` | `by_lesson_version(lessonVersionId)`; `by_competency_version(competencyVersionId)`; unique `by_unique_link(lessonVersionId, competencyVersionId, relationshipType)` |
| `lesson_version_curriculum_links` | `lessonCurriculumLinkId` | `by_lesson_version(lessonVersionId)`; `by_map_version(curriculumMapVersionId)`; `by_curriculum_item(curriculumMapItemId)`; unique `by_unique_link(lessonVersionId, curriculumMapItemId, relationshipType)` |
| `lesson_version_activity_links` | `lessonActivityLinkId` | `by_lesson_version(lessonVersionId)`; `by_activity_version(activityVersionId)`; `by_declaration(declarationId)`; unique `by_unique_link(lessonVersionId, activityVersionId, relationshipType)` |

No Lesson placement store exists. `section_pacing_plans`, `section_pacing_events`, and `section_pacing_snapshots` remain the only placement authority. The optional `lessonPlanVersionId` on a pacing event references an exact Lesson Version.

## Structural ownership and integrity

- Lesson Standard links reference exact P10B `standard_versions` and their exact `standard_catalog_versions`.
- Lesson Competency links reference exact P7 `competency_versions`.
- Lesson Curriculum links reference exact P10B `curriculum_map_versions` and `curriculum_map_items` whose version lineage agrees.
- Lesson Activity links reference exact P6 `activity_versions` and their matching evidence declaration.
- A superseding Lesson Version remains within one stable Lesson definition.
- Course lineage is validated across Lesson, Standard, Competency, Curriculum, and Activity records where the owning authority supplies it.
- Duplicate logical identities are rejected by structural indexes and backup integrity validation.

These validations enforce frozen references only. They do not select standards, competencies, curriculum relationships, activities, or instructional policy.

## Migration and recovery evidence

The ordered `indexeddb-12-to-13` migration adds exactly the six stores and records that exact store list in `migration_log`. A representative populated IDB-12 database retains all 67 prior stores, metadata, migration history, and sentinel records byte-equivalently at the record level; all six new stores begin empty.

Injected failure while creating the first Lesson store leaves the prior IDB-12 / 67-store database, metadata, migration history, and records recoverable, with no Lesson store and no `indexeddb-12-to-13` success record.

Backup authority now inventories all 73 stores, creates per-store SHA-256 checksums, verifies completed-package readback, audits exact Lesson parent/version lineage, restores through staging and atomic activation, and verifies post-restore parity. The portable filename identifies `schema8-idb13`.

## Production compatibility

The current local build requires IDB 13 when opening an authority through the current storage service. The protected Samsung production database remains IDB 10 / 53 stores and was neither accessed nor upgraded. A future publication and physical upgrade requires separate authorization, a verified pre-upgrade production recovery package, exact 10→11→12→13 migration verification on the published tree, post-upgrade 73-store integrity/readback, and confirmation that the six Lesson stores are empty. P10C-A2 grants none of that authority.

## Unresolved reconciliation boundary

- `MASTER_LESSON_BANKS` and runtime clones are not imported.
- Stable reviewed Lesson IDs and source-record mappings are not yet approved.
- Standard, Competency, Curriculum, and Activity link manifests remain human-review work.
- Duplicate/near-duplicate Lesson reconciliation remains unresolved.
- Lesson approval workflow, Resources, Teaching Tips classification, Weekly Focus, Weekly Plans, Plan Preflight, Administrative Document Engine, and Planbook integration remain unresolved or deferred as frozen in P10C-A1.
- `lesson-plans` remains `not-started`; structural storage is not service readiness.

## Exact P10C domain implementation authorization required

A later authorization must name this completed IDB-13 / 73-store authority and explicitly authorize isolated Lesson repositories/services only: stable definitions, immutable versions, append-first replacement/correction commands, exact normalized link commands, deterministic reads, stale-conflict and transaction rollback behavior, and an exclusive nonproduction adapter. It must continue to prohibit real Lesson import, production/Samsung access, normal UI reconnection, Auto Build activation, Resource authority, publication, academic authority transfer, dual write, and Stage 3 unless separately authorized.
