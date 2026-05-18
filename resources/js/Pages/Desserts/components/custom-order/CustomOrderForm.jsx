import { Cake, Layers, Palette, Gift, MessageSquare, Info } from 'lucide-react';
import ImageUploader from './ImageUploader';

export default function CustomOrderForm({
  customOrder,
  updateCustomOrder,
  handleTipoChange,
  handleImageUpload,
  handleRemoveImage,
  fileInputRef,
  configActual,
  saboresDisponibles,
  opcionesPersonalizadas
}) {
  return (
    <form onSubmit={(e) => { e.preventDefault(); /* handle submit from outside */ }} className="space-y-6">
      {/* Tipo de Postre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
          <Cake className="w-4 h-4" /> Tipo de Postre
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {opcionesPersonalizadas.tipos.map((tipo) => (
            <button key={tipo.value} type="button" onClick={() => handleTipoChange(tipo.value)}
              className={`p-3 rounded-lg border transition-all duration-200 text-left flex items-center gap-2 ${
                customOrder.tipo === tipo.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              <tipo.icon className="w-5 h-5" />
              <span className="font-medium">{tipo.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sabor */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Sabor Principal</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {saboresDisponibles.map((sabor) => (
            <button key={sabor.value} type="button" onClick={() => updateCustomOrder({ sabor: sabor.value })}
              className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                customOrder.sabor === sabor.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{sabor.label}</span>
                <span className="text-sm font-semibold text-pink-600">{sabor.price}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tamaño */}
      {configActual.tieneTamaño && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tamaño ({configActual.unidades})</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {opcionesPersonalizadas.tamaños.map((tamaño) => (
              <button key={tamaño.value} type="button" onClick={() => updateCustomOrder({ tamaño: tamaño.value })}
                className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                  customOrder.tamaño === tamaño.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <div>
                  <span className="font-medium block">{tamaño.label}</span>
                  <span className="text-xs text-gray-500 mt-1">Multiplicador: {tamaño.multiplier}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Cantidad */}
      {configActual.tieneCantidad && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Cantidad ({configActual.unidades})</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {opcionesPersonalizadas.cantidades[customOrder.tipo]?.map((cantidad) => (
              <button key={cantidad.value} type="button" onClick={() => updateCustomOrder({ cantidad: cantidad.value })}
                className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                  customOrder.cantidad === cantidad.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <div>
                  <span className="font-medium block">{cantidad.label}</span>
                  <span className="text-xs text-gray-500 mt-1">Multiplicador: {cantidad.multiplier}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Relleno */}
      {configActual.tieneRelleno && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Layers className="w-4 h-4" /> Relleno</label>
          <div className="space-y-2">
            {opcionesPersonalizadas.rellenos.map((relleno) => (
              <button key={relleno.value} type="button" onClick={() => updateCustomOrder({ relleno: relleno.value })}
                className={`flex justify-between items-center w-full p-3 rounded-lg border transition-all duration-200 ${
                  customOrder.relleno === relleno.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <span className="font-medium">{relleno.label}</span>
                <span className="text-sm font-semibold text-pink-600">{relleno.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Betún */}
      {configActual.tieneBetun && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Palette className="w-4 h-4" /> Betún/Cobertura</label>
          <div className="space-y-2">
            {opcionesPersonalizadas.betunes.map((betun) => (
              <button key={betun.value} type="button" onClick={() => updateCustomOrder({ betun: betun.value })}
                className={`flex justify-between items-center w-full p-3 rounded-lg border transition-all duration-200 ${
                  customOrder.betun === betun.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <span className="font-medium">{betun.label}</span>
                <span className="text-sm font-semibold text-pink-600">{betun.price}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Decoración */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de Decoración</label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {opcionesPersonalizadas.decoraciones.map((decoracion) => (
            <button key={decoracion.value} type="button" onClick={() => updateCustomOrder({ decoracion: decoracion.value })}
              className={`p-3 rounded-lg border transition-all duration-200 text-center ${
                customOrder.decoracion === decoracion.value ? 'bg-pink-50 border-pink-500 text-pink-600' : 'border-gray-300 hover:border-pink-300 hover:bg-pink-50'
              }`}
            >
              <span className="font-medium block">{decoracion.label}</span>
              <span className="text-sm font-semibold text-pink-600 mt-1">{decoracion.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Imagen de referencia */}
      <ImageUploader
        imagenPreview={customOrder.imagenPreview}
        onUpload={handleImageUpload}
        onRemove={handleRemoveImage}
        fileInputRef={fileInputRef}
      />

      {/* Temática Especial */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Gift className="w-4 h-4" /> Temática Especial (Opcional)</label>
        <input
          type="text"
          value={customOrder.tematica}
          onChange={(e) => updateCustomOrder({ tematica: e.target.value })}
          placeholder="Ej: Superhéroes, Princesas, Deportes, Empresarial, etc."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        />
        <p className="text-xs text-gray-500 mt-1">Temas complejos tienen costo adicional de $100</p>
      </div>

      {/* Mensaje Personalizado */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Mensaje Personalizado (Opcional)</label>
        <textarea
          value={customOrder.mensaje}
          onChange={(e) => updateCustomOrder({ mensaje: e.target.value })}
          rows="2"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Ej: 'Feliz Cumpleaños María', 'Felicidades', 'Te Amo', etc."
        />
      </div>

      {/* Notas Adicionales */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"><Info className="w-4 h-4" /> Notas Adicionales (Opcional)</label>
        <textarea
          value={customOrder.notas}
          onChange={(e) => updateCustomOrder({ notas: e.target.value })}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          placeholder="Alergias, restricciones dietéticas, colores específicos, preferencias de diseño..."
        />
        <p className="text-xs text-gray-500 mt-1">Estas notas nos ayudan a personalizar mejor tu pedido</p>
      </div>
    </form>
  );
}
