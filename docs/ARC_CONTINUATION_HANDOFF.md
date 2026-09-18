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

## Active milestone

Physical Samsung retesting of manual update discovery/application, followed by Fast Roster and Project Bank workflows, using fictional data only.

## Immediate settled decisions

- Fast Roster answers: Where are they? What are they doing? What do they need?
- Students can work at different stages and hold multiple assignments.
- Stages, current needs, checkpoints, difficulty, competency evidence, growth, and grades remain separate.
- Instructor ARC remains complete without ARC Student. Instructor override remains final.
- Existing repository standards data remains authoritative until source-photo reconciliation.

## Intentionally deferred

ARC Student, automatic level promotion, Growth Milestones UI, Advanced Welding Competition, automated Planbook/SLO generation, intelligent recommendations, automatic material ordering, full Titanium redesign, global Search, OneDrive/auth/encryption, and full Project Bank population.

## Important documents

- `docs/ARC_MASTER_PLAN.md`
- `docs/SAMSUNG_TABLET_TEST_2026-09-17.md`
- `docs/PROJECT_BANK_PROGRESSION_v0.18.md`
- `docs/ARC_CONTINUITY_LOG.md`

## Testing and next action

The repository's complete static and JavaScript regression suite is the release gate. After it is green, deploy a newer shell and verify Settings can check, report, and apply it on the installed Samsung PWA. Then retest portrait Fast Roster glanceability, class/individual assignment, clearance warnings, stage changes, current-need changes, primary-project switching, reload persistence, and Booth/Samsung behavior with fictional students.
