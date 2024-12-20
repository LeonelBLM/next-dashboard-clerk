"use client";

import { useEffect, useState } from "react";
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer, Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";

interface RutaMapProps {
  origin?: string;
  destination?: string;
  onRouteCalculated?: (routeData: {
    origin: string;
    destination: string;
    distance: number;
    duration: number;
  }) => void;
}

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -21.2758,
  lng: -63.5275,
};

export function RutaMap({ origin, destination, onRouteCalculated }: RutaMapProps) {
  const [directions, setDirections] = useState(null);
  const [originAutocomplete, setOriginAutocomplete] = useState(null);
  const [destAutocomplete, setDestAutocomplete] = useState(null);
  const [originInput, setOriginInput] = useState(origin || "");
  const [destinationInput, setDestinationInput] = useState(destination || "");

  useEffect(() => {
    setOriginInput(origin || "");
    setDestinationInput(destination || "");
  }, [origin, destination]);

  const handleOriginLoad = (autocomplete) => {
    setOriginAutocomplete(autocomplete);
  };

  const handleDestinationLoad = (autocomplete) => {
    setDestAutocomplete(autocomplete);
  };

  const handleOriginPlaceChanged = () => {
    if (originAutocomplete) {
      const place = originAutocomplete.getPlace();
      setOriginInput(place.formatted_address);
      calculateRoute(place.formatted_address, destinationInput);
    }
  };

  const handleDestinationPlaceChanged = () => {
    if (destAutocomplete) {
      const place = destAutocomplete.getPlace();
      setDestinationInput(place.formatted_address);
      calculateRoute(originInput, place.formatted_address);
    }
  };

  const calculateRoute = (origin: string, destination: string) => {
    if (origin && destination) {
      setDirections(null);
    }
  };

  const directionsCallback = (response: any) => {
    if (response !== null && response.status === 'OK') {
      setDirections(response);
      
      if (onRouteCalculated) {
        const route = response.routes[0];
        const routeData = {
          origin: originInput,
          destination: destinationInput,
          distance: route.legs[0].distance.value / 1000, // km
          duration: route.legs[0].duration.value / 60 // convertir segundos a minutos
        };
        onRouteCalculated(routeData);
      }
    }
  };

  return (
    <LoadScript 
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
      libraries={libraries}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Autocomplete
            onLoad={handleOriginLoad}
            onPlaceChanged={handleOriginPlaceChanged}
          >
            <Input
              placeholder="Ciudad de Origen"
              value={originInput}
              onChange={(e) => setOriginInput(e.target.value)}
            />
          </Autocomplete>

          <Autocomplete
            onLoad={handleDestinationLoad}
            onPlaceChanged={handleDestinationPlaceChanged}
          >
            <Input
              placeholder="Ciudad de Destino"
              value={destinationInput}
              onChange={(e) => setDestinationInput(e.target.value)}
            />
          </Autocomplete>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={8}
        >
          {originInput && destinationInput && !directions && (
            <DirectionsService
              options={{
                destination: destinationInput,
                origin: originInput,
                travelMode: google.maps.TravelMode.DRIVING,
              }}
              callback={directionsCallback}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions,
              }}
            />
          )}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}