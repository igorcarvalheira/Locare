"use client"

import { useState } from "react"
import { Search, Filter, Plus, Clock, AlertCircle, CheckCircle2, Wrench } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const tickets = [
  {
    id: 1,
    property: "Apartamento Jardins",
    tenant: "Maria Silva",
    problem: "Vazamento na pia da cozinha",
    category: "Encanamento",
    status: "Pendente",
    priority: "Alta",
    date: "15/06/2024",
  },
  {
    id: 2,
    property: "Casa Alto de Pinheiros",
    tenant: "João Santos",
    problem: "Ar condicionado não está gelando",
    category: "Elétrica",
    status: "Em Andamento",
    priority: "Média",
    date: "14/06/2024",
  },
  {
    id: 3,
    property: "Cobertura Itaim",
    tenant: "Pedro Oliveira",
    problem: "Infiltração no teto do quarto",
    category: "Hidráulica",
    status: "Pendente",
    priority: "Alta",
    date: "13/06/2024",
  },
  {
    id: 4,
    property: "Studio Paulista",
    tenant: "—",
    problem: "Pintura descascando na sala",
    category: "Geral",
    status: "Resolvido",
    priority: "Baixa",
    date: "10/06/2024",
  },
  {
    id: 5,
    property: "Apartamento Moema",
    tenant: "Ana Costa",
    problem: "Porta do banheiro emperrada",
    category: "Marcenaria",
    status: "Em Andamento",
    priority: "Baixa",
    date: "08/06/2024",
  },
  {
    id: 6,
    property: "Casa Alto de Pinheiros",
    tenant: "João Santos",
    problem: "Torneira do jardim quebrada",
    category: "Encanamento",
    status: "Resolvido",
    priority: "Média",
    date: "05/06/2024",
  },
]

const statusIcons = {
  Pendente: AlertCircle,
  "Em Andamento": Clock,
  Resolvido: CheckCircle2,
}

const statusColors = {
  Pendente: "bg-amber-100 text-amber-700",
  "Em Andamento": "bg-blue-100 text-blue-700",
  Resolvido: "bg-green-100 text-green-700",
}

const priorityColors = {
  Alta: "bg-red-100 text-red-700",
  Média: "bg-amber-100 text-amber-700",
  Baixa: "bg-slate-100 text-slate-600",
}

export function ChamadosScreen() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pendente" && ticket.status === "Pendente") ||
      (filter === "andamento" && ticket.status === "Em Andamento") ||
      (filter === "resolvido" && ticket.status === "Resolvido")
    const matchesSearch =
      ticket.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const pendingCount = tickets.filter((t) => t.status === "Pendente").length
  const inProgressCount = tickets.filter((t) => t.status === "Em Andamento").length
  const resolvedCount = tickets.filter((t) => t.status === "Resolvido").length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Chamados de Manutenção</h1>
          <p className="text-slate-500 mt-1">Gerencie as solicitações de manutenção</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30">
          <Plus className="h-4 w-4 mr-2" />
          Novo Chamado
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Pendentes</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{pendingCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Em Andamento</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{inProgressCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500 font-medium">Resolvidos</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{resolvedCount}</p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por imóvel, problema ou categoria..."
              className="pl-10 rounded-xl border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl border-slate-200">
              <Filter className="h-4 w-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="andamento">Em Andamento</SelectItem>
              <SelectItem value="resolvido">Resolvido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Imóvel</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Problema</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 hidden md:table-cell">Categoria</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Prioridade</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600 hidden sm:table-cell">Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map((ticket) => {
              const StatusIcon = statusIcons[ticket.status as keyof typeof statusIcons]
              return (
                <tr key={ticket.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-semibold text-slate-900">{ticket.property}</p>
                      <p className="text-sm text-slate-500">{ticket.tenant}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-violet-500 flex-shrink-0" />
                      <span className="text-slate-900 truncate max-w-[200px]">{ticket.problem}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 hidden md:table-cell">
                    <span className="text-slate-600">{ticket.category}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge
                      variant="secondary"
                      className={`${priorityColors[ticket.priority as keyof typeof priorityColors]} hover:opacity-90`}
                    >
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Badge
                      variant="secondary"
                      className={`${statusColors[ticket.status as keyof typeof statusColors]} hover:opacity-90`}
                    >
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {ticket.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right hidden sm:table-cell">
                    <span className="text-slate-500">{ticket.date}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Mostrando {filteredTickets.length} de {tickets.length} chamados
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-lg" disabled>
              Anterior
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg bg-violet-50 text-violet-600 border-violet-200">
              1
            </Button>
            <Button variant="outline" size="sm" className="rounded-lg">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
