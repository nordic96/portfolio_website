'use client';

import { cn } from '@/app/utils';
import {
  siReact,
  siNextdotjs,
  siTypescript,
  siTailwindcss,
  siNodedotjs,
  siGraphql,
  siMongodb,
  siDocker,
} from 'simple-icons';

/**
 * Tech item interface for post-it badges
 */
interface TechItem {
  id: string;
  name: string;
  icon: typeof siReact;
  category: 'frontend' | 'backend' | 'devops' | 'utilities';
  rotation: number; // -2 to 2 degrees for post-it effect
}

/**
 * Tech stack data with category colors and slight rotation
 * Based on GitHub Issue #423 specifications
 */
const techStack: TechItem[] = [
  {
    id: 'react',
    name: 'React',
    icon: siReact,
    category: 'frontend',
    rotation: -1,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: siTypescript,
    category: 'frontend',
    rotation: 1,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: siNextdotjs,
    category: 'frontend',
    rotation: 0.5,
  },
  {
    id: 'tailwind',
    name: 'Tailwind',
    icon: siTailwindcss,
    category: 'frontend',
    rotation: -0.5,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: siNodedotjs,
    category: 'backend',
    rotation: 1,
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    icon: siGraphql,
    category: 'backend',
    rotation: -1,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: siMongodb,
    category: 'backend',
    rotation: 0,
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: siDocker,
    category: 'devops',
    rotation: 1.5,
  },
];

/**
 * Get border color class based on tech category
 * Optional: Different border colors for different tech categories
 */
function getCategoryBorderClass(
  category: TechItem['category'],
  isHovered: boolean,
): string {
  if (isHovered) return 'border-pastel-green';

  switch (category) {
    case 'frontend':
      return 'border-pastel-green/50';
    case 'backend':
      return 'border-blue-300';
    case 'devops':
      return 'border-orange-300';
    case 'utilities':
      return 'border-gray-200';
    default:
      return 'border-gray-100';
  }
}

interface TechStackPostItsProps {
  /** Whether to show category-based border colors */
  showCategoryColors?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * TechStackPostIts - Horizontal post-it style tech badges
 *
 * Features:
 * - Horizontal flex wrap layout
 * - Post-it styling with slight rotation
 * - Icon + text per badge
 * - Hover: border changes to pastel-green
 * - Optional category color coding
 *
 * @see GitHub Issue #423 for full specifications
 */
export default function TechStackPostIts({
  showCategoryColors = false,
  className,
}: TechStackPostItsProps) {
  return (
    <div
      className={cn('flex flex-wrap gap-2 justify-center', className)}
      role="list"
      aria-label="Technology stack"
    >
      {techStack.map((tech) => (
        <TechBadge
          key={tech.id}
          tech={tech}
          showCategoryColors={showCategoryColors}
        />
      ))}
    </div>
  );
}

interface TechBadgeProps {
  tech: TechItem;
  showCategoryColors: boolean;
}

/**
 * Individual tech badge with post-it styling
 */
function TechBadge({ tech, showCategoryColors }: TechBadgeProps) {
  const borderClass = showCategoryColors
    ? getCategoryBorderClass(tech.category, false)
    : 'border-gray-100';

  return (
    <div
      role="listitem"
      className={cn(
        'flex items-center gap-2 px-3 py-1.5',
        'bg-gray-50 rounded-lg border',
        borderClass,
        'hover:border-pastel-green transition-colors',
        // Ensure sufficient touch target size (44x44px effective)
        'min-h-[44px]',
      )}
      style={{ transform: `rotate(${tech.rotation}deg)` }}
    >
      {/* Icon - decorative, hidden from screen readers */}
      <div
        className="w-4 h-4 flex-shrink-0"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: tech.icon.svg }}
      />
      {/* Text provides meaning for accessibility */}
      <span className="text-xs font-medium text-gray-700">{tech.name}</span>
    </div>
  );
}
