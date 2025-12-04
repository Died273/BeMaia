/**
 * Number Formatting Utilities
 * 
 * This file provides utilities to ensure all numbers throughout the website
 * are displayed using Arial font for consistency.
 */

/**
 * Common number styling object to be applied via inline styles
 * Use this when you need to display numeric values
 */
export const numberStyle = {
  fontFamily: 'Arial, sans-serif',
  fontVariantNumeric: 'tabular-nums' as const,
} as const;

/**
 * CSS class name for numeric content
 * Applied automatically via global CSS, but can be used explicitly
 */
export const NUMBER_CLASS = 'font-number';

/**
 * Format a number for display with proper styling
 * Returns a React-ready props object with style and className
 * 
 * @example
 * <span {...formatNumber()}>4.5</span>
 * <div {...formatNumber()}>Score: {score}</div>
 */
export const formatNumber = () => ({
  className: NUMBER_CLASS,
  style: numberStyle,
});

/**
 * Get inline style for numbers
 * Use when you need just the style object
 * 
 * @example
 * <span style={getNumberStyle()}>4.5</span>
 */
export const getNumberStyle = () => numberStyle;

/**
 * Get className for numbers
 * Use when you need just the class name
 * 
 * @example
 * <span className={getNumberClass()}>4.5</span>
 */
export const getNumberClass = () => NUMBER_CLASS;

/**
 * Format a numeric value with Arial font styling
 * Ensures consistent display of all numeric content
 * 
 * @param value - The numeric value to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted number string
 * 
 * @example
 * formatNumericValue(4.567, 2) // "4.57"
 * formatNumericValue(3.2) // "3.2"
 */
export const formatNumericValue = (value: number, decimals: number = 1): string => {
  return value.toFixed(decimals);
};
