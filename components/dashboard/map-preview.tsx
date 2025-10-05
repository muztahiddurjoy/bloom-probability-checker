"use client";

import { Card } from "@/components/ui/card";
import { MapIcon, Flower } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import knownSites from "@/lib/known-site.json";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom flower icon
const flowerIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#10b981" version="1.1" id="Capa_1" width="800px" height="800px" viewBox="0 0 407.814 407.814" xml:space="preserve">
<g>
	<path d="M353.985,203.905c35.145-20.995,47.049-66.379,26.508-101.954c-20.54-35.575-65.794-47.957-101.547-28.017   C278.336,33.001,244.985,0,203.907,0c-41.079,0-74.431,33.001-75.039,73.937c-35.754-19.94-81.01-7.557-101.549,28.02   C6.78,137.531,18.683,182.915,53.83,203.908c-35.146,20.995-47.05,66.379-26.51,101.954c20.54,35.576,65.796,47.958,101.55,28.017   c0.607,40.936,33.96,73.938,75.039,73.936c41.08,0,74.43-33.002,75.038-73.936c35.754,19.939,81.011,7.557,101.548-28.021   C401.035,270.282,389.13,224.898,353.985,203.905z M203.907,272.65c-37.966,0-68.744-30.777-68.744-68.744   s30.778-68.744,68.744-68.744c37.965,0,68.744,30.777,68.744,68.744S241.873,272.65,203.907,272.65z"/>
</g>
</svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

export function MapPreview() {
  // Calculate center of all sites for initial map view
  const calculateCenter = () => {
    if (knownSites.length === 0) return [20, 0]; // Default center
    
    const sum = knownSites.reduce(
      (acc, site) => ({
        lat: acc.lat + site.latitude,
        lng: acc.lng + site.longitude,
      }),
      { lat: 0, lng: 0 }
    );
    
    return [sum.lat / knownSites.length, sum.lng / knownSites.length];
  };

  const center = calculateCenter() as [number, number];

  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-white drop-shadow-lg text-center">
        Global Bloom Map
      </h2>
      <Card className="p-0 overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border-2 border-white/40 hover:border-white/60 transition-colors">
        <div className="h-[600px] relative">
          <MapContainer
            center={center}
            zoom={2}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {knownSites.map((site) => (
              <Marker
                key={site.id}
                position={[site.latitude, site.longitude]}
                icon={flowerIcon}
              >
                <Popup>
                  <div className="text-center p-2">
                    <Flower className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <h3 className="font-bold text-lg text-green-900">
                      {site.site_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {site.site_short}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
          
          {/* Overlay for when map is loading or if no sites */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center space-y-3 bg-white/95 backdrop-blur-md p-6 rounded-2xl border-2 border-green-200 shadow-2xl">
              <MapIcon className="w-12 h-12 text-green-700 mx-auto drop-shadow-lg" />
              <p className="text-xl font-bold text-green-900">
                Interactive Bloom Map
              </p>
              <p className="text-sm text-green-700 max-w-md">
                Explore flower bloom locations across the globe
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-green-600">
                <Flower className="w-4 h-4" />
                <span>{knownSites.length} bloom sites detected</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}