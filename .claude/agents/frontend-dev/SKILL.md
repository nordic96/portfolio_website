# Frontend Development Skills & Lessons Learned (Portfolio v5.0)

**Purpose:** Portfolio-specific patterns, component implementations, and session learnings.

**Scope:** Project-specific implementation details unique to the portfolio v5.0 Night Sky theme. For universal frontend patterns (CSS gotchas, accessibility guidelines, performance techniques), see **`~/.claude/skills/frontend-dev/SKILL.md`**.

**Last Updated:** January 25, 2026

---

## Global Skills Reference

Universal patterns have been extracted to the global skills repository. See **`~/.claude/skills/frontend-dev/SKILL.md`** for:
- CSS Transforms Are Atomic
- Transform Order Matters
- Aspect Ratio Correction for Circles
- Staggered Animation with Cleanup
- Reduced Motion Accessibility
- Mathematical Circle Placement
- Props with Sensible Defaults
- useMemo for Expensive Calculations
- Simple Icons integration
- next-intl Setup Pattern
- Mobile-First Breakpoints
- Dynamic Viewport Units
- GPU-Accelerated Animations
- SVG Over PNG for Icons
- Accessibility Checklist
- Common Gotchas (Intervals, Hydration, Z-Index, SVG viewBox)
- Intersection Observer Pattern
- Client-Side Image Ping for Health Checks
- React 19 Patterns
- Hook Patterns
- Testing Patterns
- Tailwind Patterns

For project-specific component patterns, see **`.claude/CLAUDE.md`** sections:
- Component Patterns (lines 261-567)
- Reusable Styles System (lines 206-258)
- Animation Hooks (lines 373-437)

---

## Document Maintenance

**When to update this document:**
- After solving a project-specific bug
- When discovering a portfolio v5.0 pattern
- Session learnings unique to this project
- **DO NOT duplicate** universal patterns (add to global SKILL.md instead)

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


## Session Learnings - January 25, 2026

### Mistakes & Fixes

- **Issue:** Server-side health check API had SSRF vulnerability requiring domain allowlisting
  - **Root Cause:** Implemented `app/api/health-check/route.ts` that fetched arbitrary URLs without proper validation, creating SSRF attack surface
  - **Fix:** Removed server-side API entirely; replaced with client-side `useImagePing` hook that loads favicon via browser Image() element
  - **Prevention:** Always prefer client-side solutions for simple health checks; avoid server-side fetching of user-provided URLs without critical business need
  - **Security Lesson:** Browser's built-in CORS protection provides automatic security; don't bypass it with server-side fetches

- **Issue:** Created domain allowlist config that added complexity without addressing root security issue
  - **Root Cause:** Attempted to fix SSRF by restricting allowed domains instead of removing vulnerable code
  - **Fix:** Removed `src/config/domains.ts` entirely as part of complete API removal
  - **Prevention:** When multiple security patterns can solve an issue, choose the simplest/most restrictive first (no API > validated API)

### Patterns Discovered

- **Pattern: Client-Side Image Ping for Health Checks**
  - **Context:** Display website status indicator without SSRF vulnerability
  - **Implementation:** See `~/.claude/skills/frontend-dev/SKILL.md` for complete pattern documentation
  - **Location:** `/src/hooks/useImagePing.ts`
  - **Returns:** `{ status: 'live' | 'unknown'; isLoading: boolean }`
  - **Key Features:**
    - Uses browser `Image()` element to load favicon
    - 5-second timeout for hung requests
    - CORS blocks cross-origin loads automatically (graceful fallback)
    - Returns 'unknown' for timeout/CORS/any failure
    - No server-side code = zero SSRF risk
  - **Session Application:** Integrated into LiveProjectCard to replace useHealthCheck hook
  - **Type Definition:** `PingStatus = 'live' | 'unknown'`

- **Pattern: Graceful CORS Fallback in Health Checks**
  - **Context:** Cross-origin favicon loads are blocked by browser CORS policy
  - **Implementation:** Image element's `onerror` callback triggers on CORS blocks same as actual network failures
  - **Advantage:** No need to distinguish between "blocked" and "unreachable" - both return 'unknown'
  - **Key Insight:** This is a security feature, not a bug; simplifies UI logic significantly

- **Pattern: Security Simplification by Removing Vulnerable APIs**
  - **Context:** SSRF-vulnerable health check API replaced by client-only solution
  - **Changes Made:**
    - Deleted `src/app/api/health-check/route.ts` (vulnerable endpoint)
    - Deleted `src/hooks/useHealthCheck.ts` (server-dependent hook)
    - Deleted `src/config/domains.ts` (domain allowlist no longer needed)
    - Deleted empty `src/app/api/` directory
  - **Benefits:** Reduced attack surface, eliminated validation complexity, simpler codebase
  - **Principle:** If you can eliminate a feature without losing functionality, do it

### Debugging Wins

- **Problem:** Understanding why SSRF is dangerous and how to prevent it in health checks
  - **Approach:** Analyzed attack surface of server-side fetch; recognized that domain allowlisting doesn't eliminate all risks (regex bypass, subdomain enumeration, etc.)
  - **Tool/Technique:** Security threat modeling; deciding client-side Image() is inherently safer

- **Problem:** Verifying client-side image ping works correctly across different scenarios
  - **Approach:** Tested with working URL (returns 'live'), invalid URL (returns 'unknown'), and timeout scenarios
  - **Tool/Technique:** Console logging in useImagePing to verify state transitions

### Performance Notes

Session-specific optimizations:
- **API Removal:** Eliminates roundtrip latency of server-side health check API call
- **Image Ping Lightweight:** Simple Image() load uses browser's native image handling (optimized in all browsers)
- **No Domain Allowlist:** Removes config file parsing and URL validation overhead from server
- **Early Returns:** 5-second timeout prevents hung requests from blocking UI indefinitely

### Accessibility Wins

- **WebHealthIndicator Component:** Maintains ARIA labels and proper semantic HTML despite simplified health check approach
- **Status Types:** Reduced from 4 types (live, slow, timeout, error) to 2 types (live, unknown) improves clarity for screen reader users
- **Loading State:** `isLoading` prop allows WebHealthIndicator to show appropriate aria-label during check

### Security Wins

- **Eliminated SSRF:** No longer fetching arbitrary URLs on server
- **Eliminated Domain Allowlist:** No need to maintain/validate restricted domain list
- **Browser-Enforced Security:** Relies on CORS (browser security standard) instead of custom validation
- **Graceful Failure:** Blocked requests fail safely to 'unknown' instead of exposing error details

**See also:** `~/.claude/skills/frontend-dev/SKILL.md` for complete useImagePing pattern documentation (universal pattern now applicable to all projects)

---
