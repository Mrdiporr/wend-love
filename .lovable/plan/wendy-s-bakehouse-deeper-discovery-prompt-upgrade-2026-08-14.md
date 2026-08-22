# Wendy's Bakehouse — Deeper Discovery + Prompt Upgrade

Three channels were disclosed on the Instagram profile and were not covered in the first report: a Facebook page, a Threads account (`@wendys.bakehouse)`, and a TikTok account. That is a gap in both the report and the reusable prompt, and it gets fixed in that order: research first, report second, prompt third, build only after the blocking questions are answered.

## Step 1 — Research the three disclosed channels

Retrieve each of:

- Facebook page `facebook.com/246575736114342`
- Threads `@wendys.bakehouse (or check @wends.bakehouse)`
- TikTok `@wendys.bakehouse`

For each: status (active/dormant), audience size, last activity date, posting cadence, content type and quality, prices or product names visible, contact/order method, address or service-area signals, and any link-in-bio destinations. Capture contradictions against the Instagram findings (different handle spelling, different phone, different pricing, different business name).

## Step 2 — Sweep for further accounts by handle pattern

Vendors reuse one username. Systematically probe the same handle stems — `wendys.bakehouse`, `wendysbakehouse`, `wends.bakehouse`, `wendys_bakehouse` — across Instagram, Facebook, TikTok, Threads, X, YouTube, Pinterest, LinkedIn, WhatsApp Business, Google Business Profile, Linktree/Beacons, and local marketplaces (Yelp, Nextdoor, DoorDash/Uber Eats, Etsy). Record hits, misses, and same-name businesses elsewhere that are *not* this one.

## Step 3 — Rewrite the report

Update `docs/research/wendys-bakehouse-discovery-report.md`:

- Digital footprint audit becomes a full multi-channel table, one row per channel, including the negative results (platforms checked, nothing found).
- New handle-consistency subsection covering the `wends` vs `wendys` split and its SEO/trust cost.
- Demand signals extended with TikTok and Facebook engagement patterns.
- Contradictions section updated with anything the new channels reveal.
- Executive summary and blocking questions refreshed to match.

## Step 4 — Upgrade the reusable prompt

In `docs/research/BUSINESS-RESEARCH-PROMPT.md`, add to the research rules and report structure:

- A mandatory **cross-platform handle sweep**: extract the exact handle stem from the known profile, generate spelling variants (dots, underscores, removed/added letters, singular/plural), and check a fixed platform checklist. Handle variants across platforms are expected, not an anomaly.
- A rule to **exhaust every link surfaced on the known profile itself** — linked pages, action buttons, bio links, contact buttons — before external searching.
- The digital footprint table must list **platforms checked and found empty**, so absence is evidenced rather than assumed.
- A **same-name confusion** check: unrelated businesses sharing the name, and what that means for naming/SEO.
- A handle-consistency and brand-name-collision line item in the recommendations section.

## Step 5 — Website build (after answers)

The build stays gated on the five blocking questions (pricing, delivery area, order capacity, assets, and whether the Nigerian-pastry line is a headline or a sub-line). Once answered, the premium build proceeds as its own plan: brand direction, then a bespoke visual system (no template look, no generic AI aesthetic), a photography-led product catalogue, order-request flow, and local SEO for Etobicoke/Toronto plus the diaspora search terms.

## Technical notes

- Research phase touches only markdown under `docs/research/`; no application code.
- Report and prompt both stay in the repo and are re-exported for download.