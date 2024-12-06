import { z } from "zod";

export const formSchema = z.object({
  placa: z.string(),
  marca: z.string().min(2),
  modelo: z.string().min(2),
  anio: z.string().min(4).max(4),
  tipo_id: z.string().min(6),
  estado_id: z.string(),
});