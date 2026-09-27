# ARC Schema v8 Stage 5 — Evidence Engine Foundation

Stage 5 advances the isolated `arc_classroom_v8` database from IndexedDB structural version 4 to 5. ARC schema authority remains 8, classroom runtime remains schema 7, and application version remains 0.18. No classroom interface reads this foundation.

## Persisted stores and indexes

| Store | Key | Indexes |
|---|---|---|
| `competency_definitions` | `competencyId` | multi-entry `by_course`; unique `by_catalog_code`; `by_lifecycle` |
| `competency_versions` | `competencyVersionId` | `by_competency`; unique `by_competency_version`; `by_lifecycle` |
| `competency_strategy_configurations` | `strategyConfigId` | `by_competency_version`; unique `by_competency_strategy_version`; `by_family` |
| `evidence_sources` | `sourceId` | `by_student`; `by_enrollment`; `by_source_type`; `by_occurred_at`; `by_student_activity`; `by_project` |
| `evidence_records` | `evidenceRecordId` | `by_source`; `by_competency`; `by_qualification`; `by_lifecycle` |
| `instructor_overrides` | `overrideId` | `by_student`; `by_competency`; `by_scope`; `by_lifecycle` |

The ordered `indexeddb-4-to-5` upgrade preserves all Stage 1–4 stores and records. No derivation-result store exists because derivation is disposable and rebuildable.

## Competency catalog and versions

A competency definition has an immutable ID, catalog identity, stable code, domain code, Course applicability, lifecycle and provenance. Code and title are not database identity. Codes are unique within catalog authority. A version preserves title, definition, catalog version and provenance. Used wording is historically locked; changed wording requires another version.

Stage 5 does not port the v7 competency catalog or student ratings and does not populate Year-One curriculum mappings.

## Evidence Source and Evidence Record

An `EvidenceSource` is one actual student performance or event. It identifies exactly one Student and Enrollment, occurrence and recording authority, explicit academic scope/context, and validated Activity Attempt or Project lineage when applicable. It stores no official competency conclusion or global count flag.

An `EvidenceRecord` is exactly one competency claim from one Source. It references the exact competency version and optional Activity Evidence Declaration, and stores demonstrated level, qualification, mode, criterion/result references, typed context, explicit diversity and reassessment relation. One Source may support multiple Records, each concerning one competency.

The qualifications are Qualifying, Supporting, Nonqualifying and Excluded. The modes are Rubric, Challenge/Assignment, Workflow and Habit/Continuous. Null level is accepted only for a Workflow or Habit/Continuous strategy that explicitly authorizes null-level event evidence. Zero, absence and non-attempt never create a fabricated Level 1.

Practice may retain Level-3 performance as Nonqualifying. That record remains visible history but cannot advance the evidence-derived level. Diversity is read only from its structured dimension/value field; notes are never interpreted as diversity.

Corrections and voids append a new superseding record. Derivation ignores superseded or voided authority while preserving the full history.

## Declaration integration and lineage

Stage-3 `ActivityEvidenceDeclaration` remains prospective permission and configuration. Existing structured competency references resolve by immutable competency ID or bounded catalog/code compatibility. Declaration-backed Evidence must match the exact ActivityVersion, source point and competency.

Activity sources validate StudentActivity, exact ActivityVersion and ActivityAttempt relationships. Reassessment sources retain independent Attempt and Evidence identities. Project checkpoint and rubric sources validate Project, Build and exact Stage-4 event/rubric lineage, and are rejected unless an exact Declaration authorizes the source point. A verified checkpoint or finalized rubric never creates Evidence automatically.

## Strategy configuration

The shared versioned framework accepts these seven family identifiers:

1. Performance Confirmation
2. Continuous Safety
3. Comprehensive Knowledge
4. Versioned Product
5. Diagnose & Correct
6. Integrated Project
7. Continuous Workplace

Configuration composes confirmation, diversity/context, recency capability, contradiction handling, reassessment preference, qualification filtering, source/mode requirements and future pattern/window hooks. The engine contains no competency-code policy branches.

Required missing parameters cause a structured rejection. Recency capability may be represented without a numeric window when the policy does not require one. The engine does not invent curriculum confirmation counts, time windows, or unresolved AWT-R4 blocker/review thresholds. Used configurations are historically locked and revised through another strategy version.

## Deterministic derivation

`deriveCompetency` consumes active Sources and Records, an exact StrategyConfiguration and explicit Enrollment-based academic scope. It returns the evidence-derived level, confirmation state, recent/highest demonstration, contributing and contradictory record IDs, remaining requirements, explicit diversity state, recency state, operational hooks, structured reasons, strategy version and a stable evidence/configuration fingerprint.

Qualification filtering, configured confirmation counts, structured diversity, later weaker evidence and reassessment preference are deterministic. The engine never stores `isConfirming` or `isContradictory` on a Record. Reads do not mutate Evidence or strategy data. Reopening the repository and deriving from the same facts produces the same authoritative conclusion and fingerprint. `calculatedAt` is computation metadata rather than primary truth.

## Instructor Override and resolved authority

Instructor Overrides are append-first scoped professional decisions with immutable identity, Student, competency, scope, referenced strategy/derivation context, authoritative state, structured reason, optional explanation, review policy/date, provenance and supersede/revoke relation. Chain revisions reject stale concurrent changes.

An Override never edits Evidence, fabricates confirmation/diversity or imports a v7 rating. `resolveCompetency` exposes both the evidence-derived state and resolved official state, identifies the authority source, preserves Override provenance, and can flag review when newer Evidence exists under an explicit review policy. New Evidence does not silently delete the Override.

## Boundaries

- No AI or LLM assigns levels, qualification, confirmation or Overrides. Future AI may only phrase structured explanations.
- No Gradebook, Workplace, Safety Event, Attendance, Supplemental Session, Artifact/photo/blob or Booth runtime authority is added.
- No persisted mutable `student.currentCompetencyLevel` or duplicate current competency table exists.
- `weld_v013`, v7 photos, pilot records and simulation records are never read, migrated, reset or modified.
- No production competency mapping or student fixture is seeded.
- Classroom UI remains v7 and Production/Classroom Readiness is not achieved.
