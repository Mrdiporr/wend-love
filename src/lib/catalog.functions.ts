import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function publicClient() {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const url = process.env["SUPABASE_URL"]!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) {
          h.delete("Authorization");
        }
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

/** Public catalogue read: categories, available products and shop settings. */
export const getCatalog = createServerFn({ method: "GET" }).handler(async () => {
  const supabase = publicClient();

  const [cats, prods, settings] = await Promise.all([
    supabase.from("categories").select("*").eq("visible", true).order("sort_order"),
    supabase.from("products").select("*").eq("available", true).order("sort_order"),
    supabase
      .from("settings")
      .select("bank_account_name, bank_account_number, bank_name, bank_note, whatsapp_number")
      .limit(1)
      .maybeSingle(),
  ]);

  if (cats.error) throw new Error(cats.error.message);
  if (prods.error) throw new Error(prods.error.message);

  return {
    categories: cats.data ?? [],
    products: prods.data ?? [],
    settings: settings.data ?? null,
  };
});
