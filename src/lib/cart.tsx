import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { PricingMode } from "@/lib/shop";

export type CartItem = {
  slug: string;
  name: string;
  quantity: number;
  pricing_mode: PricingMode;
  price_cents: number | null;
  deposit_cents: number | null;
  options: Record<string, string>;
  notes?: string;
  image_key?: string | null;
  image_url?: string | null;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  dueNowCents: number;
  hasQuoteItems: boolean;
  add: (item: CartItem) => void;
  remove: (index: number) => void;
  setQuantity: (index: number, quantity: number) => void;
  clear: () => void;
};

const STORAGE_KEY = "wb-cart-v1";
const CartContext = createContext<CartContextValue | null>(null);

function lineDueCents(item: CartItem): number {
  if (item.pricing_mode === "fixed" && item.price_cents != null) {
    return item.price_cents * item.quantity;
  }
  if (item.pricing_mode === "deposit" && item.deposit_cents != null) {
    return item.deposit_cents * item.quantity;
  }
  return 0;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      /* ignore malformed storage */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const add = useCallback((item: CartItem) => {
    setItems((current) => {
      const key = JSON.stringify([item.slug, item.options]);
      const idx = current.findIndex((c) => JSON.stringify([c.slug, c.options]) === key);
      if (idx >= 0) {
        const next = [...current];
        next[idx] = { ...next[idx]!, quantity: next[idx]!.quantity + item.quantity };
        return next;
      }
      return [...current, item];
    });
  }, []);

  const remove = useCallback((index: number) => {
    setItems((current) => current.filter((_, i) => i !== index));
  }, []);

  const setQuantity = useCallback((index: number, quantity: number) => {
    setItems((current) =>
      current.map((item, i) => (i === index ? { ...item, quantity: Math.max(1, Math.min(99, quantity)) } : item)),
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      dueNowCents: items.reduce((n, i) => n + lineDueCents(i), 0),
      hasQuoteItems: items.some((i) => lineDueCents(i) === 0),
      add,
      remove,
      setQuantity,
      clear,
    }),
    [items, add, remove, setQuantity, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export { lineDueCents };
