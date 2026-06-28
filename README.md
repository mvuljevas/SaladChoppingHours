# SaladChoppingHours

SaladChoppingHours is a local React/Vite web application for reading a Salad
installation directory, detecting whether Salad is active, and calculating
weekly Chopping time toward Star Chef qualification.

## Current State

This repository has been aligned with the `react-vite-spa` template from the
local `AGENTS` repository and uses the `lean-context` workflow preset.

The application shell exists. The selected architecture is a React/Vite browser
UI backed by a small read-only localhost helper for Salad file inspection and
process status. Salad-specific parsing and runtime detection have not been
implemented yet.

## Requirements

- Node.js 22 or newer.
- npm 11 or newer.

## Install

```bash
npm install
```

## Development

```bash
npm run dev
```

## Verification

```bash
npm run build
```

## Planned Product Scope

- Read Salad logs and configuration from the local installation directory.
- Detect whether Salad and its workload service are currently running.
- Reconstruct Chopping intervals from local Salad status events.
- Compare totals against the official Star Chef threshold.
- Present results in a local web interface without requiring an AI agent.

## Recommended Starting Point

- Template: `react-vite-spa`.
- App stack: React + Vite.
- Preset: `lean-context`.

The source `AGENTS` repository now contains the concrete
`templates/react-vite-spa/` directory, and this repository has adopted it.

## Version

The authoritative version source is `package.json`.

## Documentation Map

- [Agent rules](AGENTS.md)
- [AI Context](docs/AI_CONTEXT.md)
- [AI Search](docs/AI_SEARCH.md)
- [AI Token Budget](docs/AI_TOKEN_BUDGET.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Conventions](docs/CONVENTIONS.md)
- [Naming](docs/NAMING.md)
- [Workflows](docs/WORKFLOWS.md)
- [Roadmap](docs/ROADMAP.md)
- [Security](docs/SECURITY.md)
- [Technical Debt](docs/TECHDEBT.md)
- [Snapshots](docs/SNAPSHOTS.md)
