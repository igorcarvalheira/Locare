"use client"

import { useState } from "react"
import { Search, Filter, Plus, MapPin, Bed, Bath, SquareIcon, X, FileText } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const properties = [
  {
    id: 1,
    name: "Apartamento Jardins",
    address: "Rua Oscar Freire, 1200 - Jardins, SP",
    status: "Alugado",
    rent: 4500,
    tenant: "Maria Silva",
    beds: 3,
    baths: 2,
    area: 120,
  },
  {
    id: 2,
    name: "Casa Alto de Pinheiros",
    address: "Rua dos Pinheiros, 500 - Alto de Pinheiros, SP",
    status: "Alugado",
    rent: 8500,
    tenant: "João Santos",
    beds: 4,
    baths: 3,
    area: 250,
  },
  {
    id: 3,
    name: "Studio Paulista",
    address: "Av. Paulista, 1578 - Bela Vista, SP",
    status: "Vago",
    rent: 2800,
    tenant: null,
    beds: 1,
    baths: 1,
    area: 45,
  },
  {
    id: 4,
    name: "Cobertura Itaim",
    address: "Rua Bandeira Paulista, 800 - Itaim Bibi, SP",
    status: "Alugado",
    rent: 15000,
    tenant: "Pedro Oliveira",
    beds: 4,
    baths: 4,
    area: 300,
  },
  {
    id: 5,
    name: "Apartamento Vila Madalena",
    address: "Rua Harmonia, 250 - Vila Madalena, SP",
    status: "Vago",
    rent: 3200,
    tenant: null,
    beds: 2,
    baths: 1,
    area: 75,
  },
]

export function ImoveisScreen() {
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTaxModalOpen, setIsTaxModalOpen] = useState(false)
  const [isInstallment, setIsInstallment] = useState(false)

  const filteredProperties = properties.filter((property) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "alugado" && property.status === "Alugado") ||
      (filter === "vago" && property.status === "Vago")
    const matchesSearch =
      property.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.address.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Imóveis</h1>
          <p className="text-slate-500 mt-1">Gerencie suas propriedades</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={() => setIsTaxModalOpen(true)}
            className="border-slate-300 bg-white text-slate-700 hover:bg-slate-50 rounded-xl"
          >
            <FileText className="h-4 w-4 mr-2" />
            Lançar Imposto/Taxa
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Imóvel
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome ou endereço..."
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
              <SelectItem value="alugado">Alugado</SelectItem>
              <SelectItem value="vago">Vago</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Imóvel</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 hidden lg:table-cell">Detalhes</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
              <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600 hidden md:table-cell">Inquilino</th>
              <th className="text-right py-4 px-6 text-sm font-semibold text-slate-600">Aluguel</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer">
                <td className="py-4 px-6">
                  <div>
                    <p className="font-semibold text-slate-900">{property.name}</p>
                    <div className="flex items-center gap-1 text-sm text-slate-500 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[200px]">{property.address}</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 hidden lg:table-cell">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4 text-violet-500" />
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4 text-violet-500" />
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <SquareIcon className="h-4 w-4 text-violet-500" />
                      <span>{property.area}m²</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <Badge
                    variant="secondary"
                    className={
                      property.status === "Alugado"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-amber-100 text-amber-700 hover:bg-amber-100"
                    }
                  >
                    {property.status}
                  </Badge>
                </td>
                <td className="py-4 px-6 hidden md:table-cell">
                  <span className="text-slate-600">{property.tenant || "—"}</span>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="font-semibold text-slate-900">
                    R$ {property.rent.toLocaleString("pt-BR")}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
          <p className="text-sm text-slate-500">
            Mostrando {filteredProperties.length} de {properties.length} imóveis
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

      {/* Modal - Cadastrar Novo Imóvel */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Cadastrar Novo Imóvel</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Body - Scrollable */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Seção 1: Identificação e Endereço */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-violet-600 font-semibold mb-4">Identificação e Endereço</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="md:col-span-1">
                    <Label htmlFor="apelido" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Apelido do Imóvel
                    </Label>
                    <Input
                      id="apelido"
                      placeholder="Ex: Apartamento Jardins"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 focus:border-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tipo" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Tipo
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="sala">Sala Comercial</SelectItem>
                        <SelectItem value="galpao">Galpão</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="status" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Status
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vago">Vago</SelectItem>
                        <SelectItem value="alugado">Alugado</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label htmlFor="cep" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      CEP
                    </Label>
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="rua" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Rua
                    </Label>
                    <Input
                      id="rua"
                      placeholder="Nome da rua"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="numero" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Número
                    </Label>
                    <Input
                      id="numero"
                      placeholder="123"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="complemento" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Complemento
                    </Label>
                    <Input
                      id="complemento"
                      placeholder="Apto 101"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bairro" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Bairro
                    </Label>
                    <Input
                      id="bairro"
                      placeholder="Centro"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cidade" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Cidade
                    </Label>
                    <Input
                      id="cidade"
                      placeholder="São Paulo"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="uf" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      UF
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg">
                        <SelectValue placeholder="UF" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SP">SP</SelectItem>
                        <SelectItem value="RJ">RJ</SelectItem>
                        <SelectItem value="MG">MG</SelectItem>
                        <SelectItem value="PE">PE</SelectItem>
                        <SelectItem value="BA">BA</SelectItem>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Seção 2: Características */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-violet-600 font-semibold mb-4">Características</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <Label htmlFor="area" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Área Útil (m²)
                    </Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="120"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quartos" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Quartos
                    </Label>
                    <Input
                      id="quartos"
                      type="number"
                      placeholder="3"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="suites" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Suítes
                    </Label>
                    <Input
                      id="suites"
                      type="number"
                      placeholder="1"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="banheiros" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Banheiros
                    </Label>
                    <Input
                      id="banheiros"
                      type="number"
                      placeholder="2"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="vagas" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Vagas
                    </Label>
                    <Input
                      id="vagas"
                      type="number"
                      placeholder="2"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 3: Financeiro e Fiscais */}
              <div className="border-b border-slate-200 pb-6">
                <h3 className="text-violet-600 font-semibold mb-4">Financeiro e Fiscais</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label htmlFor="aluguel" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Valor Base do Aluguel (R$)
                    </Label>
                    <Input
                      id="aluguel"
                      type="number"
                      placeholder="2.500,00"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="condominio" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Condomínio (R$)
                    </Label>
                    <Input
                      id="condominio"
                      type="number"
                      placeholder="800,00"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="inscricao" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Inscrição Municipal (IPTU)
                    </Label>
                    <Input
                      id="inscricao"
                      placeholder="000.000.000-0"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="iptu" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Valor Anual do IPTU (R$)
                    </Label>
                    <Input
                      id="iptu"
                      type="number"
                      placeholder="3.600,00"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Seção 4: Concessionárias (Opcional) */}
              <div>
                <h3 className="text-violet-600 font-semibold mb-4">Concessionárias (Opcional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="energia" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Código do Cliente - Energia (ex: Neoenergia)
                    </Label>
                    <Input
                      id="energia"
                      placeholder="0000000000"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="agua" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Matrícula - Água (ex: Compesa)
                    </Label>
                    <Input
                      id="agua"
                      placeholder="0000000000"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <Button
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </Button>
              <Button
                className="bg-violet-600 hover:bg-violet-700 text-white rounded-lg"
              >
                Salvar Imóvel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Lançar Imposto/Taxa */}
      {isTaxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setIsTaxModalOpen(false)
              setIsInstallment(false)
            }}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Lançar Imposto ou Taxa</h2>
              <button
                onClick={() => {
                  setIsTaxModalOpen(false)
                  setIsInstallment(false)
                }}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form Body */}
            <div className="p-6 space-y-4">
              {/* Imóvel Vinculado */}
              <div>
                <Label htmlFor="imovel-vinculado" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Imóvel Vinculado
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg">
                    <SelectValue placeholder="Selecione o imóvel" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id.toString()}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tipo de Despesa */}
              <div>
                <Label htmlFor="tipo-despesa" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Tipo de Despesa
                </Label>
                <Select>
                  <SelectTrigger className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iptu">IPTU</SelectItem>
                    <SelectItem value="bombeiros">Taxa de Bombeiros</SelectItem>
                    <SelectItem value="foro">Foro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Ano e Valor */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ano-exercicio" className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Ano de Exercício
                  </Label>
                  <Input
                    id="ano-exercicio"
                    type="number"
                    placeholder="2026"
                    className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="valor-total" className="text-sm font-medium text-slate-700 mb-1.5 block">
                    Valor Total (R$)
                  </Label>
                  <Input
                    id="valor-total"
                    type="number"
                    placeholder="3.600,00"
                    className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                  />
                </div>
              </div>

              {/* Data de Vencimento */}
              <div>
                <Label htmlFor="data-vencimento" className="text-sm font-medium text-slate-700 mb-1.5 block">
                  Data de Vencimento da Cota Única ou 1ª Parcela
                </Label>
                <Input
                  id="data-vencimento"
                  type="date"
                  className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                />
              </div>

              {/* Toggle Parcelar */}
              <div className="pt-2">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <Label htmlFor="parcelar-switch" className="text-sm font-medium text-slate-700 cursor-pointer">
                    Parcelar este imposto?
                  </Label>
                  <Switch
                    id="parcelar-switch"
                    checked={isInstallment}
                    onCheckedChange={setIsInstallment}
                  />
                </div>
                
                {/* Campo de parcelas - condicional */}
                {isInstallment && (
                  <div className="mt-4">
                    <Label htmlFor="qtd-parcelas" className="text-sm font-medium text-slate-700 mb-1.5 block">
                      Quantidade de Parcelas
                    </Label>
                    <Input
                      id="qtd-parcelas"
                      type="number"
                      placeholder="12"
                      min="2"
                      max="24"
                      className="bg-slate-50 border-slate-300 focus:ring-violet-600 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-slate-200 bg-slate-50">
              <Button
                variant="outline"
                onClick={() => {
                  setIsTaxModalOpen(false)
                  setIsInstallment(false)
                }}
                className="border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </Button>
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
              >
                Salvar Lançamento
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
