import { motion } from 'framer-motion';
import AuthCard from '@/Components/auth/AuthCard';
import AuthIllustration from '@/Components/auth/AuthIllustration';

/**
 * Layout para páginas de autenticación.
 * Fondo con gradiente suave, centrado vertical y horizontal,
 * animación de entrada.
 */
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 sm:p-6 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <AuthIllustration />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10"
      >
        <AuthCard>
          {children}
        </AuthCard>
      </motion.div>
    </div>
  );
}
