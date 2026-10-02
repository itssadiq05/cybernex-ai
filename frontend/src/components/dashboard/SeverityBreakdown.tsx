import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SeverityData {
  name: string;
  value: number;
  color: string;
}

interface SeverityBreakdownProps {
  data: SeverityData[];
}

export const SeverityBreakdown: React.FC<SeverityBreakdownProps> = ({ data }) => {
  return (
    <GlassPanel variant="card" className="p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-white font-mono mb-1">INCIDENT SEVERITY DISTRIBUTION</h3>
        <p className="text-xs text-gray-400">Classified threats by impact severity level</p>
      </div>

      <div className="h-52 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#050505" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B0B0D',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-400">{item.name}</span>
            </div>
            <span className="font-semibold text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};
