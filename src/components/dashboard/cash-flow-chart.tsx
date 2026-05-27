"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const data = [
  { month: "Jan", receitas: 24000, despesas: 4200 },
  { month: "Fev", receitas: 25500, despesas: 3800 },
  { month: "Mar", receitas: 26800, despesas: 5100 },
  { month: "Abr", receitas: 27200, despesas: 4500 },
  { month: "Mai", receitas: 28100, despesas: 3900 },
  { month: "Jun", receitas: 28400, despesas: 4800 },
]

interface TooltipPayload {
  value: number
  dataKey: string
  color: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xl z-50">
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-slate-600">
              {entry.dataKey === "receitas" ? "Receitas" : "Despesas"}:
            </span>
            <span className="font-semibold text-slate-900">
              R$ {entry.value.toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

export function CashFlowChart() {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">
          Fluxo de Caixa (Últimos 6 meses)
        </h3>
        <Button variant="outline" size="sm" className="gap-2 text-slate-600 hover:text-violet-600 hover:border-violet-300">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={8}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f1f5f9" }} />
            <Legend
              formatter={(value) =>
                value === "receitas" ? "Receitas" : "Despesas de Manutenção"
              }
              wrapperStyle={{ paddingTop: "20px", color: "#334155" }}
            />
            <Bar
              dataKey="receitas"
              fill="#7c3aed"
              radius={[4, 4, 0, 0]}
              name="receitas"
            />
            <Bar
              dataKey="despesas"
              fill="#f43f5e"
              radius={[4, 4, 0, 0]}
              name="despesas"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
