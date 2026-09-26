# ARC Assessment, Competency, Gradebook, and Student Showcase Architecture

Status: approved future design authority. This document describes intended architecture and product behavior; it does not mark the described future systems as implemented.

Baseline reviewed: publication `214184ef99c8bde441ead7f9f524d6f5f9e62949`, tree `36decfd15d30d5fb06380870eca3c78d1b05ca31`, build `arc-workflow-integration-1-repair-1`, schema v7.

## Governing principle

The instructor grades authentic student work once. ARC should extract every legitimate piece of evidence from that assessment and reuse it everywhere it belongs without duplicate manual entry.

The product must remain functional, useful, interconnected, and non-irritating. It should minimize duplicate entry and taps, avoid dead-end information and fake intelligence, and route actionable information to the place where the instructor can act. The intended experience is increasingly: **Good, it already handled that.** The goal is more time teaching and less software maintenance.

## Current implementation boundary

The schema-v7 application currently provides:

- manually assigned competency ratings stored on student records;
- the frozen 1–4 labels and a current conversion of `1 → 60`, `2 → 75`, `3 → 90`, and `4 → 100`;
- category-weighted grade snapshots;
- a selected-class Gradebook transfer view derived from current student competency, project, technical, and Workplace records;
- existing project rubrics and independent checkpoint progress;
- Technical Knowledge assessments, Workplace records, attendance, passes, Project Bank metadata, Material Inventory, Class Forecast, notifications, and photo evidence.

The current class-scoped Gradebook is useful but is not the approved future global program-wide Gradebook. It has no external-entry reconciliation state, Gradebook Entry Mode, evidence-derived competency engine, grading-period competency snapshot authority, or program-wide filter model.

Current competency ratings are instructor-entered values. The current Skill/Competency category is an arithmetic average of current scoped competency conversions. That behavior is not the approved future evidence-derived model.

The current project rubric and safety-oriented competencies remain operational. Future rubric-family changes must preserve historical records and avoid silently reinterpreting old evidence.

## Frozen external gradebook categories

| Category | Weight | Authority |
|---|---:|---|
| Competency / Skills | 50% | Longitudinal current demonstrated proficiency. It is not a lifetime arithmetic history that permanently penalizes beginning performance. |
| Fabrication / Projects / Skill Challenges | 25% | Projects, welding performance assessments, thermal cutting assessments, and other hands-on skill challenges. |
| Technical Knowledge | 15% | Quizzes/tests, terminology, calculations, drawing/blueprint knowledge, planning/knowledge assessments, and student-created drawing grades. |
| Workplace & Shop Practices | 10% | PPE and safety behavior, participation, professional shop habits, cleanup, refusal to work, and documented Workplace events. |

Routine safety behavior belongs in Workplace and must not be graded again in technical product or performance rubrics.

## Proficiency authority and course context

The proficiency vocabulary is frozen:

1. **Introduced**
2. **Developing**
3. **Proficient**
4. **Advanced**

Level 3 is the expected successful level.

The competency conversion is frozen by instructor authority:

| Level | Name | Competency / Skills percentage |
|---:|---|---:|
| 1 | Introduced | 60% |
| 2 | Developing | 75% |
| 3 | Proficient | 90% |
| 4 | Advanced | 100% |

`3 = 90%` is intentional because Proficient means successful performance at the expected course standard. Future regression coverage must lock `60/75/90/100`.

WT and AWT use the same labels with different expectations. WT Proficient must fairly represent successful beginner work completed with normal instructional checkpoints and support. AWT expects higher applicable quality, consistency, process control, dimensional accuracy, planning, inspection, troubleshooting, independence, and workmanship.

Every evidence record that may affect proficiency must retain course and instructional context. A student entering AWT must not appear to regress merely because AWT applies a more demanding standard. Explanations and history must distinguish changed expectations from changed performance.

### Current-grade principle

**A competency level represents current demonstrated ability, not the average of every learning stage since first exposure.**

Current ARC grading already reads current scoped competency ratings rather than arithmetically averaging rating history. Replacing a rating through reassessment leaves the earlier value in history, but that old value no longer directly depresses the grade. Future evidence derivation improves how ARC establishes the current 1–4 level and must not reintroduce lifetime averaging.

Unrated/Not Assessed and `ABS`/Excused are excluded today. `NE`/No Evidence/No Attempt is 0% and included. Not-yet-assessed must never be treated as failure. Before implementation, `NE` semantics require review because Competency/Skills carries 50% of the external grade: `NE` must mean a legitimate required opportunity existed and the student produced no evidence or made no attempt, never merely that the competency has not been assessed yet.

## Evidence-derived competency architecture

Competencies are evidence-derived by default in the approved future design. Relevant assessments and legitimate instructor evidence contribute automatically. ARC maintains a current competency level from the body of evidence; the instructor does not approve every derived change, and the workflow must not create an approval queue.

Instructor override authority is mandatory. An override must remain historically distinguishable from a derived result, including who made it, when, the overridden and replacement values, and an optional rationale. ARC may later suggest review when evidence strongly conflicts with an override, but must not nag after each assessment.

### Explainability contract

For any current level, ARC must answer: **Why does ARC think this student is a 3?** The explanation must expose the supporting evidence, dates, assessment and evidence types, course/technical context, trend, contradictions, reassessments, and the effect of any override. A displayed level without a traceable explanation is insufficient.

Every competency experience must eventually answer:

1. **WHERE AM I?** Current evidence-derived level.
2. **WHY AM I HERE?** Evidence and deterministic rule explaining that level.
3. **WHAT DO I NEED NEXT?** Explicit qualifying requirement for the next level.
4. **WHAT SHOULD I PRACTICE / DO NOW?** Specific weak criteria and/or an instructor-approved task that moves the student forward.

Example presentation:

> **SMAW Fillet Weld Quality — 2 Developing**
> Why: recent evidence shows inconsistent bead profile/tie-in.
> To reach Proficient: two recent qualifying Proficient-or-better demonstrations.
> Progress: `1 of 2`.
> Next focus: Bead/Profile Consistency; Fusion/Tie-In.

ARC may show grounded progress-within-level phrases such as `Developing · Almost Proficient` or `Proficient · Progressing Toward Advanced`. These are presentation phrases, not new official levels. Official 1–4 and `60/75/90/100` remain unchanged.

Official derivation must be deterministic: the same evidence and rules produce the same official level. AI may later summarize evidence in plain language, but it does not own the official 1–4 calculation.

### Approved progression starting rules

The following reconciled evidence principle is frozen:

> **Quality determines demonstrated level. Recent repeated evidence confirms consistency. Required context diversity confirms breadth where the competency itself claims transfer, variation, multiple contexts, or broader application.**

The official 1–4 levels are quality descriptors, not attempt counts. Developing-quality evidence may establish Developing. The first Proficient-quality demonstration is recorded as Proficient-quality evidence and is never mislabeled Introduced merely because it is first. Recent repetition supplies the consistency required for an established level. Diversity is required because a competency claims breadth, not merely to make Advanced harder.

These rules are the deterministic starting model. Remaining evidence-strength, recency-window, context-diversity, and edge-case details still require instructor-reviewed design. Specialized Safety, continuous-habit, comprehensive-knowledge, versioned-product, troubleshooting, and integrated-fabrication models retain their specialized rules.

#### 1 → 2

One legitimate Developing-or-better qualifying performance may establish **2 Developing**.

#### 2 → 3

Two recent qualifying Proficient-or-better demonstrations are required.

- `2 → 3 → 3` supports Proficient.
- `1 → 2 → 3` remains Developing/approaching Proficient until another qualifying 3+ confirms consistency.

#### 3 → 4

Three recent qualifying Advanced demonstrations are required, with appropriate context diversity where the competency warrants it. Advanced represents repeated above-standard performance rather than one unusually strong result.

#### Downward movement

One poor performance does not demote an established competency. It remains visible as a concern/watch item. Repeated recent evidence below the established level—starting conceptually with two meaningful contradictory performances—may justify downward derivation or instructor review. Edge cases remain to be refined, but conservative demotion is approved.

#### Reassessment

Reassessment is strong recent evidence and is not averaged forever with obsolete beginner work. One Proficient reassessment may still require confirmation where consistency is required. For example, `1 → reassessment 3 → 3` supports Proficient. Full history remains available.

### Evidence types

The future engine distinguishes evidence types.

Potential strong/qualifying evidence includes:

- Welding Performance assessment;
- Thermal Cutting assessment;
- relevant completed Project rubric criterion;
- Drawing/Planning assessment;
- formal competency reassessment;
- instructor-approved qualifying challenge.

Potential supporting evidence includes:

- checkpoint verification;
- instructor observation;
- Open Shop observed performance;
- appropriate project-stage evidence.

Knowledge evidence may support knowledge competencies but cannot alone prove physical welding or cutting proficiency. Final evidence strength, weighting, qualification, recency, and context rules remain subject to instructor-reviewed design.

### Derivation inputs

The final algorithm is intentionally unresolved. A future implementation must evaluate, at minimum:

- recency;
- repeated demonstration and consistency;
- evidence strength and type;
- technical, process, joint, position, task, and course context where relevant;
- WT/AWT expectations;
- contradictory recent evidence;
- reassessment;
- insufficient or absent evidence;
- a stable later body of mastery without permanently depressing it with early beginner evidence.

A lifetime arithmetic average is not approved. Historical evidence remains visible even when it no longer controls the current demonstrated level.

### Evidence record responsibilities

Evidence should have a stable identity and retain its source assessment or observation, criterion, competency relationship, demonstrated level or evidence strength, date, course/section/grading-period context, technical context, provenance, and supersession or correction history. Derived state is a projection of authoritative evidence, not a second manually maintained record.

## Running Competency / Skills external grade

ARC must not create independent weekly competency assignments whose average punishes students for starting at Introduced or Developing.

The approved direction is:

1. ARC continuously maintains evidence-derived competencies.
2. The external school gradebook contains one running **Competency / Skills** value for the active grading period.
3. ARC tells the instructor when that existing value should be updated.
4. The instructor replaces the external value instead of adding another weekly snapshot.
5. Early levels remain in evidence history without becoming permanent arithmetic penalties.
6. ARC preserves grading-period snapshots while longitudinal competency history continues across periods.

The frozen competency conversion is `1→60`, `2→75`, `3→90`, and `4→100`. Current code shares its `ratingPct` authority with project-rubric conversion. Future rubric redesign must separate the named competency conversion from rubric scoring authority so a rubric change cannot accidentally alter the 50% Competency/Skills conversion, even when the numeric mappings happen to match.

## Coherent assessment family

All four approved technical rubrics use the frozen `1 Introduced = 60%`, `2 Developing = 75%`, `3 Proficient = 90%`, `4 Advanced = 100%` conversion. Level 3 represents successful performance at the expected course and task standard. WT and AWT share labels and conversion while applying different course/task performance expectations.

Routine PPE/safety behavior, participation, cleanup, refusal, and professional shop habits remain Workplace authority and are not duplicated as technical rubric criteria. One assessment may create an assignment grade and legitimate criterion-level competency evidence in a single grading action, subject to the evidence safeguards below.

### Revised Project/Fabrication Rubric

Status: **Approved.**

Purpose: **How well did the student fabricate the finished project?**

Four equal criteria, 25 points each.

#### Measurement & Dimensional Accuracy — 25

- **1:** Significant dimensional, layout, alignment, or squareness errors are present. Finished dimensions do not consistently meet project requirements.
- **2:** Most dimensions and layout are usable, but noticeable inaccuracies are present. Some dimensions, alignment, or squareness fall outside expected project quality.
- **3:** Dimensions, layout, alignment, and squareness meet the expected course and project requirements. Only minor inaccuracies are present.
- **4:** Dimensions, layout, alignment, and squareness consistently exceed expected course/project requirements. Critical dimensions show excellent precision and control.

#### Fit-Up & Fabrication — 25

- **1:** Component preparation, alignment, gaps, tack-up, or assembly show significant problems that affect fabrication quality or require substantial correction.
- **2:** Fit-up and assembly are functional, but noticeable issues remain with preparation, alignment, gaps, tack placement, or component positioning.
- **3:** Components are properly prepared, positioned, fitted, and assembled. Gaps, alignment, tack-up, and assembly meet expected course/project requirements with only minor issues.
- **4:** Fit-up is consistently precise and stable. Preparation, alignment, gaps, tack placement, and assembly demonstrate excellent fabrication quality and control.

#### Welding Quality — 25

- **1:** Welds incorporated into the project show significant problems with placement, profile, consistency, fusion/tie-in, starts/stops, or visible discontinuities. Weld quality is below project expectations.
- **2:** Welds are generally functional but show noticeable inconsistency or defects in placement, profile, consistency, fusion/tie-in, starts/stops, or overall quality.
- **3:** Welds meet expected course/project requirements for placement, size/profile, consistency, fusion/tie-in, starts/stops, and visible discontinuities. Only minor defects are present.
- **4:** Welds consistently exceed expected course/project requirements and demonstrate excellent placement, profile, consistency, fusion/tie-in, starts/stops, and overall weld quality.

#### Workmanship & Finished Quality — 25

- **1:** Finished project requires substantial rework or cleanup. Edges, surfaces, spatter, finish, component condition, or overall craftsmanship are below expected project quality.
- **2:** Project is functional and generally presentable, but noticeable cleanup, finishing, edge/surface, spatter, or craftsmanship issues remain.
- **3:** Finished project is clean, functional, and presentable. Edges, surfaces, spatter removal, finish, and overall craftsmanship meet expected course/project requirements with only minor issues.
- **4:** Finished project demonstrates exceptional craftsmanship and attention to detail. Edges, surfaces, finish, cleanup, and overall presentation consistently exceed expected course/project requirements.

Scope: technical result only. There is no Safety/Work Process or Independence/Problem-Solving category. Project definitions may later provide tolerances, critical dimensions, weld requirements, and finish requirements. Broad Project Welding Quality may support evidence, but dedicated Welding Performance is stronger detailed welding evidence. Asking for help does not by itself lower technical product quality.

### Welding Performance Rubric

Status: **Approved and frozen.**

Purpose: **How well did the student perform this weld?**

Five equal criteria, 20 points each.

#### Weld Size & Placement — 20

- **1:** Weld placement and/or size frequently does not meet requirements of the joint/task.
- **2:** Generally placed correctly but noticeable variation in location, size, or coverage.
- **3:** Correctly placed and maintains required size/coverage with only minor variation.
- **4:** Placement and size consistently precise and exceed expected course/task quality.

#### Bead Profile & Consistency — 20

- **1:** Width, height, contour, or travel pattern substantially inconsistent.
- **2:** Functional but noticeable variation in width, contour, reinforcement, or travel consistency.
- **3:** Profile consistent and appropriate for process/joint with only minor variation.
- **4:** Highly consistent, uniform, and well controlled throughout.

#### Fusion & Tie-In — 20

- **1:** Visible evidence shows significant fusion/tie-in problems at joint/toes.
- **2:** Generally achieved but noticeable inconsistency/areas of concern.
- **3:** Meets expected requirements throughout with only minor imperfections.
- **4:** Consistently well controlled and demonstrates excellent joint integration.

#### Starts, Stops & Termination — 20

- **1:** Starts/restarts/stops/crater termination/tie-ins show significant defects or poor control.
- **2:** Functional but inconsistent; visible restart/crater/termination issues remain.
- **3:** Properly controlled with only minor imperfections.
- **4:** Consistently smooth, controlled, and difficult to distinguish from surrounding weld.

#### Discontinuities & Overall Weld Quality — 20

- **1:** Significant visible discontinuities/defects substantially reduce quality.
- **2:** Generally functional but noticeable discontinuities, defects, or inconsistent areas.
- **3:** Meets expected course/task quality with only minor visible discontinuities/imperfections.
- **4:** Consistently high quality with minimal visible discontinuities and excellent overall workmanship.

Record process, joint, position, material, task, and useful process details. The core rubric supports SMAW, GMAW, FCAW, and GTAW without needless duplicate rubrics. Visual inspection must not claim to prove internal penetration or fusion; destructive, bend, macro, or other testing may later provide stronger separate evidence. Safety remains Workplace authority. These criteria are strong potential welding evidence.

### Thermal Cutting Rubric

Status: **Approved and frozen.**

Purpose: **How well did the student perform the cut?**

Five equal criteria, 20 points each.

#### Layout & Cut Accuracy — 20

- **1:** Significant dimensional/line-following errors; cut does not consistently follow required path/dimensions.
- **2:** Generally usable but noticeable deviation from intended line, shape, or dimensions.
- **3:** Meets expected dimensions and follows intended path with only minor deviation.
- **4:** Consistently precise with excellent dimensional/line-following control.

#### Cut Face & Kerf Quality — 20

- **1:** Substantial irregularity, excessive bevel, roughness, or other quality problems.
- **2:** Functional but noticeable variation in kerf, cut-face quality, bevel, or surface condition.
- **3:** Consistent and appropriate for process/material with only minor imperfections.
- **4:** Excellent consistency, minimal unwanted bevel/irregularity, high-quality process control.

#### Travel & Process Control — 20

- **1:** Speed, distance, angle, or process control substantially inconsistent and harms cut.
- **2:** Maintains process through most of cut but noticeable variation affects quality.
- **3:** Speed, distance, angle, and control appropriate/consistent with only minor variation.
- **4:** Consistently precise, producing smooth controlled cut throughout.

#### Piercing, Starts & Stops — 20

- **1:** Significant loss of control/damage in piercing, starts, stops, restarts, transitions.
- **2:** Functional but noticeable irregularity, excess material damage, or inconsistent transitions.
- **3:** Controlled and meets expected quality with only minor imperfections.
- **4:** Consistently clean, precise, well controlled, minimal effect on finished quality.

#### Dross, Edge Condition & Overall Cut Quality — 20

- **1:** Excessive dross/slag, rough edges, gouging, or defects require substantial correction/below expected quality.
- **2:** Usable but noticeable dross/slag, edge irregularity, cleanup needs, or quality issues.
- **3:** Acceptable edge/overall quality with minimal dross/slag and only minor cleanup.
- **4:** Excellent edge condition, minimal dross/slag, clean geometry, consistently high quality.

Record OFC/PAC or other process, task/cut type, material, thickness, dimensions/length, and useful setup context. OFC and PAC share the core rubric with appropriate context. Safety remains Workplace authority. These criteria are strong potential cutting evidence.

### Drawing/Planning Rubric

Status: **Approved and frozen.**

Purpose: **Can the student create a drawing/plan that clearly and accurately communicates how the part/project is to be fabricated?**

Use only when the student creates the drawing or plan. An instructor-supplied blueprint alone does not create a drawing-creation grade. The drawing grade belongs to Technical Knowledge.

Five equal criteria, 20 points each.

#### Views & Representation — 20

- **1:** Incomplete/difficult to interpret; required views/details missing or object not clear enough for fabrication.
- **2:** Major features represented and generally understandable, but views/details incomplete, unclear, or unnecessary.
- **3:** Appropriate views/details clearly represent object and provide expected course/task information.
- **4:** Exceptionally clear, efficient, complete; complex features communicated effectively without unnecessary information.

#### Dimensions & Accuracy — 20

- **1:** Important dimensions missing, incorrect, conflicting, or poorly placed for fabrication.
- **2:** Most required dimensions usable, but some missing, redundant, unclear, or inaccurate.
- **3:** Required dimensions accurate, appropriately placed, sufficient to fabricate with only minor issues.
- **4:** Consistently precise, complete, efficient, organized; critical dimensions/relationships exceptionally clear.

#### Symbols, Labels & Technical Information — 20

- **1:** Required labels/material info/welding symbols/notes/technical info substantially missing or incorrect.
- **2:** Most necessary information present but some labels/symbols/notes/specs/conventions incomplete/inconsistent.
- **3:** Appropriate labels, symbols, notes, material info, and conventions meet expected requirements.
- **4:** Comprehensive, precise technical information using appropriate conventions consistently.

#### Layout, Organization & Readability — 20

- **1:** Poorly organized/difficult to read; line work, spacing, scale/proportion, labels, or arrangement interfere.
- **2:** Generally readable but noticeable organization, spacing, line quality, proportion, scale, or clarity issues.
- **3:** Clean, organized, readable, appropriately arranged; line work/spacing/proportion/scale/presentation meet expectations.
- **4:** Exceptionally clear/professionally organized; visual hierarchy, line work, spacing, scale/proportion make fabrication info easy to interpret.

#### Fabrication Completeness & Usability — 20

- **1:** Not enough reliable information to fabricate without substantial clarification/correction.
- **2:** Can support fabrication but requires clarification, assumptions, or added information.
- **3:** Contains information reasonably needed to fabricate at expected course level with only minor clarification.
- **4:** Exceptionally complete/fabrication-ready; another appropriately skilled person could reliably fabricate with minimal clarification.

The same core rubric applies to hand drawing and CAD; method is context rather than automatic quality. Record course, drawing type, complexity, method, and optional linked project. WT/AWT and course/task requirements determine expected complexity and quality.

## Evidence relationships and safeguards

The technical rubric family is approved. The complete WT and AWT mappings and evidence pathways are frozen below. No runtime evidence engine is authorized.

Criterion-level evidence may legitimately support related competencies:

- welding criteria → relevant welding competencies;
- project criteria → relevant fabrication, measurement, and welding competencies;
- cutting criteria → relevant cutting competencies;
- student-created drawing criteria → planning and drawing competencies;
- Technical Knowledge results → knowledge competencies where the assessment actually demonstrates them;
- instructor observations → competency evidence even without a formal graded assignment.

A written quiz is not evidence of physical welding ability. An overall project percentage must not be indiscriminately copied to many competencies. Mappings should use legitimate criterion-level evidence and retain the evidence context.

Dedicated Welding Performance criteria are stronger detailed welding evidence than the broad Welding Quality criterion inside a Project/Fabrication rubric. Dedicated Thermal Cutting criteria are strong cutting evidence. Drawing/Planning criteria are strong drawing and planning evidence.

Corrections to an assessment must update all projections while preserving audit history. ARC must prevent duplicate evidence when one grading event feeds several views.

## Frozen WT evidence architecture

Every current WT competency now has an approved legitimate evidence pathway. This authority completes WT evidence design without renaming or redesigning the WT competency catalog. Runtime evidence derivation remains unimplemented.

### Universal evidence rules

The following rules are frozen across WT evidence relationships. In the mapping tables, `R/Q` means required qualifying evidence, `Q` means qualifying evidence, `S` means supporting evidence, and `—` means no relationship.

- One assessment gives at most one qualifying demonstration per competency.
- Every required gate must meet the target.
- Assignment grade and competency qualification are separate results.
- A legitimate task-defined N/A criterion is excluded rather than scored as zero.
- Evidence preserves task, process, technical context, and academic scope.
- Not-yet-assessed is not failure.

### WT Welding Performance mapping

This mapping is approved and frozen.

| Competency | Size/Placement | Profile | Fusion/Tie-In | Starts/Stops | Overall |
|---|---|---|---|---|---|
| WT-W1 SMAW Equipment & Setup | — | — | — | — | — |
| WT-W2 Arc Control | S | R/Q | S | R/Q | S |
| WT-W3 Stringer Beads | R/Q | R/Q | N/A where legitimately inapplicable | R/Q | R/Q |
| WT-W4 Fillet Weld | R/Q | R/Q | R/Q | S | R/Q |
| WT-W5 Basic Joints | R/Q | R/Q | R/Q | S | R/Q |
| WT-W6 Welding Improvement | — | S | S | S | S |

WT-W1 requires separate setup evidence. WT-W5 Proficient additionally requires at least two different qualifying joint configurations. WT-W6 qualification uses the Diagnose & Correct model below. Broad Project Welding Quality is supporting evidence unless an explicit Welding Performance assessment is performed.

### WT Thermal Cutting mapping

This mapping is approved and frozen.

| Competency | Layout/Accuracy | Cut Face/Kerf | Travel/Control | Piercing/Starts | Edge/Overall |
|---|---|---|---|---|---|
| WT-T1 Cutting Equipment | — | — | — | — | — |
| WT-T2 Cutting Setup | — | S | S | S | — |
| WT-T3 Straight Cutting | R/Q | R/Q | R/Q | S | R/Q |
| WT-T4 Cutting Accuracy | R/Q | R/Q | S | — | R/Q |

WT-T1 requires equipment evidence. WT-T2 requires setup evidence. Evidence preserves OFC, PAC, or other process context, but WT Proficient does not require both OFC and PAC unless later curriculum authority requires both.

### WT Project/Fabrication mapping

This mapping is approved and frozen.

| Competency | Measurement/Accuracy | Fit-Up/Fabrication | Welding Quality | Workmanship |
|---|---|---|---|---|
| WT-M1 Measurement | R/Q* | S | — | — |
| WT-M2 Layout | R/Q* | S | — | — |
| WT-M3 Squareness & Accuracy | R/Q | S | — | S |
| WT-F1 Fabrication Sequence | S | S | S | S |
| WT-F2 Fit-Up | S | R/Q | — | S |
| WT-F3 Project Application | R/Q | R/Q | R/Q | R/Q |

`*` WT-M1 and WT-M2 results are qualifying only when the student actually performs the measurement or layout operation. Future Activity definitions preserve which operations the student performed. WT-F1 requires authoritative workflow evidence. WT-F3 requires all four gates; Advanced requires appropriate diversity and complexity.

### WT Drawing/Planning mapping

This mapping is approved and frozen.

| Competency | Views | Dimensions | Symbols/Technical Info | Organization/Readability | Completeness |
|---|---|---|---|---|---|
| WT-D1 Drawing Interpretation | S | S | S | S | S |
| WT-D2 Drawing Lines | R/Q | — | S | R/Q | — |
| WT-D3 Sketching | R/Q | R/Q | S | R/Q | R/Q |
| WT-M1 Measurement | — | S | — | — | — |
| WT-M2 Layout | — | S | — | S | S |

The following qualification rules are part of the frozen mapping:

- WT-D1 requires separate interpretation evidence. Drawing-creation criterion results are supporting evidence only.
- WT-D2 may qualify through appropriate student-created drawing work.
- WT-D3 may qualify only when the task is explicitly intended to assess Sketching. CAD or other drawing work does not automatically qualify WT-D3.
- WT-M1 and WT-M2 drawing evidence is supporting only. Physical measurement and layout require appropriate shop evidence.
- One assessment provides at most one qualifying demonstration per competency.
- Every required gate for a competency must meet the target before that assessment becomes a qualifying demonstration for that competency.

### WT non-rubric evidence sources

These evidence pathways are approved and frozen:

| Competency | Approved primary evidence pathway |
|---|---|
| WT-S1 PPE | Workplace observation/history under the deterministic Safety Evidence Model. |
| WT-S2 Shop Safety | Workplace behavior plus safety demonstration or knowledge. |
| WT-S3 Equipment Safety | Equipment-operation observation or challenge with equipment context. |
| WT-S4 Shop Responsibility | Longitudinal Workplace evidence. |
| WT-K1 Welding Terminology | Technical Qualifying Assignment. |
| WT-K2 Weld Joints | Technical Assignment or identification challenge. |
| WT-K3 Weld Symbols | Technical Assignment or interpretation challenge. |
| WT-D1 Drawing Interpretation | Drawing-reading Technical Assignment or challenge. |
| WT-T1 Cutting Equipment | Identification or operation challenge. |
| WT-T2 Cutting Setup | Observed setup challenge. |
| WT-W1 SMAW Equipment & Setup | Observed setup challenge. |
| WT-W6 Welding Improvement | Diagnose & Correct or troubleshooting challenge. |
| WT-F1 Fabrication Sequence | Authoritative project workflow and checkpoint history. |

Authentic knowledge use, drawing/cutting/welding results, Workplace and equipment evidence, and finished Project rubric results remain supporting evidence where the approved relationship applies.

### Four evidence modes

The following modes are frozen:

1. **Rubric Evidence:** criterion-level technical assessments.
2. **Challenge / Assignment Evidence:** Technical Assignments and Skill Challenges.
3. **Workflow Evidence:** project, checkpoint, and activity progression.
4. **Habit / Continuous Evidence:** repeated Workplace and shop behavior.

**Instructor Observation** is first-class evidence across these modes. A future observation record preserves the student, competency, observed level, task and context, timestamp and academic scope, optional note or photo, and Supporting or Qualifying designation. A qualifying observation requires defensible context and must not become an arbitrary manual-rating shortcut.

### Knowledge competency rule

One sufficiently comprehensive instructor-approved Qualifying Assessment may establish a knowledge competency when it contains enough independent opportunities. The Activity definition declares whether that condition is met; ARC does not infer it from question count. Physical performance normally retains its repeated-demonstration requirements.

## Foundational Safety authority

**Safety is a prerequisite for participation, not merely another competency students gradually develop.**

- WT and AWT use the same required safety standard.
- Technical expectations may differ by course; safety expectations do not.
- Required safe behavior begins immediately.
- Under current instructor policy, safety glasses are required in the welding classroom even on paperwork days.
- Safety may gate Ready to Work, Projects, Practice, Skill Challenges, and Open Shop.
- A Workplace consequence and safety-competency evidence are separate legitimate purposes rather than duplicate grading.
- ARC must not claim external regulatory compliance. The rationale is preparation for serious safety expectations in future industrial and workplace environments.
- The student-facing principle is: **Safety comes before skill. You are allowed to be learning how to weld. You are not allowed to work unsafely.**

### Deterministic Safety Evidence Model

This model is approved and frozen.

- Derivation uses the **10 most recent applicable sessions**.
- PPE applies essentially every attended welding-class session under current policy.
- Equipment safety applies when the equipment or process is relevant.
- Shop Responsibility applies when shop, workspace, tool, or cleanup expectations apply.
- New students begin **Not Yet Assessed**.
- Initial Proficient requires **five applicable sessions of independent compliance**, no unresolved Major or Critical event, and no repeated Minor pattern.
- Every Minor receives immediate intervention and the appropriate Workplace consequence.

Within the rolling ten-session window:

- One Minor: Proficient may remain; operational status becomes `Concern / Watch`.
- Two Minors: Proficient may remain; operational status remains a stronger `Concern / Watch`.
- **Three Minors: a repeated pattern exists and the derived competency becomes Developing.**

The three-Minor threshold controls competency derivation, not the immediate Workplace consequences.

A **Major** event creates immediate `Instructor Review Required`. ARC does not blindly select a final competency level of 1, 2, or 3.

A **Critical** event creates immediate `Not Ready to Work — Safety Review Required`. Instructor intervention, remediation, and clearance are required before normal applicable work resumes.

Recovery after a three-Minor Developing result requires **five consecutive applicable compliant sessions without prompting**. Recovery from Major or Critical events may additionally require instructor-defined remediation and clearance.

Advanced safety requires near-perfect recent compliance plus **two explicit independent hazard-recognition or prevention demonstrations**, preferably in different contexts. Advanced cannot be inferred solely from having no violations. When Advanced evidence ages or is lost, the competency may return to Proficient without implying unsafe behavior.

The system keeps two concepts distinct:

- **Competency level:** 1 Introduced, 2 Developing, 3 Proficient, or 4 Advanced.
- **Operational Safety Status:** Ready, Concern / Watch, Instructor Review Required, or Not Ready to Work — Safety Review Required.

### Safety gate for technical assessment

When required safety prerequisites are unmet during technical work, the instructor intervenes immediately and ARC records the appropriate Workplace consequence and Safety evidence. The technical challenge may become **not qualifying/incomplete due to unmet safety prerequisite**. ARC must not represent the safety event merely by subtracting arbitrary technical-rubric points.

## Frozen competency-specific derivation rules

### WT-W6 Diagnose & Correct

Qualifying evidence demonstrates all four elements:

1. Identify an observable weld problem.
2. Identify a reasonable likely cause.
3. Select an appropriate correction.
4. Demonstrate or evaluate improvement.

Proficient requires **two qualifying demonstrations involving different troubleshooting problems or contexts**. Advanced requires stronger, diverse troubleshooting evidence. Resources may support learning and Practice but do not automatically prove the qualifying answer.

### WT-F1 Fabrication Sequence

The Project or Activity definition owns its authoritative workflow. Evaluation determines whether the student follows that project's required workflow. Legitimate N/A stages do not count against the student.

Starting progression is frozen:

- One substantially correct qualifying workflow may establish Developing.
- Two qualifying workflows establish Proficient.
- Three stronger and appropriately diverse workflows may support Advanced.

## Frozen AWT evidence architecture

This authority uses the verified current 34-competency AWT catalog without renaming or redesigning it. Unless a specialized rule below states otherwise, Proficient normally requires two recent Proficient-or-better qualifying demonstrations. Advanced normally requires three recent Advanced-quality demonstrations plus the breadth claimed by the competency descriptor.

One weak result does not automatically erase established proficiency; repeated recent contradiction may trigger conservative review. Reassessment is strong recent evidence. ARC does not calculate competency level through a lifetime arithmetic evidence average.

### AWT GMAW

- **AWT-G1 GMAW Equipment & Safety:** observed equipment/safety challenge; two recent Proficient-or-better demonstrations; no artificial diversity requirement. Continuous Safety remains separate.
- **AWT-G2 Base-Metal Preparation:** observed preparation or assessed preparation stage; two recent Proficient-or-better demonstrations. Advanced uses varied material or joint preparation demands.
- **AWT-G3 Machine Setup:** setup challenge or explicit setup assessment; two recent Proficient-or-better demonstrations. Advanced varies material, joint, position, or weld-response context.
- **AWT-G4 Bead Control:** Welding Performance evidence; two recent Proficient-or-better demonstrations. Advanced requires changing-condition breadth.
- **AWT-G5 Fillet Welds:** Welding Performance evidence. Required qualifying criteria are Size & Placement, Profile & Consistency, Fusion & Tie-In where legitimately assessable, and Overall Weld Quality. Starts/Stops is Supporting. Proficient requires two recent Proficient-or-better demonstrations with no separate Proficient diversity gate.
- **AWT-G6 Joint Application:** Welding Performance plus joint context. Proficient requires two recent Proficient-or-better demonstrations in different instructor-approved joint configurations. Advanced requires multiple meaningful joint or application contexts.
- **AWT-G7 Troubleshooting:** Diagnose & Correct evidence captures the problem, cause or causes, correction, action, and result or evaluation as appropriate. Proficient requires two recent Proficient-or-better demonstrations involving different problems. Advanced requires three diverse Advanced-quality diagnosis, test, and verification demonstrations.

### AWT Inspection

- **AWT-I1 Visual Weld Inspection:** Visual Inspection Challenge or Technical Assignment using a physical weld, student weld, approved sample, or legitimate visual record. ARC never claims unseen internal penetration or fusion. Proficient requires two recent Proficient-or-better demonstrations. Varied samples apply especially to Advanced. Preserve a sample or photo reference when practical.
- **AWT-I2 Discontinuity Identification:** Identification Challenge. Proficient requires two recent Proficient-or-better demonstrations involving different discontinuities or meaningfully different samples. Advanced requires varied contexts plus the Level-4 significance and differentiation described by the catalog.
- **AWT-I3 Corrective Action:** Corrective Action or Diagnose & Correct evidence captures problem → cause or causes → correction → rationale. Stronger evidence also applies and evaluates the correction. Proficient requires two recent Proficient-or-better demonstrations in different contexts. Advanced requires three diverse Advanced-quality contexts.

One authentic Activity may create distinct criterion-level AWT-I1, AWT-I2, AWT-I3, and AWT-G7 evidence when each competency is genuinely demonstrated. ARC never copies one overall score to those competencies.

### AWT Advanced Cutting

- **AWT-C1 Cutting Equipment:** Equipment/Operation Challenge plus observation; two recent Proficient-or-better demonstrations. Equipment or process breadth applies only when legitimate curriculum opportunity exists. Untaught or unavailable processes must not make proficiency impossible.
- **AWT-C2 Cutting Layout:** Layout Challenge, assessed Activity, or assessed Project stage; two recent Proficient-or-better demonstrations. Advanced varies layout, reference, sequence, or material-conservation demands.
- **AWT-C3 Cutting Performance:** Thermal Cutting Performance rubric. Required qualifying criteria are Layout & Cut Accuracy; Cut Face & Kerf Quality; Travel & Process Control; Piercing/Starts/Stops where applicable; and Dross/Edge/Overall Quality. Evidence preserves process, cut type, material, thickness, dimensions or length, setup, and task context. Proficient requires two recent Proficient-or-better demonstrations. Advanced uses more complex or varied tasks.
- **AWT-C4 Cut Quality:** Cut Quality Inspection or Diagnose & Correct evidence. A cutting-quality rubric may support but does not replace diagnosis. Proficient requires two recent Proficient-or-better demonstrations involving different conditions or samples. Advanced requires three diverse Advanced-quality contexts.

One cutting Activity may yield distinct AWT-C2, AWT-C3, and AWT-C4 evidence. It may yield AWT-C1 evidence only when equipment operation is explicitly assessed.

### AWT Fabrication Drawings

- **AWT-D1 Drawing Interpretation:** Interpretation Technical Assignment or Challenge; two recent Proficient-or-better demonstrations. Advanced requires varied or complex drawings.
- **AWT-D2 Fabrication Planning:** Fabrication Plan or Project planning stage; two recent Proficient-or-better demonstrations. Advanced uses varied planning problems involving fit-up, distortion, access, quality, or rework.
- **AWT-D3 Layout:** physical layout from a drawing; two recent Proficient-or-better demonstrations. Advanced varies layout or material-use demands. AWT-D3 and AWT-C2 may both receive distinct evidence when both are actually assessed.
- **AWT-D4 Fabrication from Drawing:** Project/Fabrication evidence. Required qualifying criteria are Measurement & Dimensional Accuracy, Fit-Up & Fabrication, and Workmanship & Finished Quality. Welding Quality is Supporting. Proficient requires two recent Proficient-or-better demonstrations. Advanced requires different fabrication or drawing contexts. Instructor-supplied drawings can generate AWT-D1 and AWT-D4 evidence but not drawing-creation grades.

### AWT Applied Academics

- **AWT-M1 Applied Measurement:** authentic fabrication measurement or calculation, a Project/Fabrication dimensional criterion, or a Skill Challenge; two recent Proficient-or-better demonstrations. Advanced uses more complex measurement or calculation contexts.
- **AWT-M2 Welding Communication:** authentic technical communication through Observation, approved assignments, or workflows. Evidence may be spoken, written, an annotated drawing, an inspection report, a troubleshooting explanation, or another legitimate technical form. ARC does not grade personality, charisma, volume, or sociability. Proficient requires two recent Proficient-or-better demonstrations in meaningfully different authentic contexts. Advanced requires three diverse Advanced-quality contexts.

ARC captures authentic shop evidence instead of manufacturing separate assignments solely for grading.

### AWT Fabrication

- **AWT-F1 Fit-Up:** Project Fit-Up checkpoint or Skill Challenge, assessed before welding hides the evidence. Fit-Up & Fabrication is required qualifying evidence; dimensional evidence may support. Proficient requires two recent Proficient-or-better demonstrations. Advanced varies distortion, tack, access, or dimensional demands.
- **AWT-F2 Fabrication Sequence:** Project Workflow Evidence plus planning support. AWT-D2 creates the plan; AWT-F2 follows and adapts an effective sequence. Proficient requires two recent Proficient-or-better demonstrations. Advanced requires tasks where optimization genuinely matters.
- **AWT-F3 Dimensional Accuracy:** Project/Fabrication Measurement & Dimensional Accuracy required qualifying evidence plus final verification. Evidence preserves requirement or tolerance, observed dimension, compliance or deviation, and correction or evaluation. Proficient requires two recent Proficient-or-better demonstrations. Advanced uses increasing tolerance or correction demands.
- **AWT-F4 Integrated Fabrication:** an explicitly AWT-F4-eligible integrated Project. A Proficient project must genuinely evidence drawing use, layout, cutting, preparation, welding, and inspection. Completion alone is not AWT-F4 evidence. Proficient requires two recent Proficient-or-better integrated projects. Advanced requires three different or complex Advanced-quality integrated projects demonstrating independence, planning, execution, inspection, troubleshooting, evaluation, and high-standard work.

### Activity evidence-declaration safeguard

Every Activity or Project capable of producing qualifying evidence explicitly declares its competency relationship; evidence-producing criterion, stage, checkpoint, workflow, or assessment; required gates; and context. Completion alone never automatically generates competency evidence. ARC never copies an overall Activity or Project percentage across competencies.

### AWT Advanced Process

The actual selected advanced process is required context for AWT-P1 through AWT-P4. Multiple advanced processes are not required unless curriculum explicitly requires and provides them.

- **AWT-P1 Process Safety & Equipment:** Process Equipment/Safety Challenge plus observation; two recent Proficient-or-better demonstrations. Advanced varies setup or hazard decisions. Continuous Safety remains separate.
- **AWT-P2 Material Preparation:** actual preparation or an assessed Activity stage. Evidence preserves process, material, joint, task, and preparation context. Proficient requires two recent Proficient-or-better demonstrations. Advanced uses different preparation demands.
- **AWT-P3 Process Demonstration:** Welding Performance evidence contextualized to the selected process, using criteria only where legitimate. Proficient requires two recent Proficient-or-better demonstrations. Advanced requires more challenging applications or conditions.
- **AWT-P4 Advanced Application:** advanced-process application Project or Challenge. An Advanced-eligible Activity genuinely requires selection, application, troubleshooting, evaluation, and independent complex fabrication. Proficient requires two recent Proficient-or-better demonstrations. Advanced requires three diverse or complex Advanced-quality applications.

### AWT Safety

- **AWT-S1 Independent Shop Safety:** Habit/Continuous Safety Evidence uses the universal deterministic model: the 10 most recent applicable sessions; five independently compliant sessions for initial Proficient; one or two Minors may retain Proficient with Concern / Watch; three Minors produce Developing; Major produces Instructor Review Required; Critical produces Not Ready to Work — Safety Review Required; recovery after three Minors requires five consecutive compliant applicable sessions without prompting; and Advanced requires near-perfect compliance plus two explicit hazard-recognition or prevention demonstrations. Competency level and operational Safety Status remain separate.
- **AWT-S2 Equipment Safety:** Equipment Workflow/Observation plus Safety Evidence across legitimately taught or assigned equipment. ARC never requires untaught equipment. Advanced adds independent condition, settings, and shutdown verification plus recognition and handling of basic concerns.

#### Single Safety Event safeguard

A Safety event is recorded once. Multiple legitimate consequences may derive from that event, but ARC does not duplicate the event or arbitrarily punish unrelated grades. AWT-S1 covers broad behavior; AWT-S2 covers transferable equipment safety; AWT-G1, AWT-C1, and AWT-P1 cover process-specific evidence. A Safety violation may make a technical opportunity nonqualifying, but it does not arbitrarily reduce technical product-quality rubric scores.

### AWT Career & Workplace

- **AWT-R1 Welding Career Knowledge:** comprehensive Technical Assignment or authentic exploration. The comprehensive-assessment rule may establish the competency when the Activity explicitly supplies sufficient independent opportunities. Advanced requires the depth in the current Level-4 descriptor.
- **AWT-R2 Personal Career Plan:** versioned Personal Career Plan product. Progression comes from product quality plus meaningful revision and growth, rather than repeated artificial plans. Versions are preserved.
- **AWT-R3 Industry Awareness:** comprehensive Technical Assignment, research, discussion, speaker or visit reflection, or another legitimate form. The comprehensive-assessment rule applies. Advanced requires the breadth and connections in the current Level-4 descriptor.
- **AWT-R4 Workplace Readiness:** authoritative Workplace Habit/Continuous Evidence, not a second manually maintained behavior grade. The Workplace category grade and AWT-R4 derivation are related outputs from shared evidence. Future Workplace evidence must capture affirmative observations such as initiative, collaboration or helping the team, professional communication, problem solving, and responsibility or ownership. Absence of negative events alone is not Advanced evidence. Advanced requires affirmative positive Level-4 evidence. The frozen ten-applicable-day window and progression model are defined in **Workplace, supplemental shop sessions, and semantic state authority** below. Safety and AWT-R4 remain separate.

### Shared AWT safeguards

The existing shared safeguards remain frozen: stable evidence identity and provenance; course, section, grading-period, date, assessment, criterion, and technical context; Supporting versus Qualifying evidence; instructor override, history, and explainability; no lifetime arithmetic evidence average; criterion-level evidence; one assessment supplying at most one qualifying demonstration per competency; assignment grade remaining separate from competency qualification; legitimate N/A; Not Yet Assessed remaining distinct from failure; the four evidence modes; Instructor Observation as first-class evidence; the comprehensive knowledge rule; the Safety model; the visual-inspection limitation; Practice normally remaining nonqualifying unless explicitly approved; and reassessment as strong recent evidence.

## Unassessed, ABS, and NE authority

These meanings are frozen:

- **Unassessed:** no legitimate required opportunity occurred; excluded from calculation.
- **ABS / Excused:** an opportunity occurred, but the student was legitimately excused or unavailable; excluded from calculation.
- **NE — No Evidence / No Attempt:** a legitimate required opportunity occurred, the student was expected and able to participate, and no assessable evidence exists because of no attempt, refusal, or failure to engage.

ARC must not create NE merely because a competency was covered. An actual required student opportunity must exist. Refusal may legitimately create both a Workplace refusal event or consequence and NE for the missed competency opportunity because those records represent different facts.

## ARC Activity Library

The approved future **ARC Activity Library** is the reusable authority for work that can be assigned, performed, assessed, repeated, and tracked. Project Bank becomes the Projects portion of this broader library rather than the sole reusable work-bank concept.

The Activity Library has four user-facing activity types.

### Projects

Projects are substantial finished fabrications. They normally belong to the Fabrication / Projects / Skill Challenges grade category, use the Project/Fabrication rubric, and produce evidence only through explicit linked assessments and criterion relationships. They are usually material- and resource-intensive.

### Technical Assignments

Technical Assignments cover knowledge, interpretation, planning, calculations, terminology, drawing, and similar technical work. They normally belong to Technical Knowledge. They may use points or the approved Drawing/Planning rubric and may produce mapped competency evidence when the work legitimately demonstrates the competency.

### Skill Challenges

**Skill Challenges** is the approved user-facing name for deliberate technical or physical assessment opportunities. When graded, they normally belong to Fabrication / Projects / Skill Challenges. They are the primary home for **Qualifying Evidence Opportunities** used by competency progression and Open Shop.

Completion does not itself create qualifying evidence or advancement. The assessed performance, required gates, evidence role, and target determine whether the result qualifies.

### Practice

Practice supports skill development before qualification. It is normally ungraded and nonqualifying, but may create practice or supporting history and may use an optional technical rubric for quick feedback. Practice can be assigned, started, completed, repeated, and tracked.

ARC should direct a struggling student to targeted Practice when that is more instructionally appropriate than repeatedly sending the student into formal qualification. A Practice activity may use a technical rubric for feedback without creating a grade or qualifying demonstration.

### Shared and specialized activity metadata

The future architecture should avoid four incompatible activity databases. Activity types share stable metadata where appropriate, potentially including:

- stable ID, title, type, instructions, and active/archive state;
- WT/AWT applicability and estimated duration;
- standards, competency relationships, prerequisites, and evidence role;
- materials and quantities;
- equipment, booths, and other resources;
- process, joint, position, material, thickness, task, and other assessment context;
- repeat and duplicate rules;
- attachments.

Specialized metadata remains type-specific:

- Projects add plans, drawings, cut lists, checkpoints, and rubric relationships.
- Technical Assignments add points, questions, files, and an optional rubric.
- Skill Challenges add qualifying targets, gates, and assessment context.
- Practice adds practice targets, repeatability, optional feedback, and a default nonqualifying role.

The exact activity schema is not frozen by this authority.

### Practice and material demand

Assigned Practice creates expected material demand even when it creates no grade. For example, four coupons assigned to ten students creates expected demand for forty coupons.

Expected demand does not consume or reserve inventory automatically. Material Inventory remains actual-stock authority. Future demand planning may combine assigned Projects, Skill Challenges, and Practice, and may later include scheduled activities through Today's Focus. Purchasing and preparation recommendations remain advisory; ARC must not automatically purchase, prepare, reserve, or consume material.

## Resources

The approved user-facing name is **Resources**. Resources is ARC's trusted contextual instructional and reference authority. It is not merely a folder of links and PDFs, and the sidebar must not add a redundant Resources heading around the destination.

The distinction is:

- **Activity Library: What can I do?**
- **Resources: What can help me understand, diagnose, or improve this?**

Approved resource types are:

- **Troubleshooting Guides:** symptom → possible causes → checks → possible corrections. Expected coverage includes undercut, porosity, overlap, lack of fusion, spatter, inconsistent bead, burn-through or edge wash, arc instability, dross, and poor cut face.
- **Parameter/Setup References:** instructor-approved amperage, voltage/WFS, electrode, polarity, shielding gas, thickness/material, cutting, and setup references. Settings must remain context-specific rather than being presented as universal.
- **Visual Reference Library:** good and poor welds, discontinuities, bead profiles, fit-up, cuts, drawings, symbols, electrodes, equipment, and components.
- **Terminology & Concepts.**
- **Technique/How-To Guides.**
- **Videos/Media:** instructor-created media and approved external media.
- **Charts & Quick References.**
- **Inspection Guides.**
- **Drawing/Blueprint References.**
- **Materials Reference.**
- **Equipment Guides.**
- **Safety References:** safety information may live here while safety grading remains Workplace authority.
- **Instructor Tips:** instructor-authored practical teaching and diagnostic knowledge.

### Resource metadata and approval authority

Future resources may carry a stable ID; title and type; WT/AWT applicability; process; related competencies, symptoms/problems, joints, positions, materials/thicknesses, equipment, and activities; instructional level; media/file/link type; source and provenance; approval status; and active/archive state. The exact resource schema is not frozen.

Resources used for grading-linked recommendations or student instruction must come from instructor-approved authority rather than arbitrary AI advice. The conceptual lifecycle is:

> **Draft → Instructor Approved → Active → Archived**

AI and search may discover, tag, or summarize candidate or approved content. They must not silently make candidate content instructional authority.

### Contextual troubleshooting safeguards

ARC may support instructor-facing troubleshooting using assessment and task context. For example, GMAW on a lap joint in 3/8-inch steel with the upper edge burning or washing away may surface possible causes, things to check, and possible corrections involving arc placement or technique, travel speed, heat or setting context, work/gun angle, and approved related resources.

Troubleshooting must never present an incomplete-context suggestion as a definitive diagnosis. It should clearly distinguish possible causes, checks, and possible corrections. The instructor retains diagnosis and intervention authority.

### Resource and competency pathway

Resources participate in competency explainability through this student pathway:

> **Why am I here? → What do I need? → Learn/Review → Practice → Qualifying Challenge**

The target evidence loop is:

> **Problem identified → approved Resource → Practice → Qualifying Skill Challenge → Assessment → criterion-level Evidence → Competency update**

Criterion-level results may drive contextual recommendations. For example, a Developing result for Fusion & Tie-In may lead to approved tie-in resources, targeted Practice, and a later qualifying Skill Challenge. Resource recommendations never change grades or competency levels.

### Shared Activity Library and Resources principle

> **Define an instructional activity once. Assign it wherever appropriate. Let every relevant ARC system understand what that activity means.**

> **Resources provides trusted help; Activity Library provides actionable work.**

## Future Open Shop evidence pathway

Open Shop should evolve from gap navigation into an evidence-producing instructional pathway centered on three student and instructor questions:

- **Why am I here?**
- **What do I need to do?**
- **What task can I do today that counts toward raising it?**

The target loop is:

> competency evidence → identify highest-value need → explain current level → show next-level requirement → recommend instructor-approved assignable task → student performs → assessment produces evidence → evidence feeds competency derivation

### Practice versus qualifying evidence

Future tasks distinguish:

- **Practice:** supports improvement but does not automatically count as formal qualifying evidence.
- **Qualifying Evidence Opportunity:** an instructor-approved task or challenge whose resulting assessment can produce qualifying evidence.

Completing a qualifying task never guarantees advancement. The assessed result controls the evidence: a Developing result is not a Proficient demonstration; a Proficient result is a qualifying Proficient demonstration.

Reusable task/challenge metadata may eventually include course applicability, competency/evidence targets, practice-versus-qualifying status, assessment/rubric, prerequisites, estimated duration, materials, process/equipment/booth, target difficulty or proficiency, and repeat/duplicate rules. None of this metadata or workflow is implemented by this design authority.

### Shop-aware recommendations

Within a qualification pathway, future Open Shop should answer: **What is the best qualifying task this student can realistically do right now?** Friday Open Shop uses the broader frozen question documented below—**What is the highest-value appropriate activity for this student right now?**—and may recommend Practice or other legitimate priorities instead of a qualifying task.

Recommendations may consider:

- competency need and current path to the next level;
- WT/AWT expectations;
- prerequisites;
- remaining class time and the existing countdown;
- cleanup period;
- current or assigned projects;
- duplicate prevention;
- material requirements and Material Inventory;
- booth availability;
- equipment availability/status where represented;
- current class;
- future Today's Focus/planned instruction after lesson → class → date authority exists.
- approved Resources connected to the identified weakness;
- available Practice and Skill Challenges and their practice-versus-qualifying roles.

Current authoritative inputs include competency ratings/gaps, WT/AWT context, the live class/countdown and cleanup state, assigned projects, Material Inventory, booth state, and selected/current class context. Evidence-derived next-level progress, formal practice/qualifying metadata, complete resource readiness, and Today's Focus authority are future inputs.

Time-aware behavior matters: 38 minutes may fit a 30-minute challenge; 14 minutes should not recommend starting a 35-minute fabrication task; during Cleanup ARC generally should not recommend a new fabrication task. Where authoritative resource data exists, unavailable work should not rank as the best immediate choice. Alternatives may remain visible with reasons such as material out of stock, booth unavailable, insufficient time, or prerequisite missing.

### Instructor assignment authority

ARC recommends and explains. The instructor may Assign, choose another task, defer, or override. ARC must not automatically assign work solely because it ranked the task highest.

### Future student ARC

Teacher and student experiences must project the same competency, evidence, pathway, assigned task, and result authorities rather than creating a second student competency database.

A future **My Open Shop** view may show current level, explanation, next-level requirement, progress, today's assigned task, specific focus, and assessment result/evidence.

The Activity Library and Resources are also shared authorities for future ARC Student rather than duplicated student-side catalogs. Teacher views may expose deeper diagnostics, settings, evidence, approval, and authoring context. Student views may present **What's going wrong?**, **What should I check?**, Learn/Review, Practice, Assigned Challenge, and a clear explanation of what counts toward moving up. Both views must use the same instructor-approved resources and activity definitions with role-appropriate visibility.

### Core instructional feedback loop

The target long-term capability is:

> **Rubric/authentic assessment → criterion-level evidence → evidence-derived competency → transparent path to next level → Open Shop practice/qualifying task recommendation → instructor assignment → student work → assessment → new evidence → updated competency.**

## Project plan and student drawing authority

Every future Project activity definition should be able to contain an authoritative instructor project plan, including:

- drawings or blueprints;
- dimensions and material specifications;
- cut list;
- fabrication sequence and instructor notes;
- processes and checkpoints;
- reference images;
- a future 3D model when available.

The plan may exist without student release. Future student drawing access modes may include:

- available immediately;
- instructor released;
- not provided because the student develops the drawing;
- reference drawing only.

A student-created drawing may become a Drawing/Planning assessment, a planning checkpoint, or both when each relationship is legitimate.

## Future global ARC Gradebook

The approved future sidebar destination is **Gradebook**, a program-wide working view especially useful during laptop planning. It derives from authoritative ARC assessment records and must not create a second manually maintained grade database.

Filters and views must support school year, semester, quarter, class/period, student, and category. The Gradebook should show student and assignment grades, category averages, the running Competency/Skills value, current overall grade, missing/exempt/review states, and links to authoritative evidence.

The global destination follows ARC's navigation principle: global sidebar destinations are program-wide views; contextual class/student controls are operational scoped views. The existing selected-class Gradebook may remain a contextual view backed by the same authorities.

### External school-gradebook reconciliation

ARC does not electronically synchronize with the school gradebook. Manual transfer must be explicit through these states:

- **Not Entered**
- **Entered**
- **Update Required**
- **Review Required**

Reconciliation must work at assignment and student levels. A whole assignment may be marked entered while individual exceptions remain pending. If an ARC grade changes after confirmed entry, its state becomes Update Required.

Teacher confirmation must retain enough version information to prevent forgotten or duplicate entry, such as the confirmed score/value, authoritative record revision, confirmation time, and teacher identity where available. A teacher-confirmed **Gradebook Current Through** timestamp is permitted but must never be described as synchronization.

### Gradebook Entry Mode

Gradebook Entry Mode is a focused planning-period workflow that shows every item requiring external entry.

For new assignments it presents title, category, date, point value where applicable, student scores, exemptions/absence status, and review exceptions. For updates it emphasizes changed values, especially running Competency/Skills changes such as `82 → 86`. Unchanged students may remain visible or subdued. Checkoff and confirmation must prevent forgotten or duplicate transfer.

### Gradebook notifications

Notifications provide short actionable summaries for new assignments, competency changes, grades changed after prior entry, and review-required items. They link into the relevant Gradebook context and do not reproduce the full Gradebook.

## Student Showcase

Every student should eventually have a clear family/student-facing **Student Showcase** derived from authoritative ARC evidence. It is not a copy of the teacher Gradebook.

Potential content includes student/course context, understandable overall and category performance, competency levels and growth, current and completed projects, welding/cutting/drawing performance, Workplace performance, selected work photos, and family-friendly evidence explanations.

The Showcase reuses existing photo evidence and never creates a second image database. Future curation may add an `Include in Showcase` decision. Potential uses include parent/teacher and student conferences, administrator/SLO evidence, and portfolios or job applications subject to privacy, consent, and export controls.

## Global Attendance & Passes

The approved future global **Attendance & Passes** destination is a master program-wide view with school year, semester, quarter, class/period, and student filters plus understandable attendance history and reporting.

The current selected-class Attendance & Passes workflow remains the operational contextual view. Pass/out-of-room authority remains separate from attendance authority. The global view projects both without merging their meaning.

## Project Info, material readiness, and purchasing

Future Project Info should answer: **What are we building, what is required, and how is it built?** Potential content includes overview, detailed instructions, dimensions, precise material quantities, cut list, equipment/processes, standards/competencies, prerequisites, estimated periods, instructional and safety notes, drawings/blueprints, reference images, and a future 3D model.

Material Inventory remains stock authority. Assigning a project must not consume inventory automatically. Informational readiness may show In Stock, Low Stock, or Out of Stock. Readiness informs the instructor; it should not unnecessarily remove assignment authority, except where independent duplicate-assignment rules apply.

ARC must not place orders. Future notifications may advise `Consider ordering X by Y date` based on planned instruction or projects, quantities, requirements, and current inventory. Purchasing authority remains with the instructor.

## Navigation naming and information architecture

The following user-facing names are approved:

- Global **Students / Roster** becomes **Students**. Roster and enrollment functions live inside Students.
- Student Showcase lives at **Students → Student → Showcase**. Other surfaces may provide shortcuts to that same authority, but no duplicate Showcase authority or global Showcase destination is created.
- The user-facing instructional/reference destination is **Resources**.
- Reusable project definitions use **Project Library** rather than Project Bank.
- Instructional planning uses **Lesson Plans** rather than Lesson Plan Bank.

The approved sidebar direction is:

### Classroom

- Dashboard
- Students
- Class Forecast
- Attendance & Passes
- Projects, for current and assigned project operations
- Open Shop
- Gradebook — future

### Instruction

- Today's Focus — future
- Lesson Plans
- Curriculum & Standards

### Activity Library

- Project Library, for reusable project definitions
- Technical Assignments — future
- Skill Challenges — future
- Practice — future

### Shop

- Material Inventory
- Booth Manager

### ARC/global

- Notifications
- Search
- Resources — future
- Administration — future
- Help — future
- Settings

This information architecture does not authorize implementation of future destinations. Showcase does not become a global destination. Current Attendance routing must not be changed to the future Master Attendance destination without separate authorization.

## Administration

The approved future global **Administration** workspace turns authoritative ARC classroom information into required external documentation and reporting. Administration is a projection and workflow over existing authorities; it must not become a second manually maintained classroom-data authority.

Approved future areas are:

- **Weekly Lesson Plans:** create, review, approve, view, print, and download upcoming and historical plans.
- **SLO Documentation:** create, generate, view, update, print, and download documents from authoritative ARC evidence and history.
- **Reports:** appropriate student, class, course, competency, grading-period, attendance, and Workplace reports.
- **Generated Documents / Exports:** organized generated files, printables, exports, and version/history where appropriate.

### Instruction and Administration boundary

**Instruction → Lesson Plans** is the operational instructional-planning authority. It may contain curriculum pacing, standards, competencies, demonstrations, Projects, Practice, Skill Challenges, Technical Assignments, Resources, Open Shop, materials, differentiated pathways, and assessments.

**Administration → Weekly Lesson Plans** is the administrator-facing printable representation derived from those instructional and classroom authorities. The instructor must not re-enter the same plan manually in a second system inside ARC.

ARC may allow the instructor to print or submit ARC plans directly instead of using Planbook. ARC does not need to imitate Planbook's workflow.

## Curriculum Map and Lesson Plans

### Curriculum Map role

The Curriculum Map role is frozen. Existing WT and AWT maps are not rewritten by this authority.

The Curriculum Map provides stable course direction, state standards and priority or essential standards, competencies, general sequence, and approximate pacing. It is not a rigid weekly calendar. Student or period variation does not automatically rewrite it. The instructor decides whether future revisions are warranted.

The instructional authority chain is:

> **State Standards → Curriculum Map → Competencies → Lesson Plans → Weekly Focus → Differentiated Activities → Assessment/Evidence → Competency Progression → Pacing Intelligence**

### Lesson Plans as reusable instructional frameworks

A **Lesson Plan** is a reusable, standards-aligned instructional framework. It is not necessarily one day or one week, and it does not require every student to perform identical work.

Lesson Plans connect curriculum, competencies, prerequisite readiness, common instruction, approved Resources, differentiated Activities, Checks for Understanding, and assessment or evidence. A framework may span these phases:

- Introduction / Demonstration
- Development / Practice
- Qualification
- Application / Extension

Weekly Focus is the instructor-approved weekly application or phase of a primary Lesson Plan framework, informed by readiness and pacing. The Administrative Weekly Plan is the printable prospective translation of that authority.

Future Lesson Plan relationships may include:

- title, WT/AWT applicability, and Curriculum Map location;
- actual applicable state standards and identified priority or essential standards;
- target competencies;
- **Required prerequisites**, whose absence materially blocks safe or productive participation;
- **Supporting prerequisites**, whose weakness permits participation with support;
- common instruction and demonstration;
- differentiated pathways for Prerequisite Blocked, Ready with Support, Ready for Focus, and Extension Ready;
- Activity Library references to Projects, Technical Assignments, Skill Challenges, and Practice;
- approved Resources;
- Checks for Understanding;
- formative or interim evidence and qualifying or summative evidence;
- materials and equipment.

Whole-class Monday instruction must not be hard-coded.

## Weekly Lesson Plan authority

### Administrative timing

The weekly administrative timing is frozen:

- During Friday planning, the instructor prepares, reviews, approves, and prints plans for the **following week**.
- Plans are turned in Monday morning.
- The plan is a prospective snapshot of reasonably expected instruction.
- Classroom reality may change during the week in response to evidence and readiness.
- Once approved or submitted, the historical snapshot is preserved. Later live evidence must not rewrite it.

### Default grouping

The default grouping is frozen:

- One WT weekly plan covers WT periods following a shared pathway.
- One AWT weekly plan covers AWT periods following a shared pathway.
- ARC must not duplicate near-identical plans merely because periods differ.
- If a period diverges enough that a shared plan would be inaccurate, the instructor may use a separate plan.
- Future ARC may identify meaningful divergence and suggest separation; the instructor decides.

### Weekly plan content

Weekly administrative plans preserve:

- **Title / Weekly Focus**
- **Standards**
- **Learning Targets** beginning **“I am learning to …”**
- **Criteria for Success** beginning **“I can …”**
- **Engagement Strategies**
- **Assessment / Evidence**
- a clear **Differentiation / Student Pathways** explanation
- optional **Materials / Resources** when useful

Administrative plans must explain differentiation truthfully rather than imply that every student performs identical work.

### Direct administrator feedback

The administrator accepted the overall one-page ARC plan concept and established two required corrections:

1. Production plans must show **actual applicable state standards**, not generic descriptions or placeholders.
2. The school terminology is **Engagement Strategies**, not Instructional Strategies.

Only standards genuinely addressed by the planned instruction should print. The administrator also emphasized student-friendly language.

### Learning Targets

The Learning Target stem is frozen as **“I am learning to …”**

Targets must be student- or kid-friendly, clear, concise, measurable, aligned to identified essential standards, and appropriate to the planned learning. They should avoid standards-document jargon. Learning Targets are future classroom and student-facing instructional content, not paperwork-only fields.

### Success Criteria

The Success Criteria stem is frozen as **“I can …”**

Criteria must be student-friendly, clearly defined, measurable or observable, directly aligned to Learning Targets, and explicit about what successful learning or performance looks like. Students should eventually be able to use the criteria to monitor their own progress.

### Lesson Plan Review Rubric alignment

The administrator-provided Lesson Plan Review Rubric is an administrative design input. It evaluates six components with Advanced (4), Proficient (3), Basic (2), and Below Basic (1):

1. Essential Standards
2. Learning Targets
3. Success Criteria
4. Engagement Strategies
5. Assessment
6. Lesson Plan Submission

ARC must preserve the rubric's intent but must not self-award administrator scores.

The Advanced-level design intent is:

- **Essential Standards:** priority or essential standards are clearly identified, represent critical learning, are appropriately sequenced, and align to targets.
- **Learning Targets:** daily or weekly targets are student-friendly, clear, concise, measurable, and aligned to essential standards.
- **Success Criteria:** criteria are clearly defined, measurable, and aligned to targets so students know exactly what is expected.
- **Engagement Strategies:** multiple purposeful strategies actively involve students and align to targets, promoting ownership, movement, choice, higher-level thinking, and project-based learning where appropriate.
- **Assessment:** multiple planned checks for understanding occur throughout learning and align to targets and criteria, with interim and vocabulary-assessment analysis where applicable.
- **Lesson Plan Submission:** plans are submitted on time by the morning of the first weekday through PlanBook or another agreed format. ARC's Friday preparation, approval, and printing workflow supports Monday submission.

### Engagement Strategies

**Engagement Strategies** is the frozen user-facing and administrative terminology. Instructional Strategies is not used as the production label.

Purposeful strategies may include, when appropriate:

- demonstration and modeling;
- hands-on Practice;
- Projects and project-based learning;
- Skill Challenges;
- appropriate student choice;
- movement and shop application;
- troubleshooting and problem solving;
- self-inspection;
- higher-order questioning;
- individual or small-group coaching;
- collaboration and student discourse;
- approved visual or media Resources;
- remediation and scaffolding;
- reassessment;
- extension.

ARC must not force every strategy into every lesson or reduce Engagement Strategies to a list of assignments.

### Checks for Understanding

**Checks for Understanding** is a frozen first-class internal Lesson Plan component. Authentic and hands-on checks are preferred where appropriate.

Examples include:

- identifying the correct work angle;
- explaining arc direction;
- comparing a weld to Success Criteria;
- identifying a visible improvement need;
- explaining the next adjustment;
- demonstrating a setup or checkpoint;
- purposeful questioning;
- student self-inspection.

Checks align to Learning Targets and Success Criteria and may drive immediate instructional adjustment.

### Lesson Plan assessment architecture

Lesson Plans distinguish:

- **Checks for Understanding:** frequent in-process monitoring.
- **Formative / Interim Evidence:** Practice feedback, observations, checkpoints, and technical, interim, or vocabulary checks where applicable.
- **Qualifying / Summative Evidence:** Skill Challenges, approved technical assessments, Project/Fabrication, Welding Performance, Technical Assignments, and other legitimate qualifying work.

Assessment must not be presented as synonymous with paper tests. A printed weekly table may remain compact but should visibly communicate ongoing checks. `Checks for Understanding / Assessment` is a candidate column label; the final template label remains a print-design decision.

### Instructional Walk-through Rubric alignment

The administrator-provided Oelrichs School Instructional Walk-through Rubric is design-validation input. It covers:

- Domain 3 #1 Learning Targets
- Domain 3 #2 Success Criteria / Student Clarity
- Domain 3 #3 Teacher Actions / Instructional Practices
- Domain 3 #4 Student Engagement and Ownership
- Domain 3 #5 Formative and Summative Assessment Strategies
- Domain 2 #1 Classroom Culture and Learning Environment
- Domain 2 #2 Classroom Management

Its observable checklist includes:

- the target is posted and verbally identified;
- Success Criteria are aligned and explained;
- students can articulate their learning;
- active student responses;
- student-to-student discourse;
- higher-order questioning and thinking;
- continual checks for understanding;
- clear, purposeful, effective feedback;
- instruction adjusted based on student response;
- differentiation and scaffolding;
- positive culture;
- effective routines and transitions;
- positive response to redirection.

ARC uses this rubric to validate that its design supports strong instruction. It must not turn the rubric into a walkthrough-gaming checklist.

### Student-facing clarity

Future ARC must support the current classroom and student-facing statements:

- **I am learning to …**
- **I can …**

Targets and criteria should be posted, communicated, referred to during instruction, and usable by students. A primary class focus may coexist with pathway-specific individual targets. Students should be able to answer:

1. What am I learning?
2. What does success look like?
3. What am I doing today?
4. What do I need to improve?

Differentiated Activities remain aligned to each student's actual target and Success Criteria even when students perform different work.

The Activity architecture supports ownership naturally: Projects provide project-based learning, Practice provides active development, Skill Challenges support ownership and demonstration, troubleshooting provides higher-order problem solving, Open Shop provides appropriate choice, and Resources support independent learning.

### Teacher action and classroom culture boundary

ARC supports teaching but does not replace it. Future tools may help identify needs, monitor students, surface useful questions, provide feedback context, adjust pathways, scaffold, and reassess.

ARC may support routines and independence through Activities, Booth Manager, material readiness, the Cleanup countdown, Ready to Work, Open Shop, Resources, and student-facing instructions. ARC does not automatically score culture, belonging, respect, redirection, or relationships.

### Friday Plan Preflight

Friday Plan Preflight is approved future architecture. Before next week's plan is approved or printed, ARC should check for:

- actual Essential Standards that are present and aligned;
- student-friendly, measurable Learning Targets;
- aligned, measurable Success Criteria;
- multiple purposeful Engagement Strategies;
- active participation and ownership where appropriate;
- Checks for Understanding;
- formative or interim evidence;
- qualifying or summative evidence where appropriate;
- vocabulary evidence where applicable;
- Monday submission readiness.

Plan Preflight does not assign Advanced, Proficient, Basic, or Below Basic scores. The instructor reviews and approves the plan.

### Administrative print design

The approved target is:

> **One course · one week · one professional page whenever content reasonably fits.**

ARC must not force one page by using unreadable typography. Administrator feedback established that line spacing `1.0` allowed the sample to fit properly and that a cleaner document layout is preferable to excessive boxes and tables.

Tables should primarily remain for Learning Targets, Criteria for Success, and Weekly Instruction. Other sections normally use clean headings and body text.

An ARC letters-only logo may be used as restrained letterhead only when a clean, transparent production asset improves professionalism. Administrative documents do not use a dark Titanium background or oversized application branding.

> **If a branding or design element does not make the document look more professional, it does not belong.**

### Administrative Document Engine

The future Administration workspace should share one professional document-generation capability across Weekly Plans, SLOs, reports, conference summaries, Showcase exports, competency reports, and program reports.

Shared responsibilities may include templates, headers and footers, typography, tables, page breaks, margins, pagination, historical snapshot metadata, print-ready PDF, and editable Word output where appropriate.

The approved Weekly Plan workflow is:

> **Generate Draft → Preview → Edit/Review → Preflight → Approve → Save Snapshot → Print / Download**

### Reflection and historical learning

An operational Lesson Plan or Weekly Focus may allow optional instructor reflection after instruction without rewriting the approved or submitted administrative snapshot. Reflections may inform pacing and planning for a later year.

## Weekly Instructional Focus and differentiation

**Weekly Instructional Focus** is the primary planned course instruction or emphasis. It provides coherence but does not force identical student work. It does not override safety prerequisites, blocking prerequisites, legitimate active Project or workflow progression, individual evidence, or instructor judgment.

A new week does not require a new focus. One focus may span several weeks or phases, including:

- Introduction / Demonstration
- Practice / Application
- Qualification
- Project Application / Extension

### Readiness states

The following states are frozen:

- **Ready for Focus:** the student has sufficient prerequisites for productive focus work.
- **Ready with Support:** a prerequisite weakness exists, but the student can participate productively with targeted support.
- **Prerequisite Blocked:** a missing prerequisite materially prevents safe or productive participation. The student may receive common instruction or exposure and then returns to prerequisite work until ready.
- **Extension Ready:** the student is already proficient and receives higher-complexity application, a Project, or an advanced challenge instead of unnecessary repetition.

A student does not need Proficient in every earlier competency. A prior competency blocks participation only when its absence materially prevents safe or productive participation.

### Common instruction and differentiated application

ARC must not hard-code Monday as direct-instruction day. When common instruction or demonstration is useful, the instructor teaches it efficiently to the relevant class or group and then differentiates application. Some weeks may have no meaningful whole-class direct instruction.

Tuesday through Thursday may include different Projects, Practice, Skill Challenges, Technical Assignments, remediation, reassessment, extension, coaching, or assessment. An activity need not directly match Weekly Focus when another legitimate priority is stronger.

The conceptual planning and recommendation priority is:

1. Safety prerequisite.
2. Blocking prerequisite.
3. Appropriate active instructional commitment, Project, or workflow.
4. Weekly Focus.
5. Other competency needs.
6. Extension.

This hierarchy guides planning and recommendations. The instructor remains final authority.

### Friday Open Shop

Friday Open Shop loosens Weekly Focus and asks: **What is the highest-value appropriate activity for this student right now?**

It may recommend prerequisite work, current-focus work, another competency gap, Practice, a Skill Challenge, reassessment, an active Project, missing legitimate work, a Technical Assignment, or extension. Future ranking may consider safety, prerequisites, available time, materials, booths and equipment, current work, and duplicate or repeat rules. Instructor assignment authority remains unchanged.

## Pacing authority

The frozen pacing principle is:

> **Calendar time does not determine mastery, and a new instructional week does not require a new instructional focus.**

The authorities remain distinct:

- **Curriculum map:** planned sequence and generalized or approximate pacing.
- **Student evidence:** current readiness, prerequisites, progression, and activity position.
- **ARC:** planning intelligence, readiness summaries, and historical pacing.
- **Instructor:** the decision to continue, deepen, or advance.

ARC must not hard-code a readiness ratio such as `8/10` as automatic pacing authority.

Long-term pacing distinguishes:

- **Planned Pacing:** the curriculum-map expectation.
- **Actual Pacing:** what occurred for a course, period, or cohort.
- **Future Planning Estimate:** evidence-informed guidance derived from accumulated history.

Potential planning signals include days spent on a focus, competency progression, Practice frequency, Skill Challenge readiness, Project duration, prerequisite bottlenecks, and cohort or period variation. Future estimates are guidance and never automatic authority.

## Pending Sidebar Gesture Repair 2

Sidebar Gesture Repair 2 is documented pending implementation. The deployed Workflow Integration 1 Repair 1 previously passed Samsung physical testing, including countdown and Cleanup behavior. This design authority does not authorize runtime changes.

The later bounded repair requirements are:

1. **Larger swipe-open target:** nearly the entire collapsed rail can initiate horizontal drag; behavior remains case-friendly, preserves normal taps, and requires horizontal-intent detection.
2. **Rigid contents:** the drawer moves as one surface; icons, labels, headings, and Quick Add do not shift or reflow during drag or release.
3. **Persistent backdrop dim:** dimming follows opening progress, remains while fully open, follows closing progress, and clears only when fully closed.
4. **Backdrop tap closes:** the dimmed application area closes the drawer and intercepts the tap without click-through.
5. **Single state authority:** swipe/flick, hamburger, Collapse/Expand, and backdrop tap all resolve to either open and dimmed or closed and undimmed.
6. Preserve accepted finger-follow behavior, flick behavior, vertical cancellation, horizontal-control protection, drawer width and layout, Titanium styling, countdown and Cleanup, and all domain behavior.

## Today's Focus and Class Forecast

**Today's Focus** is the future authoritative daily instructional plan across all classes. It answers: **What am I intending to teach or accomplish today?** It depends on future lesson → class → calendar-date authority.

**Class Forecast** remains the existing selected-class preparation intelligence derived from actual student and project records. It answers: **Based on what students are actually doing, where will I likely need to focus attention?**

Today's Focus is not a global Class Forecast. Long term, planned instruction and classroom reality complement one another without sharing or duplicating authority.

## Evidence Engine and Gradebook handoff authority

The following architecture is frozen design authority. It is not implemented by this documentation milestone.

> **ARC stores what the student demonstrated as evidence. Official competency state is a deterministic conclusion derived from that evidence.**

The authoritative pipeline is:

> **Activity Definition → Evidence Declaration → Student Performance → Evidence Source → Evidence Record(s) → Derivation Strategy → Derivation Result → Instructor Override → Resolved Competency Authority → Gradebook Policy/downstream consumers**

AI may phrase explanations and recommendations. It never determines official competency levels.

### Evidence Source v1

An Evidence Source records **what happened**. It owns:

- an immutable identity;
- exactly one student;
- occurred and recorded timestamps;
- historical course, period, grading-period, and school-year context;
- a controlled source type;
- applicable Activity, instance, Project, assessment, rubric, checkpoint, workflow, and version references;
- instructor or recorder identity;
- shared attachments and optional notes;
- reassessment relationship and provenance;
- an `Active`, `Superseded`, or `Voided` lifecycle, with `Draft` only when genuinely needed.

One Source belongs to one student. Schedule changes never rewrite historical context. Practice may create a Source. Reassessment creates new evidence. Corrections are append-first. Shared artifacts live primarily on the Source. Historical evidence remains tied to the actual versions used. A Source never stores an official competency level or source-wide qualification.

### Evidence Record v1

An Evidence Record records **what one Source demonstrated about exactly one competency**. It owns:

- an immutable identity and Source identity;
- exactly one competency identity;
- a demonstrated 1–4 level when legitimately level-based, nullable for Safety or continuous evidence;
- qualification status and reason;
- evidence mode and criterion references;
- a small common core plus extensible typed context;
- explicit diversity dimension and value;
- reassessment relationship, provenance, and `Active`, `Superseded`, or `Voided` lifecycle.

Qualification statuses are `Qualifying`, `Supporting`, `Nonqualifying`, and `Excluded`. `NE / No Evidence` remains distinct.

Evidence modes remain:

1. Rubric
2. Challenge / Assignment
3. Workflow
4. Habit / Continuous

Context stores only meaningful interpretation, qualification, or diversity facts. Diversity is explicit and deterministic; AI never infers it from notes. Mutable roles such as confirming or contradicting belong in Derivation Result rather than permanently on Records. Normal Practice may preserve demonstrated quality but remains Nonqualifying unless prospectively authorized. Safety records may have a null demonstrated level.

### Activity Evidence Declaration v1

An Activity Evidence Declaration is prospective authority defining what an Activity version is capable of proving **before student results are known**. One declaration represents one Activity/version-to-competency relationship and owns:

- competency and Activity/version identities;
- exact source point;
- evidence mode and default `Qualifying`, `Supporting`, or `Nonqualifying` status;
- rubric or assessment authority and version;
- criterion mappings, qualification gates, required context, and diversity mapping;
- Safety prerequisite and instructor qualification authority;
- lifecycle and version.

A source point may be a stage, checkpoint, criterion, workflow, product, observation, assessment, or completion only when completion legitimately demonstrates the competency. Failed gates preserve the work and determine the resulting Evidence Record qualification and reason. Conditional criteria may be N/A and are never silently scored zero.

Practice defaults to Nonqualifying. When Practice can become a qualifying opportunity, the instructor normally designates it before assessment. Exceptional overrides remain traceable. Declaration lifecycle direction is:

> **Draft → Instructor Approved → Active → Archived**

Completion alone never automatically generates competency evidence.

### Activity Builder direction

> **Evidence complexity belongs in ARC architecture, not normal instructor Activity creation.**

ARC should infer or preconfigure declarations from Activity type, competency authority, rubric mappings, and context. Normal instructor language focuses on what students do and learn, how work is assessed, whether it can count, and required materials or equipment.

The future direction includes a guided builder, templates, copy/duplicate, Quick Practice, guided Project stages, suggested evidence relationships, Activity Preflight, and advanced rule editing only when needed.

### Full instructional readiness

ARC is not classroom-ready merely because its software works. Before full adoption, WT and AWT require sufficient prepopulated Lesson Plans, Projects, Practices, Skill Challenges, Technical Assignments, Resources, and Qualifying Evidence Opportunities for curriculum coverage, remediation, reassessment, extension, differentiation, and student choice.

The initial library intentionally contains **more approved Activities than expected to be used**. The future coverage audit is:

> **Standards → Curriculum Map → Competencies → Lesson Plans → Activities → Evidence Opportunities → Resources**

Year One must be usable and intentionally overprepared. Later years refine the library using actual classroom data.

### Derivation Result v1

Evidence is historical truth. A Derivation Result is the rebuildable current deterministic interpretation for a student, competency, and scope. It supports:

- current evidence-derived level and separate confirmation state;
- highest recent demonstrated level;
- immutable strategy and configuration versions;
- contributing, contradicting, and excluded Evidence Record identities;
- satisfied and remaining requirements;
- diversity state and recency capability;
- next level and requirements;
- optional operational status;
- structured reasons and calculated timestamp.

Level and confirmation remain separate, with no invented `2.5`. A first Level-3 result may be **Proficient Demonstrated / confirmation needed**; appropriate confirmation yields **Proficient Confirmed**. Incomplete breadth is represented separately.

No evidence produces null / Not Yet Assessed, never 0, F, or Introduced. Operational state remains separate, especially for Safety. Explanations derive from structured facts; AI may phrase them only. A live Result is not immutable history; administrative boundaries snapshot it.

### Derivation Strategy architecture

The universal strategy contract is:

> **Read authoritative evidence → apply approved immutable strategy/configuration → return explainable Result → never mutate evidence.**

Initial strategy families are:

1. Performance Confirmation
2. Continuous Safety
3. Comprehensive Knowledge
4. Versioned Product
5. Diagnose & Correct
6. Integrated Project
7. Continuous Workplace

Composable modules include Diversity, Context Coverage, Recency, Contradictory Evidence, and Reassessment Preference. Competency authority owns configuration; the engine does not hard-code competency IDs. Strategy and configuration versions are immutable. Instructor Override sits above derivation.

### Technical recency and contradiction

> **Mastery is durable, but current comparable evidence matters. Time alone does not erase skill.**

Recency primarily follows subsequent relevant and comparable evidence opportunities rather than arbitrary calendar expiration. The exact normal numeric window remains unresolved. Inactivity, breaks, absence, other instructional units, schedule movement, or time alone never create automatic decay.

Authority distinguishes comparable/core contexts from extension, challenge, or specialized contexts so harder work does not unfairly demote established competency.

For normal confirmed technical competencies:

- one comparable Qualifying result one level below retains the current level with `Concern / Watch`;
- one comparable Qualifying result two or more levels below retains the current level with `Instructor Review Required`;
- two consecutive comparable Qualifying results below the current level produce `Instructor Review Required`;
- three consecutive comparable Qualifying results below the current level derive the highest level consistently supported by current comparable evidence.

For Advanced:

- the first comparable result at Level 3 or below retains Advanced with `Concern / Watch`;
- the second consecutive comparable result at Level 3 or below derives the appropriate lower supported level, normally Proficient when its requirements remain satisfied.

A successful intentional reassessment at the confirmed level or above can clear an active contradiction pattern. Nonqualifying Practice never increments a formal demotion count. Supporting evidence may surface concern but cannot independently demote. Safety-related nonqualification never becomes fake low technical evidence. Absence or missing evidence never fabricates a lower competency level.

### Instructor Override authority

An Instructor Override changes authoritative outcome without changing, deleting, or fabricating evidence or the Derivation Result. It is a separate append-first object containing scope, referenced Result, override level, structured reason, optional explanation, instructor and timestamp, review policy, lifecycle, and supersession.

An override may move authority up or down. Incorrect evidence is corrected through evidence correction; accurate evidence plus professional disagreement is handled by override. New evidence may trigger review but never silently deletes an override. Suggested states are `Active`, `Review Required`, `Resolved — Evidence Aligned`, `Superseded`, and `Revoked`.

An override never fabricates confirmations, diversity, or qualifying evidence. A generic override cannot clear Major or Critical operational Safety restrictions. An AWT-R4 override does not rewrite Workplace grade or history.

### Academic scope and grading periods

> **Competency history persists; grading authority is explicitly scoped.**

Evidence permanently retains its original academic context. Derivation supports Grading Period, Semester, Course Enrollment, and Longitudinal scopes. The conceptual hierarchy is:

> **Student → Course Enrollment → School Year → Semester → Grading Period**

Quarter or semester boundaries do not reset learning. Prior-period confirmed competency supplies instructional starting state and readiness but does not automatically become current-period grading evidence. Lack of a legitimate current-period opportunity never produces a fabricated zero.

Period close creates an immutable competency snapshot containing Result, override, resolved authority, strategy and configuration versions, evidence references, scope, and time. Semester competency derives from semester evidence and never from arithmetic averaging of quarter competency percentages. School course-grade combination policy remains separate.

Period movement within a continuing enrollment preserves continuity. WT and AWT never automatically translate evidence without future explicit authority. A new school year creates a new grading and enrollment scope while preserving history. Prior-year evidence supports readiness without automatically becoming current-year grading evidence. Midyear entrants receive no fabricated earlier failures. Dropping a course closes enrollment without deleting evidence.

### Resolved Competency Authority and Gradebook handoff

The downstream chain is:

> **Evidence → Result → Override → Resolved Competency Authority → Gradebook Policy → Gradebook Entry/Course Grade → Submitted Period Snapshot**

The resolver exposes evidence-derived level, confirmation state, override, official level, authority source, prior established level and scope, current-period evidence state, optional operational status, and provenance. Downstream systems consume the resolver and never reinterpret raw evidence.

The frozen conversion remains:

- 1 Introduced = 60%
- 2 Developing = 75%
- 3 Proficient = 90%
- 4 Advanced = 100%

Gradebook uses the confirmed or resolved authoritative level rather than merely the highest demonstrated performance. A first Level-3 performance may be celebrated instructionally while grading remains at the established confirmed level. Confirmed Level 3 produces 90%. A first Level-4 performance does not immediately produce confirmed 100%. An override may establish the official grading level without fabricating evidence. Developing may establish according to the approved strategy.

Not Yet Assessed and exclusions never become zero. Prior established state and current-period grading evidence remain distinct. Semester authority comes from semester derivation rather than averaged quarter competency percentages.

Generating competency evidence does not automatically create a Gradebook entry. One Activity may create many Evidence Records but only the Gradebook entries authorized by policy. Future competency entries reference resolved authority or a snapshot rather than duplicate free-floating percentages. Submitted period snapshots are immutable; later correction requires an explicit workflow.

### Weekly grade frequency

Administrator guidance is frozen as:

> **Two grade entries per student per normal instructional week is an acceptable minimum, not a maximum.**

- Two meaningful entries are a minimum coverage expectation when legitimate opportunities exist.
- ARC never suppresses a legitimate grade because a student already has two.
- Every legitimately graded Activity completed by a student produces its appropriate entry regardless of weekly count.
- Grading status is prospective Activity or assessment authority, not a consequence of weekly count.
- Grade categories do not each require weekly representation.
- ARC never manufactures Activities or grades to satisfy category or weekly counts.
- Ungraded Practice remains ungraded even below the minimum.
- Differentiated students may legitimately have different grade types and counts.
- Unusual weeks may legitimately contain fewer entries.

> **Gradebook completeness means sufficient meaningful assessment, not artificial category coverage.**

Weekly coverage monitors grading; it never limits grading.

### Workplace weekly grade direction

Workplace & Shop Practices naturally supplies one weekly grade for most students with applicable attendance and participation. Daily authoritative Workplace evidence accumulates into a weekly Workplace result. ARC does not create a fake Friday assignment.

The frozen calculation is:

> **Weekly Workplace % = total applicable Workplace points earned ÷ total applicable Workplace points possible.**

Each applicable school day contributes one denominator of 10 points per student, regardless of the number of scheduled or supplemental shop sessions that day. Excused, Unexcused, School Activity, No Class, and instructor-authoritative No Meaningful Workplace Opportunity days are excluded. Tardy and Left Early do not create automatic deductions. Short weeks use only their applicable days and have no special cap or adjustment. A normal week often contains one Workplace weekly grade plus one or more legitimate instructional grades. There is no two-grade ceiling.

A settled weekly result becomes Grade Ready. A material unresolved issue produces Review Required. Corrections recalculate the result. Before Posted, the Grade Ready value updates. After Posted, ARC must flag `Posted Grade Changed`, preserve the old posted value and corrected ARC value, require an update, and retain history.

### Grade Ready and Posted

Posting lifecycle is separate from Activity assessment and evidence:

> **In Progress → Awaiting Instructor Review → Grade Ready → Posted**

A future traceable correction or update follows posting. Finalized graded work becomes Grade Ready immediately and enters a queue. Competency evidence flows separately: Evidence Ready is not Grade Ready. One Activity may create many Evidence Records and one Gradebook item; ungraded Practice may create evidence or history and no Grade Ready item.

Without an approved SIS integration ARC does not claim automatic posting. The instructor enters the school gradebook and then marks the ARC item Posted. Future workflow supports individual and batch `Mark Posted` while preserving posted value, time, poster, and history. A weekly Workplace grade becomes Grade Ready when appropriately finalized; unresolved issues may require review.

### Planning-period notification and workspace direction

> **Notification timing is not Grade Ready timing.**

Grades become ready immediately, while ARC avoids disruptive per-grade shop popups and quietly accumulates a queue or badge. Around or during Planning period, or another instructor-configured administrative window, ARC surfaces administrative work such as Grades Ready, Instructor Reviews, unresolved grade reviews, Lesson Plan tasks, material concerns, and other nonurgent work.

Urgent operational issues, including Safety or students actively waiting for instructor action, remain separate. The future Planning Period Workspace combines Grades Ready, reviews, weekly coverage, Friday Lesson Plan preparation and preflight, material planning, and other administrative work. Friday primarily reconciles remaining work and prepares the next week rather than becoming a large data-entry batch.

## Workplace, supplemental shop sessions, and semantic state authority

The following architecture is frozen design authority. It is documentation only and does not change the current Workplace runtime, schema, Gradebook, Class Forecast, Open Shop, CSS, or other application behavior.

### Daily Workplace authority

One applicable school day begins at `10 / 10`. Discrete Workplace events deduct from that daily value, with a floor of zero. ARC maintains one Workplace denominator and one daily Workplace record per student per school day, including days when the student works during scheduled and supplemental shop sessions.

Minor-event escalation is keyed by student, event type, and school day. The first eligible occurrence is `-1`; each eligible same-day repeat of that event is normally `-2`. Escalation resets on the next school day, not the next period. A continuing condition is not deducted again merely because time passed or the period changed. A repeat requires a separate occurrence after correction or the condition ended, or after a new reasonable opportunity to comply.

The approved Minor taxonomy is:

1. Missing Required PPE.
2. Improper Attire / Footwear.
3. Unprepared for Work.
4. Off Task / Not Working.
5. Failed Cleanup / Organization.
6. Poor Tool / Equipment Care.
7. Failed Equipment Shutdown / Storage.
8. Left Work Area Unsafe.
9. Did Not Follow Normal Shop Procedure.

The event boundaries are specific. Cleanup / Organization covers the work area, tools, materials, scrap, and assigned cleanup; it does not cover shutdown/storage or an unsafe-area condition. Poor Tool / Equipment Care means careless routine handling and is distinct from knowing or severe misuse. Failed Equipment Shutdown / Storage covers equipment left on or leads, hoses, torches, and similar items not properly secured. Left Work Area Unsafe is a distinct safety-condition failure, not cleanup. Did Not Follow Normal Shop Procedure is a fallback only when no specific event fits. Off Task is temporary disengagement, not sustained refusal. An attire continuing condition is not tapped repeatedly without a new legitimate occurrence or opportunity.

The future Workplace control surface contains exactly nine Minor buttons. Missing Required PPE spans two button widths at the top; the remaining eight controls appear in four two-column rows. ARC does not use a repeated-instance dropdown. A button label changes in context from `-1 …` to `-2 … · 2nd`, then `-2 … · 3rd`; the deduction does not increase indefinitely.

Approved Significant events deduct `-2` per discrete occurrence:

- Horseplay / Unnecessary Hazard.
- Knowingly Misused Equipment.
- Refused Reasonable Instruction / Work.
- Significant Disruption.

A repeated discrete Significant event remains `-2`. Refusal requires a clear reasonable instruction or work expectation and a meaningful opportunity to comply; it is distinct from ordinary unpreparedness or temporary off-task behavior.

Approved Serious events deduct `-3` per discrete occurrence:

- Serious Safety Violation.
- Intentional Endangerment.
- Severe Equipment Misuse.

Where a Workplace event and Safety consequence arise from the same incident, both outcomes link to one underlying Safety event rather than duplicating the incident.

**Full-Period Refusal / No Meaningful Participation** is a special daily-state action. It sets that applicable day to `0 / 10`; prior events remain visible in history. It is not presented as a normal `-10` event button.

ARC records the most specific applicable event for an incident. One incident does not stack overlapping Workplace labels. Independent failures remain distinct events.

### Attendance and opportunity applicability

Attendance records presence; Workplace evaluates legitimate Workplace opportunities.

- Present normally creates a `10`-point applicable day.
- Excused, Unexcused, School Activity, and No Class are excluded from earned and possible points.
- Tardy and Left Early do not create automatic deductions.
- No Meaningful Workplace Opportunity excludes the day. This is instructor-authoritative and does not depend on a rigid minute threshold.
- Supplemental participation never creates another denominator.

### Supplemental shop-session authority

ARC is enrollment-aware without treating physical period presence as enrollment authority. Every student has a **Home Academic Context** and may participate in a different **Current Physical Shop Session**.

The scheduled enrollment retains authority for home course, competency catalog, Gradebook, scheduled attendance, and grading scope. Approved presence in another period does not change enrollment. Supplemental students must ultimately be available in Fast Roster, Class Forecast, Booth Manager, Projects, Practice, Skill Challenges, assessment and reassessment, Evidence, Workplace, Safety, photos, reviews, and Grade Ready workflows.

Operational views distinguish scheduled from supplemental students and show the supplemental student's home period. Supplemental presence does not rewrite Attendance. Work, evidence, and grades remain scoped to the home enrollment. Booth state may be active for the physical session and is released when that session ends. Supplemental sessions support make-up work, reassessment, extra Project time, Open Shop, and other approved work. Workplace uses the same school-day record, and AWT-R4 uses the same applicable day; neither gains extra points or an extra day.

### Positive Workplace evidence

Positive Workplace evidence is evidence, not bonus points. It does not raise a day above `10`, cancel deductions, or become spendable currency. Approved types are:

- Initiative.
- Responsibility / Ownership.
- Professional Communication.
- Teamwork / Supports Others.
- Problem Solving.

The future workflow is one tap with an optional note or context. Evidence may be recorded during scheduled or supplemental participation, follows the student rather than the physical period, and applies in WT or AWT even when no WT competency is implicated. Expected normal behavior does not automatically create positive evidence; the observation must be meaningful and specific. A positive observation and a deduction may legitimately coexist on the same day.

### AWT-R4 Workplace Readiness derivation

AWT-R4 uses the ten most recent applicable Workplace days. Supplemental work contributes to the existing school day and never adds another day. The ten-day window establishes consistency; positive observations establish Advanced breadth; event patterns protect the meaning of the descriptor.

- **Level 1 — Introduced:** frequent dependence, redirection, refusal, disruption, or substantial difficulty meeting Workplace expectations.
- **Level 2 — Developing:** generally appropriate participation with recurring correction or support.
- **Level 3 — Proficient:** normally requires a ten-day Workplace average of at least `90%`, sustained reliability, and no unresolved contradictory pattern. One isolated poor day or full-period refusal may retain Proficient with Concern / Watch when surrounding evidence strongly supports established proficiency rather than automatically forcing Developing.
- **Level 4 — Advanced:** satisfies Proficient and includes meaningful Advanced-positive evidence across at least three distinct approved positive dimensions, with no active Significant or Serious pattern incompatible with Advanced. No rigid `95%` threshold or arbitrary total positive count applies. Zero deductions alone never establishes Advanced.

Patterns may block, require review, or lower a rating. Recovery occurs naturally as the rolling window changes. Exact event-pattern blocker and review thresholds beyond this frozen direction remain unresolved. The weekly Workplace grade and AWT-R4 remain related but distinct outputs from the same authoritative evidence.

### ARC semantic color and state principles

Neutral Titanium presentation dominates ARC; color is earned by meaning. The approved semantic vocabulary is **Neutral**, **Selected / Active**, **Primary Action**, **Positive / Ready**, **Attention**, **Significant Concern**, **Critical / Blocking**, **Disabled / Unavailable**, and **Future**.

- Blue means selected or active. An inactive Class Forecast control is neutral; the active state is blue.
- A Primary Action uses enhanced neutral Titanium treatment rather than blue.
- Positive / Ready is green.
- Attention is amber and remains visually distinct from gold.
- Significant Concern is orange.
- Critical / Blocking is red and is used sparingly.
- Disabled / Unavailable is neutral.
- Future is muted and visibly labeled `FUTURE`.

Color never acts as the only signal. ARC does not use danger color to represent proficiency level or recommendation rank. Open Shop rank and ordering use restrained presentation rather than red, orange, or blue importance coding.

Workplace severity follows the same language: a first Minor `-1` is Attention; a repeated Minor or Significant `-2` is Significant Concern; a Serious `-3` is Critical / Blocking. Full-Period Refusal uses appropriately severe existing semantics without inventing another color. Workplace severity is expressed through the control and its accessible label, not decorative badges or stickers.

The accepted sidebar treatment remains frozen: selected is blue, normal is neutral, and future is muted with `FUTURE`. This authority does not reopen sidebar design. Statuses may be clearer than ordinary controls, but buttons remain Titanium-first, cards remain restrained, and ARC avoids full-screen color intensity.

Semantic design tokens and component implementation, the Class Forecast selected-state repair, Open Shop color cleanup, Workplace controls and history UI, Safety-event link mechanics, Positive evidence UI and reporting, supplemental-session start/end mechanics and integrations, runtime schema and migration, and remaining Gradebook workflow are future implementation decisions.

## Current conflicts and migration concerns

These are design gaps, not authorization to modify runtime behavior:

1. Competencies are manually assigned rather than evidence-derived.
2. The Skill/Competency percentage currently averages converted current ratings; the future running grade requires a deliberately approved derivation and grading-period snapshot policy.
3. The current Gradebook is selected-class scoped and offers copy guidance, but lacks the approved global filters, reconciliation states, confirmations, Entry Mode, and change tracking.
4. The current project rubric has existing criteria and calculations that do not yet implement the approved technical rubric family. Migration must preserve old ratings, grade output, and history.
5. Current code shares `ratingPct` between competency and project-rubric conversion; future named authorities must be separated without changing the frozen competency conversion.
6. Existing competency definitions include safety and shop-practice skills while Workplace also grades behavior. Future evidence mapping must prevent double grading without erasing legitimate skill standards.
7. Current Open Shop ranks assessed gaps and navigates to competency detail; it does not yet derive evidence, explain progression, distinguish practice from qualifying work, or recommend shop-aware assignable tasks.
8. Project definitions contain useful materials, processes, stages, checkpoints, standards, and competency links, but do not yet provide the complete plan/release/drawing authority described here.
9. Photo evidence exists, but Showcase curation, family-facing language, privacy/export controls, and Showcase assembly do not.
10. Attendance and passes have separate operational authorities, but no program-wide master destination.
11. Notifications are general records and do not yet derive Gradebook reconciliation summaries.
12. Today's Focus remains docked because lesson-to-class-to-date authority is absent.
13. Project Bank is the implemented reusable project authority, but the broader approved Activity Library types and shared metadata do not exist.
14. No Resources authority, approval lifecycle, contextual troubleshooting authority, or resource-to-practice-to-qualification pathway is implemented.
15. Current material planning does not derive expected demand from assigned Practice or Skill Challenges.
16. ARC Student does not yet reuse Activity Library or Resources authorities because those authorities and the future student experience are unimplemented.
17. The complete WT/AWT evidence pathways, Evidence Source and Record model, Activity declarations, derivation strategies and Results, overrides, scoped resolver, Gradebook handoff, and deterministic Safety model are approved, but no corresponding runtime schema, engine, workflow, snapshot, or migration exists.
18. Administration, derived Weekly Lesson Plans, differentiated Weekly Focus/readiness, and planned-versus-actual pacing projections are approved but unimplemented.
19. Current navigation labels and grouping do not yet implement the approved Students, Resources, Project Library, Lesson Plans, Administration, or complete Activity Library information architecture.
20. Sidebar Gesture Repair 2 remains pending; its larger rail target, rigid contents, persistent backdrop, tap interception, and unified state authority are not implemented by this documentation milestone.
21. The current Lesson Plan Bank does not implement the approved reusable Lesson Plan framework, administrator rubric alignment, Checks for Understanding, Plan Preflight, student-facing targets and criteria, reflection workflow, or Administrative Document Engine.
22. Current Workplace event controls, calculations, storage, and history do not implement the frozen daily scoring, applicability, correction, positive-evidence, or AWT-R4 architecture.
23. Supplemental shop-session participation is approved, but no cross-period operational session authority or integration exists.
24. ARC does not yet implement the approved semantic state vocabulary consistently across Workplace, Class Forecast, Open Shop, and shared components.

Any implementation must define migration, rollback, historical rendering, and explainability before changing stored records or current calculations.

## Decisions requiring instructor approval before implementation

- Evidence qualification or strength mechanics not already frozen by this authority.
- The exact normal technical recency numeric window; time alone and absence remain prohibited as decay signals.
- Edge cases beyond the frozen comparable-evidence contradiction sequence and Advanced contradiction rule.
- When an override should prompt review and how long review suppression lasts.
- Grading-period snapshot timing and rules for quarter/semester boundaries.
- Assessment UI and workflow design for the approved rubric family.
- Reassessment workflow details beyond the approved progression principles.
- Missing, exempt, absence, reassessment, late-work, and review-required policies in the future Gradebook.
- External-entry confirmation version model and who may confirm or reopen an entered item.
- Global Gradebook information hierarchy, default filters, and relationship to the existing class-scoped view.
- Project-plan student-release defaults and student drawing submission/revision workflow.
- Material readiness thresholds, forecasting horizon, and notification timing.
- Open Shop task taxonomy, qualifying-opportunity approval workflow, ranking/tie-break rules, duplicate/repeat rules, and the minimum authoritative resource data required for availability claims.
- Exact Activity Library schemas, shared-versus-specialized fields, migration from Project Bank, and activity authoring workflow.
- Exact Resources schema, authoring and approval workflow, provenance rules, detailed lifecycle behavior, and archival behavior.
- Resource recommendation and ranking algorithm, including how contextual uncertainty is presented.
- Practice material-demand timing, reservation semantics, preparation horizon, and relationship to actual inventory transactions.
- Criterion-to-competency mappings beyond the frozen WT and AWT evidence architecture.
- Runtime evidence schema and migration from existing manual ratings and history.
- Exact Evidence Source, Evidence Record, Derivation Result, Override, resolver, and immutable period-snapshot storage schemas.
- Final Activity Evidence Declaration storage schema, Activity Builder, Preflight, and authoring validation.
- Exact AWT-R4 event-pattern blocker, review, and lowering thresholds beyond the frozen ten-applicable-day direction.
- Instructor- or Activity-defined Advanced diversity details where this authority intentionally requires meaningful breadth without prescribing a universal context list.
- Catalog regression tests that lock all 26 WT and 34 AWT runtime records.
- Reconciliation or replacement of the current generic competency student statements.
- Exact evidence, observation, safety-status, and instructor-review UI and workflows.
- Detailed Minor, Major, and Critical safety-event taxonomy and default severities.
- Safety remediation, review, and clearance workflow.
- Student-facing implementation of WT and AWT evidence explanations and the Safety model.
- Exact Gradebook categories, weights, and entry policies beyond the frozen competency conversion and handoff boundaries.
- Workplace event/history interaction details, same-event recurrence capture, and Safety-event link mechanics.
- Grade Ready correction and update interface after Posted, plus individual and batch posting interaction.
- Weekly grade-coverage interface and exception presentation.
- Quarter-close Gradebook and submission snapshot workflow, including post-submission correction.
- SIS integration, only if later approved and available.
- Planning Period Workspace and administrative notification implementation.
- Semantic tokens and component implementation, Class Forecast selected-state repair, and Open Shop color cleanup.
- Positive Workplace evidence UI, context/history, reporting, and exact AWT-R4 pattern review presentation.
- Supplemental shop-session start/end workflow, physical-session visibility, Booth release, and cross-feature integration.
- Year-One instructional population and coverage audit after Activity schemas stabilize.
- Administration document schemas, approval/version history, print/download/export formats, and reporting workflows.
- Exact Weekly Lesson Plan generation, review, approval, snapshot, historical retrieval, and period-divergence suggestion workflows.
- Readiness derivation and explanation rules beyond the frozen state meanings and priority hierarchy.
- Planned Pacing, Actual Pacing, and Future Planning Estimate data models, aggregation, comparison, and guidance algorithms.
- Final navigation transition plan from current labels and destinations to the approved sidebar information architecture.
- Sidebar Gesture Repair 2 implementation and physical Samsung acceptance testing.
- Exact Lesson Plan runtime schema and migration from the current Lesson Plan Bank.
- Required-versus-supporting prerequisite data model and authoring workflow.
- Final administrative print template after administrator approval.
- Whether and how a clean transparent ARC letters-only logo asset is used.
- Exact Plan Preflight interface, validation rules, exceptions, and approval interaction.
- Vocabulary-assessment and vocabulary-evidence workflow.
- Student-facing Learning Target and Success Criteria display, scope, and update behavior.
- Word and PDF generation implementation and supported editing round trips.
- Instructor reflection capture, visibility, history, and next-year planning workflow.
- Student privacy and resource/activity visibility rules.
- Media storage and hosting, external-link validation, and offline resource/media caching.
- Student ARC roles, visibility, assignment acknowledgement, evidence access, and privacy boundaries.
- Showcase curation defaults, student/family visibility, consent, export format, and privacy rules.
- Master Attendance reporting definitions and the intentional global/contextual navigation exceptions.

## Explicit architecture boundaries

- Authoritative assessment records feed Gradebook, competencies, notifications, and Showcase projections; those projections must not become competing grade databases.
- Material Inventory remains stock authority; assignment is not consumption.
- Attendance and pass/out-of-room remain distinct.
- Project checkpoints remain progress evidence and do not automatically become grades.
- Class Forecast remains derived classroom intelligence.
- Today's Focus remains planned instruction.
- The school gradebook remains externally authoritative until an approved electronic integration exists; manual confirmation is reconciliation, not synchronization.
- Instructor judgment remains authoritative through explicit override, rubric approval, evidence correction, Showcase curation, project assignment, and purchasing decisions.
- Activity completion, Practice completion, and resource use never automatically change grades or competencies.
- Activity assignment may create expected material demand but never automatically consumes inventory.
- Resources used for student instruction or grading-linked recommendations require instructor-approved authority.
