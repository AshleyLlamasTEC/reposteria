import { Cake } from 'lucide-react';

/**
 * Cabecera común para las páginas de autenticación.
 * Muestra logo, nombre de la pastelería y un subtítulo cálido.
 */
export default function AuthHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-400 to-red-500 rounded-full mb-4 shadow-lg">
        <Cake className="w-10 h-10 text-white" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
        {title || "Repostería Sweet Stack"}
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        {subtitle || 'Dulces momentos hechos a tu medida'}
      </p>
    </div>
  );
}
