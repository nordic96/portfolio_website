import { CDN_BASE } from '@/app/config/cdn';
import { cn } from '@/app/utils';
import Image from 'next/image';
import { TechStackBadges } from '@/components/shared';

interface Project {
  title: string;
  description?: string;
  thumbnail: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  featured: boolean;
}

type ProjectCardProps = {
  size?: 'small' | 'large';
  project?: Project;
};

const testProject: Project = {
  title: 'Foodies Trail - SG',
  description:
    'A social platform for food enthusiasts to discover and share dining experiences across Singapore',
  thumbnail: '/resources/images/foodies_trail.gif',
  techStack: ['jenkins', 'tailwind', 'nextjs'],
  githubUrl: 'https://github.com/nordic96/sg_eatwhere/',
  liveUrl: 'https://sg-eatwhere.vercel.app/',
  stars: 5,
  featured: true,
};

export default function ProjectCard({
  size = 'large',
  project = testProject,
}: ProjectCardProps) {
  const { title, description, thumbnail, techStack, githubUrl, liveUrl } =
    project;

  return (
    <article
      className={cn(
        'group relative flex flex-col gap-4 p-6 max-sm:p-4',
        // Glassmorphism & modern background
        'bg-white/95 backdrop-blur-sm',
        // Softer border
        'border border-gray-200/60',
        // Contemporary corners
        'rounded-2xl',
        // Multi-layer shadow for depth
        'shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)]',
        // Smooth transitions
        'transition-all duration-500 ease-out',
        // Enhanced hover state with Pastel Green glow
        'hover:shadow-[0_20px_40px_-12px_rgba(119,221,135,0.25),0_8px_16px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(119,221,135,0.1)]',
        'hover:-translate-y-2',
        'hover:border-[#77dd87]/30',
        'hover:scale-[1.02]',
        // Keyboard focus
        'focus-within:ring-2 focus-within:ring-[#77dd87] focus-within:ring-offset-2',
        // Cursor
        'cursor-pointer',
        'max-sm:w-full text-text-dark',
        {
          'lg:w-120 lg:min-h-140 md:w-full': size === 'large',
          'lg:w-70 lg:min-h-70': size === 'small',
        },
      )}
      aria-label={`Project: ${title}`}
    >
      {/* Project Thumbnail */}
      <div
        className={cn(
          'relative w-full overflow-hidden rounded-xl group/thumb',
          {
            'aspect-[4/3]': size === 'large',
            'aspect-square': size === 'small',
          },
        )}
      >
        {/* Gradient overlay on hover */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10',
            {
              'from-[#77dd87]/20 via-transparent to-transparent':
                size === 'large',
              'from-black/40 via-black/10 to-transparent': size === 'small',
            },
          )}
        />

        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 bg-gradient-to-br from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-[#77dd87] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
            <span className="sr-only">Featured project - </span>
            Featured
          </div>
        )}

        {/* Image with zoom on card hover */}
        <Image
          alt={`${title} project thumbnail`}
          src={`${CDN_BASE}/${thumbnail}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Tech Stack Badges - Overlay for small cards */}
        {size === 'small' && (
          <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg">
            <TechStackBadges
              techStack={techStack}
              variant="compact"
              showLabels={false}
            />
          </div>
        )}
      </div>

      {/* Tech Stack Badges - Below image for large cards */}
      {size === 'large' && (
        <TechStackBadges
          techStack={techStack}
          variant="compact"
          showLabels={true}
        />
      )}

      {/* Metadata Section */}
      <div className="flex flex-col gap-3 flex-1">
        <h3
          className={cn(
            'font-bold text-text-dark leading-tight group-hover:text-[#77dd87] transition-colors duration-300',
            {
              'text-xl md:text-2xl': size === 'large',
              'text-base md:text-lg': size === 'small',
            },
          )}
        >
          {title}
        </h3>
        {description && size === 'large' && (
          <p className="text-base text-gray-600 leading-relaxed line-clamp-3 font-light">
            {description}
          </p>
        )}
      </div>

      {/* Links Section */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 mt-auto">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group/link flex items-center justify-center gap-2',
              // Explicit height for consistency
              'h-11',
              // Button-like styling
              'px-4 py-2.5 rounded-lg',
              // Subtle background
              'bg-gray-50 border border-gray-200',
              // Smooth transitions
              'transition-all duration-300',
              // Enhanced hover state
              'hover:bg-[#77dd87] hover:border-[#77dd87]',
              'hover:shadow-md hover:shadow-[#77dd87]/20',
              'hover:-translate-y-0.5',
              // Text styling
              'text-sm font-semibold text-text-dark',
              'hover:text-white',
              // Focus state
              'focus:outline-none focus:ring-2 focus:ring-[#77dd87] focus:ring-offset-2',
              // Responsive
              'w-full sm:w-auto',
            )}
            aria-label={`View ${title} on GitHub`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:scale-110"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
        )}
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'group/link flex items-center justify-center gap-2',
              // Explicit height for consistency
              'h-11',
              // Primary button style
              'px-4 py-2.5 rounded-lg',
              // Pastel Green background
              'bg-[#77dd87] border border-[#77dd87]',
              // Smooth transitions
              'transition-all duration-300',
              // Enhanced hover state
              'hover:bg-[#5fd070] hover:border-[#5fd070]',
              'hover:shadow-lg hover:shadow-[#77dd87]/30',
              'hover:-translate-y-0.5 hover:scale-105',
              // Text styling
              'text-sm font-semibold text-white',
              // Focus state
              'focus:outline-none focus:ring-2 focus:ring-[#77dd87] focus:ring-offset-2',
              // Responsive
              'w-full sm:w-auto',
            )}
            aria-label={`Visit ${title} live site`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover/link:rotate-12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span>Live Demo</span>
          </a>
        )}
      </div>
    </article>
  );
}
