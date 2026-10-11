# Stage 14 — Academic Structure v8 Cold-Start Repair 1

**Date:** 2026-10-11
**Starting authority:** `0678d690cd201ce346257e2b60ece38e2714617e` / `7a320cdf95502960a26e1d767c15409bf2c504aa`
**Rollback:** `rollback/pre-academic-structure-v8-cold-start-repair-1`
**Classroom authority:** Schema 7 / `V7_ONLY`

## Reproduced defect

The published v8 Academic Structure compatibility projection contained the reviewed School Year, both Semesters, all four Grading Periods and durable source-key bindings, but omitted the normal ARC Academic Structure format marker. The unchanged normal validator therefore rejected the first authoritative cold start with `INVALID_ACADEMIC_STRUCTURE_VERSION` before the normal shell could finish.

## Bounded correction

- The v8 compatibility producer now emits `version: 1` as a serialization-format marker.
- The format marker does not own academic content and does not read or preserve stale V7 Academic Structure values.
- The normal validator remains unchanged and continues to reject missing, malformed or unsupported versions.
- Exact v8 identities, dates, current Semester and unknown future Section/Planning placement remain authoritative.
- The build and shell cache identity advances so a future accepted publication can update the normal installed PWA through the existing user-controlled service-worker flow.

## Verification boundary

Isolated tests cover the published failure, the unchanged normal validator, actual activation-marker persistence, first and second cold rehydration, exact academic identities/dates, missing and duplicate binding refusal, malformed structure refusal, current schedule semantics, unknown future placement, recovery guardrails and all P5–P10 adapters remaining `V7_ONLY`.

This is source-only local verification. Samsung physical acceptance is not established and requires separate authorization after publication and fresh recovery custody.

No publication, deployment, Samsung or production access, PACR execution, recovery preparation, physical activation, Student authorization or authority transfer occurred.
