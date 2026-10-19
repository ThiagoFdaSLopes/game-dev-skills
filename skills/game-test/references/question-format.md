# Question format (terminal-first)

Designed for Claude Code, Codex and other terminal agents: plain text, no emoji, no box-drawing, no wide tables, lines under ~80 chars, options lettered `A` to `D` so the answer is one character (`Q3:A`) and can be recorded as written (`profile: Questions`).

## Rule 0: use the native question tool when one exists

If the runtime offers a structured question tool (e.g. `AskUserQuestion`), use it. Map the format below onto it:

- the question text becomes the question, and the `Q-ID` goes in the header chip (`Q4 Levels`; the chip holds 12 characters);
- each real option becomes a choice whose label starts with its letter (`B. Procedural rooms`) and whose description is its one-line trade-off;
- the recommended option goes first with "(Recommended)" appended; the letter in the label keeps its identity, so answers still read `Q4:B`;
- never pass an "Other" option: the tool adds its own free-text choice, and it accepts at most 4 options.

When no such tool exists, print the text form below and stop.

## Text form

```
Q4  Level construction
How should the first playable build create interesting encounters?

  A. Authored arenas   - paced by hand; costs content work
  B. Procedural rooms  - more variety; costs a generator + tuning
  C. Hybrid chunks     - controlled variety; costs tooling
  Other                - reply "Q4 custom: <your idea>"

Recommended: A
Why:   proves encounter quality before building a generator
Cost:  less replay variety in the first slice
Risk:  fixed layouts may feel repetitive  [medium, needs validation]
Prove: playtest 3 arenas; note whether players change tactics
Unlocks: encounter data model -> spawn rules -> content budget

Reply: Q4:A  |  accept Q4  |  why Q4  |  challenge Q4  |  defer Q4
```

Rules:

- One decision per question. 2-4 options (`A` to `D`) that are truly different. The text form ends with an unlettered "Other" line; the native tool adds its own, so never list one there.
- The recommendation is always one of the listed options.
- Each option line: name, dash, one clause of benefit, semicolon, one clause of cost.
- `Risk` and `Prove` only when the decision is hard to reverse or the risk affects the recommendation. For cheap reversible choices, drop them.
- `Unlocks` only in planning, where it tells the user what the answer opens up.
- Never invent numbers: no probabilities, scores, benchmarks or budgets.
- Up to three independent questions per round; one or two for hard ones. A question whose prerequisite is unresolved is never shown in the same round.
- After printing a round, stop and wait.

## Reply grammar

Accept natural language as well as these shortcuts:

```
Q4:B              choose option B of Q4
Q4 custom: <text> custom route for Q4
accept Q4         take Q4's recommendation
accept all        take every recommendation shown in THIS round only
why Q4            constraints, alternatives, evidence level, reversibility
challenge Q4      strongest failure case, a cheaper test, the counterargument
defer Q4          leave open; its dependents stay blocked
back Q4           reopen; recheck everything that depended on it
status            locked / ready / deferred / blocked, top risks, next gate
```

A bare `yes` accepts the recommendation only if exactly one question is visible; otherwise ask which one. If a reply could mean either an option or a custom route, ask which one before recording it.

An answered question that settles a decision is recorded where the project keeps decisions, with the answer and the date (`Q4:A, 2026-10-19`), in the format of `profile: Decisions` and `profile: Questions`.

## Status line (execution skills)

For multi-step work, use a short header instead of a question:

```
BUILD  player jump
Goal:  variable-height jump on the existing controller
Path:  inspect input -> implement -> play-mode test
Risk:  may interact with coyote time  [needs validation]
```

Do not put this on tiny fixes or every message. End execution work with:

```
Result:        what changed (files, behavior)
Verification:  what was run and what it showed
Open risks:    what is still unverified or assumed
```

## Checkpoint (planning only)

```
CHECKPOINT  first playable
Locked:   Q1 core fantasy = B   Q4 levels = A
Impact:   arena data drives spawns; procedural pipeline deferred
Top risk: enemy readability  [medium, needs validation]
Next:     greybox playtest with an observation checklist
Unlocked: Q5 spawn rules, Q6 encounter feedback
```
