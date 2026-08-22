const ledgerRows = [
  { label: "Ocupação", value: "92%" },
  { label: "Contratos ativos", value: "18" },
  { label: "A vencer em 30 dias", value: "R$ 6.200" },
]

// O painel sempre usa a paleta escura da identidade (classe `dark` local),
// independente do tema claro/escuro escolhido pelo usuário no restante do
// site — é a estética fixa do "extrato", não uma superfície que alterna.
export function BrandPanel() {
  return (
    <div className="dark hidden lg:flex lg:w-1/2 relative overflow-hidden bg-background">
      {/* Formas geométricas abstratas */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-money/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

        {/* Padrões geométricos sutis */}
        <div className="absolute top-32 right-20 w-20 h-20 border border-border rounded-lg rotate-12" />
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-border rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-border rounded-lg rotate-45" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col justify-center gap-10 p-12 w-full animate-in fade-in slide-in-from-bottom-2 duration-500 ease-out delay-100 fill-mode-both">
        <div className="max-w-lg space-y-3">
          <h2 className="font-display text-3xl md:text-4xl text-foreground leading-tight text-balance">
            O extrato dos seus aluguéis, sempre em dia.
          </h2>
          <p className="text-muted-foreground">
            Contratos, recebimentos e manutenções num painel só — sem
            planilha, sem esquecimento.
          </p>
        </div>

        {/* Mini-extrato financeiro */}
        <div className="max-w-lg rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-6">
          <p className="text-sm text-muted-foreground">Recebido no mês</p>
          <p className="font-mono text-4xl text-money mt-1">R$ 42.850</p>

          <div className="mt-5 divide-y divide-border">
            {ledgerRows.map((row) => (
              <div
                key={row.label}
                className="flex items-baseline justify-between py-3"
              >
                <span className="text-sm text-muted-foreground">
                  {row.label}
                </span>
                <span className="font-mono text-lg text-foreground">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Valores ilustrativos e estáticos: esta é a tela de entrada,
              sem dados reais ainda — não há usuário autenticado aqui. */}
        </div>
      </div>
    </div>
  )
}
