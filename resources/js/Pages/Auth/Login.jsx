import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthHeader from '@/Components/auth/AuthHeader';
import AuthInput from '@/Components/auth/AuthInput';
import AuthCheckbox from '@/Components/auth/AuthCheckbox';
import AuthButton from '@/Components/auth/AuthButton';
import AuthFooterLinks from '@/Components/auth/AuthFooterLinks';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  useEffect(() => {
    return () => reset('password');
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setData(e.target.name, value);
  };

  const submit = (e) => {
    e.preventDefault();
    post(route('login'));
  };

  return (
    <AuthLayout>
      <Head title="Iniciar sesión" />

      <AuthHeader
        title="Iniciar sesión"
        subtitle="Bienvenida de nuevo a tu pastelería favorita"
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
          autoComplete="username"
          autoFocus
        />

        <AuthInput
          label="Contraseña"
          icon="lock"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <AuthCheckbox
            checked={data.remember}
            onChange={handleChange}
            label="Recordarme"
            name="remember"
          />
        </div>

        <AuthButton disabled={processing}>
          {processing ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </AuthButton>

        <AuthFooterLinks
          links={[
            ...(canResetPassword
              ? [{ href: route('password.request'), label: '¿Olvidaste tu contraseña?' }]
              : []),
            { href: route('register'), label: '¿No tienes cuenta? Regístrate' },
          ]}
        />
      </form>
    </AuthLayout>
  );
}
