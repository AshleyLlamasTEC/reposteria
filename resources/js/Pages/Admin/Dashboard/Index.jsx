import AdminLayout from '@/Components/Admin/Layout/AdminLayout';
import PageHeader from '@/Components/Admin/Shared/PageHeader';
import StatCard from '@/Components/Admin/Dashboard/StatCard';
import QuickActions from '@/Components/Admin/Dashboard/QuickActions';
import RecentOrders from '@/Components/Admin/Dashboard/RecentOrders';
import RevenueChart from '@/Components/Admin/Dashboard/RevenueChart';
import { Users, ShoppingBag, DollarSign, Clock } from 'lucide-react';

// Protegemos el componente con valores por defecto (stats = {})
export default function Dashboard({ stats = {}, recentOrders = [] }) {
  return (
    <AdminLayout>
      <PageHeader title="Dashboard" subtitle="Resumen general de tu negocio" />

      {/* Usamos optional chaining (?.) por seguridad extra */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard title="Usuarios" value={stats?.totalUsers || 0} icon={Users} trend="12" trendLabel="este mes" />
        <StatCard title="Pedidos" value={stats?.totalOrders || 0} icon={ShoppingBag} trend="8" trendLabel="esta semana" />
        <StatCard title="Ingresos" value={`$${stats?.totalRevenue || '0.00'}`} icon={DollarSign} trend="5" trendLabel="vs ayer" />
        <StatCard title="Pendientes" value={stats?.pendingOrders || 0} icon={Clock} badge={`${stats?.pendingOrders || 0} por atender`} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <RecentOrders orders={recentOrders} />
        </div>
        <div className="flex flex-col gap-6">
          <QuickActions />
        </div>
      </div>

      {/* <RevenueChart /> */}
    </AdminLayout>
  );
}
