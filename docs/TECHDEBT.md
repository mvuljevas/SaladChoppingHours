# Technical Debt

## TD-001: Concrete React Vite Template Adoption

Status: resolved.

Context:

- The local `AGENTS` repository recommends `templates/react-vite-spa/` for a
  React SPA, Vite, or PWA application.
- The concrete template now exists and has been adopted.

Impact:

- The project has a minimal React/Vite shell and uses `package.json` as the
  authoritative version source.

Resolution path:

- No further action required unless the upstream template changes in a way this
  project should adopt.

## TD-002: Filesystem Access Model Undecided

Status: resolved.

Context:

- A browser-only app cannot directly read `C:\ProgramData\Salad` without user
  file selection or a local bridge.

Impact:

- The app architecture is now defined as a React/Vite browser UI backed by a
  small read-only localhost helper.

Resolution path:

- Documented in `docs/ARCHITECTURE.md` and `docs/SECURITY.md`.

## TD-003: Star Chef Rule Source Needs Update Policy

Status: open.

Context:

- The current known threshold is 3000 minutes, approximately 50 hours, of
  Chopping per week.

Impact:

- Hardcoding the threshold without documenting source and update behavior can
  make the app stale if Salad changes the rule.

Resolution path:

- Store the threshold in a clearly named configuration constant and document
  the official source checked during implementation.

## TD-004: Local Helper Not Implemented

Status: open.

Context:

- The selected architecture depends on a read-only localhost helper for Salad
  filesystem inspection and process status.

Impact:

- The browser UI cannot automatically inspect Salad data until the helper
  exists.

Resolution path:

- Add a narrow helper skeleton with health, status, and bounded log metadata
  endpoints before implementing parser behavior against real data.
