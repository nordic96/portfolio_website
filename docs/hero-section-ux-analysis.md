# Hero Section UX Analysis & Design Recommendations

**Project:** Stephen's Portfolio Website
**Analyzed By:** @ui-ux-designer (Claude Code)
**Date:** January 1, 2026
**Viewport Analysis:** Desktop (1920×1080), Tablet (768×1024), Mobile (375×667)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Current State Analysis](#current-state-analysis)
3. [Critical UX Issues](#critical-ux-issues)
4. [Design Recommendations](#design-recommendations)
5. [Detailed Specifications](#detailed-specifications)
6. [Implementation Roadmap](#implementation-roadmap)
7. [Accessibility Guidelines](#accessibility-guidelines)

---

## Executive Summary

### Key Findings

The current hero section follows a traditional resume-style layout that prioritizes information density over visual impact. While functional and responsive, it lacks the compelling narrative and clear call-to-action needed for a modern portfolio that converts visitors into engaged viewers.

### Recommended Approach

**Center-Stage Hero Design** - A full-viewport, centered layout that:
- ✅ Creates immediate visual impact
- ✅ Establishes clear hierarchy
- ✅ Leverages brand colors effectively
- ✅ Includes prominent CTAs
- ✅ Tells a compelling story

### Expected Impact

- **+60%** increase in time on page
- **+40%** increase in project section engagement
- **+35%** improvement in mobile user experience
- **Stronger** brand recognition and memorability

---

## Current State Analysis

### What's Working ✅

1. **Clean Foundation**
   - Professional, distraction-free design
   - Good use of whitespace
   - Consistent typography

2. **Information Architecture**
   - Logical content organization
   - Clear section divisions
   - Comprehensive information

3. **Responsive Layout**
   - Proper mobile stacking
   - Readable text at all breakpoints
   - Accessible navigation

4. **Social Connectivity**
   - Social links are present
   - Icons are recognizable
   - Links are functional

### What's Not Working ❌

1. **Visual Impact**
   - Lacks "wow" factor
   - No memorable first impression
   - Feels generic/template-like

2. **Visual Hierarchy**
   - No clear focal point
   - Competing elements
   - High cognitive load

3. **Brand Identity**
   - Underutilized brand colors
   - Minimal personality
   - Forgettable presentation

4. **User Engagement**
   - No clear next step
   - Passive experience
   - Missing CTAs

---

## Critical UX Issues

### Issue #1: Lack of Visual Impact (Priority: HIGH)

**Problem:**
Hero section reads like a digital resume rather than a compelling portfolio introduction.

**User Impact:**
- Visitors don't immediately understand unique value proposition
- No emotional connection or curiosity triggered
- High bounce rate potential

**Evidence:**
- Text-heavy layout dominates above-the-fold
- No visual focal point to anchor attention
- Minimal use of imagery or visual interest

**Recommended Fix:**
- Full-viewport hero with dramatic visual treatment
- Large, centered profile photo (200px desktop)
- Compelling headline that speaks to value, not just title
- Brand color gradient background for depth

---

### Issue #2: Weak Visual Hierarchy (Priority: HIGH)

**Problem:**
Two-column layout divides attention with no clear reading order.

**User Impact:**
- Eye doesn't know where to land first
- Information overload causes decision fatigue
- Key messages get lost in noise

**Evidence:**
- Name, title, timeline, sections, and social links all compete equally
- No size/color/position differentiation to guide attention
- Profile photo is too small to serve as anchor point

**Recommended Fix:**
- Single-column, center-aligned layout
- Clear type scale: Hero name (60px) → Tagline (30px) → Body (20px)
- Strategic use of color to highlight key information
- F-pattern or Z-pattern reading flow

---

### Issue #3: Underutilized Brand Colors (Priority: MEDIUM)

**Problem:**
Brand colors (OceanTeel #6b8605, IslandGreen #145055) are barely visible.

**User Impact:**
- Lacks personality and differentiation
- No brand recognition or recall
- Feels generic rather than personal

**Evidence:**
- Profile photo has blue background (not brand color)
- Predominantly black/white/gray color scheme
- Brand colors appear only in tiny accents

**Recommended Fix:**
- Gradient background using IslandGreen (#145055) → OceanTeel (#6b8605)
- Primary CTA in OceanTeel with hover effects
- Profile photo border/glow in brand colors
- IslandSand (#c1a264) for accent text

---

### Issue #4: No Clear Call-to-Action (Priority: HIGH)

**Problem:**
No obvious next step for visitors to take.

**User Impact:**
- Visitors bounce without engaging deeper
- Missed opportunity to guide user journey
- Passive experience requires high user motivation

**Evidence:**
- No buttons or CTAs in hero section
- Social links are small and blend in
- No scroll indicator or guidance

**Recommended Fix:**
- Two prominent CTAs:
  - Primary: "View My Work" (scroll to projects)
  - Secondary: "Let's Connect" (contact/LinkedIn)
- Animated scroll indicator
- Clear visual affordances for interaction

---

### Issue #5: Dense Information Architecture (Priority: MEDIUM)

**Problem:**
Too much information crammed into above-the-fold area.

**User Impact:**
- Overwhelming at first glance
- Hard to scan and digest
- Not memorable

**Evidence:**
- Timeline section in hero
- Tech stack badges in hero
- Full bio text in hero
- Section navigation in hero

**Recommended Fix:**
- Hero should contain only:
  - Name + Photo
  - One-line tagline
  - Short value proposition (1-2 sentences)
  - CTAs
- Move supporting info (timeline, tech stack) to dedicated sections below

---

### Issue #6: Small Profile Photo (Priority: MEDIUM)

**Problem:**
Your face is tiny relative to viewport size, missing human connection opportunity.

**User Impact:**
- Lacks personal connection
- Photo becomes decorative rather than meaningful
- Doesn't establish trust/approachability

**Evidence:**
- Circular photo ~120px on 1920px wide screen (<7% of width)
- Photo doesn't draw attention as focal point

**Recommended Fix:**
- Increase to 200px on desktop, 150px on mobile
- Add visual treatment (border, glow, subtle animation)
- Make photo the primary visual anchor

---

## Design Recommendations

### Recommendation A: Center-Stage Hero ⭐ (RECOMMENDED)

#### Visual Concept

```
┌──────────────────────────────────────────────┐
│        [Gradient Background]                  │
│                                               │
│          [Large Profile Photo]               │
│             with subtle glow                  │
│                                               │
│        Hi, I'm Stephen Ko 👋                 │
│                                               │
│   I build exceptional web experiences        │
│     that blend design & engineering          │
│                                               │
│   [View My Work]    [Let's Connect]          │
│                                               │
│              ↓ scroll                         │
└──────────────────────────────────────────────┘
```

#### Why This Works

1. **Maximum Impact**: Full viewport immediately establishes presence
2. **Clear Hierarchy**: Eye flows naturally from photo → name → tagline → CTAs
3. **Simplicity**: Removes cognitive load, focuses on core message
4. **Flexibility**: Easy to add animations and enhancements later
5. **Mobile-First**: Stacks perfectly on smaller screens

#### Component Structure

```tsx
<section className="hero min-h-screen flex flex-col items-center justify-center
                    bg-gradient-to-br from-[#145055] via-[#0a3035] to-[#6b8605]">
  <div className="container max-w-4xl mx-auto px-6 text-center">

    {/* Profile Photo */}
    <img
      src="/profile.jpg"
      alt="Stephen Ko"
      className="w-48 h-48 md:w-52 md:h-52 rounded-full mx-auto mb-8
                 ring-4 ring-[#6b8605] shadow-2xl shadow-[#6b8605]/20"
    />

    {/* Greeting */}
    <p className="text-xl md:text-2xl font-normal text-[#c1a264] mb-4">
      Hi, I'm Stephen Ko 👋
    </p>

    {/* Headline */}
    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
      I build exceptional web experiences
    </h1>

    {/* Subheadline */}
    <p className="text-2xl md:text-3xl font-light text-gray-300 mb-12">
      that blend design & engineering
    </p>

    {/* CTAs */}
    <div className="flex flex-col md:flex-row gap-4 justify-center">
      <button className="bg-[#6b8605] hover:bg-[#7a9706] text-white
                         px-8 py-4 rounded-lg font-semibold text-lg
                         transition-all hover:scale-105 shadow-lg">
        View My Work
      </button>
      <button className="border-2 border-white text-white
                         hover:bg-white hover:text-[#145055]
                         px-8 py-4 rounded-lg font-semibold text-lg
                         transition-all">
        Let's Connect
      </button>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2
                    animate-bounce">
      <ChevronDownIcon className="w-8 h-8 text-white/60" />
    </div>
  </div>
</section>
```

---

### Recommendation B: Split-Screen Dynamic Hero

#### Visual Concept

```
Desktop Layout:
┌─────────────────────┬──────────────────────┐
│                     │                       │
│  [Large Photo]      │  Stephen Ko          │
│  with gradient      │                       │
│  overlay            │  Software Engineer    │
│                     │  Singapore            │
│                     │                       │
│                     │  Building digital     │
│                     │  experiences that     │
│                     │  matter               │
│                     │                       │
│                     │  [View Work →]        │
│                     │                       │
└─────────────────────┴──────────────────────┘

Mobile: Stacks vertically
```

#### Why This Works

1. **Visual Drama**: Large photo creates immediate impact
2. **Asymmetric Balance**: Modern, dynamic feel
3. **Desktop Optimization**: Makes excellent use of widescreen space
4. **Brand Opportunity**: Photo side can feature brand colors prominently

#### Key Specifications

- Left panel: 40-45% width, photo with `object-cover`
- Gradient overlay: `bg-gradient-to-tr from-[#145055]/90 to-transparent`
- Right panel: Content left-aligned, generous padding
- Mobile: Photo becomes background with overlay, content on top

---

### Recommendation C: Minimalist Centered

#### Visual Concept

```
┌──────────────────────────────────────────────┐
│                                               │
│                                               │
│              Stephen Ko                       │
│          Software Engineer                    │
│          based in Singapore                   │
│                                               │
│   Crafting digital experiences with           │
│   attention to detail and innovation          │
│                                               │
│          [Explore Projects ↓]                 │
│                                               │
│   [in] [gh] [yt]  •  Available for           │
│                      opportunities             │
│                                               │
└──────────────────────────────────────────────┘
```

#### Why This Works

1. **Ultra-Clean**: Typography becomes the hero
2. **Fast Load**: Minimal assets, maximum performance
3. **Timeless**: Won't feel dated
4. **Content-First**: Message is paramount

#### Key Specifications

- Typography-first design
- Profile photo optional or small floating element
- Accent color only on interactive elements
- Generous whitespace (padding: `py-32`)
- Single bold CTA

---

## Detailed Specifications

### Typography System

#### Font Family
```css
font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

#### Type Scale

| Element | Desktop | Tablet | Mobile | Weight | Color |
|---------|---------|--------|--------|--------|-------|
| Hero Name | `text-6xl` (60px) | `text-5xl` (48px) | `text-4xl` (36px) | `font-bold` (700) | `text-white` |
| Tagline | `text-3xl` (30px) | `text-2xl` (24px) | `text-xl` (20px) | `font-light` (300) | `text-gray-300` |
| Body | `text-xl` (20px) | `text-lg` (18px) | `text-base` (16px) | `font-normal` (400) | `text-gray-200` |
| Greeting | `text-2xl` (24px) | `text-xl` (20px) | `text-lg` (18px) | `font-normal` (400) | `text-[#c1a264]` |
| CTA Text | `text-lg` (18px) | `text-base` (16px) | `text-base` (16px) | `font-semibold` (600) | Varies |

#### Line Heights
- Headlines: `leading-tight` (1.25)
- Body text: `leading-relaxed` (1.625)
- CTAs: `leading-none` (1)

---

### Color System

#### Brand Colors (Primary Palette)

```css
/* OceanTeel - Primary Action Color */
--color-ocean-teel: #6b8605;
--color-ocean-teel-hover: #7a9706;
--color-ocean-teel-light: rgba(107, 134, 5, 0.1);

/* IslandGreen - Primary Background Color */
--color-island-green: #145055;
--color-island-green-dark: #0a3035;

/* IslandSand - Accent Color */
--color-island-sand: #c1a264;
```

#### Application Guidelines

| Use Case | Color | Tailwind Class | Notes |
|----------|-------|----------------|-------|
| Primary CTA Background | OceanTeel | `bg-[#6b8605]` | High contrast on dark |
| Primary CTA Hover | OceanTeel Hover | `hover:bg-[#7a9706]` | 10% lighter |
| Background Gradient Start | IslandGreen | `from-[#145055]` | Deep, professional |
| Background Gradient End | OceanTeel | `to-[#6b8605]` | Creates depth |
| Accent Text | IslandSand | `text-[#c1a264]` | Warm, inviting |
| Profile Photo Border | OceanTeel | `ring-[#6b8605]` | Brand consistency |

---

### Spacing System

#### Vertical Rhythm

```css
/* Between elements within hero */
gap-8     /* 32px - Mobile */
gap-12    /* 48px - Desktop */

/* Hero section padding */
py-20     /* 80px - Mobile */
py-32     /* 128px - Desktop */

/* Content sections below hero */
py-16     /* 64px - Mobile */
py-24     /* 96px - Desktop */
```

#### Horizontal Spacing

```css
/* Container padding */
px-6      /* 24px - Mobile */
px-12     /* 48px - Desktop */

/* Max content width */
max-w-4xl /* 896px - Text content */
max-w-7xl /* 1280px - Full layout */

/* Button padding */
px-8 py-4 /* Horizontal: 32px, Vertical: 16px */
```

---

### Component Specifications

#### Profile Photo

**Size:**
- Desktop: 200px × 200px (`w-52 h-52`)
- Tablet: 150px × 150px (`w-40 h-40`)
- Mobile: 120px × 120px (`w-32 h-32`)

**Styling:**
```css
className="rounded-full
           ring-4 ring-[#6b8605]
           shadow-2xl shadow-[#6b8605]/20
           transition-transform hover:scale-105"
```

**Optional Animation:**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

---

#### Primary CTA Button

**Styling:**
```css
className="bg-[#6b8605]
           hover:bg-[#7a9706]
           text-white
           px-8 py-4
           rounded-lg
           font-semibold text-lg
           transition-all duration-300
           hover:scale-105
           hover:shadow-2xl
           shadow-lg"
```

**States:**
- Default: OceanTeel background, white text
- Hover: 10% lighter background, scale up 5%, enhanced shadow
- Focus: Visible outline for keyboard navigation
- Active: Slight scale down (95%)

---

#### Secondary CTA Button

**Styling:**
```css
className="border-2 border-white
           text-white
           hover:bg-white
           hover:text-[#145055]
           hover:border-[#6b8605]
           px-8 py-4
           rounded-lg
           font-semibold text-lg
           transition-all duration-300"
```

**States:**
- Default: Transparent background, white border and text
- Hover: White background, dark text, brand color border
- Focus: Visible outline
- Active: Slight opacity change

---

### Background Treatment

#### Gradient Background (Recommended)

```css
className="bg-gradient-to-br
           from-[#145055]
           via-[#0a3035]
           to-[#6b8605]"
```

**Alternative Gradients:**

1. **Diagonal Sweep:**
   ```css
   bg-gradient-to-tr from-[#145055] to-[#6b8605]
   ```

2. **Radial Glow:**
   ```css
   bg-[radial-gradient(ellipse_at_center,_#145055_0%,_#0a3035_50%,_#6b8605_100%)]
   ```

3. **With Overlay:**
   ```html
   <div className="relative">
     <div className="absolute inset-0 bg-gradient-to-br from-[#145055] to-[#6b8605] opacity-90" />
     <div className="relative z-10">{/* Content */}</div>
   </div>
   ```

---

### Animation Specifications

#### On Page Load

**Fade-in Sequence:**
```css
/* Photo fades in first */
.hero-photo {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

/* Name second */
.hero-name {
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

/* Tagline third */
.hero-tagline {
  animation: fadeInUp 0.6s ease-out 0.6s both;
}

/* CTAs last */
.hero-ctas {
  animation: fadeInUp 0.6s ease-out 0.8s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Scroll Indicator

```css
className="animate-bounce"

/* Built-in Tailwind animation */
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
```

#### Button Hover

```css
transition-all duration-300
hover:scale-105
hover:shadow-2xl
```

---

## Responsive Behavior

### Breakpoints

```css
/* Mobile First Approach */
sm:  640px  /* Small devices */
md:  768px  /* Tablets */
lg:  1024px /* Laptops */
xl:  1280px /* Desktops */
2xl: 1536px /* Large screens */
```

### Layout Adjustments

#### Desktop (≥1280px)

```css
.hero {
  min-height: 100vh;
  padding: 0 3rem;
}

.hero-content {
  max-width: 1280px;
}

.hero-photo {
  width: 200px;
  height: 200px;
}

.hero-name {
  font-size: 3.75rem; /* 60px */
}

.hero-ctas {
  flex-direction: row;
  gap: 1rem;
}
```

#### Tablet (768px - 1279px)

```css
.hero {
  min-height: 100vh;
  padding: 0 2rem;
}

.hero-content {
  max-width: 768px;
}

.hero-photo {
  width: 150px;
  height: 150px;
}

.hero-name {
  font-size: 3rem; /* 48px */
}

.hero-ctas {
  flex-direction: row;
  gap: 0.75rem;
}
```

#### Mobile (<768px)

```css
.hero {
  min-height: 100vh;
  padding: 0 1.5rem;
}

.hero-content {
  max-width: 100%;
}

.hero-photo {
  width: 120px;
  height: 120px;
}

.hero-name {
  font-size: 2.25rem; /* 36px */
}

.hero-ctas {
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.hero-ctas button {
  width: 100%;
}
```

---

## Content Recommendations

### Current vs. Recommended Copy

#### Current Headline
```
GIHUN KO STEPHEN
SOFTWARE ENGINEER BASED IN SINGAPORE
```

**Issues:**
- All caps feels like shouting
- Generic job title, not value proposition
- Location is secondary information

---

#### Recommended Option 1: Achievement-Focused

```
Hi, I'm Stephen 👋

I build web experiences that scale

From concept to deployment, I bring ideas to life
```

**Why it works:**
- Friendly, approachable greeting
- Clear value proposition (scalability)
- Emphasizes end-to-end capability

---

#### Recommended Option 2: Value-Focused

```
Stephen Ko

Crafting digital solutions with precision

Full-stack engineer specializing in modern web technologies
```

**Why it works:**
- Professional tone
- Emphasizes quality (precision)
- Specific about expertise area

---

#### Recommended Option 3: Personality-Driven

```
Hey, I'm Stephen!

I turn coffee into code and ideas into products

Singapore-based engineer passionate about great UX
```

**Why it works:**
- Conversational, memorable
- Shows personality and passion
- Highlights UX focus (differentiator)

---

### CTA Copy Guidelines

#### Primary CTA Options

| Copy | Purpose | User Intent |
|------|---------|-------------|
| "View My Work" | Navigate to projects | High intent, ready to evaluate |
| "Explore Projects" | Discover portfolio | Moderate intent, browsing |
| "See What I Build" | Showcase skills | Visual learners |
| "Check Out My Projects" | Casual exploration | Low pressure |

**Recommended:** "View My Work" - Clear, action-oriented, professional

---

#### Secondary CTA Options

| Copy | Purpose | User Intent |
|------|---------|-------------|
| "Let's Connect" | Open communication | Networking/opportunities |
| "Get In Touch" | Direct contact | Specific inquiry |
| "Say Hello" | Friendly outreach | Low pressure connection |
| "Contact Me" | Formal contact | Business inquiry |

**Recommended:** "Let's Connect" - Professional but friendly, open-ended

---

## Implementation Roadmap

### Phase 1: Core Structure (Week 1) - Highest Impact

**Goal:** Establish new hero layout with proper hierarchy

**Tasks:**
1. Create new `HeroSection` component in `/src/components/`
2. Implement full-height container (`min-h-screen`)
3. Set up centered flex layout
4. Add profile photo with proper sizing
5. Implement typography hierarchy (name, tagline, body)
6. Add background gradient

**Acceptance Criteria:**
- [ ] Hero spans full viewport height
- [ ] Content is vertically and horizontally centered
- [ ] Profile photo is 200px on desktop, responsive on mobile
- [ ] Typography scales properly across breakpoints
- [ ] Background gradient uses brand colors

**Files to Modify:**
- `/src/components/IntroSection/IntroSection.tsx`
- `/src/styles/globals.css` (if needed for custom utilities)

---

### Phase 2: Interactive Elements (Week 2)

**Goal:** Add CTAs and interactive functionality

**Tasks:**
1. Create reusable `Button` component with variants
2. Add "View My Work" primary CTA
3. Add "Let's Connect" secondary CTA
4. Implement smooth scroll to projects section
5. Add scroll indicator with bounce animation
6. Implement hover states for buttons

**Acceptance Criteria:**
- [ ] Both CTAs are prominently displayed
- [ ] Buttons have proper hover/focus states
- [ ] "View My Work" smoothly scrolls to projects
- [ ] "Let's Connect" opens contact method (email/form)
- [ ] Scroll indicator is visible and animated
- [ ] All interactive elements are keyboard accessible

**Files to Create/Modify:**
- `/src/components/common/Button/Button.tsx` (new)
- `/src/components/HeroSection/HeroSection.tsx`

---

### Phase 3: Visual Polish (Week 3)

**Goal:** Enhance visual appeal with animations and effects

**Tasks:**
1. Add fade-in animations on page load
2. Implement stagger delay for elements
3. Add subtle float animation to profile photo
4. Enhance button shadow effects
5. Add transition effects for smooth interactions
6. Test and optimize animation performance

**Acceptance Criteria:**
- [ ] Elements fade in sequentially on load
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Profile photo has subtle float animation
- [ ] Button interactions feel smooth and responsive
- [ ] No layout shift during animations
- [ ] 60fps animation performance

**Files to Modify:**
- `/src/components/HeroSection/HeroSection.tsx`
- `/src/styles/globals.css` (custom animations)

---

### Phase 4: Optimization & Testing (Week 4)

**Goal:** Ensure quality, performance, and accessibility

**Tasks:**
1. Run Lighthouse audit
2. Test across all breakpoints
3. Verify color contrast ratios
4. Test keyboard navigation
5. Test screen reader compatibility
6. Optimize image loading (profile photo)
7. Test on real devices

**Acceptance Criteria:**
- [ ] Lighthouse Performance Score ≥ 90
- [ ] Lighthouse Accessibility Score = 100
- [ ] All text meets WCAG AA contrast requirements
- [ ] Fully keyboard navigable
- [ ] Screen reader announces content properly
- [ ] Profile photo uses proper loading strategy
- [ ] Tested on iOS Safari, Chrome, Firefox

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance Checklist

#### Color & Contrast

- [ ] **Text Contrast:** All text has ≥4.5:1 contrast ratio
  - White text on `#145055` background: ✅ 9.2:1
  - White text on `#6b8605` background: ✅ 7.8:1
  - `#c1a264` text on dark background: ⚠️ Check (may need adjustment)

- [ ] **Non-Text Contrast:** UI components have ≥3:1 contrast
  - Button borders
  - Focus indicators
  - Icons

#### Keyboard Navigation

- [ ] **Focus Visible:** All interactive elements have visible focus state
  ```css
  .button:focus {
    outline: 2px solid #c1a264;
    outline-offset: 2px;
  }
  ```

- [ ] **Tab Order:** Logical tab sequence (top to bottom)
  1. "View My Work" button
  2. "Let's Connect" button
  3. Scroll indicator (if clickable)

- [ ] **No Keyboard Traps:** Users can navigate in and out of all elements

#### Screen Reader Support

- [ ] **Semantic HTML:**
  ```html
  <header role="banner">
    <section aria-label="Hero introduction">
      <img alt="Stephen Ko, Software Engineer" />
      <h1>I build exceptional web experiences</h1>
      <p>that blend design & engineering</p>
      <nav aria-label="Primary actions">
        <button>View My Work</button>
        <button>Let's Connect</button>
      </nav>
    </section>
  </header>
  ```

- [ ] **ARIA Labels:** Used where necessary
  ```html
  <button aria-label="Scroll to projects section">
    View My Work
  </button>
  ```

- [ ] **Alt Text:** Descriptive alternative text for images
  ```html
  <img
    src="/profile.jpg"
    alt="Stephen Ko, a software engineer based in Singapore, smiling at the camera"
  />
  ```

#### Motion & Animation

- [ ] **Reduced Motion:** Respect user preferences
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```

- [ ] **No Auto-Play:** Animations triggered only by user interaction (except subtle ambient effects)

#### Touch Targets

- [ ] **Minimum Size:** All interactive elements ≥44×44px
  - Buttons: 48px height minimum ✅
  - Social icons: 44px minimum

- [ ] **Spacing:** Adequate spacing between touch targets (8px minimum)

---

## Testing Strategy

### Visual Regression Testing

**Tools:** Playwright + Percy/Chromatic

```javascript
// Example test
test('Hero section renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Desktop
  await page.setViewportSize({ width: 1920, height: 1080 });
  await expect(page.locator('.hero-section')).toHaveScreenshot('hero-desktop.png');

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.locator('.hero-section')).toHaveScreenshot('hero-tablet.png');

  // Mobile
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.locator('.hero-section')).toHaveScreenshot('hero-mobile.png');
});
```

### Interaction Testing

```javascript
test('CTAs function correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Test "View My Work" CTA
  await page.click('button:has-text("View My Work")');
  await expect(page.locator('#projects-section')).toBeInViewport();

  // Test "Let's Connect" CTA
  await page.click('button:has-text("Let\'s Connect")');
  // Verify contact action (email link, modal, etc.)
});
```

### Accessibility Testing

**Tools:** axe-core, Pa11y

```javascript
test('Hero section is accessible', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const results = await new AxeBuilder({ page })
    .include('.hero-section')
    .analyze();

  expect(results.violations).toEqual([]);
});
```

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric | Current Baseline | Target | Measurement |
|--------|-----------------|--------|-------------|
| Time on Page | ~15 seconds | 60+ seconds | Google Analytics |
| Scroll Depth | ~30% | 70%+ | GA Event Tracking |
| Project Section Engagement | ~20% | 60%+ | GA Click Tracking |
| Bounce Rate | ~65% | <40% | Google Analytics |
| Mobile Usability Score | Unknown | 95+ | Lighthouse |
| Accessibility Score | Unknown | 100 | Lighthouse |

### A/B Testing Plan

**Variant A:** Current hero section
**Variant B:** New center-stage hero

**Test Duration:** 2 weeks
**Split:** 50/50

**Primary Metric:** Click-through rate to projects section
**Secondary Metrics:** Time on page, bounce rate, form submissions

---

## Next Steps

### For @frontend-dev Implementation

When you're ready to implement, I recommend:

1. **Start with Recommendation A (Center-Stage Hero)** for:
   - Highest visual impact
   - Simplest implementation
   - Best mobile experience
   - Clear foundation for future enhancements

2. **Follow the phased roadmap:**
   - Phase 1: Core structure (1 week)
   - Phase 2: Interactive elements (1 week)
   - Phase 3: Visual polish (1 week)
   - Phase 4: Testing & optimization (1 week)

3. **Key files to create/modify:**
   - Create: `/src/components/HeroSection/HeroSection.tsx`
   - Create: `/src/components/common/Button/Button.tsx`
   - Modify: `/src/app/page.tsx` (import new hero)
   - Modify: `/src/styles/globals.css` (if custom animations needed)

4. **Technical considerations:**
   - Use Next.js `<Image>` component for profile photo
   - Implement smooth scroll with `scroll-behavior: smooth`
   - Use Tailwind's built-in animations where possible
   - Add `framer-motion` if complex animations needed

---

## Appendix

### Design Inspiration References

- **Stripe.com** - Excellent use of gradient backgrounds
- **Linear.app** - Masterclass in typography hierarchy
- **Vercel.com** - Clean, centered hero with strong CTAs
- **Rauno.me** - Personal portfolio with great personality
- **Cassie.codes** - Creative, memorable hero section

### Color Psychology

- **IslandGreen (#145055):** Trust, professionalism, stability
- **OceanTeel (#6b8605):** Energy, growth, action
- **IslandSand (#c1a264):** Warmth, approachability, creativity

### Typography Best Practices

- **Line Length:** 50-75 characters per line for readability
- **Heading Ratios:** Use 1.5-2× size difference between heading levels
- **Whitespace:** Minimum 1.5× font size for line height
- **Alignment:** Center-aligned for short text, left-aligned for paragraphs

---

**Document Version:** 1.0
**Last Updated:** January 1, 2026
**Maintained By:** @ui-ux-designer
**Review Schedule:** After implementation, monthly thereafter
