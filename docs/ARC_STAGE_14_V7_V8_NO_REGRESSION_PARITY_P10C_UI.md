# ARC Stage 14 P10C-UI — Lesson Plan Bank and Auto Build

## Authority and boundary

P10C-UI starts from commit `46c2e034ced7b58a46203d9427b8fe59eb228a67`, tree `4da4e518dceaf5219094dae8617cd627804b9ef9`. Rollback authority is `rollback/pre-stage-14-parity-program-p10c-ui`. Logical Schema 8, local IndexedDB 13, 73 stores, and academic authority `V7_ONLY` remain unchanged. No production database, real content, real Student data, publication, deployment, or Samsung device was accessed.

## Exact retained v7 actions

| Existing action | Accepted behavior preserved |
|---|---|
| `renderLessonBank` | WT/AWT switching, counts, title/standard/target search, numbered/reusable filters, Lesson details, and Add to Pacing entry. |
| `filterLessonBank` | Immediate client-side search/filter response without changing Lesson authority. |
| `scheduleLessonFromBank` / `confirmScheduleLesson` | Section choice and instructor-entered period duration for one selected Lesson. |
| `showAutoBuildPacing` / `updateHistoricalBuildPreview` | Numbered Lesson range, uniform/historical/latest/conservative duration choice, fallback periods, replace-unfinished choice, preview, date forecast, and duration evidence. |
| `confirmAutoBuildPacing` | Preserve completed items/history, optionally remove unfinished items, skip already-scheduled exact versions, and commit the accepted preview. |

Normal ARC routes each action through one `ArcLessonAuthorityAdapter.runLegacy` operation. Auto Build was removed from the P10B legacy wrapper to prevent nested authority operations. Under `V7_ONLY`, the existing Schema 7 behavior remains the only normal classroom mutation.

## v8 orchestration architecture

`ArcLessonPacingUI` is a stateless coordinator over the exclusive P10C Lesson and P10B Curriculum/Pacing adapters. Lesson Bank cards come from `getCourseLessons` and `getLessonPlanbookProjection`. Individual scheduling resolves the exact active Lesson Version and previews one P10B `ITEM_ADDED` event.

Auto Build reads only exact active numbered versions from `getAutoBuildEligibleLessons`, reads the configured Section plan from `getSectionPacing`, and builds a deterministic batch from the instructor's range, duration model, fallback, and replacement choice. P2/P3 calendar context is consumed through a read-only forecast projection. Forecast dates remain derived and are not persisted as authority.

P10B now exposes `previewPacingBatch` and `appendPacingBatch`. A preview is bound to plan revision, last sequence, commands, and a SHA-256 fingerprint. Commit revalidates the same revision/sequence and fingerprint, then appends every P10B event in one transaction. Completed pacing items cannot be removed. Every added Lesson must still be an exact active P10C Lesson Version in the Section Course. Stale or changed previews refuse without partial writes.

Auto Build persists no range, duration-model choice, forecast, or competing progress record. P10B Section pacing events remain the only placement truth. P10C Lesson records remain unchanged.

## Isolated parity evidence

Fictional fixtures verify WT/AWT switching; numbered/reusable filtering; search and displayed instructional/relationship fields; one-Lesson scheduling; numbered-range selection; uniform, historical, latest-year, conservative, and fallback durations; replacement of unfinished items; preservation of completed history; exact-version duplicate skipping; unknown future Semester refusal; cross-course refusal; deterministic preview; stale revision refusal; atomic commit/no partial write; P2/P3 forecast consumption; production-database rejection; one legacy mutation under `V7_ONLY`; and build/cache inclusion.

The existing P10B and P10C service tests continue to verify reload/reopen persistence, immutable Lesson versions, historical exact-version reads, pacing event derivation, transaction rollback, normalized Standard/Competency/Curriculum/Activity links, and absence of downstream Evidence or Gradebook effects.

## Reconciliation and unresolved boundaries

- Human review must assign real stable Lesson IDs and reconcile `MASTER_LESSON_BANKS`, duplicates, provenance, and exact WT/AWT version content.
- Exact Standard, Competency, Curriculum, Activity, and Evidence-declaration link manifests remain human-reviewed inputs.
- Resources and Teaching Tips authority remain unresolved; Teaching Tips were not reclassified as Resources.
- Lesson approval workflow, Weekly Focus, Weekly Plans, Plan Preflight, administrative documents, and external Planbook state remain outside this stage.
- Class Forecast conversion remains separate. Auto Build only consumes calendar projection and persists no Forecast truth.

## Updated 47-row parity inventory

P10C-UI adds isolated normal-interface and orchestration evidence. `lesson-plans` and `pacing` remain `service-ready` because production still executes Schema 7, real content is unreconciled, and Samsung verification and v8 activation have not occurred. The inventory remains 40 `service-ready`, four `not-started`, and three `accepted`; no row is `ui-connected`.

| Capability | State |
|---|---|
| `curriculum-standards` | `service-ready` |
| `lesson-plans` | `service-ready` |
| `pacing` | `service-ready` |
| `class-forecast` | `not-started` |
| `notifications` | `not-started` |
| `general-inventory` | `not-started` |
| `material-inventory` | `not-started` |

All other 40 rows retain the states recorded by P10C: 37 `service-ready` and three `accepted`.

## Samsung and next bounded stage

Samsung production remains at its separately accepted Schema 8 / IndexedDB 10 / 53-store authority. Later physical verification requires explicit publication and upgrade authority, a verified recovery point, ordered 10→11→12→13 migration, reviewed fictional or approved real instructional manifests, installed-PWA and Chrome tests for WT/AWT Bank navigation, search/filter/details, individual scheduling, all Auto Build choices, completed-history preservation, stale refusal, offline/reload, portrait/landscape, and proof that production isolation and `V7_ONLY` remain intact until cutover.

The recommended next bounded stage is a **human-reviewed instructional-content reconciliation manifest** for Standards, Essential Standards, Curriculum Maps, Competency links, Lesson definitions/versions, and approved Activity/Evidence-declaration links. It must decide stable IDs and duplicate dispositions without importing transactional pilot pacing or inventing Resources, future schedules, approval policy, or Class Forecast authority.
