import PriceBreakdown from './PriceBreakdown';
import { ShoppingCart } from 'lucide-react';

export default function CustomOrderSummary({
  precioCalculado,
  configActual,
  customOrder,
  onConfirm,
  onCancel
}) {
  return (
    <div className="lg:col-span-1">
      <PriceBreakdown precioCalculado={precioCalculado} configActual={configActual} customOrder={customOrder} />
      <div className="space-y-3">
        <button
          onClick={(e) => onConfirm(e, 'pedido')}
          className="w-full bg-gradient-to-r text-sm from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Confirmar Pedido - ${precioCalculado.total}
        </button>
        <button onClick={onCancel} className="w-full text-gray-600 bg-gray-200 rounded-lg hover:text-gray-800 py-2 text-sm transition-colors">
          Cancelar
        </button>
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          📞 <strong>Nota importante:</strong> Si subes una imagen de referencia, un repostero se contactará contigo para confirmar que podemos replicar el diseño y ajustar el precio si es necesario.
        </p>
      </div>
    </div>
  );
}
