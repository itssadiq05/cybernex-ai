import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: 'IP' | 'ENDPOINT' | 'USER' | 'MALWARE';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
  isAttacker?: boolean;
}

export interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
  value: number;
  protocol: string;
}

interface NetworkGraphCanvasProps {
  nodes: GraphNode[];
  links: GraphLink[];
  onSelectNode: (node: GraphNode) => void;
}

export const NetworkGraphCanvas: React.FC<NetworkGraphCanvasProps> = ({
  nodes,
  links,
  onSelectNode,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = 600;

    // Clear previous renders
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    const g = svg.append('g');

    // Zoom & Pan setup
    const zoom = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Deep clone data to avoid mutating props
    const nodesData: GraphNode[] = nodes.map((d) => ({ ...d }));
    const linksData: GraphLink[] = links.map((d) => ({ ...d }));

    // Force Simulation Setup
    const simulation = d3
      .forceSimulation<GraphNode>(nodesData)
      .force(
        'link',
        d3
          .forceLink<GraphNode, GraphLink>(linksData)
          .id((d) => d.id)
          .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-350))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // Colors mapping
    const getNodeColor = (node: GraphNode) => {
      if (node.isAttacker) return '#FF3366';
      switch (node.type) {
        case 'ENDPOINT':
          return '#00F0FF';
        case 'USER':
          return '#FFB800';
        case 'MALWARE':
          return '#FF3366';
        default:
          return '#CCFF00';
      }
    };

    // Render Links
    const link = g
      .append('g')
      .selectAll('line')
      .data(linksData)
      .join('line')
      .attr('stroke', '#1A1B1F')
      .attr('stroke-opacity', 0.8)
      .attr('stroke-width', (d) => Math.sqrt(d.value) * 1.5);

    // Render Link Labels
    const linkText = g
      .append('g')
      .selectAll('text')
      .data(linksData)
      .join('text')
      .text((d) => d.protocol)
      .attr('font-size', '9px')
      .attr('fill', '#64748B')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('text-anchor', 'middle');

    // Render Nodes
    const node = g
      .append('g')
      .selectAll<SVGGElement, GraphNode>('g')
      .data(nodesData)
      .join('g')
      .style('cursor', 'pointer')
      .on('click', (_, d) => onSelectNode(d))
      .call(
        d3
          .drag<SVGGElement, GraphNode>()
          .on('start', (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on('drag', (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on('end', (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // Node Circles
    node
      .append('circle')
      .attr('r', (d) => (d.isAttacker ? 22 : 16))
      .attr('fill', (d) => getNodeColor(d))
      .attr('fill-opacity', 0.2)
      .attr('stroke', (d) => getNodeColor(d))
      .attr('stroke-width', (d) => (d.isAttacker ? 3 : 1.5))
      .attr('class', (d) => (d.isAttacker ? 'animate-pulse' : ''));

    // Inner Dot
    node
      .append('circle')
      .attr('r', 5)
      .attr('fill', (d) => getNodeColor(d));

    // Node Labels
    node
      .append('text')
      .text((d) => d.label)
      .attr('x', 0)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('fill', '#E2E8F0')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace');

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => (d.source as GraphNode).x!)
        .attr('y1', (d) => (d.source as GraphNode).y!)
        .attr('x2', (d) => (d.target as GraphNode).x!)
        .attr('y2', (d) => (d.target as GraphNode).y!);

      linkText
        .attr('x', (d) => ((d.source as GraphNode).x! + (d.target as GraphNode).x!) / 2)
        .attr('y', (d) => ((d.source as GraphNode).y! + (d.target as GraphNode).y!) / 2);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [nodes, links]);

  return (
    <div ref={containerRef} className="w-full bg-[#050505] rounded-xl border border-white/10 overflow-hidden relative">
      <svg ref={svgRef} className="w-full h-[600px]" />
    </div>
  );
};
