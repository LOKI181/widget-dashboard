import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 4000, profit: 2400 },
  { name: 'Feb', revenue: 3000, profit: 1398 },
  { name: 'Mar', revenue: 5000, profit: 3800 },
  { name: 'Apr', revenue: 4780, profit: 3908 },
  { name: 'May', revenue: 5890, profit: 4800 },
  { name: 'Jun', revenue: 6390, profit: 5800 },
  { name: 'Jul', revenue: 7490, profit: 6200 },
  { name: 'Aug', revenue: 6800, profit: 5400 },
  { name: 'Sep', revenue: 8200, profit: 7100 },
  { name: 'Oct', revenue: 7600, profit: 6800 },
  { name: 'Nov', revenue: 9100, profit: 7500 },
  { name: 'Dec', revenue: 10200, profit: 8300 },
];

interface ChartWidgetProps {
  config: Record<string, unknown>;
}

export const ChartWidget: React.FC<ChartWidgetProps> = ({ config }) => {
  const color = (config.color as string) || '#667eea';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke={color}
          fill={`url(#gradient-${color})`}
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
