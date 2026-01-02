'use client';

import { baseWidth } from '@/app/styles';
import { cn } from '@/app/utils';
import { useEffect, useState, useMemo } from 'react';
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
}

interface LogoPosition extends LogoData {
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

// Logo data (icon + name only)
const logoData: LogoData[] = [
  { icon: siReact, name: 'React' },
  { icon: siNextdotjs, name: 'NextJS' },
  { icon: siTypescript, name: 'Typescript' },
  { icon: siJavascript, name: 'Javascript' },
  { icon: siGithub, name: 'GitHub' },
  { icon: siTailwindcss, name: 'Tailwind' },
  { icon: siSass, name: 'SaSS' },
  { icon: siDocker, name: 'Docker' },
  { icon: siHtml5, name: 'HTML5' },
  { icon: siJenkins, name: 'Jenkins' },
  { icon: siBitbucket, name: 'Bitbucket' },
  { icon: siStorybook, name: 'Storybook' },
  { icon: siEslint, name: 'ESLint' },
  { icon: siJest, name: 'Jest' },
  { icon: siCypress, name: 'Cypress' },
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
}

export default function TechStackLogos({
  animation = true,
  radius = 35, // Default radius: 35% of container height
  centerX = 50,
  centerY = 50,
}: TechStackLogosProps) {
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
    <div className="absolute w-full lg:h-190 max-sm:h-[50dvh] top-0 block overflow-hidden bg-gradient-to-b from-pastel-green via-pastel-green to-white">
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
              'flex gap-4 items-center w-50 max-sm:w-25 bg-white py-2 px-4 border-l-pastel-green border-l-20',
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
              className="min-w-10 h-10 max-sm:w-5 max-sm:h-5"
              dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
            />
            <span className={'font-black text max-sm:text-xs uppercase'}>
              {logo.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
