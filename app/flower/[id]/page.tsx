"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Share2,
  Heart,
  Calendar,
  Droplets,
  Sun,
  Ruler,
  Leaf,
  Shield,
  Thermometer,
  Sprout,
  Flower,
  Fruit,
  Trees,
  Clock,
  Gauge,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SingleFlower } from "./single-flower.model";

const FlowerPage = () => {
  const params = useParams();
  const router = useRouter();
  const flowerId = params.id;
  const [flowerData, setFlowerData] = useState<SingleFlower | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFlowerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://perenual.com/api/v2/species/details/${flowerId}?key=sk-1IzM68e163d92f31c12679`,
        );
        if (!response.ok) throw new Error("Failed to fetch flower data");
        const data = await response.json();
        setFlowerData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (flowerId) {
      fetchFlowerData();
    }
  }, [flowerId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-lime-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-lime-900">
            Loading Flower Details...
          </h2>
        </div>
      </div>
    );
  }

  if (error || !flowerData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-green-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-lime-900 mb-2">
            Flower Not Found
          </h2>
          <p className="text-lime-700 mb-6">
            {error || "The flower you're looking for doesn't exist."}
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

  const getScientificName = () => {
    return (
      flowerData.scientific_name?.[0] ||
      `${flowerData.genus} ${flowerData.species_epithet}`
    );
  };

  const getDimension = (type: string) => {
    return flowerData.dimensions.find((dim) => dim.type === type);
  };

  const heightDimension = getDimension("height");
  const widthDimension = getDimension("width");

  const BooleanIndicator = ({
    value,
    trueText,
    falseText,
  }: {
    value: boolean;
    trueText: string;
    falseText: string;
  }) => (
    <div className="flex items-center gap-2">
      {value ? (
        <CheckCircle className="w-4 h-4 text-green-600" />
      ) : (
        <XCircle className="w-4 h-4 text-red-500" />
      )}
      <span className={value ? "text-green-700" : "text-red-700"}>
        {value ? trueText : falseText}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-emerald-50 to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-lime-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button
                variant="ghost"
                className="text-lime-700 hover:text-lime-900 hover:bg-lime-100/50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Search
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className={`border-lime-300 transition-all duration-300 ${
                  isFavorite
                    ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                    : "text-lime-700 hover:bg-lime-100/50"
                }`}
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-lime-300 text-lime-700 hover:bg-lime-100/50 transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-lime-200/50 bg-white/30 backdrop-blur-sm shadow-xl">
              <CardContent className="p-0">
                {flowerData.default_image ? (
                  <img
                    src={flowerData.default_image.regular_url}
                    alt={flowerData.common_name}
                    className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-lime-100 to-emerald-100 flex items-center justify-center">
                    <Flower className="w-24 h-24 text-lime-600 opacity-50" />
                  </div>
                )}
              </CardContent>
            </Card>

            {flowerData.default_image?.license_name && (
              <p className="text-xs text-gray-500 text-center bg-white/50 p-2 rounded-lg backdrop-blur-sm">
                📷 Image license: {flowerData.default_image.license_name}
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-lime-200/50 shadow-lg">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {flowerData.family && (
                  <Badge className="bg-lime-500 text-white hover:bg-lime-600 transition-colors">
                    {flowerData.family}
                  </Badge>
                )}
                {flowerData.cycle && (
                  <Badge
                    variant="outline"
                    className="border-lime-400 text-lime-700 bg-lime-50"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {flowerData.cycle}
                  </Badge>
                )}
                {flowerData.type && (
                  <Badge
                    variant="outline"
                    className="border-emerald-400 text-emerald-700 bg-emerald-50"
                  >
                    <Trees className="w-3 h-3 mr-1" />
                    {flowerData.type}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-lime-700 to-emerald-700 bg-clip-text text-transparent mb-3">
                {flowerData.common_name}
              </h1>

              <p className="text-xl text-lime-800 italic mb-4 font-light">
                {getScientificName()}
              </p>

              {flowerData.other_name && flowerData.other_name.length > 0 && (
                <p className="text-gray-600 text-sm">
                  Also known as:{" "}
                  <span className="text-lime-700 font-medium">
                    {flowerData.other_name.slice(0, 3).join(", ")}
                  </span>
                  {flowerData.other_name.length > 3 &&
                    ` +${flowerData.other_name.length - 3} more`}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lime-900 mb-4 text-lg flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Quick Stats
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-lime-50 rounded-lg border border-lime-200">
                    <Sun className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Sunlight</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {flowerData.sunlight?.[0] || "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Watering</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {flowerData.watering || "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <Thermometer className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Hardiness</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {flowerData.hardiness?.min || "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Sprout className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Growth Rate</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {flowerData.growth_rate || "N/A"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Detailed Information */}
            <Tabs defaultValue="care" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/30 backdrop-blur-sm border border-lime-200/50 p-1 rounded-2xl">
                <TabsTrigger
                  value="care"
                  className="flex items-center gap-2 transition-all"
                >
                  <Droplets className="w-4 h-4" />
                  Care
                </TabsTrigger>
                <TabsTrigger
                  value="characteristics"
                  className="flex items-center gap-2 transition-all"
                >
                  <Leaf className="w-4 h-4" />
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="details"
                  className="flex items-center gap-2 transition-all"
                >
                  <Flower className="w-4 h-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="safety"
                  className="flex items-center gap-2 transition-all"
                >
                  <Shield className="w-4 h-4" />
                  Safety
                </TabsTrigger>
              </TabsList>

              {/* Care Tab */}
              <TabsContent value="care" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                          <Sun className="w-5 h-5 text-amber-500" />
                          <div>
                            <p className="text-sm text-gray-600">
                              Sunlight Requirements
                            </p>
                            <p className="font-medium text-lime-900">
                              {flowerData.sunlight?.join(", ") ||
                                "Not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                          <Droplets className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-sm text-gray-600">Watering</p>
                            <p className="font-medium text-lime-900">
                              {flowerData.watering || "Not specified"}
                            </p>
                            {flowerData.watering_general_benchmark && (
                              <p className="text-xs text-gray-500">
                                {flowerData.watering_general_benchmark.value}{" "}
                                {flowerData.watering_general_benchmark.unit}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {heightDimension && (
                          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Ruler className="w-5 h-5 text-lime-600" />
                            <div>
                              <p className="text-sm text-gray-600">Height</p>
                              <p className="font-medium text-lime-900">
                                {heightDimension.min_value} -{" "}
                                {heightDimension.max_value}{" "}
                                {heightDimension.unit}
                              </p>
                            </div>
                          </div>
                        )}

                        {widthDimension && (
                          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Ruler className="w-5 h-5 text-lime-600" />
                            <div>
                              <p className="text-sm text-gray-600">Spread</p>
                              <p className="font-medium text-lime-900">
                                {widthDimension.min_value} -{" "}
                                {widthDimension.max_value} {widthDimension.unit}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Care Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                      {flowerData.maintenance && (
                        <div className="text-center p-2 bg-white/50 rounded-lg border border-lime-200">
                          <p className="text-xs text-gray-600">Maintenance</p>
                          <p className="font-semibold text-lime-900 text-sm">
                            {flowerData.maintenance}
                          </p>
                        </div>
                      )}
                      {flowerData.care_level && (
                        <div className="text-center p-2 bg-white/50 rounded-lg border border-lime-200">
                          <p className="text-xs text-gray-600">Care Level</p>
                          <p className="font-semibold text-lime-900 text-sm">
                            {flowerData.care_level}
                          </p>
                        </div>
                      )}
                      {flowerData.soil && flowerData.soil.length > 0 && (
                        <div className="text-center p-2 bg-white/50 rounded-lg border border-lime-200">
                          <p className="text-xs text-gray-600">Soil</p>
                          <p className="font-semibold text-lime-900 text-sm">
                            {flowerData.soil[0]}
                          </p>
                        </div>
                      )}
                      {flowerData.hardiness && (
                        <div className="text-center p-2 bg-white/50 rounded-lg border border-lime-200">
                          <p className="text-xs text-gray-600">
                            Hardiness Zone
                          </p>
                          <p className="font-semibold text-lime-900 text-sm">
                            {flowerData.hardiness.min} -{" "}
                            {flowerData.hardiness.max}
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Characteristics Tab */}
              <TabsContent value="characteristics" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Plant Features
                        </h4>
                        <BooleanIndicator
                          value={flowerData.flowers}
                          trueText="Produces Flowers"
                          falseText="No Flowers"
                        />
                        <BooleanIndicator
                          value={flowerData.fruits}
                          trueText="Produces Fruits"
                          falseText="No Fruits"
                        />
                        <BooleanIndicator
                          value={flowerData.cones}
                          trueText="Produces Cones"
                          falseText="No Cones"
                        />
                        <BooleanIndicator
                          value={flowerData.thorny}
                          trueText="Thorny"
                          falseText="No Thorns"
                        />
                        <BooleanIndicator
                          value={flowerData.leaf}
                          trueText="Has Leaves"
                          falseText="No Leaves"
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Tolerance
                        </h4>
                        <BooleanIndicator
                          value={flowerData.drought_tolerant}
                          trueText="Drought Tolerant"
                          falseText="Not Drought Tolerant"
                        />
                        <BooleanIndicator
                          value={flowerData.salt_tolerant}
                          trueText="Salt Tolerant"
                          falseText="Not Salt Tolerant"
                        />
                        <BooleanIndicator
                          value={flowerData.tropical}
                          trueText="Tropical Plant"
                          falseText="Not Tropical"
                        />
                        <BooleanIndicator
                          value={flowerData.indoor}
                          trueText="Suitable for Indoors"
                          falseText="Outdoor Plant"
                        />
                        <BooleanIndicator
                          value={flowerData.invasive}
                          trueText="Invasive Species"
                          falseText="Not Invasive"
                        />
                      </div>
                    </div>

                    {flowerData.attracts && flowerData.attracts.length > 0 && (
                      <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-semibold text-lime-900 mb-2">
                          Attracts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {flowerData.attracts.map((attract, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-yellow-100 text-yellow-800 border-yellow-300"
                            >
                              {attract}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Details Tab */}
              <TabsContent value="details" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    {flowerData.description && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-lime-900 mb-3">
                          Description
                        </h4>
                        <p className="text-gray-700 leading-relaxed bg-white/50 p-4 rounded-lg border border-lime-200">
                          {flowerData.description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold text-lime-900">
                          Classification
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Genus:</span>
                            <span className="font-medium text-lime-900">
                              {flowerData.genus}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Species:</span>
                            <span className="font-medium text-lime-900">
                              {flowerData.species_epithet}
                            </span>
                          </div>
                          {flowerData.cultivar && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Cultivar:</span>
                              <span className="font-medium text-lime-900">
                                {flowerData.cultivar}
                              </span>
                            </div>
                          )}
                          {flowerData.origin &&
                            flowerData.origin.length > 0 && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Origin:</span>
                                <span className="font-medium text-lime-900">
                                  {flowerData.origin.join(", ")}
                                </span>
                              </div>
                            )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-lime-900">
                          Growth Info
                        </h4>
                        <div className="space-y-2">
                          {flowerData.propagation &&
                            flowerData.propagation.length > 0 && (
                              <div>
                                <span className="text-gray-600">
                                  Propagation:{" "}
                                </span>
                                <span className="font-medium text-lime-900">
                                  {flowerData.propagation.join(", ")}
                                </span>
                              </div>
                            )}
                          {flowerData.pruning_month &&
                            flowerData.pruning_month.length > 0 && (
                              <div>
                                <span className="text-gray-600">
                                  Pruning Months:{" "}
                                </span>
                                <span className="font-medium text-lime-900">
                                  {flowerData.pruning_month.join(", ")}
                                </span>
                              </div>
                            )}
                          {flowerData.flowering_season && (
                            <div>
                              <span className="text-gray-600">
                                Flowering Season:{" "}
                              </span>
                              <span className="font-medium text-lime-900">
                                {flowerData.flowering_season}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Safety Tab */}
              <TabsContent value="safety" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Safety Information
                        </h4>
                        <BooleanIndicator
                          value={flowerData.poisonous_to_humans}
                          trueText="Poisonous to Humans"
                          falseText="Safe for Humans"
                        />
                        <BooleanIndicator
                          value={flowerData.poisonous_to_pets}
                          trueText="Poisonous to Pets"
                          falseText="Safe for Pets"
                        />
                        <BooleanIndicator
                          value={flowerData.edible_fruit}
                          trueText="Edible Fruit"
                          falseText="Fruit Not Edible"
                        />
                        <BooleanIndicator
                          value={flowerData.edible_leaf}
                          trueText="Edible Leaves"
                          falseText="Leaves Not Edible"
                        />
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">Uses</h4>
                        <BooleanIndicator
                          value={flowerData.medicinal}
                          trueText="Medicinal Uses"
                          falseText="No Medicinal Uses"
                        />
                        <BooleanIndicator
                          value={flowerData.cuisine}
                          trueText="Culinary Uses"
                          falseText="No Culinary Uses"
                        />

                        {flowerData.pest_susceptibility &&
                          flowerData.pest_susceptibility.length > 0 && (
                            <div className="mt-4">
                              <h5 className="font-medium text-lime-900 mb-2">
                                Pest Susceptibility
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {flowerData.pest_susceptibility
                                  .slice(0, 3)
                                  .map((pest, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="bg-red-50 text-red-700 border-red-200 text-xs"
                                    >
                                      {pest}
                                    </Badge>
                                  ))}
                                {flowerData.pest_susceptibility.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{flowerData.pest_susceptibility.length - 3}{" "}
                                    more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowerPage;
