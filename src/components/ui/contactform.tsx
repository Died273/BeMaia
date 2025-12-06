import React from "react";
import { cn } from "@/lib/utils";

interface ContactFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

interface ContactFormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

// Shared input styles with proper background and placeholder styling
const inputBaseStyles = `
  w-full px-4 py-3.5 border-2 rounded-[15px] 
  text-foreground font-normal text-[20px]
  transition-all 
  focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary
  placeholder:font-normal placeholder:text-[20px] placeholder:opacity-80
`;

export const ContactFormInput = React.forwardRef<HTMLInputElement, ContactFormInputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="text-foreground text-base font-normal mb-2 block">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            inputBaseStyles,
            error && "ring-2 ring-danger border-danger",
            className
          )}
          style={{
            background: error ? 'var(--danger-bg)' : 'hsla(0, 0%, 95%, 1)',
            borderColor: error ? 'var(--danger)' : 'transparent',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400
          }}
          {...props}
        />
        {error && (
          <div className="text-red-500 text-sm font-semibold mt-1">
            {error}
          </div>
        )}
      </div>
    );
  }
);

ContactFormInput.displayName = "ContactFormInput";

export const ContactFormTextarea = React.forwardRef<HTMLTextAreaElement, ContactFormTextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className="text-foreground text-base font-normal mb-2 block">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={cn(
            inputBaseStyles,
            "resize-vertical min-h-[100px]",
            error && "ring-2 ring-danger border-danger",
            className
          )}
          style={{
            background: error ? 'var(--danger-bg)' : 'hsla(0, 0%, 95%, 1)',
            borderColor: error ? 'var(--danger)' : 'transparent',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400
          }}
          {...props}
        />
        {error && (
          <div className="text-red-500 text-sm font-semibold mt-1">
            {error}
          </div>
        )}
      </div>
    );
  }
);

ContactFormTextarea.displayName = "ContactFormTextarea";
