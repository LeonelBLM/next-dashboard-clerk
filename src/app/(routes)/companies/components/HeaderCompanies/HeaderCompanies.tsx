"use client";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { CirclePlus } from "lucide-react";
import { useState } from "react";  
import { FormCreateCustomer } from "../FormCreateCustomer";

export function HeaderCompanies() {
    const [openModalCreate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">Lista de Clientes</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Crear Cliente</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Crear Cliente</DialogTitle>
                        <DialogDescription>
                            Crea y configura un nuevo cliente
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateCustomer setOpenModalCreate={setOpenModalCreate} />
                </DialogContent>
            </Dialog>
        </div>
    )
}