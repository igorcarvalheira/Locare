"use client"

import { Wrench } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"

const maintenanceData = [
  {
    id: 1,
    property: "Apto 101",
    problem: "Vazamento na Pia",
    status: "Pendente",
    date: "22/06/2024",
  },
  {
    id: 2,
    property: "Casa B",
    problem: "Chuveiro quebrado",
    status: "Em Andamento",
    date: "20/06/2024",
  },
  {
    id: 3,
    property: "Apto 205",
    problem: "Porta emperrada",
    status: "Pendente",
    date: "19/06/2024",
  },
]

function StatusBadge({ status }: { status: string }) {
  const styles = {
    Pendente: "bg-amber-100 text-amber-800 hover:bg-amber-100",
    "Em Andamento": "bg-sky-100 text-sky-800 hover:bg-sky-100",
  }
  
  return (
    <Badge
      variant="secondary"
      className={cn(
        "font-medium",
        styles[status as keyof typeof styles]
      )}
    >
      {status}
    </Badge>
  )
}

export function MaintenanceTable() {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
          <Wrench className="h-5 w-5 text-violet-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Chamados de Manutenção
        </h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100">
            <TableHead className="text-slate-500 font-medium">Imóvel</TableHead>
            <TableHead className="text-slate-500 font-medium">Problema</TableHead>
            <TableHead className="text-slate-500 font-medium">Status</TableHead>
            <TableHead className="text-slate-500 font-medium text-right">Data</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceData.map((item) => (
            <TableRow key={item.id} className="border-slate-100">
              <TableCell className="font-medium text-slate-900">
                {item.property}
              </TableCell>
              <TableCell className="text-slate-600">{item.problem}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className="text-right text-slate-500">
                {item.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
