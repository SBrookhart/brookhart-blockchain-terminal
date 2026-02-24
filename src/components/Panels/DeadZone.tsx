import { motion, AnimatePresence } from 'framer-motion';
import { X, Skull } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { formatBillions, formatDate } from '../../utils/format';
import { getTotalLost } from '../../data/deadProjects';

/**
 * Dead Zone — a memorial for failed/collapsed projects.
 * Bloomberg-style panel with total losses and individual project cards.
 */
export function DeadZonePanel() {
  const { features, deadProjects, toggleFeature } = useStore();

  if (!features.showDeadZone) return null;

  const totalLost = getTotalLost();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 320, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 320, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed right-0 top-12 bottom-0 w-80 z-40 bg-terminal-surface/95 backdrop-blur border-l border-terminal-border overflow-y-auto"
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Skull size={16} className="text-red-400" />
              <span className="font-display text-sm font-bold text-red-400 tracking-wider">
                DEAD ZONE
              </span>
            </div>
            <button
              onClick={() => toggleFeature('showDeadZone')}
              className="text-terminal-dim hover:text-terminal-text"
            >
              <X size={14} />
            </button>
          </div>

          {/* Total losses */}
          <div className="bg-red-950/30 rounded border border-red-900/50 p-3 mb-4">
            <div className="font-display text-[10px] text-red-400/70 tracking-widest mb-1">
              TOTAL CAPITAL DESTROYED
            </div>
            <div className="font-display text-2xl font-bold text-red-400">
              {formatBillions(totalLost)}
            </div>
            <div className="font-display text-[10px] text-terminal-dim mt-1">
              across {deadProjects.length} projects
            </div>
          </div>

          {/* Project cards */}
          <div className="space-y-3">
            {deadProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-terminal-bg rounded border border-terminal-border p-3"
              >
                {/* Tombstone header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display text-xs font-bold text-terminal-text">
                    {project.name}
                  </span>
                  <span className="font-display text-[9px] text-terminal-dim">
                    {formatDate(project.deathDate)}
                  </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <div className="font-display text-[8px] text-terminal-dim tracking-widest">
                      PEAK TVL
                    </div>
                    <div className="font-display text-xs text-terminal-text">
                      {formatBillions(project.peakTvl)}
                    </div>
                  </div>
                  <div>
                    <div className="font-display text-[8px] text-terminal-dim tracking-widest">
                      LOST
                    </div>
                    <div className="font-display text-xs text-red-400">
                      {formatBillions(project.amountLost)}
                    </div>
                  </div>
                </div>

                {/* Cause */}
                <div className="font-display text-[9px] text-red-400/80 bg-red-950/20 rounded px-2 py-1 mb-2">
                  {project.cause}
                </div>

                {/* Description */}
                <p className="text-[11px] text-terminal-dim leading-relaxed">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-terminal-border text-center">
            <p className="font-display text-[9px] text-terminal-dim tracking-wider">
              REST IN PEACE
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
