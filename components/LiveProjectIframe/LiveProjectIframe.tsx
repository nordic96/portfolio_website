'use client';

import { cn } from '@/app/utils';
import { useEffect, useRef, useState } from 'react';

interface LiveProjectIframeProps {
  url: string;
  title: string;
  className?: string;
}

type LoadingState = 'idle' | 'loading' | 'loaded' | 'error';

/**
 * LiveProjectIframe - Lazy-loaded iframe component for live website previews
 *
 * Features:
 * - Intersection Observer for lazy loading
 * - Scale technique: 400% size scaled down to 25% via CSS transform
 * - Loading spinner while iframe loads
 * - Error fallback for failed loads
 * - Smooth fade-in transition when loaded
 */
export default function LiveProjectIframe({
  url,
  title,
  className,
}: LiveProjectIframeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [loadingState, setLoadingState] = useState<LoadingState>('idle');

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setLoadingState('loading');
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading slightly before visible
        threshold: 0.1,
      },
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const handleIframeLoad = () => {
    setLoadingState('loaded');
  };

  const handleIframeError = () => {
    setLoadingState('error');
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative w-full h-full overflow-hidden bg-gray-900',
        className,
      )}
    >
      {/* Loading Spinner */}
      {(loadingState === 'idle' || loadingState === 'loading') && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            <span className="text-white/60 text-xs">Loading preview...</span>
          </div>
        </div>
      )}

      {/* Error Fallback */}
      {loadingState === 'error' && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-gray-400 text-xs">Preview unavailable</span>
          </div>
        </div>
      )}

      {/* Iframe Container - Scale technique for website preview */}
      {isInView && (
        <div
          className={cn(
            'absolute inset-0',
            'transition-opacity duration-500',
            loadingState === 'loaded' ? 'opacity-100' : 'opacity-0',
          )}
        >
          {/*
            Scale technique:
            - iframe is rendered at 400% size (w-[400%] h-[400%])
            - Then scaled down to 25% (scale-[0.25])
            - Origin set to top-left for proper positioning
          */}
          <iframe
            src={url}
            title={title}
            className={cn(
              'absolute top-0 left-0',
              'w-[400%] h-[400%]',
              'origin-top-left scale-[0.25]',
              'border-0',
            )}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
}
