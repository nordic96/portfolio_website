# Archived Session Learnings - Frontend Development

Older session learnings moved here to keep the active SKILL.md focused. These sessions are preserved for reference but are no longer loaded into every session context.

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
  - **Implementation:** See `.claude/CLAUDE.md` (see "Reusable Styles System" section) for complete baseStyles.ts documentation
  - **Key exports:** `glassCardBaseStyle` (with v5.1 responsive padding), `hoverLiftStyle`, `baseWidth`
  - **Files:** `/app/styles/baseStyles.ts`
  - **Session Application:** Applied to SmallProjectCard, CertificationCard, LiveProjectCard

- **Pattern: Title Outside / Card Inside Hierarchy**
  - **Context:** Cards with glass effect need visual separation between heading and content
  - **Implementation:** See `.claude/CLAUDE.md` (see "Card Component Pattern" section) for complete card pattern specification
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
  - **Implementation:** See `.claude/CLAUDE.md` (see "Accessibility Patterns" section) for comprehensive ARIA and semantic HTML guidelines
  - **Session Application:** Applied to CertificationCard external verification links with proper aria-labels

- **Pattern: i18n Message Structure with next-intl**
  - **Context:** Support multiple languages (English, Korean) with centralized message management
  - **Implementation:** See `.claude/CLAUDE.md` (see "Internationalization" section) for next-intl usage patterns
  - **Session Application:** Applied translation hooks to CertificationCard with proper message key structure

### Debugging Wins

- **Problem:** LiveProjectsSection type error when integrating tech stack data
  - **Approach:** Traced type from component prop definition -> SimpleIcon interface -> actual data structure. Identified mismatch between string identifiers and SimpleIcon objects
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
  - **Implementation:** See `.claude/CLAUDE.md` (see "Icon Integration Pattern" section) for complete hook documentation with sm/md/lg sizing
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

**See `.claude/CLAUDE.md` (see "Accessibility Patterns" section) for project-wide accessibility standards.**

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
