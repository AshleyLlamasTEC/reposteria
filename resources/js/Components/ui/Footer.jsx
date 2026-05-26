// Components/Footer.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import { Facebook, Instagram, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Datos de contacto y redes
    const contactInfo = {
        telefono: "+52 (686) 198 07 66",
        email: "contacto@reposteriapatys.com",
        facebook: "https://www.facebook.com/profile.php?id=100063745980434",
        // instagram: "https://instagram.com/reposteriapatys",
        whatsapp: "https://api.whatsapp.com/send?phone=526861980766&text=Hola!"
    };

    // Enlaces principales (debe coincidir con Navbar)
    const navItems = [
        { name: 'Inicio', href: '/' },
        { name: 'Postres', href: '/desserts' },
        { name: 'Nosotros', href: '/about' },
        { name: 'Contactanos', href: '/contact' }
    ];

    return (
        <>
            <footer className="bg-white border-t border-pink-100 pt-12 pb-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Sección principal */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Logo y descripción */}
                        <div className="space-y-4">
                            <Link
                                href="/"
                                className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
                            >
                                <div className="w-12 h-12 relative">
                                    <img
                                        src="/images/logo.png"
                                        alt="Repostería Sweet Stack"
                                        className="w-full h-full object-contain"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = document.createElement('div');
                                            fallback.className = 'w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-full flex items-center justify-center';
                                            fallback.innerHTML = '<Cake className="w-7 h-7 text-white" />';
                                            e.target.parentNode.appendChild(fallback);
                                        }}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-bold text-gray-900 tracking-tight">
                                        Repostería
                                    </span>
                                    <span className="text-xs text-pink-500 font-medium tracking-wide">
                                        Sweet Stack
                                    </span>
                                </div>
                            </Link>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Endulzando momentos especiales desde 2010 con pastelería artesanal hecha con amor y los mejores ingredientes.
                            </p>
                            <div className="flex space-x-4">
                                <a
                                    href={contactInfo.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        w-10 h-10 bg-gray-50 hover:bg-pink-50 rounded-full
                                        flex items-center justify-center transition-all duration-200
                                        hover:scale-110 text-gray-600 hover:text-pink-500
                                        border border-gray-200 hover:border-pink-300
                                    "
                                >
                                    <Facebook className="w-5 h-5" />
                                </a>
                                {/* <a
                                    href={contactInfo.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        w-10 h-10 bg-gray-50 hover:bg-pink-50 rounded-full
                                        flex items-center justify-center transition-all duration-200
                                        hover:scale-110 text-gray-600 hover:text-pink-500
                                        border border-gray-200 hover:border-pink-300
                                    "
                                >
                                    <Instagram className="w-5 h-5" />
                                </a> */}
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="
                                        w-10 h-10 bg-gray-50 hover:bg-pink-50 rounded-full
                                        flex items-center justify-center transition-all duration-200
                                        hover:scale-110 text-gray-600 hover:text-pink-500
                                        border border-gray-200 hover:border-pink-300
                                    "
                                >
                                    <Mail className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Enlaces rápidos */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
                                Navegación
                            </h3>
                            <ul className="space-y-2">
                                {navItems.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className="
                                                relative text-gray-600 hover:text-pink-500
                                                font-medium text-sm transition-all duration-200
                                                inline-flex items-center gap-2 py-1
                                                hover:pl-2
                                            "
                                        >
                                            <span className="
                                                w-1 h-1 bg-pink-500 rounded-full
                                                opacity-0 group-hover:opacity-100
                                            "></span>
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Información de contacto */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
                                Contacto
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Phone className="w-4 h-4 text-pink-500 flex-shrink-0" />
                                    <div>
                                        <p className="text-gray-700 text-sm font-medium">Teléfono</p>
                                        <p className="text-gray-600 text-sm">{contactInfo.telefono}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Horario y enlaces adicionales */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-gradient-to-b from-pink-500 to-red-500 rounded-full"></span>
                                Información
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-gray-700 text-sm font-medium mb-1">Horario</p>
                                    <p className="text-gray-600 text-sm">Lunes a Sábado: 8:00 AM - 8:00 PM</p>
                                    <p className="text-gray-600 text-sm">Domingo: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Línea divisoria */}
                    <div className="h-px bg-gray-100 my-8"></div>

                    {/* Sección inferior */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                            <p className="text-gray-500 text-sm text-center md:text-left">
                                &copy; {currentYear} Repostería Sweet Stack. Todos los derechos reservados.
                            </p>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Heart className="w-4 h-4 text-pink-500" />
                                Hecho con amor en México
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Botones flotantes */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
                {/* Botón de WhatsApp */}
                <a
                    href={contactInfo.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                        w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600
                        rounded-full flex items-center justify-center shadow-2xl
                        hover:shadow-3xl transition-all duration-300 group
                        hover:scale-110
                    "
                    aria-label="WhatsApp"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                        <span className="text-2xl text-white relative z-10">
                            <img className='p-4' src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/whatsapp-white-icon.png" alt="" />
                        </span>
                    </div>
                    <div className="
                        absolute -top-10 right-0 bg-white text-gray-800 px-3 py-1
                        rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100Ftelefono
                        transition-opacity duration-300 whitespace-nowrap shadow-lg
                        border border-gray-200
                    ">
                        WhatsApp
                        <div className="
                            absolute bottom-0 left-1/2 transform -translate-x-1/2
                            translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-b
                            border-gray-200
                        "></div>
                    </div>
                </a>

                {/* Botón para llamar */}
                <a
                    href={`tel:${contactInfo.telefono}`}
                    className="
                        w-14 h-14 bg-gradient-to-br from-pink-500 to-red-500
                        rounded-full flex items-center justify-center shadow-2xl
                        hover:shadow-3xl transition-all duration-300 group
                        hover:scale-110
                    "
                    aria-label="Llamar"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-20 delay-150"></div>
                        <Phone className="w-6 h-6 text-white relative z-10" />
                    </div>
                    <div className="
                        absolute -top-10 right-0 bg-white text-gray-800 px-3 py-1
                        rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 whitespace-nowrap shadow-lg
                        border border-gray-200
                    ">
                        ¡Llámanos!
                        <div className="
                            absolute bottom-0 left-1/2 transform -translate-x-1/2
                            translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-b
                            border-gray-200
                        "></div>
                    </div>
                </a>

                {/* Botón flotante para subir al inicio */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="
                        w-14 h-14 bg-white
                        rounded-full flex items-center justify-center shadow-2xl
                        hover:shadow-3xl transition-all duration-300 group
                        hover:scale-110 border border-gray-300
                    "
                    aria-label="Subir al inicio"
                >
                    <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-pink-500 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                </button>
            </div>
        </>
    );
}
