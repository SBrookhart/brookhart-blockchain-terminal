import { useRef, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { formatBillions } from '../../utils/format';
import { FlowArc } from './FlowArc';
import { SectorNode } from './SectorNode';

const RING_RADII = [160, 280, 370]; // Inner, mid, outer ring radii
const CENTER_X = 480;
const CENTER_Y = 400;

/**
 * OrbitalMap — the main visualization.
 * Sectors orbit a center point at different ring distances.
 * Animated arcs of light show capital flows between sectors.
 */
export function OrbitalMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const { sectors, flows, hoveredSector, selectedSector, selectSector, setHoveredSector } = useStore();

  // Calculate total TVL for center display
  const totalTvl = useMemo(
    () => sectors.reduce((sum, s) => sum + s.tvl, 0),
    [sectors]
  );

  // Calculate sector positions
  const sectorPositions = useMemo(() => {
    return sectors.map(sector => {
      const radius = RING_RADII[sector.ring] || RING_RADII[1];
      const x = CENTER_X + radius * Math.cos(sector.angle - Math.PI / 2);
      const y = CENTER_Y + radius * Math.sin(sector.angle - Math.PI / 2);
      // Scale node size by TVL (min 18, max 48)
      const size = Math.max(18, Math.min(48, 12 + sector.tvl * 0.7));
      return { ...sector, x, y, size };
    });
  }, [sectors]);

  // Build position lookup for flow arcs
  const posMap = useMemo(() => {
    const map = new Map<string, { x: number; y: number }>();
    for (const sp of sectorPositions) {
      map.set(sp.id, { x: sp.x, y: sp.y });
    }
    return map;
  }, [sectorPositions]);

  // Filter flows to show: if a sector is hovered/selected, only show its flows
  const visibleFlows = useMemo(() => {
    const active = hoveredSector || selectedSector;
    if (!active) return flows;
    return flows.filter(f => f.from === active || f.to === active);
  }, [flows, hoveredSector, selectedSector]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 960 800"
      className="w-full h-full"
      style={{ maxHeight: '100vh' }}
    >
      <defs>
        {/* Radial gradient for center glow */}
        <radialGradient id="center-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </radialGradient>

        {/* Glow filter for nodes */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Stronger glow for hovered nodes */}
        <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background grid (subtle) */}
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e2940" strokeWidth="0.5" />
      </pattern>
      <rect width="960" height="800" fill="url(#grid)" opacity="0.3" />

      {/* Ring guides */}
      {RING_RADII.map((r, i) => (
        <circle
          key={i}
          cx={CENTER_X}
          cy={CENTER_Y}
          r={r}
          fill="none"
          stroke="#1e2940"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.5"
        />
      ))}

      {/* Center glow */}
      <circle cx={CENTER_X} cy={CENTER_Y} r="100" fill="url(#center-glow)" />

      {/* Center label */}
      <text
        x={CENTER_X}
        y={CENTER_Y - 16}
        textAnchor="middle"
        className="fill-terminal-dim"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '11px' }}
      >
        TOTAL TVL
      </text>
      <text
        x={CENTER_X}
        y={CENTER_Y + 8}
        textAnchor="middle"
        className="fill-terminal-accent"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '22px', fontWeight: 700 }}
      >
        {formatBillions(totalTvl)}
      </text>
      <text
        x={CENTER_X}
        y={CENTER_Y + 28}
        textAnchor="middle"
        className="fill-terminal-dim"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
      >
        across {sectors.length} sectors
      </text>

      {/* Flow arcs (rendered below nodes) */}
      <AnimatePresence>
        {visibleFlows.map(flow => {
          const fromPos = posMap.get(flow.from);
          const toPos = posMap.get(flow.to);
          if (!fromPos || !toPos) return null;
          const fromSector = sectors.find(s => s.id === flow.from);
          const toSector = sectors.find(s => s.id === flow.to);
          return (
            <FlowArc
              key={flow.id}
              flow={flow}
              from={fromPos}
              to={toPos}
              color={toSector?.color || fromSector?.color || '#00ff88'}
            />
          );
        })}
      </AnimatePresence>

      {/* Sector nodes */}
      {sectorPositions.map(sp => (
        <SectorNode
          key={sp.id}
          sector={sp}
          x={sp.x}
          y={sp.y}
          size={sp.size}
          isHovered={hoveredSector === sp.id}
          isSelected={selectedSector === sp.id}
          onHover={(id) => setHoveredSector(id)}
          onClick={(id) => selectSector(selectedSector === id ? null : id)}
        />
      ))}

      {/* Crosshair at center */}
      <line x1={CENTER_X - 15} y1={CENTER_Y} x2={CENTER_X - 5} y2={CENTER_Y} stroke="#00ff88" strokeWidth="1" opacity="0.4" />
      <line x1={CENTER_X + 5} y1={CENTER_Y} x2={CENTER_X + 15} y2={CENTER_Y} stroke="#00ff88" strokeWidth="1" opacity="0.4" />
      <line x1={CENTER_X} y1={CENTER_Y - 15} x2={CENTER_X} y2={CENTER_Y - 5} stroke="#00ff88" strokeWidth="1" opacity="0.4" />
      <line x1={CENTER_X} y1={CENTER_Y + 5} x2={CENTER_X} y2={CENTER_Y + 15} stroke="#00ff88" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
