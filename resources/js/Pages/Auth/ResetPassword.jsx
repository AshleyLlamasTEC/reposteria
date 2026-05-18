import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthHeader from '@/Components/auth/AuthHeader';
import AuthInput from '@/Components/auth/AuthInput';
import AuthButton from '@/Components/auth/AuthButton';

export default function ResetPassword({ token, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    token: token,
    email: email,
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => reset('password', 'password_confirmation');
  }, []);

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const submit = (e) => {
    e.preventDefault();
    post(route('password.store'));
  };

  return (
    <AuthLayout>
      <Head title="Restablecer contraseña" />

      <AuthHeader
        title="Nueva contraseña"
        subtitle="Elige una contraseña segura para tu cuenta"
      />

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
          disabled
        />

        <AuthInput
          label="Nueva contraseña"
          icon="lock"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
          autoComplete="new-password"
          autoFocus
        />

        <AuthInput
          label="Confirmar contraseña"
          icon="lock"
          type="password"
          name="password_confirmation"
          value={data.password_confirmation}
          onChange={handleChange}
          error={errors.password_confirmation}
          placeholder="••••••••"
          autoComplete="new-password"
        />

        <AuthButton disabled={processing}>
          {processing ? 'Restableciendo...' : 'Restablecer contraseña'}
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
