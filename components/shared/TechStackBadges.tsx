'use client';

import { cn } from '@/app/utils';
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siJavascript,
  siGithub,
  siTailwindcss,
  siDocker,
  siJest,
  siSass,
  siHtml5,
  siJenkins,
  siBitbucket,
  siStorybook,
  siCypress,
  siEslint,
} from 'simple-icons';

interface TechIcon {
  icon: typeof siReact;
  name: string;
}

// Map of tech stack names to their icons
const techIconMap: Record<string, TechIcon> = {
  react: { icon: siReact, name: 'React' },
  nextjs: { icon: siNextdotjs, name: 'NextJS' },
  typescript: { icon: siTypescript, name: 'Typescript' },
  javascript: { icon: siJavascript, name: 'Javascript' },
  github: { icon: siGithub, name: 'GitHub' },
  tailwind: { icon: siTailwindcss, name: 'Tailwind' },
  sass: { icon: siSass, name: 'SaSS' },
  docker: { icon: siDocker, name: 'Docker' },
  html5: { icon: siHtml5, name: 'HTML5' },
  jenkins: { icon: siJenkins, name: 'Jenkins' },
  bitbucket: { icon: siBitbucket, name: 'Bitbucket' },
  storybook: { icon: siStorybook, name: 'Storybook' },
  eslint: { icon: siEslint, name: 'ESLint' },
  jest: { icon: siJest, name: 'Jest' },
  cypress: { icon: siCypress, name: 'Cypress' },
};

interface TechStackBadgesProps {
  techStack: string[];
  variant?: 'default' | 'compact';
  showLabels?: boolean;
  className?: string;
}

/**
 * Reusable TechStackBadges component
 * Displays tech stack icons with optional labels in a post-it flag design
 *
 * @param techStack - Array of tech stack identifiers (e.g., ['react', 'typescript', 'docker'])
 * @param variant - 'default' for normal size, 'compact' for smaller size
 * @param showLabels - Whether to show tech names (default: true)
 * @param className - Additional CSS classes
 */
export default function TechStackBadges({
  techStack,
  variant = 'default',
  showLabels = true,
  className,
}: TechStackBadgesProps) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {techStack.map((tech) => {
        const techData = techIconMap[tech.toLowerCase()];

        if (!techData) {
          console.warn(`Tech stack icon not found for: ${tech}`);
          return null;
        }

        return (
          <div
            key={tech}
            className={cn(
              'group/badge flex items-center gap-1.5',
              // Modern pill design
              'rounded-full',
              // Gradient background with Pastel Green accent
              'bg-gradient-to-r from-pastel-green/10 to-pastel-green/5',
              // Subtle border
              'border border-pastel-green/20',
              // Shadow for depth
              'shadow-sm',
              // Smooth transitions
              'transition-all duration-300',
              // Enhanced hover state
              'hover:shadow-md hover:border-pastel-green/40 hover:scale-105',
              'hover:bg-gradient-to-r hover:from-pastel-green/15 hover:to-pastel-green/10',
              {
                'px-3 py-1.5': variant === 'default',
                'px-2.5 py-1': variant === 'compact',
              },
            )}
            title={techData.name}
          >
            {/* Icon with brand color */}
            <div
              className={cn(
                'transition-all duration-300',
                'group-hover/badge:brightness-110',
                {
                  'w-5 h-5': variant === 'default',
                  'w-4 h-4': variant === 'compact',
                },
              )}
              style={{ color: `#${techData.icon.hex}` }}
              dangerouslySetInnerHTML={{ __html: techData.icon.svg }}
            />
            {showLabels && (
              <span
                className={cn(
                  'font-semibold text-text-dark transition-colors duration-300',
                  'group-hover/badge:text-pastel-green',
                  {
                    'text-xs': variant === 'default',
                    'text-[11px]': variant === 'compact',
                  },
                )}
              >
                {techData.name}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
