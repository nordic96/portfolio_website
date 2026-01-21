'use client';

import { cn } from '@/app/utils';
import { ReactNode } from 'react';

interface IPhoneProFrameProps {
  children: ReactNode;
  className?: string;
}

/**
 * IPhoneProFrame - iPhone 15 Pro-shaped frame component
 *
 * Design specifications:
 * - Aspect ratio: 9:19.5 (iPhone 15 Pro standard)
 * - Outer corner radius: 55px (scaled)
 * - Screen corner radius: 47px (scaled)
 * - Space black color bezel
 * - Dynamic Island notch
 * - Side buttons (power + volume)
 * - Home indicator bar
 */
export default function IPhoneProFrame({
  children,
  className,
}: IPhoneProFrameProps) {
  return (
    <div
      className={cn(
        'relative',
        // Aspect ratio 9:19.5 (iPhone 15 Pro)
        'aspect-[9/19.5]',
        className,
      )}
    >
      {/* Phone outer frame - Space Black */}
      <div
        className={cn(
          'absolute inset-0',
          'bg-[#1a1a1a]',
          'rounded-[12%]',
          // Subtle metallic edge highlight
          'shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]',
        )}
      >
        {/* Side buttons - Left (Volume + Silent) */}
        <div className="absolute -left-0.5 top-[18%] w-0.75 h-[6%] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-0.5 top-[26%] w-0.75 h-[10%] bg-[#2a2a2a] rounded-l-sm" />
        <div className="absolute -left-0.5 top-[38%] w-0.75 h-[10%] bg-[#2a2a2a] rounded-l-sm" />

        {/* Side button - Right (Power) */}
        <div className="absolute -right-0.5 top-[28%] w-0.75 h-[12%] bg-[#2a2a2a] rounded-r-sm" />

        {/* Screen area */}
        <div
          className={cn(
            'absolute',
            'top-[2%] bottom-[2%] left-[3%] right-[3%]',
            'bg-black',
            'rounded-[10%]',
            'overflow-hidden',
          )}
        >
          {/* Dynamic Island */}
          <div
            className={cn(
              'absolute',
              'top-[1.5%]',
              'left-1/2 -translate-x-1/2',
              'w-[28%] h-[3.5%]',
              'bg-[#1a1a1a]',
              'rounded-full',
              'z-20',
              // Subtle inner shadow for depth
              'shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]',
            )}
          >
            {/* Camera lens - left */}
            <div
              className={cn(
                'absolute',
                'left-[15%] top-1/2 -translate-y-1/2',
                'w-[12%] aspect-square',
                'bg-[#0a0a0a]',
                'rounded-full',
                'shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]',
              )}
            />
            {/* Sensors - right */}
            <div
              className={cn(
                'absolute',
                'right-[15%] top-1/2 -translate-y-1/2',
                'w-[8%] aspect-square',
                'bg-[#0a0a0a]',
                'rounded-full',
              )}
            />
          </div>

          {/* Screen content area */}
          <div className="absolute inset-0 overflow-hidden">{children}</div>

          {/* Home indicator */}
          <div
            className={cn(
              'absolute',
              'bottom-[1%]',
              'left-1/2 -translate-x-1/2',
              'w-[35%] h-[0.6%]',
              'bg-white/30',
              'rounded-full',
              'z-20',
            )}
          />
        </div>
      </div>
    </div>
  );
}
