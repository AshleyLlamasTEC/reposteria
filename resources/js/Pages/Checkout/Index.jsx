import React, { useState } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    ShoppingBag,
    ArrowLeft,
    ShoppingCart,
    ChevronRight,
    Package,
    Truck,
    Shield,
    Heart,
    Loader2,
} from "lucide-react";
import Navbar from "@/Components/ui/Navbar";
import Footer from "@/Components/ui/Footer";

// ─── Helpers ──────────────────────────────────────────────────────────────
const DEFAULT_IMAGE = "/images/default-cake.jpg";

// ─── Subcomponente: ítem del resumen ────────────────────────────────────
function CheckoutItem({ item }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-b-0"
        >
            <img
                src={item.image_url ?? DEFAULT_IMAGE}
                alt={item.product_name}
                className="w-14 h-14 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                onError={(e) => {
                    e.target.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className =
                        "w-14 h-14 rounded-xl bg-pink-100 flex items-center justify-center text-2xl flex-shrink-0 border border-gray-200";
                    fallback.innerHTML = "🎂";
                    e.target.parentNode.appendChild(fallback);
                }}
            />
            <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm truncate">
                    {item.product_name}
                </h4>
                <p className="text-xs text-gray-400 mt-0.5">
                    Cantidad: {item.quantity}
                </p>
            </div>
            <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-pink-500">
                    ${(item.unit_price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                    ${Number(item.unit_price).toFixed(2)} c/u
                </p>
            </div>
        </motion.div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────
export default function CheckoutIndex({ cart }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const { items, total } = cart;

    const handleConfirm = () => {
        setIsProcessing(true);
        router.post(route("checkout.store"), undefined, {
            preserveScroll: true,
            onFinish: () => setIsProcessing(false),
            onError: () => {
                setIsProcessing(false);
                console.log("Error al procesar el pedido");
            },
        });
    };

    return (
        <>
            <Head title="Confirmar Pedido — Repostería Sweet Stack" />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-14 bg-gradient-to-r from-pink-400 to-red-500">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-5">
                            <ShoppingBag className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">
                            Confirmar Pedido
                        </h1>
                        <p className="text-white/85 text-lg">
                            Revisa los detalles antes de finalizar tu compra
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contenido principal */}
            <section className="py-12 bg-gray-50 min-h-[60vh]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Package className="w-5 h-5 text-pink-500" />
                                    <h2 className="font-bold text-gray-800">
                                        Productos en tu pedido
                                    </h2>
                                    <span className="bg-pink-50 text-pink-500 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                        {items.length}{" "}
                                        {items.length === 1 ? "artículo" : "artículos"}
                                    </span>
                                </div>
                                <Link
                                    href={route("cart.index")}
                                    className="text-xs text-gray-400 hover:text-pink-500 transition-colors flex items-center gap-1"
                                >
                                    <ArrowLeft className="w-3.5 h-3.5" />
                                    Volver al carrito
                                </Link>
                            </div>

                            {/* Lista de productos */}
                            <div>
                                {items.map((item) => (
                                    <CheckoutItem key={item.id} item={item} />
                                ))}
                            </div>

                            {/* Total y confirmación */}
                            <div className="px-6 py-5 bg-pink-50/30 border-t border-pink-100">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-extrabold text-gray-800">
                                        Total a pagar
                                    </span>
                                    <span className="text-3xl font-extrabold text-pink-500">
                                        ${Number(total).toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    onClick={handleConfirm}
                                    disabled={isProcessing}
                                    className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <ShoppingCart className="w-5 h-5" />
                                    )}
                                    {isProcessing
                                        ? "Procesando pedido..."
                                        : "Confirmar Pedido"}
                                </button>
                            </div>
                        </div>

                        {/* Sellos de confianza */}
                        <div className="grid grid-cols-3 gap-4 text-center">
                            {[
                                { icon: Shield, label: "Pago Seguro" },
                                { icon: Truck, label: "Entrega Rápida" },
                                { icon: Heart, label: "Hecho con Amor" },
                            ].map(({ icon: Icon, label }) => (
                                <div
                                    key={label}
                                    className="flex flex-col items-center gap-1.5 text-gray-500"
                                >
                                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-pink-400" />
                                    </div>
                                    <span className="text-xs font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </>
    );
}
