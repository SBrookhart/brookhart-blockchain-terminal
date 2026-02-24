import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatLargeNumber, formatDate } from '../../utils/format';

/**
 * Graveyard view — dead narratives + dead projects + lessons learned.
 * "History doesn't repeat, but it rhymes."
 */
export function Graveyard() {
  const { deadProjects, narratives, events } = useStore();

  const deadNarratives = useMemo(
    () => narratives.filter(n => n.status === 'dead'),
    [narratives]
  );

  const totalLost = useMemo(
    () => deadProjects.reduce((sum, p) => sum + p.amountLost, 0),
    [deadProjects]
  );

  const hackEvents = useMemo(
    () => events
      .filter(e => e.type === 'hack')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [events]
  );

  return (
    <div className="grid grid-cols-12 gap-2 p-2 h-full overflow-y-auto">
      {/* Header stats */}
      <div className="col-span-12 grid grid-cols-3 gap-2 mb-1">
        <div className="bg-red-950/20 border border-red-900/40 rounded p-3">
          <div className="font-display text-[9px] text-red-400/70 tracking-widest mb-1">CAPITAL DESTROYED</div>
          <div className="font-display text-xl font-bold text-red-400">
            {formatLargeNumber(totalLost * 1_000_000_000)}
          </div>
        </div>
        <div className="bg-terminal-surface border border-terminal-border rounded p-3">
          <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-1">DEAD NARRATIVES</div>
          <div className="font-display text-xl font-bold text-terminal-text">
            {deadNarratives.length}
          </div>
        </div>
        <div className="bg-terminal-surface border border-terminal-border rounded p-3">
          <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-1">FAILED PROJECTS</div>
          <div className="font-display text-xl font-bold text-terminal-text">
            {deadProjects.length}
          </div>
        </div>
      </div>

      {/* Left: Dead narratives + projects */}
      <div className="col-span-8 space-y-2">
        {/* Dead narratives */}
        <Panel title="Dead Narratives — learn from the cycle">
          <div className="space-y-3">
            {deadNarratives.map(narrative => (
              <div key={narrative.id} className="bg-terminal-bg rounded border border-red-900/20 p-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] text-terminal-text font-bold">{narrative.name}</span>
                  <span className="font-display text-[8px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded tracking-wider">
                    DEAD
                  </span>
                  {narrative.endDate && (
                    <span className="ml-auto font-display text-[9px] text-terminal-dim">
                      {formatDate(narrative.startDate)} {'\u2192'} {formatDate(narrative.endDate)}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-terminal-dim leading-relaxed mb-2">
                  {narrative.thesis}
                </p>
                {narrative.keyMetrics.length > 0 && (
                  <div className="flex gap-4 text-[9px] font-display">
                    {narrative.keyMetrics.map(m => (
                      <span key={m.label} className="text-terminal-dim">
                        {m.label}: <span className="text-red-400/80">{m.value}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Panel>

        {/* Dead projects table */}
        <Panel title="Project Graveyard">
          <table className="w-full">
            <thead>
              <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
                <th className="text-left pb-2">PROJECT</th>
                <th className="text-left pb-2">CAUSE OF DEATH</th>
                <th className="text-right pb-2">PEAK TVL</th>
                <th className="text-right pb-2">CAPITAL LOST</th>
                <th className="text-right pb-2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {deadProjects.map(project => (
                <tr key={project.id} className="border-t border-terminal-border/30 hover:bg-terminal-bg/50">
                  <td className="py-2.5">
                    <span className="text-[11px] text-terminal-text font-medium">{project.name}</span>
                  </td>
                  <td className="py-2.5 text-[10px] text-red-400/80">{project.cause}</td>
                  <td className="py-2.5 text-right font-display text-[11px] text-terminal-text">
                    {formatLargeNumber(project.peakTvl * 1_000_000_000)}
                  </td>
                  <td className="py-2.5 text-right font-display text-[11px] text-red-400">
                    {formatLargeNumber(project.amountLost * 1_000_000_000)}
                  </td>
                  <td className="py-2.5 text-right font-display text-[10px] text-terminal-dim">
                    {formatDate(project.deathDate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>

      {/* Right: Collapse events + lessons */}
      <div className="col-span-4 space-y-2">
        <Panel title="Collapse Events">
          <div className="space-y-3">
            {hackEvents.map(event => (
              <div key={event.id} className="py-2 border-b border-terminal-border/30 last:border-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-400" />
                  <span className="font-display text-[8px] text-terminal-dim tracking-wider">
                    {formatDate(event.timestamp)}
                  </span>
                </div>
                <div className="text-[11px] text-terminal-text font-medium mb-1">{event.title}</div>
                <p className="text-[10px] text-terminal-dim leading-relaxed">{event.description}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Lessons for the Next Cycle">
          <div className="space-y-2">
            <Lesson
              title="If it needs new money to pay old holders, it's a ponzi"
              description="UST/Anchor, HEX, Bitconnect — unsustainable yield is the oldest trick."
            />
            <Lesson
              title="Centralized custody = counterparty risk"
              description="FTX, Celsius, BlockFi all held customer funds. Self-custody or understand the risk."
            />
            <Lesson
              title="Leverage cascades are systemic"
              description="3AC's collapse hit every major lender. One entity's leverage is everyone's problem."
            />
            <Lesson
              title="Narrative ≠ fundamentals"
              description="NFTs did $5B/month at peak. Now ~$50M. Social buzz can evaporate overnight."
            />
            <Lesson
              title="The meta-game shifts every cycle"
              description="2020: yield farming. 2021: NFTs. 2024: memecoins. Adapt or hold the bag."
            />
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Lesson({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-terminal-bg rounded border border-terminal-border p-2">
      <div className="text-[10px] text-yellow-400/80 font-bold mb-0.5">{title}</div>
      <div className="text-[9px] text-terminal-dim leading-relaxed">{description}</div>
    </div>
  );
}
