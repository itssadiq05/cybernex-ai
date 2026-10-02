import React from 'react';
import { ThreatSeverity } from '../../types/log';
import { getSeverityColor } from '../../utils/colorUtils';

export type Severity = ThreatSeverity;

interface BadgeProps {
  severity?: ThreatSeverity;
  label?: string;
  variant?: 'lime' | 'cyan' | 'amber' | 'red' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({
  severity,
  label,
  variant = 'neutral',
}) => {
  if (severity) {
    const colors = getSeverityColor(severity);

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: colors.accentHex }}
        />
        {severity}
      </span>
    );
  }

  const variantStyles = {
    lime: 'bg-[#CCFF00]/10 text-[#CCFF00] border-[#CCFF00]/30',
    cyan: 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30',
    amber: 'bg-[#FFB800]/10 text-[#FFB800] border-[#FFB800]/30',
    red: 'bg-[#FF3366]/10 text-[#FF3366] border-[#FF3366]/30',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
};