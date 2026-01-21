'use client';

import { cn } from '@/app/utils';
import LiveProjectCard, { LiveProject } from '@/components/LiveProjectCard';
import GridCard from '@/components/shared/GridCard';
import {
  siFastapi,
  siHuggingface,
  siNeo4j,
  siNextdotjs,
  siReact,
  siThreedotjs,
} from 'simple-icons';

/**
 * Live project data from the spec
 */
const liveProjects: LiveProject[] = [
  {
    id: 'white_rabbit',
    title: 'White Rabbit',
    url: 'https://white-rabbit-web.vercel.app',
    description:
      'Graph Knowledge database of world’s mysteries with Neo4J, FastAPI and Next.js',
    techStack: [siNextdotjs, siReact, siFastapi, siNeo4j, siHuggingface],
  },
  {
    id: 'foodies_trail',
    title: "Foodie's Trail SG",
    url: 'https://sg-eatwhere.vercel.app',
    description:
      '3D Web Application Food Blog for Personal Projects, using three.js & Next.js',
    techStack: [siThreedotjs, siReact, siNextdotjs, siHuggingface],
  },
];

interface LiveProjectsSectionProps {
  className?: string;
  projects?: LiveProject[];
}

/**
 * LiveProjectsSection - Section container for live web project previews
 *
 * Layout:
 * - Section title "Live Web Projects"
 * - 2 cards side by side on desktop
 * - Stacked vertically on mobile
 * - Uses GridCard wrapper for consistent styling with dashboard
 */
export default function LiveProjectsSection({
  className,
  projects = liveProjects,
}: LiveProjectsSectionProps) {
  return (
    <GridCard
      title="Live Deployed Web Projects"
      className={cn(className)}
      headerClass={'bg-accent-pink'}
    >
      <div
        className={cn(
          // Responsive grid: 1 column mobile, 2 columns desktop
          'grid grid-cols-1 md:grid-cols-2',
          // Center content and add padding
          'px-4 lg:px-6',
          'place-items-center',
        )}
      >
        {projects.map((project) => (
          <LiveProjectCard
            key={project.id}
            project={project}
            className="w-full"
          />
        ))}
      </div>
    </GridCard>
  );
}
