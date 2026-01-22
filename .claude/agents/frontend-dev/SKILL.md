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

- **Canvas for Animations:** Rendering 150 stars with twinkling is more efficient with Canvas 2D API than creating 150 DOM elements with CSS animations
- **Intersection Observer Margin:** `rootMargin: '100px'` provides 100px buffer before viewport entry, allowing iframes to load with time to spare before user sees them
- **Single RAF Loop:** Using one `requestAnimationFrame` for all star animations is more efficient than individual timeouts/intervals per star
- **Lazy Iframe Loading:** Defer iframe creation (`isInView` check) to avoid rendering off-screen content
- **Reduce Motion:** Properly respecting `prefers-reduced-motion` by canceling RAF prevents unnecessary CPU usage for users who disabled animations

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
  - **Implementation:** See `.claude/CLAUDE.md` (Reusable Styles System section) for complete baseStyles.ts documentation
  - **Files:** `/app/styles/baseStyles.ts`
  - **Key exports:** `glassCardBaseStyle`, `hoverLiftStyle`, `baseWidth`

- **Pattern: Title Outside / Card Inside Hierarchy**
  - **Context:** Cards with glass effect need visual separation between heading and content
  - **Implementation:** See `.claude/CLAUDE.md` (Component Patterns > Card Component Pattern) for complete documentation
  - **Key Rule:** h3 title placed OUTSIDE glassCardBaseStyle container, never inside

- **Pattern: CSS clip-path Animation for Writing Reveal Effect**
  - **Context:** Create animated signature or text reveal that simulates writing from left to right
  - **Implementation:**
    - Use `clip-path: inset(0 100% 0 0)` for initial hidden state (100% of right edge clipped)
    - Animate to `clip-path: inset(0 0 0 0)` for full visibility (nothing clipped)
    - Use cubic-bezier(0.4, 0, 0.2, 1) for smooth easing
    - Duration: 2-2.5s for natural writing appearance
  - **Accessibility:**
    - Respect `prefers-reduced-motion` by detecting `window.matchMedia('(prefers-reduced-motion: reduce)')`
    - Use `useRef` to track animation state and prevent repeated triggers
    - Add `addEventListener('change')` for live preference updates
    - Show full clip-path immediately when reduced motion enabled
  - **Key Code:**
    ```typescript
    const [isAnimating, setIsAnimating] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener('change', handleMotionChange);

      if (!mediaQuery.matches && !hasAnimatedRef.current) {
        const timer = setTimeout(() => {
          setIsAnimating(true);
          hasAnimatedRef.current = true;
        }, delay * 1000);

        return () => {
          clearTimeout(timer);
          mediaQuery.removeEventListener('change', handleMotionChange);
        };
      }

      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    }, [delay]);

    const animationStyle = prefersReducedMotion
      ? {}
      : {
          clipPath: isAnimating ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
          transition: isAnimating ? `clip-path ${duration}s ease` : 'none',
        };
    ```

- **Pattern: Semantic HTML with ARIA for Links**
  - **Context:** Improve accessibility for external links and navigation
  - **Implementation:**
    - Use `<Link>` from next/link for internal navigation (server-side benefits)
    - Use `<a>` with `target="_blank" rel="noopener noreferrer"` for external links
    - Add `aria-label` describing action: `aria-label="Verify certification"`
    - Use semantic nav elements with role attributes where needed
  - **Prevention Example:**
    ```tsx
    // Wrong: <a href="/internal-page"> (causes full page reload)
    // Right: <Link href="/internal-page"> (Next.js client-side navigation)

    // External link with ARIA:
    <a
      href={verificationUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Verify ${name} certification`}
    >
      Verify
    </a>
    ```

- **Pattern: i18n Message Structure with next-intl**
  - **Context:** Support multiple languages (English, Korean) with centralized message management
  - **Implementation:**
    - Create `messages/en.json` and `messages/ko.json` with same key structure
    - Use `useTranslations('SectionName')` hook to access section-specific messages
    - Structure messages by domain: `Certifications`, `Header`, `Footer`, etc.
  - **Example Structure:**
    ```json
    {
      "Certifications": {
        "issued_label": "Issued",
        "verify_label": "Verify →"
      }
    }
    ```
  - **Usage:**
    ```typescript
    const t = useTranslations('Certifications');
    <p>{t('issued_label')}: {formattedDate}</p>
    ```

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

- **Centralized Styles:** Exporting Tailwind strings from `baseStyles.ts` allows build-time optimization and reduces redundant class strings
- **clip-path Animation:** Uses GPU-accelerated CSS property (clip-path) rather than width/opacity, providing smooth 60fps on most devices
- **Reduced Motion Performance:** Disabling animation loops via `prefers-reduced-motion` reduces CPU usage for users with vestibular sensitivity
- **Lazy Image Loading:** CalligraphySignature uses Next.js Image with `priority` flag for critical signature display

### Automation Opportunities

- **Component Generator Template:** Create a scaffold generator for new card-based components that auto-imports from baseStyles.ts
- **Message Key Validation:** Build a linter rule to ensure message keys in `en.json` exist in `ko.json` and vice versa
- **Type Safety for SimpleIcon:** Create a custom hook `useSimpleIcons()` that maps string identifiers to SimpleIcon objects automatically
- **Design System Auditor:** Script to find hardcoded Tailwind classes that should use baseStyles exports
- **Accessibility Checklist:** Pre-commit hook to scan components for missing ARIA labels on links/buttons

---

## Session Learnings - January 22, 2026

### GitHub CLI Workflow Automation

- **Pattern: Batch GitHub Milestone & Issue Creation**
  - **Context:** Creating v5.1 milestone with 9 related issues from design review findings
  - **Workflow Steps:**
    1. Create milestone: `gh milestone create "v5.1 Milestone" -d "Phase 3-5 improvements and bug fixes"`
    2. Get milestone ID: `gh milestone list --json number,title | grep v5.1`
    3. Batch create issues with: `gh issue create --title "..." --body "..." --milestone <id> --label "bug,mobile"`
  - **Benefits:** Reproducible issue creation, batch operations, consistent labeling and metadata
  - **Scalability:** Can create 9+ issues in <30 seconds with script automation

- **Pattern: Structured Issue Templates with Reproduction Steps**
  - **Context:** Design review findings need consistent documentation for implementation
  - **Template Structure:**
    ```markdown
    ## Type: [Bug|Polish|Enhancement]

    ## Affected Breakpoints
    - 375px: [description]
    - 393px: [description]
    - 768px: [description]

    ## Current Behavior
    [What's broken/wrong]

    ## Expected Behavior
    [Per design spec]

    ## Suggested Fix
    [Optional technical guidance]

    ## Screenshots
    [Breakpoint labels: mobile-375, mobile-393, tablet-768, etc.]
    ```
  - **Labels:** Use `bug`, `mobile`, `desktop`, `polish`, `enhancement` for filtering
  - **Priority:** Add `priority:critical`, `priority:high`, `priority:low` for triaging

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
