import Select from '@/Components/ui/Select';
import { statusLabels } from '@/Utils/status.colors';

export default function StatusSelect({ value, onChange }) {
  return (
    <Select value={value || ''} onChange={(e) => onChange(e.target.value)} className="w-full sm:w-48">
      <option value="">Todos los estados</option>
      {Object.entries(statusLabels).map(([key, label]) => (
        <option key={key} value={key}>{label}</option>
      ))}
    </Select>
  );
}
