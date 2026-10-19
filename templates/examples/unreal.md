# Project profile

Engine: Unreal Engine 5.6
Languages: C++, Blueprints
Platforms: PC, consoles

## Sources of truth

- Design: Confluence export in `Docs/Design/`; technical decisions in `Docs/TDD/`

## Workflow

- Perforce or Git LFS for binary assets; agents never check in `.uasset` changes they cannot diff.
- Branch per task; Conventional Commits in English; the agent commits, I open the PR.

## Checks

- Build: `RunUAT BuildCookRun -project=Game.uproject -noP4 -build -skipcook`
- Automation tests (slow): `UnrealEditor-Cmd Game.uproject -ExecCmds="Automation RunTests Game.; Quit" -unattended -nullrhi`

## Conventions

- Gameplay logic in C++; Blueprints only for content wiring and tuning.
- Gameplay Ability System for abilities; no ability logic in the Character class.
