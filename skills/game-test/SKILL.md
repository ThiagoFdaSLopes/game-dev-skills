---
name: game-test
description: Verify game behaviour - choose and write unit, integration, play-mode or manual/playtest checks for a feature, run what the environment allows, and report observed vs unverified results. Use when the user asks to test, add tests, verify, check a milestone's completion criteria, or write a playtest plan. Performance baselines belong to game-optimize.
argument-hint: "[feature or system to test]"
---

# game-test

Pick the cheapest test that would catch the real failure, run it if you can, and never blur observed with assumed.

Read before starting: `references/principles.md`, `references/project-profile.md` and the project profile itself, `references/question-format.md`, and the test entry of `profile: Sources of truth`.

## Process

0. **Target** - when the work belongs to a milestone or a ticket, start from its completion criteria and from the limits and metrics in the technical docs. Each criterion becomes a behaviour to check, or a named gap.
1. **Behaviour** - state the behaviour under test and its edge cases: failure paths, state transitions, serialization round-trips, input edge cases (held, repeated, simultaneous), platform cases (frame rate, resolution, controller vs keyboard), and netcode cases (latency, loss, authority) when relevant.
2. **Pick the layer** - from the project's existing checks (`verified`; `profile: Checks`), not from preference:
   - *unit* for pure rules (damage formulas, state machines, economy math)
   - *integration* for systems talking to each other (save/load, spawner + encounter data)
   - *play-mode / headless scene* for things that need the engine loop (physics, animation events, input)
   - *manual / playtest* for feel, readability and fun - give an observation checklist, not opinions
3. **Write** tests in the project's conventions: same framework, folder, naming and exit behaviour as the existing checks, and register the new check wherever the project lists its commands. Keep each check to one behaviour. Rule checks use simulated time and seeded random; behaviour the project defines in real time keeps its real-time checks (`profile: Time in tests`).
4. **Run** what can run here, with a timeout when a run can hang. Paste the exact command and the real output. A check that needs a service, a device or a credential you do not have is a named gap, not a pass.
5. **First use** - whenever the work changes what a new player sees in the first minutes, with or without a milestone or ticket, run the first-use path (`profile: First-use check`) after step 4:
   - Run it against a build that contains the change. When the path runs on an export or a packaged build, rebuild it first, even if the profile calls that build slow or only needed when its settings change.
   - Check every `Must hold` condition and record each one as held, failed or not checked. A run with any condition not checked is not a pass.
   - Use the tools available here (browser automation, screenshots). Without them, hand the path to the user as a checklist; until someone runs it, it is a named gap.
   - Append the run to `Runs` in the project profile, newest first; never replace or delete earlier runs.
   - No first-use check in the profile: propose one (path and what must hold) and treat the experience as a named gap.
6. **Report** gaps honestly.

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
First use:     date, person or agent + exact model, tools, build used, each Must hold condition held/failed/not checked; or "not run: <reason>"
Gaps:          behaviours still untested; checks that need a device/engine/person
```

## Never

- show test output that did not come from a tool run
- call a playtest done when it was only planned
- call the first-use check passed because the state tests pass, or with a `Must hold` condition left unchecked
- run the first-use path on a build that predates the change
- test the implementation's internals when a behaviour test exists
