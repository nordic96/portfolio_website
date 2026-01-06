# Stephen's Portfolio Website

## Project Overview

Personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.
- **Live Site:** https://stephenghk.com
- **Dev Server:** http://localhost:3000
- **Current Focus:** Hero Section - Highlighter Animation (Priority 1)

**Quick Status:** See `.claude/context/PROJECT_STATUS.md` for current state and priorities

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

## Design System

### Color Palette (Multi-Color Theme v3.0)
```css
/* Primary */
--pastel-green: #77dd87;
--pastel-green-hover: #5fd070;

/* Secondary Accents */
--blue-green: #00CEC8;      /* Utilities category, Hero gradient */
--pastel-pink: #EF80EF;     /* CI/CD category */
--pastel-brown: #EFB880;    /* Reserved for future */

/* Base Colors */
--white: #FFFFFF;
--dark-gray: #333333;
--text-dark: #2D2D2D;
```

### Usage Guidelines
- **Pastel Green:** Primary highlights, accents, CTAs, profile borders, Frontend tech stack
- **Blue-Green:** Hero gradient top, Utilities tech stack category
- **Pastel Pink:** CI/CD & Others tech stack category
- **White:** Backgrounds, clean spaces
- **Dark Gray (#2D2D2D):** Body text on white backgrounds
- **Header/Footer:** #333 background with white text

### Tech Stack Category Colors
| Category | Color | Technologies |
|----------|-------|--------------|
| Frontend | pastel-green | React, Next.js, TypeScript, JavaScript, HTML5 |
| Utilities | blue-green | Tailwind, SASS, Storybook, ESLint, Jest, Cypress |
| CI/CD & Others | pastel-pink | GitHub, Docker, Jenkins, Bitbucket |

### Typography
- **Font Family:** Inter (weights: 300, 400, 600, 700)
- **Loading Strategy:** `display: 'swap'` for performance
- **Type Scale:** Responsive sizing from text-xl to text-7xl

**Complete design system:** See `.claude/context/DESIGN_SYSTEM.md`

---

## Project Goals

- ✅ Showcase projects and skills effectively
- ✅ Create memorable, professional first impression
- ✅ Ensure exceptional mobile experience
- ⏳ Optimize for performance and SEO
- ⏳ Maintain accessibility standards (WCAG AA minimum)

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
│   ├── page.tsx        # Homepage with HeroSection
│   ├── layout.tsx      # Root layout, Inter font setup
│   └── globals.css     # Global styles, color palette
├── components/
│   └── HeroSection/
│       ├── HeroSection.tsx
│       ├── TechStackLogos.tsx
│       └── index.ts
├── public/
│   └── assets/         # Static assets (images, SVGs)
└── .claude/
    ├── CLAUDE.md       # This file
    ├── context/        # Context documents
    └── workflows/      # Workflow guides
```

---

## Current Implementation Status

### ✅ Completed
- **Hero Section v3.0:** Gradient background (blue-green → pastel-green → white)
- **Tech Stack Post-Its:** 15 category color-coded post-it cards in orbital pattern
- **Profile Photo Placeholder:** Pastel Green border, responsive sizing
- **Typography Hierarchy:** Name, headline, subheadline
- **Featured Projects Section:** Bento grid with glassmorphism cards
- **About Section:** Timeline, pull quote, opening/closing statements
- **Responsive Design:** All breakpoints working (mobile, tablet, desktop)

### ⏭️ Next Up
**Priority 1:** Contact/CTA Section
- Contact form with validation
- Social links (LinkedIn, GitHub, Email)
- Smooth scroll from hero CTA buttons

### 🔜 Future
- **Priority 2:** Full Project Archive Page
- **Priority 3:** Profile Photo replacement
- **Priority 4:** Highlighter Animation (polish)
- **Priority 5:** My Journey Year Circles Gradient

**Full priorities:** See `.claude/context/PROJECT_STATUS.md`

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
[spec-document.md]
```

### For Review
```
@ui-ux-designer Review the implemented [feature] at localhost:3000
and provide feedback
```

---

## Important Context Documents

### Essential Reading
- **PROJECT_STATUS.md** - Current state snapshot (read this first!)
- **DESIGN_SYSTEM.md** - Complete design specifications
- **IMPLEMENTATION_PRIORITIES.md** - Task priority order

### Feature Specifications
- **highlighter-animation-spec.md** - Next priority feature
- **hero-section-review-v1.3.md** - Latest implementation review

### Workflow Guides
- **workflows/design-to-dev.md** - Multi-agent collaboration patterns

---

## Quick Reference

### Current Branch
`dev_#413_claude` - About section and design updates

### Recent Major Commits
- Hero Section v3.0 with gradient background
- Tech Stack post-its with category colors
- About Section with timeline and journey
- Color palette updated to multi-color theme v3.0

### Accessibility
- WCAG AA compliance target
- Color contrast ratios verified
- Screen reader compatibility
- Keyboard navigation support
- `prefers-reduced-motion` respected

---

## Contact & Collaboration

**GitHub Issues:** Track work and bugs
**Branch Strategy:** Feature branches off master
**Code Review:** Required before merge to master
**Deployment:** Automatic via Vercel on merge to master

---

**Last Updated:** January 6, 2026
**Document Version:** 3.0 (Multi-Color Theme)
