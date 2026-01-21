'use client';

import { cn } from '@/app/utils';
import IPhoneProFrame from '@/components/IPhoneProFrame';
import LiveProjectIframe from '@/components/LiveProjectIframe';
import { Tooltip } from '@mui/material';
import { SimpleIcon } from 'simple-icons';

export interface LiveProject {
  id: string;
  title: string;
  url: string;
  description: string;
  techStack: SimpleIcon[];
}

interface LiveProjectCardProps {
  project: LiveProject;
  className?: string;
}

/**
 * LiveProjectCard - Complete card with iPhone frame, live iframe, and project info
 *
 * Structure (from issue spec):
 * - iPhone Pro Frame (Layer 1)
 * - Live iframe content (Layer 2)
 * - Subtle gradient overlay (Layer 3)
 * - External info section below phone (Title, Tech logos, Description)
 */
export default function LiveProjectCard({
  project,
  className,
}: LiveProjectCardProps) {
  const { title, url, description, techStack } = project;

  return (
    <div className={cn('flex flex-col items-center', className)}>
      {/* iPhone Frame with iframe content */}
      <div className="w-full max-w-50 lg:max-w-60">
        <IPhoneProFrame>
          {/* Live iframe (Layer 2) */}
          <LiveProjectIframe url={url} title={title} />

          {/* Subtle gradient overlay (Layer 3) */}
          <div
            className={cn(
              'absolute inset-0 z-10 pointer-events-none',
              // Subtle gradient per spec: transparent to rgba(51,51,51,0.3) at bottom
            )}
            style={{
              background:
                'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(51,51,51,0.3) 100%)',
            }}
          />
        </IPhoneProFrame>
      </div>

      {/* External Info Section - Below phone frame */}
      <div className="text-center w-full max-w-60">
        {/* Project Title */}
        <h3 className="text-h3 font-bold text-text-white">{title}</h3>
        <div
          className={'flex flex-col bg-dark-gray opacity-50 rounded-3xl p-3'}
        >
          {/* Tech Stack Icons Row */}
          <div className="flex justify-center items-center gap-1 mt-2">
            {techStack.map((tech) => {
              return (
                <Tooltip
                  key={`tech-stack-${tech.title}`}
                  title={tech.title}
                  arrow
                >
                  <div
                    className="w-6 h-6 flex items-center justify-center fill-white"
                    title={tech.title}
                    dangerouslySetInnerHTML={{ __html: tech.svg }}
                  />
                </Tooltip>
              );
            })}
          </div>
          {/* Description */}
          <p className="text-secondary text-text-white mt-2">{description}</p>
        </div>
      </div>
    </div>
  );
}
