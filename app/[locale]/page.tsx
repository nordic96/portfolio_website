'use client';

import CertificationCard, {
  CertificationCardProps,
} from '@/components/CertificationCard';
import { DashboardLayout } from '@/components/Dashboard';
import LiveProjectsSection from '@/components/LiveProjectsSection';
import GridCard from '@/components/shared/GridCard';
import SmallProjectSection from '@/components/SmallProjectSection/SmallProjectSection';

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
      smallProjectsCard={<SmallProjectSection />}
      certificationsCard={<CertificationsPlaceholder />}
    />
  );
}

/**
 * Certifications Card Placeholder
 * Will be replaced with certification badges
 */
function CertificationsPlaceholder() {
  const certifications: (CertificationCardProps & { id: string })[] = [
    {
      id: 'aws-casa',
      name: 'Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      issueDate: '2023-02-25',
      badgeImage:
        'https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
      verificationUrl:
        'https://www.credly.com/badges/5a00ab1a-d116-4fe6-aad8-52105d3b0603',
    },
    {
      id: 'lfcsa',
      name: 'Linux Foundation Certified Systems Administrator',
      issuer: 'The Linux Foundation',
      issueDate: '2025-03-24',
      badgeImage:
        'https://images.credly.com/size/680x680/images/1e6611ca-8afe-4ecc-ad4d-305fba52ee7e/1_LFCS-600x600.png',
      verificationUrl:
        'https://www.credly.com/badges/4176e5cc-c892-4af0-b4da-59c056bb5aa6/public_url',
    },
  ];

  return (
    <GridCard
      title="Certifications"
      headerClass={'bg-accent-indigo'}
      className={'lg:min-w-90'}
    >
      <div className="space-y-2">
        {certifications.map((cert) => {
          const { id, ...props } = cert;
          return <CertificationCard key={id} {...props} />;
        })}
      </div>
    </GridCard>
  );
}
