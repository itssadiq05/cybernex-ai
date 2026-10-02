import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { Badge, Severity } from '../common/Badge';
import { Cpu } from 'lucide-react';

interface PredictionGaugeProps {
  confidence: number;
  predictionLabel: string;
  severity: Severity;
  modelName: string;
}

export const PredictionGauge: React.FC<PredictionGaugeProps> = ({
  confidence,
  predictionLabel,
  severity,
  modelName,
}) => {
  const percentage = Math.round(confidence * 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100;

  const getGaugeColor = (score: number) => {
    if (score >= 80) return '#FF3366';
    if (score >= 50) return '#FFB800';
    return '#CCFF00';
  };

  const color = getGaugeColor(percentage);

  return (
    <GlassPanel
      variant="card"
      className="p-6 flex flex-col items-center justify-between text-center relative"
    >
      <div className="w-full flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
          {modelName}
        </span>

        <Badge severity={severity} />
      </div>

      <div className="relative w-40 h-40 flex items-center justify-center my-2">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#1A1B1F"
            strokeWidth="8"
            fill="transparent"
          />

          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            strokeDasharray="283"
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center font-mono">
          <span className="text-3xl font-extrabold text-white">
            {percentage}%
          </span>

          <span className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">
            Threat Prob
          </span>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold font-mono text-white mb-1">
          {predictionLabel}
        </h4>

        <p className="text-xs text-gray-400 font-mono">
          High confidence malicious probability detected by XGBoost classifier.
        </p>
      </div>
    </GlassPanel>
  );
};