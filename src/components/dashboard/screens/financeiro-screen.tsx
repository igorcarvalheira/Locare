"use client"

import { useState } from "react"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Filter, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const chartData = [
  { month: "Jan", receitas: 24000, despesas: 4200 },
  { month: "Fev", receitas: 25500, despesas: 3800 },
  { month: "Mar", receitas: 26800, despesas: 5100 },
  { month: "Abr", receitas: 27200, despesas: 4500 },
  { month: "Mai", receitas: 28100, despesas: 3900 },
  { month: "Jun", receitas: 28400, despesas: 4800 },
]

const transactions = [
  { id: 1, date: "15/06/2024", type: "Receita", description: "Aluguel - Apt. Jardins", amount: 4500, status: "Recebido" },
  { id: 2, date: "14/06/2024", type: "Despesa", description: "Manutenção - Encanamento", amount: -850, status: "Pago" },
  { id: 3, date: "12/06/2024", type: "Receita", description: "Aluguel - Casa Alto Pinheiros", amount: 8500, status: "Recebido" },
  { id: 4, date: "10/06/2024", type: "Despesa", description: "IPTU - Studio Paulista", amount: -320, status: "Pago" },
  { id: 5, date: "08/06/2024", type: "Receita", description: "Aluguel - Cobertura Itaim", amount: 15000, status: "Recebido" },
  { id: 6, date: "05/06/2024", type: "Despesa", description: "Pintura - Apt. Vila Madalena", amount: -2200, status: "Pago" },
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

export function FinanceiroScreen() {
  const [period, setPeriod] = useState("6m")

  const totalReceitas = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0)
  const totalDespesas = Math.abs(transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0))
  const saldoLiquido = totalReceitas - totalDespesas

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Financeiro</h1>
          <p className="text-slate-500 mt-1">Acompanhe receitas e despesas</p>
        </div>
        <Button variant="outline" className="rounded-xl">
          <Download className="h-4 w-4 mr-2" />
          Exportar Relatório
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Receitas</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                R$ {totalReceitas.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Despesas</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                R$ {totalDespesas.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center">
              <ArrowDownRight className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Saldo Líquido</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                R$ {saldoLiquido.toLocaleString("pt-BR")}
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-violet-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">Fluxo de Caixa Detalhado</h3>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36 rounded-xl border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
              <SelectItem value="12m">Últimos 12 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorReceitas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cbd5e1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#cbd5e1" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="receitas"
                stroke="#7c3aed"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReceitas)"
              />
              <Area
                type="monotone"
                dataKey="despesas"
                stroke="#94a3b8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorDespesas)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-900">Receitas x Manutenções</h3>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 rounded-xl border-slate-200">
              <Filter className="h-4 w-4 mr-2 text-slate-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="receitas">Receitas</SelectItem>
              <SelectItem value="despesas">Despesas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Data</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Tipo</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Descrição</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">Valor</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-slate-600">{transaction.date}</td>
                <td className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className={
                      transaction.type === "Receita"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-red-100 text-red-700 hover:bg-red-100"
                    }
                  >
                    {transaction.type}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-slate-900">{transaction.description}</td>
                <td className={`py-4 px-6 text-right font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount > 0 ? "+" : ""}R$ {Math.abs(transaction.amount).toLocaleString("pt-BR")}
                </td>
                <td className="py-4 px-6 text-center">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-100">
                    {transaction.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
