import { Upload, X, ImageIcon } from 'lucide-react';

export default function ImageUploader({ imagenPreview, onUpload, onRemove, fileInputRef }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <ImageIcon className="w-4 h-4" />
        Imagen de Referencia (Opcional)
      </label>
      <div className="space-y-3">
        {imagenPreview ? (
          <div className="relative">
            <img src={imagenPreview} alt="Referencia" className="w-full h-48 object-cover rounded-lg border-2 border-dashed border-gray-300" />
            <button type="button" onClick={onRemove} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600">
              <X className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-500 mt-1">Haz clic en la X para eliminar la imagen</p>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-pink-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Haz clic para subir una imagen de referencia</p>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG (Máx. 5MB)</p>
          </div>
        )}
        <input ref={fileInputRef} type="file" accept="image/*" onChange={onUpload} className="hidden" />
        <p className="text-xs text-gray-500">Puedes subir una foto de referencia para ayudarnos a entender mejor tu idea.</p>
      </div>
    </div>
  );
}
