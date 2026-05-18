import { useState } from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import HeroSearch from './components/HeroSearch';
import DessertFilters from './components/DessertFilters';
import DessertGrid from './components/DessertGrid';
import DessertDetailModal from './components/DessertDetailModal';
import CustomOrderModal from './components/custom-order/CustomOrderModal';
import { useDessertFilters } from './hooks/useDessertFilters';
import { useFavorites } from './hooks/useFavorites';
import { useCustomOrder } from './hooks/useCustomOrder';

export default function Desserts({ desserts, categories }) {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, priceRange, setPriceRange, sortBy, setSortBy, filteredDesserts, totalCount } = useDessertFilters(desserts);
  const { favorites, toggleFavorite } = useFavorites();
  const {
    showCustomOrder,
    setShowCustomOrder,
    customOrder,
    updateCustomOrder,
    handleTipoChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    precioCalculado,
    configActual,
    saboresDisponibles,
    opcionesPersonalizadas,
    fileInputRef
  } = useCustomOrder();

  const [selectedCake, setSelectedCake] = useState(null);
  const [isCakeDialogOpen, setIsCakeDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const openCakeDetails = (cake) => {
    setSelectedCake(cake);
    setQuantity(1);
    setIsCakeDialogOpen(true);
  };

  const handleAddToCart = (cake) => {
    // In original, addToCart called with selectedCake and quantity; here we accept the cake and use quantity from state.
    // But careful: the "Comprar" button in card does setSelectedCake and then addToCart(cake) but used current quantity. We'll mimic.
    // For simplicity, pass cake and use quantity=1 for direct buy, or for modal use quantity state. We'll create a separate handler for direct buy that uses 1.
    // In DessertCard onBuyClick we call onAddToCart(dessert) which will be this function but quantity should be 1. We'll compute total based on quantity=1.
    alert(`¡${cake.name} agregado al carrito! Total: $${(cake.price * 1).toFixed(2)}`);
  };

  const handleAddToCartFromModal = (cake) => {
    // This is for modal, uses quantity state
    alert(`¡${cake.name} agregado al carrito! Total: $${(cake.price * quantity).toFixed(2)}`);
    setIsCakeDialogOpen(false);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todos');
    setPriceRange([0, 1000]);
  };

  return (
    <>
      <Head title="Repostería Paty's - Catálogo de Postres" />
      <Navbar />
      <HeroSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <DessertFilters
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onCustomOrder={() => setShowCustomOrder(true)}
            />
            <DessertGrid
              desserts={filteredDesserts}
              totalCount={totalCount}
              searchQuery={searchQuery}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              onCakeDetails={openCakeDetails}
              onAddToCart={handleAddToCart}
              onClearFilters={clearFilters}
            />
          </div>
        </div>
      </section>
      <DessertDetailModal
        isOpen={isCakeDialogOpen}
        onClose={() => setIsCakeDialogOpen(false)}
        cake={selectedCake}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCartFromModal}
      />
      <CustomOrderModal
        isOpen={showCustomOrder}
        onClose={() => setShowCustomOrder(false)}
        customOrder={customOrder}
        updateCustomOrder={updateCustomOrder}
        handleTipoChange={handleTipoChange}
        handleImageUpload={handleImageUpload}
        handleRemoveImage={handleRemoveImage}
        handleSubmit={handleSubmit}
        precioCalculado={precioCalculado}
        configActual={configActual}
        saboresDisponibles={saboresDisponibles}
        opcionesPersonalizadas={opcionesPersonalizadas}
        fileInputRef={fileInputRef}
      />
      <Footer />
    </>
  );
}
