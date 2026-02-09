# UI/UX Design Skills & Lessons Learned (Portfolio v5.0)

**Purpose:** Portfolio-specific design decisions, v5.0 Night Sky theme patterns, and session learnings.

**Scope:** Project-specific design decisions unique to the portfolio v5.0 Night Sky theme. For universal design principles (WCAG guidelines, typography theory, review criteria), see **`~/.claude/skills/ui-ux-designer/SKILL.md`**.

**Last Updated:** February 9, 2026

> Older sessions archived in [SKILL_ARCHIVE.md](./SKILL_ARCHIVE.md)

---

## Global Skills Reference

Universal design patterns have been extracted to the global skills repository. See:
- **`~/.claude/skills/ui-ux-designer/SKILL.md`** for:
  - Visual Hierarchy Checklist
  - Responsive Design Guidelines
  - WCAG Compliance Quick Reference
  - Typography Best Practices (line length, hierarchy theory)
  - Touch Target Minimums
  - Focus States
  - Animation Accessibility
  - Review Grading Criteria
  - Assessment Categories
  - Common Design Issues
  - Opacity Hierarchy for Overlays
  - State Visualization for Async Operations
  - Design Handoff Format
  - Design Review Methodology
  - i18n Design Implications

---

## Design Review Patterns

### Visual Hierarchy Checklist
1. Primary focal point clearly defined
2. Secondary elements support, don't compete
3. White space used intentionally
4. Reading flow guides eye naturally

### Responsive Design Guidelines

| Breakpoint | Width | Primary Consideration |
|------------|-------|----------------------|
| Mobile | < 768px | Touch targets, single column, thumb reach |
| Tablet | 768-1023px | Hybrid interactions, 2-column layouts |
| Desktop | >= 1024px | Hover states, multi-column, precision |

---

## Color & Contrast

### WCAG Compliance Quick Reference

| Content Type | AA Minimum | AAA Target |
|--------------|------------|------------|
| Body text | 4.5:1 | 7:1 |
| Large text (18px+) | 3:1 | 4.5:1 |
| UI components | 3:1 | N/A |

### Portfolio Color Palette Notes (v5.0)
**See `.claude/CLAUDE.md` (Design System section) for complete v5.0 Night Sky color palette specifications.**

---

## Typography Best Practices

### Hierarchy Scale (v5.0 Night Sky)
**See `.claude/CLAUDE.md` (Design System section) for complete v5.0 typography specifications.**

### Line Length
- Optimal: 50-75 characters per line
- Mobile: Allow narrower, prioritize font size

---

## Accessibility Insights

**See `.claude/CLAUDE.md` (Accessibility Patterns section) for comprehensive accessibility guidelines including:**
- ARIA labels and semantic HTML patterns
- Animation and motion accessibility
- Internationalization considerations
- Touch target specifications
- Focus state requirements

---

## Review Grading Criteria

### Grade Scale
| Grade | Score | Meaning |
|-------|-------|---------|
| A | 90-100 | Excellent, minor polish only |
| B | 75-89 | Good, some improvements needed |
| C | 60-74 | Acceptable, significant issues |
| D | < 60 | Needs major rework |

### Assessment Categories
1. **Visual Design** (25%) - Aesthetics, consistency, polish
2. **Usability** (25%) - Intuitive navigation, clear affordances
3. **Accessibility** (20%) - WCAG compliance, inclusive design
4. **Responsiveness** (15%) - Cross-device experience
5. **Performance** (15%) - Load times, animation smoothness

---

## Common Design Issues Found

### Issue 1: Inconsistent Spacing
**Problem:** Random spacing values throughout design
**Solution:** Establish spacing scale (4, 8, 12, 16, 24, 32, 48px)

### Issue 2: Low Contrast Text
**Problem:** Light gray text on white backgrounds
**Solution:** Use `#6B7280` minimum for secondary text

### Issue 3: Cramped Mobile Layouts
**Problem:** Desktop layout squeezed into mobile
**Solution:** Design mobile-first, then expand

---

## Document Maintenance

**When to update this document:**
- After completing a design review
- When discovering effective design patterns
- After accessibility audits reveal issues
- When establishing new design standards

---

## Session Learnings - January 22, 2026

### Design Review Methodology - Comprehensive Breakpoint Testing

- **Breakpoint Audit Pattern**
  - **Context:** Systematic visual review of website across all responsive breakpoints
  - **Breakpoints Used:** 375px (mobile), 393px (mobile-large), 768px (tablet), 1024px (tablet-large), 1440px (desktop)
  - **Tools:** Playwright MCP for consistent screenshot capture at exact viewport sizes
  - **Workflow:**
    1. Set exact viewport to each breakpoint
    2. Capture full-page screenshot
    3. Compare against design specs and previous version
    4. Document component-specific findings
    5. Create categorized issue list (bugs, polish, enhancements)
  - **Key Finding:** Mobile iframe rendering (375px-393px) shows content overflow and icon sizing issues; desktop (1440px) shows layout properly scaled
  - **Documentation:** Screenshots saved with breakpoint label for reference during implementation

### Mistakes & Fixes

- **Issue:** Mobile iframes failing to scale properly on smaller screens (375px-393px)
  - **Root Cause:** 400% scale technique works well on larger screens but causes viewport overflow on mobile
  - **Finding:** This is a technical issue requiring iframe scroll behavior and content clipping strategy
  - **Categorization:** Bug to be addressed in mobile optimization phase

- **Issue:** SmallProjectCard tech stack icons overlap at mobile breakpoints
  - **Root Cause:** Icon sizing (24px) and gap spacing (8px) don't adapt to narrow mobile width
  - **Finding:** Icons need responsive sizing or wrapping strategy for mobile
  - **Categorization:** Bug requiring component refinement for mobile

### Patterns Discovered

- **Pattern: Design Review Checksheet for All Breakpoints**
  - **Context:** Ensuring visual consistency and identifying regressions across device sizes
  - **Checklist Items:**
    - Layout integrity (no overflow, proper spacing)
    - Text readability (font sizes appropriate, contrast maintained)
    - Interactive elements (touch targets 44x44px minimum, proper spacing)
    - Image/iframe scaling (responsive images, embedded content sizing)
    - Color contrast (verify at each breakpoint with WCAG standards)
    - Animation smoothness (parallax, transitions, canvas animations)
  - **Documentation:** Create visual reference guide with screenshots at each breakpoint

- **Pattern: GitHub Issue Templates for Design Findings**
  - **Context:** Structured bug and enhancement reporting from design reviews
  - **Structure:**
    - Title: Component name + Issue type (Bug: ..., Polish: ..., Enhancement: ...)
    - Breakpoints Affected: List specific viewport sizes where issue appears
    - Screenshot References: Include breakpoint tags for identification
    - Visual Impact: Grade severity (Critical, High, Medium, Low)
    - Current Behavior: What's currently displayed
    - Expected Behavior: What should display per design spec
    - Suggested Fix: Optional implementation guidance
  - **Categorization:** Separate issues by component and breakpoint for clarity

- **Pattern: Milestone-Based Issue Organization for Release Planning**
  - **Context:** Organizing multiple design findings into release milestone
  - **Structure:**
    - Milestone name: "v5.1 Milestone" or "Jan 22 Design Polish"
    - Epic grouping: Section Animations, Spotify Integration, GitHub Activity, etc.
    - Related issues: Group by priority and implementation phase
    - Blocking relationships: Identify dependencies between issues
  - **Rationale:** Enables clear release planning and developer prioritization
  - **Tool:** GitHub CLI for batch creation (see frontend patterns for automation)

### Design Quality Assurance Insights

- **Issue Categorization Framework**
  - **Bugs:** Functionality broken or not working as designed (iframe crashes, rendering errors)
  - **Polish:** Visual refinement and consistency (spacing, sizing, animation timing)
  - **Enhancements:** New features or improvements (loading states, additional animations)
  - **Blockers:** Items that must be fixed before release (crashes, severe layout issues)

- **Breakpoint-Specific Issues**
  - Mobile (375px-393px): Often shows overflow/scaling problems, icon sizing conflicts
  - Tablet (768px): May show transition artifacts or spacing anomalies
  - Desktop (1024px-1440px): Usually works well; focus on hover states and interactions

- **Design System Validation**
  - Verify `glassCardBaseStyle` consistency at all breakpoints
  - Confirm `hoverLiftStyle` animation smoothness across devices
  - Check `baseWidth` responsive behavior matches design intent
  - Validate color contrast at all breakpoint sizes

### Accessibility Review Findings

- Canvas-based animations require viewport-specific testing (some mobile browsers may have lower FPS)
- Icon scaling affects touch target size on mobile; verify minimum 44x44px remains
- iframe content scaling (400% → 25%) may affect text readability on mobile; test actual content

### Documentation Improvements

- Add explicit breakpoint testing to design review checklist
- Create issue template that includes "Affected Breakpoints" field
- Document GitHub CLI patterns for batch issue creation workflow

### Design Review & Milestones

- **v5.1 Milestone Created** with 9 issues covering mobile optimization, bug fixes, and polish
- **Comprehensive Breakpoint Analysis** across 5 critical viewports (375px, 393px, 768px, 1024px, 1440px)
- **Overall Grade: B (78/100)** - Good foundation with improvement opportunities in mobile experience

### Mistakes & Fixes

- **Issue:** iFrame component renders at full scale on mobile, crashes browser memory
  - **Root Cause:** Design didn't account for mobile resource constraints; desktop iframe at 100% too heavy
  - **Fix:** Implement mobile fallback using static screenshot with `useBreakpoint` detection
  - **Prevention:** During design specs, always specify mobile optimization strategy for heavy components

- **Issue:** SmallProjectCard tech stack icons rendered inconsistently across components
  - **Root Cause:** Different sizing and styling applied per component rather than centralized
  - **Fix:** Created `useSimpleIcons` hook with standardized responsive sizing (sm/md/lg)
  - **Prevention:** Define reusable component patterns in design system before handoff; specify exact icon sizes and spacing

- **Issue:** Loading state not designed for global loading page
  - **Root Cause:** Focused on happy path; didn't design for intermediate states
  - **Fix:** Added CalligraphySignature + animated loading bar to `loading.tsx`
  - **Prevention:** Design state machines for all async operations (idle, loading, success, error)

### Patterns Discovered

- **Pattern: Breakpoint-Based Component Complexity Management**
  - **Context:** Heavy components need different rendering strategies per viewport
  - **Design Strategy:** See `.claude/CLAUDE.md` (Responsive Breakpoints section) for project-wide breakpoint standards
  - **Session Application:** Designed mobile fallback strategy for Issue #460 (iFrame mobile crashes)
  - **Key Design Insight:** Always specify what to show on each breakpoint during handoff - design for degradation, not just augmentation

- **Pattern: Async State Design System**
  - **Context:** Components with data loading need visual feedback
  - **Four-State Design:**
    - **Idle:** Before user interaction (optional minimal indicator)
    - **Loading:** Data in-flight (spinner + status text)
    - **Success:** Data loaded (content revealed with fade-in)
    - **Error:** Failed to load (error icon + explanatory message)
  - **Visual Grammar:**
    - Loading: Animated circular spinner, centered in container
    - Success: 300ms fade-in transition, smooth reveal
    - Error: Neutral color icon (not red for critical), clear explanation text
  - **When to apply:** All async components (iframes, API calls, heavy computations)

- **Pattern: Touch Target Accessibility in Detailed UI**
  - **Context:** Desktop-designed components have small touch targets for mobile
  - **Guidelines:** See `.claude/CLAUDE.md` (Accessibility section) for WCAG AA touch target standards
  - **Session Validation:** Verified 44x44px minimum on Issue #457 (Footer Polish)
  - **Verification Method:** Tested at 375px viewport without zoom

- **Pattern: Loading State Design for Portfolio Sections**
  - **Context:** Global loading page for initial page load
  - **Design Components:**
    - Signature/logo animation (clip-path reveal)
    - Loading progress bar (animated linear progress)
    - Subtle background (gradient or static)
  - **Duration:** Keep loading state simple and fast (< 500ms for most users)
  - **UX Principle:** Show elegant branding while loading, not generic spinner

- **Pattern: Icon Sizing Responsiveness**
  - **Context:** Tech stack and social icons need viewport-specific sizing
  - **Implementation:** See `.claude/CLAUDE.md` (Component Patterns - Icon Integration Pattern) for complete `useSimpleIcons` documentation with sm/md/lg sizing
  - **Session Validation:** Confirmed 8px gaps between icons maintain visual rhythm across breakpoints

### Debugging Wins

- **Problem:** Determining optimal breakpoints for mobile fallback
  - **Approach:** Analyzed actual mobile viewport sizes (375px iPhone SE, 393px Pixel 6, etc.)
  - **Tool/Technique:** Playwright screenshot capture at multiple viewports to identify breaking points

- **Problem:** Understanding what should trigger mobile-specific rendering
  - **Approach:** Tested iFrame memory usage at different viewport sizes; identified 768px as critical threshold
  - **Tool/Technique:** Browser DevTools memory profiler to assess component footprint at each breakpoint

- **Problem:** Ensuring loading state is elegant and on-brand
  - **Approach:** Reviewed portfolio brand guidelines; incorporated CalligraphySignature as loading indicator
  - **Tool/Technique:** Visual comparison of loading designs against brand identity

### Design Review Metrics (v5.1)

**Assessment by Category (Out of 100):**
- Visual Design: 82/100 (Colors, spacing, hierarchy excellent; some polish needed)
- Usability: 75/100 (Navigation clear; mobile CTA placement needs refinement)
- Accessibility: 80/100 (WCAG AA mostly met; touch targets validated)
- Responsiveness: 75/100 (Desktop excellent; mobile experience has optimization opportunities)
- Performance: 78/100 (StarField optimized; mobile iFrame needs fallback)

**Key Findings:**
- iPhone frame design highly realistic and engaging
- StarField animation performs well across devices
- Mobile breakpoints show scaling issues on small screens (375px)
- Touch target sizes generally meet WCAG AA minimum (44x44px)
- Color contrast adequate for dark theme

**Recommendations for v5.2:**
1. Optimize heading sizes for mobile (currently too large at 375px)
2. Increase whitespace in card layouts on tablet
3. Test modal/popup performance on older mobile devices
4. Refine footer layout for small screens

### Automation Opportunities (Jan 22 - v5.1)

- **Visual Regression:** Automated breakpoint testing (375/393/768/1024/1440px)
- **Accessibility Bot:** Pre-handoff scan for touch targets, contrast, unlabeled icons
- **State Validator:** Ensure async components have all 4 states designed
- **Icon Size Checker:** Verify sm/md/lg consistency across designs
- **Performance Annotator:** Flag heavy components needing mobile strategy in design specs

---

## Session Learnings - January 23, 2026

### Design Validation Patterns

- **Pattern: Responsive Typography & Spacing Specifications**
  - **Context:** Designers must specify responsive behavior across mobile/tablet/desktop
  - **See `.claude/CLAUDE.md` for:**
    - Complete 3-tier responsive typography system (see "Responsive Typography System" section)
    - Responsive spacing patterns in baseStyles (see "Reusable Styles System" section)
    - Icon sizing matrix with sm/md/lg/xl variants (see "Icon Integration Pattern" section)
  - **Design Handoff Checklist:**
    - Create Figma artboards at 375px, 768px, 1440px
    - Label exact type sizes per breakpoint
    - Specify padding/gap responsive values (e.g., "p-3 md:p-4 lg:p-6")
    - Document icon size variants (sm/md/lg/xl) for each context
  - **Key Principle:** Provide explicit responsive specifications to prevent developer guesswork

### Mistakes & Fixes

- **Issue:** Icon sizing specs not provided to frontend developers
  - **Root Cause:** Design handed off with example sizes but no standardized naming or breakpoint variants
  - **Fix:** Created explicit sizing matrix (sm/md/lg/xl) in design system documentation
  - **Prevention:** Always provide icon size specifications with breakpoint variants in design handoff

- **Issue:** Responsive padding values inconsistent across components
  - **Root Cause:** Each component designed independently without coordinating base spacing system
  - **Fix:** Standardized on `p-3 md:p-4 lg:p-6` pattern for all cards
  - **Prevention:** Define responsive spacing system before component design; apply consistently to all

- **Issue:** Arbitrary Tailwind sizes (w-[20px]) suggested instead of standard classes
  - **Root Cause:** Frontend created custom values when standard 4-multiple values could work
  - **Fix:** Updated design system to require standard Tailwind (w-5 = 20px) for all responsive values
  - **Prevention:** During handoff, educate frontend on Tailwind value constraints; specify sizes that align with 4-unit grid

### Patterns Discovered

- **Pattern: Scroll-Triggered Animation Specification**
  - **Context:** Sections reveal content on scroll with staggered timing
  - **See `.claude/CLAUDE.md`** (see "Animation Hooks" section) for complete implementation of:
    - `useStaggeredAnimation` hook (500ms default delay, configurable)
    - `useSectionAnimation` hook (simple fade-in)
    - Accessibility support (prefers-reduced-motion)
  - **Design Handoff Requirements:**
    - Specify animation type (staggered vs. simple fade)
    - Provide timing values (delay between items, duration)
    - Indicate which sections use which hook
  - **Key Principle:** Designers specify behavior; implementation uses standard hooks from CLAUDE.md

- **Pattern: Loading State Design System**
  - **Context:** Components with async operations need designed loading, error, and success states
  - **Four-State Design System:**
    ```
    Idle: Before interaction (optional subtle indicator)
    Loading: Spinner + status text (500-2000ms typical)
    Success: Content fade-in (300ms smooth reveal)
    Error: Icon + message (persistent until retry)
    ```
  - **Applied to:** Global loading page, iframe loading state
  - **Design Specification:** Show all four states visually in Figma
  - **Color Usage:** Success = green accent; Error = orange/neutral (not red for eye strain)
  - **Accessibility:** Ensure spinner has aria-label; error message is descriptive

- **Pattern: Breakpoint-Specific Component Variants in Handoff**
  - **Context:** Some components need different visual treatment at different breakpoints
  - **Specification Method:**
    - Create separate Figma frames for each critical breakpoint (375px, 768px, 1440px)
    - Label each frame clearly: "Mobile", "Tablet", "Desktop"
    - Show responsive changes explicitly (e.g., icon size change, text reflow)
    - Annotate where layout differs significantly
  - **Handoff Document:** Include screenshot showing all three variants side-by-side
  - **Developer Guidance:** Specify which components change layout vs. which scale uniformly

### Design System Improvements

- **Updated Icon Sizing Guidance** (see `.claude/CLAUDE.md` Component Patterns for implementation)
  - Established sm/md/lg/xl sizing tiers
  - Documented responsive variants per component type
  - Provided hook specification for consistent rendering

- **Responsive Spacing Matrix** (see `.claude/CLAUDE.md` Reusable Styles System)
  - Standardized card padding: `p-3 md:p-4 lg:p-6`
  - Section gaps: `gap-2 md:gap-3 lg:gap-4`
  - Ensures visual consistency across all breakpoints

- **Typography Breakpoint Coverage**
  - Mobile base sizing defined
  - Tablet (md: 768px) expansion specified
  - Desktop (lg: 1024px) final sizing locked

### Debugging Wins

- **Problem:** Understanding why icons appeared inconsistent across breakpoints
  - **Approach:** Reviewed useSimpleIcons implementation; identified missing responsive size variants
  - **Tool/Technique:** Figma comparison at multiple breakpoints + frontend code inspection

- **Problem:** Determining when component layout should change vs. scale
  - **Approach:** Tested at actual breakpoints (375px vs 1440px); documented which elements reflow vs. stay proportional
  - **Tool/Technique:** Playwright viewport testing at each breakpoint with screenshots

- **Problem:** Verifying animation timing felt natural
  - **Approach:** Tested staggered animation at different delays (50ms, 100ms, 150ms); 100ms felt most natural
  - **Tool/Technique:** Live testing at localhost:3000; recorded video comparison

### Documentation Improvements

**All responsive patterns now documented in `.claude/CLAUDE.md` (single source of truth):**
- 3-tier responsive typography system (mobile/tablet/desktop)
- Icon sizing matrix (sm/md/lg/xl) with `useSimpleIcons` hook
- Spacing system with responsive baseStyles
- Animation hooks (useStaggeredAnimation, useSectionAnimation)
- Breakpoint handoff format (Figma frames at 375px/768px/1440px)

### Accessibility Enhancements

- **Icon Accessibility:** sm/md/lg sizing maintains 44x44px touch target minimum at all breakpoints
- **Animation Accessibility:** All scroll-triggered animations respect prefers-reduced-motion
- **Loading States:** Spinner and error messages have proper aria-labels for screen readers
- **Text Contrast:** Responsive sizing maintains WCAG AA contrast across all breakpoints

### Automation Opportunities (Jan 23 - v5.1 completion)

- **Design System Audit:** Verify all components use responsive variants (p-3/md:p-4/lg:p-6 pattern)
- **Icon Size Consistency:** Scan Figma designs for non-standard icon sizes; suggest sm/md/lg mapping
- **Typography Validator:** Ensure all text has 3-tier responsive definition (mobile/tablet/desktop)
- **Breakpoint Screenshot:** Auto-generate Figma exports at 375px, 768px, 1440px
- **Animation Spec Checker:** Verify all animations have timing, delay, and reduced-motion rules
- **Spacing Audit:** Find hardcoded spacing values; suggest standardized variants

---

## Session Learnings - February 1, 2026

### Design Patterns Discovered

- **Pattern: Real-Time Status Indicator UI Design**
  - **Context:** Displaying user activity status based on time-of-day without disrupting page layout
  - **Implementation Approach:**
    - Compact, circular status indicator (28-32px diameter recommended)
    - Position near profile name or in hero section corner
    - Animated status (GIF) for motion-enabled users
    - Static fallback (PNG) for reduced-motion preference
    - Emoji fallback for accessibility and robustness
  - **Status Types:** Sleeping (😴), Coding (💻), Eating (🍽️), Break (☕)
  - **Timing Zones (SGT/UTC+8):**
    - Sleeping: 00:00-06:59 (7 hours)
    - Eating: 12:00-13:00 (lunch), 19:00-20:00 (dinner)
    - Coding: 09:00-18:00 (business hours, excluding lunch)
    - Break: All other hours
  - **Design Considerations:**
    - Animation quality: GIF should be smooth (no jank), clean design
    - Color scheme: Match brand palette; emoji provides color fallback
    - Accessibility: Include text label on hover or nearby (aria-label)
    - Real-time: Updates every 60 seconds to show current status

- **Pattern: Multi-Format Asset Fallback for Animation**
  - **Context:** Supporting animated GIFs with automatic degradation for accessibility
  - **Asset Requirements:**
    - GIF (animated): Primary asset for motion-enabled users
    - PNG (static): Fallback for reduced-motion users or GIF failures
    - Emoji: Ultimate fallback if both files missing or fail to load
  - **Design Phase Considerations:**
    - Create GIF animations that are clear at small sizes (28x28px minimum)
    - PNG fallback should represent a "mid-frame" or average state
    - Emoji provides non-visual backup (no design assets needed)
  - **Implementation:** Handled by component, but designer must provide both GIF and PNG

### Mistakes & Fixes

- **Issue:** Designed status indicator with only animated GIF, no static fallback
  - **Root Cause:** Assumed all users have motion enabled and image loading works
  - **Fix:** Provided both GIF and PNG versions of each status indicator
  - **Prevention:** Always design animated UI with multiple fallback formats; consider accessibility from design phase

### Design Review Insights

- **Status Indicator Placement:** Works best in hero/header area where user attention naturally goes
- **Emoji Effectiveness:** Emoji fallback surprisingly effective for status communication (users recognize intent immediately)
- **Real-Time Feel:** 60-second update interval feels natural; updates every second would be jarring

### Accessibility Enhancements Validated

Session validated accessibility patterns for status display:
- **Color Independence:** Emoji provides non-color status indication
- **Motion Preference:** GIF skipped entirely when reduced-motion is enabled
- **Semantic HTML:** role="img" and aria-label on both Image and emoji components
- **Graceful Degradation:** Multi-level fallback ensures status always displays

### Automation Opportunities (Feb 1)

- **Status Asset Generator:** Script to create GIF/PNG pair from single animation source
- **Fallback Chain Validator:** Verify all STATUS_ASSETS have both GIF and PNG files in build
- **Accessibility Audit:** Check that all status-like components have aria-labels
- **Emoji Consistency:** Verify emoji choices match design intent across all status types

---
