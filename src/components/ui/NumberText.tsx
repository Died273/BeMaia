/**
 * NumberText Component
 * 
 * Component for rendering text with numbers
 * 
 * @example
 * <NumberText>Exhaustion at 4.5/5 indicates severe burnout risk.</NumberText>
 */

import React from 'react';

interface NumberTextProps {
  children: string;
  className?: string;
}

const NumberText: React.FC<NumberTextProps> = ({ children, className = '' }) => {
  return (
    <span className={className}>
      {children}
    </span>
  );
};

export default NumberText;
