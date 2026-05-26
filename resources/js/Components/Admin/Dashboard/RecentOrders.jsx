import { Link } from '@inertiajs/react';
import { formatCurrency, formatDate } from '@/Utils/formatters';
import Badge from '@/Components/ui/Badge';
import { statusLabels } from '@/Utils/status.colors';
import Card from '@/Components/ui/Card';

export default function RecentOrders({ orders = [] }) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Pedidos recientes</h3>
        <Link href={route('admin.orders.index')} className="text-sm text-pink-600 hover:underline font-medium">Ver todos</Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="text-left pb-2 font-medium">Folio</th>
              <th className="text-left pb-2 font-medium">Cliente</th>
              <th className="text-left pb-2 font-medium">Estado</th>
              <th className="text-right pb-2 font-medium">Total</th>
              <th className="text-right pb-2 font-medium">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-8 text-center text-gray-400">No hay pedidos recientes.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-2 font-medium text-gray-900">#{order.folio}</td>
                  <td className="py-2">{order.user?.name || 'Cliente'}</td>
                  <td className="py-2"><Badge status={order.status}>{statusLabels[order.status]}</Badge></td>
                  <td className="py-2 text-right font-semibold">{formatCurrency(order.total)}</td>
                  <td className="py-2 text-right text-gray-500">{formatDate(order.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
