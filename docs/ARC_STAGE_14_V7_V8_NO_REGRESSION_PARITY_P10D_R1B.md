# ARC Stage 14 P10D-R1B — Source Verification and Disposition Freeze

## Authority and boundary

R1B starts from product-authority recovery commit `16f7e186051d2778a6e8e0afb0fad4dfc72787d4`, tree `7893d41e59c3e20417ccc1cfcac3745afc88417e`, with rollback `rollback/pre-stage-14-parity-program-p10d-r1b`. It is source reconciliation and disposition authority only. Normal classroom authority remains Schema 7 / `V7_ONLY`.

The machine-readable overlay is [`r1b-source-disposition-freeze.json`](../reconciliation/p10d/r1b-source-disposition-freeze.json). It is generated deterministically by `scripts/generate_p10d_r1b_source_disposition_freeze.js`. The four P10D/R1A JSON artifacts remain byte unchanged and are referenced by their internal authority hashes and file SHA-256 values.

## Source-verification decisions

Both independent gates are resolved from preserved institutional sources:

| Gate | Controlling source | Course identity | Result |
|---|---|---|---|
| `SV-WT-STANDARDS-SOURCE` | South Dakota DOE `13207-WeldingTech.pdf`, SHA-256 `5eefd18500d9c1ff756ab053c8e2e0f65e44a140bdfe6cd853e960c5b099111d` | Welding Technology, `13207`, adopted May 2022, no prerequisite | 9 codes and order match; WT 2.2 has the sole WT wording difference. |
| `SV-AWT-STANDARDS-SOURCE` | South Dakota DOE `13208-Adv-Welding.pdf`, SHA-256 `1ca93ffe04cbdfa1c32f566af635cf1bae728855c9456bb6ef5e7a41f80aafaa` | Advanced Welding Technology, `13208`, adopted May 2022, prerequisite Welding Technology | 20 codes and order match; AWT 2.2 has the sole AWT wording difference. |

The other 27 sub-indicator statements match exactly. Official source wording controls a later separately authorized import. R1B does not edit the abbreviated runtime transcription.

### WT 2.2

- Official: `Read, comprehend, and communicate welding terms and definitions from American National Standards Institute (ANSI)/American Welding Society (AWS) A3.0, Standard Welding Terms and Definitions.`
- Repository: `Read, comprehend, and communicate welding terms and definitions from ANSI/AWS A3.0, Standard Welding Terms and Definitions.`

### AWT 2.2

- Official: `Communicate using welding terms and definitions from American National Standards Institute (ANSI)/American Welding Society (AWS) A3.0, Standard Welding Terms and Definitions.`
- Repository: `Communicate using welding terms and definitions from ANSI/AWS A3.0, Standard Welding Terms and Definitions.`

Current runtime records also omit official course/adoption/prerequisite metadata, parent Standard statements, and Webb levels/labels. Their later target representation and target-version identity remain import-design questions; R1B adds no database field or schema authority.

## Essential provenance

The ten existing instructor selections are frozen without creating new selections:

- WT: `WT 1.1`, `WT 2.1`, `WT 3.3`, `WT 4.3`.
- AWT: `AWT 1.1`, `AWT 3.2`, `AWT 5.3`, `AWT 6.1`, `AWT 7.3`, `AWT 9.1`.

The three-part provenance is explicit instructor confirmation, the preserved orange-highlighted source photographs, and the recovered WT/AWT Curriculum Maps. These are instructor-selected Essential Standards, not South Dakota DOE designations.

## Effective R1B dispositions

R1B overlays every original queue item exactly once without changing the historical queue:

| Effective treatment | Count | Result |
|---|---:|---|
| Preserve exact content | 149 | 35 Curriculum items, 57 Lesson Definitions, and 57 Lesson Versions retain all source fields, ordering, instructional text, `rawStandardsText`, and `sourceStandardsText`. Contextual text and ranges remain prose. |
| Leave optional relationship absent | 259 | 45 Curriculum→Competency, 107 Lesson→Competency, 105 Lesson→Curriculum, and two Activity/Evidence candidates remain absent and do not block underlying content preservation. |

The 51 separately approved exact WT Lesson→Competency links remain preserved. No AWT Competency mapping or missing P6 identity is invented. Existing exact-code Standard relationships remain subject to the resolved official source/version boundary and later target-version validation.

Preserving 124 Lessons does not establish instructional acceptance. Their content and differentiation improvements remain required by the Classroom Readiness Contract.

## No-change result

R1B performs no content import, runtime/UI change, build/cache/service-worker change, schema/store change, database operation, and no parity advance. It performs no authority transfer, production/Samsung action, or publication. It does not declare P10D import or Classroom Ready complete. A reviewed import/dry-run plan requires separate authorization after this source/disposition authority is accepted.

## F1 follow-up — generator input validation

The September 30, 2026 implementation review identified that the R1B generator trusted declared digest labels and did not fully reject unknown or contradictory queue mappings before writing output. An isolated copy of the original generator reproduced the defect: a mapping with a nonexistent decision ID exited successfully and replaced a sentinel output.

The bounded F1 repair pins all eight accepted input files by byte length and SHA-256, recomputes each producer-specific internal digest, validates every preserved source file, and verifies complete one-to-one queue coverage, canonical fingerprints, manifest identities, decision routes, classifications, statuses, course scope, and established totals before output creation. Its pure relationship validator is exercised directly, while CLI rejection tests use temporary fixture roots outside the checkout. Invalid input now returns a nonzero status and either preserves a pre-existing output byte-for-byte or leaves an absent output absent.

Valid frozen input still produces the original R1B artifact exactly: 462,783 bytes, file SHA-256 `6bf00f4973aa6e7be8860d810190df22c9ddf40787998fb0198e2216e0e3e22a`, and internal artifact hash `ce7ba279ba4e6958144c58ae76b756c0ead535b3a52f96da93eb06aaca3fbd76`. The original R1B dispositions and source decisions remain unchanged.

Fresh local verification passed both changed-file syntax checks, all 20 focused R1B cases, the 47/47 static regression gate, and all 91 JavaScript regression files. Fifteen protected working-copy files were SHA-256 identical before and after the full gate.

This follow-up changes reconciliation tooling and its local regression evidence only. Normal classroom authority remains Schema 7 / `V7_ONLY`; local isolated v8 remains Schema 8 / IndexedDB 13 / 73 stores; the protected Samsung foundation remains separately recorded at Schema 8 / IndexedDB 10 / 53 stores. No content import or dry run, parity advance, runtime/UI/build/cache/schema/database change, publication, deployment, or Samsung operation occurred. Independent review of this repaired checkpoint remains pending. The next possible work remains a separately authorized reviewed import/dry-run planning stage after F1 review.
