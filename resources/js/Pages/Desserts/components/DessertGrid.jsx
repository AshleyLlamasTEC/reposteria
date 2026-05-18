import { motion } from 'framer-motion';
import DessertCard from './DessertCard';
import EmptyDessertsState from './EmptyDessertsState';

export default function DessertGrid({
  desserts,
  totalCount,
  searchQuery,
  favorites,
  toggleFavorite,
  onCakeDetails,
  onAddToCart,
  onClearFilters
}) {
  if (desserts.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-3/4">
        <EmptyDessertsState searchQuery={searchQuery} onClearFilters={onClearFilters} />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:w-3/4">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {desserts.length} {desserts.length === 1 ? 'postre encontrado' : 'postres encontrados'}
          </h3>
          {searchQuery && (
            <p className="text-gray-600 text-sm mt-1">Resultados para: "{searchQuery}"</p>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Mostrando {desserts.length} de {totalCount} productos</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {desserts.map(dessert => (
          <DessertCard
            key={dessert.id}
            dessert={dessert}
            isFavorite={favorites.includes(dessert.id)}
            onToggleFavorite={toggleFavorite}
            onDetailsClick={() => onCakeDetails(dessert)}
            onBuyClick={() => onAddToCart(dessert)}
          />
        ))}
      </div>
    </motion.div>
  );
}
