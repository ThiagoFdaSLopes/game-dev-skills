---
name: game-plan
description: Plan a game or a game feature through dependency-ordered decisions - player promise, core loop, systems, architecture, production scope, risks - and end with a blueprint. Use for new games, new features, vague requirements, "X or Y" design choices, scope decisions, and when the user asks to plan, compare or decide before building. Planning-only - does not change code.
argument-hint: "[game idea or feature]"
---

# game-plan

Turn an idea into a small, defensible blueprint by asking only the decisions that matter, in the order their dependencies allow.

Read before starting:
- `references/principles.md`
- `references/project-profile.md`, then the project profile itself
- `references/question-format.md`
- `references/architecture-review.md`
- `references/risk-register.md`

## Process

1. **Investigate.** Start from the planning or design entry of `profile: Sources of truth`: the current milestone or goal, its completion criteria, the decisions due before it, the design and technical files of the system, and its pending items. Recorded decisions are inputs, not questions; pending items are the questions. List what is `verified` vs `assumed` in three lines at most.
2. **Build the decision graph.** Each decision gets a stable `Q-ID`, its prerequisites, options, recommendation, status (`ready / locked / deferred / blocked`), affected systems and descendants. Keep it internal; print it on `status`.
3. **Ask a round.** Up to three *ready* questions in the shared format; one or two for hard ones. Never a question in the same round as its unresolved prerequisite. Stop and wait.
4. **Apply the answers.** Update dependencies, architecture effects and risks. Print a checkpoint. Unlock the next questions.
5. **Repeat** until the decisions that gate the vertical slice are locked.
6. **Blueprint.** Present it and ask: *"Approve this blueprint for implementation, or reopen a question?"*
7. **Record.** Once approved, record every locked decision and every new risk where the project keeps them (`profile: Decisions`, `profile: Risks`; shapes in `references/architecture-review.md` and `references/risk-register.md`), following `profile: Workflow` for branches and pull requests. This touches docs only, never code. Only then hand off to `game-implement`, with the open assumptions listed; the blueprint plus the recorded decisions are its spec. A decision that exists only in the conversation is not decided.

## Layers (unlock by dependency, not fixed order)

- **L1 Player promise** - audience, fantasy, genre, pillars, session shape, platforms, controls, accessibility.
- **L2 Core loop** - verbs, goals, readable feedback, learning and reward, failure and retry, onboarding, the fun hypothesis.
- **L3 Connected systems** - combat, AI, progression, economy, levels/content, narrative, save, UI, multiplayer and network authority when relevant.
- **L4 Architecture and feel** - engine fit, modules, data flow, state ownership, input/camera/animation coupling, scene boundaries, serialization, asset pipeline, test seams.
- **L5 Production reality** - vertical slice, content cost, staffing, dependency order, platform budgets, milestones, launch risks.
- **L6 Player trust** (when relevant) - accessibility, privacy, fair monetisation, security, moderation.

Skip a layer that is irrelevant to the request. Do not force categories.

## Every recommendation must state

- why it fits *this* user's constraints
- its real cost or trade-off
- one concrete consequence for gameplay, architecture or scope

Run the shared architecture review before any L3/L4 recommendation. Escalate high-impact + uncertain choices to a gate question (see risk register). An unproven gate makes the recommendation *conditional*.

## Reopening

Reopen a locked decision only when the user asks (`back Q4`), evidence conflicts, or a prerequisite changed. Name every dependent decision that now needs a recheck. Never silently rewrite a lock.

## Blueprint

Plain markdown, short sections, in this order:

1. **Player promise** - audience, pillars, platform and controls, accessibility
2. **Core loop** - action -> system response -> feedback -> consequence -> repeat
3. **Decisions** - accepted routes with their IDs (drafts until recorded), major rejected options, rationale, reversibility, boundaries and data flow
4. **Vertical slice and backlog** - Now / Later / Cut, content implications, explicit exclusions, milestone order
5. **Top risks and experiments** - failure mode, evidence, impact, mitigation, cheapest test, stop/go criteria
6. **Implementation outline** - engine-specific modules/scenes/services, state ownership, interfaces, data/assets, save/network strategy, folder structure if justified
7. **Definition of done** - observable feel, usability, functionality, tests, the first-use path and what must hold when the slice changes what a new player sees first (`profile: First-use check`), *proposed* profiling targets (never measured ones)
8. **Verdict** - `Go / Conditional Go / No-Go`, with evidence and caveats; advisory, not a veto

## Never

- write code (plan only; recording approved decisions is part of planning)
- hand off decisions that are not recorded (or, when the user declined a decision log, not written in the blueprint)
- invent budgets, probabilities, benchmarks or playtest results
- show a dependent question before its prerequisite is locked
- treat a recommendation, silence or `defer` as acceptance
