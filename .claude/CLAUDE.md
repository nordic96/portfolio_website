# Stephen's Portfolio Website

## Project Overview

Personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.
- **Live Site:** https://stephenghk.com
- **Dev Server:** http://localhost:3000
- **Design Version:** 5.0 (Night Sky Theme)
- **Current Focus:** v5 Redesign - Epic #431

**Quick Status:** v5.0 deployed to production. v5.1 in progress - mobile/tablet refinements (see Current Implementation Status section below).

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
// Glass card effect - dark semi-transparent with blur
export const glassCardBaseStyle = 'bg-dark-gray/50 backdrop-blur-md rounded-3xl p-3';

// Hover animation - lift on hover
export const hoverLiftStyle = 'hover:-translate-y-2 transition-transform ease-in-out';

// Base card width - responsive full width with desktop max-width
export const baseWidth = 'w-full lg:max-w-360';
```

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

**Tech Icons:** Use `SimpleIcon[]` from `simple-icons` with `dangerouslySetInnerHTML`

```typescript
import { SimpleIcon } from 'simple-icons';

interface CardProps {
  icons: SimpleIcon[];
}

export function TechCard({ icons }: CardProps) {
  return (
    <div className="flex gap-2">
      {icons.map((icon) => (
        <div
          key={icon.slug}
          dangerouslySetInnerHTML={{ __html: icon.svg }}
          className="w-6 h-6"
        />
      ))}
    </div>
  );
}
```

**Alternatives:**
- `simple-icons` for tech logos (preferred for tech stack)
- Material UI Icons (`@mui/icons-material`) for UI icons
- SVG components for custom icons

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
│   ├── layout.tsx         # Root layout, Poppins/Roboto font setup
│   ├── globals.css        # Global styles, v5 color palette
│   └── styles/
│       └── baseStyles.ts  # Reusable Tailwind style strings (CENTRALIZED)
├── components/
│   ├── StarField/         # Canvas-based twinkling stars (Phase 2)
│   ├── IPhoneProFrame/    # iPhone 15 Pro bezel component
│   ├── LiveProjectIframe/ # Lazy-loading iframe wrapper
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

## Current Implementation Status (v5.0)

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

### v5.1 Milestone (Next Iteration)
**Milestone #12:** Mobile & tablet refinements with 9 issues
- **GitHub Issues:** #454-#462
- **High Priority:** Live Project iFrame crashes on mobile (#460), SmallProjectCard icon visibility (#461)
- **Epic:** Polish Mobile & Tablet Breakpoints (#462)
- **Focus:** Responsive design fixes, accessibility improvements

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

## Known Issues (v5.0 & v5.1 Priority)

### HIGH Priority
**#460: Live Project iFrame crashes on mobile**
- iFrame component fails to render correctly on mobile viewports (<768px)
- Causes layout instability and page unavailability on small screens
- Impacts LiveProjectsSection with iPhone frames
- Status: Open - targeted for v5.1

**#461: SmallProjectCard tech icons not visible on mobile**
- Tech icons from `simple-icons` not displaying on mobile/tablet
- Icons render on desktop but fail responsively
- Affects SmallProjectCard component tech stack display
- Status: Open - targeted for v5.1

### MEDIUM Priority
**#462: Polish Mobile & Tablet Breakpoints (Epic)**
- Comprehensive responsive design refinements
- Spacing, sizing, and layout adjustments for <1024px viewports
- Accessibility improvements for touch devices
- Status: Open - broader epic encompassing multiple issues

### Design Review Findings (Jan 22)
**Overall Grade:** B (78/100)
- **Desktop:** A+ (responsive, elegant, accessible)
- **Tablet (768-1023px):** B- (spacing issues, sizing inconsistencies)
- **Mobile (<768px):** B (functional but needs polish; iframe and icon rendering issues)

**Confirmed Issues from Review:**
- iFrame mobile rendering failures in LiveProjectsSection
- Icon sizing inconsistency in SmallProjectCard at tablet+ breakpoints
- Signature (CalligraphySignature) sizing needs mobile optimization
- Text sizing and line-height improvements needed on mobile
- Touch target spacing adequate but could be optimized

**Strengths:**
- Color palette and contrast excellent across all breakpoints
- Typography hierarchy clear and readable
- Animation performance stable (StarField optimized)
- Keyboard navigation working properly

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
- **Version:** 5.0 (Night Sky Theme - Deployed)
- **Next Iteration:** v5.1 (mobile/tablet refinements)
- **See:** GitHub & Branch Strategy section for complete workflow details

### Design Philosophy (v5.0)
- **Immersive:** Night sky gradient with animated stars
- **Engaging:** Live project previews in iPhone frames
- **Elegant:** Poppins headings with Roboto body text
- **Scrollable:** Layered sections with parallax effects
- **Smooth:** Organic animations and transitions

### New Components Reference

**Phase 2 & 6 (Complete):**
- `StarField` - Canvas 2D twinkling star animation with parallax
- `IPhoneProFrame` - iPhone 15 Pro bezel with rounded corners and notch
- `LiveProjectIframe` - Lazy-loading iframe with 1px width optimization
- `LiveProjectCard` - 4-layer design card for projects (uses overlap/blur technique)
- `LiveProjectsSection` - Container for featured projects

**Recent Components (This Session):**
- `SmallProjectCard` - Compact card for GitHub projects with glass effect
- `CertificationCard` - Certification display with badge, uses `glassCardBaseStyle`
- `CalligraphySignature` - Animated signature with clip-path reveal effect
- `PrimaryButton` - Shared button component with SimpleIcon support

**All components follow:**
- Reusable styles from `/app/styles/baseStyles.ts`
- Card title pattern (h3 outside container)
- Glass effect with `glassCardBaseStyle`
- Hover animations with `hoverLiftStyle`
- Responsive design using Tailwind breakpoints

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

**Last Updated:** January 22, 2026
**Document Version:** 5.0 (Night Sky Theme - Deployed)
**Progress:** 3 of 15 phases complete; v5.1 planned

**Recent Updates (Jan 22):**
- Added Known Issues section documenting #460, #461, #462
- Added Design Review Findings with breakpoint analysis (B grade 78/100)
- Updated status: v5.0 deployed to production
- Added v5.1 Milestone #12 tracking (issues #454-#462)
- Updated GitHub & Branch Strategy to reference v5.1 and develop branch
- Documented mobile/tablet refinement priorities for next iteration
