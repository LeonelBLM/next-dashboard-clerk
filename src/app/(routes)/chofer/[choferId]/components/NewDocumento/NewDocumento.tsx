"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/components/ui/dialog"
import { FormDocumento } from "./FormDocumento"
import { Plus } from "lucide-react"
import { NewDocumentoProps } from "./NewDocumento.types"

export function NewDocumento(props: NewDocumentoProps) {
    const { choferId } = props
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar Documento
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Registrar nuevo documento</DialogTitle>
                    <DialogDescription>
                        Complete la información del documento del conductor.
                    </DialogDescription>
                </DialogHeader>
                <FormDocumento choferId={choferId} setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}