import React from "react";
import { Head, Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    Package,
    ArrowLeft,
    ShoppingBag,
    Clock,
    Truck,
    CheckCircle,
    AlertCircle,
    Cake,
    Sparkles,
    Hash,
    Calendar,
    DollarSign,
    ClipboardList,
} from "lucide-react";
import Navbar from "@/Components/ui/Navbar";
import Footer from "@/Components/ui/Footer";

// ─── Helpers ──────────────────────────────────────────────────────────────
const statusConfig = {
    pending: { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", label: "Pendiente" },
    in_production: { icon: Package, color: "text-blue-500", bg: "bg-blue-50", label: "En producción" },
    ready: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Listo" },
    delivered: { icon: Truck, color: "text-purple-500", bg: "bg-purple-50", label: "Entregado" },
};

// ─── Componente principal ─────────────────────────────────────────────────
export default function ShowOrder({ order, items = [], customOrder = null, productionStage = null }) {
    const status = statusConfig[order.state] || statusConfig.pending;
    const StatusIcon = status.icon;

    return (
        <>
            <Head title={`Pedido #${order.order_number} — Repostería Sweet Stack`} />
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
                            Pedido #{order.order_number}
                        </h1>
                        <p className="text-white/85 text-lg">
                            Detalle de tu compra
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contenido */}
            <section className="py-12 bg-gray-50 min-h-[60vh]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* Tarjeta principal */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            {/* Cabecera */}
                            <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
                                        <ClipboardList className="w-6 h-6 text-pink-500" />
                                        Resumen del pedido
                                    </h2>
                                    <p className="text-sm text-gray-400 mt-1">
                                        Realizado el {new Date(order.created_at).toLocaleDateString("es-MX", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${status.bg} ${status.color} flex items-center gap-1.5`}>
                                        <StatusIcon className="w-4 h-4" />
                                        {status.label}
                                    </span>
                                </div>
                            </div>

                            {/* Detalles */}
                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                        <Hash className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Nº de pedido</p>
                                        <p className="font-bold text-gray-800">{order.order_number}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                        <Calendar className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Fecha</p>
                                        <p className="font-bold text-gray-800">
                                            {new Date(order.created_at).toLocaleDateString("es-MX")}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                        <DollarSign className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Total</p>
                                        <p className="font-bold text-gray-800">${Number(order.total_amount).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center">
                                        <Truck className="w-5 h-5 text-pink-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">Estado</p>
                                        <p className={`font-bold ${status.color}`}>{status.label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Productos del pedido */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-5 border-b border-gray-100">
                                <h3 className="font-extrabold text-gray-800 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5 text-pink-500" />
                                    Productos incluidos
                                </h3>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {items.map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between px-6 py-4">
                                        <div>
                                            <p className="font-semibold text-gray-800">
                                                {item.product_name}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                Cantidad: {item.quantity} x ${Number(item.unit_price).toFixed(2)}
                                            </p>
                                        </div>
                                        <p className="font-bold text-pink-500">
                                            ${Number(item.subtotal).toFixed(2)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-4 bg-pink-50/30 flex justify-between items-center">
                                <span className="text-lg font-extrabold text-gray-800">Total</span>
                                <span className="text-2xl font-extrabold text-pink-500">
                                    ${Number(order.total_amount).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Pedido personalizado (si existe) */}
                        {customOrder && (
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <h3 className="font-extrabold text-gray-800 flex items-center gap-2">
                                        <Cake className="w-5 h-5 text-pink-500" />
                                        Pedido personalizado
                                    </h3>
                                </div>
                                <div className="p-6 space-y-3 text-sm">
                                    {customOrder.theme && (
                                        <div>
                                            <span className="text-gray-400">Temática:</span>{" "}
                                            <span className="font-semibold text-gray-700">{customOrder.theme}</span>
                                        </div>
                                    )}
                                    <div>
                                        <span className="text-gray-400">Tamaño:</span>{" "}
                                        <span className="font-semibold text-gray-700">{customOrder.size_name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Sabor:</span>{" "}
                                        <span className="font-semibold text-gray-700">{customOrder.flavor_name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Relleno:</span>{" "}
                                        <span className="font-semibold text-gray-700">{customOrder.filling_name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Betún:</span>{" "}
                                        <span className="font-semibold text-gray-700">{customOrder.frosting_name}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Decoración:</span>{" "}
                                        <span className="font-semibold text-gray-700">{customOrder.decoration_name}</span>
                                    </div>
                                    <div className="pt-2 border-t border-gray-100">
                                        <span className="text-gray-400">Precio calculado:</span>{" "}
                                        <span className="font-bold text-pink-500">
                                            ${Number(customOrder.calculated_price).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Etapa de producción */}
                        {productionStage && (
                            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <h3 className="font-extrabold text-gray-800 flex items-center gap-2">
                                        <Package className="w-5 h-5 text-pink-500" />
                                        Progreso del pedido
                                    </h3>
                                </div>
                                <div className="p-6">
                                    {/* Barra de progreso simple */}
                                    <div className="flex items-center justify-between mb-2 text-xs text-gray-400 font-medium">
                                        <span>Pedido recibido</span>
                                        <span>En producción</span>
                                        <span>Listo</span>
                                        <span>Entregado</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className="h-3 rounded-full bg-gradient-to-r from-pink-400 to-red-500 transition-all duration-500"
                                            style={{
                                                width:
                                                    productionStage.stage === "queued"
                                                        ? "25%"
                                                        : productionStage.stage === "in_progress"
                                                        ? "50%"
                                                        : productionStage.stage === "ready"
                                                        ? "75%"
                                                        : "100%",
                                            }}
                                        />
                                    </div>
                                    <p className="mt-3 text-sm font-semibold text-gray-700 capitalize">
                                        Estado actual: {productionStage.stage === "queued"
                                            ? "En cola"
                                            : productionStage.stage === "in_progress"
                                            ? "En producción"
                                            : productionStage.stage === "ready"
                                            ? "Listo para entrega"
                                            : "Entregado"}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Volver a la tienda */}
                        <div className="text-center mt-8">
                            <Link
                                href={route("desserts.index")}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-pink-200 text-pink-600 rounded-2xl font-bold text-sm hover:bg-pink-50 hover:border-pink-300 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Seguir comprando
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </>
    );
}
