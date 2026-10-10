# ARC Stage 14 — Academic Authority Activation 1 Repair 3

Date: 2026-10-10

## Authority

- Starting commit: `d997357c249efccd9611d2904db4b908cfb6348e`
- Starting tree: `7a61a0e196f04c1ab5c1cb43818751130bac5ee5`
- Published parent retained: `6ae89f9218dd307521c56936abca045c19dc0c9b`
- Repair rollback: `rollback/pre-academic-authority-activation-1-repair-3`
- Normal classroom authority remains Schema 7 / `V7_ONLY`.

This local repair closes only R2-01 through R2-03 from the Repair 2 independent review. It does not activate academic authority or access production.

## R2-01 — current shell date is separate from mutation date

Schedule and academic adapters continue receiving the exact target or effective date required by each v8 mutation. After a successful mutation, the shared normal-shell refresh always reloads projection and compatibility for the actual local `dateKey()`.

Future Calendar Days, Calendar Events, Section placements, Planning placements, and academic effective dates therefore remain present in the complete authoritative summary without moving the classroom shell into a future Semester. An effective-today mutation remains visible immediately. Semester Transition does not force target scope before it is current.

## R2-02 — explicit activation write phase

Activation now progresses through:

1. `PREPARED`;
2. `REVALIDATING`;
3. `AUTHORITY_WRITE_STARTED` immediately before the activation-marker write;
4. `ACTIVATED` only after marker, hint, gate, and compatibility state succeed.

Readiness, exact baseline comparison, retained rollback verification, recovery-custody comparison, projection initialization, compatibility bootstrap, and final live-V7 verification are read-only gates. A failure in this region consumes preparation, invalidates the in-memory projection, restores only preparation-owned rollback-key metadata, and performs no v8 restore or live-V7 overwrite.

Once `AUTHORITY_WRITE_STARTED` is entered, a failure invokes the exact prepared v8 recovery, verifies restore parity, restores exact prepared V7 bytes, and restores the prior rollback key, hint, and marker.

## R2-03 — final exact live V7 verification

Immediately before `AUTHORITY_WRITE_STARTED`, activation rereads `weld_v013`, computes its exact UTF-8 byte size and SHA-256, and requires:

- byte equality with the prepared rollback authority;
- size equality with prepared, retained, and externally reloaded authority;
- SHA-256 equality with prepared, retained, and externally reloaded authority.

Mismatch fails with `STALE_V7_BASELINE`, leaves the changed live bytes untouched, performs no v8 restore, writes no activation marker or hint, and requires a completely new Prepare plus both recovery custody checks. The rollback package is never regenerated during Activate.

## Preserved boundaries

- Repair 1 and Repair 2 activation, recovery, identity, Bell, selected-Section, local-date, and fail-closed startup behavior remains intact.
- Unknown Semester 2 Sections and Planning remain unknown.
- Curriculum/Pacing and every P5–P10 transaction adapter remain `V7_ONLY`.
- Normal ARC remains rehydration-only; activation controls remain engineering-only.
- No permanent dual write, production Student creation, package event 13, or Lesson acceptance change exists.
- App update activation remains user controlled.
- Build/cache authority ends `academic-authority-activation-1-repair-3`.

## Verification

- Activation owner: `17/17`
- Repair 1 retained adversarial integration: `7/7`
- Repair 2 retained adversarial integration: `6/6`
- Repair 3 adversarial integration: `7/7`
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
- Complete JavaScript inventory: `124/124`
- Modified-script, normal inline-script, Pages contract, and diff checks passed.

## Boundary

No publication, deployment, Samsung or production access, PACR rerun, database mutation, physical activation, Student data, P5–P10 activation, dual write, package event 13, Lesson acceptance change, v7 shutdown, or authority transfer occurred.

Status: local Repair 3 candidate pending independent review.
