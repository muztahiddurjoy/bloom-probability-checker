import { MapPreview } from "@/components/dashboard/map-preview"
import { IntroSection } from "@/components/dashboard/intro-section"
import { Flower2 } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
        <img
          src="/background.webp"
          alt="Background"
          className="w-full h-full object-cover blur-sm fixed"
        />

      <div className="relative z-10">
        <header className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-lime-500/90 rounded-xl shadow-lg">
              <Flower2 className="w-8 h-8 text-green-900" />
            </div>
            <h1 className="text-3xl font-bold text-white drop-shadow-lg">Bloom Tracker</h1>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 space-y-12">
          <IntroSection />
          <MapPreview />
        </main>
      </div>
    </div>
  )
}
