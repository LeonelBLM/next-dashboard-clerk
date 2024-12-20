"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FormContact } from "./FormContact"

export function NewContact() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Agregar contacto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Agregar contacto</DialogTitle>
                    <DialogDescription>
                        Crea los contactos relacionados con la empresa.
                    </DialogDescription>
                </DialogHeader>
                <FormContact setOpen={setOpen} />
            </DialogContent>
        </Dialog>
    )
}