"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, Mail, Lock, User } from "lucide-react"
import { signup } from "./actions"
import { BrandPanel } from "@/components/auth/brand-panel"
import { AuthField } from "@/components/auth/auth-field"

const focusRing =
  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"

type Notice = { variant: "error" | "success"; message: string } | null

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [notice, setNotice] = useState<Notice>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotice(null)
    setIsSubmitting(true)

    const formData = new FormData()
    formData.set("full_name", fullName)
    formData.set("email", email)
    formData.set("password", password)

    try {
      const result = await signup(formData)
      setNotice({
        variant: result.ok ? "success" : "error",
        message: result.message,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Formulário */}
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

          {/* Textos */}
          <div className="space-y-2">
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Crie sua conta
            </h1>
            <p className="text-muted-foreground">
              Comece a gerenciar seus imóveis hoje mesmo.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <AuthField
              id="full_name"
              name="full_name"
              label="Nome completo"
              icon={User}
              autoComplete="name"
              placeholder="Seu nome completo"
              value={fullName}
              onChange={setFullName}
            />

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
            />

            <AuthField
              id="password"
              name="password"
              label="Senha"
              icon={Lock}
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              isPassword
            />

            {/* Mensagem de erro ou aviso neutro de confirmação */}
            {notice && (
              <p
                className={
                  notice.variant === "error"
                    ? "text-sm text-destructive"
                    : "text-sm text-primary"
                }
                role="alert"
              >
                {notice.message}
              </p>
            )}

            {/* Botão Primário */}
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Cadastrando..." : "Criar conta"}
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
            <Button type="button" variant="outline" className="w-full">
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
              Cadastrar com Google
            </Button>
          </form>

          {/* Rodapé */}
          <p className="text-center text-sm text-muted-foreground">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className={`text-primary font-medium transition-colors duration-150 hover:text-primary/80 ${focusRing}`}
            >
              Entrar
            </a>
          </p>
        </div>
      </div>

      {/* Coluna Direita - Visual de Marca */}
      <BrandPanel />
    </div>
  )
}
