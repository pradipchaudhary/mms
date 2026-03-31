'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Jan', count: 400 },
  { month: 'Feb', count: 300 },
  { month: 'Mar', count: 600 },
  { month: 'Apr', count: 800 },
  { month: 'May', count: 500 },
  { month: 'Jun', count: 900 },
  { month: 'Jul', count: 1100 },
];

export function OverviewChart() {
  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-100 shadow-sm h-[300px] sm:h-[400px] flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 tracking-tight">Manpower Growth</h3>
          <p className="text-sm text-slate-500">Monthly employee count trends</p>
        </div>
        <select className="bg-slate-50 border-none text-xs font-semibold text-slate-600 rounded-lg px-3 py-2 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
          <option>Last 7 Months</option>
          <option>Last Year</option>
        </select>
      </div>

      <div className="flex-1 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5a20cb" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#5a20cb" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '1px solid #f1f5f9',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              cursor={{ stroke: '#5a20cb', strokeWidth: 2, strokeDasharray: '5 5' }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#5a20cb"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCount)"
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
