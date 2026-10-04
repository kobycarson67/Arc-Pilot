# ARC Instructional Reference Read Boundary

Date: 2026-10-04  
Classification: bounded read-only architectural boundary  
Normal classroom authority: Schema 7 / `V7_ONLY`

## Baseline

- Published starting commit: `36d1b074f1d10b6ea48fc20bb92f9cb14d0f6855`
- Published starting tree: `0c04a31f95613c88ed713f79294cf13ceeb31201`
- Accepted production reference database: `arc_classroom_v8`
- Accepted package ID: `ae06a3f8-cd1b-4a2a-943f-2f3d4e1f3f3b`
- Physical PA2 package state reported by the instructor: `available`

This milestone did not inspect Samsung, repeat package availability, access production, or transfer any classroom authority.

## Implemented boundary

`ArcInstructionalReferenceBoundary` is an inert, read-only module. Construction performs no database open, package read, Curriculum read, or mutation. Its production composition is lazy and accepts only the exact production database and accepted package identity.

Every read first calls the existing instructional package authority's `assertOrdinaryReadGate()` for the accepted package. The result then comes only from existing `ArcV8CurriculumPacing` owner reads. There is no legacy fallback and no direct store read.

The complete public read surface is:

- `getStandards({course})`
- `getEssentialStandards({course})`
- `getCurriculumMap({course})`
- `getCurriculumItem({course, curriculumMapItemId})`
- `getCurriculumCoverage({course})`

Course input is limited to `WT` and `AWT`, mapped respectively to `arc-course-wt` and `arc-course-awt`. Returned Standards, maps, items, and coverage are checked against that canonical Course scope. Invalid database, package, Course, owner scope, unavailable package, missing item, ambiguous catalog, and missing map states fail closed.

## Excluded authority

The module exposes no writer or mutation API and no operation for:

- Section pacing, Section curriculum position, pacing history, or pacing commands;
- Lesson Bank, Auto Build, preserved Lessons, or Lesson acceptance;
- Students, Enrollment, Sections, calendars, or schedules;
- Competency ratings, Evidence, Projects, Technical work, Gradebook, Workplace, Attendance, or passes;
- package history or package-state mutation; or
- authority transfer, dual write, schema/storage changes, production controls, or normal UI activation.

Normal `index.html`, service worker, build/cache authority, normal adapters, PA1/PA2 engineering controls, Schema 7, and `V7_ONLY` remain unchanged. The 124 preserved Lessons remain `reference_only`; ordinary and Auto Build Lesson projections remain outside this boundary.

## Verified contract

Focused tests prove:

- inert construction;
- the exact five-method read surface;
- canonical and separate WT/AWT owner delegation;
- WT/AWT Standards `9/20`, Essential Standards `4/6`, and Curriculum items `29/27`;
- exact package read-gate enforcement;
- fail-closed database, package, Course, unavailable-package, and cross-Course behavior;
- no direct storage access or mutation API; and
- normal Schema 7 ARC does not load the boundary through `index.html` or `sw.js`.

This local milestone does not claim publication, deployment, Samsung verification, production read execution, package transition, or authority transfer.
