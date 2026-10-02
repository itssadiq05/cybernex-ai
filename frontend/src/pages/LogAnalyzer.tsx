import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogUploader } from '../components/log-analyzer/LogUploader';
import { LogFilterBar } from '../components/log-analyzer/LogFilterBar';
import { LogTable, ParsedLogEntry } from '../components/log-analyzer/LogTable';
import { Button } from '../components/common/Button';
import { FileText, Play } from 'lucide-react';

export const LogAnalyzer: React.FC = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('ALL');
  const [selectedAttackType, setSelectedAttackType] = useState('ALL');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock parsed log database
  const [logs] = useState<ParsedLogEntry[]>([
    {
      id: 'log-101',
      timestamp: '2026-09-29 20:45:12',
      sourceIp: '192.168.1.105',
      destinationIp: '10.0.0.1',
      method: 'POST',
      endpoint: '/api/v1/auth/login?query=SELECT%20*%20FROM%20users',
      statusCode: 500,
      attackType: 'SQL Injection',
      severity: 'CRITICAL',
      anomalyScore: 0.94,
    },
    {
      id: 'log-102',
      timestamp: '2026-09-29 20:42:01',
      sourceIp: '10.0.0.42',
      destinationIp: '10.0.0.2',
      method: 'POST',
      endpoint: '/ssh/v2/handshake',
      statusCode: 401,
      attackType: 'Brute Force',
      severity: 'HIGH',
      anomalyScore: 0.82,
    },
    {
      id: 'log-103',
      timestamp: '2026-09-29 20:30:15',
      sourceIp: '172.16.0.12',
      destinationIp: '10.0.0.5',
      method: 'GET',
      endpoint: '/internal/database/export.tar.gz',
      statusCode: 200,
      attackType: 'Exfiltration',
      severity: 'MEDIUM',
      anomalyScore: 0.65,
    },
    {
      id: 'log-104',
      timestamp: '2026-09-29 20:15:00',
      sourceIp: '192.168.1.200',
      destinationIp: '10.0.0.10',
      method: 'GET',
      endpoint: '/status/healthcheck',
      statusCode: 200,
      attackType: 'Normal',
      severity: 'LOW',
      anomalyScore: 0.08,
    },
  ]);

  const handleFileUpload = () => {
    setIsProcessing(true);

    // Simulate streaming parsing
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.sourceIp.includes(searchTerm) ||
      log.endpoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.attackType.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSeverity =
      selectedSeverity === 'ALL' || log.severity === selectedSeverity;

    const matchesAttack =
      selectedAttackType === 'ALL' || log.attackType === selectedAttackType;

    return matchesSearch && matchesSeverity && matchesAttack;
  });

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0D] p-4 rounded-xl border border-white/10">
        <div>
          <h1 className="text-xl font-extrabold font-mono text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#CCFF00]" />
            LOG PARSER & INGESTION WORKSTATION
          </h1>

          <p className="text-xs text-gray-400 mt-0.5">
            Parse raw syslogs, CSV or JSON datasets to perform ML anomaly detection
          </p>
        </div>

        <Button
          size="sm"
          variant="primary"
          icon={<Play className="w-3.5 h-3.5" />}
          onClick={() => navigate('/explainability')}
        >
          Run Full ML Pipeline
        </Button>
      </div>

      <LogUploader
        onFileUpload={handleFileUpload}
        isProcessing={isProcessing}
      />

      <LogFilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSeverity={selectedSeverity}
        onSeverityChange={setSelectedSeverity}
        selectedAttackType={selectedAttackType}
        onAttackTypeChange={setSelectedAttackType}
        onResetFilters={() => {
          setSearchTerm('');
          setSelectedSeverity('ALL');
          setSelectedAttackType('ALL');
        }}
      />

      <LogTable
        logs={filteredLogs}
        onSelectLog={(log) =>
          navigate(`/explainability?logId=${log.id}`)
        }
      />
    </div>
  );
};