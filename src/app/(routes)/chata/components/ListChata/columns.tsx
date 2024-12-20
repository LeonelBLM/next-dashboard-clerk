"use client"
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react"
import { Chata } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import Image from 'next/image'

export const columns: ColumnDef<Chata>[] = [
    {
        accessorKey: "foto",
        header: "Foto",
        cell: ({ row }) => {
            const image = row.getValue("foto")

            return (
                <div className="relative group px-3">
                    <Image 
                        src={typeof image === 'string' ? image : "/images/chata-default.png"} 
                        width={40} 
                        height={40} 
                        alt="Foto de la chata" 
                        className="rounded-md w-auto h-auto transition-all duration-300" 
                    />
                    
                    {/* Imagen ampliada en hover */}
                    <div className="absolute hidden group-hover:block top-0 left-0 z-50">
                        <div className="relative p-2 bg-white rounded-lg shadow-lg transform translate-y-[-10%]">
                            <Image 
                                src={typeof image === 'string' ? image : "/images/chata-default.png"}
                                width={200}
                                height={200}
                                alt="Foto de la chata ampliada"
                                className="rounded-md"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "chasis",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Número de Chasis
                    <ArrowUpDown className="w-4 h-4 ml-2" />
                </Button>
            )
        },
    },
    {
        accessorKey: "tipo_chata",
        header: "Tipo de Chata",
    },
    {
        accessorKey: "capacidad",
        header: "Capacidad",
    },
    {
        accessorKey: "estado",
        header: "Estado",
    },
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
            const { chasis } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button variant="ghost" className="w-8 h-4 p-0">
                            <span className="sr-only">Open Menu</span>
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <Link href={`/chata/${chasis}`}>
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