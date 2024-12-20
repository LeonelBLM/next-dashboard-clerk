"use client"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Vehiculo, EstadoVehiculo } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'

// Tipo actualizado que coincide con la estructura de Prisma
type VehiculoWithRelations = Vehiculo & {
    estado: EstadoVehiculo | null;
}

export const columns: ColumnDef<VehiculoWithRelations>[] = [
    {
        accessorKey: "tipo_vehiculo",
        header: "Tipo de Vehículo",
        cell: ({ row }) => {
            const tipo = row.original.tipoVehiculo;
            const tiposVehiculo: { [key: string]: string } = {
                'TRACTOCAMION': 'Tractocamión',
                'CAMION': 'Camión',
                'CHATA': 'Chata',
                'FURGON': 'Furgón'
            };
            return tiposVehiculo[tipo || ''] || tipo || 'No definido';
        }
    },
    {
        accessorKey: "estado",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Estado
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return row.original.estado?.estado || "No definido";
        }
    },
    {
        accessorKey: "placa",
        header: "Placa",
    },
    {
        accessorKey: "marca",
        header: "Marca",
    },
    {
        accessorKey: "modelo",
        header: "Modelo",
    },
    {
        accessorKey: "anio",
        header: "Año",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/fleet/vehicles/${id}`} className="flex items-center">
                                <Pencil className="w-4 h-4 mr-2" />
                                <span>Edit</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]