# Contributing

Thanks for helping. Issues and pull requests in English or Portuguese are welcome.

## Ways to help

- **Report a skill misbehaving.** Use the "Skill behaviour" issue template: what you asked, what the agent did, what you expected, the agent and model. A transcript excerpt helps more than a summary.
- **Confirm agent support.** Tried the skills in Gemini CLI, Cursor, OpenCode or another agent? Open an "Agent support" issue with what worked and what did not.
- **Add an engine example** in `templates/examples/` (a filled-in project profile for an engine or a common setup).
- **Improve a skill** or **propose a new one** (open an issue first for a new skill, so we can agree on its scope).

## Repository layout

```
skills/<name>/SKILL.md        the skill itself
skills/<name>/references/     GENERATED copies of shared/ - do not edit
shared/                       the rules every skill reads (edit these)
templates/                    project profile template and examples
scripts/                      sync and validation
.claude-plugin/               Claude Code plugin and marketplace manifests
```

## Rules for skill text

- **Engine-agnostic.** No engine, project or tool is assumed. Engine-specific advice is an example, never a requirement. Project-specific behaviour belongs in the user's project profile, so add a profile section (in `shared/project-profile.md` and `templates/project.md`) instead of hard-coding it.
- **The description triggers the skill.** It says what the skill does and when to use it, with the words a user would actually type. Keep it under 1024 characters.
- **Keep the safety rules.** A skill may add rules to `shared/principles.md`, never remove them: no invented results, plan-only skills never edit code, publishing follows the profile, merging stays with the user.
- **Short and terminal-friendly.** Plain Markdown, no emoji, `SKILL.md` well under 500 lines.
- **Self-contained.** A skill only references files inside its own folder (`references/...`). Never `../`: per-skill installers copy one folder.
- English for all skill and shared text.

## Local workflow

Needs Node.js 20+.

```
npm run sync     # copy shared/ into every skills/*/references/
npm run check    # fail if the copies are stale, or a skill/manifest is invalid
```

Try your change in Claude Code without installing:

```
claude --plugin-dir .
```

(`/reload-plugins` picks up edits during the session.) For Codex, copy the skill folder into `.agents/skills/` of a test project.

## Pull requests

- One topic per PR, on its own branch.
- PR titles and commit messages follow [Conventional Commits](https://www.conventionalcommits.org): `feat(game-plan): ...`, `fix(shared): ...`, `docs: ...`. The PR title becomes the squash commit and drives the release version (`feat` = minor, `fix` = patch, `!` = major).
- Run `npm run check` and commit the synced `references/`.
- Describe how you tested it: which agent, which prompt, what the skill did.

Releases are automated: merging to `main` updates a release PR with the changelog, and merging that PR tags the version and publishes the GitHub Release.

By contributing you agree that your contribution is licensed under the MIT License, and you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
