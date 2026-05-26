import { LayoutDashboard, Users, ShoppingBag, Package, Layers, Paintbrush, Factory, BarChart3, Settings } from 'lucide-react';

export const navigationConfig = [
  {
    name: 'Dashboard',
    href: route('admin.dashboard'),
    icon: LayoutDashboard,
    pattern: '/admin/dashboard',
  },
  {
    name: 'Usuarios',
    href: route('admin.users.index'),
    icon: Users,
    pattern: '/admin/users',
  },
  {
    name: 'Pedidos',
    href: route('admin.orders.index'),
    icon: ShoppingBag,
    pattern: '/admin/orders',
  },
  // Futuras rutas (comentadas para activar cuando se añadan)
  // { name: 'Productos', href: route('admin.products.index'), icon: Package, pattern: '/admin/products' },
  // { name: 'Categorías', href: route('admin.categories.index'), icon: Layers, pattern: '/admin/categories' },
  // { name: 'Pedidos Personalizados', href: route('admin.custom-orders.index'), icon: Paintbrush, pattern: '/admin/custom-orders' },
  // { name: 'Producción', href: route('admin.production.index'), icon: Factory, pattern: '/admin/production' },
  // { name: 'Analíticas', href: route('admin.analytics.index'), icon: BarChart3, pattern: '/admin/analytics' },
  // { name: 'Configuración', href: route('admin.settings.index'), icon: Settings, pattern: '/admin/settings' },
];