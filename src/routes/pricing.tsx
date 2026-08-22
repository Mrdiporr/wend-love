import { createFileRoute, Link } from "@tanstack/react-router";
import { PRICE_BANDS, PRODUCTS } from "@/data/catalog";
import { CtaBand, PageHeader, Section } from "@/components/site/Bits";

const TITLE = "Pricing & Lead Times — Wendy's Bakehouse, Toronto";
const DESC =
  "Published price bands for custom cakes, cupcakes, gift boxes and Nigerian pastries in Toronto, plus lead times, deposits and pickup terms in Etobicoke.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const LEADS = [
  ["Cupcakes, loaves, meat pies, gift boxes", "3–5 days"],
  ["Custom celebration cakes", "5–7 days"],
  ["Party trays and bulk pastry orders", "1–2 weeks"],
  ["Wedding and tiered cakes", "4–8 weeks"],
];

function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="What things cost, before you message."
        lead="Every price here is in CAD and stated as a band. The band is honest about the range; the quote you get back is a firm number for your size, finish and date."
      />

      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-3xl">Price bands</h2>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {PRICE_BANDS.map((row) => (
                <div key={row.item} className="flex items-baseline justify-between gap-6 py-4">
                  <dt>{row.item}</dt>
                  <dd className="shrink-0 font-display text-lg text-gold">{row.price}</dd>
                </div>
              ))}
            </dl>

            <h2 className="mt-14 text-3xl">Lead times</h2>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {LEADS.map(([item, lead]) => (
                <div key={item} className="flex items-baseline justify-between gap-6 py-4">
                  <dt>{item}</dt>
                  <dd className="shrink-0 font-display text-lg text-gold">{lead}</dd>
                </div>
              ))}
            </dl>
          </div>

          <aside className="md:col-span-5">
            <div className="rounded-lg border border-border bg-secondary p-6">
              <h2 className="font-display text-2xl">How the money works</h2>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li>
                  <strong className="text-foreground">Quote first.</strong> You get a firm price
                  before any money moves.
                </li>
                <li>
                  <strong className="text-foreground">Payment holds the date.</strong> Slots are
                  held in the order they are paid for, and bookings run by the month.
                </li>
                <li>
                  <strong className="text-foreground">Pickup is free</strong> in Etobicoke.
                  Delivery across west Toronto is quoted by postcode.
                </li>
                <li>
                  <strong className="text-foreground">What moves a price:</strong> size and tiers,
                  fondant versus buttercream, sugar work, rush dates, and quantity for pastries.
                </li>
              </ul>
              <Link
                to="/order"
                className="mt-7 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
              >
                Get your firm quote
              </Link>
            </div>
          </aside>
        </div>

        <h2 className="mt-16 text-3xl">Item by item</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="eyebrow py-3 text-muted-foreground">Item</th>
                <th scope="col" className="eyebrow py-3 text-muted-foreground">Price</th>
                <th scope="col" className="eyebrow py-3 text-muted-foreground">Notice</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.slug} className="border-b border-border">
                  <th scope="row" className="py-4 font-medium">
                    <Link to="/menu/$slug" params={{ slug: p.slug }} className="hover:text-primary">
                      {p.name}
                    </Link>
                  </th>
                  <td className="py-4 font-display text-base text-gold">{p.priceBand}</td>
                  <td className="py-4 text-muted-foreground">{p.lead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
