# ARC P6 Navigation and Status Repair 1

Date: 2026-10-17

Status: local candidate prepared for independent review

Starting commit: `3711180314ac15040f0602b7bcd8ebf873f17551`

Starting tree: `0a6e8428e18fc8c40a0878dc4db6b5bb7b73f0db`

## Bounded correction

- Project checkpoint actions now refresh Fast Roster or Class Forecast without invoking the normal navigation cleanup that closes the active Student profile.
- The refresh keeps the same Student, Projects tab, project card, modal scroll position, page scroll position, and focus target. Explicit navigation continues to use the normal cleanup lifecycle.
- Initialize, Start, Ready for Review, Needs More Work/Reopen, Verify, and Undo use the same context-preserving refresh path.
- The default project status now renders as the explicit Titanium `arc-status-in-progress` treatment. Review and complete treatments remain unchanged.
- The active-notification count is now a labeled keyboard button. It opens the existing Notifications view and continues to count the existing active notification records without changing notification policy or data.
- The service-worker shell identity advances with `p6-navigation-status-repair-1` so a later, separately authorized publication can deliver the corrected normal page and project-card bytes through ARC's user-controlled update flow.

## Verification

- Focused P6 navigation/status suite: `6/6` passed.
- Project Checkpoint Card: `12/12` passed.
- Checkpoint/Fast Roster lifecycle: `3/3` passed.
- P6 Project/Technical authority adapter: `10/10` passed.
- Complete discovered JavaScript inventory: `155/155` files passed with full Git history.
- Static regression: `47/47` passed.
- Release manifest, transport, verified-asset routing, service-worker closure, release-channel preparation/distribution, and Pages contract checks passed; authority closure remains `103` assets.
- Changed-script and normal inline application parse checks passed; `git diff --check` passed.
- Installed Microsoft Edge rehearsal used a new task-owned profile, the real `/Arc-Pilot/` path, and fictional Test Scenario 1 data. Student Directory, Fast Roster, and Class Forecast retained the open Project card through the full checkpoint sequence and Undo. Computed In Progress colors were `rgb(216, 235, 255)` on `rgb(21, 52, 90)`. The labeled `2` button opened two real fictional Notifications. Landscape and portrait screenshots were captured.
- The retained isolated Edge recovery harness verified IndexedDB `14` / `74` stores, exact pre/post legacy-state SHA-256 equality, verified backup restore parity, offline cold restart, zero production Student/Enrollment/Schedule Assignment rows, and task-database cleanup.

## Authority and limits

Normal production transaction authority is unchanged. The repair does not change project data rules, notification records, Gradebook behavior, proficiency policy, database structure, package state, or recovery custody. No Samsung or production access occurred. No publication, deployment, release-channel update, real-Student authorization, or authority transfer occurred. Browser evidence is isolated local evidence and is not Samsung physical acceptance.
