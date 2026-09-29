# Stage 14 P10B-A2 — Curriculum, Standards & Section Pacing Structural Foundation

## Authority and boundary

P10B-A2 starts from P10B-A1 commit `674f59a830c5da3ca4acbe304bc097e028091478`, tree `a5e6e066ed77e07db3f2446512eaa77fb5a8cfbc`. The A1 contracts are binding. Logical Schema 8 remains unchanged. Local isolated IndexedDB authority advances exactly from 11 to 12 and the manifest advances exactly from 54 to 67 stores. Academic authority remains `V7_ONLY`.

This milestone is structural only. It imports no Standards, Essential Standards, Curriculum Maps, templates, or Section progress. It implements no domain service, UI adapter, Lesson Plan, Resource, or Class Forecast behavior. The `curriculum-standards` and `pacing` parity states remain `not-started`.

## Exact added storage authority

| Store | Primary key | Indexes |
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

No index uses `multiEntry`. Only the indexes explicitly marked unique above enforce uniqueness.

## Ordered migration and preservation

`indexeddb-11-to-12` adds only the 13 stores and their frozen indexes, then records a succeeded migration entry and advances database metadata to structural version 12. The logical schema remains 8. Existing stores and records are not read, rewritten, reclassified, or migrated.

The migration tests begin with an IDB-11 database containing all 54 prior stores, prior metadata and migration history, an explicit Behavior record, infrastructure data, and a sentinel record in every prior domain store. Successful upgrade preserves every prior record while creating all 13 new stores empty. An injected failure during creation restores the IDB-11 version, exact 54-store set, metadata, prior migration history, and records; it leaves no `indexeddb-11-to-12` entry or partial instructional store.

## Integrity, backup, and recovery

The full 67-store manifest participates in deterministic export, per-store SHA-256 checksums, completed-package readback, compatibility inspection, restore staging, atomic activation, post-restore parity, and database integrity audit. Structural referential checks validate the frozen parent and exact-version relationships where they can do so without deciding content policy. Unique identity audits mirror the frozen unique indexes.

Isolated structural fixtures prove all 13 stores survive backup/readback/restore with exact parity. Missing structural parents fail integrity. Test-only relationship labels are fixture data and do not establish product policy.

## Protected production compatibility

The already initialized Samsung `arc_classroom_v8` remains untouched at Schema 8 / IndexedDB 10 / 53 stores. Production initialization inspection recognizes its historical 10/53 manifest and the P8A 11/54 manifest after a future ordered upgrade, without rewriting either manifest. Publishing code that opens production at structural version 12 would invoke the ordered 10→11→12 upgrade, so publication and physical upgrade require separate authorization, a newly verified recovery point, exact deployed build verification, protected preflight, and Samsung readback. This milestone performs none of those actions.

## Unresolved authority retained from P10B-A1

- Source-photo differences and affected Standard rows require human reconciliation.
- Stable target IDs and every Standard/Curriculum/Competency mapping require a reviewed manifest.
- Curriculum relationship types are not inferred.
- Essential Standard selections remain explicit instructor/admin decisions.
- Reusable pacing template candidates remain unresolved; transactional pilot progress is discarded.
- Future Semester schedules and pacing may remain unknown and unconfigured.
- Resources remain unresolved.
- Lesson Plan conversion and Class Forecast consumption remain later bounded work.

## Next bounded authorization

P10B domain implementation requires a new explicit authorization from this exact committed structural authority. That authorization may implement isolated Curriculum/Standards and Section Pacing repositories, immutable version services, designation/event correction chains, deterministic projections, and exclusive `V7_ONLY` verification adapters against a named nonproduction database. It must keep production untouched, import no content without separately approved reviewed manifests, preserve unknown future semesters, avoid UI/Lesson/Forecast/Resource scope unless separately authorized, stop before any further structural change, and leave `curriculum-standards` and `pacing` below UI-connected/accepted until normal ARC and Samsung evidence exist.
