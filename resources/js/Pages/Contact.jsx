import React, { useState, useEffect, useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Html5Qrcode } from "html5-qrcode";

import {
    Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle,
    QrCode, X, Facebook, Instagram, MessageCircle,
    Cake, Home, ShoppingBag, Users, MessageSquare
} from 'lucide-react';
import Navbar from '@/Components/ui/Navbar';
import Footer from '@/Components/ui/Footer';

export default function Contact() {
    // Estado para el formulario de contacto
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        tipo: 'consulta'
    });

    // Estado para seguimiento de pedido
    const [folio, setFolio] = useState('');
    const [pedidoInfo, setPedidoInfo] = useState(null);
    const [isLoadingPedido, setIsLoadingPedido] = useState(false);
    const [pedidoError, setPedidoError] = useState('');

    // Estado para el scanner QR
    const scannerRef = useRef(null);
    const [showScanner, setShowScanner] = useState(false);
    const [cameraLoading, setCameraLoading] = useState(false);
    const qrRegionId = "qr-reader-region";

    const startScanner = async () => {
        setCameraLoading(true);

        try {
            const html5QrCode = new Html5Qrcode(qrRegionId);

            const cameras = await Html5Qrcode.getCameras();
            if (!cameras || cameras.length === 0) {
                alert("No se encontró cámara");
                setCameraLoading(false);
                return;
            }

            await html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                (decodedText) => {
                    setShowScanner(false);
                    html5QrCode.stop();
                    setFolio(decodedText.toUpperCase());
                    buscarPedido(decodedText.toUpperCase());
                },
                (errorMessage) => {
                    // Errores de lectura repetitivos ignorados
                }
            );

        } catch (error) {
            console.error(error);
            alert("Hubo un error al iniciar la cámara");
        } finally {
            setCameraLoading(false);
        }
    };

    const closeScanner = () => {
        const element = document.getElementById(qrRegionId);
        if (element) element.innerHTML = ""; // Limpia cámara
        setShowScanner(false);
    };


    useEffect(() => {
    if (showScanner && scannerRef.current) {
        import("html5-qrcode").then(({ Html5Qrcode }) => {
            const html5QrCode = new Html5Qrcode("qr-reader");

            html5QrCode.start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 250
                },
                (decodedText) => {
                    setFolio(decodedText.toUpperCase());
                    setShowScanner(false);
                    html5QrCode.stop();
                    buscarPedido(decodedText);
                }
            ).catch(err => {
                console.error("Error al iniciar QR:", err);
            });
        });
    }
}, [showScanner]);


    // Datos de contacto
    const contactInfo = {
        telefono: "+52 (686) 198 07 66",
        email: "reposteriasweetstack@gmail.com",
        horario: {
            semana: "Lunes a Sábado: 8:00 AM - 8:00 PM",
            domingo: "Domingo: 9:00 AM - 6:00 PM"
        },
        redesSociales: [
            {
                nombre: "Facebook",
                icon: Facebook,
                href: "https://www.facebook.com/profile.php?id=100063745980434",
                color: "hover:bg-blue-600 hover:border-blue-600 hover:text-white",
                bgColor: "bg-blue-500"
            },
            // {
            //     nombre: "Instagram",
            //     icon: Instagram,
            //     href: "https://instagram.com/reposteriapatys",
            //     color: "hover:bg-gradient-to-r hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white",
            //     bgColor: "bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500"
            // },
            {
                nombre: "WhatsApp",
                icon: MessageCircle,
                href: "https://wa.me/526861980766",
                color: "hover:bg-green-600 hover:border-green-600 hover:text-white",
                bgColor: "bg-green-500"
            }
        ]
    };

    // Opciones de consulta
    const tipoConsulta = [
        { value: "consulta", label: "Consulta General", icon: MessageSquare },
        { value: "pedido", label: "Pedido Especial", icon: ShoppingBag },
        { value: "evento", label: "Evento Corporativo", icon: Users },
        { value: "problema", label: "Problema con Pedido", icon: AlertCircle },
        { value: "sugerencia", label: "Sugerencia", icon: MessageSquare },
        { value: "presupuesto", label: "Solicitud de Presupuesto", icon: Cake }
    ];

    // Función para buscar pedido por folio
    const buscarPedido = async (folioParam = folio) => {
        const folioToSearch = folioParam || folio;

        if (!folioToSearch.trim()) {
            setPedidoError('Por favor, ingresa un número de folio');
            return;
        }

        setIsLoadingPedido(true);
        setPedidoError('');
        setPedidoInfo(null);

        try {
            // Simulación de petición al backend
            await new Promise(resolve => setTimeout(resolve, 1000));

            const pedidosSimulados = {
                'ABC123': {
                    folio: 'ABC123',
                    cliente: 'Juan Pérez',
                    fecha: '2024-01-15',
                    estado: 'En preparación',
                    productos: [
                        { nombre: 'Pastel Chocolate', cantidad: 1, precio: 480.00 },
                        { nombre: 'Galletas Personalizadas', cantidad: 12, precio: 180.00 }
                    ],
                    total: 660.00,
                    entrega: '2024-01-20',
                    progreso: 60
                },
                'DEF456': {
                    folio: 'DEF456',
                    cliente: 'María García',
                    fecha: '2024-01-10',
                    estado: 'Entregado',
                    productos: [
                        { nombre: 'Cheesecake Frutos Rojos', cantidad: 1, precio: 420.00 }
                    ],
                    total: 420.00,
                    entrega: '2024-01-12',
                    progreso: 100
                }
            };

            if (pedidosSimulados[folioToSearch]) {
                setPedidoInfo(pedidosSimulados[folioToSearch]);
                setFolio(folioToSearch);
            } else {
                setPedidoError(`No se encontró un pedido con el folio: ${folioToSearch}`);
            }
        } catch (error) {
            setPedidoError('Error al buscar el pedido. Intenta de nuevo.');
        } finally {
            setIsLoadingPedido(false);
        }
    };

    // Funciones para el formulario de contacto
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contacto.enviar'), {
            onSuccess: () => {
                reset();
                alert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
            },
            onError: () => {
                alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
            }
        });
    };

    return (
        <>
            <Head title="Repostería Sweet Stack - Contáctanos" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-r from-pink-500 to-red-500">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full backdrop-blur-sm mb-6">
                            <MessageSquare className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                            Contáctanos
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Estamos aquí para endulzar tus momentos especiales
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sección Principal */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                        {/* Información de Contacto */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="space-y-6"
                        >
                            {/* Tarjeta de Información */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                        <Phone className="w-5 h-5 text-pink-600" />
                                    </div>
                                    <span>Información de Contacto</span>
                                </h3>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Phone className="w-5 h-5 text-pink-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">Teléfono</p>
                                            <a
                                                href={`tel:${contactInfo.telefono}`}
                                                className="text-pink-600 hover:text-pink-700 transition-colors"
                                            >
                                                {contactInfo.telefono}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Mail className="w-5 h-5 text-pink-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">Email</p>
                                            <a
                                                href={`mailto:${contactInfo.email}`}
                                                className="text-pink-600 hover:text-pink-700 transition-colors"
                                            >
                                                {contactInfo.email}
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 bg-pink-50 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-pink-500" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-700">Horario</p>
                                            <p className="text-gray-600 text-sm">{contactInfo.horario.semana}</p>
                                            <p className="text-gray-600 text-sm">{contactInfo.horario.domingo}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Redes Sociales con Íconos */}
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <p className="font-semibold text-gray-700 mb-4">Síguenos en redes</p>
                                    <div className="flex gap-3">
                                        {contactInfo.redesSociales.map((red, index) => (
                                            <motion.a
                                                key={index}
                                                href={red.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -3 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`
                                                    w-12 h-12 rounded-xl flex items-center justify-center
                                                    border border-gray-200 transition-all duration-300
                                                    ${red.color}
                                                `}
                                                title={red.nombre}
                                            >
                                                <red.icon className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Seguimiento de Pedido */}
                            <div className="bg-white rounded-xl sm:rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <span>Seguimiento de Pedido</span>
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Ingresa tu número de folio
                                        </label>
                                        <div className="flex flex-col sm:flex-row gap-2 mb-3">
                                            <input
                                                type="text"
                                                value={folio}
                                                onChange={(e) => {
                                                    setFolio(e.target.value.toUpperCase());
                                                    setPedidoError('');
                                                    setPedidoInfo(null);
                                                }}
                                                placeholder="Ej: ABC123"
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm sm:text-base"
                                                onKeyPress={(e) => e.key === 'Enter' && buscarPedido()}
                                            />
                                            <button
                                                onClick={() => buscarPedido()}
                                                disabled={isLoadingPedido}
                                                className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
                                            >
                                                {isLoadingPedido ? (
                                                    <>
                                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        Buscando...
                                                    </>
                                                ) : 'Buscar Pedido'}
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => {
                                                setShowScanner(true);
                                                setTimeout(() => startScanner(), 300);
                                            }}
                                            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
                                        >
                                            <QrCode className="w-5 h-5" />
                                            Escanear Código QR
                                        </button>
                                    </div>

                                    {pedidoError && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="p-3 bg-red-50 border border-red-200 rounded-lg"
                                        >
                                            <p className="text-red-500 text-sm flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                {pedidoError}
                                            </p>
                                        </motion.div>
                                    )}

                                    {pedidoInfo && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm"
                                        >
                                            <div className="flex items-center gap-2 mb-3">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <h4 className="font-bold text-gray-800">Pedido Encontrado</h4>
                                            </div>

                                            <div className="space-y-3">
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div>
                                                        <p className="text-xs text-gray-600">Folio</p>
                                                        <p className="font-bold text-gray-800 text-sm">{pedidoInfo.folio}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-600">Estado</p>
                                                        <span className={`font-bold text-sm ${
                                                            pedidoInfo.estado === 'Entregado' ? 'text-green-600' :
                                                            pedidoInfo.estado === 'En preparación' ? 'text-yellow-600' :
                                                            'text-blue-600'
                                                        }`}>
                                                            {pedidoInfo.estado}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="pt-2 border-t border-green-200">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm font-bold text-gray-800">Total:</span>
                                                        <span className="text-lg font-bold text-pink-600">${pedidoInfo.total.toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Formulario de Contacto */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-2"
                        >
                            <div className="bg-white rounded-xl sm:rounded-2xl p-6 shadow-lg h-full">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">
                                    Envíanos un Mensaje
                                </h3>

                                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                                    ¿Tienes preguntas sobre nuestros productos, quieres hacer un pedido especial o necesitas ayuda con un pedido existente? ¡Escríbenos! Te responderemos en menos de 24 horas.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nombre Completo *
                                            </label>
                                            <input
                                                type="text"
                                                value={data.nombre}
                                                onChange={(e) => setData('nombre', e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                                placeholder="Tu nombre completo"
                                            />
                                            {errors.nombre && (
                                                <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                required
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                                placeholder="correo@ejemplo.com"
                                            />
                                            {errors.email && (
                                                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            value={data.telefono}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                            placeholder="(686) 198 07 66"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Tipo de Consulta
                                        </label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {tipoConsulta.map((item) => (
                                                <button
                                                    key={item.value}
                                                    type="button"
                                                    onClick={() => setData('tipo', item.value)}
                                                    className={`
                                                        flex items-center gap-2 p-3 rounded-lg border transition-all duration-300
                                                        ${data.tipo === item.value
                                                            ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                            : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                        }
                                                    `}
                                                >
                                                    <item.icon className="w-4 h-4" />
                                                    <span className="text-sm text-left">{item.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Mensaje *
                                        </label>
                                        <textarea
                                            value={data.mensaje}
                                            onChange={(e) => setData('mensaje', e.target.value)}
                                            required
                                            rows="4"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                            placeholder="Cuéntanos cómo podemos ayudarte..."
                                        />
                                        {errors.mensaje && (
                                            <p className="mt-1 text-sm text-red-500">{errors.mensaje}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-1 shadow-lg hover:shadow-xl text-sm sm:text-base"
                                        >
                                            {processing ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    Enviando...
                                                </>
                                            ) : (
                                                <>
                                                    <Mail className="w-5 h-5" />
                                                    Enviar Mensaje
                                                </>
                                            )}
                                        </button>

                                        <button
                                            type="reset"
                                            onClick={() => reset()}
                                            className="border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:text-gray-800 py-3 px-6 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
                                        >
                                            Limpiar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

            {showScanner && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white rounded-2xl shadow-2xl p-6 w-11/12 max-w-md relative"
                    >
                        {/* Cerrar modal */}
                        <button
                            onClick={closeScanner}
                            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>

                        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                            Escanear Código QR
                        </h2>

                        <p className="text-gray-500 text-sm text-center mb-4">
                            Enfoca el código QR del pedido para buscarlo automáticamente.
                        </p>

                        {/* Área donde aparecerá la cámara */}
                        <div className="mx-auto rounded-lg overflow-hidden border border-gray-300 shadow-md">
                            <div id={qrRegionId} className="w-full h-72 bg-black"></div>
                        </div>

                        {/* Loading */}
                        {cameraLoading && (
                            <div className="mt-4 flex justify-center">
                                <div className="w-6 h-6 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                    </motion.div>
                </div>
            )}
        </>
    );
}
