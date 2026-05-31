import { usePage } from '@inertiajs/react';
import { Bell, Search } from 'lucide-react';
import Breadcrumbs from './Breadcrumbs';
import Avatar from '@/Components/ui/Avatar';
import Dropdown from '@/Components/ui/Dropdown';
import { useAdmin } from '@/Components/Admin/Providers/AdminProvider';
import { LogOut, User, Settings } from 'lucide-react';

export default function Navbar() {
  const { auth } = usePage().props;
  const { isMobile, sidebar } = useAdmin();
  const userMenuItems = [
    { label: 'Mi perfil', icon: User, onClick: () => {} },
    { label: 'Configuración', icon: Settings, onClick: () => {} },
    { label: '', divider: true },
    { label: 'Cerrar sesión', icon: LogOut, onClick: () => { document.getElementById('logout-form').submit(); } },
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-30">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        <div className="flex items-center gap-4">
          {isMobile && (
            <button onClick={sidebar.toggle} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 lg:hidden">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          <Breadcrumbs />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center relative">
            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Buscar..." className="pl-10 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
          </div>
          <button className="relative p-2 text-gray-500 hover:text-pink-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-pink-500 text-white text-xs flex items-center justify-center rounded-full">3</span>
          </button>
          <Dropdown
            trigger={<div className="flex items-center gap-2 cursor-pointer"><Avatar src={auth.user?.avatar} size="sm" /><span className="text-sm font-medium text-gray-700 hidden sm:inline">{auth.user?.name}</span></div>}
            items={userMenuItems}
          />
        </div>
      </div>
      <form id="logout-form" method="POST" action={route('logout')} className="hidden">
        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')} />
      </form>
    </header>
  );
}
