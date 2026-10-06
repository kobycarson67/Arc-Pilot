# ARC Academic Administration / Schedule Parity Repair 4 — 2026-10-05

## Authority and boundary

Repair 4 began from local Repair 3 commit `7b396276a51a4c915b47341cf734d8e1f576cc21`, tree `7022cc77275bc54d02ac04162acdf94a90c9a55e`, with rollback `rollback/pre-academic-administration-schedule-parity-repair-4`. Normal ARC remains Schema 7 / `V7_ONLY`.

The independent Repair 3 review identified five remaining local blockers: target-Semester authority could be overwritten at the exact transition start; the shared effective Section resolver could accept missing academic parents; School-Year-only placements could remain open ended; Backup/Recovery did not audit schedule-placement authority; and Daily Teaching still interpreted the superseded synthetic calendar enum.

## Completed repair

- Semester Transition preview refuses every active target-Semester Section or Planning placement that overlaps the target interval, including authority beginning exactly on the transition boundary. Apply repeats the check transactionally before writing. Existing source-Semester and year-wide source authority remains distinguishable and may close at the transition boundary.
- Effective Section context now requires the referenced School Year, optional Semester, matching Section/Year/Semester lineage, and a bounded interval inside the owning academic dates. Historical closed parents remain valid. Semester pacing reads use the same validation.
- New Section and Planning placements default to the Semester end when Semester scoped and School Year end when year scoped. An explicit earlier end remains valid; an end beyond the owning scope is refused. Movement retains the bounded source end.
- The existing Backup/Recovery integrity audit now checks Section and Planning parents, lineage, ISO date bounds, same-Section overlaps, competing Section-period occupancy, Planning overlaps, and Section/Planning collisions. It remains read only and uses no competing schedule authority.
- Daily Teaching normalizes the accepted Schedule service contract. `school` with `regular`, `open_shop`, or `special` may reach Pacing. `no_school`, `holiday`, `pd`, `other`, or any `none` mode returns `no_class`; unknown values return `schedule_unknown`. Historical `Instructional`/`Noninstructional` fixtures are normalized explicitly. The instructor-confirmed `2026-12-14` PD rule is covered by real Schedule-owner integration.

## Preserved Repair 3 and product authority

- Effective Section placement remains the single isolated-v8 current period/Semester authority.
- Complete-interval movement collision checks, known-Semester Planning, unknown-future nonmutation, same-Section continuity, and one-path Schema-7 action contracts remain intact.
- Bell times, five calendar day types, four instruction modes, Friday Open Shop, overrides/events, and routine Schedule Setup remain editable.
- Normal `index.html` behavior remains unchanged. No build/cache or service-worker authority changed.

## Verification boundary

Focused Repair 4 coverage exercises all 39 required cases across target-authority protection, parent/scope validation, bounded placement creation, Backup/Recovery schedule integrity, and actual Schedule-to-Daily-Teaching integration. Retained Repair 3, Repair 2, Academic Administration, adapter, consumer, Attendance, Booth, Student History, Curriculum/Pacing, Backup/Recovery, cutover, production-configuration, parity, static, parse, and complete JavaScript gates remain required for closeout.

## Preserved prohibitions

No production database or Samsung was accessed. No academic configuration, real Student data, instructional package transition, Lesson policy/content change, publication, deployment, dual write, normal-v8 activation, or authority transfer occurred. No Schema, IndexedDB version, store, build identifier, or service-worker cache authority changed.

Repair 4 remains local engineering evidence pending independent review. Production migration/application, Student/Enrollment/Schedule Assignment coordination, publication/build-cache work, production-shaped browser verification, Samsung verification, and authority transition remain separately authorized boundaries.
