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
import { SearchResponse } from "./search-container.model";
import axios from "axios";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import SearchResultAdapter from "./search-result-adapter";

const SearchContainer = () => {
  const [query, setquery] = useState<string>("");
  const [searchResponse, setsearchResponse] = useState<SearchResponse | null>(
    null,
  );
  const [loading, setloading] = useState<boolean>(false);

  const getFlowerData = async () => {
    try {
      setloading(true);
      const res = await axios.get(
        `https://perenual.com/api/v2/species-list?key=sk-1IzM68e163d92f31c12679&q=${query}`,
      );
      setsearchResponse(res.data);
    } catch (err) {
      console.log(err);
      setsearchResponse(null);
    } finally {
      setloading(false);
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
                onChange={(e) => setquery(e.target.value)}
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
                Results ({searchResponse.total})
              </h3>
              <p className="text-sm text-gray-500">
                Page {searchResponse.current_page} of {searchResponse.last_page}
              </p>
            </div>

            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {searchResponse.data.map((flower) => (
                  <SearchResultAdapter key={flower.id} {...flower} />
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
