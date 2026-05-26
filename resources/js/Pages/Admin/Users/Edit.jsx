import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';
import Input from '@/Components/ui/Input';
import Button from '@/Components/ui/Button';
import { useForm } from '@inertiajs/react';
import FormSection from '@/Components/Admin/Forms/FormSection';

export default function EditUser({ user }) {
  const { data, setData, post, processing, errors } = useForm({
    _method: 'PUT',
    name: user.name,
    email: user.email,
    password: '',
    password_confirmation: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.users.update', user.id));
  };

  return (
    <AdminLayout>
      <PageHeader title="Editar usuario" subtitle={`Editando a ${user.name}`} />
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormSection title="Información básica">
            <div className="grid gap-4">
              <Input value={data.name} onChange={(e) => setData('name', e.target.value)} error={errors.name} />
              <Input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} error={errors.email} />
            </div>
          </FormSection>
          <FormSection title="Cambiar contraseña (opcional)">
            <div className="grid gap-4">
              <Input type="password" placeholder="Nueva contraseña" onChange={(e) => setData('password', e.target.value)} />
              <Input type="password" placeholder="Confirmar" onChange={(e) => setData('password_confirmation', e.target.value)} />
            </div>
          </FormSection>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" type="button" onClick={() => history.back()}>Cancelar</Button>
            <Button disabled={processing}>Guardar cambios</Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
