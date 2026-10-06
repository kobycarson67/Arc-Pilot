# ARC Schedule Mutation Resolution Audit

**Date:** 2026-10-05

**Authority reviewed:** Repairs 2–10 plus Schedule Cutover Closure Stabilization, the accepted exact-date resolver, and Backup/Recovery integrity validation

**Scope:** Bell Schedule, Weekly Schedule Mode, Calendar Day, and Date Override mutations

## Audit method

Each mutation path was checked for the state it proposes, the schedule records that can depend on that state, the resolver used before commit, transaction placement, failure behavior, and agreement with Backup/Recovery. Current/future means an active Calendar Day or Date Override whose `schoolDate` is today or later.

## Results

| Authority | Mutation paths | Resolution protection | Result |
|---|---|---|---|
| Bell Schedule | create; routine time edit; period-identity correction; lifecycle retirement | Project the complete state, resolve every affected exact date, and require the selected instructional Bell to cover each effective Section/Planning period. Valid time edits remain supported. | Closed by shared postcondition. |
| Weekly Schedule Mode | create; name; `week`; effective range; default status; lifecycle | Project the complete state and generate exact implicit-weekly candidates from every default-Mode/placement overlap; each candidate uses normal Override/Calendar/named/default precedence. | Closed by shared postcondition. |
| Calendar Day | create; school-date move; day/instruction/Bell/Mode correction; lifecycle correction | Project the complete state and resolve retained old/new authority with the accepted exact-date resolver. Shadow removal cannot expose broken authority. | Closed by shared postcondition. |
| Date Override | save/upsert/range; school-date move; day/instruction/Bell/Mode correction; lifecycle correction; clear | Project the complete state and resolve retained old/new authority with the accepted exact-date resolver. Range writes validate their final transaction state. | Closed by shared postcondition. |
| Section and Planning placement | create; move/swap; effective-boundary correction; Semester Transition | Project the complete transaction state and resolve every applicable explicit or implicit instructional date before commit. Placement remains a Bell-independent period identity. | Closed by shared postcondition. |

All protected failures occur before transaction commit. No fallback schedule is invented. Runtime mutation gates and Backup/Recovery now call the same `ArcV8BackupRecovery.validateProjectedScheduleState` postcondition, built around `resolveScheduleReference`. The fragmented weekly helper and separate dated/coverage validators were removed.

## Closure evidence

- deterministic independent resolver oracle: 50,000/50,000 agreement;
- precedence-aware implicit-weekly matrix: 2,500 cases, 0 false positives, 0 false negatives;
- shadow-removal regression: all five reproduced unsafe paths refused atomically; one valid removal remained editable;
- mutation state machine: 16 sequences, 192 transitions, 140 valid commits, and 52 atomic refusals, with runtime and Backup/Recovery agreement after every committed transition;
- static guard: one projected schedule validator remains in the academic administration mutation layer.

## Deliberately unresolved historical boundary

Readback behavior for a deliberately retired historical Weekly Schedule Mode remains `UNRESOLVED`. Repair 9 does not assign a policy, reinterpret retained history, or weaken the current/future protections that are already accepted.

## Authority boundary

This audit records local isolated-v8 evidence only. Normal ARC remains Schema 7 / `V7_ONLY`; no production database, Samsung device, academic configuration, Student data, publication, deployment, dual write, activation, or authority transfer was used.
