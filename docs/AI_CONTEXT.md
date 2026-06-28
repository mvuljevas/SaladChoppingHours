# AI Context

This file is the compact project summary for agents working in this repository.

## Project

- Name: SaladChoppingHours.
- Purpose: local web application for automatically calculating Salad Chopping
  hours and Star Chef qualification signals from a Salad installation folder.
- Current version: 0.1.0.
- Current phase: local access architecture selected; Salad-specific logic is
  not implemented yet.

## Stack

- Runtime: Node.js.
- Frontend: React + Vite.
- Application root: `src/`.
- Package manager: npm.
- Version source: `package.json`.
- Release tags: `vX.Y.Z`.

## Repository Shape

```text
.
├── AGENTS.md
├── index.html
├── package.json
├── README.md
├── docs/
│   ├── AI_CONTEXT.md
│   ├── AI_SEARCH.md
│   ├── AI_TOKEN_BUDGET.md
│   ├── CONVENTIONS.md
│   ├── NAMING.md
│   ├── ROADMAP.md
│   ├── SNAPSHOTS.md
│   ├── TECHDEBT.md
│   └── WORKFLOWS.md
├── LICENSE
└── src/
    ├── main.jsx
    └── styles.css
```

## Key Commands

```powershell
# install dependencies
npm install

# run local dev server
npm run dev

# build verification
npm run build

# inspect state
git status --short --branch

# search
rg "pattern"
rg --files

# validate whitespace
git diff --check
```

## Important Files

- `README.md`: project purpose, planned scope, and documentation map.
- `AGENTS.md`: active agent workflow rules for this repository.
- `package.json`: authoritative version source and npm scripts.
- `src/`: React application code.
- `docs/SNAPSHOTS.md`: chronological project memory.
- `docs/ROADMAP.md`: planned product direction.
- `docs/TECHDEBT.md`: accepted risks and open cleanup items.
- `docs/ARCHITECTURE.md`: selected local access architecture.
- `docs/SECURITY.md`: local data handling and helper API safety rules.

## Current Decisions

- Adopt `templates/react-vite-spa/` from the local `AGENTS` repository.
- Adopt `lean-context` workflow governance before adding product-specific
  behavior.
- Use a React/Vite browser UI backed by a small read-only localhost helper for
  Salad filesystem inspection and process status.
- Keep Salad-specific parser implementation paused until the local helper
  skeleton is introduced.
- Plan for a local web app that can read Salad logs and detect running Salad
  processes without requiring an AI agent.

## Current Risks

- The local helper is not implemented yet.
- Helper API path validation, response limits, and localhost binding must be
  implemented before reading real Salad data.
- Salad log formats and official Star Chef rules can change over time.

## Search Notes

- Use `docs/AI_SEARCH.md` before opening broad directories.
- Prefer slices over full files.
- Do not inspect ignored or generated paths unless directly needed.
