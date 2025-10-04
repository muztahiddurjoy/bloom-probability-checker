"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ArrowLeft,
  Leaf,
  Share2,
  Heart,
  Calendar,
  Droplets,
  Sun,
  Ruler,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data interface - replace with your actual data structure
interface FlowerData {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name: string[];
  family?: string;
  genus: string;
  species_epithet: string;
  cultivar?: string;
  variety?: string;
  description?: string;
  cycle?: string;
  watering?: string;
  sunlight?: string[];
  default_image?: {
    regular_url: string;
    medium_url: string;
    license_name: string;
  };
  // Additional details that might come from a more detailed API endpoint
  growth_rate?: string;
  maintenance?: string;
  soil?: string[];
  dimensions?: {
    min_value: number;
    max_value: number;
    unit: string;
  };
}

const FlowerPage = () => {
  const params = useParams();
  const router = useRouter();
  const flowerId = params.id;

  // Mock data - replace with actual API call
  const flowerData: FlowerData = {
    id: 1,
    common_name: "Rose",
    scientific_name: ["Rosa rubiginosa"],
    other_name: ["Sweet briar", "Eglantine"],
    family: "Rosaceae",
    genus: "Rosa",
    species_epithet: "rubiginosa",
    cultivar: "English Rose",
    description:
      "The rose is a woody perennial flowering plant of the genus Rosa, in the family Rosaceae, or the flower it bears. There are over three hundred species and tens of thousands of cultivars.",
    cycle: "Perennial",
    watering: "Average",
    sunlight: ["Full sun", "Partial shade"],
    growth_rate: "Medium",
    maintenance: "Moderate",
    soil: ["Loamy", "Well-drained"],
    dimensions: {
      min_value: 1,
      max_value: 2,
      unit: "meters",
    },
    default_image: {
      regular_url:
        "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg",
      medium_url:
        "https://images.pexels.com/photos/736230/pexels-photo-736230.jpeg",
      license_name: "Pexels License",
    },
  };

  // In a real app, you would fetch data based on flowerId
  useEffect(() => {
    const fetchFlowerData = async () => {
      const response = await fetch(
        `https://perenual.com/api/v2/species/details/${flowerId}?key=your-api-key`,
      );
      const data = await response.json();
      setFlowerData(data);
    };
    fetchFlowerData();
  }, [flowerId]);

  if (!flowerData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-16 h-16 text-lime-600 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-lime-900 mb-2">
            Flower Not Found
          </h2>
          <p className="text-lime-700 mb-4">
            The flower you're looking for doesn't exist.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-lime-600 hover:bg-lime-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lime-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-lime-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-lime-700 hover:text-lime-900 hover:bg-lime-100"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <Card className="overflow-hidden border-lime-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-0">
                {flowerData.default_image ? (
                  <img
                    src={flowerData.default_image.regular_url}
                    alt={flowerData.common_name}
                    className="w-full h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-96 bg-lime-100 flex items-center justify-center">
                    <Leaf className="w-24 h-24 text-lime-600" />
                  </div>
                )}
              </CardContent>
            </Card>

            {flowerData.default_image?.license_name && (
              <p className="text-xs text-gray-500 text-center">
                Image license: {flowerData.default_image.license_name}
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title Section */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {flowerData.family && (
                  <Badge className="bg-lime-100 text-lime-800 hover:bg-lime-200">
                    {flowerData.family}
                  </Badge>
                )}
                {flowerData.cycle && (
                  <Badge
                    variant="outline"
                    className="border-lime-300 text-lime-700"
                  >
                    {flowerData.cycle}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl font-bold text-lime-900 mb-2">
                {flowerData.common_name}
              </h1>

              <p className="text-xl text-lime-700 italic mb-3">
                {flowerData.scientific_name?.[0] ||
                  `${flowerData.genus} ${flowerData.species_epithet}`}
              </p>

              {flowerData.other_name && flowerData.other_name.length > 0 && (
                <p className="text-gray-600">
                  Also known as:{" "}
                  <span className="text-lime-700">
                    {flowerData.other_name.join(", ")}
                  </span>
                </p>
              )}
            </div>

            {/* Description */}
            {flowerData.description && (
              <Card className="border-lime-200 bg-white/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lime-900 mb-3 text-lg">
                    Description
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {flowerData.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Care Information */}
            <Card className="border-lime-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lime-900 mb-4 text-lg">
                  Care Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {flowerData.sunlight && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-100 rounded-lg">
                        <Sun className="w-5 h-5 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sunlight</p>
                        <p className="font-medium text-lime-900">
                          {flowerData.sunlight.join(", ")}
                        </p>
                      </div>
                    </div>
                  )}

                  {flowerData.watering && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-100 rounded-lg">
                        <Droplets className="w-5 h-5 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Watering</p>
                        <p className="font-medium text-lime-900">
                          {flowerData.watering}
                        </p>
                      </div>
                    </div>
                  )}

                  {flowerData.dimensions && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-100 rounded-lg">
                        <Ruler className="w-5 h-5 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Size</p>
                        <p className="font-medium text-lime-900">
                          {flowerData.dimensions.min_value} -{" "}
                          {flowerData.dimensions.max_value}{" "}
                          {flowerData.dimensions.unit}
                        </p>
                      </div>
                    </div>
                  )}

                  {flowerData.growth_rate && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-lime-100 rounded-lg">
                        <Calendar className="w-5 h-5 text-lime-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Growth Rate</p>
                        <p className="font-medium text-lime-900">
                          {flowerData.growth_rate}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Additional Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {flowerData.soil && (
                <Card className="border-lime-200 bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lime-900 mb-2">
                      Soil Type
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {flowerData.soil.map((type, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-lime-50 text-lime-800"
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {flowerData.maintenance && (
                <Card className="border-lime-200 bg-white/50 backdrop-blur-sm">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-lime-900 mb-2">
                      Maintenance
                    </h4>
                    <Badge className="bg-lime-100 text-lime-800">
                      {flowerData.maintenance}
                    </Badge>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Classification */}
            <Card className="border-lime-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lime-900 mb-4 text-lg">
                  Classification
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Genus</p>
                    <p className="font-medium text-lime-900">
                      {flowerData.genus}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600">Species</p>
                    <p className="font-medium text-lime-900">
                      {flowerData.species_epithet}
                    </p>
                  </div>
                  {flowerData.cultivar && (
                    <div>
                      <p className="text-gray-600">Cultivar</p>
                      <p className="font-medium text-lime-900">
                        {flowerData.cultivar}
                      </p>
                    </div>
                  )}
                  {flowerData.variety && (
                    <div>
                      <p className="text-gray-600">Variety</p>
                      <p className="font-medium text-lime-900">
                        {flowerData.variety}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerPage;
