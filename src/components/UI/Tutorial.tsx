import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard, Mouse, Eye } from 'lucide-react';
import { useStore } from '../../store/useStore';

/**
 * Tutorial overlay showing keyboard shortcuts and interaction guide.
 */
export function Tutorial() {
  const { features, toggleFeature } = useStore();

  if (!features.showTutorial) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={() => toggleFeature('showTutorial')}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-terminal-surface border border-terminal-border rounded-lg p-6 max-w-lg w-full mx-4"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm text-terminal-accent tracking-wider">
              HOW TO USE
            </h2>
            <button
              onClick={() => toggleFeature('showTutorial')}
              className="text-terminal-dim hover:text-terminal-text"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-5">
            {/* Keyboard */}
            <Section icon={<Keyboard size={14} />} title="KEYBOARD">
              <Shortcut keys="Space" action="Play / Pause timeline" />
              <Shortcut keys="H" action="Historical mode" />
              <Shortcut keys="L" action="Live mode" />
              <Shortcut keys="T" action="Toggle this help" />
              <Shortcut keys="1-5" action="Playback speed (0.5x–10x)" />
            </Section>

            {/* Mouse */}
            <Section icon={<Mouse size={14} />} title="MOUSE">
              <Shortcut keys="Hover sector" action="View stats & filter flows" />
              <Shortcut keys="Click sector" action="Open detail panel" />
              <Shortcut keys="Click event" action="View event narrative" />
            </Section>

            {/* Features */}
            <Section icon={<Eye size={14} />} title="FEATURES">
              <Shortcut keys="SMART $" action="Track whale addresses" />
              <Shortcut keys="DEAD" action="Failed projects memorial" />
              <Shortcut keys="PREDICT" action="Capital flow forecasts" />
            </Section>
          </div>

          <div className="mt-5 pt-4 border-t border-terminal-border text-center">
            <p className="font-display text-[10px] text-terminal-dim tracking-wider">
              DATA FROM DEFILLAMA • NARRATIVE EVENTS CURATED
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-terminal-accent">{icon}</span>
        <span className="font-display text-[10px] text-terminal-accent tracking-widest">{title}</span>
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Shortcut({ keys, action }: { keys: string; action: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="font-display text-terminal-text bg-terminal-bg px-2 py-0.5 rounded border border-terminal-border text-[10px]">
        {keys}
      </span>
      <span className="text-terminal-dim">{action}</span>
    </div>
  );
}
