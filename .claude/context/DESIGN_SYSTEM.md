# Portfolio Design System

**Version:** 4.0 (Dashboard Layout)
**Last Updated:** January 7, 2026
**Status:** Active - Major Redesign

---

## Design Philosophy Change

### Previous Approach (v1.0 - v3.0)
- Vertical scrolling sections
- Full-width layouts
- Detailed content per section
- 90dvh hero + scrolling content

### New Approach (v4.0 - Dashboard)
- **100dvh single-view layout** - Everything visible at a glance
- **Centered grid format** - All sections in a compact container
- **Compact typography** - Smaller, condensed content
- **Minimal color** - Mostly white with subtle gradient hints
- **No scrolling required** for main content

---

## Layout System

### 100dvh Container Structure

```
+-----------------------------------------------+
|  Logo                              i18n       |  <- Header (fixed height)
+-----------------------------------------------+
|                                               |
|    +----------------------------------+       |
|    |         Hero Section             |       |  <- Row 1 (full width)
|    |        (profile photo)           |       |
|    +-------------------+--------------+       |
|    |     Projects      | Tech Stack   |       |  <- Row 2
|    |                   | Post-Its     |       |
|    +-------------------+--------------+       |
|    |      About        |Certifications|       |  <- Row 3
|    |                   |              |       |
|    +-------------------+--------------+       |
|                                               |
+-----------------------------------------------+
|              Footer                           |
+-----------------------------------------------+
```

### Grid Specifications

```css
/* Main Layout Container */
.dashboard-container {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}

/* Header & Footer */
.header {
  height: 60px;
  flex-shrink: 0;
}

.footer {
  height: 48px;
  flex-shrink: 0;
}

/* Main Content Grid */
.content-grid {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;        /* 2 equal columns */
  grid-template-rows: auto 1fr 1fr;      /* Row 1 auto, Rows 2-3 equal */
  gap: 16px;
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Grid Areas */
.hero-section { grid-area: 1 / 1 / 2 / 3; }   /* Row 1, spans both columns */
.projects { grid-area: 2 / 1 / 3 / 2; }        /* Row 2, left column */
.tech-stack { grid-area: 2 / 2 / 3 / 3; }      /* Row 2, right column */
.about { grid-area: 3 / 1 / 4 / 2; }           /* Row 3, left column */
.certifications { grid-area: 3 / 2 / 4 / 3; }  /* Row 3, right column */
```

### Tailwind Implementation (Mobile-First)

```tsx
// Main Container - Mobile: scrollable, Desktop: fixed 100dvh
<div className="min-h-dvh md:h-dvh flex flex-col">
  {/* Header */}
  <header className="h-15 flex-shrink-0 px-4 md:px-6 flex items-center justify-between">
    <Logo />
    <I18nSelector />
  </header>

  {/* Content - Mobile: Single Column, Desktop: 2-Column Grid */}
  <main className="flex-1 px-4 md:px-6 pb-4 overflow-y-auto md:overflow-hidden">
    <div className="
      h-full max-w-6xl mx-auto
      flex flex-col gap-4                                    /* Mobile: single column, vertical */
      md:grid md:grid-cols-2 md:grid-rows-[auto_1fr_1fr] md:gap-4  /* Desktop: 2-col grid */
    ">
      {/* Row 1: Hero - Full width (spans both columns) */}
      <div className="md:col-span-2">
        <HeroSection />
      </div>

      {/* Row 2: Projects (left) */}
      <div className="md:col-span-1">
        <ProjectsCard />
      </div>

      {/* Row 2: Tech Stack Post-Its (right) */}
      <div className="md:col-span-1">
        <TechStackPostIts />
      </div>

      {/* Row 3: About (left) */}
      <div className="md:col-span-1">
        <AboutCard />
      </div>

      {/* Row 3: Certifications (right) */}
      <div className="md:col-span-1">
        <CertificationsCard />
      </div>
    </div>
  </main>

  {/* Footer */}
  <footer className="h-12 flex-shrink-0 px-4 md:px-6 flex items-center justify-center">
    <FooterContent />
  </footer>
</div>
```

**Key Responsive Classes:**
- `min-h-dvh md:h-dvh` - Scrollable on mobile, fixed on desktop
- `flex flex-col md:grid` - Column stack on mobile, grid on desktop
- `md:grid-cols-2 md:grid-rows-[auto_1fr_1fr]` - 2 columns, 3 rows (hero auto-height)
- `overflow-y-auto md:overflow-hidden` - Scroll enabled only on mobile

---

## Responsive Behavior

### Desktop (>= 1024px)
- Full grid layout as shown above
- 3-column grid with 2:1 ratio (Hero/Projects wider than Certs/About)
- Max-width container: 1200px
- Gap: 16px between cells

### Tablet (768px - 1023px)
- 2-column grid
- Hero and Projects stack vertically in left column
- Certs and About stack vertically in right column
- Tech Stack spans full width at bottom

```tsx
// Tablet: md breakpoint
<div className="grid md:grid-cols-2 gap-4">
  <div className="space-y-4">
    <HeroSection />
    <ProjectsCard />
  </div>
  <div className="space-y-4">
    <CertificationsCard />
    <AboutCard />
  </div>
  <div className="md:col-span-2">
    <TechStackPostIts />
  </div>
</div>
```

### Mobile (< 768px) - Single Column Vertical Layout
- **Single column, vertical stacking** - All sections stack top-to-bottom
- Each section is full-width
- Vertical scrolling ENABLED for mobile only
- `min-h-dvh` instead of `h-dvh` to allow content overflow
- **Section Order (top to bottom):** Hero → Projects → Tech Stack → About → Certifications

```tsx
// Mobile: Single column vertical layout (default, no breakpoint prefix)
<div className="min-h-dvh flex flex-col">
  <header>...</header>

  {/* Content stacks vertically, scrollable */}
  <main className="flex-1 px-4 py-4 overflow-y-auto">
    <div className="flex flex-col gap-4">
      <HeroSection />        {/* Full width */}
      <ProjectsCard />       {/* Full width */}
      <TechStackPostIts />   {/* Full width */}
      <AboutCard />          {/* Full width */}
      <CertificationsCard /> {/* Full width */}
    </div>
  </main>

  <footer>...</footer>
</div>
```

**Mobile Design Notes:**
- No grid layout on mobile - pure flexbox column
- Each card takes full container width
- Users scroll vertically to see all content
- Touch-friendly spacing (gap-4 = 16px between cards)

### 100dvh Mobile Considerations

**Challenge:** Fitting all content in 100dvh on small screens is difficult.

**Solution:**
- Desktop/Tablet: Strict 100dvh (no scroll)
- Mobile: `min-h-dvh` with vertical scroll allowed
- Content is condensed but scrollable on small devices

```tsx
className="h-dvh lg:h-dvh md:h-dvh min-h-dvh"
// Translation: Use exact 100dvh on tablet+, allow growth on mobile
```

---

## Color System

### Minimal Color Philosophy

The v4.0 design uses a **white-dominant** aesthetic with very subtle accent colors.

### Primary Palette

```css
/* Base - Dominant */
--color-white: #FFFFFF;
--color-off-white: #FAFAFA;
--color-light-gray: #F5F5F5;

/* Text */
--color-text-primary: #2D2D2D;
--color-text-secondary: #6B7280;
--color-text-muted: #9CA3AF;

/* Accent - Subtle Use */
--color-accent-green: #77dd87;
--color-accent-blue: #00CEC8;

/* Border */
--color-border: #E5E7EB;
--color-border-light: #F3F4F6;
```

### Subtle Gradient (Center Focus)

A very subtle radial gradient at the center of the grid creates depth without overwhelming.

```css
/* Subtle center gradient */
.content-grid {
  background: radial-gradient(
    ellipse at center,
    rgba(119, 221, 135, 0.03) 0%,    /* Hint of pastel-green */
    rgba(0, 206, 200, 0.02) 30%,      /* Hint of blue-green */
    rgba(255, 255, 255, 1) 70%        /* Fade to white */
  );
}
```

### Tailwind Implementation

```tsx
// Container with subtle gradient
<main className="bg-gradient-radial from-pastel-green/3 via-blue-green/2 to-white">

// Card backgrounds
<div className="bg-white border border-gray-100 rounded-xl">

// Subtle shadow
<div className="shadow-sm hover:shadow-md transition-shadow">
```

### Color Usage Guidelines

| Element | Color | Notes |
|---------|-------|-------|
| Page Background | White (#FFFFFF) | Clean, minimal |
| Card Background | White with subtle border | `border-gray-100` |
| Primary Text | #2D2D2D | High contrast |
| Secondary Text | #6B7280 | Gray-500 |
| Accent (sparingly) | #77dd87 | Links, badges, borders |
| Dividers | #E5E7EB | Gray-200 |
| Hover States | #F9FAFB | Gray-50 |

---

## Typography System

### Compact Scale (v4.0)

The new dashboard layout requires smaller, more compact typography than v3.0.

```css
/* Previous v3.0 Scale */
--font-hero-name: 3rem (48px)
--font-hero-headline: 4.5rem (72px)
--font-section-title: 2.25rem (36px)

/* New v4.0 Compact Scale */
--font-hero-name: 1.5rem (24px)
--font-hero-headline: 2rem (32px)
--font-section-title: 1.25rem (20px)
--font-body: 0.875rem (14px)
--font-small: 0.75rem (12px)
```

### Typography Comparison

| Element | v3.0 (Old) | v4.0 (New) | Change |
|---------|------------|------------|--------|
| Hero Name | text-5xl (48px) | text-2xl (24px) | -50% |
| Hero Headline | text-7xl (72px) | text-3xl (32px) | -55% |
| Section Title | text-4xl (36px) | text-xl (20px) | -44% |
| Body Text | text-base (16px) | text-sm (14px) | -12% |
| Labels | text-sm (14px) | text-xs (12px) | -14% |

### Tailwind Typography Classes

```tsx
// Hero Section (Compact)
<h1 className="text-2xl lg:text-3xl font-bold text-text-dark">
  Stephen Ko
</h1>
<p className="text-lg lg:text-xl font-light text-gray-600">
  I build exceptional web experiences
</p>

// Section Titles
<h2 className="text-lg font-semibold text-text-dark">
  Featured Projects
</h2>

// Card Content
<p className="text-sm text-gray-600 leading-relaxed">
  Card description text
</p>

// Labels & Badges
<span className="text-xs font-medium text-gray-500">
  React
</span>
```

### Font Weights

- **Light (300):** Subheadlines, supporting text
- **Regular (400):** Body text, descriptions
- **Medium (500):** Labels, badges
- **Semibold (600):** Section titles
- **Bold (700):** Hero name, important headings

---

## Component Specifications

### Grid Card (Base Component)

All grid cells share a common card style:

```tsx
interface GridCardProps {
  children: React.ReactNode;
  className?: string;
}

// Base card styling
<div className={cn(
  "bg-white rounded-xl border border-gray-100",
  "p-4 lg:p-5",
  "shadow-sm hover:shadow-md transition-shadow",
  "overflow-hidden",
  className
)}>
  {children}
</div>
```

### Hero Section Card

**Position:** Row 1, Column 1-2 (spans 2 columns)
**Content:** Profile photo, name, headline

```tsx
<GridCard className="flex items-center gap-6">
  {/* Profile Photo - Compact */}
  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full
                  bg-gray-100 border-2 border-pastel-green
                  flex-shrink-0" />

  {/* Text Content */}
  <div className="flex-1 min-w-0">
    <h1 className="text-2xl lg:text-3xl font-bold text-text-dark">
      Stephen Ko
    </h1>
    <p className="text-base lg:text-lg font-light text-gray-600 mt-1">
      I build exceptional web experiences
    </p>
    <p className="text-sm text-gray-500 mt-2">
      Frontend Developer | Seoul, Korea
    </p>
  </div>
</GridCard>
```

### Certifications Card

**Position:** Row 1, Column 3
**Content:** Certification badges/logos, compact list

```tsx
<GridCard>
  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
    Certifications
  </h2>
  <div className="space-y-2">
    {certifications.map(cert => (
      <div key={cert.id} className="flex items-center gap-2">
        <img src={cert.icon} className="w-5 h-5" alt="" />
        <span className="text-sm text-text-dark">{cert.name}</span>
      </div>
    ))}
  </div>
</GridCard>
```

### Projects Card

**Position:** Row 2, Column 1-2 (spans 2 columns)
**Content:** 2-3 featured project thumbnails

```tsx
<GridCard>
  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
    Featured Projects
  </h2>
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
    {projects.slice(0, 3).map(project => (
      <div key={project.id} className="aspect-video rounded-lg bg-gray-100
                                        overflow-hidden group cursor-pointer">
        <img
          src={project.thumbnail}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          alt={project.title}
        />
      </div>
    ))}
  </div>
</GridCard>
```

### About Card

**Position:** Row 2, Column 3
**Content:** Brief bio, 2-3 sentences max

```tsx
<GridCard>
  <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
    About
  </h2>
  <p className="text-sm text-gray-600 leading-relaxed">
    Frontend developer with 5+ years of experience building scalable web applications.
    Passionate about clean code, accessible design, and continuous learning.
  </p>
  <a href="#" className="text-sm text-pastel-green hover:underline mt-3 inline-block">
    Read more
  </a>
</GridCard>
```

### Tech Stack Post-Its

**Position:** Row 3, Column 1-3 (spans full width)
**Content:** Horizontal row of tech logos as post-it style badges

```tsx
<GridCard className="py-3">
  <div className="flex flex-wrap gap-2 justify-center">
    {techStack.map(tech => (
      <div
        key={tech.id}
        className="flex items-center gap-2 px-3 py-1.5
                   bg-gray-50 rounded-lg border border-gray-100
                   hover:border-pastel-green transition-colors"
        style={{ transform: `rotate(${tech.rotation}deg)` }}
      >
        <img src={tech.icon} className="w-4 h-4" alt="" />
        <span className="text-xs font-medium text-gray-700">{tech.name}</span>
      </div>
    ))}
  </div>
</GridCard>
```

---

## Header Component

```tsx
<header className="h-15 px-6 flex items-center justify-between border-b border-gray-100">
  {/* Logo */}
  <a href="/" className="text-lg font-bold text-text-dark hover:text-pastel-green transition-colors">
    SK
  </a>

  {/* i18n Selector */}
  <div className="flex items-center gap-2">
    <button className="text-sm text-gray-600 hover:text-text-dark">EN</button>
    <span className="text-gray-300">|</span>
    <button className="text-sm text-gray-600 hover:text-text-dark">KO</button>
  </div>
</header>
```

---

## Footer Component

```tsx
<footer className="h-12 px-6 flex items-center justify-center border-t border-gray-100">
  <div className="flex items-center gap-6 text-sm text-gray-500">
    <a href="#" className="hover:text-pastel-green transition-colors">GitHub</a>
    <a href="#" className="hover:text-pastel-green transition-colors">LinkedIn</a>
    <a href="#" className="hover:text-pastel-green transition-colors">Email</a>
    <span className="text-gray-300">|</span>
    <span>&copy; 2026 Stephen Ko</span>
  </div>
</footer>
```

---

## Spacing System

### Compact Spacing (v4.0)

| Use Case | v3.0 (Old) | v4.0 (New) | Tailwind |
|----------|------------|------------|----------|
| Grid gap | 32px | 16px | gap-4 |
| Card padding | 32px | 16-20px | p-4 lg:p-5 |
| Section gap | 24px | 12px | gap-3 |
| Element spacing | 16px | 8px | gap-2 |
| Tight spacing | 8px | 4px | gap-1 |

### Container Constraints

```css
/* Content area max-width */
max-width: 1200px;  /* max-w-6xl */

/* Side padding */
padding-left: 24px;   /* px-6 */
padding-right: 24px;  /* px-6 */

/* Grid gap */
gap: 16px;  /* gap-4 */

/* Card border radius */
border-radius: 12px;  /* rounded-xl */
```

---

## Animation & Interaction

### Minimal Animations

The v4.0 design favors subtle, professional animations over flashy effects.

```css
/* Standard transition */
transition: all 150ms ease;

/* Hover shadow lift */
.card:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

/* Hover scale (subtle) */
.project-thumbnail:hover {
  transform: scale(1.02);
}

/* Color transitions */
.link:hover {
  color: var(--color-accent-green);
}
```

### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

---

## Accessibility Guidelines

### Color Contrast

| Combination | Ratio | WCAG |
|-------------|-------|------|
| #2D2D2D on #FFFFFF | 13.5:1 | AAA Pass |
| #6B7280 on #FFFFFF | 5.3:1 | AA Pass |
| #77dd87 on #FFFFFF | 2.1:1 | Decorative only |
| #FFFFFF on #77dd87 | 2.1:1 | Large text only |

### Focus States

```tsx
className="focus:outline-none focus:ring-2 focus:ring-pastel-green focus:ring-offset-2"
```

### Touch Targets

- Minimum size: 44x44px
- Interactive cards: Full card is clickable
- Links: Adequate padding for touch

### Screen Reader

```tsx
// Skip to main content
<a href="#main" className="sr-only focus:not-sr-only">
  Skip to main content
</a>

// Section landmarks
<main id="main" role="main">
<section aria-labelledby="projects-heading">
<h2 id="projects-heading">Featured Projects</h2>
```

---

## Implementation Checklist

### Phase 1: Layout Foundation
- [ ] Set up 100dvh container structure
- [ ] Implement header with logo and i18n
- [ ] Create base GridCard component
- [ ] Implement CSS Grid layout
- [ ] Add responsive breakpoints
- [ ] Test on desktop/tablet/mobile

### Phase 2: Grid Cells
- [ ] Hero Section card (compact profile + name)
- [ ] Certifications card
- [ ] Projects card (thumbnails)
- [ ] About card (brief bio)
- [ ] Tech Stack post-its (horizontal row)
- [ ] Footer with social links

### Phase 3: Polish
- [ ] Subtle center gradient
- [ ] Hover interactions
- [ ] Focus states
- [ ] Reduced motion support
- [ ] Accessibility audit

### Phase 4: Content
- [ ] Profile photo
- [ ] Certification logos
- [ ] Project thumbnails
- [ ] Bio text
- [ ] Tech stack icons

---

## Migration Notes

### Breaking Changes from v3.0

1. **Layout:** Vertical scroll -> Single view grid
2. **Typography:** All sizes reduced by ~50%
3. **Hero Section:** Full-width -> Grid cell
4. **Projects Section:** Bento grid -> Thumbnail row
5. **About Section:** Timeline -> Brief paragraph
6. **Tech Stack:** Orbital pattern -> Horizontal post-its
7. **Spacing:** Generous -> Compact

### What to Keep from v3.0

- Color palette (pastel-green, blue-green)
- Font family (Inter)
- Post-it aesthetic for tech stack
- Profile photo border treatment
- Basic card styling (rounded, shadow)

### What to Archive

All v3.0 section components will need rebuilding:
- `HeroSection.tsx` - Rebuild for compact grid cell
- `TechStackLogos.tsx` - Convert to horizontal post-its
- `ProjectSection.tsx` - Convert to thumbnail row
- `AboutSection.tsx` - Convert to brief card

---

## Version History

### v4.0 (January 7, 2026) - Dashboard Layout
- **MAJOR REDESIGN:** 100dvh single-view layout
- New CSS Grid-based layout system
- Compact typography scale (-50%)
- Minimal color approach (white-dominant)
- New component structure for grid cells
- Mobile: Scrollable fallback

### v3.0 (January 6, 2026)
- Multi-color theme (pastel-green, blue-green, pastel-pink)
- Hero gradient background
- Tech stack post-its with category colors
- About section with timeline
- Archived to `context/archive/`

### v2.0 (January 2, 2026)
- Pastel Green theme
- Tech stack logos orbital pattern
- Archived

### v1.0 (Previous)
- OceanTeel/IslandGreen theme
- Archived

---

**Document maintained by:** @ui-ux-designer
**For implementation status:** See `PROJECT_STATUS.md`
**Previous versions:** See `context/archive/`
