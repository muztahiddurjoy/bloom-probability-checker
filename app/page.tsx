"use client";
import { MapPreview } from "@/components/dashboard/map-preview";
import { IntroSection } from "@/components/dashboard/intro-section";
import { Flower2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const layer1 = scrollY * 0.7;
  const layer2 = scrollY * 0.4;
  const layer3 = scrollY * 0.2;
  const opacity = 1 - Math.min(scrollY * 0.001, 0.3);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Deep Background Layer */}
      <div
        className="fixed inset-0"
        style={{
          transform: `-translateY(${layer1}px) scale(1.1)`,
          opacity: opacity,
        }}
      >
        <img
          src="/background.webp"
          alt="Background"
          className="w-full h-full object-center object-cover blur-sm"
        />
      </div>

      {/* Mid Layer with overlay */}
      <div
        className="fixed inset-0 bg-black/30"
        style={{
          transform: `translateY(${layer2}px)`,
        }}
      />

      {/* Content Layer */}
      <div
        className="relative z-10"
        style={{
          transform: `translateY(${layer3}px)`,
        }}
      >
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-lime-500/90 rounded-xl shadow-lg">
              <Flower2 className="w-8 h-8 text-green-900" />
            </div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">
              Bloom Tracker
            </h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-12">
          <IntroSection />
          <MapPreview />
        </main>
      </div>
    </div>
  );
}
