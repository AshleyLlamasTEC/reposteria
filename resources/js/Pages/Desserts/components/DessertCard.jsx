import { motion } from 'framer-motion';
import { Heart, Star, Clock, ShoppingCart } from 'lucide-react';

export default function DessertCard({ dessert, isFavorite, onToggleFavorite, onDetailsClick, onBuyClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={dessert.image}
          alt={dessert.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.className = 'w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center';
            fallback.innerHTML = '<div class="text-6xl">🎂</div>';
            e.target.parentNode.appendChild(fallback);
          }}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {dessert.popular && <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">Popular</span>}
          {dessert.nuevo && <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">Nuevo</span>}
        </div>
        {/* Botón favorito */}
        <button onClick={() => onToggleFavorite(dessert.id)} className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-gray-800 text-lg group-hover:text-pink-600 transition-colors">{dessert.name}</h3>
          <span className="text-lg font-bold text-pink-500">${dessert.price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{dessert.description}</p>

        {/* Rating y detalles */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-semibold text-gray-700">{dessert.rating}</span>
            <span className="text-xs text-gray-500">({dessert.reviews})</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            <span>{dessert.deliveryTime}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {dessert.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">{tag}</span>
          ))}
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <button onClick={onDetailsClick} className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm">
            <ShoppingCart className="w-4 h-4" /> Ver Detalles
          </button>
          <button onClick={onBuyClick} className="px-4 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-semibold transition-colors duration-200 text-sm">
            Comprar
          </button>
        </div>
      </div>
    </motion.div>
  );
}
