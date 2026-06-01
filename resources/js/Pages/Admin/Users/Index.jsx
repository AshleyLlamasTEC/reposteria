import { useState } from 'react';
import { usePage, Link } from '@inertiajs/react';
import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';
import DataTable from '@/Components/Admin/Tables/DataTable';
import Avatar from '@/Components/ui/Avatar';
import Button from '@/Components/ui/Button';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function UsersIndex() {
  const { users, filters } = usePage().props;
  const [search, setSearch] = useState(filters?.search || '');

  const columns = [
    { key: 'avatar', label: '', render: (user) => <Avatar src={user.avatar} /> },
    { key: 'name', label: 'Nombre', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    {
      key: 'actions',
      label: 'Acciones',
      render: (user) => (
        <div className="flex items-center gap-2">
          <Link href={route('admin.users.edit', user.id)} className="p-1 text-gray-500 hover:text-pink-600">
            <Pencil className="w-4 h-4" />
          </Link>
          <button className="p-1 text-gray-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Usuarios"
        subtitle="Gestiona todos los usuarios registrados"
        actions={
          <Link href={route('admin.users.create')}>
            <Button><Plus className="w-4 h-4 mr-1" /> Nuevo usuario</Button>
          </Link>
        }
      />

      <DataTable
        columns={columns}
        data={users.data}
        pagination={users}
        searchValue={search}
        onSearchChange={setSearch}
      />
    </AdminLayout>
  );
}
