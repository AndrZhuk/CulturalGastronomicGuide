import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function RegionCard({ region }) {
  return (
    <Link
      to={`/regions/${region.id}`}
      className="group flex flex-col bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-secondary-100 h-full" 
    >
      <div className="aspect-[16/9] w-full overflow-hidden relative">
        <img
          src={region.imageUrl}
          alt={region.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors mb-2">
          {region.name}
        </h3>
        <p className="text-secondary-600 line-clamp-3 mb-4 flex-grow text-sm leading-relaxed">
          {region.description}
        </p>
        <div className="mt-auto pt-4 border-t border-secondary-100 flex items-center justify-between text-primary-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
          <span className="group-hover:text-primary-700">Explore region</span>
          <ChevronRight className="h-4 w-4 group-hover:text-primary-700" />
        </div>
      </div>
    </Link>
  );
}
