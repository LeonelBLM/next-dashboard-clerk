"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios'

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormCreateDocumentProps } from "./FormCreateDocument.types"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    idChofer: z.string().min(1, "ID del chofer es requerido"),
    idTipoDocumento: z.string().min(1, "Tipo de documento es requerido"),
    numeroDocumento: z.string().min(1, "Número de documento es requerido"),
    fechaEmision: z.string().min(1, "Fecha de emisión es requerida"),
    fechaVencimiento: z.string().min(1, "Fecha de vencimiento es requerida"),
    estado: z.string().min(1, "Estado es requerido"),
    observaciones: z.string().optional()
})

export function FormCreateDocument(props: FormCreateDocumentProps) {
    const { setOpenModalCreate } = props
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idChofer: "",
            idTipoDocumento: "",
            numeroDocumento: "",
            fechaEmision: "",
            fechaVencimiento: "",
            estado: "",
            observaciones: ""
        },
    })

    const { isValid } = form.formState
    const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            // Convertimos los IDs a números
            const dataToSubmit = {
                ...values,
                idChofer: parseInt(values.idChofer),
                idTipoDocumento: parseInt(values.idTipoDocumento)
            }
            
            await axios.post("/api/choferDoc", dataToSubmit)
            toast({ title: "Documento creado exitosamente" })
            setOpenModalCreate(false)
            router.refresh()
        } catch (error) {
            toast({
                title: "Ocurrió un error al crear el documento",
                variant: "destructive"
            })
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="idChofer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ID Chofer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="ID del chofer..." type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="idTipoDocumento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tipo de Documento</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona tipo de documento" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="1">Licencia de Conducir</SelectItem>
                                            <SelectItem value="2">Carnet de Identidad</SelectItem>
                                            <SelectItem value="3">Certificado Médico</SelectItem>
                                            <SelectItem value="4">Seguro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="numeroDocumento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Número de Documento</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Número de documento..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fechaEmision"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de Emisión</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fechaVencimiento"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Fecha de Vencimiento</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="estado"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Estado</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona estado" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Vigente">Vigente</SelectItem>
                                            <SelectItem value="Vencido">Vencido</SelectItem>
                                            <SelectItem value="Por Vencer">Por Vencer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="observaciones"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Observaciones</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Observaciones..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" disabled={!isValid}>Crear Documento</Button>
                </form>
            </Form>
        </div>
    )
}