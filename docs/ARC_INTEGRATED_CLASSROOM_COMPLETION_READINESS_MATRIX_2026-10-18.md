# Integrated Classroom Completion Readiness Matrix

Date: 2026-10-18

| Phase | Existing owner / normal workflow | Local result | Production authority | Remaining gate |
|---|---|---|---|---|
| P4 | Students / Enrollment / academic projection | Owner and adapter retained; no new write path | `V7_ONLY` | controlled cutover, recovery, physical acceptance, real Student authorization |
| P5 | Attendance / Passes | Existing workflow retained | `V7_ONLY` | controlled cutover and physical acceptance |
| P6 | Projects / Activities / Technical | Four draft libraries connected to existing owner; explicit instructor action preserved | `V7_ONLY` | content acceptance and controlled cutover |
| P7 | Competency / Evidence / Open Shop | Existing owner retained; no Evidence strategy invented | `V7_ONLY` | approved strategy and controlled cutover |
| P8 | Workplace / Safety / Behavior | Existing Batch B workflow retained | `V7_ONLY` | controlled cutover and privacy review |
| P9 | Gradebook | Existing Gradebook is now directly visible in the sidebar; manual school transfer retained | `V7_ONLY` | controlled cutover and physical acceptance |
| P10A | Student History | Existing joined projection retained in Student workflows | `V7_ONLY` | controlled cutover and privacy review |
| P10B | Curriculum / Standards / Pacing | Existing owner and UI retained; an accepted-gate fictional rehearsal previews and places one exact Lesson Version only into an explicitly configured pacing plan | `V7_ONLY` | controlled production cutover and physical acceptance |
| P10C | Lesson Plans | Existing 124 sources remain reference-only; 124 source-reviewed replacement drafts remain review-only; the real owner creates and rereads an exact fictional immutable Lesson Version in isolation | `V7_ONLY` | instructor content acceptance and controlled production cutover |

No row advances production authority. The matrix is a local technical readiness inventory, not a cutover receipt.

## Launch and reliability gates

- Schema 7 compatibility, academic V8 rehydration, Simulation isolation, Test Scenario 1 preservation, and 74-store backup/restore must remain green in the final browser rehearsal.
- OneDrive remains an external integration and recovery gate.
- FERPA/privacy and protected photo/media custody remain external policy and institutional gates.
- Real Student data stays unauthorized.
- Today's Focus remains unresolved because ranking policy is an instructor decision.
- Build 3 closes local P10B/P10C composition evidence only. It does not advance production authority or instructional acceptance.
