# UI/UX Design Skills & Lessons Learned

**Purpose:** Capture design patterns, review insights, and best practices discovered during design work.

**Last Updated:** January 19, 2026

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
See `.claude/CLAUDE.md` for complete v5.0 Night Sky color palette.

**Key notes:**
- Dark gradient backgrounds with white text (#ffffff)
- Accent colors (gold, cyan, purple) for highlights only
- Text secondary (#a8b2d1) for captions and labels

---

## Typography Best Practices

### Hierarchy Scale (v5.0 Night Sky)
See `.claude/CLAUDE.md` for complete v5.0 typography specs.

- Headings: Poppins font, bold, `text-3xl-4xl`
- Body: Roboto font, `text-base`
- Captions: Roboto font, `text-sm` with text-secondary color

### Line Length
- Optimal: 50-75 characters per line
- Mobile: Allow narrower, prioritize font size

---

## Accessibility Insights

### Touch Target Sizes
- Minimum: 44x44px (WCAG 2.1 AA)
- Recommended: 48x48px
- Spacing between targets: 8px minimum

### Focus States
- Always provide visible focus indicators
- Don't rely on color alone
- Consider `focus-visible` for keyboard-only focus

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
- **Color Palette Integration:** Night sky gradient (#855988 → #070B34) provides excellent contrast for white text and accent colors
- **iPhone Frame Realism:** Detailed bezel design with Dynamic Island and home indicator adds product-like authenticity
- **Live Preview Pattern:** Lazy-loading iframes + 400% scale technique balances performance and content visibility

### Accessibility Validation

- **Canvas Content:** StarField correctly uses `aria-hidden="true"` since it's decorative
- **Overlay Opacity:** At 30%, gradient overlay maintains sufficient contrast for any white text overlays
- **Loading Indicators:** Spinner + text provides both visual and text-based feedback for async states
- **iPhone Frame:** Pure CSS design requires no additional a11y attributes since it's non-interactive decoration

---
