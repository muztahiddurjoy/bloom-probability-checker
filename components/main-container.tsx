"use client";
import { LatLng } from "@/app/map/page";
import React, { useEffect, useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import {
  Loader2,
  Locate,
  Calendar,
  Thermometer,
  Droplets,
  Sun,
  Wind,
  Eye,
  AlertTriangle,
} from "lucide-react";
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
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
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

// Custom bloom marker
const bloomIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="url(#gradient)" stroke="#ffffff" stroke-width="2"/>
      <defs>
        <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#059669"/>
        </radialGradient>
      </defs>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const MainContainer = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [bloomProbability, setBloomProbability] = useState<number>(0);
  const [markers, setMarkers] = useState<LatLng[]>([]);

  const map = useMap();

  // Mock data for charts
  const historicalData = [
    { day: "Mon", temperature: 18, nutrients: 65, blooms: 45 },
    { day: "Tue", temperature: 20, nutrients: 70, blooms: 52 },
    { day: "Wed", temperature: 22, nutrients: 75, blooms: 58 },
    { day: "Thu", temperature: 24, nutrients: 80, blooms: 65 },
    { day: "Fri", temperature: 23, nutrients: 78, blooms: 72 },
    { day: "Sat", temperature: 25, nutrients: 85, blooms: 78 },
    { day: "Sun", temperature: 26, nutrients: 88, blooms: bloomProbability },
  ];

  const factorData = [
    { name: "Temperature", value: 85, color: "#f59e0b" },
    { name: "Nutrients", value: 88, color: "#10b981" },
    { name: "Sunlight", value: 78, color: "#f97316" },
    { name: "Water Flow", value: 45, color: "#3b82f6" },
  ];

  const riskDistribution = [
    { name: "Low Risk", value: 25, color: "#10b981" },
    { name: "Medium Risk", value: 35, color: "#f59e0b" },
    { name: "High Risk", value: 40, color: "#ef4444" },
  ];

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
      return {
        text: "High Bloom Risk",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
      };
    if (probability >= 70)
      return {
        text: "Moderate Bloom Risk",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
      };
    return {
      text: "Low Bloom Risk",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    };
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 85) return "bg-red-500";
    if (probability >= 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const bloomStatus = getBloomStatus(bloomProbability);

  return (
    <div>
      <Button
        disabled={locating}
        onClick={handleLocateMe}
        className="absolute z-[1000] bottom-2 right-2 bg-white text-gray-700 border-gray-300 hover:bg-gray-50 shadow-lg"
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
        <Marker
          key={index}
          position={[marker.lat, marker.lng]}
          icon={bloomIcon}
        >
          <Popup>
            <div className="text-sm min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full ${bloomProbability >= 85 ? "bg-red-500" : bloomProbability >= 70 ? "bg-yellow-500" : "bg-green-500"}`}
                />
                <strong className={bloomStatus.color}>Bloom Analysis</strong>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Lat:</span>
                  <span className="font-mono">{marker.lat.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lng:</span>
                  <span className="font-mono">{marker.lng.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Risk Level:</span>
                  <span className={`font-semibold ${bloomStatus.color}`}>
                    {bloomProbability}%
                  </span>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg flex flex-col p-0 overflow-y-scroll">
          <SheetHeader className="px-6 py-4 border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${bloomStatus.bgColor} ${bloomStatus.borderColor}`}
              >
                <AlertTriangle className={`w-5 h-5 ${bloomStatus.color}`} />
              </div>
              <div>
                <SheetTitle className="flex items-center gap-2">
                  Bloom Analysis
                  <Badge
                    variant={
                      bloomProbability >= 85
                        ? "destructive"
                        : bloomProbability >= 70
                          ? "secondary"
                          : "default"
                    }
                  >
                    {bloomStatus.text}
                  </Badge>
                </SheetTitle>
                <SheetDescription>
                  Real-time satellite data analysis for selected location
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {/* Overview Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Thermometer className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-blue-600 font-medium">
                          Temperature
                        </p>
                        <p className="text-lg font-bold text-blue-900">24°C</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Droplets className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-green-600 font-medium">
                          Nutrients
                        </p>
                        <p className="text-lg font-bold text-green-900">High</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="factors">Factors</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-4">
                  {/* Risk Probability */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Bloom Risk Probability
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">
                            Current Risk Level
                          </span>
                          <span
                            className={`text-lg font-bold ${bloomStatus.color}`}
                          >
                            {bloomProbability}%
                          </span>
                        </div>
                        <Progress
                          value={bloomProbability}
                          className={`h-3 ${getProgressColor(bloomProbability)}`}
                        />
                      </div>

                      <div
                        className={`p-4 rounded-lg border ${bloomStatus.bgColor} ${bloomStatus.borderColor}`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`w-5 h-5 mt-0.5 ${bloomStatus.color}`}
                          />
                          <div>
                            <p className={`font-semibold ${bloomStatus.color}`}>
                              {bloomStatus.text}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {bloomProbability >= 85
                                ? "High probability of algal bloom development. Immediate monitoring recommended."
                                : bloomProbability >= 70
                                  ? "Moderate risk conditions detected. Enhanced monitoring advised."
                                  : "Low risk conditions. Regular monitoring sufficient."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Risk Distribution Pie Chart */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Area Risk Distribution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={riskDistribution}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={2}
                              dataKey="value"
                            >
                              {riskDistribution.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center mt-2">
                        {riskDistribution.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-1 justify-center"
                          >
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Trends Tab */}
                <TabsContent value="trends" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        7-Day Trend Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={historicalData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type="monotone"
                              dataKey="blooms"
                              stroke="#ef4444"
                              strokeWidth={2}
                              name="Bloom Risk %"
                            />
                            <Line
                              type="monotone"
                              dataKey="temperature"
                              stroke="#f59e0b"
                              strokeWidth={2}
                              name="Temperature °C"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Nutrient Levels Trend
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={historicalData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke="#f0f0f0"
                            />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Bar
                              dataKey="nutrients"
                              fill="#10b981"
                              name="Nutrient Level"
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Factors Tab */}
                <TabsContent value="factors" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Contributing Factors
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {factorData.map((factor, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="flex items-center gap-2">
                                <div
                                  className="w-2 h-2 rounded-full"
                                  style={{ backgroundColor: factor.color }}
                                />
                                {factor.name}
                              </span>
                              <span className="font-semibold">
                                {factor.value}%
                              </span>
                            </div>
                            <Progress value={factor.value} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Environmental Conditions */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">
                        Current Conditions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Sun className="w-4 h-4 text-amber-500" />
                          <div>
                            <p className="text-gray-600">Solar Radiation</p>
                            <p className="font-semibold">650 W/m²</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Wind className="w-4 h-4 text-blue-500" />
                          <div>
                            <p className="text-gray-600">Wind Speed</p>
                            <p className="font-semibold">12 km/h</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Droplets className="w-4 h-4 text-cyan-500" />
                          <div>
                            <p className="text-gray-600">Water Flow</p>
                            <p className="font-semibold">Slow</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <Eye className="w-4 h-4 text-purple-500" />
                          <div>
                            <p className="text-gray-600">Water Clarity</p>
                            <p className="font-semibold">Low</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Location Details */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">
                    Location Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Coordinates</p>
                      <p className="font-mono text-xs mt-1">
                        {selectedLocation?.lat.toFixed(6)},{" "}
                        {selectedLocation?.lng.toFixed(6)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Last Updated</p>
                      <p className="text-gray-900">2 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>

          {/* Actions - Fixed at bottom */}
          <div className="border-t p-6 bg-background sticky bottom-0">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setSheetOpen(false)}
              >
                Close
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={() => {
                  alert(
                    `Now monitoring area at ${selectedLocation?.lat.toFixed(6)}, ${selectedLocation?.lng.toFixed(6)}`,
                  );
                }}
              >
                Start Monitoring
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainContainer;
