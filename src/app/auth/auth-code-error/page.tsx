import { Home, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandPanel } from "@/components/auth/brand-panel"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Mensagem */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Locare</span>
          </div>

          {/* Mensagem de erro */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              Link inválido ou expirado
            </h1>
            <p className="text-gray-500">
              Não foi possível confirmar seu e-mail. O link pode ter expirado
              ou já ter sido usado. Tente fazer login normalmente ou refaça o
              cadastro para receber um novo link de confirmação.
            </p>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5"
            >
              <a href="/">Voltar para o login</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-gray-300 bg-white hover:bg-gray-50 text-slate-700 font-medium py-2.5"
            >
              <a href="/signup">Cadastrar novamente</a>
            </Button>
          </div>
        </div>
      </div>

      {/* Coluna Direita - Visual de Marca */}
      <BrandPanel />
    </div>
  )
}
