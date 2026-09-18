# ARC Continuity Log

This log preserves settled product reasoning that should survive individual engineering threads. The Master Plan remains the product north star.

## Settled classroom architecture

- Instructor ARC must operate independently of ARC Student and future ARC intelligence. Student devices may multiply value later; they are never a prerequisite for the instructor's dependable classroom core.
- Fast Roster has three shop-floor questions: **Where are they? What are they doing? What do they need?** Booth answers where; primary project and stage answer what; current need answers what the instructor should know next.
- Individual students may legitimately be at different project and fabrication stages at the same time. ARC must not force synchronized progression merely to simplify lesson planning.
- Administrative lesson plans describe the common instructional framework and differentiated pathways. Instructor ARC records each student's actual instructional position.
- Project stages, checkpoint status, time spent, and current need are operational state. They are not automatic grades, competency ratings, discipline evidence, or judgments about a student's effort.
- Project difficulty, competency evidence, course enrollment, project clearance, and student growth are separate concepts. A Level 3 project does not create Level 3 proficiency evidence, and AWT enrollment does not imply Level 4/5 readiness.
- Growth Milestones are separate from project-level clearance. Completion alone must not automatically promote either one.
- Student-facing ARC language should be simple, respectful, teenager-friendly, and actionable. Verified official standards language remains authoritative internally.
- Authentic performance evidence should support future SLO documentation where the applicable requirements permit it. Administrative documentation should flow downstream from authentic teaching and evidence whenever legitimate, rather than driving artificial classroom records.
- ARC's long-range architecture should preserve a broader CTE ecosystem while ARC Welding remains the proving ground. Do not prematurely generalize away the real welding-classroom workflow.

## Project Bank v1 boundaries

- Reusable Project Bank definitions and student assignment records are separate. Editing or archiving a definition does not rewrite a student's stage, need, rubric, checkpoint, or history.
- A student may have multiple active assignments. One may be designated primary/current for Fast Roster without deleting or hiding the others.
- Instructor checkpoints may create the operational need **Needs Instructor Check**. They do not infer competency ratings.
- Readiness and clearance checks are explainable warnings with explicit instructor override, never permanent locks.
- Exact standards language must not be fabricated from memory. Repository-verified codes/data remain authoritative until the photographed South Dakota standards and SLO packet are deliberately reconciled.

## Collaboration protocol

- **Captain** and **Data** terminology—and the occasional humor—are part of the established working style.
- **Engage** means continue from established ARC context; it does not mean restart discovery.
- Examine small classroom observations for larger system implications.
- Explore first, lock decisions second, then send bounded Engineering work.
- Challenge ideas that create unsafe, fragile, misleading, or classroom-hostile behavior rather than automatically agreeing.

## Deferred docking ports

ARC Student, Growth Milestones, Advanced Welding Competition, lesson-module links, Planbook generation, essential-standard coverage, SLO reporting, inventory/material forecasting, and intelligent recommendations remain future integrations. Project Bank v1 stores clean identifiers and structured fields without activating those systems.

## Samsung pilot update control

- Installed Android PWAs may not surface a newly deployed shell promptly enough for classroom testing. Settings therefore exposes the running version/build, online state, a real service-worker update check, waiting-update state, and an explicit Apply Update action.
- Manual controls supplement the automatic **Reload & Update** prompt. ARC activates only a verified waiting worker and reloads on the service worker's `controllerchange` event.
- Application-shell updates never intentionally clear classroom records or photo storage. Cache replacement and classroom-data migration remain separate responsibilities.

## Public deployment truth

- The September 18 Samsung reset proved the public Pages URL was still serving v0.17.1/schema 4 even though development HEAD and regression checks had advanced through Booth Manager, Project Bank, schema 7, and manual update controls.
- Root cause: GitHub Pages publishes `main` from the repository root. Development work was pushed to `dev/v0.18-needs-attention`, whose workflow tested the code but did not promote or deploy it. The public artifact therefore remained the September 15 `main` deployment at `1b15374b32d0a189a18888af18a75fc5950e7377`.
- Repository HEAD, regression success, and public deployment state are three separate facts. Engineering must verify all three rather than treating a green test workflow as proof that the tablet URL changed.
- Releases preserve the existing branch-based Pages model: promote the tested development commit to `main`, allow Pages to deploy it, then compare the public build marker and critical assets with that exact commit.

## Booth Manager tablet repair

- Physical Samsung testing found that Booth Manager had been modeled as a viewport-covering modal even though it behaves as a primary class view. The persistent modal intercepted the visible experience while global navigation changed content behind it, and its centered viewport layout allowed the sticky header to obscure the first booth controls.
- Booth Manager is now a normal routed ARC view beneath the global sticky header. Back, Main Menu, and class switching use the same navigation system as other class views; the document scroll owns the complete booth list in browser and installed modes.
- Booth configuration is persisted in the existing `state.booths` model. Adding creates a stable booth record. Removing is an explicit, confirmed soft removal: the booth stops accepting new assignments while its resource and assignment history records remain intact. Active assignments and unresolved issues must be ended/resolved first.
- The Booth Manager navigation, header clearance, full-list scrolling, and add/remove persistence repair was physically verified on the Samsung tablet on September 18, 2026 and is closed. Preserve its regression behavior.

## Checkpoint-derived Fast Roster state

- A student's instructor-selected operational need is stored on the project assignment. **Instructor Review — [checkpoint]** is temporary derived display state computed from authoritative checkpoint records; it is never written over the instructor-selected need.
- A checkpoint in **Ready for Review** takes temporary display priority because instructor action is required. **Verify** changes that checkpoint to verified and advances to the next active checkpoint; **Needs More Work** returns it to in-progress. Either transition immediately removes the derived review condition and reveals the still-preserved instructor-selected need.
- The September 18 Samsung test proved checkpoint mutation and persistence could succeed while Fast Roster remained visually stale: the student profile modal was refreshed, but the already-rendered roster underneath it was not. Any operation that changes roster-derived project context must refresh both the authoritative student view and the dependent roster view before the modal is dismissed.
