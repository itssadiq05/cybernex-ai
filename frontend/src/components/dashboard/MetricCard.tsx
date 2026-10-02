import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: React.ReactNode;
  accentColor?: 'lime' | 'cyan' | 'red' | 'amber';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  icon,
  accentColor = 'lime',
}) => {
  const accentBorders = {
    lime: 'border-[#CCFF00]/20 text-[#CCFF00]',
    cyan: 'border-[#00F0FF]/20 text-[#00F0FF]',
    red: 'border-[#FF3366]/20 text-[#FF3366]',
    amber: 'border-[#FFB800]/20 text-[#FFB800]',
  };

  return (
    <GlassPanel variant="card" className="p-5 flex flex-col justify-between relative overflow-hidden">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-medium text-gray-400 uppercase tracking-wider">
          {title}
        </span>
        <div className={`p-2 rounded-lg bg-white/5 border ${accentBorders[accentColor]}`}>
          {icon}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-2xl sm:text-3xl font-extrabold font-mono tracking-tight text-white">
          {value}
        </div>

        {change && (
          <div className="flex items-center gap-1.5 mt-2 text-xs font-mono">
            {isPositive ? (
              <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <TrendingUp className="w-3.5 h-3.5 text-[#FF3366]" />
            )}
            <span className={isPositive ? 'text-emerald-400' : 'text-[#FF3366]'}>
              {change}
            </span>
            <span className="text-gray-500">vs last hour</span>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};
