"use client"

import { FileText } from "lucide-react"

export function ContractsOverview() {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
          <FileText className="h-5 w-5 text-violet-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Visão Geral de Contratos
        </h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-medium text-slate-900">Ativos</span>
          </div>
          <span className="text-2xl font-bold text-emerald-600">19</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-medium text-slate-900">A vencer (30 dias)</span>
          </div>
          <span className="text-2xl font-bold text-amber-600">1</span>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-slate-400" />
            <span className="font-medium text-slate-900">Vencidos</span>
          </div>
          <span className="text-2xl font-bold text-slate-500">0</span>
        </div>
      </div>
    </div>
  )
}
