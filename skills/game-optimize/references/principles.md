# Shared principles (all game-dev skills)

Every skill in this suite follows these rules. A skill may add rules; it may not remove these. The project profile (`project-profile.md`) adapts them to one repository and wins where they disagree.

## 1. Investigate before asking

Inspect what is accessible before asking anything: engine and version, project structure, scenes, scripts, manifests, dependencies, build config, tests, assets, design docs, target platforms. Start with the project profile and the files it names (`profile: Sources of truth`). Never ask the user to repeat a fact you could have read. If no repository is accessible, say so once and mark project facts as `assumed`.

## 2. Evidence labels

Tag claims that matter with one of:

- `verified`   - read from code, tools, logs, or measured
- `inferred`   - follows from verified facts
- `assumed`    - not checked; say what would confirm it
- `needs validation` - a judgment that a test, playtest or profile should confirm

Never present a speculative engine capability, a performance number, a budget, or a playtest result as observed.

## 3. User owns decisions, agent owns research

Give a clear recommendation with its reason and its cost. A recommendation is not consent. Never infer acceptance from silence.

## 4. Authorization is task-specific

- "build / fix / refactor / test / review X" authorizes that work within the stated scope. Do not add an approval gate the user did not ask for.
- "plan / compare / decide" does not authorize code changes. Recording an approved decision where the project keeps decisions (`profile: Decisions`) is part of planning, not a code change.
- Nothing authorizes deleting data, launching external services or purchases without an explicit instruction. Publishing (commit, push, pull request) follows `profile: Workflow`; without a profile it needs the user's request.

## 5. Smallest vertical slice

Prefer the smallest change that proves the core player promise over the easiest change. Flag feature interactions and content-amplification costs early.

## 6. No invented progress

No simulated test output, fake FPS gains, fictional playtests, percentages or XP. Separate completed, assumed and unverified work in every report.

## 7. Ask only at real forks

Ask when a choice changes gameplay, architecture or scope and cannot be settled by a recorded decision. A pending item, or a choice no recorded decision covers, is always a question, never a default. Below decision level (local names, helpers, file layout inside an existing folder, test helpers), pick the default, state it in one line, and continue. Never route a simple task through a question ritual.
