import { useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import AuthHeader from '@/Components/auth/AuthHeader';
import AuthInput from '@/Components/auth/AuthInput';
import AuthButton from '@/Components/auth/AuthButton';

export default function ConfirmPassword() {
  const { data, setData, post, processing, errors, reset } = useForm({
    password: '',
  });

  const handleChange = (e) => setData(e.target.name, e.target.value);

  const submit = (e) => {
    e.preventDefault();
    post(route('password.confirm'));
  };

  return (
    <AuthLayout>
      <Head title="Confirmar contraseña" />

      <AuthHeader
        title="Confirma tu contraseña"
        subtitle="Esta es un área segura de la aplicación"
      />

      <div className="mb-4 text-sm text-gray-600 text-center">
        Por favor, confirma tu contraseña antes de continuar.
      </div>

      <form onSubmit={submit} className="space-y-4">
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
          autoFocus
        />

        <AuthButton disabled={processing}>
          {processing ? 'Confirmando...' : 'Confirmar'}
        </AuthButton>
      </form>
    </AuthLayout>
  );
}
