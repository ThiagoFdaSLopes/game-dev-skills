# Project profile (how every skill adapts to a repository)

The suite is generic. What is specific to one game - where decisions are written, how tests run, how work reaches the main branch - lives in a **project profile**: a Markdown file kept in the user's repository.

## Finding it

1. Look for `.game-dev/project.md` at the repository root.
2. If it is missing, check the agent instruction files (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, `.cursor/rules/`) for a section that plays the same role.
3. If neither exists, use the defaults below, say once that no profile was found, and mention that `templates/project.md` of this suite is the starting point for one. Never block on a missing profile.

## Precedence

User instructions in the conversation > the user's and the repo's agent instruction files > the project profile > the shared files of this suite > a skill's own text. When a lower layer disagrees with a higher one, the higher one wins; when the profile disagrees with the repo's instruction files, say so in one line so the user can fix the profile.

## Sections

The profile uses these headings. Skills refer to them by name (`profile: Checks`). Any section may be missing; a missing section falls back to its default.

### Sources of truth

Where design and technical decisions live (a design doc, an ADR folder, a wiki export), which file to read first for each stage (planning, design, implementation, test, review), and how decisions are identified (ID scheme) and classified (statuses such as `decided`, `recommended`, `pending`).

*Default:* look for `docs/`, `design/`, `adr/`, `docs/decisions/`, a GDD, the README and open issues. What is not written down anywhere is not decided.

### Decisions

How an approved decision is recorded: file, ID allocation, required fields, index or changelog to update. Which items are pending, and where pending items are listed.

*Default:* if the repo already has an ADR folder or decision log, follow its format. If not, propose `docs/decisions/NNNN-short-title.md` (one file per decision, the shape in `architecture-review.md`) and ask once before creating the folder; if the user declines, the decisions stay in the blueprint the skill produced.

### Risks

Where the risk register lives and how risk IDs are allocated.

*Default:* follow an existing register; otherwise risks stay in the blueprint or the closing report as `risk draft` entries, numbered `R1`, `R2`... within the session.

### Questions

How question IDs are scoped (per session, per milestone, per issue) and how answers are recorded.

*Default:* `Q1`, `Q2`... within the session; answers recorded as `Q2:B` with the date.

### Workflow

Branch naming, commit message convention and language, whether the agent commits, pushes and opens pull requests as part of the task, what must be in a PR body (linked issue, checklist, changelog fragment), and what stays with the user (merge, approval, closing, deleting branches).

*Default:* match the conventions visible in `git log` and the repo's contributing guide. Do not commit, push or open a pull request unless the user asks. When asked to commit while on the default branch, create a work branch first. Merging, approving, closing pull requests and deleting branches always stay with the user.

### Checks

The commands that verify the project: unit and integration tests, headless or play-mode runs, parse/type checks, linters, builds and exports, and which of them need extra services (a server, a database, a device). Note which ones are slow.

*Default:* discover them from the repo: package scripts, CI workflows, `Makefile`/`justfile`, test folders, engine test frameworks (Godot GUT or gdUnit4, Unity Test Framework, Unreal Automation, Bevy/cargo tests). A check you could not find is a named gap, not a pass.

### Time in tests

Which behaviour is defined in simulated time (rules tested with time passed as a parameter) and which is defined in real time on purpose and must keep real-time checks.

*Default:* game rules take time as a parameter and are tested with simulated time and seeded random; nothing relies on frame count.

### Conventions

Code style, naming, comment language, architecture rules (server authority, folder layout, logging), and anything a review must enforce.

*Default:* follow the conventions already used in the files being touched.

### Context budget

Limits on session size, and which work goes to a subagent.

*Default:* large reads (reviews of many files, sweeps, long logs) go to a subagent that returns only the conclusion, when the runtime offers subagents.
