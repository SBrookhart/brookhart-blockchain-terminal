import { useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Panel } from '../Widgets/Panel';
import { formatLargeNumber, formatDate } from '../../utils/format';

/**
 * Risk / Dead Zone view.
 * Memorial for collapsed projects + risk analysis.
 */
export function Risk() {
  const { deadProjects, events } = useStore();

  const totalLost = useMemo(
    () => deadProjects.reduce((sum, p) => sum + p.amountLost, 0),
    [deadProjects]
  );

  const totalPeakTvl = useMemo(
    () => deadProjects.reduce((sum, p) => sum + p.peakTvl, 0),
    [deadProjects]
  );

  // Hack/collapse events
  const hackEvents = useMemo(
    () => events
      .filter(e => e.type === 'hack')
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [events]
  );

  return (
    <div className="grid grid-cols-12 gap-2 p-2 h-full overflow-y-auto">
      {/* Summary stats */}
      <div className="col-span-12 grid grid-cols-4 gap-2 mb-1">
        <div className="bg-red-950/20 border border-red-900/40 rounded p-3">
          <div className="font-display text-[9px] text-red-400/70 tracking-widest mb-1">TOTAL CAPITAL DESTROYED</div>
          <div className="font-display text-xl font-bold text-red-400">
            {formatLargeNumber(totalLost * 1_000_000_000)}
          </div>
        </div>
        <div className="bg-terminal-surface border border-terminal-border rounded p-3">
          <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-1">PEAK TVL (COMBINED)</div>
          <div className="font-display text-xl font-bold text-terminal-text">
            {formatLargeNumber(totalPeakTvl * 1_000_000_000)}
          </div>
        </div>
        <div className="bg-terminal-surface border border-terminal-border rounded p-3">
          <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-1">PROJECTS FAILED</div>
          <div className="font-display text-xl font-bold text-terminal-text">
            {deadProjects.length}
          </div>
        </div>
        <div className="bg-terminal-surface border border-terminal-border rounded p-3">
          <div className="font-display text-[9px] text-terminal-dim tracking-widest mb-1">MAJOR HACKS/COLLAPSES</div>
          <div className="font-display text-xl font-bold text-terminal-text">
            {hackEvents.length}
          </div>
        </div>
      </div>

      {/* Dead projects table */}
      <div className="col-span-8">
        <Panel title="Project Graveyard">
          <table className="w-full">
            <thead>
              <tr className="text-[9px] text-terminal-dim font-display tracking-wider">
                <th className="text-left pb-2">PROJECT</th>
                <th className="text-left pb-2">CAUSE</th>
                <th className="text-right pb-2">PEAK TVL</th>
                <th className="text-right pb-2">LOST</th>
                <th className="text-right pb-2">DATE</th>
              </tr>
            </thead>
            <tbody>
              {deadProjects.map(project => (
                <tr key={project.id} className="border-t border-terminal-border/30 hover:bg-terminal-bg/50">
                  <td className="py-2.5">
                    <span className="text-[11px] text-terminal-text font-medium">{project.name}</span>
                  </td>
                  <td className="py-2.5">
                    <span className="text-[10px] text-red-400/80">{project.cause}</span>
                  </td>
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

        {/* Detailed cards */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          {deadProjects.slice(0, 4).map(project => (
            <div key={project.id} className="bg-terminal-surface border border-terminal-border rounded p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-[11px] font-bold text-terminal-text">{project.name}</span>
                <span className="font-display text-[9px] text-terminal-dim">{formatDate(project.deathDate)}</span>
              </div>
              <p className="text-[10px] text-terminal-dim leading-relaxed mb-2">
                {project.description}
              </p>
              <div className="flex gap-3 text-[9px] font-display">
                <span className="text-terminal-dim">Peak: <span className="text-terminal-text">{formatLargeNumber(project.peakTvl * 1_000_000_000)}</span></span>
                <span className="text-terminal-dim">Lost: <span className="text-red-400">{formatLargeNumber(project.amountLost * 1_000_000_000)}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk lessons */}
      <div className="col-span-4">
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
                <div className="text-[11px] text-terminal-text font-medium mb-1">
                  {event.title}
                </div>
                <p className="text-[10px] text-terminal-dim leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="mt-2">
          <Panel title="Risk Patterns">
            <div className="space-y-2 text-[10px] text-terminal-dim leading-relaxed">
              <RiskPattern
                title="Algo Stablecoins"
                description="UST/LUNA proved algorithmic pegs can spiral. Always check collateral."
              />
              <RiskPattern
                title="CeFi Counterparty Risk"
                description="FTX, Celsius, BlockFi — centralized entities can misappropriate funds. Not your keys, not your crypto."
              />
              <RiskPattern
                title="Leverage Contagion"
                description="3AC's collapse cascaded across every major lender. Over-leverage is systemic risk."
              />
              <RiskPattern
                title="Due Diligence"
                description="If yields seem too good to be true, they probably are. Check TVL sources, audit reports, team backgrounds."
              />
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function RiskPattern({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-terminal-bg rounded border border-terminal-border p-2">
      <div className="font-display text-[10px] text-yellow-400/80 font-bold mb-0.5">{title}</div>
      <div className="text-[10px] text-terminal-dim">{description}</div>
    </div>
  );
}
