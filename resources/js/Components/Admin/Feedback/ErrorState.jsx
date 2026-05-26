import { AlertTriangle } from 'lucide-react';

export default function ErrorState({ message = 'Ha ocurrido un error.' }) {
  return (
    <div className="flex flex-col items-center py-12 text-red-500">
      <AlertTriangle className="w-12 h-12 mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}