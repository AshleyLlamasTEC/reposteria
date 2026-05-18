/**
 * Botón principal con gradiente rosa-púrpura.
 * Estilo idéntico al botón de "Pedido Personalizado" del catálogo.
 */
export default function AuthButton({ children, disabled, className = '', ...props }) {
  return (
    <button
      disabled={disabled}
      className={`w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
