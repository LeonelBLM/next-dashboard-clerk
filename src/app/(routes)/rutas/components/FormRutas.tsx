"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  ciudadOrigen: z.string().min(2, "La ciudad de origen es requerida"),
  ciudadDestino: z.string().min(2, "La ciudad de destino es requerida"),
  distancia: z.string().min(1, "La distancia es requerida"),
  tiempoEstimado: z.string().min(1, "El tiempo estimado es requerido"),
});

interface RutaFormProps {
  initialData?: any;
  onComplete?: () => void;
}

export function RutaForm({ initialData, onComplete }: RutaFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      ciudadOrigen: initialData?.ciudadOrigen || "",
      ciudadDestino: initialData?.ciudadDestino || "",
      distancia: initialData?.distancia?.toString() || "",
      tiempoEstimado: initialData?.tiempoEstimado?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await axios.patch(`/api/ruta/${initialData.id}`, {
          id: initialData.id,
          ciudad_origen: values.ciudadOrigen,
          ciudad_destino: values.ciudadDestino,
          distancia: parseFloat(values.distancia),
          tiempo_estimado: parseFloat(values.tiempoEstimado), // Cambiado a float para horas
        });
        toast({ title: "Ruta actualizada exitosamente" });
      } else {
        await axios.post("/api/ruta", {
          ciudad_origen: values.ciudadOrigen,
          ciudad_destino: values.ciudadDestino,
          distancia: parseFloat(values.distancia),
          tiempo_estimado: parseFloat(values.tiempoEstimado), // Cambiado a float para horas
        });
        toast({ title: "Ruta registrada exitosamente" });
      }
      
      form.reset();
      if (onComplete) {
        onComplete();
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error al procesar la ruta",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit,
    updateFormWithRouteData: (routeData: {
      origin: string;
      destination: string;
      distance: number;
      duration: number;
    }) => {
      form.setValue("ciudadOrigen", routeData.origin);
      form.setValue("ciudadDestino", routeData.destination);
      form.setValue("distancia", routeData.distance.toFixed(2));
      // Convertir minutos a horas
      const hoursEstimated = (routeData.duration / 60).toFixed(2);
      form.setValue("tiempoEstimado", hoursEstimated);

      // Generar nombre automático
      const originShort = routeData.origin.split(',')[0].trim();
      const destShort = routeData.destination.split(',')[0].trim();
      const suggestedName = `${originShort} - ${destShort}`;
      form.setValue("nombre", suggestedName);
    },
    FormComponent: () => (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* ... resto del formulario ... */}
          <FormField
            control={form.control}
            name="tiempoEstimado"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tiempo Estimado (horas)</FormLabel>
                <FormControl>
                  <Input 
                    className="w-full" 
                    type="number" 
                    step="0.01"
                    placeholder="2.5" 
                    {...field} 
                    disabled 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* ... resto del formulario ... */}
        </form>
      </Form>
    )
  };
}
