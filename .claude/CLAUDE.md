# Stephen's Portfolio Website

## Project Overview

Personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.
- **Live Site:** https://stephenghk.com
- **Dev Server:** http://localhost:3000
- **Design Version:** 5.0 (Night Sky Theme)
- **Current Focus:** v5 Redesign - Epic #431

**Quick Status:** v5.0 core complete (3 of 15 phases). v5.1 polish in progress - responsive typography, mobile breakpoints, animations, and legacy cleanup planned.

---

## MAJOR REDESIGN: v5.0 Night Sky Theme

The website has completed a major visual redesign with a **night sky theme**, animated starfield, and live project previews in iPhone frames.

### Key Changes
- **Visual Theme:** Night sky gradient background with twinkling stars
- **Animation:** Canvas-based starfield with organic twinkling
- **Typography:** Poppins (headings) + Roboto (body), elegant hierarchy
- **Featured Projects:** iPhone 15 Pro frames with live iframes
- **Scroll Pattern:** Scrollable vertical layout with layered sections
- **Color Scheme:** Dark gradient backgrounds with accent highlights

### Implementation Phases
**Phase 1:** Foundation (COMPLETE)
- Color palette and design tokens
- Poppins/Roboto font integration
- CSS variable system setup

**Phase 2:** StarField Animation (COMPLETE)
- Canvas 2D twinkling stars component
- Parallax scrolling effect
- Performance optimized for viewport

**Phase 6:** Live Projects (COMPLETE)
- iPhone 15 Pro frame component with realistic bezel
- Lazy-loading iframe with scaling
- 4-layer design cards for projects

**Status:** v5.0 core phases complete and deployed. Additional phases (3-5, 7-15) and v5.1 refinements tracked in GitHub. See "Current Implementation Status" section below for details.

---

## Tech Stack

- **Framework:** Next.js 16+ (App Router)
- **UI:** React 18+ with TypeScript
- **Styling:** Tailwind CSS
- **Icons:** simple-icons (tech logos), Material UI Icons
- **State Management:** Jotai
- **API:** GraphQL Server connected with MongoDB
- **Deployment:** Vercel
- **Version Control:** GitHub

---

## MCP Servers Enabled

### Playwright MCP
Visual browser automation for testing and debugging UI
- Screenshot capture for design reviews
- Responsive design verification
- Accessibility testing
- Implementation verification

### Sequential Thinking MCP
Breaking down complex problems into structured thinking steps
- Design problem breakdown
- Complex feature planning
- Architecture decisions
- User journey mapping

---

## Subagent System

Custom agents are defined in `.claude/agents/`. Each agent has its own subdirectory with:
- `<agent-name>.md` - Agent definition and capabilities
- `SKILL.md` - Lessons learned, patterns, and best practices

### @ui-ux-designer
**Directory:** `.claude/agents/ui-ux-designer/`
**Role:** Design analysis, conceptual design, and UX recommendations

**When to use:**
- Analyzing current design and UX
- Creating new design concepts and specifications
- Reviewing implemented features
- Providing design feedback
- Accessibility audits

**Files:**
- `ui-ux-designer.md` - Agent definition
- `SKILL.md` - Design patterns, review criteria, accessibility guidelines

**Tools available:**
- Playwright for visual audits
- Sequential Thinking for design problem breakdown
- File reading for context analysis

---

### @frontend-dev
**Directory:** `.claude/agents/frontend-dev/`
**Role:** Implementation of designs and features

**When to use:**
- Building components from design specs
- Refactoring existing code
- Performance optimization
- TypeScript implementation
- Tailwind styling
- Bug fixes

**Files:**
- `frontend-dev.md` - Agent definition
- `SKILL.md` - CSS gotchas, component patterns, best practices (MUST READ FIRST)

**Tools available:**
- Full development tools
- Git operations
- npm commands
- Code editing and testing

---

## Collaborative Workflow

### Standard Pattern
1. **Discovery & Analysis** (@ui-ux-designer)
   - Analyze current state using Playwright
   - Identify issues and opportunities
   - Create design recommendations

2. **Design Specifications** (@ui-ux-designer)
   - Detailed specs with Tailwind classes
   - Responsive behavior specifications
   - Accessibility requirements

3. **Implementation** (@frontend-dev)
   - Build components from specs
   - Ensure responsive behavior
   - Test across breakpoints

4. **Review & Iterate** (@ui-ux-designer)
   - Review implementation with Playwright
   - Provide feedback
   - Iterate if needed

### Handoff Format
When @ui-ux-designer provides specs, @frontend-dev expects:
- Specific Tailwind utility classes or design tokens
- Exact spacing values (px, rem)
- Color codes from existing palette
- Component hierarchy and structure
- Responsive breakpoint behaviors
- Accessibility requirements

**Note:** Workflow patterns are documented inline above - no separate file needed.

---

## Design System (v5.0 Night Sky)

### Color Palette (Night Sky Theme)
```css
/* Primary - Dark Backgrounds */
--gradient-sky: linear-gradient(135deg, #0a0e27 0%, #1a0e3f 50%, #0f1633 100%);
--color-background: #0a0e27;
--color-text-primary: #ffffff;
--color-text-secondary: #a8b2d1;

/* Accent Colors */
--color-accent-gold: #ffd700;
--color-accent-cyan: #00d4ff;
--color-accent-purple: #c084fc;
```

### Typography (v5.0)
| Element | Font | Tailwind |
|---------|------|----------|
| Headings | Poppins | `font-poppins font-bold text-3xl-4xl` |
| Body | Roboto | `font-roboto text-base` |
| Captions | Roboto | `font-roboto text-sm text-text-secondary` |

**Font Setup:** Both fonts loaded in `app/layout.tsx` via Next.js

### Layout
- **Pattern:** Scrollable vertical with layered sections
- **Stars:** Canvas background with parallax
- **Cards:** iPhone Pro frames and design cards
- **Spacing:** Varied per section for visual interest

### Responsive Breakpoints
- **Desktop (>=1024px):** Full width, optimized layouts
- **Tablet (768-1023px):** Adjusted sizing and spacing
- **Mobile (<768px):** Single column, touch-optimized

**Design Reference:** Figma designs reviewed by @ui-ux-designer during session

---

## Reusable Styles System

### Base Styles (Centralized in `app/styles/baseStyles.ts`)

All reusable Tailwind style strings are centralized in `/Users/gihunko/projects/portfolio_website/app/styles/baseStyles.ts` to maintain consistency across components.

**Current Base Styles:**

```typescript
// Glass card effect - dark semi-transparent with blur, responsive padding (v5.1)
export const glassCardBaseStyle = 'bg-dark-gray/50 backdrop-blur-md rounded-3xl max-sm:p-3 md:p-2.5 lg:p-3';

// Hover animation - lift on hover
export const hoverLiftStyle = 'hover:-translate-y-2 transition-transform ease-in-out';

// Base card width - responsive full width with desktop max-width
export const baseWidth = 'w-full lg:max-w-360';
```

**v5.1 Updates:**
- `glassCardBaseStyle` now includes 3-tier responsive padding:
  - Mobile (<768px): `p-3` (12px)
  - Tablet (768-1023px): `p-2.5` (10px)
  - Desktop (>=1024px): `p-3` (12px)
- Uses Tailwind's mobile-first approach with `max-sm:`, `md:`, `lg:` prefixes
- Prefer standard Tailwind classes over arbitrary values (e.g., `p-2.5` instead of `p-[10px]`)

**Usage Pattern:**
```typescript
import { glassCardBaseStyle, hoverLiftStyle } from '@/app/styles';

export function MyCard() {
  return (
    <div className={`${glassCardBaseStyle} ${hoverLiftStyle}`}>
      {/* content */}
    </div>
  );
}
```

**When to Add New Styles:**
- Recurring patterns used in 2+ components
- Shared spacing, dimensions, or effects
- Design system constants (colors, shadows, etc.)
- DO NOT add one-off component styles here

**Tailwind Best Practices (v5.1):**
- Prefer standard Tailwind classes over arbitrary values
- Example: Use `p-2.5` instead of `p-[10px]`
- Example: Use `max-sm:p-3 md:p-2.5 lg:p-3` instead of arbitrary responsive values
- Standard classes benefit from Tailwind's optimization and are more maintainable
- Arbitrary values only when no standard class exists for the value

---

## Component Patterns (v5.0)

### Card Component Pattern

**Structure:** Card title (h3) placed OUTSIDE and ABOVE the glass card container

```typescript
export function ExampleCard() {
  return (
    <div>
      {/* Title outside the card */}
      <h3 className="text-sm font-semibold uppercase mb-2">
        Card Title
      </h3>

      {/* Glass card container */}
      <div className={`${glassCardBaseStyle} mt-3`}>
        {/* Card content */}
      </div>
    </div>
  );
}
```

**Key Points:**
- `h3` for card titles (semantic hierarchy)
- `mt-3` is built into GridCard default style
- Gap between title and card is intentional
- Glass effect handles hover state

### Icon Integration Pattern

**Tech Icons:** Use `useSimpleIcons` hook for consistent rendering with responsive sizing

```typescript
import { useSimpleIcons } from '@/hooks/useSimpleIcons';

interface CardProps {
  iconSlugs: string[];
  size?: 'sm' | 'md' | 'lg'; // responsive: 16px, 24px, 32px
}

export function TechCard({ iconSlugs, size = 'md' }: CardProps) {
  const { icons, IconContainer } = useSimpleIcons(iconSlugs, size);

  return (
    <div className="flex gap-2">
      {icons.map((icon) => (
        <IconContainer
          key={icon.slug}
          icon={icon}
          ariaLabel={icon.title}
        />
      ))}
    </div>
  );
}
```

**Hook Details:**
- **Location:** `/src/hooks/useSimpleIcons.tsx`
- **Returns:** `{ icons: SimpleIcon[]; IconContainer: React.FC }`
- **Sizes:** 'sm' (16px), 'md' (24px), 'lg' (32px)
- **Features:** useMemo optimization, Tooltip on hover, accessibility via aria-label
- **Used by:** SmallProjectCard, LiveProjectCard

**Alternatives:**
- `simple-icons` directly for tech logos (use hook for consistency)
- Material UI Icons (`@mui/icons-material`) for UI icons
- SVG components for custom icons

### Animation Hooks (v5.1)

**useStaggeredAnimation Hook**

For scroll-triggered sequential animations with staggered delays:

```typescript
import { useStaggeredAnimation } from '@/hooks/useStaggeredAnimation';

export function ProjectGrid() {
  const { ref, itemRefs } = useStaggeredAnimation(items.length, {
    delay: 500, // 500ms between items (default)
  });

  return (
    <div ref={ref} className="grid gap-4">
      {items.map((item, idx) => (
        <div
          key={item.id}
          ref={(el) => {
            if (el) itemRefs.current[idx] = el;
          }}
          className="opacity-0 data-[animated]:opacity-100 transition-opacity"
        >
          {item.title}
        </div>
      ))}
    </div>
  );
}
```

**Hook Details:**
- **Location:** `/src/hooks/useStaggeredAnimation.ts`
- **Features:** Intersection Observer API, respects `prefers-reduced-motion`
- **Parameters:** Number of items, delay in milliseconds (default: 500ms)
- **Returns:** `{ ref, itemRefs }` for container and individual items
- **Used by:** SmallProjectCard, CertificationCard, LiveProjectCard sections

**useSectionAnimation Hook**

For simple fade-in animations on viewport entry:

```typescript
import { useSectionAnimation } from '@/hooks/useSectionAnimation';

export function HeroSection() {
  const { ref } = useSectionAnimation();

  return (
    <section
      ref={ref}
      className="opacity-0 data-[animated]:opacity-100 transition-opacity"
    >
      {/* content */}
    </section>
  );
}
```

**Hook Details:**
- **Location:** `/src/hooks/useSectionAnimation.ts`
- **Features:** Simple fade-in, respects `prefers-reduced-motion`
- **Returns:** `{ ref }` for section container
- **Used by:** Hero and Footer sections

### Responsive Typography System (v5.1)

Typography scales across 3 breakpoints defined in `globals.css`:

| Element | Mobile (<768px) | Tablet (768-1023px) | Desktop (>=1024px) | Font | Class |
|---------|-----------------|---------------------|-------------------|------|-------|
| Title | 36px | 48px | 64px | Poppins | `.text-title` |
| H1 | 28px | 36px | 48px | Poppins | `.text-h1` |
| H2 | 22px | 28px | 32px | Poppins | `.text-h2` |
| H3 | 18px | 20px | 24px | Poppins | `.text-h3` |
| Body | 14px | 15px | 16px | Roboto | `.text-body` |
| Secondary | 13px | 14px | 16px | Roboto | `.text-secondary` |

**Usage Pattern:**
```typescript
export function Section() {
  return (
    <>
      <h1 className="text-title">Welcome</h1>
      <p className="text-body">Body text automatically scales across breakpoints</p>
    </>
  );
}
```

**Implementation:**
- CSS custom properties in `:root` (e.g., `--font-size-title`)
- Media queries for responsive scaling
- Line-height optimized per breakpoint
- Defined in `/src/app/globals.css` (lines 81-150+)

### Overlap/Blur Technique (LiveProjectCard)

For sections with overlapping content and glassmorphism:

```typescript
export function OverlapSection() {
  return (
    <div>
      {/* First section */}
      <div className="relative z-0">
        <img src="/background.jpg" alt="" className="w-full" />
      </div>

      {/* Overlapping card with blur */}
      <div className={`${glassCardBaseStyle} -mt-12 relative z-10`}>
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark/70 rounded-3xl" />

        {/* Content with relative positioning */}
        <div className="relative">
          {/* text and content */}
        </div>
      </div>
    </div>
  );
}
```

**Pattern Elements:**
- Negative margin (`-mt-12`) creates overlap
- `backdrop-blur-lg` for glassmorphism effect
- `z-index` layering (z-0 for background, z-10 for card)
- Dark gradient overlay (70% opacity) ensures text readability
- Content must be relative positioned to appear above overlay

### Layout & Loading Patterns

**Suspense Boundary (app/layout.tsx):**
Wrap only `{children}` in Suspense, not the entire layout:

```typescript
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={locale}>
      <body>
        {/* Headers, navigation, etc. - NOT in Suspense */}

        {/* Only children trigger loading.tsx */}
        <Suspense fallback={<LoadingPage />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
```

**Global Loading Page (app/loading.tsx):**
Displays centered CalligraphySignature with animated loading bar:

```typescript
export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col items-center justify-center gap-8">
      <CalligraphySignature width={200} height={80} />
      <div className="loading-bar" />
    </div>
  );
}
```

**Animation (globals.css):**
```css
@keyframes loading-bar {
  0% { width: 0; }
  50% { width: 100%; }
  100% { width: 0; }
}

.loading-bar {
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, #00d4ff, #c084fc);
  animation: loading-bar 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading-bar {
    animation: none;
    width: 100px;
    opacity: 0.5;
  }
}
```

---

## Accessibility Patterns (v5.0)

### ARIA & Semantic HTML

**Interactive Elements:**
```typescript
// Links with ARIA labels
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Visit ${title} project`}
  className="..."
>
  Visit Project
</a>

// Buttons with ARIA labels
<button
  onClick={handler}
  aria-label="Toggle menu"
  className="..."
>
  Menu
</button>
```

**Sections:**
```typescript
// Use semantic HTML
<nav>
  {/* navigation items */}
</nav>

<section>
  {/* content section */}
</section>

<ul>
  {/* lists for grouped content */}
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### Animations & Motion

**Respect `prefers-reduced-motion`:**
```typescript
// In globals.css or component CSS
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// In React components
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function AnimatedComponent() {
  return (
    <div
      className={prefersReducedMotion ? '' : 'animate-fadeIn'}
    >
      {/* content */}
    </div>
  );
}
```

### Internationalization (next-intl)

**For multilingual components:**
```typescript
import { useTranslations } from 'next-intl';

export function LocalizedCard() {
  const t = useTranslations('components.card');

  return (
    <h3 className="...">
      {t('title')} {/* Automatically translated based on locale */}
    </h3>
  );
}
```

---

## Project Goals

- **v5 Night Sky Theme** - Complete visual redesign with night sky aesthetic
- Immersive starfield animation as visual centerpiece
- Live project previews in iPhone frames for engagement
- Smooth scrolling experience with parallax effects
- Create memorable, professional first impression
- Ensure exceptional mobile experience
- Optimize for performance and SEO
- Maintain accessibility standards (WCAG AA minimum)

---

## Development Commands

```bash
npm run dev        # Start development server (localhost:3000)
npm run build      # Build for production
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
npm run start      # Start production server
```

---

## Key Directories

```
portfolio_website/
├── app/
│   ├── [locale]/page.tsx  # v5 homepage with scrollable sections
│   ├── layout.tsx         # Root layout with Suspense boundary, font setup
│   ├── loading.tsx        # Global loading page with CalligraphySignature
│   ├── globals.css        # Global styles, v5 color palette, animations
│   └── styles/
│       └── baseStyles.ts  # Reusable Tailwind style strings (CENTRALIZED)
├── components/
│   ├── StarField/         # Canvas-based twinkling stars (Phase 2)
│   ├── IPhoneProFrame/    # iPhone 15 Pro bezel component
│   ├── LiveProjectIframe/ # Lazy-loading iframe with mobile fallback
│   ├── LiveProjectCard/   # 4-layer design card component
│   ├── LiveProjectsSection/ # Featured projects section
│   ├── SmallProjectCard/  # Compact card for GitHub projects
│   ├── CertificationCard/ # Certification display with badge
│   ├── CalligraphySignature/ # Animated signature with clip-path reveal
│   ├── PrimaryButton/     # Shared button with SimpleIcon support
│   ├── Dashboard/         # v4.0 components (legacy)
│   ├── HeroSection/       # Hero with tech logos
│   ├── ProjectSection/    # Projects grid
│   └── AboutSection/      # About with timeline
├── hooks/
│   ├── useSimpleIcons.tsx # Hook for consistent SimpleIcon rendering with responsive sizing
│   ├── useStaggeredAnimation.ts # Scroll-triggered staggered animations (v5.1)
│   ├── useSectionAnimation.ts # Simple fade-in on viewport entry (v5.1)
│   ├── useBreakpoint.ts # Responsive breakpoint detection
│   └── useClickOutside.ts # Click-outside detection
├── public/
│   └── assets/            # Static assets (images, SVGs, backgrounds)
├── docs/
│   └── img/               # Design references
└── .claude/
    ├── CLAUDE.md          # This file (single source of truth)
    └── agents/            # Agent definitions and skills
        ├── frontend-dev/
        │   ├── frontend-dev.md
        │   └── SKILL.md
        └── ui-ux-designer/
            ├── ui-ux-designer.md
            └── SKILL.md
```

---

## Current Implementation Status (v5.0 with v5.1 Polish)

### Completed Phases
**Phase 1: Foundation** (COMPLETE - PR #434)
- Night sky color palette with CSS variables
- Poppins (headings) + Roboto (body) fonts
- Theme tokens in `globals.css`

**Phase 2: StarField Animation** (COMPLETE - PR #435)
- Canvas 2D component with twinkling stars
- Parallax scrolling support
- Performance optimizations

**Phase 6: Live Projects** (COMPLETE - PR #440)
- iPhone 15 Pro frame component with accurate bezel
- Lazy-loading iframe component
- 4-layer design card system
- LiveProjectsSection container

### v5.1 Polish (IN PROGRESS)

**Issue #462 - Mobile & Tablet Breakpoints** (PR #468)
- Created 3-tier responsive typography system in `globals.css`
  - Desktop (>=1024px), Tablet (768-1023px), Mobile (<768px)
  - Applies to: Title, H1, H2, H3, Body, Secondary text
- Updated `glassCardBaseStyle` with responsive padding
  - `max-sm:p-3 md:p-2.5 lg:p-3` for mobile-first sizing
- Simplified `useSimpleIcons` hook for consistency
- Applied to SmallProjectCard, CertificationCard, and other components

**Issue #454 - Section Animations** (PR #469)
- Created `useStaggeredAnimation` hook at `src/hooks/useStaggeredAnimation.ts`
  - Scroll-triggered staggered animations with 500ms delay between items
  - Respects `prefers-reduced-motion` user preference
  - Used in SmallProjectCard, CertificationCard, LiveProjectCard sections
- Created `useSectionAnimation` hook at `src/hooks/useSectionAnimation.ts`
  - Simple fade-in animation on viewport entry
  - Respects `prefers-reduced-motion` user preference
  - Applied to Hero and Footer sections
- Both hooks use Intersection Observer API for performance

**Previous v5.1 Issues (Complete)**
- **#460 - iFrame Mobile Crashes:** Mobile detection via `useBreakpoint` hook, renders fallback image on mobile
- **#461 - SmallProjectCard Icons:** `useSimpleIcons` hook with responsive sizing, tooltip support
- **#459 - Global Loading Page:** CalligraphySignature + animated loading bar in `app/loading.tsx`
- **#457 - Footer Polish:** 44px touch targets, focus-visible states

**Issue #467 - Legacy Cleanup** (Created)
- Planned removal of unused v3/v4 code from `/components/Dashboard/` and legacy sections
- Track via GitHub for v5.2 cleanup phase

### Remaining Phases (3-5, 7-15)
See Epic #431 for detailed roadmap. Track via GitHub issues #432-439 on `develop_v5` branch.

### v4.0 Features (LEGACY)
Previous dashboard layout components available in `/components/Dashboard/`:
- DashboardLayout container
- GridCard base component
- ProjectsCard, HeroCard, etc.

### v3.0 Features (ARCHIVED)
Previous implementations:
- Hero Section with orbital tech logos
- Featured Projects bento grid
- About Section with timeline

---

## v5.1 Progress & Known Issues

### Issues In Progress
**#462 - Mobile & Tablet Breakpoints** (PR #468)
- 3-tier responsive typography system (mobile/tablet/desktop)
- Responsive padding in `glassCardBaseStyle`
- Affects: SmallProjectCard, CertificationCard, LiveProjectCard
- Status: IN PROGRESS

**#454 - Section Animations** (PR #469)
- Staggered animations with `useStaggeredAnimation` hook
- Fade-in animations with `useSectionAnimation` hook
- Applied to: SmallProjectCard, CertificationCard, LiveProjectCard sections, Hero, Footer
- Status: IN PROGRESS

### Resolved Issues (v5.1)
**#460 - iFrame Mobile Crashes:** Fixed with mobile fallback image (PR #463)
**#461 - SmallProjectCard Icons:** Resolved with `useSimpleIcons` hook (PR #464)
**#459 - Global Loading Page:** Implemented loading.tsx with Suspense (PR #466)
**#457 - Footer Polish:** 44px touch targets, focus-visible states (PR #465)

### Planned Issues (v5.2)
**#467 - Legacy Cleanup**
- Remove unused v3/v4 code from `/components/Dashboard/`
- Archive old component patterns
- Update docs to reflect v5.x as primary version

---

## Using This Project

### For Design Analysis/Planning
```
@ui-ux-designer Please analyze [feature/section] and provide
recommendations using Playwright screenshots
```

### For Implementation
```
@frontend-dev Implement [feature] based on the Design System specs
in CLAUDE.md
```

### For Review
```
@ui-ux-designer Review the implemented [feature] at localhost:3000
and provide feedback
```

---

## Important Context Documents

### Essential Reading (v5.0)
- **CLAUDE.md** (this file) - Single source of truth for project-wide patterns, design system, and architecture
- **agents/ui-ux-designer/SKILL.md** - Design review criteria, Figma analysis patterns, v5.0 session learnings
- **agents/frontend-dev/SKILL.md** - CSS patterns, component architecture, Canvas optimization, v5.0 implementation patterns

### GitHub & Branch Strategy
- **GitHub Epic #431** - Master plan for v5 redesign with 15 phases
- **GitHub Issues #432-439** - Individual phase tracking (Phases 1-2, 6 complete)
- **GitHub Milestone #12** - v5.1 iteration with issues #454-#462
- **develop_v5** - Integration branch for all v5 work
- **develop** - Current active branch for v5.1 work
- Feature branches: `feature/phase-#` off develop_v5
- PRs target develop_v5, not master
- Example: PR #440 for Phase 6 implementation

---

## Quick Reference

### Current Version & Branch
- **Version:** 5.1 (Night Sky Theme - In Progress)
- **Active Branch:** develop (v5.1 work)
- **GitHub Epic #431:** Master v5.0 redesign plan (3 of 15 phases complete)
- **GitHub Milestone #12:** v5.1 polish (issues #454-#462)
- **Latest PRs:** #468 (Mobile Breakpoints), #469 (Animations), #463-#466 (v5.1 foundation)

### Design Philosophy (v5.0)
- **Immersive:** Night sky gradient with animated stars
- **Engaging:** Live project previews in iPhone frames
- **Elegant:** Poppins headings with Roboto body text
- **Scrollable:** Layered sections with parallax effects
- **Smooth:** Organic animations and transitions

### New Components & Hooks Reference

**Phase 2 & 6 (Complete):**
- `StarField` - Canvas 2D twinkling star animation with parallax
- `IPhoneProFrame` - iPhone 15 Pro bezel with rounded corners and notch
- `LiveProjectIframe` - Lazy-loading iframe with mobile image fallback
- `LiveProjectCard` - 4-layer design card for projects (uses overlap/blur technique)
- `LiveProjectsSection` - Container for featured projects

**v5.1 Polish Components:**
- `SmallProjectCard` - Compact card for GitHub projects with glass effect, uses `useSimpleIcons`
- `CertificationCard` - Certification display with badge, uses `glassCardBaseStyle`
- `CalligraphySignature` - Animated signature with clip-path reveal effect
- `PrimaryButton` - Shared button component with SimpleIcon support

**Global Features (v5.1):**
- `loading.tsx` - Global loading page with CalligraphySignature and animated loading bar
- Suspense boundary in `layout.tsx` wraps only {children} for loading state

**Custom Hooks (v5.1):**
- `useSimpleIcons` - Consistent SimpleIcon rendering with responsive sizing, tooltip support, and accessibility
- `useStaggeredAnimation` - Scroll-triggered staggered animations with configurable delays (500ms default)
- `useSectionAnimation` - Simple fade-in on viewport entry with intersection observer
- `useBreakpoint` - Responsive breakpoint detection for mobile/tablet/desktop
- `useClickOutside` - Click-outside detection for modals and menus

**All components follow:**
- Reusable styles from `/app/styles/baseStyles.ts`
- Card title pattern (h3 outside container)
- Glass effect with `glassCardBaseStyle`
- Hover animations with `hoverLiftStyle`
- Responsive design using Tailwind breakpoints
- Mobile-first approach with 44px touch targets (WCAG AA)

### Accessibility
- WCAG AA compliance target
- Color contrast verified (dark backgrounds)
- Touch targets minimum 44x44px
- Keyboard navigation support
- `prefers-reduced-motion` respected
- Canvas animations respect user preferences

---

## Contact & Collaboration

**GitHub Issues:** Track work via Epic #431 and sub-issues #432-439
**Branch Strategy:** Feature branches → develop_v5 → master (via PR)
**Code Review:** Required before merge to develop_v5
**Deployment:** Manual testing on develop_v5; automatic via Vercel on merge to master

---

**Last Updated:** January 23, 2026
**Document Version:** 5.1 (Night Sky Theme - In Progress)
**Progress:** 3 of 15 core phases complete + v5.1 polish (issues #454, #462 in PR)

**Recent Updates (Jan 23 - v5.1 Polish Continued):**
- Added v5.1 Animation Hooks documentation (`useStaggeredAnimation`, `useSectionAnimation`)
- Documented 3-tier responsive typography system (mobile/tablet/desktop)
- Updated `glassCardBaseStyle` with responsive padding (PR #468)
- Added note on Tailwind class preference (standard over arbitrary values)
- Updated v5.1 Progress section with PR #468-#469 status
- Resolved merge conflicts from upstream v5.0 deployment
- Documented hooks in Key Directories section
