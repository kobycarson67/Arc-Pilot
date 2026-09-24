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

These rules are the deterministic starting model. Remaining evidence-strength, recency-window, context-diversity, and edge-case details still require instructor-reviewed design.

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

The technical rubric family is approved. The complete WT mappings and evidence pathways are frozen below; AWT mappings remain future design work. No runtime evidence engine is authorized.

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
| WT-W1 Equipment & Setup | — | — | — | — | — |
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

Proficient requires **two qualifying demonstrations involving different troubleshooting problems or contexts**. Advanced requires stronger, diverse troubleshooting evidence. Resource Bank content may support learning and Practice but does not automatically prove the qualifying answer.

### WT-F1 Fabrication Sequence

The Project or Activity definition owns its authoritative workflow. Evaluation determines whether the student follows that project's required workflow. Legitimate N/A stages do not count against the student.

Starting progression is frozen:

- One substantially correct qualifying workflow may establish Developing.
- Two qualifying workflows establish Proficient.
- Three stronger and appropriately diverse workflows may support Advanced.

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

## ARC Resource Bank

The approved future **ARC Resource Bank** is trusted contextual instructional and reference authority. It is not merely a folder of links and PDFs.

The distinction is:

- **Activity Library: What can I do?**
- **Resource Bank: What can help me understand, diagnose, or improve this?**

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

### Shared Activity Library and Resource Bank principle

> **Define an instructional activity once. Assign it wherever appropriate. Let every relevant ARC system understand what that activity means.**

> **Resource Bank provides trusted help; Activity Library provides actionable work.**

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

Future Open Shop should answer: **What is the best qualifying task this student can realistically do right now?**

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
- approved Resource Bank materials connected to the identified weakness;
- available Practice and Skill Challenges and their practice-versus-qualifying roles.

Current authoritative inputs include competency ratings/gaps, WT/AWT context, the live class/countdown and cleanup state, assigned projects, Material Inventory, booth state, and selected/current class context. Evidence-derived next-level progress, formal practice/qualifying metadata, complete resource readiness, and Today's Focus authority are future inputs.

Time-aware behavior matters: 38 minutes may fit a 30-minute challenge; 14 minutes should not recommend starting a 35-minute fabrication task; during Cleanup ARC generally should not recommend a new fabrication task. Where authoritative resource data exists, unavailable work should not rank as the best immediate choice. Alternatives may remain visible with reasons such as material out of stock, booth unavailable, insufficient time, or prerequisite missing.

### Instructor assignment authority

ARC recommends and explains. The instructor may Assign, choose another task, defer, or override. ARC must not automatically assign work solely because it ranked the task highest.

### Future student ARC

Teacher and student experiences must project the same competency, evidence, pathway, assigned task, and result authorities rather than creating a second student competency database.

A future **My Open Shop** view may show current level, explanation, next-level requirement, progress, today's assigned task, specific focus, and assessment result/evidence.

The Activity Library and Resource Bank are also shared authorities for future ARC Student rather than duplicated student-side catalogs. Teacher views may expose deeper diagnostics, settings, evidence, approval, and authoring context. Student views may present **What's going wrong?**, **What should I check?**, Learn/Review, Practice, Assigned Challenge, and a clear explanation of what counts toward moving up. Both views must use the same instructor-approved resources and activity definitions with role-appropriate visibility.

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

## Today's Focus and Class Forecast

**Today's Focus** is the future authoritative daily instructional plan across all classes. It answers: **What am I intending to teach or accomplish today?** It depends on future lesson → class → calendar-date authority.

**Class Forecast** remains the existing selected-class preparation intelligence derived from actual student and project records. It answers: **Based on what students are actually doing, where will I likely need to focus attention?**

Today's Focus is not a global Class Forecast. Long term, planned instruction and classroom reality complement one another without sharing or duplicating authority.

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
14. No Resource Bank, approval lifecycle, contextual troubleshooting authority, or resource-to-practice-to-qualification pathway is implemented.
15. Current material planning does not derive expected demand from assigned Practice or Skill Challenges.
16. ARC Student does not yet reuse Activity Library or Resource Bank authorities because those authorities and the future student experience are unimplemented.
17. The complete WT evidence pathways and deterministic Safety Evidence Model are approved, but no runtime evidence records, derivation, observation workflow, Safety Status, gate enforcement, or migration exists.

Any implementation must define migration, rollback, historical rendering, and explainability before changing stored records or current calculations.

## Decisions requiring instructor approval before implementation

- Exact evidence qualification/strength rules, recency windows, context-diversity requirements, weighting where applicable, and unresolved progression edge cases within the approved deterministic starting model.
- Final conservative-demotion thresholds and instructor-review behavior beyond the approved two-contradiction starting concept.
- When an override should prompt review and how long review suppression lasts.
- Grading-period snapshot timing and rules for quarter/semester boundaries.
- AWT criterion-to-competency mappings by process, joint, position, task, and evidence type. The WT mappings in this document are frozen.
- Evidence-strength mechanics not already frozen by this authority.
- Assessment UI and workflow design for the approved rubric family.
- Reassessment workflow details beyond the approved progression principles.
- Missing, exempt, absence, reassessment, late-work, and review-required policies in the future Gradebook.
- External-entry confirmation version model and who may confirm or reopen an entered item.
- Global Gradebook information hierarchy, default filters, and relationship to the existing class-scoped view.
- Project-plan student-release defaults and student drawing submission/revision workflow.
- Material readiness thresholds, forecasting horizon, and notification timing.
- Open Shop task taxonomy, qualifying-opportunity approval workflow, ranking/tie-break rules, duplicate/repeat rules, and the minimum authoritative resource data required for availability claims.
- Exact Activity Library schemas, shared-versus-specialized fields, migration from Project Bank, and activity authoring workflow.
- Exact Resource Bank schema, authoring and approval workflow, provenance rules, detailed lifecycle behavior, and archival behavior.
- Resource recommendation and ranking algorithm, including how contextual uncertainty is presented.
- Practice material-demand timing, reservation semantics, preparation horizon, and relationship to actual inventory transactions.
- Criterion-to-competency mappings beyond the frozen WT evidence architecture.
- Runtime evidence schema and migration from existing manual ratings and history.
- Exact evidence, observation, safety-status, and instructor-review UI and workflows.
- Detailed Minor, Major, and Critical safety-event taxonomy and default severities.
- Safety remediation, review, and clearance workflow.
- Student-facing implementation of WT evidence explanations and the Safety model.
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
