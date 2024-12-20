"use client"

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Navigation, Gauge, Clock } from 'lucide-react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';

interface VehicleData {
  vehicle_id: string;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
  heading: number;
}

interface VehicleResponse {
  timestamp: string;
  vehicles: VehicleData[];
}

const containerStyle = {
  width: '100%',
  height: '500px'
};

const VehicleTracker = () => {
  const [vehiclesData, setVehiclesData] = useState<VehicleData[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
  });

  const center = useMemo(() => ({
    lat: 40.4168,
    lng: -3.7038
  }), []);

  const mapOptions = useMemo(() => ({
    disableDefaultUI: false,
    clickableIcons: true,
    scrollwheel: true,
    styles: [],
    zoomControl: true,
  }), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/vehicles');
        const data: VehicleResponse = await response.json();
        setVehiclesData(data.vehicles);
        if (!selectedVehicle && data.vehicles.length > 0) {
          setSelectedVehicle(data.vehicles[0].vehicle_id);
        }
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedVehicle]);

  const onMarkerClick = (vehicle: VehicleData) => {
    setSelectedMarker(vehicle);
    setSelectedVehicle(vehicle.vehicle_id);
  };

  if (loadError) {
    return <div>Error cargando el mapa</div>;
  }

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  // Definimos el marcador después de que la API esté cargada
  const getMarkerIcon = (isSelected: boolean) => ({
    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
    scale: 6,
    strokeWeight: 2,
    anchor: new window.google.maps.Point(0, 0),
    fillColor: isSelected ? '#2563eb' : '#64748b',
    strokeColor: isSelected ? '#2563eb' : '#64748b',
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Ubicacion de flota en tiempo real</span>
            <Badge variant="secondary" className="ml-2">
              {loading ? 'Updating...' : 'Live'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={vehiclesData[0]?.vehicle_id} className="w-full">
            <TabsList className="w-full justify-start">
              {vehiclesData.map((vehicle) => (
                <TabsTrigger
                  key={vehicle.vehicle_id}
                  value={vehicle.vehicle_id}
                  onClick={() => setSelectedVehicle(vehicle.vehicle_id)}
                >
                  {vehicle.vehicle_id}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="my-4">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={13}
                options={mapOptions}
              >
                {vehiclesData.map((vehicle) => (
                  <Marker
                    key={vehicle.vehicle_id}
                    position={{
                      lat: vehicle.latitude,
                      lng: vehicle.longitude
                    }}
                    onClick={() => onMarkerClick(vehicle)}
                    icon={{
                      ...getMarkerIcon(vehicle.vehicle_id === selectedVehicle),
                      rotation: vehicle.heading,
                    }}
                  />
                ))}
                {selectedMarker && (
                  <InfoWindow
                    position={{
                      lat: selectedMarker.latitude,
                      lng: selectedMarker.longitude
                    }}
                    onCloseClick={() => setSelectedMarker(null)}
                  >
                    <div className="p-2">
                      <h3 className="font-semibold">{selectedMarker.vehicle_id}</h3>
                      <p className="text-sm">Speed: {selectedMarker.speed.toFixed(1)} km/h</p>
                      <p className="text-sm">Heading: {selectedMarker.heading.toFixed(1)}°</p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleTracker;