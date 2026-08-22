"use client"

import { useState } from "react"
import { Eye, EyeOff, type LucideIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AuthFieldProps {
  id: string
  name: string
  label: string
  icon: LucideIcon
  value: string
  onChange: (value: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
  isPassword?: boolean
  /** "lg" dá caixas maiores (~48px), usado no herói do login. Não afeta
   * outras telas que continuem usando o tamanho padrão. */
  size?: "default" | "lg"
}

// Campo de formulário de autenticação: label + input com ícone à esquerda,
// com toggle de mostrar/ocultar senha opcional. Usado em login e cadastro
// para não duplicar o mesmo padrão visual nas duas telas.
export function AuthField({
  id,
  name,
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  isPassword = false,
  size = "default",
}: AuthFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type
  const sizeClasses = size === "lg" ? "h-12 rounded-lg text-[15px]" : ""

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-3 top-1/2 w-5 h-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={id}
          name={name}
          type={resolvedType}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(isPassword ? "pl-10 pr-10" : "pl-10", sizeClasses)}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}
