"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Bell, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

export function DocumentAlerts() {
  const alerts = [
    {
      tipo: "Licencia de Conducir",
      documento: "LC-123456",
      diasRestantes: 15,
      entidad: "Juan Pérez"
    },
    {
      tipo: "SOAT",
      documento: "SOA-789",
      diasRestantes: -2,
      entidad: "Vehículo ABC-123"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Alertas de Vencimiento
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <Alert 
              key={index} 
              variant={alert.diasRestantes <= 0 ? "destructive" : "default"}
              className={cn(
                alert.diasRestantes <= 0 
                  ? "border-red-500 dark:border-red-400" 
                  : "border-yellow-500 dark:border-yellow-400"
              )}
            >
              <AlertTriangle className={cn(
                "h-4 w-4",
                alert.diasRestantes <= 0 
                  ? "text-red-500 dark:text-red-400" 
                  : "text-yellow-500 dark:text-yellow-400"
              )} />
              <AlertTitle>{alert.tipo}</AlertTitle>
              <AlertDescription>
                {alert.documento} de {alert.entidad} - 
                {alert.diasRestantes <= 0 
                  ? ` Vencido hace ${Math.abs(alert.diasRestantes)} días`
                  : ` Vence en ${alert.diasRestantes} días`}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}