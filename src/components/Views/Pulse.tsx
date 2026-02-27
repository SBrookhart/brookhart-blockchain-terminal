import { useMemo, useState } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { Sparkline } from '../Widgets/Sparkline';
import { ExecutiveSummary } from '../Widgets/ExecutiveSummary';
import { formatLargeNumber, formatPercent, getChangeColor } from '../../utils/format';
import type { TopStory, StoryCategory } from '../../types';

const SENTIMENT_COLOR: Record<TopStory['sentiment'], string> = {
  bullish: '#00ff88',
  bearish: '#ff4444',
  neutral: '#7a8496',
  caution: '#FFD700',
};

const CATEGORY_LABEL: Record<StoryCategory, string> = {
  'market-structure': 'MARKET STRUCTURE',
  regulation: 'REGULATION',
  institutional: 'INSTITUTIONAL',
  security: 'SECURITY',
  'narrative-shift': 'NARRATIVE SHIFT',
  macro: 'MACRO',
};

const CATEGORY_COLOR: Record<StoryCategory, string> = {
  'market-structure': '#FF6B6B',
  regulation: '#00D4FF',
  institutional: '#FFD700',
  security: '#FF4444',
  'narrative-shift': '#00FF88',
  macro: '#C084FC',
};

/**
 * Pulse — the home dashboard, redesigned as "The Briefing."
 *
 * Layout:
 *   - Executive Summary (auto-generated market context)
 *   - Top Stories (3-5 curated editorial pieces with source links)
 *   - Sidebar: Market ticker, Hottest chains, Live Wire
 */
export function Pulse() {
  const {
    topTokens, chains, topStories, wireItems,
    setActiveTab, selectChain,
  } = useStore();

  const [expandedStory, setExpandedStory] = useState<string | null>(null);

  const sortedStories = useMemo(
    () => [...topStories].sort((a, b) => b.importance - a.importance),
    [topStories]
  );

  const hotChains = useMemo(
    () => [...chains].sort((a, b) => (b.change_7d ?? 0) - (a.change_7d ?? 0)).slice(0, 6),
    [chains]
  );

  const sortedWire = useMemo(
    () => [...wireItems].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [wireItems]
  );

  return (
    <div className="space-y-2 p-2 h-full overflow-y-auto">
      {/* Executive Summary — auto-generated market context */}
      <ExecutiveSummary />

      <div className="grid grid-cols-12 gap-2">
        {/* ================================================
            LEFT COLUMN — TOP STORIES (the main attraction)
            ================================================ */}
        <div className="col-span-8 space-y-2">
          <Panel
            title="Top Stories"
            action={
              <span className="text-[9px] text-terminal-dim font-display">
                Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            }
          >
            <div className="space-y-0">
              {sortedStories.map((story, i) => {
                const isExpanded = expandedStory === story.id;
                const catColor = CATEGORY_COLOR[story.category];
                const sentimentColor = SENTIMENT_COLOR[story.sentiment];

                return (
                  <div
                    key={story.id}
                    className={`border-b border-terminal-border/30 last:border-0 ${isExpanded ? 'bg-terminal-bg/50' : ''}`}
                  >
                    {/* Story header — always visible */}
                    <button
                      className="w-full text-left p-3 hover:bg-terminal-bg/30 transition-colors"
                      onClick={() => setExpandedStory(isExpanded ? null : story.id)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Rank + sentiment bar */}
                        <div className="flex flex-col items-center gap-1 pt-0.5">
                          <span className="font-display text-sm text-terminal-dim">{i + 1}</span>
                          <div
                            className="w-0.5 flex-1 rounded-full min-h-[20px]"
                            style={{ backgroundColor: sentimentColor }}
                          />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="font-display text-[8px] tracking-wider px-1.5 py-0.5 rounded"
                              style={{ color: catColor, backgroundColor: catColor + '15' }}
                            >
                              {CATEGORY_LABEL[story.category]}
                            </span>
                            <span className="text-[9px] text-terminal-dim font-display">
                              {new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                            {story.relatedTokens && (
                              <span className="text-[9px] text-terminal-dim font-display ml-auto">
                                {story.relatedTokens.join(' · ')}
                              </span>
                            )}
                          </div>

                          <h3 className="text-[13px] text-terminal-text font-bold leading-snug mb-1">
                            {story.headline}
                          </h3>

                          <p className="text-[11px] text-terminal-dim leading-relaxed">
                            {story.hook}
                          </p>

                          {/* Expand hint */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <span className="text-[9px] text-terminal-accent font-display">
                              {isExpanded ? '▼ COLLAPSE' : '▶ READ ANALYSIS'}
                            </span>
                            <span className="text-[9px] text-terminal-dim font-display">
                              · {story.sources.length} sources
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Expanded analysis */}
                    {isExpanded && (
                      <div className="px-3 pb-4 pl-10">
                        {/* Full analysis text */}
                        <div className="text-[11px] text-terminal-dim leading-[1.7] whitespace-pre-line mb-4 border-l-2 border-terminal-border pl-3">
                          {story.analysis}
                        </div>

                        {/* Sources */}
                        <div className="mb-3">
                          <div className="font-display text-[9px] text-terminal-dim tracking-wider mb-1.5 uppercase">
                            Sources
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {story.sources.map((source, si) => (
                              <a
                                key={si}
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] text-terminal-accent hover:underline bg-terminal-bg px-2 py-1 rounded border border-terminal-border/50 hover:border-terminal-accent/50 transition-colors"
                              >
                                <span className="text-terminal-dim">↗</span>
                                {source.name}
                                {source.date && (
                                  <span className="text-terminal-dim text-[8px]">
                                    {new Date(source.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>

                        {/* Tags */}
                        {story.tags && (
                          <div className="flex flex-wrap gap-1.5">
                            {story.tags.map(tag => (
                              <span
                                key={tag}
                                className="text-[8px] font-display text-terminal-dim bg-terminal-border/30 px-1.5 py-0.5 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </Panel>
        </div>

        {/* ================================================
            RIGHT COLUMN — Market data + Wire feed
            ================================================ */}
        <div className="col-span-4 space-y-2">
          {/* Compact market ticker */}
          <Panel title="Market">
            <div className="space-y-0">
              {topTokens.slice(0, 6).map(token => (
                <div key={token.id} className="flex items-center gap-2 py-1.5 border-b border-terminal-border/30 last:border-0">
                  <span className="text-[11px] text-terminal-text font-medium w-10">{token.symbol.toUpperCase()}</span>
                  <span className="text-[11px] text-terminal-text font-display">
                    ${token.current_price.toLocaleString(undefined, { maximumFractionDigits: token.current_price > 100 ? 0 : 2 })}
                  </span>
                  {token.sparkline_in_7d && (
                    <Sparkline
                      data={token.sparkline_in_7d.price}
                      width={48}
                      height={14}
                      color={token.price_change_percentage_24h >= 0 ? '#00ff88' : '#ff4444'}
                    />
                  )}
                  <span className={`ml-auto font-display text-[10px] ${getChangeColor(token.price_change_percentage_24h)}`}>
                    {formatPercent(token.price_change_percentage_24h)}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Hottest chains */}
          <Panel
            title="Hottest Chains (7d)"
            action={
              <button onClick={() => setActiveTab('chains')} className="text-[9px] text-terminal-accent hover:underline">
                VIEW ALL
              </button>
            }
          >
            <div className="space-y-0">
              {hotChains.map(chain => (
                <div
                  key={chain.name}
                  className="flex items-center justify-between py-1.5 border-b border-terminal-border/30 last:border-0 hover:bg-terminal-bg cursor-pointer rounded px-1"
                  onClick={() => { selectChain(chain.name); setActiveTab('chains'); }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-terminal-text font-medium">{chain.name}</span>
                    <span className="text-[9px] text-terminal-dim font-display">{formatLargeNumber(chain.tvl)}</span>
                  </div>
                  <span className={`font-display text-[10px] ${getChangeColor(chain.change_7d ?? 0)}`}>
                    {chain.change_7d !== undefined ? formatPercent(chain.change_7d) : '--'}
                  </span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Live Wire — news feed */}
          <Panel
            title="Live Wire"
            action={
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-accent opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal-accent" />
              </span>
            }
          >
            <div className="space-y-0 max-h-[320px] overflow-y-auto">
              {sortedWire.map(item => {
                const wireColor = item.category ? CATEGORY_COLOR[item.category] : '#7a8496';
                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 px-1 border-b border-terminal-border/20 last:border-0 hover:bg-terminal-bg/50 transition-colors group"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="w-0.5 rounded-full flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: wireColor, minHeight: '12px' }}
                      />
                      <div className="min-w-0">
                        <div className="text-[10px] text-terminal-text leading-tight group-hover:text-terminal-accent transition-colors">
                          {item.headline}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-[8px] text-terminal-dim font-display">{item.source}</span>
                          <span className="text-[8px] text-terminal-dim font-display">
                            {formatWireTime(item.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

/** Format wire timestamp as relative time or short date */
function formatWireTime(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) return `${Math.round(diffMs / (1000 * 60))}m ago`;
  if (diffHours < 24) return `${Math.round(diffHours)}h ago`;
  if (diffHours < 48) return 'Yesterday';
  return then.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
