import React from "react";
import { motion } from "framer-motion";

interface StackedDataPoint {
  label: string;
  values: { category: string; value: number; color: string }[];
}

interface StackedBarChartProps {
  data: StackedDataPoint[];
  height?: number;
  horizontal?: boolean;
  compact?: boolean;
}

export default function StackedBarChart({ 
  data, 
  height = 300,
  horizontal = false,
  compact = false
}: StackedBarChartProps) {
  // Get all unique categories for legend
  const categories = Array.from(
    new Set(data.flatMap(d => d.values.map(v => v.category)))
  );
  
  const legendColors = data[0]?.values.reduce((acc, v) => {
    acc[v.category] = v.color;
    return acc;
  }, {} as Record<string, string>) || {};
  
  return (
    <div className={`flex flex-col ${compact ? 'gap-0' : 'gap-4'} h-full`}>
      <div className="relative w-full flex-1" style={{ height: `${height}px` }}>
        <div className={`flex items-end justify-around h-full gap-2 ${compact ? 'pb-4' : 'pb-8'}`}>
          {data.map((item, i) => {
            const total = item.values.reduce((sum, v) => sum + v.value, 0);
            
            return (
              <div key={i} className="flex flex-col items-center h-full flex-1 min-w-0">
                {/* Bar container with explicit height calculation */}
                <div className="flex-1 w-full relative flex flex-col justify-end" style={{ minHeight: 0 }}>
                  <div className="w-full flex flex-col-reverse rounded-t-lg overflow-hidden" style={{ height: '100%' }}>
                    {item.values.map((segment, j) => {
                      const percentage = (segment.value / total) * 100;
                      const heightPx = `${percentage}%`;
                      
                      return (
                        <motion.div
                          key={j}
                          className="w-full relative group cursor-pointer flex-shrink-0"
                          style={{ 
                            backgroundColor: segment.color,
                            height: heightPx,
                            minHeight: percentage > 5 ? '20px' : '10px'
                          }}
                          initial={{ scaleY: 0, originY: 1 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.1 + j * 0.05, duration: 0.6 }}
                        >
                          {percentage > 8 && (
                            <span className={`absolute inset-0 flex items-center justify-center ${compact ? 'text-[10px]' : 'text-xs'} font-bold text-white drop-shadow`}>
                              {percentage.toFixed(0)}%
                            </span>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
                
                <p className={`${compact ? 'text-[10px]' : 'text-xs'} font-semibold text-muted-foreground mt-1 text-center flex-shrink-0`}>
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend - only show if not compact */}
      {!compact && (
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, i) => (
            <div key={i} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: legendColors[category] }}
              />
              <span className="text-sm font-semibold text-foreground">
                {category}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
