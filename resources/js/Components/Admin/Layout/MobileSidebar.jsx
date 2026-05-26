import Drawer from '@/Components/ui/Drawer';
import { navigationConfig } from '@/Utils/admin.navigation';
import { Link, usePage } from '@inertiajs/react';

export default function MobileSidebar({ onClose }) {
  const { url } = usePage();
  return (
    <Drawer isOpen onClose={onClose} title="Navegación">
      <nav className="py-4 space-y-1 px-2">
        {navigationConfig.map((item) => {
          const active = url.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-pink-50 text-pink-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </Drawer>
  );
}
