-- 1. Product lifecycle -------------------------------------------------
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'available';

UPDATE public.products SET status = CASE WHEN available THEN 'available' ELSE 'unavailable' END;

ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_status_check;
ALTER TABLE public.products
  ADD CONSTRAINT products_status_check
  CHECK (status IN ('available','unavailable','archived'));

CREATE OR REPLACE FUNCTION public.sync_product_available()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.available := (NEW.status = 'available');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS products_sync_available ON public.products;
CREATE TRIGGER products_sync_available
  BEFORE INSERT OR UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.sync_product_available();

-- 2. Order lifecycle ----------------------------------------------------
UPDATE public.orders SET payment_status = 'not_paid'
  WHERE payment_status NOT IN ('not_paid','pending_verification','paid','refunded');

ALTER TABLE public.orders ALTER COLUMN payment_status SET DEFAULT 'not_paid';

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_payment_status_check;
ALTER TABLE public.orders
  ADD CONSTRAINT orders_payment_status_check
  CHECK (payment_status IN ('not_paid','pending_verification','paid','refunded'));

UPDATE public.orders SET status = 'new'
  WHERE status NOT IN ('new','confirmed','baking','ready','collected','cancelled');

ALTER TABLE public.orders DROP CONSTRAINT IF EXISTS orders_status_check;
ALTER TABLE public.orders
  ADD CONSTRAINT orders_status_check
  CHECK (status IN ('new','confirmed','baking','ready','collected','cancelled'));

-- 3. Atomic order creation ---------------------------------------------
CREATE OR REPLACE FUNCTION public.create_order(_order jsonb, _items jsonb)
RETURNS TABLE (id uuid, reference text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id uuid;
  new_ref text;
BEGIN
  INSERT INTO public.orders (
    reference, customer_name, email, phone, pickup_date, pickup_window,
    fulfilment, delivery_area, occasion, notes, allergies, heard_from,
    subtotal_cents, due_now_cents, has_quote_items, status,
    checkout_method, payer_name, transfer_reference, transfer_date,
    payment_provider, payment_status
  )
  SELECT
    o.reference, o.customer_name, o.email, o.phone, o.pickup_date, o.pickup_window,
    o.fulfilment, o.delivery_area, o.occasion, o.notes, o.allergies, o.heard_from,
    o.subtotal_cents, o.due_now_cents, o.has_quote_items, o.status,
    o.checkout_method, o.payer_name, o.transfer_reference, o.transfer_date,
    o.payment_provider, o.payment_status
  FROM jsonb_to_record(_order) AS o(
    reference text, customer_name text, email text, phone text,
    pickup_date date, pickup_window text, fulfilment text, delivery_area text,
    occasion text, notes text, allergies text, heard_from text,
    subtotal_cents integer, due_now_cents integer, has_quote_items boolean,
    status text, checkout_method text, payer_name text, transfer_reference text,
    transfer_date date, payment_provider text, payment_status text
  )
  RETURNING public.orders.id, public.orders.reference INTO new_id, new_ref;

  INSERT INTO public.order_items (
    order_id, product_id, product_slug, name, quantity,
    unit_price_cents, deposit_cents, pricing_mode, options, notes
  )
  SELECT
    new_id, i.product_id, i.product_slug, i.name, i.quantity,
    i.unit_price_cents, i.deposit_cents, i.pricing_mode::pricing_mode,
    coalesce(i.options, '{}'::jsonb), i.notes
  FROM jsonb_to_recordset(_items) AS i(
    product_id uuid, product_slug text, name text, quantity integer,
    unit_price_cents integer, deposit_cents integer, pricing_mode text,
    options jsonb, notes text
  );

  RETURN QUERY SELECT new_id, new_ref;
END;
$$;

REVOKE ALL ON FUNCTION public.create_order(jsonb, jsonb) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.create_order(jsonb, jsonb) TO service_role;

-- 4. Staff role ---------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_staff()
RETURNS boolean
LANGUAGE sql
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND role IN ('admin','staff')
  );
$$;

DROP POLICY IF EXISTS "staff read orders" ON public.orders;
CREATE POLICY "staff read orders" ON public.orders
  FOR SELECT TO authenticated USING (public.is_staff());

DROP POLICY IF EXISTS "staff update orders" ON public.orders;
CREATE POLICY "staff update orders" ON public.orders
  FOR UPDATE TO authenticated USING (public.is_staff()) WITH CHECK (public.is_staff());

DROP POLICY IF EXISTS "staff read order items" ON public.order_items;
CREATE POLICY "staff read order items" ON public.order_items
  FOR SELECT TO authenticated USING (public.is_staff());

DROP POLICY IF EXISTS "staff read products" ON public.products;
CREATE POLICY "staff read products" ON public.products
  FOR SELECT TO authenticated USING (public.is_staff());

DROP POLICY IF EXISTS "staff read categories" ON public.categories;
CREATE POLICY "staff read categories" ON public.categories
  FOR SELECT TO authenticated USING (public.is_staff());

-- 5. Settings stay private ---------------------------------------------
DROP POLICY IF EXISTS "public can read settings" ON public.settings;
REVOKE ALL ON public.settings FROM anon, authenticated;
GRANT ALL ON public.settings TO service_role;