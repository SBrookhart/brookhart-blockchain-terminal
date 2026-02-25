/**
 * TransactionFlowDiagram — inline SVG flowchart showing
 * the 6-step lifecycle of a crypto transaction.
 *
 * Plain-language labels with clickable popup modals
 * for deeper explanations a layperson can understand.
 */
import { useState } from 'react';

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
  /** Detailed popup content written for a complete beginner */
  popup: {
    heading: string;
    paragraphs: string[];
    analogy: string;
  };
}

const NODES: FlowNode[] = [
  {
    step: 1,
    title: 'YOU',
    subtitle: 'Your Wallet',
    details: ['Confirm it\'s really you', 'Choose speed & fee'],
    popup: {
      heading: 'You Hit "Send"',
      paragraphs: [
        'When you send crypto, your wallet app creates a message that says "I want to send X amount to this address."',
        'Your wallet then signs that message with your private key — a secret code only you have. Think of it like your handwritten signature on a check. It proves YOU authorized the transaction, not someone else.',
        'You also choose how much you\'re willing to pay in fees. Every transaction costs a small fee (like a shipping cost). If you pay a higher fee, your transaction gets processed faster — like paying for express shipping.',
      ],
      analogy: 'It\'s like writing a check: you fill in the amount, sign it, and choose regular vs. overnight mail.',
    },
  },
  {
    step: 2,
    title: 'MEMPOOL',
    subtitle: 'The Waiting Room',
    details: ['Sent out to the network', 'Waits in a queue'],
    popup: {
      heading: 'The Waiting Room',
      paragraphs: [
        'After you hit send, your transaction gets broadcast to thousands of computers around the world. It lands in what\'s called the "mempool" — short for memory pool.',
        'The mempool is like a waiting room. Your transaction sits there alongside hundreds of other people\'s transactions, all waiting to be picked up and processed.',
        'Transactions that offered higher fees get picked up first — like tipping a valet to get your car back faster. During busy times, the wait can be longer.',
      ],
      analogy: 'Think of a busy restaurant: your order goes into the kitchen queue. The kitchen picks orders based on priority, not just who came first.',
    },
  },
  {
    step: 3,
    title: 'VALIDATORS',
    subtitle: 'The Checkers',
    details: ['Do you have enough?', 'Is it really you?', 'Does it follow the rules?'],
    popup: {
      heading: 'The Fact-Checkers',
      paragraphs: [
        'Validators are computers run by people around the world who volunteer (for a reward) to check that transactions are legitimate.',
        '"Do you have enough?" — They verify your account actually has the amount you\'re trying to send. No overdrafts allowed in crypto.',
        '"Is it really you?" — They check your digital signature to confirm you authorized this transaction. If the signature doesn\'t match, it gets rejected.',
        '"Does it follow the rules?" — If your transaction involves a smart contract (an automated program), validators make sure every condition is met before proceeding.',
      ],
      analogy: 'It\'s like a bank teller verifying your ID, checking your balance, and making sure the check is filled out correctly — except thousands of "tellers" all do it at once.',
    },
  },
  {
    step: 4,
    title: 'CONSENSUS',
    subtitle: 'Everyone Agrees',
    details: ['One checker proposes', 'The majority must approve'],
    popup: {
      heading: 'The Network Votes',
      paragraphs: [
        'This is the step that makes blockchain special. Instead of one bank making the final decision, the entire network has to agree.',
        'One validator is randomly selected to propose a batch of transactions and say: "I checked these — they\'re all valid."',
        'Then at least two-thirds of all validators must independently verify and approve that batch. If they agree, it moves forward. If not, it gets thrown out.',
        'This is why blockchain is called "trustless" — you don\'t need to trust any single person or company. The math and the majority keep everyone honest.',
      ],
      analogy: 'Imagine a classroom where no one can change their grade unless most of the students AND the teacher all verify the change is correct.',
    },
  },
  {
    step: 5,
    title: 'BLOCK',
    subtitle: 'Sealed in a Package',
    details: ['Bundled with other sends', 'Chained to the last block'],
    popup: {
      heading: 'Packaged Into a Block',
      paragraphs: [
        'Your transaction gets bundled together with hundreds of other approved transactions into a single package called a "block."',
        'Each block is mathematically linked to the previous block — like a chain of sealed envelopes where each one references the last. That\'s where the name "blockchain" comes from.',
        'On Ethereum, a new block is created roughly every 12 seconds. On Bitcoin, it\'s about every 10 minutes. Other chains like Solana create blocks much faster.',
        'Once your transaction is inside a block, it\'s almost done.',
      ],
      analogy: 'Think of a shipping container: your package gets loaded alongside hundreds of others, the container is sealed, and it gets a tracking number linked to the one before it.',
    },
  },
  {
    step: 6,
    title: 'CONFIRMED',
    subtitle: 'Done — Permanent',
    details: ['Double & triple checked', 'Can never be changed'],
    popup: {
      heading: 'It\'s Official and Permanent',
      paragraphs: [
        'After the block containing your transaction is added to the chain, additional blocks keep getting added on top of it.',
        'Each new block that\'s added is like another layer of concrete — it makes your transaction harder and harder to reverse. After a few blocks, it\'s considered completely final.',
        'On Ethereum, most apps consider a transaction "confirmed" after about 12-15 blocks (~3 minutes). On Bitcoin, it\'s usually 6 blocks (~1 hour) for large amounts.',
        'Once confirmed, the record exists permanently on every copy of the blockchain worldwide. No person, company, or government can alter or delete it.',
      ],
      analogy: 'Like carving something into stone, then burying it under layers of concrete. Each layer makes it more permanent. After enough layers, it\'s there forever.',
    },
  },
];

// ---- Layout constants ----
const NODE_W = 170;
const NODE_H_BASE = 92;      // min height before detail lines
const LINE_H = 15;            // height per detail line
const COL_GAP = 36;           // horizontal gap between nodes
const ROW_GAP = 36;           // vertical gap between rows
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

function NodeRect({
  node,
  index,
  onClick,
}: {
  node: FlowNode;
  index: number;
  onClick: () => void;
}) {
  const { x, y } = nodePos(index);
  const h = nodeHeight(node);
  const isFinal = node.step === 6;
  const r = 6;

  return (
    <g style={{ cursor: 'pointer' }} onClick={onClick}>
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

      {/* Invisible hit area for hover effect */}
      <rect
        x={x} y={y}
        width={NODE_W} height={h}
        rx={r}
        fill="transparent"
      />

      {/* Node background */}
      <rect
        x={x} y={y}
        width={NODE_W} height={h}
        rx={r}
        fill={C.surface}
        stroke={isFinal ? C.accent : C.border}
        strokeWidth={isFinal ? 1.5 : 1}
        className="hover:brightness-125 transition-all"
      />

      {/* Step badge */}
      <circle cx={x + 16} cy={y + 17} r={9} fill={C.bg} stroke={C.accent} strokeWidth={1} />
      <text x={x + 16} y={y + 21} textAnchor="middle" fill={C.accent} fontSize="9" fontFamily="monospace" fontWeight="bold">
        {node.step}
      </text>

      {/* Title */}
      <text x={x + 32} y={y + 21} fill={C.text} fontSize="11" fontFamily="monospace" fontWeight="bold">
        {node.title}
      </text>

      {/* Subtitle — positioned below title */}
      <text x={x + 14} y={y + 36} fill={C.dim} fontSize="9" fontFamily="monospace">
        {node.subtitle}
      </text>

      {/* "click to learn more" hint */}
      <text x={x + NODE_W - 10} y={y + 36} textAnchor="end" fill={C.accent} fontSize="7" fontFamily="monospace" opacity="0.6">
        click to learn more
      </text>

      {/* Divider */}
      <line x1={x + 10} y1={y + 44} x2={x + NODE_W - 10} y2={y + 44} stroke={C.border} strokeWidth="0.5" />

      {/* Detail lines */}
      {node.details.map((line, i) => (
        <text
          key={i}
          x={x + 14}
          y={y + 60 + i * LINE_H}
          fill={C.dim}
          fontSize="9"
          fontFamily="monospace"
        >
          • {line}
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
  const markerEnd = 'url(#arrowhead)';

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

// ---- Popup modal ----

function PopupModal({
  node,
  onClose,
}: {
  node: FlowNode;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-terminal-surface border border-terminal-border rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-terminal-surface border-b border-terminal-border px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-terminal-accent/15 border border-terminal-accent/40 flex items-center justify-center">
              <span className="font-display text-[12px] text-terminal-accent font-bold">{node.step}</span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-terminal-text font-display tracking-wide">
                {node.popup.heading}
              </h3>
              <p className="text-[10px] text-terminal-dim">
                Step {node.step} of 6
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-terminal-dim hover:text-terminal-text transition-colors text-[18px] leading-none px-2"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-4 space-y-3">
          {node.popup.paragraphs.map((p, i) => (
            <p key={i} className="text-[12px] text-terminal-dim leading-relaxed">
              {p}
            </p>
          ))}

          {/* Analogy callout */}
          <div className="bg-terminal-bg rounded-lg px-4 py-3 border-l-2 border-terminal-accent mt-4">
            <span className="text-[9px] font-display text-terminal-accent tracking-wider block mb-1">
              REAL-WORLD ANALOGY
            </span>
            <p className="text-[12px] text-terminal-dim leading-relaxed">
              {node.popup.analogy}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-terminal-border/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded text-[11px] font-display tracking-wider bg-terminal-accent/10 text-terminal-accent border border-terminal-accent/30 hover:bg-terminal-accent/20 transition-colors"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- Main component ----

export function TransactionFlowDiagram() {
  const [activeNode, setActiveNode] = useState<FlowNode | null>(null);

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
    <>
      <div className="bg-terminal-bg rounded border border-terminal-border p-2 mb-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          className="w-full"
          style={{ minWidth: 540, maxHeight: 340 }}
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
            <NodeRect
              key={node.step}
              node={node}
              index={i}
              onClick={() => setActiveNode(node)}
            />
          ))}
        </svg>
      </div>

      {/* Popup modal — rendered outside SVG in the DOM */}
      {activeNode && (
        <PopupModal node={activeNode} onClose={() => setActiveNode(null)} />
      )}
    </>
  );
}
