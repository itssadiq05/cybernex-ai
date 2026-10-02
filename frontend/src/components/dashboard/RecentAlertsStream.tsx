import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { Badge, Severity } from '../common/Badge';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';

export interface ThreatAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  attackType: string;
  severity: Severity;
  score: number;
}

interface RecentAlertsStreamProps {
  alerts: ThreatAlert[];
  onSelectAlert: (id: string) => void;
}

export const RecentAlertsStream: React.FC<RecentAlertsStreamProps> = ({
  alerts,
  onSelectAlert,
}) => {
  return (
    <GlassPanel variant="card" className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-[#FF3366]" />
          <h3 className="text-base font-bold text-white font-mono">REAL-TIME THREAT TELEMETRY STREAM</h3>
        </div>
        <span className="text-xs font-mono text-gray-500">LIVE FEED</span>
      </div>

      <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            onClick={() => onSelectAlert(alert.id)}
            className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all cursor-pointer flex items-center justify-between gap-4 group"
          >
            <div className="flex items-center gap-3">
              <Badge severity={alert.severity} />
              <div>
                <p className="text-sm font-mono font-medium text-white group-hover:text-[#CCFF00] transition-colors">
                  {alert.attackType}
                </p>
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mt-0.5">
                  <span>IP: {alert.sourceIp}</span>
                  <span>•</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right font-mono">
                <span className="text-xs text-gray-400 block">Score</span>
                <span className="text-xs font-bold text-[#00F0FF]">{(alert.score * 100).toFixed(0)}%</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};
