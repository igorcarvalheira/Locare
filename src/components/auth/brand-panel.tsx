export function BrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 to-indigo-900 relative overflow-hidden">
      {/* Formas geométricas abstratas */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl"></div>

        {/* Padrões geométricos sutis */}
        <div className="absolute top-32 right-20 w-20 h-20 border border-white/10 rounded-lg rotate-12"></div>
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-white/10 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 border border-white/5 rounded-lg rotate-45"></div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
        <div className="max-w-lg space-y-6">
          <h2 className="text-4xl font-bold text-white leading-tight text-balance">
            A gestão dos seus aluguéis em um só lugar.
          </h2>
          <p className="text-lg text-purple-200">
            Centralize contratos, automatize cobranças e acompanhe manutenções com Inteligência Artificial.
          </p>

          {/* Cards de features */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">500+</div>
              <div className="text-sm text-purple-200">Imobiliárias</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">50k+</div>
              <div className="text-sm text-purple-200">Contratos</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-white">99%</div>
              <div className="text-sm text-purple-200">Satisfação</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
