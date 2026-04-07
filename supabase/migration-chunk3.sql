-- CHUNK 3: Activities, Referrals, Debates, Competitors, Page Views
create type activity_type as enum (
  'form_submitted', 'email_sent', 'email_opened', 'sms_sent',
  'sms_replied', 'phone_call', 'whatsapp_message', 'status_changed',
  'note_added', 'document_uploaded', 'agent_qualification',
  'referral_made', 'vehicle_matched', 'delivery_scheduled'
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

create type agent_role as enum (
  'researcher', 'philosopher', 'growth_hacker', 'cultural_advisor', 'builder'
);

create table public.debate_sessions (
  id uuid primary key default uuid_generate_v4(),
  topic text not null,
  context text,
  status text default 'running' check (status in ('running', 'completed', 'error')),
  consensus text,
  triggered_by uuid references auth.users(id),
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table public.debate_messages (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.debate_sessions(id) on delete cascade,
  agent agent_role not null,
  round integer not null,
  position text not null,
  content text not null,
  responding_to uuid references public.debate_messages(id),
  tokens_used integer,
  created_at timestamptz default now()
);

create index idx_debate_messages_session on public.debate_messages(session_id, round);

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

create table public.page_views (
  id uuid primary key default uuid_generate_v4(),
  page_path text not null,
  community_slug text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  user_agent text,
  ip_hash text,
  session_id text,
  created_at timestamptz default now()
);

create index idx_page_views_path on public.page_views(page_path);
create index idx_page_views_community on public.page_views(community_slug);
create index idx_page_views_created on public.page_views(created_at desc);
