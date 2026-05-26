import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';

export default function ProductsIndex() {
  return (
    <AdminLayout>
      <PageHeader title="Productos" subtitle="Gestión de catálogo" />
      <p className="text-gray-500">Próximamente.</p>
    </AdminLayout>
  );
}
