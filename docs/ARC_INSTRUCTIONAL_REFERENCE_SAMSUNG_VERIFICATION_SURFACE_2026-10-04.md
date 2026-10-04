# ARC Instructional Reference Samsung Verification Surface

**Date:** 2026-10-04

**Milestone:** bounded engineering implementation

**Normal classroom authority:** Schema 7 / `V7_ONLY`
**Production execution:** not performed

## Purpose

This milestone adds a dedicated engineering-only, read-only page for a later instructor-authorized Samsung verification of the published Instructional Reference Read Boundary. It deliberately does not reuse the Stage-2 engineering surface, which contains upgrade, import, and package-availability controls.

The page is not part of normal ARC navigation and is not loaded by `index.html`. This milestone does not publish the page or authorize opening it against the physical production database.

## Read-only sequence

The surface exposes four ordered actions:

1. **Inspect exact structure** — native versionless inspection requires exact database `arc_classroom_v8`, IndexedDB 14, and the complete 74-store inventory. Absent, older, newer, missing-store, extra-store, and wrong-identity states fail before a versioned owner opens.
2. **Capture/download PRE backup** — after exact structural inspection, the accepted backup owner exports and reads back a verified recovery package for purpose `instructional-reference-samsung-pre-verification`. The surface reports its file SHA-256 and package-integrity SHA-256.
3. **Run reference verification** — the accepted `ArcInstructionalReferenceBoundary` performs Standards, Essential Standards, Curriculum Map/item, and coverage reads. The package and Lesson owners separately prove package and preserved-Lesson safety.
4. **Capture/download POST backup / verify nonmutation** — a second verified recovery package is compared with PRE across every canonical store count and checksum.

Loading the page constructs only inert JavaScript objects. It performs no IndexedDB open, package read, Curriculum read, Lesson read, backup export, or write. The versionless inspection connection remains open until the same-version storage owner connection succeeds, then closes.

## Exact accepted verification authority

- Database: `arc_classroom_v8`
- Logical Schema: 8
- IndexedDB: 14
- Stores: 74
- Total records: 891
- Package: `ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b`
- Package state: `available`
- Package events: exactly 12, ending in `PACKAGE_AVAILABLE`; event 13 must not exist
- Normal authority: `V7_ONLY`
- Classroom authority transferred: false
- Real Student data authorized: false
- Protection: `Production/Classroom Protected`

Owner-read expectations:

| Projection | WT | AWT |
|---|---:|---:|
| Standards | 9 | 20 |
| Essential Standards | 4 | 6 |
| Curriculum items | 29 | 27 |
| Ordinary Lessons | 0 | 0 |
| Auto Build Lessons | 0 | 0 |

Exactly 124 preserved Lesson Versions must remain `reference_only`, ordinary-scheduling ineligible, Auto Build ineligible, and without fabricated `teachingGuide`. Direct ordinary access must refuse with `LESSON_REFERENCE_ONLY`.

All stores outside the accepted base, Course, package-history, and imported instructional-role set must remain empty. This rejects unexpected Student, Enrollment, Section, schedule, pacing, grade, Evidence, Project, Workplace, Attendance, or other classroom transaction data.

## Nonmutation proof

PRE and POST verification packages must each pass package readback and database audit with zero errors and zero warnings. Every one of the 74 store manifests must retain the same record count and SHA-256 checksum. The migration-log checksum must remain unchanged. The final summary must still report IDB 14, 74 stores, 891 records, 12 package events, and `V7_ONLY`.

Backup timestamps and package-integrity values may differ because they describe the export packages. They are not database mutation evidence; canonical store checksums are controlling.

## Public surface and service-worker isolation

- Engineering page: `engineering/arc_instructional_reference_verification.html`
- Page controller: `engineering/arc_instructional_reference_verification_page.js`
- Read-only coordinator: `src/arc_instructional_reference_physical_verification.js`

The service worker gives this engineering navigation its own cache target and fallback. A navigation to the engineering path cannot replace cached normal `index.html`. Normal ARC routing and cache behavior are otherwise unchanged.

The Pages verification workflow is prepared for a later separately authorized publication by checking exact bytes for the page, controller, coordinator, and boundary; the engineering navigation route; and continued absence of the boundary/coordinator from normal `index.html`.

## Explicit exclusions

The surface exposes no upgrade, import, package availability, restore, reset/delete, Student, pacing mutation, Lesson mutation, competency/rating mutation, Evidence mutation, Project, Gradebook, or authority-transfer operation. It does not change `instructionalAvailability`, package history, storage structure, application build identity, the normal UI, or the 124 preserved Lessons.

Publication, deployment, Samsung access, production access, package mutation, normal-v8 activation, real-Student authorization, and authority transfer require later explicit authorization.

## Verification status

Local automated verification covers inert load, structural failures before owner creation, exact PA2-shaped read-only projections, package/Lesson safeguards, PRE/POST canonical checksum equality, writer-API absence, engineering navigation isolation, normal Schema-7/`V7_ONLY` isolation, and future Pages guardrails.

**Samsung physical verification: NOT PERFORMED.**

**Publication: NOT PERFORMED.**

**Classroom authority transfer: NOT PERFORMED.**
