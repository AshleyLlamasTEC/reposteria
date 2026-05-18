import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, AlertCircle } from 'lucide-react';
import CustomOrderForm from './CustomOrderForm';
import CustomOrderSummary from './CustomOrderSummary';

export default function CustomOrderModal({
  isOpen,
  onClose,
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
}) {
  const onConfirm = (e, tipo) => {
    handleSubmit(e, tipo);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
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
                    <Sparkles className="w-6 h-6 text-pink-500" /> Pedido Personalizado
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">{configActual.descripcion}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

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
                <div className="lg:col-span-2">
                  <CustomOrderForm
                    customOrder={customOrder}
                    updateCustomOrder={updateCustomOrder}
                    handleTipoChange={handleTipoChange}
                    handleImageUpload={handleImageUpload}
                    handleRemoveImage={handleRemoveImage}
                    fileInputRef={fileInputRef}
                    configActual={configActual}
                    saboresDisponibles={saboresDisponibles}
                    opcionesPersonalizadas={opcionesPersonalizadas}
                  />
                </div>

                <CustomOrderSummary
                  precioCalculado={precioCalculado}
                  configActual={configActual}
                  customOrder={customOrder}
                  onConfirm={onConfirm}
                  onCancel={onClose}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
