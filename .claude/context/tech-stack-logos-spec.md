# Tech Stack Logos Specification

**⭐ STATUS: IMPLEMENTED ✅**
**Implementation Date:** January 2, 2026
**Review:** See `hero-section-review-v1.3.md`

---

**Feature:** Floating Tech Stack Logos in Hero Section
**Priority:** ~~Medium~~ COMPLETE
**Estimated Effort:** ~~2-3 days~~ Completed
**Dependencies:** HeroSection v1.2 (Pastel Green update) ✅
**Proposed By:** User
**Specified By:** @ui-ux-designer
**Specification Date:** January 1, 2026

**Implementation Note:** This specification served as the design guide for the implemented feature. The actual implementation includes 15 logos in an orbital pattern around the profile photo with grayscale treatment and hover effects. See component at `components/HeroSection/TechStackLogos.tsx`.

---

## Overview

Add floating tech stack logos/badges on the left and right sides of the hero section's centered content to showcase technical proficiency and fill horizontal whitespace on larger viewports.

---

## Design Concept

### Visual Layout (Desktop)

```
┌──────────────────────────────────────────────────────────┐
│                                                            │
│  [React]                                      [AWS]       │
│      [JS]              [Code Icons]               [TS]    │
│                     [Profile Photo]                       │
│  [Next.js]                                    [GitHub]    │
│      [Node]        [Greeting + Text]                      │
│                                               [Docker]    │
│  [Tailwind]                                  [GraphQL]    │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

**Design Principles:**
- Logos act as ambient background elements, not primary content
- Subtle presence that doesn't compete with main message
- Organic, scattered positioning (not rigid grid)
- Professional yet creative aesthetic

---

## Logo Selection

### Tier 1: Must Include (6 logos)

| Logo | Rationale | Priority |
|------|-----------|----------|
| React | Core framework, most recognizable | 1 |
| Next.js | Specialization, modern stack | 2 |
| TypeScript | Professional development | 3 |
| JavaScript | Foundation language | 4 |
| Node.js | Full-stack capability | 5 |
| GitHub | Collaboration standard | 6 |

### Tier 2: Should Include (4 logos)

| Logo | Rationale | Priority |
|------|-----------|----------|
| Tailwind CSS | Styling framework | 7 |
| AWS | Cloud infrastructure | 8 |
| GraphQL | API expertise | 9 |
| Docker | DevOps knowledge | 10 |

### Tier 3: Optional (2 logos)

| Logo | Rationale | Priority |
|------|-----------|----------|
| Git | Version control | 11 |
| MongoDB/PostgreSQL | Database expertise | 12 |

**User Confirmed List:** 13 logos
- React, Next.js, TypeScript, JavaScript, GitHub, Tailwind CSS, AWS, Docker, Zustand, Jotai, ESLint, Jest, Cypress

**Layout:** Scattered around profile photo (center), NOT left/right sides
**Reference:** See `.claude/context/design_reference/hero_reference.jpeg` for scattered aesthetic
**Angles:** Random rotations for organic, dynamic feel

---

## Visual Specifications

### Desktop (≥1024px)

**USER CONFIRMED DESIGN:** Logos scattered around profile photo in circular/orbital pattern with random angles (reference: film boxes in hero_reference.jpeg)

**Logo Styling:**
```css
.tech-logo {
  position: absolute;
  width: 48px;
  height: 48px;
  opacity: 0.25;
  filter: grayscale(100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity, filter;
}

.tech-logo:hover {
  opacity: 0.8;
  filter: grayscale(0%) brightness(1.1);
  transform: scale(1.15) rotate(0deg) !important; /* Remove rotation on hover */
}
```

**Positioning Strategy:**
- **Circular orbit:** Logos positioned in ring around profile photo
- **Radius:** 180-280px from profile photo center
- **Random angles:** Each logo rotated -25° to +25° for organic feel
- **Random offsets:** Slight variations in radius for natural scatter
- **Buffer zone:** No logos closer than 150px to profile photo edge
- **Total logos:** 13 (React, Next.js, TS, JS, GitHub, Tailwind, AWS, Docker, Zustand, Jotai, ESLint, Jest, Cypress)

**Example Positions (Around Profile Photo):**
```css
/* Assuming profile photo center at 50%, 50% of hero container */
.logo-react { top: 35%; left: 45%; transform: rotate(-12deg); }
.logo-nextjs { top: 30%; left: 60%; transform: rotate(8deg); }
.logo-typescript { top: 42%; left: 70%; transform: rotate(-15deg); }
.logo-javascript { top: 58%; left: 70%; transform: rotate(18deg); }
.logo-github { top: 70%; left: 60%; transform: rotate(-8deg); }
.logo-tailwind { top: 75%; left: 45%; transform: rotate(12deg); }
.logo-aws { top: 70%; left: 30%; transform: rotate(-20deg); }
.logo-docker { top: 58%; left: 20%; transform: rotate(15deg); }
.logo-zustand { top: 42%; left: 20%; transform: rotate(-10deg); }
.logo-jotai { top: 30%; left: 30%; transform: rotate(22deg); }
.logo-eslint { top: 25%; left: 50%; transform: rotate(-5deg); }
.logo-jest { top: 38%; left: 35%; transform: rotate(16deg); }
.logo-cypress { top: 62%; left: 55%; transform: rotate(-18deg); }
```

---

### Tablet (768-1023px)

**Logo Styling:**
```css
.tech-logo {
  width: 40px;
  height: 40px;
  opacity: 0.2;
}
```

**Positioning Adjustments:**
- Reduce to 6-8 logos total (3-4 per side)
- Tighter clustering toward edges (10-30% left, 70-90% right)
- Maintain 100-120px buffer around content
- Remove lowest priority logos (Tier 3)

---

### Mobile (<768px)

**Recommended Approach: Hide logos entirely**

**Rationale:**
- Limited horizontal space
- Content should be primary focus
- Risk of visual clutter
- Performance consideration

**Alternative (if logos must appear):**
- Move to horizontal strip above/below main content
- 4-6 logos maximum
- Size: 32px
- Single row, centered
- Higher opacity (0.4) for visibility

```css
@media (max-width: 767px) {
  .tech-logo {
    position: static;
    display: inline-block;
    width: 32px;
    height: 32px;
    opacity: 0.4;
    margin: 0 12px;
  }

  .tech-stack-container {
    position: static;
    display: flex;
    justify-content: center;
    margin-bottom: 32px;
  }
}
```

---

## Implementation Options

### Option A: Official Brand Logos (RECOMMENDED)

**Source:** [Simple Icons](https://simpleicons.org/)
- MIT Licensed
- 2800+ brand logos
- SVG format
- Consistent style
- Free to use

**Installation:**
```bash
npm install simple-icons
```

**Usage (React):**
```tsx
import { siReact, siNextdotjs, siTypescript } from 'simple-icons';

const TechLogo = ({ icon, top, left }) => (
  <div
    className="tech-logo"
    style={{ top, left }}
    dangerouslySetInnerHTML={{ __html: icon.svg }}
  />
);
```

**Pros:**
- ✅ Official brand recognition
- ✅ Consistent, professional look
- ✅ Zero copyright issues
- ✅ Easy to implement
- ✅ Small file sizes

**Cons:**
- ⚠️ External dependency
- ⚠️ Limited customization

---

### Option B: Custom Typography Badges

**Design:** Pill-shaped badges with technology names

**Visual Style:**
```
┌─────────────┐
│  TypeScript │
└─────────────┘

  ╭─────────╮
 │  Next.js  │
  ╰─────────╯
```

**Styling:**
```css
.tech-badge {
  background: white;
  border: 2px solid #77dd87;
  color: #77dd87;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  font-family: 'Roboto', sans-serif;
  white-space: nowrap;
}
```

**Pros:**
- ✅ 100% copyright safe
- ✅ Unique, custom design
- ✅ Full control over appearance
- ✅ Reinforces Pastel Green brand color

**Cons:**
- ⚠️ Less recognizable than official logos
- ⚠️ More visual weight
- ⚠️ Larger file sizes (if using images)

---

### Option C: Font Awesome Brand Icons

**Source:** [Font Awesome Free](https://fontawesome.com/)
- Free tier includes brand icons
- Well-established library
- Easy integration

**Pros:**
- ✅ Widely recognized
- ✅ Easy to implement
- ✅ Familiar to developers

**Cons:**
- ⚠️ Adds ~100KB to bundle (if not already using)
- ⚠️ Less comprehensive than Simple Icons
- ⚠️ Font-based (less flexible than SVG)

---

### Recommendation: Option A (Simple Icons)

Most professional, recognizable, and legally safe option.

---

## Animation Specifications

### On Page Load (Initial Appearance)

```css
@keyframes logoFadeIn {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  100% {
    opacity: 0.25;
    transform: scale(1) translateY(0);
  }
}

.tech-logo {
  animation: logoFadeIn 0.6s ease-out forwards;
}

/* Stagger each logo by 50ms */
.tech-logo:nth-child(1) { animation-delay: 1.2s; }
.tech-logo:nth-child(2) { animation-delay: 1.25s; }
.tech-logo:nth-child(3) { animation-delay: 1.3s; }
/* ... etc */
```

**Timing:**
- Start after main content loads (delay: 1.2s)
- Stagger appearance (50ms between each)
- Duration: 600ms per logo
- Easing: ease-out

---

### Idle State (Continuous Subtle Animation)

**Floating Effect:**
```css
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-8px);
  }
}

@keyframes rotate {
  0%, 100% {
    transform: rotate(-3deg);
  }
  50% {
    transform: rotate(3deg);
  }
}

.tech-logo {
  animation:
    float 4s ease-in-out infinite,
    rotate 6s ease-in-out infinite;
}

/* Different timing for each logo for organic feel */
.tech-logo:nth-child(odd) {
  animation-duration: 4.5s, 6.5s;
}

.tech-logo:nth-child(even) {
  animation-duration: 3.5s, 5.5s;
}
```

**Parameters:**
- Vertical float: ±8px
- Rotation: ±3°
- Duration: 3.5-6.5s (varies per logo)
- Timing: ease-in-out
- Iteration: infinite

**Performance:**
- Use CSS transforms (GPU accelerated)
- Apply `will-change: transform` judiciously
- Monitor frame rate (target: 60fps)

---

### On Hover (Interactive Feedback)

```css
.tech-logo:hover {
  opacity: 0.8;
  filter: grayscale(0%) brightness(1.1);
  transform: scale(1.15);
  z-index: 10;
  cursor: pointer;
}

/* Optional: Add subtle glow */
.tech-logo:hover::after {
  content: '';
  position: absolute;
  inset: -4px;
  background: radial-gradient(circle, rgba(119, 221, 135, 0.3) 0%, transparent 70%);
  border-radius: 50%;
  z-index: -1;
}
```

**Behavior:**
- Color: Grayscale → Full color
- Opacity: 25% → 80%
- Scale: 1.0 → 1.15
- Transition: 300ms cubic-bezier
- Optional: Pastel Green glow effect

---

### Respect User Preferences

```css
@media (prefers-reduced-motion: reduce) {
  .tech-logo {
    animation: logoFadeIn 0.01ms forwards !important;
  }

  @keyframes logoFadeIn {
    to {
      opacity: 0.25;
    }
  }

  /* Remove floating/rotation animations */
  .tech-logo {
    animation: none !important;
  }
}
```

---

## Component Structure

### React/TypeScript Implementation

```tsx
// components/HeroSection/TechStackLogos.tsx

import { siReact, siNextdotjs, siTypescript, siJavascript,
         siNodedotjs, siGithub, siTailwindcss, siAmazonaws,
         siGraphql, siDocker } from 'simple-icons';

interface LogoPosition {
  icon: typeof siReact;
  top: string;
  left?: string;
  right?: string;
  delay: number;
}

const leftLogos: LogoPosition[] = [
  { icon: siReact, top: '25%', left: '8%', delay: 1.2 },
  { icon: siJavascript, top: '35%', left: '15%', delay: 1.25 },
  { icon: siNextdotjs, top: '50%', left: '10%', delay: 1.3 },
  { icon: siNodedotjs, top: '60%', left: '18%', delay: 1.35 },
  { icon: siTailwindcss, top: '75%', left: '12%', delay: 1.4 },
];

const rightLogos: LogoPosition[] = [
  { icon: siAmazonaws, top: '22%', right: '10%', delay: 1.45 },
  { icon: siTypescript, top: '32%', right: '15%', delay: 1.5 },
  { icon: siGithub, top: '48%', right: '12%', delay: 1.55 },
  { icon: siDocker, top: '63%', right: '18%', delay: 1.6 },
  { icon: siGraphql, top: '78%', right: '14%', delay: 1.65 },
];

export default function TechStackLogos() {
  return (
    <div className="absolute inset-0 pointer-events-none hidden lg:block">
      {/* Left cluster */}
      {leftLogos.map((logo, index) => (
        <div
          key={`left-${index}`}
          className="tech-logo absolute"
          style={{
            top: logo.top,
            left: logo.left,
            animationDelay: `${logo.delay}s`,
          }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
        />
      ))}

      {/* Right cluster */}
      {rightLogos.map((logo, index) => (
        <div
          key={`right-${index}`}
          className="tech-logo absolute"
          style={{
            top: logo.top,
            right: logo.right,
            animationDelay: `${logo.delay}s`,
          }}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: logo.icon.svg }}
        />
      ))}
    </div>
  );
}
```

---

## Accessibility Considerations

1. **ARIA Attributes:**
   ```html
   <div className="tech-logo" aria-hidden="true">
   ```
   - Logos are decorative, hide from screen readers
   - Information is not essential (covered in About section)

2. **Keyboard Navigation:**
   - Logos should not be focusable
   - Use `pointer-events: none` on container
   - If interactive in future, add proper focus states

3. **Motion Sensitivity:**
   - Respect `prefers-reduced-motion`
   - Disable animations for users who prefer reduced motion
   - Keep static logos visible

4. **Color Contrast:**
   - At 25% opacity, logos don't need to meet contrast requirements (decorative)
   - On hover (80%), ensure sufficient contrast if text is present

---

## Performance Optimization

### File Size Targets

| Asset Type | Target | Maximum |
|------------|--------|---------|
| Single SVG logo | 1-2KB | 5KB |
| Total logos (10) | 10-20KB | 50KB |
| Simple Icons package | ~100KB | 150KB |

### Lazy Loading Strategy

**Not recommended** for hero section logos because:
- Above the fold content
- Small file sizes
- Part of initial visual experience
- Delayed appearance is intentional (stagger animation)

### CSS Optimization

```css
/* GPU acceleration for animations */
.tech-logo {
  will-change: transform, opacity;
  backface-visibility: hidden;
  perspective: 1000px;
}

/* Remove will-change after animation completes */
.tech-logo.animation-complete {
  will-change: auto;
}
```

### Image Optimization

If using PNG badges instead of SVGs:
- Use TinyPNG or ImageOptim
- Target: <10KB per badge
- 2x resolution for retina (96px × 96px)
- PNG-8 if possible, PNG-24 if transparency needed

---

## Testing Checklist

### Visual Testing

- [ ] Logos appear at correct positions on desktop (1920×1080)
- [ ] Logos appear at correct positions on laptop (1440×900)
- [ ] Logos reduce to 6-8 on tablet (768×1024)
- [ ] Logos hidden on mobile (375×667)
- [ ] No overlap with central content
- [ ] Consistent spacing between logos
- [ ] Grayscale filter applied correctly
- [ ] Hover state works (color, scale, opacity)

### Animation Testing

- [ ] Stagger animation works on page load
- [ ] Floating animation is subtle and smooth
- [ ] Rotation animation is subtle
- [ ] No performance issues (60fps maintained)
- [ ] Animations respect `prefers-reduced-motion`
- [ ] No layout shift during animation
- [ ] Animations don't interfere with central content

### Accessibility Testing

- [ ] Logos have `aria-hidden="true"`
- [ ] Screen readers ignore logos
- [ ] Keyboard navigation not affected
- [ ] Motion preferences respected
- [ ] No focusable elements (unless intentional)

### Performance Testing

- [ ] Lighthouse Performance Score ≥90
- [ ] First Contentful Paint <1.5s
- [ ] Largest Contentful Paint <2.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] No excessive repaints
- [ ] GPU usage acceptable

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Implementation Phases

### Phase 1: Static Logos (Day 1)

**Goal:** Get logos displaying in correct positions

**Tasks:**
1. Install Simple Icons package
2. Create TechStackLogos component
3. Define logo positions
4. Add logos to HeroSection
5. Test positioning across breakpoints

**Acceptance Criteria:**
- Logos visible on desktop
- Correct positions
- Hidden on mobile
- No layout issues

---

### Phase 2: Styling & Effects (Day 2)

**Goal:** Apply grayscale, opacity, and hover effects

**Tasks:**
1. Add CSS for grayscale filter
2. Set opacity to 25%
3. Implement hover states
4. Add responsive adjustments
5. Test in all browsers

**Acceptance Criteria:**
- Grayscale applied
- Hover reveals color
- Smooth transitions
- Works cross-browser

---

### Phase 3: Animations (Day 3)

**Goal:** Add load, float, and rotation animations

**Tasks:**
1. Implement stagger fade-in animation
2. Add subtle floating effect
3. Add subtle rotation
4. Respect reduced motion preference
5. Performance testing

**Acceptance Criteria:**
- Logos fade in sequentially
- Floating is subtle
- 60fps maintained
- Reduced motion respected

---

## Future Enhancements (Optional)

1. **Interactive Tooltips:**
   - Show technology name on hover
   - Brief description
   - Years of experience

2. **Click Actions:**
   - Filter projects by technology
   - Jump to relevant portfolio section
   - Link to technology's official site

3. **Dynamic Loading:**
   - Load tech stack from CMS/API
   - Easy updates without code changes

4. **Skill Level Indicators:**
   - Visual indicator of proficiency
   - Different opacity levels
   - Larger size for primary skills

---

## File Structure

```
components/
└── HeroSection/
    ├── HeroSection.tsx
    ├── TechStackLogos.tsx          ← New component
    ├── index.ts
    └── styles/
        └── tech-stack-logos.css     ← Animation CSS
```

---

## Related Issues

- Issue #381: HeroSection base structure ✅
- Issue #382: Profile photo implementation (in progress)
- Issue #385-387: CTA buttons (pending)
- **New Issue:** Tech Stack Logos implementation

---

**Document Version:** 1.0
**Last Updated:** January 1, 2026
**Maintained By:** @ui-ux-designer
**Status:** Specification Complete - Ready for Implementation
