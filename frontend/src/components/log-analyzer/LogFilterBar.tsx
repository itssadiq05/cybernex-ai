import React from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import { Button } from '../common/Button';

interface LogFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSeverity: string;
  onSeverityChange: (value: string) => void;
  selectedAttackType: string;
  onAttackTypeChange: (value: string) => void;
  onResetFilters: () => void;
}

export const LogFilterBar: React.FC<LogFilterBarProps> = ({
  searchTerm,
  onSearchChange,
  selectedSeverity,
  onSeverityChange,
  selectedAttackType,
  onAttackTypeChange,
  onResetFilters,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0B0B0D] p-4 rounded-xl border border-white/10 font-mono text-xs">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter by IP, endpoint, user agent, payload..."
          className="w-full bg-[#151619] border border-white/10 rounded-lg pl-9 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#CCFF00] transition-colors"
        />
      </div>

      {/* Select Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-gray-400" />
          <select
            value={selectedSeverity}
            onChange={(e) => onSeverityChange(e.target.value)}
            className="bg-[#151619] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CCFF00]"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
            <option value="INFO">INFO</option>
          </select>
        </div>

        <select
          value={selectedAttackType}
          onChange={(e) => onAttackTypeChange(e.target.value)}
          className="bg-[#151619] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#CCFF00]"
        >
          <option value="ALL">All Threat Vector Classes</option>
          <option value="SQL Injection">SQL Injection</option>
          <option value="Brute Force">Brute Force SSH</option>
          <option value="Exfiltration">Data Exfiltration</option>
          <option value="Port Scan">Reconnaissance / Port Scan</option>
          <option value="Normal">Benign Telemetry</option>
        </select>

        <Button size="sm" variant="outline" icon={<RefreshCw className="w-3.5 h-3.5" />} onClick={onResetFilters}>
          Reset
        </Button>
      </div>
    </div>
  );
};
