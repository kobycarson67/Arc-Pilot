# ARC Schedule Cutover Closure Stabilization

**Date:** 2026-10-05

**Starting authority:** `4fb24a9828c902219a7f4b6bbe43533aea95155a` / `e5399039e079e3b65f14b1fc7d7bb86fa7989d07`

**Rollback:** `rollback/pre-schedule-cutover-closure-stabilization-1`

**Authority state:** Schema 7 / `V7_ONLY`

## Scope completed

Schedule validation now has one projected-state postcondition: `ArcV8BackupRecovery.validateProjectedScheduleState`. The postcondition delegates each candidate date to the accepted exact-date resolver, then verifies required effective Section and Planning period coverage. Academic Administration uses it for every schedule-resolution-affecting transaction; Backup/Recovery uses it for integrity audit.

The root cause was fragmented enforcement around an already-correct exact-date resolver. Separate dated-reference and implicit-weekly helpers applied different precedence and shadowing assumptions, so otherwise valid weekly states could false-fail and higher-precedence record removal could expose invalid fallback authority without validation.

The consolidated postcondition covers Bell and Weekly Schedule Mode changes, Calendar Day and Date Override creation/correction/retirement/clear/range operations, Section and Planning placement creation/movement/correction, academic-boundary corrections, and Semester Transition. Batch operations validate the final projected transaction state rather than rejecting safe intermediate order.

## Deterministic verification

| Gate | Result |
|---|---:|
| Independent exact-date resolver oracle | 50,000 / 50,000 agreement |
| Precedence-aware implicit-weekly matrix | 2,500 cases; 0 false positives; 0 false negatives |
| Unsafe shadow-removal paths | 5 / 5 refused atomically |
| Valid shadow removal | 1 / 1 committed |
| Mutation state machine | 16 sequences; 192 transitions; 140 commits; 52 atomic refusals |
| Stabilization focused suite | 5 / 5 |

The state machine validates the shared postcondition, runtime schedule reads, Backup/Recovery integrity, rollback behavior, and audit/store equality after rejected transactions.

## Preserved authority

- Repairs 2–10 remain in force.
- Bell times remain editable, and Section/Planning placement remains independent of a Bell template.
- PD, holidays, no-school days, other noninstructional days, and No Instruction do not become teaching days.
- Normal ARC remains Schema 7 / `V7_ONLY`; no production database, Samsung device, academic configuration, Student data, dual write, v8 activation, publication, deployment, or authority transfer was used.
- Deliberately retired historical Weekly Schedule Mode readback remains explicitly `UNRESOLVED`.

The earlier narrow Repair 11 proposal is superseded by this consolidated closure stabilization and is not an executed authority.

## Next boundary

The next boundary is independent review of this local commit and exact-byte export. Publication, Samsung verification, production academic configuration, Student data, v8 activation, and classroom authority transfer each require separate authorization after that review.
