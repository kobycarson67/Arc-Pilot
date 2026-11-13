# Fast Roster and Technical grade scope display repair

Date: 2026-11-13
Base: 3c56ef8 (local Search + History repair candidate)
Status: local only; no publication or physical acceptance.

The private ARC_SWEEP_PROFILE_HISTORY_2026-11-13.md identified an undefined Fast Roster pathway badge and native V8 Technical work labeled Legacy/Unscoped despite intact owning lineage. Reconfirmed source interpolation and legacy scope-field test.

## Display-only changes
- Fast Roster omits absent, non-string or blank pathway badges. Existing nonblank text is escaped. No replacement pathway or persisted value is invented.
- Technical score display uses a separate technicalGradeScopeDisplay helper. It validates the projected StudentActivity, assignment, exact version/definition, assessment-result/finalization/attempt ownership and academic enrollment against current read projections.
- Matching effective enrollment is labeled V8 enrollment-linked, not Current Term. Historical/other selected-enrollment context is explicit. Incomplete/unknown lineage is V8 scope unverified, never silently current or legacy.
- Legacy Technical records retain their previous display behavior.
- gradeRecordScopeState, gradeRecordIncluded, gradeScopeLabel and currentScoped helpers remain byte-identical to the base. No grade formulas, filter inclusion, points, policy, stored records or no-policy fallback changed. Project and Workplace scope rendering were not expanded in this slice.

## Verification
- arc_roster_grade_scope_display.test.js: 6/6; real synthetic activity/grade owners, native/imported/legacy/missing and forged lineage, other effective enrollment, no mutation, unchanged percentage, absent/pathway rendering.
- arc_technical_score_ui.test.js: 12/12.
- arc_technical_display_parity.test.js: 5 checks pass.
- Calculation scope helper byte comparison with base: identical. Inline script parse and git diff --check pass.

Native normal-shell acceptance and full gates remain coordinating-reviewer work. No production/tablet/publication changes.

Review hardening: validated native AssessmentResult sourceType ActivityAttempt and any supplied studentActivityId against its owner. Historical/other scope wording now covers an unrelated selected Section without falsely implying a different enrollment. Scope display is calculated once per row. Added malformed source-type/activity-ID refusal tests.
