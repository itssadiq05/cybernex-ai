import React from 'react';
import { GlassPanel } from '../common/GlassPanel';
import { Badge } from '../common/Badge';
import { GraphNode } from './NetworkGraphCanvas';
import { ShieldAlert, Server, User, Globe, X } from 'lucide-react';
import { Button } from '../common/Button';

interface NodeInspectorProps {
  node: GraphNode | null;
  onClose: () => void;
  onContainNode: (id: string) => void;
}

export const NodeInspector: React.FC<NodeInspectorProps> = ({
  node,
  onClose,
  onContainNode,
}) => {
  if (!node) return null;

  const getTypeIcon = () => {
    switch (node.type) {
      case 'ENDPOINT':
        return <Server className="w-5 h-5 text-[#00F0FF]" />;
      case 'USER':
        return <User className="w-5 h-5 text-[#FFB800]" />;
      default:
        return <Globe className="w-5 h-5 text-[#CCFF00]" />;
    }
  };

  return (
    <GlassPanel variant="card" className="p-6 space-y-4 font-mono text-xs relative">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          {getTypeIcon()}
          <div>
            <h4 className="text-sm font-bold text-white">{node.label}</h4>
            <span className="text-[10px] text-gray-400">TYPE: {node.type}</span>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Node ID:</span>
          <span className="text-white">{node.id}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Threat Severity:</span>
          <Badge severity={node.severity} />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-400">Role:</span>
          <span className={node.isAttacker ? 'text-[#FF3366] font-bold' : 'text-gray-300'}>
            {node.isAttacker ? 'Primary Threat Origin' : 'Target Asset'}
          </span>
        </div>
      </div>

      <div className="pt-3 border-t border-white/10 space-y-2">
        <p className="text-[11px] text-gray-400">Blast Radius Scope:</p>
        <div className="p-2.5 rounded bg-white/5 border border-white/5 text-gray-300">
          Correlated with 4 network links, 2 target database endpoints, and 1 compromised user token.
        </div>
      </div>

      <div className="pt-2 flex items-center gap-2">
        {node.isAttacker && (
          <Button
            size="sm"
            variant="danger"
            className="w-full"
            icon={<ShieldAlert className="w-3.5 h-3.5" />}
            onClick={() => onContainNode(node.id)}
          >
            Contain Node (Isolate IP)
          </Button>
        )}
      </div>
    </GlassPanel>
  );
};
