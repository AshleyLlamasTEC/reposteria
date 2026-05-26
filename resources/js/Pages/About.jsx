import React from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    Heart, Star, Award, Clock, Users, Leaf,
    Cake, Coffee, Sparkles, Shield, Target, Clock as ClockIcon
} from 'lucide-react';
import Navbar from '@/Components/ui/Navbar';
import Footer from '@/Components/ui/Footer';

export default function About() {

    // Valores de la pastelería
    const values = [
        {
            icon: Heart,
            title: "Hecho con Amor",
            description: "Cada producto es elaborado con pasión y dedicación, como si fuera para nuestra propia familia."
        },
        {
            icon: Leaf,
            title: "Ingredientes Naturales",
            description: "Utilizamos solo ingredientes frescos, de alta calidad y sin conservantes artificiales."
        },
        {
            icon: Shield,
            title: "Calidad Garantizada",
            description: "Nuestro compromiso es ofrecer la mejor calidad en cada producto que sale de nuestro horno."
        },
        {
            icon: ClockIcon,
            title: "Tradición Familiar",
            description: "Recetas transmitidas por generaciones, combinadas con técnicas modernas."
        },
        {
            icon: Sparkles,
            title: "Creatividad Única",
            description: "Cada pastel es una creación original diseñada especialmente para cada cliente."
        },
        {
            icon: Target,
            title: "Servicio Personalizado",
            description: "Escuchamos tus ideas y las transformamos en el postre perfecto para tu ocasión especial."
        }
    ];

    // Logros y reconocimientos
    const achievements = [
        {
            year: "2011",
            title: "Inicios Humildes",
            description: "Paty comenzó preparando y vendiendo pasteles en eventos locales y reuniones familiares, compartiendo su pasión por la repostería."
        },
        {
            year: "2010",
            title: "Primer Negocio",
            description: "Abrimos nuestro primer local en la colonia, un logro posible gracias al apoyo y confianza de nuestra comunidad."
        },
        {
            year: "2025",
            title: "Expansión Digital",
            description: "Integrarnos al mundo digital nos permitió ofrecer pedidos en línea y entregas a domicilio, llegando a más clientes cada día."
        }
    ];

    return (
        <>
            <Head title="Repostería Sweet Stack - Nuestra Historia" />

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
                            <Cake className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
                            Nuestra Historia
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                            Endulzando momentos especiales desde 1998
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sección Nuestra Historia */}
            <section className="py-12 sm:py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="relative">
                                <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/paty.jpg"
                                        alt="Interior de la pastelería"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl hidden lg:block">
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center">
                                            <Award className="w-7 h-7 text-pink-600" />
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-800">14+</p>
                                            <p className="text-sm text-gray-600">Años de experiencia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full">
                                <span className="text-pink-600 font-semibold text-sm">Desde 2011</span>
                            </div>

                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
                                Una tradición familiar hecha con amor
                            </h2>

                            <div className="space-y-4 text-gray-600">
                                <p className="text-lg">
                                    En <span className="font-bold text-pink-600">Repostería Sweet Stack</span>,
                                    creemos que los mejores recuerdos se crean alrededor de una mesa compartiendo
                                    algo dulce. Lo que comenzó como un sueño en la cocina de nuestra fundadora
                                    Patricia, hoy es una tradición que ha endulzado miles de momentos especiales.
                                </p>

                                <p>
                                    Cada pastel, galleta y postre que sale de nuestro horno lleva consigo
                                    recetas familiares transmitidas por generaciones, combinadas con técnicas
                                    modernas y el ingrediente más importante: el amor por lo que hacemos.
                                </p>

                                <p>
                                    Nos enorgullece ser parte de tus celebraciones más importantes - desde
                                    primeras comuniones hasta bodas, cumpleaños y aniversarios. Para nosotros,
                                    no solo hacemos postres, creamos experiencias dulces que perduran en la memoria.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Nuestros Valores */}
            <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Nuestros Valores
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Los principios que guían cada uno de nuestros productos
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                                    <value.icon className="w-7 h-7 text-pink-600" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Nuestra Trayectoria */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-pink-50 to-red-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                            Nuestra Trayectoria
                        </h2>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                            Un viaje de pasión y crecimiento a lo largo de los años
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Línea de tiempo */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-400 to-red-400 hidden md:block"></div>

                        <div className="space-y-12">
                            {achievements.map((achievement, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.2 }}
                                    className={`relative flex flex-col md:flex-row items-center ${
                                        index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* Punto en la línea */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-lg hidden md:block"></div>

                                    {/* Contenido */}
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mt-6 md:mt-0`}>
                                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                                            <div className="inline-flex items-center px-4 py-2 bg-pink-100 rounded-full mb-4">
                                                <span className="text-pink-600 font-bold">{achievement.year}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {achievement.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {achievement.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-pink-500 to-red-500">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-white"
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            ¿Listo para endulzar tu próximo evento?
                        </h2>
                        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                            Únete a las miles de familias que han confiado en nosotros para sus celebraciones más especiales
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={route('contact')}
                                className="bg-white text-pink-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Contáctanos
                            </a>
                            <a
                                href={route('desserts.index')}
                                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
                            >
                                Ver Nuestro Menú
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </>
    );
}
