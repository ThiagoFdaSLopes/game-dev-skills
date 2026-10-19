# Installing the skills

Each skill is a folder with a `SKILL.md` and a `references/` folder. Any agent that supports the [Agent Skills](https://agentskills.io) format can use them. Always copy or link the **whole skill folder**: `SKILL.md` reads files from its own `references/`.

| Agent | Status | How |
| --- | --- | --- |
| Claude Code | tested | plugin marketplace (below) |
| OpenAI Codex | confirmation pending | `npx skills add` or manual copy (below) |
| Gemini CLI | not tested | `gemini skills install` or `.agents/skills/` |
| Cursor | not tested | `.agents/skills/` or `.cursor/skills/` |
| OpenCode, Copilot, others | not tested | `npx skills add ... -a <agent>` |

"Not tested" means nobody has confirmed it yet. If you try one, please open an issue with the result (the "Agent support" template), even when it just works.

## Claude Code

```
/plugin marketplace add ThiagoFdaSLopes/game-dev-skills
/plugin install game-dev-skills@game-dev-skills
```

From a shell: `claude plugin marketplace add ThiagoFdaSLopes/game-dev-skills` and `claude plugin install game-dev-skills@game-dev-skills`. Pin a release with `ThiagoFdaSLopes/game-dev-skills@v0.1.0`.

Update with `/plugin marketplace update game-dev-skills`. Skills are namespaced: `/game-dev-skills:game-plan`.

## OpenAI Codex

With the [skills CLI](https://github.com/vercel-labs/skills) (needs Node.js):

```
npx skills add ThiagoFdaSLopes/game-dev-skills -a codex        # this project: .agents/skills/
npx skills add ThiagoFdaSLopes/game-dev-skills -a codex -g     # every project: ~/.agents/skills/
npx skills add ThiagoFdaSLopes/game-dev-skills -a codex -s game-plan   # one skill only
```

Manual install:

```
git clone --depth 1 https://github.com/ThiagoFdaSLopes/game-dev-skills
mkdir -p ~/.agents/skills
cp -r game-dev-skills/skills/* ~/.agents/skills/
```

Restart Codex, then use `$game-plan` or describe the task.

## Gemini CLI (not tested)

```
gemini skills install https://github.com/ThiagoFdaSLopes/game-dev-skills --path skills --scope user
```

or copy `skills/*` into `~/.gemini/skills/` (or `~/.agents/skills/`).

## Cursor (not tested)

Copy `skills/*` into `.cursor/skills/` (project) or `~/.cursor/skills/` (user), or use `npx skills add ThiagoFdaSLopes/game-dev-skills -a cursor`.

## The project profile

Whatever the agent, add `.game-dev/project.md` to your game's repository to adapt the skills to your rules. See the [README](../README.md#adapt-it-to-your-project).
