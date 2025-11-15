/**
 * NumberText Component
 * 
 * Automatically wraps all numbers in text with Arial font styling
 * while keeping the rest of the text in the default font.
 * 
 * @example
 * <NumberText>Exhaustion at 4.5/5 indicates severe burnout risk.</NumberText>
 * // Renders: "Exhaustion at " + <span class="font-number">4.5/5</span> + " indicates severe burnout risk."
 */

import React from 'react';

interface NumberTextProps {
  children: string;
  className?: string;
}

const NumberText: React.FC<NumberTextProps> = ({ children, className = '' }) => {
  // Regular expression to match numbers, including:
  // - Integers: 40, 25
  // - Decimals: 4.5, 3.2
  // - Ranges: 2-3, 7-11
  // - Percentages: 30%, 40%
  // - Fractions: 4.5/5, 3.2/5
  // - Times: 2pm, 3pm, 11am
  // - Complex patterns: 2-3pm, 7am-11am, 30-40%
  const numberRegex = /(\d+(?:\.\d+)?(?:[-/]\d+(?:\.\d+)?)?(?:am|pm|%)?)/gi;
  
  const parts = children.split(numberRegex);
  
  return (
    <span className={className}>
      {parts.map((part, index) => {
        // Check if this part matches a number pattern
        if (part.match(numberRegex)) {
          return (
            <span key={index} className="font-number" style={{ fontFamily: 'Arial, sans-serif' }}>
              {part}
            </span>
          );
        }
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </span>
  );
};

export default NumberText;
