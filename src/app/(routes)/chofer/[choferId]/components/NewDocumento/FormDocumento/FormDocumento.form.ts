import { z } from "zod";

export const formSchema = z.object({
  idTipoDocumento: z.string(),
  numeroDocumento: z.string().min(2, "El número de documento es requerido"),
  fechaEmision: z.string().min(2, "La fecha de emisión es requerida"),
  fechaVencimiento: z.string().min(2, "La fecha de vencimiento es requerida"),
  estado: z.string(),
  observaciones: z.string().optional(),
});