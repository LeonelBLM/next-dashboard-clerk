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
import { FormCreateChata } from "../FormCreateChata/FormCreateChata";

export function HeaderChata() {
    const [openModalCreate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">Lista de Conductores</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>
                        <CirclePlus className="w-4 h-4 mr-2" />
                        Registrar Conductor
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Registrar Conductor</DialogTitle>
                        <DialogDescription>
                            Complete los datos para registrar un nuevo conductor
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateChata setOpenModalCreate={setOpenModalCreate} />
                </DialogContent>
            </Dialog>
        </div>
    )
}