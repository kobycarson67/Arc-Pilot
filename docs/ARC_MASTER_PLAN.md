# ARC — Advanced Readiness Classroom
## Master Product Plan

**Brand promise:** Readiness for the Whole Classroom.

This document preserves the product vision and architectural decisions developed during the original ARC design/build conversation. It is a north-star document, not a mandate to build every future feature before classroom deployment.

## 1. Core philosophy

ARC began as a tablet-first welding classroom system and is intended to grow into a CTE platform. The central problem is that a skilled tradesperson should not have to spend the class period acting as the classroom's database. ARC should remember who, where, what, when, what is next, and what needs attention so the instructor can teach.

ARC supports readiness across the whole classroom:

- **Student readiness:** skills, safety, employability, independence, technical knowledge, project progression, and preparation for the next challenge.
- **Instructor readiness:** knowing what to teach, how students are progressing, who needs attention, what is coming next, and what to prepare.
- **Instructional readiness:** lessons, standards, learning targets, criteria for success, assessments, teaching tips, and curriculum coverage.
- **Shop readiness:** booths, machines, tools, materials, consumables, maintenance/issues, cleanup, and inventory.
- **Program/administrative readiness:** SLO evidence, curriculum maps, lesson plans, standards coverage, essential standards, student growth evidence, and administrator-ready documents.
- **Budget/material readiness:** current stock, usable drops, waste, project demand, projected shortages, and eventually purchasing forecasts.

**Capture once, reuse appropriately.** Information entered during normal teaching should feed reports and planning rather than requiring duplicate paperwork.

## 2. Product architecture rule

**Instructor ARC must never depend on ARC Student.** ARC must remain fully useful for an instructor whose students have no tablets/Chromebooks or whose instructor simply does not want student mode. Student features are optional multipliers.

Similarly, advanced modules such as AI weld feedback, CAD/3D Project Planner, community sharing, and automated inventory must not become prerequisites for the dependable classroom core.

## 3. Initial classroom deployment target

Priority is a dependable ARC Classroom build that can be used in real classes. Core areas include:

- Course schedule and roster management across seven periods, including six teaching periods plus planning; semester moves/add/drop without losing history.
- WT and AWT separation while avoiding redundant course toggles inside a known class context.
- Student profiles with grade level and multi-year/returning-student history.
- Competencies and reassessments using the established 4-point proficiency model.
- Projects, reusable project definitions, class-wide or selected-student assignment, individual assignment, checkpoints, inspection/verification flow, unassignment/removal with confirmation, and history.
- Workplace & Shop Practices with meaningful handling of refusal to work and safety/behavior events; serious Behavior Event History remains separate from routine daily workplace scoring.
- Technical Knowledge assessments with create/edit/delete/copy and course-filtered standards.
- Photos/evidence of student work.
- Open Shop Friday workflow with multiple prioritized competency suggestions.
- Needs Attention/instructor command-center concepts.
- Autosave, undo where appropriate, confirmations, change history, migration/versioning, backup/export, and tablet-first usability.
- Administrator/reporting foundations.

## 4. Visual identity — Titanium (GREENLIT)

Titanium is the official ARC visual direction.

- Royal blue is the principal identity color.
- Black/charcoal gives the interface weight and an industrial/professional feel.
- White/silver supports clarity and contrast.
- Gold is deliberately restrained for premium emphasis, milestones, important actions, and high-value visual accents. Do not overuse it.
- Controls must look and feel like physical buttons rather than invisible touch zones. Pressing a button should produce visible movement/depression as confirmation.
- Subtle shine/highlight can reinforce the premium, high-quality impression.
- Tablet controls should be large, shop-friendly, and easy to use while moving around a classroom.
- The overall impression should be professional, industrial, premium, and credible — not generic school software and not excessively futuristic.

ARC Welding may use the statement **“More Than Welding. A Brighter Future.”** The broader ARC brand uses **“Readiness for the Whole Classroom.”**

## 5. Teaching Tips — include early

Teaching Tips should be part of the early classroom product because many CTE instructors enter teaching with strong trade expertise but limited formal teacher preparation.

Principles:

- Optional, collapsible, configurable, and never condescending.
- Contextual rather than a random “tip of the day.”
- Useful categories include demonstrations, checking understanding, questioning, troubleshooting, safety instruction, differentiation, project launches, classroom management, and assessment.
- Tips should encourage students to reason rather than simply receive answers (for example, asking what they notice and what adjustment they would make before the instructor supplies the correction).
- Allow instructors to save/favorite useful tips.
- Future ARC may recommend tips using lesson content, current competencies, recent assessment patterns, and common misconceptions.

## 6. Inventory v1 — include in initial version

Inventory is considered valuable enough for the initial classroom version, but v1 must stay simple and dependable.

Track at least:

- Raw materials, including type/profile/dimensions and quantity or length.
- Consumables.
- Equipment/tools.
- Minimum-stock thresholds and low-stock warnings.
- Manual add/use/adjust transactions with history.
- Usable drops versus waste/scrap.
- Notes/status where useful.

Design the data so Projects/Project Planner can automate inventory later, but do not require that automation for v1.

### Material/waste model

Inventory accuracy must account for more than blueprint theoretical usage:

- Planned material.
- Normal process loss/kerf.
- Usable remainder/drop returned to inventory.
- Incorrect cuts/rework material.
- Unusable scrap/waste.

Reusable thresholds may eventually be configurable by material/profile. Waste data is primarily instructional and operational evidence, not an automatic punishment or grade.

Future inventory intelligence may include cut optimization, reuse of existing drops, project reservations, historical consumption factors, purchasing forecasts, projected shortages, cost savings, and “design from available inventory.”

## 7. Project Bank

A populated Project Bank is a major ARC Welding requirement. ARC should not ship expecting an instructor to invent an entire curriculum's worth of projects.

Projects should be built backward from standards/competencies and may include:

- Process(es).
- Skills/competencies and standards covered.
- Difficulty/progression level.
- Prerequisites/unlock rules.
- Estimated student time, eventually informed by historical ARC data.
- Materials and equipment.
- Cut/material list.
- Checkpoints.
- Learning purpose.
- Blueprint/drawing.
- Instructor guide and common mistakes.
- Student instructions.
- Assessment/rubric opportunities.

Suggested progression concept:

1. Foundations.
2. Guided Fabrication.
3. Independent Fabrication.
4. Advanced/Integrated Projects.
5. Capstone/Student Design.

ARC should eventually identify curriculum/competency coverage gaps among selected projects and suggest projects that cover missing skills. Returning/advanced students should not be forced through identical beginner projects solely because beginners are present.

A future **ARC Community Project Bank** may allow instructors to contribute standardized projects and copy/adapt community projects into their own bank. ARC Welding should still have a strong curated starter bank before community sharing is relied upon.

## 8. Project timing and checkpoints

Project checkpoint history should make real student completion-time data possible. Instructor estimates are useful but student time varies substantially by skill level.

Track meaningful stages such as started, working, ready for instructor inspection, revision, verified/approved, next checkpoint, and completed. Historical data can eventually produce estimated time windows by project/difficulty/student readiness rather than guesses.

## 9. ARC Student — future optional module

ARC Student should be a second view of the same system, not a disconnected application. It remains optional and cannot be required for Instructor ARC.

### Student access

For shared classroom devices, quick sign-in concept:

**Select name → enter PIN → student dashboard.**

### Student dashboard / everyday workflow

Keep the interface attractive and Titanium-aligned but simpler than instructor mode. Large touch targets and minimal typing.

Potential normal flow:

**Sign in → booth/today's assignment → daily knowledge check → project/work → practice feedback → request inspection → cleanup alert → booth checkout → sign out.**

Show current project, next checkpoint, progress, instructor feedback, unlocked projects, and a prominent continue-working action.

### Project unlock/request

Difficulty and competency progression can unlock appropriate projects. Students may browse eligible projects and request one; the instructor remains the approval authority.

### Student portfolio

Student profiles may become employment-ready skills portfolios containing instructor-verified competencies, completed projects, photos/evidence, and multi-year progression. This provides richer evidence than a course letter grade alone.

## 10. Daily Knowledge Checks / digital assessments

ARC Student should eventually reduce paper quizzes and worksheets substantially.

Daily Knowledge Checks can make technical assessment part of normal shop routine:

- Roughly 1–3 simple questions related to what the student is currently learning/doing.
- Across a week, these can accumulate into the equivalent of a traditional quiz (for example, about 15 questions).
- Results may contribute to Technical Knowledge grades.
- Students receive timely corrective feedback.
- ARC can remember concepts needing reinforcement and revisit them later with different questions.
- Instructor dashboards can show class-wide misconceptions so the instructor can address them immediately.

Support traditional assignments/quizzes/tests too. Potential instructor modes: Daily Knowledge Checks, Traditional Assessments, or Combination. ARC adapts to the instructor rather than forcing one teaching method.

Future digital assessment types may include multiple choice, matching, short answer, image-based questions, blueprint interpretation, and weld-defect recognition.

## 11. Booth Manager / equipment accountability

Future student/instructor module:

- Define each booth/station and its available welding process/machine/equipment capabilities.
- Suggest booth assignments based on what each student/project currently requires; instructor has final authority.
- Student dashboard can show today's booth assignment.
- Record who used which booth and when for accountability if cleanup problems, damage, or equipment issues occur. Usage history is evidence for investigation, not automatic blame.
- Student booth checkout may include machine shutdown, leads/torch storage, scrap removal, floor cleanup, and tool return.
- Students can report equipment issues.
- Booth/equipment status may include Ready, Limited/Review Needed, and Unavailable.
- Future assignment logic should avoid stations whose equipment cannot support the student's required work.

## 12. AI Weld Coach / checker — future, advisory only

AI-powered weld image feedback may reduce the instructor bottleneck during practice by giving students immediate feedback while the instructor is helping others.

Desired flow:

**Weld → image/check → AI practice feedback → student corrects/rechecks → Ready for Instructor Inspection → instructor verifies.**

Principles:

- AI does **not** award the authoritative competency rating.
- Instructor verification remains final.
- Save AI report/image/attempt history so the instructor can review it with the inspection request.
- Potential feedback includes visible consistency issues or possible defects, but reliability must be validated across processes, materials, positions, lighting, cameras, and defect types before trust is expanded.
- Compare AI observations against instructor verification over time to measure usefulness/reliability.

## 13. “View as Student”

Instructor should eventually be able to open a student profile and select **View as Student** to see exactly what that student sees without logging out.

- Display an unmistakable **INSTRUCTOR PREVIEW** banner.
- Do not accidentally create records that appear student-authored.
- Useful for troubleshooting, coaching, and verifying student experience.

## 14. Project Planner / blueprint / 3D — future major module

ARC Project Planner may allow instructors and students to create fabrication projects without requiring full professional CAD complexity.

Potential capabilities:

- Draw/common fabrication geometry with entered dimensions.
- Select stock profiles/materials.
- Add plates, holes, angles, dimensions, and weld symbols.
- Generate/edit 2D shop drawings.
- Provide a rotatable 3D model and eventually exploded views.
- Highlight correspondence between 2D components and 3D parts.
- Derive cut lists and bills of materials where reliable.
- Estimate material use/cost.
- Save as personal/instructor-bank project or assign to students/classes.

Student progression can move from teacher-designed projects → student modifications → constrained student design → independent/capstone design.

AI may assist with project concepts and editable starting designs but should not be treated as authoritative engineering for safety-critical structures. Existing geometry/CAD technology should be integrated where sensible rather than attempting to reinvent a CAD kernel.

## 15. Instructor command center / Needs Attention

ARC should help answer: **Who needs me, and what needs to happen next?**

A future class/shop readiness dashboard can combine items such as students present, booth assignments, students needing placement, unavailable booths, inspections waiting, equipment issues, and time until cleanup.

Student devices should reduce the “everyone yelling for the instructor” problem by allowing Ready for Inspection requests that create an instructor queue.

## 16. Classroom timer / cleanup rhythm

ARC Student may display class time remaining and an instructor-configurable cleanup warning/alarm. Example: at 10 minutes remaining, students are prompted to safely finish the current operation and begin cleanup. Timing and audible alerts must be configurable or disabled.

## 17. Administrative/document readiness

ARC should make required documents ready to hand to administrators instead of requiring teachers to reconstruct evidence later.

Important outputs include:

- SLO documentation and evidence.
- Curriculum maps.
- Weekly lesson plans.
- Standards alignment and coverage.
- Essential standards.
- Learning targets beginning **“I am learning to …”**.
- Criteria for success beginning **“I can …”**.
- Assessment/student-growth evidence.
- Administrator-ready reports.

Planbook-oriented lesson content should support Title, Standards, Learning Targets, Criteria for Success, Engaging Instructional Strategies, and Assessment.

## 18. Welding classroom realities to preserve

- Classes are 50 minutes.
- Fridays are Open Shop for WT and AWT.
- Students may enter/leave courses mid-year and classes can contain mixed cohorts.
- Returning students may continue across years.
- Hands-on learning is preferred; minimize unnecessary bookwork.
- Grading policy uses A >=90, B 80–89, C 70–79, D 60–69, F <60.
- Workplace refusal/nonparticipation and serious safety violations must be represented meaningfully; ARC should not automatically create an artificial 60% floor for refusal to work.
- Competency proficiency uses a defined 4-point scale with 4 as proficient.
- Individual student workflows matter for privacy and make-up work; do not force every action through a visible whole-class screen.

## 19. Platform expansion

ARC Welding is the first pathway, but the architecture may eventually support ARC Automotive, ARC Construction, ARC Machining, ARC Agriculture, Culinary, Electrical, and other CTE areas.

The shared platform may provide competencies, projects, workplace skills, evidence, histories, instructional planning, inventory/resources, and reporting. Each pathway can supply specialized standards, terminology, competencies, project banks, and tools.

Do not prematurely generalize the classroom build at the expense of making ARC Welding excellent first. Real use by other CTE instructors should reveal which features are truly platform-level.

## 20. Pilot/testing strategy

The instructor has an actual Samsung tablet for ARC testing and two other CTE instructors who may serve as early test users.

Testing principles:

- Use fictional data first until privacy, backup, and data-integrity gates are satisfied.
- Real-device usability is a release gate, not an afterthought.
- Test rapid taps, mistakes, back navigation, rotation, closing/reopening, interrupted entry, autosave, modal behavior, typing, student switching, readability, and one-handed/tablet use.
- A feature that technically works but is frustrating while moving around a shop is not finished.
- The classroom itself becomes the beta environment after controlled testing.

## 21. Deployment/readiness status at time of this plan

The original development checkpoint was `5114b4443709b92c1e8469222c0c0c920f04f965` on `dev/v0.18-needs-attention`, where the ARC Regression Gate was green and checkpoint/Titanium work was underway.

A later Work session reported deployment hardening published at commit `8676eebfc89870d14f280a376507a87ef2df4a62`, including controlled service-worker updates, offline fallback, backup integrity verification, persistent-storage/capacity reporting, connectivity/install status, pilot-readiness checks, Samsung tablet testing instructions, and explicit warnings that OneDrive/authentication/encryption were not active. This commit has been verified to exist in the repository. Do not infer that production security/cloud requirements are complete merely because controlled fictional-data pilot readiness exists.

## 22. Immediate course

Do not allow the long-term vision to block a usable classroom version.

Near-term priority remains:

1. Preserve a known-good repository state and green tests.
2. Complete/verify core Projects + checkpoint integration.
3. Apply Titanium consistently across the usable application.
4. Add Teaching Tips v1.
5. Add Inventory v1 including drops/waste/history/low-stock basics.
6. Continue deployment hardening and truthful readiness checks.
7. Test on the Samsung tablet using fictional data.
8. Fix real-device friction before introducing real student information.
9. Begin controlled classroom pilot only after privacy/data safeguards appropriate to the chosen deployment are satisfied.
10. Populate the ARC Welding Project Bank systematically from WT/AWT standards and competencies so useful projects exist this school year.

## 23. Product decision filter

When a new idea appears, ask:

**Does it materially improve readiness for students, instructors, instruction, the shop, the program/administration, or resources/budget?**

If yes, it belongs somewhere in ARC. Then ask:

**Does it prevent successful classroom use if absent?**

- If yes: consider it for the current deployment track.
- If no: preserve it on the roadmap without allowing it to delay the classroom core.

## 24. North-star statement

ARC should become a system where using the application is part of the normal rhythm of a CTE classroom rather than another administrative chore performed afterward.

**ARC — Advanced Readiness Classroom**

**Readiness for the Whole Classroom.**
