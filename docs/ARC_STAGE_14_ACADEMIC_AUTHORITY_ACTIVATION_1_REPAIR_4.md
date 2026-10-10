# ARC Stage 14 — Academic Authority Activation 1 Repair 4

Date: 2026-10-10

## Authority

- Starting commit: `5eeddd5027540d1e532b12ef3ef751caf9709d45`
- Starting tree: `9f71179dbfd193fe48d0cd9326b6c215f47ee717`
- Published parent retained: `6ae89f9218dd307521c56936abca045c19dc0c9b`
- Repair rollback: `rollback/pre-academic-authority-activation-1-repair-4`
- Normal classroom authority remains Schema 7 / `V7_ONLY`.

This local repair closes only R3-01 through R3-03 from the Repair 3 independent review. It does not activate academic authority or access production.

## R3-01 — authority-first cold startup

Normal startup now has one explicit authority barrier. Raw Schema-7 state is loaded without persistence, preupgrade recovery output is deferred, and only visual shell registration may occur before read-only production authority discovery. Marker, hint, retained rollback, projection, and compatibility rehydration resolve exactly `V7_ONLY`, `V8_AUTHORITATIVE`, or recovery-required failure before Booth cleanup, Schedule initialization, Technical synchronization, current-class shell identity, or any normal save can run.

`save()` refuses with `ACADEMIC_AUTHORITY_UNRESOLVED` outside simulation until the barrier resolves. Simulation bypasses production discovery and remains isolated. A marker/hint mismatch runs no academic-dependent initializer and performs no save.

## R3-02 — effective Section view

One normal-shell Section adapter now combines stable Section definition fields with `sectionContext.periodCode`. `activeSection()`, current-period lookup, dashboard, class dropdown, headers, Attendance, Booth, Grade, Project, Technical, Workplace, and other current-class consumers receive the effective placement period. The projection exposes a read-only `sectionContextForSection()` lookup so lists use the same authority. Static Section definitions are not rewritten and no second period truth is persisted.

## R3-03 — authoritative course scope

Compatibility state derives `course` from the selected effective v8 Section and clears current course when no effective Section exists. `operationalCourse()` is the shared current-class scope for headers, competency family, Grade, Project, Technical, Workplace, and Behavior consumers. Reusable library browsing uses the separately named non-authoritative `instructionalLibraryCoursePreference`; that preference cannot change current class authority.

## Preserved boundaries

- Repair 1–3 activation, recovery, custody, date, identity, Bell, mutation-refresh, and fail-closed behavior remains intact.
- Unknown Semester 2 Section and Planning placement remains unknown.
- Curriculum/Pacing and all P5–P10 transaction adapters remain `V7_ONLY`.
- Normal ARC remains rehydration-only; activation controls remain engineering-only.
- No permanent dual write, production Student creation, package event 13, or Lesson acceptance change exists.
- App update activation remains user controlled.
- Build/cache authority ends `academic-authority-activation-1-repair-4`.

## Verification

- Activation owner: `17/17`
- Repair 1 retained adversarial integration: `7/7`
- Repair 2 retained adversarial integration: `6/6`
- Repair 3 retained adversarial integration: `7/7`
- Repair 4 adversarial integration: `10/10`
- Academic Semester Transition: `5/5`
- P3 Schedule authority adapter: `8/8`
- P4 academic consumer projection: `10/10`
- PACR reconciliation/closure: `46/46`
- Academic Structure: `22/22`
- Academic Administration: `30/30`
- Academic Cutover: `17/17`
- Schedule Cutover Closure/oracles: `5/5`
- Backup/Recovery: `20/20`
- Production Academic Configuration: `10/10`
- Schedule Configuration Migration: `17/17`
- App Update Controller: `10/10`
- Static regression: `47/47`
- Complete JavaScript inventory: `125/125`
- Modified-script, normal inline-script, Pages contract, and diff checks passed.

## Boundary

No publication, deployment, Samsung or production access, PACR rerun, database mutation, physical activation, Student data, P5–P10 activation, dual write, package event 13, Lesson acceptance change, v7 shutdown, or authority transfer occurred.

Status: local Repair 4 candidate pending independent review.
