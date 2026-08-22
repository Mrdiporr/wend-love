import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { PageHeader, Section } from "@/components/site/Bits";
import { useCart, lineDueCents } from "@/lib/cart";
import { formatMoney, imageSrc } from "@/lib/shop";

const TITLE = "Your basket — Wendy's Bakehouse, Cakes in Toronto";
const DESC =
  "Review your cakes, cupcakes, meat pies and gift boxes before checkout. Pickup in Etobicoke, Toronto.";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, setQuantity, dueNowCents, hasQuoteItems } = useCart();

  return (
    <>
      <PageHeader
        eyebrow="Basket"
        title="Everything you've picked so far."
        lead="Fixed-price items are paid in full. Custom cakes take a deposit to hold the date, and quoted items are priced within 24 hours."
      />

      <Section>
        {items.length === 0 ? (
          <div className="rounded-[1.5rem] border border-border bg-card p-10 text-center">
            <p className="font-display text-2xl">Your basket is empty.</p>
            <Link
              to="/menu"
              search={{}}
              className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-12">
            <ul className="space-y-5 md:col-span-8">
              {items.map((item, i) => (
                <li
                  key={`${item.slug}-${i}`}
                  className="flex gap-4 rounded-[1.5rem] border border-border bg-card p-4"
                >
                  <img
                    src={imageSrc(item)}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-[1.15rem] object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="font-display text-lg">{item.name}</h2>
                    {Object.entries(item.options).length > 0 && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {Object.entries(item.options)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" · ")}
                      </p>
                    )}
                    {item.notes && <p className="mt-1 text-sm text-muted-foreground">{item.notes}</p>}
                    <div className="mt-3 flex flex-wrap items-center gap-3">
                      <div className="inline-flex items-center rounded-sm border border-input">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          onClick={() => setQuantity(i, item.quantity - 1)}
                          className="p-2"
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          onClick={() => setQuantity(i, item.quantity + 1)}
                          className="p-2"
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(i)}
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg text-gold">
                      {lineDueCents(item) > 0 ? formatMoney(lineDueCents(item)) : "Quoted"}
                    </p>
                    {item.pricing_mode === "deposit" && (
                      <p className="mt-1 text-xs text-muted-foreground">deposit</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <aside className="md:col-span-4">
              <div className="rounded-[1.5rem] border border-border bg-secondary p-6">
                <h2 className="eyebrow text-muted-foreground">Summary</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt>Due at checkout</dt>
                    <dd className="font-display text-lg">{formatMoney(dueNowCents)}</dd>
                  </div>
                  {hasQuoteItems && (
                    <div className="text-muted-foreground">
                      Some items are quoted — you&rsquo;ll get a firm price within 24 hours.
                    </div>
                  )}
                </dl>
                <Link
                  to="/checkout"
                  className="mt-6 block rounded-sm bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
                >
                  Continue to checkout
                </Link>
                <Link
                  to="/menu"
                  search={{}}
                  className="mt-3 block text-center text-sm text-muted-foreground hover:text-primary"
                >
                  Keep browsing
                </Link>
              </div>
            </aside>
          </div>
        )}
      </Section>
    </>
  );
}
