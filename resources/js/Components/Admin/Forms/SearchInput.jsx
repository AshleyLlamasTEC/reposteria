import { Search } from 'lucide-react';

export default function SearchInput({ value, onChange, placeholder = 'Buscar...' }) {
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
      />
    </div>
  );
}
