import React from "react";
import { motion } from "framer-motion";

interface Word {
  text: string;
  value: number;
}

interface WordCloudProps {
  words: Word[];
  height?: number;
}

export default function WordCloud({ words, height = 240 }: WordCloudProps) {
  const maxValue = Math.max(...words.map(w => w.value));
  const minValue = Math.min(...words.map(w => w.value));
  const range = maxValue - minValue || 1;
  
  // Sort by value descending
  const sortedWords = [...words].sort((a, b) => b.value - a.value);
  
  const getSize = (value: number) => {
    const normalized = (value - minValue) / range;
    return 12 + normalized * 32; // 12px to 44px
  };
  
  const getColor = (value: number) => {
    const normalized = (value - minValue) / range;
    if (normalized > 0.7) return '#EB5F43'; // High frequency - red
    if (normalized > 0.4) return '#fbbf24'; // Medium - yellow
    return '#6366f1'; // Low - blue
  };
  
  return (
    <div 
      className="flex flex-wrap items-center justify-center gap-3 p-6"
      style={{ minHeight: `${height}px` }}
    >
      {sortedWords.map((word, i) => (
        <motion.span
          key={i}
          className="font-bold cursor-pointer hover:opacity-70 transition-opacity"
          style={{
            fontSize: `${getSize(word.value)}px`,
            color: getColor(word.value),
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          title={`Mentioned ${word.value} times`}
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  );
}
