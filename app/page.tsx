"use client"
import MainContainer from "@/components/main-container";
import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export interface LatLng{
  lat: number;
  lng: number;
}

export default function Home() {
  
  const mapRef = useRef(null);
  

  return (
    <div className="h-[100vh] w-[100vw] bg-black/60">
      <MapContainer 
      style={{
          position: "fixed",
          height: "93vh",
          width: "100%",
          
          
        }}
      ref={mapRef} center={[Number(localStorage.getItem('lastLat')) || 51.505, Number(localStorage.getItem('lastLng')) || -0.09]} zoom={13}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
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
