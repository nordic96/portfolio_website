# Stephen's Portfolio Website

## Project Overview

Personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.
- **Live Site:** https://stephenghk.com
- **Dev Server:** http://localhost:3000
- **Design Version:** 4.0 (Dashboard Layout)
- **Current Focus:** 100dvh Dashboard Layout Redesign

**Quick Status:** See `.claude/context/PROJECT_STATUS.md` for current state and priorities

---

## MAJOR REDESIGN: v4.0 Dashboard Layout

The website is undergoing a major redesign from vertical scrolling sections to a **100dvh single-view dashboard layout**.

### Key Changes
- **Layout:** Vertical scroll -> 100dvh single-view grid
- **Typography:** Large text -> Compact (~50% smaller)
- **Color:** Gradient backgrounds -> Minimal white with subtle hints
- **Content:** Detailed sections -> Compact cards in grid

### Layout Structure
```
+-----------------------------------------------+
|  Logo                              i18n       |  <- Header
+-----------------------------------------------+
|    +-------------------+---------------+      |
|    |   Hero Section    | Certifications|      |  <- Row 1
|    +-------------------+---------------+      |
|    |     Projects      |     About     |      |  <- Row 2
|    +-------------------+---------------+      |
|    |       Tech Stack Post-Its        |      |  <- Row 3
+-----------------------------------------------+
|              Footer                           |
+-----------------------------------------------+
```

**Design Reference:** `docs/img/app_layout.png`
**Full Specs:** `.claude/context/DESIGN_SYSTEM.md`

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

Custom agents are defined in `.claude/agents/`. Use `/agents` command to list and manage them.

### @ui-ux-designer
**File:** `.claude/agents/ui-ux-designer.md`
**Role:** Design analysis, conceptual design, and UX recommendations

**When to use:**
- Analyzing current design and UX
- Creating new design concepts and specifications
- Reviewing implemented features
- Providing design feedback
- Accessibility audits

**Tools available:**
- Playwright for visual audits
- Sequential Thinking for design problem breakdown
- File reading for context analysis

---

### @frontend-dev
**File:** `.claude/agents/frontend-dev.md`
**Role:** Implementation of designs and features

**When to use:**
- Building components from design specs
- Refactoring existing code
- Performance optimization
- TypeScript implementation
- Tailwind styling
- Bug fixes

**MUST READ FIRST:** `.claude/skills/frontend-dev.md`
- Contains lessons learned and best practices
- Prevents repeating past mistakes
- Quick reference for CSS gotchas, patterns, and solutions

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

**Detailed workflow:** See `.claude/workflows/design-to-dev.md`

---

## Design System (v4.0 Dashboard)

### Color Palette (Minimal)
```css
/* Base - Dominant */
--color-white: #FFFFFF;
--color-text-primary: #2D2D2D;
--color-text-secondary: #6B7280;

/* Accent - Subtle Use */
--color-accent-green: #77dd87;
--color-accent-blue: #00CEC8;

/* Border */
--color-border: #E5E7EB;
```

### Typography (Compact)
| Element | Tailwind |
|---------|----------|
| Hero Name | `text-2xl lg:text-3xl font-bold` |
| Hero Headline | `text-base lg:text-lg font-light` |
| Section Title | `text-sm font-semibold uppercase` |
| Body Text | `text-sm` |
| Labels | `text-xs` |

### Layout
- **Container:** `h-dvh` (100dvh)
- **Grid:** `grid-cols-3 grid-rows-[1fr_1fr_auto]`
- **Gap:** `gap-4` (16px)
- **Max Width:** `max-w-6xl` (1200px)

### Responsive Breakpoints
- **Desktop (>=1024px):** 3-column grid, 100dvh
- **Tablet (768-1023px):** 2-column grid, 100dvh
- **Mobile (<768px):** 1-column stack, scrollable

**Complete design system:** See `.claude/context/DESIGN_SYSTEM.md`

---

## Project Goals

- **Redesign to dashboard layout** (current focus)
- Showcase projects and skills at a glance
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
│   ├── [locale]/page.tsx  # Homepage with dashboard grid
│   ├── layout.tsx         # Root layout, Inter font setup
│   └── globals.css        # Global styles, color palette
├── components/
│   ├── DashboardLayout/   # NEW - v4.0 layout container
│   ├── HeroCard/          # NEW - Compact hero cell
│   ├── CertificationsCard/# NEW
│   ├── ProjectsCard/      # NEW - Thumbnail grid
│   ├── AboutCard/         # NEW - Brief bio
│   └── TechStackBar/      # NEW - Horizontal post-its
├── public/
│   └── assets/            # Static assets (images, SVGs)
├── docs/
│   └── img/app_layout.png # Design sketch reference
└── .claude/
    ├── CLAUDE.md          # This file
    ├── context/           # Context documents
    │   ├── PROJECT_STATUS.md
    │   ├── DESIGN_SYSTEM.md
    │   └── archive/       # v1.0-v3.0 documentation
    └── workflows/         # Workflow guides
```

---

## Current Implementation Status

### v4.0 Dashboard Layout - TO BUILD

**Priority 1: Layout Foundation** (NOT STARTED)
- 100dvh container structure
- CSS Grid layout
- Base GridCard component
- Header with logo and i18n
- Footer with social links

**Priority 2: Grid Cells** (NOT STARTED)
- Hero card (compact profile + name)
- Certifications card
- Projects card (thumbnails)
- About card (brief bio)
- Tech Stack bar (horizontal post-its)

**Priority 3: Polish** (NOT STARTED)
- Subtle center gradient
- Hover interactions
- Content population

### v3.0 Features (ARCHIVED)
Previous implementations archived to `.claude/context/archive/`:
- Hero Section with orbital tech logos
- Featured Projects bento grid
- About Section with timeline

---

## Using This Project

### For Design Analysis/Planning
```
@ui-ux-designer Please analyze [feature/section] and provide
recommendations using Playwright screenshots
```

### For Implementation
```
@frontend-dev Implement [feature] based on the specs in
DESIGN_SYSTEM.md
```

### For Review
```
@ui-ux-designer Review the implemented [feature] at localhost:3000
and provide feedback
```

---

## Important Context Documents

### Essential Reading (v4.0)
- **PROJECT_STATUS.md** - Current state and priorities
- **DESIGN_SYSTEM.md** - v4.0 dashboard layout specifications

### Archived (v1.0-v3.0)
- All previous specs in `context/archive/`
- Previous screenshots in `context/archive/screenshots-v3/`

### Workflow Guides
- **workflows/design-to-dev.md** - Multi-agent collaboration patterns

---

## Quick Reference

### Current Branch
`dev_#413_claude` - Dashboard layout redesign

### Design Philosophy
- **100dvh:** Everything visible at a glance
- **Minimal:** White-dominant, subtle accents
- **Compact:** Reduced typography, tight spacing
- **Grid:** Structured layout, not free-flowing

### Accessibility
- WCAG AA compliance target
- Color contrast verified
- Touch targets minimum 44x44px
- Keyboard navigation support
- `prefers-reduced-motion` respected

---

## Contact & Collaboration

**GitHub Issues:** Track work and bugs
**Branch Strategy:** Feature branches off master
**Code Review:** Required before merge to master
**Deployment:** Automatic via Vercel on merge to master

---

**Last Updated:** January 7, 2026
**Document Version:** 4.0 (Dashboard Layout)
