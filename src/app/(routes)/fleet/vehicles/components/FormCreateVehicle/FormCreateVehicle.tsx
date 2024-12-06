"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormCreateVehicleProps } from "./FormCreateVehicle.types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UploadButton } from "@/utils/uploadthing";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  placa: z.string(),
  marca: z.string().min(2),
  modelo: z.string().min(2),
  anio: z.string().min(4).max(4),
  tipo_id: z.string().min(6),
  estado_id: z.string(),
});

export function FormCreateVehicle(props: FormCreateVehicleProps) {
  const { setOpenModalCreate } = props;
  const router = useRouter();
  const [photoUploaded, setPhotoUploaded] = useState(false);

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

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      axios.post("/api/vehicle", values);
      toast({ title: "Vehiculo Agregado" });
      setOpenModalCreate(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  const { toast } = useToast();

  return (
    <div>
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
          <Button type="submit" disabled={!isValid}>
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
