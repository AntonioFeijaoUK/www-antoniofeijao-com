# Timeline Post-April Queue - 19 April 2026

## Purpose

This note identifies a small second-pass migration queue from legacy JSON records that were previously marked `skip` or `merge`, but which now look worth reconsidering after the April 2026 backlog was completed.

This is intentionally selective. The goal is not to reopen the entire skip pool. The goal is to identify the strongest remaining candidates that:

- are not already covered by `docs/_timeline/`
- have durable historical significance
- fit the timeline's current strengths
- can likely be sourced cleanly from authoritative material
- do not collapse back into duplication with an existing canonical post

## Current Context

- The original April backlog is complete.
- The completed reconciliation is tracked in `additional-notes/timeline-priority-reconciliation-v2026-04-19.md`.
- Most items previously marked `merge` are already adequately absorbed into canonical posts and should stay that way.
- Most items previously marked `skip` still look like low-priority filler, weakly framed product noise, or overly broad social-political topics that would require a different editorial approach.
- As of `19 April 2026`, all five Tier A items have now been migrated as:
  - `docs/_timeline/1910s/1916-07-01-battle-of-the-somme-begins.md`
  - `docs/_timeline/1950s/1953-03-05-joseph-stalin-dies.md`
  - `docs/_timeline/1960s/1963-11-22-john-f-kennedy-assassinated-in-dallas.md`
  - `docs/_timeline/2010s/2015-12-12-paris-agreement-adopted.md`
  - `docs/_timeline/2010s/2019-03-13-boeing-737-max-grounded-in-the-united-states.md`
- Work is intentionally paused here for now.
- No Tier B items have been promoted into a new active queue.

## Recommended Queue

### Tier A - Strongest Reconsideration Candidates

These are the best post-April candidates from the former `skip` pool.

1. `Battle of the Somme`
Status:
done -> `docs/_timeline/1910s/1916-07-01-battle-of-the-somme-begins.md`
Reason:
historically major, still absent from `docs/_timeline/`, and now easier to justify because the surrounding First and Second World War arc is much more complete than it was during the first triage pass.

2. `Death of Joseph Stalin`
Status:
done -> `docs/_timeline/1950s/1953-03-05-joseph-stalin-dies.md`
Reason:
fits the Cold War and twentieth-century political reordering strand already present in the timeline, and gives a stronger bridge between the Second World War aftermath and later Cold War entries.

3. `Assassination of John F. Kennedy`
Status:
done -> `docs/_timeline/1960s/1963-11-22-john-f-kennedy-assassinated-in-dallas.md`
Reason:
one of the defining political shocks of the twentieth century, widely sourceable, and still notably absent despite the timeline already covering adjacent Cold War milestones.

4. `Paris Climate Agreement`
Status:
done -> `docs/_timeline/2010s/2015-12-12-paris-agreement-adopted.md`
Reason:
the climate-governance strand is now stronger after the COP26 / Glasgow Climate Pact entry, making Paris easier to justify as a durable diplomatic milestone rather than a generic contemporary policy item.

5. `Boeing 737 MAX Grounding`
Status:
done -> `docs/_timeline/2010s/2019-03-13-boeing-737-max-grounded-in-the-united-states.md`
Reason:
strong fit for technology, safety, infrastructure, and regulatory failure. This looks more historically durable than many of the skipped 2010s corporate or product records.

### Tier B - Plausible Secondary Queue

These may be worthwhile later, but they are weaker or need more careful framing than Tier A.

1. `Introduction of the Television`
Reason:
historically important and absent, but broader media-history framing would be needed to keep it from becoming too diffuse.

2. `First Feature-Length Film`
Reason:
worth considering if the timeline wants a stronger media-history strand, but weaker fit than the core science, computing, cyber, and geopolitical lines.

3. `Release of Atari 2600`
Reason:
potentially worthwhile as a gaming and consumer-computing milestone, but less important than the stronger platform and internet infrastructure entries already in the timeline.

4. `Greta Thunberg Begins Climate Activism`
Reason:
could fit the environmental politics thread, but it is more interpretive and personality-centred than the climate-governance milestones above.

5. `Flint Water Crisis`
Reason:
important, but would require careful public-health and governance framing and may sit awkwardly beside the timeline's current emphasis unless a broader infrastructure-risk strand is developed.

## Not Recommended Now

These former `skip` or `merge` items still do not look like good next migrations.

### Former `merge` items

- `First Release of SQL`
- `First Release of Ruby on Rails`
- `Colonial Pipeline Ransomware Attack` (later duplicate)
- overlapping `event-nasa-space.json` variants

Reason:
the existing canonical posts already cover these well enough for now. Reopening them would mostly create duplication or turn into rewrite work rather than backlog expansion.

### Former `skip` groups that still look weak

- `event-2023.json` and `event-2024.json` conferences and summit-style entries
- weakly framed corporate product launches and incremental version updates
- social-media growth or popularity markers such as `Launch of Facebook`, `Launch of WhatsApp`, or `Clubhouse App Popularity Surge`
- imprecise or noisy AI/corporate records such as `Google AI LaMDA Announcement` or `Google AI Language Model Release`

Reason:
these still look too ephemeral, weakly bounded, or insufficiently central to justify migration ahead of the stronger missing historical milestones above.

## Suggested Next Sequence

Tier A is now complete.

If work resumes beyond this point, the most sensible next step is not another automatic carry-over from the old skip pool. It is a fresh decision between:

1. promoting one or two Tier B items into a new active queue, or
2. stopping here and treating the post-April second-pass backlog as complete for now

The Tier A sequence stayed closest to the established strengths of the timeline so far:

- twentieth-century turning points
- governance and geopolitical history
- infrastructure, systems, and technological risk

## Notes

- This queue is a fresh planning proposal, not a claim that every remaining skipped record should now be migrated.
- Any selected item from the former `skip` pool should still be re-sourced from scratch rather than trusted in its raw JSON wording.
- If this queue is adopted, it would make sense to update the top-level reconciliation note later so it points to this post-April planning file.
