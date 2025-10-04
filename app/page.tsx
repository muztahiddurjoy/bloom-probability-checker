"use client"
import MainContainer from "@/components/main-container";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export interface LatLng{
  lat: number;
  lng: number;
}

export default function Home() {
  const mapRef = useRef(null);
  const [center, setCenter] = useState<[number, number]>([51.505, -0.09]); // Default center

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const lastLat = localStorage.getItem('lastLat');
        const lastLng = localStorage.getItem('lastLng');
        
        if (lastLat && lastLng) {
          const lat = Number(lastLat);
          const lng = Number(lastLng);
          
          if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
            setCenter([lat, lng]);
          }
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
    }
  }, []);

  return (
    <div className="h-[100vh] w-[100vw]">
      <MapContainer 
        style={{
          height: "93vh",
          width: "100%",
        }}
        ref={mapRef} 
        center={center} 
        zoom={13}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          detectRetina={true}
          maxZoom={19}
          minZoom={1}
        />
        <MainContainer/>
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}