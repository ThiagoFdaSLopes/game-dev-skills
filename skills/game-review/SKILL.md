---
name: game-review
description: Review game code, a PR/diff, a system design or an architecture for bugs, unsafe assumptions, regressions, coupling and test gaps, ranked by severity with file locations. Use when the user says review, audit, "look over", "is this ok", or shares a PR. Read-only - never edits unless explicitly asked.
argument-hint: "[file, PR, system, or diff to review]"
---

# game-review

Read the real code. Rank what matters. Cite where it is. Change nothing.

Read before starting: `references/principles.md`, `references/project-profile.md` and the project profile itself, `references/architecture-review.md`, `references/risk-register.md`, and the review entry of `profile: Sources of truth`.

## Process

1. **Scope** - what exactly is under review (files, diff range, system). State it in one line. Read the actual code, not a summary of it. A review larger than a few files runs in a subagent that reads the code and returns only the findings, when the runtime offers one (`profile: Context budget`).
2. **Context** - engine, patterns the rest of the project uses, tests that exist, platforms targeted, and the design and technical files of the systems touched. A finding that contradicts the project's own conventions or a recorded decision is weighted higher than one that contradicts generic advice.
3. **Decisions** - look up every decision cited in the changed code, comments and PR and confirm the code follows it. Flag code that drifts from a recorded decision, and code that settles an item still pending or a choice no recorded decision covers. Both are findings, at least `MED`.
4. **Find** - in priority order: correctness bugs, unsafe assumptions, regressions, gameplay-feel regressions (timing, input, determinism), authority and trust in client data (in networked games), coupling and ownership problems, performance traps on the target platform, save/serialization risks, missing test seams, a change to what a new player sees in the first minutes with neither a first-use run on the changed build nor a named gap for it (`profile: First-use check`), and the rules in `profile: Conventions`.
5. **Rank** - each finding gets a severity and an evidence label.
6. **Report** findings first, summary last.

## Finding format

```
[HIGH]  PlayerController.cs:142  verified
Jump force is multiplied by Time.deltaTime inside FixedUpdate,
so jump height changes with the physics tick rate.
Impact:  different feel on 30 vs 60 Hz physics; breaks replays.
Fix:     remove deltaTime; use an impulse, or scale by fixedDeltaTime once.
```

Severity: `HIGH` (bug, data loss, security, blocks shipping), `MED` (likely bug or significant maintainability/perf cost), `LOW` (nit, style, minor coupling). Group `LOW` items together; do not pad.

## Design/architecture review

Walk the five points of the shared architecture review and report only the ones with a concrete problem. Add a gate question (shared risk format) when a high-impact uncertainty needs the user's call, not your edit.

## Closing

```
Summary:   two or three lines - overall state, biggest risk, is it mergeable
Verified:  what was read/run     Not checked: what was out of reach
```

## Never

- edit files during a review; if asked to fix, say "switching to game-implement" and proceed within that request
- report conjecture as a verified finding
- summarise before listing findings
