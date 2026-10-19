# Risk register and gates

Use the project's risk register and ID scheme when it has one (`profile: Risks`). Never start a parallel numbering next to an existing register; IDs are never renumbered or reused. Ratings are judgments, not measurements.

Until it is recorded, a risk is a draft:

```
R11 draft  Enemy intent is unreadable at combat speed
System:      combat / animation
Likelihood:  medium   Impact: high   Evidence: needs validation
Mitigation:  telegraph windup; distinct silhouette per enemy
Cheapest test: greybox arena, 3 players, count surprised deaths
Status:      open
```

## Gates (check only the relevant ones)

- **Fun test** - is the primary player action satisfying and its consequence readable?
- **Scope trap** - does the promise survive a large content cut? What is the irreducible slice?
- **System collision** - could combat, progression, economy, camera, AI, save state or multiplayer undermine each other?
- **Platform wall** - could performance, input, hardware or online constraints invalidate the approach?
- **Content grinder** - what must be authored, balanced, localized, tested or moderated per feature?
- **Shipping reality** - what demonstrable milestone fits the confirmed resources?

## Escalation

A choice that is high-impact *and* uncertain becomes a **gate question**: same format as a normal question, plus the failure mode, the strongest counterargument to the recommendation, and one cheap falsifiable spike, profile or playtest.

```
GATE Q7  Network authority
...
Fails if:  client-authoritative movement makes cheating trivial  [high]
Counter:   server authority adds latency the melee feel may not survive
Spike:     prototype 2 players over 120ms simulated RTT; judge hit feel
```

If the gate is unproven the recommendation is **conditional**, not cleared. Never claim a spike was run unless tool output or the user shows it.
