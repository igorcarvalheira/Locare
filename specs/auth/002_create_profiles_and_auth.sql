-- ============================================================
-- Migration: 002_create_profiles_and_auth.sql
-- Origem: spec-auth.md (SDD — Locare)
-- ============================================================

-- --------------------------------------------------------------
-- Tabela public.profiles (estende auth.users)
-- --------------------------------------------------------------
create table public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,

  full_name  text,
  phone      text,
  avatar_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- --------------------------------------------------------------
-- RLS: ativado desde já. Usuário só lê/edita o próprio profile
-- (spec-auth.md, seção 4, regra 3).
-- --------------------------------------------------------------
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles
  for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- --------------------------------------------------------------
-- Trigger: mantém updated_at sincronizado no servidor,
-- reaproveitando public.set_updated_at() (já criada em
-- 001_create_properties.sql — não recriada aqui).
-- --------------------------------------------------------------
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- --------------------------------------------------------------
-- Função + trigger: cria a linha em profiles automaticamente
-- quando um usuário se cadastra em auth.users (spec-auth.md,
-- seção 4, regra 2). `security definer` com `search_path`
-- fixado explicitamente e nomes de tabela qualificados pelo
-- schema — proteção contra sequestro de search_path (seção 5).
-- --------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  begin
    insert into public.profiles (id, full_name)
    values (new.id, new.raw_user_meta_data ->> 'full_name');
  exception
    when others then
      raise warning 'handle_new_user failed for user %: %', new.id, sqlerrm;
      raise;
  end;

  return new;
end;
$$;

create trigger trg_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

-- --------------------------------------------------------------
-- Grants
-- --------------------------------------------------------------

-- Corrige a dívida técnica do ciclo anterior (spec-auth.md, seção
-- 5): agora que o acesso passa a ser feito pelo usuário
-- autenticado real (role `authenticated`, via chave `publishable`),
-- a role precisa do grant de nível Postgres em properties — a
-- policy de RLS por owner_id já existe e continua sendo a proteção
-- real; o grant apenas abre a porta para a role, e o RLS filtra as
-- linhas.
grant select, insert, update, delete on public.properties to authenticated;

-- profiles: a role `authenticated` só precisa de select/update —
-- exatamente os comandos cobertos pelas duas policies acima. Não
-- há grant de insert nem de delete para essa role: nenhum usuário
-- insere ou apaga o próprio profile diretamente pela Data API — a
-- criação é feita pelo trigger handle_new_user (abaixo) e a
-- remoção só ocorre via cascade quando a linha em auth.users é
-- apagada.
grant select, update on public.profiles to authenticated;

-- handle_new_user() não recebe nem precisa de grant adicional em
-- profiles: por ser `security definer`, a função roda com o
-- privilégio do seu dono (o role usado para aplicar migrations,
-- tipicamente postgres/superuser), que já tem acesso irrestrito à
-- tabela e ignora RLS por definição. Quem executa o INSERT durante
-- o signup nunca é a role `authenticated` — é o dono da função.
