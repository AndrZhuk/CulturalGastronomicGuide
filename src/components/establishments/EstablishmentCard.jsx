import { Star, MapPin, Bookmark } from "lucide-react";
import { useEstablishmentsStore } from "../../store/establishmentsStore";
import { useAuthStore } from "../../store/authStore";

export function EstablishmentCard({ establishment }) {
  const { savedEstablishments, toggleSaved } = useEstablishmentsStore();
  const { isAuthenticated } = useAuthStore();
  const isSaved = savedEstablishments.includes(establishment.id);

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-secondary-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={establishment.imageUrl}
          alt={establishment.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {isAuthenticated && (
          <button
            onClick={() => toggleSaved(establishment.id)}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform z-10"
          >
            <Bookmark
              className={`h-5 w-5 transition-colors ${
                isSaved ? "fill-primary-600 text-primary-600" : "text-secondary-400 hover:text-primary-600"
              }`}
            />
          </button>
        )}
        <div className="absolute top-3 left-3">
          <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
            <Star className="h-4 w-4 text-amber-400 fill-amber-400 mr-1" />
            <span className="text-sm font-bold text-secondary-900">{establishment.rating}</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
          {establishment.name}
        </h3>
        
        <div className="flex items-start text-secondary-500 text-sm mb-4">
          <MapPin className="h-4 w-4 mt-0.5 mr-1 flex-shrink-0" />
          <span>{establishment.address}</span>
        </div>
        
        <p className="text-secondary-600 text-sm line-clamp-3 mb-4 flex-grow leading-relaxed">
          {establishment.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-secondary-100">
          {establishment.type.map((type) => (
            <span 
              key={type} 
              className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 capitalize"
            >
              {type.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
