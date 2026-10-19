# Project profile

<!--
Copy this file to `.game-dev/project.md` at the root of your game's repository
and fill in what applies. Delete sections you do not need: every missing section
falls back to a sensible default (see shared/project-profile.md in the suite).

Keep it short and factual. The skills read it at the start of every task, so a
wrong line here misleads every task. Your CLAUDE.md / AGENTS.md still wins over
this file when they disagree.
-->

Engine: <Godot 4.x | Unity 6 | Unreal 5.x | custom>
Languages: <GDScript, C#, C++, ...>
Platforms: <PC, web, Android, consoles, dedicated server, ...>

## Sources of truth

<!-- Where decisions live, and what to read first for each stage. -->

- Design: `docs/design/` (one file per system)
- Technical: `docs/architecture/`
- Roadmap and milestones: `docs/roadmap.md` (each milestone has its completion criteria)
- Read first, by stage:
  - Planning / design: `docs/roadmap.md`, then the system's design file
  - Implementation: the system's design and technical files
  - Test: the milestone's completion criteria
  - Review: `CONTRIBUTING.md` and the technical file of the system
- Decision IDs: `D12` (or your own scheme, e.g. P for product, T for technical)
- Statuses: `decided`, `recommended`, `pending`

## Decisions

<!-- How an approved decision is written down. -->

- Record each decision in `docs/decisions/NNNN-title.md` with the next free number.
- Pending items are listed under "Pending" in each design file. A pending item is always a question for the user, never a default.

## Risks

- Register: `docs/roadmap.md`, section "Risks", IDs `R1`, `R2`... (never reused).

## Questions

- Question IDs are per session: `Q1`, `Q2`... Answers are recorded as `Q2:B (2026-10-19)`.

## Workflow

- Branch per task: `feat/short-name`, `fix/short-name`. Never commit to `main`.
- Commits: Conventional Commits in English (`feat(combat): add parry window`).
- The agent pushes the branch and opens the PR with `Closes #N`; merging and approving stay with me.

## Checks

<!-- Exact commands. Mark slow ones and what they need. -->

- Unit tests: `<command>`
- Headless / play-mode tests: `<command>`
- Type or parse check: `<command>`
- Lint: `<command>`
- Build or export (slow, only when build settings change): `<command>`

## Time in tests

- Game rules take time as a parameter and are tested with simulated time and seeded random.
- Real-time on purpose (keep real-time checks): <none, or list them>

## Conventions

- <naming, folder layout, comment language, logging, architecture rules a review must enforce>

## Context budget

- Reviews of more than a few files and long logs go to a subagent.
