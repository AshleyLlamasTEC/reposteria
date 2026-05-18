/**
 * Elementos decorativos sutiles de fondo para el layout de autenticación.
 * Círculos con gradientes y opacidad baja.
 */
export default function AuthIllustration() {
  return (
    <>
      {/* Círculos decorativos */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
    </>
  );
}
