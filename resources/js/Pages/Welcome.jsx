import React, { useState, useEffect } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, ChevronRight, X } from "lucide-react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function Welcome() {
    const [isCakeDialogOpen, setIsCakeDialogOpen] = useState(false);
    const [selectedCake, setSelectedCake] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [heroSlide, setHeroSlide] = useState(0);

    // Estado para el formulario de contacto
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
        tipo: "consulta",
    });

    // Estado para seguimiento de pedido
    const [folio, setFolio] = useState("");
    const [pedidoInfo, setPedidoInfo] = useState(null);
    const [isLoadingPedido, setIsLoadingPedido] = useState(false);
    const [pedidoError, setPedidoError] = useState("");

    // Imágenes para el slider del hero
    const heroImages = [
        "/images/hero_slider/1.jpg",
        "/images/hero_slider/2.jpg",
        "/images/hero_slider/4.jpg",
        "/images/hero_slider/8.jpg",
        "/images/hero_slider/11.jpg",
    ];

    const featuredCakes = [
        {
            id: 1,
            name: "Pastel Chocolate",
            price: 480.0,
            image: "/images/shop/pastel-chocolate.jpg",
            description: "Un pastel lleno de sabor a chocolate intenso",
        },
        {
            id: 2,
            name: "Pastel de Zanahoria",
            price: 500.0,
            image: "/images/shop/pastel-zanahoria.jpg",
            description:
                "Un clásico con un toque de especias y glaseado de queso crema",
        },
        {
            id: 3,
            name: "Cheesecake de Frutos Rojos",
            price: 420.0,
            image: "/images/shop/frutos.jpg",
            description: "Suave y cremoso con salsa de frutos rojos",
        },
    ];

    const cakeFlavors = [
        { name: "Chocolate", emoji: "🍫" },
        { name: "Vainilla", emoji: "🌼" },
        { name: "Fresa", emoji: "🍓" },
        { name: "Limón", emoji: "🍋" },
        { name: "Red Velvet", emoji: "❤️" },
        { name: "Coco", emoji: "🥥" },
    ];

    // Funciones existentes
    const openCakeDetails = (cake) => {
        setSelectedCake(cake);
        setIsCakeDialogOpen(true);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredCakes.length);
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) => (prev - 1 + featuredCakes.length) % featuredCakes.length,
        );
    };

    const nextHeroSlide = () => {
        setHeroSlide((prev) => (prev + 1) % heroImages.length);
    };

    const prevHeroSlide = () => {
        setHeroSlide(
            (prev) => (prev - 1 + heroImages.length) % heroImages.length,
        );
    };

    // Funciones para el formulario de contacto
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("contacto.enviar"), {
            onSuccess: () => {
                reset();
                alert(
                    "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.",
                );
            },
            onError: () => {
                alert(
                    "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.",
                );
            },
        });
    };

    // Función para buscar pedido por folio
    const buscarPedido = async () => {
        if (!folio.trim()) {
            setPedidoError("Por favor, ingresa un número de folio");
            return;
        }

        setIsLoadingPedido(true);
        setPedidoError("");

        try {
            // Aquí deberías hacer una petición a tu backend
            // Esto es un ejemplo con datos simulados
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Datos de ejemplo - reemplaza con tu lógica real
            const pedidosSimulados = {
                ABC123: {
                    folio: "ABC123",
                    cliente: "Juan Pérez",
                    fecha: "2024-01-15",
                    estado: "En preparación",
                    productos: [
                        {
                            nombre: "Pastel Chocolate",
                            cantidad: 1,
                            precio: 480.0,
                        },
                        {
                            nombre: "Galletas Personalizadas",
                            cantidad: 12,
                            precio: 180.0,
                        },
                    ],
                    total: 660.0,
                    entrega: "2024-01-20",
                    direccion: "Calle Principal #123, Col. Centro",
                },
                DEF456: {
                    folio: "DEF456",
                    cliente: "María García",
                    fecha: "2024-01-10",
                    estado: "Entregado",
                    productos: [
                        {
                            nombre: "Cheesecake Frutos Rojos",
                            cantidad: 1,
                            precio: 420.0,
                        },
                    ],
                    total: 420.0,
                    entrega: "2024-01-12",
                    direccion: "Av. Reforma #456",
                },
            };

            if (pedidosSimulados[folio]) {
                setPedidoInfo(pedidosSimulados[folio]);
            } else {
                setPedidoError("No se encontró un pedido con ese folio");
                setPedidoInfo(null);
            }
        } catch (error) {
            setPedidoError("Error al buscar el pedido. Intenta de nuevo.");
            setPedidoInfo(null);
        } finally {
            setIsLoadingPedido(false);
        }
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const heroInterval = setInterval(nextHeroSlide, 4000);
        return () => clearInterval(heroInterval);
    }, []);

    return (
        <>
            <Head title="Repostería Paty's - Pastelería Artesanal" />

            {/* Navbar Integrado */}
            <Navbar />

            {/* Hero Section con Slider */}
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
                        <img
                            src="/images/cake-bg.jpg"
                            alt=""
                            className="flower-bg"
                        />

                        {/* Overlay */}
                        <div className="flower-overlay" />

                        {/* Logo */}
                        <img
                            src="/images/logo.png"
                            alt="Repostería Patty's"
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

            {/* Sección del Catálogo */}
            <section id="catalogo" className="py-20 bg-stripes">
                <div className="container mx-auto p-4 bg-white rounded-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent pt-10">
                            Nuestras Delicias
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Selecciona tu favorito
                        </p>
                    </motion.div>

                    {/* Carousel Manual */}
                    <div className="relative max-w-4xl mx-auto">
                        <div className="overflow-hidden">
                            <motion.div
                                className="flex"
                                animate={{ x: `-${currentSlide * 100}%` }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 30,
                                }}
                            >
                                {featuredCakes.map((cake, index) => (
                                    <div
                                        key={cake.id}
                                        className="flex-shrink-0 w-full"
                                    >
                                        <div className="p-8 mx-4">
                                            <div className="flex justify-center mb-6">
                                                <img
                                                    src={cake.image}
                                                    alt={cake.name}
                                                    className="w-48 h-48 object-cover rounded-lg"
                                                />
                                            </div>

                                            <h3 className="text-3xl font-bold text-gray-800 text-center mb-4">
                                                {cake.name}
                                            </h3>
                                            <p className="text-gray-600 text-center text-lg mb-6">
                                                {cake.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-3xl font-bold text-pink-500">
                                                    ${cake.price}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        openCakeDetails(cake)
                                                    }
                                                    className="bg-pink-400 hover:bg-pink-500 text-white rounded-full p-3 transition-colors"
                                                >
                                                    <ShoppingCart className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Controles del Carousel */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-pink-600 rounded-full p-3 transition-colors"
                        >
                            ‹
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-pink-600 rounded-full p-3 transition-colors"
                        >
                            ›
                        </button>

                        {/* Indicadores */}
                        <div className="flex justify-center gap-2 mt-6">
                            {featuredCakes.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`w-3 h-3 rounded-full ${
                                        index === currentSlide
                                            ? "bg-pink-500"
                                            : "bg-pink-200"
                                    }`}
                                />
                            ))}
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

            {/* Modal Mejorado */}
            <AnimatePresence>
                {isCakeDialogOpen && selectedCake && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCakeDialogOpen(false)}
                    >
                        <motion.div
                            className="bg-white rounded-3xl overflow-hidden max-w-2xl w-full mx-auto shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Imagen del pastel */}
                                <div className="md:w-1/2 bg-gray-100">
                                    <div className="h-64 md:h-full relative">
                                        <img
                                            src={selectedCake.image}
                                            alt={selectedCake.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                                const fallback =
                                                    document.createElement(
                                                        "div",
                                                    );
                                                fallback.className =
                                                    "w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center";
                                                fallback.innerHTML =
                                                    '<div class="text-6xl">🎂</div>';
                                                e.target.parentNode.appendChild(
                                                    fallback,
                                                );
                                            }}
                                        />
                                        {/* Badge */}
                                        <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                            Más vendido
                                        </div>
                                    </div>
                                </div>

                                {/* Información del pastel */}
                                <div className="md:w-1/2 p-6 md:p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-bold text-gray-800">
                                            {selectedCake.name}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                setIsCakeDialogOpen(false)
                                            }
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <p className="text-gray-600 mb-6">
                                        {selectedCake.description}
                                    </p>

                                    {/* Detalles adicionales */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                            <span className="text-sm">
                                                Disponible para entrega
                                                inmediata
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                            <span className="text-sm">
                                                Servicio de personalización
                                                disponible
                                            </span>
                                        </div>
                                    </div>

                                    {/* Precio y acciones */}
                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <span className="text-3xl font-bold text-pink-500">
                                                    ${selectedCake.price}
                                                </span>
                                                <p className="text-sm text-gray-500">
                                                    Precio para 10-12 personas
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button className="border border-gray-300 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-50">
                                                    -
                                                </button>
                                                <span className="font-semibold">
                                                    1
                                                </span>
                                                <button className="border border-gray-300 text-gray-700 w-10 h-10 rounded-full hover:bg-gray-50">
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button className="w-full bg-pink-400 hover:bg-pink-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors transform hover:scale-[1.02]">
                                            <ShoppingCart className="w-5 h-5" />
                                            Agregar al Carrito - $
                                            {selectedCake.price}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </>
    );
}
