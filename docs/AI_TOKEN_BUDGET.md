# AI Token Budget

This repository uses `lean-context` as an active workflow layer.

## Budget Rules

- Do not read the whole repository by default.
- Start with `README.md`, `AGENTS.md`, `docs/AI_CONTEXT.md`, and recent
  snapshots.
- Search with `rg` before opening files.
- Prefer file slices over whole files.
- Do not inspect generated files, dependencies, caches, local secrets, copied
  Salad logs, or lockfiles unless directly relevant.
- Search `src/` before opening application files.
- Summarize command results instead of pasting full outputs.
- Keep final responses focused on decisions, changes, validation, and next
  steps.

## Preferred Read Order

1. `README.md`
2. `AGENTS.md`
3. `docs/AI_CONTEXT.md`
4. Recent entries in `docs/SNAPSHOTS.md`
5. `package.json`
6. Search results from `docs/AI_SEARCH.md`
7. Targeted file slices

## Large Output Rules

Before opening a large file:

```powershell
rg "target-pattern" path\to\file
Get-Content path\to\file -TotalCount 120
```

Then read only the relevant section.

## Language Rule

Reusable technical documentation should stay in concise English. Spanish should
be used only for prompt examples or user-facing phrases that agents must
recognize.
