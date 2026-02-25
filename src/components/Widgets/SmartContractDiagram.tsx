/**
 * SmartContractDiagram — inline SVG flowchart showing
 * the anatomy of a smart contract with 6 building blocks
 * arranged visually, plus a lifecycle flow at the top.
 *
 * Matches the TransactionFlowDiagram style: clickable nodes
 * with popup modals for deeper explanations.
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
  blue: '#60a5fa',
  yellow: '#fbbf24',
  purple: '#a78bfa',
  orange: '#fb923c',
  pink: '#f472b6',
} as const;

// ---- Node data ----
interface ContractNode {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  icon: string;
  details: string[];
  color: string;
  popup: {
    heading: string;
    paragraphs: string[];
    analogy: string;
    codeExample: string;
    whyItMatters: string;
  };
}

const NODES: ContractNode[] = [
  {
    id: 'address',
    step: 1,
    title: 'ADDRESS',
    subtitle: 'Its Identity',
    icon: '0x',
    details: ['Unique ID on the blockchain', 'Anyone can look it up'],
    color: C.accent,
    popup: {
      heading: 'The Address — Where It Lives',
      paragraphs: [
        'Every smart contract gets a unique address when it\'s deployed to the blockchain — like a street address for a building. This address never changes.',
        'When you "interact with Uniswap," you\'re actually sending a transaction to Uniswap\'s contract address. Your wallet knows the address and handles this for you.',
        'You can paste any contract address into a block explorer (like Etherscan) to see its code, every transaction it\'s ever processed, and how much money it holds. Total transparency.',
      ],
      analogy: 'Like a store\'s address on Google Maps. You need the address to go there, and anyone can look it up to see the reviews, hours, and what\'s inside.',
      codeExample: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984\n(This is Uniswap\'s UNI token contract on Ethereum)',
      whyItMatters: 'Scammers create fake contracts with similar names. Always verify the contract address through official sources before interacting with it.',
    },
  },
  {
    id: 'state',
    step: 2,
    title: 'STATE',
    subtitle: 'Its Memory',
    icon: '{}',
    details: ['Data it tracks on-chain', 'Balances, totals, settings'],
    color: C.blue,
    popup: {
      heading: 'The State — What It Remembers',
      paragraphs: [
        'State is the contract\'s memory — the data it permanently stores on the blockchain. A token contract remembers how many tokens each person holds. A lending contract tracks who borrowed what and how much interest they owe.',
        'Every time you interact with a contract (swap tokens, deposit funds, etc.), the state updates. These updates cost gas because you\'re paying the entire network to store and remember this new data.',
        'State is always public. Anyone can read any contract\'s state on a block explorer. This is why DeFi is transparent — you can literally verify that a protocol holds the funds it claims to.',
      ],
      analogy: 'Like a bank\'s ledger that records every customer\'s balance — except this ledger is posted on a public billboard that the whole world can read and verify.',
      codeExample: 'balances:\n  Alice  → 500 USDC\n  Bob    → 1,200 USDC\n\ntotalSupply: 1,000,000 tokens\nowner: 0xABC...123\nlocked: false',
      whyItMatters: 'When you see a DeFi protocol\'s TVL (Total Value Locked), that number comes directly from reading the contract\'s state. You can verify it yourself.',
    },
  },
  {
    id: 'functions',
    step: 3,
    title: 'FUNCTIONS',
    subtitle: 'Its Actions',
    icon: 'f()',
    details: ['Buttons you can press', 'Read data or change state'],
    color: C.purple,
    popup: {
      heading: 'The Functions — What It Can Do',
      paragraphs: [
        'Functions are the actions a contract can perform — they\'re like buttons on a vending machine. A token contract has functions like "transfer" (send tokens), "approve" (let another app spend your tokens), and "balanceOf" (check a balance).',
        'There are two types: "write" functions that change the state (these cost gas, because the network has to record the change) and "read" functions that just look up data (these are free).',
        'When you click "Swap" on Uniswap, your wallet is calling the swap() function on the contract. When you see your token balance, the app is calling balanceOf() behind the scenes.',
        'The key insight: a contract can ONLY do what its functions allow. No hidden features, no backdoors (unless the code has one — which is why reading the code matters).',
      ],
      analogy: 'Like the services menu at a bank: deposit, withdraw, transfer, check balance. Each service has specific rules about who can use it and what it does. The bank can\'t suddenly offer a new service without everyone knowing.',
      codeExample: 'swap(sell: USDC, amount: 1000)\n  → sends you ETH based on current price\n\napprove(spender: Uniswap, amount: 500)\n  → lets Uniswap use 500 of your USDC\n\nbalanceOf(Alice)\n  → returns 500 USDC  (free to call)',
      whyItMatters: 'Before using any DeFi protocol, look at what functions it has. "Approve unlimited" functions are a common attack vector — only approve what you need.',
    },
  },
  {
    id: 'events',
    step: 4,
    title: 'EVENTS',
    subtitle: 'Its Receipts',
    icon: '>>',
    details: ['Logs when things happen', 'Apps listen for these'],
    color: C.orange,
    popup: {
      heading: 'The Events — What It Announces',
      paragraphs: [
        'Every time something important happens in a contract, it emits an "event" — a log entry that says what just occurred. When you transfer tokens, the contract emits a Transfer event: "Alice sent 100 USDC to Bob."',
        'Events are how apps stay updated in real time. When you see your transaction appear on a block explorer or your wallet balance update, the app was listening for events from the contract.',
        'Events create a permanent, searchable history. You can query: "Show me every swap on Uniswap in the last hour" or "Every time this whale moved more than $1M." This is how on-chain analytics tools like Arkham and Nansen work.',
      ],
      analogy: 'Like receipts and push notifications combined. Every time you use your debit card, you get a receipt and your bank sends a notification. Events are the blockchain\'s version — permanent records that anyone can search.',
      codeExample: 'Event: Transfer(\n  from: Alice,\n  to: Bob,\n  amount: 100 USDC\n)\n\nEvent: Swap(\n  user: Alice,\n  sold: 1000 USDC,\n  bought: 0.4 ETH,\n  fee: 3 USDC\n)',
      whyItMatters: 'On-chain analytics and "whale tracking" rely entirely on events. When someone says "a whale just moved $50M," they found that by monitoring Transfer events.',
    },
  },
  {
    id: 'rules',
    step: 5,
    title: 'RULES',
    subtitle: 'Its Permissions',
    icon: '!!',
    details: ['Who can do what', 'Enforced by code, not people'],
    color: C.yellow,
    popup: {
      heading: 'The Rules — Who Can Do What',
      paragraphs: [
        'Not everyone can do everything. Smart contracts have access control rules that determine who can call which functions. Some functions are public (anyone can swap tokens), while others are restricted (only the owner can pause the contract).',
        'These rules are enforced by the code itself — not by a person making a judgment call. If the code says "only the governance system can change fees," then even the contract\'s creator can\'t change fees without going through governance.',
        'Common permission patterns: "onlyOwner" (just the deployer), "governance" (requires a community vote), "timelock" (must wait X days after proposing a change), and "multisig" (requires multiple people to approve).',
        'The most decentralized protocols hand control to governance DAOs so no single person has power. The most centralized ones keep an admin key that can change anything — which is a trust assumption you should be aware of.',
      ],
      analogy: 'Like permissions at a company. An employee can check their own paycheck, but only HR can change salaries, and only the CEO can fire people. The org chart is built into the system.',
      codeExample: 'transfer → anyone (with their own tokens)\npause   → only contract owner\nsetFee  → only governance vote\nupgrade → multisig (3 of 5 signers)\nwithdraw → only if you have a balance',
      whyItMatters: 'Before depositing money into a DeFi protocol, check who has admin control. If one wallet can drain the contract, that\'s a massive risk — no matter how good the yield looks.',
    },
  },
  {
    id: 'immutability',
    step: 6,
    title: 'PERMANENT',
    subtitle: 'Can\'t Be Changed',
    icon: '##',
    details: ['Code is locked forever', 'Bugs are permanent too'],
    color: C.pink,
    popup: {
      heading: 'Immutability — Locked in Stone',
      paragraphs: [
        'Once a smart contract is deployed to the blockchain, its code cannot be changed. Period. This is both the superpower and the Achilles\' heel of smart contracts.',
        'The superpower: nobody can secretly change the rules after you\'ve agreed to them. If a contract says "0.3% fee," that fee can\'t be changed (unless the code specifically includes a function to change it, which you can check).',
        'The risk: if there\'s a bug in the code, it can\'t be patched like updating an iPhone app. The bug is permanent. This is why smart contract audits are critical — and why multi-million dollar hacks happen when auditors miss a vulnerability.',
        'Some contracts use "proxy patterns" that allow upgrades, but this requires trusting whoever controls the upgrade key. There\'s always a tradeoff between upgradability and trustlessness.',
      ],
      analogy: 'Like carving a legal contract into stone. Nobody can alter the terms after signing, which protects you — but if there\'s a loophole, it\'s carved in stone too. The only option is to deploy a new stone (new contract) and convince everyone to switch.',
      codeExample: 'Deployed once → lives forever at its address\nCode is public → anyone can read it on Etherscan\nBugs are permanent → audits happen BEFORE deploy\n\nUpgradeable? Check for:\n  → ProxyAdmin (who controls upgrades?)\n  → Timelock (how much warning before changes?)',
      whyItMatters: 'When a protocol says "audited by Trail of Bits," that audit was done on the deployed code. If the contract is upgradeable, the new code might NOT be audited.',
    },
  },
];

// ---- Lifecycle flow nodes (top section) ----
interface LifecycleStep {
  label: string;
  desc: string;
}

const LIFECYCLE: LifecycleStep[] = [
  { label: 'WRITE', desc: 'Developer codes it' },
  { label: 'TEST', desc: 'Audit for bugs' },
  { label: 'DEPLOY', desc: 'Send to blockchain' },
  { label: 'INTERACT', desc: 'Users call functions' },
  { label: 'PERMANENT', desc: 'Lives forever' },
];

// ---- Layout constants ----
// Lifecycle bar
const LC_NODE_W = 100;
const LC_NODE_H = 38;
const LC_GAP = 12;
const LC_Y = 12;
const LC_TOTAL_W = LIFECYCLE.length * LC_NODE_W + (LIFECYCLE.length - 1) * LC_GAP;

// Building block nodes
const NODE_W = 170;
const NODE_H_BASE = 88;
const LINE_H = 15;
const COL_GAP = 32;
const ROW_GAP = 32;
const COLS = 3;
const BLOCK_Y_START = LC_Y + LC_NODE_H + 40;
const PADDING = 16;

function nodeHeight(n: ContractNode) {
  return NODE_H_BASE + n.details.length * LINE_H;
}

function nodePos(index: number): { x: number; y: number } {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  const effectiveCol = row === 0 ? col : COLS - 1 - col;

  const totalGridW = COLS * NODE_W + (COLS - 1) * COL_GAP;
  const gridStartX = PADDING + (LC_TOTAL_W - totalGridW) / 2;
  const x = gridStartX + effectiveCol * (NODE_W + COL_GAP);

  const row0MaxH = Math.max(...NODES.slice(0, COLS).map(nodeHeight));
  const y = BLOCK_Y_START + row * (row0MaxH + ROW_GAP);
  return { x, y };
}

// ---- Sub-components ----

function LifecycleBar() {
  const startX = PADDING;
  return (
    <g>
      {/* Section label */}
      <text
        x={startX}
        y={LC_Y - 1}
        fill={C.dim}
        fontSize="7"
        fontFamily="monospace"
        textDecoration="uppercase"
        letterSpacing="1.5"
      >
        LIFECYCLE: FROM CODE TO BLOCKCHAIN
      </text>

      {LIFECYCLE.map((step, i) => {
        const x = startX + i * (LC_NODE_W + LC_GAP);
        const isFinal = i === LIFECYCLE.length - 1;
        return (
          <g key={step.label}>
            <rect
              x={x} y={LC_Y}
              width={LC_NODE_W} height={LC_NODE_H}
              rx={4}
              fill={isFinal ? C.accent + '15' : C.surface}
              stroke={isFinal ? C.accent : C.border}
              strokeWidth={isFinal ? 1.2 : 0.75}
            />
            <text
              x={x + LC_NODE_W / 2} y={LC_Y + 16}
              textAnchor="middle"
              fill={isFinal ? C.accent : C.text}
              fontSize="9"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {step.label}
            </text>
            <text
              x={x + LC_NODE_W / 2} y={LC_Y + 28}
              textAnchor="middle"
              fill={C.dim}
              fontSize="7.5"
              fontFamily="monospace"
            >
              {step.desc}
            </text>

            {/* Arrow */}
            {i < LIFECYCLE.length - 1 && (
              <g>
                <line
                  x1={x + LC_NODE_W} y1={LC_Y + LC_NODE_H / 2}
                  x2={x + LC_NODE_W + LC_GAP} y2={LC_Y + LC_NODE_H / 2}
                  stroke={C.accent}
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  opacity="0.5"
                >
                  <animate attributeName="stroke-dashoffset" values="14;0" dur="2s" repeatCount="indefinite" />
                </line>
                <polygon
                  points={`${x + LC_NODE_W + LC_GAP - 4},${LC_Y + LC_NODE_H / 2 - 3} ${x + LC_NODE_W + LC_GAP},${LC_Y + LC_NODE_H / 2} ${x + LC_NODE_W + LC_GAP - 4},${LC_Y + LC_NODE_H / 2 + 3}`}
                  fill={C.accent}
                  opacity="0.5"
                />
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function SectionLabel() {
  const pos = nodePos(0);
  return (
    <text
      x={pos.x}
      y={BLOCK_Y_START - 10}
      fill={C.dim}
      fontSize="7"
      fontFamily="monospace"
      letterSpacing="1.5"
    >
      THE 6 BUILDING BLOCKS — CLICK TO EXPLORE
    </text>
  );
}

function NodeRect({
  node,
  index,
  onClick,
}: {
  node: ContractNode;
  index: number;
  onClick: () => void;
}) {
  const { x, y } = nodePos(index);
  const h = nodeHeight(node);
  const r = 6;

  return (
    <g style={{ cursor: 'pointer' }} onClick={onClick}>
      {/* Node background */}
      <rect
        x={x} y={y}
        width={NODE_W} height={h}
        rx={r}
        fill={C.surface}
        stroke={node.color}
        strokeWidth={0.75}
        opacity={0.95}
        className="hover:brightness-125 transition-all"
      />

      {/* Color accent bar on left */}
      <rect
        x={x} y={y}
        width={3} height={h}
        rx={1.5}
        fill={node.color}
        opacity={0.6}
      />

      {/* Step badge */}
      <circle cx={x + 18} cy={y + 17} r={9} fill={C.bg} stroke={node.color} strokeWidth={1} />
      <text x={x + 18} y={y + 21} textAnchor="middle" fill={node.color} fontSize="9" fontFamily="monospace" fontWeight="bold">
        {node.step}
      </text>

      {/* Title */}
      <text x={x + 34} y={y + 21} fill={C.text} fontSize="11" fontFamily="monospace" fontWeight="bold">
        {node.title}
      </text>

      {/* Subtitle */}
      <text x={x + 14} y={y + 36} fill={C.dim} fontSize="9" fontFamily="monospace">
        {node.subtitle}
      </text>

      {/* "click to learn more" hint */}
      <text x={x + NODE_W - 10} y={y + 36} textAnchor="end" fill={node.color} fontSize="7" fontFamily="monospace" opacity="0.6">
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
          {'\u2022'} {line}
        </text>
      ))}

      {/* Icon badge bottom-right */}
      <text
        x={x + NODE_W - 14}
        y={y + h - 10}
        textAnchor="end"
        fill={node.color}
        fontSize="10"
        fontFamily="monospace"
        fontWeight="bold"
        opacity={0.4}
      >
        {node.icon}
      </text>
    </g>
  );
}

/** Arrow between two building-block nodes */
function Arrow({ fromIndex, toIndex }: { fromIndex: number; toIndex: number }) {
  const from = nodePos(fromIndex);
  const fromNode = NODES[fromIndex];
  const to = nodePos(toIndex);
  const fromH = nodeHeight(fromNode);

  const sameRow = Math.floor(fromIndex / COLS) === Math.floor(toIndex / COLS);

  let path: string;

  if (sameRow) {
    const goingRight = to.x > from.x;
    const startX = goingRight ? from.x + NODE_W : from.x;
    const endX = goingRight ? to.x : to.x + NODE_W;
    const cy = from.y + fromH / 2;
    path = `M ${startX} ${cy} L ${endX} ${cy}`;
  } else {
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
      strokeWidth="1"
      strokeDasharray="6 4"
      markerEnd="url(#sc-arrowhead)"
      opacity="0.4"
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
  node: ContractNode;
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
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: node.color + '20', borderColor: node.color + '60', borderWidth: 1 }}
            >
              <span className="font-display text-[12px] font-bold" style={{ color: node.color }}>
                {node.step}
              </span>
            </div>
            <div>
              <h3 className="text-[14px] font-bold text-terminal-text font-display tracking-wide">
                {node.popup.heading}
              </h3>
              <p className="text-[10px] text-terminal-dim">
                Building Block {node.step} of 6
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-terminal-dim hover:text-terminal-text transition-colors text-[18px] leading-none px-2"
          >
            {'\u2715'}
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

          {/* Code example */}
          <div className="bg-terminal-bg rounded-lg border border-terminal-border p-3 mt-3">
            <span className="text-[9px] font-display tracking-wider block mb-2" style={{ color: node.color }}>
              EXAMPLE
            </span>
            <pre className="text-[10px] text-terminal-text font-mono leading-relaxed whitespace-pre-wrap">
              {node.popup.codeExample}
            </pre>
          </div>

          {/* Why it matters */}
          <div className="bg-terminal-bg rounded-lg px-4 py-3 border-l-2 mt-3" style={{ borderColor: C.yellow }}>
            <span className="text-[9px] font-display tracking-wider block mb-1" style={{ color: C.yellow }}>
              WHY THIS MATTERS TO YOU
            </span>
            <p className="text-[12px] text-terminal-dim leading-relaxed">
              {node.popup.whyItMatters}
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

export function SmartContractDiagram() {
  const [activeNode, setActiveNode] = useState<ContractNode | null>(null);

  // Calculate viewBox
  const row0MaxH = Math.max(...NODES.slice(0, COLS).map(nodeHeight));
  const row1MaxH = Math.max(...NODES.slice(COLS).map(nodeHeight));
  const totalW = PADDING * 2 + LC_TOTAL_W;
  const totalH = BLOCK_Y_START + row0MaxH + ROW_GAP + row1MaxH + PADDING;

  const arrows = [
    [0, 1], [1, 2],
    [2, 3],
    [3, 4], [4, 5],
  ];

  return (
    <>
      <div className="bg-terminal-bg rounded border border-terminal-border p-2 mb-4 overflow-x-auto">
        <svg
          viewBox={`0 0 ${totalW} ${totalH}`}
          className="w-full"
          style={{ minWidth: 560, maxHeight: 420 }}
        >
          <defs>
            <marker id="sc-arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill={C.accent} opacity="0.5" />
            </marker>
          </defs>

          {/* Lifecycle bar at top */}
          <LifecycleBar />

          {/* Section label */}
          <SectionLabel />

          {/* Arrows between building blocks */}
          {arrows.map(([from, to]) => (
            <Arrow key={`${from}-${to}`} fromIndex={from} toIndex={to} />
          ))}

          {/* Building block nodes */}
          {NODES.map((node, i) => (
            <NodeRect
              key={node.id}
              node={node}
              index={i}
              onClick={() => setActiveNode(node)}
            />
          ))}
        </svg>
      </div>

      {activeNode && (
        <PopupModal node={activeNode} onClose={() => setActiveNode(null)} />
      )}
    </>
  );
}
