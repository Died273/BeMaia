import React from "react";
import { motion } from "framer-motion";

interface PieDataPoint {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieDataPoint[];
  size?: number;
  showPercentage?: boolean;
}

export default function PieChart({ 
  data, 
  size = 200,
  showPercentage = true 
}: PieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const center = size / 2;
  const radius = size / 2 - 10;
  
  let currentAngle = -90; // Start at top
  
  const slices = data.map((item) => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    
    currentAngle = endAngle;
    
    // Calculate path for pie slice
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);
    
    const largeArc = angle > 180 ? 1 : 0;
    
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    // Calculate label position
    const labelAngle = (startAngle + endAngle) / 2;
    const labelRad = (labelAngle * Math.PI) / 180;
    const labelDistance = radius * 0.7;
    const labelX = center + labelDistance * Math.cos(labelRad);
    const labelY = center + labelDistance * Math.sin(labelRad);
    
    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
      labelX,
      labelY
    };
  });
  
  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size}>
        {slices.map((slice, i) => (
          <g key={i}>
            <motion.path
              d={slice.pathData}
              fill={slice.color}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              className="cursor-pointer hover:opacity-80 transition-opacity"
            />
            {showPercentage && parseFloat(slice.percentage) > 5 && (
              <text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-bold fill-white pointer-events-none"
              >
                {slice.percentage}%
              </text>
            )}
          </g>
        ))}
      </svg>
      
      {/* Legend */}
      <div className="flex flex-col gap-2 w-full">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="w-4 h-4 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-semibold text-foreground flex-1">
              {item.label}
            </span>
            <span className="text-sm font-bold text-muted-foreground">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
