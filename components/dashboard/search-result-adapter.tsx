import React from "react";
import { TrefleSpecies } from "./search-container";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Leaf, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

interface SearchResultAdapterProps {
  species: TrefleSpecies;
}

const SearchResultAdapter = ({ species }: SearchResultAdapterProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/flower/${species.id}`);
  };

  const getDisplayName = () => {
    return species.common_name || species.scientific_name;
  };

  const hasImage = species.image_url;

  return (
    <Card
      className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-lime-200 bg-gradient-to-r from-white to-lime-50/30"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Image Section */}
          {hasImage ? (
            <div className="flex-shrink-0">
              <img
                src={species.image_url!}
                alt={getDisplayName()}
                className="w-20 h-20 rounded-lg object-cover border border-lime-200"
              />
            </div>
          ) : (
            <div className="flex-shrink-0 w-20 h-20 rounded-lg bg-lime-100 border border-lime-200 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-lime-600" />
            </div>
          )}

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Display Name */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg text-lime-900 truncate">
                {getDisplayName()}
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-lime-600 hover:text-lime-700 hover:bg-lime-100"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick();
                }}
              >
                <ExternalLink className="w-3 h-3" />
              </Button>
            </div>

            {/* Scientific Name */}
            {species.common_name && (
              <p className="text-sm text-gray-600 italic mb-3 truncate">
                {species.scientific_name}
              </p>
            )}

            {/* Author and Year */}
            {(species.author || species.year) && (
              <p className="text-xs text-gray-500 mb-2">
                {species.author} {species.year && `(${species.year})`}
              </p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {species.family && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-lime-100 text-lime-800"
                >
                  {species.family}
                  {species.family_common_name &&
                    ` (${species.family_common_name})`}
                </Badge>
              )}
              {species.genus && (
                <Badge
                  variant="outline"
                  className="text-xs border-lime-300 text-lime-700"
                >
                  Genus: {species.genus}
                </Badge>
              )}
              {species.rank && species.rank !== "species" && (
                <Badge
                  variant="outline"
                  className="text-xs border-purple-300 text-purple-700"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {species.rank}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-xs border-blue-300 text-blue-700"
              >
                {species.status}
              </Badge>
            </div>

            {/* Synonyms */}
            {species.synonyms && species.synonyms.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-1">Also known as:</p>
                <div className="flex flex-wrap gap-1">
                  {species.synonyms.slice(0, 2).map((synonym, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs border-gray-300 text-gray-600"
                    >
                      {synonym}
                    </Badge>
                  ))}
                  {species.synonyms.length > 2 && (
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-300 text-gray-600"
                    >
                      +{species.synonyms.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultAdapter;
