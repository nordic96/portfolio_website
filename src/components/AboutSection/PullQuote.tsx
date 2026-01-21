'use client';

import { useEffect, useRef, useState } from 'react';

interface PullQuoteProps {
  quote: string;
  citation: string;
}

export default function PullQuote({ quote, citation }: PullQuoteProps) {
  const [isVisible, setIsVisible] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (quoteRef.current) {
      observer.observe(quoteRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={quoteRef}
      className={`relative max-w-3xl mx-auto my-16 p-8 md:p-12
                  bg-gradient-to-br from-pastel-green/5 to-white
                  border-l-4 border-pastel-green
                  rounded-r-2xl
                  shadow-xl shadow-pastel-green/10
                  transition-all duration-700 ease-out
                  ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
                  motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-x-0`}
    >
      {/* Quote icon */}
      <div
        className="absolute -top-4 -left-4 w-12 h-12 bg-pastel-green
                   rounded-full flex items-center justify-center
                   shadow-lg shadow-pastel-green/30"
        aria-hidden="true"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
        </svg>
      </div>

      {/* Quote text */}
      <blockquote className="text-lg md:text-xl font-light text-gray-700 leading-relaxed italic mb-4">
        <p>&ldquo;{quote}&rdquo;</p>
      </blockquote>

      {/* Attribution */}
      <cite className="block text-sm md:text-base font-semibold text-pastel-green not-italic">
        &mdash; {citation}
      </cite>
    </div>
  );
}
