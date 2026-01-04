'use client';

import HeroSection from '@/components/HeroSection';
import TechStackLogos from '@/components/HeroSection/TechStackLogos';
import ProjectSection from '@/components/ProjectSection/ProjectSection';
import AboutSection from '@/components/AboutSection';
import { useBreakpoint } from '../hooks';
import { cn } from '../utils';
import { baseWidth } from '../styles';

export default function Home() {
  const breakpoint = useBreakpoint();
  return (
    <main className={'relative min-h-screen flex flex-col items-center'}>
      <TechStackLogos
        animation={true}
        radius={breakpoint === 'mobile' ? 40 : 30}
      />
      <div
        className={cn(baseWidth, 'flex flex-col justify-center items-center')}
      >
        <HeroSection />
        <ProjectSection />
        <AboutSection />
      </div>
    </main>
  );
}
