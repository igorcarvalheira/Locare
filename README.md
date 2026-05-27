# Locare 🏠

> Plataforma inteligente para gestão de aluguéis, desenvolvida como Trabalho de Conclusão de Curso (TCC).

A **Locare** é um ecossistema projetado para modernizar e automatizar as rotinas imobiliárias. O sistema centraliza contratos, automatiza cobranças, oferece dashboards visuais para acompanhamento financeiro e prepara a base para integrações inteligentes de manutenção.

---

## 🚀 Funcionalidades Atuais (MVP)

- **Tela de Login:** Interface moderna e responsiva com identidade visual própria (paleta roxa), validações e opção de autenticação social.
- **Dashboard de Gestão:** Painel administrativo contendo:
  - Gráfico interativo de fluxo de caixa (Cash Flow).
  - Listagem e gerenciamento de imóveis.
  - Modais interativos para visualização e cadastro de novos dados.

---

## 🛠️ Stack Tecnológica

O projeto foi construído utilizando o que há de mais moderno no ecossistema de desenvolvimento web:

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) (Engine de estilização de alta performance)
- **Componentes de UI:** [shadcn/ui](https://ui.shadcn.com/) (Baseado em Radix UI primitives)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## 📦 Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### Passos para execução:
```bash
1. **Clone o repositório:**
   git clone [https://github.com/igorcarvalheira/Locare.git](https://github.com/igorcarvalheira/Locare.git)

2. **Entre na pasta do projeto:**
    cd locare-app

3. **Instale as dependências:**
    npm install

4. **Inicie o servidor de desenvolvimento:**
    npm run dev

5. **Acesse no navegador:***
    Abra http://localhost:3000 para visualizar a plataforma.
```

## 📂 Estrutura Principal do Projeto
```text
src/
├── app/                  # Rotas e páginas do Next.js (App Router)
│   ├── dashboard/        # Painel principal de gerenciamento de imóveis
│   ├── page.tsx          # Tela de Login (Página Inicial)
│   └── globals.css       # Estilos globais e tokens do Tailwind v4
├── components/           # Componentes modulares reutilizáveis
│   ├── dashboard/        # Componentes específicos do painel (gráficos, sidebar)
│   └── ui/               # Blocos fundamentais de interface (botões, inputs, tabelas)
└── lib/                  # Funções utilitárias e configurações gerais
```