import { Search } from 'lucide-react';

export default function EmptyDessertsState({ searchQuery, onClearFilters }) {
  return (
    <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron postres</h3>
      <p className="text-gray-600 mb-6">Intenta con otros filtros o busca algo diferente</p>
      {onClearFilters && (
        <button onClick={onClearFilters} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
