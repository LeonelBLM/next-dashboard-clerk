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
import { FormCreateDocument } from "../FormCreateDocument/FormCreateDocument";

export function HeaderDocuments() {
    const [openModalCreate, setOpenModalCreate] = useState(false)

    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">Lista de Documentos</h2>

            <Dialog open={openModalCreate} onOpenChange={setOpenModalCreate}>
                <DialogTrigger asChild>
                    <Button>Crear Documento</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Crear Documento</DialogTitle>
                        <DialogDescription>
                            Registra un nuevo documento para el chofer
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateDocument setOpenModalCreate={setOpenModalCreate} />
                </DialogContent>
            </Dialog>
        </div>
    )
}