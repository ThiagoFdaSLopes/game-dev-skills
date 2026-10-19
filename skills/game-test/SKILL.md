---
name: game-test
description: Verify game behaviour - choose and write unit, integration, play-mode or manual/playtest checks for a feature, run what the environment allows, and report observed vs unverified results. Use when the user asks to test, add tests, verify, check a milestone's completion criteria, or write a playtest plan. Performance baselines belong to game-optimize.
argument-hint: "[feature or system to test]"
---

# game-test

Pick the cheapest test that would catch the real failure, run it if you can, and never blur observed with assumed.

Read before starting: `references/principles.md`, `references/project-profile.md` and the project profile itself, `references/question-format.md`, and the test entry of `profile: Sources of truth`.

## Process

0. **Target** - when the work belongs to a milestone or a ticket, start from its completion criteria and from the limits and metrics in the technical docs. Each criterion becomes a behaviour to check, or a named gap. When the work changes what a new player sees first, the first-use path (`profile: First-use check`) is part of the target: run it in the real build if the tools here allow it (browser automation, screenshots), otherwise hand it to the user as a checklist.
1. **Behaviour** - state the behaviour under test and its edge cases: failure paths, state transitions, serialization round-trips, input edge cases (held, repeated, simultaneous), platform cases (frame rate, resolution, controller vs keyboard), and netcode cases (latency, loss, authority) when relevant.
2. **Pick the layer** - from the project's existing checks (`verified`; `profile: Checks`), not from preference:
   - *unit* for pure rules (damage formulas, state machines, economy math)
   - *integration* for systems talking to each other (save/load, spawner + encounter data)
   - *play-mode / headless scene* for things that need the engine loop (physics, animation events, input)
   - *manual / playtest* for feel, readability and fun - give an observation checklist, not opinions
3. **Write** tests in the project's conventions: same framework, folder, naming and exit behaviour as the existing checks, and register the new check wherever the project lists its commands. Keep each check to one behaviour. Rule checks use simulated time and seeded random; behaviour the project defines in real time keeps its real-time checks (`profile: Time in tests`).
4. **Run** what can run here, with a timeout when a run can hang. Paste the exact command and the real output. A check that needs a service, a device or a credential you do not have is a named gap, not a pass.
5. **Report** gaps honestly.

## Playtest plan format

```
Playtest  enemy readability
Goal:      do players see the attack coming?
Setup:     greybox arena, 3 enemy types, 3 players new to the build
Observe:   deaths the player calls "unfair"; time-to-first-dodge per enemy
Stop/Go:   go if <= 1 unfair death per 5 min; otherwise rework telegraphs
```

## Closing

```
Tests:         added/changed files, one line each
Commands:      exactly what was run
Results:       pass/fail counts and notable output, or "could not run: <reason>"
First use:     date, person or agent + exact model, tools, pass/fail and what was seen; or "not run: <reason>"
Gaps:          behaviours still untested; checks that need a device/engine/person
```

## Never

- show test output that did not come from a tool run
- call a playtest done when it was only planned
- call the first-use check passed because the state tests pass
- test the implementation's internals when a behaviour test exists
