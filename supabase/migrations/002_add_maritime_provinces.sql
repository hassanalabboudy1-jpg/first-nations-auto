-- Add New Brunswick and Nova Scotia to the province check constraint
ALTER TABLE public.communities DROP CONSTRAINT IF EXISTS communities_province_check;
ALTER TABLE public.communities ADD CONSTRAINT communities_province_check CHECK (province IN ('ON', 'QC', 'NB', 'NS'));

-- Also update the leads table if it has a province constraint
ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_province_check;
