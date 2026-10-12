# Fictional runtime provenance fixture

This directory contains a synthetic static application used only by Stage 1D-Core tests. It has no ARC database, Student, recovery, marker, production, or device data.

The test copies `repo/` into a task-owned temporary directory before mutation cases. Raw line-ending fixtures are created in that temporary directory so repository checkouts do not normalize the test bytes.
