# ARC Stage 14 — Academic Authority Activation 1 Repair 1

Date: 2026-10-09
Status: local repair candidate; independent acceptance, publication, and physical activation remain required
Starting candidate: `7c1880136857bf5903b68f798e22203bb723431a` / `04fe1733aa29ce6f2af89cedb3634b4810d08865`
Published parent: `6ae89f9218dd307521c56936abca045c19dc0c9b`
Rollback references: `rollback/pre-academic-authority-activation-1` and `rollback/pre-academic-authority-activation-1-repair-1`

## Closed review findings

### AAA1-01 — authoritative schedule compatibility

The nonpersistent compatibility view now exposes numeric weekday keys and exact v8 Bell UUIDs. Normal schedule helpers fail closed when an authoritative Bell is absent and no longer assume legacy `regular` or `friday` identities. Friday retains `open_shop`; weekends and noninstructional days render without dereferencing a Bell.

### AAA1-02 — unknown future scheduling

A v8 Section enters the operational compatibility view only when an effective Section Placement exists for the requested date. Static `section.period` is never current operational truth. Planning also requires an effective Planning Placement. A known Semester 2 with no placements therefore remains honestly unconfigured.

### AAA1-03 — post-mutation convergence

Normal P3 and P4 routes use one `refreshAuthoritativeAcademicRuntime()` path after successful authoritative mutations. It reloads the shared projection, rereads the schedule owner, rebuilds the compatibility view, preserves only an effective selected Section, and hands rerendering back to the existing shell. A refresh error is surfaced and no stale cache is treated as ready.

### AAA1-04 — durable exact v7 rollback

Preparation captures exact raw `weld_v013` bytes into the dedicated `arc_academic_authority_v1_exact_v7_rollback` authority, with UTF-8 byte size and SHA-256. The activation marker binds that identity. Rehydration verifies it before issuing a gate; rollback restores only those retained bytes and does not accept caller supplied legacy JSON.

Whole-state protection freezes only academic and schedule families. Student domain payloads and the still-v7 Curriculum/Pacing fields `pacingPlans`, `sectionCurriculumProgress`, and `pacingHistorySnapshots` remain writable and persistent.

The retained rollback package can contain classroom data. It is for the authorized operator's protected recovery custody and must not be placed in shared Project Source exports.

### AAA1-05 — production-derived readiness

`ArcAcademicAuthorityActivationProduction` is inert until an explicit engineering action. Its readiness path opens only exact `arc_classroom_v8` and derives structural identity, protected mode, PACR lifecycle/fingerprints, zero classroom transactions, package state and package-bound row counts, reference-only Lesson policy, Backup/Recovery health, schedule semantics, future-placement absence, Semester Transition composition, and complete PACR identity bindings from existing owners and records.

The engineering-only page is outside normal navigation. It accepts exact expected publication commit/tree through the established publication URL binding, keeps those values read-only, and exposes inspect, recovery-gated prepare, exact-confirmation activation, status, and separately gated rollback. Normal `index.html` remains rehydration-only and does not load the production bridge.

## Authority boundary

Normal ARC remains Schema 7 / `V7_ONLY`. Attendance/Pass, Project/Technical, Competency/Evidence, Workplace/Safety/Behavior, Gradebook, Curriculum/Pacing, Lesson, Booth, media/artifacts, and every other later transaction owner remain `V7_ONLY`. There is no dual write and no Student production creation authority.

Build and cache identity ends `academic-authority-activation-1-repair-1`. Update activation remains instructor controlled; no install-time `skipWaiting` was added.

No Samsung or production database was accessed. No activation, PACR operation, package event, publication, deployment, or authority transfer occurred.

## Local verification

- Academic Authority Activation: `16/16`;
- Repair 1 adversarial integration: `5/5`;
- Academic Semester Transition: `5/5`;
- Schedule adapter: `8/8`;
- Academic Consumer Projection: `10/10`;
- PACR reconciliation/closure: `46/46`;
- Academic Structure: `22/22`;
- Academic Administration: `30/30`;
- Academic Cutover: `17/17`;
- Schedule Cutover Closure/oracles: `5/5`, including `50,000/50,000` exact resolver cases and the `2,500` case weekly matrix;
- Backup/Recovery: `20/20`;
- Production Academic Configuration: `10/10`;
- Schedule Configuration Migration: `17/17`;
- App Update Controller: `10/10`;
- Pages verification contract: passed;
- static regression: `47/47`;
- complete JavaScript inventory: `122/122`;
- modified JavaScript and normal inline-script parse checks: passed;
- `git diff --check`: passed.
