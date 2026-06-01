import React, { useState, useMemo } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    ArrowLeft,
    ShoppingCart,
    Tag,
    Star,
    Truck,
    Shield,
    Heart,
    ChevronRight,
    Package,
    AlertCircle,
} from "lucide-react";
import Navbar from "@/Components/ui/Navbar";
import Footer from "@/Components/ui/Footer";

// ─── Helpers ──────────────────────────────────────────────────────────────
const DEFAULT_IMAGE = "/images/default-cake.jpg";

// ─── Subcomponentes ────────────────────────────────────────────────────────

/**
 * Tarjeta de producto en el carrito.
 * Envuelta con forwardRef para que AnimatePresence pueda pasarle una ref.
 */
const CartItem = React.forwardRef(({ item, onUpdateQuantity, onRemove, isUpdating }, ref) => {
    const handleImageError = (e) => {
        e.target.style.display = "none";
        const fallback = document.createElement("div");
        fallback.className =
            "w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-3xl flex-shrink-0 border-2 border-gray-100";
        fallback.innerHTML = "🎂";
        e.target.parentNode.appendChild(fallback);
    };

    const quantityDisabled = item.quantity <= 1 || isUpdating;

    return (
        <motion.div
            ref={ref}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex items-center gap-4 p-5 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/60 transition-colors"
        >
            {/* Imagen */}
            <img
                src={item.image ?? DEFAULT_IMAGE}
                alt={item.name}
                onError={handleImageError}
                className="w-[72px] h-[72px] rounded-2xl object-cover flex-shrink-0 border-2 border-gray-100"
            />

            {/* Información */}
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-800 text-sm truncate">{item.name}</h3>
                {item.category && (
                    <p className="text-xs text-gray-400 mt-0.5 mb-2 capitalize">
                        {item.category}
                    </p>
                )}
                <div className="inline-flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={quantityDisabled}
                        className="w-8 h-8 flex items-center justify-center hover:bg-pink-50 hover:text-pink-500 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-9 text-center text-sm font-bold text-gray-700">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={isUpdating}
                        className="w-8 h-8 flex items-center justify-center hover:bg-pink-50 hover:text-pink-500 transition-colors"
                    >
                        <Plus className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Precio y total por línea */}
            <div className="text-right flex-shrink-0">
                <p className="text-base font-extrabold text-pink-500">
                    ${(item.unit_price * item.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">
                    ${Number(item.unit_price).toFixed(2)} c/u
                </p>
            </div>

            {/* Eliminar */}
            <button
                onClick={() => onRemove(item.id)}
                disabled={isUpdating}
                className="w-8 h-8 rounded-xl border-2 border-gray-200 flex items-center justify-center text-gray-400 hover:border-red-300 hover:bg-red-50 hover:text-red-500 transition-all flex-shrink-0 disabled:opacity-50"
            >
                <Trash2 className="w-3.5 h-3.5" />
            </button>
        </motion.div>
    );
});

/**
 * Panel de resumen del pedido.
 */
function OrderSummary({ subtotal, discount, total, onCheckout }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 sticky top-24">
            <div className="flex items-center gap-2 px-6 py-5 border-b border-gray-100">
                <Package className="w-5 h-5 text-pink-500" />
                <h2 className="font-bold text-gray-800">Resumen del pedido</h2>
            </div>

            <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-semibold text-gray-800">
                        ${Number(subtotal).toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Envío</span>
                    <span className="font-bold text-green-500">✓ Gratis</span>
                </div>
                {discount > 0 && (
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Descuento</span>
                        <span className="font-semibold text-green-500">
                            — ${discount.toFixed(2)}
                        </span>
                    </div>
                )}

                <div className="h-px bg-gray-100 my-2" />

                <div className="flex justify-between items-center">
                    <span className="text-base font-extrabold text-gray-800">Total</span>
                    <span className="text-2xl font-extrabold text-pink-500">
                        ${Number(total).toFixed(2)}
                    </span>
                </div>

                <button
                    onClick={onCheckout}
                    className="w-full mt-4 py-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-pink-200 hover:shadow-pink-300 transition-all duration-300 hover:-translate-y-0.5"
                >
                    Finalizar Compra
                    <ChevronRight className="w-5 h-5" />
                </button>

                <Link
                    href={route("desserts.index")}
                    className="w-full mt-2 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-colors duration-200"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Seguir Comprando
                </Link>
            </div>

            {/* Sellos de confianza */}
            <div className="grid grid-cols-3 gap-2 px-6 py-4 border-t border-gray-100">
                {[
                    { icon: Shield, label: "Pago Seguro" },
                    { icon: Truck, label: "Entrega Rápida" },
                    { icon: Heart, label: "Hecho con Amor" },
                ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                        <div className="w-8 h-8 bg-pink-50 rounded-xl flex items-center justify-center">
                            <Icon className="w-4 h-4 text-pink-500" />
                        </div>
                        <span className="text-[10px] font-semibold text-gray-400 leading-tight">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Estado vacío del carrito */
function EmptyCart() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 py-16 text-center"
        >
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-pink-300" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-700 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-400 mb-8">¡Descubre nuestros deliciosos postres artesanales!</p>
            <Link
                href={route("desserts.index")}
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-pink-200 hover:-translate-y-0.5 hover:shadow-pink-300 transition-all duration-300"
            >
                <ShoppingBag className="w-5 h-5" />
                Ver Postres
            </Link>
        </motion.div>
    );
}

// ─── Componente principal ─────────────────────────────────────────────────

export default function CartIndex({ items = [], cartTotal = 0 }) {
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponMsg, setCouponMsg] = useState(null);
    const [updatingItems, setUpdatingItems] = useState({}); // IDs que se están actualizando

    // Cálculos derivados directamente de las props del backend (fuente de verdad)
    const subtotal = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + (item.unit_price || 0) * (item.quantity || 0),
            0
        );
    }, [items]);

    const total = Math.max(0, subtotal - discount);

    // ─── Handlers que interactúan con el backend ─────────────────

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        // Marcar este item como "actualizando" para deshabilitar controles
        setUpdatingItems(prev => ({ ...prev, [itemId]: true }));

        router.patch(
            route('cart.update', itemId),
            { quantity: newQuantity },
            {
                preserveScroll: true,
                preserveState: true,
                onFinish: () => {
                    setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
                },
                onError: () => {
                    setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
                    // Opcional: mostrar mensaje de error
                }
            }
        );
    };

    const removeItem = (itemId) => {
        setUpdatingItems(prev => ({ ...prev, [itemId]: true }));

        router.delete(route('cart.remove', itemId), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => {
                setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
            },
            onError: () => {
                setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
            }
        });
    };

    const clearCart = () => {
        router.delete(route('cart.clear'), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const applyCoupon = () => {
        if (coupon.trim().toLowerCase() === "paty10") {
            const disc = subtotal * 0.1;
            setDiscount(disc);
            setCouponMsg({
                type: "success",
                text: `¡Cupón aplicado! Ahorraste $${disc.toFixed(2)}`,
            });
        } else {
            setCouponMsg({ type: "error", text: "Cupón inválido o expirado." });
        }
    };

    const handleCheckout = () => {
        router.visit(route("checkout.index"));
    };

    return (
        <>
            <Head title="Tu Carrito — Repostería Sweet Stack" />
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-14 bg-gradient-to-r from-pink-400 to-red-500">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-5">
                            <ShoppingCart className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-3">Tu Carrito</h1>
                        <p className="text-white/85 text-lg">Revisa y confirma tus productos seleccionados</p>
                        <nav className="flex items-center justify-center gap-2 mt-4 text-xs text-white/70">
                            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
                            <span>/</span>
                            <Link href={route("desserts.index")} className="hover:text-white transition-colors">Postres</Link>
                            <span>/</span>
                            <span className="text-white">Carrito</span>
                        </nav>
                    </motion.div>
                </div>
            </section>

            {/* Contenido principal */}
            <section className="py-12 bg-gray-50 min-h-[60vh]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {items.length === 0 ? (
                        <EmptyCart />
                    ) : (
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Lista de productos */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex-1 min-w-0"
                            >
                                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <ShoppingBag className="w-5 h-5 text-pink-500" />
                                            <h2 className="font-bold text-gray-800">Productos en tu carrito</h2>
                                            <span className="bg-pink-50 text-pink-500 text-xs font-bold px-2.5 py-0.5 rounded-full">
                                                {items.length} {items.length === 1 ? "artículo" : "artículos"}
                                            </span>
                                        </div>
                                        <button
                                            onClick={clearCart}
                                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" />
                                            Vaciar carrito
                                        </button>
                                    </div>

                                    <AnimatePresence mode="popLayout">
                                        {items.map(item => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                onUpdateQuantity={updateQuantity}
                                                onRemove={removeItem}
                                                isUpdating={!!updatingItems[item.id]}
                                            />
                                        ))}
                                    </AnimatePresence>

                                    {/* Cupón */}
                                    <div className="px-6 py-4 border-t border-dashed border-gray-200">
                                        <div className="flex gap-2">
                                            <div className="relative flex-1">
                                                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                                                <input
                                                    type="text"
                                                    value={coupon}
                                                    onChange={(e) => { setCoupon(e.target.value); setCouponMsg(null); }}
                                                    placeholder="Código de descuento..."
                                                    className="w-full pl-9 pr-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-400 transition-colors placeholder-gray-300"
                                                />
                                            </div>
                                            <button
                                                onClick={applyCoupon}
                                                className="px-5 py-2.5 bg-pink-50 text-pink-500 border-2 border-pink-100 rounded-xl text-sm font-bold hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all"
                                            >
                                                Aplicar
                                            </button>
                                        </div>

                                        {couponMsg && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                                                    couponMsg.type === "success" ? "text-green-600" : "text-red-500"
                                                }`}
                                            >
                                                <AlertCircle className="w-3.5 h-3.5" />
                                                {couponMsg.text}
                                            </motion.div>
                                        )}
                                    </div>
                                </div>

                                {/* Sugerencias (placeholder) */}
                                <div className="mt-8">
                                    <h3 className="text-base font-extrabold text-gray-800 mb-4 flex items-center gap-2">
                                        <Star className="w-5 h-5 text-pink-500 fill-pink-100" />
                                        También te puede gustar
                                    </h3>
                                    <p className="text-sm text-gray-400 italic">
                                        Próximamente: productos recomendados.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Resumen de pedido */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="lg:w-[360px] w-full flex-shrink-0"
                            >
                                <OrderSummary
                                    subtotal={subtotal}
                                    discount={discount}
                                    total={total}
                                    onCheckout={handleCheckout}
                                />
                            </motion.div>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
}
