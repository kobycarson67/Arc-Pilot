# ARC Academic Administration / Schedule Parity Repair 2

**Date:** 2026-10-04  
**Authority state:** Schema 7 / `V7_ONLY`  
**Starting local candidate:** commit `5152cab52daa6539a7f1e1e28d7b6100dbc1d8d5`, tree `5d3007bbac5aeaf48b051511ade2a1b7d1099630`  
**Published baseline during the repair:** commit `9017aad6b45f74ef076c682ac442cf5edb95280b`, tree `222bf7bd3be458551aa8aada456519d2efe290b8`

## Controlling product rule

The accepted editable ARC application is the product contract. The v8 engine must preserve those instructor workflows rather than narrowing them for storage convenience. Routine Bell, calendar, Planning, Section, and Semester variables remain ordinary editable ARC data. Current school values remain data and are not product constants.

Repair 2 supersedes the historical P2 implementation rule that made referenced Bell period definitions immutable. The P2 milestone remains unchanged as historical lineage. Routine Bell time editing is now explicitly supported through an atomic audited service operation and does not require an instructor recovery ceremony.

## Independently verified defects and repairs

1. **Referenced Bell times were immutable.** `updateBellTime()` now validates the existing `bell-time` payload, time ordering, and overlap; revises the active Bell Schedule atomically; increments revision; and appends full before/after audit evidence.
2. **Section and Planning placement depended on one Bell template.** Active placements now persist only academic/effective scope and ordinary period identity. Weekly or per-date calendar authority selects the Bell Schedule that maps that period to the day's times. Semester Transition no longer requires Bell identities for placement.
3. **Generic correction bypassed occupancy rules.** Direct `periodCode` or `bellScheduleId` correction on Section/Planning placement now fails with `SPECIALIZED_SCHEDULE_MOVE_REQUIRED`. Atomic specialized movement remains the only public period-change path. Semester Transition revalidates occupancy during apply.
4. **Same-day movement could create an impossible interval.** A move on the placement start date now revises that starting row with before/after audit evidence. A later move closes the prior row on the previous day and appends a replacement. A move before the active start fails closed. The rule covers Section moves, Planning moves, swaps, and Semester Transition placement closeout.
5. **Calendar save/update/clear/range paths did not converge.** Normal isolated `calendar-day` and `calendar-day-clear` now share `date-override` authority. Save is an audited upsert, range is one atomic transaction, non-school days force `none`, and repeated clear is an idempotent normal result. `calendar-day` remains only a separate base-calendar authority and is not created by the normal Schedule Setup adapter.
6. **The isolated adapter rejected `bell-time`.** It now delegates that exact action once to `updateBellTime()`. `V7_ONLY` still invokes exactly one legacy callback; isolated verification never invokes legacy mutation; dual write remains absent.
7. **Calendar events discarded time and reminder lead.** Event authority now preserves optional `HH:MM` time, nonnegative integer `remindDaysBefore` including zero, and full prior fields in retirement audit. The pure migration projection emits the same one-day service fields.

## Retained Repair 1 authority

- five day types and four instruction modes;
- Friday Open Shop and PD/In-Service with no regular instruction;
- Planning as a separate concept;
- atomic Section/Planning swap intent;
- editable, pure, nonapplying migration planning;
- the current-school fixture only as test evidence;
- the accepted `2026-12-14` `pd + none` correction;
- unknown future Semester schedule as valid;
- explicit unresolved Student/Enrollment/Schedule Assignment transition boundary.

`index.html` is unchanged from the Repair 1 Git blob. Normal Schedule Setup, calendar, Planning, Section movement, Semester Transition, navigation, controls, and Schema-7 persistence remain unchanged.

## Authority and safety boundaries

- Normal ARC remains Schema 7 / `V7_ONLY`.
- The v8 schedule adapter remains isolated and hard-bound away from production.
- No production database was opened or mutated.
- No Production Academic Configuration was executed.
- No Student, Enrollment, or Schedule Assignment authority was created.
- No package transition or event 13 occurred.
- No Lesson acceptance or instructional package content changed.
- No dual write, activation, authority transfer, push, publication, deployment, or Samsung action occurred.

## Remaining cutover boundary

This repair supplies local engineering parity evidence only. Before production academic configuration or classroom authority transfer, ARC still requires reviewed application of explicit School Year/Semester/Grading Period authority, coordinated Student/Enrollment/Schedule Assignment transition behavior, production-shaped isolated verification, publication, and Samsung physical acceptance. No repaired capability is accepted as v8 classroom authority while `V7_ONLY` controls normal ARC.
