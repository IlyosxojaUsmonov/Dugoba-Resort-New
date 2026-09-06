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
  const words = text.split(' ');
  let charIndex = 0;

  return (
    <span className={className}>
      {words.map((word, wi) => {
        const chars = Array.from(word);
        const startIndex = charIndex;
        charIndex += chars.length;
        return (
          <span key={wi}>
            {/* Each word is its own non-breaking unit so the browser only wraps
                at the real space rendered after it, not between character spans. */}
            <span className="inline-block whitespace-nowrap">
              {chars.map((char, i) => (
                <span
                  key={i}
                  className={`split-char ${charClassName ?? ''}`}
                  style={{ animationDelay: `${initialDelay + (startIndex + i) * staggerDelay}s` } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
            {wi < words.length - 1 ? ' ' : ''}
          </span>
        );
      })}
    </span>
  );
}
