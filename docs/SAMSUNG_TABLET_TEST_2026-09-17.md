# ARC Samsung Tablet Testing Checkpoint — 2026-09-17

## Purpose
This document preserves the first controlled real-device Samsung tablet test of ARC. Testing used fictional student data only. This is a product/UX checkpoint, not authorization for real student data.

## Test context
- Device: Samsung tablet
- Primary/natural working orientation chosen by instructor: Portrait
- Landscape must remain supported.
- Installed/full-screen PWA behavior confirmed.
- Application under test identifies itself as Prototype v0.17.1 Installable App Foundation.
- OneDrive sync, authentication/login, and encryption are not active; real student data remains prohibited.

## Product direction confirmed during testing
- Portrait should be treated as the primary shop-working orientation because that is how the instructor naturally holds the tablet.
- Landscape remains a supported secondary orientation.
- Titanium remains the approved visual direction; this functional prototype has not yet received the complete Titanium treatment.
- ARC should favor stable, predictable spatial behavior during class use.
- Whenever an instructor changes student data, the screen should immediately and persistently show the resulting state.
- Frequently used actions with a small known choice set should prefer direct touch targets over dropdowns.
- Global header Search should ultimately search ARC broadly; screen-local search/filter controls may remain scoped.

## Confirmed passes
1. Installed ARC launches in full-screen/app-like mode on Samsung.
2. Student profile opens and is usable in portrait and landscape.
3. Samsung camera capture works from the student Photos area.
4. Captured photo appears in the student's gallery with timestamp and View/Delete controls.
5. Pass state propagates between student/profile and Attendance & Passes views.
6. Tapping outside an open dropdown closes it.

## Findings

### 1. Default Period 1 initialization mismatch
On initial launch the period selector displays 1st Period, but selecting the already displayed Period 1 does not navigate/initialize the class. Selecting Period 2 and then Period 1 causes Period 1 to work.

Desired: displayed active period and actual application/class state must agree on startup.

### 2. Competency closes immediately after rating
Selecting a new competency rating collapses/closes the individual competency.

Desired: keep the competency open after rating so the instructor can verify the result and decide when to move on.

### 3. Competency rating lacks immediate change confirmation
A change such as 2 -> 3 has no strong visual confirmation. If the instructor looks away or mis-taps, the new action is difficult to verify without History.

Desired: selected rating remains unmistakably active, with immediate confirmation such as `Saved: 2 -> 3` and a quick Undo action while preserving History.

### 4. Student-profile navigation is obscured/disappears in portrait
At the top of a long student-profile screen, profile navigation is already partially obscured beneath the fixed global header. As content is scrolled, the profile navigation disappears entirely.

Desired: student identity/profile navigation should remain persistently accessible beneath the global ARC header while profile content scrolls.

### 5. Pull-to-refresh repeatedly reloads ARC and returns to Main Menu — HIGH PRIORITY
In normal portrait scrolling, reaching the top and swiping upward/pulling again frequently triggers browser/PWA refresh. ARC then returns to Main Menu, destroying the instructor's current navigation context. This occurred repeatedly during ordinary testing and was highly disruptive.

Desired:
- Prevent accidental pull-to-refresh/overscroll reload in the installed ARC experience where technically appropriate.
- Preserve/restore navigation context after an unexpected reload when possible (for example Period 1 -> Jamie Stone -> Competencies/Behavior rather than Main Menu).

### 6. Active Workplace deductions are not visually selected
Recorded deductions correctly affect the score and appear under Today's Deductions, but their corresponding deduction touch targets still look unselected.

Desired: active deductions remain visibly selected/checked in the deduction grid. Existing explicit Remove controls can remain the intentional removal mechanism.

### 7. Open dropdown does not toggle closed when its own control is tapped again
Tapping outside the dropdown closes it correctly. Tapping the currently open dropdown control again does not close it.

Desired: same-control second tap should toggle the dropdown closed while retaining outside-tap dismissal.

### 8. Temporary pass causes student roster reordering
Starting a bathroom pass moved the student lower in the Fast Roster. The instructor wants roster position to remain stable for students temporarily out on an approved pass.

Desired: students temporarily OUT on a pass stay in their normal roster position. Students genuinely absent/excused/school-activity may move to an inactive/lower section. Preserve clear OUT reason, elapsed time, and Returned action.

### 9. Global Search is currently student-only
The persistent header Search opens Search Students only.

Desired long-term behavior: global header Search should search across ARC with categorized results/direct navigation (students, competencies, projects, lessons, standards, assessments/records, and later appropriate platform modules). Local screen search/filter may remain scoped.

### 10. Attendance status should use direct touch targets instead of dropdowns
Attendance statuses (Present, Unexcused Absence, Excused Absence, Tardy, School Activity, Left Early, No Class) currently use per-student dropdowns. On touch, the dropdown consumes significant space and adds unnecessary interaction.

Desired: large direct status touch targets with the current status persistently highlighted. Present can remain the normal/default state while exceptions are quick to record. Pass-reason buttons already demonstrate the preferred direct-touch interaction model.

## Real-device UX principles emerging from this test
1. Tablet-first means designing around the instructor's actual grip and movement; portrait is not merely a shrunken landscape layout.
2. ARC should not unnecessarily move, collapse, reorder, or relocate things while the instructor is working.
3. Actions that change data need visible, persistent state confirmation.
4. Touch-first frequent actions should minimize dropdowns and precision tapping.
5. Unexpected refresh/reload should not destroy classroom context.
6. Functional classroom logic should be preserved while Titanium is applied; do not redesign working information architecture merely for visual novelty.

## Next checkpoint
Do not immediately redesign features one-by-one. Use this document as the first Samsung evidence set for a deliberate tablet-usability repair pass, then retest the same workflows on the physical Samsung tablet with fictional data.
