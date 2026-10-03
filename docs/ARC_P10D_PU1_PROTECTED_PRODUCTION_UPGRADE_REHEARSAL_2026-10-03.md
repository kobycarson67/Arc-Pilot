# ARC P10D-PU1 Protected Production Structural-Upgrade Rehearsal

Date: 2026-10-03  
Authority: bounded local engineering rehearsal only  
Normal classroom authority: Schema 7 / `V7_ONLY`

## Result

The exact protected-production-shaped Schema 8 / IndexedDB 10 / 53-store foundation was reconstructed from published commit `52b7d1b3ed920c0e889e211e41ea34b6e0395bbd`, tree `521e44fa1254e3f70b47b91d99d5749f7dabdcc0`, in a new task-owned Microsoft Edge 154.0.4258.37 profile. Its historical backup was verified, destructively restored, reopened, and matched before any current migration ran.

The current storage authority then completed the existing ordered structural path:

1. `indexeddb-10-to-11`: 53 → 54 stores;
2. `indexeddb-11-to-12`: 54 → 67 stores;
3. `indexeddb-12-to-13`: 67 → 73 stores;
4. `indexeddb-13-to-14`: 73 → 74 stores.

The final database remained logical Schema 8, contained exactly 74 stores, passed integrity inspection as `Verified Healthy`, retained all historical production initialization, reconciliation, and protection manifests, and kept all 21 newly introduced stores empty. All historical domain stores remained unchanged and empty. `V7_ONLY`, `classroomAuthorityTransferred:false`, and `realStudentDataAuthorized:false` remained in force. Ordinary protected development reset was refused.

## Recovery proof

| Artifact | Package SHA-256 | Result |
|---|---|---|
| Historical pre-upgrade recovery backup | `a9829a1995425b308b0d28aac8e634fc7ae81355d9fea4562a4b5c4538ef8824` | Verified, 53 stores; destructive restore and reopen parity passed |
| Current post-upgrade recovery backup | `eb917ac10d271ffb630bd93d7e38ea926f104665cb9516623b85b98f83fdd00d` | Verified, 74 stores; destructive restore and reopen parity passed |

The current post-upgrade backup file SHA-256 is `aadc5e27f780d2e2daf947a61adab9815ba03cc0374b7fc3c9390a5b00497e70`. Per-store record counts and SHA-256 checksums matched after restore.

## Engineering execution notes

- The coordinator is explicit and unwired. Loading it does not open IndexedDB.
- It accepts only exact database identity `arc_classroom_v8` and was exercised only inside the new task-owned Edge profile.
- It verifies the historical backup without opening a database, performs an unversioned native inspection before current storage opens, and refuses unexpected database identities in the task profile.
- It compares migration history by stable migration identity because IndexedDB returns key-path records in lexicographic primary-key order; it still requires the exact four-step 10→14 chain and preserves every historical migration record byte-for-byte/logically.
- No instructional content or package event was written. No real Student data was used.
- Failed harness attempts were retained as engineering lineage. The first exposed the new coordinator's query-order assumption; the later attempts isolated JSON property-order comparison in the external harness. Neither required a change to an existing ARC migration, storage, backup/recovery, production-initialization, owner, or package file.
- After evidence capture, the exact rehearsal database was deleted and database enumeration was empty. The task-owned Edge profile and loopback server were removed.

## Authority boundary

PU1 proves the protected-production-shaped 10/53 → 14/74 migration and recovery path in isolated real Edge. It does not publish or deploy code, touch the physical Samsung production database, import instructional content, activate normal v8, authorize real Student data, or transfer classroom authority.

The next boundary requires separate authorization after independent review: exact publication, Samsung pre-upgrade recovery capture and verification, and the physical protected structural upgrade. No production instructional import is authorized by this milestone.
