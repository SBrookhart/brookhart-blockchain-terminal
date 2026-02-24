import { motion } from 'framer-motion';
import type { Sector } from '../../types';
import { formatBillions, formatPercent, getChangeColor } from '../../utils/format';

interface SectorNodeProps {
  sector: Sector;
  x: number;
  y: number;
  size: number;
  isHovered: boolean;
  isSelected: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
}

/**
 * A single sector node on the orbital visualization.
 * Renders as a glowing circle with a label.
 */
export function SectorNode({
  sector,
  x,
  y,
  size,
  isHovered,
  isSelected,
  onHover,
  onClick,
}: SectorNodeProps) {
  const isActive = isHovered || isSelected;
  const changeColor = getChangeColor(sector.change24h);

  return (
    <g
      onMouseEnter={() => onHover(sector.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onClick(sector.id)}
      style={{ cursor: 'pointer' }}
    >
      {/* Outer pulse ring (only when active) */}
      {isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={size + 12}
          fill="none"
          stroke={sector.color}
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.6, 0],
            scale: [1, 1.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      )}

      {/* Main circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={size}
        fill={sector.color}
        fillOpacity={isActive ? 0.25 : 0.12}
        stroke={sector.color}
        strokeWidth={isActive ? 2 : 1.5}
        filter={isActive ? 'url(#glow-strong)' : 'url(#glow)'}
        animate={{
          r: isActive ? size + 4 : size,
          fillOpacity: isActive ? 0.25 : 0.12,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner dot */}
      <circle
        cx={x}
        cy={y}
        r={4}
        fill={sector.color}
        opacity={0.9}
      />

      {/* Sector short name */}
      <text
        x={x}
        y={y - size - 10}
        textAnchor="middle"
        fill={sector.color}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: isActive ? '12px' : '10px',
          fontWeight: isActive ? 600 : 500,
          letterSpacing: '0.05em',
        }}
      >
        {sector.shortName}
      </text>

      {/* TVL label */}
      <text
        x={x}
        y={y + size + 18}
        textAnchor="middle"
        fill="#e4e8f0"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '11px',
          fontWeight: 500,
        }}
      >
        {formatBillions(sector.tvl)}
      </text>

      {/* Change percentage (only when hovered) */}
      {isActive && (
        <motion.text
          x={x}
          y={y + size + 32}
          textAnchor="middle"
          className={changeColor}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
          }}
          initial={{ opacity: 0, y: y + size + 28 }}
          animate={{ opacity: 1, y: y + size + 32 }}
        >
          {formatPercent(sector.change24h)}
        </motion.text>
      )}
    </g>
  );
}
