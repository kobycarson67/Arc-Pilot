# ARC P10D-PR1 Isolated Persisted Rehearsal

Date: 2026-10-02  
Authority: bounded local engineering rehearsal only  
Normal classroom authority: Schema 7 / `V7_ONLY`

## Result

The exact frozen P10D-R2 Repair 1 package completed a real persisted rehearsal in installed Microsoft Edge 154.0.4258.37 using only `arc_classroom_v8_p10d_persisted_rehearsal_1`. The isolated database used logical Schema 8, IndexedDB 14, and 74 stores. Production, normal ARC, Samsung, and real Student data were not accessed.

The first Edge execution remains preserved as failed-run lineage. It proved the frozen Essential records legitimately omit `recordedAt` and `recordedBy`, while `getEssentialStandards()` assumed `recordedAt` existed. The bounded repair now orders dated history first and uses `standardId`, numeric `chainRevision`, and designation identity as deterministic fallbacks for undated records. It does not add or infer historical dates or operators.

## Browser rehearsal proof

- Package ID: `d27a218c-ea15-435f-83db-693f607c342a`
- Attempt 1 ID: `d18d711f-ae87-474b-94cc-4a3100dc7b83`
- Attempt 2 ID: `56adbc8a-7df7-4249-809c-500092c9dab1`
- Attempt 1 created and read back 62 Standards roles, recorded the authorized `PR1_INJECTED_STOP_AFTER_STANDARDS`, and survived close/reopen.
- Attempt 2 recognized the same 62 rows as exact equivalents with zero duplicate writes and completed the other seven deterministic phases.
- A controlled same-ID/different-content write was refused. The before and after store checksum was `60be41fde5dbd9c9caa11a6f7cbc3fc66c7d38ab6ae04a82c53ea33aa71d274c`.
- Exact assembled readback proved 859 roles, 359 retained links, and 259 intentional absent relationships.
- All ten Essential Standards projected successfully. `historicalSelectionAt` and `historicalSelectionBy` remained null, and `recordedAt` and `recordedBy` remained absent.
- All 124 preserved legacy Lessons remained `reference_only`, instructionally unaccepted, unavailable to ordinary Lesson reads and Auto Build, and without fabricated `teachingGuide` content.
- Ordinary package content remained hidden during assembly and after verified completion until the explicit rehearsal-only `PACKAGE_AVAILABLE` event.
- No Student, Enrollment, Project, Evidence, Gradebook, Attendance, Workplace, Behavior, photo, Booth, pacing, focus, Activity, grade, or other classroom transaction was created.

## Recovery proof

| Artifact | SHA-256 | Result |
|---|---|---|
| Pre-rehearsal recovery backup | `9a89007175e257405aaaac62e950be5ea37f8d8a39d81e5044ff4413fc3f6ec6` | Verified, 74 stores |
| Assembled-hidden backup | `6c39bee62253f699a4c29ebb979102bdeb6720957e908a52e485d69554f15d8a` | Verified, 74 stores |
| Final rehearsal backup | `2add8da4fb8d82aa62f1acf9899003149996f7937979c51e3097d6ca2f2b23be` | Verified, 74 stores |

The dedicated database was deleted, restored from the verified final backup, reopened, and reverified. Every store count and checksum matched, package state remained `available` inside the rehearsal database, and the full package readback checksum remained `ce2744f22cbf201ef5f0c3b61952e88d768d8aef98266beee2058499b1bfb70e`.

After evidence capture, the dedicated rehearsal database, task-owned Edge profile, loopback server, and temporary harness were removed. The earlier failed evidence folder remains unchanged as historical failure lineage.

## Authority boundary

This milestone proves local nonproduction persistence, interruption/retry, idempotence, conflict refusal, completion/visibility gates, and backup/reset/restore/reopen parity for the frozen package. It does not authorize a production structural upgrade, production content import, ordinary v8 activation, instructional acceptance of the 124 legacy Lessons, publication, deployment, Samsung work, or classroom authority transfer.

Independent review remains pending. Any next production structural upgrade or import boundary requires separate authorization.
