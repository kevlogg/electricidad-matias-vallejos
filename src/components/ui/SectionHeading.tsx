// src/components/ui/SectionHeading.tsx
import React from 'react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  highlightedWord?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badgeText,
  title,
  highlightedWord,
  subtitle,
  centered = true,
  className = '',
}) => {
  return (
    <div
      className={`relative mb-10 sm:mb-14 ${
        centered ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
      } ${className}`}
    >
      {badgeText && (
        <div className={`mb-4 flex ${centered ? 'justify-center' : 'justify-start'}`}>
          <Badge>{badgeText}</Badge>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white font-heading leading-[1.15]">
        {highlightedWord && title.includes(highlightedWord) ? (
          <>
            {title.split(highlightedWord)[0]}
            <span className="text-[#FFE600] drop-shadow-electric-subtle">
              {highlightedWord}
            </span>
            {title.split(highlightedWord)[1]}
          </>
        ) : (
          title
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}

      {/* Decorative electrical pulse line */}
      <div
        className={`mt-5 h-[2px] w-24 bg-[#26262A] relative overflow-hidden rounded-full ${
          centered ? 'mx-auto' : ''
        }`}
      >
        <div className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-[#FFE600] to-transparent animate-beam-scan" />
      </div>
    </div>
  );
};
