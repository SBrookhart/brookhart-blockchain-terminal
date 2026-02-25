import { useState } from 'react';
import { Panel } from '../Widgets/Panel';
import { useStore } from '../../store/useStore';
import {
  GLOSSARY,
  TRANSACTION_LIFECYCLE,
  CHAIN_PROFILES,
  CHAIN_PERSONAS,
  COST_SCENARIOS,
  CONTRACT_EXAMPLE,
} from '../../data/education';
import { TransactionFlowDiagram } from '../Widgets/TransactionFlowDiagram';
import { SmartContractDiagram } from '../Widgets/SmartContractDiagram';
import type { GlossaryTerm } from '../../data/education';

type LearnSection = 'transaction' | 'smart-contract' | 'glossary' | 'chains';

const SECTION_TABS: { id: LearnSection; label: string }[] = [
  { id: 'transaction', label: 'How a Transaction Works' },
  { id: 'smart-contract', label: 'Anatomy of a Smart Contract' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'chains', label: 'BTC vs ETH vs SOL vs AVAX' },
];

/**
 * Learn — educational mini-lessons for crypto newcomers.
 *
 * Three sections:
 * 1. Lifecycle of a crypto transaction (step-by-step + diagram)
 * 2. Glossary of key terms (expandable cards)
 * 3. Chain comparison (table + expandable profiles)
 */
export function Learn() {
  const { selectedLearnSection, selectLearnTerm } = useStore();
  const [activeSection, setActiveSection] = useState<LearnSection>(
    selectedLearnSection === 'glossary' ? 'glossary'
      : selectedLearnSection === 'chains' ? 'chains'
        : selectedLearnSection === 'smart-contract' ? 'smart-contract'
          : 'transaction'
  );
  const [expandedTerm, setExpandedTerm] = useState<string | null>(
    useStore.getState().selectedLearnTerm,
  );
  const [expandedChain, setExpandedChain] = useState<string | null>(null);
  const [expandedScenario, setExpandedScenario] = useState<string | null>(null);

  const handleTermToggle = (id: string) => {
    const next = expandedTerm === id ? null : id;
    setExpandedTerm(next);
    selectLearnTerm(null);
  };

  const handleChainToggle = (id: string) => {
    setExpandedChain(expandedChain === id ? null : id);
  };

  return (
    <div className="p-2 h-full overflow-y-auto space-y-2">
      {/* Section intro */}
      <div className="bg-terminal-surface border border-terminal-border rounded px-4 py-3">
        <h2 className="font-display text-[14px] text-terminal-accent tracking-wide mb-1">LEARN</h2>
        <p className="text-[11px] text-terminal-dim leading-relaxed">
          New to crypto? Start here. These mini-lessons explain the fundamentals — no jargon, no assumptions.
          Each one takes about 2-3 minutes to read.
        </p>
      </div>

      {/* Section switcher */}
      <div className="flex gap-1">
        {SECTION_TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id)}
            className={`px-3 py-1.5 rounded text-[10px] font-display tracking-wider transition-colors ${
              activeSection === tab.id
                ? 'bg-terminal-accent/15 text-terminal-accent border border-terminal-accent/30'
                : 'bg-terminal-surface text-terminal-dim border border-terminal-border hover:text-terminal-text'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ============================================================ */}
      {/* SECTION 1: Transaction Lifecycle */}
      {/* ============================================================ */}
      {activeSection === 'transaction' && (
        <div className="space-y-2">
          <Panel title="The Lifecycle of a Crypto Transaction">
            <p className="text-[11px] text-terminal-dim leading-relaxed mb-4">
              Every time you send crypto, swap tokens, or interact with a DeFi app, your transaction goes through
              a series of steps. Here's what happens behind the scenes, from the moment you hit "send" to when
              it's permanently recorded on the blockchain.
            </p>

            {/* SVG flow diagram */}
            <TransactionFlowDiagram />

            {/* Steps */}
            <div className="space-y-3">
              {TRANSACTION_LIFECYCLE.map((step) => (
                <div key={step.step} className="flex gap-3">
                  {/* Step number */}
                  <div className="flex-shrink-0 w-7 h-7 rounded-full bg-terminal-accent/10 border border-terminal-accent/30 flex items-center justify-center">
                    <span className="font-display text-[10px] text-terminal-accent font-bold">{step.step}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[12px] font-bold text-terminal-text mb-0.5">
                      {step.title}
                    </div>
                    <p className="text-[11px] text-terminal-dim leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 2: Anatomy of a Smart Contract */}
      {/* ============================================================ */}
      {activeSection === 'smart-contract' && (
        <div className="space-y-2">
          <Panel title="Anatomy of a Smart Contract">
            <p className="text-[11px] text-terminal-dim leading-relaxed mb-4">
              A smart contract is a program that lives on a blockchain. But what does it actually look like on the inside?
              Every smart contract has the same basic building blocks. Understanding these parts helps you read what a project
              actually does — not just what it claims to do.
            </p>

            {/* Interactive SVG diagram */}
            <SmartContractDiagram />
          </Panel>

          {/* Full example contract */}
          <Panel title="Putting It All Together — A Token Swap Contract">
            <p className="text-[11px] text-terminal-dim leading-relaxed mb-3">
              Here's what a real DeFi contract looks like, simplified into plain-English pseudocode.
              This is essentially how Uniswap works — users swap tokens, the contract enforces the rules,
              and everything is transparent and automatic.
            </p>
            <div className="mb-3 bg-terminal-bg rounded px-3 py-2 border-l-2 border-blue-400">
              <span className="text-[9px] font-display text-blue-400 tracking-wider">NOTE: </span>
              <span className="text-[11px] text-terminal-dim">
                This is readable pseudocode, not actual Solidity (the programming language used to write real smart contracts
                on Ethereum). Real Solidity code looks more like traditional programming — but the logic and structure are the same.
                We wrote it this way so you can focus on <em>what</em> a contract does, not the syntax.
              </span>
            </div>
            <div className="bg-terminal-bg rounded border border-terminal-border p-3 overflow-x-auto">
              <pre className="text-[10px] text-terminal-text font-mono leading-relaxed whitespace-pre">
                {CONTRACT_EXAMPLE.trim()}
              </pre>
            </div>
            <div className="mt-3 bg-terminal-bg rounded px-3 py-2 border-l-2 border-yellow-400">
              <span className="text-[9px] font-display text-yellow-400 tracking-wider">KEY TAKEAWAY: </span>
              <span className="text-[11px] text-terminal-dim">
                The entire logic is visible. Anyone can read the contract's code on the blockchain before trusting it with
                their money. This transparency is what makes DeFi different from traditional finance — the rules aren't hidden
                in a legal document, they're written in code that anyone can verify.
              </span>
            </div>
          </Panel>
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: Glossary */}
      {/* ============================================================ */}
      {activeSection === 'glossary' && (
        <div className="space-y-1">
          {GLOSSARY.map(term => (
            <GlossaryCard
              key={term.id}
              term={term}
              isExpanded={expandedTerm === term.id}
              onToggle={() => handleTermToggle(term.id)}
              onNavigate={(id) => { setExpandedTerm(id); }}
            />
          ))}
        </div>
      )}

      {/* ============================================================ */}
      {/* SECTION 3: Chain Comparison */}
      {/* ============================================================ */}
      {activeSection === 'chains' && (
        <div className="space-y-2">
          {/* Scenario-based cost table */}
          <Panel title="What Does It Actually Cost?">
            <p className="text-[11px] text-terminal-dim leading-relaxed mb-3">
              Forget abstract "gas fees." Here's what real actions cost on each chain — in plain dollars.
            </p>
            <div className="space-y-2">
              {COST_SCENARIOS.map((scenario) => (
                <div key={scenario.action} className="border border-terminal-border/50 rounded overflow-hidden">
                  <button
                    onClick={() => setExpandedScenario(expandedScenario === scenario.action ? null : scenario.action)}
                    className="w-full flex items-center justify-between px-3 py-2 hover:bg-terminal-bg transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-terminal-accent font-mono font-bold w-5">{scenario.icon}</span>
                      <div className="text-left">
                        <span className="text-[12px] font-bold text-terminal-text">{scenario.action}</span>
                        <span className="text-[10px] text-terminal-dim ml-2">{scenario.description}</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-terminal-dim font-display">
                      {expandedScenario === scenario.action ? '\u25BC' : '\u25B6'}
                    </span>
                  </button>

                  {expandedScenario === scenario.action && (
                    <div className="px-3 pb-3 border-t border-terminal-border/30 pt-2">
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: 'Bitcoin (BTC)', value: scenario.btc, color: '#f7931a' },
                          { label: 'Ethereum (ETH)', value: scenario.eth, color: '#627eea' },
                          { label: 'Solana (SOL)', value: scenario.sol, color: '#9945ff' },
                          { label: 'Avalanche (AVAX)', value: scenario.avax, color: '#e84142' },
                        ].map(item => (
                          <div key={item.label} className="bg-terminal-bg rounded px-3 py-2 border-l-2" style={{ borderColor: item.color }}>
                            <div className="text-[9px] font-display tracking-wider mb-1" style={{ color: item.color }}>
                              {item.label.toUpperCase()}
                            </div>
                            <div className="text-[10px] text-terminal-dim leading-relaxed whitespace-pre-line">
                              {item.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Panel>

          {/* Persona cards — "Who is this chain for?" */}
          <Panel title="Which Chain Is Right for You?">
            <p className="text-[11px] text-terminal-dim leading-relaxed mb-3">
              Each chain has a personality. Find the one that matches how you want to use crypto.
            </p>
            <div className="space-y-1">
              {CHAIN_PERSONAS.map(persona => {
                const colors: Record<string, string> = {
                  bitcoin: '#f7931a',
                  ethereum: '#627eea',
                  solana: '#9945ff',
                  avalanche: '#e84142',
                };
                const color = colors[persona.id] || '#00ff88';

                return (
                  <div key={persona.id} className="border border-terminal-border/50 rounded overflow-hidden">
                    <button
                      onClick={() => handleChainToggle(persona.id)}
                      className="w-full flex items-center justify-between px-3 py-2 hover:bg-terminal-bg transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[12px] font-bold text-terminal-text">{persona.chain}</span>
                        <span className="text-[10px] text-terminal-dim font-display">{persona.symbol}</span>
                        <span className="text-[9px] text-terminal-dim truncate">{persona.tagline}</span>
                      </div>
                      <span className="text-[10px] text-terminal-dim font-display flex-shrink-0 ml-2">
                        {expandedChain === persona.id ? '\u25BC' : '\u25B6'}
                      </span>
                    </button>

                    {expandedChain === persona.id && (
                      <div className="px-3 pb-3 space-y-3 border-t border-terminal-border/30">
                        {/* Think of it as */}
                        <div className="pt-3">
                          <p className="text-[11px] text-terminal-dim leading-relaxed">
                            {persona.thinkOfItAs}
                          </p>
                        </div>

                        {/* You'll love it if + Watch out for */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-terminal-bg rounded px-3 py-2">
                            <div className="text-[9px] font-display text-terminal-accent tracking-wider mb-1.5">
                              YOU&apos;LL LOVE IT IF...
                            </div>
                            {persona.youllLoveItIf.map((item, i) => (
                              <div key={i} className="text-[10px] text-terminal-dim leading-relaxed mb-1 flex gap-1.5">
                                <span className="text-terminal-accent flex-shrink-0">+</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                          <div className="bg-terminal-bg rounded px-3 py-2">
                            <div className="text-[9px] font-display text-yellow-400 tracking-wider mb-1.5">
                              WATCH OUT FOR...
                            </div>
                            {persona.watchOutFor.map((item, i) => (
                              <div key={i} className="text-[10px] text-terminal-dim leading-relaxed mb-1 flex gap-1.5">
                                <span className="text-yellow-400 flex-shrink-0">!</span>
                                <span>{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Real cost + Trust level */}
                        <div className="space-y-2">
                          <div className="bg-terminal-bg rounded px-3 py-2 border-l-2" style={{ borderColor: color }}>
                            <span className="text-[9px] font-display tracking-wider block mb-1" style={{ color }}>
                              WHAT IT ACTUALLY COSTS
                            </span>
                            <span className="text-[10px] text-terminal-dim leading-relaxed">{persona.realCost}</span>
                          </div>
                          <div className="bg-terminal-bg rounded px-3 py-2 border-l-2 border-terminal-accent">
                            <span className="text-[9px] font-display text-terminal-accent tracking-wider block mb-1">
                              TRUST & SECURITY
                            </span>
                            <span className="text-[10px] text-terminal-dim leading-relaxed">{persona.trustLevel}</span>
                          </div>
                        </div>

                        {/* Tech specs link to deep dive */}
                        {(() => {
                          const profile = CHAIN_PROFILES.find(c => c.id === persona.id);
                          if (!profile) return null;
                          return (
                            <div className="grid grid-cols-4 gap-1.5">
                              {[
                                { label: 'Consensus', value: profile.consensus },
                                { label: 'TPS', value: profile.tps },
                                { label: 'Block Time', value: profile.blockTime },
                                { label: 'TVL', value: profile.tvl },
                              ].map(stat => (
                                <div key={stat.label} className="bg-terminal-bg rounded px-2 py-1.5 text-center">
                                  <div className="text-[7px] text-terminal-dim font-display tracking-wider uppercase">{stat.label}</div>
                                  <div className="text-[9px] text-terminal-text font-medium">{stat.value}</div>
                                </div>
                              ))}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

// ---- Glossary Card Sub-Component ----

function GlossaryCard({
  term,
  isExpanded,
  onToggle,
  onNavigate,
}: {
  term: GlossaryTerm;
  isExpanded: boolean;
  onToggle: () => void;
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="bg-terminal-surface border border-terminal-border rounded overflow-hidden">
      {/* Header — always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 py-2 hover:bg-terminal-bg transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-bold text-terminal-text">{term.term}</span>
          <span className="text-[10px] text-terminal-dim">— {term.shortDef}</span>
        </div>
        <span className="text-[10px] text-terminal-dim font-display">
          {isExpanded ? '▼' : '▶'}
        </span>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-3 pb-3 space-y-2 border-t border-terminal-border/30">
          <p className="text-[11px] text-terminal-dim leading-relaxed pt-2">
            {term.explanation}
          </p>

          {term.analogy && (
            <div className="bg-terminal-bg rounded px-3 py-2 border-l-2 border-terminal-accent">
              <span className="text-[9px] font-display text-terminal-accent tracking-wider">ANALOGY: </span>
              <span className="text-[11px] text-terminal-dim">{term.analogy}</span>
            </div>
          )}

          {term.relatedTerms && term.relatedTerms.length > 0 && (
            <div className="flex items-center gap-1.5 pt-1">
              <span className="text-[9px] font-display text-terminal-dim tracking-wider">RELATED:</span>
              {term.relatedTerms.map(relId => {
                const related = GLOSSARY.find(g => g.id === relId);
                return related ? (
                  <button
                    key={relId}
                    onClick={(e) => { e.stopPropagation(); onNavigate(relId); }}
                    className="text-[9px] text-terminal-accent hover:underline font-display"
                  >
                    {related.term}
                  </button>
                ) : null;
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
