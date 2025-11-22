import { Link } from "react-router-dom";
import { Globe, Search, BookmarkCheck } from "lucide-react";
import { useEffect } from "react";
import { useRegionsStore } from "../store/regionsStore";

export function HomePage() {
  const { regions, fetchRegions } = useRegionsStore((state) => ({
    regions: state.regions,
    fetchRegions: state.fetchRegions,
  }));

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  return (
    <div className="relative overflow-hidden bg-secondary-50">
      {/* Hero Section with Video Background */}
      <div className="relative h-[500px] sm:h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            src="/my-project/video.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover filter brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            <span className="block mb-2">Discover the World's</span>
            <span className="text-primary-400 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-white">
              Culinary Heritage
            </span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-secondary-100 drop-shadow-md">
            Explore authentic cuisines, traditional dishes, and local
            establishments from every corner of the globe.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <Link 
              to="/regions" 
              className="px-8 py-4 text-lg font-semibold rounded-full text-secondary-900 bg-white hover:bg-secondary-100 transition-all transform hover:scale-105 shadow-xl"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">
              Your Culinary Compass
            </h2>
            <p className="mt-4 text-lg text-secondary-600">
              Everything you need to discover your next favorite dish
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="text-center group p-6 rounded-2xl hover:bg-secondary-50 transition-colors">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-100 rounded-2xl group-hover:bg-primary-200 transition-colors text-primary-600">
                  <Globe className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Global Cuisines</h3>
              <p className="text-secondary-600 leading-relaxed">
                Explore diverse culinary traditions from different regions of the world with detailed guides.
              </p>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-secondary-50 transition-colors">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-100 rounded-2xl group-hover:bg-primary-200 transition-colors text-primary-600">
                  <Search className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Find Establishments</h3>
              <p className="text-secondary-600 leading-relaxed">
                Discover authentic restaurants and eateries in every country, vetted by our community.
              </p>
            </div>
            <div className="text-center group p-6 rounded-2xl hover:bg-secondary-50 transition-colors">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary-100 rounded-2xl group-hover:bg-primary-200 transition-colors text-primary-600">
                  <BookmarkCheck className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-3">Save Favorites</h3>
              <p className="text-secondary-600 leading-relaxed">
                Create your personal collection of must-visit culinary destinations and dishes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Regions Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 sm:text-4xl">Featured Regions</h2>
            <p className="mt-4 text-lg text-secondary-600">
              Begin your culinary journey through these diverse regions
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {regions.slice(0, 3).map((region) => (
              <Link
                key={region.id}
                to={`/regions/${region.id}`}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-w-16 aspect-h-9 h-64 relative">
                  <img
                    src={region.imageUrl}
                    alt={region.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/90 via-secondary-900/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{region.name}</h3>
                    <p className="text-secondary-200 line-clamp-2 text-sm font-medium">
                      {region.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              to="/regions" 
              className="inline-flex items-center justify-center px-8 py-3 border border-secondary-300 shadow-sm text-base font-medium rounded-full text-secondary-700 bg-white hover:bg-secondary-50 transition-colors"
            >
              View All Regions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
