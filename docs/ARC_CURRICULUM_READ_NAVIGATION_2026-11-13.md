# Curriculum Read Navigation Repair — 2026-11-13

Local completion on c7f08a9 base; no deployment, production access or Samsung operation.

## Authority and bounded scope
Master Product Authority Curriculum/Standards and instructional-reference read boundary control this repair. It restores read-only Standards, instructor Essential selections and Curriculum Map reference, not pacing mutation, lesson acceptance, draft scheduling or Administration generation.

## Changes
- Live and unified startup construct Curriculum owner with the already established packageAuthority. Previously imported rows were correctly hidden because this dependency was omitted.
- Curriculum hub uses only the gated adapter getCourseStandards/getEssentialStandards/getCurriculumMap interfaces, exact Course and catalog version scope.
- Classroom Workflow Curriculum link chooses this read-only route under V8. Legacy mutation-capable hub remains blocked.
- Owner-unavailable and empty authorized results are visible without claiming preserved data is absent. No fallback to legacy maps or raw stores.
- DOM target identity prevents delayed course reads/errors replacing newer navigation.

## Verification
- 199/199 JavaScript test files; 47/47 static checks.
- Seven new focused tests for scope, gate failure, rendering/escaping, empty states, late navigation/course responses and composition.
- Fresh dedicated native Edge normal-shell fixture: WT 9 Standards, 4 Essentials, 29 map items; AWT 20, 6, 27. Workflow route, repeat course views, retained legacy block, package-closed invisibility and all-74-store equality pass (9 checks).
- Separate process reopen at 480x1000 repeated all nine checks, no horizontal overflow. Screenshots inspected at desktop and portrait sizes.
- Independent code review found no blockers; reviewer independently reran focused navigation and adapter suites, not native acceptance.
- Initial full-suite run hit two byte-pinned historical fixture checks because Windows checkout converted LF to CRLF. Exact 9220-byte committed blob was restored (SHA256 241e2ea9e159f07cbb08fae37025badaf009f10c2dbcd3ba979d9126b6ec1eee); full suite rerun passed. No source authority change is included.

## Limits and follow-up
No production release identity/manifest created. Samsung acceptance remains pending. Preserved Lesson-source viewer is separate: the legacy route also exposes mutation paths, so its guard was not removed. No section pacing editing added. Administration still needs owner-backed data and teacher-facing output; no report catalog invented.
Native evidence lives alongside this worktree under normal-shell-results; package gate denial was injected in the task-owned browser function only and restored, without database writes. All synthetic stores remained byte-equivalent across each acceptance pass.
