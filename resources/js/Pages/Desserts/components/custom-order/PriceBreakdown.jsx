import { DollarSign, Info } from 'lucide-react';

export default function PriceBreakdown({ precioCalculado, configActual, customOrder }) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
      <h4 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
        <DollarSign className="w-5 h-5 text-pink-500" />
        Resumen del Pedido
      </h4>

      <div className="mb-4 p-3 bg-white rounded-lg border border-gray-200">
        <p className="text-sm text-gray-600">
          <span className="font-semibold">{customOrder.tipo.charAt(0).toUpperCase() + customOrder.tipo.slice(1)}</span>: {configActual.descripcion}
        </p>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm"><span className="text-gray-600">Base {customOrder.tipo}</span><span className="font-medium">${precioCalculado.base}</span></div>
        <div className="flex justify-between text-sm"><span className="text-gray-600">Sabor seleccionado</span><span className="font-medium">+${precioCalculado.sabor}</span></div>

        {configActual.tieneTamaño && (
          <div className="flex justify-between text-sm"><span className="text-gray-600">Tamaño ({customOrder.tamaño})</span><span className="font-medium">x{precioCalculado.tamaño}</span></div>
        )}

        {configActual.tieneCantidad && (
          <div className="flex justify-between text-sm"><span className="text-gray-600">Cantidad ({customOrder.cantidad})</span><span className="font-medium">x{precioCalculado.cantidad}</span></div>
        )}

        {configActual.tieneRelleno && precioCalculado.relleno > 0 && (
          <div className="flex justify-between text-sm"><span className="text-gray-600">Relleno adicional</span><span className="font-medium">+${precioCalculado.relleno}</span></div>
        )}

        {configActual.tieneBetun && precioCalculado.betun > 0 && (
          <div className="flex justify-between text-sm"><span className="text-gray-600">Betún especial</span><span className="font-medium">+${precioCalculado.betun}</span></div>
        )}

        {precioCalculado.decoracion > 0 && (
          <div className="flex justify-between text-sm"><span className="text-gray-600">Decoración</span><span className="font-medium">+${precioCalculado.decoracion}</span></div>
        )}

        {precioCalculado.tematica > 0 && (
          <div className="flex justify-between text-sm"><span className="text-gray-600">Temática especial</span><span className="font-medium">+${precioCalculado.tematica}</span></div>
        )}

        <div className="h-px bg-gray-300 my-2"></div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-gray-800">Total estimado</span>
          <span className="text-2xl font-bold text-pink-600">${precioCalculado.total}</span>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-700">
            <strong>Precio estimado en tiempo real</strong>. Para pedidos muy complejos o con imágenes de referencia, el precio final puede ajustarse después de evaluar la viabilidad.
          </p>
        </div>
      </div>
    </div>
  );
}
