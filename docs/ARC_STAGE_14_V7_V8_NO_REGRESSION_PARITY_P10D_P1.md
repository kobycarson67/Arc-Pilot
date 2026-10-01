# ARC Stage 14 P10D-P1 — Pure Proposed Instructional Payload Compiler

## Authority and boundary

P10D-P1 starts from F1-complete commit `33be2d4073a7f5122cd4bccc5fc977f42c352b8b`, tree `a10be27d8cd55ec0dac47a7558a35e4053cf0580`, with rollback `rollback/pre-stage-14-parity-program-p10d-p1`. It implements a pure file-output compiler for review preparation only. Normal classroom authority remains Schema 7 / `V7_ONLY`.

The accepted planning authority is `ARC_P10D_IMPORT_DRY_RUN_PLAN.md`, 29,120 bytes, SHA-256 `cfad483e3266a646d8efc2d40581b0d834940cd38e62bc25c8b262f106b5932b`. P1 deliberately narrows the plan's future context-file concept: the first CLI accepts only `--output-directory` and uses a code-owned unresolved baseline. It cannot accept caller-provided identities, hashes, readiness, import authority, or database authority.

## Compiler contract

[`compile_p10d_proposed_instructional_payload.js`](../scripts/compile_p10d_proposed_instructional_payload.js) validates the nine accepted inputs by frozen byte length and SHA-256 before parsing. It then validates producer-specific internal digests, the original review queue and cross-artifact relationships, all 408 R1B disposition backreferences, preserved source identities, and every source file recorded in the recovered source manifest.

The compiler loads no ARC runtime or domain module, browser API, IndexedDB implementation, fake database, or application bootstrap. It creates only five deterministic review files in a new external directory. It rejects repository-overlapping paths, existing destinations, unsafe parents, unrecognized context or readiness options, and invalid input without replacing an existing destination.

Valid frozen input is a successful blocked compilation:

- status: `PROPOSED_UNIMPORTED`;
- readiness: `NOT_READY_FOR_REHEARSAL`;
- input validation: passed;
- import, persisted rehearsal, production, real Student data, and authority transfer authorization: false;
- target database inspected: false;
- target readback performed: false.

## Exact accounting

The review payload contains two Course context checks and 859 potential content roles:

- 2 Standard Catalogs and 2 Catalog Versions;
- 29 Standard Definitions and 29 Standard Versions;
- 10 existing instructor-selected Essential designations;
- 60 Competency Definitions and 60 Competency Versions;
- 2 Curriculum Maps, 2 Map Versions, 56 Items, and 80 exact-code Standard relationships;
- 124 Lesson Definitions, 124 Lesson Versions, 228 exact-code Standard relationships, and 51 approved WT Competency relationships.

The 408 historical queue dispositions remain represented once as reconciliation history. The 259 settled optional relationships remain absent and nonblocking: 45 Curriculum-to-Competency, 107 Lesson-to-Competency, 105 Lesson-to-Curriculum, and 2 Activity/Evidence relationships. They produce no proposed storage rows.

Each included role preserves the complete source record and source identity. Definition/version review roles may share one underlying source record but have distinct role keys. Final target IDs, version IDs, and target payload hashes remain null. Review-envelope hashes cover the actual incomplete proposal and are explicitly distinct from future target hashes.

WT 2.2 and AWT 2.2 use the verified official wording as proposed content while retaining the abbreviated repository wording and historical hashes as provenance. All other source order and code-point values remain unchanged. The 124 scalar Engagement Strategy strings remain visible with an explicitly proposed singleton-array candidate and an unresolved target-shape warning; the compiler does not claim that candidate as approved persisted representation.

## Retained blockers

All 859 roles remain blocked by the applicable parts of the versioned eight-area baseline:

1. official Course, parent Standard, and Webb metadata ownership;
2. final target identity/version rules and dependent-link rebinding;
3. complete Competency persistence/identity authority;
4. Curriculum quarter, per-item provenance, and scalar/array representation;
5. Lesson conversion/provenance and preservation-versus-availability treatment;
6. structured Essential-selection provenance and historical selection/import-event separation;
7. exact link provenance;
8. package completion and recovery authority.

These are representation and package-authority blockers rather than input corruption. No readiness flag can bypass them. Preserving a Lesson whose source lifecycle says `active` does not authorize v8 instructional availability or establish instructional acceptance. The Classroom Readiness requirement to review and improve Lesson content remains open.

## Verification evidence

The focused suite verifies frozen inputs and source files, exact accounting, complete meaningful-field preservation, official/historical wording separation, scalar Engagement Strategy visibility, no promotion of contextual prose to relationships, null target identities, semantic rejection paths, CLI narrowing, external-path safety, no output side effect on invalid input, module-load purity, and byte-identical results across two external directories.

The complete regression gate is required before the P1 commit: JavaScript syntax checks, the focused P1 suite, `tests/regression_static.py`, and every `tests/*.test.js`. Existing deterministic reconciliation generators may run through their accepted tests, but their repository bytes must remain unchanged.

## No-change result

P10D-P1 changes no application runtime, UI, build, cache, service worker, schema, database, parity state, preserved source archive, historical reconciliation artifact, or governing product authority. It performs no import, database rehearsal, production operation, publication, deployment, remote operation, or Samsung action.

The local isolated structural authority remains Schema 8 / IndexedDB 13 / 73 stores. The separately recorded protected Samsung foundation remains Schema 8 / IndexedDB 10 / 53 stores. Neither is opened or modified here.

The next bounded work requires reviewed ownership decisions for target representation, identity/version rebinding, provenance, and package recovery before a persisted rehearsal can be authorized. Any instructional availability decision that remains after those technical ownership contracts are frozen must remain explicit instructor authority. P10D-P1 itself authorizes no subsequent stage.

## Repair 1 — proposal fidelity and test isolation

Independent review of the original P1 snapshot identified four bounded findings. Repair 1 begins from commit `947d1e29f592d7c6544c0bc4a4cbd5255b8dab20`, tree `e6a427ee09739a6af8e4b073e4044bc1215ad3b3`, with rollback `rollback/pre-stage-14-parity-program-p10d-p1-repair-1`.

- **P1-01:** Lesson Version review roles retain their actual Lesson Version identity while joining the historical R1B overlay through the family-correct Lesson ID. All 149 preservation decisions now bind exactly once: 35 Curriculum items, 57 Lesson Definitions, and 57 Lesson Versions, including 27 WT and 30 AWT versions. Required overlays cannot silently fall back to `REVIEW_REQUIRED`.
- **P1-02:** The review package preserves both complete R1B source-resolution records, both complete Essential-provenance records, and exact associations from the Course contexts and ten Essential roles. All 29 Standard Version proposals preserve official wording, exact `parent` statements, Webb levels, and Webb labels as accepted review evidence. This does not establish a persisted owner or representation.
- **P1-03:** All 15 included role types have explicit validated routes. The 60 Competency Definitions use `ArcV8Evidence.createCompetency`; the 60 Competency Versions use `ArcV8Evidence.createCompetencyVersion`. Curriculum/Standards/Essentials and Lesson routes retain their existing owners.
- **P1-04:** All temporary fixture, sentinel, invalid-output, and neighbor paths are contained within roots exclusively allocated by `fs.mkdtempSync`. Refusal tests prove sentinel and unrelated neighbor bytes remain unchanged and absent output stays absent. Cleanup removes only the owned root.

The corrected compiler revision is `p10d-p1-proposal-fidelity-repair-1`. It preserves the same 859 source-role keys and records, 408 historical dispositions, 259 absent optional relationships, 51 approved WT Lesson-to-Competency links, two Course checks, and eight unresolved blocker areas. Corrected review-envelope, package, identity-map, report, and inventory hashes are derived from the repaired proposal; final target IDs/version IDs/payload hashes remain null.

Repair 1 does not change the application, runtime, UI, build/cache, schema, database, parity state, source archive, R1B decisions, production authority, or Samsung state. Outputs remain `PROPOSED_UNIMPORTED` / `NOT_READY_FOR_REHEARSAL`; normal classroom authority remains Schema 7 / `V7_ONLY`. Independent review of the repaired snapshot remains pending, and no subsequent stage is authorized.
