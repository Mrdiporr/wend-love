-- 1. Column-level protection for settings: hide bank details from the public Data API
REVOKE SELECT ON public.settings FROM anon, authenticated;
GRANT SELECT (id, singleton, whatsapp_number, created_at, updated_at) ON public.settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;

-- 2. Stop direct API execution of the SECURITY DEFINER role helper
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;