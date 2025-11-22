import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useRegionsStore } from "../store/regionsStore";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";

export function RegionDetailPage() {
  const { regionId } = useParams();

  const { regions, fetchRegions } = useRegionsStore((state) => ({
    regions: state.regions,
    fetchRegions: state.fetchRegions,
  }));

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  const region = regions.find((r) => r.id === regionId);

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center p-8">
          <p className="text-xl text-secondary-500">Region not found</p>
          <Link to="/regions" className="mt-4 text-primary-600 hover:underline">Back to Regions</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to="/regions" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Regions
        </Link>

        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12 group">
          <div className="aspect-w-16 aspect-h-9 md:h-[400px] h-[300px] relative">
            <img 
              src={region.imageUrl} 
              alt={region.name} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-secondary-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{region.name}</h1>
              <p className="text-lg md:text-xl text-secondary-100 max-w-3xl font-medium">{region.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-secondary-900">Featured Countries</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {region.countries.map((country) => (
              <Link
                key={country}
                to={`/regions/${region.id}/countries/${country.toLowerCase()}`}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-secondary-100 flex items-center p-6 hover:-translate-y-1"
              >
                <div className="p-3 rounded-full bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors mr-4">
                  <UtensilsCrossed className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors">{country}</h3>
                  <p className="text-sm text-secondary-500 mt-1">Discover cuisine</p>
                </div>
                <div className="ml-auto">
                  <ArrowLeft className="h-5 w-5 text-secondary-300 transform rotate-180 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
