import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { EstablishmentCard } from "../components/establishments/EstablishmentCard";
import { useCountriesStore } from "../store/countriesStore";
import { useEstablishmentsStore } from "../store/establishmentsStore";

export function CountryDetailPage() {
  const { regionId, countryId } = useParams();

  const {
    countries,
    selectedCountry,
    setSelectedCountry,
    fetchCountries,
    fetchDishesByCountry,
  } = useCountriesStore();

  const { establishments, fetchEstablishments, filterByCountry } =
    useEstablishmentsStore();

  const [traditionalDishes, setTraditionalDishes] = useState([]);

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries();
    }
    if (establishments.length === 0) {
      fetchEstablishments();
    }
  }, [countries, establishments, fetchCountries, fetchEstablishments]);

  useEffect(() => {
    const selected = countries.find((c) => c.id === countryId);
    if (selected) {
      setSelectedCountry(selected);
      fetchTraditionalDishes(selected.name);
    }
  }, [countries, countryId, setSelectedCountry]);

  const fetchTraditionalDishes = async (countryName) => {
    const dishes = await fetchDishesByCountry(countryName);
    setTraditionalDishes(dishes);
  };

  const filteredEstablishments = filterByCountry(countryId);

  if (!selectedCountry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary-50">
        <div className="text-center p-8">
          <p className="text-xl text-secondary-500">Country not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link to={`/regions/${regionId}`} className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Region
        </Link>

        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-12 group">
          <div className="h-[400px] relative">
            <img
              src={selectedCountry.imageUrl}
              alt={selectedCountry.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary-900/80 via-secondary-900/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">{selectedCountry.name}</h1>
              <p className="text-lg md:text-xl text-secondary-100 max-w-3xl font-medium">{selectedCountry.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-secondary-900">Traditional Dishes</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {traditionalDishes.length > 0 ? (
              traditionalDishes.map((dish) => (
                <div key={dish.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-secondary-100 flex flex-col group">
                  <div className="h-56 overflow-hidden relative">
                    <img
                      src={dish.imageUrl}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-secondary-900 mb-2">{dish.name}</h3>
                    <p className="text-secondary-600 text-sm leading-relaxed flex-grow">
                      {dish.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-secondary-500 italic col-span-full">No traditional dishes available information yet.</p>
            )}
          </div>
        </div>

        <div className="mt-16">
          <div className="flex items-center mb-8">
            <div className="h-8 w-1 bg-primary-500 rounded-full mr-4"></div>
            <h2 className="text-3xl font-bold text-secondary-900">Popular Establishments</h2>
          </div>
          
          {filteredEstablishments.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEstablishments.map((establishment) => (
                <EstablishmentCard
                  key={establishment.id}
                  establishment={establishment}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-xl text-center border border-secondary-200 shadow-sm">
              <p className="text-secondary-500">No establishments found in this country yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
