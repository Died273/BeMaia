import React from "react";
import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  easier: number;
  harder: number;
}

interface DivergingBarChartProps {
  data: DataPoint[];
  height?: number;
}

export default function DivergingBarChart({ 
  data, 
  height = 300 
}: DivergingBarChartProps) {
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.easier, d.harder))
  );
  
  return (
    <div className="space-y-4">
      {data.map((item, i) => {
        const easierPercent = (item.easier / maxValue) * 50;
        const harderPercent = (item.harder / maxValue) * 50;
        
        return (
          <div key={i} className="space-y-1">
            <p className="text-sm font-semibold text-foreground text-center">
              {item.label}
            </p>
            <div className="flex items-center gap-2">
              {/* Easier side (left) */}
              <div className="flex-1 flex justify-end">
                <motion.div
                  className="h-10 rounded-l-lg flex items-center justify-end px-3"
                  style={{ 
                    width: `${easierPercent * 2}%`,
                    backgroundColor: 'var(--primary)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${easierPercent * 2}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  {item.easier > 0 && (
                    <span className="text-xs font-bold text-white">
                      {item.easier}
                    </span>
                  )}
                </motion.div>
              </div>
              
              {/* Center line */}
              <div className="w-px h-12 bg-border" />
              
              {/* Harder side (right) */}
              <div className="flex-1 flex justify-start">
                <motion.div
                  className="h-10 rounded-r-lg flex items-center justify-start px-3"
                  style={{ 
                    width: `${harderPercent * 2}%`,
                    backgroundColor: 'var(--secondary)'
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${harderPercent * 2}%` }}
                  transition={{ delay: i * 0.1, duration: 0.8 }}
                >
                  {item.harder > 0 && (
                    <span className="text-xs font-bold text-white">
                      {item.harder}
                    </span>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Legend */}
      <div className="flex justify-center gap-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--primary)' }} />
          <span className="text-sm font-semibold text-foreground">Easier</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: 'var(--secondary)' }} />
          <span className="text-sm font-semibold text-foreground">Harder</span>
        </div>
      </div>
    </div>
  );
}
