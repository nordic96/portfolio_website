# Implementation Priorities - Updated January 1, 2026

**Status:** User confirmed preferences - Ready for implementation
**Assigned to:** @frontend-dev

---

## User Confirmed Priorities (Option C)

### 1. Tech Stack Logos (IMPLEMENT FIRST) 🎯

**User Specifications:**
- **Logos:** React, Next.js, TypeScript, JavaScript, GitHub, Tailwind CSS, AWS, Docker, Zustand, Jotai, ESLint, Jest, Cypress (13 total)
- **Source:** Simple Icons (MIT licensed)
- **Layout:** Scattered around profile photo in orbital/circular pattern
- **Angles:** Random rotations (-25° to +25°) for organic feel
- **Reference:** `.claude/context/design_reference/hero_reference.jpeg` (film boxes aesthetic)
- **Full Spec:** `.claude/context/tech-stack-logos-spec.md`

**Key Implementation Details:**
- Position logos in ring around profile photo (radius: 180-280px)
- Each logo rotated at different angle
- Grayscale (25% opacity) with color on hover
- Subtle floating animation
- Hidden on mobile (optional: show simplified version)

**Estimated Effort:** 2-3 days
**Priority:** HIGH - Implement first

---

### 2. Highlighter Marker Animation (IMPLEMENT SECOND) 🎯

**User Specifications:**
- **Text to highlight:** "exceptional" in headline
- **Marker asset:** `/public/assets/marker-tip.svg` ✅ Already provided
- **Mobile behavior:** Full animation (same as desktop)
- **Full Spec:** `.claude/context/highlighter-animation-spec.md`

**Key Implementation Details:**
- Marker sweeps left-to-right across "exceptional" (600ms)
- 800ms delay after page load
- Pastel Green (#77dd87) highlight at 35% opacity
- Highlight remains permanent after animation
- Respect prefers-reduced-motion

**Estimated Effort:** 1-2 days
**Priority:** HIGH - Implement second

---

### 3. Profile Photo (IMPLEMENT THIRD) ⏭️

**Current Status:** Placeholder circle in place
**Next Steps:**
- Add actual profile photo
- Implement Next.js Image component
- Add loading optimization
- Test responsive sizing

**Estimated Effort:** 0.5-1 day
**Priority:** MEDIUM - Implement third

---

## Additional Context

### Tech Stack Logos - Design Reference

The user provided a reference image showing film boxes scattered at various angles around centered text. Apply this aesthetic:
- Random rotations (like tilted film boxes)
- Organic scatter (not rigid grid)
- Different distances from center
- Playful yet professional

**Visual concept:**
```
        [ESLint]
    [Jotai]        [React]

  [Zustand]  [PROFILE]  [Next.js]
               [PHOTO]
    [AWS]               [TypeScript]

  [Docker]         [GitHub]
      [Tailwind]
```

### Marker Asset Verification ✅

User provided marker-tip.svg:
- Location: `/public/assets/marker-tip.svg`
- Format: SVG (perfect!)
- Color: Pastel Green (#77dd87)
- Style: Chisel tip highlighter
- Quality: Excellent, ready to use

---

## Current Branch & Status

**Branch:** dev_381
**Current Version:** v1.2 (Pastel Green update) ✅ Complete
**Dev Server:** localhost:3000 (running)
**Last Commit:** 818ec1d - "feat: update hero section to Pastel Green color scheme"

---

## Implementation Approach for @frontend-dev

### Phase 1: Tech Stack Logos (Day 1-2)

**Tasks:**
1. Install simple-icons package: `npm install simple-icons`
2. Create `TechStackLogos.tsx` component
3. Import 13 icon SVGs from simple-icons
4. Position logos in circular pattern around profile photo
5. Apply random rotations to each logo
6. Add grayscale filter and hover effects
7. Implement subtle floating animation
8. Test across breakpoints (hide on mobile)
9. Commit and push changes

**Acceptance Criteria:**
- [ ] All 13 logos visible on desktop
- [ ] Scattered around profile photo with random angles
- [ ] Grayscale appearance, color on hover
- [ ] Subtle floating animation
- [ ] No layout shift or overlap with content
- [ ] Hidden on mobile
- [ ] 60fps performance

---

### Phase 2: Highlighter Animation (Day 3-4)

**Tasks:**
1. Create `HighlightedText.tsx` component
2. Wrap "exceptional" in headline with component
3. Implement CSS highlight sweep animation
4. Add marker tip image from `/public/assets/marker-tip.svg`
5. Sync marker movement with highlight expansion
6. Add fade out animation for marker
7. Implement prefers-reduced-motion support
8. Test on desktop, tablet, mobile (full animation on all)
9. Commit and push changes

**Acceptance Criteria:**
- [ ] Highlight sweeps across "exceptional" smoothly
- [ ] Marker tip moves with highlight
- [ ] 800ms delay before animation starts
- [ ] Animation completes in ~1.5s total
- [ ] Highlight remains after animation
- [ ] Works on mobile with full animation
- [ ] Respects prefers-reduced-motion
- [ ] 60fps performance

---

### Phase 3: Profile Photo (Day 5)

**Tasks:**
1. Obtain profile photo from user (if not already provided)
2. Optimize image (WebP format, multiple sizes)
3. Replace placeholder with Next.js Image component
4. Set priority loading (above-fold)
5. Test responsive sizing
6. Commit and push changes

**Acceptance Criteria:**
- [ ] Real photo displays correctly
- [ ] Next.js Image optimization working
- [ ] Responsive sizing (w-32, w-40, w-52)
- [ ] Pastel Green border maintained
- [ ] Fast loading (priority flag)
- [ ] No layout shift

---

## Testing Checklist (After All Features)

### Visual Testing
- [ ] Tech logos positioned correctly around photo
- [ ] Logos have random rotations
- [ ] Highlighter animation smooth and natural
- [ ] Profile photo displays correctly
- [ ] No overlapping elements
- [ ] Consistent spacing

### Responsive Testing
- [ ] Desktop (1920×1080): Full experience
- [ ] Laptop (1440×900): Full experience
- [ ] Tablet (768×1024): Adjusted or hidden logos
- [ ] Mobile (375×667): Logos hidden, highlighter works

### Performance Testing
- [ ] Lighthouse Performance Score ≥90
- [ ] All animations at 60fps
- [ ] No layout shift (CLS <0.1)
- [ ] Fast load times (LCP <2.5s)

### Accessibility Testing
- [ ] Screen readers work correctly
- [ ] Keyboard navigation unaffected
- [ ] prefers-reduced-motion respected
- [ ] All ARIA attributes correct
- [ ] Color contrast maintained

### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Questions/Blockers

If you encounter any issues during implementation:

1. **Tech logos overlap with content:** Adjust radius or reduce logo count
2. **Animations feel too fast/slow:** Tweak duration values
3. **Profile photo not available:** Use placeholder temporarily, continue with other work
4. **Performance issues:** Reduce animation complexity or number of logos
5. **Simple-icons package issues:** Use alternative SVG source or CDN

**Contact @ui-ux-designer for design decisions, user for clarifications.**

---

## Post-Implementation

After completing all three features:

1. **Capture new screenshots** for all viewports
2. **Push to dev_381 branch**
3. **Update documentation** with any implementation notes
4. **Request review** from @ui-ux-designer
5. **Notify user** that features are complete

---

**Document Version:** 1.0
**Last Updated:** January 1, 2026
**Status:** Ready for @frontend-dev implementation
**Estimated Total Time:** 4-5 days for all three features
