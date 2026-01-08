'use client';

import { cn } from '@/app/utils';
import { useMemo } from 'react';
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
  siThreedotjs,
  siHuggingface,
  siCss,
  siClaude,
  siMongodb,
  siGraphql,
} from 'simple-icons';

type TechStackCategory = 'frontend' | 'cicd' | 'tools' | 'backend';
interface LogoData {
  icon: typeof siReact;
  name: string;
  category: TechStackCategory;
}

// Logo data (icon + name only)
// Color coding: pastel-green = frontend, blue-green = utilities, pastel-pink = CI/CD
const logoData: LogoData[] = [
  { icon: siReact, name: 'React', category: 'frontend' },
  { icon: siNextdotjs, name: 'NextJS', category: 'frontend' },
  { icon: siTypescript, name: 'Typescript', category: 'frontend' },
  { icon: siJavascript, name: 'Javascript', category: 'frontend' },
  { icon: siCss, name: 'CSS', category: 'frontend' },
  { icon: siGithub, name: 'GitHub', category: 'tools' },
  { icon: siTailwindcss, name: 'Tailwind', category: 'tools' },
  { icon: siSass, name: 'SaSS', category: 'tools' },
  { icon: siDocker, name: 'Docker', category: 'cicd' },
  { icon: siHtml5, name: 'HTML5', category: 'frontend' },
  { icon: siJenkins, name: 'Jenkins', category: 'cicd' },
  { icon: siBitbucket, name: 'Bitbucket', category: 'tools' },
  { icon: siStorybook, name: 'Storybook', category: 'tools' },
  { icon: siEslint, name: 'ESLint', category: 'tools' },
  { icon: siJest, name: 'Jest', category: 'tools' },
  { icon: siCypress, name: 'Cypress', category: 'tools' },
  { icon: siThreedotjs, name: 'Three.js', category: 'frontend' },
  { icon: siHuggingface, name: 'HuggingFace', category: 'tools' },
  { icon: siClaude, name: 'Claude', category: 'tools' },
  { icon: siMongodb, name: 'MongoDb', category: 'backend' },
  { icon: siGraphql, name: 'GraphQL', category: 'backend' },
];

interface TechStackLogosProps {
  className?: string;
}

export default function TechStackLogos({ className }: TechStackLogosProps) {
  return <TechStackCompact className={className} />;
}

/**
 * TechStackCompact - Horizontal flex wrap layout for dashboard grid
 * Reuses the post-it styling from hero variant in a compact format
 */
function TechStackCompact({ className }: { className?: string }) {
  // Generate random rotations for post-it effect (seeded for consistency)
  const rotations = useMemo(() => {
    return logoData.map((_, i) => ((i * 7) % 11) - 5); // -5 to +5 degrees
  }, []);

  return (
    <div
      className={cn('flex flex-wrap gap-2 justify-center', className)}
      role="list"
      aria-label="Technology stack"
    >
      {logoData.map((logo, index) => (
        <div
          key={`compact-logo-${index}`}
          role="listitem"
          className={cn(
            'tech-logo-compact',
            'flex items-center gap-1.5 px-2 py-1',
            'bg-white border-l-4',
            'hover:scale-105 transition-transform',
            'shadow-sm',
            {
              'border-l-pastel-green': logo.category === 'frontend',
              'border-l-pastel-brown': logo.category === 'backend',
              'border-l-blue-green': logo.category === 'cicd',
              'border-l-pastel-pink': logo.category === 'tools',
            },
          )}
          style={{
            transform: `rotate(${rotations[index]}deg)`,
          }}
        >
          <div
            className="w-8 h-8 max-sm:w-5 max-sm:h-5 shrink-0"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
          />
          <span className="text-xs font-semibold text-gray-700 uppercase">
            {logo.name}
          </span>
        </div>
      ))}
    </div>
  );
}
