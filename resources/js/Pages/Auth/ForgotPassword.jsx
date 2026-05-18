import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthHeader from '@/Components/auth/AuthHeader';
import AuthInput from '@/Components/auth/AuthInput';
import AuthButton from '@/Components/auth/AuthButton';
import AuthFooterLinks from '@/Components/auth/AuthFooterLinks';

export default function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: '',
  });

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const submit = (e) => {
    e.preventDefault();
    post(route('password.email'));
  };

  return (
    <AuthLayout>
      <Head title="Recuperar contraseña" />

      <AuthHeader
        title="Recuperar contraseña"
        subtitle="No te preocupes, te ayudaremos a recuperar tu acceso"
      />

      {status && (
        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
          {status}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <AuthInput
          label="Correo electrónico"
          icon="mail"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="tu@correo.com"
          autoComplete="email"
          autoFocus
        />

        <AuthButton disabled={processing}>
          {processing ? 'Enviando enlace...' : 'Enviar enlace de recuperación'}
        </AuthButton>

        <AuthFooterLinks
          links={[
            { href: route('login'), label: 'Volver a inicio de sesión' },
          ]}
        />
      </form>
    </AuthLayout>
  );
}
