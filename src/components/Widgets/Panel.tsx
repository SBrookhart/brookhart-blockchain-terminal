import type { ReactNode } from 'react';

interface PanelProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

/**
 * Reusable Bloomberg-style panel with title bar.
 */
export function Panel({ title, children, className = '', action }: PanelProps) {
  return (
    <div className={`bg-terminal-surface border border-terminal-border rounded ${className}`}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-terminal-border">
        <span className="font-display text-[10px] text-terminal-dim tracking-widest uppercase">
          {title}
        </span>
        {action}
      </div>
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}
