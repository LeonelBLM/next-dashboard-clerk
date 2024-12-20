"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios from 'axios'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import { FormDocumentoProps } from "./FormDocumento.types"
import { formSchema } from "./FormDocumento.form"
import { useToast } from "@/hooks/use-toast"

export function FormDocumento(props: FormDocumentoProps) {
    const { setOpen, choferId } = props
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            idTipoDocumento: "",
            numeroDocumento: "",
            fechaEmision: "",
            fechaVencimiento: "",
            estado: "Vigente",
            observaciones: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/chofer/${choferId}/documento`, {
                ...values,
                idTipoDocumento: parseInt(values.idTipoDocumento)
            })
            toast({ title: "Documento registrado exitosamente" })
            router.refresh()
            setOpen(false)
        } catch (error) {
            toast({
                title: "Error al registrar el documento",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
                <FormField
                    control={form.control}
                    name="idTipoDocumento"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tipo de Documento</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el tipo" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="1">Licencia de Conducir</SelectItem>
                                    <SelectItem value="2">Certificado Médico</SelectItem>
                                    <SelectItem value="3">Carnet de Identidad</SelectItem>
                                    <SelectItem value="4">Certificado de Antecedentes</SelectItem>
                                    <SelectItem value="5">Otro</SelectItem>
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
                                <Input placeholder="Ingrese el número" {...field} />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione el estado" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Vigente">Vigente</SelectItem>
                                    <SelectItem value="Vencido">Vencido</SelectItem>
                                    <SelectItem value="En Trámite">En Trámite</SelectItem>
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
                                <Textarea 
                                    placeholder="Observaciones adicionales..."
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Guardar Documento</Button>
            </form>
        </Form>
    )
}