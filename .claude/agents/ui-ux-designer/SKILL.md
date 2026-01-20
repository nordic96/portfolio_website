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

### Portfolio Color Palette Notes
- Primary green `#77dd87` works best as accent, not large areas
- Text on white: use `#2D2D2D` for optimal readability
- Subtle backgrounds: prefer `#F9FAFB` over pure white

---

## Typography Best Practices

### Hierarchy Scale (Dashboard v4.0)
- Hero name: `text-2xl lg:text-3xl font-bold`
- Headlines: `text-base lg:text-lg font-light`
- Section titles: `text-sm font-semibold uppercase`
- Body: `text-sm`
- Labels: `text-xs`

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
