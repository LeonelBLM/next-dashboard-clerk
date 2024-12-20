"use client"
import { DocumentStatusCard } from './components/DocumentStatusCard';
import { DocumentAlerts } from './components/DocumentAlerts';
import { DocumentsTable } from './components/DocumentsTable';
import { useState, useEffect } from 'react';

function DocumentsPage() {
  const [loading, setLoading] = useState(true);
  const [documentStats, setDocumentStats] = useState({
    vehicles: { total: 0, porVencer: 0, vencidos: 0 },
    drivers: { total: 0, porVencer: 0, vencidos: 0 },
    trailers: { total: 0, porVencer: 0, vencidos: 0 }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight mb-4">
          Dashboard de Documentos
        </h2>
        <p className="text-muted-foreground">
          Gestión y monitoreo de documentación de vehículos, conductores y remolques
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DocumentStatusCard 
          title="Documentos Vehículos" 
          documents={documentStats.vehicles}
          icon="truck"
        />
        <DocumentStatusCard 
          title="Documentos Conductores" 
          documents={documentStats.drivers}
          icon="users"
        />
        <DocumentStatusCard 
          title="Documentos Remolques" 
          documents={documentStats.trailers}
          icon="trailer"
        />
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DocumentAlerts />
        <DocumentsTable />
      </div>
    </div>
  );
}

export default DocumentsPage;