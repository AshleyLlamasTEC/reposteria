import React, { useState, useEffect } from "react";
import { Head, Link } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "@/Components/ui/Navbar";
import Footer from "@/Components/ui/Footer";
import ProductCarousel from "./ProductCarousel";
import ProductModal from "./ProductModal";
import CartToast from "./CartToast";

export default function Welcome({ featuredProducts = [] }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [heroSlide, setHeroSlide] = useState(0);
    const [toastMessage, setToastMessage] = useState(null);

    // Hero images
    const heroImages = [
        "/images/hero_slider/1.jpg",
        "/images/hero_slider/2.jpg",
        "/images/hero_slider/4.jpg",
        "/images/hero_slider/8.jpg",
        "/images/hero_slider/11.jpg",
    ];

    const cakeFlavors = [
        { name: "Chocolate", emoji: "🍫" },
        { name: "Vainilla", emoji: "🌼" },
        { name: "Fresa", emoji: "🍓" },
        { name: "Limón", emoji: "🍋" },
        { name: "Red Velvet", emoji: "❤️" },
        { name: "Coco", emoji: "🥥" },
    ];

    // Auto-rotate hero
    useEffect(() => {
        const interval = setInterval(() => {
            setHeroSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const openProductModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleAddToCartSuccess = (message) => {
        setToastMessage(message);
        closeModal();
        setTimeout(() => setToastMessage(null), 3000);
    };

    const nextHeroSlide = () => {
        setHeroSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevHeroSlide = () => {
        setHeroSlide(
            (prev) => (prev - 1 + heroImages.length) % heroImages.length,
        );
    };

    return (
        <>
            <Head title="Repostería Sweet Stack - Pastelería Artesanal" />
            <Navbar />

            {/* Hero Section con Slider (se mantiene igual) */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Slider de Fondo */}
                <div className="absolute inset-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={heroSlide}
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${heroImages[heroSlide]})`,
                            }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                        />
                    </AnimatePresence>

                    {/* Overlay para mejor contraste del texto */}
                    <div className="absolute inset-0 bg-stone-900 bg-opacity-50"></div>
                </div>

                {/* Controles del Slider Hero */}
                <button
                    onClick={prevHeroSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all backdrop-blur-sm"
                >
                    ‹
                </button>
                <button
                    onClick={nextHeroSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all backdrop-blur-sm"
                >
                    ›
                </button>

                {/* Indicadores del Slider Hero */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setHeroSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${
                                index === heroSlide ? "bg-white" : "bg-white/50"
                            }`}
                        />
                    ))}
                </div>

                {/* Contenido del Hero */}
                <div className="text-center relative z-10 px-4">
                    {/* Logo arriba del texto */}
                    <motion.div
                        className="flower-frame mx-auto mb-6"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            delay: 0.2,
                            duration: 0.8,
                            type: "spring",
                        }}
                    >
                        {/* Fondo */}
                        {/* <img
                            src="/images/cake-bg.jpg"
                            alt=""
                            className="flower-bg"
                        /> */}

                        {/* Overlay */}
                        <div className="flower-overlay" />

                        {/* Logo */}
                        <img
                            src="/images/logo.png"
                            alt="Repostería Sweet Stack"
                            className="flower-logo"
                        />
                    </motion.div>

                    <motion.p
                        className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto drop-shadow-lg "
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Donde cada bocado es un momento de felicidad
                    </motion.p>

                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            delay: 0.9,
                            type: "spring",
                            stiffness: 200,
                        }}
                    >
                        <Link
                            href="#catalogo"
                            className="bg-pink-400 hover:bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto inline-block"
                        >
                            Ver Nuestros Pasteles{" "}
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                ></motion.div>
            </section>

            {/* Catálogo de productos destacados (REMODELADO) */}
            <section id="catalogo" className="py-24 bg-stripes overflow-hidden">
                <div className="container mx-auto px-4">
                    {/* Card wrapper */}

                    <div
                        className="relative bg-white backdrop-blur-xl border border-pink-100 rounded-[40px] shadow-[0_20px_80px_rgba(0,0,0,0.08)] overflow-hidden px-6 md:px-10 py-16">
                        {/* Glow decor */}



                        {/* Header */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
                                Nuestras Delicias
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Selecciona tu favorito
                            </p>
                        </motion.div>

                        <div className="mt-20">
                            <ProductCarousel
                                products={featuredProducts}
                                onSelectProduct={openProductModal}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Sabores Populares */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent pt-10">
                            Nuestros Sabores
                        </h2>
                        <p className="text-gray-600 text-lg">
                            ¡Tenemos de todo para todos los gustos!
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {cakeFlavors.map((flavor, index) => (
                            <motion.div
                                key={flavor.name}
                                className="text-center p-6 bg-pink-50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, scale: 1.05 }}
                            >
                                <div className="text-4xl mb-3">
                                    {flavor.emoji}
                                </div>
                                <h3 className="font-semibold text-gray-800">
                                    {flavor.name}
                                </h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 bg-gradient-to-r from-pink-400 to-red-500 text-white">
                <motion.div
                    className="container mx-auto px-4 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        ¿Listo para endulzar tu día?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Haz tu pedido ahora y recibe un 10% de descuento en tu
                        primera compra
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button className="bg-white text-pink-500 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                            Ordenar Ahora 🎂
                        </button>
                        <button className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-500 transition-colors">
                            Ver Menú Completo
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* Modal de producto */}
            <ProductModal
                isOpen={isModalOpen}
                product={selectedProduct}
                onClose={closeModal}
                onAddToCartSuccess={handleAddToCartSuccess}
            />

            {/* Toast de confirmación */}
            <CartToast
                message={toastMessage}
                onClose={() => setToastMessage(null)}
            />

            <Footer />
        </>
    );
}
