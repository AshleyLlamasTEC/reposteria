import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function TablePagination({ pagination }) {
  const { current_page, last_page, links } = pagination;

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t">
      <p className="text-sm text-gray-500">
        Página {current_page} de {last_page}
      </p>
      <div className="flex items-center gap-1">
        {links.map((link, index) => {
          if (link.url === null) {
            return (
              <span key={index} className="px-3 py-1 text-gray-300 cursor-not-allowed">
                {link.label.includes('Previous') ? <ChevronLeft className="w-4 h-4" /> : link.label.includes('Next') ? <ChevronRight className="w-4 h-4" /> : link.label}
              </span>
            );
          }
          return (
            <Link
              key={index}
              href={link.url}
              preserveState
              className={`px-3 py-1 rounded-lg text-sm ${
                link.active ? 'bg-pink-500 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
              dangerouslySetInnerHTML={{ __html: link.label }}
            />
          );
        })}
      </div>
    </div>
  );
}