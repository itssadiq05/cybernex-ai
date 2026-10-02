import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const variants = {
    primary:
      'bg-[#CCFF00] text-black hover:bg-[#b8e600] shadow-[0_0_20px_rgba(204,255,0,0.2)] hover:shadow-[0_0_25px_rgba(204,255,0,0.4)]',
    secondary:
      'bg-[#151619] text-white border border-white/10 hover:border-white/25 hover:bg-[#1A1B1F]',
    danger:
      'bg-rose-600 text-white hover:bg-rose-500 shadow-[0_0_20px_rgba(255,51,102,0.3)]',
    ghost:
      'text-slate-400 hover:text-white hover:bg-white/5',
    outline:
      'border border-[#CCFF00]/40 text-[#CCFF00] hover:bg-[#CCFF00]/10',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        icon
      )}

      {children}
    </button>
  );
};