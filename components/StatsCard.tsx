import { motion } from 'motion/react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  label: string;
  value: string | number;
  change: number;
  trend: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color: 'primary' | 'brand' | 'blue' | 'amber' | 'rose' | 'yellow';
  delay?: number;
}

const colorMap = {
  primary: 'bg-brand/10 text-brand border-brand/20',
  brand: 'bg-brand/10 text-brand border-brand/20',
  blue: 'bg-blue-50 text-blue-600 border-blue-100',
  amber: 'bg-amber-50 text-amber-600 border-amber-100',
  rose: 'bg-rose-50 text-rose-600 border-rose-100',
  yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',

};

export function StatsCard({ label, value, change, trend, icon: Icon, color, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between">
        <div className={cn("p-3 rounded-xl border transition-transform group-hover:scale-110 duration-300", colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full",
          trend === 'up' ? "bg-brand/10 text-brand" :
            trend === 'down' ? "bg-brand/5 text-brand/60" : "bg-slate-50 text-slate-500"
        )}>
          {trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
            trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
          {change}%
        </div>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1 tracking-tight">{value}</h3>
      </div>
    </motion.div>
  );
}
