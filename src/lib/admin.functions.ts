import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

async function assertAdmin(context: { supabase: unknown; userId: string }) {
  const supabase = context.supabase as {
    rpc: (fn: string) => Promise<{ data: unknown; error: unknown }>;
  };
  const { data } = await supabase.rpc("is_admin");
  if (data !== true) throw new Error("Forbidden");
}

/** Orders list with their items, newest first. */
export const adminListOrders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*, order_items(*)")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

/** Short-lived signed URL for a payment slip. */
export const adminSlipUrl = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ path: z.string().min(1).max(300) }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: signed, error } = await supabaseAdmin.storage
      .from("payment-slips")
      .createSignedUrl(data.path, 60 * 30);
    if (error || !signed) throw new Error("Could not open that slip.");
    return { url: signed.signedUrl };
  });

export const adminUpdateOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["new", "confirmed", "baking", "ready", "collected", "cancelled"]).optional(),
        payment_status: z.enum(["not_paid", "paid", "refunded"]).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: { status?: string; payment_status?: string } = {};
    if (data.status) patch.status = data.status;
    if (data.payment_status) patch.payment_status = data.payment_status;
    const { error } = await supabaseAdmin.from("orders").update(patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });


/** Full product list, including unavailable items. */
export const adminListProducts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [prods, cats] = await Promise.all([
      supabaseAdmin.from("products").select("*").order("sort_order"),
      supabaseAdmin.from("categories").select("*").order("sort_order"),
    ]);
    if (prods.error) throw new Error(prods.error.message);
    if (cats.error) throw new Error(cats.error.message);
    return { products: prods.data ?? [], categories: cats.data ?? [] };
  });

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers and hyphens"),
  name: z.string().trim().min(2).max(120),
  category_id: z.string().uuid().nullable(),
  short: z.string().trim().max(240).default(""),
  description: z.string().trim().max(4000).default(""),
  price_cents: z.number().int().min(0).max(10_000_00).nullable(),
  deposit_cents: z.number().int().min(0).max(10_000_00).nullable(),
  lead_time: z.string().trim().max(80).default(""),
  serves: z.string().trim().max(80).nullable(),
  image_url: z.string().trim().max(500).nullable(),
  available: z.boolean(),
  sort_order: z.number().int().min(0).max(9999),
});

export const adminSaveProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => productSchema.parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const row = {
      slug: data.slug,
      name: data.name,
      category_id: data.category_id,
      short: data.short,
      description: data.description,
      pricing_mode: (data.price_cents != null ? "fixed" : "quote") as "fixed" | "quote",
      price_cents: data.price_cents,
      deposit_cents: data.deposit_cents,
      lead_time: data.lead_time,
      serves: data.serves,
      image_url: data.image_url,
      available: data.available,
      sort_order: data.sort_order,
    };

    if (data.id) {
      const { error } = await supabaseAdmin.from("products").update(row).eq("id", data.id);
      if (error) throw new Error(error.message);
      return { ok: true, id: data.id };
    }
    const { data: created, error } = await supabaseAdmin
      .from("products")
      .insert(row)
      .select("id")
      .single();
    if (error || !created) throw new Error(error?.message ?? "Could not create the product.");
    return { ok: true, id: created.id };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => z.object({ id: z.string().uuid() }).parse(data))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminGetSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin.from("settings").select("*").limit(1).maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

export const adminSaveSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        bank_account_name: z.string().trim().max(120),
        bank_account_number: z.string().trim().max(60),
        bank_name: z.string().trim().max(120),
        bank_note: z.string().trim().max(400),
        whatsapp_number: z.string().trim().max(40),
      })
      .parse(data),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { id, ...patch } = data;
    const { error } = await supabaseAdmin.from("settings").update(patch).eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
