'use client';

import {
  DashboardLayout,
  GridCard,
  ProjectsCard,
} from '@/components/Dashboard';
import TechStackLogos from '@/components/HeroSection/TechStackLogos';
import { useBreakpoint } from '../hooks';

/**
 * Dashboard Home Page - v4.0 Layout Foundation
 *
 * This implements the 100dvh single-view dashboard layout.
 * Each section uses placeholder content that will be replaced
 * in subsequent implementation phases.
 */
export default function Home() {
  const breakpoint = useBreakpoint();
  return (
    <DashboardLayout
      heroSection={<HeroPlaceholder />}
      projectsCard={
        <ProjectsCard
          maxProjects={breakpoint === 'mobile' ? 4 : 6}
          className={'p-0!'}
        />
      }
      techStackCard={<TechStackCard />}
      aboutCard={<AboutPlaceholder />}
      certificationsCard={<CertificationsPlaceholder />}
    />
  );
}

/**
 * Hero Section Placeholder
 * Will be replaced with compact profile photo + name + headline
 */
function HeroPlaceholder() {
  return (
    <GridCard className="flex items-center gap-6">
      {/* Profile Photo Placeholder */}
      <div
        className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-gray-100 border-2 border-pastel-green shrink-0 flex items-center justify-center"
        aria-label="Profile photo placeholder"
      >
        <span className="text-gray-400 text-xs">Photo</span>
      </div>

      {/* Text Content */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl lg:text-3xl font-bold text-text-dark">
          Stephen Ko
        </h1>
        <p className="text-base lg:text-lg font-light text-gray-600 mt-1">
          I build exceptional web experiences
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Frontend Developer | Seoul, Korea
        </p>
      </div>
    </GridCard>
  );
}

/**
 * Tech Stack Card - Post-it style tech badges
 * Uses compact variant of TechStackLogos (reused from HeroSection)
 * Implements GitHub Issue #423
 */
function TechStackCard() {
  return (
    <GridCard title="Tech Stack" className={'py-3 relative'}>
      <div
        style={{
          backgroundImage: 'url(/assets/cork_board.png)',
        }}
        className={'absolute inset-0 bg-cover bg-no-repeat bg-center'}
      >
        <div className={'h-full w-full rotate-45 transform'}></div>
      </div>
      <TechStackLogos />
    </GridCard>
  );
}

/**
 * About Card Placeholder
 * Will be replaced with brief bio content
 */
function AboutPlaceholder() {
  return (
    <GridCard title="About">
      <p className="text-sm text-gray-600 leading-relaxed">
        Frontend developer with 5+ years of experience building scalable web
        applications. Passionate about clean code, accessible design, and
        continuous learning.
      </p>
      <a
        href="#"
        className="text-sm text-pastel-green hover:underline mt-3 inline-block"
      >
        Read more
      </a>
    </GridCard>
  );
}

/**
 * Certifications Card Placeholder
 * Will be replaced with certification badges
 */
function CertificationsPlaceholder() {
  const certifications = ['AWS Solutions Architect', 'Google Cloud', 'Azure'];

  return (
    <GridCard title="Certifications">
      <div className="space-y-2">
        {certifications.map((cert) => (
          <div key={cert} className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-[8px]">icon</span>
            </div>
            <span className="text-sm text-text-dark">{cert}</span>
          </div>
        ))}
      </div>
    </GridCard>
  );
}
