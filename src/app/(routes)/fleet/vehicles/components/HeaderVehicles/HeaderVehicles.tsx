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
  
import { useState } from "react";  
import { FormCreateVehicle } from "../FormCreateVehicle";

export function HeaderVehicles() {
    const [openModalCreate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">Lista de Vehiculos</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Agregar Vehiculo</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Agregar Vehiculo</DialogTitle>
                        <DialogDescription>
                            Crea y configura un nuevo vehiculo
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateVehicle setOpenModalCreate={setOpenModalCreate} />
                </DialogContent>
            </Dialog>
        </div>
    )
}