---
name: game-optimize
description: Diagnose and fix FPS drops, stutter, memory growth, long loads, input latency or scaling problems by measuring first, changing one bottleneck at a time, and comparing before/after under the same conditions. Use when the user mentions performance, frame rate, hitching, memory, load time, GC spikes, draw calls or latency. Without measurements it proposes an instrumented experiment instead of promising gains.
argument-hint: "[performance symptom and target platform]"
---

# game-optimize

Measure, hypothesise, change one thing, measure again. Never promise a number you have not seen.

Read before starting: `references/principles.md`, `references/project-profile.md` and the project profile itself, `references/question-format.md`. Budgets already recorded by the project are the targets, and the measuring tools it lists (`profile: Checks`) come before any new instrumentation.

## Process

1. **Target** - platform, target frame time/memory, and the symptom in one line (`stutter every ~2s on Android mid-range, target 16.6ms`). Pull platform and quality settings from the project.
2. **Baseline** - run the profiler, a frame-time capture, memory snapshot or a scripted benchmark if the environment allows. If it cannot run here, hand the user the exact instrumentation to add or the profiler steps to follow, then wait for numbers. Never estimate a baseline.
3. **Hypothesis** - name the suspected bottleneck and why the evidence points there. Usual suspects: per-frame allocations and GC, physics tick vs render rate, overdraw and draw-call count, unbatched UI, synchronous asset loads, string/boxing in hot loops, pathfinding without budgets, netcode serialization per tick.
4. **Change one thing** - the smallest change that tests the hypothesis. Preserve gameplay feel and correctness; a faster game that plays differently is a regression.
5. **Compare** - same scene, same inputs, same build config, same device. Report both numbers with units.
6. **Iterate or stop** - if the target is met, stop; do not gold-plate. If not, next hypothesis.

## Fork

Ask one shared-format question only when the fix trades off something the user must weigh (visual quality vs frame time, determinism vs throughput, memory vs load time). Otherwise proceed.

## Closing

```
Target:        platform + budget
Baseline:      measured value(s) + how captured, or "not measured: <reason>"
Change:        what was changed and why
After:         measured value(s) under identical conditions
Verdict:       met / not met / unmeasured
Open risks:    feel or correctness side effects to check; other suspects
```

## Never

- report a gain that was not measured under comparable conditions
- optimise a path the profile does not implicate
- change gameplay behaviour as a side effect without naming it
