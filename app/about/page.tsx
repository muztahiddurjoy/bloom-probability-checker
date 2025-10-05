import { Card } from "@/components/ui/card"
import { Database, Globe, Users } from "lucide-react"

export default function AboutPage() {
const teamMembers = [
    { name: "Rifah Tasnia Atoshe", email: "rifah.tasnia.atoshe@g.bracu.ac.bd" },
    { name: "Md. Kaif Ibn Zaman", email: "20240659140mdkaif@juniv.edu" },
    { name: "Muztahid Rahman", email: "muztahid.rahman@g.bracu.ac.bd" },
    { name: "Naseef Nazrul Islam", email: "naseef.nazrul.islam@g.bracu.ac.bd" },
    { name: "Nusrat Rahman", email: "nusrat.rahman1@g.bracu.ac.bd" },
    { name: "Naim Iftekhar Rahman", email: "naim.iftekhar.rahman@g.bracu.ac.bd" },
]

  const dataSources = [
    {
      name: "Copernicus Sentinel-2 Data",
      description:
        "High-resolution satellite imagery for calculating NDVI to monitor plant growth, leafing, and blooming events worldwide.",
      link: "https://scihub.copernicus.eu/",
    },
    {
      name: "National Ecological Observatory Network (NEON)",
      description:
        "Ground-level phenology data (leaf emergence and flowering) to validate predictions and improve model accuracy.",
      link: "https://data.neonscience.org/data-products/DP1.10055.001",
    },
    {
      name: "Wildflower Blooms Data",
      description:
        "Tracks wildflower blooming times and locations, enhancing predictive models for specific bloom events.",
      link: "#",
    },
    {
      name: "UCI Iris Dataset",
      description:
        "Used for testing classification models and validating predictions for plant species and blooming events.",
      link: "https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data",
    },
    {
      name: "Climate Data (NOAA)",
      description:
        "Temperature and precipitation data to simulate climate impacts on plant growth and predict future blooming trends.",
      link: "https://www.ncdc.noaa.gov/",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-lime-50 relative">
      {/* Floral Background Pattern */}
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2384cc16' fillOpacity='1'%3E%3Cpath d='M30 30c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm-20 0c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm10-20c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10zm0 40c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10-10-4.477-10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Hero Section */}
      <section className="border-b border-lime-200/50 relative">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center bg-white/60 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-lime-200/50">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl text-balance">
              Bloom Tracker
            </h1>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed text-pretty">
              An interactive system for tracking global plant growth patterns and predicting future blooming events
              through satellite data, machine learning, and climate science.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl relative">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-7 w-7 text-lime-700" />
            <h2 className="text-3xl font-bold text-gray-900">Abstract</h2>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-justify">
            <p>
              This project aims to develop an interactive plant phenology monitoring system that tracks global plant
              growth patterns and predicts future blooming events. By integrating remote sensing satellite data (such as
              Sentinel-2), machine learning algorithms and climate models, this "All-in-One" system provides real-time
              insights into plant life cycles.
            </p>
            <p>
              The platform includes a dynamic interactive map where users can observe blooming patterns across the
              world. It also features a search bar that allows users to look up specific plant species by name,
              providing detailed information on each plant's bloom periods, growth stages, and other phenological data.
              This feature makes the system an excellent tool for both knowledge seekers and professionals in fields
              like agriculture, research and environmental science and also help ecologists track the health of
              ecosystems.
            </p>
            <p>
              Our goal is to assist farmers, researchers and environmental scientists in understanding plant behavior,
              improving agricultural planning and monitoring the impacts of climate change on vegetation. By offering
              data-driven predictions and tools to forecast plant blooming events across different species and regions,
              the platform supports better decision-making for global plant management and conservation.{" "}
              <span className="font-semibold text-lime-800">
                After all, it is our responsibility to make our planet more habitable and green.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Motivation Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Motivation</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-lime-600 pl-6 bg-lime-50/50 py-3 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Agricultural Impact</h3>
                <p className="text-gray-700 leading-relaxed">
                  The ability to predict flowering and blooming times can significantly improve crop yield predictions,
                  helping farmers optimize planting and pre-plan harvesting schedules.
                </p>
              </div>

              <div className="border-l-4 border-lime-600 pl-6 bg-lime-50/50 py-3 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Climate Change Monitoring</h3>
                <p className="text-gray-700 leading-relaxed">
                  Plant phenology is a sensitive indicator of climate change. Understanding shifts in plant behavior due
                  to temperature variations and seasonal changes can aid in climate adaptation strategies.
                </p>
              </div>

              <div className="border-l-4 border-lime-600 pl-6 bg-lime-50/50 py-3 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Biodiversity Conservation</h3>
                <p className="text-gray-700 leading-relaxed">
                  Monitoring blooming periods can help ecologists track the health of ecosystems, providing early
                  warnings about shifts in species distributions and ecosystem degradation.
                </p>
              </div>

              <div className="border-l-4 border-lime-600 pl-6 bg-lime-50/50 py-3 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Research & Data-Driven Insights</h3>
                <p className="text-gray-700 leading-relaxed">
                  Providing access to a global database of plant phenology data allows researchers to identify seasonal
                  trends, track species behavior, and make informed decisions for conservation and climate science.
                </p>
              </div>

              <div className="border-l-4 border-lime-600 pl-6 bg-lime-50/50 py-3 rounded-r-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Access for Decision Makers</h3>
                <p className="text-gray-700 leading-relaxed">
                  The platform provides a user-friendly interface accessible worldwide, enabling governments and
                  environmental agencies to use predictive models to plan early responses to seasonal risks that will
                  further reduce many losses (e.g., drought, frost, crop disease).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl relative">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Methodology</h2>
          <p className="text-gray-700 mb-8 leading-relaxed">
            The plant phenology monitoring system utilizes modern technologies to collect, process and predict plant
            life cycles globally.
          </p>

          <div className="space-y-6">
            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Frontend Development</h3>
              <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                <li>
                  <span className="font-semibold">Next.js:</span> The frontend is developed using Next.js which is
                  responsible for rendering real-time data, interacting with users and displaying results in a
                  user-friendly format.
                </li>
                <li>
                  <span className="font-semibold">Shadcn:</span> The UI is enhanced using Shadcn making the platform
                  easy to navigate for researchers and farmers.
                </li>
              </ul>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Backend Development</h3>
              <ul className="space-y-2 text-gray-700 ml-6 list-disc">
                <li>
                  <span className="font-semibold">FastAPI:</span> The backend is developed using FastAPI, an
                  asynchronous API to handle requests and serve predictions.
                </li>
                <li>
                  <span className="font-semibold">Uvicorn:</span> The Uvicorn server handles API requests
                  asynchronously, ensuring scalability and low-latency responses for real-time data processing and
                  predictions.
                </li>
              </ul>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Machine Learning</h3>
              <p className="text-gray-700">
                Scikit-learn models (e.g., Random Forest, SVM) predict blooming times and track plant behavior.
              </p>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Prediction</h3>
              <p className="text-gray-700">
                Models simulate future blooming dates using historical and real-time data, along with climate
                projections.
              </p>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Visualization</h3>
              <p className="text-gray-700">
                Interactive OpenStreetMap heatmaps and time-series graphs display global plant growth patterns and
                blooming events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
            <div className="flex items-center gap-3 mb-8">
              <Database className="h-7 w-7 text-lime-700" />
              <h2 className="text-3xl font-bold text-gray-900">Data Sources</h2>
            </div>
            <div className="space-y-6">
              {dataSources.map((source, index) => (
                <div key={index} className="border-l-4 border-lime-600 pl-6 bg-lime-50/50 py-3 rounded-r-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{source.name}</h3>
                  <p className="text-gray-700 mb-2 leading-relaxed">{source.description}</p>
                  {source.link !== "#" && (
                    <a
                      href={source.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-700 hover:text-lime-800 underline text-sm"
                    >
                      {source.link}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl relative">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Implementation</h2>
          <div className="space-y-6">
            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Frontend</h3>
              <p className="text-gray-700 leading-relaxed">
                Built with Next.js for dynamic rendering and Shadcn for responsive, interactive UI components.
              </p>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Backend</h3>
              <p className="text-gray-700 leading-relaxed">
                FastAPI for fast, asynchronous API handling; Uvicorn for server management.
              </p>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Processing</h3>
              <p className="text-gray-700 leading-relaxed">
                Used for satellite image processing (Sentinel-2) and to generate NDVI data, which helps in monitoring
                plant growth patterns and phenological events.
              </p>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Machine Learning</h3>
              <p className="text-gray-700 leading-relaxed">
                Scikit-learn is used to build and deploy predictive models for plant phenology.
              </p>
            </div>

            <div className="bg-lime-50/50 p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">APIs</h3>
              <p className="text-gray-700 leading-relaxed">
                Integrated Trefle API for plant species data, OpenStreetMap for geospatial mapping, and Sentinel-2 data
                for plant monitoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
            <div className="flex items-center gap-3 mb-8">
              <Users className="h-7 w-7 text-lime-700" />
              <h2 className="text-3xl font-bold text-gray-900">Team</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="p-6 bg-white/80 backdrop-blur-sm border-lime-200/50 shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <a href={`mailto:${member.email}`} className="text-lime-700 hover:text-lime-800 text-sm">
                    {member.email}
                  </a>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Acknowledgements Section */}
      <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 max-w-5xl relative">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Acknowledgements</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              <span className="font-semibold">NASA:</span> For providing access to Landsat and MODIS satellite data,
              which are key in tracking plant health and seasonal patterns globally.
            </p>
            <p>
              <span className="font-semibold">ESA (European Space Agency):</span> For supporting the Sentinel-2
              satellite program, which provides high-resolution imagery for detailed vegetation monitoring.
            </p>
            <p>
              <span className="font-semibold">NOAA:</span> For climate data that is crucial for analyzing weather
              patterns and their effects on plant phenology.
            </p>
            <p>
              <span className="font-semibold">Space Apps:</span> For fostering innovation through open-source data and
              providing a platform for collaboration.
            </p>
            <p>
              <span className="font-semibold">Open Data Repositories:</span> Such as NEON, Copernicus, and UCI Machine
              Learning Repository, which provide essential datasets for ecological and machine learning research.
            </p>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-lime-200/50">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">References</h2>
            <div className="space-y-6 text-sm text-gray-700">
              <div className="pl-6 border-l-2 border-lime-400 bg-lime-50/50 py-3 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-1">NEON Data - Leaf and Bloom Data (1995-2019)</p>
                <p className="mb-2">
                  National Ecological Observatory Network (NEON). (2019). Leaf and bloom data (1995-2019)
                  (DP1.10055.001) [Dataset]. U.S. Geological Survey.
                </p>
                <a
                  href="https://data.neonscience.org/data-products/DP1.10055.001"
                  className="text-lime-700 hover:text-lime-800 underline break-all"
                >
                  https://data.neonscience.org/data-products/DP1.10055.001
                </a>
              </div>

              <div className="pl-6 border-l-2 border-lime-400 bg-lime-50/50 py-3 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-1">NEON Data - Leaf and Bloom Data (2016-2019)</p>
                <p className="mb-2">
                  National Ecological Observatory Network (NEON). (2019). Leaf and bloom data (2016-2019)
                  (DP1.10055.001) [Dataset]. U.S. Geological Survey.
                </p>
                <a
                  href="https://data.neonscience.org/data-products/DP1.10055.001"
                  className="text-lime-700 hover:text-lime-800 underline break-all"
                >
                  https://data.neonscience.org/data-products/DP1.10055.001
                </a>
              </div>

              <div className="pl-6 border-l-2 border-lime-400 bg-lime-50/50 py-3 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-1">Copernicus Sentinel Data</p>
                <p className="mb-2">
                  European Space Agency. (2020). Sentinel-2 data [Dataset]. Copernicus Open Access Hub.
                </p>
                <a
                  href="https://scihub.copernicus.eu/"
                  className="text-lime-700 hover:text-lime-800 underline break-all"
                >
                  https://scihub.copernicus.eu/
                </a>
              </div>

              <div className="pl-6 border-l-2 border-lime-400 bg-lime-50/50 py-3 rounded-r-lg">
                <p className="font-semibold text-gray-900 mb-1">UCI Iris Dataset</p>
                <p className="mb-2">
                  UCI Machine Learning Repository. (2019). Iris dataset (Version 1.0) [Dataset]. UCI Machine Learning
                  Repository.
                </p>
                <a
                  href="https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data"
                  className="text-lime-700 hover:text-lime-800 underline break-all"
                >
                  https://archive.ics.uci.edu/ml/machine-learning-databases/iris/iris.data
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-lime-200/50 py-8 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 inline-block">
            <p className="text-sm text-gray-700">
              © 2025 Plant Bloom Track. Making our planet more habitable and green.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
