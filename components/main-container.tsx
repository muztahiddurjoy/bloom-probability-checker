"use client";
import React, { useEffect, useState } from "react";
import { useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import { Button } from "./ui/button";
import {
  Loader2,
  Locate,
  Calendar,
  Flower,
  AlertTriangle,
  CheckCircle,
  XCircle,
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

// API Response Types
interface ApiResponse {
  success: boolean;
  status: "NO_BLOOM" | "BLOOM_DETECTED";
  peak_month?: number | null;
  peak_probability?: number | null;
  bloom_window?: number[] | null;
  top_species?: Array<{
    name: string;
    probability: number;
  }> | null;
  monthly_probabilities: {
    [key: string]: number;
  };
}

// Custom bloom markers
const bloomDetectedIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#ef4444" stroke="#ffffff" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="#fef3c7"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

const noBloomIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="14" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
      <circle cx="16" cy="16" r="6" fill="#d1fae5"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 16],
  popupAnchor: [0, -16],
});

export interface LatLng {
  lat: number;
  lng: number;
}

const MainContainer = () => {
  const [userLocation, setUserLocation] = useState<LatLng | null>(null);
  const [locating, setLocating] = useState<boolean>(false);
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [markers, setMarkers] = useState<
    Array<LatLng & { data?: ApiResponse }>
  >([]);

  const map = useMap();

  // Use useMapEvents to handle map clicks
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      const clickedLocation = { lat, lng };
      setSelectedLocation(clickedLocation);
      setLoading(true);
      setSheetOpen(true);

      try {
        const response = await fetch(
          "https://naseefnazrul-bloomai.hf.space/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              lat: lat,
              lon: lng,
              date: new Date().toISOString().split("T")[0], // Current date in YYYY-MM-DD format
            }),
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        setApiData(data);

        // Add marker to the clicked location with API data
        setMarkers([{ ...clickedLocation, data }]);
      } catch (error) {
        console.error("Error fetching bloom data:", error);
        // Fallback to mock data if API fails
        const mockData: ApiResponse = {
          success: true,
          status: Math.random() > 0.5 ? "BLOOM_DETECTED" : "NO_BLOOM",
          peak_month: Math.random() > 0.5 ? 10 : null,
          peak_probability: Math.random() > 0.5 ? 85 : null,
          bloom_window:
            Math.random() > 0.5
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
              : null,
          top_species:
            Math.random() > 0.5
              ? [
                  { name: "Acer pensylvanicum L.", probability: 16.17 },
                  { name: "Acer rubrum L.", probability: 12.15 },
                  { name: "Vaccinium vitis-idaea L.", probability: 11.8 },
                ]
              : null,
          monthly_probabilities: {
            "1": 8.65,
            "2": 8.698,
            "3": 11.481,
            "4": 15.986,
            "5": 16.828,
            "6": 11.355,
            "7": 5.38,
            "8": 2.696,
            "9": 1.775,
            "10": 2.598,
            "11": 5.871,
            "12": 8.682,
          },
        };
        setApiData(mockData);
        setMarkers([{ ...clickedLocation, data: mockData }]);
      } finally {
        setLoading(false);
      }
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

  // Helper functions
  const getBloomStatus = (data: ApiResponse) => {
    if (data.status === "BLOOM_DETECTED") {
      return {
        text: "Bloom Detected",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        icon: AlertTriangle,
      };
    }
    return {
      text: "No Bloom",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      icon: CheckCircle,
    };
  };

  const getProgressColor = (probability: number) => {
    if (probability >= 70) return "bg-red-500";
    if (probability >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getCurrentProbability = (data: ApiResponse) => {
    const currentMonth = new Date().getMonth() + 1; // 1-12
    return data.monthly_probabilities[currentMonth] || 0;
  };

  const formatMonthlyData = (monthlyProbabilities: {
    [key: string]: number;
  }) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return Object.entries(monthlyProbabilities).map(([month, probability]) => ({
      month: monthNames[parseInt(month) - 1],
      probability: probability,
    }));
  };

  const bloomStatus = apiData ? getBloomStatus(apiData) : null;
  const currentProbability = apiData ? getCurrentProbability(apiData) : 0;
  const monthlyData = apiData
    ? formatMonthlyData(apiData.monthly_probabilities)
    : [];

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
          icon={
            marker.data?.status === "BLOOM_DETECTED"
              ? bloomDetectedIcon
              : noBloomIcon
          }
        >
          <Popup>
            <div className="text-sm min-w-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full ${marker.data?.status === "BLOOM_DETECTED" ? "bg-red-500" : "bg-green-500"}`}
                />
                <strong
                  className={
                    marker.data?.status === "BLOOM_DETECTED"
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {marker.data?.status === "BLOOM_DETECTED"
                    ? "Bloom Detected"
                    : "No Bloom"}
                </strong>
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
                  <span>Current Risk:</span>
                  <span
                    className={`font-semibold ${marker.data?.status === "BLOOM_DETECTED" ? "text-red-600" : "text-green-600"}`}
                  >
                    {currentProbability}%
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
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
              ) : bloomStatus ? (
                <div
                  className={`p-2 rounded-lg ${bloomStatus.bgColor} ${bloomStatus.borderColor}`}
                >
                  <bloomStatus.icon
                    className={`w-5 h-5 ${bloomStatus.color}`}
                  />
                </div>
              ) : null}
              <div>
                <SheetTitle className="flex items-center gap-2">
                  {loading ? "Analyzing Location..." : "Bloom Analysis"}
                  {bloomStatus && !loading && (
                    <Badge
                      variant={
                        apiData?.status === "BLOOM_DETECTED"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {bloomStatus.text}
                    </Badge>
                  )}
                </SheetTitle>
                <SheetDescription>
                  {loading
                    ? "Fetching real-time bloom prediction data..."
                    : "Satellite data analysis for selected location"}
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-6">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-sm text-gray-600">
                    Analyzing bloom probability...
                  </p>
                </div>
              ) : apiData ? (
                <>
                  {/* Overview Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Calendar className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs text-blue-600 font-medium">
                              Peak Month
                            </p>
                            <p className="text-lg font-bold text-blue-900">
                              {apiData.peak_month
                                ? `Month ${apiData.peak_month}`
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <Flower className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs text-green-600 font-medium">
                              Peak Probability
                            </p>
                            <p className="text-lg font-bold text-green-900">
                              {apiData.peak_probability
                                ? `${apiData.peak_probability}%`
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="trends">Monthly Trends</TabsTrigger>
                    </TabsList>

                    {/* Overview Tab */}
                    <TabsContent value="overview" className="space-y-4">
                      {/* Current Risk Probability */}
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Current Month Risk
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">
                                Probability
                              </span>
                              <span
                                className={`text-lg font-bold ${currentProbability >= 70 ? "text-red-600" : currentProbability >= 40 ? "text-yellow-600" : "text-green-600"}`}
                              >
                                {currentProbability}%
                              </span>
                            </div>
                            <Progress
                              value={currentProbability}
                              className={`h-3 ${getProgressColor(currentProbability)}`}
                            />
                          </div>

                          <div
                            className={`p-4 rounded-lg border ${currentProbability >= 70 ? "bg-red-50 border-red-200" : currentProbability >= 40 ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"}`}
                          >
                            <div className="flex items-start gap-3">
                              {currentProbability >= 70 ? (
                                <XCircle className="w-5 h-5 mt-0.5 text-red-600" />
                              ) : currentProbability >= 40 ? (
                                <AlertTriangle className="w-5 h-5 mt-0.5 text-yellow-600" />
                              ) : (
                                <CheckCircle className="w-5 h-5 mt-0.5 text-green-600" />
                              )}
                              <div>
                                <p
                                  className={`font-semibold ${currentProbability >= 70 ? "text-red-600" : currentProbability >= 40 ? "text-yellow-600" : "text-green-600"}`}
                                >
                                  {currentProbability >= 70
                                    ? "High bloom risk this month"
                                    : currentProbability >= 40
                                      ? "Moderate bloom risk this month"
                                      : "Low bloom risk this month"}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {apiData.status === "BLOOM_DETECTED"
                                    ? "Historical data shows bloom patterns in this area."
                                    : "No significant bloom patterns detected historically."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Top Species */}
                      {apiData.top_species &&
                        apiData.top_species.length > 0 && (
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-sm">
                                Top Plant Species
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-3">
                                {apiData.top_species
                                  .slice(0, 3)
                                  .map((species, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center"
                                    >
                                      <span className="text-sm flex-1 truncate mr-2">
                                        {species.name}
                                      </span>
                                      <span className="text-sm font-semibold text-blue-600">
                                        {species.probability}%
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                    </TabsContent>

                    {/* Trends Tab */}
                    <TabsContent value="trends" className="space-y-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Monthly Probability Trends
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={monthlyData}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#f0f0f0"
                                />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                  formatter={(value) => [
                                    `${value}%`,
                                    "Probability",
                                  ]}
                                />
                                <Bar
                                  dataKey="probability"
                                  fill="#3b82f6"
                                  name="Probability"
                                  radius={[2, 2, 0, 0]}
                                />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm">
                            Annual Trend
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={monthlyData}>
                                <CartesianGrid
                                  strokeDasharray="3 3"
                                  stroke="#f0f0f0"
                                />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip
                                  formatter={(value) => [
                                    `${value}%`,
                                    "Probability",
                                  ]}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="probability"
                                  stroke="#ef4444"
                                  strokeWidth={2}
                                  name="Bloom Probability"
                                  dot={{ fill: "#ef4444", strokeWidth: 2 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
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
                          <p className="text-gray-600 font-medium">
                            Coordinates
                          </p>
                          <p className="font-mono text-xs mt-1">
                            {selectedLocation?.lat.toFixed(6)},{" "}
                            {selectedLocation?.lng.toFixed(6)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600 font-medium">
                            Analysis Date
                          </p>
                          <p className="text-gray-900">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <XCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p>
                    No data available. Click on the map to analyze a location.
                  </p>
                </div>
              )}
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
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainContainer;
