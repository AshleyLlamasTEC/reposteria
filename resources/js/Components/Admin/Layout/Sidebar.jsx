import { Link, usePage } from '@inertiajs/react';
import { navigationConfig } from '@/Utils/admin.navigation';
import Tooltip from '@/Components/ui/Tooltip';
import { useAdmin } from '@/Components/Admin/Providers/AdminProvider';

export default function Sidebar() {
  const { sidebar } = useAdmin();
  const { isCollapsed } = sidebar;
  const { url } = usePage();

  return (
    <aside className={`bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} hidden lg:flex`}>
      <div className="p-4 border-b flex items-center justify-center">
        <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
        {!isCollapsed && <span className="ml-3 text-lg font-bold text-gray-800">Paty's Admin</span>}
      </div>
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navigationConfig.map((item) => {
          const active = url.startsWith(item.href);
          const Icon = item.icon;
          const linkContent = (
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-pink-50 text-pink-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
          if (isCollapsed) {
            return <Tooltip key={item.name} content={item.name} placement="right">{linkContent}</Tooltip>;
          }
          return <div key={item.name}>{linkContent}</div>;
        })}
      </nav>
      <div className="p-4 border-t">
        <button onClick={sidebar.toggleCollapse} className="text-gray-400 hover:text-pink-500 transition-colors w-full flex justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? 'M13 5l7 7-7 7M5 5l7 7-7 7' : 'M11 19l-7-7 7-7M19 19l-7-7 7-7'} />
          </svg>
        </button>
      </div>
    </aside>
  );
}
