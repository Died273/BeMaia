import React from "react";
import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface HorizontalBarChartProps {
  data: DataPoint[];
  height?: number;
}

export default function HorizontalBarChart({ 
  data, 
  height = 300 
}: HorizontalBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  return (
    <div className="space-y-3" style={{ maxHeight: `${height}px`, overflowY: 'auto' }}>
      {sortedData.map((item, i) => {
        const percentage = (item.value / maxValue) * 100;
        const color = item.color || '#6366f1';
        
        return (
          <div key={i} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">
                {item.label}
              </span>
              <span className="text-sm font-bold font-number text-muted-foreground" style={{ fontFamily: 'Arial, sans-serif' }}>
                {item.value}
              </span>
            </div>
            <div className="w-full h-8 bg-muted/30 rounded-lg overflow-hidden">
              <motion.div
                className="h-full flex items-center px-3 rounded-lg"
                style={{ backgroundColor: color }}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
              >
                {percentage > 20 && (
                  <span className="text-xs font-bold text-white">
                    {percentage.toFixed(0)}%
                  </span>
                )}
              </motion.div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
