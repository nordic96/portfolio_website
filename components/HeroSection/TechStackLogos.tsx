'use client';

import { useBreakpoint } from '@/app/hooks';
import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import { useEffect, useState, useMemo, Activity } from 'react';
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

interface LogoData {
  icon: typeof siReact;
  name: string;
  color?: 'pastel-green' | 'blue-green' | 'pastel-pink';
}

interface LogoPosition extends LogoData {
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

// Logo data (icon + name only)
// Color coding: pastel-green = frontend, blue-green = utilities, pastel-pink = CI/CD
const logoData: LogoData[] = [
  { icon: siReact, name: 'React', color: 'pastel-green' },
  { icon: siNextdotjs, name: 'NextJS', color: 'pastel-green' },
  { icon: siTypescript, name: 'Typescript', color: 'pastel-green' },
  { icon: siJavascript, name: 'Javascript', color: 'pastel-green' },
  { icon: siGithub, name: 'GitHub', color: 'pastel-pink' },
  { icon: siTailwindcss, name: 'Tailwind', color: 'blue-green' },
  { icon: siSass, name: 'SaSS', color: 'blue-green' },
  { icon: siDocker, name: 'Docker', color: 'pastel-pink' },
  { icon: siHtml5, name: 'HTML5', color: 'pastel-green' },
  { icon: siJenkins, name: 'Jenkins', color: 'pastel-pink' },
  { icon: siBitbucket, name: 'Bitbucket', color: 'pastel-pink' },
  { icon: siStorybook, name: 'Storybook', color: 'blue-green' },
  { icon: siEslint, name: 'ESLint', color: 'blue-green' },
  { icon: siJest, name: 'Jest', color: 'blue-green' },
  { icon: siCypress, name: 'Cypress', color: 'blue-green' },
];

/**
 * Calculate circular positions for logos
 * @param radiusPercent - Radius of the circle as percentage of container height
 * @param centerX - X coordinate of circle center (percentage)
 * @param centerY - Y coordinate of circle center (percentage)
 * @returns Array of logo positions
 */
function calculateCircularPositions(
  radiusPercent: number,
  centerX: number = 50,
  centerY: number = 50,
): LogoPosition[] {
  const totalLogos = logoData.length;
  const angleStep = (2 * Math.PI) / totalLogos; // Divide circle into equal parts
  const startAngle = -Math.PI / 2; // Start at top (12 o'clock position)

  return logoData.map((logo, index) => {
    const angle = startAngle + index * angleStep;

    // Calculate position relative to center
    // radiusPercent is percentage of container, so we scale it to x/y separately
    // For x-axis, scale by aspect ratio to maintain circular shape
    const radiusX = radiusPercent * 0.7; // Adjust for wider aspect ratio
    const radiusY = radiusPercent;

    const x = centerX + radiusX * Math.cos(angle);
    const y = centerY + radiusY * Math.sin(angle);

    // Add slight random rotation for organic feel (-10 to +10 degrees)
    const rotation = Math.floor(Math.random() * 21) - 10;

    // Stagger delay for animation
    const delay = 1.2 + index * 0.05;

    return {
      ...logo,
      x,
      y,
      rotation,
      delay,
    };
  });
}

const DELAY_INTERVAL = 300; // 300ms per logo = ~4.5 seconds for all 15 logos

interface TechStackLogosProps {
  animation?: boolean;
  radius?: number; // Radius as percentage of container height (0-100)
  centerX?: number; // Center X as percentage (0-100)
  centerY?: number; // Center Y as percentage (0-100)
  variant?: 'hero' | 'compact'; // 'hero' = orbital layout, 'compact' = horizontal flex
  className?: string;
}

export default function TechStackLogos({
  animation = true,
  radius = 35, // Default radius: 35% of container height
  centerX = 50,
  centerY = 50,
  variant = 'hero',
  className,
}: TechStackLogosProps) {
  // For compact variant, use the simpler horizontal layout
  if (variant === 'compact') {
    return <TechStackCompact className={className} />;
  }

  // Hero variant: orbital layout
  return (
    <TechStackHero
      animation={animation}
      radius={radius}
      centerX={centerX}
      centerY={centerY}
    />
  );
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
              'border-l-pastel-green': logo.color === 'pastel-green',
              'border-l-blue-green': logo.color === 'blue-green',
              'border-l-pastel-pink': logo.color === 'pastel-pink',
            },
          )}
          style={{
            transform: `rotate(${rotations[index]}deg)`,
          }}
        >
          <div
            className="w-4 h-4 flex-shrink-0"
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

/**
 * TechStackHero - Original orbital layout for hero section
 */
function TechStackHero({
  animation,
  radius,
  centerX,
  centerY,
}: {
  animation: boolean;
  radius: number;
  centerX: number;
  centerY: number;
}) {
  const breakpoint = useBreakpoint();
  // Memoize positions to prevent recalculation on every render
  const logoPositions = useMemo(
    () => calculateCircularPositions(radius, centerX, centerY),
    [radius, centerX, centerY],
  );

  const [logoArr, setLogoArr] = useState<LogoPosition[]>(
    animation ? [] : logoPositions,
  );

  useEffect(() => {
    if (!animation) {
      setLogoArr(logoPositions);
      return;
    }

    // Reset array when animation restarts
    setLogoArr([]);

    let i = 0;
    const n = logoPositions.length;
    const intervalId = setInterval(() => {
      if (i < n) {
        const nextLogo = logoPositions[i];
        if (nextLogo) {
          setLogoArr((arr) => [...arr, nextLogo]);
        }
        i++;
      } else {
        clearInterval(intervalId);
      }
    }, DELAY_INTERVAL);

    return () => clearInterval(intervalId);
  }, [animation, logoPositions]);

  return (
    <div className="absolute w-full h-190 max-sm:h-[50dvh] top-0 block overflow-hidden bg-gradient-to-b from-blue-green via-pastel-green to-white z-49">
      <div
        className={cn(
          baseWidth,
          'absolute h-full left-[50%] -translate-x-[50%]',
        )}
      >
        {logoArr.map((logo, index) => (
          <div
            key={`logo-${index}`}
            className={cn(
              'tech-logo absolute',
              'flex gap-4 items-center w-50 max-sm:w-20 bg-white py-2 px-4 border-l-20 max-sm:border-l-10',
              {
                'border-l-pastel-green': logo.color === 'pastel-green',
                'border-l-blue-green': logo.color === 'blue-green',
                'border-l-pastel-pink': logo.color === 'pastel-pink',
              },
            )}
            style={
              {
                left: `${logo.x}%`,
                top: `${logo.y}%`,
                '--rotation': `${logo.rotation}deg`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <div
              className="min-w-10 h-10 md:min-w-8 md:h-8 max-sm:min-w-6 max-sm:h-6"
              dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
            />
            <Activity mode={breakpoint === 'mobile' ? 'hidden' : 'visible'}>
              <span className={'font-black text max-sm:text-xs uppercase'}>
                {logo.name}
              </span>
            </Activity>
          </div>
        ))}
      </div>
    </div>
  );
}
