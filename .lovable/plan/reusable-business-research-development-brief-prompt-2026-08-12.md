# Reusable Business Research & Development Brief Prompt

## Recommendation

Don't copy-paste the old prompt with a swapped Instagram link. Two problems with that:

- It hardcodes assumptions from one business (single IG profile, retail fashion framing).
- It omits the steps that actually produced value last time: verifying the business's real country and market, cross-checking sibling/linked accounts, surfacing contradictions between sources, separating verified fact from inference, and ending with blocking questions.

Instead: one parameterised master prompt you fill in per business, producing a consistently structured discovery report every time.

## What gets created

A single file, `docs/research/BUSINESS-RESEARCH-PROMPT.md`, containing:

1. **Fill-in block** at the top — the only part you edit per run:
  - Business name (or "unknown")
  - Primary source link(s): Instagram, TikTok, website, WhatsApp catalogue, marketplace pages
  - Assumed market/country (marked as assumption, to be verified)
  - Project goal (website, rebrand, e-commerce, landing page)
  - Budget/scope signal and target launch horizon
2. **Research rules** — verify before asserting; label every claim Verified / Inferred / Unknown; never assume location or language from a name; check for linked or duplicate accounts and reconcile them; cite the source for each fact.
3. **Required report structure** — fixed sections so outputs are comparable across businesses:
  - Executive summary and headline reframe (anything that changes the project's premise)
  - Verified business profile: what they sell, price architecture, geography, languages
  - Digital footprint audit across every channel found
  - Customer and demand signals (audience, engagement patterns, objections seen in comments)
  - Competitive and market context
  - Contradictions and data-quality issues
  - Prioritised information gaps, each with how to close it
  - Website strategy: goals, primary conversion action, content model, must-have pages
  - Phased build plan with a deliberately scoped v1
  - Blocking questions for the owner (max 5, answerable without technical knowledge, also, request for available images if any).
4. **Output contract** — save the report as `docs/research/<business-slug>-discovery-report.md`; no code changes during research; stop after the report and wait for answers to the blocking questions.
5. **Worked example** — the 3K Below run referenced as a reference-quality output.

## Technical notes

- Markdown only, no app code touched; the file lives in the repo so it is versioned alongside the reports.
- Report filenames follow one slug convention so multiple businesses accumulate cleanly under `docs/research/`.
- If you prefer, the same file can double as a saved workspace skill later so it is invocable by name rather than pasted.

## How you'll use it

Open the file, copy it, replace the fill-in block, send. Everything else stays constant, so each business gets the same rigour and the same report shape.