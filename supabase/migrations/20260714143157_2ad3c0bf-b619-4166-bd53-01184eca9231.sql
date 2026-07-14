
CREATE TABLE public.staff_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  position text NOT NULL,
  image_url text,
  storage_path text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.staff_members TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.staff_members TO authenticated;
GRANT ALL ON public.staff_members TO service_role;

ALTER TABLE public.staff_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view staff members" ON public.staff_members
  FOR SELECT USING (true);

CREATE POLICY "Admins can insert staff members" ON public.staff_members
  FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update staff members" ON public.staff_members
  FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete staff members" ON public.staff_members
  FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_staff_members_updated_at
  BEFORE UPDATE ON public.staff_members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
