// src/components/ui/Badge.tsx
import React from 'react';
import { Zap } from 'lucide-react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'yellow' | 'dark' | 'success';
  size?: 'sm' | 'md';
  pulse?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'yellow',
  size = 'md',
  pulse = true,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1 gap-1.5',
    md: 'text-xs sm:text-sm px-3.5 py-1.5 gap-2',
  }[size];

  const variantStyles = {
    yellow:
      'bg-[#FFE600]/10 text-[#FFE600] border border-[#FFE600]/30 shadow-[0_0_12px_rgba(255,230,0,0.15)]',
    dark:
      'bg-[#141416] text-[#A1A1AA] border border-[#26262A]',
    success:
      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30',
  }[variant];

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full tracking-wide backdrop-blur-md ${sizeStyles} ${variantStyles} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE600] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFE600]" />
        </span>
      )}
      <Zap className="w-3.5 h-3.5 text-[#FFE600] shrink-0 fill-[#FFE600]/30" />
      <span>{children}</span>
    </span>
  );
};
