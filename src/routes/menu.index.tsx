import { createFileRoute, Link } from "@tanstack/react-router";
import { CATEGORIES, PRODUCTS, type CategoryId } from "@/data/catalog";
import { CtaBand, PageHeader, ProductCard, Section } from "@/components/site/Bits";

const TITLE = "Menu & Prices — Wendy's Bakehouse, Cakes in Toronto";
const DESC =
  "Browse celebration cakes, Nigerian meat pies, cake loaves, cupcakes and gift boxes with published price bands and lead times. Pickup in Etobicoke, Toronto.";

type Search = { category?: CategoryId };

export const Route = createFileRoute("/menu/")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const c = search["category"];
    const valid: CategoryId[] = ["cakes", "pastries", "cupcakes", "gift-boxes"];
    return valid.includes(c as CategoryId) ? { category: c as CategoryId } : {};
  },
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
  component: MenuPage,
});

function MenuPage() {
  const { category } = Route.useSearch();
  const items = category ? PRODUCTS.filter((p) => p.category === category) : PRODUCTS;

  return (
    <>
      <PageHeader
        eyebrow="Menu"
        title="The whole menu, with the prices written down."
        lead="Celebration cakes, Naija pastries, cupcakes and gift boxes. Prices are bands — the quote you get back is a firm number for your size, finish and date."
      />

      <Section>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/menu"
            search={{}}
            className={`rounded-sm border px-4 py-2 text-sm font-medium ${
              category ? "border-input" : "border-primary bg-primary text-primary-foreground"
            }`}
          >
            All
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.id}
              to="/menu"
              search={{ category: c.id }}
              className={`rounded-sm border px-4 py-2 text-sm font-medium ${
                category === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input"
              }`}
            >
              {c.name}
            </Link>
          ))}
          <span className="ml-auto text-sm text-muted-foreground">{items.length} items</span>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <p className="mt-10 max-w-[70ch] text-sm text-muted-foreground">
          Prices shown in CAD. Loaves, meat pies and party trays are quoted on enquiry because
          quantity changes the rate — ask and you will get a number the same day, not a runaround.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
