# ARC Classroom Roster and Simulation Authority Repair

**Date:** October 16, 2026

**Starting commit:** `916549a8512979a92007d7b33af7809552f6c34b`

**Starting tree:** `ba2c7ce163cd033c56fcfa1310dd7bba9485777b`

**Status:** Local candidate; independent review pending

## Purpose

Restore the canonical fictional rosters and their ordinary classroom workflows when academic authority is already `V8_AUTHORITATIVE`, while leaving Live Classroom Student creation and enrollment closed until real Student data is separately authorized.

## Implemented boundary

- Simulation selection now precedes live Batch A/Batch B and academic authority selection. Scenario reads use the canonical scenario state, and scenario mutations use the existing scenario persistence namespace.
- Student directory, section roster, Attendance/Passes, Projects/Activities/Technical, Competency/Evidence/Open Shop, Workplace/Safety/Behavior, Gradebook, and Student History projections stay on the same scenario state while a simulation is active.
- Add Existing, Create & Add, and Drop Student await their mutation result. The roster is rebuilt only after confirmed success, and a rejected operation produces an actionable status message.
- Live roster controls inspect the actual production academic activation record. With `realStudentDataAuthorized:false`, Add Existing and Create & Add are disabled and explain that Live Student enrollment is unavailable. A fictional Batch A gate is not treated as Live Student authorization.
- The build identity advances only for the changed application shell. The release transport identity and user-controlled update behavior remain unchanged.

## Isolated browser evidence

The installed Microsoft Edge rehearsal used the real `/Arc-Pilot/` path, a new task-owned profile, fictional fixtures, and the task-owned physical database `arc_classroom_v8_roster_simulation_candidate`.

- The published baseline reproduced the defect: Scenario 1 contained eight fixture Students, but `allStudents()` and the selected roster both returned zero under academic v8 authority.
- The candidate projected all canonical fictional totals: Scenario 1 `8`, Scenario 2 `12`, Scenario 3 `10`, Scenario 4 `9`, and Presentation Mode `28`.
- Scenario 1 began with two enrolled Students. Add Existing produced three, Create & Add produced four, and Drop Student produced three while preserving the created Student and permanent dropped-Student record.
- Students, Fast Roster, Open Shop, Class Forecast, Projects, and Booth Manager agreed with the scenario roster.
- A full page reload retained the scenario, fictional created Student, three-member roster, and scenario-specific navigation key.
- Live controls were unavailable with `REAL_STUDENT_DATA_NOT_AUTHORIZED`; a direct attempted create wrote no Student.
- Live v8 Student, Enrollment, and Schedule Assignment counts remained `0/0/0`. The complete live v8 store fingerprint and exact Schema-7 `weld_v013` fingerprint were unchanged across all scenario work.
- Backup/restore covered all 74 stores and returned exact checksum parity. Offline cold restart retained academic `V8_AUTHORITATIVE`, left simulation inactive, and loaded the repaired build.
- The task-owned database, Edge profile, caches, service workers, and local storage were cleaned after evidence capture.

## Authority and exclusions

No schema, IndexedDB version, store, migration, academic marker, package history, recovery authority, classroom configuration, or domain authority changed. P8–P10 remain governed by their accepted existing authority. No real Student use was authorized. No publication, deployment, Samsung access, production database operation, physical scenario reset, authority transfer, or protected recovery operation occurred.
