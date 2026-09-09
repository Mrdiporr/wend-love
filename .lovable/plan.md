# Real prices, structured options, and a verified live order

Your answers turned this into two things: the immediate price work you asked for, and a much larger rebuild of how prices, options, deposits and delivery are calculated. I've split it so you get working real prices now, and the heavier engineering lands in ordered stages instead of one risky change.

## What you told me

- Loaves and small-chops items (meat/chicken pies, scotch eggs, sausage rolls, samosa, spring rolls, cocktail drinks) sit in the $25–$28 range. These go in as editable starting prices you can correct from the admin.
- Meat pies are sold **per pack**, and you must be able to set how many pies are in a pack when adding the product.
- Tiered cakes are priced **by size**, not by a vague band.
- Nothing should say "quoted", "price band", "DM for price" or "within 24 hours" anywhere on the site.

## Stage 1 — Real prices, live now

- Add the missing products to the catalogue with real numbers: cake loaves, meat pie packs, chicken pies, scotch eggs, sausage rolls, samosa, spring rolls, small-chops package with barbecued chicken, cocktail drinks. Loaf/small-chops items priced $25–$28, all fully editable in the admin afterwards.
- Tiered cakes get one real price per size instead of a range.
- Meat pies get a pack size ("12 per pack") that the admin sets, shown on the product card and carried into the order.
- Rewrite the pricing page as a real price list with the actual figures, and delete the "why prices are bands" explanation and the quoted-on-enquiry rows.
- Sweep the site for leftover "quoted" wording: home, menu, product pages, cart, checkout, the order page.

## Stage 2 — Structured options with real price effects

Right now an option like "8 inch" is just text and changes nothing. Rebuilt so:

- Every option group and every choice has a permanent internal identifier, so renaming "Size" to "Cake size" never breaks a saved order.
- Each choice can add money (e.g. 8 inch +$30, fondant +$25), can be marked unavailable, and groups can be marked required.
- The admin gets a proper option editor for this.
- Prices are always recalculated on our server from current product data — the browser can never send a price.

## Stage 3 — Payment rule and the deposit defect

- Full payment or deposit becomes an explicit choice the admin makes, not something guessed from whether a price is empty.
- Fixes the current bug where you enter a deposit but the product doesn't actually save as deposit-based.
- Blocks publishing a product with incomplete or contradictory payment settings (deposit larger than the price, negative values).

## Stage 4 — Delivery, checkout totals, and order history

- One delivery mode chosen by you: pickup only, fixed rates per postal-code zone, or distance-based rates. If we can't produce a real fee, checkout refuses rather than guessing.
- Checkout shows server-calculated line totals, subtotal, delivery, grand total, amount due now and balance — and recalculates once more at submit.
- Admin order history stores a frozen snapshot of what was bought and what it cost, so editing a product later never rewrites past orders.

## Stage 5 — End-to-end proof

I place a real bank-transfer order through checkout with a test payment slip, then confirm in /admin that it appears with the right reference, itemised lines, "pending verification" status and a viewable slip, and that marking it paid works. You get the order reference so you can see it yourself.

## Technical notes

- Option groups and choices move to normalized tables (`product_option_groups`, `product_option_choices`) rather than staying in the JSON column: JSON gives no referential integrity for the stable identifiers that saved orders must point at, and no clean way to enforce availability or price deltas. Existing JSON options are migrated across.
- `products` gains `payment_rule` (`full` | `deposit`), `pack_size`, and validation constraints; `pricing_mode` is derived from `payment_rule`, not from null prices.
- One canonical server-side pricing service takes only slug + quantity + choice ids, reloads authoritative rows, validates availability and required groups, and returns priced lines. `placeOrder` and checkout both call it.
- `order_items` stores immutable snapshots of the chosen options and their prices at purchase time.
- `/order` becomes a non-pricing enquiry/customisation form and stops acting as a second ordering system.
- Historical quote-mode orders stay untouched in the database.
