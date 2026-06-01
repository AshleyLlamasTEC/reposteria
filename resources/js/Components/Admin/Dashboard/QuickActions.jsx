import { Link } from '@inertiajs/react';
import { ShoppingBag, Users, BarChart3, Factory } from 'lucide-react';
import Card from '@/Components/ui/Card';

const actions = [
  { label: 'Ver usuarios', icon: Users, href: route('admin.users.index') },
];

export default function QuickActions() {
  return (
    <Card className="p-4">
      <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Acciones rápidas</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center p-3 rounded-xl border border-gray-200 hover:bg-pink-50 hover:border-pink-200 transition-colors"
          >
            <action.icon className="w-5 h-5 text-pink-500 mb-1" />
            <span className="text-xs text-gray-700 font-medium">{action.label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
