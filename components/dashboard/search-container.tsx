"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "../ui/button";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import SearchResultAdapter from "./search-result-adapter";

// Trefle API response types
export interface TrefleSpecies {
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
  image_url: string | null;
  synonyms: string[];
  genus: string;
  family: string;
  links: {
    self: string;
    plant: string;
    genus: string;
  };
}

interface TrefleSearchResponse {
  data: TrefleSpecies[];
  links: {
    self: string;
    first: string;
    last: string;
  };
  meta: {
    total: number;
  };
}

const SearchContainer = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResponse, setSearchResponse] =
    useState<TrefleSearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getFlowerData = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const res = await axios.get(
        `/api/trefle?q=${encodeURIComponent(query)}&limit=10`,
      );
      setSearchResponse(res.data);
    } catch (err) {
      console.error("Error fetching flower data:", err);
      setSearchResponse(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      getFlowerData();
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          className:
            "bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold backdrop-blur-sm",
          variant: "outline",
        })}
      >
        <Search className="w-4 h-4 mr-2" />
        Search Flowers
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-lime-600">Search Flower</DialogTitle>
          <DialogDescription>
            <div className="flex mt-3">
              <Input
                value={query}
                placeholder="Search Flower..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="rounded-r-none border-lime-400"
              />
              <Button
                size="icon"
                className="bg-lime-600 hover:bg-lime-700 rounded-l-none"
                disabled={loading}
                onClick={getFlowerData}
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={15} />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>

        {/* Search Results */}
        {searchResponse && (
          <div className="mt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-700">
                Results ({searchResponse.meta.total})
              </h3>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {searchResponse.data.map((species) => (
                  <SearchResultAdapter key={species.id} species={species} />
                ))}
                {searchResponse.data.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No flowers found. Try a different search term.
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchContainer;
