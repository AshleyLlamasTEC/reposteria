import { motion } from 'framer-motion';
import Card from '@/Components/ui/Card';

export default function StatCard({ title, value, icon: Icon, trend, trendLabel, badge }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="hover:shadow-xl transition-shadow">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
            {trend && (
              <p className="mt-2 text-xs text-green-600 flex items-center gap-1">
                <span className="text-green-500">↑</span> {trend}% {trendLabel}
              </p>
            )}
          </div>
          <div className="p-3 rounded-xl bg-pink-50">
            {Icon && <Icon className="w-6 h-6 text-pink-600" />}
          </div>
        </div>
        {badge && (
          <div className="mt-4">
            <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full">{badge}</span>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
