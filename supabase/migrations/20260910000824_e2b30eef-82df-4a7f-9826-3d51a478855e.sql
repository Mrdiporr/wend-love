-- Payment rule -----------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE public.payment_rule AS ENUM ('full', 'deposit');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.delivery_mode AS ENUM ('pickup_only', 'fixed_zones', 'distance');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS payment_rule public.payment_rule NOT NULL DEFAULT 'full',
  ADD COLUMN IF NOT EXISTS pack_size integer,
  ADD COLUMN IF NOT EXISTS pack_unit text;

UPDATE public.products SET payment_rule = 'deposit' WHERE pricing_mode = 'deposit';

ALTER TABLE public.products
  DROP CONSTRAINT IF EXISTS products_price_non_negative,
  DROP CONSTRAINT IF EXISTS products_deposit_non_negative,
  DROP CONSTRAINT IF EXISTS products_deposit_within_price,
  DROP CONSTRAINT IF EXISTS products_pack_size_positive;

ALTER TABLE public.products
  ADD CONSTRAINT products_price_non_negative CHECK (price_cents IS NULL OR price_cents >= 0),
  ADD CONSTRAINT products_deposit_non_negative CHECK (deposit_cents IS NULL OR deposit_cents >= 0),
  ADD CONSTRAINT products_deposit_within_price CHECK (
    payment_rule <> 'deposit' OR (price_cents IS NOT NULL AND deposit_cents IS NOT NULL AND deposit_cents <= price_cents)
  ),
  ADD CONSTRAINT products_pack_size_positive CHECK (pack_size IS NULL OR pack_size > 0);

-- Option groups -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.product_option_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  key text NOT NULL,
  label text NOT NULL,
  required boolean NOT NULL DEFAULT false,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (product_id, key)
);

GRANT SELECT ON public.product_option_groups TO anon;
GRANT SELECT ON public.product_option_groups TO authenticated;
GRANT ALL ON public.product_option_groups TO service_role;
ALTER TABLE public.product_option_groups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read option groups" ON public.product_option_groups
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage option groups" ON public.product_option_groups
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER product_option_groups_updated_at BEFORE UPDATE ON public.product_option_groups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE IF NOT EXISTS public.product_option_choices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id uuid NOT NULL REFERENCES public.product_option_groups(id) ON DELETE CASCADE,
  key text NOT NULL,
  label text NOT NULL,
  price_delta_cents integer NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (group_id, key)
);

GRANT SELECT ON public.product_option_choices TO anon;
GRANT SELECT ON public.product_option_choices TO authenticated;
GRANT ALL ON public.product_option_choices TO service_role;
ALTER TABLE public.product_option_choices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public can read option choices" ON public.product_option_choices
  FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "admins manage option choices" ON public.product_option_choices
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER product_option_choices_updated_at BEFORE UPDATE ON public.product_option_choices
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX IF NOT EXISTS product_option_groups_product_idx ON public.product_option_groups(product_id);
CREATE INDEX IF NOT EXISTS product_option_choices_group_idx ON public.product_option_choices(group_id);

-- Migrate existing JSON options into the normalized tables ------------------
INSERT INTO public.product_option_groups (product_id, key, label, required, sort_order)
SELECT p.id,
       'g' || g.ord::text,
       coalesce(g.value ->> 'label', 'Option ' || g.ord::text),
       false,
       g.ord - 1
FROM public.products p
CROSS JOIN LATERAL jsonb_array_elements(coalesce(p.options, '[]'::jsonb)) WITH ORDINALITY AS g(value, ord)
WHERE jsonb_typeof(coalesce(p.options, '[]'::jsonb)) = 'array'
ON CONFLICT (product_id, key) DO NOTHING;

INSERT INTO public.product_option_choices (group_id, key, label, sort_order)
SELECT og.id,
       'c' || c.ord::text,
       c.value #>> '{}',
       c.ord - 1
FROM public.products p
CROSS JOIN LATERAL jsonb_array_elements(coalesce(p.options, '[]'::jsonb)) WITH ORDINALITY AS g(value, ord)
JOIN public.product_option_groups og ON og.product_id = p.id AND og.key = 'g' || g.ord::text
CROSS JOIN LATERAL jsonb_array_elements(coalesce(g.value -> 'values', '[]'::jsonb)) WITH ORDINALITY AS c(value, ord)
ON CONFLICT (group_id, key) DO NOTHING;

-- Order snapshots ----------------------------------------------------------
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS options_snapshot jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS base_price_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS options_total_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS line_total_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS line_due_now_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS payment_rule public.payment_rule NOT NULL DEFAULT 'full',
  ADD COLUMN IF NOT EXISTS pack_size integer;

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS delivery_fee_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS total_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS balance_cents integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS delivery_postal_code text,
  ADD COLUMN IF NOT EXISTS delivery_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb;

UPDATE public.orders SET total_cents = subtotal_cents WHERE total_cents = 0;

-- Delivery configuration ---------------------------------------------------
ALTER TABLE public.settings
  ADD COLUMN IF NOT EXISTS delivery_mode public.delivery_mode NOT NULL DEFAULT 'pickup_only',
  ADD COLUMN IF NOT EXISTS delivery_origin_postal_code text,
  ADD COLUMN IF NOT EXISTS delivery_distance_config jsonb NOT NULL DEFAULT '{"bands":[]}'::jsonb;

CREATE TABLE IF NOT EXISTS public.delivery_zones (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  postal_prefixes text[] NOT NULL DEFAULT '{}',
  fee_cents integer NOT NULL DEFAULT 0 CHECK (fee_cents >= 0),
  active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.delivery_zones TO authenticated;
GRANT ALL ON public.delivery_zones TO service_role;
ALTER TABLE public.delivery_zones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins manage delivery zones" ON public.delivery_zones
  FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER delivery_zones_updated_at BEFORE UPDATE ON public.delivery_zones
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();