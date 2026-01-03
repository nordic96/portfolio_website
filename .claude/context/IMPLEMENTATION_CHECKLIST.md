# ProjectCard Enhancement - Implementation Checklist

**Quick Action Guide for @frontend-dev**

---

## Pre-Implementation

- [x] Screenshots captured at all breakpoints (mobile, tablet, desktop)
- [x] Current design analyzed and weaknesses identified
- [x] Enhancement specifications written with exact Tailwind classes
- [x] Accessibility requirements documented
- [ ] Review all specification documents
- [ ] Understand design goals and visual improvements
- [ ] Set up development environment (npm run dev)

---

## Phase 1: Implementation Steps

### Step 1: Update ProjectCard Container (5 min)
**File:** `/Users/gihunko/projects/portfolio_website/components/ProjectCard/ProjectCard.tsx`
**Lines:** 42-53

- [ ] Change `<div>` to `<article>`
- [ ] Add `group` class for hover effects
- [ ] Replace `bg-white` with `bg-white/95 backdrop-blur-sm`
- [ ] Replace `border-2 border-[#333]` with `border border-gray-200/60`
- [ ] Change `rounded-xl` to `rounded-2xl`
- [ ] Update shadow with multi-layer shadow (see spec)
- [ ] Change `duration-300` to `duration-500`
- [ ] Add `hover:scale-[1.02]` and `hover:border-[#77dd87]/30`
- [ ] Add `focus-within:ring-2 focus-within:ring-[#77dd87] focus-within:ring-offset-2`
- [ ] Add `aria-label={`Project: ${title}`}`
- [ ] Change `p-4` to `p-6` (desktop padding)

**Verify:** Card has glassmorphism effect and soft border

---

### Step 2: Enhance Thumbnail (10 min)
**File:** Same file
**Lines:** 55-63

- [ ] Remove `border-2 border-[#2D2D2D]`
- [ ] Add `group/thumb` class to container
- [ ] Add gradient overlay div (Pastel Green tint on hover)
- [ ] Add shine effect div (diagonal sweep animation)
- [ ] Add Featured badge conditional (if project.featured)
- [ ] Add `<span className="sr-only">Featured project - </span>` to badge
- [ ] Update Image className to include `group-hover:scale-110`
- [ ] Change transition to `duration-700 ease-out`

**Verify:** Thumbnail zooms and shows shine effect on card hover

---

### Step 3: Improve Typography Hierarchy (3 min)
**File:** Same file
**Lines:** 73-80

- [ ] Change gap from `gap-2` to `gap-3`
- [ ] Update title to `text-xl md:text-2xl`
- [ ] Add `leading-tight` to title
- [ ] Add `group-hover:text-[#77dd87] transition-colors duration-300` to title
- [ ] Change description from `text-sm` to `text-base`
- [ ] Add `font-light` to description
- [ ] Change `line-clamp-2` to `line-clamp-3`

**Verify:** Title is larger and turns Pastel Green on hover

---

### Step 4: Redesign Links Section (15 min)
**File:** Same file
**Lines:** 83-112

- [ ] Remove `border-t border-gray-200`
- [ ] Change container to `flex-col sm:flex-row`
- [ ] Update gap to `gap-2 sm:gap-3`
- [ ] Change `pt-2` to `pt-4`
- [ ] Add `mt-auto` to push links to bottom

#### GitHub Link
- [ ] Add `group/link` class
- [ ] Add button styling: `px-4 py-2.5 rounded-lg`
- [ ] Add `bg-gray-50 border border-gray-200`
- [ ] Add hover state: `hover:bg-[#77dd87] hover:border-[#77dd87] hover:text-white`
- [ ] Add `hover:shadow-md hover:shadow-[#77dd87]/20`
- [ ] Add `hover:-translate-y-0.5`
- [ ] Add focus state: `focus:outline-none focus:ring-2 focus:ring-[#77dd87] focus:ring-offset-2`
- [ ] Add responsive: `w-full sm:w-auto justify-center`
- [ ] Update icon to `group-hover/link:scale-110`
- [ ] Change icon size to `w-4 h-4`

#### Live Demo Link
- [ ] Add `group/link` class
- [ ] Add button styling: `px-4 py-2.5 rounded-lg`
- [ ] Add `bg-[#77dd87] border border-[#77dd87] text-white`
- [ ] Add hover state: `hover:bg-[#5fd070] hover:scale-105`
- [ ] Add `hover:shadow-lg hover:shadow-[#77dd87]/30`
- [ ] Add `hover:-translate-y-0.5`
- [ ] Add focus state: `focus:outline-none focus:ring-2 focus:ring-[#77dd87] focus:ring-offset-2`
- [ ] Add responsive: `w-full sm:w-auto justify-center`
- [ ] Update icon to `group-hover/link:rotate-12`
- [ ] Change icon size to `w-4 h-4`

**Verify:** Links look like buttons and animate on hover

---

### Step 5: Update Tech Stack Badges (10 min)
**File:** `/Users/gihunko/projects/portfolio_website/components/shared/TechStackBadges.tsx`
**Lines:** 79-109

- [ ] Add `group/badge` class
- [ ] Change to `rounded-full`
- [ ] Replace background with `bg-gradient-to-r from-[#77dd87]/10 to-[#77dd87]/5`
- [ ] Replace `border-l-4 border-l-[#77dd87]` with `border border-[#77dd87]/20`
- [ ] Add `shadow-sm`
- [ ] Add hover: `hover:shadow-md hover:border-[#77dd87]/40`
- [ ] Add hover background: `hover:bg-gradient-to-r hover:from-[#77dd87]/15 hover:to-[#77dd87]/10`
- [ ] Add `style={{ color: `#${techData.icon.hex}` }}` to icon div
- [ ] Add `group-hover/badge:brightness-110` to icon
- [ ] Add `group-hover/badge:text-[#77dd87]` to text
- [ ] Change text size from `text-[10px]` to `text-[11px]` (compact variant)
- [ ] Change gap from `gap-2` to `gap-1.5`

**Verify:** Badges are pill-shaped with gradient background and brand icon colors

---

## Testing Phase

### Visual Testing (10 min)
Open http://localhost:3000 and verify:

- [ ] Cards have subtle glassmorphism effect (slight transparency)
- [ ] Cards have soft gray borders (not harsh black)
- [ ] Hover creates smooth lift, scale, and Pastel Green glow
- [ ] Thumbnails zoom to 110% on card hover
- [ ] Shine effect sweeps across thumbnail on hover
- [ ] Featured badge appears (if applicable)
- [ ] Title turns Pastel Green on card hover
- [ ] Tech badges are pill-shaped with gradient
- [ ] Tech badge icons show in brand colors (not black)
- [ ] Links are styled as buttons
- [ ] GitHub button: gray → Pastel Green on hover
- [ ] Live Demo button: Pastel Green background
- [ ] Icons animate on hover (GitHub scales, Live Demo rotates)

---

### Responsive Testing (15 min)

#### Mobile (375px)
- [ ] Open DevTools, set viewport to 375x812
- [ ] Cards display correctly with padding
- [ ] Tech badges wrap nicely
- [ ] Links stack vertically
- [ ] Buttons are full-width
- [ ] All hover effects work on tap (mobile)
- [ ] No horizontal scroll

#### Tablet (768px)
- [ ] Set viewport to 768x1024
- [ ] Layout adapts to tablet size
- [ ] Links are side-by-side (not stacked)
- [ ] Cards maintain proper spacing
- [ ] Hover effects work smoothly

#### Desktop (1920px)
- [ ] Set viewport to 1920x1080
- [ ] Full layout displays correctly
- [ ] All hover effects work perfectly
- [ ] Shadows and glows are visible
- [ ] Typography scales appropriately
- [ ] No layout issues or overflow

---

### Accessibility Testing (10 min)

#### Keyboard Navigation
- [ ] Press Tab key to navigate
- [ ] Cards show focus ring (Pastel Green, ring-2)
- [ ] Links show focus indicators
- [ ] Tab order is logical (top to bottom)
- [ ] Enter key activates links
- [ ] No keyboard traps

#### Screen Reader (if available)
- [ ] Card announces: "Project: [Title]"
- [ ] Featured badge announces correctly
- [ ] Links have descriptive labels
- [ ] No missing alt text or labels

#### Color Contrast
- [ ] White text on Pastel Green buttons: Check contrast ratio (should be 4.5:1+)
- [ ] Gray text on white: Check contrast (should be 7.2:1+)
- [ ] All text meets WCAG AA standards

#### Touch Targets
- [ ] All buttons are minimum 44x44px
- [ ] Adequate spacing between touch elements
- [ ] Easy to tap on mobile devices

---

### Cross-Browser Testing (10 min)

- [ ] Chrome/Edge: All features work
- [ ] Firefox: Glassmorphism displays correctly
- [ ] Safari: backdrop-blur works
- [ ] Mobile Safari (iOS): Touch interactions work
- [ ] Mobile Chrome (Android): All effects work

**Note:** All modern browsers support glassmorphism (backdrop-filter)

---

### Performance Testing (5 min)

- [ ] Hover animations are smooth (60fps)
- [ ] No jank or stuttering
- [ ] No layout shift on hover
- [ ] Images load efficiently
- [ ] Transitions feel natural (not too fast or slow)

**Check DevTools Performance tab:**
- [ ] GPU acceleration active (check transform animations)
- [ ] No excessive repaints
- [ ] Memory usage is reasonable

---

## Screenshot Comparison

### Capture New Screenshots
After implementation, capture screenshots at same breakpoints:

```bash
# Mobile
npx playwright screenshot --viewport-size 375,812 --full-page http://localhost:3000 /Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-section-mobile-375px-AFTER.png

# Tablet
npx playwright screenshot --viewport-size 768,1024 --full-page http://localhost:3000 /Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-section-tablet-768px-AFTER.png

# Desktop
npx playwright screenshot --viewport-size 1920,1080 --full-page http://localhost:3000 /Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-section-desktop-1920px-AFTER.png
```

- [ ] Mobile screenshot captured (AFTER)
- [ ] Tablet screenshot captured (AFTER)
- [ ] Desktop screenshot captured (AFTER)
- [ ] Compare BEFORE vs AFTER side-by-side
- [ ] Verify all enhancements are visible

---

## Bug Fixes (if needed)

### Common Issues

**Issue: Glassmorphism not visible**
- [ ] Check parent element has background
- [ ] Verify backdrop-blur-sm is applied
- [ ] Check browser supports backdrop-filter

**Issue: Hover glow not showing**
- [ ] Verify shadow syntax is correct
- [ ] Check rgba values are accurate
- [ ] Ensure hover class is applied

**Issue: Links not stacking on mobile**
- [ ] Verify flex-col sm:flex-row on container
- [ ] Check w-full sm:w-auto on buttons
- [ ] Ensure breakpoint is correct (sm: 640px)

**Issue: Icons not showing brand colors**
- [ ] Verify style={{ color: `#${techData.icon.hex}` }}
- [ ] Check icon hex values exist in simple-icons
- [ ] Ensure dangerouslySetInnerHTML is not being overridden

**Issue: Animations feel slow or fast**
- [ ] Adjust duration values
- [ ] Start with duration-300 and increase gradually
- [ ] Test on different devices

---

## Code Review Checklist

Before marking complete:

- [ ] No console errors in DevTools
- [ ] No console warnings
- [ ] All imports are correct
- [ ] No unused variables
- [ ] Tailwind classes are exact (no typos)
- [ ] All responsive breakpoints tested
- [ ] Accessibility attributes present
- [ ] Code is clean and well-formatted
- [ ] Comments added where helpful
- [ ] Ready for production

---

## Handoff to @ui-ux-designer

When implementation is complete:

- [ ] Comment in chat: "Phase 1 implementation complete, ready for review"
- [ ] Provide screenshot links (BEFORE vs AFTER)
- [ ] Note any deviations from spec (if any)
- [ ] List any issues encountered and how they were resolved
- [ ] Confirm all checkboxes in this document are complete

---

## Phase 1 Completion Criteria

Phase 1 is complete when ALL of these are true:

- [x] All code changes implemented exactly per spec
- [x] Visual testing passed at all breakpoints
- [x] Accessibility testing passed (WCAG AA)
- [x] Cross-browser testing passed
- [x] Performance testing passed (smooth 60fps)
- [x] Screenshots captured (BEFORE vs AFTER)
- [x] No bugs or issues remaining
- [x] @ui-ux-designer has reviewed and approved

**When all checkboxes are checked, Phase 1 is DONE! 🎉**

---

## Phase 2 Preview (Future)

After Phase 1 approval, Phase 2 will include:
- Staggered entrance animations
- Project filtering by tech stack
- Star count with animation
- Pagination/Load more
- Skeleton loading states

**For now, focus on completing Phase 1 perfectly.**

---

## Time Tracking

Estimated time breakdown:
- Step 1 (Card Container): 5 min
- Step 2 (Thumbnail): 10 min
- Step 3 (Typography): 3 min
- Step 4 (Links): 15 min
- Step 5 (Badges): 10 min
- Visual Testing: 10 min
- Responsive Testing: 15 min
- Accessibility Testing: 10 min
- Cross-Browser Testing: 10 min
- Performance Testing: 5 min
- Screenshots: 5 min
- Bug Fixes: 10-20 min (if needed)

**Total: ~2-3 hours** (as estimated in spec)

---

## Resources

### Specification Documents
- **Main Review:** `/Users/gihunko/projects/portfolio_website/.claude/context/project-section-design-review.md`
- **Implementation Spec:** `/Users/gihunko/projects/portfolio_website/.claude/context/project-card-enhancement-spec.md`
- **Visual Summary:** `/Users/gihunko/projects/portfolio_website/.claude/context/project-card-visual-summary.md`
- **Design System:** `/Users/gihunko/projects/portfolio_website/.claude/context/DESIGN_SYSTEM.md`

### Current Screenshots (BEFORE)
- Mobile: `/Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-section-mobile-375px.png`
- Tablet: `/Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-section-tablet-768px.png`
- Desktop: `/Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-section-desktop-1920px.png`

### Helpful Links
- Tailwind CSS Docs: https://tailwindcss.com/docs
- WCAG Contrast Checker: https://webaim.org/resources/contrastchecker/
- Simple Icons: https://simpleicons.org/

---

**Ready to implement? Start with Step 1! 🚀**

**Document Created:** January 3, 2026
**Status:** Ready for @frontend-dev
