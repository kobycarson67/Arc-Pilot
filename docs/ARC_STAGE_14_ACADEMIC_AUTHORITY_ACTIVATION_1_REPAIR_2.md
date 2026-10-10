# ARC Stage 14 — Academic Authority Activation 1 Repair 2

Date: 2026-10-10

## Authority

- Starting commit: `0510c5515591a63c0628d634815c95e74eef7963`
- Starting tree: `5aa81a0c4d5db10126ec0dc356f5e6ab8f77c6df`
- Published parent retained: `6ae89f9218dd307521c56936abca045c19dc0c9b`
- Repair rollback: `rollback/pre-academic-authority-activation-1-repair-2`
- Normal classroom authority remains Schema 7 / `V7_ONLY`.

This local repair closes only the six blocking findings recorded in the Repair 1 independent review. It does not activate academic authority or access production.

## Closure evidence

### R1-01 — no authoritative schedule synthesis

`ensureScheduleModel()` now returns through the v8 authoritative path before any School Year, Semester, Planning, Section, Bell, period-time, weekly-mode, calendar, or override defaults can be created. Empty or unknown future-semester schedule authority remains empty.

### R1-02 — selected Section survives cold reload

Selection resolution accepts an exact reviewed source Section ID or its already-translated v8 UUID. Both resolve against the effective authoritative Section set. Display-name matching is prohibited, and a stored Section that is no longer effective resolves to `null`.

### R1-03 — marker and hint fail closed

Startup has three valid outcomes:

1. no production database and no hint: remain `V7_ONLY` without creating production;
2. production database present with matching marker and hint: rehydrate `V8_AUTHORITATIVE`;
3. every one-sided, malformed, or mismatched marker/hint state: refuse startup.

The production database existence check prevents a local hint from creating an empty production database and then silently falling back.

### R1-04 — exact activation-bound recovery

Rollback re-verifies the supplied v8 recovery package with Backup/Recovery and requires its package-integrity checksum to equal the checksum stored in the exact activation marker. A structurally valid recovery package with any other checksum is refused before restore.

### R1-05 — local school/device date

Production readiness and authoritative rehydration use a local `YYYY-MM-DD` provider based on local calendar components. UTC date slicing is no longer used. Weekday resolution uses local date construction, preserving the school/device date at UTC boundaries.

### R1-06 — explicit recovery custody

Prepare generates the verified v8 recovery and exact V7 rollback downloads, then remains activation-ineligible. The operator must reload both files. The owner re-verifies the v8 package and rehashes/reconciles the V7 package against the durable retained bytes. Only both successful load results make the one-use in-memory preparation activation-ready. A page reload discards that preparation and requires Prepare plus both custody checks again.

## Preserved Repair 1 architecture

- v8 Bell UUID compatibility and Friday shortened/Open Shop authority remain intact.
- Section context uses effective placements only.
- P3/P4 mutations converge through the centralized authoritative refresh.
- Exact retained V7 rollback bytes survive saves and reloads.
- Curriculum/Pacing and all P5–P10 transaction adapters remain `V7_ONLY`.
- The activation surface remains engineering-only; normal ARC is rehydration-only.
- No permanent dual write, production Student creation, package event 13, or Lesson acceptance change exists.
- Service-worker activation remains user controlled.

## Verification

- Academic Authority Activation owner: `17/17`
- Repair 1 retained adversarial integration: `7/7`
- Repair 2 adversarial integration: `6/6`
- Academic Semester Transition: `5/5`
- P3 Schedule authority adapter: `8/8`
- P4 academic consumer projection: `10/10`
- PACR reconciliation/closure: `46/46`
- Production Academic Configuration: `10/10`
- Schedule Configuration Migration: `17/17`
- Academic Cutover: `17/17`
- Schedule Cutover Closure/oracles: `5/5`
- Backup/Recovery: `20/20`
- App Update Controller: `10/10`
- Static regression: `47/47`
- Complete JavaScript inventory: `123/123`
- Modified-script and inline-script parse checks passed.
- Pages live-verification contract, `git diff --check`, and full-history execution passed.

## Boundary

No publication, deployment, Samsung or production access, PACR rerun, database mutation, physical activation, real Student data, P5–P10 activation, dual write, package event 13, Lesson acceptance change, v7 shutdown, or academic/classroom authority transfer occurred.

Status: local Repair 2 candidate pending independent review.
