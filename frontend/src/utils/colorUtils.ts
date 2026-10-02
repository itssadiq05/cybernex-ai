import { ThreatSeverity } from '../types/log';

export const getSeverityColor = (severity: ThreatSeverity) => {
  switch (severity) {
    case 'CRITICAL':
      return {
        bg: 'bg-rose-950/40',
        text: 'text-rose-400',
        border: 'border-rose-800/50',
        badgeBg: 'bg-rose-500/10',
        accentHex: '#FF3366',
      };
    case 'HIGH':
      return {
        bg: 'bg-amber-950/40',
        text: 'text-amber-400',
        border: 'border-amber-800/50',
        badgeBg: 'bg-amber-500/10',
        accentHex: '#FFB800',
      };
    case 'MEDIUM':
      return {
        bg: 'bg-cyan-950/40',
        text: 'text-cyan-400',
        border: 'border-cyan-800/50',
        badgeBg: 'bg-cyan-500/10',
        accentHex: '#00F0FF',
      };
    case 'LOW':
    default:
      return {
        bg: 'bg-emerald-950/40',
        text: 'text-emerald-400',
        border: 'border-emerald-800/50',
        badgeBg: 'bg-emerald-500/10',
        accentHex: '#CCFF00',
      };
  }
};
