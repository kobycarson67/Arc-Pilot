# Technical score atomicity repair candidate

Date: 2026-11-13 UTC. **Local development candidate, not released or physically accepted.**

Baseline: `b1e9449ec12b65b43f4fde21c7bab04ef6a15885`; rollback tag `repair-baseline-b1e9449`. Work classification: corrective maintenance / Classroom Readiness Technical scoring and Gradebook consistency. The accepted source and release have not been modified or republished.

## Authority and evidence

Governing documents: `ARC_AUTHORITY_GOVERNANCE.md`, `ARC_MASTER_PRODUCT_AUTHORITY.md` (stable Student identity, safe corrections/history, one owning authority), `ARC_CLASSROOM_READINESS_CONTRACT.md` (Technical scoring and Gradebook revisions), `ARC_ASSESSMENT_GRADEBOOK_DESIGN.md` (corrections update projections while preserving history), `ARC_COORDINATED_CLASSROOM_REPAIR_10_FINDINGS_3_2026-11-10.md` (source ledger without invented official grade/policy).

Independent audit reproduced normal-shell `persistTechnical` creating a historical-enrollment correction source before P9 rejected it under a different current enrollment. Each step committed separately, leaving source and ledger inconsistent and UI stale. No Live recovery is attempted by this candidate.

## Change

- P6 `saveTechnicalScore` checks exact effective P4 Student/enrollment scope and expected Activity/Attempt revisions, source lineage and existing ledger scope. It rejects historical-enrollment scoring through a current-enrollment context, withdrawn work, conflicting revisions and stranded source/ledger history.
- Uses one native storage transaction encompassing academic scope reads, Activity owners, immutable finalization/source creation and the existing P9 correction command. Transaction-bound owner instances preserve options, clocks, actor and activation gates; nested owner operations use the same transaction, not independent database transactions. All transaction reads/writes are IndexedDB requests; no rendering, cache reload or network work occurs inside it.
- Unchanged P9 ownership and direct-supersession checks still execute. Corrections append source and ledger revisions, never overwrite the original assessment. A first/unposted score remains an unposted source, not an invented ledger entry or official grade.
- Profile and class callers reload authoritative projections after success and failure, then report errors visibly. A refresh failure explicitly tells the instructor to reload before retrying, without claiming no save occurred. Duplicate in-flight saves are suppressed. Profile refresh targets stable Activity identity and does not reopen a different Student.
- Prior HTML-token test now checks delegated lineage wiring at its owning module, with executable service/UI regressions supplementing it.

## Verification boundary

New synthetic regressions: 20 atomic-owner cases, including failure at every write with complete snapshot equality; 12 executable normal-shell route/error/reload cases. Final candidate checks: all **189/189 JavaScript test files passed** and **47/47 static regression checks passed**. `git diff --check` passed. The new browser harness passed syntax checking only, not execution.

Native Chromium IndexedDB regression harness: `node tests/arc_technical_score_indexeddb.browser.js`. It covers source/ledger success, late-write transaction rollback and historical zero-write rejection. Execution in this cloud sandbox was blocked before any cases by Chromium process-singleton socket permission denial (also after supported escalation). **Native browser transaction lifetime/abort is unverified here.** This manual browser harness is intentionally outside the dependency-free standard `.test.js` gate.

## Not changed / remaining safeguards

No schema, store, grading policy, protected recovery gate, immutable release identity, deployment, real or fictional Live records, or external posting changes. Existing stranded source-to-ledger history is preserved and refused; reconciliation requires its own approved, scope-aware recovery workflow. Explicit historical-context scoring is not introduced. Source/ledger grading-period mismatch remains fail-closed rather than guessing an old date or relabeling ownership.

Independent source review, native IndexedDB testing and fictional physical acceptance remain required before release. Tablet Live data must remain untouched until its recovery and reconciliation plan is approved. This candidate does not fix other audit findings or imply exhaustive Live V8 acceptance.
