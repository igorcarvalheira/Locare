"use client"

import { Search, Bell } from "lucide-react"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <div className="relative bg-gradient-to-r from-violet-600 to-blue-500 px-8 pt-8 pb-24">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Bom dia, Igor!</h1>
          <p className="text-violet-100 mt-1">
            Aqui está o resumo dos seus imóveis hoje
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar..."
              className="w-64 pl-10 bg-white/95 border-0 shadow-lg backdrop-blur-sm focus-visible:ring-2 focus-visible:ring-white/50"
            />
          </div>
          <button className="relative p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm">
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>
    </div>
  )
}
