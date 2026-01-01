# Highlighter Marker Animation Specification

**Feature:** Animated Highlighter Effect on Hero Headline
**Priority:** Medium
**Estimated Effort:** 1-2 days
**Dependencies:** HeroSection v1.2, User-provided marker image asset
**Proposed By:** User
**Specified By:** @ui-ux-designer
**Date:** January 1, 2026

---

## Overview

Implement a one-time animation where a highlighter marker appears and sweeps across a key word in the hero headline, leaving behind a Pastel Green (#77dd87) highlight. This adds personality, draws attention to the key value proposition, and creates a memorable first impression.

---

## Design Concept

### Visual Effect

```
Before animation (0ms):
I build exceptional web experiences
      ^^^^^^^^^^^

During animation (800-1400ms):
I build exceptional web experiences
      ═══►══════
      [marker tip moving]

After animation (1500ms+):
I build exceptional web experiences
      ═══════════
      [highlight remains]
```

**Effect Characteristics:**
- Hand-drawn, organic feel
- Subtle and professional
- Enhances readability (not distracting)
- Reinforces Pastel Green brand color
- One-time on initial page load

---

## Text Selection

### User Confirmed: "exceptional" ✅

```html
<h1>
  I build <span class="highlight">exceptional</span> web experiences
</h1>
```

**Rationale:**
- Most impactful word in headline
- Conveys quality and uniqueness
- Shorter length = cleaner animation
- Center position in sentence
- Natural emphasis point

**Alternative Options:**

**Option B: "web experiences"**
```html
I build exceptional <span class="highlight">web experiences</span>
```
- Longer animation (more dramatic)
- Emphasizes deliverable
- End-weighted emphasis

**Option C: "design & engineering"** (subheadline)
```html
that blend <span class="highlight">design & engineering</span>
```
- Emphasizes unique value prop
- More subtle (subheadline vs headline)
- Differentiates from competitors

**Recommendation:** Option A - "exceptional"

---

## Animation Timeline

### Complete Sequence (1500ms total)

```
Time    | Event                          | Visual State
--------|--------------------------------|---------------------------
0ms     | Page loads                     | Text visible, no highlight
800ms   | Marker tip appears (left)      | Tip fades in from left
        |                                |
800ms   | Highlight begins                | Background starts expanding
↓       | Marker sweeps right            | Marker moves, highlight grows
1400ms  | Marker reaches end              | Full highlight visible
        |                                |
1400ms  | Marker tip fades out            | Tip disappears right side
↓       |                                |
1500ms  | Animation complete              | Highlight remains, marker gone
        |                                |
∞       | Final state                    | Permanent highlight
```

### Detailed Timing Breakdown

| Phase | Duration | Start | End | Description |
|-------|----------|-------|-----|-------------|
| **Delay** | 800ms | 0ms | 800ms | Wait for page content to load |
| **Marker Appear** | 50ms | 800ms | 850ms | Marker tip fades in from left |
| **Sweep** | 600ms | 800ms | 1400ms | Marker moves right, highlight expands |
| **Marker Fade** | 100ms | 1400ms | 1500ms | Marker tip fades out |
| **Complete** | ∞ | 1500ms | - | Highlight remains permanently |

**Total User Perception:** ~700ms active animation (sweep + fade)

---

## Visual Specifications

### Highlight Background

```css
.highlight-background {
  position: relative;
  display: inline-block;
}

.highlight-background::before {
  content: '';
  position: absolute;
  left: -0.1em;
  right: -0.1em;
  top: 15%;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(119, 221, 135, 0) 0%,
    rgba(119, 221, 135, 0.35) 20%,
    rgba(119, 221, 135, 0.35) 100%
  );
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: left center;
  z-index: -1;
}
```

**Properties:**
- **Color:** Pastel Green (#77dd87)
- **Opacity:** 35% (0.35)
- **Position:** 15% from top, full width at bottom
- **Shape:** Slightly rounded edges (3px border-radius)
- **Gradient:** Fades in from top for organic look
- **Overflow:** Extends 0.1em beyond text on each side

**Why These Values:**
- 35% opacity: Visible but doesn't obscure text
- 15% top offset: Sits behind text baseline, not covering ascenders
- Gradient: Creates hand-drawn, marker-like effect
- Slight overflow: Mimics real highlighter bleeding slightly

---

### Marker Tip Asset

**User Responsibility:** Provide highlighter marker image

**Asset Specifications:**

#### SVG Format (Preferred)
```svg
<svg width="80" height="80" viewBox="0 0 80 80">
  <!-- Chisel tip highlighter pointing right -->
  <path d="..." fill="#77dd87" />
  <!-- Optional: darker tip edge -->
  <path d="..." fill="#5fd070" />
</svg>
```

**Specifications:**
- **Format:** SVG (scalable, small file size)
- **Dimensions:** 80×80px viewBox
- **Color:** Pastel Green (#77dd87)
- **Direction:** Pointing left-to-right (→)
- **Style:** Chisel tip or rounded tip
- **File size:** <5KB
- **Optimization:** Minified, remove unnecessary attributes

#### PNG Format (Alternative)
If SVG is not possible:

**Specifications:**
- **Format:** PNG-24 with alpha transparency
- **Resolution:** 160px × 160px (@2x for retina)
- **Color:** Pastel Green (#77dd87)
- **Background:** Transparent
- **File size:** <20KB (use TinyPNG compression)
- **Optimization:** Compress with ImageOptim or similar

#### Design Styles

**Option A: Chisel Tip (Recommended)**
```
    ╱╲
   ╱  ╲
  ╱    ╲
 ╱      ╲
═════════
```
- Realistic highlighter shape
- Clear directionality
- Professional appearance

**Option B: Round Tip**
```
     ●●
    ●  ●
   ●    ●
  ●      ●
 ●        ●
═══════════
```
- Softer, friendlier
- Subtle appearance
- Easier to draw

**Option C: Minimal Geometric**
```
→ ═══►
```
- Abstract/stylized
- Very simple
- Modern aesthetic

**Recommendation:** Option A (Chisel Tip) for most realistic effect

---

## CSS Animations

### Highlight Sweep Animation

```css
.highlight-background::before {
  animation: highlightSweep 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
}

@keyframes highlightSweep {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.35;
  }
  100% {
    transform: scaleX(1);
    opacity: 0.35;
  }
}
```

**Breakdown:**
- **Duration:** 600ms (0.6s)
- **Delay:** 800ms (0.8s) - wait for content to load
- **Easing:** cubic-bezier(0.4, 0, 0.2, 1) - ease-out feel
- **Fill mode:** forwards - keep final state
- **Transform:** scaleX(0) → scaleX(1) for smooth expansion
- **Opacity fade:** 0 → 0.35 in first 10% for smooth appearance

---

### Marker Tip Animation

```css
.marker-tip {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  animation:
    markerSweep 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards,
    markerFadeOut 0.1s ease-out 1.4s forwards;
}

@keyframes markerSweep {
  0% {
    left: -50px;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    left: calc(100% + 10px);
    opacity: 1;
  }
}

@keyframes markerFadeOut {
  to {
    opacity: 0;
  }
}
```

**Breakdown:**
- **Starting position:** -50px (off-screen left)
- **Ending position:** calc(100% + 10px) (off-screen right)
- **Fade in:** 0% → 8% of animation (quick appearance)
- **Fade out:** Separate animation at 1.4s for clean exit
- **Duration:** Matches highlight sweep (600ms)
- **Delay:** Matches highlight (800ms)

---

### Responsive Adjustments

#### Desktop (≥1024px)
```css
.highlight-background::before {
  animation-duration: 0.6s;
}

.marker-tip {
  width: 40px;
  height: 40px;
}
```

#### Tablet (768-1023px)
```css
.highlight-background::before {
  animation-duration: 0.5s;
}

.marker-tip {
  width: 36px;
  height: 36px;
}
```

#### Mobile (<768px)

**Option A: Simplified (Recommended)**
```css
@media (max-width: 767px) {
  /* Show highlight without marker animation */
  .marker-tip {
    display: none;
  }

  .highlight-background::before {
    animation: highlightFade 0.4s ease-out 0.8s forwards;
  }

  @keyframes highlightFade {
    from {
      opacity: 0;
      transform: scaleX(1);
    }
    to {
      opacity: 0.35;
      transform: scaleX(1);
    }
  }
}
```

**Option B: Full Animation**
```css
@media (max-width: 767px) {
  .highlight-background::before {
    animation-duration: 0.4s;
  }

  .marker-tip {
    width: 28px;
    height: 28px;
  }
}
```

**USER CONFIRMED:** Option B (full animation on mobile) ✅

---

## Accessibility Implementation

### HTML Structure

```html
<h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#2D2D2D]">
  I build
  <span
    className="highlight-background"
    role="text"
    aria-label="exceptional (emphasized)"
  >
    exceptional
    <span
      className="marker-tip"
      aria-hidden="true"
      role="presentation"
    >
      <img
        src="/images/marker-tip.svg"
        alt=""
        aria-hidden="true"
      />
    </span>
  </span>
  web experiences
</h1>
```

### Accessibility Features

1. **Screen Readers:**
   - Read text normally: "I build exceptional web experiences"
   - Optional aria-label adds emphasis context
   - Marker tip hidden with `aria-hidden="true"`

2. **Keyboard Navigation:**
   - Animation doesn't interfere with focus
   - Text remains selectable during animation
   - No focusable elements added

3. **Motion Sensitivity:**
   ```css
   @media (prefers-reduced-motion: reduce) {
     .highlight-background::before,
     .marker-tip {
       animation-duration: 0.01ms !important;
       animation-delay: 0.01ms !important;
     }

     /* Show final state immediately */
     .highlight-background::before {
       transform: scaleX(1);
       opacity: 0.35;
     }

     .marker-tip {
       display: none;
     }
   }
   ```

4. **Color Contrast:**
   - Text remains dark gray (#2D2D2D) on white
   - Highlight is background decoration (35% opacity)
   - Contrast ratio unchanged: 13.5:1 (WCAG AAA)

---

## React/TypeScript Implementation

### Component Structure

```tsx
// components/HeroSection/HighlightedText.tsx

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface HighlightedTextProps {
  children: React.ReactNode;
  markerSrc?: string;
  className?: string;
}

export default function HighlightedText({
  children,
  markerSrc = '/images/marker-tip.svg',
  className = '',
}: HighlightedTextProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <span
      className={`highlight-background ${className}`}
      role="text"
      aria-label={`${children} (emphasized)`}
    >
      {children}
      {isClient && (
        <span className="marker-tip" aria-hidden="true" role="presentation">
          <Image
            src={markerSrc}
            alt=""
            width={40}
            height={40}
            aria-hidden="true"
            priority
          />
        </span>
      )}
    </span>
  );
}
```

### Usage in HeroSection

```tsx
// components/HeroSection/HeroSection.tsx

import HighlightedText from './HighlightedText';

export default function HeroSection() {
  return (
    <section className="...">
      <div className="...">
        {/* ... other elements ... */}

        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-[#2D2D2D]">
          I build <HighlightedText>exceptional</HighlightedText> web experiences
        </h1>

        {/* ... other elements ... */}
      </div>
    </section>
  );
}
```

### CSS Styles

```css
/* app/globals.css or components/HeroSection/styles.css */

.highlight-background {
  position: relative;
  display: inline-block;
}

.highlight-background::before {
  content: '';
  position: absolute;
  left: -0.1em;
  right: -0.1em;
  top: 15%;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(119, 221, 135, 0) 0%,
    rgba(119, 221, 135, 0.35) 20%,
    rgba(119, 221, 135, 0.35) 100%
  );
  border-radius: 3px;
  transform: scaleX(0);
  transform-origin: left center;
  z-index: -1;
  animation: highlightSweep 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards;
}

.marker-tip {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  will-change: transform, opacity;
  animation:
    markerSweep 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.8s forwards,
    markerFadeOut 0.1s ease-out 1.4s forwards;
}

@keyframes highlightSweep {
  0% {
    transform: scaleX(0);
    opacity: 0;
  }
  10% {
    opacity: 0.35;
  }
  100% {
    transform: scaleX(1);
    opacity: 0.35;
  }
}

@keyframes markerSweep {
  0% {
    left: -50px;
    opacity: 0;
  }
  8% {
    opacity: 1;
  }
  92% {
    opacity: 1;
  }
  100% {
    left: calc(100% + 10px);
    opacity: 1;
  }
}

@keyframes markerFadeOut {
  to {
    opacity: 0;
  }
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .highlight-background::before {
    animation-duration: 0.5s;
  }

  .marker-tip {
    width: 36px;
    height: 36px;
  }

  .marker-tip img {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 767px) {
  .marker-tip {
    display: none;
  }

  .highlight-background::before {
    animation: highlightFade 0.4s ease-out 0.8s forwards;
  }

  @keyframes highlightFade {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.35;
    }
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .highlight-background::before,
  .marker-tip {
    animation-duration: 0.01ms !important;
    animation-delay: 0.01ms !important;
  }

  .highlight-background::before {
    transform: scaleX(1);
    opacity: 0.35;
  }

  .marker-tip {
    display: none;
  }
}
```

---

## Performance Optimization

### Animation Performance

**GPU Acceleration:**
```css
.highlight-background::before,
.marker-tip {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Remove will-change after animation */
.highlight-background.animation-complete::before,
.marker-tip.animation-complete {
  will-change: auto;
}
```

**JavaScript to remove will-change:**
```tsx
useEffect(() => {
  const timer = setTimeout(() => {
    // Remove will-change after animation completes
    document.querySelector('.highlight-background')?.classList.add('animation-complete');
  }, 1600); // After animation finishes

  return () => clearTimeout(timer);
}, []);
```

### Asset Optimization

**SVG:**
- Minify with SVGO
- Remove unnecessary attributes
- Inline critical SVGs (<2KB)
- Target file size: <5KB

**PNG:**
- Compress with TinyPNG
- Use PNG-8 if possible (limited colors)
- 2x resolution only (no 3x needed for this use)
- Target file size: <20KB

### Loading Strategy

**Priority Loading:**
```tsx
<Image
  src="/images/marker-tip.svg"
  alt=""
  width={40}
  height={40}
  priority // Load immediately (above-fold content)
/>
```

**Preload in head (optional):**
```html
<link rel="preload" href="/images/marker-tip.svg" as="image" />
```

---

## Testing Checklist

### Visual Testing

- [ ] Animation triggers on page load
- [ ] Highlight expands smoothly left to right
- [ ] Marker tip appears and moves with highlight
- [ ] Marker fades out cleanly
- [ ] Highlight remains after animation
- [ ] No layout shift during animation
- [ ] Works across all text sizes (desktop, tablet, mobile)
- [ ] Highlight doesn't cover text (sits behind)
- [ ] Color is correct (Pastel Green #77dd87, 35% opacity)

### Animation Timing

- [ ] 800ms delay before start
- [ ] 600ms sweep duration
- [ ] Marker fades out at 1.4s
- [ ] Animation completes at 1.5s
- [ ] Timing feels natural and not rushed
- [ ] No janky frames or stuttering

### Responsiveness

- [ ] Desktop (1920×1080): Full animation
- [ ] Laptop (1440×900): Full animation
- [ ] Tablet (768×1024): Adjusted speed (500ms)
- [ ] Mobile (375×667): Simplified or no marker
- [ ] Highlight width adapts to text length
- [ ] Marker size scales appropriately

### Accessibility

- [ ] Screen readers read text normally
- [ ] Marker has `aria-hidden="true"`
- [ ] No keyboard trap issues
- [ ] Text remains selectable
- [ ] `prefers-reduced-motion` disables animation
- [ ] Final highlight still visible with reduced motion
- [ ] Color contrast maintained (13.5:1)

### Performance

- [ ] Animation runs at 60fps
- [ ] No layout reflow
- [ ] No excessive repaints
- [ ] GPU acceleration working
- [ ] Marker asset loads quickly (<100ms)
- [ ] Total animation JS/CSS <10KB
- [ ] Lighthouse Performance Score ≥90

### Cross-Browser

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)
- [ ] Animation works consistently

### Edge Cases

- [ ] Works with different text lengths
- [ ] Handles text wrapping (if headline breaks)
- [ ] Works if fonts load slowly
- [ ] No flash of unstyled content (FOUC)
- [ ] Replay on browser back button works
- [ ] Doesn't animate on subsequent page navigation (SPA)

---

## Implementation Phases

### Phase 1: Static Highlight (2-4 hours)

**Goal:** Get highlight showing without animation

**Tasks:**
1. Create HighlightedText component
2. Add static highlight CSS
3. Apply to "exceptional" text
4. Test across viewports
5. Verify text remains readable

**Acceptance Criteria:**
- Highlight visible behind text
- Correct Pastel Green color
- 35% opacity
- No impact on layout

---

### Phase 2: Highlight Animation (2-3 hours)

**Goal:** Animate highlight from left to right

**Tasks:**
1. Add scaleX animation
2. Set proper timing (600ms)
3. Add 800ms delay
4. Test easing curve
5. Ensure smooth animation

**Acceptance Criteria:**
- Smooth left-to-right expansion
- Natural timing
- 60fps performance
- No layout shift

---

### Phase 3: Marker Asset & Animation (3-4 hours)

**Goal:** Add marker tip that sweeps with highlight

**Tasks:**
1. Receive marker asset from user
2. Optimize SVG/PNG
3. Add marker element to component
4. Implement marker sweep animation
5. Sync with highlight timing
6. Add fade out

**Acceptance Criteria:**
- Marker moves with highlight
- Smooth appearance/disappearance
- Correct sizing
- Synced timing

---

### Phase 4: Polish & Accessibility (2-3 hours)

**Goal:** Ensure accessibility and cross-browser support

**Tasks:**
1. Add ARIA attributes
2. Implement prefers-reduced-motion
3. Test screen readers
4. Cross-browser testing
5. Performance optimization
6. Remove will-change after animation

**Acceptance Criteria:**
- Screen readers work correctly
- Reduced motion respected
- Works in all browsers
- 60fps maintained
- No accessibility violations

---

## User Asset Requirements

### Marker Image Checklist

**User must provide:**
- [ ] Highlighter marker tip image
- [ ] SVG format (preferred) OR PNG with transparency
- [ ] Pointing left-to-right (→ direction)
- [ ] Pastel Green color (#77dd87)
- [ ] Appropriate size (80×80px viewBox for SVG, 160×160px for PNG)
- [ ] File size <5KB (SVG) or <20KB (PNG)

**File naming:**
```
marker-tip.svg  (preferred)
or
marker-tip.png
marker-tip@2x.png
```

**Delivery location:**
```
/public/assets/marker-tip.svg ✅ PROVIDED BY USER
```

**Design specifications sent to user:**
- Color: #77dd87 (Pastel Green)
- Style: Chisel tip or rounded tip
- Direction: Horizontal, pointing right
- Size: 80×80px (scalable)
- Format: SVG preferred, PNG acceptable
- Background: Transparent

---

## A/B Testing (Optional)

### Test Variants

**Variant A:** No highlight (control)
**Variant B:** Highlight "exceptional"
**Variant C:** Highlight "web experiences"
**Variant D:** Highlight "design & engineering"

### Metrics to Track

- Time on page
- Scroll depth (do users explore more?)
- Bounce rate
- CTA click-through rate (once implemented)
- Qualitative feedback (if collected)

### Recommendation

Run test for 2-4 weeks with:
- 25% no highlight
- 75% with highlight

If positive results, make highlight permanent.

---

## Future Enhancements (Optional)

1. **Multi-word highlights:**
   - Highlight multiple words in sequence
   - Stagger timing for each word

2. **Interactive highlight:**
   - Trigger animation on scroll into view
   - Re-animate on hover (subtle)

3. **Different highlight styles:**
   - Underline style
   - Circle/box around word
   - Double highlight

4. **Customization:**
   - Admin panel to change highlighted word
   - A/B test different words automatically

---

## Related Issues

- Issue #381: HeroSection base structure ✅
- Issue #382: Profile photo implementation (in progress)
- **New Issue:** Highlighter animation implementation

---

## Dependencies

### NPM Packages (none required)
- Pure CSS animation
- Next.js Image component (already installed)
- No additional dependencies needed

### Assets Required

1. **Marker tip image** (user-provided)
   - Path: `/public/images/marker-tip.svg`
   - Fallback: Create simple SVG if user doesn't provide

2. **Fallback marker SVG** (if needed):
```svg
<svg width="80" height="80" viewBox="0 0 80 80" fill="none">
  <path
    d="M10 40 L40 25 L70 40 L40 55 Z"
    fill="#77dd87"
    opacity="0.9"
  />
  <path
    d="M40 25 L70 40 L70 45 L40 30 Z"
    fill="#5fd070"
    opacity="0.7"
  />
</svg>
```

---

## File Structure

```
components/
└── HeroSection/
    ├── HeroSection.tsx
    ├── HighlightedText.tsx          ← New component
    ├── TechStackLogos.tsx
    ├── index.ts
    └── styles/
        └── highlighter.css           ← Animation CSS

public/
└── images/
    └── marker-tip.svg                ← User-provided asset
```

---

**Document Version:** 1.0
**Last Updated:** January 1, 2026
**Maintained By:** @ui-ux-designer
**Status:** Specification Complete - Awaiting User Asset
**Next Action:** User provides marker tip image, then ready for implementation

---

## Questions for User

Before implementation, please confirm:

1. **Which text to highlight?**
   - Recommendation: "exceptional"
   - Alternative: "web experiences" or "design & engineering"

2. **Marker asset timeline?**
   - Can you provide marker tip image within 1-2 days?
   - If not, should we use fallback SVG?

3. **Mobile behavior preference?**
   - Option A: No marker, just fade in highlight
   - Option B: Full animation with smaller marker

4. **Implementation priority?**
   - Implement before or after Profile Photo (Issue #382)?
   - Implement before or after CTA buttons?

**Awaiting user confirmation before proceeding to implementation.**
