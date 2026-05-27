"use client"

import { useState } from "react"
import { Search, Filter, Plus, Mail, Phone, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const tenants = [
  {
    id: 1,
    name: "Maria Silva",
    email: "maria.silva@email.com",
    phone: "(11) 99999-1234",
    property: "Apartamento Jardins",
    contractStart: "01/01/2024",
    contractEnd: "01/01/2025",
    status: "Ativo",
    rent: 4500,
  },
  {
    id: 2,
    name: "João Santos",
    email: "joao.santos@email.com",
    phone: "(11) 99888-5678",
    property: "Casa Alto de Pinheiros",
    contractStart: "15/03/2023",
    contractEnd: "15/03/2025",
    status: "Ativo",
    rent: 8500,
  },
  {
    id: 3,
    name: "Pedro Oliveira",
    email: "pedro.oliveira@email.com",
    phone: "(11) 97777-9012",
    property: "Cobertura Itaim",
    contractStart: "01/06/2024",
    contractEnd: "01/08/2024",
    status: "A vencer",
    rent: 15000,
  },
  {
    id: 4,
    name: "Ana Costa",
    email: "ana.costa@email.com",
    phone: "(11) 96666-3456",
    property: "Apartamento Moema",
    contractStart: "01/02/2024",
    contractEnd: "01/02/2025",
    status: "Ativo",
    rent: 5200,
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    email: "carlos.ferreira@email.com",
    phone: "(11) 95555-7890",
    property: "Studio Consolação",
    contractStart: "10/01/2024",
    contractEnd: "10/07/2024",
    status: "A vencer",
    rent: 2400,
  },
]

export function InquilinosScreen() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTenants = tenants.filter((tenant) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "ativo" && tenant.status === "Ativo") ||
      (filter === "avencer" && tenant.status === "A vencer")
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inquilinos</h1>
          <p className="text-slate-500 mt-1">Gerencie seus inquilinos e contratos</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30">
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Inquilino
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome, email ou imóvel..."
              className="pl-10 rounded-xl border-slate-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-48 rounded-xl border-slate-200">
              <Filter className="h-4 w-4 mr-2 text-slate-400" />
              <SelectValue placeholder="Status do contrato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="ativo">Ativo</SelectItem>
              <SelectItem value="avencer">A vencer</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Inquilino</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 hidden lg:table-cell">Contato</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 hidden md:table-cell">Imóvel</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 hidden xl:table-cell">Contrato</th>
              <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">Aluguel</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/placeholder-avatar.jpg`} alt={tenant.name} />
                      <AvatarFallback className="bg-violet-100 text-violet-600 font-semibold">
                        {tenant.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">{tenant.name}</p>
                      <p className="text-sm text-slate-500 lg:hidden">{tenant.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Mail className="h-3 w-3 text-violet-500" />
                      <span>{tenant.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Phone className="h-3 w-3 text-violet-500" />
                      <span>{tenant.phone}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 hidden md:table-cell">
                  <span className="text-slate-900">{tenant.property}</span>
                </td>
                <td className="py-4 px-6 hidden xl:table-cell">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Calendar className="h-3 w-3 text-violet-500" />
                    <span>{tenant.contractStart} - {tenant.contractEnd}</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <Badge
                    variant="secondary"
                    className={
                      tenant.status === "Ativo"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }
                  >
                    {tenant.status}
                  </Badge>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="font-semibold text-slate-900">
                    R$ {tenant.rent.toLocaleString("pt-BR")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Mostrando {filteredTenants.length} de {tenants.length} inquilinos
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
