import { motion } from "framer-motion";
import { Filter, Sparkles } from "lucide-react";
import AppSelect from "@/Components/ui/AppSelect";

export default function DessertFilters({
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    onCustomOrder,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/4"
        >
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                    <Filter className="w-5 h-5 text-pink-500" />
                    <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
                </div>

                {/* Categorías */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">
                        Categorías
                    </h4>
                    <div className="space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() =>
                                    setSelectedCategory(category.slug)
                                }
                                className={`flex justify-between items-center w-full px-3 py-2 rounded-lg transition-all duration-200 text-left ${
                                    selectedCategory === category.id
                                        ? "bg-pink-50 text-pink-600 font-semibold"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                            >
                                <span>{category.name}</span>
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                    {category.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Rango de Precio */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold text-gray-700">
                            Rango de Precio
                        </h4>
                        <span className="text-sm text-pink-600 font-semibold">
                            ${priceRange[0]} - ${priceRange[1]}
                        </span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="1000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) =>
                            setPriceRange([
                                priceRange[0],
                                parseInt(e.target.value),
                            ])
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>$0</span>
                        <span>$500</span>
                        <span>$1000</span>
                    </div>
                </div>

                {/* Ordenar por */}
                <div className="mb-6">
                    <h4 className="font-semibold text-gray-700 mb-3">
                        Ordenar por
                    </h4>

                    <AppSelect
                        value={sortBy}
                        onChange={setSortBy}
                        options={[
                            {
                                value: "popular",
                                label: "Más populares",
                            },

                            {
                                value: "rating",
                                label: "Mejor calificación",
                            },

                            {
                                value: "price-asc",
                                label: "Precio: menor a mayor",
                            },

                            {
                                value: "price-desc",
                                label: "Precio: mayor a menor",
                            },

                            {
                                value: "new",
                                label: "Nuevos primero",
                            },
                        ]}
                    />
                </div>

                <button
                    onClick={onCustomOrder}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                    <Sparkles className="w-5 h-5" />
                    Pedido Personalizado
                </button>
            </div>
        </motion.div>
    );
}
