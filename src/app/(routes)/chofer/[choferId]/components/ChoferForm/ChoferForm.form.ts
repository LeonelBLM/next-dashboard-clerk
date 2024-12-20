import { z } from "zod";

export const formSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  apellido: z.string().min(2, "El apellido es requerido"),
  fechaNacimiento: z.string().min(2, "La fecha de nacimiento es requerida"),
  direccion: z.string().min(2, "La dirección es requerida"),
  telefono: z.string().min(6, "El teléfono debe tener al menos 6 dígitos"),
  idEstado: z.number()
});