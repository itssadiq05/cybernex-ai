import React, { useState } from 'react';
import {
  NetworkGraphCanvas,
  GraphNode,
  GraphLink,
} from '../components/network-graph/NetworkGraphCanvas';
import { NodeInspector } from '../components/network-graph/NodeInspector';
import { Network, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NetworkGraphView: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const [nodes] = useState<GraphNode[]>([
    {
      id: 'node-1',
      label: '192.168.1.105',
      type: 'IP',
      severity: 'CRITICAL',
      isAttacker: true,
    },
    {
      id: 'node-2',
      label: 'Auth Gateway (/api/v1/login)',
      type: 'ENDPOINT',
      severity: 'HIGH',
    },
    {
      id: 'node-3',
      label: 'DB Cluster Master (MySQL)',
      type: 'ENDPOINT',
      severity: 'HIGH',
    },
    {
      id: 'node-4',
      label: 'admin_user_01',
      type: 'USER',
      severity: 'MEDIUM',
    },
    {
      id: 'node-5',
      label: '10.0.0.42 (Internal Jump Box)',
      type: 'IP',
      severity: 'LOW',
    },
  ]);

  const [links] = useState<GraphLink[]>([
    {
      source: 'node-1',
      target: 'node-2',
      value: 5,
      protocol: 'HTTPS / SQLi',
    },
    {
      source: 'node-2',
      target: 'node-3',
      value: 8,
      protocol: 'Internal SQL',
    },
    {
      source: 'node-1',
      target: 'node-4',
      value: 2,
      protocol: 'Credential Spray',
    },
    {
      source: 'node-5',
      target: 'node-3',
      value: 1,
      protocol: 'SSH Tunnel',
    },
  ]);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0B0B0D] p-4 rounded-xl border border-white/10">
        <div>
          <h1 className="text-xl font-extrabold font-mono text-white flex items-center gap-2">
            <Network className="w-5 h-5 text-[#00F0FF]" />
            INTERACTIVE THREAT TOPOLOGY & BLAST RADIUS
          </h1>

          <p className="text-xs text-gray-400 mt-0.5">
            Force-directed graph rendering attack paths between IPs, target
            services, and accounts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Reset Simulation
          </Button>
        </div>
      </div>

      {/* Main Canvas + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <NetworkGraphCanvas
            nodes={nodes}
            links={links}
            onSelectNode={(node) => setSelectedNode(node)}
          />
        </div>

        <div>
          {selectedNode ? (
            <NodeInspector
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              onContainNode={(id) =>
                alert(`Isolating node ${id} at perimeter router...`)
              }
            />
          ) : (
            <div className="p-6 border border-white/10 rounded-xl bg-[#0B0B0D] text-center font-mono text-xs text-gray-500">
              Click on any graph node to inspect blast radius, IP metadata, and
              trigger isolation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};