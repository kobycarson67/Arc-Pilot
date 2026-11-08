# ARC Live Student Profile Repair 1

Date: 2026-11-08
Status: LOCAL CANDIDATE — INDEPENDENT REVIEW REQUIRED
Published predecessor: `adb6ede1bcd12b5e422c5dd6cd745df48df5e001`
Published predecessor tree: `6dc4e5dc9ddc44ebe1329c28f9cf907f4929362b`

## Production symptom and reproduced cause

The first Live Classroom Student record could be created, but opening the profile failed at the first competency read with `Cannot read properties of undefined (reading 'AWT-P4')`.

An isolated installed-Edge reproduction used the actual production-authoritative P4 Student creation path, an exact 74-store `arc_classroom_v8` fixture, the accepted real-Student authorization gate with fictional evidence, and fictional WT/AWT identities. Creation succeeded, but `openStudent()` then bypassed `allStudents()` and read the legacy compatibility copies in `state.classes`. Those copies do not carry the complete Batch A profile overlay. The missing `ratings` object caused the first visible competency code to appear in the exception. Projects and Open Shop were also affected by other absent optional collections.

The same reproduction exposed a second projection-adaptation issue: the V8 competency catalog omitted the accepted version's level descriptors and Standard text even though the profile competency renderer requires them. It also confirmed that Gradebook could dereference a temporarily absent Batch B read projection for a newly created unassessed Student.

## Bounded correction

- Profile opening now resolves the Student through the authoritative `allStudents()` projection.
- Every projected profile receives a nonmutating compatibility view with safe empty `ratings`, `ratingScopes`, `work`, `enrollments`, `projects`, `tech`, `history`, and `behaviorEvents` when an older record omits them.
- Existing values and collection identities are preserved. The adapter does not persist defaults or create ratings, grades, attendance, Evidence, qualifications, or History.
- The Batch A competency catalog now adapts exact accepted `title`, `standardText`, `studentStatement`, and `levelDescriptors` fields for the existing profile renderer.
- Gradebook treats a not-yet-refreshed optional Student projection as having zero approved sources instead of throwing.
- The shell/cache identity advances by `live-student-profile-repair-1` so the existing verified update protocol can install a fresh coherent worker cache; the authority closure remains the same 114 reviewed paths.

No database schema, store, authority record, Student record, or write-owner contract changes.

## Verification boundary

The installed-Edge verification uses only task-owned fictional data. It creates one new unassessed AWT Student and one new unassessed WT Student through the actual production-authoritative workflow, opens all 11 profile tabs, verifies Fast Roster, Gradebook, Open Shop, and History reads, performs an offline reload and a separate full-process cold restart, confirms exactly one correct active Enrollment per Student, checks exact Student revision preservation, exercises Test Scenario 1 isolation, and verifies a complete 74-store recovery package.

The pre-fix run reproduced the `AWT-P4` failure. The post-fix and cold-restart runs pass without profile-read mutation.

## Guarded publication and Samsung update preparation

This local candidate is not authorized for publication or physical installation.

Before any later publication or Samsung update:

1. The instructor must create a fresh production backup through the approved school OneDrive workflow.
2. ARC must independently download the exact uploaded package, verify its SHA-256 and package integrity, and validate an isolated restore. Upload success alone is insufficient.
3. The verified backup must remain in custody under the approved retention rule; the existing real Student record must not be copied into review evidence.
4. Independent review must accept this exact commit/tree and the sanitized evidence package.
5. Guarded application publication must use normal non-force Git operations and pass candidate/main regression, Pages, exact live-byte, closure, and visual-asset gates.
6. A new immutable release manifest and independently accepted canonical compatibility receipt are required before the release channel can move.
7. Samsung staging must verify the exact manifest/receipt/cache sentinel and preserve the existing production authority and database identity before one explicit instructor Apply.
8. Post-Apply checks must confirm startup, offline and cold restart, `V8_AUTHORITATIVE`, exclusive P4–P10C ownership, no dual write, the protected real Student record, and successful profile opening. Any mismatch is a stop condition.

No Samsung access, publication, deployment, release-evidence mutation, production data access, or authority change occurred during this repair.
