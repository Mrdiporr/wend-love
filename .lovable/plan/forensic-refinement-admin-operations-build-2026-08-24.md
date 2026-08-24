# Forensic refinement & admin operations build

I inspected the live database, storage, policies and the current code before writing this. Below is what is actually true today, then the work.

## What the inspection found

**Schema (live)** — `categories`, `products`, `orders`, `order_items`, `settings`, `user_roles` all exist and match the repo types. Enums: `app_role` = admin, staff; `pricing_mode` = fixed, deposit, quote. No drift found, so no rebuild migration is needed.

**Data** — 10 products, 2 categories, 1 admin user, 0 orders. Nothing to preserve destructively.

**Security (verified good)** — bank fields are unreachable from the public API (`settings` has no table grants at all); both storage buckets are private; admin server functions run through service role after an `is_admin()` check; `has_role()` execute is revoked from visitors.

**Real gaps found**

1. `pricing_mode` supports deposit, but the admin product editor writes only `fixed` or `quote` — a deposit product edited in admin silently loses its deposit mode.
2. The admin payment toggle offers only not paid / paid / refunded, while checkout writes `pending_verification`. Transfer orders land in a state the admin UI cannot represent.
3. Product delete is a hard delete, and `order_items.product_id` points at products — deleting a sold cake risks historical orders.
4. `getBankDetails` is an open, unauthenticated endpoint. Checkout needs it, but it should be reachable only as part of a checkout context, not as a bare public call.
5. The admin console is three flat tabs; there is no dashboard, no order search/filtering, no dedicated payment queue, no category or fulfillment view.
6. The homepage hero still uses the old generated cake render.

## The work

### P0 — integrity (no destructive migrations)

- Admin product editor gains an explicit **Fixed / Deposit / Quote** selector, showing price, deposit, price band and price note fields only where they apply. Saving writes the chosen mode verbatim.
- Payment lifecycle becomes **not paid → pending verification → paid**, plus refunded, everywhere: checkout, admin badges and the verification action. Invalid jumps are blocked server-side.
- Products get an **archived** state. Archive replaces delete as the normal action; hard delete stays only for products never ordered, and is blocked with a clear message otherwise.
- Order creation writes order + items in one server-side transaction via a security-definer RPC, so a partial order can never be left behind. Slip upload stays a separate step and a failed upload leaves the order intact and flagged.
- Server-side validation of pickup date and lead time at order placement, using the product lead times already in the database. No new business policies invented.

### P1 — admin console

New shell at `/admin` with sidebar navigation on desktop, stacked on mobile:

- **Dashboard** — orders today, awaiting payment verification, baking, ready for pickup, upcoming pickups/deliveries, amount due, best sellers. All derived from real order rows; no placeholder metrics.
- **Orders** — searchable, filterable (status, payment, fulfilment, date) sortable table; detail sheet with reference, customer, contact, items with quantities and options, pricing, payment evidence, fulfilment, notes and allergies; workflow buttons that only offer valid next states.
- **Payments** — dedicated verification queue: payer name, transfer reference, transfer date, amount, slip thumbnail opening full size through a short-lived signed URL, verify / return to unpaid, jump to order.
- **Products** — full field set including slug, category, both descriptions, pricing mode, price, deposit, band, note, lead time, serves, options, includes, image, availability and sort order.
- **Categories** — name, slug, blurb, image, visible, reorder.
- **Fulfilment** — pickup and delivery grouped by date with window, area, instructions and state.
- **Settings** — bank details and WhatsApp number, admin-only.

Staff role sees orders, fulfilment and payment verification; bank settings, product deletion and role management stay admin-only, enforced in every server function rather than by hiding buttons.

### Hero image

The homepage hero swaps to the red-and-gold "50 & Fabulous" buttercream cake (cake 4) — it is the strongest brand-matching shot, with the Wendy's Bakehouse watermark, gold leaf and a clean white background that suits the cocoa hero panel. Served from the CDN with the same fixed ratio and skeleton treatment as the rest of the catalogue.

## Technical notes

- One small additive migration: `product_status` (available/unavailable/archived) on products, extended payment status check, an atomic `place_order` security-definer function, and staff-scoped policies. No table drops, no column removals.
- `getBankDetails` moves behind the order/checkout server function boundary and returns only when a checkout session is in progress.
- Admin data goes through TanStack Query with invalidation on every mutation, existing Shadcn primitives only, each view with loading, empty, error and success states.
- Regression pass with Playwright over customer checkout (both channels) and the admin flows, plus build and typecheck, before I report back.

Where a business decision is missing (real bank details, delivery fees, capacity limits) I will leave clearly labelled placeholders rather than invent values.
