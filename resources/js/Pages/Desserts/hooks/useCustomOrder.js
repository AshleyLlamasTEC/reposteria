import { useState, useCallback, useRef, useEffect } from 'react';
import { Cake } from 'lucide-react';
import { calculateCustomOrderPrice } from '../utils/customOrderPricing';

// Configuración por tipo de postre (idéntica a la original)
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

// Opciones personalizadas (idéntica a la original)
const opcionesPersonalizadas = {
  tipos: [
    { value: 'pastel', label: 'Pastel Tradicional', icon: Cake },
    { value: 'tarta', label: 'Tarta', icon: Cake },
    { value: 'cupcakes', label: 'Cupcakes', icon: Cake },
    { value: 'galletas', label: 'Galletas Personalizadas', icon: Cake },
    { value: 'cheesecake', label: 'Cheesecake', icon: Cake }
  ],
  sabores: {
    pastel: [
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
    tarta: [
      { value: 'chocolate', label: 'Chocolate', price: '+$45' },
      { value: 'vainilla', label: 'Vainilla', price: '+$38' },
      { value: 'fresa', label: 'Fresa', price: '+$42' },
      { value: 'limón', label: 'Limón', price: '+$40' },
      { value: 'manzana-canela', label: 'Manzana con Canela', price: '+$52' },
      { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$55' },
      { value: 'fresa-queso', label: 'Fresa con Queso', price: '+$54' }
    ],
    cupcakes: [
      { value: 'chocolate', label: 'Chocolate', price: '+$40' },
      { value: 'vainilla', label: 'Vainilla', price: '+$35' },
      { value: 'fresa', label: 'Fresa', price: '+$38' },
      { value: 'limón', label: 'Limón', price: '+$36' },
      { value: 'red-velvet', label: 'Red Velvet', price: '+$45' },
      { value: 'coco', label: 'Coco', price: '+$40' },
      { value: 'cafe', label: 'Café', price: '+$45' },
      { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$50' }
    ],
    galletas: [
      { value: 'chocolate', label: 'Chocolate', price: '+$35' },
      { value: 'vainilla', label: 'Vainilla', price: '+$30' },
      { value: 'fresa', label: 'Fresa', price: '+$32' },
      { value: 'limón', label: 'Limón', price: '+$31' },
      { value: 'red-velvet', label: 'Red Velvet', price: '+$40' },
      { value: 'coco', label: 'Coco', price: '+$35' },
      { value: 'cafe', label: 'Café', price: '+$40' },
      { value: 'frutos-rojos', label: 'Frutos Rojos', price: '+$45' }
    ],
    cheesecake: [
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
    cupcakes: [
      { value: 6, label: '6 cupcakes', multiplier: '0.5x' },
      { value: 12, label: '12 cupcakes', multiplier: '1x' },
      { value: 24, label: '24 cupcakes', multiplier: '1.8x' },
      { value: 36, label: '36 cupcakes', multiplier: '2.5x' },
      { value: 48, label: '48 cupcakes', multiplier: '3x' }
    ],
    galletas: [
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

/**
 * Hook personalizado para gestionar el estado del pedido personalizado.
 * Expone todo lo necesario para el modal y formulario.
 */
export function useCustomOrder() {
  const [showCustomOrder, setShowCustomOrder] = useState(false);
  const [customOrder, setCustomOrder] = useState({
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
  const fileInputRef = useRef(null);

  const configActual = configuracionesPorTipo[customOrder.tipo] || configuracionesPorTipo.pastel;
  const saboresDisponibles = opcionesPersonalizadas.sabores[customOrder.tipo] || opcionesPersonalizadas.sabores.pastel;

  const precioCalculado = calculateCustomOrderPrice(customOrder);

  const updateCustomOrder = useCallback((updates) => {
    setCustomOrder(prev => ({ ...prev, ...updates }));
  }, []);

  const handleTipoChange = useCallback((tipo) => {
    setCustomOrder(prev => ({
      tipo,
      sabor: 'chocolate',
      tamaño: 'mediano',
      relleno: 'crema',
      betun: 'mantequilla',
      decoracion: 'basica',
      cantidad: 12,
      tematica: '',
      mensaje: '',
      notas: '',
      imagenReferencia: prev.imagenReferencia,
      imagenPreview: prev.imagenPreview
    }));
  }, []);

  const handleImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen es muy grande. Por favor selecciona una imagen menor a 5MB.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido (JPG, PNG, etc.).');
      return;
    }
    // Revocar la URL anterior si existe
    setCustomOrder(prev => {
      if (prev.imagenPreview) {
        URL.revokeObjectURL(prev.imagenPreview);
      }
      return {
        ...prev,
        imagenReferencia: file,
        imagenPreview: URL.createObjectURL(file)
      };
    });
  }, []);

  const handleRemoveImage = useCallback(() => {
    setCustomOrder(prev => {
      if (prev.imagenPreview) {
        URL.revokeObjectURL(prev.imagenPreview);
      }
      return {
        ...prev,
        imagenReferencia: null,
        imagenPreview: null
      };
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const resetForm = useCallback(() => {
    setCustomOrder(prev => {
      if (prev.imagenPreview) {
        URL.revokeObjectURL(prev.imagenPreview);
      }
      return {
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
      };
    });
    setShowCustomOrder(false);
  }, []);

  const handleSubmit = useCallback((e, tipo) => {
    e.preventDefault();
    if (tipo === 'pedido') {
      alert(`¡Pedido personalizado confirmado!\n\nTotal: $${precioCalculado.total}\n\nTe contactaremos para confirmar detalles y fecha de entrega.`);
    } else {
      alert('¡Solicitud de presupuesto enviada!\n\nTe enviaremos un presupuesto detallado en menos de 24 horas.');
    }
    resetForm();
  }, [precioCalculado.total, resetForm]);

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      setCustomOrder(prev => {
        if (prev.imagenPreview) {
          URL.revokeObjectURL(prev.imagenPreview);
        }
      });
    };
  }, []);

  return {
    showCustomOrder,
    setShowCustomOrder,
    customOrder,
    updateCustomOrder,
    handleTipoChange,
    handleImageUpload,
    handleRemoveImage,
    handleSubmit,
    precioCalculado,
    configActual,
    saboresDisponibles,
    opcionesPersonalizadas,
    fileInputRef
  };
}
