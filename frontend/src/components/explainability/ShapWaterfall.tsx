import React from 'react';
import { GlassPanel } from '../common/GlassPanel';

export interface ShapFactor {
  feature: string;
  value: string | number;
  impact: number;
  description: string;
}

interface ShapWaterfallProps {
  factors: ShapFactor[];
  baseValue: number;
  outputValue: number;
}

export const ShapWaterfall: React.FC<ShapWaterfallProps> = ({
  factors,
  baseValue,
  outputValue,
}) => {
  const maxImpact = Math.max(
    ...factors.map((f) => Math.abs(f.impact)),
    0.01
  );

  return (
    <GlassPanel variant="card" className="p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h3 className="text-base font-bold text-white font-mono">
            SHAP FEATURE ATTRIBUTION BREAKDOWN
          </h3>

          <p className="text-xs text-gray-400 mt-0.5">
            How individual telemetry attributes pushed the model decision away
            from baseline ({baseValue.toFixed(2)}) to final output (
            {outputValue.toFixed(2)})
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#FF3366]" />
            <span className="text-gray-400">+ Threat Risk</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-[#00F0FF]" />
            <span className="text-gray-400">- Benign Signal</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {factors.map((factor, idx) => {
          const isPositive = factor.impact > 0;

          const barWidthPercent = Math.min(
            (Math.abs(factor.impact) / maxImpact) * 100,
            100
          );

          return (
            <div
              key={idx}
              className="space-y-1.5 font-mono text-xs"
            >
              <div className="flex items-center justify-between text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {factor.feature}
                  </span>

                  <span className="text-gray-500">
                    = {String(factor.value)}
                  </span>
                </div>

                <span
                  className={`font-bold ${
                    isPositive
                      ? 'text-[#FF3366]'
                      : 'text-[#00F0FF]'
                  }`}
                >
                  {isPositive
                    ? `+${factor.impact.toFixed(3)}`
                    : factor.impact.toFixed(3)}
                </span>
              </div>

              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden flex items-center relative">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isPositive
                      ? 'bg-[#FF3366]'
                      : 'bg-[#00F0FF]'
                  }`}
                  style={{ width: `${barWidthPercent}%` }}
                />
              </div>

              <p className="text-[11px] text-gray-500 italic">
                {factor.description}
              </p>
            </div>
          );
        })}
      </div>
    </GlassPanel>
  );
};