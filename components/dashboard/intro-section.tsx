import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sparkles,
  Map,
  BarChart3,
  Search,
  Globe,
  CircleQuestionMark,
} from "lucide-react";
import SearchContainer from "./search-container";
import Link from "next/link";

export function IntroSection() {
  return (
    <div className="space-y-8">
      <Card className="p-10 bg-white/10 backdrop-blur-md border-2 border-white/20 shadow-2xl">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-lime-500/20 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Sparkles className="w-8 h-8 text-lime-400" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-white text-balance">
                Predict Nature's Beauty
              </h2>
              <p className="text-lg text-gray-200 leading-relaxed max-w-3xl text-pretty">
                Welcome to Bloom Tracker, the world's first AI-powered platform
                for predicting flower blooming patterns across the globe. Using
                advanced climate modeling and historical data, we forecast when
                and where flowers will bloom, helping nature enthusiasts,
                photographers, and researchers plan their perfect moments with
                nature.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Link
              href="/map"
              className={buttonVariants({
                className:
                  "bg-lime-500 hover:bg-lime-600 text-green-900 font-semibold shadow-lg",
              })}
            >
              <Map className="w-4 h-4 mr-2" />
              Explore Map
            </Link>
            <SearchContainer />
            <Link
              href="/about"
              className={buttonVariants({
                className:
                  "bg-lime-500 hover:bg-lime-600 text-green-900 font-semibold shadow-lg",
              })}
            >
              <CircleQuestionMark />
              About
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
