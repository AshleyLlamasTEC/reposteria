import Card from '@/Components/ui/Card';
import { Select } from '@ark-ui/react/select';
import { ChevronDown, Check } from 'lucide-react';

export default function RevenueChart() {
  const timeframes = ['Última semana', 'Último mes', 'Último año'];

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Ingresos</h3>

        {/* Implementación de Ark UI Select */}
        <Select.Root items={timeframes} defaultValue={['Última semana']}>
          <Select.Control>
            <Select.Trigger className="flex items-center justify-between gap-2 text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-shadow cursor-pointer min-w-[140px]">
              <Select.ValueText placeholder="Selecciona..." />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </Select.Trigger>
          </Select.Control>

          <Select.Positioner>
            <Select.Content className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 min-w-[140px] outline-none">
              <Select.ItemGroup>
                {timeframes.map((item) => (
                  <Select.Item
                    key={item}
                    item={item}
                    className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 cursor-pointer data-[state=checked]:bg-pink-100 data-[state=checked]:font-medium transition-colors"
                  >
                    <Select.ItemText>{item}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check className="w-4 h-4 text-pink-600" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.ItemGroup>
            </Select.Content>
          </Select.Positioner>
        </Select.Root>
      </div>

      {/* Gráfico */}
      <div className="h-48 flex items-end justify-around gap-2 mt-6">
        {[40, 65, 45, 80, 55, 90, 70].map((height, i) => (
          <div key={i} className="w-8 bg-gradient-to-t from-pink-400 to-purple-500 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer relative group" style={{ height: `${height}%` }}>
             {/* Un tooltip simple en hover puro con CSS */}
             <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
               {height}%
             </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3 text-xs text-gray-400 font-medium">
        <span>Lun</span><span>Mar</span><span>Mié</span><span>Jue</span><span>Vie</span><span>Sáb</span><span>Dom</span>
      </div>
    </Card>
  );
}
