import type { CSSProperties } from 'react';

interface SplitCharsProps {
  text: string;
  className?: string;
  charClassName?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export default function SplitChars({
  text,
  className,
  charClassName,
  staggerDelay = 0.05,
  initialDelay = 0,
}: SplitCharsProps) {
  const chars = Array.from(text);

  return (
    <span className={className}>
      {chars.map((char, i) => (
        <span
          key={i}
          className={`split-char ${charClassName ?? ''}`}
          style={{ animationDelay: `${initialDelay + i * staggerDelay}s` } as CSSProperties}
        >
          {char === ' ' ? ' ' : char}
        </span>
      ))}
    </span>
  );
}
