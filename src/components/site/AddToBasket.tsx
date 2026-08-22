import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { catalogQueryOptions, formatMoney, priceLabel } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export function AddToBasket({ slug }: { slug: string }) {
  const { data } = useQuery(catalogQueryOptions);
  const { add } = useCart();
  const [options, setOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const product = data?.products.find((p) => p.slug === slug);
  if (!product) return null;

  const due =
    product.pricing_mode === "fixed"
      ? product.price_cents
      : product.pricing_mode === "deposit"
        ? product.deposit_cents
        : null;

  return (
    <div className="rounded-[1.5rem] border border-border bg-secondary p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-2xl text-gold">{priceLabel(product)}</p>
        {product.pricing_mode === "deposit" && due != null && (
          <p className="text-sm text-muted-foreground">{formatMoney(due)} deposit holds your date</p>
        )}
        {product.pricing_mode === "quote" && (
          <p className="text-sm text-muted-foreground">Priced within 24 hours</p>
        )}
      </div>

      {product.options.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {product.options.map((group) => (
            <label key={group.label} className="block text-sm font-semibold">
              {group.label}
              <select
                value={options[group.label] ?? ""}
                onChange={(e) => setOptions((o) => ({ ...o, [group.label]: e.target.value }))}
                className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              >
                <option value="">No preference</option>
                {group.values.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold">
          Qty
          <input
            type="number"
            min={1}
            max={99}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(99, Number(e.target.value) || 1)))}
            className="ml-3 h-10 w-20 rounded-md border border-input bg-background px-3 text-sm font-normal"
          />
        </label>
        <button
          type="button"
          onClick={() => {
            const chosen = Object.fromEntries(
              Object.entries(options).filter(([, v]) => v !== ""),
            );
            add({
              slug: product.slug,
              name: product.name,
              quantity,
              pricing_mode: product.pricing_mode,
              price_cents: product.price_cents,
              deposit_cents: product.deposit_cents,
              options: chosen,
              image_key: product.image_key,
              image_url: product.image_url,
            });
            toast.success(`${product.name} added to your basket.`);
          }}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Add to basket
        </button>
        <Link to="/cart" className="text-sm font-semibold underline decoration-gold underline-offset-4">
          View basket
        </Link>
      </div>
    </div>
  );
}
