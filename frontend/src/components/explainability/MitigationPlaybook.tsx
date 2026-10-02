import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { ShieldCheck, Terminal } from 'lucide-react';

interface RemediationStep {
  id: string;
  action: string;
  command?: string;
  category: 'AUTOMATED' | 'MANUAL';
}

interface MitigationPlaybookProps {
  attackType: string;
  steps: RemediationStep[];
  onExecuteRemediation: (stepId: string) => void;
}

export const MitigationPlaybook: React.FC<MitigationPlaybookProps> = ({
  attackType,
  steps,
  onExecuteRemediation,
}) => {
  return (
    <GlassPanel variant="card" className="p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#CCFF00]" />
          <div>
            <h3 className="text-base font-bold text-white font-mono">
              AUTOMATED MITIGATION PLAYBOOK
            </h3>
            <p className="text-xs text-gray-400">
              Recommended defensive steps for {attackType}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3 font-mono text-xs">
        {steps.map((step, idx) => (
          <div
            key={step.id}
            className="p-4 rounded-lg bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[10px]">
                  {idx + 1}
                </span>

                <span className="font-semibold text-white">
                  {step.action}
                </span>
              </div>

              <span className="px-2 py-0.5 rounded text-[10px] bg-white/5 text-gray-400 border border-white/10">
                {step.category}
              </span>
            </div>

            {step.command && (
              <div className="p-2.5 rounded bg-black/60 border border-white/5 flex items-center justify-between gap-2 overflow-x-auto text-[#00F0FF]">
                <code className="text-[11px] shrink-0">
                  $ {step.command}
                </code>

                <Button
                  size="sm"
                  variant="outline"
                  icon={<Terminal className="w-3 h-3" />}
                  onClick={() => onExecuteRemediation(step.id)}
                >
                  Run
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </GlassPanel>
  );
};