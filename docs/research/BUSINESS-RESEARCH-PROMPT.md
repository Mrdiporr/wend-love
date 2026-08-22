# Business Research & Development Brief — Master Prompt

Reusable prompt for discovery on any small/social-first business before design or build work begins.

**How to use:** copy everything from `--- PROMPT START ---` to `--- PROMPT END ---`, fill in Section 0 only, send. Leave the rest unchanged so every business gets the same rigour and the same report shape.

---

--- PROMPT START ---

# Business Research & Development Brief

## 0. Inputs (the only section I edit)

- **Business name (or "unknown"):**
- **Primary source links** (Instagram, TikTok, Facebook, Threads, X, website, WhatsApp catalogue, Jumia/Etsy/marketplace pages, Google Maps listing — list all you have. Incomplete is fine: finding the rest is your job, not mine):
- **Assumed market / country / city** (treat as an *assumption to verify*, not a fact):
- **Assumed language(s) of the customer base:**
- **Project goal** (new website / rebrand / e-commerce / landing page / booking site / other):
- **Scope and budget signal** (lean MVP / mid / premium agency-grade):
- **Target launch horizon:**
- **Anything the owner has already told me:**

## 1. Your role

You are a senior digital strategist running discovery for a professional design and development team. Your output must let that team start building **without repeating any of this research**. You own the process: if the inputs above are wrong or incomplete, your job is to find that out and say so plainly.

## 2. Research rules (non-negotiable)

1. **Verify before asserting.** Every current-state claim must trace to something you actually retrieved. If you could not retrieve it, say so.
2. **Label every claim** as one of: `Verified` (retrieved from a named source), `Inferred` (reasoned from evidence — state the evidence), `Unknown` (needs the owner).
3. **Never infer country, market, language, or industry from a name.** Names mislead — a place name in a handle may be a fabric, a slang term, a person, or a district. Confirm geography from currency, phone codes, delivery language, tagged locations, and payment methods.
4. **Exhaust the known profile before searching outward.** Before any external search, harvest every link and affordance the given profile itself exposes: linked Facebook page, linked Threads account, "View shop", action/contact buttons, link-in-bio and every destination behind it, tagged accounts, tagged locations, pinned posts, story highlights, and the profile's own page metadata. A disclosed link is primary evidence and must never be missed. Follow each one and record what it contained.
5. **Run a cross-platform handle sweep — mandatory, and report it as a checklist.**
   - Take the exact handle stem from the known profile (e.g. `name.brand`) and generate variants: dot removed, dot swapped for underscore, dot swapped for hyphen, concatenated, singular/plural, common misspellings and dropped letters (`wendys` vs `wends`), plus the business name with a city or category suffix, and any alternate display name found (a display name like "Cakes in Toronto" is itself a handle candidate).
   - Check every variant against this fixed list: Instagram, Facebook (page and personal), Threads, TikTok, X/Twitter, YouTube, Pinterest, LinkedIn, Snapchat, WhatsApp Business, Telegram, Google Business Profile / Google Maps, Yelp / Nextdoor / local directories, the market's delivery and marketplace platforms (Uber Eats, DoorDash, Jumia, Etsy, Shopify store, etc.), and link-in-bio hosts (Linktree, Beacons, Stan, Milkshake).
   - **Vendors reuse one username across platforms — assume the account exists until a platform is checked and found empty.** Handle variants across platforms are normal, not evidence of a different business; reconcile them by shared phone number, bio wording, imagery, or linked accounts.
   - Also search the business's phone number, email, and any address string as standalone queries — these surface directory listings that handle searches miss.
6. **Report negative results explicitly.** Every platform on the checklist appears in the footprint table with a status, including `not found (checked <date>)` and `could not retrieve (blocked)`. Never let an unchecked platform read as an absent one, and never claim a channel does not exist when retrieval merely failed.
7. **Run a same-name confusion check.** Search the business name globally and list unrelated businesses sharing it (other cities, other countries, large brands), with URLs, and state the naming/SEO consequence. Never merge their facts into the subject's profile.
8. **Surface contradictions rather than smoothing them over** — different prices, different phone numbers, different names, different handle spellings, dormant vs active accounts, conflicting claims.
9. **Cite the source for each material fact** (URL or account handle plus what you saw there).
10. **Quantify wherever possible** — follower counts, posting cadence, engagement ranges, price bands, product counts, date of most recent activity, account creation date — and timestamp your observations.
11. **Read the comments and DMs-visible signals**, not just the captions. Customer objections, repeat questions, and "how much?" spam are demand data.
12. **When a platform blocks scraping, route around it before giving up** — oEmbed endpoints, embedded JSON in the page source, public mirrors, cached copies, web search snippets, and a headless browser are all fair game. Record which method produced each fact.
13. **Do not write or change any application code during this phase.**


## 3. Required report structure

Produce a single markdown report using exactly these sections, in this order.

1. **Executive summary** — 5–8 bullets a busy owner can read in a minute.
2. **Headline reframe** — anything discovered that changes the premise of the project (wrong country, wrong industry, business is dormant, the real business is a different account). If nothing changes the premise, say so explicitly.
3. **Verified business profile** — what they actually sell, product/service categories, price architecture and currency, geography served, delivery/fulfilment method, languages, operating hours, years active, team size signals.
4. **Digital footprint audit** — a table covering *every platform on the sweep checklist in rule 5*, not only the ones found. Columns: platform, URL/handle checked, status (`active` / `dormant` / `not found` / `could not retrieve`), audience size, last activity date, what it is used for, and its weaknesses. Follow it with two subsections:
   - **Handle consistency** — the exact handle used on each platform, any spelling divergence, the display-name divergence, and the discoverability and trust cost of that inconsistency.
   - **Same-name collisions** — unrelated businesses sharing the name and what they do to search visibility.
5. **Customer and demand signals** — who is buying, apparent age/gender/income bracket, motivations, recurring questions and objections seen publicly, engagement patterns *by platform and by content type*, peak activity timing.
6. **Competitive and market context** — 3–6 comparable operators with what each does better/worse, plus the broader category dynamics and pricing norms in that market.
7. **Contradictions and data-quality issues** — every inconsistency found, with both versions and which is more likely correct.
8. **Information gaps, prioritised** — table of: gap, why it blocks work, how to close it (ask owner / observe / test), and priority.
9. **Website strategy** — business goal of the site, single primary conversion action, secondary actions, content model (what entities exist and their fields), must-have pages, and what is deliberately excluded.
10. **Technical and operational recommendations** — appropriate stack-level choices, catalogue vs full checkout, payment and messaging integrations realistic for that market, performance/data-cost constraints, mobile-first considerations, admin/update workflow the owner can actually maintain. Include an explicit **handle, brand-name and cross-channel consolidation** item: which handle to standardise on, which dormant or duplicate profiles to reclaim or retire, which platforms to point at the new site, and how to mitigate any name collision.
11. **Phased build plan** — v1 (deliberately narrow, shippable), v2, v3, with the rationale for what is held back and rough effort per phase.
12. **Risks and assumptions** — what could invalidate this plan.
13. **Blocking questions for the owner** — maximum 5, plain language, no technical jargon, each explaining why it matters. Always include a request for any available assets: product photos, logo, brand colours, price list, existing copy, and permission to use existing social imagery.

## 4. Output contract

- Save the report to `docs/research/<business-slug>-discovery-report.md` where `<business-slug>` is a lowercase hyphenated form of the business name.
- Make no code changes. Do not start design or implementation.
- End your turn after delivering the report and wait for answers to the blocking questions.

--- PROMPT END ---

---

## Reference output

`docs/research/3k-below-ankara-discovery-report.md` — a completed run of this prompt. Note especially the headline reframe (a business assumed to be Turkish turned out to be a Nigerian wax-print fashion retailer), the reconciliation of two linked storefronts, and the v1 scoped to a WhatsApp-assisted catalogue rather than a full checkout.

## Notes

- Only Section 0 changes between runs. Resist editing the rest; consistency is what makes reports comparable across businesses.
- If you research several businesses in one category, run each separately, then ask for a cross-business comparison as a follow-up.
- This file can later be promoted to a saved workspace skill so it is invocable by name instead of pasted.
