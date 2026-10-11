# Stage 14 — Academic Activation Effective Section Dependency Repair 1

**Date:** 2026-10-10
**Starting authority:** `99f7118fbb7761a888014b46992cc96d92af5dbb` / `72559907ba60c801bbf22ee8e6dccc3baf2c1f8b`
**Rollback:** `rollback/pre-academic-activation-effective-section-dependency-repair-1`
**Classroom authority:** Schema 7 / `V7_ONLY`

## Reproduced failure

The published activation engineering page loaded the academic projection without first loading `ArcEffectiveSectionContext`. Browser UMD execution has no CommonJS `require`, so the projection captured a null Effective dependency. The published script order reproduced the Samsung error `Cannot read properties of null (reading 'resolve')` when the authoritative projection path ran.

The failure occurs while activation is still `REVALIDATING`, before `AUTHORITY_WRITE_STARTED` and before the activation marker write. This repair does not claim independent byte parity for the physical protected database.

## Repair

- The engineering page loads a query-versioned Effective Section Context before the projection.
- Effective context, projection, activation coordinator, production provider, and controller share revision `academic-activation-effective-section-dependency-repair-1`.
- The service worker precaches both the normal unversioned Effective dependency and the complete versioned engineering set. Update activation remains instructor controlled.
- Effective context publishes its module revision.
- Projection construction and authoritative-cache creation reject a missing, stale, or incompatible Effective dependency with `ACADEMIC_EFFECTIVE_SECTION_CONTEXT_INCOMPATIBLE` and an App & Updates diagnostic.
- The activation owner independently requires the projection's exact Effective dependency contract.
- The page refuses to construct the production coordinator and disables every control when dependency compatibility fails.

## Verification

Focused tests reproduce the historical null `.resolve` failure, verify exact script order, refuse missing and stale dependency variants before writes, and preserve read-only `V7_ONLY` status behavior. Installed Microsoft Edge isolated-profile verification passed clean-current, populated-old-cache, and injected-missing-dependency scenarios using the actual service worker and page composition. The complete retained test inventory and static checks are recorded in the review package.

## Preserved boundaries

Repair 6 recovery behavior and Samsung Module Loading Repair 1 remain intact. No schema, database, PACR fingerprint, recovery checksum, activation confirmation, Student authorization, academic policy, transaction-domain authority, or normal UI changed. No publication, deployment, Samsung or production access, PACR rerun, recovery operation, or academic activation occurred.
