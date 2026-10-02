import React from 'react';
import { Badge, Severity } from '../common/Badge';
import { Cpu } from 'lucide-react';

export interface ParsedLogEntry {
  id: string;
  timestamp: string;
  sourceIp: string;
  destinationIp: string;
  method: string;
  endpoint: string;
  statusCode: number;
  attackType: string;
  severity: Severity;
  anomalyScore: number;
}

interface LogTableProps {
  logs: ParsedLogEntry[];
  onSelectLog: (log: ParsedLogEntry) => void;
}

export const LogTable: React.FC<LogTableProps> = ({
  logs,
  onSelectLog,
}) => {
  return (
    <div className="overflow-x-auto border border-white/10 rounded-xl bg-[#0B0B0D]">
      <table className="w-full text-left border-collapse font-mono text-xs">
        <thead>
          <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400">
            <th className="py-3 px-4 font-semibold">SEVERITY</th>
            <th className="py-3 px-4 font-semibold">TIMESTAMP</th>
            <th className="py-3 px-4 font-semibold">SOURCE IP</th>
            <th className="py-3 px-4 font-semibold">REQUEST ENDPOINT</th>
            <th className="py-3 px-4 font-semibold">THREAT CLASS</th>
            <th className="py-3 px-4 font-semibold text-right">
              ANOMALY SCORE
            </th>
            <th className="py-3 px-4 font-semibold text-center">ACTION</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5 text-gray-300">
          {logs.length === 0 ? (
            <tr>
              <td
                colSpan={7}
                className="py-8 text-center text-gray-500 font-sans"
              >
                No telemetry logs matching the current filter parameters.
              </td>
            </tr>
          ) : (
            logs.map((log) => (
              <tr
                key={log.id}
                className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                onClick={() => onSelectLog(log)}
              >
                <td className="py-3 px-4 whitespace-nowrap">
                  <Badge severity={log.severity} />
                </td>

                <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                  {log.timestamp}
                </td>

                <td className="py-3 px-4 text-white font-medium whitespace-nowrap">
                  {log.sourceIp}
                </td>

                <td className="py-3 px-4 font-mono text-gray-300 max-w-xs truncate">
                  <span className="text-[#00F0FF] mr-2">
                    {log.method}
                  </span>
                  {log.endpoint}
                </td>

                <td className="py-3 px-4 text-white font-semibold whitespace-nowrap">
                  {log.attackType}
                </td>

                <td className="py-3 px-4 text-right font-bold whitespace-nowrap">
                  <span
                    className={
                      log.anomalyScore > 0.7
                        ? 'text-[#FF3366]'
                        : 'text-[#CCFF00]'
                    }
                  >
                    {(log.anomalyScore * 100).toFixed(0)}%
                  </span>
                </td>

                <td className="py-3 px-4 text-center whitespace-nowrap">
                  <button className="inline-flex items-center gap-1 text-gray-400 group-hover:text-[#CCFF00] font-semibold transition-colors">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>Explain</span>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};