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

### Color Palette (Pastel Green Theme)
```css
/* Primary */
--pastel-green: #77dd87;
--pastel-green-hover: #5fd070;

/* Secondary */
--blue-dianne: #1f5b5b;
--copper: #b68b3b;

/* Base Colors */
--white: #FFFFFF;
--dark-gray: #333333;
--text-dark: #2D2D2D;
```

### Usage Guidelines
- **Pastel Green:** Primary highlights, accents, CTAs, profile borders
- **White:** Backgrounds, clean spaces
- **Dark Gray (#2D2D2D):** Body text on white backgrounds
- **Blue Dianne:** Secondary depth color (future use)
- **Copper:** Accent color (future use)
- **Header/Footer:** #333 background with white text

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
- **Hero Section Base:** White background, Pastel Green accents
- **Profile Photo Placeholder:** Pastel Green border, responsive sizing
- **Typography Hierarchy:** Name, headline, subheadline
- **Tech Stack Logos:** 15 logos in orbital pattern with hover effects
- **Responsive Design:** All breakpoints working (mobile, tablet, desktop)

### ⏭️ Next Up
**Priority 1:** Highlighter Animation
- Marker tip sweeps across "exceptional" in headline
- Pastel Green highlight effect
- Spec: `highlighter-animation-spec.md`
- Asset provided: `/public/assets/marker-tip.svg`

### 🔜 Future
- **Priority 2:** Profile Photo replacement
- **Priority 3:** CTA Buttons ("View My Work", "Let's Connect")
- **Priority 4:** Header & Footer (#333 background)

**Full priorities:** See `.claude/context/IMPLEMENTATION_PRIORITIES.md`

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
`dev_381` - Hero section implementation

### Recent Major Commits
- `5d82da6` - Hero Section base structure (#381)
- Color scheme updated to Pastel Green (#77dd87)
- Tech stack logos implemented
- All responsive breakpoints tested

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

**Last Updated:** January 2, 2026
**Document Version:** 2.0 (Optimized)
