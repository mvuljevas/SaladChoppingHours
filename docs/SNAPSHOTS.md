# Snapshots

Snapshots preserve project memory across sessions, handoffs, branch changes,
and context compaction.

## Format

Use this structure:

```text
## YYYY-MM-DD - Block NNN: Short Title

Branch:

- `branch-name`

Current state:

- What is true now.

Decisions:

- Decisions made in this block.

Risks:

- Risks, unknowns, or open questions.

Next suggested step:

- The next logical action.
```

## Rules

- Add snapshots after meaningful project changes.
- Keep snapshots factual and concise.
- Do not use snapshots as a replacement for roadmap or technical debt.
- Keep chronological order from oldest to newest.

## 2026-06-28 - Block 001: Workflow Foundation

Branch:

- `main`

Current state:

- The repository contains workflow governance, documentation, ignore files, and
  a version source.
- Product code has not been added.
- `lean-context` has been adopted from the local `AGENTS` repository.
- The planned product is a local web app that calculates Salad Chopping hours
  and Star Chef qualification signals.

Decisions:

- Use docs-only governance as the initial template layer because the source
  `AGENTS` repository does not yet provide a concrete React/Vite template.
- Recommend a React SPA / Vite / PWA style app for the future product, pending
  confirmation before scaffolding.
- Keep the current authoritative version source as `VERSION`.
- Do not commit local Salad logs, tokens, copied installation data, or secrets.

Risks:

- Browser-only filesystem access to `C:\ProgramData\Salad` is not enough for
  automatic reading; a local backend, desktop wrapper, file picker flow, or
  trusted bridge must be chosen.
- The official Star Chef rule can change and needs an update policy.

Next suggested step:

- Confirm the app architecture and stack before adding product code.

## 2026-06-28 - Block 002: React Vite Template Adoption

Branch:

- `main`

Current state:

- The local `AGENTS` repository now provides `templates/react-vite-spa/`.
- The project has adopted the React/Vite template shell.
- `package.json` is now the authoritative version source.
- The app has a minimal `src/` shell only; no Salad-specific parsing or process
  detection has been implemented.

Decisions:

- Use React + Vite as the application stack.
- Keep `lean-context` active.
- Keep Salad-specific implementation for the next block after architecture
  confirmation.

Risks:

- Local filesystem access to `C:\ProgramData\Salad` still requires an explicit
  access model.
- Dependencies have not been installed or built yet in this block.

Next suggested step:

- Decide the local access architecture, then implement the first parser and
  status-detection slice.

## 2026-06-28 - Block 003: Local Access Architecture

Branch:

- `main`

Current state:

- The project has selected a local access model for Salad data.
- The app remains a React/Vite shell; no Salad parser, helper process, or
  process detection code has been implemented yet.
- Version remains `0.1.0` for the first real project commit.

Decisions:

- Use a React/Vite browser UI backed by a small read-only localhost helper.
- Keep the helper API purpose-built instead of exposing generic filesystem
  operations.
- Bind the helper to localhost and require bounded, allowlisted reads.

Risks:

- The helper still needs implementation and verification.
- Localhost API hardening details, including optional session tokens, remain
  open.
- Salad log formats and official Star Chef rules can still change.

Next suggested step:

- Add the narrow local helper skeleton, then implement bounded log metadata and
  parser fixtures.
