import { Home, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BrandPanel } from "@/components/auth/brand-panel"

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Mensagem */}
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-400 ease-out fill-mode-both">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold text-foreground">
              Locare
            </span>
          </div>

          {/* Mensagem de erro */}
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Link inválido ou expirado
            </h1>
            <p className="text-muted-foreground">
              Não foi possível confirmar seu e-mail. O link pode ter expirado
              ou já ter sido usado. Tente fazer login normalmente ou refaça o
              cadastro para receber um novo link de confirmação.
            </p>
          </div>

          {/* Ações */}
          <div className="space-y-3">
            <Button asChild className="w-full">
              <a href="/login">Voltar para o login</a>
            </Button>
            <Button asChild variant="outline" className="w-full">
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
