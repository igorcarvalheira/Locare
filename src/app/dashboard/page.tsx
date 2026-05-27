"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { KPICards } from "@/components/dashboard/kpi-cards"
import { CashFlowChart } from "@/components/dashboard/cash-flow-chart"
import { ContractsOverview } from "@/components/dashboard/contracts-overview"
import { MaintenanceTable } from "@/components/dashboard/maintenance-table"
import { PaymentsTable } from "@/components/dashboard/payments-table"
import { ImoveisScreen } from "@/components/dashboard/screens/imoveis-screen"
import { FinanceiroScreen } from "@/components/dashboard/screens/financeiro-screen"
import { InquilinosScreen } from "@/components/dashboard/screens/inquilinos-screen"
import { ChamadosScreen } from "@/components/dashboard/screens/chamados-screen"
import { ConfiguracoesScreen } from "@/components/dashboard/screens/configuracoes-screen"

export default function Page() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <>
            <DashboardHeader />
            <div className="px-8 pb-8 -mt-16 relative z-10">
              <KPICards />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <CashFlowChart />
                <ContractsOverview />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <MaintenanceTable />
                <PaymentsTable />
              </div>
            </div>
          </>
        )
      case "imoveis":
        return <ImoveisScreen />
      case "financeiro":
        return <FinanceiroScreen />
      case "inquilinos":
        return <InquilinosScreen />
      case "chamados":
        return <ChamadosScreen />
      case "configuracoes":
        return <ConfiguracoesScreen />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="ml-64">
        {renderContent()}
      </main>
    </div>
  )
}
