import React from 'react';
import { Cpu, ShieldCheck, Zap, Database, Terminal, Activity } from 'lucide-react';

export const TechStrip: React.FC = () => {
  const techs = [
    { name: 'XGBoost Threat Core', icon: <Zap className="w-4 h-4 text-[#CCFF00]" /> },
    { name: 'Isolation Forest Anomaly Engine', icon: <ShieldCheck className="w-4 h-4 text-[#00F0FF]" /> },
    { name: 'SHAP Model Explainability', icon: <Cpu className="w-4 h-4 text-[#FF3366]" /> },
    { name: 'FastAPI Microsecond Engine', icon: <Terminal className="w-4 h-4 text-[#CCFF00]" /> },
    { name: 'PostgreSQL Vector Telemetry', icon: <Database className="w-4 h-4 text-[#00F0FF]" /> },
    { name: 'Real-time Event Stream', icon: <Activity className="w-4 h-4 text-[#FFB800]" /> },
  ];

  return (
    <div className="w-full border-y border-white/10 bg-[#0B0B0D]/50 backdrop-blur-md py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 flex-wrap">
          {techs.map((tech, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors">
              {tech.icon}
              <span>{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
