import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  withIcon = false,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-mono tracking-tighter transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none group relative overflow-hidden";
  
  const variants = {
    primary: "bg-stone-900 text-[#FDFCF8] border border-stone-900 hover:bg-stone-800 hover:scale-[1.01]",
    secondary: "bg-[#d97706] text-white border border-[#d97706] hover:bg-[#b45309]",
    outline: "border border-stone-300 text-stone-900 bg-transparent hover:border-stone-900 hover:bg-stone-50",
    minimal: "text-stone-900 hover:text-[#d97706] underline underline-offset-4 decoration-stone-300 hover:decoration-[#d97706]",
  };

  const sizes = {
    sm: "px-3 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-5 text-base",
  };

  const btnContent = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {withIcon && <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
      </span>
    </>
  );

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${size !== 'lg' && variant === 'minimal' ? 'p-0' : sizes[size]} ${className}`} 
      {...props}
    >
      {btnContent}
    </button>
  );
};