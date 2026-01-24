'use client';

import CertificationCard, {
  CertificationCardProps,
} from '@/src/components/CertificationCard';
import { DashboardLayout } from '@/src/components/Dashboard';
import NameCard from '@/src/components/NameCard';
import LiveProjectsSection from '@/src/components/LiveProjectsSection';
import GridCard from '@/src/components/shared/GridCard';
import SmallProjectSection from '@/src/components/SmallProjectSection/SmallProjectSection';
import { useTranslations } from 'next-intl';
import { useStaggeredAnimation } from '@/src/hooks';

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
      heroSection={<NameCard />}
      projectsCard={<LiveProjectsSection />}
      smallProjectsCard={<SmallProjectSection />}
      certificationsCard={<CertificationsSection />}
    />
  );
}

/**
 * Certifications Section
 * Displays professional certification badges with verification links
 * Uses staggered animation for items appearing one by one from top to bottom
 */
function CertificationsSection() {
  const t = useTranslations('Certifications');

  const certifications: (CertificationCardProps & { id: string })[] = [
    {
      id: 'aws-casa',
      name: t('aws_saa.name'),
      issuer: t('aws_saa.issuer'),
      issueDate: '2023-02-25',
      badgeImage:
        'https://images.credly.com/size/680x680/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png',
      badgeAlt: t('aws_saa.badge_alt'),
      verificationUrl:
        'https://www.credly.com/badges/5a00ab1a-d116-4fe6-aad8-52105d3b0603',
    },
    {
      id: 'lfcsa',
      name: t('lfcs.name'),
      issuer: t('lfcs.issuer'),
      issueDate: '2025-03-24',
      badgeImage:
        'https://images.credly.com/size/680x680/images/1e6611ca-8afe-4ecc-ad4d-305fba52ee7e/1_LFCS-600x600.png',
      badgeAlt: t('lfcs.badge_alt'),
      verificationUrl:
        'https://www.credly.com/badges/4176e5cc-c892-4af0-b4da-59c056bb5aa6/public_url',
    },
  ];

  // Staggered animation for certification cards
  const { containerRef, getItemClassName } =
    useStaggeredAnimation<HTMLUListElement>({
      itemCount: certifications.length,
      staggerDelay: 500,
    });

  return (
    <GridCard
      title={'certs'}
      headerClass={'bg-accent-indigo'}
      className={'lg:min-w-90'}
    >
      <section aria-label={t('section_label')}>
        <ul ref={containerRef} className="space-y-2 list-none" role="list">
          {certifications.map((cert, index) => {
            const { id, ...props } = cert;
            return (
              <li key={id} className={getItemClassName(index)}>
                <CertificationCard {...props} />
              </li>
            );
          })}
        </ul>
      </section>
    </GridCard>
  );
}
