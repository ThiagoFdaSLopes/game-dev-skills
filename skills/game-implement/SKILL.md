---
name: game-implement
description: 'Implement a game feature, system or change from a blueprint, ticket, spec or plain request - pick the test seams, build it test-first in vertical slices, run the checks as you go, review the diff, and hand it off committed or ready to commit. Use when the user asks to implement, add, build, wire up, change or refactor gameplay, systems, UI, tooling or engine code (Unity, Godot, Unreal, custom), or says "implement the blueprint / ticket #N". Asks only at forks that block correctness or touch a pending decision.'
argument-hint: "[blueprint, ticket, spec or feature to implement]"
---

# game-implement

Take a piece of work with a defined scope, build the smallest version that proves it, prove it with tests you ran, and leave it reviewed.

Read before starting: `references/principles.md`, `references/project-profile.md` and the project profile itself, `references/question-format.md`, and the implementation entry of `profile: Sources of truth`. Run `references/architecture-review.md` silently for anything that adds a system or crosses a boundary.

## Input

The work arrives in one of these forms. Name which one in the first line.

- **Blueprint** from `game-plan` - use its *Implementation outline* and *Definition of done* as the spec; its *Vertical slice* section bounds the scope. Build only on recorded decisions. Open assumptions listed at handoff stay `assumed`: a test can settle a fact, but a design choice is settled only by the user and recorded.
- **Ticket / issue** - fetch it from the tracker if one is configured, state its title, and treat its acceptance criteria as the spec. If the reference is ambiguous, ask.
- **Spec or design doc** in the repo - read it in full before touching code.
- **Plain request** - derive 2-5 observable acceptance criteria yourself ("double-tap within 0.15s triggers dash; no dash while stunned"). Mark any you had to assume.

No input of any kind that defines a done state means the task belongs to `game-plan` first. Say so in one line and switch.

## Process

0. **Branch** - follow `profile: Workflow`. When the profile says work lives on its own branch and the current branch is the default one, create the work branch before touching anything.

1. **Inspect** - engine and version, the files the work touches, conventions already in use (naming, folders, how input/state/events/save are done), how tests run here and which checks cover the area (`profile: Checks`). Read the design and technical files of the system and note every decision and every pending item the work touches. Everything here is `verified` or it is not stated.

2. **Seams** - list the public boundaries the work will be tested at, one line each with what it catches and what it misses. Tests go at these seams and nowhere else - never at internals. Typical layers: a pure rule (unit), systems talking to each other (integration), the engine loop (headless or play-mode scene), a network or backend path.
   - Pick the set that follows the existing checks for the same system, state it in the status line, and continue. Several candidate seams are not a reason to stop.
   - Ask *one* question in the shared format only when the choice of seam changes the architecture (a new boundary, a new module, a test hook in production code).
   - No test setup that covers the area and the engine cannot run headless here: say so, pick the manual checks you will do instead, and continue.

3. **Fork check** - a choice that touches a pending item, or one no recorded decision covers, is a question: ask it in the shared format, stop, and record the answer (`profile: Decisions`) before building on it. Never settle it with a default. Below decision level (local names, helpers, file layout inside an existing folder), take the default, state it in one line, continue. Facts readable from the repo are never questions.

4. **Build in slices** - one seam, one failing test, the smallest implementation that passes it, repeat. Each slice is a tracer bullet that answers to what the last one taught you.
   - Red before green: watch the test fail for the right reason before writing the code.
   - Do not write all tests first and all code after. Do not anticipate the next slice.
   - Game-rule tests are deterministic: simulated time passed as a parameter, seeded random, no reliance on frame count. Behaviour the project defines in real time keeps its real-time checks (`profile: Time in tests`). Pure rules (growth, state machines, economy math) get unit checks; engine-loop behaviour (physics, input, prediction) gets headless scene runs or integration checks.
   - Reuse existing patterns. No speculative abstractions, no new frameworks, no drive-by refactors; a refactor you want belongs in the review step, not in the loop.
   - For the detailed rules on what a good game test is and which layer to pick, follow the `game-test` skill, steps 1-3.

5. **Check as you go** - after every slice, run the fast checks (parse or type check, the single test you are working in) from `profile: Checks`, with a timeout when a run can hang. Paste real output only. A failure that is not the one you expected moves the work to `game-debug`; say so in one line, fix it there, come back.

6. **Finish** - run every check that covers the change, once, including the slow ones the profile lists for this kind of change (network, backend, exports). Name each check not run and why. When the change alters what a new player sees in the first minutes, run the first-use step of `game-test` (step 5) against the finished build; when it cannot run here, it is a named gap in Open risks and in the PR body. Then compare the result against the acceptance criteria line by line: met, partially met, not met.

7. **Review** - hand the diff to `game-review` (read-only, against the fixed point where this work started), in a subagent when the runtime offers one, so only the findings come back. Fix `HIGH` and `MED` findings in this same task; list `LOW` ones in Open risks unless trivial. This is where refactoring happens, with the tests as the net.

8. **Commit and PR** - follow `profile: Workflow`: commit convention, whether to push and open the pull request, what the PR body must contain. One commit per coherent slice, or one for the whole feature when slices are small. Without a profile, do not commit or push unless the user asked; leave the change ready and say so. Never merge, approve, close a PR or delete a branch.

9. **Report** in the closing format.

## Status line

Use the shared status header for multi-file or multi-slice work, not for tiny fixes:

```
IMPLEMENT  dash ability  (blueprint: first-playable, slice 2)
Goal:  double-tap dash on the existing PlayerController
Seams: PlayerInput -> DashState (unit); dash in play-mode arena
Path:  branch -> inspect -> seams -> slice 1 trigger -> slice 2 cooldown -> checks -> review -> commit
Risk:  overlaps with coyote-time window  [needs validation]
```

## Closing

```
Result:        files changed + behaviour added, one line each
Criteria:      each acceptance line -> met / partial / not met
Verification:  commands run and what they showed (or "nothing runnable here")
First use:     run recorded in the profile, or "not run: <reason>", or "not affected"
Review:        findings fixed / deferred
Commit:        branch, hash + message, or "not committed: <reason>"
PR:            URL and linked issue, or "not opened: <reason>"
Open risks:    assumptions, untested paths, interactions to watch
```

A material architectural choice made during the work is a decision: record it by `references/architecture-review.md` ("Decision record") after the user approves it.

## Switch

- A failing test or crash you did not expect: `implement -> debug`, fix the root cause, return.
- A fork that reopens a planning decision: answer it via one `game-plan` question, record the change, then resume; never silently rewrite a recorded decision.
- A performance concern found mid-work is an open risk, not something to optimise now; `game-optimize` needs a baseline first.

## Never

- gate a clearly requested change behind an approval prompt
- ask about facts readable from the repo or the ticket
- test internals when a behaviour test exists
- settle a pending item with a default, in code or in a test
- commit to the default branch when the workflow says work lives on its own branch
- merge, approve, close a PR or delete a branch
- show test, typecheck or build output that did not come from a tool run
- call a criterion met when the test that would prove it was not run
- launch services, delete data or spend money without an explicit instruction
