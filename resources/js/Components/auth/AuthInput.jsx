import { forwardRef } from 'react';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

/**
 * Input estilizado para formularios de autenticación.
 * Incluye ícono, label, focus ring rosa y mensaje de error.
 *
 * @param {string} label - Etiqueta en español
 * @param {string} icon - Nombre del ícono (user, mail, lock)
 * @param {string} error - Mensaje de error
 * @param {object} props - Resto de props del input
 */
const iconMap = {
  user: User,
  mail: Mail,
  lock: Lock,
};

export default forwardRef(function AuthInput({ label, icon, error, type, ...props }, ref) {
  const [showPassword, setShowPassword] = useState(false);
  const IconComponent = iconMap[icon] || Mail;
  const isPassword = type === 'password';

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {/* Ícono izquierdo */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          <IconComponent className="w-5 h-5" />
        </div>

        <input
          ref={ref}
          type={isPassword && showPassword ? 'text' : type}
          className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all duration-200 bg-white placeholder-gray-400 text-gray-800 ${
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-200 hover:border-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500'
          }`}
          {...props}
        />

        {/* Botón para mostrar/ocultar contraseña */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-pink-500 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
          {error}
        </p>
      )}
    </div>
  );
});
