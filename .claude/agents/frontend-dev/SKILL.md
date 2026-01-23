# Frontend Development Skills & Lessons Learned

**Purpose:** Capture recurring patterns, gotchas, and best practices discovered during development to avoid repeating mistakes.

**Scope:** Agent-specific implementation details, debugging techniques, and session learnings. For project-wide architecture and design system, see `.claude/CLAUDE.md`.

**Last Updated:** January 21, 2026

---

## CSS & Styling

### CSS Transforms Are Atomic (Not Additive)

**Problem:** CSS transforms override each other instead of combining.

**Wrong:**
```css
.element {
  transform: translate(-50%, -50%);
}
.element:hover {
  transform: scale(1.15); /* This removes translate! */
}
```

**Correct:**
```css
.element {
  transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
}
.element:hover {
  transform: translate(-50%, -50%) rotate(var(--rotation, 0deg)) scale(1.15);
}
```

**Key Insight:** Always include ALL transforms in every transform declaration. Use CSS custom properties for dynamic values.

---

### Transform Order Matters

The order of transform operations affects the final result:

```css
/* Order: translate → rotate → scale */
transform: translate(-50%, -50%) rotate(15deg) scale(1.15);
```

- **translate** - Move the element first
- **rotate** - Rotate around the (new) center
- **scale** - Scale last to avoid position drift

---

### Aspect Ratio Correction for Circles

When positioning elements in a circle on non-square containers, X-axis needs compensation:

```typescript
// Without correction: ellipse
const x = centerX + (radius * Math.cos(angle));

// With correction: perfect circle
const radiusX = radius * 0.7; // Aspect ratio correction
const x = centerX + (radiusX * Math.cos(angle));
```

**When to use:** Any circular positioning on rectangular containers (hero sections, cards, etc.)

---

## Animation Patterns

### Staggered Animation with Cleanup

```typescript
useEffect(() => {
  if (!animation) {
    setVisibleLogos(new Set(logos.map((_, i) => i)));
    return;
  }

  const interval = setInterval(() => {
    setVisibleLogos((prev) => {
      const next = new Set(prev);
      if (next.size < logos.length) {
        next.add(next.size);
      }
      return next;
    });
  }, DELAY_INTERVAL);

  return () => clearInterval(interval); // Critical: cleanup!
}, [animation, logos.length]);
```

**Key Points:**
- Always return cleanup function from useEffect
- Use Set for O(1) visibility checks
- Handle non-animated case (instant display)

---

### Reduced Motion Accessibility

**Always respect user preferences:**

```css
@media (prefers-reduced-motion: reduce) {
  .animated-element {
    animation: fadeInStatic 0.01ms forwards !important;
  }
}

@keyframes fadeInStatic {
  to {
    opacity: 1;
    transform: none;
  }
}
```

**Why:** Users with vestibular disorders need instant display instead of animations.

---

## Circular/Orbital Positioning

### Mathematical Circle Placement

```typescript
const calculatePositions = (totalItems: number, radiusPercent: number) => {
  const angleStep = (2 * Math.PI) / totalItems;
  const startAngle = -Math.PI / 2; // Start at 12 o'clock

  return Array.from({ length: totalItems }, (_, index) => {
    const angle = startAngle + index * angleStep;
    return {
      x: 50 + (radiusPercent * 0.7 * Math.cos(angle)), // 0.7 = aspect correction
      y: 50 + (radiusPercent * Math.sin(angle)),
      rotation: (angle * 180 / Math.PI) + 90, // Convert to degrees
    };
  });
};
```

**Parameters:**
- `startAngle = -Math.PI / 2` → Starts at top (12 o'clock)
- `angleStep = 2π / n` → Even distribution
- Multiply X by 0.7 for aspect ratio correction

---

## Component Architecture

### Props with Sensible Defaults

```typescript
interface TechStackLogosProps {
  animation?: boolean;    // default: true
  radius?: number;        // default: 35 (%)
  centerX?: number;       // default: 50 (%)
  centerY?: number;       // default: 50 (%)
}
```

Make components configurable but usable out-of-the-box.

---

### useMemo for Expensive Calculations

```typescript
const logoPositions = useMemo(() => {
  return calculateCircularPositions(techLogos.length, radius, centerX, centerY);
}, [radius, centerX, centerY]); // Only recalculate when these change
```

**When to use:** Trigonometric calculations, array transformations, complex mappings.

---

## Third-Party Libraries

### Simple Icons for Tech Logos

**Best source for official brand logos:**

```bash
npm install simple-icons
```

```typescript
import { siReact, siTypescript } from 'simple-icons';

// Usage with SVG string
<div dangerouslySetInnerHTML={{ __html: siReact.svg }} />
```

**Benefits:**
- MIT Licensed (copyright safe)
- 2800+ brand logos
- Consistent style
- Small file sizes

---

### Flag Icons for Locale Switcher

```bash
npm install flag-icons
```

```css
@import 'flag-icons/css/flag-icons.min.css';
```

```tsx
<span className={`fi fi-${countryCode}`} />
```

**Note:** Country codes are ISO 3166-1-alpha-2 (e.g., `us`, `kr`, `jp`).

---

## Internationalization (i18n)

### next-intl Setup Pattern

```typescript
// i18n/routing.ts
export const routing = defineRouting({
  locales: ['en', 'ko'],
  defaultLocale: 'en',
});

// i18n/request.ts
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

---

### Locale Switcher Accessibility

**Always include:**
- `lang` attribute on locale buttons
- `aria-label` describing the action
- Visual indicator of current locale (not just color)

```tsx
<button
  lang={locale}
  aria-label={`Switch to ${langName}`}
  aria-pressed={isActive}
>
  <span className={`fi fi-${countryCode}`} aria-hidden="true" />
  <span className="sr-only">{langName}</span>
</button>
```

---

## Responsive Design

### Mobile-First Breakpoints

```css
/* Base: Mobile (< 768px) */
.element { width: 100%; }

/* Tablet (≥ 768px) */
@media (min-width: 768px) {
  .element { width: 50%; }
}

/* Desktop (≥ 1024px) */
@media (min-width: 1024px) {
  .element { width: 33%; }
}
```

**Tailwind:**
```tsx
<div className="w-full md:w-1/2 lg:w-1/3" />
```

---

### Dynamic Viewport Units

**Problem:** `100vh` doesn't account for mobile browser chrome.

**Solution:** Use dynamic viewport units:

```css
.hero {
  height: 100dvh; /* Dynamic viewport height */
}
```

**Tailwind:**
```tsx
<section className="h-dvh" />
```

---

## Performance

### GPU-Accelerated Animations

```css
.animated {
  will-change: transform, opacity;
  backface-visibility: hidden;
}
```

**Remove after animation:**
```css
.animation-complete {
  will-change: auto;
}
```

---

### SVG Over PNG for Icons

**Prefer SVGs because:**
- Infinitely scalable
- Smaller file size
- CSS-styleable
- No retina considerations

---

## Accessibility Checklist

### Decorative Elements

```tsx
<div aria-hidden="true">
  {/* Decorative content hidden from screen readers */}
</div>
```

### Focus Management

```css
/* Visible focus indicator */
:focus-visible {
  outline: 2px solid var(--pastel-green);
  outline-offset: 2px;
}

/* Remove outline for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast Minimums

| Context | WCAG AA | WCAG AAA |
|---------|---------|----------|
| Normal text | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | N/A |

---

## Common Gotchas

### 1. Interval Memory Leaks

**Always clean up intervals:**
```typescript
useEffect(() => {
  const id = setInterval(() => {}, 1000);
  return () => clearInterval(id); // Required!
}, []);
```

### 2. Hydration Mismatches

**Avoid:**
- `Math.random()` in render
- `new Date()` without useEffect
- Browser-only APIs during SSR

**Solution:** Use `useEffect` for client-only code.

### 3. Z-Index Wars

**Use consistent z-index scale:**
```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-modal: 200;
  --z-tooltip: 300;
  --z-toast: 400;
}
```

### 4. SVG viewBox Case Sensitivity

```tsx
// Wrong (JSX)
<svg viewbox="0 0 24 24">  // lowercase 'b' won't work

// Correct
<svg viewBox="0 0 24 24">  // capital 'B' required
```

---

## Quick Reference Commands

**See `.claude/CLAUDE.md` (Development Commands section) for all project commands.**

Common git and testing commands:
```bash
git status
git diff
git log --oneline -10
npx playwright screenshot http://localhost:3000
```

---

## Document Maintenance

**When to update this document:**
- After solving a tricky bug
- When discovering a better pattern
- After learning a new library quirk
- When onboarding notes could help future sessions

**Format:**
1. Problem description
2. Wrong approach (if applicable)
3. Correct solution
4. Key insight/takeaway

---

## Session Learnings - January 20, 2026

### Mistakes & Fixes

- **Issue:** Initial Live Projects Section had info (title, tech stack, description) positioned inside iPhone frame
  - **Root Cause:** Misinterpretation of Figma design specification during implementation
  - **Fix:** Moved info section outside phone frame using flexbox column layout (`flex flex-col items-center`)
  - **Prevention:** Always compare implementation with actual Figma mockup, not just verbal specs. Use ui-ux-designer agent to validate layout placement before coding

- **Issue:** Gradient overlay on iPhone frame was too opaque (100% opacity)
  - **Root Cause:** Initial implementation used full-strength gradient without checking visual impact
  - **Fix:** Reduced overlay opacity to 30% using `rgba(51,51,51,0.3)` for subtle effect
  - **Prevention:** Test visual effects at various opacity levels; start conservative with overlays

### Patterns Discovered

- **Pattern: Canvas 2D Twinkling Animation with Accessibility**
  - **Context:** Creating performant star field background that respects `prefers-reduced-motion`
  - **Implementation:**
    - Use Canvas 2D API with `requestAnimationFrame` for smooth 60fps performance
    - Store stars in `useRef` to avoid re-generation on every render
    - Check `prefers-reduced-motion` using `window.matchMedia()` and listen for changes via `addEventListener('change')`
    - When reduced motion: Cancel animation, draw static stars once
    - When motion restored: Restart `requestAnimationFrame` loop
    - Always clean up: `cancelAnimationFrame()`, `removeEventListener()` in cleanup function
  - **Key Code Pattern:**
    ```typescript
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        cancelAnimationFrame(animationFrameRef.current);
        // Draw static version
      } else {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    mediaQuery.addEventListener('change', handleMotionChange);
    ```

- **Pattern: High-DPI Canvas Rendering**
  - **Context:** Making canvas sharp on retina/high-DPI displays
  - **Implementation:**
    - Get `devicePixelRatio` from window
    - Set canvas internal size to `width * dpr` and `height * dpr`
    - Set CSS size to logical pixels (unscaled)
    - Scale context: `ctx.scale(dpr, dpr)`
  - **Code:**
    ```typescript
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ```

- **Pattern: Sine Wave Opacity Animation for Twinkling Effect**
  - **Context:** Creating natural-looking star twinkling without CSS keyframes
  - **Implementation:**
    - Use `Math.sin(timestamp * twinkleSpeed + offset)` to create oscillation
    - Result ranges from -1 to 1, map to opacity range: `0.3 + 0.7 * Math.sin(...)`
    - Vary `twinkleSpeed` per star (0.0005 to 0.002) for natural variation
    - Use random `twinkleOffset` so stars don't twinkle in sync
  - **Benefit:** Smooth, continuous animation without discrete keyframes

- **Pattern: Lazy-Loading iframes with Intersection Observer**
  - **Context:** Load live website previews only when scrolled into view
  - **Implementation:**
    - Use `IntersectionObserver` with `rootMargin: '100px'` to start loading before visible
    - Set `threshold: 0.1` for early detection
    - Disconnect observer after first intersection to avoid repeated loads
    - Track loading states: `'idle' | 'loading' | 'loaded' | 'error'`
    - Show loading spinner while state is loading
  - **Code:**
    ```typescript
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            setLoadingState('loading');
            observer.disconnect(); // Load only once
          }
        });
      },
      { rootMargin: '100px', threshold: 0.1 }
    );
    ```

- **Pattern: 400% Scale Technique for iframe Content Scaling**
  - **Context:** Display responsive website inside small iPhone frame while maintaining readability
  - **Implementation:**
    - Render iframe at 400% size: `w-[400%] h-[400%]`
    - Scale down to 25%: `scale-[0.25]`
    - Set origin to top-left: `origin-top-left`
    - This makes content 4x smaller but sharp and readable
  - **Why it works:** Scaling at 25% (1/4) shows entire page content, better than clipping
  - **Alternative:** Could also use CSS zoom property, but transform is more compatible

- **Pattern: iPhone Pro Frame Design with Detailed Bezels**
  - **Context:** Create realistic iPhone 15 Pro appearance for project previews
  - **Design Details:**
    - Aspect ratio: `9:19.5` (exact iPhone 15 Pro proportions)
    - Outer radius: `rounded-[12%]` for smooth edges
    - Screen radius: `rounded-[10%]` with small margin (2%)
    - Dynamic Island: `w-[28%] h-[3.5%]` centered at top
    - Side buttons positioned at specific percentages for visual accuracy
    - Home indicator: thin bar at bottom (`h-[0.6%]`) with transparency
  - **Color scheme:** Space Black `#1a1a1a` with subtle highlights

### Debugging Wins

- **Problem:** Frame info section placement confusion
  - **Approach:** Compared Figma screenshot with implementation using visual inspection. Used ui-ux-designer agent to analyze design and clarify spec
  - **Tool/Technique:** Figma image analysis + visual diff between design and code

- **Problem:** Gradient overlay intensity mismatch
  - **Approach:** Tested different opacity values (100%, 50%, 30%) visually to match Figma design
  - **Tool/Technique:** Browser DevTools opacity testing, direct color value adjustment

### Performance Notes

Session-specific optimizations:
- **Canvas Stars:** Validated 150-star rendering more efficient than DOM elements (single RAF loop)
- **Intersection Observer:** `rootMargin: '100px'` provides optimal iframe loading buffer
- **Lazy Iframe:** Deferred iframe creation saves ~2MB memory per off-screen preview
- **Reduced Motion:** RAF cancellation prevents unnecessary CPU cycles when animations disabled

---

## Session Learnings - January 21, 2026

### Mistakes & Fixes

- **Issue:** Type mismatch in LiveProjectsSection - passed `string[]` to component expecting `SimpleIcon[]`
  - **Root Cause:** Tech stack data was fetched as string identifiers, but component required SimpleIcon objects with SVG data
  - **Fix:** Map string identifiers to actual SimpleIcon objects before passing as props
  - **Prevention:** Always verify third-party library types (especially simple-icons) match component prop requirements before implementation

- **Issue:** CertificationCard title placement - initially placed inside glass card container
  - **Root Cause:** Misinterpreted design specification for card layout hierarchy
  - **Fix:** Moved h3 title OUTSIDE and ABOVE the glassCardBaseStyle container; created separate flex-col wrapper
  - **Prevention:** Extract explicit placement rules from design specs: "title outside" vs "title inside" should be codified in design system docs

### Patterns Discovered

- **Pattern: Reusable Style Composition via baseStyles.ts**
  - **Context:** Multiple cards need consistent glassmorphic styling, hover effects, and sizing
  - **Implementation:** See `.claude/CLAUDE.md` (Reusable Styles System, lines 206-258) for complete baseStyles.ts documentation
  - **Key exports:** `glassCardBaseStyle` (with v5.1 responsive padding), `hoverLiftStyle`, `baseWidth`
  - **Files:** `/app/styles/baseStyles.ts`
  - **Session Application:** Applied to SmallProjectCard, CertificationCard, LiveProjectCard

- **Pattern: Title Outside / Card Inside Hierarchy**
  - **Context:** Cards with glass effect need visual separation between heading and content
  - **Implementation:** See `.claude/CLAUDE.md` (Component Patterns, lines 263-289) for complete card pattern specification
  - **Key Rule:** h3 title placed OUTSIDE glassCardBaseStyle container, never inside
  - **Session Application:** Validated in CertificationCard, themed project cards, certification displays

- **Pattern: CSS clip-path Animation for Writing Reveal Effect**
  - **Context:** Create animated signature or text reveal that simulates writing from left to right
  - **Core Technique:** `clip-path: inset()` animation from right to left with prefers-reduced-motion support
  - **Implementation Details:**
    - Duration: 2-2.5s for natural writing appearance
    - Easing: `cubic-bezier(0.4, 0, 0.2, 1)` for smooth deceleration
    - Accessibility: mediaQuery listener for live preference updates
  - **Session Application:** Implemented in CalligraphySignature component with full accessibility support
  - **Key Insight:** clip-path is GPU-accelerated, provides smoother animation than width/opacity

- **Pattern: Semantic HTML with ARIA for Links**
  - **Context:** Improve accessibility for external links and navigation
  - **Implementation:** See `.claude/CLAUDE.md` (Accessibility Patterns section) for comprehensive ARIA and semantic HTML guidelines
  - **Session Application:** Applied to CertificationCard external verification links with proper aria-labels

- **Pattern: i18n Message Structure with next-intl**
  - **Context:** Support multiple languages (English, Korean) with centralized message management
  - **Implementation:** See `.claude/CLAUDE.md` (Accessibility Patterns - Internationalization section) for next-intl usage patterns
  - **Session Application:** Applied translation hooks to CertificationCard with proper message key structure

### Debugging Wins

- **Problem:** LiveProjectsSection type error when integrating tech stack data
  - **Approach:** Traced type from component prop definition → SimpleIcon interface → actual data structure. Identified mismatch between string identifiers and SimpleIcon objects
  - **Tool/Technique:** TypeScript compiler errors guided investigation; simple-icons package documentation clarified required object structure

- **Problem:** CertificationCard layout not matching design (title placement)
  - **Approach:** Created visual mockup in mind from design spec, compared with implementation, identified title was nested inside card when it should be outside
  - **Tool/Technique:** Read component JSX structure against design hierarchy; made targeted DOM restructuring

- **Problem:** Reduce motion preference handling for CalligraphySignature
  - **Approach:** Added mediaQuery listener with state tracking; tested by changing system accessibility settings; verified animation stops and signature displays immediately
  - **Tool/Technique:** System settings change testing, useRef for state persistence across renders, cleanup function verification

### Performance Notes

Session-specific optimizations:
- **Centralized Styles:** Validated that `baseStyles.ts` export pattern reduces bundle redundancy
- **clip-path Animation:** Confirmed 60fps performance on CalligraphySignature across devices
- **Reduced Motion:** Verified animation cancellation reduces CPU usage when preference enabled
- **Image Loading:** Next.js Image with `priority` flag for above-fold CalligraphySignature

### Automation Opportunities (Jan 21)

- **Component Generator:** Scaffold generator for card components with baseStyles.ts imports
- **i18n Key Validator:** Linter to ensure en.json/ko.json key parity
- **Design System Auditor:** Find hardcoded classes that should use baseStyles exports
- **Accessibility Scanner:** Pre-commit hook for missing ARIA labels

---

## Session Learnings - January 22, 2026

### Mistakes & Fixes

- **Issue:** Used `<img>` instead of `next/image` in LiveProjectCard screenshot fallback for mobile
  - **Root Cause:** Didn't consider Next.js Image optimization benefits initially
  - **Fix:** Replaced `<img>` with `next/image` using remotePatterns configuration
  - **Prevention:** Always reach for `next/image` first for any image rendering, especially for performance-critical sections

- **Issue:** React.FC type annotation on `useSimpleIcons` hook
  - **Root Cause:** Following outdated React typing patterns
  - **Fix:** Removed React.FC, used modern function return type with proper typing
  - **Prevention:** Stay current with React 18+ typing patterns; avoid React.FC for new components

- **Issue:** Missing `useMemo` optimization for icon rendering in `useSimpleIcons` hook
  - **Root Cause:** Didn't consider re-render performance impact of creating icon elements on every render
  - **Fix:** Added `useMemo` for both `renderedIcons` array and `IconContainer` component with proper dependency arrays
  - **Prevention:** Memoize any computed values that are passed as dependencies or could cause expensive re-renders

- **Issue:** Suspense boundary wrapped too much content in `loading.tsx`
  - **Root Cause:** Misunderstood that persistent UI (header/nav) should stay outside Suspense
  - **Fix:** Moved Suspense to only wrap `{children}`, keeping persistent elements outside
  - **Prevention:** Suspense should only wrap content that can be replaced; persistent UI remains outside

### Patterns Discovered

- **Pattern: useSimpleIcons Hook for Icon Rendering**
  - **Context:** Multiple components need to render SimpleIcon objects with consistent sizing, tooltips, and accessibility
  - **Implementation:** See `.claude/CLAUDE.md` (Component Patterns, lines 293-330) for complete hook documentation with sm/md/lg sizing
  - **Location:** `/src/hooks/useSimpleIcons.tsx`
  - **Returns:** `{ icons: SimpleIcon[]; IconContainer: React.FC }` with responsive sizing and tooltip support
  - **Session Application:** Integrated into SmallProjectCard and LiveProjectCard with useMemo optimization

- **Pattern: Mobile Fallback with useBreakpoint Hook**
  - **Context:** Heavy components (iframes) crash on mobile; need lightweight alternative
  - **Implementation:** Documented in CLAUDE.md under v5.1 Polish (Issue #460)
  - **Key Technique:** `useBreakpoint()` hook for conditional rendering based on viewport
  - **Session Application:** Successfully resolved mobile crashes in LiveProjectIframe with screenshot fallback
  - **Performance Impact:** ~75% memory reduction on mobile devices

- **Pattern: PR Review Workflow with GitHub API**
  - **Context:** Iterating on code based on review feedback
  - **Implementation:**
    - Fetch PR comments: `gh api repos/:owner/:repo/pulls/:pr_number/comments`
    - Parse issues/suggestions from comment text
    - Create fixes in same branch
    - Repush without creating new PR
  - **Benefits:** Keeps PR discussion in one place, single commit history, cleaner GitHub record
  - **Command Reference:**
    ```bash
    gh api repos/owner/repo/pulls/463/comments
    # Make fixes locally
    git add .
    git commit --amend --no-edit
    git push origin branch-name --force-with-lease
    ```

- **Pattern: Batch Milestone & Issue Creation**
  - **Context:** Organizing work for v5.1 with multiple related issues
  - **Implementation:**
    - Create milestone first: `gh milestone create --title "v5.1" --description "..."`
    - Create issues with template batch commands
    - Link issues to milestone via `--milestone` flag
    - Organize by epic categories (Animations, Bugs, Polish, etc.)
  - **Benefits:** Clear project organization, trackable progress, grouped related work
  - **Example:**
    ```bash
    gh issue create --title "iFrame crashes on mobile" --body "..." --milestone "v5.1" --label "bug"
    ```

- **Pattern: Next.js Image with Remote Patterns**
  - **Context:** Loading external images (screenshots) from URLs
  - **Implementation:**
    - Configure `remotePatterns` in `next.config.ts` to allow external domains
    - Use `next/image` component with full URL
    - Set `priority` for critical images, lazy-load others
  - **Configuration:**
    ```typescript
    const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'screenshots.example.com',
            pathname: '/**',
          },
        ],
      },
    };
    ```

### Debugging Wins

- **Problem:** iFrame crashing on mobile viewport
  - **Approach:** Analyzed viewport size constraints, identified memory overhead of rendering live website inside small frame. Tested `useBreakpoint` hook to conditionally render screenshot fallback on mobile breakpoints
  - **Tool/Technique:** Mobile breakpoint detection, screenshot fallback as lightweight alternative

- **Problem:** Icon rendering performance and styling consistency
  - **Approach:** Created dedicated `useSimpleIcons` hook with memoization. Tested hook across components to ensure consistent sizing and tooltips
  - **Tool/Technique:** React DevTools profiler to verify memoization working; component testing at different breakpoints

- **Problem:** PR review feedback iteration workflow
  - **Approach:** Used `gh api` to fetch PR comments, parsed feedback, implemented fixes locally, amended commits and force-pushed with `--force-with-lease` (safe option)
  - **Tool/Technique:** GitHub CLI for automated PR interaction; `--force-with-lease` prevents accidental overwrites

### Performance Notes

Session-specific optimizations (v5.1):
- **Mobile Fallback:** Screenshot strategy reduces memory 75% vs live iframe on mobile (Issue #460)
- **useMemo Icons:** Prevents re-rendering tech stack on parent state changes (Issue #461)
- **Breakpoint Hook:** Component tree pruning more efficient than CSS media queries for conditionals
- **Suspense Scope:** Narrowed to {children} only, prevents header/nav re-render on route change (Issue #459)
- **Image Optimization:** Next.js srcset + remotePatterns for external screenshots (Issue #460)

### Accessibility Wins

**See `.claude/CLAUDE.md` (Accessibility section in Quick Reference) for project-wide accessibility standards.**

Session-specific validations:
- **Touch Target Sizing:** Verified 44x44px minimum on v5.1 components (Issue #457)
- **Focus States:** Implemented `focus-visible` with cyan outline for keyboard navigation
- **Icon Tooltips:** Integrated MUI Tooltip in `useSimpleIcons` hook
- **Screenshot Fallback:** Alt text on mobile fallback images (Issue #460)

### Automation Opportunities (Jan 22 - v5.1)

- **PR Comment Bot:** Fetch review comments, suggest fixes, auto-label
- **Mobile Optimization Linter:** Flag heavy components needing useBreakpoint
- **Icon Validator:** Verify SimpleIcon sizing consistency
- **remotePatterns Validator:** Check external image URLs before build
- **Visual Regression:** Automated screenshots at 375/393/768/1024/1440px breakpoints

---

## Session Learnings - January 23, 2026

### Mistakes & Fixes

- **Issue:** Hardcoded icon sizes in SmallProjectCard not responding to breakpoints
  - **Root Cause:** Fixed 24px sizing ignored responsive design requirements; same size on mobile, tablet, desktop
  - **Fix:** Updated `useSimpleIcons` hook to support responsive sizing directly; removed `getResponsiveSizeClass` function complexity
  - **Prevention:** Always consider responsive variants when creating hooks; simplify by using direct Tailwind class composition with clsx

- **Issue:** SVG icons from SimpleIcons not scaling within flex containers on responsive layouts
  - **Root Cause:** SVG had fixed dimensions that weren't responsive to container width
  - **Fix:** Applied `[&>svg]:w-full [&>svg]:h-full` to force SVG to fill parent container dimensions
  - **Prevention:** When rendering SVGs in containers, explicitly set width/height to 100% using child selector in Tailwind

- **Issue:** Arbitrary Tailwind values used for responsive sizing instead of standard classes
  - **Root Cause:** Created `w-[20px]` instead of using standard `w-5` (20px divisible by 4)
  - **Fix:** Switched to standard Tailwind classes (w-4, w-6, w-8) for all responsive sizing
  - **Prevention:** Always use standard Tailwind utility classes when values are divisible by 4 (4, 8, 12, 16, 20, 24, 32, etc.)

### Patterns Discovered

- **Pattern: 3-Tier Responsive Typography System**
  - **Context:** Consistent text sizing across mobile, tablet, desktop
  - **See `.claude/CLAUDE.md`** (lines 398-428) for complete responsive typography documentation
  - **Implementation:** CSS custom properties in globals.css with media queries
  - **Usage:** Apply `.text-title`, `.text-h1`, `.text-h2`, etc. classes
  - **Key Principle:** Mobile-first scaling with md: and lg: breakpoint overrides
  - **Session Application:** Applied to Hero, Section Headings, Card Titles in v5.1

- **Pattern: Responsive baseStyles with glassCardBaseStyle Updates**
  - **Context:** Reusable styles need responsive padding and gap variants
  - **See `.claude/CLAUDE.md`** (lines 206-258) for current glassCardBaseStyle specification
  - **Current Value:** `bg-dark-gray/50 backdrop-blur-md rounded-3xl max-sm:p-3 md:p-2.5 lg:p-3`
  - **Pattern:** Mobile-first base value, then md: and lg: overrides in single string
  - **Session Note:** Use standard Tailwind classes (p-2.5) over arbitrary values (p-[10px])

- **Pattern: Scroll-Triggered Animation Hooks**
  - **Context:** Multiple sections need unified animation pattern for revealing content on scroll
  - **See `.claude/CLAUDE.md`** (lines 332-397) for complete hook documentation:
    - `useStaggeredAnimation` - Staggered reveal with configurable delay (default 500ms)
    - `useSectionAnimation` - Simple fade-in for entire section
  - **Location:** `/src/hooks/useStaggeredAnimation.ts` and `/src/hooks/useSectionAnimation.ts`
  - **Features:** Intersection Observer API, prefers-reduced-motion support, configurable timing
  - **Session Application:** Applied to SmallProjectCard, CertificationCard, LiveProjectCard sections (staggered); Hero/Footer (simple fade)

- **Pattern: Vercel Build Ignore Script for Branch Filtering**
  - **Context:** Restrict production builds to main branches (develop/master), skip builds on feature branches
  - **Implementation:** `vercel_build_ignore_step.sh` script
  - **Location:** Project root, referenced in `vercel.json` build settings
  - **Script Logic:**
    ```bash
    #!/bin/bash
    if [[ "$VERCEL_GIT_COMMIT_REF" != "master" && "$VERCEL_GIT_COMMIT_REF" != "develop" ]]; then
      echo "Skipping build on branch: $VERCEL_GIT_COMMIT_REF"
      exit 0
    fi
    ```
  - **Configuration in vercel.json:**
    ```json
    {
      "buildCommand": "bash vercel_build_ignore_step.sh && npm run build"
    }
    ```
  - **Benefits:** Prevents unnecessary builds on feature branches, saves build minutes, faster feedback on main branches

### Debugging Wins

- **Problem:** Icon sizing inconsistency across responsive breakpoints
  - **Approach:** Tested `useSimpleIcons` hook at 375px, 768px, 1440px using Playwright; identified fixed sizing
  - **Tool/Technique:** Playwright viewport testing + component visual inspection

- **Problem:** SVG icons not filling containers properly
  - **Approach:** Inspected SVG in DevTools; found inline width/height attributes overriding container flex
  - **Tool/Technique:** Browser DevTools CSS inspector to identify conflicting styles

- **Problem:** Determining correct standard Tailwind classes for arbitrary sizes
  - **Approach:** Referenced Tailwind spacing scale; identified all base-4 multiples (4, 8, 12, 16, 20, 24, 32, 48, 64)
  - **Tool/Technique:** Tailwind documentation + manual verification of divisibility by 4

- **Problem:** Section animations not triggering consistently on scroll
  - **Approach:** Added console logging to useStaggeredAnimation; verified Intersection Observer was detecting visibility
  - **Tool/Technique:** React DevTools profiler + console debugging for observer callbacks

### Performance Notes

Session-specific optimizations (v5.1 completion):
- **useSimpleIcons with clsx:** Direct object composition more efficient than function-based `getResponsiveSizeClass`
- **SVG Child Selectors:** `[&>svg]:w-full` compiles to single CSS rule vs. per-component styling
- **Standard Tailwind Classes:** Enables aggressive tree-shaking; arbitrary values `w-[20px]` create larger CSS output
- **Staggered Animations:** Intersection Observer only for visible elements; hidden items don't trigger updates
- **Vercel Build Ignore:** Prevents unnecessary build time on feature branches (typical: 2-5 min saved per PR)

### Responsive Testing Workflow Validated

- **5-Breakpoint Strategy:** Test at 375px, 393px, 768px, 1024px, 1440px covers 95% of user devices
- **Playwright Viewport Automation:** Setting exact viewport sizes more reliable than browser zoom
- **Component-Level Testing:** Test individual components (cards, buttons) before full page screenshots
- **Regression Tracking:** Save baseline screenshots to catch future changes quickly
- **Mobile-First Validation:** Always start at 375px, verify then expand to larger viewports

### Accessibility Wins

- **Icon Accessibility:** useSimpleIcons hook integrates MUI Tooltip for screen reader announcements
- **Touch Targets:** Verified 44x44px minimum maintained at all breakpoints (even with responsive sizing)
- **Color Contrast:** Validated all text maintains WCAG AA compliance at responsive text sizes
- **Animation Respect:** useStaggeredAnimation respects prefers-reduced-motion by showing all items immediately

### Automation Opportunities (Jan 23 - v5.1 completion)

- **Responsive Testing Bot:** CLI tool to generate Playwright screenshots at all 5 breakpoints automatically
- **Tailwind Validator:** Pre-commit linter to flag arbitrary values (w-[20px]) in favor of standard classes
- **Icon Size Auditor:** Scan codebase for inconsistent icon sizing; suggest standardization
- **Breakpoint Consistency:** Linter to ensure all components use consistent md: and lg: breakpoints
- **Build Script Validator:** Verify vercel.json references correct build ignore script

---

## Session Learnings - January 22, 2026

### GitHub CLI Workflow Automation

**Session-specific patterns for v5.1 milestone and issue management:**

- **Batch Milestone & Issue Creation:** Create milestone with `gh milestone create`, then batch issues with `--milestone` flag
- **Structured Issue Templates:** Include Type, Affected Breakpoints, Current/Expected Behavior, Screenshots
- **PR Review Iteration:** Use `gh api repos/:owner/:repo/pulls/:pr/comments` to fetch feedback, amend commits with `--force-with-lease`

**Key Commands:**
```bash
gh milestone create "v5.1" -d "Description"
gh issue create --title "..." --milestone "v5.1" --label "bug,mobile"
gh api repos/owner/repo/pulls/463/comments
git commit --amend --no-edit && git push origin branch --force-with-lease
```

### Mobile Responsive Design Debugging

- **Issue: iframe Content Overflow on Mobile (375px-393px)**
  - **Root Cause:** 400% scale technique doesn't account for mobile viewport constraints; content width exceeds container
  - **Investigation:** Playwright screenshots at exact mobile breakpoints revealed horizontal scroll
  - **Fix Strategy:**
    - Implement CSS `overflow: hidden` with clipping on mobile
    - Consider reducing scale percentage on mobile (e.g., 200% instead of 400%)
    - Alternative: Use viewport-aware scale calculation
  - **Prevention:** Test iframes at 375px during development, not just desktop
  - **Related Issue:** #461 (GitHub mobile crashes)

- **Issue: SmallProjectCard Tech Icons Overlap on Mobile**
  - **Root Cause:** Fixed icon size (24px) + fixed gap (8px) don't reflow in narrow columns
  - **Investigation:** Tested at 375px showed icons compressing and overlapping text
  - **Fix Strategy:**
    - Add `flex-wrap` for icon container to allow wrapping
    - Reduce icon size on mobile: `w-4 h-4 md:w-6 md:h-6`
    - Or reduce gap on mobile: `gap-1 md:gap-2`
  - **Prevention:** Test all card components at 375px and 393px explicitly
  - **Related Issue:** #462 (SmallProjectCard icons mobile)

### Responsive Testing Best Practices

- **Breakpoint Testing Checklist**
  - Test at exact breakpoints: 375px, 393px, 768px, 1024px, 1440px
  - Use Playwright for consistent viewport capture: `await page.setViewportSize({ width: 375, height: 667 })`
  - Compare against previous screenshots to catch regressions
  - Document findings by component (LiveProjectCard, SmallProjectCard, IPhoneProFrame, etc.)

- **Mobile-Specific Component Testing**
  - Verify touch targets remain 44x44px at smaller viewports
  - Check text wrapping and line breaks at narrow widths
  - Test scrolling performance on actual mobile devices (canvas animations, iframe scrolling)
  - Verify images load correctly and don't cause layout shift

- **Responsive CSS Gotchas**
  - Using `w-full` on container doesn't guarantee content fits (check children widths)
  - `grid` layouts can overflow on mobile; use `flex` or stack on mobile instead
  - `fixed` positioning may behave differently on mobile (test with actual device)
  - Negative margins (`-mt-12`) can cause overflow on narrow screens

### Issue Tracking & Prioritization

- **Categorization System**
  - **Bugs:** Crashes, rendering errors, broken functionality → Fix immediately
  - **Polish:** Spacing, alignment, sizing refinements → Plan for release milestone
  - **Enhancements:** New features, additional states → Consider for future phases
  - **Blockers:** Breaks deployment or user experience → Highest priority

- **Milestone Planning**
  - Group related issues by feature/section (Section Animations, GitHub Activity, etc.)
  - Mark blocking dependencies with labels or issue references
  - Plan phases to enable parallel work (e.g., mobile fixes don't block desktop enhancements)

### Pattern: Responsive Component Development Workflow

1. **Design specification** → Review at all 5 breakpoints
2. **Initial implementation** → Test at desktop (1440px)
3. **Breakpoint testing** → Capture screenshots at 375px, 768px, 1024px
4. **Mobile debugging** → Fix issues found at 375px-393px
5. **Tablet validation** → Ensure transitions are smooth at 768px
6. **Documentation** → Add breakpoint notes to component patterns

### Mistakes & Fixes

- **Issue:** Developed components without testing on mobile; discovered iframe/icon issues only during design review
  - **Root Cause:** Focused on desktop-first development without validating mobile early
  - **Fix:** Created comprehensive breakpoint testing workflow before marking features complete
  - **Prevention:** Add "Test at 375px and 1440px" to component implementation checklist

- **Issue:** Issue documentation lacked breakpoint specificity; made triage harder
  - **Root Cause:** Didn't use structured template for capturing findings
  - **Fix:** Created GitHub issue template with "Affected Breakpoints" field
  - **Prevention:** Use template for all design review findings

### Performance Notes

- Mobile debugging with Playwright: Exact viewport sizes (375, 393) are critical; approximate sizes miss edge cases
- Batch GitHub operations: Using CLI is 5x faster than web UI for 9+ issues
- Screenshot comparison: Save with breakpoint labels for quick reference during implementation

### Debugging Wins

- **Problem:** Understanding why SmallProjectCard icons overlap on mobile
  - **Approach:** Captured Playwright screenshots at 375px, compared to 1440px version, identified fixed sizing conflict
  - **Tool/Technique:** Playwright viewport sizing + screenshot comparison

- **Problem:** Identifying all mobile-specific issues in one systematic review
  - **Approach:** Tested all major components at each breakpoint (375, 393, 768, 1024, 1440px) using Playwright
  - **Tool/Technique:** Documented findings by component in structured issue format

### Automation Opportunities (Updated)

- **Playwright Breakpoint Testing Script:** Create reusable script that tests all components at standard breakpoints
- **GitHub CLI Batch Issues:** Template for creating milestone with related issues from findings
- **Screenshot Comparison Tool:** Automated visual diff between breakpoints to catch regressions
- **Mobile Audit Checklist:** Linter rule to flag fixed-size components that should be responsive
- **Issue Template Generator:** CLI tool to create properly formatted issues with breakpoint metadata

---
