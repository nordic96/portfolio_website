'use client';

import { useEffect, useState } from 'react';
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

interface LogoPosition {
  icon: typeof siReact;
  top: string;
  left: string;
  rotation: number;
  delay: number;
}

// Logos positioned in orbital pattern around profile photo
// Based on user reference (film boxes aesthetic with random angles)
const logoPositions: LogoPosition[] = [
  { icon: siReact, top: '15%', left: '75%', rotation: -12, delay: 1.2 },
  { icon: siNextdotjs, top: '10%', left: '58%', rotation: 8, delay: 1.25 },
  { icon: siTypescript, top: '20%', left: '68%', rotation: -15, delay: 1.3 },
  { icon: siJavascript, top: '40%', left: '82%', rotation: 18, delay: 1.35 },
  { icon: siGithub, top: '58%', left: '68%', rotation: -8, delay: 1.4 },
  { icon: siTailwindcss, top: '75%', left: '78%', rotation: 12, delay: 1.45 },
  { icon: siSass, top: '80%', left: '18%', rotation: -20, delay: 1.5 },
  { icon: siDocker, top: '70%', left: '28%', rotation: 15, delay: 1.55 },
  { icon: siHtml5, top: '10%', left: '18%', rotation: 15, delay: 1.55 },
  { icon: siJenkins, top: '50%', left: '10%', rotation: 15, delay: 1.55 },
  { icon: siBitbucket, top: '70%', left: '65%', rotation: 15, delay: 1.55 },
  { icon: siStorybook, top: '55%', left: '88%', rotation: 15, delay: 1.55 },
  { icon: siEslint, top: '20%', left: '28%', rotation: -5, delay: 1.7 },
  { icon: siJest, top: '10%', left: '38%', rotation: 16, delay: 1.75 },
  { icon: siCypress, top: '40%', left: '30%', rotation: -18, delay: 1.8 },
];

const DELAY_INTERVAL = 500;
export default function TechStackLogos({
  animation = true,
}: {
  animation?: boolean;
}) {
  const [logoArr, setLogoArr] = useState<LogoPosition[]>(
    animation ? [] : logoPositions,
  );

  useEffect(() => {
    if (!animation) return;
    let i = 0;
    const n = logoPositions.length;
    const intervalId = setInterval(() => {
      setLogoArr((arr) => {
        if (i >= n) {
          clearInterval(intervalId);
          return arr;
        }
        return [...arr, logoPositions[i]];
      });
      i++;
    }, DELAY_INTERVAL);
    return () => clearInterval(intervalId);
  }, [animation]);

  return (
    <div className="absolute w-full h-[50dvh] top-0 left-0 block overflow-hidden bg-gradient-to-b from-pastel-green via-pastel-green via-85% to-white">
      <div className={'relative w-full h-full'}>
        {logoArr.map((logo, index) => (
          <div
            key={`logo-${index}`}
            className="tech-logo absolute"
            style={
              {
                top: logo.top,
                left: logo.left,
                '--rotation': `${logo.rotation}deg`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            <div
              className="w-14 h-14 max-sm:w-8 max-sm:h-8"
              dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
