"use client";

import { Card } from "@/components/ui/card";
import { MapIcon } from "lucide-react";

export function MapPreview() {
  return (
    <div className="space-y-4">
      <h2 className="text-3xl font-bold text-white drop-shadow-lg text-center">
        Global Bloom Map
      </h2>
      <Card className="p-0 overflow-hidden shadow-2xl bg-white/80 backdrop-blur-md border-2 border-white/40 hover:border-white/60 transition-colors">
        <div className="relative h-[600px] bg-gradient-to-br from-lime-400/10 via-green-400/5 to-lime-300/10">
          <img
            src="/world-map-with-flower-bloom-locations-marked.jpg"
            alt="Map showing flower bloom locations"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-3 bg-white/95 backdrop-blur-md p-10 rounded-2xl border-2 border-green-200 shadow-2xl">
              <MapIcon className="w-20 h-20 text-green-700 mx-auto drop-shadow-lg" />
              <p className="text-2xl font-bold text-green-900">
                Interactive Bloom Map
              </p>
              <p className="text-base text-green-700 max-w-md">
                Explore real-time flower blooming predictions across continents
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
