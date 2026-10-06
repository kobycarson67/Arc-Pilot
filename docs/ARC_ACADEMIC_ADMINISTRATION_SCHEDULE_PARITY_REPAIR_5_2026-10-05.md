# ARC Academic Administration / Schedule Parity Repair 5 — 2026-10-05

## Authority and boundary

Repair 5 began from local Repair 4 commit `5b9e6d05831fa42f2d4b01deff90cd04b07859d0`, tree `2b3874494aa6b00bcbe20f3268757353525debb3`, with rollback `rollback/pre-academic-administration-schedule-parity-repair-5`. Normal ARC remains Schema 7 / `V7_ONLY`.

The independent Repair 4 review identified three remaining local integrity blockers: School-Year-scoped future placements beginning exactly at a Semester Transition boundary could be overwritten; editable Semester/School-Year date corrections could invalidate dependent schedule authority; and effective-context plus Backup/Recovery checks did not require valid global period identity.

## Completed repair

- Semester Transition preview and apply protect active Section and Planning authority when it belongs to the target Semester or begins at/after the transition boundary, regardless of whether the future row is Semester scoped, School-Year scoped, or malformed with another Semester. Only source authority beginning before the transition may close or transition.
- Semester corrections atomically project dependent Section and Planning boundaries. Rows following the prior Semester start/end follow the corrected boundary; narrower explicit boundaries stay unchanged when valid. Out-of-range or collision-producing projections fail before any write.
- School Year corrections apply the same boundary-following rule only to School-Year-scoped rows. Semester-scoped rows retain their Semester boundaries and must remain valid inside both their Semester and the corrected Year.
- Every changed dependent schedule row receives revision metadata and append-first before/after audit evidence in the same transaction as the academic correction. Period and Section identities do not change.
- Effective Section resolution rejects missing or blank period identity. Reader-backed resolution validates against the union of active Bell Schedule period definitions without binding placement to one Bell template.
- Backup/Recovery requires a normalized period code, audits active placement codes against active Bell authority, and audits retired historical placement codes against retained Bell authority. Missing Bell authority, missing codes, and unknown codes are integrity errors.

The safe historical rule is explicit: active placement authority must resolve through active Bell-period definitions; retired placement history may resolve through retained active or retired Bell definitions. No Bell Schedule identity is persisted on Section or Planning placement.

## Preserved authority

- Repairs 2–4 remain intact: editable Bell times, Bell-independent placement, one override authority, complete calendar event fields, complete-interval movement checks, effective Section context, parent/scope validation, bounded placement creation, Backup schedule collision checks, and accepted Daily Teaching calendar semantics.
- PD, holidays, no-school, other noninstructional days, and `none` instruction mode never become teaching days.
- Future Semester schedule may remain unknown.
- Existing visible Schedule Setup, calendar, Planning, Section movement, and Semester Transition behavior remains unchanged.
- Normal `index.html` remains Schema 7 / `V7_ONLY`; no dual write or production routing was added.

## Verification boundary

The focused Repair 5 suite groups all required exact-start, atomic correction, failure rollback, period-identity, resolver, Backup/Recovery, and retained-history cases. Repairs 2–4, Academic Administration, shared consumers, Attendance, Booth, Student History, Daily Teaching, Curriculum/Pacing, Backup/Recovery, cutover, production-configuration, parity, static, parse, and complete JavaScript gates remain required for closeout.

## Preserved prohibitions

No production database or Samsung was accessed. No academic configuration, real Student data, instructional package transition, Lesson policy/content change, publication, deployment, dual write, normal-v8 activation, or authority transfer occurred. No Schema, IndexedDB version, store, build identifier, or service-worker cache authority changed.

Repair 5 remains local engineering evidence pending independent review. Production migration/application, Student/Enrollment/Schedule Assignment coordination, publication/build-cache work, production-shaped browser verification, Samsung verification, and authority transition remain separately authorized boundaries.
