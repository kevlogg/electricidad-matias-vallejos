// src/components/ui/Button.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics/events';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  trackingLocation?: string;
  trackingTarget?: string;
  fullWidth?: boolean;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  isExternal = false,
  leftIcon,
  rightIcon,
  trackingLocation = 'ui_button',
  trackingTarget,
  fullWidth = false,
  className = '',
  onClick,
  ...props
}) => {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const baseStyles =
    'relative inline-flex items-center justify-center font-bold tracking-tight rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFE600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0B0C] active:scale-[0.98] select-none group';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm sm:text-base px-5 py-3 gap-2.5',
    lg: 'text-base sm:text-lg px-7 py-4 gap-3',
  }[size];

  const variantStyles = {
    primary:
      'bg-[#FFE600] text-[#0B0B0C] shadow-[0_0_20px_rgba(255,230,0,0.35)] hover:shadow-[0_0_30px_rgba(255,230,0,0.65)] hover:bg-[#FFF04D] border border-[#FFE600]',
    secondary:
      'bg-[#141416] text-white border border-[#26262A] hover:border-[#FFE600] hover:text-[#FFE600] hover:shadow-[0_0_20px_rgba(255,230,0,0.2)]',
    outline:
      'bg-transparent text-white border border-white/20 hover:border-[#FFE600] hover:text-[#FFE600] hover:bg-[#FFE600]/10',
    ghost:
      'bg-transparent text-[#A1A1AA] hover:text-white hover:bg-white/5',
    emergency:
      'bg-[#FFE600] text-[#0B0B0C] border-2 border-[#FFC700] shadow-[0_0_25px_rgba(255,230,0,0.5)] hover:shadow-[0_0_35px_rgba(255,230,0,0.8)] font-extrabold',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';

  const triggerSparks = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const newSparks: Spark[] = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: clickX,
      y: clickY,
      angle: (i * (360 / 6) + Math.random() * 20) * (Math.PI / 180),
      distance: Math.random() * 28 + 20,
      size: Math.random() * 3 + 2.5,
    }));

    setSparks(newSparks);
    setTimeout(() => setSparks([]), 550);
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    triggerSparks(e);
    trackEvent({
      event: 'click_cta',
      location: trackingLocation,
      target: trackingTarget || href || 'button',
      text: typeof children === 'string' ? children : undefined,
    });
    if (onClick && 'type' in e) {
      (onClick as React.MouseEventHandler<HTMLButtonElement>)(e as React.MouseEvent<HTMLButtonElement>);
    }
  };

  const content = (
    <>
      {/* Light shimmer sweep on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full skew-x-[-25deg] group-hover:animate-[shimmerSweep_1s_ease-in-out_forwards] pointer-events-none"
      />

      {/* Electric Spark Micro-Explosion on Click */}
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="absolute rounded-full bg-[#FFE600] pointer-events-none z-30 shadow-[0_0_8px_#FFE600] animate-spark-burst"
          style={
            {
              left: `${spark.x}px`,
              top: `${spark.y}px`,
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              '--target-x': `${Math.cos(spark.angle) * spark.distance}px`,
              '--target-y': `${Math.sin(spark.angle) * spark.distance}px`,
            } as React.CSSProperties
          }
        />
      ))}

      {leftIcon && <span className="shrink-0 transition-transform group-hover:scale-110">{leftIcon}</span>}
      <span className="relative z-10">{children}</span>
      {rightIcon && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </>
  );

  if (href) {
    if (isExternal || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('https://wa.me')) {
      return (
        <a
          href={href}
          target={isExternal || href.startsWith('http') ? '_blank' : undefined}
          rel={isExternal || href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
          onClick={handleClick}
          aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
        onClick={handleClick}
        aria-label={props['aria-label'] || (typeof children === 'string' ? children : undefined)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {content}
    </button>
  );
};
