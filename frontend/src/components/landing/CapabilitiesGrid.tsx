import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { ShieldAlert, Cpu, Network, FileSearch, LineChart, MessageSquareCode } from 'lucide-react';

export const CapabilitiesGrid: React.FC = () => {
  const capabilities = [
    {
      icon: <FileSearch className="w-6 h-6 text-[#CCFF00]" />,
      title: 'Automated Log Normalization',
      description: 'Parse, clean, and standardize unstructured JSON, CSV, and raw syslog formats into normalized security events instantly.',
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-[#FF3366]" />,
      title: 'Isolation Forest Anomaly Detector',
      description: 'Unsupervised Machine Learning model detects subtle network and authentication outliers without requiring labeled attack data.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#00F0FF]" />,
      title: 'XGBoost Threat Classification',
      description: 'Supervised classification pinpoints multi-class attack vectors including Brute-Force, SQL Injection, and Exfiltration.',
    },
    {
      icon: <LineChart className="w-6 h-6 text-[#FFB800]" />,
      title: 'SHAP Feature Attribution',
      description: 'Understand every prediction. Visual explainability breakdown identifies exact factors triggering high severity alerts.',
    },
    {
      icon: <Network className="w-6 h-6 text-[#CCFF00]" />,
      title: 'Interactive Topology Graph',
      description: 'Correlate malicious IPs, impacted user accounts, and target endpoints in a interactive node-link graph viewer.',
    },
    {
      icon: <MessageSquareCode className="w-6 h-6 text-[#00F0FF]" />,
      title: 'AI Security Analyst',
      description: 'Ask natural language questions about security logs, incident context, and get actionable defensive remediation steps.',
    },
  ];

  return (
    <section className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-xs font-mono font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
          Platform Capabilities
        </h2>
        <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Defensive Intelligence Powered by Machine Learning
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {capabilities.map((cap, idx) => (
          <GlassPanel key={idx} variant="card" glow="lime" className="p-6">
            <div className="p-3 bg-white/5 rounded-lg w-fit mb-4 border border-white/10">
              {cap.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{cap.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{cap.description}</p>
          </GlassPanel>
        ))}
      </div>
    </section>
  );
};
