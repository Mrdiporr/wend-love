# Wendy's Bakehouse — Responsive Wireframes v1

Breakpoints: **S** ≤ 640px (design target — most traffic arrives from Instagram
and TikTok on mobile), **M** 641–1023px, **L** ≥ 1024px.
Every screen keeps one persistent conversion path: *Start an order*.

Legend: `[ ]` container · `( )` control · `~` image · `···` repeated item.

---

## Global chrome

```text
L  [ WB · Wendy's Bakehouse | Cakes  Naija Pastries  Cupcakes & Gifts  Gallery  Pricing  About  (Start an order) ]
S  [ WB · Wendy's Bakehouse                                                    (Order)  (☰) ]
     ☰ opens a full-height cocoa sheet: links stacked, phone + WhatsApp at base.
Sticky on S: bottom bar -> (Start an order)  (WhatsApp)
Booking banner (all sizes, dismissible): "Now booking <month> · pickup in Etobicoke"
Footer: lockup · pickup/lead-time facts · Certified Food Handler badge ·
        nav columns · IG/TikTok/Threads/Facebook · phone · legal line
```

---

## 1. Homepage `/`

```text
S                                   L
[ ~ hero cake, cocoa scrim ]        [ ~ hero 7col | copy block 5col ]
  eyebrow: NOW BOOKING AUGUST         same content, split editorial layout
  H1  Toronto celebration cakes
      with a Naija heart
  lead + (Start an order) (Menu)
  proof strip: Certified Food Handler · Pickup Etobicoke · From $30
[ Shop by category ]                3-up card row
  ··· Cakes / Naija Pastries / Cupcakes & Gift Boxes  (image, price band, link)
[ Price bands at a glance ]         2-col table, gold figures
  6" 2-layer $130–$150 · cupcakes 6 $35 · themed 12 $75 · from $30+
[ How ordering works ]              4 numbered steps, horizontal
  1 Tell me the details  2 I confirm the date + price
  3 Pay to hold the slot 4 Collect in Etobicoke
[ Signature bakes ~ 2-col grid ]    4-col grid, mixed sizes
[ Why order here ]                  3 columns: certified · made to order · dual menu
[ From the kitchen ]                Instagram/TikTok strip, 6 thumbs
[ CTA band, berry ]                 full-bleed: headline + (Start an order) (WhatsApp)
```

## 2. Menu / catalogue `/menu`

```text
[ Page head: Menu — prices published, no DMs required ]
[ Filters ]  S: horizontal scroll chips   L: chips row + result count
   (All) (Celebration cakes) (Naija pastries) (Cupcakes) (Gift boxes)
[ Grid ]  S 1-col · M 2-col · L 3-col
   ··· card: ~image / name (Fraunces) / price band (gold) /
             one-line description / lead time micro / (View details)
[ Note ]  "Prices are bands — final quote depends on size, finish and date."
[ CTA band ]
```

## 3. Product detail `/menu/$slug`

```text
S                                    L
[ ~ image, 4:3 ]                     [ ~ 6col sticky | detail 6col ]
[ breadcrumb ]
[ H1 name ]
[ price band, gold, Fraunces 34 ]
[ lead time · pickup Etobicoke ]
[ description, 68ch ]
[ Options: sizes / flavours as chips ]
[ What's included / good to know list ]
[ (Start an order for this)  (Ask on WhatsApp) ]   <- prefilled with product
[ Ordering terms accordion: deposit, lead time, allergens, delivery ]
[ You might also like ··· 3 cards ]
```

## 4. Order / price-enquiry flow `/order`

Four steps, one screen each on S, progress rail on L. State survives back/forward.
No account, no payment — the output is a complete brief.

```text
Step 1 · What are we baking
   (category) (product, optional) (occasion) (servings/size) (flavour chips)
   (design notes) — chips are large tap targets on S
Step 2 · When and where
   (event date, min lead time enforced) (pickup | delivery)
   (delivery area, conditional) (preferred pickup window)
Step 3 · Your details
   (name) (phone) (email, optional) (how you found me) (budget band)
   (allergy notes)
Step 4 · Review and send
   [ Summary card: every answer, editable ]
   (Send on WhatsApp — primary)  (Copy the brief)  (Start again)
   -> Confirmation panel: "Pickup-ready next steps"
      1 I reply with a firm quote within 24h
      2 Pay to hold your date
      3 Collect at the Etobicoke pickup point, <date>, <window>
      + reference code · pickup address released on confirmation
Inline validation on blur; the primary button is disabled with a stated reason,
never silently.
```

## 5. Contact `/contact`

```text
[ H1 Contact & pickup ]
[ 2-col L / stacked S ]
   left : phone (tap-to-call), WhatsApp, Instagram/TikTok/Threads/Facebook,
          response time, "Now booking" state
   right: pickup — Etobicoke, exact address on confirmation;
          delivery — quoted by postcode; lead times table
[ FAQ accordion: ordering · pickup · delivery · payment · allergens ]
[ CTA band ]
```

## 6. About `/about`

```text
[ ~ portrait/kitchen | story 68ch ]
[ Certified Food Handler badge + what it means ]
[ The Naija side of the menu — cultural positioning ]
[ Process: 3 steps with process video stills ]
[ CTA band ]
```

---

## Responsive rules

- Mobile-first; the sticky bottom action bar exists on S only.
- Images: 4:3 in grids, 3:2 hero on L, 1:1 on S. `loading="lazy"` below fold.
- Tap targets ≥ 44px; form controls full-width on S.
- Tables become stacked label/value pairs below 640px.
- No horizontal scroll except the deliberate filter-chip rail.

## Accessibility

Single H1 per page · real `<label>` for every field · errors linked with
`aria-describedby` · visible 2px gold focus ring · accordions as native
`<details>` or ARIA-correct buttons · text over photography on a ≥60% scrim.
