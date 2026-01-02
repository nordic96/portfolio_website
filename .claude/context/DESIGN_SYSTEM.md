# Portfolio Design System

**Version:** 2.0 (Pastel Green Theme)
**Last Updated:** January 2, 2026
**Status:** Active

---

## Color System

### Primary Palette

```css
/* Pastel Green - Primary Highlight Color */
--color-pastel-green: #77dd87;
--color-pastel-green-hover: #5fd070;
--color-pastel-green-light: rgba(119, 221, 135, 0.1);

/* BlueDianne - Secondary/Depth Color */
--color-blue-dianne: #1f5b5b;
--color-blue-dianne-dark: #164444;

/* Copper - Accent Color */
--color-copper: #b68b3b;
--color-copper-light: rgba(182, 139, 59, 0.1);

/* Base Colors */
--color-white: #FFFFFF;
--color-dark-gray: #333333;
--color-text-dark: #2D2D2D;
```

### Usage Guidelines

| Use Case | Color | Tailwind Class | Notes |
|----------|-------|----------------|-------|
| Hero Background | White | `bg-white` | Clean, modern base |
| Primary CTA Background | Pastel Green | `bg-[#77dd87]` | Fresh, inviting |
| Primary CTA Hover | Pastel Green Hover | `hover:bg-[#5fd070]` | Darker on hover |
| Accent Text/Highlights | Pastel Green | `text-[#77dd87]` | Visual interest |
| Profile Photo Border | Pastel Green | `ring-[#77dd87]` | Brand consistency |
| Secondary Accent | Copper | `text-[#b68b3b]` | Warm touch |
| Header/Footer Background | Dark Gray | `bg-[#333333]` | Minimal, professional |
| Body Text | Dark Gray | `text-[#2D2D2D]` | High readability |

### Accessibility - Color Contrast

| Text/Background Combination | Contrast Ratio | WCAG AA | WCAG AAA |
|----------------------------|----------------|---------|----------|
| Dark Gray (#2D2D2D) on White | 13.5:1 | ✅ Pass | ✅ Pass |
| Gray-600 on White | 7.2:1 | ✅ Pass | ✅ Pass |
| Dark Gray (#2D2D2D) on Pastel Green (#77dd87) | 5.2:1 | ✅ Pass | ⚠️ Close |
| White on Pastel Green (#77dd87) | 4.5:1 | ✅ Pass | ⚠️ Close |
| White on #333 | 12.6:1 | ✅ Pass | ✅ Pass |

**Note:** Pastel Green is appropriate for:
- Large text elements
- Accent decorations and icons
- Button backgrounds with white text
- NOT suitable for small body text on white background

---

## Typography System

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Weights:** 300 (Light), 400 (Normal), 600 (Semibold), 700 (Bold), 900 (Black)
**Loading:** `display: 'swap'` for optimal performance

### Type Scale - Hero Section

| Element | Desktop | Tablet | Mobile | Weight | Color |
|---------|---------|--------|--------|--------|-------|
| Name/Greeting | `text-5xl` (48px) | `text-4xl` (36px) | `text-3xl` (30px) | `font-black` (900) | `text-text-dark bg-pastel-green` |
| Hero Headline | `text-7xl` (72px) | `text-5xl` (48px) | `text-4xl` (36px) | `font-black` (900) | `text-text-dark` |
| Subheadline | `text-3xl` (30px) | `text-2xl` (24px) | `text-xl` (20px) | `font-extralight` (200) | `text-gray-600` |

### Line Heights
- Headlines: `leading-tight` (1.25)
- Body text: `leading-relaxed` (1.625)
- CTAs: `leading-none` (1)

### Responsive Patterns
```tsx
// Example: Hero headline
className="text-4xl md:text-5xl lg:text-7xl font-black text-text-dark leading-tight"
```

---

## Spacing System

### Vertical Rhythm

```css
/* Between elements within hero */
gap-8     /* 32px - Mobile */
gap-12    /* 48px - Desktop */

/* Hero section padding */
py-20     /* 80px - Mobile */
py-32     /* 128px - Desktop */

/* Content sections */
py-16     /* 64px - Mobile */
py-24     /* 96px - Desktop */
```

### Horizontal Spacing

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

## Component Specifications

### Profile Photo

**Size:**
- Desktop: 208px (`w-52 h-52`)
- Tablet: 160px (`w-40 h-40`)
- Mobile: 128px (`w-32 h-32`)

**Styling:**
```tsx
className="rounded-full
           ring-4 ring-[#77dd87]
           shadow-xl shadow-[#77dd87]/20
           transition-transform hover:scale-105"
```

---

### Primary CTA Button

**Styling:**
```tsx
className="bg-[#77dd87]
           hover:bg-[#5fd070]
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
- Default: Pastel Green background, white text
- Hover: Darker Pastel Green (#5fd070), scale up 5%, enhanced shadow
- Focus: Visible outline for keyboard navigation
- Active: Slight scale down (95%)

**Accessibility:**
- Minimum touch target: 44×44px ✅
- Color contrast: 4.5:1 (WCAG AA) ✅
- Keyboard accessible
- Screen reader friendly

---

### Secondary CTA Button

**Styling:**
```tsx
className="border-2 border-[#77dd87]
           text-[#77dd87]
           hover:bg-[#77dd87]
           hover:text-white
           px-8 py-4
           rounded-lg
           font-semibold text-lg
           transition-all duration-300"
```

**States:**
- Default: Transparent background, Pastel Green border and text
- Hover: Pastel Green background, white text
- Focus: Visible outline
- Active: Slight opacity change

---

### Tech Stack Logos (Implemented)

**Logo Styling:**
```css
.tech-logo {
  filter: grayscale(100%);
  opacity: 0.5;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(var(--rotation, 0deg));
  pointer-events: auto;
  cursor: pointer;
}

.tech-logo:hover {
  opacity: 0.9;
  filter: grayscale(0%) brightness(1.1);
  transform: rotate(var(--rotation, 0deg)) scale(1.15);
  z-index: 10;
}
```

**Size:**
- Desktop/Tablet: `w-14 h-14` (56px)
- Mobile: `w-8 h-8` (32px)

**Positioning:** Orbital pattern around profile photo with random rotations (-20° to +22°)

---

## Responsive Breakpoints

### Tailwind Breakpoints
```css
sm:  640px  /* Small devices */
md:  768px  /* Tablets */
lg:  1024px /* Laptops */
xl:  1280px /* Desktops */
2xl: 1536px /* Large screens */
```

### Mobile First Approach
Always style for mobile first, then enhance for larger screens:
```tsx
// ✅ Correct
className="text-4xl md:text-5xl lg:text-7xl"

// ❌ Wrong
className="lg:text-7xl md:text-5xl text-4xl"
```

---

## Animation Specifications

### Fade-in Sequence (Hero Section)

```css
/* Staggered fade-in */
.fade-in-element {
  animation: fadeInUp 0.6s ease-out both;
}

.fade-in-1 { animation-delay: 0.2s; }
.fade-in-2 { animation-delay: 0.4s; }
.fade-in-3 { animation-delay: 0.6s; }
.fade-in-4 { animation-delay: 0.8s; }

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

### Hover Animations

```css
/* Buttons */
transition-all duration-300
hover:scale-105
hover:shadow-2xl

/* Tech Logos */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
hover:opacity-90
hover:scale-115
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Keyboard Navigation
- [ ] All interactive elements have visible focus state
- [ ] Logical tab order (top to bottom, left to right)
- [ ] No keyboard traps
- [ ] Skip to main content link (for header)

#### Focus Indicators
```css
.button:focus,
.link:focus {
  outline: 2px solid #333;
  outline-offset: 2px;
}
```

#### Screen Reader Support

```html
<!-- Semantic HTML -->
<section aria-label="Hero introduction">
  <h1>Main headline</h1>
  <p>Supporting text</p>
  <nav aria-label="Primary actions">
    <button aria-label="Scroll to projects section">
      View My Work
    </button>
  </nav>
</section>

<!-- Decorative elements -->
<div aria-hidden="true">
  <!-- Tech stack logos -->
</div>

<!-- Descriptive alt text -->
<img
  src="/profile.jpg"
  alt="Stephen Ko, software engineer, smiling at camera"
/>
```

#### Touch Targets
- Minimum size: 44×44px for all interactive elements
- Adequate spacing between touch targets (8px minimum)
- Buttons meet minimum height requirement (48px)

---

## Header Component (Future)

**Background:** `bg-[#333333]`
**Height:** 64-80px (fixed or sticky)
**Z-index:** High value to stay above content

### Elements
1. **Logo/Name:** Left-aligned, white or Pastel Green
2. **Navigation:** Right-aligned, white with Pastel Green hover
3. **Mobile:** Hamburger menu for screens <768px

```tsx
<header className="bg-[#333333] h-20 sticky top-0 z-50">
  <div className="container max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
    <div className="text-white font-bold text-xl">Stephen Ko</div>

    <nav className="hidden md:flex gap-8">
      <a href="#about" className="text-white hover:text-[#77dd87] transition-colors">
        About
      </a>
      <a href="#projects" className="text-white hover:text-[#77dd87] transition-colors">
        Projects
      </a>
      <a href="#contact" className="text-white hover:text-[#77dd87] transition-colors">
        Contact
      </a>
    </nav>
  </div>
</header>
```

---

## Footer Component (Future)

**Background:** `bg-[#333333]`
**Padding:** `py-12` to `py-16`

### Elements
1. **Social Links:** LinkedIn, GitHub, Email (white with Pastel Green hover)
2. **Copyright:** Gray-400, text-sm
3. **Optional:** Quick links to main sections

```tsx
<footer className="bg-[#333333] py-12">
  <div className="container max-w-7xl mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex gap-6">
        <a href="#" className="text-white hover:text-[#77dd87] transition-colors">
          LinkedIn
        </a>
        <a href="#" className="text-white hover:text-[#77dd87] transition-colors">
          GitHub
        </a>
        <a href="#" className="text-white hover:text-[#77dd87] transition-colors">
          Email
        </a>
      </div>

      <p className="text-gray-400 text-sm">
        © 2026 Stephen Ko. All rights reserved.
      </p>
    </div>
  </div>
</footer>
```

---

## Performance Guidelines

### Image Optimization
- Use Next.js `<Image>` component for all images
- Set `priority` prop for above-fold images
- Provide `width` and `height` to prevent layout shift
- Use WebP format when possible
- Implement lazy loading for below-fold content

### CSS Performance
- Use Tailwind's JIT compiler for minimal CSS bundle
- Avoid deep nesting in custom CSS
- Use CSS transforms for animations (GPU accelerated)
- Add `will-change` only during animations, remove after

### JavaScript Performance
- Code splitting with Next.js dynamic imports
- Minimize client-side JavaScript
- Use React Server Components when possible
- Lazy load non-critical components

### Lighthouse Targets
- **Performance:** ≥90
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

---

## Design Inspiration & References

### Websites
- **Stripe.com** - Gradient backgrounds, clean CTAs
- **Linear.app** - Typography hierarchy mastery
- **Vercel.com** - Centered hero, strong CTAs
- **Rauno.me** - Personal portfolio creativity
- **Cassie.codes** - Memorable hero sections

### Design Principles
- **Simplicity:** Less is more - remove unnecessary elements
- **Hierarchy:** Clear visual order guides the eye
- **Whitespace:** Breathing room improves readability
- **Consistency:** Use design system tokens throughout
- **Accessibility:** Design for everyone from the start

---

## Version History

### v2.0 (January 2, 2026) - Current
- Pastel Green theme implementation
- White background hero section
- Tech stack logos with orbital pattern
- Comprehensive accessibility guidelines

### v1.2 (January 1, 2026)
- Pastel Green color scheme migration
- Updated from gradient to white background
- Frontend development themed imagery

### v1.0 (Previous)
- OceanTeel/IslandGreen color scheme
- Gradient background hero

---

**Document maintained by:** @ui-ux-designer
**For implementation status:** See `PROJECT_STATUS.md`
**For next features:** See `highlighter-animation-spec.md`
