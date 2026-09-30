# ARC Recovered Source Authority Archive

This directory preserves the source-authority package supplied for the ARC Source Authority Preservation checkpoint.

- `source_material/` contains 25 immutable originals copied byte-for-byte from the handoff package.
- `source-manifest.json` records stable IDs, SHA-256 hashes, byte lengths, provenance, authority classification, constrained capabilities, transcription status, reconciliation status, and supersession status.
- `transcriptions/` contains derived, reviewable transcriptions. They never replace the originals.
- `standards-comparison.json` is the deterministic comparison between the official May 2022 South Dakota DOE Standards and current `index.html` transcriptions.
- `SOURCE_AUTHORITY_FINDINGS.md` records the preservation and continuity conclusions.
- `ARC_SOURCE_AUTHORITY_PRESERVATION_HANDOFF.md` is the controlling handoff as received.

Regenerate only the derived manifest and Standards comparison with:

```text
node scripts/generate_source_authority_manifest.js
node scripts/compare_authoritative_standards.js
```

The originals must never be edited, normalized, recompressed, renamed, or replaced by extracted text.
