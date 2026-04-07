-- CHUNK 4: RLS Policies, Functions, Realtime

-- RLS: Communities
alter table public.communities enable row level security;
create policy "Communities are viewable by everyone" on public.communities for select using (true);
create policy "Communities are editable by authenticated users" on public.communities for all using (auth.role() = 'authenticated');

-- RLS: Leads
alter table public.leads enable row level security;
create policy "Leads are viewable by authenticated users" on public.leads for select using (auth.role() = 'authenticated');
create policy "Leads can be inserted by anyone" on public.leads for insert with check (true);
create policy "Leads are editable by authenticated users" on public.leads for update using (auth.role() = 'authenticated');

-- RLS: Activities
alter table public.lead_activities enable row level security;
create policy "Activities viewable by authenticated users" on public.lead_activities for select using (auth.role() = 'authenticated');
create policy "Activities insertable by authenticated users" on public.lead_activities for insert with check (auth.role() = 'authenticated');

-- RLS: Referrals
alter table public.referrals enable row level security;
create policy "Referrals can be created by anyone" on public.referrals for insert with check (true);
create policy "Referrals viewable by authenticated users" on public.referrals for select using (auth.role() = 'authenticated');

-- RLS: Debates
alter table public.debate_sessions enable row level security;
create policy "Debates viewable by authenticated" on public.debate_sessions for select using (auth.role() = 'authenticated');
create policy "Debates creatable by authenticated" on public.debate_sessions for insert with check (auth.role() = 'authenticated');
create policy "Debates updatable by authenticated" on public.debate_sessions for update using (auth.role() = 'authenticated');

alter table public.debate_messages enable row level security;
create policy "Debate msgs viewable by authenticated" on public.debate_messages for select using (auth.role() = 'authenticated');
create policy "Debate msgs insertable by authenticated" on public.debate_messages for insert with check (auth.role() = 'authenticated');

-- RLS: Page views
alter table public.page_views enable row level security;
create policy "Page views can be inserted by anyone" on public.page_views for insert with check (true);
create policy "Page views viewable by authenticated" on public.page_views for select using (auth.role() = 'authenticated');

-- Auto-update timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_leads_updated before update on public.leads for each row execute function public.handle_updated_at();
create trigger on_communities_updated before update on public.communities for each row execute function public.handle_updated_at();

-- Realtime
alter publication supabase_realtime add table public.leads;
alter publication supabase_realtime add table public.lead_activities;
alter publication supabase_realtime add table public.debate_messages;
