# ARC Continuation Handoff

## Repository state

- Branch: `dev/v0.18-needs-attention`
- Pre-Project-Bank rollback checkpoint: `2eead96e94167b15d20839e7e1127c36c589771a`
- Current HEAD: the commit containing this handoff (`git rev-parse HEAD` is authoritative)

## Completed milestones

- Project checkpoint engine, presenter/cards, transactional persistence, history, undo, and autosave integration.
- Titanium visual foundation, Teaching Tips v1, Inventory v1, deployment/readiness hardening.
- Samsung tablet stabilization: overscroll protection, navigation restoration, direct attendance controls, sticky profile navigation, persistent competency/workplace feedback, and stable pass roster behavior.
- Booth Manager v1: booth/resource setup, assignment history, shared booths, period closure, issue warnings/override, and Fast Roster booth visibility.
- Project Bank v1 foundation: reusable definitions, independent student assignments, configurable stages/checkpoints, instructor-controlled needs, primary project context, clearance review/override, starter WT Level 1–2 content, and Fast Roster project/need visibility.
- Samsung manual update controls: Settings shows the running build and online/update state, performs an explicit service-worker update request, and applies only a verified waiting shell through controlled activation/reload without clearing classroom data.
- Pages deployment diagnosis: the public site remained on `main` commit `1b15374b32d0a189a18888af18a75fc5950e7377` while development advanced separately. The branch-based Pages source remains `main`/root; release now requires an explicit fast-forward promotion plus public-asset verification.
- Booth Manager Samsung repair: Booth Manager is a normal navigable class view rather than a viewport-blocking modal, its full list scrolls below the global header, and instructors can add or safely soft-remove booths while preserving resource/assignment history.
- Booth Manager repair physically verified on the Samsung tablet and closed.
- Checkpoint/Fast Roster refresh repair: Ready for Review derives a temporary Instructor Review need; Verify and Needs More Work persist their authoritative checkpoint transitions, refresh the underlying Fast Roster immediately, and preserve the instructor-selected operational need.
- Checkpoint/Fast Roster refresh physically verified on Samsung using Layout & Measurement → Verify → Fit-Up and closed.
- Student booth-assignment lifecycle repair: assignment, move, End Assignment, occupancy, persistence, and automatic closure use one authoritative history; after-period assignments are no longer erased by the immediate roster refresh; Booth Manager displays current occupants from that same state.
- Class Forecast v1: a deterministic, read-only class preparation view organizes current attendance, active-project, operational/derived need, booth, Project Bank, and checkpoint records into Class Pulse, Needs You Now, Up Next, and Shop Position without adding a second source of truth or claiming when work will occur.

## Active milestone

Publish and tablet-test Class Forecast v1 while retaining the still-required student booth-assignment physical lifecycle retest.

## Immediate settled decisions

- Fast Roster answers: Where are they? What are they doing? What do they need?
- Students can work at different stages and hold multiple assignments.
- Stages, current needs, checkpoints, difficulty, competency evidence, growth, and grades remain separate.
- Instructor ARC remains complete without ARC Student. Instructor override remains final.
- Existing repository standards data remains authoritative until source-photo reconciliation.
- Repository HEAD, regression success, and public Pages state must be verified independently. A green regression run does not prove deployment.
- Booth removal is confirmed and non-destructive: active assignments and unresolved issues block removal, while equipment and assignment history remain stored.
- Checkpoint records are authoritative workflow state. Fast Roster derives temporary review needs at render time; it does not persist a second need value. Derived instructor action takes temporary display priority and the instructor-selected operational need remains intact underneath it.
- Booth assignment history is authoritative for both Fast Roster and Booth Manager. Shared occupancy is allowed; passes do not alter booths; soft-removed booths are not assignable.
- Class Forecast is preparation context, while Fast Roster remains the live shop-floor list. Forecast derives every value at render time; `Ready to Work` is excluded from Needs You Now, and Up Next names only the next defined workflow requirement—not a prediction that it will occur today.

## Intentionally deferred

ARC Student, automatic level promotion, Growth Milestones UI, Advanced Welding Competition, automated Planbook/SLO generation, intelligent recommendations, automatic material ordering, full Titanium redesign, global Search, OneDrive/auth/encryption, and full Project Bank population.

## Important documents

- `docs/ARC_MASTER_PLAN.md`
- `docs/SAMSUNG_TABLET_TEST_2026-09-17.md`
- `docs/PROJECT_BANK_PROGRESSION_v0.18.md`
- `docs/ARC_CONTINUITY_LOG.md`

## Testing and next action

The repository's complete static and JavaScript regression suite is the code gate. Pages publishes `main` from the repository root, so a tested development commit must be deliberately promoted to `main`. The `ARC Pages Live Verification` workflow then compares public critical assets—including `src/class_forecast.js`—and build markers to that exact pushed commit. After it passes, verify build `class-forecast-v1` on the Samsung, test Forecast navigation/readability/authority agreement, and retain the full assignment/move/unassign/reload/Booth Manager agreement sequence. Automated verification makes the build deployed-ready; only physical passes close tablet findings.
