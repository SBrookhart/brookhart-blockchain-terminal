interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
}

/**
 * Tiny inline sparkline chart (SVG).
 * Used in tables and cards for 7d price trends.
 */
export function Sparkline({ data, width = 80, height = 24, color = '#00ff88' }: SparklineProps) {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * height;
    return `${x},${y}`;
  });

  // Determine color from trend
  const trending = data[data.length - 1] >= data[0];
  const lineColor = color || (trending ? '#00ff88' : '#ff4444');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
