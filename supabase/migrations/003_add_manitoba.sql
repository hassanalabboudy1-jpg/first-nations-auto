-- Add Manitoba to the province check constraint
ALTER TABLE public.communities DROP CONSTRAINT IF EXISTS communities_province_check;
ALTER TABLE public.communities ADD CONSTRAINT communities_province_check CHECK (province IN ('ON', 'QC', 'MB', 'NB', 'NS'));
