import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ShieldCheck, MapPin, Clock, Sparkles } from "lucide-react";
const HERO_IMAGE = "/__l5e/assets-v1/8923ea7e-5d90-481c-9e35-e680b6e6c761/cake-4.jpg";
import { BUSINESS, PRICE_BANDS } from "@/data/catalog";
import {
  CtaBand,
  Eyebrow,
  ProductCard,
  ProductCardSkeleton,
  Section,
} from "@/components/site/Bits";
import { SmartImage } from "@/components/site/SmartImage";
import { catalogQueryOptions, categoryImage } from "@/lib/shop";

const TITLE = "Wendy's Bakehouse — Custom Cakes in Toronto & Etobicoke";
const DESC =
  "Toronto celebration cakes with a Naija heart. Custom cakes from $130, cupcakes from $35, meat pies and cake loaves — made to order for pickup in Etobicoke.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const STEPS = [
  { n: "01", t: "Tell me the details", d: "Flavour, size, date and the look you want — through the order form or WhatsApp." },
  { n: "02", t: "I confirm date and price", d: "A firm quote comes back within 24 hours, with your pickup window." },
  { n: "03", t: "Pay to hold the slot", d: "Payment secures your date. I only take what I can bake properly." },
  { n: "04", t: "Collect in Etobicoke", d: "Address shared on confirmation. Delivery is available for a fee." },
];

function Index() {
  const { data, isPending } = useQuery(catalogQueryOptions);
  const products = data?.products ?? [];
  const categories = data?.categories ?? [];
  const signature = products.slice(0, 4);


  return (
    <>
      <section className="relative bg-cocoa text-cocoa-foreground">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 md:grid-cols-12 md:items-center md:py-24">
          <div className="md:col-span-5 md:order-2">
            <img
              src={HERO_IMAGE}
              alt="Red and gold buttercream celebration cake with gold leaf and fresh florals"
              className="aspect-[4/5] w-full rounded-[1.75rem] object-cover"
            />
          </div>
          <div className="md:col-span-7 md:order-1">
            <Eyebrow>Now booking {BUSINESS.bookingMonth}</Eyebrow>
            <h1 className="mt-5 text-[2.5rem] leading-[1.03] md:text-6xl">
              Toronto celebration cakes with a{" "}
              <span className="text-gold">Naija</span> heart.
            </h1>
            <p className="mt-6 max-w-[56ch] text-lg text-cocoa-foreground/75">
              Made to order in Etobicoke by a Certified Food Handler. Custom cakes, cupcakes and
              gift boxes alongside the meat pies and cake loaves you grew up on — with the prices
              written down, so you never have to DM to find out.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/order"
                className="rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Start an order
              </Link>
              <Link
                to="/menu"
                className="rounded-sm border border-cocoa-foreground/30 px-6 py-3.5 text-sm font-semibold transition-colors hover:border-gold hover:text-gold"
              >
                See the menu &amp; prices
              </Link>
            </div>
            <ul className="mt-10 grid gap-4 border-t border-cocoa-foreground/15 pt-6 text-sm text-cocoa-foreground/75 sm:grid-cols-3">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-gold" aria-hidden="true" /> Certified Food Handler
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold" aria-hidden="true" /> Pickup in Etobicoke
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" aria-hidden="true" /> Gift boxes from $30
              </li>
            </ul>
          </div>
        </div>
      </section>

      <Section>
        <Eyebrow>Shop by collection</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-4xl">Two collections, one kitchen.</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/menu"
              search={{ category: c.slug }}
              className="group overflow-hidden rounded-[1.5rem] border border-border bg-card p-2"
            >
              <SmartImage
                src={categoryImage(c, products)}
                alt={c.name}
                ratio="aspect-[4/3]"
                className="transition-transform duration-300 group-hover:scale-[1.03]"
              />
              <div className="p-5">
                <h3 className="font-display text-xl group-hover:text-primary">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
              </div>
            </Link>
          ))}
        </div>

      </Section>

      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>Prices at a glance</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl">No &ldquo;DM for price&rdquo;.</h2>
            <p className="mt-5 max-w-[46ch] text-muted-foreground">
              These are honest bands. Size, finish and detail move the final number, and the quote
              you get back is firm — but you should know roughly what you are spending before you
              type a message.
            </p>
            <Link
              to="/pricing"
              className="mt-6 inline-block border-b-2 border-gold pb-1 text-sm font-semibold"
            >
              Full pricing &amp; lead times
            </Link>
          </div>
          <div className="md:col-span-7">
            <dl className="divide-y divide-border border-y border-border">
              {PRICE_BANDS.map((row) => (
                <div key={row.item} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="text-sm md:text-base">{row.item}</dt>
                  <dd className="shrink-0 font-display text-lg text-gold">{row.price}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section>
        <Eyebrow>How ordering works</Eyebrow>
        <h2 className="mt-4 text-3xl md:text-4xl">Four steps, one conversation.</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-4">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-2 border-gold/50 pt-5">
              <span className="font-display text-3xl text-gold">{s.n}</span>
              <h3 className="mt-3 font-display text-xl">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="sand">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>Signature bakes</Eyebrow>
            <h2 className="mt-4 text-3xl md:text-4xl">Most-ordered this season.</h2>
          </div>
          <Link to="/menu" className="border-b-2 border-gold pb-1 text-sm font-semibold">
            View the whole menu
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isPending
            ? Array.from({ length: 4 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : signature.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>

      </Section>

      <Section tone="cocoa">
        <Eyebrow>Why order here</Eyebrow>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          <div>
            <ShieldCheck className="h-6 w-6 text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">Certified and careful</h3>
            <p className="mt-3 text-cocoa-foreground/70">
              Ontario Certified Food Handler. Everything is baked to order for your date — nothing
              is pulled out of a freezer.
            </p>
          </div>
          <div>
            <Sparkles className="h-6 w-6 text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">Both sides of the table</h3>
            <p className="mt-3 text-cocoa-foreground/70">
              A fondant birthday cake and three dozen meat pies can come from the same order. Very
              few Toronto bakers do both properly.
            </p>
          </div>
          <div>
            <Clock className="h-6 w-6 text-gold" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl">Dates you can trust</h3>
            <p className="mt-3 text-cocoa-foreground/70">
              Bookings run by the month with a fixed pickup window, so your slot is real and your
              cake is ready when you arrive.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
