"use client"

import {
  Home,
  Building2,
  Wallet,
  Users,
  Wrench,
  Settings,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { logout } from "@/app/dashboard/actions"

const navItems = [
  { icon: Home, label: "Dashboard", id: "dashboard" },
  { icon: Building2, label: "Imóveis", id: "imoveis" },
  { icon: Wallet, label: "Financeiro", id: "financeiro" },
  { icon: Users, label: "Inquilinos", id: "inquilinos" },
  { icon: Wrench, label: "Chamados", id: "chamados" },
  { icon: Settings, label: "Configurações", id: "configuracoes" },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white/90 backdrop-blur-md border-r border-slate-200 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-slate-100">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 shadow-lg shadow-violet-600/30">
          <Home className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold text-violet-600">Locare</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-left group",
                isActive
                  ? "bg-violet-100 text-violet-700"
                  : "text-slate-600 hover:text-violet-600 hover:bg-violet-50"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 transition-colors",
                isActive ? "text-violet-600" : "text-violet-500 group-hover:text-violet-600"
              )} />
              <span className="font-medium">{item.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-6 bg-violet-600 rounded-full" />
              )}
            </button>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50">
          <Avatar className="h-10 w-10 ring-2 ring-violet-200">
            <AvatarImage src="/placeholder-avatar.jpg" alt="Igor Carvalheira" />
            <AvatarFallback className="bg-violet-600 text-white font-semibold">IC</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-900 truncate">Igor Carvalheira</p>
            <p className="text-xs text-slate-500">Administrador</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="p-2 text-slate-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </aside>
  )
}
