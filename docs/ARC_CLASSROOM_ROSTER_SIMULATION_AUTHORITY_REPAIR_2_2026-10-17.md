# ARC Classroom Roster and Simulation Authority Repair 2

Date: 2026-10-17

Starting commit: `5f8739cfeee6ed9a1e1769168c162fd5f9b97354`

Starting tree: `240fcaf842da6090e723c1a6e10f603a6df51820`

Rollback: `rollback/pre-classroom-roster-simulation-authority-repair-2`

## Reproduced failure

Installed Microsoft Edge reproduced the release-readiness NO-GO after a fictional roster mutation and full page reload. `ArcSimulationFoundation.leave()` verified and restored the exact Live Classroom snapshot and removed the simulation marker. The following Live render failed in `currentScheduleContext()` with `Cannot read properties of undefined (reading 'name')`.

The cold Simulation startup correctly remained isolated and skipped protected academic database startup. After the verified snapshot restore, however, the page rendered the restored v8 Bell Schedule UUIDs while academic runtime selection still remained `V7_ONLY`. The legacy Bell lookup could not resolve that UUID.

## Bounded correction

`leaveSimulation()` now awaits the established `resolveAcademicAuthorityBeforeStartup()` path when the current page started in `SIMULATION_ISOLATED`. Rehydration occurs after the simulation manager has restored and validated the exact Live snapshot and before any Live navigation renders. The same accepted academic, Batch A, and Batch B owners and gates are reused. No database, schema, store, authority record, roster policy, scenario fixture, visual design, or update-system contract changed.

The failure message now distinguishes a still-active simulation from the narrower case where the Live snapshot was already restored but its academic context could not safely reopen.

## Verification

- Focused source and authority test: `6/6`.
- Installed Edge used the real `/Arc-Pilot/` path, normal `index.html`, a new task-owned profile, and an isolated 74-store fictional database.
- All five scenarios completed enter, fictional roster mutation, full page reload, awaited Leave Simulation, v8 academic rehydration, and exact in-memory Live state restoration without dialog suppression.
- Original live v8 checksum and exact Schema-7 bytes remained unchanged; live Student, Enrollment, and Schedule Assignment counts remained zero.
- The 74-store backup verified, restored with exact parity, and survived an offline cold restart under `V8_AUTHORITATIVE` academic authority.
- Complete JavaScript, static, parse, release-closure, Pages contract, and exact-byte checks are recorded in the review package.

## Boundary

This is a local Repair 2 candidate. Normal real-Student authorization remains false. No publication, release-evidence update, Samsung access, physical scenario reset, production database mutation, domain-authority transfer, or real Student use occurred.
