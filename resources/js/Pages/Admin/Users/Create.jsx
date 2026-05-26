import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';
import Input from '@/Components/ui/Input';
import Button from '@/Components/ui/Button';
import { useForm } from '@inertiajs/react';
import FormSection from '@/Components/Admin/Forms/FormSection';

export default function CreateUser() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.users.store'));
  };

  return (
    <AdminLayout>
      <PageHeader title="Nuevo usuario" subtitle="Crea una nueva cuenta de usuario" />
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Información básica" description="Datos personales del usuario.">
            <div className="grid gap-4">
              <Input
                placeholder="Nombre completo"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                error={errors.name}
              />
              <Input
                type="email"
                placeholder="Correo electrónico"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                error={errors.email}
              />
            </div>
          </FormSection>
          <FormSection title="Seguridad" description="Elige una contraseña segura.">
            <div className="grid gap-4">
              <Input
                type="password"
                placeholder="Contraseña"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                error={errors.password}
              />
              <Input
                type="password"
                placeholder="Confirmar contraseña"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
              />
            </div>
          </FormSection>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => history.back()}>Cancelar</Button>
            <Button disabled={processing}>Crear usuario</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
