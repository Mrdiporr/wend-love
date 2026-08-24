import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const itemSchema = z.object({
  slug: z.string().min(1).max(120),
  quantity: z.number().int().min(1).max(99),
  options: z.record(z.string().max(80), z.string().max(200)).default({}),
  notes: z.string().trim().max(500).optional(),
});

const MAX_SLIP_BYTES = 5 * 1024 * 1024;

const slipSchema = z.object({
  filename: z.string().trim().min(1).max(160),
  content_type: z.enum(["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"]),
  data_base64: z.string().min(1).max(Math.ceil((MAX_SLIP_BYTES * 4) / 3) + 1024),
});

const orderSchema = z.object({
  customer_name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255).optional().or(z.literal("")),
  phone: z.string().trim().min(6).max(40),
  pickup_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  pickup_window: z.string().trim().max(60).optional(),
  fulfilment: z.enum(["pickup", "delivery"]),
  delivery_area: z.string().trim().max(160).optional(),
  occasion: z.string().trim().max(80).optional(),
  notes: z.string().trim().max(1000).optional(),
  allergies: z.string().trim().max(500).optional(),
  heard_from: z.string().trim().max(80).optional(),
  checkout_method: z.enum(["whatsapp", "bank_transfer"]),
  payer_name: z.string().trim().max(100).optional(),
  transfer_reference: z.string().trim().max(80).optional(),
  transfer_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  slip: slipSchema.optional(),
  items: z.array(itemSchema).min(1).max(30),
});

export type PlaceOrderInput = z.input<typeof orderSchema>;

function decodeBase64(data: string): Uint8Array {
  const clean = data.includes(",") ? data.slice(data.indexOf(",") + 1) : data;
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/** Reads a lead time such as "5 days" or "2 weeks" into whole days. */
export function leadTimeDays(text: string | null | undefined): number {
  if (!text) return 0;
  const match = /(\d+)\s*(day|week)/i.exec(text);
  if (!match) return 0;
  const n = Number(match[1]);
  return /week/i.test(match[2] ?? "") ? n * 7 : n;
}

function daysBetween(fromISO: string, toISO: string): number {
  const a = Date.parse(`${fromISO}T00:00:00Z`);
  const b = Date.parse(`${toISO}T00:00:00Z`);
  return Math.round((b - a) / 86_400_000);
}

export const placeOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const slugs = [...new Set(data.items.map((i) => i.slug))];
    const { data: products, error: productError } = await supabaseAdmin
      .from("products")
      .select("id, slug, name, pricing_mode, price_cents, deposit_cents, status, lead_time")
      .in("slug", slugs);

    if (productError) throw new Error("Could not load the menu right now. Please try again.");

    const bySlug = new Map((products ?? []).map((p) => [p.slug, p]));
    for (const item of data.items) {
      const product = bySlug.get(item.slug);
      if (!product || product.status !== "available") {
        throw new Error(`"${item.slug}" is no longer available. Please remove it and try again.`);
      }
    }

    // Lead time is enforced server-side from the product records.
    if (data.pickup_date) {
      const today = new Date().toISOString().slice(0, 10);
      const notice = daysBetween(today, data.pickup_date);
      if (notice < 0) throw new Error("Please choose a collection date in the future.");
      const required = Math.max(
        0,
        ...data.items.map((i) => leadTimeDays(bySlug.get(i.slug)?.lead_time)),
      );
      if (notice < required) {
        throw new Error(
          `Those items need at least ${required} day${required === 1 ? "" : "s"} notice. Please pick a later date.`,
        );
      }
    }

    // Prices always come from the database, never from the browser.
    let dueNow = 0;
    let subtotal = 0;
    let hasQuoteItems = false;
    const lines = data.items.map((item) => {
      const product = bySlug.get(item.slug)!;
      const mode = product.pricing_mode;
      if (mode === "fixed" && product.price_cents != null) {
        dueNow += product.price_cents * item.quantity;
        subtotal += product.price_cents * item.quantity;
      } else if (mode === "deposit" && product.deposit_cents != null) {
        dueNow += product.deposit_cents * item.quantity;
        subtotal += (product.price_cents ?? 0) * item.quantity;
      } else {
        hasQuoteItems = true;
      }
      return {
        product_id: product.id,
        product_slug: product.slug,
        name: product.name,
        quantity: item.quantity,
        unit_price_cents: product.price_cents,
        deposit_cents: product.deposit_cents,
        pricing_mode: mode,
        options: item.options,
        notes: item.notes ?? null,
      };
    });

    const reference = `WB-${new Date().getFullYear().toString().slice(2)}${Math.floor(
      100000 + Math.random() * 900000,
    )}`;

    const isTransfer = data.checkout_method === "bank_transfer";

    // Order + items are written in one database transaction.
    const { data: created, error: orderError } = await supabaseAdmin.rpc("create_order", {
      _order: {
        reference,
        customer_name: data.customer_name,
        email: data.email || null,
        phone: data.phone,
        pickup_date: data.pickup_date || null,
        pickup_window: data.pickup_window || null,
        fulfilment: data.fulfilment,
        delivery_area: data.delivery_area || null,
        occasion: data.occasion || null,
        notes: data.notes || null,
        allergies: data.allergies || null,
        heard_from: data.heard_from || null,
        subtotal_cents: subtotal,
        due_now_cents: dueNow,
        has_quote_items: hasQuoteItems,
        status: "new",
        checkout_method: data.checkout_method,
        payer_name: data.payer_name || null,
        transfer_reference: data.transfer_reference || null,
        transfer_date: data.transfer_date || null,
        payment_provider: isTransfer ? "bank_transfer" : "whatsapp",
        payment_status: isTransfer ? "pending_verification" : "not_paid",
      },
      _items: lines,
    });

    const order = Array.isArray(created) ? created[0] : created;
    if (orderError || !order) throw new Error("We could not save your order. Please try again.");

    let slipUploaded = false;
    if (data.slip) {
      const bytes = decodeBase64(data.slip.data_base64);
      if (bytes.byteLength > MAX_SLIP_BYTES) {
        throw new Error("That payment slip is larger than 5MB. Please upload a smaller file.");
      }
      const ext = data.slip.filename.split(".").pop()?.toLowerCase().slice(0, 5) || "jpg";
      const path = `${order.id}/slip.${ext}`;
      const { error: uploadError } = await supabaseAdmin.storage
        .from("payment-slips")
        .upload(path, bytes, { contentType: data.slip.content_type, upsert: true });
      if (uploadError) {
        // The order stands; it is simply flagged as missing evidence.
        await supabaseAdmin
          .from("orders")
          .update({ notes: [data.notes, "[Payment slip upload failed]"].filter(Boolean).join("\n") })
          .eq("id", order.id);
      } else {
        slipUploaded = true;
        await supabaseAdmin.from("orders").update({ slip_path: path }).eq("id", order.id);
      }
    }

    return {
      reference: order.reference,
      dueNowCents: dueNow,
      subtotalCents: subtotal,
      hasQuoteItems,
      slipUploaded,
      lines: lines.map((l) => ({
        name: l.name,
        quantity: l.quantity,
        pricing_mode: l.pricing_mode,
        unit_price_cents: l.unit_price_cents,
        deposit_cents: l.deposit_cents,
        options: l.options,
      })),
    };
  });
