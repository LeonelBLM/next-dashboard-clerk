"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { AlertTriangle, FileCheck, FileWarning } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DocumentStats {
  total: number;
  porVencer: number;
  vencidos: number;
}

interface DocumentStatusCardProps {
  title: string;
  documents: DocumentStats;
  icon: string;
}

export function DocumentStatusCard({ title, documents, icon }: DocumentStatusCardProps) {
  const validPercentage = ((documents.total - documents.vencidos - documents.porVencer) / documents.total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-green-500" />
          {title}
        </CardTitle>
        <CardDescription>Estado de documentación</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Progress value={validPercentage} className="h-2" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center">
              <FileCheck className="w-4 h-4 text-green-500 mb-1" />
              <span className="font-bold">{documents.total - documents.vencidos - documents.porVencer}</span>
              <span className="text-muted-foreground">Vigentes</span>
            </div>
            <div className="flex flex-col items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mb-1" />
              <span className="font-bold">{documents.porVencer}</span>
              <span className="text-muted-foreground">Por vencer</span>
            </div>
            <div className="flex flex-col items-center">
              <FileWarning className="w-4 h-4 text-red-500 mb-1" />
              <span className="font-bold">{documents.vencidos}</span>
              <span className="text-muted-foreground">Vencidos</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}