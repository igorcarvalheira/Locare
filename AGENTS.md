<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Locare — Instruções para Agentes de IA

Este arquivo é a fonte de verdade para qualquer agente (Claude Code, GitHub
Copilot, etc.) trabalhando neste repositório. Leia antes de gerar código.

## Sobre o projeto

Locare é uma plataforma SaaS de gestão de locações imobiliárias para
pequenos e médios proprietários no Brasil. TCC desenvolvido com metodologia
Spec-Driven Development (SDD).

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui (Radix primitives)
- Supabase: Postgres, Auth, Row Level Security
- Recharts para gráficos, Lucide React para ícones

## Metodologia: Spec-Driven Development

A especificação é o código-fonte primário. Antes de gerar qualquer código
que crie ou altere schema de banco, tipos de dados, ou regras de negócio:

1. Procure a spec correspondente em `specs/<entidade>/`.
2. Se a spec não existir, PARE e peça para o humano escrevê-la antes de
   continuar — não invente schema, tipos ou regras por conta própria.
3. Gere código que implemente exatamente o que está na spec, sem adicionar
   campos, tabelas ou comportamento que não foram especificados.

## Regras de segurança (não negociáveis)

- RLS (Row Level Security) fica **sempre ativo** em toda tabela nova. Nunca
  desative RLS, nem "temporariamente".
- Nunca coloque a `secret key` do Supabase em código que
  roda no client (componentes React, qualquer arquivo fora de
  `route.ts`/Server Actions). Só pode ser lida via `process.env` em código
  server-side.
- Nunca commite `.env.local` ou qualquer arquivo com credenciais reais.
- Qualquer alteração em RLS, policies, autenticação ou schema de banco
  precisa de revisão humana explícita antes de ser aceita — não aplique
  essas mudanças de forma autônoma, mesmo se tiver permissão de editar
  arquivos livremente.

## Estado atual (atualize esta seção conforme o projeto avança)

- ✅ Tabela `properties` criada no Supabase, RLS ativo, policy de isolamento
  por `owner_id` aplicada.
- ❌ Autenticação (Supabase Auth) ainda não implementada — não assuma que
  existe usuário logado ou sessão ativa em nenhum componente.
- ❌ Tabelas `tenants`, `contracts`, `maintenance_requests`, `payments`
  ainda não existem.

## Convenções de código

- Componentes de UI seguem o padrão shadcn/ui já usado em `src/components/`.
- Rotas de API ficam em `src/app/api/<nome>/route.ts`.
- Tipos derivados de specs ficam em `src/lib/types/`.
- Não adicione novas dependências ao `package.json` sem perguntar antes.

## Escopo por tarefa

Trabalhe apenas nos arquivos necessários para a tarefa pedida. Não
refatore, renomeie ou "melhore" código fora do escopo solicitado.