-- ============================================================
-- FIRST NATIONS AUTO FINANCING — Lead Generation Platform
-- Supabase Database Schema
-- ============================================================

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
-- COMMUNITIES — Every First Nation in Ontario & Quebec
-- ============================================================
create table public.communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  province text not null check (province in ('ON', 'QC')),
  nation text, -- e.g. Anishinaabe, Haudenosaunee, Cree, Innu
  language text, -- primary Indigenous language
  greeting text, -- greeting in local language
  population integer,
  reserve_name text,
  latitude double precision,
  longitude double precision,
  band_council_url text,
  is_remote boolean default false,
  tax_exemption_eligible boolean default true,
  delivery_zone text, -- 'local', 'regional', 'remote'
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_communities_province on public.communities(province);
create index idx_communities_slug on public.communities(slug);

-- ============================================================
-- LEADS — Every person who applies
-- ============================================================
create type lead_status as enum (
  'new',
  'contacted',
  'qualified',
  'application_sent',
  'approved',
  'vehicle_matched',
  'delivered',
  'closed_won',
  'closed_lost'
);

create type lead_source as enum (
  'website_form',
  'facebook_ad',
  'google_ad',
  'community_page',
  'referral',
  'phone',
  'walk_in',
  'tiktok',
  'instagram',
  'whatsapp',
  'sms',
  'other'
);

create table public.leads (
  id uuid primary key default uuid_generate_v4(),
  -- Contact info
  first_name text not null,
  last_name text,
  phone text not null,
  email text,
  -- Community connection
  community_id uuid references public.communities(id),
  community_name text, -- fallback if not in our DB
  province text,
  -- Vehicle preferences
  vehicle_type text, -- 'car', 'truck', 'suv', 'van'
  budget_range text,
  trade_in boolean default false,
  trade_in_details text,
  -- Financial
  employment_status text,
  monthly_income text,
  credit_score_range text,
  has_status_card boolean,
  -- Lead tracking
  status lead_status default 'new',
  source lead_source default 'website_form',
  source_detail text, -- utm_campaign, referral code, etc.
  landing_page text, -- which community page they came from
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  -- Assignment
  assigned_to uuid references auth.users(id),
  -- Scoring
  lead_score integer default 0,
  ai_qualification_notes text,
  -- Timestamps
  first_contact_at timestamptz,
  last_contact_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_leads_status on public.leads(status);
create index idx_leads_community on public.leads(community_id);
create index idx_leads_created on public.leads(created_at desc);
create index idx_leads_source on public.leads(source);

-- ============================================================
-- LEAD ACTIVITY LOG — Every touchpoint
-- ============================================================
create type activity_type as enum (
  'form_submitted',
  'email_sent',
  'email_opened',
  'sms_sent',
  'sms_replied',
  'phone_call',
  'whatsapp_message',
  'status_changed',
  'note_added',
  'document_uploaded',
  'agent_qualification',
  'referral_made',
  'vehicle_matched',
  'delivery_scheduled'
);

create table public.lead_activities (
  id uuid primary key default uuid_generate_v4(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  activity activity_type not null,
  title text not null,
  description text,
  metadata jsonb default '{}',
  created_by uuid references auth.users(id),
  created_at timestamptz default now()
);

create index idx_activities_lead on public.lead_activities(lead_id);
create index idx_activities_created on public.lead_activities(created_at desc);

-- ============================================================
-- REFERRALS — Track the referral engine
-- ============================================================
create table public.referrals (
  id uuid primary key default uuid_generate_v4(),
  referrer_name text not null,
  referrer_phone text not null,
  referrer_email text,
  referrer_community_id uuid references public.communities(id),
  referred_lead_id uuid references public.leads(id),
  referral_code text unique not null,
  bonus_amount numeric(10,2) default 750.00,
  bonus_paid boolean default false,
  bonus_paid_at timestamptz,
  created_at timestamptz default now()
);

create index idx_referrals_code on public.referrals(referral_code);

-- ============================================================
-- AGENT DEBATES — War Room logs
-- ============================================================
create type agent_role as enum (
  'researcher',
  'philosopher',
  'growth_hacker',
  'cultural_advisor',
  'builder'
);

create table public.debate_sessions (
  id uuid primary key default uuid_generate_v4(),
  topic text not null,
  context text, -- what triggered this debate
  status text default 'running' check (status in ('running', 'completed', 'error')),
  consensus text, -- final synthesized recommendation
  triggered_by uuid references auth.users(id),
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table public.debate_messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.debate_sessions(id) on delete cascade,
  agent agent_role not null,
  round integer not null,
  position text not null, -- the agent's stance
  content text not null,
  responding_to uuid references public.debate_messages(id),
  tokens_used integer,
  created_at timestamptz default now()
);

create index idx_debate_messages_session on public.debate_messages(session_id, round);

-- ============================================================
-- COMPETITORS — Intelligence tracking
-- ============================================================
create table public.competitors (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  website text,
  region text,
  strengths text,
  weaknesses text,
  pricing_notes text,
  last_scraped_at timestamptz,
  metadata jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ============================================================
-- ANALYTICS — Track conversions
-- ============================================================
create table public.page_views (
  id uuid primary key default uuid_generate_v4(),
  page_path text not null,
  community_slug text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_hash text, -- hashed for PIPEDA compliance
  session_id text,
  created_at timestamptz default now()
);

create index idx_page_views_path on public.page_views(page_path);
create index idx_page_views_community on public.page_views(community_slug);
create index idx_page_views_created on public.page_views(created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Communities: public read, admin write
alter table public.communities enable row level security;
create policy "Communities are viewable by everyone"
  on public.communities for select using (true);
create policy "Communities are editable by authenticated users"
  on public.communities for all using (auth.role() = 'authenticated');

-- Leads: only authenticated users
alter table public.leads enable row level security;
create policy "Leads are viewable by authenticated users"
  on public.leads for select using (auth.role() = 'authenticated');
create policy "Leads can be inserted by anyone (public form)"
  on public.leads for insert with check (true);
create policy "Leads are editable by authenticated users"
  on public.leads for update using (auth.role() = 'authenticated');

-- Activities: only authenticated
alter table public.lead_activities enable row level security;
create policy "Activities viewable by authenticated users"
  on public.lead_activities for select using (auth.role() = 'authenticated');
create policy "Activities insertable by authenticated users"
  on public.lead_activities for insert with check (auth.role() = 'authenticated');

-- Referrals: public insert (referral form), authenticated read
alter table public.referrals enable row level security;
create policy "Referrals can be created by anyone"
  on public.referrals for insert with check (true);
create policy "Referrals viewable by authenticated users"
  on public.referrals for select using (auth.role() = 'authenticated');

-- Debates: authenticated only
alter table public.debate_sessions enable row level security;
create policy "Debates viewable by authenticated users"
  on public.debate_sessions for select using (auth.role() = 'authenticated');
create policy "Debates creatable by authenticated users"
  on public.debate_sessions for insert with check (auth.role() = 'authenticated');
create policy "Debates updatable by authenticated users"
  on public.debate_sessions for update using (auth.role() = 'authenticated');

alter table public.debate_messages enable row level security;
create policy "Debate messages viewable by authenticated users"
  on public.debate_messages for select using (auth.role() = 'authenticated');
create policy "Debate messages insertable by authenticated users"
  on public.debate_messages for insert with check (auth.role() = 'authenticated');

-- Page views: public insert, authenticated read
alter table public.page_views enable row level security;
create policy "Page views can be inserted by anyone"
  on public.page_views for insert with check (true);
create policy "Page views viewable by authenticated users"
  on public.page_views for select using (auth.role() = 'authenticated');

-- ============================================================
-- FUNCTIONS — Auto-update timestamps
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_leads_updated
  before update on public.leads
  for each row execute function public.handle_updated_at();

create trigger on_communities_updated
  before update on public.communities
  for each row execute function public.handle_updated_at();

-- ============================================================
-- FUNCTION — Auto-score leads
-- ============================================================
create or replace function public.calculate_lead_score(lead_row public.leads)
returns integer as $$
declare
  score integer := 0;
begin
  -- Has status card = high value (tax exemption)
  if lead_row.has_status_card then score := score + 30; end if;
  -- Has email = more contactable
  if lead_row.email is not null then score := score + 10; end if;
  -- Employment status
  if lead_row.employment_status = 'employed' then score := score + 20;
  elsif lead_row.employment_status = 'self_employed' then score := score + 15;
  end if;
  -- Community linked = more engaged
  if lead_row.community_id is not null then score := score + 15; end if;
  -- Trade-in = serious buyer
  if lead_row.trade_in then score := score + 10; end if;
  -- Source quality
  if lead_row.source = 'referral' then score := score + 25;
  elsif lead_row.source = 'community_page' then score := score + 15;
  elsif lead_row.source = 'google_ad' then score := score + 10;
  end if;

  return least(score, 100);
end;
$$ language plpgsql;

-- ============================================================
-- REALTIME — Enable for live dashboard
-- ============================================================
alter publication supabase_realtime add table public.leads;
alter publication supabase_realtime add table public.lead_activities;
alter publication supabase_realtime add table public.debate_messages;
