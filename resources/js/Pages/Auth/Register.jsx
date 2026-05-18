import { useEffect } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthHeader from '@/Components/auth/AuthHeader';
import AuthInput from '@/Components/auth/AuthInput';
import AuthButton from '@/Components/auth/AuthButton';
import AuthFooterLinks from '@/Components/auth/AuthFooterLinks';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => reset('password', 'password_confirmation');
  }, []);

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <AuthLayout>
      <Head title="Crear cuenta" />

      <AuthHeader
        title="Crear cuenta"
        subtitle="Únete a nuestra dulce comunidad"
      />

      <form onSubmit={submit} className="space-y-4">
        <AuthInput
          label="Nombre completo"
          icon="user"
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="María García"
          autoComplete="name"
          autoFocus
        />

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
          autoComplete="new-password"
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
          {processing ? 'Creando cuenta...' : 'Crear cuenta'}
        </AuthButton>

        <AuthFooterLinks
          links={[
            { href: route('login'), label: '¿Ya tienes cuenta? Inicia sesión' },
          ]}
        />
      </form>
    </AuthLayout>
  );
}
