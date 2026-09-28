# ARC Stage 14 — P3 Schedule Setup and Calendar UI Authority Adapter

## Authority

- Starting commit: `543d2e5d043c12ee0c877cfb01c8f9dba4107e5f`
- Starting tree: `aba293cdde27f61cc354a1476a57094222b66df5`
- Rollback: `rollback/pre-stage-14-parity-program-p3`
- Academic authority: `V7_ONLY`
- Normal classroom state: Schema 7
- v8 foundation: Schema 8 / IndexedDB structural version 10

## UI and authority architecture

The accepted Schedule Setup and calendar interface remains visually and behaviorally unchanged. Its existing mutation handlers now pass through `ArcScheduleAuthorityAdapter`.

The adapter has two explicit modes:

1. `V7_ONLY` is the normal ARC mode. It invokes exactly one supplied legacy mutation callback. It does not open or write a v8 database.
2. `V8_ISOLATED_VERIFICATION` is hard-bound to `arc_classroom_v8_p3_verification`. It delegates the same action contracts to `ArcV8AcademicAdministration`. It cannot call the legacy mutation path.

The adapter reports `dualWrite: false` and `isAuthoritativeV8: false`. No mode writes both authorities. The production database name is rejected by the isolated adapter.

Normal handlers routed through the boundary are:

- Bell Schedule time edits
- calendar day save/clear
- calendar event add/delete
- selected-date range application
- Planning Period movement
- Section period movement
- Semester Transition

The accepted function names, controls, Titanium shell, responsive behavior, sidebar behavior, and navigation routes remain in place.

## Semester Transition coordinator

P3 adds v8 preview/apply coordination to `ArcV8AcademicAdministration` for isolated verification:

- accepted `continue`, `new`, and `end` choices;
- explicit target School Year, Semester, effective date, Planning period, Bell Schedule, and period codes;
- unknown future schedule returns `FUTURE_SCHEDULE_UNKNOWN` without mutation;
- preview validates references, revisions, period conflicts, Planning conflicts, and future-placement conflicts;
- apply requires a verified one-use recovery token;
- one transaction closes prior effective placements, preserves continuing Section identity within the same School Year, archives ended/fresh source Sections, creates fresh replacement Sections, adds target-semester placements, and appends transition audit authority;
- a cross-School-Year `continue` choice creates a linked replacement Section in the target School Year (`continuitySourceSectionId`) because a Section's School Year identity is immutable; the instructor's `continue` choice and the source history remain explicit without rewriting the prior year;
- transaction failure rolls back every staged Section, placement, and audit change;
- historical placements remain queryable by their original dates;
- Student, Enrollment, and Schedule Assignment mutation is explicitly absent.

Normal ARC continues to run its accepted Schema 7 Semester Transition while authority is `V7_ONLY`. Activating the v8 coordinator for classroom use would require the later Student/Enrollment authority and an explicit transition authorization; P3 does not simulate that transfer through dual writes.

## Build and offline integration

Normal ARC loads the P2 service and P3 adapter as inert service modules. Both are included in the service-worker core cache. Build and shell authority advance with suffix `parity-p3-schedule-adapter-1`. Pages asset verification includes both files. No publication or deployment occurred.

## Parity evidence

P3 records automated evidence for School Year/Semester, Grading Periods, Schedule Setup, school calendar, Bell Schedules, Planning Period, Section placement, and Semester Transition.

Schedule Setup and Semester Transition advance to `service-ready`. No row advances to `ui-connected`, because normal classroom ARC is intentionally still executing Schema 7 authority. No row advances to behavioral, Samsung, or accepted status.

The post-P3 contract SHA-256 is `8e2d77aab9313150d01b41e2566b45fcd2658592b56ff756653946489a9e59cf`.

## Samsung physical verification still required

After a separately authorized publication and after the v8 classroom activation prerequisites exist, Samsung verification must cover installed PWA and direct Chrome:

- Schedule Setup entry and return navigation;
- every Bell Schedule time edit and reload;
- Planning movement and conflict swap;
- Section period movement and conflict swap;
- calendar single-day save/clear, ranged edit, event add/delete, and overrides;
- current-class/countdown behavior at period boundaries;
- Semester Transition preview, cancel, invalid conflict, continue/fresh/end, recovery failure, successful apply, reload, and historical readback;
- portrait/landscape, background/foreground, sleep/wake, offline reopen, and update lifecycle.

Samsung verification is pending. It cannot be meaningfully accepted against v8 while `V7_ONLY` remains the classroom authority.

## Proposed P4 boundary

**P4 — Convert academic consumers together** may connect one shared v8 academic projection to Dashboard, class selector, Students directory, global search, Fast Roster, Student profile, current-class detection, Gradebook scope, Project scope, Technical scope, and Workplace scope.

P4 must establish a single coherent read authority for all those consumers. It must not leave some views reading v8 while others treat stale v7 academic context as truth. Before any classroom activation, P4 must resolve the Student/Enrollment/Schedule Assignment transition authority that P3 deliberately does not mutate.

Production mutation, real Student data, dual write, v7 write shutdown, publication, and academic authority transfer require separate explicit authorization.
