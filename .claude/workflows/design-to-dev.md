# Design-to-Development Workflow

## Overview
Collaborative process between @ui-ux-designer and @frontend-dev for portfolio revamp.

## Standard Workflow Patterns

### Pattern 1: New Feature Design & Implementation

**Step 1: Design Discovery**
```
@ui-ux-designer Using Playwright, analyze the [section/page] and 
create a design proposal for [specific improvement]
```

**Step 2: Design Specification**
```
@ui-ux-designer Provide detailed design specs for the [feature] 
including all responsive breakpoints and Tailwind guidance
```

**Step 3: Implementation**
```
@frontend-dev Implement [feature] according to @ui-ux-designer's specs
```

**Step 4: Design Review**
```
@ui-ux-designer Review the implementation at localhost:3000 and 
provide feedback
```

**Step 5: Refinement** (if needed)
```
@frontend-dev Address the feedback from @ui-ux-designer
```

---

### Pattern 2: Audit & Improve Existing Section

**Step 1: Visual Audit**
```
@ui-ux-designer Conduct a comprehensive UX audit of [section] 
using Playwright screenshots and sequential thinking
```

**Step 2: Prioritized Recommendations**
```
@ui-ux-designer Provide top 5 improvements ranked by impact, 
with implementation difficulty estimates
```

**Step 3: User Selects Priority**
```
User selects which improvements to implement first
```

**Step 4: Detailed Specs**
```
@ui-ux-designer Create detailed specs for [selected improvement]
```

**Step 5: Implementation**
```
@frontend-dev Implement the changes
```

---

### Pattern 3: Design System Definition

**Step 1: Current State Analysis**
```
@ui-ux-designer Analyze the current design tokens (colors, typography, 
spacing) across the entire site using Playwright
```

**Step 2: Design System Proposal**
```
@ui-ux-designer Propose a cohesive design system including:
- Color palette with Tailwind config
- Typography scale
- Spacing system
- Component patterns
```

**Step 3: System Implementation**
```
@frontend-dev Update tailwind.config.js and create design tokens 
based on @ui-ux-designer's system
```

**Step 4: Validation**
```
@ui-ux-designer Review the implemented design system and verify 
consistency across components
```

---

### Pattern 4: Responsive Design Review

**Step 1: Multi-Device Audit**
```
@ui-ux-designer Use Playwright to screenshot [section] at mobile (375px), 
tablet (768px), and desktop (1440px) widths. Analyze responsive behavior.
```

**Step 2: Issues & Recommendations**
```
@ui-ux-designer Document responsive issues and provide specs for fixes
```

**Step 3: Fix Implementation**
```
@frontend-dev Fix responsive issues following the specs
```

**Step 4: Verification**
```
@ui-ux-designer Verify fixes across all breakpoints
```

---

## Tips for Effective Collaboration

### For Users
- **Be specific** about which section/feature you want to work on
- **Prioritize** if audit reveals many issues
- **Provide context** about your goals and target audience
- **Review outputs** from both agents before proceeding to next step

### Design Handoff Best Practices
@ui-ux-designer should provide:
- Exact Tailwind classes when possible
- Specific values (not "large spacing" but "8px" or "space-y-2")
- Visual references (ASCII diagrams, descriptions)
- Accessibility requirements
- Edge cases and states (hover, focus, error, loading)

### Implementation Feedback Best Practices
@frontend-dev should:
- Ask questions if specs are unclear
- Flag technical constraints early
- Provide localhost URL for review
- Document any deviations from specs with reasoning

---

## Quick Start: First Collaboration

Try this to get started:
```
@ui-ux-designer Please do a comprehensive UX audit of my portfolio homepage 
at localhost:3000. Use Playwright to screenshot the page, then use sequential 
thinking to analyze the user experience, visual hierarchy, and identify the 
top 3 improvements we should prioritize. Provide detailed reasoning for each.
```

After receiving recommendations:
```
@ui-ux-designer Create detailed design specifications for [selected improvement], 
including exact Tailwind classes, spacing, colors, and responsive behavior.
```

Then implement:
```
@frontend-dev Implement the [improvement] based on the design specs provided 
by @ui-ux-designer. Use Playwright to verify the result matches the design.
```

Finally review:
```
@ui-ux-designer Review the implementation and provide feedback on design 
execution quality.
```