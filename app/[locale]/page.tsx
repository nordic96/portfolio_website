'use client';

import { DashboardLayout, GridCard } from '@/components/Dashboard';
import LiveProjectsSection from '@/components/LiveProjectsSection';

/**
 * Dashboard Home Page - v4.0 Layout Foundation
 *
 * This implements the 100dvh single-view dashboard layout.
 * Each section uses placeholder content that will be replaced
 * in subsequent implementation phases.
 */
export default function Home() {
  return (
    <DashboardLayout
      heroSection={<></>}
      projectsCard={<LiveProjectsSection />}
      certificationsCard={<CertificationsPlaceholder />}
    />
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
