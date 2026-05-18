import { Link } from '@inertiajs/react';

/**
 * Enlaces inferiores comunes en formularios de autenticación.
 * Ej: "¿Olvidaste tu contraseña?", "¿No tienes cuenta? Regístrate"
 */
export default function AuthFooterLinks({ links = [] }) {
  if (links.length === 0) return null;

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="text-pink-600 hover:text-pink-800 transition-colors font-medium"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
