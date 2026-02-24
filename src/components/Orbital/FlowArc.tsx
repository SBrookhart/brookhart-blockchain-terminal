import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { CapitalFlow } from '../../types';

interface FlowArcProps {
  flow: CapitalFlow;
  from: { x: number; y: number };
  to: { x: number; y: number };
  color: string;
}

/**
 * An animated arc showing capital flow between two sector positions.
 * Uses a quadratic bezier curve with an animated dash offset to create
 * the "flowing light" effect.
 */
export function FlowArc({ flow, from, to, color }: FlowArcProps) {
  const pathRef = useRef<SVGPathElement>(null);

  // Calculate control point for the curved arc
  // Offset perpendicular to the line between from and to
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const curvature = Math.min(80, dist * 0.3);

  // Perpendicular offset (rotate 90 degrees)
  const nx = -dy / dist;
  const ny = dx / dist;

  const cx = (from.x + to.x) / 2 + nx * curvature;
  const cy = (from.y + to.y) / 2 + ny * curvature;

  const pathD = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;

  // Stroke width based on flow amount (min 1, max 6)
  const strokeWidth = Math.max(1, Math.min(6, flow.amount * 1.5));

  // Calculate path length for dash animation
  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      pathRef.current.style.strokeDasharray = `${length * 0.15} ${length * 0.85}`;
      pathRef.current.style.strokeDashoffset = `${length}`;
    }
  }, [pathD]);

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Static base path (dim) */}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth * 0.3}
        opacity={0.15}
      />

      {/* Animated flowing path */}
      <motion.path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={flow.intensity * 0.7}
        filter="url(#glow)"
        animate={{
          strokeDashoffset: [1000, -1000],
        }}
        transition={{
          duration: 4 / Math.max(0.3, flow.intensity),
          repeat: Infinity,
          ease: 'linear',
        }}
        style={{
          strokeDasharray: '40 200',
        }}
      />

      {/* Flow label at midpoint */}
      {flow.label && flow.intensity > 0.5 && (
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill={color}
          opacity={0.6}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '8px',
            letterSpacing: '0.05em',
          }}
        >
          {flow.label}
        </text>
      )}
    </motion.g>
  );
}
