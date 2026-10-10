# ARC Stage 14 — Academic Authority Activation 1 Repair 5

Date: 2026-10-10

## Authority

- Starting commit: `53f4582eeb9a9ec3de39ee52305799b839ef261d`
- Starting tree: `b3fc8f42104203664a317df197f40db39c8d8899`
- Published parent retained: `6ae89f9218dd307521c56936abca045c19dc0c9b`
- Repair rollback: `rollback/pre-academic-authority-activation-1-repair-5`
- Normal classroom authority remains Schema 7 / `V7_ONLY`.

This local repair closes only R4-01 through R4-03 from the Repair 4 independent review. It does not activate academic authority or access production.

## R4-01 — authoritative Academic Structure

The shared P4 snapshot now includes Grading Periods. Under `V8_AUTHORITATIVE`, the normal compatibility state reconstructs School Year, known Semesters, nested Grading Periods, and `currentSemesterKey` from v8 records. Source keys come only from the activation-owned durable identity bindings. Labels, dates, ordering, and Calendar Event titles cannot supply identity.

The retained Schema-7 Academic Structure remains only in the exact rollback dataset. Authoritative refresh reloads bindings and v8 records before rebuilding Schedule Setup. Immediate reads and cold reloads therefore converge on the same v8 structure while an absent future Section or Planning placement remains absent.

## R4-02 — durable evolving identity bindings

The activation marker is the single revisioned post-activation binding owner. It starts with the exact PACR bindings, validates targets against their owning v8 stores, preserves established mappings, and refuses remapping or duplicate targets.

Later explicit Semester and Grading Period creation follows one recovery-gated create, bind, readback, and refresh sequence. Repeating the same source key resolves its existing UUID. A creation or binding failure restores the complete verified pre-change v8 package, including the activation marker and binding revision.

Section translation, activation rehydration, Academic Structure projection, Semester Transition targeting, and the normal shell all consume this owner rather than independent mutable copies.

## R4-03 — transitional Backup and Restore

`V7_ONLY` keeps the accepted `WeldingClassroomBackup` workflow unchanged. Under `V8_AUTHORITATIVE`, normal export creates one SHA-256-bound transitional package containing:

- the complete verified Schema 8 / IDB 14 v8 recovery package;
- the exact still-V7 `weld_v013` transaction and rollback-compatibility bytes;
- activation-marker and durable-binding identity.

Restore verifies the whole package before mutation, creates a verified two-authority recovery point, restores v8, restores exact V7 bytes, verifies marker/bindings, and rehydrates the authoritative shell before success. Any failure restores both pre-import halves. The browser pre-import rollback uses the same complete package. Legacy V7-only backup import fails closed under v8 authority.

## Preserved boundaries

- Repair 1–4 activation, custody, lifecycle, authority-first startup, effective Section, course-scope, and refresh behavior remains intact.
- Unknown Semester 2 Section and Planning placement remains unknown.
- Curriculum/Pacing and all P5–P10 transaction adapters remain `V7_ONLY`.
- Real Student data remains unauthorized; no permanent dual write exists.
- Normal activation controls remain engineering-only and production is untouched.
- Bell subtitles use authoritative semantic/name metadata rather than legacy IDs.
- App update activation remains user controlled.
- Build, shell, cache, activation module, production provider, and engineering page revisions end `academic-authority-activation-1-repair-5`.
- Historical retired Weekly Schedule Mode readback remains `UNRESOLVED`.

## Verification

- Activation owner: `17/17`
- Repair 1 retained adversarial suite: `7/7`
- Repair 2 retained adversarial suite: `6/6`
- Repair 3 retained adversarial suite: `7/7`
- Repair 4 retained adversarial suite: `10/10`
- Repair 5 adversarial suite: `14/14`
- Academic Semester Transition: `5/5`
- P3 Schedule adapter: `8/8`
- P4 academic consumer projection: `10/10`
- Academic Structure: `22/22`
- Academic Administration: `30/30`
- Academic Cutover: `17/17`
- PACR reconciliation/closure: `46/46`
- Schedule Cutover Closure/oracles: `5/5`
- Backup/Recovery: `20/20`
- Production Academic Configuration: `10/10`
- Schedule Configuration Migration: `17/17`
- App Update Controller: `10/10`
- Static regression: `47/47`
- Complete JavaScript inventory with full Git history: `126/126`
- Pages contract, modified-script parse, normal inline-script parse, and diff checks passed.

## Boundary

No publication, deployment, Samsung or production access, PACR rerun, database mutation, physical activation, Student data, P5–P10 activation, dual write, package event 13, Lesson acceptance change, v7 shutdown, or authority transfer occurred.

Status: local Repair 5 candidate pending independent review.
