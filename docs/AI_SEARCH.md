# AI Search

Use this file to locate the smallest useful context before opening files.

## General Search Rules

- Prefer `rg` over recursive `grep`.
- Search before opening files.
- Use `rg --files` to discover file paths.
- Use small slices after locating a target.
- Avoid dependency folders, generated files, build outputs, caches, lockfiles,
  local Salad logs copied into the repo, and secrets.

## Repository Search

```powershell
rg --files
rg "Salad|Chopping|Star Chef|workflow|lean-context" README.md AGENTS.md docs
rg "Versioning|vX.Y.Z|package.json" README.md AGENTS.md docs package.json
rg "Roadmap|MVP|Risk|Technical Debt" docs
```

## App Search

```powershell
rg --files src public
rg "createRoot|BrowserRouter|Routes|Route" src
rg "useState|useEffect|useMemo|useCallback" src
rg "fetch\\(|axios|queryClient|useQuery" src
rg "serviceWorker|manifest|workbox" src public
rg "describe\\(|it\\(|test\\(" src tests
rg "Star Chef|Chopping|Salad|started|stopped|Matrix" src docs
```

## Documentation Checks

```powershell
rg -n "\[[^\]]+\]\(([^)]+)\)" README.md docs AGENTS.md
git diff --check
```

## Version Checks

```powershell
node -p "require('./package.json').version"
git tag --list "v$(node -p \"require('./package.json').version\")"
git log --oneline --decorate -n 5
```
