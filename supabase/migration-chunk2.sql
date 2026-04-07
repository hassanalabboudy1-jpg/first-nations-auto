-- CHUNK 2: Leads table
create type lead_status as enum (
  'new', 'contacted', 'qualified', 'application_sent',
  'approved', 'vehicle_matched', 'delivered', 'closed_won', 'closed_lost'
);

create type lead_source as enum (
  'website_form', 'facebook_ad', 'google_ad', 'community_page',
  'referral', 'phone', 'walk_in', 'tiktok', 'instagram',
  'whatsapp', 'sms', 'other'
);

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  first_name text not null,
  last_name text,
  phone text not null,
  email text,
  community_id uuid references public.communities(id),
  community_name text,
  province text,
  vehicle_type text,
  budget_range text,
  trade_in boolean default false,
  trade_in_details text,
  employment_status text,
  monthly_income text,
  credit_score_range text,
  has_status_card boolean,
  status lead_status default 'new',
  source lead_source default 'website_form',
  source_detail text,
  landing_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  assigned_to uuid references auth.users(id),
  lead_score integer default 0,
  ai_qualification_notes text,
  first_contact_at timestamptz,
  last_contact_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_leads_status on public.leads(status);
create index idx_leads_community on public.leads(community_id);
create index idx_leads_created on public.leads(created_at desc);
create index idx_leads_source on public.leads(source);
