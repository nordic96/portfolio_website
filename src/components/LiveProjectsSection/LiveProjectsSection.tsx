'use client';

import { cn } from '@/src/utils';
import LiveProjectCard, { LiveProject } from '@/src/components/LiveProjectCard';
import GridCard from '@/src/components/shared/GridCard';
import {
  siClaude,
  siFastapi,
  siHuggingface,
  siNeo4j,
  siNextdotjs,
  siReact,
  siTailwindcss,
  siThreedotjs,
  siWebgl,
} from 'simple-icons';
import { useStaggeredAnimation } from '@/src/hooks';

/**
 * TODO:will refactor project data to remote json
 * Live project data from the spec
 */
const liveProjects: LiveProject[] = [
  {
    id: 'white_rabbit',
    title: 'White Rabbit',
    websiteUrl: 'https://white-rabbit-web.vercel.app',
    githubUrl: 'https://github.com/nordic96/white_rabbit',
    fallbackUrl:
      'https://cdn.jsdelivr.net/gh/nordic96/portfolio_assets@master/resources/images/white_rabbit_mobileview.png',
    techStack: [siNextdotjs, siReact, siFastapi, siNeo4j, siHuggingface],
    healthCheckEnabled: true,
  },
  {
    id: 'foodies_trail',
    title: "Foodie's Trail SG",
    websiteUrl: 'https://sg-eatwhere.vercel.app',
    githubUrl: 'https://github.com/nordic96/sg_eatwhere',
    healthCheckEnabled: true,
    fallbackUrl:
      'https://cdn.jsdelivr.net/gh/nordic96/portfolio_assets@master/resources/images/foodies_trail_mobileview.png',
    techStack: [siThreedotjs, siWebgl, siHuggingface, siTailwindcss, siClaude],
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
 *
 * Features:
 * - Health status indicators for each project
 * - Dual CTA buttons (Visit Website, View on GitHub)
 * - Staggered entrance animation for cards
 */
export default function LiveProjectsSection({
  className,
  projects = liveProjects,
}: LiveProjectsSectionProps) {
  // Staggered animation for project cards
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLDivElement>({
      itemCount: projects.length,
      staggerDelay: 500,
    });

  return (
    <GridCard
      title={'live_project'}
      className={cn(className)}
      headerClass={'bg-accent-pink'}
    >
      <div
        ref={containerRef}
        className={cn(
          // Responsive grid: 1 column mobile/tablet, 2 columns desktop
          'grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2',
          // Responsive gap: 24px mobile, 32px tablet, 40px desktop
          'gap-6 md:gap-8 lg:gap-10',
          // Responsive horizontal padding: 12px mobile, 16px tablet, 24px desktop
          'px-3 md:px-4 lg:px-6',
          'place-items-start',
        )}
      >
        {projects.map((project, index) => (
          <div key={project.id} className={getItemClassName(index)}>
            <LiveProjectCard project={project} className="w-full" />
          </div>
        ))}
      </div>
    </GridCard>
  );
}
