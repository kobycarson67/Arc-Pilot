# ARC Stage 14 P10B-UI — Curriculum Hub and Section Pacing UI

## Authority and boundary

P10B-UI starts from commit `7ebf5ea23982d7f33facbe4a3b2e4e2187043d4a`, tree `31a726ba84b03383a66f18003b8a4eeed9dee51b`. Logical Schema 8, local IndexedDB 12, 67 stores, and academic authority `V7_ONLY` remain unchanged. Isolated v8 verification is hard-bound to `arc_classroom_v8_p10b_verification`. Production `arc_classroom_v8` is neither opened nor upgraded.

## Exact retained v7 actions

| Existing action | Accepted behavior preserved |
|---|---|
| `renderCurriculumHub` | Switch WT/AWT, show the ordered master map, standards text, independent Section markers, selected Section context, Lesson Bank entry, and pacing-history entry. |
| `setSectionCurriculumPosition` / `clearSectionCurriculumPosition` | Confirm and change or clear one Section position without moving another Section. |
| `setCurriculumPosition` / `clearCurriculumPosition` | Retain readable legacy course-wide position compatibility. New normal UI remains Section specific. |
| `renderPacingPlanner` | Select a Section; display map position, queue, status, duration, actual and forecast dates, anchor, Open Shop option, completion monitor, and Lesson Bank actions. |
| `showAutoBuildPacing` / `confirmAutoBuildPacing` | Preserve the accepted v7 Lesson Bank sequence, replacement confirmation, duration models, completed history, and feedback under `V7_ONLY`. |
| `savePacingDuration` | Preserve completed-item refusal, actual dates, and remaining-period recalculation. |
| `updatePacingAnchor` / `togglePacingOpenShop` | Preserve calendar-derived forecast recalculation and explicit Open Shop choice. |
| `applyPacingStatus` | Preserve Forecasted, Partial, Completed, and Moved Forward behavior, actual date capture, remaining periods, and carry forward. |
| `movePacingItem` / `removePacingItem` | Preserve ordered queue movement, boundary refusal, confirmation, and forecast recalculation. |
| `createPacingHistorySnapshot` / `renderPacingHistory` | Preserve per-Section snapshots, Semester transition context, duration history, and course filtering. |

These normal handlers now pass through one `V7_ONLY` `ArcCurriculumPacingAuthorityAdapter.runLegacy` call. Each invokes exactly its existing Schema 7 operation. There is no v8 write, dual write, fallback write, or mixed projection on the normal classroom path.

## Isolated v8 adapter and UI architecture

`ArcCurriculumPacingUI` is a presentation controller over the exclusive adapter. `courseView` calls `getCourseStandards`, `getEssentialStandards`, `getCurriculumMap`, `getCurriculumCoverage`, `getSectionPacing`, and `getSectionPacingHistory`; `curriculumItem` calls `getCurriculumItem`. It retains exact P7 Competency version links returned by P10B and never copies definitions into UI state.

Pacing changes first read `getSectionPacing`, attach the authoritative plan revision and sequence, call `previewPacingCommand`, then call `appendPacingCommand`. Snapshots and Semester closeout call `createPacingSnapshot`, `previewSemesterPacingCloseout`, and `closeSemesterPacing`. Errors propagate without a legacy fallback. An absent future Semester returns `unknown/not configured`; the controller refuses to fabricate a plan.

The normal ARC shell loads and caches the P10B service, exclusive adapter, and controller. Build/cache authority ends in `parity-p10b-ui-1`. This local integration is not published.

## Isolated parity evidence

Clearly fictional WT and AWT fixtures verify course switching, standards filtering, explicit essential designation display, deterministic map ordering, exact Competency version references, independent Section positions, position/duration/reorder/correction commands, Semester and grading-period context, immutable history and snapshots, unknown future pacing, reopen behavior inherited from P10B, stale conflict propagation, preview-before-write, and exact agreement between UI projections and P10B results.

No `TECHNICAL_STANDARDS`, `ESSENTIAL_STANDARDS`, `MASTER_CURRICULUM_MAPS`, Lesson Bank, pacing template, or production instructional content is imported.

## Boundaries the existing UI cannot safely cross

Auto Build Remaining Sequence derives from `MASTER_LESSON_BANKS`, historical Lesson duration observations, and Lesson identities. P10B has no approved Lesson Plan authority and P10B-UI is prohibited from converting Lesson Plans. Therefore the accepted action remains fully available on the normal v7 path, while isolated v8 execution returns `LESSON_AUTHORITY_REQUIRED`. P10C must establish reviewed Lesson authority before that action can be v8 backed.

The v7 UI also presents forecast dates and completion risk using current calendar and Lesson Bank logic. Class Forecast conversion is not authorized here. Those derived presentations remain v7 only and no forecast-specific truth is stored in v8.

The UI does not provide safe authoring for immutable Standard/Catalog/Map versions or human-reviewed source reconciliation. Those administrative operations remain outside routine pacing actions and require a reviewed content manifest.

## Human content reconciliation still required

- Review and approve stable IDs and source versions for WT and AWT Standard catalogs and definitions.
- Review exact Standard wording, lifecycle, and WT/AWT applicability.
- Approve Essential Standard designations; none are inferred.
- Review Curriculum Map versions, ordered items, Standard links, and P7 Competency version links.
- Decide whether any reusable v7 pacing sequence is approved; transactional pilot progress remains discarded.
- Keep Resources unresolved and do not reinterpret Teaching Tips as Resource authority.

## Samsung physical verification

After an explicit future publication and isolated-verification authorization, verify installed PWA and direct Chrome: build/cache update; WT/AWT switching; standards and essential context; ordered map; independent Section positions; position advance/adjust/correction/history; Semester/quarter context; unknown future Semester; stale conflict; reload/reopen; portrait/landscape; background/foreground; and confirmation that `arc_classroom_v8` remains untouched. Samsung evidence is pending.

## Updated 47-row parity inventory

P10B-UI adds isolated UI evidence to `curriculum-standards` and `pacing`. Both remain `service-ready`, because normal classroom execution remains Schema 7 authority and no Samsung verification or v8 activation occurred. The inventory remains 39 `service-ready`, five `not-started`, and three `accepted`; no row is `ui-connected`.

| Capability | State |
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

## Recommended next dependency

P10C Lesson Plan authority is the correct next dependency. It must freeze and implement reviewed Lesson identities/versions and their Standard, Curriculum item, Activity, Evidence Opportunity, and later Resource boundaries before v8 Auto Build can reach action-for-action parity. P10C must not import content or resolve Resources without separate reviewed authority.
