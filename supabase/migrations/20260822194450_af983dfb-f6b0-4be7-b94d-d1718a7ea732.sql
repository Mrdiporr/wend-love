ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS checkout_method text NOT NULL DEFAULT 'whatsapp',
  ADD COLUMN IF NOT EXISTS payer_name text,
  ADD COLUMN IF NOT EXISTS transfer_reference text,
  ADD COLUMN IF NOT EXISTS transfer_date date,
  ADD COLUMN IF NOT EXISTS slip_path text;

CREATE TABLE IF NOT EXISTS public.settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  singleton boolean NOT NULL DEFAULT true UNIQUE,
  bank_account_name text NOT NULL DEFAULT 'Wendy''s Bakehouse',
  bank_account_number text NOT NULL DEFAULT '0000000000',
  bank_name text NOT NULL DEFAULT 'Bank name pending',
  bank_note text NOT NULL DEFAULT 'Use your order reference as the transfer description.',
  whatsapp_number text NOT NULL DEFAULT '+1 647 620 2518',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.settings TO anon;
GRANT SELECT, INSERT, UPDATE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public can read settings" ON public.settings
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "admins manage settings" ON public.settings
  FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

CREATE TRIGGER settings_updated_at BEFORE UPDATE ON public.settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

INSERT INTO public.settings (singleton) VALUES (true) ON CONFLICT (singleton) DO NOTHING;