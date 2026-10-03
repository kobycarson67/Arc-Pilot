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
