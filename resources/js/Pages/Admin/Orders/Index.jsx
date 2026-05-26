import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';
import DataTable from '@/Components/Admin/Tables/DataTable';
import Badge from '@/Components/ui/Badge';
import { statusLabels } from '@/Utils/status.colors';
import { formatCurrency, formatDate } from '@/Utils/formatters';
import Button from '@/Components/ui/Button';
import { Eye } from 'lucide-react';

export default function OrdersIndex() {
  const { orders, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || '');
  const [statusFilter, setStatusFilter] = useState(filters?.status || '');

  const columns = [
    { key: 'folio', label: 'Folio', render: (order) => <span className="font-medium">#{order.folio}</span> },
    { key: 'user', label: 'Cliente', render: (order) => order.user?.name || 'N/A' },
    { key: 'total', label: 'Total', render: (order) => formatCurrency(order.total) },
    { key: 'status', label: 'Estado', render: (order) => <Badge status={order.status}>{statusLabels[order.status]}</Badge> },
    { key: 'created_at', label: 'Fecha', render: (order) => formatDate(order.created_at) },
    {
      key: 'actions',
      label: '',
      render: (order) => (
        <Link href={route('admin.orders.show', order.id)} className="p-1 text-gray-500 hover:text-pink-600">
          <Eye className="w-4 h-4" />
        </Link>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader title="Pedidos" subtitle="Gestión completa de pedidos" />
      <DataTable
        columns={columns}
        data={orders.data}
        pagination={orders}
        searchValue={search}
        onSearchChange={setSearch}
        filters={{ status: statusFilter }}
        onFilterChange={(key, value) => key === 'status' && setStatusFilter(value)}
      />
    </AdminLayout>
  );
}
