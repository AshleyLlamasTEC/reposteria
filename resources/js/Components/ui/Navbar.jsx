import React, { useEffect, useMemo, useState, useCallback } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    ShoppingCart,
    ShoppingBag,
    User,
    Search,
    Heart,
    Cake,
    Menu as MenuIcon,
    X,
    LogOut,
} from "lucide-react";

/* =========================
   Helpers
========================= */
const DEFAULT_IMAGE = "/images/default-cake.jpg";

const NAV_ITEMS = [
    { name: "Inicio", href: "/" },
    { name: "Postres", href: "/desserts" },
    { name: "Nosotros", href: "/about" },
    { name: "Contáctanos", href: "/contact" },
];

const ImageWithFallback = ({ src, alt, fallbackColor }) => {
    const [hasError, setHasError] = useState(false);
    if (hasError) {
        return (
            <div className={`${fallbackColor} w-full h-full flex items-center justify-center text-white text-lg`}>
                🎂
            </div>
        );
    }
    return (
        <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
        />
    );
};

/* =========================
   Main Component
========================= */

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null); // null | "cart" | "user" | "mobile" | "search"

    // ── Datos reales desde Inertia ────────────────────────────────
    const { auth, cart } = usePage().props;

    // Datos del carrito reales (si no existen, se tratan como vacío)
    const cartItems = cart?.items ?? [];
    const cartTotal = cart?.total ?? 0;

    /* =========================
       Effects
    ========================= */

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        const handleEscape = (e) => {
            if (e.key === "Escape") setActiveMenu(null);
        };
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("keydown", handleEscape);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    /* =========================
       Derived Values
    ========================= */

    const cartCount = useMemo(
        () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
        [cartItems]
    );

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const isAuthenticated = auth?.user != null;

    /* =========================
       Handlers
    ========================= */

    const toggleMenu = useCallback((menu) => {
        setActiveMenu((prev) => (prev === menu ? null : menu));
    }, []);

    const closeMenus = useCallback(() => {
        setActiveMenu(null);
    }, []);

    /* =========================
       Render
    ========================= */

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
                        : "bg-white/90 backdrop-blur-sm py-4"
                } border-b border-pink-100`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            onClick={closeMenus}
                            className="flex items-center space-x-3 hover:scale-105 transition-transform"
                        >
                            <img
                                src="/images/logo.png"
                                alt="Repostería Sweet Stack"
                                className="w-12 h-12 object-contain"
                            />
                            <Cake className="w-8 h-8 text-pink-500 hidden" />
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center space-x-8">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={closeMenus}
                                    className="relative text-gray-700 hover:text-pink-500 font-medium px-3 py-2 rounded-lg transition-all hover:bg-pink-50 after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-pink-500 after:scale-x-0 after:transition-transform hover:after:scale-x-100"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                            {/* Search */}
                            <button
                                aria-label="Abrir buscador"
                                aria-expanded={activeMenu === "search"}
                                onClick={() => toggleMenu("search")}
                                className="p-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all hover:scale-110"
                            >
                                <Search className="w-5 h-5" />
                            </button>

                            {/* Favorites (opcional) */}
                            <button className="p-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all hover:scale-110">
                                <Heart className="w-5 h-5" />
                            </button>

                            {/* Cart – ahora con datos reales */}
                            <div className="relative">
                                <button
                                    aria-label="Abrir carrito"
                                    aria-expanded={activeMenu === "cart"}
                                    onClick={() => toggleMenu("cart")}
                                    className="relative p-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all hover:scale-110"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                                            {cartCount}
                                        </span>
                                    )}
                                </button>

                                {activeMenu === "cart" && (
                                    <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-2xl p-4 min-w-80 border border-gray-100">
                                        <h3 className="text-lg font-semibold mb-3">
                                            Tu Carrito
                                        </h3>

                                        {cartItems.length === 0 ? (
                                            <p className="text-gray-500 text-sm text-center py-4">
                                                Aún no tienes productos en tu carrito.
                                            </p>
                                        ) : (
                                            <div className="space-y-3 max-h-60 overflow-y-auto">
                                                {cartItems.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-pink-50 transition"
                                                    >
                                                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shadow-md">
                                                            <ImageWithFallback
                                                                src={item.image ?? DEFAULT_IMAGE}
                                                                alt={item.name}
                                                                fallbackColor="bg-amber-800"
                                                            />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between">
                                                                <span className="text-sm font-medium truncate">
                                                                    {item.name}
                                                                </span>
                                                                <span className="text-sm font-semibold text-pink-600">
                                                                    ${Number(item.price).toFixed(2)}
                                                                </span>
                                                            </div>
                                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                                <span>
                                                                    Cantidad: {item.quantity}
                                                                </span>
                                                                <span className="font-semibold text-gray-600">
                                                                    ${(item.price * item.quantity).toFixed(2)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="h-px bg-gray-100 my-3" />

                                        {cartItems.length > 0 && (
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="font-semibold">Total:</span>
                                                <span className="text-lg font-bold text-pink-600">
                                                    ${total.toFixed(2)}
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex gap-2">
                                            <Link
                                                href="/cart"  // o route('cart.index')
                                                onClick={closeMenus}
                                                className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 text-sm text-center"
                                            >
                                                Ver Carrito
                                            </Link>

                                            {isAuthenticated && cartItems.length > 0 && (
                                                <button className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 text-sm">
                                                    Comprar
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User */}
                            <div className="relative">
                                <button
                                    aria-label="Abrir menú usuario"
                                    aria-expanded={activeMenu === "user"}
                                    onClick={() => toggleMenu("user")}
                                    className="p-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all hover:scale-110"
                                >
                                    {isAuthenticated ? (
                                        <img
                                            src={auth.user.avatar || "/images/default-avatar.png"}
                                            alt={auth.user.name}
                                            className="w-6 h-6 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-5 h-5" />
                                    )}
                                </button>

                                {activeMenu === "user" && (
                                    <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-2xl p-2 min-w-48 border border-gray-100">
                                        {isAuthenticated ? (
                                            <>
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <p className="text-sm font-semibold text-gray-800">
                                                        {auth.user.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {auth.user.email}
                                                    </p>
                                                </div>
                                                <Link
                                                    href="/orders"
                                                    onClick={closeMenus}
                                                    className="block px-4 py-3 rounded-lg hover:bg-pink-50 text-sm"
                                                >
                                                    Mis Pedidos
                                                </Link>
                                                <Link
                                                    href="/favorites"
                                                    onClick={closeMenus}
                                                    className="block px-4 py-3 rounded-lg hover:bg-pink-50 text-sm"
                                                >
                                                    Favoritos
                                                </Link>
                                                <div className="h-px bg-gray-100 my-2" />
                                                <Link
                                                    href="/logout"
                                                    method="post"
                                                    as="button"
                                                    onClick={closeMenus}
                                                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-pink-50 text-sm flex items-center gap-2 text-red-500"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Cerrar sesión
                                                </Link>
                                            </>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/login"
                                                    onClick={closeMenus}
                                                    className="block px-4 py-3 rounded-lg hover:bg-pink-50 text-sm"
                                                >
                                                    Iniciar Sesión
                                                </Link>
                                                <Link
                                                    href="/register"
                                                    onClick={closeMenus}
                                                    className="block px-4 py-3 rounded-lg hover:bg-pink-50 text-sm"
                                                >
                                                    Crear cuenta
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Mobile */}
                            <div className="md:hidden relative">
                                <button
                                    aria-label="Abrir menú móvil"
                                    onClick={() => toggleMenu("mobile")}
                                    className="p-2 rounded-lg text-gray-600 hover:text-pink-500 hover:bg-pink-50 transition-all"
                                >
                                    <MenuIcon className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Spacer */}
            <div className={`${isScrolled ? "h-20" : "h-24"} transition-all`} />

            {/* Search Modal */}
            {activeMenu === "search" && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={closeMenus}
                    />
                    <div className="absolute inset-0 flex items-start justify-center pt-32">
                        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 border border-gray-100 p-6 flex items-center">
                            <Search className="w-6 h-6 text-gray-400 mr-3" />
                            <input
                                type="text"
                                placeholder="Buscar pasteles, postres..."
                                className="flex-1 outline-none text-lg border-b-2 border-pink-500"
                                autoFocus
                            />
                            <button
                                onClick={closeMenus}
                                className="ml-3 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Global Overlay */}
            {activeMenu && activeMenu !== "search" && (
                <div className="fixed inset-0 z-40" onClick={closeMenus} />
            )}
        </>
    );
};

export default Navbar;
