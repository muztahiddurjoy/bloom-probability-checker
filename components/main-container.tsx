"use client";
import { LatLng } from "@/app/map/page";
import React, { useEffect, useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import { Loader2, Locate } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./ui/sheet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Progress } from "./ui/progress";
import L from "leaflet";

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MainContainer = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [bloomProbability, setBloomProbability] = useState<number>(0);
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const map = useMap();

  // Use useMapEvents to handle map clicks
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const clickedLocation = { lat, lng };
      setSelectedLocation(clickedLocation);

      // Add marker to the clicked location
      setMarkers([clickedLocation]);

      // Generate random bloom probability for demo (65% to 95%)
      const probability = Math.floor(Math.random() * 30) + 65;
      setBloomProbability(probability);

      setSheetOpen(true);
    },
  });

  useEffect(() => {
    handleLocateMe();
  }, []);

  const handleLocateMe = () => {
    setLocating(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setLocating(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude };
        setUserLocation(newLocation);
        map.setView(newLocation, 16);
        localStorage.setItem("lastLat", newLocation.lat.toString());
        localStorage.setItem("lastLng", newLocation.lng.toString());
        setLocating(false);
      },
      (error) => {
        console.error("Error getting user location:", error);
        setLocating(false);
      },
    );
  };

  const getBloomStatus = (probability: number) => {
    if (probability >= 85)
      return { text: "High Bloom Potential", color: "text-green-600" };
    if (probability >= 70)
      return { text: "Moderate Bloom Potential", color: "text-yellow-600" };
    return { text: "Low Bloom Potential", color: "text-red-600" };
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 85) return "bg-green-500";
    if (probability >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const bloomStatus = getBloomStatus(bloomProbability);

  return (
    <div>
      <Button
        disabled={locating}
        onClick={handleLocateMe}
        className="absolute z-[1000] bottom-2 right-2"
      >
        {locating ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <>
            <Locate size={15} className="mr-2" />
            Locate Me
          </>
        )}
      </Button>

      {/* Render markers for clicked locations */}
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            <div className="text-sm">
              <strong>Selected Location</strong>
              <br />
              Lat: {marker.lat.toFixed(6)}
              <br />
              Lng: {marker.lng.toFixed(6)}
              <br />
              <span className={bloomStatus.color}>
                Bloom: {bloomProbability}%
              </span>
            </div>
          </Popup>
        </Marker>
      ))}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Location Analysis</SheetTitle>
            <SheetDescription>
              Satellite data analysis for selected location
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            {/* Location Coordinates */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Coordinates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="font-medium">Latitude:</span>
                    <p className="text-muted-foreground">
                      {selectedLocation?.lat.toFixed(6)}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium">Longitude:</span>
                    <p className="text-muted-foreground">
                      {selectedLocation?.lng.toFixed(6)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bloom Probability */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Bloom Analysis</CardTitle>
                <CardDescription>
                  Based on recent satellite data and environmental factors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Bloom Probability
                    </span>
                    <span className={`text-sm font-bold ${bloomStatus.color}`}>
                      {bloomProbability}%
                    </span>
                  </div>
                  <Progress
                    value={bloomProbability}
                    className={`h-2 ${getProgressColor(bloomProbability)}`}
                  />
                </div>

                <div
                  className={`p-3 rounded-lg border ${bloomProbability >= 85 ? "bg-green-50 border-green-200" : bloomProbability >= 70 ? "bg-yellow-50 border-yellow-200" : "bg-red-50 border-red-200"}`}
                >
                  <p className={`text-sm font-medium ${bloomStatus.color}`}>
                    {bloomStatus.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {bloomProbability >= 85
                      ? "Excellent conditions for algal bloom development. Monitor regularly."
                      : bloomProbability >= 70
                        ? "Moderate risk of algal blooms. Keep monitoring environmental changes."
                        : "Low probability of blooms. Conditions are currently unfavorable."}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Key Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Water Temperature:</span>
                    <span className="font-medium">
                      {Math.floor(Math.random() * 10) + 18}°C
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nutrient Levels:</span>
                    <span className="font-medium">
                      {bloomProbability >= 85
                        ? "High"
                        : bloomProbability >= 70
                          ? "Moderate"
                          : "Low"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Solar Radiation:</span>
                    <span className="font-medium">
                      {Math.floor(Math.random() * 300) + 500} W/m²
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Data Freshness:</span>
                    <span className="font-medium">Last 24h</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSheetOpen(false)}
              >
                Close
              </Button>
              <Button
                className="flex-1"
                onClick={() => {
                  // You can add monitoring functionality here
                  alert(
                    `Now monitoring area at ${selectedLocation?.lat.toFixed(6)}, ${selectedLocation?.lng.toFixed(6)}`,
                  );
                }}
              >
                Monitor Area
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainContainer;
