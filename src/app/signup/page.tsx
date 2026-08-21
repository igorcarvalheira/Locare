"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Home, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { signup } from "./actions"
import { BrandPanel } from "@/components/auth/brand-panel"

type Notice = { variant: "error" | "success"; message: string } | null

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <Home className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">Locare</span>
          </div>

          {/* Textos */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-slate-900">Crie sua conta</h1>
            <p className="text-gray-500">Comece a gerenciar seus imóveis hoje mesmo.</p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Nome completo */}
            <div className="space-y-2">
              <label htmlFor="full_name" className="text-sm font-medium text-slate-700">
                Nome completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  placeholder="Seu nome completo"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-300 focus:ring-purple-600 focus:border-purple-600 focus-visible:ring-purple-600"
                />
              </div>
            </div>

            {/* Campo E-mail */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-700">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-300 focus:ring-purple-600 focus:border-purple-600 focus-visible:ring-purple-600"
                />
              </div>
            </div>

            {/* Campo Senha */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-gray-50 border-gray-300 focus:ring-purple-600 focus:border-purple-600 focus-visible:ring-purple-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Mensagem de erro ou aviso neutro de confirmação */}
            {notice && (
              <p
                className={
                  notice.variant === "error"
                    ? "text-sm text-red-600"
                    : "text-sm text-sky-700"
                }
                role="alert"
              >
                {notice.message}
              </p>
            )}

            {/* Botão Primário */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 disabled:opacity-70"
            >
              {isSubmitting ? "Cadastrando..." : "Criar conta"}
            </Button>

            {/* Divisor */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">ou continue com</span>
              </div>
            </div>

            {/* Botão Google */}
            <Button
              type="button"
              variant="outline"
              className="w-full border-gray-300 bg-white hover:bg-gray-50 text-slate-700 font-medium py-2.5"
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
              Cadastrar com Google
            </Button>
          </form>

          {/* Rodapé */}
          <p className="text-center text-sm text-gray-600">
            Já tem uma conta?{" "}
            <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
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
