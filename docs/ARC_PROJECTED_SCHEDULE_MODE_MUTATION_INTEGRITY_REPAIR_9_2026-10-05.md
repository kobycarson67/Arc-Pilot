# ARC Projected Schedule Mode Mutation Integrity Repair 9

**Date:** 2026-10-05

**Starting authority:** `f2f91060b14b5e4c76e97634340a2d5dd687da14` / `46b5330d3afaf0874f4915bf3b0dc359dded955b`

**Rollback:** `rollback/pre-academic-administration-schedule-parity-repair-9`

**Normal classroom authority:** Schema 7 / `V7_ONLY`

## Purpose

Repair 9 closes the remaining current/future mutation gap for Weekly Schedule Modes. Before a Mode correction commits, ARC projects the proposed Mode together with all retained schedule authority and resolves every active Calendar Day and Date Override dated today or later. The transaction refuses the edit when any dependent date would become unusable or ambiguous.

## Implemented authority

- Mode corrections continue to support valid changes to Bell templates, instruction modes, effective ranges, default status, lifecycle, and ordinary metadata.
- Changes to `week`, `effectiveFrom`, `effectiveTo`, `isDefault`, or `lifecycle` trigger the complete projected-date validation.
- Resolution uses the shared Repair 8 resolver and its accepted precedence: Date Override, Calendar Day, named Schedule Mode, unique default Mode, weekday entry, and direct Bell authority.
- Failure is atomic and reports the dependent record type, identity, date, resolver reason, Mode identity, and Bell identity.
- Pure name corrections remain valid because they do not affect schedule resolution.
- The same projected validation now protects Calendar Day and Date Override corrections and Date Override clearing when changing one dated record could expose or strand its counterpart on the old or new date.

## Preserved boundaries

- The deliberately retired historical Weekly Schedule Mode readback question remains `UNRESOLVED`.
- Normal ARC remains Schema 7 / `V7_ONLY` and keeps one accepted legacy mutation path.
- No Schema, IndexedDB, store, build, cache, service-worker, normal UI, production, Samsung, package, Student, or authority-transfer change is part of this repair.

## Verification contract

Focused coverage proves invalid Mode edits are refused without mutation; valid Bell, instruction-mode, range, and default changes still work; runtime and Backup/Recovery resolution agree; adjacent Calendar Day and Date Override mutations cannot strand current/future dated authority; and retained historical policy remains unchanged.
