-- CHUNK 1: Extensions and Communities table
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

drop table if exists public.test_table;

create table public.communities (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  province text not null check (province in ('ON', 'QC')),
  nation text,
  language text,
  greeting text,
  population integer,
  reserve_name text,
  latitude double precision,
  longitude double precision,
  band_council_url text,
  is_remote boolean default false,
  tax_exemption_eligible boolean default true,
  delivery_zone text,
  meta_title text,
  meta_description text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index idx_communities_province on public.communities(province);
create index idx_communities_slug on public.communities(slug);
