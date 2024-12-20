"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RutaTableProps {
  onEdit: (ruta: any) => void;
  refreshKey?: number;
}

export function RutaTable({ onEdit, refreshKey }: RutaTableProps) {
  const [rutas, setRutas] = useState([]);
  const { toast } = useToast();

  const fetchRutas = async () => {
    try {
      const response = await axios.get("/api/ruta");
      setRutas(response.data);
    } catch (error) {
      console.error("Error fetching rutas:", error);
      toast({
        title: "Error al cargar las rutas",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRutas();
  }, [refreshKey]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/ruta?id=${id}`);
      toast({ title: "Ruta eliminada exitosamente" });
      fetchRutas();
    } catch (error) {
      console.error("Error deleting ruta:", error);
      toast({
        title: "Error al eliminar la ruta",
        variant: "destructive",
      });
    }
  };

  // Función auxiliar para formatear números
  const formatNumber = (value: any) => {
    const num = Number(value);
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[120px]">Nombre</TableHead>
            <TableHead className="min-w-[120px]">Origen</TableHead>
            <TableHead className="min-w-[120px]">Destino</TableHead>
            <TableHead className="min-w-[100px]">Distancia (km)</TableHead>
            <TableHead className="min-w-[100px]">Tiempo (horas)</TableHead>
            <TableHead className="text-right min-w-[100px]">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rutas.map((ruta: any) => (
            <TableRow key={ruta.id}>
              <TableCell className="font-medium">{ruta.nombre || '-'}</TableCell>
              <TableCell>{ruta.ciudadOrigen}</TableCell>
              <TableCell>{ruta.ciudadDestino}</TableCell>
              <TableCell>{formatNumber(ruta.distancia)}</TableCell>
              <TableCell>{formatNumber(ruta.tiempoEstimado)}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(ruta)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(ruta.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}