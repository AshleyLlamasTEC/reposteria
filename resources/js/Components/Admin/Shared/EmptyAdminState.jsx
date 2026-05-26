import { PackageOpen } from 'lucide-react';

export default function EmptyAdminState({ message = 'No se encontraron resultados.', icon: Icon = PackageOpen }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <Icon className="w-16 h-16 mb-4 text-gray-300" />
      <p className="text-lg font-medium text-gray-500">{message}</p>
    </div>
  );
}
