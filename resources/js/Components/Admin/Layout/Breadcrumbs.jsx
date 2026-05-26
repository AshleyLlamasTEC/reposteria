import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { usePage } from '@inertiajs/react';

export default function Breadcrumbs() {
  const { url } = usePage();
  const segments = url.split('/').filter(Boolean);
  return (
    <nav className="flex items-center text-sm text-gray-500">
      <Link href="/admin/dashboard" className="hover:text-pink-600">Inicio</Link>
      {segments.slice(1).map((segment, i) => (
        <span key={i} className="flex items-center">
          <ChevronRight className="w-4 h-4 mx-1" />
          <span className="capitalize">{segment.replace(/-/g, ' ')}</span>
        </span>
      ))}
    </nav>
  );
}
