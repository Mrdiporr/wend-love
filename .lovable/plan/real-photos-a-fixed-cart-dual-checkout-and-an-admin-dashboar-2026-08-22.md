# Real photos, a fixed cart, dual checkout, and an admin dashboard

The remixed copy has an empty database (no products, no orders, no admin user) and a placeholder-image catalogue. This plan replaces the imagery with your ten real cake photos, tightens the cart and checkout, adds a bank-transfer payment path with slip upload, and builds a full admin dashboard.

Prices stay in CAD.

## 1. Real photography

- Upload all ten cake photos to CDN storage and use them as the product imagery across home, menu, product pages, cart and checkout — no more placeholder renders.
- Every image container gets a fixed aspect ratio (square for grid cards, 4:3 for feature blocks) so nothing jumps while loading, plus a shimmer skeleton until the photo is ready.
- Responsive grids: 1 column on phones, 2 on tablets, 3–4 on desktop.

## 2. Seed the catalogue

Create ten products from the photos with sensible names, descriptions, serving sizes and CAD prices (for example: Baileys Bottle Cake, Hot Wheels Birthday Cake, Tropical Getaway Cake, 50 & Fabulous Red/Gold, Graduation Gold Drip, Royal Blue & Pearls, Wild One Safari, Butterfly Lilac, Peony Buttercream, Monochrome Palm). All fields are editable later from the admin, so the seeded copy is a starting point you can rewrite.

## 3. Cart engine

- Audit and remove any flat-rate/deposit shortcut so the basket total is always quantity x unit price, summed live.
- Add a slide-out cart drawer reachable from the header on every page, showing line items, quantity steppers and a running subtotal that updates instantly.
- The cart page and checkout summary read from the same single source of truth.

## 4. Two ways to pay

Checkout gets a clean tabbed selector with exactly two channels:

**WhatsApp** — keeps the existing redirect, but the message is rebuilt as a neatly spaced itemised receipt: each item with quantity and price, then the grand total and the customer's pickup details.

**Bank transfer** — shows account name, account number and bank name with a one-click "Copy account number" button, then collects sender name and transaction date/reference, plus an upload for the payment slip (PNG, JPG or PDF, max 5MB, with preview and progress). The order is saved with status "Not paid — pending verification" and the slip attached.

Note: you didn't give the bank details, so I'll put clear placeholders in and make them editable from the admin settings screen — tell me the real ones any time and they can be filled in.

## 5. Admin dashboard at /admin

Sign-in with `admin@wendysbakehouse.ca`; I'll create that account and grant it the admin role. Only admins can open the dashboard or touch admin data.

- **Orders table** — order reference, customer, date, total, checkout method (WhatsApp / Transfer) and a payment status badge, with search and status filters.
- **Order detail sheet** — click any row for the itemised breakdown, customer contact, pickup/delivery details, notes and allergies.
- **Payment verification** — for transfers, the sender name, date and reference sit beside a clickable thumbnail of the uploaded slip (opens full size); a prominent Paid / Not Paid toggle updates the order instantly.
- **Product manager** — create, edit and delete cakes: name, description, price, category, availability and image upload.
- **Settings** — bank transfer details and WhatsApp number.

## 6. Polish

Everything is built with the existing Shadcn components (Tabs, Dialog, Sheet, Table, Badge, Skeleton, Button) and checked on mobile and desktop: the checkout flow is thumb-friendly on a phone, the dashboard uses a sidebar layout on desktop and stacks into cards on small screens.

## Technical notes

- Storage: new public `payment-slips` bucket (admin-read, anonymous insert restricted to the order server function); product images continue through the existing `product-images` bucket and its proxy route.
- Schema: add `checkout_method`, `payer_name`, `transfer_reference`, `transfer_date`, `slip_path` to `orders`; extend `payment_status` to include `pending_verification` / `paid`; new `settings` table for bank details, all with GRANTs and admin-only RLS.
- Orders are still priced server-side in `placeOrder` — the browser never sets prices. Slip upload goes through a validated server function (type + 5MB cap enforced server-side too).
- Admin routes live under `src/routes/_authenticated/admin/*` with an `is_admin()` check in every admin server function, not just the route guard.
- Product/order mutations use TanStack Query with cache invalidation so the table updates the moment a status changes.
