"use client"

import { useState } from "react"
import { User, Shield, Bell, Palette, Save, Camera, Mail, Phone, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const sections = [
  { id: "profile", label: "Perfil do Usuário", icon: User },
  { id: "security", label: "Conta e Segurança", icon: Shield },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "appearance", label: "Aparência", icon: Palette },
]

export function ConfiguracoesScreen() {
  const [activeSection, setActiveSection] = useState("profile")

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500 mt-1">Gerencie suas preferências e conta</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-4 border border-white/50">
            <nav className="space-y-1">
              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left ${
                      isActive
                        ? "bg-violet-100 text-violet-700"
                        : "text-slate-600 hover:text-violet-600 hover:bg-violet-50"
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? "text-violet-600" : "text-violet-500"}`} />
                    <span className="font-medium">{section.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === "profile" && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/50">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Perfil do Usuário</h2>
              
              {/* Avatar Section */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <Avatar className="h-24 w-24 ring-4 ring-violet-100">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Igor Carvalheira" />
                    <AvatarFallback className="bg-violet-600 text-white text-2xl font-semibold">IC</AvatarFallback>
                  </Avatar>
                  <button className="absolute bottom-0 right-0 h-8 w-8 bg-violet-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-violet-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Igor Carvalheira</h3>
                  <p className="text-slate-500">Administrador</p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-medium">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="name"
                      defaultValue="Igor Carvalheira"
                      className="pl-10 rounded-xl border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      defaultValue="igor@locare.com.br"
                      className="pl-10 rounded-xl border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700 font-medium">Telefone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="phone"
                      defaultValue="(11) 99999-0000"
                      className="pl-10 rounded-xl border-slate-200"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-slate-700 font-medium">Endereço</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                      id="address"
                      defaultValue="São Paulo, SP"
                      className="pl-10 rounded-xl border-slate-200"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/50">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Conta e Segurança</h2>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-slate-700 font-medium">Senha Atual</Label>
                  <Input
                    id="current-password"
                    type="password"
                    placeholder="Digite sua senha atual"
                    className="rounded-xl border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-slate-700 font-medium">Nova Senha</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Digite a nova senha"
                      className="rounded-xl border-slate-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-slate-700 font-medium">Confirmar Senha</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirme a nova senha"
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Autenticação de Dois Fatores</p>
                    <p className="text-sm text-slate-500">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Sessões Ativas</p>
                    <p className="text-sm text-slate-500">Gerencie dispositivos conectados</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    Gerenciar
                  </Button>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30">
                  <Save className="h-4 w-4 mr-2" />
                  Atualizar Senha
                </Button>
              </div>
            </div>
          )}

          {activeSection === "notifications" && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/50">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Preferências de Notificação</h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Notificações por Email</p>
                    <p className="text-sm text-slate-500">Receba atualizações importantes por email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Novos Chamados</p>
                    <p className="text-sm text-slate-500">Seja notificado sobre novos chamados de manutenção</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Pagamentos Recebidos</p>
                    <p className="text-sm text-slate-500">Notificações quando receber pagamentos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Contratos a Vencer</p>
                    <p className="text-sm text-slate-500">Alertas sobre contratos próximos do vencimento</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Relatórios Mensais</p>
                    <p className="text-sm text-slate-500">Receba resumos mensais automaticamente</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </div>
          )}

          {activeSection === "appearance" && (
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/50">
              <h2 className="text-lg font-semibold text-slate-900 mb-6">Aparência</h2>

              <div className="space-y-6">
                <div>
                  <Label className="text-slate-700 font-medium mb-4 block">Tema</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 rounded-xl border-2 border-violet-500 bg-white text-center transition-all">
                      <div className="h-8 w-8 bg-slate-100 rounded-lg mx-auto mb-2" />
                      <span className="text-sm font-medium text-slate-900">Claro</span>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-violet-300 text-center transition-all">
                      <div className="h-8 w-8 bg-slate-900 rounded-lg mx-auto mb-2" />
                      <span className="text-sm font-medium text-slate-900">Escuro</span>
                    </button>
                    <button className="p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-violet-300 text-center transition-all">
                      <div className="h-8 w-8 bg-gradient-to-br from-slate-100 to-slate-900 rounded-lg mx-auto mb-2" />
                      <span className="text-sm font-medium text-slate-900">Sistema</span>
                    </button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Animações Reduzidas</p>
                    <p className="text-sm text-slate-500">Diminuir animações da interface</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                  <div>
                    <p className="font-medium text-slate-900">Modo Compacto</p>
                    <p className="text-sm text-slate-500">Reduzir espaçamentos e tamanhos</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-600/30">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Preferências
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
