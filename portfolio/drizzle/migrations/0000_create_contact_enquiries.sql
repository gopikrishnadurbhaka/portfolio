CREATE TABLE public.contact_enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 255),
  organisation TEXT CHECK (organisation IS NULL OR char_length(organisation) <= 160),
  enquiry_type TEXT NOT NULL CHECK (enquiry_type IN ('advisory','speaking','research','media','other')),
  preferred_time_ist TEXT CHECK (preferred_time_ist IS NULL OR char_length(preferred_time_ist) <= 40),
  message TEXT NOT NULL CHECK (char_length(message) BETWEEN 1 AND 3000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.contact_enquiries TO service_role;

ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;
-- No policies for anon/authenticated: enquiries are written only by the server and are never publicly readable.