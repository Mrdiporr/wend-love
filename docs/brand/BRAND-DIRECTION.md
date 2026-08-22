# Wendy's Bakehouse — Brand Direction v1

Derived from `docs/research/wendys-bakehouse-discovery-report.md` (12 Aug 2026).
Scope: visual and verbal system for the v1 website. All decisions trace to a
finding in the discovery report; anything the report labels `Unknown` is flagged
here as **owner approval required**.

---

## 1. Strategic constraints the brand must solve

| Constraint (report ref) | Design consequence |
|---|---|
| "Wendy's" collides with the global fast-food chain (§2) | Never lead with the word "Wendy's" alone, never use red-and-yellow, never use a rounded friendly-diner voice. Always lock the name to a descriptor: **Wendy's Bakehouse — Cakes in Toronto**. |
| Dual market: mainstream Toronto + Nigerian diaspora (§2, §7-5) | One brand, two entry doors. Neither market gets a "sub-brand"; the Naija range is presented with the same premium treatment as the celebration cakes. |
| Every competitor looks like a pastel Instagram template (§6) | Deliberately dark, editorial, appetite-led. Cream-on-berry, not berry-on-white. |
| Zero third-party validation; no reviews, no GBP (§7-10) | Trust must be designed in: food-handler certification, published price bands, explicit pickup terms, clear lead times. |
| Solo operator, capacity-constrained (§12) | "Currently booking" state is a first-class brand element, not fine print. |
| Price transparency is the core value (§9) | Prices are typographic heroes, never buried. Bands, never single figures (§7-4). |

---

## 2. Positioning

**Positioning line (draft — owner approval required):**
> Toronto celebration cakes with a Naija heart. Baked to order in Etobicoke.

**Descriptor used in every display name, page title and bio:**
`Wendy's Bakehouse — Custom Cakes in Toronto & Etobicoke`

**Proof points, always within one scroll of a CTA:** Certified Food Handler ·
Made to order, never frozen · Pickup in Etobicoke, delivery on request ·
Transparent price bands · Booking by the month.

---

## 3. Colour

Pink, gold and brownish gold. Blush carries the page, a confident pink carries
action and brand, gold marks value and craft, and brownish gold (bronze/cocoa
gold) is the dark editorial canvas behind photography.

| Token | Role | oklch |
|---|---|---|
| `--background` | Blush cream page | `oklch(0.978 0.012 350)` |
| `--foreground` | Warm brown ink | `oklch(0.27 0.04 45)` |
| `--primary` | Pink — brand, CTAs | `oklch(0.56 0.16 355)` |
| `--accent` / `--gold` | Gold — value marks, rules, prices | `oklch(0.76 0.12 82)` |
| `--bronze` | Brownish gold — ornament, secondary marks | `oklch(0.52 0.09 70)` |
| `--secondary` | Soft blush surface | `oklch(0.945 0.024 350)` |
| `--cocoa` | Brownish-gold dark canvas (hero/footer) | `oklch(0.26 0.05 62)` |

Rules
- Pink is for action and brand marks. Gold is for **prices, rules, small caps and
  ornament only** — never a button fill, never body text.
- Photography always sits on cocoa or berry, never on cream: the food is the
  brightest thing on the page.
- Contrast: body text meets WCAG AA on every surface; any text over photography
  sits on a cocoa scrim at ≥60% opacity.
- No pastel pinks/mint/baby-blue. No gradients other than the cocoa scrim.

## 4. Typography

| Role | Face | Usage |
|---|---|---|
| Display | **Fraunces** (variable serif, soft optical axis) | H1–H3, price figures, pull quotes. Weight 500–700, tight tracking (-0.02em) at large sizes. |
| Text | **Karla** | Body, navigation, forms, buttons. 400/500/700. |
| Micro | Karla, uppercase, 0.16em tracking, 12px | Eyebrows, section labels, badges, "currently booking". |

- Scale (mobile → desktop): 32→64 display, 24→34 section, 18→20 lead, 16 body,
  14 small, 12 micro. Body line-height 1.65, display 1.05.
- Never set Fraunces below 18px; never set Karla above 28px.
- Numerals in prices: Fraunces, tabular where aligned in tables.

## 5. Logo and lockups

Wordmark-first — no cupcake icon, no script font, no chef's hat.

1. **Primary lockup (stacked):** `WENDY'S` in Karla small caps, gold, above
   `Bakehouse` in Fraunces 600, cream/berry — with a hairline gold rule and the
   descriptor `CAKES IN TORONTO · ETOBICOKE` beneath.
2. **Horizontal lockup (header/footer):** `Wendy's Bakehouse` in Fraunces with a
   gold interpunct and the micro descriptor set beside it. Minimum width 180px.
3. **Monogram (avatar, favicon, stamp on photography):** `WB` in Fraunces inside a
   1px gold ring on cocoa. Minimum 24px.

Clear space equal to the cap-height of "B" on all sides. Never stretch, outline,
recolour outside the palette, or place the wordmark on unscrimmed photography.

## 6. Photography and art direction

- Dark, warm, single-source side light; cocoa or berry surfaces; shallow depth.
- One hero subject per frame. Crumbs, parchment, gold leaf, matte brass props.
- The Naija range (meat pies, cake loaves, small chops) gets the **same** dark
  editorial treatment as the celebration cakes — this is the brand's core
  cultural statement and must not read as an afterthought.
- Ban: white marble flat-lays, pastel confetti, sparkler stock, over-saturated
  HDR, watermarks, re-scraped Instagram JPEGs (report §10, asset risk).
- Formats: AVIF/WebP, multiple widths, `loading="lazy"` below the fold.

## 7. Layout and components

- Editorial grid: 12 columns desktop, generous 24–32px gutters, content max
  1200px; long-form text capped at 68ch.
- Radius: 6px on buttons and inputs, 24px on cards, 18-28px on imagery. Curves, never hard edges.
- Rules and dividers: 1px gold at 40% opacity.
- Buttons: primary = berry fill, cream text; secondary = 1px cocoa outline;
  tertiary = gold underline link. Focus ring is always visible (2px gold).
- Cards: cocoa or sand surface, image top, name in Fraunces, price band in gold,
  one-line description, lead time as micro text.
- Motion: 150–250ms ease-out fades and 8px rises only. No parallax, no bouncing.

## 8. Voice

Warm, direct, a maker speaking in first person. Culturally at ease — Nigerian
register is welcome in headlines and product names, never explained or
apologised for. Prices stated plainly. No exclamation stacking, no "yummy",
no emoji in body copy (one is fine in a badge).

Say: *"Meat pies, flaky and made the day you collect them."*
Not: *"Our delicious homemade meat pies are simply the best in town!!!"*

**Never write "DM for price"** anywhere on the site — removing that phrase is the
entire commercial point of the project (report §1).

## 9. Naming and cross-channel rules

- Trading name stays **Wendy's Bakehouse**; **Cakes in Toronto** becomes the
  standing descriptor on all four platforms, in `<title>` tags and in meta
  descriptions (report §10a).
- Handle stem `wendys.bakehouse` everywhere; fix the mistyped Threads link.
- Domain must be geo- or category-qualified (`wendysbakehouse.ca` preferred).

## 10. Open items requiring owner approval

1. Positioning line wording.
2. Final prices for loaves, meat pies, gift boxes and tiered cakes (report gap 1).
3. Photography: shoot booked, or v1 ships with placeholder art direction.
4. Domain choice.
5. Whether "Cakes in Toronto" may appear as the descriptor on Instagram.
