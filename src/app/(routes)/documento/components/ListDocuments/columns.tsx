"use client"

import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

// Interfaz actualizada para coincidir con el esquema de Prisma
export type DocumentoChofer = {
  id: number
  idChofer: number | null
  idTipoDocumento: number | null
  numeroDocumento: string | null
  fechaEmision: Date | null
  fechaVencimiento: Date | null
  estado: string | null
  observaciones: string | null
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<DocumentoChofer>[] = [
  {
    accessorKey: "idChofer",
    header: "ID Chofer",
  },
  {
    accessorKey: "idTipoDocumento",
    header: "Tipo Doc.",
  },
  {
    accessorKey: "numeroDocumento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Número Documento
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: "fechaEmision",
    header: "Fecha Emisión",
    cell: ({ row }) => {
      const date = row.getValue("fechaEmision") as Date | null
      return date ? date.toLocaleDateString() : '-'
    },
  },
  {
    accessorKey: "fechaVencimiento",
    header: "Fecha Vencimiento",
    cell: ({ row }) => {
      const date = row.getValue("fechaVencimiento") as Date | null
      return date ? date.toLocaleDateString() : '-'
    },
  },
  {
    accessorKey: "estado",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Estado
          <ArrowUpDown className="w-4 h-4 ml-2" />
        </Button>
      )
    },
  },
  {
    accessorKey: "observaciones",
    header: "Observaciones",
    cell: ({ row }) => {
      const observaciones = row.getValue("observaciones") as string | null
      return (
        <div className="max-w-[200px] truncate">
          {observaciones || '-'}
        </div>
      )
    }
  },
  {
    id: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      const { id } = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="w-8 h-4 p-0">
              <span className="sr-only">Abrir Menú</span>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/documentos/${id}`}>
              <DropdownMenuItem>
                <Pencil className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]