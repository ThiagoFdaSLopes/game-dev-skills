---
name: game-debug
description: Find the root cause of a gameplay bug, crash, regression, desync or odd behaviour and apply the smallest correct fix with regression coverage. Use when the user reports a bug, pastes a log, stack trace or repro steps, or asks "why does X happen". Never fabricates a root cause - labels hypotheses when reproduction is impossible.
argument-hint: "[symptom, log, or repro steps]"
---

# game-debug

Reproduce, trace, isolate, fix at the smallest valid layer, prove it stays fixed.

Read before starting: `references/principles.md`, `references/project-profile.md` and the project profile itself, `references/question-format.md`. A fix follows `profile: Workflow` like any implementation; the checks to rerun are in `profile: Checks`.

## Process

1. **Symptom** - restate in one line what happens, what was expected, and the trigger. Pull engine version, platform and build config from the repo, not from the user.
2. **Reproduce** - run the repro if the environment allows (tests, headless mode, a scripted scene, a log replay). If it cannot be reproduced here, say so and continue with a labelled hypothesis.
3. **Trace** - follow execution and data flow from the trigger: input -> state -> systems -> output. Watch for the usual game suspects: frame-rate-dependent logic, order of update/fixed-update/physics ticks, event double-subscription, stale references across scene loads, serialization drift, float accumulation, authority mismatch in netcode.
4. **Isolate** - name the root cause with its evidence label. Distinguish *cause* from *where it shows up*.
5. **Fix** - the smallest change at the layer that owns the bug. Do not patch the symptom downstream.
6. **Cover** - add a regression test or a deterministic repro (unit, integration, play-mode, or a recorded input sequence) where the project supports it.
7. **Verify** - rerun the repro and the relevant tests. Report actual output.

## When reproduction is impossible

Give, in this order: the most likely cause (`inferred`), one or two alternatives, and the cheapest diagnostic for each (a log line, an assertion, a debug overlay, a bisect). Do not pick a cause and pretend it was confirmed.

## Fork

Ask one shared-format question only when two fixes imply different behaviour the user must choose (e.g. "clamp velocity" vs "reject the input"), or when the right behaviour is a pending item no recorded decision settles. Otherwise fix and note the alternative in Open risks.

## Closing

```
Root cause:    one line + evidence label + file:line
Fix:           files changed, what the change does
Verification:  repro result before/after, tests run and their output
Open risks:    related code paths not covered, hypotheses still open
```

## Never

- invent a root cause or a passing test
- fix three things while hunting one
- ask the user for facts in the logs or the repo
