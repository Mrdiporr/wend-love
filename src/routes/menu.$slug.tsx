import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, MessageCircle } from "lucide-react";
import { BUSINESS, PRODUCTS } from "@/data/catalog";
import { CtaBand, ProductCard, Section } from "@/components/site/Bits";
import { AddToBasket } from "@/components/site/AddToBasket";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/menu/$slug")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found — Wendy's Bakehouse" }, { name: "robots", content: "noindex" }],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Wendy's Bakehouse, Toronto`;
    const desc = `${product.short} ${product.priceBand}. ${product.lead}. Pickup in Etobicoke, Toronto.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: ProductNotFound,
  component: ProductPage,
});

function ProductNotFound() {
  return (
    <Section>
      <h1 className="text-4xl">That bake isn&rsquo;t on the menu</h1>
      <p className="mt-4 text-muted-foreground">
        It may have been renamed or retired. The full menu is still here.
      </p>
      <Link
        to="/menu"
        search={{}}
        className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
      >
        Back to the menu
      </Link>
    </Section>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 3);

  const waText = encodeURIComponent(
    `Hi Wendy, I'd like to order: ${product.name} (${product.priceBand}). Could you send me a quote?`,
  );

  return (
    <>
      <Section className="!py-0">
        <nav aria-label="Breadcrumb" className="pt-10 text-sm text-muted-foreground">
          <Link to="/menu" search={{}} className="hover:text-primary">
            Menu
          </Link>
          <span className="px-2 text-gold">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 py-10 md:grid-cols-12 md:py-14">
          <div className="md:col-span-6">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-[1.75rem] object-cover md:sticky md:top-28"
            />
          </div>

          <div className="md:col-span-6">
            <h1 className="text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-5 font-display text-3xl text-gold">{product.priceBand}</p>
            {product.priceNote && (
              <p className="mt-2 text-sm text-muted-foreground">{product.priceNote}</p>
            )}
            <p className="eyebrow mt-4 text-[11px] text-muted-foreground">
              {product.lead} · Pickup in Etobicoke
            </p>

            <p className="mt-6 max-w-[64ch] text-base leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <AddToBasket slug={product.slug} />
            </div>


            <div className="mt-8 space-y-5">
              {product.options.map((opt) => (
                <div key={opt.label}>
                  <h2 className="eyebrow text-muted-foreground">{opt.label}</h2>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {opt.values.map((v) => (
                      <li
                        key={v}
                        className="rounded-sm border border-input bg-secondary px-3 py-1.5 text-sm"
                      >
                        {v}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <ul className="mt-8 space-y-2 border-t border-border pt-6 text-sm">
              {product.includes.map((i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  {i}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/order"
                search={{ product: product.slug }}
                className="rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground"
              >
                Start an order for this
              </Link>
              <a
                href={`${BUSINESS.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-sm border border-input px-6 py-3.5 text-sm font-semibold"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Ask on WhatsApp
              </a>
            </div>

            <Accordion type="single" collapsible className="mt-10">
              <AccordionItem value="terms">
                <AccordionTrigger>Ordering terms</AccordionTrigger>
                <AccordionContent>
                  Your date is held once the quote is agreed and payment is received. Bookings run
                  by the month with a fixed pickup window.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="pickup">
                <AccordionTrigger>Pickup &amp; delivery</AccordionTrigger>
                <AccordionContent>
                  Pickup is in Etobicoke, Toronto; the exact address is sent once your date is
                  confirmed. Delivery across west Toronto is available for an additional fee,
                  quoted by postcode.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="allergens">
                <AccordionTrigger>Allergens</AccordionTrigger>
                <AccordionContent>
                  Baked in a single kitchen that handles wheat, dairy, egg and nuts, so cross-contact
                  cannot be ruled out. Tell me about allergies when you order.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="sand">
          <h2 className="text-3xl">You might also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
