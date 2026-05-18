import { Head, Link, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthHeader from '@/Components/auth/AuthHeader';
import AuthButton from '@/Components/auth/AuthButton';

export default function VerifyEmail({ status }) {
  const { post, processing } = useForm({});

  const submit = (e) => {
    e.preventDefault();
    post(route('verification.send'));
  };

  return (
    <AuthLayout>
      <Head title="Verificar correo" />

      <AuthHeader
        title="Verifica tu correo"
        subtitle="Gracias por registrarte. Revisa tu bandeja de entrada"
      />

      {status === 'verification-link-sent' && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
          Te hemos enviado un nuevo enlace de verificación a tu correo.
        </div>
      )}

      <div className="text-sm text-gray-600 mb-6 text-center space-y-2">
        <p>
          Antes de continuar, por favor haz clic en el enlace de verificación que enviamos a tu correo.
        </p>
        <p>
          Si no recibiste el correo, podemos enviarte otro.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <AuthButton disabled={processing}>
          {processing ? 'Reenviando...' : 'Reenviar correo de verificación'}
        </AuthButton>

        <div className="text-center">
          <Link
            href={route('logout')}
            method="post"
            className="text-sm text-gray-600 hover:text-pink-600 transition-colors font-medium"
          >
            Cerrar sesión
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}
