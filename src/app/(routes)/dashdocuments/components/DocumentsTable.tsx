"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function DocumentsTable() {
  const documents = [
    {
      id: 1,
      tipo: "SOAT",
      entidad: "Vehículo ABC-123",
      fechaEmision: "2024-01-01",
      fechaVencimiento: "2025-01-01",
      estado: "Vigente"
    },
    // Más documentos...
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documentos Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Entidad</TableHead>
              <TableHead>Vencimiento</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.tipo}</TableCell>
                <TableCell>{doc.entidad}</TableCell>
                <TableCell>{doc.fechaVencimiento}</TableCell>
                <TableCell>{doc.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}