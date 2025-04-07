
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  probability?: number;
  state?: 'true' | 'false' | 'unknown';
}

interface Edge {
  from: string;
  to: string;
}

interface NetworkGraphProps {
  nodes: Node[];
  edges: Edge[];
  className?: string;
  interactive?: boolean;
  onNodeClick?: (id: string) => void;
}

const NetworkGraph = ({
  nodes,
  edges,
  className,
  interactive = false,
  onNodeClick
}: NetworkGraphProps) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // In a real implementation, this would use D3.js or a similar library
    // to create an interactive graph visualization
  }, [nodes, edges]);

  const getNodeColor = (node: Node) => {
    if (node.state === 'true') return 'fill-truth-500';
    if (node.state === 'false') return 'fill-destructive';
    if (node.probability !== undefined) {
      if (node.probability > 0.7) return 'fill-truth-500';
      if (node.probability > 0.3) return 'fill-amber-500';
      return 'fill-destructive';
    }
    return 'fill-network-400';
  };

  const getNodeBorder = (node: Node) => {
    return node.state !== undefined ? 'stroke-2 stroke-gray-800' : 'stroke-1 stroke-gray-400';
  };

  return (
    <div className={cn("w-full h-full min-h-[300px] bg-white rounded-md p-4", className)}>
      <svg ref={svgRef} className="w-full h-full">
        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          
          if (!fromNode || !toNode) return null;
          
          return (
            <line
              key={`edge-${i}`}
              x1={fromNode.x}
              y1={fromNode.y}
              x2={toNode.x}
              y2={toNode.y}
              className="graph-edge stroke-gray-300 stroke-[2px]"
            />
          );
        })}
        
        {/* Nodes */}
        {nodes.map(node => (
          <g
            key={node.id}
            className={cn("graph-node", interactive && "cursor-pointer")}
            onClick={() => interactive && onNodeClick && onNodeClick(node.id)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={30}
              className={cn(getNodeColor(node), getNodeBorder(node))}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white text-xs font-medium"
            >
              {node.label}
            </text>
            {node.probability !== undefined && (
              <text
                x={node.x}
                y={node.y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-white text-[10px]"
              >
                {(node.probability * 100).toFixed(0)}%
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default NetworkGraph;
