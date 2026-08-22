# Wendy's Bakehouse — Website Discovery & Project Planning Report

**Prepared:** 12 August 2026 (all observations timestamped this date, UTC)
**Subject:** `@wendys.bakehouse` — https://www.instagram.com/wendys.bakehouse/
**Method:** Business Research & Development Brief master prompt (`docs/research/BUSINESS-RESEARCH-PROMPT.md`)
**Claim labels:** `Verified` (retrieved from a named source) · `Inferred` (reasoned, evidence stated) · `Unknown` (needs the owner)

**Retrieval note.** Instagram.com and Google/DuckDuckGo blocked automated retrieval. Instagram data was retrieved from two independent public mirrors — picnob.com and imginn.com — which agree on every field they share, and cross-checked against Instagram's own page metadata. **Third pass (12 Aug 2026):** the owner-disclosed Facebook, Threads and TikTok links were followed using a headless browser, TikTok's oEmbed API and Facebook's Graph picture endpoint, and a full cross-platform handle sweep was run (see §4). Facebook remains login-walled: the Page is confirmed to exist and be current, but its content is `Unknown`. Anything I could not retrieve is labelled `Unknown` rather than guessed.

---

## 1. Executive summary

- **Wendy's Bakehouse is a live, actively-trading home/commercial-kitchen bakery in Etobicoke, Toronto, Ontario, Canada** — not a Nigerian business and not a fast-food outlet. `Verified` (bio, geotags, area code 647, CAD pricing).
- **Its differentiator is cultural**: it sells both Western celebration cakes *and* Nigerian ("Naija") pastries — meat pies, cake loaves — into Toronto's large Nigerian-Canadian diaspora. The bio literally positions on it: *"Toronto Cakes | Naija Cakes in Toronto"*. `Verified`
- **The account is highly active**: 738 posts, with a post published within 11 hours of retrieval and eight posts in the preceding fortnight. This is the opposite of a dormant account. `Verified`
- **But reach is tiny**: 599 followers against 738 posts, and it follows 767 accounts — more than it is followed by. Effort is high, distribution is weak. `Verified`
- **She is on four platforms, not one — and all four are weak.** Instagram (599 followers, 738 posts), **TikTok as "Cakes in Toronto" with 303 videos but only 245 followers**, **Threads with 51 followers**, and a **live Facebook Page** reachable only by an 18-digit numeric URL. There is still **no website and no Google Business/Maps listing**. Ordering runs through Instagram DM and WhatsApp/SMS on **647-620-2518**. `Verified` (Facebook page content `Unknown` — login-walled)
- **The brand is split across four inconsistent identities**: handle `wendys.bakehouse`, a mistyped Threads link (`wends.bakehouse`), the TikTok display name "Cakes in Toronto", and an unnamed Facebook page. Consolidating this is a first-week task. `Verified`
- **Pricing is public and coherent**: cupcakes $35–$75/set, 6-inch two-layer custom cakes normally $130–$150, entry products "from $30+". Fulfilment is **pickup in Etobicoke**, with paid delivery available. `Verified`
- **The commercial problem is not product quality, it is discovery and conversion friction.** Every order currently costs the owner a manual DM conversation, and "DM for price" appears on her single best-performing post (389 likes). A site that answers price, range, lead time and pickup logistics without a conversation is the highest-value intervention available.
- **Recommended v1:** a fast, SEO-targeted, mobile-first single-brand site with a browsable catalogue, transparent price bands, and a structured enquiry/booking form that hands off to WhatsApp — plus a Google Business Profile. Deliberately *not* a full e-commerce checkout in v1 (see §11).

---

## 2. Headline reframe

**Two premises change.**

1. **This is a Canadian business with a Nigerian identity, not a Nigerian business.** Currency is CAD, phone is Toronto 647, geotags read "Toronto, Ontario", and the bio opens with 🇨🇦. But the product mix (meat pies, cake loaves), the vocabulary ("It showed me shege!", "Let me goan rest"), and the communities it posts into (`@naijapreneurcanada`, `#nigeriansincanada`, `#naijaindiaspora`, `#canadaceos`) are unambiguously Nigerian-diaspora. Any design work that treats this as a generic Toronto patisserie will strip out the single thing that makes it findable and defensible. `Verified`

2. **The name is an SEO liability of the first order.** "Wendy's" is one of the largest fast-food brands on earth. Every search engine query I ran for the business name returned wendys.com. This business will **never** win the head term and must not be built as if it could — the site's entire search strategy has to run on long-tail intent (see §10). `Verified`

Nothing else about the brief's premise changes: it is a real, current, small, owner-operated business that plausibly needs a website.

---

## 3. Verified business profile

| Field | Finding | Label |
|---|---|---|
| Trading name | Wendy's Bakehouse | `Verified` — bio |
| Bio (verbatim) | "Wendy's Bakehouse \| Toronto Cakes \| Naija Cakes in Toronto" · "🇨🇦Certified Food Handler / 🎂Cakes\| Gift Boxes\| Naija Pastries / 👇Order here" | `Verified` — picnob + imginn agree |
| Owner | A woman, first-person voice throughout ("I just let my hand do the decorating"), name presumed Wendy | `Inferred` |
| Country / city | Canada; Toronto, Ontario. Pickup point in **Etobicoke** | `Verified` — geotags, 647 area code, CAD, third-party listing "📍 Etobicoke, Ontario" |
| Category | Custom celebration cakes + Nigerian pastries + gift boxes | `Verified` |
| Credential | "Certified Food Handler" (Ontario food handler certification) | `Verified` (self-declared) |
| Team size | One person, plus occasional "we" in marketing copy | `Inferred` — solo BTS content, single phone line |
| Premises | No storefront referenced anywhere; pickup-only from an Etobicoke address given privately | `Inferred` |
| Languages | English (Nigerian-English register in captions) | `Verified` |
| Operating model | Made-to-order, booked by month ("August bookings now open"), full payment to secure slot | `Verified` |
| Years active | Account has 738 posts and a "Happy New Year 2026" post 7 months ago; earliest activity date `Unknown` | `Verified` / `Unknown` |
| Business registration | `Unknown` |

### Product and price architecture (all CAD, all `Verified` from captions)

| Product | Price | Notes |
|---|---|---|
| Entry products | "from $30+" | via `@thevendorplug.co` feature |
| Cupcakes, 6 regular | $35 | |
| Cupcakes, 6 themed | $45 | |
| Cupcakes, 12 regular | $65 | |
| Cupcakes, 12 themed | $75 | |
| Custom cake, 6-inch 2-layer | **$130–$150** standard; promo $100 | promo ran 5–7 Aug 2026 only |
| Cake loaves | price not published | Vanilla, Red Velvet, Chocolate, Cookies & Cream, Coconut, Strawberry. Multi-order discount |
| Meat pies | price not published | "flaky and delicious", pickup Etobicoke |
| Gift boxes | price not published | named in bio only |
| Wedding / baby shower / anniversary cakes | price not published | named by third-party feature |

Technique range observed: buttercream, ganache, and fondant work (she states fondant is far slower for her — 10 buttercream cakes per 1 fondant). `Verified`

### Fulfilment and commercial terms `Verified`
- Pickup in Etobicoke; delivery available for an additional fee.
- Booked in monthly cycles; promo required full payment upfront to hold a slot.
- Promo enforced a pickup window (7 Aug – 7 Sep 2026) with a hard expiry — she manages capacity by date-boxing.
- Contact: DM, or call/text/WhatsApp **647-620-2518**.

---

## 4. Digital footprint audit

**Updated 12 Aug 2026, third research pass.** The owner-disclosed Facebook, Threads and TikTok links were followed, and a full cross-platform handle sweep was run over the stems `wendys.bakehouse`, `wendysbakehouse`, `wendys_bakehouse`, `wends.bakehouse` and `cakesintoronto`. Every platform checked is listed below, including the ones that came back empty — an unchecked platform is never reported as an absent one.

| Channel | URL / handle checked | Status | Audience | Last activity | What it's used for | Weaknesses |
|---|---|---|---|---|---|---|
| Instagram (primary) | `@wendys.bakehouse` | **Active** | 599 followers · 767 following · 738 posts (IG page metadata: 596/838/738) | ~11 hours before retrieval | Portfolio, pricing, promos, order intake by DM | Follower count far below post count; follows more than it's followed; pricing scattered across captions |
| TikTok | `tiktok.com/@wendys.bakehouse` | **Active** `Verified` | 245 followers · 185 following · 3,824 likes · **303 videos** | Recent (exact date not retrievable) | Baking BTS and finished-cake video; display name **"Cakes in Toronto"**; bio "Certified Food Handler ☎️ 6476202518 Etobicoke" | Second-largest content library in the business and almost nobody sees it; no link to any owned surface; created ~July 2023 |
| Threads | `@wendys.bakehouse` (linked from IG as `@wends.bakehouse`) | **Active** `Verified` | 51 followers | ~6 days before retrieval | Short text posts — meat pies, cake loaves, Etobicoke pickup | Tiny audience; duplicates IG content with no additional conversion path |
| Facebook Page | `facebook.com/246575736114342` | **Exists and is live** `Verified` — name, audience and post history `Unknown` | `Unknown` | `Unknown` | `Unknown` | Login-walled to automated retrieval; Graph metadata requires an app token. Its profile-picture endpoint resolves to a current CDN image, so the Page is real and maintained. **Supersedes the earlier "no Facebook page" finding.** |
| WhatsApp / SMS | 647-620-2518 | Active | — | Cited in posts this week | Order line, quotes, payment coordination | Unstructured; no catalogue; owner is the bottleneck; number has zero independent directory footprint |
| Link in bio | "👇Order here" | Present, destination **not retrievable** | — | — | `Unknown` destination | Must be confirmed with the owner (§8 gap 2) |
| Website / own domain | none found under any handle stem | **Absent** `Verified` | — | — | — | Zero owned surface, zero SEO, zero remarketing asset. The only "Wendy's Bakehouse" domain (`wendysbakes.com`) belongs to the unrelated UK business |
| Google Business Profile / Maps | searched, no matching Toronto listing | **Not found (checked 12 Aug 2026)** | — | — | — | Invisible to "cake near me" and "bakery Etobicoke" — the highest-intent queries in this category |
| X / Twitter | `/wendysbakehouse`, `/wendys_bakehouse`, `/cakesintoronto` | Not found (404s; third stem returns an empty unrelated shell) | — | — | — | No presence; low priority for this category |
| YouTube | `@wendys.bakehouse`, `@cakesintoronto` | Not found (404) | — | — | — | 303 TikTok videos could be repurposed as Shorts at near-zero cost |
| Pinterest | `/wendysbakehouse`, `/cakesintoronto` | **Could not confirm** — Pinterest returns 200 for non-existent profiles | — | — | — | Genuinely relevant channel for cake discovery; currently unexploited either way |
| LinkedIn | `/company/wendys-bakehouse` | Not found (404) | — | — | — | Corporate/office-order channel unused |
| Snapchat | `/add/wendys.bakehouse` | Not found (404) | — | — | — | Not a priority |
| Etsy | `/shop/wendysbakehouse`, `/shop/cakesintoronto` | **Could not retrieve** (HTTP 403 bot block) | — | — | — | Existence unproven either way; ask owner |
| Uber Eats · DoorDash · SkipTheDishes | searched by name and phone | Not found (checked 12 Aug 2026) | — | — | — | Consistent with a pickup-first home bakery; also a real discoverability gap |
| Yelp · Nextdoor · local directories | searched by name and phone | Not found (checked 12 Aug 2026) | — | — | — | No third-party review surface anywhere |
| Linktree / Beacons / Stan | searched all stems | Not found | — | — | — | Reinforces that the bio "link" is probably an IG action button, not a hosted page |
| Third-party features | `@thevendorplug.co`, `@naijapreneurcanada` | Active | — | recent | Diaspora vendor round-ups | Borrowed reach only; both link back to the IG DM, not to an owned page |

### 4a. Handle consistency

| Platform | Handle actually used | Divergence |
|---|---|---|
| Instagram | `wendys.bakehouse` | — (canonical) |
| TikTok | `wendys.bakehouse` | Handle matches, but the **display name is "Cakes in Toronto"** — a different brand string entirely |
| Threads | disclosed on IG as `wends.bakehouse`; resolves as `wendys.bakehouse` | **Missing "y"** in the disclosed link — a real typo risk |
| Facebook | numeric ID `246575736114342`, no vanity URL | No readable handle at all; unshareable, unmemorable, and invisible to handle search |

**Consequence.** The brand is effectively four half-brands. A customer who finds the TikTok sees "Cakes in Toronto"; one who follows the IG Threads link may land on a mistyped handle; one who is sent the Facebook page gets an 18-digit URL. Consolidating on one handle, one display name and one destination is a first-week task, not a nice-to-have. `Verified` evidence, `Inferred` consequence.

### 4b. Same-name collisions `Verified`

- **Wendy's** — the global fast-food chain. Owns every head-term search result.
- **Wendy's Bakehouse, Scarborough, North Yorkshire, UK** — wholesale cake baker, Unit 22 Manor Rd, YO12 7BE, `wendysbakes.com`, trading entity Wendy's Bakes Ltd (Companies House 15294458). Has the website and search equity our client lacks.
- **Wendy's Bakehouse, Balaclava, Melbourne, Australia** — Vietnamese bakery, 169 Carlisle St, 4.4★ over 41 Google reviews.
- Adjacent: Wendy's Home Bakery Ltd (NI690965), Wendy's Bakery LLC (Oregon), Wendy's Bakery LLC (Jamaica NY), Wendy's Bakery & Sweets (Forest Hills NY).

None links to `@wendys.bakehouse`. Every one of them competes for the brand-name query, and two of them outrank it with real websites. Domain, page titles and Google Business Profile must be **geo-qualified from day one** (see §10).

**Engagement observed (Instagram, last 10 posts, `Verified`):** likes ranged 4–389, comments 1–22. Median around 20 likes. The 389-like outlier was a finished-cake reel captioned "DM for price". Community/mutual-support content (New Year message, baker-to-baker talk about ganache and fondant) also over-indexes — 66 and 78 likes. Plain product posts underperform. **The pattern: face-and-story content earns reach, and the reach then hits a "DM for price" wall.**

**Engagement by platform `Inferred`:** TikTok's 3,824 likes across 303 videos averages ~12.6 likes per video — comparable per-post engagement to Instagram but on a smaller follower base and a much larger content investment. Threads at 51 followers is negligible today. The volume of unmonetised video (303 TikToks) is the single most under-used asset in the business: it is ready-made site content, Shorts inventory and social proof.


---

## 5. Customer and demand signals

- **Who is buying** `Inferred`: Nigerian-Canadian and broader West-African-diaspora households in west Toronto (Etobicoke, Mississauga, Brampton, North Etobicoke), buying for birthdays, baby showers, anniversaries and weddings; plus baker-peers who engage but don't buy. Evidence: geotags, diaspora hashtags, occasion list in the third-party feature, pickup-only radius.
- **Age/income** `Inferred`: 28–50, household budget comfortable with a $130–$150 discretionary cake but responsive to a $100 promo — mid-market, value-aware, not luxury-insensitive.
- **Motivations** `Inferred`: (a) a celebration centrepiece that photographs well; (b) *cultural familiarity* — meat pies and cake loaves that taste like home, from someone who talks like home. (b) is the moat.
- **The dominant objection is price opacity.** `Verified` — the most-reached post says "DM for price"; the site's job is to remove that friction.
- **Secondary objections** `Inferred`: is this person legitimate and food-safe (she pre-empts this with "Certified Food Handler" in the bio and a "Reviews don't lie!" post), and can she deliver on my date (she pre-empts with monthly booking windows and hard pickup deadlines).
- **Timing** `Verified`: demand is booked by month; she opens bookings at month start. Expect seasonal peaks around December, Mother's Day, graduation and wedding season — `Inferred`.
- **Social proof exists but is invisible.** She posted a reviews screenshot; there is no durable, indexable, aggregated place where testimonials live. `Verified`

---

## 6. Competitive and market context

Direct named peers she interacts with `Verified` (handles seen in her own captions/features):

| Operator | Handle | Position |
|---|---|---|
| Zinny's Cakes and Treats | `@zinnyscakesandtreats` | Peer diaspora baker, addressed as a colleague |
| Be Inspired Cakes | `@beinspired_cakes` | Peer diaspora baker |
| Cakes n Bars | `@cakesnbars` | Featured alongside her in the same diaspora vendor round-up |
| Kaffy Creations | `@kaffy_creations` | Same round-up |
| Triple Deluxe Catering / Afropot Cuisines / Crave and Cook | `@tripledeluxecatering`, `@afropot_cuisines`, `@craveand.cook` | Adjacent diaspora food vendors competing for the same event spend |

Category dynamics `Inferred` from the above plus the pricing evidence:

- The Toronto home-baker market is **crowded, Instagram-native, and almost universally website-less**. Nearly every competitor above is reachable only by DM. That is precisely why a real website is a disproportionate advantage rather than table stakes.
- Above her sit established Toronto custom-cake studios with storefronts, Google reviews in the hundreds, and online deposit-taking — they win the search results she cannot. Below her sit unlicensed casual bakers competing on price alone; her food-handler certification separates her from them and should be stated prominently.
- Price band `Verified` at $130–$150 for a 6-inch 2-layer places her mid-market for Toronto custom cakes — not the cheapest, not premium.
- `Unknown`: actual market share, competitor revenue, and whether any local peer already ranks for "Naija cake Toronto".

---

## 7. Contradictions and data-quality issues

| # | Issue | Detail | Most likely reading |
|---|---|---|---|
| 1 | "I" vs "we" | Captions alternate between solo first-person craft narration and "Our meatpies", "We are taking orders" | Solo operator using the marketing "we". Do not design an "Our Team" page. |
| 2 | Bio promises a link, none retrievable | "👇Order here" implies a link-in-bio, but neither mirror exposed a destination | Either the mirrors strip it, or the "link" is the IG action button / WhatsApp deep link. **Must be confirmed — this determines whether a competing ordering surface already exists.** |
| 3 | Post-count vs follower-count inversion | 738 posts, 599 followers, 767 following | Sustained effort with no distribution strategy. Reinforces the SEO/owned-channel recommendation. |
| 4 | Promo price vs list price | $100 promo against a stated regular $130–$150 | A ~30% discount used for cash-flow/capacity filling. Publish price *bands*, never a single fixed price, so promos don't contradict the site. |
| 5 | Two identity registers | "Toronto Cakes" (mainstream) and "Naija Cakes" (diaspora) in one bio | Not a contradiction — it's a deliberate dual-market play, and the site must serve both without diluting either. |
| 6 | **Corrected:** the second pass reported "no Facebook page and no TikTok" | The owner's own Instagram profile discloses a Facebook Page (ID 246575736114342), a Threads account and a TikTok account. All three are live. | **The earlier absence finding was wrong and is retracted.** It came from search-engine blocking, not evidence of absence. Only "no website" and "no Google Business Profile" survive as negative findings, and both are `Not found (checked 12 Aug 2026)` rather than proven absent. |
| 7 | Threads handle spelling | Instagram discloses the Threads account as `@wends.bakehouse`; the live account is `@wendys.bakehouse` | A typo in the disclosed link (or an old handle since changed). Either way customers following it may land nowhere. Flag to owner. |
| 8 | Brand name vs display name | TikTok displays **"Cakes in Toronto"**, Instagram displays "Wendy's Bakehouse" | Two brand strings for one business. "Cakes in Toronto" is arguably the *better* SEO asset (descriptive, geo-qualified, no fast-food collision) — worth a deliberate decision, not an accident. |
| 9 | Facebook Page has no vanity URL | Reachable only as `facebook.com/246575736114342` | Never set up properly. A vanity URL and a complete page (address, hours, price range) is a free local-SEO win. |
| 10 | Phone number has no public footprint | 647-620-2518 appears in her own bios but in no directory, review site or listing anywhere | Normal for a home operation, but it means the business has **zero third-party validation** — a trust gap the site must close with reviews and certification. |
| 11 | Ambiguous name | Confirmed unrelated "Wendy's Bakehouse" businesses in Scarborough UK and Melbourne AU, plus the global fast-food chain (see §4b) | Everything in this report is tied to the exact handle `@wendys.bakehouse` and its Toronto/Etobicoke evidence only. No third-party claim has been merged in. |

---

## 8. Information gaps, prioritised

| # | Gap | Why it blocks work | How to close | Priority |
|---|---|---|---|---|
| 1 | Full price list for loaves, meat pies, gift boxes, larger/tiered cakes, wedding tiers | The site's core value is price transparency; half the catalogue has no public price | Ask owner | **Blocker** |
| 2 | Destination of the bio "Order here" link | May already be an ordering tool we must integrate with or replace | Ask owner | **Blocker** |
| 3 | Legal/service details: business name registration, exact pickup area, delivery fee and radius, minimum lead time, deposit and cancellation policy, allergen handling | Cannot publish an ordering flow or terms without these | Ask owner | **Blocker** |
| 4 | Photo library: rights, resolution, and whether high-res originals exist off-Instagram | Instagram-compressed images will not carry a premium site | Ask owner | **Blocker** |
| 5 | Capacity: orders per week she can physically fulfil | Determines whether the form throttles bookings by date | Ask owner | **Blocker** |
| 6 | **Facebook Page 246575736114342** — its name, audience, post cadence, address block, hours and reviews (login-walled to us) | It may already hold reviews, a service area and an address that outrank anything we build; it may also carry stale prices that contradict the new site | Ask owner for admin access or a screen-share walkthrough | **Blocker** |
| 6b | Whether a Google Business Profile, Etsy shop or Pinterest board exists under another name | Duplicate or unclaimed listings damage local SEO | Ask owner + manual check | High |
| 6c | Whether she wants to keep "Cakes in Toronto" as a brand string or retire it | Decides the domain, the site's page titles and the handle we standardise on | Ask owner | High |
| 7 | Existing customer reviews in retrievable form (DM screenshots, texts) | Testimonials are the strongest conversion asset for an unlisted home baker | Ask owner | High |
| 8 | Payment method used today (e-transfer, cash, Square?) | Decides v2 deposit/checkout design | Ask owner | High |
| 9 | Whether she wants wedding/corporate work or prefers small-batch retail | Changes the entire information architecture and price presentation | Ask owner | Medium |
| 10 | Who maintains the site after launch, and her comfort with a CMS | Determines build approach — a site she can't update will rot | Ask owner | Medium |

---

## 9. Website strategy

**Business goal.** Convert the reach she already earns on Instagram into booked, pre-qualified orders — and open a second, compounding acquisition channel (local + long-tail search) that Instagram cannot give her.

**Single primary conversion action.** *Submit a structured cake/pastry enquiry* — occasion, date, size, flavour, budget band, pickup or delivery — which lands with her as a complete brief on WhatsApp instead of a "how much?" DM.

**Secondary actions.** Message on WhatsApp directly · browse the gallery by occasion · view price bands · save/share a design · follow on Instagram.

**Content model.**

```text
Product        name, slug, category(cake|pastry|cupcake|gift box), description,
               price band (from/to, CAD), sizes, flavours[], lead time, images[]
Gallery item   image, caption, occasion tag, flavour tag, related product
Occasion       birthday | wedding | baby shower | anniversary | corporate
Testimonial    quote, first name, occasion, date, optional photo
FAQ            question, answer, group (ordering|pickup|delivery|allergens|payment)
Enquiry        name, contact, occasion, event date, servings, flavour,
               budget band, inspiration upload, pickup/delivery, notes
```

**Must-have pages (v1).** Home · Cakes (custom celebration) · Naija Pastries & Loaves · Cupcakes & Gift Boxes · Gallery · Pricing & How Ordering Works · About (owner story + food-handler certification) · Order/Enquiry form · Contact & Pickup info · FAQ.

**Deliberately excluded from v1.** Online card checkout, real-time cake configurator with live pricing, customer accounts, blog, loyalty scheme, multi-language, delivery tracking, and anything requiring her to log in daily.

**Positioning line to design around** (draft, for owner approval): *Toronto celebration cakes with a Naija heart — baked in Etobicoke, made to order.*

---

## 10. Technical and operational recommendations

- **Stack.** Static-first, server-rendered React on the project's TanStack Start setup. Content in typed local data files for v1 — she has ~20 products, not 2,000. Add a lightweight CMS only if gap #10 says she'll use one.
- **Catalogue, not checkout, in v1.** Orders are custom, date-constrained, and capacity-limited; a naive cart would sell slots she can't fill. The enquiry form is the checkout.
- **WhatsApp is the spine.** Form submission composes a pre-filled `wa.me/16476202518` message *and* emails her a copy — no dashboard to check.
- **Payments (v2).** A Stripe or Square deposit link ($50 or 50%) issued after she confirms the date. Do not take money before she has confirmed capacity.
- **Local SEO is the highest-ROI technical work here**, and it must dodge the "Wendy's" head term entirely:
  - Target long-tail intent: *custom birthday cakes Etobicoke*, *Nigerian meat pies Toronto*, *Naija cake baker Toronto*, *baby shower cake Etobicoke*, *cake loaves Toronto*.
  - Per-page unique `<title>` under 60 chars and meta description under 160.
  - `LocalBusiness` + `Bakery` + `Product` + `FAQPage` JSON-LD; `areaServed` covering Etobicoke, Mississauga, Toronto West.
  - **Create and verify a Google Business Profile in week one** — for a pickup-only home bakery this will likely out-earn the website itself in the first 90 days.
- **Performance and images.** Mobile-first, real 4G budget: LCP under 2.5s. Cake photography is the product, so serve AVIF/WebP at multiple widths with lazy loading below the fold. Insist on high-res originals (gap #4); do not ship re-scraped Instagram JPEGs on a premium site.
- **Design direction.** Warm, appetite-led, editorial — deep berry/cocoa with cream and a single gold accent, generous photography, an expressive display face paired with a highly legible text face. Explicitly avoid the default pastel-cupcake template look and the generic purple-gradient SaaS aesthetic.
- **Accessibility.** WCAG AA contrast over photography, real form labels, keyboard-navigable gallery.
- **Admin workflow she can actually maintain.** Price bands and a "currently booking: <month>" banner must be editable in one obvious place. Everything else should be set-and-forget.

### 10a. Handle, brand-name and cross-channel consolidation (week one, before launch)

The site is only half the fix; four disconnected profiles pointing nowhere is the other half.

1. **Standardise on one handle: `wendys.bakehouse`.** It is already correct on Instagram, TikTok and Threads. Fix the Threads link on the Instagram profile (currently the mistyped `wends.bakehouse`), and claim the same stem on YouTube and Pinterest defensively even if unused.
2. **Resolve the two brand strings.** "Cakes in Toronto" (the TikTok display name) is the stronger search asset — descriptive, geo-qualified, and free of the fast-food collision — while "Wendy's Bakehouse" carries her existing recognition. Recommended: keep *Wendy's Bakehouse* as the name and use *Cakes in Toronto* as the standing descriptor in every display name, page title and meta description (`Wendy's Bakehouse — Custom Cakes in Toronto & Etobicoke`). Set the same display name on all four platforms.
3. **Fix the Facebook Page properly.** Claim a vanity URL, complete the name, category, service area, hours, price range and "Order" button, and cross-link it to the new site. It is currently an 18-digit URL nobody can share.
4. **Point every channel at the site.** One canonical link in every bio (Instagram, TikTok, Threads, Facebook), replacing "DM for price". This is the mechanism that converts 303 unwatched TikToks into traffic.
5. **Geo-qualify the domain.** Given the Scarborough UK and Melbourne AU namesakes plus the fast-food chain, the domain must carry a locality or category cue — e.g. `wendysbakehouse.ca`, `wendysbakehouseto.com` or `cakesintoronto.ca`. A bare `.com` on the brand name is unwinnable.
6. **Recycle the video library.** 303 TikTok videos become YouTube Shorts, Instagram Reels, and embedded process video on the site's product and about pages — premium-feeling content at zero production cost.
7. **Open a review loop.** Google Business Profile first, then ask every past customer for a review; the phone number and business currently have zero third-party validation anywhere on the web.

---

## 11. Phased build plan

**v1 — "Stop answering 'how much?'" (target ~1–2 weeks after blockers close)**
Brand direction, home, four catalogue pages, gallery, transparent price bands, structured enquiry form with WhatsApp + email handoff, FAQ, about/certification, full local SEO and schema, Google Business Profile setup, analytics.
*Held back deliberately:* payments and CMS — until we know her real capacity, payment habits and appetite for admin.

**v2 — "Take the deposit" (~1 week)**
Deposit payments via Stripe/Square, date-availability calendar reflecting real capacity, testimonials collected and published, image uploads on the enquiry form, seasonal promo module (so a $100 flash offer no longer contradicts the price page), simple CMS for products and prices.

**v3 — "Grow it" (~1–2 weeks)**
Fixed-price shippable/pickup-ready SKUs with true checkout (loaves, meat pie boxes, gift boxes — these *are* standardised and could be sold outright), email list and occasion reminders, corporate/wedding enquiry track with a lookbook, blog or recipe content targeting diaspora search terms, review-generation loop into Google.

---

## 12. Risks and assumptions

- **Capacity risk.** A working site could generate more enquiries than a solo baker can fulfil. Booking windows and a visible "currently booking" state are mandatory, not nice-to-have.
- **Brand-name risk.** She will never outrank the fast-food chain. If she is open to it, a distinguishing suffix in the trading name and domain (e.g. one that includes "Bakehouse" plus a locality or "Naija" cue) would materially improve findability. This is a business decision, not ours to make unilaterally.
- **Asset risk.** If no high-resolution photography exists, the premium tier is unachievable without a shoot — budget for one.
- **Regulatory risk.** Ontario rules for home-based food businesses (and any need for an inspected kitchen for delivery/retail sale) must be confirmed before we publish delivery or shipping claims. `Unknown`
- **Maintenance risk.** She posts daily to Instagram, so content effort is not the concern; a site she must log into is. Keep admin near-zero.
- **Research risk.** All findings derive from third-party Instagram mirrors and are unaudited by the owner. §7 item 6 in particular (no website/GBP/Facebook) needs her confirmation before we act on it.
- **Assumption.** The business intends to stay pickup-first in west Toronto. If she plans a storefront or nationwide shipping, §9 and §11 change materially.

---

## 13. Blocking questions for the owner

1. **What does every item actually cost?** Please send your full price list — loaves, meat pies, gift boxes, and cakes by size and tier, including delivery fees. Without real numbers the site can't do the one job that will save you the most time: answering "how much?" before you're asked.
2. **How many orders can you comfortably take in a week, and how much notice do you need?** The site will bring more enquiries; I need to throttle it to what you can genuinely bake, so you're never overbooked or forced to disappoint someone.
3. **Can you give us access to your Facebook page, and tell us where the "Order here" link in your bio points?** We found your Facebook page but it is set up so that we can only see it as a long string of numbers — no name, no reviews, no address. We also can't see where your bio link goes. If a Google listing, an Etsy shop or any other page already exists, we should improve it rather than build a rival that splits your customers and your search visibility.
3b. **Do you want to be known as "Wendy's Bakehouse" or "Cakes in Toronto"?** Right now your TikTok says one and your Instagram says the other. There is a fast-food chain and two other bakeries with your exact name, so the wording we settle on decides how easily people can find you on Google.
4. **How do customers pay you today, and do you take a deposit to hold a date?** This decides whether the site simply collects the request or also secures the booking with money up front.
5. **Can you send us your assets and permissions?** Specifically: the highest-quality original photos you still have (straight from your phone, not downloaded from Instagram), your logo if you have one, any colours or fonts you already use, screenshots of customer reviews or thank-you messages, any wording you're attached to — and written confirmation that we may use your existing social media images on the site.

---

## Appendix — sources retrieved

| Source | URL | What it gave |
|---|---|---|
| Picnob profile mirror | `https://www.picnob.com/profile/wendys.bakehouse/` | Bio, follower/following/post counts, captions, pricing |
| Picnob tagged mirror | `https://www.picnob.com/profile/wendys.bakehouse/tagged/` | `@thevendorplug.co` vendor listing (Etobicoke, "from $30+"), `@naijapreneurcanada` round-up |
| Imginn profile mirror | `https://imginn.com/wendys.bakehouse/` | Independent confirmation of bio and captions; "taken in Toronto, Ontario" geotags |
| Imginn reels mirror | `https://imginn.com/reels/wendys.bakehouse/` | Post dates, like/comment counts, promo terms, phone number |
| Instagram (direct) | `https://www.instagram.com/wendys.bakehouse/` | **Fetch failed** — site not supported by the retrieval service |
| Google Search | multiple queries | **Fetch failed** — automated-traffic block (HTTP 429) |
| DuckDuckGo | `https://html.duckduckgo.com/html/?q="wendys.bakehouse"` | **Fetch failed** — bot challenge |
| Bing | multiple queries | Retrieved, but returned only wendys.com fast-food results — no relevant hits |

---

## Appendix B — name-collision check and counter-figures (added 12 Aug 2026, second research pass)

**Confirmed unrelated businesses sharing the name.** A separate pass reached instagram.com directly and read the profile's page metadata, confirming the Toronto identity, and additionally identified same-name businesses that must **not** be conflated with this client:

- **Wendy's Bakehouse, Scarborough, North Yorkshire, UK** — a wholesale cake bakery with its own website, Facebook page, landline and trading address. `Verified`
- **Wendys Bakehouse, Melbourne, Australia** — a separate bakery with a Google review profile. `Verified`
- UK company records also show similarly named registered entities (Wendy's Bakes Ltd; Wendys Home Bakery Ltd, Northern Ireland). `Verified`

None shows any link — bio, tagged location, or cross-post — to `@wendys.bakehouse`. This strengthens §2's naming warning: the brand competes for its own name against a global fast-food chain **and** at least two same-name bakeries in other countries. It also means any domain and Google Business Profile work must be geo-qualified from day one.

**Counter-figures on audience.** Instagram's own page metadata read **596 followers / 838 following / 738 posts**, against the mirrors' 599 / 767 / 738. Post count agrees exactly; follower count differs by 3 (normal churn between snapshots). The following count differs by 71, most likely mirror-cache staleness. The conclusion in §4 is unchanged and in fact sharpened: the account follows substantially more accounts than follow it back.

**Also unconfirmed by the second pass:** the link-in-bio destination, any Google Business Profile, Facebook page, TikTok, or delivery-platform listing for the Toronto business — consistent with §4 and §7 item 6. These stay `Unknown` pending the owner's answer to blocking question 3.

---

## Appendix C — third research pass: disclosed channels and handle sweep (12 Aug 2026)

Triggered by the owner-side observation that the Instagram profile discloses a Facebook page, a Threads account and a TikTok account that the second pass missed. The master prompt has been amended so this class of miss cannot recur: it now requires exhausting every link the given profile itself exposes *before* searching outward, and running a fixed cross-platform handle-variant sweep whose results — including negatives — must appear in the footprint table.

**Method by channel**

| Channel | Method that worked | Method that failed |
|---|---|---|
| TikTok | oEmbed API (`author_name`, `author_url`) + embedded page JSON via headless browser | Third-party post APIs (403) |
| Threads | Headless browser on `threads.net/@wendys.bakehouse` | Plain curl (JS shell, no data) |
| Facebook | `graph.facebook.com/<id>/picture` 302 → live fbcdn image, proving the Page is real and current | Graph metadata (app token required), mbasic/m.facebook.com (login wall), scraper services |
| Handle sweep | HTTP status checks across X, YouTube, LinkedIn, Snapchat, Pinterest, Etsy, Linktree/Beacons/Stan | Etsy (403), Pinterest (200 for non-existent profiles — inconclusive) |
| Directories | Web search on business name, city and phone number | — |

**What changed in the report:** §1 (executive summary), §4 (rebuilt as a full checklist audit with new subsections 4a handle consistency and 4b same-name collisions), §7 (items 6–11, including an explicit retraction of the earlier "no Facebook / no TikTok" finding), §8 (gaps 6, 6b, 6c), §10a (new consolidation section), §13 (questions 3 and 3b).

**Still `Unknown` after this pass:** Facebook page name, audience, cadence, reviews and address block; the link-in-bio destination; the exact date of the most recent TikTok; whether an Etsy shop or Pinterest board exists; any Google Business Profile.
