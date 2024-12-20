"use client"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Chofer } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export const columns: ColumnDef<Chofer>[] = [
    {
        accessorKey: "nombre",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nombre
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
    },
    {
        accessorKey: "apellido",
        header: "Apellido",
    },
    {
        accessorKey: "fechaNacimiento",
        header: "Fecha de Nacimiento",
        cell: ({ row }) => {
            const fecha = new Date(row.getValue("fechaNacimiento"))
            return fecha.toLocaleDateString()
        }
    },
    {
        accessorKey: "direccion",
        header: "Dirección",
    },
    {
        accessorKey: "telefono",
        header: "Teléfono",
    },
    {
        accessorKey: "idEstado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.getValue("idEstado")
            return `${estado}`
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
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/chofer/${id}`}>
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