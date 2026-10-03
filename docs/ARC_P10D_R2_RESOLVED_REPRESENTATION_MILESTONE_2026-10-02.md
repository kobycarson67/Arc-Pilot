# ARC P10D-R2 Resolved Instructional Representation Milestone

Date: 2026-10-02

Classification: bounded local pure representation implementation

Academic authority: Schema 7 / `V7_ONLY`

## Starting authority

- Branch: `codex/daily-teaching-first-slice-1-repair-1`
- Commit: `48b1f6f49145ae95f85fb020004697a2012dbcd3`
- Tree: `b0890b7fe114fedacc254ec2d0e928809af6f28e`
- Working tree: clean
- Rollback: `rollback/pre-p10d-r2-resolved-representation-1`
- Task branch: `codex/p10d-r2-resolved-representation-1`

The later Daily Teaching work was retained. It coherently contains the accepted P10D-P1 Repair 1 baseline and does not supersede R2.

## Implemented boundary

R2 freezes a versioned, proposed target-representation context for all 859 accepted instructional source roles and extends the pure P10D compiler with two separate operations:

1. one-time external allocation of opaque UUIDs into a proposed identity map;
2. deterministic resolution using explicitly supplied frozen context and identity-map bytes.

Compilation never allocates replacement identities. Missing, altered, duplicate, cross-course, incomplete, or stale identity authority is refused before output publication.

The resolved contract preserves:

- 29 official Standards with reviewed wording, parent statement, Webb level/label, and historical wording provenance;
- 10 Essential designations with recoverable accepted source-resolution and Essential-provenance evidence;
- 60 Competencies with exact category, order, Standards text, four levels, Student statement, and source provenance;
- 56 Curriculum items with exact quarter/order/timeframe/content and reversible missing/null/scalar/array source shapes;
- 124 legacy Lesson Versions with exact source meaning and initial `reference_only` availability;
- 80 Curriculum→Standard, 228 Lesson→Standard, and 51 WT Lesson→Competency links with exact endpoint rebinding;
- all 259 optional relationships as absent and nonblocking, including zero invented AWT Lesson→Competency links.

Legacy Lesson preservation remains distinct from instructional acceptance. These Lessons are excluded from ordinary new scheduling and Auto Build. The optional structured `teachingGuide` capability is recorded for future improved exact Lesson Versions without fabricating it on legacy rows.

## Package and recovery boundary

The proposed contract identifies the exact future package members, checksums, transition order, stale/conflict refusal, read gate, command gate, and availability-transition boundary. It does not add a store, modify Schema/IndexedDB, implement an owner service, or authorize a persisted rehearsal.

Resolved outputs are labeled `PROPOSED_UNPERSISTED` and `READY_FOR_OWNER_IMPLEMENTATION`. Remaining blockers are:

1. owner-service contract implementation;
2. durable package storage implementation;
3. command/read gate implementation;
4. atomic package recovery implementation;
5. a separately authorized persisted isolated rehearsal.

## Verification scope

The focused suite preserves all P1 Repair 1 assertions and adds independent route expectations, identity completeness/uniqueness, deterministic reuse, source-shape round trips, evidence recovery, endpoint rebinding, `reference_only` enforcement, and invalid-input/sentinel refusal coverage. Full repository static, parse, and JavaScript regression gates are required before the local commit.

No ARC database or browser service was opened. No content was imported. No runtime, normal UI, build/cache/service worker, schema/store, parity state, production, remote, deployment, or Samsung authority changed.

## Next boundary

Independent review of the R2 code and external artifacts is required. A future owner-service/package implementation needs separate authorization. Database rehearsal, import, publication, deployment, and classroom activation remain prohibited.

## Repair 1 qualification

Independent review accepted the R2 archive and deterministic identity replay but opened findings R2-01 through R2-05. Repair 1 closes those findings without changing the accepted 859 UUID allocations or any source, Standards, Essential, relationship, Lesson-availability, runtime, or authority decision.

### Corrected representation

- Every target record now places its exact frozen UUID in its declared primary-key field. Historical identifiers remain only in source identity and provenance.
- `targetContentHash` now hashes canonical semantic content and logical source endpoint meaning while excluding the role UUID and all rebound endpoint UUIDs. Independent valid allocations produce the same 859 semantic hashes; controlled content changes change the affected hash.
- Each Standard Catalog Version owns the exact accepted official Course profile: course number, `May 2022` label, prerequisites, credit text, and source-resolution decision. Standard Versions own wording, parent statement, Webb metadata, evidence reference, and historical wording provenance.
- All 15 role types now have machine-readable required target fields and translation rules. The resolved fields use owner-ready names and types while `sourceRecordExact`, source-shape companions, and provenance retain complete source meaning.
- Package `verified_complete` / `available` criteria now explicitly require 859 verified roles, 359 exact links, 259 confirmed absences, both canonical Course contexts, recoverable accepted evidence, owner projection/readback agreement, checksum verification, and absence of defined conflicts.

Competency `catalogId` is mechanically grounded as the exact accepted `COMP` source authority plus exact source Course (`COMP|wt` or `COMP|awt`). `domainCode` is the exact accepted source category. This defines no new catalog policy or store.

Legacy Lessons remain `reference_only`, instructionally unaccepted, unavailable to ordinary scheduling and Auto Build, and free of fabricated `teachingGuide` content. The repaired artifacts remain `PROPOSED_UNPERSISTED` / `READY_FOR_OWNER_IMPLEMENTATION`; package/storage/owner implementation and persisted rehearsal remain separate future authorization boundaries.
