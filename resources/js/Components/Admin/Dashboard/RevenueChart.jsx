import Card from '@/Components/ui/Card';

export default function RevenueChart() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Ingresos</h3>
        <select className="text-sm border rounded-lg px-2 py-1">
          <option>Última semana</option>
          <option>Último mes</option>
        </select>
      </div>
      <div className="h-48 flex items-end justify-around gap-2">
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <div key={i} className="w-8 bg-gradient-to-t from-pink-400 to-purple-500 rounded-t-lg" style={{ height: `${height}%` }}></div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-400">
        <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
      </div>
    </Card>
  );
}
