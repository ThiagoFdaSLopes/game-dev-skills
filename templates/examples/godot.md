# Project profile

Engine: Godot 4.5
Languages: GDScript
Platforms: PC, web

## Sources of truth

- Game design document: `docs/gdd.md`
- Decisions: `docs/decisions/` (ADR files, `NNNN-title.md`)
- Read first, by stage: planning reads `docs/gdd.md`; implementation reads the ADRs the ticket cites

## Workflow

- Branch per task (`feat/...`, `fix/...`); Conventional Commits in English.
- The agent commits and opens the PR; merging stays with me.

## Checks

- Unit tests (GUT): `godot --headless -s addons/gut/gut_cmdln.gd -gdir=res://test -gexit`
- Parse check of one script: `godot --headless --path . --script res://path/script.gd --check-only`
- A script run that fails to compile does not exit: always wrap `--script` runs in `timeout`.
- Web export (slow, only when export settings change): `godot --headless --export-release web build/web/index.html`

## Conventions

- Static typing everywhere; `snake_case` files, `PascalCase` classes.
- Game rules live in `core/` as `RefCounted` classes with no scene nodes, so they test without the engine loop.
- Signals are connected in code, in the scene's root script.
