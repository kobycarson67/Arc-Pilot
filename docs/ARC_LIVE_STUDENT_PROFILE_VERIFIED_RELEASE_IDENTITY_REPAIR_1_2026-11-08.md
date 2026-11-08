# ARC Live Student Profile Verified-Release Identity Repair 1

Date: 2026-11-08
Status: LOCAL CANDIDATE — INDEPENDENT REVIEW REQUIRED
Published predecessor: `6d74481f6b96adc602a0ce2536891d5d7406ac66`
Published predecessor tree: `4847c1bc05ac8467d24500963a285f89c5ee040e`
Release-evidence baseline observed before local work: `10a4e3eb482eb632b1609ecd5ca5dd6d2d53fc20`

## Reproduced production failure

The published profile repair and its predecessor carried the same `ARC_BUILD.build` identity even though they were distinct releases with distinct manifests and commits. On Samsung, the retained predecessor cache was `active_healthy` while the candidate cache was `activation_requested`. Both therefore remained eligible under the verified-release contract. The worker correctly refused to choose between them and returned bounded HTTP 503 with `AMBIGUOUS_VERIFIED_RELEASE`; classroom storage was not changed.

An isolated installed-Microsoft-Edge rehearsal recreated that exact state with:

- predecessor `adb6ede1bcd12b5e422c5dd6cd745df48df5e001` as `active_healthy`;
- failed candidate `6d74481f6b96adc602a0ce2536891d5d7406ac66` as `activation_requested`;
- identical build identities;
- distinct release IDs, manifests, commits, and named caches; and
- the expected fail-closed 503 response.

## Bounded correction

`ARC_BUILD.build` and `ARC_BUILD.shell` now advance through `live-student-profile-verified-release-identity-repair-1`. The frozen authority-closure contract is bound to that exact new build identity. No authority executable was added and the closure remains exactly 114 paths.

The service-worker selection algorithm, release transport, sentinel contract, recovery selection, explicit Apply behavior, cache retention, and 503 behavior are unchanged. The correction makes the candidate distinguishable; it does not weaken ambiguity, corruption, completeness, compatibility, or authority checks.

The accepted Student-profile and enrollment-label corrections remain byte-for-byte present. This repair does not change database schema, stores, Student or Enrollment records, production authority, real-Student authorization, dual-write state, backup/recovery semantics, or instructional content.

## Verification

- Exact two-cache failure reproduced: PASS.
- Corrected verified-waiting release staged with 114/114 assets: PASS.
- Deterministic controller takeover and normal shell load: PASS.
- Online reload, offline reload, and full-process offline cold restart: PASS.
- Corrected cache reached `active_healthy`; predecessor caches remained retained: PASS.
- Incomplete and unauthorized release cases remained fail closed: PASS.
- Student-profile focused tests, including new fictional WT/AWT unassessed profile compatibility and exact enrollment labels: PASS.
- Complete JavaScript inventory: 179/179 test files passed.
- Static regression: 47/47 checks passed.
- Production/Samsung access: none.
- Database writes or authority transfers in the Edge repair rehearsal: zero.

The accepted prior Edge evidence remains the profile-content proof for fictional WT/AWT creation, all 11 profile tabs, Fast Roster, Gradebook, Open Shop, History, Simulation isolation, and 74-store recovery. A copied historical browser profile correctly refused rehydration after the build identity changed because its activation evidence was bound to the prior source identity; no activation gate was weakened to reuse it.

## Safety boundary

The physical Samsung is not repaired by this local candidate. No cache is selected or deleted, no worker is unregistered, no storage is cleared, and no Student or Enrollment is read or changed. Publication, independent compatibility acceptance, release-evidence publication, and physical recovery each remain separately gated.
