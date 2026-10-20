# ARC Major Local Build 9 — Classroom Release Candidate

Status: LOCAL / UNPUBLISHED / INDEPENDENT REVIEW REQUIRED

Starting commit: `79e24f3a5f2e948f6b0f3eabec265b1e5c0d95a0`

Starting tree: `e423508b742ab148aec7405c0b202513f8119153`

## Release candidate

Build 9 assembles the accepted Builds 1–8 work into one instructor-visible candidate. It preserves the existing connected fictional classroom workflow, WT/AWT draft review, Activity Library, Gradebook, History, Administration drafts, unified task-owned verification, exact 74-store V8 recovery, explicit update Apply, and fail-closed verified-release routing.

The authority closure advances from 109 to 110 only because `src/arc_legacy_photo_custody.js` is now a normal-shell executable. Production P4–P10C remains `V7_ONLY`; academic and schedule authority remains the accepted `V8_AUTHORITATIVE` state. Real Student authorization remains false. Original Lessons remain `reference_only`; replacement Lessons and Activities remain `DRAFT_INSTRUCTOR_REVIEW`.

## Legacy V7 photograph custody

ARC actually stores legacy photo metadata in the exact `weld_v013` JSON while device blobs live in IndexedDB database `WeldingClassroomPhotoStore`, store `photos`. These bytes are separate from Schema 8 `artifact_media_blobs`.

The Build 9 custody owner:

- binds the exact V7 bytes and every linked photo metadata record by SHA-256;
- records linked and orphaned device blobs with exact byte size, MIME type, and SHA-256;
- explicitly reports missing, remote, and session-only photos as uncovered;
- refuses corrupt or metadata-tampered packages;
- refuses restore when current V7 bytes do not match, when coverage is incomplete, or when verified external custody of the prewrite recovery is absent;
- restores only the legacy photo object store through an injected transaction and proves readback byte parity;
- never migrates, dual-writes, or claims V8 ownership of legacy photos.

The Administration page provides a separate export. It refuses while Simulation is active so fictional scenario state cannot be represented as Live custody. OneDrive remains a manual, instructor-controlled handoff: ARC produces a verified file but does not claim tenant setup, retention, privacy approval, upload, or automatic sync.

## Acceptance boundaries

| Decision | Build 9 result | Remaining authority |
|---|---|---|
| Technical application release | Candidate assembled and locally tested | Independent review, publication authorization, CI, Pages, immutable bytes, compatibility receipt |
| Guarded fictional migration/recovery | Task-owned V8 and legacy photo rehearsals | Physical acceptance and separately authorized execution |
| Production P4–P10C authority | No transfer; remains `V7_ONLY` | Separate cutover authority, recovery custody, semantic verification |
| Instructional content | Review surfaces preserved | Instructor acceptance of drafts, mappings, rubrics, products, and local procedures |
| Real Student Classroom Ready | Not authorized | Institutional FERPA/privacy, recovery/OneDrive custody, physical acceptance, explicit real Student authorization |

## Verification expectations

Closeout requires focused custody and Build 9 tests, every discovered JavaScript test, static regression, parse and diff checks, an exact published-predecessor-to-candidate installed Edge update rehearsal, normal-app fictional classroom exercise, online/offline and process cold start, Simulation isolation, 74-store V8 restore parity, and exact legacy-photo export/corruption/restore proof.

No GitHub push, Pages deployment, release-evidence mutation, Samsung access, production data mutation, authority transfer, real Student authorization, or instructional acceptance is part of Build 9.
