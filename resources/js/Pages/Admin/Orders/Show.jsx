import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';
import Card from '@/Components/ui/Card';
import Badge from '@/Components/ui/Badge';
import { statusLabels } from '@/Utils/status.colors';
import { formatCurrency, formatDate } from '@/Utils/formatters';
import Button from '@/Components/ui/Button';

export default function ShowOrder({ order }) {
  return (
    <AdminLayout>
      <PageHeader title={`Pedido #${order.folio}`} subtitle={`Realizado el ${formatDate(order.created_at)}`} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4">Detalles del pedido</h3>
          <div className="space-y-3 text-sm">
            <p><span className="font-medium">Cliente:</span> {order.user?.name} ({order.user?.email})</p>
            <p><span className="font-medium">Estado:</span> <Badge status={order.status}>{statusLabels[order.status]}</Badge></p>
            <p><span className="font-medium">Total:</span> {formatCurrency(order.total)}</p>
            <p><span className="font-medium">Notas:</span> {order.notes || 'Ninguna'}</p>
          </div>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-4">Acciones</h3>
          <div className="flex flex-col gap-2">
            <Button>Actualizar estado</Button>
            <Button variant="secondary">Imprimir</Button>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
