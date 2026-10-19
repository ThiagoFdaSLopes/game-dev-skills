# Project profile

Engine: Unity 6 (6000.0 LTS)
Languages: C#
Platforms: PC, Android

## Sources of truth

- Design: `Docs/Design/` (one page per system); decisions: `Docs/Decisions/`
- Milestones and their completion criteria: GitHub milestones

## Workflow

- Branch per task; Conventional Commits in English.
- The agent commits; I push and open the PR.

## Checks

- EditMode tests: `Unity -batchmode -projectPath . -runTests -testPlatform EditMode -testResults results-edit.xml -quit`
- PlayMode tests (slow): `Unity -batchmode -projectPath . -runTests -testPlatform PlayMode -testResults results-play.xml -quit`
- The editor must be closed for batchmode runs on the same project.

## Time in tests

- Gameplay rules take `deltaTime` / timestamps as parameters; tests never use `Time.time` directly.

## Conventions

- Assembly definitions per feature folder; tests in a sibling `Tests` assembly.
- No `FindObjectOfType` in gameplay code; dependencies are serialized references.
