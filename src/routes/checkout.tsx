import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { PageHeader, Section } from "@/components/site/Bits";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/lib/cart";
import { formatMoney } from "@/lib/shop";
import { BUSINESS } from "@/data/catalog";
import { placeOrder } from "@/lib/orders.functions";

const TITLE = "Checkout — Wendy's Bakehouse, Cakes in Toronto";
const DESC =
  "Confirm your pickup details and place your bakery order for collection in Etobicoke, Toronto.";

export const Route = createFileRoute("/checkout")({
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
  component: CheckoutPage,
});

function minDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().slice(0, 10);
}

function CheckoutPage() {
  const { items, dueNowCents, hasQuoteItems, clear } = useCart();
  const submitOrder = useServerFn(placeOrder);

  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ reference: string; dueNowCents: number } | null>(null);
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    email: "",
    pickup_date: "",
    pickup_window: "Flexible",
    fulfilment: "pickup" as "pickup" | "delivery",
    delivery_area: "",
    occasion: "",
    notes: "",
    allergies: "",
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (done) {
    return (
      <>
        <PageHeader
          eyebrow={`Order ${done.reference}`}
          title="Your order is in the book."
          lead="Here is what happens next."
        />
        <Section>
          <ol className="max-w-[70ch] space-y-6">
            <li className="border-t border-border pt-5">
              <h2 className="font-display text-xl">Confirmation within 24 hours</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Wendy confirms your date and sends the final price for any quoted items on{" "}
                {form.phone || "your number"}.
              </p>
            </li>
            <li className="border-t border-border pt-5">
              <h2 className="font-display text-xl">
                {done.dueNowCents > 0 ? `Payment of ${formatMoney(done.dueNowCents)}` : "Payment"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                A secure card payment link is sent with your confirmation. Payment holds the date.
              </p>
            </li>
            <li className="border-t border-border pt-5">
              <h2 className="font-display text-xl">Collection in Etobicoke</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The pickup address is released once your order is confirmed.
              </p>
            </li>
          </ol>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={BUSINESS.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Message Wendy on WhatsApp
            </a>
            <Link to="/menu" search={{}} className="rounded-sm border border-input px-5 py-3 text-sm font-semibold">
              Back to the menu
            </Link>
          </div>
        </Section>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <PageHeader eyebrow="Checkout" title="There is nothing to check out yet." />
        <Section>
          <Link
            to="/menu"
            search={{}}
            className="rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Browse the menu
          </Link>
        </Section>
      </>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Checkout"
        title="Your details and your pickup slot."
        lead="Fixed-price items are charged in full, custom cakes take a deposit, and quoted items are priced in your confirmation."
      />

      <Section>
        <form
          className="grid gap-10 md:grid-cols-12"
          onSubmit={async (e) => {
            e.preventDefault();
            if (busy) return;
            setBusy(true);
            try {
              const result = await submitOrder({
                data: {
                  customer_name: form.customer_name,
                  phone: form.phone,
                  email: form.email || undefined,
                  pickup_date: form.pickup_date || undefined,
                  pickup_window: form.pickup_window,
                  fulfilment: form.fulfilment,
                  delivery_area: form.fulfilment === "delivery" ? form.delivery_area : undefined,
                  occasion: form.occasion || undefined,
                  notes: form.notes || undefined,
                  allergies: form.allergies || undefined,
                  items: items.map((i) => ({
                    slug: i.slug,
                    quantity: i.quantity,
                    options: i.options,
                    notes: i.notes,
                  })),
                },
              });
              clear();
              setDone({ reference: result.reference, dueNowCents: result.dueNowCents });
            } catch (error) {
              toast.error(
                error instanceof Error ? error.message : "Something went wrong. Please try again.",
              );
            } finally {
              setBusy(false);
            }
          }}
        >
          <div className="space-y-6 md:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Your name</Label>
                <Input
                  id="name"
                  required
                  maxLength={100}
                  value={form.customer_name}
                  onChange={(e) => set("customer_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  required
                  maxLength={40}
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input
                id="email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date">Date you need it</Label>
                <Input
                  id="date"
                  type="date"
                  min={minDate()}
                  value={form.pickup_date}
                  onChange={(e) => set("pickup_date", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="window">Preferred window</Label>
                <select
                  id="window"
                  value={form.pickup_window}
                  onChange={(e) => set("pickup_window", e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                >
                  {["Morning", "Afternoon", "Evening", "Flexible"].map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>
            </div>

            <fieldset className="space-y-2">
              <legend className="text-sm font-semibold">Collection</legend>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    ["pickup", "Pickup in Etobicoke"],
                    ["delivery", "Delivery (quoted)"],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => set("fulfilment", value)}
                    className={`rounded-sm border px-4 py-2.5 text-sm font-medium ${
                      form.fulfilment === value
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input bg-card"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </fieldset>

            {form.fulfilment === "delivery" && (
              <div className="space-y-2">
                <Label htmlFor="area">Delivery area</Label>
                <Input
                  id="area"
                  maxLength={160}
                  value={form.delivery_area}
                  onChange={(e) => set("delivery_area", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="occasion">Occasion (optional)</Label>
              <Input
                id="occasion"
                maxLength={80}
                value={form.occasion}
                onChange={(e) => set("occasion", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Design notes (optional)</Label>
              <Textarea
                id="notes"
                maxLength={1000}
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies (optional)</Label>
              <Input
                id="allergies"
                maxLength={500}
                value={form.allergies}
                onChange={(e) => set("allergies", e.target.value)}
              />
            </div>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-[1.5rem] border border-border bg-secondary p-6">
              <h2 className="eyebrow text-muted-foreground">Your order</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {items.map((item, i) => (
                  <li key={`${item.slug}-${i}`} className="flex justify-between gap-4">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span className="shrink-0 text-muted-foreground">
                      {item.pricing_mode === "quote" ? "Quoted" : ""}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex justify-between border-t border-border pt-4">
                <span className="text-sm font-semibold">Due at confirmation</span>
                <span className="font-display text-xl">{formatMoney(dueNowCents)}</span>
              </div>
              {hasQuoteItems && (
                <p className="mt-3 text-xs text-muted-foreground">
                  Quoted items are priced in your confirmation within 24 hours.
                </p>
              )}
              <button
                type="submit"
                disabled={busy}
                className="mt-6 w-full rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
              >
                {busy ? "Placing your order…" : "Place order"}
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                Card payment is sent as a secure link with your confirmation.
              </p>
            </div>
          </aside>
        </form>
      </Section>
    </>
  );
}
