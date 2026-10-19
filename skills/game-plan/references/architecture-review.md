# Architecture review (run silently before a consequential recommendation)

Check these before recommending anything that shapes architecture. Surface the result only when it changes the recommendation or the user asks `why`.

1. **Boundaries and ownership** - which subsystem owns the state and the authority; event flow, API contracts, dependencies. Flag circular coupling and global mutable state unless justified.
2. **Data and content** - config vs code, save schema and versioning, determinism where needed, asset import/authoring pipeline, cost of extending.
3. **Runtime constraints** - platform, input latency, physics/animation timing, frame and memory budgets, network replication and security when relevant. Targets are proposals, never measurements.
4. **Quality and evolution** - test seams (unit / integration / play-mode), debug and profiling hooks, migration path, rollback, reversibility.
5. **Alternatives** - compare at least one simpler option; name the coupling to other systems; say why the pick fits the *current slice*.

## Decision record

An architecturally material decision is recorded where the project keeps decisions, in the format the project uses (`profile: Decisions`). Until the user approves it, keep it as a draft in the conversation with this shape, and print drafts on `status`, `why` or at handoff:

```
D7 draft  Item data lives in data assets, not in scenes
Where:        docs/decisions/0007-item-data-assets.md
Context:      server and client must compute item stats the same way
Decision:     one data asset per item, listed in an item catalog
Alternatives: constants in code (rejected: every new item is a code change)
Consequences: needs a check that every catalog entry loads
Evidence:     verified - the catalog and two existing item assets
Status:       recommended (decided only when the user states it)
```

Use the project's ID scheme and status names when it has them. Take the ID when the draft is written; a rejected draft was never recorded, so its ID stays free.
