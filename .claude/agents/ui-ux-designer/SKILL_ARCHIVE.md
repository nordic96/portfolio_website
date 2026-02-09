# Archived Session Learnings - UI/UX Design

Older session learnings moved here to keep the active SKILL.md focused. These sessions are preserved for reference but are no longer loaded into every session context.

---

## Session Learnings - January 20, 2026

### Mistakes & Fixes

- **Issue:** Figma specification unclear on Live Projects Section info placement (title, tech stack, description)
  - **Root Cause:** Verbal spec was ambiguous - designer didn't explicitly state info should be outside frame
  - **Fix:** Used Figma screenshot analysis to clarify: info belongs outside/below iPhone frame, not inside it
  - **Prevention:** Always provide explicit Figma mockup images during handoff. Include callouts/annotations for ambiguous areas. Verbal specs are insufficient for complex layouts

- **Issue:** Gradient overlay on iPhone preview was too dark/opaque
  - **Root Cause:** Initial spec used 100% opacity overlay, which obscured preview content
  - **Fix:** Reduced to 30% opacity for subtle effect that provides visual depth without obscuring content
  - **Prevention:** Start with conservative opacity values for overlays. Test at multiple levels (10%, 30%, 50%, 100%) to find sweet spot

### Patterns Discovered

- **Pattern: Figma Analysis Workflow for Design Validation**
  - **Context:** Preventing misalignment between design and implementation
  - **Implementation:**
    - Request Figma screenshots/exports of specific sections
    - Use visual comparison tools to analyze design details
    - Identify potential ambiguities in spec before handoff
    - Create detailed annotations for complex layouts
    - Include pixel-level measurements and spacing references
  - **Key Insight:** Visual artifacts (screenshots) are more reliable than verbal descriptions for layout specifications

- **Pattern: Multi-Layer iPhone Frame Design**
  - **Context:** Creating realistic device mockups while maintaining performance
  - **Design Structure:**
    - Layer 1: iPhone physical frame (bezel, buttons, notch)
    - Layer 2: Live content (iframe with website preview)
    - Layer 3: Subtle overlay (gradient for depth/polish)
    - Layer 4: External info (title, tech stack, description below frame)
  - **Benefits:** Clear separation of concerns, allows independent iteration of each layer
  - **Implementation note:** Front-end should position info outside frame using flexbox, not grid absolute positioning

- **Pattern: Opacity Hierarchy for Overlays**
  - **Context:** Using overlays to add visual depth without obscuring content
  - **Guidelines:**
    - 10-20% opacity: Very subtle, barely noticeable
    - 20-40% opacity: Light overlay, good for photo vignettes or subtle depth
    - 40-60% opacity: Medium overlay, provides clear visual distinction
    - 60%+ opacity: Strong overlay, primarily for focus/highlight effects
  - **For Project Previews:** 30% is ideal sweet spot - adds depth without obscuring the preview content

- **Pattern: State Visualization for Async Operations**
  - **Context:** Designing for loading states in live preview components
  - **States to Design:**
    - Idle: Content not yet requested (optional loading bar)
    - Loading: Show spinner + status text ("Loading preview...")
    - Loaded: Fade in content, hide loading indicator
    - Error: Show error icon + message ("Preview unavailable")
  - **Visual Implementation:**
    - Loading spinner: animated circular indicator
    - Error state: clear icon + explanatory text in neutral color
    - Transitions: use fade-in transitions (300-500ms) between states

### Debugging Wins

- **Problem:** Understanding exact placement of project info in iPhone frame mockup
  - **Approach:** Requested Figma screenshot, analyzed visual positioning relative to frame, compared to implementation
  - **Tool/Technique:** Visual diff analysis of Figma export vs. rendered HTML

- **Problem:** Determining appropriate overlay opacity for iPhone frame
  - **Approach:** Tested visually at different opacity levels, validated against design intent (add depth without obscuring)
  - **Tool/Technique:** Figma design review with opacity comparison

### Design Review Insights - v5 Night Sky Theme

- **StarField Background:** Canvas-based animation approach is ideal - provides smooth, performant twinkling without layout thrashing
- **Color Palette Integration:** Night sky gradient (#855988 -> #070B34) provides excellent contrast for white text and accent colors
- **iPhone Frame Realism:** Detailed bezel design with Dynamic Island and home indicator adds product-like authenticity
- **Live Preview Pattern:** Lazy-loading iframes + 400% scale technique balances performance and content visibility

### Accessibility Validation

**See `.claude/CLAUDE.md` (see "Accessibility Patterns" section) for comprehensive accessibility guidelines including ARIA patterns, motion preferences, and touch targets.**

Session-specific findings:
- **Canvas Content:** StarField correctly uses `aria-hidden="true"` since it's decorative
- **Overlay Opacity:** At 30%, gradient overlay maintains sufficient contrast for any white text overlays
- **Loading Indicators:** Spinner + text provides both visual and text-based feedback for async states
- **iPhone Frame:** Pure CSS design requires no additional a11y attributes since it's non-interactive decoration

---

## Session Learnings - January 21, 2026

### Design Patterns Validated

- **Glass Card Components Pattern**
  - **Context:** Establishing consistent visual language for compact cards throughout the dashboard
  - **Design Details:**
    - Base style: Dark semi-transparent background (bg-dark-gray/50) with backdrop blur effect
    - Round corners: `rounded-3xl` for soft, modern appearance
    - Hover behavior: Subtle lift animation (`-translate-y-2`) to provide interaction feedback
    - Padding: Consistent `p-3` internal spacing for card content
  - **Visual Hierarchy:** Card titles placed OUTSIDE and ABOVE glass container, creating visual separation between heading and content container
  - **When to use:** SmallProjectCard, CertificationCard, metadata sections, tech stack displays
  - **Key design principle:** Glass effect provides visual depth on dark background while maintaining content legibility

- **Icon Implementation Strategy**
  - **Tech Logos:** Use SimpleIcon library (2800+ brand logos) with SVG rendering via `dangerouslySetInnerHTML`
  - **Sizing:** 24x24px for small displays, 32x32px for feature sections
  - **Spacing:** Consistent 8px gaps between icon groups for visual rhythm
  - **Color:** Keep native icon colors when possible for brand recognition; desaturate only if design requires
  - **Accessibility:** Icons that convey meaning need alt text; decorative icons get `aria-hidden="true"`

- **Button & Action Element Design**
  - **Primary Buttons:** Use glass card styling with icon support for consistent interaction surface
  - **Link Styling:** Distinguish links from buttons using underline + chevron (`->` or Material UI icon)
  - **Target Size:** Minimum 44x44px for touch targets on mobile; 48x48px recommended
  - **Hover States:** Glass cards use lift effect; links use color shift or underline animation

- **Text Animation & Motion**
  - **Signature Reveal (clip-path):** Simulates natural handwriting from left to right
  - **Duration:** 2-2.5 seconds for natural appearance (too fast looks jerky, too slow feels delayed)
  - **Easing:** Use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural deceleration
  - **Accessibility:** Always provide `prefers-reduced-motion` fallback showing full text immediately
  - **When to use:** Signature elements, section reveals, emphasis animations

### Design Specifications Established

- **SmallProjectCard Specifications**
  - Container: Glass card effect with hover lift
  - Content Layout: Icon + title + description stacked vertically
  - Responsive: Full width on mobile, constrained width on desktop (max-w-360)
  - Title: h3 semantic tag, placed outside glass container
  - Badges/Tags: Display tech stack inline with wrapping support

- **CertificationCard Specifications**
  - Container: Glass card effect with metadata section inside
  - Icon Section: Circular badge showing certification provider/type
  - Text Layout: Name, issuer, date displayed in hierarchy
  - Verification Link: External link with ARIA label and target="_blank"
  - Title: h3 placed outside container, uppercase styling
  - Responsive: Reflows to single column on mobile

- **CalligraphySignature Specifications**
  - Animation: clip-path reveal from left to right (0 -> 100% visible)
  - Timing: Configurable delay before starting, 2s animation duration
  - Reduced Motion: Shows full signature immediately when user preference detected
  - Image: Optimized SVG or PNG with transparent background
  - Placement: Hero section footer or about section accent

- **Button Design Specifications**
  - Base Style: Glass card with consistent padding
  - Icon Support: Simple icon rendering next to text
  - Hover: Lift effect from hover animation
  - Active State: Slight scale reduction (0.98) for press feedback
  - Text: Use semantic typography (text-base for normal, text-sm for compact)
  - Accessibility: Always include aria-label for icon-only buttons

### Design System Consolidation

**See `.claude/CLAUDE.md` for complete design system specifications:**
- Reusable Styles System (`/app/styles/baseStyles.ts`) - includes glassCardBaseStyle with v5.1 responsive padding
- Color Palette (Night Sky Theme)
- Typography specifications (3-tier responsive system)
- Component Patterns (card structure, icons, overlays)
- Animation Hooks (useStaggeredAnimation, useSectionAnimation)

Session-specific design decisions:
- **Glass Card Pattern:** Validated title-outside-container approach with `glassCardBaseStyle`
- **Icon Sizing:** Standardized sm/md/lg sizing via `useSimpleIcons` hook
- **Color Application:** Confirmed accent colors reserved for highlights, not structural elements

### Accessibility Enhancements Validated

Session validated accessibility patterns from CLAUDE.md in CalligraphySignature and CertificationCard components (see CLAUDE.md "Accessibility Patterns" section for full guidelines).

### Internationalization (i18n) Design Implications

- **Text Length Variability:** German/Korean text often 30-50% longer than English
  - Design with text expansion in mind
  - Use flexible containers that reflow rather than truncate
  - Test all languages at full viewport width and mobile

- **Icon + Text Combinations:** Ensure sufficient spacing for all languages
  - Button text with icon: Minimum 8px gap between icon and text
  - Card titles: Accommodate 2-line headings in narrow columns

- **Date/Number Formatting:** Varies by locale
  - Use `next-intl` for automatic locale-specific formatting
  - Example: "1/21/2026" (en-US) vs "21.01.2026" (de-DE) vs "2026.01.21" (ko-KR)
  - Never hardcode date formats

### Performance Considerations for Designers

- **Canvas Animations:** Preferred for complex animated backgrounds (starfield, particle effects)
  - Renders outside DOM, no layout thrashing
  - Can animate 100+ elements smoothly
  - Accessibility: Always use `aria-hidden="true"` on canvas elements

- **CSS Transforms:** For UI animations (hover effects, transitions)
  - Use transform/opacity for best performance (GPU-accelerated)
  - Avoid width/height/left/right/top animations (cause layout recalculation)
  - Always combine multiple transforms in single `transform` property

- **Image Optimization:**
  - Use Next.js Image component with `priority` flag for above-fold content
  - Lazy-load images below the fold
  - Provide srcset for responsive images

### Common Design Issues to Prevent

1. **Inconsistent Glass Card Implementation**
   - Solution: Always import and use `glassCardBaseStyle` from baseStyles.ts
   - Verify: Check that all cards have matching blur, opacity, and rounded corners

2. **Title Placement Confusion**
   - Solution: Document explicitly: "Card titles are h3 tags OUTSIDE the glass container"
   - Verify: h3 should never be inside the glassCardBaseStyle div

3. **Icon Sizing Inconsistency**
   - Solution: Define icon size constraints (sm: 16px, md: 24px, lg: 32px, xl: 48px)
   - Verify: All tech stack icons same size within a component

4. **Accessibility Label Gaps**
   - Solution: Audit before handoff - every link and button needs aria-label if not self-explanatory
   - Verify: Use screen reader to test; ensure labels make sense out of context

5. **Responsive Layout Breaks**
   - Solution: Design mobile-first; test text reflow and spacing at 375px, 768px, 1024px
   - Verify: No horizontal scroll on any breakpoint; touch targets remain 44x44px minimum
