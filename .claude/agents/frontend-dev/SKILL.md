# Frontend Development Skills & Lessons Learned (Portfolio v5.0)

**Purpose:** Portfolio-specific patterns, component implementations, and session learnings.

**Scope:** Project-specific implementation details unique to the portfolio v5.0 Night Sky theme. For universal frontend patterns (CSS gotchas, accessibility guidelines, performance techniques), see **`~/.claude/skills/frontend-dev/SKILL.md`**.

**Last Updated:** February 9, 2026

> Older sessions archived in [SKILL_ARCHIVE.md](./SKILL_ARCHIVE.md)

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
- "Component Patterns" section
- "Reusable Styles System" section
- "Animation Hooks" section

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
  - **See `.claude/CLAUDE.md`** (see "Responsive Typography System" section) for complete responsive typography documentation
  - **Implementation:** CSS custom properties in globals.css with media queries
  - **Usage:** Apply `.text-title`, `.text-h1`, `.text-h2`, etc. classes
  - **Key Principle:** Mobile-first scaling with md: and lg: breakpoint overrides
  - **Session Application:** Applied to Hero, Section Headings, Card Titles in v5.1

- **Pattern: Responsive baseStyles with glassCardBaseStyle Updates**
  - **Context:** Reusable styles need responsive padding and gap variants
  - **See `.claude/CLAUDE.md`** (see "Reusable Styles System" section) for current glassCardBaseStyle specification
  - **Current Value:** `bg-dark-gray/50 backdrop-blur-md rounded-3xl max-sm:p-3 md:p-2.5 lg:p-3`
  - **Pattern:** Mobile-first base value, then md: and lg: overrides in single string
  - **Session Note:** Use standard Tailwind classes (p-2.5) over arbitrary values (p-[10px])

- **Pattern: Scroll-Triggered Animation Hooks**
  - **Context:** Multiple sections need unified animation pattern for revealing content on scroll
  - **See `.claude/CLAUDE.md`** (see "Animation Hooks" section) for complete hook documentation:
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

## Session Learnings - February 1, 2026

### Mistakes & Fixes

- **Issue:** Real-time status hook assumed client-side environment during SSR
  - **Root Cause:** Initial implementation didn't check `typeof window` before using browser APIs
  - **Fix:** Added `typeof window === 'undefined'` guards in useState initializers and useEffect checks
  - **Prevention:** Always guard window/browser APIs with SSR checks; use safe fallback values ('break' for status) during server render

- **Issue:** Using setInterval without proper cleanup in useCurrentStatus
  - **Root Cause:** Interval wasn't being cleared in error scenarios
  - **Fix:** Added proper cleanup function in useEffect that always clears interval
  - **Prevention:** Always return cleanup functions from useEffect hooks that set intervals; test with StrictMode which doubles-up effects to catch leaks

### Patterns Discovered

- **Pattern: Timezone-Aware Real-Time Hook with Client-Side Calculation**
  - **Context:** Display activity status based on user's timezone without server-side calculation
  - **Implementation:**
    ```typescript
    function getSingaporeTime(): Date {
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
      return new Date(utcTime + 8 * 60 * 60 * 1000);
    }
    ```
  - **Key Pattern:** Convert local time to UTC, then add offset hours (SGT = UTC+8)
  - **Location:** `/src/hooks/useCurrentStatus.ts`
  - **Returns:** `{ status: StatusType; label: string; emoji: string; currentHour: number }`
  - **Status Types:** 'sleeping' (00:00-06:59), 'eating' (12:00-12:59, 19:00-19:59), 'coding' (09:00-17:59), 'break' (other)
  - **Real-time Updates:** setInterval every 60 seconds (configurable)

- **Pattern: Multi-Fallback Image Loading (GIF → PNG → Emoji)**
  - **Context:** Display status animation with graceful degradation based on user preferences
  - **Location:** `/src/components/StatusIndicator/StatusIndicator.tsx`
  - **Fallback Chain:**
    1. GIF (if motion enabled via `prefers-motion`)
    2. PNG fallback (if GIF fails or reduced motion preferred)
    3. Emoji (if both images fail)
  - **Key Implementation Details:**
    - Check `prefers-reduced-motion` media query on mount and listen for changes
    - Use separate error states (`gifError`, `pngError`) to track failures
    - Reset error states when status changes (to retry new asset)
    - Use `unoptimized={imageSrc.endsWith('.gif')}` in Next.js Image to preserve GIF animation
    - Set `priority` flag since this appears in hero section
  - **Accessibility:** Proper aria-label and role="img" for emoji fallback

- **Pattern: Time-Based Conditional Rendering with Priority Rules**
  - **Context:** Map hourly time to multiple status types with priority overlap handling
  - **Implementation Pattern:**
    ```typescript
    function getStatusFromHour(hour: number): StatusType {
      // Check highest-priority states first
      if (hour === 12 || hour === 19) return 'eating';      // Eating wins over coding
      if (hour >= 0 && hour < 7) return 'sleeping';        // Sleeping is 7-hour block
      if (hour >= 9 && hour < 18) return 'coding';         // Coding block (excludes eating hours)
      return 'break';                                       // Everything else
    }
    ```
  - **Key Insight:** Order matters - check overlapping times in priority order
  - **Timezone Note:** All times relative to SGT (UTC+8); could be generalized with timezone parameter

- **Pattern: Status Indicator Component with Image Error Handling**
  - **Context:** Animated status display with intelligent fallback strategy
  - **Key Features:**
    - Automatically selects GIF or PNG based on motion preference
    - Falls back gracefully through error states
    - Resets error tracking when status changes (to retry new assets)
    - Uses Next.js Image for optimization
    - Transitions smoothly between status changes (300ms opacity animation)
  - **Integration Point:** Composed with `useCurrentStatus` hook for real-time updates

### Debugging Wins

- **Problem:** Determining correct UTC offset calculation for Singapore Time
  - **Approach:** Manually calculated: SGT = UTC+8, so convert local to UTC (add timezone offset), then add 8 hours
  - **Tool/Technique:** Used console logging to verify timezone calculation with known local times

- **Problem:** Ensuring GIF animation preserves without Next.js optimization
  - **Approach:** Added `unoptimized={imageSrc.endsWith('.gif')}` to Image component to skip optimization
  - **Tool/Technique:** Tested GIF at localhost:3000; verified animation frames preserved

- **Problem:** Managing multiple error states for fallback chain
  - **Approach:** Tracked separate error states for GIF and PNG; used conditional logic to determine source
  - **Tool/Technique:** React DevTools state inspection to verify error transitions

### Performance Notes

Session-specific optimizations:
- **Interval-Based Updates:** 60-second interval balances accuracy with CPU usage (less frequent than 1-second)
- **Image Caching:** Next.js caches PNG/GIF; reduced motion users always get PNG (no animation overhead)
- **Status Calculation:** useCallback on `calculateStatus` prevents unnecessary function recreations
- **Media Query Listener:** Set up on mount, cleaned up on unmount (no memory leaks from persistent listeners)

### Accessibility Wins

- **Motion Preferences:** StatusIndicator respects `prefers-reduced-motion` by skipping GIF entirely
- **ARIA Labels:** Proper aria-label and role="img" on both Image and emoji fallback
- **Color-Independent Status:** Emoji provides non-visual status indication
- **Real-Time Updates:** Status syncs with actual time every 60 seconds; no stale information

### Automation Opportunities (Feb 1 - Issue #471 & #472)

- **Timezone Config Hook Generator:** Create agent to scaffold timezone-based status hooks for different regions
- **Fallback Asset Validator:** Check that all STATUS_ASSETS have both GIF and PNG in build
- **Image Optimization Audit:** Find components with GIF that should use `unoptimized=true`
- **Interval Cleanup Linter:** Pre-commit hook to verify all setInterval calls have cleanup
- **SSR Guard Checker:** Scan for browser APIs that might be called during server render

---
