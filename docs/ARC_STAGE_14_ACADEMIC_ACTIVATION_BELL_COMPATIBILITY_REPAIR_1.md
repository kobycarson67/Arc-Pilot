# Stage 14 — Academic Activation Bell Schedule Compatibility Repair 1

**Date:** 2026-10-11
**Starting authority:** `d7b25ac93898efec3e8b93fcd5db814dfe2b3fd6` / `3835e3e02879be40da067567afdb6769b086e08a`
**Rollback:** `rollback/pre-academic-activation-bell-compatibility-repair-1`
**Classroom authority:** Schema 7 / `V7_ONLY`

## Reproduced defect

The accepted weekly Schedule Mode correctly stored Sunday and Saturday as `null`. The activation compatibility projection replaced each null entry with `{}`, creating a truthy plan with no Bell identity. On Sunday 2026-10-11 the production compatibility gate treated that invented plan as instructional Bell authority and returned `AUTHORITATIVE_BOOTSTRAP_FAILED` before the activation marker write.

The established schedule resolver independently classified that date as `no_school` with instruction mode `none`. No Sunday schedule was missing because none was configured or required.

## Bounded correction

- Compatibility projection now preserves explicit null weekly entries as null.
- Default Bell selection ignores null weekly entries safely.
- The production preactivation check uses the already resolved authoritative current day type, instruction mode and Bell identity.
- A noninstructional day does not require a Bell Schedule.
- An instructional day still requires its exact resolved active Bell identity and fails closed before authority write if the identity is absent or unresolved.
- Friday remains shortened Open Shop. Explicit instructional overrides, including the two-hour-late Bell, validate against their own resolved Bell rather than an unrelated weekly default.
- Only the changed activation owner and production provider receive cache revision `academic-activation-bell-compatibility-repair-1`; the accepted Effective Section, projection and controller compatibility set remains unchanged.

## Verification boundary

Fictional isolated tests reproduce the published null-to-truthy transformation, exercise the actual production provider and activation prewrite path, cover Sunday/Saturday, Monday through Friday, Friday Open Shop, explicit noninstructional overrides, two-hour-late instructional overrides, missing/unknown Bell references, unknown future Semester placement and exact engineering/cache composition. The retained activation, recovery, PACR, schedule, backup and repository regression inventory remains required before closeout.

## Preserved authority

No schedule, calendar or academic configuration changed. No Sunday schedule was invented. No schedule-integrity rule was weakened. Repair 6 recovery, Samsung Module Loading Repair 1, Effective Section Dependency Repair 1, PACR identity/fingerprint authority, zero-Student restriction, package/Lesson boundaries and all P5–P10 `V7_ONLY` transaction boundaries remain intact.

No publication, deployment, Samsung or production access, PACR rerun, recovery preparation or academic activation occurred. This local candidate requires independent acceptance before any publication consideration.
