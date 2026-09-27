# ARC Schema v8 Stage 10 — Booth and Physical-Shop Operations Runtime

Stage 10 advances isolated `arc_classroom_v8` storage from IndexedDB structural version 9 to 10. ARC schema remains 8, classroom runtime remains schema 7, and application version remains 0.18. The classroom shell passively loads this prospective service but does not invoke it.

## Persisted authority

Stage 10 adds `booth_definitions`, `booth_resources`, `booth_assignments`, and `booth_issues`. BoothDefinition provides stable workstation identity, code, display metadata, lifecycle, provenance, and revision. BoothResource independently describes bounded equipment or configuration associated with a Booth; it is not material inventory.

BoothAssignment records a Student's physical shop position while preserving the home Enrollment as academic owner. It records scheduled or Supplemental physical Section/session context and may link to a StudentActivity and active Project. Project linkage is optional, so Practice, Skill Challenge, reassessment, and authorized general work do not require a fake Project. Current Booth is derived from active assignments and is never copied onto Student.

BoothIssue belongs to a Booth or its Resource rather than its current occupant. Open and resolved history remains referenceable. Issues never automatically create SafetyEvent or WorkplaceEvent.

## Occupancy and movement

Only one active assignment per Booth and one per Student are permitted. Explicit ending end-dates history without changing Project, Supplemental Session, Attendance, Evidence, Gradebook, or Workplace authority. Explicit Booth movement atomically ends the current assignment and creates its successor; target validation and both writes commit together or roll back together.

Scheduled assignment requires an effective Stage 2 Schedule Assignment. Supplemental assignment requires an active Stage 8 Supplemental Session for the same Student, home Enrollment, date, and time. Its physical Section may belong to another Course, but the StudentActivity, Project, competency, Evidence, and Gradebook ownership remain with the home Enrollment.

## Rebuildable projections

Availability derives `available`, `occupied`, `unavailable`, or `removed` from Booth lifecycle, active assignment, open operational Issues, and bounded Resource state. Student physical position derives home academic context, scheduled or Supplemental physical context, Booth, Activity, Project, current checkpoint, effective operational need, and presence context. Class/shop projection composes these facts for future Booth Manager, Class Forecast, and Fast Roster use.

No Forecast need, checkpoint, Booth status, roster copy, or second operational-state table is persisted. Taylor Reed and test-only Booth 4 prove continuity through Ready for Review, Verify, Needs More Work, reload, and Supplemental cross-Course physical context.

## Boundaries

Stage 10 does not access or migrate `weld_v013`, v7 Booth state, inventory, or photos. It adds no classroom UI conversion, Forecast/Fast-Roster-specific persisted state, material-inventory migration, production backup/export/restore, Safety or Workplace automation, or Artifact-to-Booth relationship. Production and Classroom Readiness are not achieved.
