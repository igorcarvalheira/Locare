<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Locare — Instruções para Agentes de IA

Este arquivo é a fonte de verdade para qualquer agente (Claude Code, GitHub
Copilot, etc.) trabalhando neste repositório. Leia antes de gerar código.
Mantenha a seção "Estado atual" sincronizada com a realidade a cada commit
relevante — um AGENTS.md desatualizado engana o agente.

## Sobre o projeto

Locare é uma plataforma SaaS de gestão de locações imobiliárias para
pequenos e médios proprietários no Brasil. TCC desenvolvido com metodologia
Spec-Driven Development (SDD).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (Radix primitives)
- Supabase: Postgres, Auth, Row Level Security
- `@supabase/ssr` para sessão no App Router; `@supabase/supabase-js` como base
- Recharts para gráficos, Lucide React para ícones

## Metodologia: Spec-Driven Development

A especificação é o código-fonte primário. Antes de gerar qualquer código
que crie ou altere schema de banco, tipos de dados, ou regras de negócio:

1. Procure a spec correspondente em `specs/<entidade>/`.
2. Se a spec não existir, PARE e peça para o humano escrevê-la antes de
   continuar — não invente schema, tipos ou regras por conta própria.
3. Gere código que implemente exatamente o que está na spec, sem adicionar
   campos, tabelas ou comportamento que não foram especificados.
4. Specs grandes podem ser fatiadas em fases (ex.: banco -> sessão -> telas).
   Implemente apenas a fase pedida; não antecipe regras de fases futuras.

## Banco de dados e migrations

- O schema é gerido por **migrations versionadas via Supabase CLI**, em
  `supabase/migrations/`. NÃO aplicar schema manualmente pelo SQL Editor do
  dashboard — toda mudança de schema é um arquivo de migration.
- Os arquivos `.sql` também vivem em `specs/<entidade>/` como documentação
  SDD (fonte conceitual); as cópias em `supabase/migrations/` são os
  artefatos executáveis, com prefixo de timestamp que define a ordem.
- Funções `SECURITY DEFINER` (ex.: `handle_new_user`) devem SEMPRE fixar
  `set search_path = ''` e qualificar nomes com o schema (`public.x`) —
  proteção contra sequestro de search_path.
- Triggers que mantêm invariantes (ex.: criar `profiles` no signup) não
  devem engolir exceções: logam com `raise warning` e re-lançam com
  `raise;`, para não deixar registros órfãos.

## Regras de segurança (não negociáveis)

- RLS (Row Level Security) fica **sempre ativo** em toda tabela nova. Nunca
  desative RLS, nem "temporariamente".
- **Chaves do Supabase (nomenclatura nova):**
  - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (`sb_publishable_...`) — pública,
    respeita RLS, usada no client e no server via `@supabase/ssr`. É a chave
    padrão do app.
  - `SUPABASE_SECRET_KEY` (`sb_secret_...`) — ignora RLS. NUNCA em código que
    roda no client nem em código de autenticação. Reservada a scripts
    server-side pontuais. Só lida via `process.env` no servidor.
  - (Os nomes antigos `anon` / `service_role` foram descontinuados.)
- **Proteção de rota usa `supabase.auth.getUser()`, NUNCA `getSession()`.**
  `getUser()` revalida o token no servidor de Auth; `getSession()` confia no
  cookie sem validar e não serve para decisão de acesso.
- Interceptação de request é `src/proxy.ts` (função `proxy`), NÃO
  `middleware.ts` — este último não roda no Next.js 16.
- Nunca commite `.env.local` ou qualquer arquivo com credenciais reais.
- Qualquer alteração em RLS, policies, autenticação ou schema de banco
  precisa de revisão humana explícita antes de ser aceita — não aplique
  essas mudanças de forma autônoma, mesmo com permissão de editar arquivos.

## Estado atual (atualize esta seção conforme o projeto avança)

- ✅ Tabela `properties` — RLS ativo, policy de isolamento por `owner_id`,
  grants para a role `authenticated`. Aplicada via migration.
- ✅ Tabela `profiles` (estende `auth.users`) — RLS ativo, policies de
  select/update por `auth.uid() = id`, trigger `handle_new_user` cria a
  linha automaticamente no signup. Aplicada via migration.
- ✅ Autenticação — Fase A (banco) e Fase B (fundação de sessão) prontas:
  clientes Supabase em `src/lib/supabase/` (`client.ts`, `server.ts`,
  `session.ts`) e `src/proxy.ts` protegendo `/dashboard`.
- ✅ Autenticação — Fase C: login (`src/app/page.tsx` + `actions.ts`)
  implementado e testado ponta a ponta. Cadastro (`src/app/signup/`,
  `signUp` + validação endurecida no servidor) implementado e testado —
  usuário criado em `auth.users` e `profile` populado pelo trigger. Rota
  de callback `/auth/confirm` e página de erro implementadas e revisadas,
  página de erro testada visualmente — mas o fluxo de confirmação por
  e-mail em si **não foi testado ponta a ponta**: depende de configurar
  SMTP customizado (ver `specs/auth/spec-auth.md`). Até lá, usuários são
  confirmados manualmente pelo dashboard do Supabase.
- Módulo de autenticação estruturalmente completo; pendência conhecida é
  de configuração externa (SMTP), não de código.
- ❌ Tabelas `tenants`, `contracts`, `maintenance_requests`, `payments`
  ainda não existem.
- Ref.: `specs/auth/spec-auth.md` descreve o ciclo de autenticação completo.

## Convenções de código

- Clientes Supabase ficam em `src/lib/supabase/`: `client.ts` (browser),
  `server.ts` (Server Components/Route Handlers), `session.ts` (usado pelo
  proxy para renovar sessão). Reutilize-os, não crie clientes novos.
- Componentes de UI seguem o padrão shadcn/ui já usado em `src/components/`.
- Rotas de API/route handlers ficam em `src/app/<rota>/route.ts`.
- Tipos derivados de specs ficam junto da spec ou em `src/lib/types/`.
- Não adicione novas dependências ao `package.json` sem perguntar antes.

## Escopo por tarefa

Trabalhe apenas nos arquivos necessários para a tarefa pedida. Não
refatore, renomeie ou "melhore" código fora do escopo solicitado.

## Nota sobre Spec-kit

O toolkit Spec-kit (github/spec-kit), recomendado pelo orientador, ainda
não foi instalado. Seguimos os princípios de SDD manualmente (spec em
Markdown antes do código, revisão humana). Adoção formal planejada para a
fase de múltiplas entidades (tenants, contracts...), a alinhar com o
orientador.
