# Finish the admin console + hero swap

Discovery first: I read the existing admin server functions, the orders/products components, the shop helpers and the asset folder. Findings below drive a deliberately small change set.

## What already exists (verified)

- `src/lib/admin.functions.ts` is the authoritative backend: `ORDER_STATUSES`, `PAYMENT_STATUSES`, the allowed-transition maps (`nextOrderStatuses`, `nextPaymentStatuses`), `adminListOrders`, `adminUpdateOrder` (rejects illegal moves server-side), `adminDashboard` (real counters, due/collected money, best sellers, recent + upcoming), `adminListProducts` (returns products **and** categories), `adminSaveCategory`, `adminSaveProduct`, `adminDeleteProduct`, settings read/save. Roles are resolved server-side (`is_admin` / `is_staff`).
- `AdminProducts.tsx` already has the house pattern for search + status filter + dialog editing + skeletons + toasts. It is the template to copy, not to redesign.
- `AdminOrders.tsx` is the only place that contradicts the backend: it declares its own `STATUSES` and a stale `PAYMENT_STATUSES` (missing `pending_verification`), and offers every status regardless of the current one, so admins can pick moves the server will reject.
- `AdminDashboard.tsx` and `AdminCategories.tsx` do not exist. `adminDashboard` exists but nothing consumes it.
- `/admin` is one route with four flat tabs. No sidebar.
- Hero uses the bundled `@/assets/hero-cake.jpg`; the ten real photos live in `src/assets/cakes/` as CDN asset pointers, `cake-4.jpg` being the chosen one.

## The work

### 1. One authoritative transition source
Move the transition maps and status lists into a small client-safe module (`src/lib/order-status.ts`) and have `admin.functions.ts` import from it — same rules, one definition, no behaviour change server-side.

### 2. Admin Orders
- Status and payment dropdowns list only the current value plus its legal next moves, taken from that shared module.
- Search across reference, customer name, phone and email (client-side over the already-loaded list — the fetch is one query capped at 500 rows; no new data pattern).
- Status and payment filters using the shared lists, plus a Clear button; works combined with search.
- Rows disable while their own update is in flight; keep the existing mutation, toasts, slip signed-URL flow and detail dialog untouched.
- Distinguish "no orders yet" from "nothing matches these filters"; add an error state.

### 3. Admin Dashboard
New `AdminDashboard.tsx` consuming `adminDashboard` only — orders today, awaiting verification, new, baking, ready, upcoming pickups/deliveries, amount due, amount collected, best sellers, recent and upcoming orders. No invented metrics, existing card/badge/skeleton primitives, same loading/error treatment.

### 4. Admin Categories
New `AdminCategories.tsx` over `adminListProducts` (for the category rows) and `adminSaveCategory`. Supported operations only: list with product counts, create, edit name/slug/blurb/image/visibility/sort order. **No delete** — there is no delete endpoint and products reference categories.

### 5. Sidebar + routing
`/admin` becomes a layout with a sidebar (stacked on mobile) and child routes: Dashboard (`/admin`), Orders, Payments, Products, Categories, Settings. All stay under the existing `_authenticated` guard — no second auth or routing mechanism. Settings link is shown to admins only via `adminWhoAmI`, with the server check unchanged as the real boundary.

### 6. Hero
Swap the hero image to the red-and-gold cake (`cake-4`) using the existing asset-import convention. Same layout, ratio, CTAs and typography; alt text updated to describe the actual cake.

## Verification
Typecheck, then a Playwright pass signed in as admin: each admin route renders, sidebar active states, orders search/filter combinations including no-match and clear, a status change that succeeds and one that is no longer offered, category create/edit persisting, and the homepage hero rendering at mobile and desktop widths.
