'use client';

import { cn } from '@/app/utils';
import { Tooltip } from '@mui/material';
import { SimpleIcon } from 'simple-icons';

export interface SmallProject {
  id: string;
  title: string;
  url: string;
  description: string;
  techStack: SimpleIcon[];
}

interface SmallProjectCardProps {
  project: SmallProject;
  className?: string;
}

/**
 * SmallProjectCard - Compact card for GitHub/smaller projects
 *
 * Structure (from design spec):
 * - Title (h2, Poppins bold italic, white)
 * - Pill-shaped glassmorphism metadata container
 *   - LEFT: Tech stack icons (24px)
 *   - RIGHT: Description (light italic, Roboto)
 */
export default function SmallProjectCard({
  project,
  className,
}: SmallProjectCardProps) {
  const { title, url, description, techStack } = project;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex flex-col',
        'hover:-translate-y-2 transition-transform ease-in-out',
        className,
      )}
    >
      {/* Project Title */}
      <h3 className="text-h3 text-text-white">{title}</h3>

      {/* Pill-shaped Metadata Container */}
      <div
        className={cn(
          'flex items-center gap-3',
          'bg-dark-gray/50 backdrop-blur-md',
          'rounded-4xl',
          'px-4 py-3',
        )}
      >
        {/* Tech Stack Icons - LEFT */}
        <div className="flex items-center gap-2 shrink-0">
          {techStack.map((tech) => (
            <Tooltip key={`tech-${tech.title}`} title={tech.title} arrow>
              <div
                className="w-6 h-6 flex items-center justify-center fill-white"
                dangerouslySetInnerHTML={{ __html: tech.svg }}
              />
            </Tooltip>
          ))}
        </div>

        {/* Description - RIGHT */}
        <p className="text-secondary text-text-white">{description}</p>
      </div>
    </a>
  );
}
