'use client';

import { CDN_BASE } from '@/app/config/cdn';
import { cn } from '@/app/utils';
import Image from 'next/image';
import { useState, useCallback } from 'react';
import GridCard, { gridCardDefaultStyle } from './GridCard';

/**
 * Project data structure for the dashboard projects card
 */
interface Project {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  description?: string;
  tech?: string[];
}

interface ProjectsCardProps {
  /** Array of projects to display */
  projects?: Project[];
  /** Maximum number of projects to show */
  maxProjects?: number;
  /** Custom class name for the card */
  className?: string;
}

/**
 * Sample project data - will be replaced with real data
 */
const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Foodies Trail',
    thumbnail: 'resources/images/foodies_trail.gif',
    url: 'https://sg-eatwhere.vercel.app/',
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
  },
  {
    id: '2',
    title: 'Wink',
    thumbnail: 'resources/images/wink.png',
    url: 'https://github.com/nordic96/wink',
    tech: ['Flutter', 'Android', 'ios'],
  },
  {
    id: '3',
    title: 'COVID Dashboard',
    thumbnail: 'resources/images/covid.png',
    url: '#',
    tech: ['Python', 'D3.js', 'Flask'],
  },
  {
    id: '4',
    title: 'OnionOrNot',
    thumbnail: 'resources/images/onion.png',
    url: '#',
    tech: ['NLP', 'Python', 'Satire Detection'],
  },
  {
    id: '5',
    title: 'TempPi',
    thumbnail: 'resources/images/temppi.gif',
    url: '#',
    tech: ['IoT', 'RaspberryPi'],
  },
  {
    id: '6',
    title: 'InfiniteChallenge',
    thumbnail: 'resources/images/infinite.jpg',
    url: 'https://github.com/nordic96/Infinite_Challenge',
    tech: ['Python', 'ComputerVision', 'Image Detection'],
  },
];

/**
 * ProjectsCard - Dashboard card displaying featured projects with hover interactions
 *
 * Features:
 * - 2-column grid (mobile/tablet), 2-3 columns (desktop)
 * - Hover: image scale (1.05) + gradient overlay with project info
 * - Mobile: tap to toggle overlay visibility
 * - Accessible: focus states, reduced motion support, proper alt text
 *
 * Implementation per GitHub Issue #422
 */
export default function ProjectsCard({
  projects = sampleProjects,
  maxProjects = 6,
  className,
}: ProjectsCardProps) {
  // Track which project is tapped on mobile (for toggle behavior)
  const [tappedProjectId, setTappedProjectId] = useState<string | null>(null);

  const handleProjectClick = useCallback(
    (projectId: string, url: string) => {
      // On touch devices, first tap toggles overlay, second tap navigates
      if ('ontouchstart' in window) {
        if (tappedProjectId === projectId) {
          // Second tap - navigate
          window.open(url, '_blank', 'noopener,noreferrer');
          setTappedProjectId(null);
        } else {
          // First tap - show overlay
          setTappedProjectId(projectId);
        }
      } else {
        // Desktop - direct navigation on click
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    },
    [tappedProjectId],
  );

  // Reset tapped state when clicking outside
  const handleCardBlur = useCallback(() => {
    setTappedProjectId(null);
  }, []);

  return (
    <GridCard title="Featured Projects" className={cn(className, 'relative')}>
      {/** Grid Cutting Board Background Image */}
      <div
        style={{
          backgroundImage: `url(${CDN_BASE}/resources/assets/grid_cutting_mat.jpeg)`,
        }}
        className={'absolute inset-0 bg-cover bg-no-repeat bg-center'}
      >
        <div className={'h-full w-full rotate-45 transform'}></div>
      </div>
      <div className="relative grid grid-cols-2 lg:grid-cols-2 gap-3 max-sm:gap-1 lg:p-2 max-sm:p-1">
        {projects.slice(0, maxProjects).map((project, index) => (
          <ProjectThumbnail
            key={project.id}
            project={project}
            index={index}
            isActive={tappedProjectId === project.id}
            onClick={() => handleProjectClick(project.id, project.url)}
            onBlur={handleCardBlur}
          />
        ))}
      </div>
    </GridCard>
  );
}

interface ProjectThumbnailProps {
  project: Project;
  index: number;
  isActive: boolean;
  onClick: () => void;
  onBlur: () => void;
}

/**
 * Individual project thumbnail with hover/tap interactions
 */
function ProjectThumbnail({
  project,
  index,
  isActive,
  onClick,
  onBlur,
}: ProjectThumbnailProps) {
  const { title, thumbnail, tech } = project;
  return (
    <div className={cn(gridCardDefaultStyle, 'flex grow')}>
      <button
        type="button"
        className={cn(
          // Base styles
          'flex grow',
          'aspect-video rounded-lg bg-gray-100 overflow-hidden',
          'relative group cursor-pointer',
          // Focus styles for keyboard navigation
          'focus:outline-none focus:ring-2 focus:ring-pastel-green focus:ring-offset-2',
          // Animation delay for staggered entrance (optional enhancement)
          'animate-fadeIn',
        )}
        style={{
          animationDelay: `${index * 100}ms`,
          animationFillMode: 'backwards',
        }}
        onClick={onClick}
        onBlur={onBlur}
        aria-label={`View ${title} project`}
      >
        {/* Thumbnail Image */}
        <Image
          src={`${CDN_BASE}/${thumbnail}`}
          alt={`${title} project thumbnail`}
          fill
          className={cn(
            'object-cover',
            // Scale on hover - respects prefers-reduced-motion via CSS
            'transition-transform duration-300 ease-out',
            'group-hover:scale-105 group-focus:scale-105',
            // Active state for mobile tap
            isActive && 'scale-105',
          )}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
        />

        {/* Hover/Tap Overlay */}
        <div
          className={cn(
            // Positioning
            'absolute inset-0',
            // Gradient background
            'bg-gradient-to-t from-black/70 via-black/30 to-transparent',
            // Visibility transition
            'transition-opacity duration-300',
            'opacity-0 group-hover:opacity-100 group-focus:opacity-100',
            // Active state for mobile tap
            isActive && 'opacity-100',
            // Flex layout for content positioning
            'flex flex-col justify-end p-3',
          )}
          aria-hidden={!isActive}
        >
          {/* Project Title */}
          <h3 className="text-white font-semibold text-sm truncate">{title}</h3>

          {/* Tech Stack */}
          {tech && tech.length > 0 && (
            <p className="text-white/80 text-xs truncate mt-0.5">
              {tech.join(' / ')}
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
