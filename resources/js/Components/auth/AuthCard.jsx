/**
 * Tarjeta contenedora para formularios de autenticación.
 * Mismo estilo que las cards del catálogo.
 */
export default function AuthCard({ children }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl backdrop-blur-sm p-8 sm:p-10">
      {children}
    </div>
  );
}
