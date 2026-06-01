
CREATE TABLE public.featured_video (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  youtube_url TEXT NOT NULL,
  autoplay BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.featured_video TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.featured_video TO authenticated;
GRANT ALL ON public.featured_video TO service_role;

ALTER TABLE public.featured_video ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view featured video"
  ON public.featured_video FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert featured video"
  ON public.featured_video FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update featured video"
  ON public.featured_video FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete featured video"
  ON public.featured_video FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role));
