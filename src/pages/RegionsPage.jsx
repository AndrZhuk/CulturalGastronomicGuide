import React, { useEffect } from "react";
import { useRegionsStore } from "../store/regionsStore";
import { RegionCard } from "../components/regions/RegionCard";
import { Globe } from "lucide-react";

export function RegionsPage() {
  const { regions, fetchRegions } = useRegionsStore((state) => ({
    regions: state.regions,
    fetchRegions: state.fetchRegions,
  }));

  useEffect(() => {
    if (regions.length === 0) {
      fetchRegions();
    }
  }, [regions, fetchRegions]);

  if (regions.length === 0) {
    return (
      <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 bg-secondary-200 rounded-full mb-4"></div>
            <div className="h-8 w-64 bg-secondary-200 rounded mb-4"></div>
            <div className="h-4 w-96 bg-secondary-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary-100 rounded-2xl text-primary-600">
              <Globe className="h-10 w-10" />
            </div>
          </div>
          <h1 className="text-4xl font-extrabold text-secondary-900 tracking-tight sm:text-5xl mb-4">
            Explore World Cuisines
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-secondary-600">
            Discover culinary traditions from different parts of the world and embark on a flavorful journey.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regions.map((region) => (
            <RegionCard key={region.id} region={region} />
          ))}
        </div>
      </div>
    </div>
  );
}
