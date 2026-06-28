# Naming

This document defines naming standards for branches, commits, tags, and files.

## Branch Names

Use descriptive, neutral branch names.

Recommended prefixes:

```text
docs/
feature/
fix/
chore/
release/
```

Examples:

```text
docs/workflow-foundation
feature/salad-log-parser
feature/local-status-api
fix/chopping-interval-calculation
release/v0.1.0
```

Avoid:

- Agent names.
- AI tool names.
- Provider names.
- Personal scratch labels.
- Generic names such as `update`, `changes`, or `fixes`.

## Commit Messages

Commit messages should describe the result, not the tool used.

Recommended examples:

```text
Document workflow foundation
Add Salad log parser
Add Star Chef calculation summary
Fix running workload detection
```

## Tags

Release tags must follow:

```text
vX.Y.Z
```

Where `X.Y.Z` follows Semantic Versioning.

## Snapshot Titles

Snapshots should use this format:

```text
## YYYY-MM-DD - Block NNN: Short Title
```

## Document Names

Use uppercase names for top-level governance documents:

```text
AGENTS.md
README.md
LICENSE
VERSION
```

Use uppercase names for core docs:

```text
CONVENTIONS.md
NAMING.md
WORKFLOWS.md
SNAPSHOTS.md
ROADMAP.md
TECHDEBT.md
ARCHITECTURE.md
SECURITY.md
```
