import { useEffect } from "react";
import { useEstablishmentsStore } from "../store/establishmentsStore";
import { EstablishmentCard } from "../components/establishments/EstablishmentCard";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

export function SavedEstablishmentsPage() {
  const { establishments, savedEstablishments, fetchEstablishments } =
    useEstablishmentsStore((state) => ({
      establishments: state.establishments,
      savedEstablishments: state.savedEstablishments,
      fetchEstablishments: state.fetchEstablishments,
    }));

  useEffect(() => {
    fetchEstablishments();
  }, [fetchEstablishments]);

  const savedPlaces = establishments.filter((establishment) =>
    savedEstablishments.includes(establishment.id)
  );

  return (
    <div className="min-h-screen bg-secondary-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-secondary-900 sm:text-5xl mb-4">
            Saved Places
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-secondary-600">
            Your personally curated collection of favorite establishments
          </p>
        </div>

        {savedPlaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {savedPlaces.map((establishment) => (
              <EstablishmentCard
                key={establishment.id}
                establishment={establishment}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-secondary-100">
            <div className="flex justify-center mb-6">
              <div className="p-6 bg-secondary-50 rounded-full">
                <Bookmark className="h-12 w-12 text-secondary-300" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-secondary-900 mb-3">No saved places yet</h3>
            <p className="text-secondary-600 max-w-md mx-auto mb-8">
              Start exploring our collection of restaurants and save your favorites to access them quickly later.
            </p>
            <Link 
              to="/establishments" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            >
              Explore Establishments
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
