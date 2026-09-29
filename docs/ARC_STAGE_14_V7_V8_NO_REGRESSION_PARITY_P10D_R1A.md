# ARC Stage 14 P10D-R1A — Instructor Review Queue Consolidation

## Authority and result

R1A starts from P10D commit `cddeac773caa917b405f30c2f2e4c8f090c65e91`, tree `af6073090ceb65afb3d603bd05c8e474202d85d0`, and manifest SHA-256 `960dc548c984c0f6aed591f40856cb2947491928e31d71e3a8d65b0fbca501a2`. Rollback authority is `rollback/pre-stage-14-parity-program-p10d-r1a`.

The P10D manifest and original 408-item queue remain byte unchanged. R1A changes no disposition. It imports nothing and changes no runtime, build, cache, Schema, IndexedDB, database, UI, publication, or parity state.

## Consolidated artifacts

- `reconciliation/p10d/consolidated-review-queue.json` is the concise human queue. SHA-256 authority: `623692e763031dede4d5a23d5bab076d10b9da84f2c3ab61535c86df9e40a0e2`.
- `reconciliation/p10d/original-item-resolution-map.json` maps every original queue index and content fingerprint to one consolidated entry/status. SHA-256 authority: `9116b256ac41ee69e91ebc26aa87a6d1a5a854ea5a6ff08d13c53288da551fef`.
- `scripts/consolidate_p10d_review_queue.js` reproduces both artifacts from the unchanged P10D authority.

## Compression result

| Classification | Consolidated groups | Original items |
|---|---:|---:|
| True instructor decisions | 0 | 0 |
| Source-verification decisions | 2 | 0 original queue items; newly explicit external gates |
| Mechanical follow-on mappings | 2 | 149 |
| Safe unresolved relationships | 4 | 259 |
| **Total** | **8** | **408 mapped exactly once** |

The consolidation does not hide 408 independent decisions. Repository evidence shows that none of the 408 items requires a pedagogical choice to preserve the exact underlying content.

## Why no true instructor decision is presently required

P10D incorrectly coupled content approval to optional normalized relationships in three cases:

1. A Curriculum item containing a range or contextual Standards statement can preserve that exact statement without expanding it into links.
2. A Lesson containing contextual Standards language can preserve exact content without converting every phrase into a Standard link.
3. Shared Standard codes produce possible Competency or Curriculum relationships, but the source never asserts those links.

Separating content from optional links is mechanical application of the frozen ownership model. It does not choose instructional meaning. A true instructor decision should be opened later only when the instructor wants to assert a relationship not already present in accepted source authority.

## Mechanical follow-ons — 149 original items

`MF-CURRICULUM-CONTENT-SEPARATION` covers 35 Curriculum item records. Preserve all exact fields and `rawStandardsText`; retain only separately approved exact-code Standard links. Ranges and contextual text remain prose.

`MF-LESSON-CONTENT-SEPARATION` covers 57 Lesson Definitions and their 57 corresponding Lesson Versions. Preserve their exact content; contextual Standards wording remains `sourceStandardsText`. This does not approve a new relationship.

These follow-ons do not currently alter P10D dispositions. A later authorized disposition-freeze stage may apply them deterministically.

## Safe unresolved relationships — 259 original items

| Group | Original items | Treatment |
|---|---:|---|
| Curriculum → Competency candidates | 45 | Leave absent. Shared Standard codes do not assert a Competency relationship. |
| Lesson → Competency candidates | 107 | Leave candidate-only links absent. Preserve the 51 separately approved exact WT competency-code links; invent no AWT mappings. |
| Lesson → Curriculum candidates | 105 | Leave absent. Shared Standard codes do not identify one authoritative Curriculum item. |
| Activity/Evidence relationships | 2 | Leave absent. The Lessons remain preservable without fabricated P6 Activity Version or Evidence Declaration IDs. |

These optional relationships do not block preservation or import of the underlying Standard, Curriculum, Competency, or Lesson records.

## Genuine import blockers

No item among the original 408 blocks exact content preservation/import after content and optional relationships are separated.

Two distinct external source-verification gates block only their scoped authoritative domain:

1. `SV-WT-STANDARDS-SOURCE` blocks authoritative import of the WT Standard catalog/version, WT Essential designations, and normalized links dependent on those records.
2. `SV-AWT-STANDARDS-SOURCE` blocks the equivalent AWT authority.

They do not block exact Curriculum raw content, Lesson raw content, or P7 Competency preservation. Repository wording is not selected over unavailable source material.

## Exact next questions

There are no pedagogical mapping questions to present yet. The next instructor interaction consists of two source-verification questions:

### WT Standards authority

- **Supply authoritative WT source:** provide the controlling document/photo for exact comparison.
- **Confirm repository copy:** explicitly designate the current repository WT catalog as controlling authority.
- **Defer:** leave WT Standards, Essential designations, and normalized Standard links blocked while other content remains preservable.

### AWT Standards authority

- **Supply authoritative AWT source:** provide the controlling document/photo for exact comparison.
- **Confirm repository copy:** explicitly designate the current repository AWT catalog as controlling authority.
- **Defer:** leave AWT Standards, Essential designations, and normalized Standard links blocked while other content remains preservable.

## Recommended review order

1. Supply or identify the authoritative WT and AWT Standards sources.
2. Resolve the two source-verification gates independently.
3. Authorize a disposition-freeze stage to mechanically separate exact content approval from optional relationship approval.
4. Keep candidate-only relationships absent.
5. Open new instructor mapping decisions only when explicit accepted source authority is supplied.

## Parity and next boundary

Parity remains 40 `service-ready`, four `not-started`, and three `accepted`; authority remains `V7_ONLY`.

The next stage is not import. It is **P10D-R1B — Source Verification and Disposition Freeze**, after the instructor answers the two source-authority questions or supplies the controlling documents. R1B may update dispositions and remove candidate-only review requirements but still must not import without separate authorization.
