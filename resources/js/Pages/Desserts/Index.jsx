import { useState } from "react";
import { Head, router } from "@inertiajs/react";

import Navbar from "@/Components/ui/Navbar";
import Footer from "@/Components/ui/Footer";

import HeroSearch from "./components/HeroSearch";
import DessertFilters from "./components/DessertFilters";
import DessertGrid from "./components/DessertGrid";
import DessertDetailModal from "./components/DessertDetailModal";

import CustomOrderModal from "./components/custom-order/CustomOrderModal";

import { useDessertFilters } from "./hooks/useDessertFilters";
import { useFavorites } from "./hooks/useFavorites";
import { useCustomOrder } from "./hooks/useCustomOrder";

export default function Desserts({ desserts = [], categories = [] }) {
    /*
    |--------------------------------------------------------------------------
    | Dessert filters
    |--------------------------------------------------------------------------
    */

    const {
        searchQuery,
        setSearchQuery,

        selectedCategory,
        setSelectedCategory,

        priceRange,
        setPriceRange,

        sortBy,
        setSortBy,

        filteredDesserts,
        totalCount,
    } = useDessertFilters(desserts);

    /*
    |--------------------------------------------------------------------------
    | Favorites
    |--------------------------------------------------------------------------
    */

    const { favorites, toggleFavorite } = useFavorites();

    /*
    |--------------------------------------------------------------------------
    | Custom orders
    |--------------------------------------------------------------------------
    */

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

        fileInputRef,
    } = useCustomOrder();

    /*
    |--------------------------------------------------------------------------
    | Local state
    |--------------------------------------------------------------------------
    */

    const [selectedCake, setSelectedCake] = useState(null);

    const [isCakeDialogOpen, setIsCakeDialogOpen] = useState(false);

    const [quantity, setQuantity] = useState(1);

    /*
    |--------------------------------------------------------------------------
    | Open cake details
    |--------------------------------------------------------------------------
    */

    const openCakeDetails = (cake) => {
        setSelectedCake(cake);

        setQuantity(1);

        setIsCakeDialogOpen(true);
    };

    /*
    |--------------------------------------------------------------------------
    | Add to cart
    |--------------------------------------------------------------------------
    */

    const handleAddToCart = (cake) => {
        router.post(
            route("cart.add"),
            {
                product_id: cake.id,
                quantity: 1,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Producto agregado");
                },
                onError: (errors) => {
                    console.error(errors);
                },
            },
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Add to cart from modal
    |--------------------------------------------------------------------------
    */

    const handleAddToCartFromModal = (cake) => {
        router.post(
            route("cart.add"),
            {
                product_id: cake.id,
                quantity,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsCakeDialogOpen(false);
                    console.log("Producto agregado");
                },

                onError: (errors) => {
                    console.error(errors);
                },
            },
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Clear filters
    |--------------------------------------------------------------------------
    */

    const clearFilters = () => {
        setSearchQuery("");

        setSelectedCategory("all");

        setPriceRange([0, 1000]);

        setSortBy("popular");
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <>
            <Head title="Repostería Sweet Stack - Catálogo de Postres" />

            <Navbar />

            <HeroSearch
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

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
