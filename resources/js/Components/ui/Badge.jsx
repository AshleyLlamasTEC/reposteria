import { statusColors } from '@/Utils/status.colors';

export default function Badge({ status, children, className = '' }) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-700 border-gray-200';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass} ${className}`}>
      {children || status}
    </span>
  );
}
