/**
 * TransactionFlowDiagram — inline SVG flowchart showing
 * the 6-step lifecycle of a crypto transaction.
 *
 * Replaces the old ASCII diagram with a clean vector graphic
 * that matches the Bloomberg terminal aesthetic.
 */

// ---- Theme tokens (match tailwind.config.js) ----
const C = {
  bg: '#0a0e1a',
  surface: '#12182b',
  border: '#1e2940',
  text: '#e4e8f0',
  dim: '#7a8496',
  accent: '#00ff88',
} as const;

// ---- Node data ----
interface FlowNode {
  step: number;
  title: string;
  subtitle: string;
  details: string[];
}

const NODES: FlowNode[] = [
  {
    step: 1,
    title: 'YOU',
    subtitle: 'Wallet',
    details: ['Sign with private key', 'Set gas limit & fee'],
  },
  {
    step: 2,
    title: 'MEMPOOL',
    subtitle: 'Waiting Room',
    details: ['Broadcast to peers', 'Queued by fee priority'],
  },
  {
    step: 3,
    title: 'VALIDATORS',
    subtitle: 'Verify & Check',
    details: ['Balance sufficient?', 'Valid signature?', 'Contract rules met?'],
  },
  {
    step: 4,
    title: 'CONSENSUS',
    subtitle: 'Network Agrees',
    details: ['Validator proposes block', '2/3+ must agree'],
  },
  {
    step: 5,
    title: 'BLOCK',
    subtitle: 'Bundled Together',
    details: ['Grouped with other txs', 'Linked to prior block', '~12 sec on Ethereum'],
  },
  {
    step: 6,
    title: 'CONFIRMED',
    subtitle: 'Final & Permanent',
    details: ['Multiple confirmations', 'Irreversible record'],
  },
];

// ---- Layout constants ----
const NODE_W = 154;
const NODE_H_BASE = 84;    // min height before detail lines
const LINE_H = 13;         // height per detail line
const COL_GAP = 40;        // horizontal gap between nodes
const ROW_GAP = 30;        // vertical gap between rows
const COLS = 3;
const PADDING = 16;

function nodeHeight(n: FlowNode) {
  return NODE_H_BASE + n.details.length * LINE_H;
}

/** x/y origin of a node (top-left of its rect) */
function nodePos(index: number): { x: number; y: number } {
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  // Row 1 flows left-to-right; row 2 flows right-to-left
  const effectiveCol = row === 0 ? col : COLS - 1 - col;

  const x = PADDING + effectiveCol * (NODE_W + COL_GAP);
  // For row height, use the max node height in row 0
  const row0MaxH = Math.max(...NODES.slice(0, COLS).map(nodeHeight));
  const y = PADDING + row * (row0MaxH + ROW_GAP);
  return { x, y };
}

// ---- Sub-components ----

function NodeRect({ node, index }: { node: FlowNode; index: number }) {
  const { x, y } = nodePos(index);
  const h = nodeHeight(node);
  const isFinal = node.step === 6;
  const r = 6;

  return (
    <g>
      {/* Glow behind final node */}
      {isFinal && (
        <rect
          x={x - 2} y={y - 2}
          width={NODE_W + 4} height={h + 4}
          rx={r + 2}
          fill="none" stroke={C.accent} strokeWidth="1"
          opacity="0.25"
        >
          <animate attributeName="opacity" values="0.15;0.35;0.15" dur="3s" repeatCount="indefinite" />
        </rect>
      )}

      {/* Node background */}
      <rect
        x={x} y={y}
        width={NODE_W} height={h}
        rx={r}
        fill={C.surface}
        stroke={isFinal ? C.accent : C.border}
        strokeWidth={isFinal ? 1.5 : 1}
      />

      {/* Step badge */}
      <circle cx={x + 16} cy={y + 16} r={9} fill={C.bg} stroke={C.accent} strokeWidth={1} />
      <text x={x + 16} y={y + 20} textAnchor="middle" fill={C.accent} fontSize="9" fontFamily="monospace" fontWeight="bold">
        {node.step}
      </text>

      {/* Title */}
      <text x={x + 32} y={y + 20} fill={C.text} fontSize="11" fontFamily="monospace" fontWeight="bold">
        {node.title}
      </text>

      {/* Subtitle */}
      <text x={x + NODE_W - 10} y={y + 20} textAnchor="end" fill={C.dim} fontSize="9" fontFamily="monospace">
        {node.subtitle}
      </text>

      {/* Divider */}
      <line x1={x + 10} y1={y + 32} x2={x + NODE_W - 10} y2={y + 32} stroke={C.border} strokeWidth="0.5" />

      {/* Detail lines */}
      {node.details.map((line, i) => (
        <text
          key={i}
          x={x + 14}
          y={y + 48 + i * LINE_H}
          fill={C.dim}
          fontSize="9"
          fontFamily="monospace"
        >
          {line}
        </text>
      ))}

      {/* Status dot */}
      {isFinal ? (
        <circle cx={x + NODE_W - 14} cy={y + h - 14} r={4} fill={C.accent}>
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
      ) : (
        <circle cx={x + NODE_W - 14} cy={y + h - 14} r={3} fill="none" stroke={C.dim} strokeWidth="0.75" />
      )}
    </g>
  );
}

/** Arrow between two nodes */
function Arrow({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) {
  const from = nodePos(fromIndex);
  const fromNode = NODES[fromIndex];
  const to = nodePos(toIndex);
  const fromH = nodeHeight(fromNode);

  const sameRow = Math.floor(fromIndex / COLS) === Math.floor(toIndex / COLS);

  let path: string;
  let markerEnd = 'url(#arrowhead)';

  if (sameRow) {
    // Horizontal: right edge → left edge
    const goingRight = to.x > from.x;
    const startX = goingRight ? from.x + NODE_W : from.x;
    const endX = goingRight ? to.x : to.x + NODE_W;
    const cy = from.y + fromH / 2;
    path = `M ${startX} ${cy} L ${endX} ${cy}`;
  } else {
    // Vertical connector between rows (step 3 → step 4)
    const startX = from.x + NODE_W / 2;
    const startY = from.y + fromH;
    const endX = to.x + NODE_W / 2;
    const endY = to.y;
    const midY = startY + (endY - startY) / 2;
    path = `M ${startX} ${startY} L ${startX} ${midY} L ${endX} ${midY} L ${endX} ${endY}`;
  }

  return (
    <path
      d={path}
      fill="none"
      stroke={C.accent}
      strokeWidth="1.25"
      strokeDasharray="6 4"
      markerEnd={markerEnd}
      opacity="0.6"
    >
      <animate attributeName="stroke-dashoffset" values="20;0" dur="2s" repeatCount="indefinite" />
    </path>
  );
}

// ---- Main component ----

export function TransactionFlowDiagram() {
  // Calculate viewBox dimensions
  const row0MaxH = Math.max(...NODES.slice(0, COLS).map(nodeHeight));
  const row1MaxH = Math.max(...NODES.slice(COLS).map(nodeHeight));
  const totalW = PADDING * 2 + COLS * NODE_W + (COLS - 1) * COL_GAP;
  const totalH = PADDING * 2 + row0MaxH + ROW_GAP + row1MaxH;

  // Arrow connections: 0→1, 1→2, 2→3 (down), 3→4, 4→5
  const arrows = [
    [0, 1], [1, 2],   // row 0 left→right
    [2, 3],            // row 0 → row 1 (vertical bend)
    [3, 4], [4, 5],   // row 1 right→left
  ];

  return (
    <div className="bg-terminal-bg rounded border border-terminal-border p-2 mb-4 overflow-x-auto">
      <svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="w-full"
        style={{ minWidth: 520, maxHeight: 320 }}
      >
        {/* Defs */}
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill={C.accent} opacity="0.7" />
          </marker>
          {/* Glow filter for final node */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Arrows (rendered first so nodes sit on top) */}
        {arrows.map(([from, to]) => (
          <Arrow key={`${from}-${to}`} fromIndex={from} toIndex={to} />
        ))}

        {/* Nodes */}
        {NODES.map((node, i) => (
          <NodeRect key={node.step} node={node} index={i} />
        ))}
      </svg>
    </div>
  );
}
