import { CheckCircle } from 'lucide-react';

export default function SuccessState({ message = 'Operación exitosa.' }) {
  return (
    <div className="flex flex-col items-center py-12 text-green-500">
      <CheckCircle className="w-12 h-12 mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}