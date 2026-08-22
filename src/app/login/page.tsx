"use client"

import { useState } from "react"
import { motion, useReducedMotion, type Variants } from "motion/react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Home,
  Mail,
  Lock,
  FileText,
  RefreshCw,
  Wrench,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { login } from "./actions"
import { AuthField } from "@/components/auth/auth-field"

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

// Orquestra a cascata de cima pra baixo entre as seções da página: cada
// filha direta (logo, herói, apoio, formulário, painel) usa
// sectionVariants (ou seu próprio reveal, no caso do herói) e herda
// hidden/visible deste pai — staggerChildren dá o delay escalonado.
const pageVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
}

// Fade + leve subida — usado nas seções "simples" da cascata.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

// Orquestra o stagger entre as linhas do herói — cada filha usa
// lineVariants e herda hidden/visible deste pai automaticamente.
const lineContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

// Reveal por máscara: a linha nasce deslocada 100% para baixo (escondida
// pelo overflow-hidden do wrapper pai) e sobe com física de mola.
const lineVariants: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: "0%",
    transition: { type: "spring", stiffness: 300, damping: 30, mass: 0.9 },
  },
}

// Painel de recursos: desliza da direita (fade + translateX), não o
// fade+translateY das demais seções — pedido explícito de diferenciar a
// entrada do bloco lateral.
const panelVariants: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

interface Resource {
  icon: LucideIcon
  title: string
  description: string
}

const RESOURCES: Resource[] = [
  {
    icon: FileText,
    title: "Contratos digitais",
    description: "Vigência, reajuste e vencimentos organizados.",
  },
  {
    icon: RefreshCw,
    title: "Cobrança automática",
    description: "Aluguel e encargos gerados todo mês, sem esforço.",
  },
  {
    icon: Wrench,
    title: "Chamados de manutenção",
    description: "Do pedido ao reparo, tudo registrado.",
  },
  {
    icon: BarChart3,
    title: "Fluxo de caixa claro",
    description: "Receitas e despesas por imóvel, num relance.",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData()
    formData.set("email", email)
    formData.set("password", password)

    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // `false` faz o motion pular direto para o estado "visible", sem
  // transição — é o que prefers-reduced-motion pede: nada de movimento,
  // conteúdo já no estado final.
  const initial = shouldReduceMotion ? false : "hidden"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        initial={initial}
        animate="visible"
        variants={pageVariants}
        suppressHydrationWarning
        className="lg:flex lg:min-h-screen"
      >
        {/* Coluna esquerda: logo, herói, apoio, formulário — 3 zonas
            (topo/centro/base) distribuídas com justify-between, para não
            depender de margens grandes fixas entre elas. */}
        <div className="lg:w-[55%] min-h-screen flex flex-col justify-between px-6 sm:px-12 lg:px-16 py-10">
          {/* TOPO: bloco de marca (logo + nome), coeso */}
          <motion.div
            variants={sectionVariants}
            suppressHydrationWarning
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 bg-primary rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold">
              Locare
            </span>
          </motion.div>

          {/* CENTRO: herói + apoio + marca — bloco principal, centralizado
              verticalmente na zona que sobra entre topo e base. */}
          <div className="flex-1 flex flex-col justify-center">
            <h1
              aria-label="Todo aluguel, em dia."
              className="font-display font-medium tracking-tight leading-[1.08] text-[clamp(2.5rem,5vw,4.5rem)] max-w-2xl"
            >
              <motion.span
                aria-hidden="true"
                className="block"
                variants={lineContainerVariants}
                suppressHydrationWarning
              >
                {/* pb-[0.15em] dá respiro pra descida do "g" (e p/q/j),
                    que a máscara overflow-hidden cortaria sem esse espaço. */}
                <span className="block overflow-hidden pb-[0.15em]">
                  <motion.span
                    className="block"
                    variants={lineVariants}
                    suppressHydrationWarning
                  >
                    Todo aluguel,
                  </motion.span>
                </span>
                <span className="block overflow-hidden pb-[0.15em]">
                  <motion.span
                    className="block text-primary"
                    variants={lineVariants}
                    suppressHydrationWarning
                  >
                    em dia.
                  </motion.span>
                </span>
              </motion.span>
            </h1>

            <motion.div
              variants={sectionVariants}
              suppressHydrationWarning
              className="mt-6 max-w-lg space-y-2"
            >
              <p className="text-lg text-muted-foreground">
                Contratos, cobranças e manutenções em um só lugar.
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-primary">
                Gestão de aluguéis, sem planilha
              </p>
            </motion.div>
          </div>

          {/* BASE: formulário completo */}
          <motion.div
            variants={sectionVariants}
            suppressHydrationWarning
            className="max-w-md w-full"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <AuthField
                id="email"
                name="email"
                label="E-mail"
                icon={Mail}
                type="email"
                autoComplete="email"
                placeholder="seu@email.com"
                value={email}
                onChange={setEmail}
                size="lg"
              />

              <AuthField
                id="password"
                name="password"
                label="Senha"
                icon={Lock}
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                isPassword
                size="lg"
              />

              {/* Ações Secundárias */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Lembrar de mim
                  </label>
                </div>
                <a
                  href="#"
                  className={`text-sm text-primary font-medium transition-colors duration-150 hover:text-primary/80 ${focusRing}`}
                >
                  Esqueci minha senha
                </a>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              )}

              {/* Botão Primário */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-lg text-base transition-transform duration-150 hover:scale-[1.01] active:scale-[0.99]"
              >
                {isSubmitting ? "Entrando..." : "Entrar no painel"}
              </Button>

              {/* Divisor */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-background text-muted-foreground">
                    ou continue com
                  </span>
                </div>
              </div>

              {/* Botão Google */}
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-lg text-base"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Entrar com Google
              </Button>
            </form>

            <p className="mt-6 text-sm text-muted-foreground">
              Ainda não tem uma conta?{" "}
              <a
                href="/signup"
                className={`text-primary font-medium transition-colors duration-150 hover:text-primary/80 ${focusRing}`}
              >
                Cadastre-se
              </a>
            </p>
          </motion.div>
        </div>

        {/* Painel de recursos — estética "caderneta editorial". Bloco
            coeso centralizado verticalmente, com gaps GRANDES e FIXOS
            entre título/recursos/rodapé — mais previsível em qualquer
            altura de viewport do que esticar com justify-between (que
            deixava um vão enorme e desigual em telas altas). */}
        <motion.div
          variants={panelVariants}
          suppressHydrationWarning
          className="lg:w-[45%] bg-panel text-panel-foreground flex flex-col justify-center gap-12 lg:gap-16 px-6 py-16 sm:px-10 lg:px-16"
        >
          <div className="max-w-lg mx-auto lg:mx-0 w-full">
            <p className="font-mono text-xs uppercase tracking-wider text-panel-foreground/60">
              O que você controla aqui
            </p>
            <h2 className="font-display text-3xl lg:text-4xl leading-tight mt-4">
              Toda a sua carteira, sem planilha.
            </h2>
          </div>

          <div className="max-w-lg mx-auto lg:mx-0 w-full divide-y divide-panel-foreground/10">
            {RESOURCES.map((resource) => {
              const Icon = resource.icon
              return (
                <div
                  key={resource.title}
                  className="flex gap-5 py-6 first:pt-0 last:pb-0"
                >
                  <Icon className="w-7 h-7 shrink-0 mt-0.5 text-panel-foreground/70" />
                  <div>
                    <p className="text-base font-medium">{resource.title}</p>
                    <p className="text-sm text-panel-foreground/70 mt-1">
                      {resource.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="max-w-lg mx-auto lg:mx-0 w-full font-mono text-xs text-panel-foreground/50">
            Locare · gestão de locações
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
