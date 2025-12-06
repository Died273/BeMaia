import React from "react";
import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
  height?: number;
  color?: string;
  showGrid?: boolean;
}

export default function LineChart({ 
  data, 
  height = 240, 
  color = "var(--chart-blue)",
  showGrid = true 
}: LineChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;
  
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const chartHeight = height - padding.top - padding.bottom;
  const chartWidth = 100; // percentage
  
  const points = data.map((point, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
    return { x, y, ...point };
  });
  
  const pathD = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x}% ${p.y + padding.top}px`
  ).join(' ');
  
  const areaD = `${pathD} L ${points[points.length - 1].x}% ${chartHeight + padding.top}px L 0% ${chartHeight + padding.top}px Z`;
  
  return (
    <div className="relative w-full" style={{ height: `${height}px` }}>
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {showGrid && [0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
          const y = padding.top + chartHeight * (1 - ratio);
          const value = (minValue + range * ratio).toFixed(1);
          return (
            <g key={i}>
              <line
                x1="0"
                x2="100%"
                y1={y}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth={1}
                strokeDasharray="4 4"
                opacity={0.3}
              />
              <text
                x={padding.left - 10}
                y={y + 4}
                textAnchor="end"
                className="text-xs font-semibold fill-muted-foreground"
              >
                {value}
              </text>
            </g>
          );
        })}
        
        {/* Area under line */}
        <motion.path
          d={areaD}
          fill={color}
          opacity={0.1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        />
        
        {/* Line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        
        {/* Data points */}
        {points.map((point, i) => (
          <g key={i}>
            <motion.circle
              cx={`${point.x}%`}
              cy={point.y + padding.top}
              r={5}
              fill="white"
              stroke={color}
              strokeWidth={3}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
              className="cursor-pointer hover:r-6 transition-all"
            />
            
            {/* Labels */}
            <text
              x={`${point.x}%`}
              y={height - 10}
              textAnchor="middle"
              className="text-xs font-semibold fill-muted-foreground"
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
