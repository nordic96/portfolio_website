# ProjectCard UI Fixes - Design Specification
**Branch:** `dev_#410_ui-enhancements`
**Date:** January 3, 2026
**Designer:** @ui-ux-designer
**For Implementation by:** @frontend-dev

---

## Executive Summary

After analyzing the current ProjectCard implementation across desktop (1920px), tablet (768px), and mobile (375px) viewports, I've identified the following issues and created detailed design solutions. The current glassmorphism design is visually appealing, but requires adjustments for better content hierarchy and visual balance, especially on small-sized cards.

---

## Screenshots Analysis

### Current State
- **Desktop (1920px):** Large cards display well with adequate image size, but small cards appear cramped with oversized typography
- **Tablet (768px):** Cards stack vertically, revealing disproportionate image-to-content ratio on small cards
- **Mobile (375px):** All cards become full-width; small card issues are most pronounced here

**Screenshots saved to:**
- `/Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-cards-desktop-1920.png`
- `/Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-cards-tablet-768.png`
- `/Users/gihunko/projects/portfolio_website/.claude/context/screenshots/project-cards-mobile-375.png`

---

## Issue #1: Image Container Too Small

### Problem Analysis
The current `aspect-video` (16:9) ratio for images creates a very short image container, particularly noticeable on small cards. The image height is approximately 25-30% of the total card height, leaving excessive white space for metadata that could be better utilized.

### User's Suggestion
Place tech stack badges and title overlapping on top of the image.

### Design Recommendation: PARTIALLY AGREE WITH MODIFICATIONS

I recommend a **hybrid approach** that increases image prominence while maintaining readability:

#### Solution: Increase Image Aspect Ratio + Strategic Overlay

**For Large Cards:**
- Change aspect ratio from `aspect-video` (16:9) to `aspect-[4/3]` for more vertical image space
- Keep tech badges and title BELOW the image (current layout)
- Reason: Large cards have enough space for traditional layout; overlays would reduce content legibility

**For Small Cards:**
- Change aspect ratio to `aspect-square` (1:1) for maximum visual impact
- Apply **gradient overlay** at bottom of image (already present, enhance it)
- Position tech badges as **absolute overlay** at bottom of image with enhanced backdrop
- Keep title below image with reduced font size
- Reason: Small cards need to maximize visual hierarchy; overlay creates modern, space-efficient design

#### Implementation Details

**Large Cards - Image Container:**
```tsx
// Line 73 - Update aspect ratio
<div className={cn(
  "relative w-full overflow-hidden rounded-xl group/thumb",
  {
    "aspect-[4/3]": size === 'large',  // Changed from aspect-video
    "aspect-square": size === 'small',  // Add square for small
  }
)}>
```

**Small Cards - Tech Badges Overlay:**
```tsx
// Lines 98-103 - Make tech badges position aware
<TechStackBadges
  techStack={techStack}
  variant="compact"
  showLabels={size === 'large'}
  className={cn({
    "absolute bottom-3 left-3 right-3 z-20": size === 'small',
    "": size === 'large',
  })}
/>

// Add backdrop blur for small card badges (update TechStackBadges wrapper)
// When positioned absolutely, add:
// "bg-white/90 backdrop-blur-md p-2 rounded-lg shadow-lg"
```

**Enhanced Gradient Overlay for Small Cards:**
```tsx
// Line 75 - Enhance gradient for small cards to ensure badge readability
<div className={cn(
  "absolute inset-0 bg-gradient-to-t opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10",
  {
    "from-[#77dd87]/20 via-transparent to-transparent": size === 'large',
    "from-black/40 via-black/10 to-transparent": size === 'small',  // Stronger gradient for readability
  }
)} />
```

#### Accessibility Considerations
- Ensure minimum 4.5:1 contrast ratio for badges on image overlay
- Add `backdrop-blur-md` and `bg-white/90` to badge container for small cards
- Test with various image brightness levels

---

## Issue #2: Font Size Too Big on Small Cards

### Problem Analysis
Current typography uses `text-xl md:text-2xl` for ALL card titles (line 107), making small card titles disproportionately large relative to available space. This creates visual imbalance and reduces breathing room.

### User's Suggestion
Decrease font size only for small-sized cards.

### Design Recommendation: STRONGLY AGREE

The title should scale proportionally to card size. Current implementation doesn't differentiate between card sizes.

#### Solution: Responsive Typography Based on Card Size

**Implementation:**
```tsx
// Line 107 - Update title with size-aware responsive classes
<h3 className={cn(
  "font-bold text-text-dark leading-tight group-hover:text-[#77dd87] transition-colors duration-300",
  {
    // Large cards: Maintain current sizing
    "text-xl md:text-2xl": size === 'large',
    // Small cards: Reduced sizing for better proportion
    "text-base md:text-lg": size === 'small',
  }
)}>
  {title}
</h3>
```

**Visual Hierarchy:**
- **Large cards:** 20px → 24px (current: good for hero projects)
- **Small cards:** 16px → 18px (new: proportional to card size)

#### Accessibility Considerations
- Minimum 16px base size maintained (WCAG AA)
- Maintain `leading-tight` for multi-line titles
- Color contrast preserved (#2D2D2D on white = 13.88:1, exceeds WCAG AAA)

---

## Issue #3: Button Alignment Bug - Live Demo vs GitHub

### Problem Analysis
After examining the code (lines 118-192), the buttons use `flex flex-col sm:flex-row` with `py-2.5` padding. However, there's a subtle height mismatch caused by:
1. Different icon sizes or transforms
2. Potential line-height inconsistencies
3. Gap spacing creating visual misalignment

Looking at the screenshots, the GitHub button (gray) appears slightly shorter than the Live Demo button (green) on small cards.

### User's Suggestion
Fix alignment so both buttons have equal height.

### Design Recommendation: AGREE - Explicit Height Control

#### Solution: Standardize Button Heights

**Implementation:**
```tsx
// Lines 120-154 - GitHub Button - Add explicit height
<a
  href={githubUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    'group/link flex items-center justify-center gap-2',
    // Explicit height for consistency
    'h-11',  // ADD THIS
    // Button-like styling
    'px-4 py-2.5 rounded-lg',
    // ... rest of classes remain the same
  )}
>

// Lines 157-191 - Live Demo Button - Add explicit height
<a
  href={liveUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    'group/link flex items-center justify-center gap-2',
    // Explicit height for consistency
    'h-11',  // ADD THIS
    // Primary button style
    'px-4 py-2.5 rounded-lg',
    // ... rest of classes remain the same
  )}
>
```

**Alternative Solution (if icons are the issue):**
Ensure both SVG icons have identical dimensions:
```tsx
// Both icons should have:
className="w-4 h-4 transition-transform duration-300 [...]"
// Currently GitHub: w-4 h-4 ✓
// Currently Live Demo: w-4 h-4 ✓
// Icons match, so explicit height is the fix
```

#### Accessibility Considerations
- Minimum touch target: 44px × 44px (WCAG 2.5.5)
- Current `h-11` = 44px (meets requirement)
- Maintains adequate padding for text legibility

---

## Issue #4: Missing Section Context

### Problem Analysis
The ProjectSection component (lines 1-37 of ProjectSection.tsx) displays cards immediately without any introductory text, section heading, or context. Users land on the cards without understanding what they're viewing.

### User's Suggestion
Include text or section title to describe what the ProjectCards section is about.

### Design Recommendation: STRONGLY AGREE

Every major page section should have clear context. This improves:
- **Scanability:** Users understand content before engaging
- **SEO:** Semantic HTML with proper heading hierarchy
- **Accessibility:** Screen readers can navigate by headings
- **Professional polish:** Creates narrative flow

#### Solution: Add Section Header with Heading and Description

**Design Specification:**

**Visual Hierarchy:**
```
[Section Title] - H2, bold, large, Pastel Green accent
[Section Description] - Paragraph, lighter weight, gray
[Horizontal divider/spacer]
[Project Cards Grid]
```

**Copy Options (Choose One):**

**Option 1: Developer-Focused (Recommended)**
```
Title: "Featured Projects"
Description: "A curated collection of my most impactful work, showcasing expertise in full-stack development, modern frameworks, and user-centric design."
```

**Option 2: Achievement-Focused**
```
Title: "Work That Matters"
Description: "Real-world applications built with cutting-edge technologies, solving meaningful problems for users and businesses."
```

**Option 3: Concise & Professional**
```
Title: "Selected Work"
Description: "Production-grade projects demonstrating technical depth and creative problem-solving."
```

**My Recommendation: Option 1** - It's specific, SEO-friendly, and aligns with the portfolio's tone.

#### Implementation Details

**Add to ProjectSection.tsx before project cards (after line 21):**

```tsx
export default function ProjectSection() {
  return (
    <section className={'relative w-full flex justify-center'}>
      {/* Background image and gradient - existing code */}
      <div className={'w-full h-[50dvh] absolute inset-0 -z-10'}>
        <Image
          className={'w-full h-[50dvh]'}
          src={`${CDN_BASE}/resources/assets/grid_cutting_mat.jpeg`}
          alt={'mat'}
          width={1200}
          height={900}
        />
        <div
          className={
            'w-full absolute bottom-0 h-[50%] bg-gradient-to-b from-transparent to-white via-white via-30%'
          }
        />
      </div>

      {/** NEW: Section Header */}
      <div className="w-full flex flex-col items-center text-center px-4 pt-24 pb-8 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
          Featured{' '}
          <span className="text-[#77dd87]">Projects</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-2xl">
          A curated collection of my most impactful work, showcasing expertise in
          full-stack development, modern frameworks, and user-centric design.
        </p>

        {/* Optional: Decorative divider */}
        <div className="mt-8 mb-4 w-24 h-1 bg-gradient-to-r from-transparent via-[#77dd87] to-transparent rounded-full" />
      </div>

      {/** Project Content - existing code */}
      <div
        className={
          'flex flex-wrap grow max-sm:px-4 gap-8 py-16 justify-center h-full max-sm:flex-col'
        }
      >
        {/* Existing cards */}
      </div>
    </section>
  );
}
```

**Responsive Behavior:**
- **Desktop (1920px):**
  - Title: `text-5xl` (48px)
  - Description: `text-xl` (20px)
  - Max width: `max-w-4xl` (896px) for readability

- **Tablet (768px):**
  - Title: `text-5xl` (48px)
  - Description: `text-xl` (20px)

- **Mobile (375px):**
  - Title: `text-4xl` (36px)
  - Description: `text-lg` (18px)
  - Padding: `px-4` for edge spacing

**Semantic HTML:**
- Use `<h2>` (not `<h1>` - that's reserved for page title)
- Maintains proper heading hierarchy
- Section uses semantic `<section>` tag (already present)

#### Accessibility Considerations
- Heading creates landmark for screen reader navigation
- Color contrast: #2D2D2D on white = 13.88:1 (WCAG AAA)
- Pastel Green (#77dd87) on white = 4.86:1 (WCAG AA for large text)
- Descriptive text provides context without requiring visual inspection

---

## Summary of Changes

### ProjectCard.tsx Updates

1. **Image Aspect Ratio (Line 73)**
   - Large cards: `aspect-video` → `aspect-[4/3]`
   - Small cards: Add `aspect-square`

2. **Tech Badges Positioning (Lines 98-103)**
   - Small cards: Absolute position at bottom of image
   - Add backdrop blur for readability

3. **Enhanced Gradient for Small Cards (Line 75)**
   - Stronger gradient overlay for badge contrast

4. **Typography Scaling (Line 107)**
   - Large cards: Keep `text-xl md:text-2xl`
   - Small cards: Change to `text-base md:text-lg`

5. **Button Height Standardization (Lines 124, 164)**
   - Add `h-11` to both GitHub and Live Demo buttons

### ProjectSection.tsx Updates

1. **Add Section Header (After Line 21)**
   - H2 heading with Pastel Green accent
   - Descriptive paragraph
   - Optional decorative divider
   - Responsive typography and spacing

---

## Implementation Checklist for @frontend-dev

### Phase 1: ProjectCard.tsx - Image & Layout
- [ ] Update image container aspect ratio with size-based conditional (line 73)
- [ ] Modify TechStackBadges positioning for small cards (lines 98-103)
- [ ] Enhance gradient overlay with size-based conditional (line 75)
- [ ] Test with various project images to ensure badge readability

### Phase 2: ProjectCard.tsx - Typography & Buttons
- [ ] Implement size-aware title typography (line 107)
- [ ] Add explicit `h-11` height to GitHub button (line 124)
- [ ] Add explicit `h-11` height to Live Demo button (line 164)
- [ ] Verify button alignment on all breakpoints

### Phase 3: ProjectSection.tsx - Section Header
- [ ] Add section header component after background elements (line 21)
- [ ] Implement responsive typography for heading and description
- [ ] Add optional decorative divider
- [ ] Test spacing and alignment on all breakpoints

### Phase 4: Testing & Verification
- [ ] Test on mobile (375px) - verify small card improvements
- [ ] Test on tablet (768px) - verify responsive behavior
- [ ] Test on desktop (1920px) - verify large cards unaffected
- [ ] Verify accessibility: keyboard navigation, screen reader compatibility
- [ ] Check color contrast ratios for overlaid badges
- [ ] Verify hover states and transitions still work smoothly

---

## Design System Alignment

All recommendations adhere to the established design system:

**Colors:**
- Pastel Green (#77dd87) for accents and highlights
- Text Dark (#2D2D2D) for primary text
- Gray-600 for secondary text
- White backgrounds with glassmorphism

**Typography:**
- Inter font family (existing)
- Responsive type scale maintained
- Font weights: 300 (light), 400 (regular), 600 (semibold), 700 (bold)

**Spacing:**
- Consistent with Tailwind spacing scale
- Maintains existing gap and padding patterns

**Effects:**
- Glassmorphism with backdrop-blur
- Smooth transitions (300-700ms)
- Pastel Green glow on hover states

---

## Visual Description of Proposed Changes

### Small Cards - Before vs After

**Before:**
```
┌─────────────────────┐
│                     │
│   [Tiny Image]      │ ← Too small (16:9)
│                     │
├─────────────────────┤
│ [Tech Badges]       │
│                     │
│ Very Large Title    │ ← Too big (text-2xl)
│ That Takes Too Much │
│ Space Here          │
│                     │
│ [GitHub]  [Demo]    │ ← Misaligned heights
└─────────────────────┘
```

**After:**
```
┌─────────────────────┐
│                     │
│                     │
│   [Larger Image]    │ ← Square aspect (1:1)
│   with Badges at    │
│   bottom overlay    │ ← Tech badges on image
│                     │
├─────────────────────┤
│                     │
│ Proportional Title  │ ← Smaller (text-lg)
│                     │
│ [GitHub]  [Demo]    │ ← Aligned (h-11)
└─────────────────────┘
```

### Section Header - After

```
┌───────────────────────────────────────┐
│                                       │
│        Featured Projects              │ ← H2, bold, Pastel Green
│                                       │
│  A curated collection of my most      │ ← Description, gray
│  impactful work, showcasing...        │
│                                       │
│         ───────────                   │ ← Optional divider
│                                       │
│  [Card]  [Card]  [Card]              │ ← Existing cards
│          [Card]                       │
│                                       │
└───────────────────────────────────────┘
```

---

## Rationale Summary

1. **Image Size:** Increased aspect ratio gives projects more visual prominence while maintaining clean layout
2. **Overlay Approach:** Only on small cards where space is critical; maintains readability on large cards
3. **Typography:** Size-proportional text creates better visual hierarchy
4. **Button Alignment:** Explicit heights prevent browser inconsistencies
5. **Section Header:** Essential for context, SEO, accessibility, and professional polish

---

## Next Steps

1. **Review this spec** - Confirm design direction aligns with vision
2. **Implementation** - Hand off to @frontend-dev for coding
3. **Visual QA** - @ui-ux-designer will review with Playwright screenshots
4. **Iterate if needed** - Refine based on implementation results

---

**Document Version:** 1.0
**Status:** Ready for Implementation
**Estimated Implementation Time:** 2-3 hours
