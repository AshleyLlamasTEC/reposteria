import React, { useState, useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart, Search, Filter, X, Star, Heart,
    Cake, ChevronLeft, ChevronRight, Plus, Minus,
    ShoppingBag, Tag, Clock, Users, Sparkles,
    DollarSign, Layers, Palette, Gift, MessageSquare,
    Upload, Image as ImageIcon, AlertCircle, Info
} from 'lucide-react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function Postres() {
    const [selectedCake, setSelectedCake] = useState(null);
    const [isCakeDialogOpen, setIsCakeDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('todos');
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [sortBy, setSortBy] = useState('popular');
    const [quantity, setQuantity] = useState(1);
    const [favorites, setFavorites] = useState([]);

    // Estado para pedido personalizado
    const [showCustomOrder, setShowCustomOrder] = useState(false);
    const [customOrder, setCustomOrder] = useState({
        tipo: 'pastel',
        sabor: 'chocolate',
        tamaño: 'mediano',
        relleno: 'crema',
        betun: 'mantequilla',
        decoracion: 'basica',
        cantidad: 12, // Para cupcakes y galletas
        tematica: '',
        mensaje: '',
        notas: '',
        imagenReferencia: null,
        imagenPreview: null
    });

    const fileInputRef = useRef(null);

    // Datos de postres (el mismo array que tenías anteriormente)
    // Datos de postres
    const postres = [
        {
            id: 1,
            name: "Pastel de Chocolate",
            category: "pasteles",
            price: 480.00,
            image: "/images/shop/pastel-chocolate.jpg",
            description: "Pastel de chocolate intenso con relleno de ganache y cubierta de chocolate belga",
            rating: 4.8,
            reviews: 42,
            deliveryTime: "24-48 horas",
            serves: "10-12 personas",
            ingredients: ["Chocolate belga", "Harina de almendra", "Crema batida", "Frambuesas"],
            popular: true,
            nuevo: false,
            tags: ["Chocolate", "Clásico", "Familiar"]
        },
        {
            id: 2,
            name: "Pastel de Zanahoria",
            category: "pasteles",
            price: 500.00,
            image: "/images/shop/pastel-zanahoria.jpg",
            description: "Pastel esponjoso de zanahoria con nueces y frosting de queso crema",
            rating: 4.9,
            reviews: 38,
            deliveryTime: "24 horas",
            serves: "8-10 personas",
            ingredients: ["Zanahoria rallada", "Nueces", "Queso crema", "Canela"],
            popular: true,
            nuevo: false,
            tags: ["Tradicional", "Especias", "Nueces"]
        },
        {
            id: 3,
            name: "Cheesecake de Frutos Rojos",
            category: "cheesecakes",
            price: 420.00,
            image: "/images/shop/frutos.jpg",
            description: "Cheesecake cremoso con base de galleta y salsa de frutos rojos casera",
            rating: 4.7,
            reviews: 56,
            deliveryTime: "12-24 horas",
            serves: "6-8 personas",
            ingredients: ["Queso crema", "Galleta María", "Frutos rojos", "Mermelada"],
            popular: true,
            nuevo: false,
            tags: ["Cremoso", "Frutos Rojos", "Postre Frío"]
        },
        {
            id: 4,
            name: "Macarons x12",
            category: "galletas",
            price: 280.00,
            image: "/images/shop/macarons.jpg",
            description: "12 macarons franceses con diferentes sabores: fresa, chocolate, limón y vainilla",
            rating: 4.6,
            reviews: 29,
            deliveryTime: "6-12 horas",
            serves: "4-6 personas",
            ingredients: ["Almendra molida", "Azúcar glass", "Clara de huevo", "Rellenos diversos"],
            popular: false,
            nuevo: true,
            tags: ["Francés", "Colorido", "Elegante"]
        },
        {
            id: 5,
            name: "Cupcakes x6",
            category: "cupcakes",
            price: 180.00,
            image: "/images/shop/cupcakes.jpg",
            description: "6 cupcakes decorados con frosting de mantequilla y toppings variados",
            rating: 4.5,
            reviews: 31,
            deliveryTime: "6-12 horas",
            serves: "3-6 personas",
            ingredients: ["Harina", "Mantequilla", "Huevos", "Frosting"],
            popular: true,
            nuevo: false,
            tags: ["Individual", "Decorado", "Fiesta"]
        },
        {
            id: 7,
            name: "Donas Glaseadas x6",
            category: "donas",
            price: 120.00,
            image: "/images/shop/donas.jpg",
            description: "6 donas esponjosas con glaseados de diferentes sabores y toppings",
            rating: 4.4,
            reviews: 18,
            deliveryTime: "4-8 horas",
            serves: "3-6 personas",
            ingredients: ["Harina", "Levadura", "Azúcar", "Glaseados"],
            popular: false,
            nuevo: true,
            tags: ["Esponjoso", "Glaseado", "Matutino"]
        },
        {
            id: 8,
            name: "Brownie de Chocolate",
            category: "brownies",
            price: 220.00,
            image: "/images/shop/brownie.jpg",
            description: "Brownie denso y húmedo con nueces y chispas de chocolate",
            rating: 4.8,
            reviews: 47,
            deliveryTime: "12-24 horas",
            serves: "4-6 personas",
            ingredients: ["Chocolate", "Nueces", "Mantequilla", "Huevos"],
            popular: true,
            nuevo: false,
            tags: ["Chocolate", "Denso", "Nueces"]
        },
        {
            id: 9,
            name: "Tres Leches",
            category: "pasteles",
            price: 380.00,
            image: "/images/shop/tres-leches.jpg",
            description: "Pastel esponjoso bañado en mezcla de tres leches",
            rating: 4.9,
            reviews: 63,
            deliveryTime: "24 horas",
            serves: "10-12 personas",
            ingredients: ["Leche evaporada", "Leche condensada", "Crema", "Merengue"],
            popular: true,
            nuevo: false,
            tags: ["Tradicional", "Húmedo", "Merengue"]
        },
        {
            id: 10,
            name: "Pastel de vainilla y fresa",
            category: "pasteles",
            price: 520.00,
            image: "/images/shop/pastel-vainilla.jpg",
            description: "Pastel de vainilla con relleno de fresas frescas y crema batida",
            rating: 4.6,
            reviews: 19,
            deliveryTime: "48 horas",
            serves: "8-10 personas",
            ingredients: ["Tradicional", "Fresa", "Crema batida"],
            popular: false,
            nuevo: true,
            tags: ["Francés", "Elegante", "Clásico"]
        },
        {
            id: 11,
            name: "Galletas de Mantequilla x12",
            category: "galletas",
            price: 150.00,
            image: "/images/shop/galletas-mantequilla.jpg",
            description: "12 galletas de mantequilla artesanales",
            rating: 4.5,
            reviews: 22,
            deliveryTime: "6-12 horas",
            serves: "6-8 personas",
            ingredients: ["Mantequilla", "Harina", "Azúcar", "Vainilla"],
            popular: false,
            nuevo: false,
            tags: ["Artesanal", "Clásico", "Dulce"]
        },
        {
            id: 12,
            name: "Red Velvet",
            category: "pasteles",
            price: 460.00,
            image: "/images/shop/red-velvet.jpg",
            description: "Pastel rojo aterciopelado con frosting de queso crema y decoración clásica",
            rating: 4.7,
            reviews: 34,
            deliveryTime: "24-48 horas",
            serves: "10-12 personas",
            ingredients: ["Cacao", "Colorante rojo", "Queso crema", "Vinagre"],
            popular: true,
            nuevo: false,
            tags: ["Rojo", "Aterciopelado", "Queso Crema"]
        }
    ];

    // Categorías
    const categories = [
        { id: 'todos', name: 'Todos los Postres', count: postres.length },
        { id: 'pasteles', name: 'Pasteles', count: postres.filter(p => p.category === 'pasteles').length },
        { id: 'cheesecakes', name: 'Cheesecakes', count: postres.filter(p => p.category === 'cheesecakes').length },
        { id: 'cupcakes', name: 'Cupcakes', count: postres.filter(p => p.category === 'cupcakes').length },
        { id: 'tartas', name: 'Tartas', count: postres.filter(p => p.category === 'tartas').length },
        { id: 'galletas', name: 'Galletas', count: postres.filter(p => p.category === 'galletas').length },
        { id: 'donas', name: 'Donas', count: postres.filter(p => p.category === 'donas').length },
        { id: 'brownies', name: 'Brownies', count: postres.filter(p => p.category === 'brownies').length }
    ];

    // Configuración inteligente por tipo de postre
    const configuracionesPorTipo = {
        pastel: {
            tieneRelleno: true,
            tieneBetun: true,
            tieneTamaño: true,
            tieneCantidad: false,
            unidades: 'rebanadas',
            descripcion: 'Pastel tradicional para celebraciones'
        },
        tarta: {
            tieneRelleno: false,
            tieneBetun: false,
            tieneTamaño: true,
            tieneCantidad: false,
            unidades: 'porciones',
            descripcion: 'Tarta frutal o de crema'
        },
        cupcakes: {
            tieneRelleno: true,
            tieneBetun: true,
            tieneTamaño: false,
            tieneCantidad: true,
            unidades: 'unidades',
            descripcion: 'Cupcakes individuales decorados'
        },
        galletas: {
            tieneRelleno: false,
            tieneBetun: false,
            tieneTamaño: false,
            tieneCantidad: true,
            unidades: 'unidades',
            descripcion: 'Galletas personalizadas'
        },
        cheesecake: {
            tieneRelleno: false,
            tieneBetun: false,
            tieneTamaño: true,
            tieneCantidad: false,
            unidades: 'porciones',
            descripcion: 'Cheesecake cremoso'
        }
    };

    // Precios actualizados por tipo de postre
    const precios = {
        base: {
            'pastel': 200,
            'tarta': 180,
            'cupcakes': 150,
            'galletas': 120,
            'cheesecake': 220
        },
        sabores: {
            'chocolate': { 'pastel': 50, 'tarta': 45, 'cupcakes': 40, 'galletas': 35, 'cheesecake': 55 },
            'vainilla': { 'pastel': 40, 'tarta': 38, 'cupcakes': 35, 'galletas': 30, 'cheesecake': 45 },
            'fresa': { 'pastel': 45, 'tarta': 42, 'cupcakes': 38, 'galletas': 32, 'cheesecake': 48 },
            'limón': { 'pastel': 42, 'tarta': 40, 'cupcakes': 36, 'galletas': 31, 'cheesecake': 46 },
            'red-velvet': { 'pastel': 55, 'tarta': 50, 'cupcakes': 45, 'galletas': 40, 'cheesecake': 60 },
            'tres-leches': { 'pastel': 48, 'tarta': 0, 'cupcakes': 0, 'galletas': 0, 'cheesecake': 0 },
            'zanahoria': { 'pastel': 52, 'tarta': 48, 'cupcakes': 0, 'galletas': 0, 'cheesecake': 0 },
            'coco': { 'pastel': 46, 'tarta': 43, 'cupcakes': 40, 'galletas': 35, 'cheesecake': 50 },
            'cafe': { 'pastel': 53, 'tarta': 49, 'cupcakes': 45, 'galletas': 40, 'cheesecake': 58 },
            'frutos-rojos': { 'pastel': 58, 'tarta': 55, 'cupcakes': 50, 'galletas': 45, 'cheesecake': 65 },
            'manzana-canela': { 'pastel': 0, 'tarta': 52, 'cupcakes': 0, 'galletas': 0, 'cheesecake': 0 },
            'fresa-queso': { 'pastel': 0, 'tarta': 54, 'cupcakes': 0, 'galletas': 0, 'cheesecake': 62 }
        },
        tamaños: {
            'chico': { 'pastel': 1.0, 'tarta': 1.0, 'cheesecake': 1.0 },
            'mediano': { 'pastel': 1.5, 'tarta': 1.4, 'cheesecake': 1.5 },
            'grande': { 'pastel': 2.0, 'tarta': 1.8, 'cheesecake': 2.0 },
            'extra-grande': { 'pastel': 2.8, 'tarta': 2.5, 'cheesecake': 2.7 }
        },
        rellenos: {
            'crema': 20,
            'mermelada': 15,
            'ganache': 30,
            'frutas': 25,
            'crema-pastelera': 22,
            'dulce-de-leche': 28,
            'ninguno': 0
        },
        betunes: {
            'mantequilla': 20,
            'crema': 15,
            'fondant': 50,
            'chocolate': 30,
            'merengue': 25,
            'crema-cheese': 35,
            'ninguno': 0
        },
        decoraciones: {
            'basica': 0,
            'media': 80,
            'compleja': 150,
            'tematico': 200,
            'personalizado': 300
        },
        cantidades: {
            'cupcakes': {
                6: 0.5,
                12: 1.0,
                24: 1.8,
                36: 2.5,
                48: 3.0
            },
            'galletas': {
                12: 1.0,
                24: 1.8,
                36: 2.5,
                48: 3.0,
                72: 4.0,
                100: 5.5
            }
        }
    };

    // Opciones actualizadas por tipo de postre
    const opcionesPersonalizadas = {
        tipos: [
            { value: 'pastel', label: 'Pastel Tradicional', icon: Cake },
            { value: 'tarta', label: 'Tarta', icon: Cake },
            { value: 'cupcakes', label: 'Cupcakes', icon: Cake },
            { value: 'galletas', label: 'Galletas Personalizadas', icon: Cake },
            { value: 'cheesecake', label: 'Cheesecake', icon: Cake }
        ],
        sabores: {
            'pastel': [
                { value: 'chocolate', label: 'Chocolate Intenso', price: '+$50' },
                { value: 'vainilla', label: 'Vainilla Francesa', price: '+$40' },
                { value: 'fresa', label: 'Fresa Natural', price: '+$45' },
                { value: 'limón', label: 'Limón Fresco', price: '+$42' },
                { value: 'red-velvet', label: 'Red Velvet', price: '+$55' },
                { value: 'tres-leches', label: 'Tres Leches', price: '+$48' },
                { value: 'zanahoria', label: 'Zanahoria', price: '+$52' },
                { value: 'coco', label: 'Coco Tropical', price: '+$46' },
                { value: 'cafe', label: 'Café Especial', price: '+$53' },
                { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$58' }
            ],
            'tarta': [
                { value: 'chocolate', label: 'Chocolate', price: '+$45' },
                { value: 'vainilla', label: 'Vainilla', price: '+$38' },
                { value: 'fresa', label: 'Fresa', price: '+$42' },
                { value: 'limón', label: 'Limón', price: '+$40' },
                { value: 'manzana-canela', label: 'Manzana con Canela', price: '+$52' },
                { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$55' },
                { value: 'fresa-queso', label: 'Fresa con Queso', price: '+$54' }
            ],
            'cupcakes': [
                { value: 'chocolate', label: 'Chocolate', price: '+$40' },
                { value: 'vainilla', label: 'Vainilla', price: '+$35' },
                { value: 'fresa', label: 'Fresa', price: '+$38' },
                { value: 'limón', label: 'Limón', price: '+$36' },
                { value: 'red-velvet', label: 'Red Velvet', price: '+$45' },
                { value: 'coco', label: 'Coco', price: '+$40' },
                { value: 'cafe', label: 'Café', price: '+$45' },
                { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$50' }
            ],
            'galletas': [
                { value: 'chocolate', label: 'Chocolate', price: '+$35' },
                { value: 'vainilla', label: 'Vainilla', price: '+$30' },
                { value: 'fresa', label: 'Fresa', price: '+$32' },
                { value: 'limón', label: 'Limón', price: '+$31' },
                { value: 'red-velvet', label: 'Red Velvet', price: '+$40' },
                { value: 'coco', label: 'Coco', price: '+$35' },
                { value: 'cafe', label: 'Café', price: '+$40' },
                { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$45' }
            ],
            'cheesecake': [
                { value: 'chocolate', label: 'Chocolate', price: '+$55' },
                { value: 'vainilla', label: 'Vainilla', price: '+$45' },
                { value: 'fresa', label: 'Fresa', price: '+$48' },
                { value: 'limón', label: 'Limón', price: '+$46' },
                { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$65' },
                { value: 'fresa-queso', label: 'Fresa con Queso', price: '+$62' },
                { value: 'dulce-de-leche', label: 'Dulce de Leche', price: '+$58' }
            ]
        },
        tamaños: [
            { value: 'chico', label: 'Chico (8-10 rebanadas)', multiplier: '1x' },
            { value: 'mediano', label: 'Mediano (12-15 rebanadas)', multiplier: '1.5x' },
            { value: 'grande', label: 'Grande (18-22 rebanadas)', multiplier: '2x' },
            { value: 'extra-grande', label: 'Extra Grande (25+ rebanadas)', multiplier: '2.8x' }
        ],
        cantidades: {
            'cupcakes': [
                { value: 6, label: '6 cupcakes', multiplier: '0.5x' },
                { value: 12, label: '12 cupcakes', multiplier: '1x' },
                { value: 24, label: '24 cupcakes', multiplier: '1.8x' },
                { value: 36, label: '36 cupcakes', multiplier: '2.5x' },
                { value: 48, label: '48 cupcakes', multiplier: '3x' }
            ],
            'galletas': [
                { value: 12, label: '12 galletas', multiplier: '1x' },
                { value: 24, label: '24 galletas', multiplier: '1.8x' },
                { value: 36, label: '36 galletas', multiplier: '2.5x' },
                { value: 48, label: '48 galletas', multiplier: '3x' },
                { value: 72, label: '72 galletas', multiplier: '4x' },
                { value: 100, label: '100 galletas', multiplier: '5.5x' }
            ]
        },
        rellenos: [
            { value: 'crema', label: 'Crema Batida', price: '+$20' },
            { value: 'mermelada', label: 'Mermelada de Frutas', price: '+$15' },
            { value: 'ganache', label: 'Ganache de Chocolate', price: '+$30' },
            { value: 'frutas', label: 'Fresas/Frutos Rojos', price: '+$25' },
            { value: 'crema-pastelera', label: 'Crema Pastelera', price: '+$22' },
            { value: 'dulce-de-leche', label: 'Dulce de Leche', price: '+$28' },
            { value: 'ninguno', label: 'Sin Relleno', price: 'Incluido' }
        ],
        betunes: [
            { value: 'mantequilla', label: 'Frosting de Mantequilla', price: '+$20' },
            { value: 'crema', label: 'Crema para Decorar', price: '+$15' },
            { value: 'fondant', label: 'Fondant (Decoración Lisa)', price: '+$50' },
            { value: 'chocolate', label: 'Ganache de Chocolate', price: '+$30' },
            { value: 'merengue', label: 'Merengue Italiano', price: '+$25' },
            { value: 'crema-cheese', label: 'Crema de Queso', price: '+$35' },
            { value: 'ninguno', label: 'Sin Betún', price: 'Incluido' }
        ],
        decoraciones: [
            { value: 'basica', label: 'Decoración Básica', price: 'Incluido' },
            { value: 'media', label: 'Decoración Media', price: '+$80' },
            { value: 'compleja', label: 'Decoración Compleja', price: '+$150' },
            { value: 'tematico', label: 'Decoración Temática', price: '+$200' },
            { value: 'personalizado', label: 'Decoración Personalizada', price: '+$300' }
        ]
    };

    // Obtener configuración actual
    const configActual = configuracionesPorTipo[customOrder.tipo] || configuracionesPorTipo.pastel;
    const saboresDisponibles = opcionesPersonalizadas.sabores[customOrder.tipo] || opcionesPersonalizadas.sabores.pastel;

    // Calcular precio total automático
    const calcularPrecio = () => {
        const basePrice = precios.base[customOrder.tipo] || 200;
        const saborPrice = precios.sabores[customOrder.sabor]?.[customOrder.tipo] || 0;

        let tamañoMultiplier = 1.0;
        if (configActual.tieneTamaño && customOrder.tamaño) {
            tamañoMultiplier = precios.tamaños[customOrder.tamaño]?.[customOrder.tipo] || 1.0;
        }

        let cantidadMultiplier = 1.0;
        if (configActual.tieneCantidad && customOrder.cantidad) {
            cantidadMultiplier = precios.cantidades[customOrder.tipo]?.[customOrder.cantidad] || 1.0;
        }

        const rellenoPrice = configActual.tieneRelleno ? (precios.rellenos[customOrder.relleno] || 0) : 0;
        const betunPrice = configActual.tieneBetun ? (precios.betunes[customOrder.betun] || 0) : 0;
        const decoracionPrice = precios.decoraciones[customOrder.decoracion] || 0;
        const tematicaPrice = customOrder.tematica.trim() ? 100 : 0;

        const subtotal = basePrice + saborPrice;
        let total = subtotal;

        if (configActual.tieneTamaño) {
            total = subtotal * tamañoMultiplier;
        }

        if (configActual.tieneCantidad) {
            total = subtotal * cantidadMultiplier;
        }

        total = total + rellenoPrice + betunPrice + decoracionPrice + tematicaPrice;

        return {
            base: basePrice,
            sabor: saborPrice,
            tamaño: tamañoMultiplier,
            cantidad: cantidadMultiplier,
            relleno: rellenoPrice,
            betun: betunPrice,
            decoracion: decoracionPrice,
            tematica: tematicaPrice,
            total: Math.round(total)
        };
    };

    const precioCalculado = calcularPrecio();

    // Manejar cambio de imagen
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB.');
                return;
            }

            if (!file.type.startsWith('image/')) {
                alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, etc.).');
                return;
            }

            setCustomOrder({
                ...customOrder,
                imagenReferencia: file,
                imagenPreview: URL.createObjectURL(file)
            });
        }
    };

    // Eliminar imagen
    const handleRemoveImage = () => {
        if (customOrder.imagenPreview) {
            URL.revokeObjectURL(customOrder.imagenPreview);
        }
        setCustomOrder({
            ...customOrder,
            imagenReferencia: null,
            imagenPreview: null
        });
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Función para manejar pedido personalizado
    const handleCustomOrderSubmit = (e, tipo = 'pedido') => {
        e.preventDefault();

        if (tipo === 'pedido') {
            alert(`¡Pedido personalizado confirmado!\n\nTotal: $${precioCalculado.total}\n\nTe contactaremos para confirmar detalles y fecha de entrega.`);
        } else {
            alert('¡Solicitud de presupuesto enviada!\n\nTe enviaremos un presupuesto detallado en menos de 24 horas.');
        }

        // Resetear formulario
        if (customOrder.imagenPreview) {
            URL.revokeObjectURL(customOrder.imagenPreview);
        }

        setShowCustomOrder(false);
        setCustomOrder({
            tipo: 'pastel',
            sabor: 'chocolate',
            tamaño: 'mediano',
            relleno: 'crema',
            betun: 'mantequilla',
            decoracion: 'basica',
            cantidad: 12,
            tematica: '',
            mensaje: '',
            notas: '',
            imagenReferencia: null,
            imagenPreview: null
        });
    };

    // Resetear campos cuando cambia el tipo
    const handleTipoChange = (tipo) => {
        setCustomOrder({
            tipo: tipo,
            sabor: 'chocolate',
            tamaño: 'mediano',
            relleno: 'crema',
            betun: 'mantequilla',
            decoracion: 'basica',
            cantidad: 12,
            tematica: '',
            mensaje: '',
            notas: '',
            imagenReferencia: customOrder.imagenReferencia,
            imagenPreview: customOrder.imagenPreview
        });
    };

    // Filtrar y ordenar postres (mismo código anterior)
    const filteredPostres = postres.filter(postre => {
        const matchesSearch = postre.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            postre.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            postre.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesCategory = selectedCategory === 'todos' || postre.category === selectedCategory;

        const matchesPrice = postre.price >= priceRange[0] && postre.price <= priceRange[1];

        return matchesSearch && matchesCategory && matchesPrice;
    });

    const sortedPostres = [...filteredPostres].sort((a, b) => {
        switch(sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'new':
                return b.nuevo - a.nuevo;
            default:
                return b.popular - a.popular;
        }
    });

    // Funciones para el modal de detalles (mismo código anterior)
    const openCakeDetails = (cake) => {
        setSelectedCake(cake);
        setQuantity(1);
        setIsCakeDialogOpen(true);
    };

    const addToCart = (cake) => {
        alert(`¡${cake.name} agregado al carrito! Total: $${(cake.price * quantity).toFixed(2)}`);
        setIsCakeDialogOpen(false);
    };

    const toggleFavorite = (cakeId) => {
        if (favorites.includes(cakeId)) {
            setFavorites(favorites.filter(id => id !== cakeId));
        } else {
            setFavorites([...favorites, cakeId]);
        }
    };

    // Limpiar URL de imagen al desmontar
    useEffect(() => {
        return () => {
            if (customOrder.imagenPreview) {
                URL.revokeObjectURL(customOrder.imagenPreview);
            }
        };
    }, [customOrder.imagenPreview]);

    return (
        <>
            <Head title="Repostería Paty's - Catálogo de Postres" />

            {/* Navbar */}
            <Navbar />

            {/* Hero Section (mismo código anterior) */}
            <section className="pt-32 pb-20 bg-gradient-to-r from-pink-400 to-red-500">
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
                            Nuestros Postres
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
                            Descubre nuestra deliciosa selección de postres artesanales
                        </p>

                        {/* Barra de búsqueda principal */}
                        <div className="max-w-2xl mx-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Buscar postres por nombre, ingredientes o tags..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Sección Principal (mismo código anterior hasta los filtros) */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar de Filtros (mismo código anterior) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:w-1/4"
                        >
                            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
                                {/* Título */}
                                <div className="flex items-center gap-2 mb-6">
                                    <Filter className="w-5 h-5 text-pink-500" />
                                    <h3 className="text-lg font-bold text-gray-800">Filtros</h3>
                                </div>

                                {/* Categorías */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-3">Categorías</h4>
                                    <div className="space-y-2">
                                        {categories.map(category => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`
                                                    flex justify-between items-center w-full px-3 py-2 rounded-lg
                                                    transition-all duration-200 text-left
                                                    ${selectedCategory === category.id
                                                        ? 'bg-pink-50 text-pink-600 font-semibold'
                                                        : 'text-gray-600 hover:bg-gray-50'
                                                    }
                                                `}
                                            >
                                                <span>{category.name}</span>
                                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                    {category.count}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Rango de Precio */}
                                <div className="mb-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold text-gray-700">Rango de Precio</h4>
                                        <span className="text-sm text-pink-600 font-semibold">
                                            ${priceRange[0]} - ${priceRange[1]}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1000"
                                        step="50"
                                        value={priceRange[1]}
                                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                                    />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>$0</span>
                                        <span>$500</span>
                                        <span>$1000</span>
                                    </div>
                                </div>

                                {/* Ordenar por */}
                                <div className="mb-6">
                                    <h4 className="font-semibold text-gray-700 mb-3">Ordenar por</h4>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                    >
                                        <option value="popular">Más populares</option>
                                        <option value="rating">Mejor calificación</option>
                                        <option value="price-asc">Precio: menor a mayor</option>
                                        <option value="price-desc">Precio: mayor a menor</option>
                                        <option value="new">Nuevos primero</option>
                                    </select>
                                </div>

                                {/* Botón Pedido Personalizado */}
                                <button
                                    onClick={() => setShowCustomOrder(true)}
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    Pedido Personalizado
                                </button>
                            </div>
                        </motion.div>

                        {/* Galería de Postres (mismo código anterior) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:w-3/4"
                        >
                            {/* Información de resultados */}
                            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800">
                                        {sortedPostres.length} {sortedPostres.length === 1 ? 'postre encontrado' : 'postres encontrados'}
                                    </h3>
                                    {searchQuery && (
                                        <p className="text-gray-600 text-sm mt-1">
                                            Resultados para: "{searchQuery}"
                                        </p>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <span>Mostrando {Math.min(sortedPostres.length, 12)} de {postres.length} productos</span>
                                </div>
                            </div>

                            {/* Grid de Postres (mismo código anterior) */}
                            {sortedPostres.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {sortedPostres.map(postre => (
                                        <motion.div
                                            key={postre.id}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.3 }}
                                            whileHover={{ y: -5 }}
                                            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                                        >
                                            {/* Imagen */}
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={postre.image}
                                                    alt={postre.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        const fallback = document.createElement('div');
                                                        fallback.className = 'w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center';
                                                        fallback.innerHTML = '<div class="text-6xl">🎂</div>';
                                                        e.target.parentNode.appendChild(fallback);
                                                    }}
                                                />

                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 flex flex-col gap-2">
                                                    {postre.popular && (
                                                        <span className="bg-pink-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                            Popular
                                                        </span>
                                                    )}
                                                    {postre.nuevo && (
                                                        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                                                            Nuevo
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Botón favorito */}
                                                <button
                                                    onClick={() => toggleFavorite(postre.id)}
                                                    className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                                >
                                                    <Heart
                                                        className={`w-4 h-4 ${favorites.includes(postre.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Contenido */}
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-gray-800 text-lg group-hover:text-pink-600 transition-colors">
                                                        {postre.name}
                                                    </h3>
                                                    <span className="text-lg font-bold text-pink-500">
                                                        ${postre.price}
                                                    </span>
                                                </div>

                                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                                    {postre.description}
                                                </p>

                                                {/* Rating y detalles */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-1">
                                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                        <span className="text-sm font-semibold text-gray-700">
                                                            {postre.rating}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            ({postre.reviews})
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{postre.deliveryTime}</span>
                                                    </div>
                                                </div>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {postre.tags.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Botones de acción */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => openCakeDetails(postre)}
                                                        className="flex-1 bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Ver Detalles
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedCake(postre);
                                                            setQuantity(1);
                                                            addToCart(postre);
                                                        }}
                                                        className="px-4 bg-gray-800 hover:bg-gray-900 text-white py-2 rounded-lg font-semibold transition-colors duration-200 text-sm"
                                                    >
                                                        Comprar
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                                    <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-700 mb-2">No se encontraron postres</h3>
                                    <p className="text-gray-600 mb-6">
                                        Intenta con otros filtros o busca algo diferente
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('todos');
                                            setPriceRange([0, 1000]);
                                        }}
                                        className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                    >
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Modal de Detalles (mismo código anterior) */}
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
                            className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full mx-auto shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col md:flex-row">
                                {/* Imagen */}
                                <div className="md:w-1/2 bg-gray-100">
                                    <div className="h-64 md:h-full relative">
                                        <img
                                            src={selectedCake.image}
                                            alt={selectedCake.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                const fallback = document.createElement('div');
                                                fallback.className = 'w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center';
                                                fallback.innerHTML = '<div class="text-6xl">🎂</div>';
                                                e.target.parentNode.appendChild(fallback);
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Información */}
                                <div className="md:w-1/2 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">
                                                {selectedCake.name}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                                <span className="text-sm text-gray-600">
                                                    {selectedCake.rating} ({selectedCake.reviews} reseñas)
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setIsCakeDialogOpen(false)}
                                            className="text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <X className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {selectedCake.description}
                                    </p>

                                    {/* Detalles */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Users className="w-4 h-4 text-pink-500" />
                                            <span className="text-sm">Para {selectedCake.serves}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Clock className="w-4 h-4 text-pink-500" />
                                            <span className="text-sm">Entrega en {selectedCake.deliveryTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-700">
                                            <Tag className="w-4 h-4 text-pink-500" />
                                            <div className="flex flex-wrap gap-1">
                                                {selectedCake.tags.map((tag, index) => (
                                                    <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Precio y cantidad */}
                                    <div className="border-t border-gray-100 pt-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <span className="text-3xl font-bold text-pink-500">
                                                    ${selectedCake.price}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                    className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-12 text-center font-semibold">{quantity}</span>
                                                <button
                                                    onClick={() => setQuantity(quantity + 1)}
                                                    className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => addToCart(selectedCake)}
                                            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <ShoppingCart className="w-5 h-5" />
                                            Agregar al Carrito - ${(selectedCake.price * quantity).toFixed(2)}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal de Pedido Personalizado MEJORADO */}
            <AnimatePresence>
                {showCustomOrder && (
                    <motion.div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCustomOrder(false)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl overflow-hidden max-w-4xl w-full mx-auto shadow-2xl max-h-[90vh] overflow-y-auto"
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                            <Sparkles className="w-6 h-6 text-pink-500" />
                                            Pedido Personalizado
                                        </h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            {configActual.descripcion}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowCustomOrder(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* Advertencia importante */}
                                <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-yellow-800 mb-1">Importante</h4>
                                            <p className="text-sm text-yellow-700">
                                                Los pedidos personalizados pueden tener ajustes según la complejidad.
                                                Si tu pedido requiere detalles muy específicos, nuestros reposteros
                                                se contactarán contigo para coordinar los detalles finales y confirmar
                                                el precio exacto.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                    {/* Formulario de configuración */}
                                    <div className="lg:col-span-2">
                                        <form onSubmit={(e) => handleCustomOrderSubmit(e, 'pedido')} className="space-y-6">
                                            {/* Tipo de Postre */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <Cake className="w-4 h-4" />
                                                    Tipo de Postre
                                                </label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {opcionesPersonalizadas.tipos.map((tipo) => (
                                                        <button
                                                            key={tipo.value}
                                                            type="button"
                                                            onClick={() => handleTipoChange(tipo.value)}
                                                            className={`
                                                                p-3 rounded-lg border transition-all duration-200 text-left
                                                                flex items-center gap-2
                                                                ${customOrder.tipo === tipo.value
                                                                    ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                }
                                                            `}
                                                        >
                                                            <tipo.icon className="w-5 h-5" />
                                                            <span className="font-medium">{tipo.label}</span>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Sabor */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Sabor Principal
                                                </label>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {saboresDisponibles.map((sabor) => (
                                                        <button
                                                            key={sabor.value}
                                                            type="button"
                                                            onClick={() => setCustomOrder({...customOrder, sabor: sabor.value})}
                                                            className={`
                                                                p-3 rounded-lg border transition-all duration-200 text-left
                                                                ${customOrder.sabor === sabor.value
                                                                    ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                }
                                                            `}
                                                        >
                                                            <div className="flex justify-between items-center">
                                                                <span className="font-medium">{sabor.label}</span>
                                                                <span className="text-sm font-semibold text-pink-600">
                                                                    {sabor.price}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Tamaño (solo para pasteles, tartas y cheesecakes) */}
                                            {configActual.tieneTamaño && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Tamaño ({configActual.unidades})
                                                    </label>
                                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                        {opcionesPersonalizadas.tamaños.map((tamaño) => (
                                                            <button
                                                                key={tamaño.value}
                                                                type="button"
                                                                onClick={() => setCustomOrder({...customOrder, tamaño: tamaño.value})}
                                                                className={`
                                                                    p-3 rounded-lg border transition-all duration-200 text-left
                                                                    ${customOrder.tamaño === tamaño.value
                                                                        ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                        : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                    }
                                                                `}
                                                            >
                                                                <div>
                                                                    <span className="font-medium block">{tamaño.label}</span>
                                                                    <span className="text-xs text-gray-500 mt-1">
                                                                        Multiplicador: {tamaño.multiplier}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Cantidad (solo para cupcakes y galletas) */}
                                            {configActual.tieneCantidad && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Cantidad ({configActual.unidades})
                                                    </label>
                                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                        {opcionesPersonalizadas.cantidades[customOrder.tipo]?.map((cantidad) => (
                                                            <button
                                                                key={cantidad.value}
                                                                type="button"
                                                                onClick={() => setCustomOrder({...customOrder, cantidad: cantidad.value})}
                                                                className={`
                                                                    p-3 rounded-lg border transition-all duration-200 text-left
                                                                    ${customOrder.cantidad === cantidad.value
                                                                        ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                        : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                    }
                                                                `}
                                                            >
                                                                <div>
                                                                    <span className="font-medium block">{cantidad.label}</span>
                                                                    <span className="text-xs text-gray-500 mt-1">
                                                                        Multiplicador: {cantidad.multiplier}
                                                                    </span>
                                                                </div>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Relleno (solo para pasteles y cupcakes) */}
                                            {configActual.tieneRelleno && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                        <Layers className="w-4 h-4" />
                                                        Relleno
                                                    </label>
                                                    <div className="space-y-2">
                                                        {opcionesPersonalizadas.rellenos.map((relleno) => (
                                                            <button
                                                                key={relleno.value}
                                                                type="button"
                                                                onClick={() => setCustomOrder({...customOrder, relleno: relleno.value})}
                                                                className={`
                                                                    flex justify-between items-center w-full p-3 rounded-lg border transition-all duration-200
                                                                    ${customOrder.relleno === relleno.value
                                                                        ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                        : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                    }
                                                                `}
                                                            >
                                                                <span className="font-medium">{relleno.label}</span>
                                                                <span className="text-sm font-semibold text-pink-600">
                                                                    {relleno.price}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Betún (solo para pasteles y cupcakes) */}
                                            {configActual.tieneBetun && (
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                        <Palette className="w-4 h-4" />
                                                        Betún/Cobertura
                                                    </label>
                                                    <div className="space-y-2">
                                                        {opcionesPersonalizadas.betunes.map((betun) => (
                                                            <button
                                                                key={betun.value}
                                                                type="button"
                                                                onClick={() => setCustomOrder({...customOrder, betun: betun.value})}
                                                                className={`
                                                                    flex justify-between items-center w-full p-3 rounded-lg border transition-all duration-200
                                                                    ${customOrder.betun === betun.value
                                                                        ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                        : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                    }
                                                                `}
                                                            >
                                                                <span className="font-medium">{betun.label}</span>
                                                                <span className="text-sm font-semibold text-pink-600">
                                                                    {betun.price}
                                                                </span>
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Decoración (para todos) */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Nivel de Decoración
                                                </label>
                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                                    {opcionesPersonalizadas.decoraciones.map((decoracion) => (
                                                        <button
                                                            key={decoracion.value}
                                                            type="button"
                                                            onClick={() => setCustomOrder({...customOrder, decoracion: decoracion.value})}
                                                            className={`
                                                                p-3 rounded-lg border transition-all duration-200 text-center
                                                                ${customOrder.decoracion === decoracion.value
                                                                    ? 'bg-pink-50 border-pink-500 text-pink-600'
                                                                    : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                                                                }
                                                            `}
                                                        >
                                                            <div>
                                                                <span className="font-medium block">{decoracion.label}</span>
                                                                <span className="text-sm font-semibold text-pink-600 mt-1">
                                                                    {decoracion.price}
                                                                </span>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Imagen de referencia */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <ImageIcon className="w-4 h-4" />
                                                    Imagen de Referencia (Opcional)
                                                </label>
                                                <div className="space-y-3">
                                                    {customOrder.imagenPreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={customOrder.imagenPreview}
                                                                alt="Referencia"
                                                                className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300"
                                                            />
                                                            <button
                                                                type="button"
                                                                onClick={handleRemoveImage}
                                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                Haz clic en la X para eliminar la imagen
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-400 transition-colors"
                                                            onClick={() => fileInputRef.current?.click()}
                                                        >
                                                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                            <p className="text-sm text-gray-600">
                                                                Haz clic para subir una imagen de referencia
                                                            </p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                JPG, PNG (Máx. 5MB)
                                                            </p>
                                                        </div>
                                                    )}
                                                    <input
                                                        ref={fileInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleImageUpload}
                                                        className="hidden"
                                                    />
                                                    <p className="text-xs text-gray-500">
                                                        Puedes subir una foto de referencia para ayudarnos a entender mejor tu idea.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Temática Especial */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <Gift className="w-4 h-4" />
                                                    Temática Especial (Opcional)
                                                </label>
                                                <input
                                                    type="text"
                                                    value={customOrder.tematica}
                                                    onChange={(e) => setCustomOrder({...customOrder, tematica: e.target.value})}
                                                    placeholder="Ej: Superhéroes, Princesas, Deportes, Empresarial, etc."
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Temas complejos tienen costo adicional de $100
                                                </p>
                                            </div>

                                            {/* Mensaje Personalizado */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <MessageSquare className="w-4 h-4" />
                                                    Mensaje Personalizado (Opcional)
                                                </label>
                                                <textarea
                                                    value={customOrder.mensaje}
                                                    onChange={(e) => setCustomOrder({...customOrder, mensaje: e.target.value})}
                                                    rows="2"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    placeholder="Ej: 'Feliz Cumpleaños María', 'Felicidades', 'Te Amo', etc."
                                                />
                                            </div>

                                            {/* Notas Adicionales */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                                    <Info className="w-4 h-4" />
                                                    Notas Adicionales (Opcional)
                                                </label>
                                                <textarea
                                                    value={customOrder.notas}
                                                    onChange={(e) => setCustomOrder({...customOrder, notas: e.target.value})}
                                                    rows="3"
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                                    placeholder="Alergias, restricciones dietéticas, colores específicos, preferencias de diseño..."
                                                />
                                                <p className="text-xs text-gray-500 mt-1">
                                                    Estas notas nos ayudan a personalizar mejor tu pedido
                                                </p>
                                            </div>
                                        </form>
                                    </div>

                                    {/* Resumen y Precio */}
                                    <div className="lg:col-span-1">
                                        <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
                                            <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                                                <DollarSign className="w-5 h-5 text-pink-500" />
                                                Resumen del Pedido
                                            </h4>

                                            {/* Descripción del tipo */}
                                            <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-semibold">{customOrder.tipo.charAt(0).toUpperCase() + customOrder.tipo.slice(1)}</span>: {configActual.descripcion}
                                                </p>
                                            </div>

                                            {/* Detalles del precio */}
                                            <div className="space-y-3 mb-6">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Base {customOrder.tipo}</span>
                                                    <span className="font-medium">${precioCalculado.base}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Sabor seleccionado</span>
                                                    <span className="font-medium">+${precioCalculado.sabor}</span>
                                                </div>

                                                {configActual.tieneTamaño && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Tamaño ({customOrder.tamaño})</span>
                                                        <span className="font-medium">x{precioCalculado.tamaño}</span>
                                                    </div>
                                                )}

                                                {configActual.tieneCantidad && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Cantidad ({customOrder.cantidad})</span>
                                                        <span className="font-medium">x{precioCalculado.cantidad}</span>
                                                    </div>
                                                )}

                                                {configActual.tieneRelleno && precioCalculado.relleno > 0 && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Relleno adicional</span>
                                                        <span className="font-medium">+${precioCalculado.relleno}</span>
                                                    </div>
                                                )}

                                                {configActual.tieneBetun && precioCalculado.betun > 0 && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Betún especial</span>
                                                        <span className="font-medium">+${precioCalculado.betun}</span>
                                                    </div>
                                                )}

                                                {precioCalculado.decoracion > 0 && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Decoración</span>
                                                        <span className="font-medium">+${precioCalculado.decoracion}</span>
                                                    </div>
                                                )}

                                                {precioCalculado.tematica > 0 && (
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-gray-600">Temática especial</span>
                                                        <span className="font-medium">+${precioCalculado.tematica}</span>
                                                    </div>
                                                )}

                                                <div className="h-px bg-gray-300 my-2"></div>

                                                <div className="flex justify-between items-center">
                                                    <span className="font-bold text-gray-800">Total estimado</span>
                                                    <span className="text-2xl font-bold text-pink-600">
                                                        ${precioCalculado.total}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Advertencia de precio */}
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
                                                <div className="flex items-start gap-2">
                                                    <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                                    <p className="text-xs text-blue-700">
                                                        <strong>Precio estimado en tiempo real</strong>. Para pedidos muy complejos o con imágenes de referencia, el precio final puede ajustarse después de evaluar la viabilidad.
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Botones de acción */}
                                            <div className="space-y-3">
                                                <button
                                                    onClick={(e) => handleCustomOrderSubmit(e, 'pedido')}
                                                    className="w-full bg-gradient-to-r text-sm from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                                >
                                                    <ShoppingCart className="w-5 h-5" />
                                                    Confirmar Pedido - ${precioCalculado.total}
                                                </button>

                                                <button
                                                    onClick={() => setShowCustomOrder(false)}
                                                    className="w-full text-gray-600 bg-gray-200 rounded-lg hover:text-gray-800 py-2 text-sm transition-colors"
                                                >
                                                    Cancelar
                                                </button>
                                            </div>

                                            {/* Información adicional */}
                                            <div className="mt-6 pt-6 border-t border-gray-200">
                                                <p className="text-xs text-gray-500">
                                                    📞 <strong>Nota importante:</strong> Si subes una imagen de referencia, un repostero se contactará contigo para confirmar que podemos replicar el diseño y ajustar el precio si es necesario.
                                                </p>
                                            </div>
                                        </div>
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
