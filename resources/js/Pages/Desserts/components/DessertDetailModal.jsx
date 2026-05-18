import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Users, Clock, Tag, Minus, Plus, ShoppingCart } from 'lucide-react';

export default function DessertDetailModal({ isOpen, onClose, cake, quantity, setQuantity, onAddToCart }) {
  if (!cake) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full mx-auto shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 bg-gray-100">
                <div className="h-64 md:h-full relative">
                  <img
                    src={cake.image}
                    alt={cake.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className = 'w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center';
                      fallback.innerHTML = '<div class="text-6xl">🎂</div>';
                      e.target.parentNode.appendChild(fallback);
                    }}
                  />
                </div>
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{cake.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{cake.rating} ({cake.reviews} reseñas)</span>
                    </div>
                  </div>
                  <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <p className="text-gray-600 mb-4">{cake.description}</p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Users className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Para {cake.serves}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Entrega en {cake.deliveryTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Tag className="w-4 h-4 text-pink-500" />
                    <div className="flex flex-wrap gap-1">
                      {cake.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-3xl font-bold text-pink-500">${cake.price}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => onAddToCart(cake)} className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors">
                    <ShoppingCart className="w-5 h-5" />
                    Agregar al Carrito - ${(cake.price * quantity).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
