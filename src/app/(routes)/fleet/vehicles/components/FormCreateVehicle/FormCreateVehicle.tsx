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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

// Schema de validación
const formSchema = z.object({
  placa: z.string().min(1, "La placa es requerida"),
  marca: z.string().min(2, "La marca debe tener al menos 2 caracteres"),
  modelo: z.string().min(2, "El modelo debe tener al menos 2 caracteres"),
  anio: z.string().min(4).max(4),
  tipoVehiculo: z.string().min(1, "El tipo de vehículo es requerido"),
  idEstado: z.string().min(1, "El estado es requerido")
});

export function FormCreateVehicle(props: FormCreateVehicleProps) {
  const { setOpenModalCreate } = props;
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placa: "",
      marca: "",
      modelo: "",
      anio: "",
      tipoVehiculo: "",
      idEstado: ""
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const payload = {
        ...values,
        anio: parseInt(values.anio),
        idEstado: parseInt(values.idEstado)
      };
      
      const response = await axios.post("/api/vehicle", payload);
      
      toast({ 
        title: "Éxito",
        description: "Vehículo registrado correctamente",
        variant: "default"
      });
      
      setOpenModalCreate(false);
      router.refresh();
    } catch (error: any) {
      console.error("Error al crear vehículo:", error);
      toast({
        title: "Error",
        description: error.response?.data || "Error al registrar el vehículo",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-3">
          <FormField
            control={form.control}
            name="placa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese la placa" 
                    {...field}
                    className="w-full"
                  />
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
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese la marca" 
                    {...field}
                    className="w-full"
                  />
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
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ingrese el modelo" 
                    {...field}
                    className="w-full"
                  />
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
                <FormLabel>Año</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Año del vehículo"
                    {...field}
                    className="w-full"
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tipoVehiculo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Vehículo</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TRACTOCAMION">Tractocamión</SelectItem>
                    <SelectItem value="CAMION">Camión</SelectItem>
                    <SelectItem value="CHATA">Chata</SelectItem>
                    <SelectItem value="FURGON">Furgón</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="idEstado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estado</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione el estado" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Disponible</SelectItem>
                    <SelectItem value="2">En Servicio</SelectItem>
                    <SelectItem value="3">En Mantenimiento</SelectItem>
                    <SelectItem value="4">Fuera de Servicio</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setOpenModalCreate(false)}
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={!isValid}
          >
            Registrar Vehículo
          </Button>
        </div>
      </form>
    </Form>
  );
}