import React from "react";
import { Daum } from "./search-container.model";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Leaf, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const SearchResultAdapter = (props: Daum) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/flower/${props.id}`);
  };

  const getScientificName = () => {
    if (props.scientific_name && props.scientific_name.length > 0) {
      return props.scientific_name[0];
    }
    return `${props.genus} ${props.species_epithet}`;
  };

  const hasImage = props.default_image?.regular_url;

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
                src={props.default_image?.regular_url}
                alt={props.common_name}
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
            {/* Common Name */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg text-lime-900 truncate">
                {props.common_name}
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
            <p className="text-sm text-gray-600 italic mb-3 truncate">
              {getScientificName()}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {props.family && (
                <Badge
                  variant="secondary"
                  className="text-xs bg-lime-100 text-lime-800"
                >
                  {props.family}
                </Badge>
              )}
              {props.genus && (
                <Badge
                  variant="outline"
                  className="text-xs border-lime-300 text-lime-700"
                >
                  Genus: {props.genus}
                </Badge>
              )}
              {(props.cultivar || props.variety) && (
                <Badge
                  variant="outline"
                  className="text-xs border-purple-300 text-purple-700"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {props.cultivar || props.variety}
                </Badge>
              )}
            </div>

            {/* Other Names */}
            {props.other_name && props.other_name.length > 0 && (
              <ScrollArea className="h-8">
                <p className="text-xs text-gray-500">
                  Also known as: {props.other_name.slice(0, 3).join(", ")}
                  {props.other_name.length > 3 &&
                    ` and ${props.other_name.length - 3} more`}
                </p>
              </ScrollArea>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchResultAdapter;
