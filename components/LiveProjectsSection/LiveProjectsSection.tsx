'use client';

import { cn } from '@/app/utils';
import LiveProjectCard, { LiveProject } from '@/components/LiveProjectCard';
import GridCard from '@/components/Dashboard/GridCard';

/**
 * Live project data from the spec
 */
const liveProjects: LiveProject[] = [
  {
    id: 'foodies-trail',
    title: "Foodie's Trail",
    url: 'https://sg-eatwhere.vercel.app/',
    description: '3D Web Application Food Blog',
    techStack: ['threejs', 'nextjs'],
  },
  {
    id: 'white-rabbit',
    title: 'White Rabbit',
    url: 'https://white-rabbit-web.vercel.app/',
    description: 'Graph Knowledge database',
    techStack: ['neo4j', 'fastapi', 'nextjs'],
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
    <GridCard title="Live Web Projects" className={cn('h-full', className)}>
      <div
        className={cn(
          'h-full',
          // Responsive grid: 1 column mobile, 2 columns desktop
          'grid grid-cols-1 md:grid-cols-2',
          'gap-6 lg:gap-8',
          // Center content and add padding
          'p-4 lg:p-6',
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
