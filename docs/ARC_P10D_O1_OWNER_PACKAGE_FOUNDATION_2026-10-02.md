# ARC P10D-O1 Owner and Package Foundation

**Date:** October 2, 2026  
**Classification:** local isolated v8 owner and durable package foundation  
**Starting authority:** `7b53660cb9b1aa84f734b9499ed2102a9c6e4087` / tree `e8bdf94611c201a994055e0496ef0c097f150e9c`  
**Rollback:** `rollback/pre-p10d-o1-owner-package-foundation-1`  
**Normal classroom authority:** Schema 7 / `V7_ONLY`

## Bounded result

P10D-O1 adds the storage and owner-service foundation needed for a later, separately authorized persisted rehearsal of the frozen P10D-R2 instructional package. Logical Schema remains 8. Local isolated IndexedDB authority advances from 13 to 14 and from 73 to 74 stores by adding only `instructional_content_packages`.

No real P10D-R2 member was persisted. All implementation tests use fictional synthetic records. No browser, production database, Samsung device, publication, deployment, normal ARC UI, build identifier, cache, service worker, or classroom authority changed.

## Durable package authority

`ArcV8InstructionalContentPackages` owns append-first execution history in `instructional_content_packages`:

- primary key: `instructionalContentPackageRecordId`;
- `by_package` on `packageId`, non-unique;
- `by_package_sequence` on `[packageId, sequence]`, unique;
- `by_package_type` on `[packageId, recordType]`, non-unique.

The event family is `PACKAGE_DECLARED`, `ATTEMPT_STARTED`, `PHASE_VERIFIED`, `ATTEMPT_FAILED`, `PACKAGE_VERIFIED_COMPLETE`, `PACKAGE_AVAILABLE`, and `PACKAGE_SUPERSEDED`. Projection state is derived from immutable ordered events. The declaration freezes the contract, payload, identity-map and evidence checksums/references, exact 859-role, 359-retained-link and 259-intentional-absence counts, canonical WT/AWT Course contexts, and source authorities.

Write gates admit only the current assembling attempt. Completion requires exact count and checksum agreement plus member-checksum, owner-readback, canonical-Course, evidence, conflict-absence, and backup/recovery verification. Ordinary reads remain closed until verified completion and explicit availability. Audit/reference reads require separate explicit authorization. Failure, retry, availability, and supersession append history instead of rewriting it.

## Owner contracts

Package imports preserve exact preallocated target identities and add `importPackageId` as execution provenance without changing ordinary authoring behavior.

- `ArcV8CurriculumPacing` accepts the frozen Standard Catalog, Catalog Version, Standard Definition, Standard Version, Essential designation, Curriculum Map, Map Version, Map Item, and Curriculum-to-Standard link records. It preserves official Course profile, official wording, parent/Webb evidence, unknown historical Essential selectors as null, reversible source shapes, quarter nullability, and retained-link provenance.
- `ArcV8Evidence` remains the sole Competency owner. Its bounded import path preserves exact Definition/Version identities and complete frozen fields. Imported versions are immutable. Ordinary identity injection remains unavailable, and ordinary Evidence/proficiency operations apply package visibility gates.
- `ArcV8LessonPlans` preserves exact Lesson Definition/Version and retained Standard/Competency links. Imported legacy Lessons remain `reference_only`, instructionally unaccepted, ordinary-scheduling ineligible, Auto Build ineligible, immutable preservation records, and contain no fabricated `teachingGuide`.
- Pacing, Lesson Bank, Planbook, Auto Build, Competency use, and other ordinary owner projections cannot expose unavailable package-bound records. Explicit audit/reference APIs remain separate.

## Migration, backup, and recovery

Migration `indexeddb-13-to-14` adds only the package event store and required metadata. Populated synthetic IDB-13 databases retain every existing store and record and begin with an empty package store. Injected upgrade failure preserves the complete IDB-13 authority and recovery path.

The 74-store backup authority includes package events in key mapping, inventory, per-store checksums, serialized readback, restore staging, activation, and parity. Synthetic package histories round-trip without cleanup of unrelated data. Production compatibility recognizes current 14/74 and historical protected 13/73, 12/67, 11/54, and 10/53 manifests without opening or upgrading production.

## Frozen R2 authority and limits

The exact 859-UUID identity map remains frozen at SHA-256 `7ba2956022875c03cc1bea1ee9ffa205fa78c204bfdc967c06c66fc5b1c3b750`. The corrected resolved payload remains SHA-256 `f1f7756242c1ef685ef4ce061507d03b8fc6834e0e448cde7510fc8e2ade79b1`. No UUID was allocated or replaced.

All 124 preserved legacy Lessons remain `reference_only`. The 259 optional relationships remain absent. The accepted 80 Curriculum-to-Standard, 228 Lesson-to-Standard, 51 WT Lesson-to-Competency, and zero AWT Lesson-to-Competency relationship decisions are unchanged.

The resolved R2 package remains `PROPOSED_UNPERSISTED`. Package completion is not instructional acceptance, classroom authority transfer, production acceptance, publication, or deployment.

## Next authorized boundary

After independent review, the next possible bounded task is one isolated persisted rehearsal of the exact frozen R2 package in a new dedicated nonproduction database. That future task requires verified pre-rehearsal recovery, phase-by-phase owner readback, conflict and failure/retry proof, full package completion gates, and complete backup/restore parity. It requires separate authorization.

The protected Samsung production foundation remains historically reported at Schema 8 / IndexedDB 10 / 53 stores. It was not accessed or changed.
