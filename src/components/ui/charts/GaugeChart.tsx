import React from "react";
import { motion } from "framer-motion";

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  size?: number;
}

export default function GaugeChart({ 
  value, 
  max = 5, 
  label = "",
  size = 200 
}: GaugeChartProps) {
  const percentage = (value / max) * 100;
  const radius = size / 2 - 20;
  const circumference = Math.PI * radius;
  const offset = circumference * (1 - percentage / 100);
  
  // Color based on score (assuming lower is better)
  const getColor = () => {
    if (value <= max * 0.5) return 'var(--success-bright)'; // Green
    if (value <= max * 0.7) return 'var(--warning)'; // Yellow
    return 'var(--danger)'; // Red
  };
  
  const color = getColor();
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size / 2 + 40 }}>
        <svg width={size} height={size / 2 + 40}>
          {/* Background arc */}
          <path
            d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth={20}
            strokeLinecap="round"
            opacity={0.2}
          />
          
          {/* Animated arc */}
          <motion.path
            d={`M ${size / 2 - radius} ${size / 2} A ${radius} ${radius} 0 0 1 ${size / 2 + radius} ${size / 2}`}
            fill="none"
            stroke={color}
            strokeWidth={20}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>
        
        {/* Value display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center mt-8">
          <motion.span
            className="text-4xl font-black"
            style={{ color }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {value.toFixed(1)}
          </motion.span>
          <span className="text-sm font-semibold text-muted-foreground">
            out of {max}
          </span>
        </div>
      </div>
      {label && (
        <p className="text-sm font-semibold text-foreground mt-2 text-center">
          {label}
        </p>
      )}
    </div>
  );
}
