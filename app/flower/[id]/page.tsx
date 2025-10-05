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
  Trees,
  Clock,
  Gauge,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MapPin,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Trefle API Types
interface TrefleDistribution {
  id: number;
  name: string;
  slug: string;
  tdwg_code: string;
  tdwg_level: number;
  species_count: number;
}

interface TreflePlantDetails {
  id: number;
  common_name: string | null;
  slug: string;
  scientific_name: string;
  main_species_id: number;
  image_url: string | null;
  year: number | null;
  bibliography: string | null;
  author: string | null;
  family_common_name: string | null;
  genus_id: number;
  observations: string | null;
  vegetable: boolean;
  main_species: {
    id: number;
    common_name: string | null;
    slug: string;
    scientific_name: string;
    year: number | null;
    bibliography: string | null;
    author: string | null;
    status: string;
    rank: string;
    family_common_name: string | null;
    genus_id: number;
    observations: string | null;
    vegetable: boolean;
    image_url: string | null;
    genus: string;
    family: string;
    duration: string | null;
    edible_part: string | null;
    edible: boolean;
    images: Record<string, unknown>;
    common_names: Record<string, string[]>;
    distribution: {
      native: string[];
    };
    distributions: {
      native: TrefleDistribution[];
    };
    flower: {
      color: string | null;
      conspicuous: boolean | null;
    };
    foliage: {
      texture: string | null;
      color: string | null;
      leaf_retention: boolean | null;
    };
    fruit_or_seed: {
      conspicuous: boolean | null;
      color: string | null;
      shape: string | null;
      seed_persistence: boolean | null;
    };
    specifications: {
      ligneous_type: string | null;
      growth_form: string | null;
      growth_habit: string | null;
      growth_rate: string | null;
      average_height: { cm: number | null };
      maximum_height: { cm: number | null };
      nitrogen_fixation: string | null;
      shape_and_orientation: string | null;
      toxicity: string | null;
    };
    growth: {
      description: string | null;
      sowing: string | null;
      days_to_harvest: number | null;
      row_spacing: { cm: number | null };
      spread: { cm: number | null };
      ph_maximum: number | null;
      ph_minimum: number | null;
      light: number | null;
      atmospheric_humidity: number | null;
      growth_months: string[] | null;
      bloom_months: string[] | null;
      fruit_months: string[] | null;
      minimum_precipitation: { mm: number | null };
      maximum_precipitation: { mm: number | null };
      minimum_root_depth: { cm: number | null };
      minimum_temperature: { deg_f: number | null; deg_c: number | null };
      maximum_temperature: { deg_f: number | null; deg_c: number | null };
      soil_nutriments: string | null;
      soil_salinity: string | null;
      soil_texture: string[] | null;
      soil_humidity: string | null;
    };
    synonyms: Array<{
      id: number;
      name: string;
      author: string;
    }>;
  };
  genus: {
    id: number;
    name: string;
    slug: string;
  };
  family: {
    id: number;
    name: string;
    common_name: string | null;
    slug: string;
  };
}

interface TreflePlantResponse {
  data: TreflePlantDetails;
  meta: {
    last_modified: string;
  };
}

const FlowerPage = () => {
  const params = useParams();
  const router = useRouter();
  const flowerId = params.id;
  const [flowerData, setFlowerData] = useState<TreflePlantDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchFlowerData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/trefle/plants/${flowerId}`);

        if (!response.ok) throw new Error("Failed to fetch flower data");
        const data: TreflePlantResponse = await response.json();
        setFlowerData(data.data);
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
            Loading Plant Details...
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
            Plant Not Found
          </h2>
          <p className="text-lime-700 mb-6">
            {error || "The plant you're looking for doesn't exist."}
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

  const mainSpecies = flowerData.main_species;
  const getDisplayName = () => {
    return mainSpecies.common_name || flowerData.scientific_name;
  };

  const getCommonNames = () => {
    if (
      mainSpecies.common_names &&
      Object.keys(mainSpecies.common_names).length > 0
    ) {
      return Object.values(mainSpecies.common_names).flat();
    }
    return [];
  };

  const BooleanIndicator = ({
    value,
    trueText,
    falseText,
  }: {
    value: boolean | null;
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

  const getGrowthInfo = (value: any) => {
    return value !== null && value !== undefined
      ? String(value)
      : "Not specified";
  };

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-6">
            <Card className="overflow-hidden border-lime-200/50 bg-white/30 backdrop-blur-sm shadow-xl">
              <CardContent className="p-0">
                {flowerData.image_url ? (
                  <img
                    src={flowerData.image_url}
                    alt={getDisplayName()}
                    className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-96 lg:h-[500px] bg-gradient-to-br from-lime-100 to-emerald-100 flex items-center justify-center">
                    <Flower className="w-24 h-24 text-lime-600 opacity-50" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Author and Bibliography */}
            {(flowerData.author || flowerData.bibliography) && (
              <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-lime-600 mt-1 flex-shrink-0" />
                    <div className="text-sm">
                      {flowerData.author && (
                        <p className="text-lime-800">
                          <span className="font-semibold">Author:</span>{" "}
                          {flowerData.author}
                        </p>
                      )}
                      {flowerData.bibliography && (
                        <p className="text-gray-600 mt-1">
                          <span className="font-semibold">Source:</span>{" "}
                          {flowerData.bibliography}
                        </p>
                      )}
                      {flowerData.year && (
                        <p className="text-gray-500 text-xs mt-1">
                          Published: {flowerData.year}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Title Section */}
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-6 border border-lime-200/50 shadow-lg">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {flowerData.family && (
                  <Badge className="bg-lime-500 text-white hover:bg-lime-600 transition-colors">
                    {flowerData.family.name}
                    {flowerData.family.common_name &&
                      ` (${flowerData.family.common_name})`}
                  </Badge>
                )}
                {mainSpecies.specifications?.growth_habit && (
                  <Badge
                    variant="outline"
                    className="border-lime-400 text-lime-700 bg-lime-50"
                  >
                    <Trees className="w-3 h-3 mr-1" />
                    {mainSpecies.specifications.growth_habit}
                  </Badge>
                )}
                {mainSpecies.duration && (
                  <Badge
                    variant="outline"
                    className="border-emerald-400 text-emerald-700 bg-emerald-50"
                  >
                    <Clock className="w-3 h-3 mr-1" />
                    {mainSpecies.duration}
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-lime-700 to-emerald-700 bg-clip-text text-transparent mb-3">
                {getDisplayName()}
              </h1>

              <p className="text-xl text-lime-800 italic mb-4 font-light">
                {flowerData.scientific_name}
              </p>

              {/* Common Names */}
              {getCommonNames().length > 0 && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Common names:</p>
                  <div className="flex flex-wrap gap-2">
                    {getCommonNames()
                      .slice(0, 5)
                      .map((name, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-lime-100 text-lime-800"
                        >
                          {name}
                        </Badge>
                      ))}
                    {getCommonNames().length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{getCommonNames().length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Observations */}
              {flowerData.observations && (
                <p className="text-sm text-gray-600 bg-lime-50/50 p-3 rounded-lg border border-lime-200">
                  <MapPin className="w-4 h-4 inline mr-1 text-lime-600" />
                  {flowerData.observations}
                </p>
              )}
            </div>

            {/* Quick Stats */}
            <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lime-900 mb-4 text-lg flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Plant Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-lime-50 rounded-lg border border-lime-200">
                    <Trees className="w-6 h-6 text-lime-600 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Growth Habit</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {getGrowthInfo(mainSpecies.specifications?.growth_habit)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Ruler className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Avg Height</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {mainSpecies.specifications?.average_height?.cm
                        ? `${mainSpecies.specifications.average_height.cm} cm`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <Flower className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Flower Color</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {getGrowthInfo(mainSpecies.flower?.color)}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                    <Leaf className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-600">Foliage</p>
                    <p className="font-semibold text-lime-900 text-sm">
                      {getGrowthInfo(mainSpecies.foliage?.texture)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for Detailed Information */}
            <Tabs defaultValue="classification" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/30 backdrop-blur-sm border border-lime-200/50 p-1 rounded-2xl">
                <TabsTrigger
                  value="classification"
                  className="flex items-center gap-2 transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  Classification
                </TabsTrigger>
                <TabsTrigger
                  value="distribution"
                  className="flex items-center gap-2 transition-all"
                >
                  <MapPin className="w-4 h-4" />
                  Distribution
                </TabsTrigger>
                <TabsTrigger
                  value="characteristics"
                  className="flex items-center gap-2 transition-all"
                >
                  <Leaf className="w-4 h-4" />
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="growth"
                  className="flex items-center gap-2 transition-all"
                >
                  <Sprout className="w-4 h-4" />
                  Growth
                </TabsTrigger>
              </TabsList>

              {/* Classification Tab */}
              <TabsContent value="classification" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Taxonomy
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <span className="text-gray-600">Kingdom:</span>
                            <span className="font-medium text-lime-900">
                              Plantae
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <span className="text-gray-600">Family:</span>
                            <span className="font-medium text-lime-900">
                              {flowerData.family.name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <span className="text-gray-600">Genus:</span>
                            <span className="font-medium text-lime-900">
                              {flowerData.genus.name}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <span className="text-gray-600">Species:</span>
                            <span className="font-medium text-lime-900">
                              {flowerData.scientific_name}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Plant Status
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <span className="text-gray-600">Rank:</span>
                            <Badge className="bg-lime-100 text-lime-800">
                              {mainSpecies.rank}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <span className="text-gray-600">Status:</span>
                            <Badge
                              className={
                                mainSpecies.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-amber-100 text-amber-800"
                              }
                            >
                              {mainSpecies.status}
                            </Badge>
                          </div>
                          <BooleanIndicator
                            value={flowerData.vegetable}
                            trueText="Vegetable Plant"
                            falseText="Ornamental Plant"
                          />
                          <BooleanIndicator
                            value={mainSpecies.edible}
                            trueText="Edible Plant"
                            falseText="Not Edible"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Synonyms */}
                    {mainSpecies.synonyms &&
                      mainSpecies.synonyms.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-semibold text-lime-900 mb-3">
                            Synonyms
                          </h4>
                          <div className="bg-white/50 p-4 rounded-lg border border-lime-200">
                            <div className="flex flex-wrap gap-2">
                              {mainSpecies.synonyms
                                .slice(0, 5)
                                .map((synonym, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200"
                                  >
                                    {synonym.name}
                                    {synonym.author && ` (${synonym.author})`}
                                  </Badge>
                                ))}
                              {mainSpecies.synonyms.length > 5 && (
                                <Badge variant="outline" className="text-xs">
                                  +{mainSpecies.synonyms.length - 5} more
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Distribution Tab */}
              <TabsContent value="distribution" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    {mainSpecies.distribution?.native &&
                    mainSpecies.distribution.native.length > 0 ? (
                      <div>
                        <h4 className="font-semibold text-lime-900 mb-4 flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          Native Distribution
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 mb-3">
                              This plant is native to:
                            </p>
                            <div className="bg-white/50 p-4 rounded-lg border border-lime-200 max-h-60 overflow-y-auto">
                              <div className="space-y-2">
                                {mainSpecies.distribution.native.map(
                                  (region, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 p-2 hover:bg-lime-50 rounded"
                                    >
                                      <MapPin className="w-4 h-4 text-lime-600 flex-shrink-0" />
                                      <span className="text-lime-900">
                                        {region}
                                      </span>
                                    </div>
                                  ),
                                )}
                              </div>
                            </div>
                          </div>

                          {mainSpecies.distributions?.native && (
                            <div>
                              <p className="text-sm text-gray-600 mb-3">
                                Distribution details:
                              </p>
                              <div className="space-y-2">
                                {mainSpecies.distributions.native
                                  .slice(0, 5)
                                  .map((dist, index) => (
                                    <div
                                      key={index}
                                      className="flex justify-between items-center p-3 bg-white/50 rounded-lg border border-lime-200"
                                    >
                                      <span className="font-medium text-lime-900">
                                        {dist.name}
                                      </span>
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        {dist.species_count} species
                                      </Badge>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No distribution information available</p>
                      </div>
                    )}
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
                          Flower Characteristics
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Color:</span>
                            <span className="font-medium text-lime-900">
                              {getGrowthInfo(mainSpecies.flower?.color)}
                            </span>
                          </div>
                          <BooleanIndicator
                            value={mainSpecies.flower?.conspicuous}
                            trueText="Showy Flowers"
                            falseText="Inconspicuous Flowers"
                          />
                        </div>

                        <h4 className="font-semibold text-lime-900 mt-6">
                          Foliage Characteristics
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Texture:</span>
                            <span className="font-medium text-lime-900">
                              {getGrowthInfo(mainSpecies.foliage?.texture)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Color:</span>
                            <span className="font-medium text-lime-900">
                              {getGrowthInfo(mainSpecies.foliage?.color)}
                            </span>
                          </div>
                          <BooleanIndicator
                            value={mainSpecies.foliage?.leaf_retention}
                            trueText="Evergreen"
                            falseText="Deciduous"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Fruit & Seed Characteristics
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Color:</span>
                            <span className="font-medium text-lime-900">
                              {getGrowthInfo(mainSpecies.fruit_or_seed?.color)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Shape:</span>
                            <span className="font-medium text-lime-900">
                              {getGrowthInfo(mainSpecies.fruit_or_seed?.shape)}
                            </span>
                          </div>
                          <BooleanIndicator
                            value={mainSpecies.fruit_or_seed?.conspicuous}
                            trueText="Showy Fruits"
                            falseText="Inconspicuous Fruits"
                          />
                          <BooleanIndicator
                            value={mainSpecies.fruit_or_seed?.seed_persistence}
                            trueText="Persistent Seeds"
                            falseText="Non-persistent Seeds"
                          />
                        </div>

                        <h4 className="font-semibold text-lime-900 mt-6">
                          Special Features
                        </h4>
                        <div className="space-y-3">
                          <BooleanIndicator
                            value={
                              mainSpecies.specifications?.nitrogen_fixation !==
                              null
                            }
                            trueText="Nitrogen Fixing"
                            falseText="Not Nitrogen Fixing"
                          />
                          <div className="flex justify-between">
                            <span className="text-gray-600">Toxicity:</span>
                            <span className="font-medium text-lime-900">
                              {getGrowthInfo(
                                mainSpecies.specifications?.toxicity,
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Growth Tab */}
              <TabsContent value="growth" className="space-y-4 mt-4">
                <Card className="border-lime-200/50 bg-white/30 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Growth Requirements
                        </h4>

                        {mainSpecies.growth?.light !== null && (
                          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Sun className="w-5 h-5 text-amber-500" />
                            <div>
                              <p className="text-sm text-gray-600">
                                Light Requirement
                              </p>
                              <p className="font-medium text-lime-900">
                                {mainSpecies.growth.light} (index)
                              </p>
                            </div>
                          </div>
                        )}

                        {mainSpecies.growth?.ph_minimum !== null &&
                          mainSpecies.growth?.ph_maximum !== null && (
                            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                              <Droplets className="w-5 h-5 text-blue-500" />
                              <div>
                                <p className="text-sm text-gray-600">
                                  Soil pH Range
                                </p>
                                <p className="font-medium text-lime-900">
                                  {mainSpecies.growth.ph_minimum} -{" "}
                                  {mainSpecies.growth.ph_maximum}
                                </p>
                              </div>
                            </div>
                          )}

                        {mainSpecies.growth?.spread?.cm !== null && (
                          <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Ruler className="w-5 h-5 text-lime-600" />
                            <div>
                              <p className="text-sm text-gray-600">Spread</p>
                              <p className="font-medium text-lime-900">
                                {mainSpecies.growth.spread.cm} cm
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-semibold text-lime-900">
                          Seasonal Information
                        </h4>

                        {mainSpecies.growth?.growth_months &&
                          mainSpecies.growth.growth_months.length > 0 && (
                            <div className="p-3 bg-white/50 rounded-lg border border-lime-200">
                              <p className="text-sm text-gray-600 mb-2">
                                Active Growth Months
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {mainSpecies.growth.growth_months.map(
                                  (month, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-green-100 text-green-800 text-xs"
                                    >
                                      {month}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                        {mainSpecies.growth?.bloom_months &&
                          mainSpecies.growth.bloom_months.length > 0 && (
                            <div className="p-3 bg-white/50 rounded-lg border border-lime-200">
                              <p className="text-sm text-gray-600 mb-2">
                                Bloom Months
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {mainSpecies.growth.bloom_months.map(
                                  (month, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-purple-100 text-purple-800 text-xs"
                                    >
                                      {month}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                        {mainSpecies.growth?.fruit_months &&
                          mainSpecies.growth.fruit_months.length > 0 && (
                            <div className="p-3 bg-white/50 rounded-lg border border-lime-200">
                              <p className="text-sm text-gray-600 mb-2">
                                Fruit Months
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {mainSpecies.growth.fruit_months.map(
                                  (month, index) => (
                                    <Badge
                                      key={index}
                                      className="bg-orange-100 text-orange-800 text-xs"
                                    >
                                      {month}
                                    </Badge>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Temperature and Precipitation */}
                    {(mainSpecies.growth?.minimum_temperature?.deg_c !== null ||
                      mainSpecies.growth?.maximum_temperature?.deg_c !== null ||
                      mainSpecies.growth?.minimum_precipitation?.mm !==
                        null) && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {mainSpecies.growth.minimum_temperature?.deg_c !==
                          null && (
                          <div className="text-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Thermometer className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-xs text-gray-600">
                              Min Temperature
                            </p>
                            <p className="font-semibold text-lime-900">
                              {mainSpecies.growth.minimum_temperature.deg_c}°C
                            </p>
                          </div>
                        )}
                        {mainSpecies.growth.maximum_temperature?.deg_c !==
                          null && (
                          <div className="text-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Thermometer className="w-6 h-6 text-red-500 mx-auto mb-2" />
                            <p className="text-xs text-gray-600">
                              Max Temperature
                            </p>
                            <p className="font-semibold text-lime-900">
                              {mainSpecies.growth.maximum_temperature.deg_c}°C
                            </p>
                          </div>
                        )}
                        {mainSpecies.growth.minimum_precipitation?.mm !==
                          null && (
                          <div className="text-center p-3 bg-white/50 rounded-lg border border-lime-200">
                            <Droplets className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                            <p className="text-xs text-gray-600">
                              Min Precipitation
                            </p>
                            <p className="font-semibold text-lime-900">
                              {mainSpecies.growth.minimum_precipitation.mm}mm
                            </p>
                          </div>
                        )}
                      </div>
                    )}
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
