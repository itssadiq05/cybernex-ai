import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'card';
  hoverEffect?: boolean;
  glow?: 'lime' | 'cyan' | 'red' | 'none';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className,
  variant = 'default',
  hoverEffect = false,
  glow = 'none',
  ...props
}) => {
  const glowStyles = {
    none: '',
    lime:
      'shadow-[0_0_30px_-5px_rgba(204,255,0,0.12)] border-[#CCFF00]/30',
    cyan:
      'shadow-[0_0_30px_-5px_rgba(0,240,255,0.12)] border-[#00F0FF]/30',
    red:
      'shadow-[0_0_30px_-5px_rgba(255,51,102,0.12)] border-[#FF3366]/30',
  };

  const variantStyles = {
    default: '',
    card: 'glass-card',
  };

  return (
    <div
      className={twMerge(
        clsx(
          'glass-card rounded-xl p-5 relative overflow-hidden',
          variantStyles[variant],
          hoverEffect && 'glass-card-hover',
          glowStyles[glow],
          className
        )
      )}
      {...props}
    >
      {children}
    </div>
  );
};