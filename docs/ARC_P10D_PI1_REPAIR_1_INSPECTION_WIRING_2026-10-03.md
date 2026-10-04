# ARC P10D-PI1 Repair 1 — Instructional Inspection Wiring

Date: 2026-10-03  
Scope: bounded Stage-2 engineering-controller repair and guarded publication  
Normal classroom authority: Schema 7 / `V7_ONLY`

## Starting authority

- Commit: `4b019f95ff6a4584ad68fbae528917cc222146ce`
- Tree: `c435d5e147f860a1086c981b086e6268aa88ca19`
- Local rollback: `rollback/pre-p10d-pi1-repair-1-inspection-wiring`
- Main-publication rollback: `rollback/pre-p10d-pi1-repair-1-main-publication`

## Confirmed defect

The Stage-2 action `inspectInstructionalImport` invoked `instructional.inspectProduction()`. The accepted `ArcV8InstructionalImportProductionPhysical` public API exports `inspectReadiness()`. The Samsung therefore loaded the PI1 bridge but the page controller called a method that does not exist.

## Bounded repair

- `inspectInstructionalImport` now invokes `instructional.inspectReadiness()`.
- No `inspectProduction` alias was added to the production physical bridge.
- The engineering page and service worker use controller query key `p10d-pi1-production-instructional-import-bridge-1-repair-1`.
- The production physical runtime revision remains `p10d-pi1-production-instructional-import-bridge-1`.
- `app-build.js`, normal `index.html`, database structure, package authority, import coordinator, frozen instructional artifacts, and normal ARC authority remain unchanged.

## Verification contract

The focused Stage-2 test executes the real page controller action with browser-shaped stubs. It requires exactly one call to `inspectReadiness()` and zero calls to `inspectProduction()`. Static and Pages verification additionally require the repaired query key and refuse the obsolete call in the published controller.

The full verification and publication evidence is recorded in the task closeout and exact-byte review export. No Samsung operation is part of this repair.

## Authority boundary

This repair changes only inspection wiring and controller cache identity. It does not authorize instructional import on Samsung, package availability, production database mutation, normal v8 activation, real Student data, or classroom authority transfer.
