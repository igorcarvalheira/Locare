-- ============================================================
-- Migration: 001_create_properties.sql
-- Origem: spec-properties.md (SDD — Locare)
-- ============================================================

-- Garante a extensão usada por gen_random_uuid()
-- (já vem habilitada por padrão nos projetos Supabase, mas é
-- explicitada aqui para tornar a migration autocontida).
create extension if not exists pgcrypto;

-- --------------------------------------------------------------
-- Tipos enumerados
-- --------------------------------------------------------------
create type property_type as enum (
  'apartment',
  'house',
  'commercial',
  'studio',
  'other'
);

create type property_status as enum (
  'vacant',
  'rented',
  'maintenance',
  'inactive'
);

-- --------------------------------------------------------------
-- Tabela principal
-- --------------------------------------------------------------
create table public.properties (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references auth.users (id) on delete cascade,

  nickname            text not null,
  address_street       text not null,
  address_number       text,
  address_complement   text,
  neighborhood         text,
  city                 text not null,
  state                char(2) not null,
  zip_code             varchar(9),

  property_type  property_type not null default 'apartment',
  area_m2         numeric(8,2),
  bedrooms        smallint not null default 0,
  bathrooms       smallint not null default 0,

  rent_value  numeric(10,2) not null default 0,
  iptu_value  numeric(10,2) not null default 0,
  status      property_status not null default 'vacant',

  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_properties_owner_id on public.properties (owner_id);
create index idx_properties_status   on public.properties (status);

-- --------------------------------------------------------------
-- Trigger: mantém updated_at sincronizado no servidor
-- (consistente com a decisão arquitetural de usar Database
-- Triggers como camada de validação intermediária — seção 3.1
-- do TCC)
-- --------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_properties_updated_at
before update on public.properties
for each row
execute function public.set_updated_at();

-- --------------------------------------------------------------
-- RLS: ativado desde a primeira migration (RNF01 / Protocolo de
-- Segurança do TCC, seção 3.2). Não há janela em que a tabela
-- fica exposta ao público, nem dependência de "lembrar de
-- reativar" mais tarde.
-- --------------------------------------------------------------
alter table public.properties enable row level security;

create policy "Owners can manage their own properties"
  on public.properties
  for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

-- ============================================================
-- Sobre o teste cru de conexão (Next.js ↔ Supabase), ANTES do
-- módulo de Auth existir:
-- ============================================================
-- Não desative o RLS pra isso. Use a chave `secret key` do
-- projeto num script/ambiente de teste local (nunca no client
-- Next.js nem em código que roda no browser) — ela ignora RLS
-- por definição, então insert/select cru funcionam normalmente,
-- e a tabela nunca fica aberta para a chave `anon` pública.
--
-- Ex.: um script Node isolado (ex.: scripts/test-connection.ts,
-- fora do bundle do app) usando SUPABASE_SECRET_KEY apenas
-- via variável de ambiente do servidor.
