# Global Search effective context repair

Date: 2026-11-13
Base: ecaed898 (installed classroom-workflow-sweep release)
Scope: local candidate, not deployed or physically accepted.

## Evidence and cause
The dated private sweep note ARC_SWEEP_SEARCH_CONTEXT_2026-11-13.md records a native V8 student incorrectly labeled not currently enrolled, with Open retaining an unrelated selected class. No wrong-section mutation was attempted or demonstrated. The source compared compatibility enrollment year/semester IDs with display labels and passed an empty Section target.

## Bounded correction
- Resolve search labels and eligible Section targets from the existing academic consumer projection and effective Section contexts.
- Preserve an eligible selected class for dual-placement students. Provide an explicit class selector; when the current class is unrelated, require a choice rather than choosing the first placement.
- Revalidate at Open. Stale, unknown, archived, ended and no-effective-context targets cannot inherit an unrelated class. Search Open is disabled without an eligible current class; no historical profile workflow was invented.
- Escape names, labels and handler arguments.
- Remove the classroom save() call from Search navigation. Existing roster/profile navigation persists its navigation context; this action no longer explicitly rewrites legacy classroom state or marks an automatic backup change.
- Do not change academic projection rules, records, release metadata, deployment or tablet state.

## Local verification
- arc_global_search_context.test.js: 8/8, using the real authoritative projection over synthetic native/imported fixtures; cross-class/dual/stale/negative/null-scope/escaping/read-only cases.
- arc_academic_consumer_projection.test.js: 13/13.
- Inline application script parses; git diff --check passes.
- Native normal-shell acceptance and full regression gates remain with coordinating reviewer. Unit rendering/navigation spies are not physical acceptance.
