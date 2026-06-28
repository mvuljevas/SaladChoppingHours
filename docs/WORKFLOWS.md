# Workflows

This document defines shared workflows for this project.

## Starting a Session

When the user asks the agent to analyze the repository, the agent should:

1. Read project governance documents.
2. Inspect the repository tree.
3. Inspect git branch and working tree state.
4. Identify stack, commands, and documentation structure.
5. Summarize the current state.
6. Ask what to work on next.

If the project already contains code, preserve existing conventions unless the
user explicitly asks to replace them.

## Work Blocks

Use small blocks with a clear outcome.

Each block should close with:

- What changed.
- Main files touched.
- Verification performed.
- Risks or debt detected.
- Documentation updated.
- Snapshot updated when state changed.
- Version file updated when the iteration changes project state.
- Next logical step.

## Documentation Workflow

Update `README.md` when:

- Setup commands change.
- Usage changes.
- Project scope changes.
- Documentation links change.

Update `docs/ROADMAP.md` when:

- Product direction changes.
- Milestones are completed.
- Priorities shift.

Update `docs/TECHDEBT.md` when:

- A shortcut is accepted.
- A risk is discovered.
- Debt changes status.
- Debt is resolved.

Update `docs/SNAPSHOTS.md` when:

- The project reaches a new meaningful state.
- A decision needs to survive context loss.
- A block completes with structural, product, workflow, or release impact.

## Git Workflow

Default branch flow:

```text
feature/* -> develop -> staging -> main
```

For this early documentation-only phase, the repository may continue on `main`
until the user chooses a branch model.

Rules:

- Create focused branches for implementation work.
- Keep branch names descriptive and neutral.
- Do not push without explicit approval.
- Do not push tags without explicit approval.
- Do not mix unrelated refactors with feature work.

## Versioning Workflow

Use Semantic Versioning for meaningful iterations.

Version format:

```text
X.Y.Z
```

Tag format:

```text
vX.Y.Z
```

Current authoritative version file:

```text
package.json
```

Keep `package.json.version` synchronized with the matching tag.

## Product Workflow

Before implementation, confirm:

- Local app stack.
- Filesystem access model for `C:\ProgramData\Salad`.
- Whether the app should run fully local, as a browser UI with backend, or as a
  packaged desktop-like web app.
- Star Chef threshold source and update policy.
- Test strategy for sample logs without committing private local logs.
