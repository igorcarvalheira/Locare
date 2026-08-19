# Spec: Entidade `properties` (MVP)

> Ciclo SDD 1/N — Locare
> Etapa do fluxo (Fig. 1 do TCC): **Escrita da Especificação**
> Próxima etapa: Alinhamento de Contratos (Spec-kit) → Execução Autônoma (agente de IA)

## 1. Objetivo

Modelar o cadastro de imóveis do portfólio de um locador, servindo de base para:
o painel financeiro (RF02), o rastreio de chamados de manutenção (RF03) e o
registro de taxas recorrentes como o IPTU (RF04). Toda propriedade pertence a
exatamente um usuário (`owner_id`), preparando o terreno para o isolamento via
RLS exigido em RNF01 — mesmo que o RLS ainda não esteja ativo nesta etapa.

## 2. Requisitos relacionados

| Requisito | Como esta entidade atende |
|---|---|
| RF01 | Cadastro de propriedades (base para depois associar contratos/inquilinos) |
| RF02 | Campo `rent_value` alimenta o painel financeiro de receitas |
| RF04 | Campo `iptu_value` registra a taxa recorrente |
| RNF01 | Coluna `owner_id` é o ponto de ancoragem para a política de RLS futura |

## 3. Modelo de Dados

| Coluna | Tipo (Postgres) | Restrições | Justificativa de negócio |
|---|---|---|---|
| `id` | `uuid` | PK, `default gen_random_uuid()` | Identificador estável, não sequencial (evita enumeração de registros). |
| `owner_id` | `uuid` | NOT NULL, FK → `auth.users(id)`, `on delete cascade` | Define o dono do imóvel; base para a política de RLS de RNF01 quando reativada. |
| `nickname` | `text` | NOT NULL | Rótulo amigável exibido nas listagens (ex.: "Apartamento Jardins", visto no protótipo). |
| `address_street` | `text` | NOT NULL | Endereço é obrigatório para qualquer operação de gestão/manutenção. |
| `address_number` | `text` | NULL | Nem todo endereço possui número formal (sítios, zona rural). |
| `address_complement` | `text` | NULL | Bloco, apto, sala — opcional. |
| `neighborhood` | `text` | NULL | Usado em filtros de busca futuros. |
| `city` | `text` | NOT NULL | Necessário para relatórios e futura integração com serviços locais. |
| `state` | `char(2)` | NOT NULL | UF, usada em regras fiscais (ex.: cálculo de IPTU varia por município/estado). |
| `zip_code` | `varchar(9)` | NULL | CEP; opcional no MVP, mas útil para geolocalização futura. |
| `property_type` | `property_type` (enum) | NOT NULL, `default 'apartment'` | Diferencia residencial/comercial, conforme objetivo específico do projeto. |
| `area_m2` | `numeric(8,2)` | NULL | Exibido no protótipo (ex.: "130m²"); não é crítico ao ponto de bloquear o cadastro. |
| `bedrooms` | `smallint` | NOT NULL, `default 0` | Exibido no protótipo (ícone de cama); apoia comparação entre imóveis. |
| `bathrooms` | `smallint` | NOT NULL, `default 0` | Idem, ícone de banheiro no protótipo. |
| `rent_value` | `numeric(10,2)` | NOT NULL, `default 0` | Valor-base do aluguel; insumo direto do painel financeiro (RF02). |
| `iptu_value` | `numeric(10,2)` | NOT NULL, `default 0` | Taxa recorrente (RF04). `numeric` evita erros de arredondamento de `float`. |
| `status` | `property_status` (enum) | NOT NULL, `default 'vacant'` | Reflete os estados vistos no protótipo (Alugado/Vago) e alimenta RF03 indiretamente. |
| `notes` | `text` | NULL | Observações livres do gestor. |
| `created_at` | `timestamptz` | NOT NULL, `default now()` | Auditoria/rastreabilidade. |
| `updated_at` | `timestamptz` | NOT NULL, `default now()`, mantido por trigger | Auditoria; usa Database Trigger, alinhado à arquitetura descrita na seção 3.1 do TCC. |

**Tipos enumerados (Postgres `ENUM`):**

- `property_type`: `apartment | house | commercial | studio | other`
- `property_status`: `vacant | rented | maintenance | inactive`

## 4. Regras de Negócio / Invariantes

1. Todo imóvel pertence a um único `owner_id`; nunca pode ser `NULL`.
2. `rent_value` e `iptu_value` não devem ser negativos (candidato a `CHECK` em
   um ciclo futuro, quando as regras financeiras forem especificadas em
   detalhe).
3. `status` inicia como `vacant` até que uma entidade `contracts` (fora de
   escopo deste ciclo) vincule um inquilino.
4. `updated_at` nunca é definido manualmente pela aplicação — é
   responsabilidade exclusiva do trigger de banco, evitando divergência entre
   front-end e servidor (consistente com a decisão arquitetural de usar
   Database Triggers como camada intermediária, seção 3.1 do TCC).

## 5. Fora de escopo deste ciclo

`tenants`, `contracts`, `maintenance_requests` e `payments` serão objeto de
specs SDD independentes, pois cada uma tem contratos de API e critérios de
aceitação próprios.

## 6. Critérios de Aceitação

- [ ] `insert` sem `nickname`, `address_street`, `city` ou `state` falha com
      erro de constraint (NOT NULL).
- [ ] `insert` sem `owner_id` válido falha com erro de FK.
- [ ] `insert` válido retorna `id` gerado automaticamente (`uuid`).
- [ ] Atualizar qualquer coluna do registro altera `updated_at`
      automaticamente, sem que o cliente precise enviá-lo.
- [ ] `status` aceita apenas os valores do enum `property_status`.
- [ ] RLS está **ativado desde a primeira migration**, com policy de
      isolamento por `owner_id` já aplicada (não comentada).
- [ ] O teste cru de conexão (antes do módulo de Auth) usa a chave
      `secret key` em ambiente de servidor/script — nunca a chave `anon`
      no client — e nunca depende de desativar RLS na tabela.
