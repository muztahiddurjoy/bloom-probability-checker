"use client"
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("@/components/map-component"), {
  ssr: false,
  loading: () => (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div>Loading map...</div>
    </div>
  ),
});

export default function MapPage() {
  return <MapComponent />;
}