import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataPoint {
  timestamp: string;
  anomalyScore: number;
  threatEvents: number;
}

interface ThreatTrajectoryChartProps {
  data: ChartDataPoint[];
}

export const ThreatTrajectoryChart: React.FC<ThreatTrajectoryChartProps> = ({ data }) => {
  return (
    <GlassPanel variant="card" className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-base font-bold text-white font-mono">THREAT TRAJECTORY & ANOMALY VOLUME</h3>
          <p className="text-xs text-gray-400 mt-0.5">Real-time log ingestion vs. detected anomaly scores</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]" />
            <span className="text-gray-400">Threat Events</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF]" />
            <span className="text-gray-400">Anomaly Index</span>
          </div>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#CCFF00" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1A1B1F" vertical={false} />
            <XAxis dataKey="timestamp" stroke="#64748B" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748B" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0B0B0D',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'JetBrains Mono, monospace',
              }}
            />
            <Area
              type="monotone"
              dataKey="threatEvents"
              stroke="#CCFF00"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorEvents)"
            />
            <Area
              type="monotone"
              dataKey="anomalyScore"
              stroke="#00F0FF"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorScore)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassPanel>
  );
};
