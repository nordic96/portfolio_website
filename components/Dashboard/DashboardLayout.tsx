'use client';

import { cn } from '@/app/utils';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
  heroSection: ReactNode;
  projectsCard: ReactNode;
  certificationsCard: ReactNode;
}

/**
 * DashboardLayout - v4.0 100dvh single-view layout
 *
 * Layout Structure:
 * - Header (60px fixed)
 * - Main content grid (flex-1)
 *   - Row 1: Hero Section (spans both columns)
 *   - Row 2: Projects (left) | Tech Stack (right)
 *   - Row 3: About (left) | Certifications (right)
 * - Footer (48px fixed)
 *
 * Responsive Behavior:
 * - Desktop (>=768px): 2-column grid, 100dvh fixed
 * - Mobile (<768px): Single column stack, scrollable
 */
export default function DashboardLayout({
  heroSection,
  projectsCard,
  certificationsCard,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-dvh md:h-dvh flex flex-col">
      {/* Main Content - Mobile: scrollable, Desktop: fixed */}
      <main className="flex-1 px-4 md:px-6 pb-4 overflow-y-auto md:overflow-hidden">
        <div
          className={cn(
            'h-full max-w-6xl mx-auto',
            // Mobile: single column vertical stack
            'flex flex-col gap-4',
            // Desktop: 2-column grid with 3 rows
            'md:grid md:grid-cols-2 md:grid-rows-[auto_1fr_1fr] md:gap-4',
          )}
        >
          {/* Row 1: Hero Section - spans both columns on desktop */}
          <div className="md:col-span-2">{heroSection}</div>

          {/* Row 2: Projects (left) */}
          <div className="md:col-span-1">{projectsCard}</div>

          {/* Row 3: Certifications (right) */}
          <div className="md:col-span-1">{certificationsCard}</div>
        </div>
      </main>
    </div>
  );
}
