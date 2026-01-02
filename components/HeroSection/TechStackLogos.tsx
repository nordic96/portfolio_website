'use client';

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
  siCypress,
  siEslint,
} from 'simple-icons';

// Zustand and Jotai don't have official simple-icons, using custom SVG data
const zustandIcon = {
  svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Zustand</title><path fill="currentColor" d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0zm0 2a10 10 0 1 1-10 10A10 10 0 0 1 12 2zm-1 5v10l9-5z"/></svg>',
  hex: '77dd87',
  title: 'Zustand',
};

const jotaiIcon = {
  svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Jotai</title><path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18l7.5 3.75v7.5L12 19.18l-7.5-3.75v-7.5L12 4.18z"/></svg>',
  hex: '77dd87',
  title: 'Jotai',
};

interface LogoPosition {
  icon: typeof siReact | typeof zustandIcon;
  top: string;
  left: string;
  rotation: number;
  delay: number;
}

// Logos positioned in orbital pattern around profile photo
// Based on user reference (film boxes aesthetic with random angles)
const logoPositions: LogoPosition[] = [
  { icon: siReact, top: '15%', left: '48%', rotation: -12, delay: 1.2 },
  { icon: siNextdotjs, top: '10%', left: '58%', rotation: 8, delay: 1.25 },
  { icon: siTypescript, top: '20%', left: '68%', rotation: -15, delay: 1.3 },
  { icon: siJavascript, top: '40%', left: '72%', rotation: 18, delay: 1.35 },
  { icon: siGithub, top: '60%', left: '68%', rotation: -8, delay: 1.4 },
  { icon: siTailwindcss, top: '75%', left: '58%', rotation: 12, delay: 1.45 },
  { icon: siSass, top: '80%', left: '48%', rotation: -20, delay: 1.5 },
  { icon: siDocker, top: '75%', left: '38%', rotation: 15, delay: 1.55 },
  { icon: zustandIcon, top: '60%', left: '28%', rotation: -10, delay: 1.6 },
  { icon: jotaiIcon, top: '40%', left: '24%', rotation: 22, delay: 1.65 },
  { icon: siEslint, top: '20%', left: '28%', rotation: -5, delay: 1.7 },
  { icon: siJest, top: '10%', left: '38%', rotation: 16, delay: 1.75 },
  { icon: siCypress, top: '50%', left: '50%', rotation: -18, delay: 1.8 },
];

export default function TechStackLogos() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block overflow-hidden">
      {logoPositions.map((logo, index) => (
        <div
          key={`logo-${index}`}
          className="tech-logo absolute"
          style={{
            top: logo.top,
            left: logo.left,
            transform: `rotate(${logo.rotation}deg)`,
            animationDelay: `${logo.delay}s`,
          }}
          aria-hidden="true"
        >
          <div
            className="w-12 h-12"
            dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
          />
        </div>
      ))}
    </div>
  );
}
