CREATE OR REPLACE FUNCTION public.create_order(_order jsonb, _items jsonb)
 RETURNS TABLE(id uuid, reference text)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  new_id uuid;
  new_ref text;
BEGIN
  INSERT INTO public.orders (
    reference, customer_name, email, phone, pickup_date, pickup_window,
    fulfilment, delivery_area, occasion, notes, allergies, heard_from,
    subtotal_cents, due_now_cents, has_quote_items, status,
    checkout_method, payer_name, transfer_reference, transfer_date,
    payment_provider, payment_status,
    delivery_fee_cents, total_cents, balance_cents, delivery_postal_code, delivery_snapshot
  )
  SELECT
    o.reference, o.customer_name, o.email, o.phone, o.pickup_date, o.pickup_window,
    o.fulfilment, o.delivery_area, o.occasion, o.notes, o.allergies, o.heard_from,
    o.subtotal_cents, o.due_now_cents, o.has_quote_items, o.status,
    o.checkout_method, o.payer_name, o.transfer_reference, o.transfer_date,
    o.payment_provider, o.payment_status,
    coalesce(o.delivery_fee_cents, 0), coalesce(o.total_cents, 0), coalesce(o.balance_cents, 0),
    o.delivery_postal_code, coalesce(o.delivery_snapshot, '{}'::jsonb)
  FROM jsonb_to_record(_order) AS o(
    reference text, customer_name text, email text, phone text,
    pickup_date date, pickup_window text, fulfilment text, delivery_area text,
    occasion text, notes text, allergies text, heard_from text,
    subtotal_cents integer, due_now_cents integer, has_quote_items boolean,
    status text, checkout_method text, payer_name text, transfer_reference text,
    transfer_date date, payment_provider text, payment_status text,
    delivery_fee_cents integer, total_cents integer, balance_cents integer,
    delivery_postal_code text, delivery_snapshot jsonb
  )
  RETURNING public.orders.id, public.orders.reference INTO new_id, new_ref;

  INSERT INTO public.order_items (
    order_id, product_id, product_slug, name, quantity,
    unit_price_cents, deposit_cents, pricing_mode, options, notes,
    options_snapshot, base_price_cents, options_total_cents,
    line_total_cents, line_due_now_cents, payment_rule, pack_size
  )
  SELECT
    new_id, i.product_id, i.product_slug, i.name, i.quantity,
    i.unit_price_cents, i.deposit_cents, i.pricing_mode::pricing_mode,
    coalesce(i.options, '{}'::jsonb), i.notes,
    coalesce(i.options_snapshot, '[]'::jsonb), coalesce(i.base_price_cents, 0),
    coalesce(i.options_total_cents, 0), coalesce(i.line_total_cents, 0),
    coalesce(i.line_due_now_cents, 0), coalesce(i.payment_rule, 'full')::payment_rule, i.pack_size
  FROM jsonb_to_recordset(_items) AS i(
    product_id uuid, product_slug text, name text, quantity integer,
    unit_price_cents integer, deposit_cents integer, pricing_mode text,
    options jsonb, notes text, options_snapshot jsonb,
    base_price_cents integer, options_total_cents integer,
    line_total_cents integer, line_due_now_cents integer,
    payment_rule text, pack_size integer
  );

  RETURN QUERY SELECT new_id, new_ref;
END;
$function$;