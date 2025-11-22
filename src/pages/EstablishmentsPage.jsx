import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { useEstablishmentsStore } from "../store/establishmentsStore";
import { EstablishmentCard } from "../components/establishments/EstablishmentCard";

const ESTABLISHMENT_TYPES = [
  "restaurant",
  "street-food",
  "cafe",
  "traditional",
  "casual",
  "fine-dining",
];

export function EstablishmentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { establishments, fetchEstablishments } = useEstablishmentsStore(
    (state) => ({
      establishments: state.establishments,
      fetchEstablishments: state.fetchEstablishments,
    })
  );

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  const uniqueCountries = Array.from(
    new Set(establishments.map((establishment) => establishment.country))
  );

  const uniqueCities = Array.from(
    new Set(
      establishments.map((establishment) => establishment.address.split(",")[0])
    )
  );

  const filteredEstablishments = establishments.filter((establishment) => {
    const matchesSearch = establishment.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = selectedType
      ? establishment.type.includes(selectedType)
      : true;
    const matchesCountry = selectedCountry
      ? establishment.country === selectedCountry
      : true;
    const matchesCity = selectedCity
      ? establishment.address.split(",")[0] === selectedCity
      : true;
    return matchesSearch && matchesType && matchesCountry && matchesCity;
  });

  return (
    <div className="min-h-screen bg-secondary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary-900 sm:text-5xl mb-4">
            Culinary Establishments
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-secondary-600">
            Discover amazing restaurants and eateries around the world curated for food lovers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-secondary-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-secondary-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-secondary-200 rounded-xl leading-5 bg-secondary-50 placeholder-secondary-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm"
              />
            </div>

            <div className="relative">
              <select
                value={selectedType || ""}
                onChange={(e) => setSelectedType(e.target.value || null)}
                className="block w-full pl-3 pr-10 py-3 border border-secondary-200 rounded-xl leading-5 bg-secondary-50 text-secondary-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm appearance-none"
              >
                <option value="">All Types</option>
                {ESTABLISHMENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-secondary-400" />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedCountry || ""}
                onChange={(e) => setSelectedCountry(e.target.value || null)}
                className="block w-full pl-3 pr-10 py-3 border border-secondary-200 rounded-xl leading-5 bg-secondary-50 text-secondary-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm appearance-none"
              >
                <option value="">All Countries</option>
                {uniqueCountries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-secondary-400" />
              </div>
            </div>

            <div className="relative">
              <select
                value={selectedCity || ""}
                onChange={(e) => setSelectedCity(e.target.value || null)}
                className="block w-full pl-3 pr-10 py-3 border border-secondary-200 rounded-xl leading-5 bg-secondary-50 text-secondary-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all sm:text-sm appearance-none"
              >
                <option value="">All Cities</option>
                {uniqueCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Filter className="h-4 w-4 text-secondary-400" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredEstablishments.map((establishment) => (
            <EstablishmentCard
              key={establishment.id}
              establishment={establishment}
            />
          ))}
        </div>

        {filteredEstablishments.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-secondary-300">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-secondary-50 rounded-full">
                <Filter className="h-8 w-8 text-secondary-400" />
              </div>
            </div>
            <h3 className="text-lg font-medium text-secondary-900">No establishments found</h3>
            <p className="mt-2 text-secondary-500">Try adjusting your search or filter criteria.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedType(null);
                setSelectedCountry(null);
                setSelectedCity(null);
              }}
              className="mt-6 text-primary-600 font-medium hover:text-primary-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
