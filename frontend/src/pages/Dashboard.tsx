import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MetricCard } from '../components/dashboard/MetricCard';
import { ThreatTrajectoryChart } from '../components/dashboard/ThreatTrajectoryChart';
import { SeverityBreakdown } from '../components/dashboard/SeverityBreakdown';
import {
  RecentAlertsStream,
  ThreatAlert,
} from '../components/dashboard/RecentAlertsStream';
import {
  ShieldAlert,
  Cpu,
  Activity,
  AlertTriangle,
  FileText,
  Network,
  Bot,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // Mock telemetry data
  const chartData = [
    { timestamp: '00:00', anomalyScore: 12, threatEvents: 45 },
    { timestamp: '04:00', anomalyScore: 18, threatEvents: 60 },
    { timestamp: '08:00', anomalyScore: 42, threatEvents: 120 },
    { timestamp: '12:00', anomalyScore: 89, threatEvents: 310 },
    { timestamp: '16:00', anomalyScore: 54, threatEvents: 180 },
    { timestamp: '20:00', anomalyScore: 23, threatEvents: 95 },
  ];

  const severityData = [
    { name: 'Critical', value: 14, color: '#FF3366' },
    { name: 'High', value: 32, color: '#FFB800' },
    { name: 'Medium', value: 58, color: '#00F0FF' },
    { name: 'Low', value: 120, color: '#CCFF00' },
  ];

  const [recentAlerts] = useState<ThreatAlert[]>([
    {
      id: '1',
      timestamp: '10 mins ago',
      sourceIp: '192.168.1.105',
      attackType: 'SQL Injection Attack',
      severity: 'CRITICAL',
      score: 0.94,
    },
    {
      id: '2',
      timestamp: '24 mins ago',
      sourceIp: '10.0.0.42',
      attackType: 'SSH Brute Force',
      severity: 'HIGH',
      score: 0.82,
    },
    {
      id: '3',
      timestamp: '45 mins ago',
      sourceIp: '172.16.0.12',
      attackType: 'Data Exfiltration Spike',
      severity: 'MEDIUM',
      score: 0.65,
    },
    {
      id: '4',
      timestamp: '1 hr ago',
      sourceIp: '192.168.1.200',
      attackType: 'Unusual Port Scanning',
      severity: 'LOW',
      score: 0.41,
    },
  ]);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Top Banner / Navigation Shortcut Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0D] p-4 rounded-xl border border-white/10">
        <div>
          <h1 className="text-xl font-extrabold font-mono text-white flex items-center gap-2">
            SOC COMMAND CENTER
            <span className="text-xs px-2 py-0.5 rounded bg-[#CCFF00]/10 text-[#CCFF00] border border-[#CCFF00]/30 font-normal">
              LIVE
            </span>
          </h1>

          <p className="text-xs text-gray-400 mt-0.5">
            Real-time AI telemetry, ML threat classification & explainability
            dashboard
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            icon={<FileText className="w-3.5 h-3.5" />}
            onClick={() => navigate('/log-analyzer')}
          >
            Log Analyzer
          </Button>

          <Button
            size="sm"
            variant="outline"
            icon={<Network className="w-3.5 h-3.5" />}
            onClick={() => navigate('/network-graph')}
          >
            Graph Visualizer
          </Button>

          <Button
            size="sm"
            variant="primary"
            icon={<Bot className="w-3.5 h-3.5" />}
            onClick={() => navigate('/ai-chat')}
          >
            AI Assistant
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ingested Logs (24h)"
          value="1,428,590"
          change="-4.2%"
          isPositive={true}
          icon={<Activity className="w-5 h-5" />}
          accentColor="lime"
        />

        <MetricCard
          title="Active Anomalies"
          value="42"
          change="+12.5%"
          isPositive={false}
          icon={<AlertTriangle className="w-5 h-5" />}
          accentColor="amber"
        />

        <MetricCard
          title="Critical Alerts"
          value="14"
          change="+8.1%"
          isPositive={false}
          icon={<ShieldAlert className="w-5 h-5" />}
          accentColor="red"
        />

        <MetricCard
          title="Model Confidence"
          value="98.4%"
          change="+0.3%"
          isPositive={true}
          icon={<Cpu className="w-5 h-5" />}
          accentColor="cyan"
        />
      </div>

      {/* Middle Visualizers Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ThreatTrajectoryChart data={chartData} />
        </div>

        <div>
          <SeverityBreakdown data={severityData} />
        </div>
      </div>

      {/* Bottom Alert Stream */}
      <RecentAlertsStream
        alerts={recentAlerts}
        onSelectAlert={(id) =>
          navigate(`/explainability?alertId=${id}`)
        }
      />
    </div>
  );
};

export default Dashboard;