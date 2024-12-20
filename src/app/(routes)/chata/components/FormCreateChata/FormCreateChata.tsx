"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { UploadButton } from "@/utils/uploadthing";

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
import { FormCreateChataProps } from "./FormCreateChata.types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  chasis: z.string().min(2, "El número de chasis es requerido"),
  capacidad: z.string().min(2, "El número de chasis es requerido"),
  tipoChata: z.string().min(2, "El tipo de chata es requerido"),
  estado: z.string().min(2, "El estado es requerido"),
  foto: z.string(),
});

export function FormCreateChata(props: FormCreateChataProps) {
  const { setOpenModalCreate } = props;
  const router = useRouter();
  const { toast } = useToast();
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chasis: "",
      capacidad: "",
      tipoChata: "",
      estado: "Disponible",
      foto: "",
    },
  });

  const { isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/chata", values);
      toast({ title: "Chata registrada exitosamente" });
      setOpenModalCreate(false);
      router.refresh();
    } catch (error) {
      toast({
        title: "Ocurrió un error al registrar la chata",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-3">
          <FormField
              control={form.control}
              name="chasis"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Chasis</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el número de chasis"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="capacidad"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Chasis</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese el número de chasis"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipoChata"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Chata</FormLabel>
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
                      <SelectItem value="Plataforma">Plataforma</SelectItem>
                      <SelectItem value="Furgón">Furgón</SelectItem>
                      <SelectItem value="Tolva">Tolva</SelectItem>
                      <SelectItem value="Tanque">Tanque</SelectItem>
                    </SelectContent>
                  </Select>
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
                        <SelectValue placeholder="Seleccione el estado" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Disponible">Disponible</SelectItem>
                      <SelectItem value="En uso">En uso</SelectItem>
                      <SelectItem value="En mantenimiento">
                        En mantenimiento
                      </SelectItem>
                      <SelectItem value="Fuera de servicio">
                        Fuera de servicio
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="foto"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>foto Referencial</FormLabel>
                  <FormControl>
                    {photoUploaded ? (
                      <p className="text-sm">foto Cargada!</p>
                    ) : (
                      <UploadButton
                        className="rounded-lg bg-slate-600/20 text-slate-800 outline-dotted outline-3"
                        {...field}
                        endpoint="profileImage"
                        onClientUploadComplete={(res) => {
                          form.setValue("foto", res?.[0].url);
                          toast({
                            title: "Photo uploaded!",
                          });
                          setPhotoUploaded(true);
                        }}
                        onUploadError={(error: Error) => {
                          toast({
                            title: "Error uploading photo",
                          });
                        }}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={!isValid}>
            Registrar Chata
          </Button>
        </form>
      </Form>
    </div>
  );
}
