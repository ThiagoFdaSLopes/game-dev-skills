# Game Dev Skills

[Português (Brasil)](README.pt-BR.md)

Engine-agnostic [Agent Skills](https://agentskills.io) for game development. They turn a coding agent into a game design co-director, technical architect and risk reviewer that plans before it builds, tests what it claims, and never invents a benchmark or a playtest.

Works with Godot, Unity, Unreal, Bevy or a custom engine. Tested with **Claude Code**; **OpenAI Codex** support is built in and its confirmation is pending.

## The skills

| Skill | Use it to |
| --- | --- |
| `game-dev-questline` | Route a game request to the right skill when it is not obvious which one applies |
| `game-plan` | Plan a game or feature through dependency-ordered decisions, ending in a blueprint. Never writes code |
| `game-implement` | Build a feature test-first in vertical slices, run the checks, review the diff |
| `game-debug` | Find the root cause of a bug, crash or desync and fix it with regression coverage |
| `game-review` | Review code, a PR or an architecture; findings ranked by severity with file locations. Read-only |
| `game-test` | Choose and write unit, integration, play-mode or playtest checks, and report observed vs unverified |
| `game-optimize` | Measure first, change one bottleneck, compare before and after |

They share a set of rules (in each skill's `references/` folder): evidence labels (`verified`, `inferred`, `assumed`), a terminal-friendly question format with lettered options, an architecture checklist and a risk register.

## Install

### Claude Code

```
/plugin marketplace add ThiagoFdaSLopes/game-dev-skills
/plugin install game-dev-skills@game-dev-skills
```

Skills are then available as `/game-dev-skills:game-plan`, `/game-dev-skills:game-implement` and so on, and Claude also picks them up on its own when a request matches.

### OpenAI Codex

```
npx skills add ThiagoFdaSLopes/game-dev-skills -a codex
```

This copies the skills to `.agents/skills/` in the current project (add `-g` for every project). Invoke one with `$game-plan`, or just describe the task.

### Other agents

Gemini CLI, Cursor, OpenCode, GitHub Copilot and others read the same `SKILL.md` format, but they are **not tested yet**. See [docs/install.md](docs/install.md) for manual installs, and open an issue with what worked for you.

## Adapt it to your project

Out of the box the skills discover things from your repository: engine, tests, CI, docs, git conventions. To make them follow *your* rules, add a **project profile**:

1. Copy [`templates/project.md`](templates/project.md) to `.game-dev/project.md` in your game's repository.
2. Fill in what applies and delete the rest: where your design decisions live, the exact commands that run your tests, your branch and commit conventions, whether the agent may commit and open PRs.
3. Commit it. Every skill reads it at the start of a task.

Examples for [Godot](templates/examples/godot.md), [Unity](templates/examples/unity.md) and [Unreal](templates/examples/unreal.md). The full list of sections and their defaults is in [`shared/project-profile.md`](shared/project-profile.md).

Your `CLAUDE.md` / `AGENTS.md` always wins over the profile, and the profile wins over the generic rules.

## Safety defaults

- Planning never changes code.
- Without a profile that says otherwise, the agent does not commit, push or open pull requests unless you ask.
- Merging, approving, closing PRs and deleting branches always stay with you.
- No fabricated test output, FPS numbers or playtest results; unverified work is labelled as such.

## Contributing

Issues and pull requests are welcome: bug reports ("the skill did X, I expected Y"), new engine examples, support for more agents, new skills. Read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## License

[MIT](LICENSE)
