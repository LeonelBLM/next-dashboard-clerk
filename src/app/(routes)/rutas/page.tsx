"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { RutaForm } from "./components/FormRutas"
import { RutaMap } from "./components/MapRutas"
import { RutaTable } from "./components/ListRutas"

export default function RutasPage() {
  const [selectedRuta, setSelectedRuta] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)
  
  // Crear una instancia del formulario para acceder a sus métodos
  const {
    form,
    onSubmit,
    updateFormWithRouteData,
    FormComponent: RutaFormComponent
  } = RutaForm({
    initialData: selectedRuta,
    onComplete: () => {
      setSelectedRuta(null)
      setRefreshKey(prev => prev + 1)
    }
  });

  const handleEditRuta = (ruta) => {
    setSelectedRuta(ruta)
  }

  const handleRouteCalculated = (routeData) => {
    updateFormWithRouteData(routeData);
  };

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4">Gestión de Rutas Base</h1>
      
      {/* Grid responsivo para formulario y mapa */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Formulario */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              {selectedRuta ? 'Actualizar Ruta' : 'Registrar Nueva Ruta'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RutaFormComponent />
          </CardContent>
        </Card>

        {/* Mapa */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Visualización de Ruta</CardTitle>
          </CardHeader>
          <CardContent>
            <RutaMap 
              origin={selectedRuta?.ciudad_origen}
              destination={selectedRuta?.ciudad_destino}
              onRouteCalculated={handleRouteCalculated}
            />
          </CardContent>
        </Card>
      </div>

      {/* Tabla de rutas */}
      <Card className="w-full overflow-x-auto">
        <CardHeader>
          <CardTitle>Rutas Registradas</CardTitle>
        </CardHeader>
        <CardContent>
          <RutaTable 
            onEdit={handleEditRuta}
            refreshKey={refreshKey}
          />
        </CardContent>
      </Card>
    </div>
  )
}