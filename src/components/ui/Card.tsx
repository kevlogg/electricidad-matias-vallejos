// src/components/ui/Card.tsx
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowOnHover?: boolean;
  bordered?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glowOnHover = true,
  bordered = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`group relative rounded-2xl bg-[#141416] p-6 sm:p-7 transition-all duration-300 ${
        bordered ? 'border border-[#26262A]' : ''
      } ${
        glowOnHover
          ? 'hover:border-[#FFE600] hover:shadow-[0_0_30px_rgba(255,230,0,0.18)] hover:-translate-y-1'
          : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle corner light accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-px -left-px h-12 w-12 rounded-tl-2xl bg-gradient-to-br from-[#FFE600]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </div>
  );
};
