# ARC Stage 14 — No-Regression Parity P7

## Boundary and authority

P7 converts the Competency catalog, competency assessment, reassessment, Evidence, Instructor Override, and Open Shop authority boundaries through the P4 academic scope and the approved P6 Activity/Project relationships. Normal ARC remains `V7_ONLY`: each retained instructor competency action executes exactly one existing Schema 7 mutation through `ArcCompetencyEvidenceAuthorityAdapter.runLegacy`. Isolated v8 verification is hard-bound to `arc_classroom_v8_p7_verification`. There is no dual write and no access to `arc_classroom_v8`.

The adapter accepts Student, Enrollment, Schedule Assignment, Section, Course, School Year, and Semester identity only from `ArcAcademicConsumerProjection`. Duplicate display names never become identity. Evidence from P6 Project/Activity work enters only through an approved Evidence Source and exact declaration/source-point lineage enforced by `ArcV8Evidence`.

## Proficiency and precedence authority

The accepted scale remains exact: Level 1 Introduced = 60%, Level 2 Developing = 75%, Level 3 Proficient = 90%, and Level 4 Advanced = 100%. Level 3 is the proficiency threshold; Level 4 remains distinct higher-level performance.

One deterministic resolution path supplies every consumer:

1. `ArcV8Evidence` filters current, in-scope, nonvoid Evidence and applies the approved versioned Strategy, qualification, reassessment, confirmation, diversity, contradiction, and recency configuration.
2. The resulting Evidence derivation remains visible and retains its fingerprint and contributing history.
3. An active durable Instructor Override establishes the resolved official level without changing or fabricating Evidence. Direct instructor proficiency entry therefore creates an Override with level, reason, scope, actor provenance, and chain revision.
4. New Evidence can mark an Override for instructor review under its review policy; it does not silently replace the Override.
5. Revocation or replacement appends to the Override chain. Evidence corrections append a superseding or void record/source. Historical Evidence and prior instructor authority remain distinguishable.
6. Gradebook-facing competency results use the single resolved official level and the frozen `60/75/90/100` conversion. P7 creates no Gradebook entry and converts no Gradebook transaction authority.

No Evidence qualification, safety escalation, opportunity-ranking, mastery threshold, confirmation count, diversity count, or recency window is invented by P7. Those values remain controlled by the existing approved Strategy configuration and unresolved-policy gates.

## Catalog and Open Shop architecture

The catalog projection preserves WT/AWT separation, external competency keys, display name, category, standard, Level 1–4 descriptors, student statement, and catalog order. Exact deep links carry stable Student identity plus the exact competency code.

Open Shop remains a read-only derived projection. Its competency list preserves the accepted normal-ARC ordering: explicit `NE — No Evidence / No Attempt`, then Level 1, then Level 2, with catalog order as the tie breaker; resolved Level 3 and Level 4 are not competency-gap recommendations. Project recommendations arrive from P6 Project authority and retain their own explicit priority and reason. P7 returns competency and Project priorities as separate lists because no accepted policy authorizes a new cross-domain ranking formula. Recommendations are never persisted and actions deep-link to the owning Student, competency, or Project authority.

## Evidence achieved and remaining limits

Automated evidence covers WT/AWT separation, stable catalog keys/order/language, exact deep links, duplicate-name Student identity, direct instructor judgment, Evidence-versus-Override precedence, review and revoke boundaries, reassessment, append-first correction/supersession/void delegation, P6 Project/Activity lineage, the frozen conversion, multiple Open Shop priorities, deterministic ordering, stale-conflict propagation, exclusive adapter behavior, service-worker/build inclusion, and the unchanged IndexedDB structural version.

The parity contract advances `competency-catalog`, `competency-assessment`, `reassessment`, and `open-shop` to `service-ready`. It does not mark normal v8 UI authoritative, Samsung verified, or accepted. Full unified Student history, Gradebook transactions, Workplace/Safety, production catalog reconciliation, classroom authority transfer, and real Student data remain outside P7.

## Samsung verification requirement

After separately authorized publication and isolated fixture preparation, verify in installed PWA and direct Chrome: complete WT/AWT catalogs and statements; duplicate-name Student selection by stable identity; Level 1–4 direct instructor entry and reason; Evidence-derived result; Override precedence/review/revoke; reassessment and correction/void history; exact 60/75/90/100 display; Project/Activity Evidence linkage; profile/Open Shop/current-result agreement; multiple competency and Project recommendations; exact deep links; no recommendation write; reload, background/foreground, rotation, sleep/wake, and offline catalog behavior. Confirm that no Gradebook entry is created and production `arc_classroom_v8` is untouched.

## Proposed next bounded stage

**P8 — Convert Workplace, Safety, and Behavior/Incident boundaries** may reconnect the retained normal ARC Workplace and Safety workflows to existing v8 services through P4 scope and the P7 Evidence boundary, while keeping Behavior/Incident documentation separate from automatic grading. It must preserve approved daily/weekly scoring, positive evidence, correction history, Safety operational state versus competency level, and instructor review. It must not invent unresolved AWT-R4, Safety-pattern, or recency thresholds; convert Gradebook transactions; broaden unified Student history; switch classroom authority; dual write; mutate production; or require a structural database change without stopping for review.
