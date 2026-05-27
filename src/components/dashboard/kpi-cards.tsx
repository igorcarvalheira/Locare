"use client"

import { Building2, TrendingUp, Wallet, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string
  icon: React.ReactNode
  trend?: string
  trendUp?: boolean
  alert?: boolean
}

function KPICard({ title, value, icon, trend, trendUp, alert }: KPICardProps) {
  return (
    <div className="relative overflow-hidden bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 hover:-translate-y-1 hover:shadow-xl transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className={cn(
            "text-3xl font-bold mt-2",
            alert ? "text-red-600" : "text-slate-900"
          )}>
            {value}
          </p>
          {trend && (
            <p className={cn(
              "text-sm mt-2 font-medium",
              trendUp ? "text-emerald-600" : "text-red-600"
            )}>
              {trend}
            </p>
          )}
        </div>
        <div className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          alert ? "bg-red-100" : "bg-violet-100"
        )}>
          {icon}
        </div>
      </div>
      {/* Decorative gradient */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-violet-100/50 to-transparent rounded-full blur-2xl" />
    </div>
  )
}

export function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard
        title="Total de Imóveis"
        value="20"
        icon={<Building2 className="h-6 w-6 text-violet-600" />}
      />
      <KPICard
        title="Taxa de Ocupação"
        value="95%"
        icon={<TrendingUp className="h-6 w-6 text-violet-600" />}
        trend="+2% vs mês anterior"
        trendUp
      />
      <KPICard
        title="Receita Este Mês"
        value="R$ 28.400,00"
        icon={<Wallet className="h-6 w-6 text-violet-600" />}
      />
      <KPICard
        title="Aluguéis Pendentes"
        value="2"
        icon={<AlertCircle className="h-6 w-6 text-red-600" />}
        alert
      />
    </div>
  )
}
