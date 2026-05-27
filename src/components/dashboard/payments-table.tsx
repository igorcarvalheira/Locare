"use client"

import { CreditCard } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const paymentsData = [
  {
    id: 1,
    tenant: "Maria Silva",
    property: "Apto 101",
    value: "R$ 1.800,00",
    status: "Pago",
  },
  {
    id: 2,
    tenant: "João Santos",
    property: "Casa A",
    value: "R$ 2.500,00",
    status: "Pago",
  },
  {
    id: 3,
    tenant: "Ana Oliveira",
    property: "Apto 302",
    value: "R$ 1.400,00",
    status: "Pago",
  },
]

export function PaymentsTable() {
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
          <CreditCard className="h-5 w-5 text-violet-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">
          Últimos Pagamentos
        </h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow className="border-slate-100">
            <TableHead className="text-slate-500 font-medium">Inquilino</TableHead>
            <TableHead className="text-slate-500 font-medium">Imóvel</TableHead>
            <TableHead className="text-slate-500 font-medium">Valor</TableHead>
            <TableHead className="text-slate-500 font-medium text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentsData.map((item) => (
            <TableRow key={item.id} className="border-slate-100">
              <TableCell className="font-medium text-slate-900">
                {item.tenant}
              </TableCell>
              <TableCell className="text-slate-600">{item.property}</TableCell>
              <TableCell className="text-slate-900 font-semibold">
                {item.value}
              </TableCell>
              <TableCell className="text-right">
                <Badge
                  variant="secondary"
                  className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 font-medium"
                >
                  {item.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
