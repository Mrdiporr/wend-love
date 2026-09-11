import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { catalogQueryOptions, formatMoney, packLabel } from "@/lib/shop";
import { useCart } from "@/lib/cart";

export function AddToBasket({ slug }: { slug: string }) {
  const { data } = useQuery(catalogQueryOptions);
  const { add } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);

  const product = data?.products.find((p) => p.slug === slug);

  const unitCents = useMemo(() => {
    if (!product) return 0;
    const extras = (product.options ?? []).reduce((sum, group) => {
      const choice = group.choices.find((c) => c.key === selected[group.key]);
      return sum + (choice?.price_delta_cents ?? 0);
    }, 0);
    return (product.price_cents ?? 0) + extras;
  }, [product, selected]);

  if (!product) return null;

  const pack = packLabel(product);
  const isDeposit = product.payment_rule === "deposit" && product.deposit_cents != null;
  const dueNow = isDeposit ? product.deposit_cents! * quantity : unitCents * quantity;

  return (
    <div className="rounded-[1.5rem] border border-border bg-secondary p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="font-display text-2xl text-gold">{formatMoney(unitCents)}</p>
        {pack && <p className="text-sm text-muted-foreground">{pack}</p>}
        {isDeposit && (
          <p className="text-sm text-muted-foreground">
            {formatMoney(product.deposit_cents)} deposit holds your date
          </p>
        )}
      </div>

      {product.options.length > 0 && (
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {product.options.map((group) => (
            <label key={group.key} className="block text-sm font-semibold">
              {group.label}
              {group.required && <span className="text-gold"> *</span>}
              <select
                value={selected[group.key] ?? ""}
                onChange={(e) =>
                  setSelected((o) => ({ ...o, [group.key]: e.target.value }))
                }
                className="mt-2 h-10 w-full rounded-md border border-input bg-background px-3 text-sm font-normal"
              >
                <option value="">{group.required ? "Choose one" : "No preference"}</option>
                {group.choices.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                    {c.price_delta_cents !== 0
                      ? ` (${c.price_delta_cents > 0 ? "+" : "−"}${formatMoney(Math.abs(c.price_delta_cents))})`
                      : ""}
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
            const missing = product.options.find((g) => g.required && !selected[g.key]);
            if (missing) {
              toast.error(`Choose a ${missing.label.toLowerCase()} first.`);
              return;
            }
            const choices = product.options
              .filter((g) => selected[g.key])
              .map((g) => ({ group_key: g.key, choice_key: selected[g.key]! }));
            const labels = Object.fromEntries(
              product.options
                .filter((g) => selected[g.key])
                .map((g) => [
                  g.label,
                  g.choices.find((c) => c.key === selected[g.key])?.label ?? "",
                ]),
            );
            add({
              slug: product.slug,
              name: product.name,
              quantity,
              pricing_mode: isDeposit ? "deposit" : "fixed",
              price_cents: unitCents,
              deposit_cents: product.deposit_cents,
              choices,
              options: labels,
              image_key: product.image_key,
              image_url: product.image_url,
            });
            toast.success(`${product.name} added to your basket.`);
          }}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Add to basket — {formatMoney(dueNow)}
        </button>
        <Link to="/cart" className="text-sm font-semibold underline decoration-gold underline-offset-4">
          View basket
        </Link>
      </div>
    </div>
  );
}
