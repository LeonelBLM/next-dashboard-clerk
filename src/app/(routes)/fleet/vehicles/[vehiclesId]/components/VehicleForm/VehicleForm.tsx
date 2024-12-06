"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from '@/components/ui/form'
import {
    Select,
    SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Input } from "@/components/ui/input"
import { Toast } from "@/components/ui/toast"

import { UploadButton } from "@/utils/uploadthing"

import { VehiculoFormProps } from "./VehicleForm.types"
import { formSchema } from "./VehicleForm.form"
import { useToast } from "@/hooks/use-toast"


export function VehiculoForm(props: VehiculoFormProps) {
    const { vehiculo } = props
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false)

    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          placa: "",
          marca: "",
          modelo: "",
          anio: "",
          tipo_id: "",
          estado_id: "",
        },
      });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/vehicle/${vehiculo.id}`, values)
            toast({
                title: "Vehiculo Actualizado!"
            })
            router.refresh()
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                <FormField
              control={form.control}
              name="placa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca del Vehiculo</FormLabel>
                  <FormControl>
                    <Input placeholder="placa ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marca"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marca del Vehiculo</FormLabel>
                  <FormControl>
                    <Input placeholder="Marca ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="modelo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo del Vehiculo</FormLabel>
                  <FormControl>
                    <Input placeholder="Modelo ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="anio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Año del Vehiculo</FormLabel>
                  <FormControl>
                    <Input placeholder="Año ..." type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tipo_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Vehiculo</FormLabel>
                  <FormControl>
                    <Input placeholder="Tipo ..." type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="estado_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Estado del Vehiculo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="en_servicio">En Servicio</SelectItem>
                      <SelectItem value="en_transito">En Transito</SelectItem>
                      <SelectItem value="en_mantenimiento">
                        En Mantenimiento
                      </SelectItem>
                      <SelectItem value="disponible">Disponible</SelectItem>
                      <SelectItem value="en_espera">En Espera</SelectItem>
                      <SelectItem value="reservado">En Reserva</SelectItem>
                      <SelectItem value="fuera_de_servicio">
                        Fuera de Servicio
                      </SelectItem>
                      <SelectItem value="retirado">Retirado</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
                </div>
                <Button type="submit">Edit company</Button>
            </form>
        </Form>
    )
}