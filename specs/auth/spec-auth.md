# Spec: Autenticação e `profiles` (MVP)

> Ciclo SDD 2/N — Locare
> Etapa do fluxo (Fig. 1 do TCC): **Escrita da Especificação**
> Próxima etapa: Alinhamento de Contratos → Execução Autônoma
>
> **Faseamento da implementação:** esta spec descreve o ciclo de
> autenticação por completo, mas a implementação é fatiada em três partes
> para manter cada mudança revisável:
> - **Fase A (banco):** tabela `profiles`, RLS, trigger `handle_new_user`,
>   grants. — ✅ concluída e aplicada via migration.
> - **Fase B (fundação de sessão):** clientes Supabase browser/server,
>   `proxy.ts`, proteção de `/dashboard`. Não inclui telas.
> - **Fase C (telas e fluxos):** login, cadastro, logout, mensagens de
>   erro genéricas, aviso de confirmação, rota de callback de e-mail.
> Cada fase só implementa o subconjunto correspondente das regras e
> critérios abaixo — não antecipar regras de fases futuras.

## 1. Objetivo

Permitir que um proprietário crie conta e faça login via e-mail/senha,
usando o Supabase Auth. Ao se cadastrar, o usuário ganha automaticamente
uma linha em `public.profiles` — a tabela que estende `auth.users` com
dados específicos da aplicação (nome, telefone). É essa autenticação que
transforma a policy de RLS de `properties` (já testada com `owner_id`
fictício) em isolamento real entre proprietários.

## 2. Requisitos relacionados

| Requisito | Como este módulo atende |
|---|---|
| RNF01 | `auth.uid()` passa a retornar um usuário real, ativando de fato o isolamento por `owner_id` já implementado em `properties`. |
| RF01 (parcial) | Sem usuário autenticado, não existe "dono" para associar a um imóvel — este módulo é pré-requisito de todo o resto do cadastro. |

## 3. Modelo de Dados — `public.profiles`

| Coluna | Tipo (Postgres) | Restrições | Justificativa de negócio |
|---|---|---|---|
| `id` | `uuid` | PK, FK → `auth.users(id)`, `on delete cascade` | Vínculo 1:1 com o usuário do Supabase Auth; não é gerado independente, é o mesmo `id` do `auth.users`. |
| `full_name` | `text` | NULL | Coletado no cadastro quando disponível; nullable para não bloquear signup caso o formulário não peça o nome de imediato. |
| `phone` | `text` | NULL | Usado futuramente para notificações via WhatsApp (citado no TCC como diferencial frente ao MicroRealEstate). |
| `avatar_url` | `text` | NULL | Exibido no canto do dashboard (já presente no mockup, hoje estático). No MVP nasce sempre nula: upload de imagem exige Supabase Storage, que está fora de escopo deste ciclo. A coluna é criada agora só para evitar migration futura. |
| `created_at` | `timestamptz` | NOT NULL, `default now()` | Auditoria. |
| `updated_at` | `timestamptz` | NOT NULL, `default now()`, mantido por trigger | Mesma convenção usada em `properties`. |

## 4. Regras de Negócio / Invariantes

1. Toda linha de `profiles` corresponde a exatamente um `auth.users` — não
   existe `profiles` órfão nem `profiles` sem `auth.users` correspondente
   (garantido pela FK `on delete cascade`).
2. A criação da linha em `profiles` é **automática**, via trigger em
   `auth.users` (`handle_new_user`), não depende do front-end fazer um
   segundo `insert`.
3. Um usuário só pode ler/editar o próprio `profiles` (RLS por `auth.uid() = id`).
4. `updated_at` é mantido por trigger de banco, nunca setado pelo cliente.
5. Senha mínima de **8 caracteres**. Este valor vive em **dois lugares**
   que devem ser mantidos coerentes: `supabase/config.toml`
   (`minimum_password_length`, fonte versionada/reproduzível, também usada
   pelo ambiente local via `supabase start`) e o dashboard de produção
   (Authentication → Sign In / Providers → Email). O mínimo de 8 é um
   requisito próprio deste projeto (dados financeiros de locação), não
   necessariamente o padrão de fábrica.
6. Confirmação de e-mail **obrigatória** antes do primeiro login — não
   desativar por conveniência.
7. Mensagens de erro de autenticação são **sempre genéricas** e nunca
   permitem distinguir os casos entre si — "e-mail não cadastrado", "senha
   incorreta" e "e-mail ainda não confirmado" devem produzir a mesma
   resposta observável no login. Previne enumeração de usuários por
   tentativa e erro. (A orientação para confirmar o e-mail é dada na tela
   de sucesso do cadastro — ver Regra 9 — não como reação a uma tentativa
   de login falha.)
8. Cadastro (`signUp`) com um e-mail **já existente** não revela que a
   conta já existe: a resposta observável é idêntica à de um cadastro
   novo. Com confirmação de e-mail habilitada, esse é o comportamento
   padrão do Supabase — a spec exige apenas que a UI não quebre esse
   sigilo com mensagens do tipo "e-mail já cadastrado".
9. Logo após um `signUp` bem-sucedido, a UI exibe uma tela/aviso neutro
   do tipo "enviamos um link de confirmação para o e-mail informado" —
   sem confirmar nem negar que a conta é nova. É aqui que o usuário
   legítimo é orientado a confirmar o e-mail.
10. Chamadas de `signUp`/`signInWithPassword`/`signOut` usam
   exclusivamente a chave `publishable` (client-side). A `secret key`
   nunca aparece em código de autenticação — ela já está reservada só
   para scripts server-side pontuais (regra herdada do AGENTS.md).
11. **Limites de tamanho de input (validados no servidor).** As Server
   Actions de auth impõem tetos antes de qualquer processamento pesado ou
   chamada ao Supabase: `email` ≤ 254 caracteres (limite prático da
   RFC 5321), `password` ≤ 72 caracteres (limite efetivo do bcrypt —
   além disso é truncado), `full_name` ≤ 100. Motivo: a Server Action é
   alcançável por POST direto (não só pela UI), então o input real não é
   limitado pelo que o formulário do browser permite — sem teto, um
   payload gigante gera custo de CPU inútil (ex.: regex sobre string de
   megabytes) e é repassado ao Supabase à toa.
12. **Sanitização de `full_name`.** Além de `trim()` e limite de tamanho,
   remover caracteres de controle e caracteres invisíveis/de formatação
   Unicode (ex.: zero-width space U+200B, right-to-left override U+202E —
   vetor conhecido de spoofing visual de nome). Não é XSS (o React escapa
   na renderização), mas é higiene de integridade: impede nomes
   visualmente enganosos no dashboard e em relatórios futuros.

> **Dívidas de segurança conhecidas e aceitas para o MVP** (registradas na
> auditoria da fatia de cadastro, não bloqueiam):
> - *Timing side-channel* entre "conta nova" e "e-mail já existe" no
>   `signUp`: inerente à API do Supabase, não mitigável no nosso código.
>   Aceitável sem adversário medindo latência em escala.
> - *Redirect URLs em produção*: o `emailRedirectTo` depende inteiramente
>   do allow-list do Supabase (não há backstop no código). Em produção, a
>   lista deve conter a URL exata do deploy, NUNCA um wildcard aberto.
> - *CSV/formula injection*: prospectivo. Se algum dia houver exportação de
>   `full_name`/`email` para planilha, prefixar valores que comecem com
>   `= + - @` para neutralizar execução de fórmula.

## 5. Segurança de Sessão e Infraestrutura

- **Correção de grants em `properties` (dívida técnica do ciclo anterior).**
  No ciclo de teste cru foi rodado um `grant ... to service_role` manual
  no SQL Editor para destravar a conexão, o que deixou a tabela em estado
  de "custom Data API permissions". Agora que o acesso passa a ser feito
  por usuário autenticado (role `authenticated` via chave `publishable`),
  a migration deste ciclo deve conceder explicitamente
  `select, insert, update, delete` em `public.properties` à role
  `authenticated`. Sem isso, o RLS até permite (a policy por `owner_id`
  existe), mas o grant de nível Postgres bloqueia antes, causando
  `permission denied` para o usuário real — o mesmo erro que já vimos, só
  que agora em produção. A policy de RLS continua sendo a proteção real;
  o grant apenas abre a porta para a role, e o RLS filtra as linhas.
- **Proteção de rota via `proxy.ts`, não `middleware.ts`.** O Next.js 16
  renomeou o mecanismo de interceptação de requisições; `middleware.ts`
  não é executado nessa versão. O arquivo correto é `proxy.ts`, com a
  função exportada chamada `proxy`.
- **Sessão via cookies httpOnly**, gerenciada pelo pacote `@supabase/ssr`
  (não pelo `@supabase/supabase-js` puro, usado só no teste cru anterior).
  Cookies devem manter os atributos padrão do pacote (`httpOnly`,
  `secure` em produção, `sameSite=lax`) — não sobrescrever manualmente
  sem motivo.
- **Rate limiting** nos endpoints de signup/login/OTP já vem habilitado
  por padrão na infraestrutura do Supabase — não é necessário implementar
  nada adicional neste ciclo, apenas ciente de que existe (útil para
  justificar a robustez do sistema na defesa do TCC).
- **Trigger `handle_new_user`** deve ser declarado `security definer` com
  `search_path` explicitamente fixado na definição da função (proteção
  contra sequestro de search_path, uma vulnerabilidade conhecida em
  funções `SECURITY DEFINER` no Postgres). Falha no trigger deve
  propagar um erro legível para a UI, nunca falhar silenciosamente.
  Especificamente: o `insert` é envolvido por um bloco de exceção que
  **registra o motivo no log** (`raise warning` com `SQLERRM`) e em
  seguida **re-lança** o erro (`raise;`). Não capturar-e-retornar: engolir
  a exceção deixaria um `auth.users` sem `profiles` correspondente,
  violando a Regra 1. O log serve só para diagnóstico; a falha continua
  abortando o signup (comportamento seguro).
- **Rota de callback de confirmação de e-mail.** Como a confirmação de
  e-mail é obrigatória (Regra 6), a aplicação precisa de um route handler
  (padrão Supabase: `/auth/confirm` ou `/auth/callback`) que processa o
  token do link enviado por e-mail e estabelece a sessão. Sem essa rota,
  o usuário clica no link de confirmação e não completa o fluxo. **Escopo:
  pertence ao ciclo de telas (Prompt 3), não à fundação de sessão
  (Prompt 2)** — anotado aqui para não ser esquecido.
- **Redirect URLs**: `localhost:3000` e a futura URL de produção (Vercel)
  precisam estar cadastradas em Authentication → URL Configuration no
  dashboard do Supabase — passo operacional, fora do código, fácil de
  esquecer.

## 6. Fora de escopo deste ciclo

- Login social (Google, visto no mockup) — fica para um ciclo separado,
  exige configuração de provider OAuth.
- Recuperação de senha ("Esqueci minha senha", também no mockup) — fluxo
  próprio, com spec própria.
- Papéis/permissões diferenciadas (ex.: admin vs. proprietário comum) —
  não há necessidade identificada ainda.
- CAPTCHA / proteção adicional contra bots — o rate limiting nativo do
  Supabase cobre o MVP; reavaliar se houver abuso real.

> **Nota para specs futuras:** hoje `profiles` é 100% privado (só o
> próprio dono lê/edita). Quando `tenants`/`contracts` existirem, um
> inquilino provavelmente vai precisar ver nome/telefone do locador — a
> policy de RLS vai precisar de uma regra adicional então. Não é uma ação
> agora, só um ponto de atenção para não travar aquele ciclo depois.
>
> **Portal do inquilino (evolução planejada, pós-MVP do locador).** O TCC
> já prevê "portais logados para inquilinos" como diferencial competitivo.
> Isso introduz papéis distintos (locador vs. inquilino) com permissões
> diferentes sobre os mesmos dados — inquilino poderia abrir chamados de
> manutenção, contatar o locador e enviar documentos. É viável e o RLS foi
> adotado desde o início justamente para suportar essa expansão multi-perfil
> sem refatoração estrutural. Fica FORA do escopo do MVP atual (que foca no
> fluxo do locador); requer sua própria spec, com modelo de papéis, policies
> de RLS por papel, e rotas/telas separadas. Pré-requisito: o núcleo do
> locador (auth + properties + manutenções) precisa estar funcional antes.

## 7. Critérios de Aceitação

- [ ] `supabase.auth.signUp({ email, password })` cria um usuário em
      `auth.users` **e** uma linha correspondente em `public.profiles`,
      sem ação manual adicional.
- [ ] Senha com menos de 8 caracteres é rejeitada antes de chegar ao
      Supabase, com mensagem clara na UI.
- [ ] Login com e-mail inexistente, senha errada, OU e-mail não
      confirmado retorna a **mesma** mensagem genérica nos três casos —
      não é possível distinguir qual dos três ocorreu.
- [ ] Após `signUp` bem-sucedido, a UI mostra o aviso neutro de
      confirmação de e-mail; cadastrar com um e-mail já existente produz
      a mesma tela, sem revelar que a conta já existia.
- [ ] Acessar `/dashboard` sem sessão ativa redireciona para a tela de
      login via `proxy.ts` — não retorna 500 nem tela em branco.
- [ ] Logout (`supabase.auth.signOut()`) encerra a sessão e uma tentativa
      subsequente de acessar `/dashboard` redireciona para login.
- [ ] Um usuário autenticado não consegue ler o `profiles` de outro via
      `select` direto (RLS bloqueia, testável com dois usuários de teste).
- [ ] Inserir um `properties` com `owner_id` do usuário autenticado
      funciona sem precisar da `secret key` — a policy de RLS já testada
      passa a valer com um usuário real, via chave `publishable`.
- [ ] Se o trigger `handle_new_user` falhar por qualquer motivo, o
      cadastro retorna erro legível para o usuário, não uma tela quebrada.
