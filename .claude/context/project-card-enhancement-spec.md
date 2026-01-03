# ProjectCard Enhancement - Implementation Specification

**For:** @frontend-dev
**Priority:** Phase 1 (High Impact)
**Estimated Time:** 2-3 hours
**Files to Modify:**
- `/Users/gihunko/projects/portfolio_website/components/ProjectCard/ProjectCard.tsx`
- `/Users/gihunko/projects/portfolio_website/components/shared/TechStackBadges.tsx`

---

## Phase 1: Core Visual Improvements

### 1. Card Container Enhancement

**Location:** ProjectCard.tsx, line 42-53

**Replace this:**
```tsx
<div
  className={cn(
    'flex flex-col gap-4 p-4 max-sm:p-3',
    'bg-white border-2 border-[#333] rounded-xl shadow-lg',
    'transition-all duration-300 hover:shadow-2xl hover:-translate-y-1',
    'max-sm:w-full text-text-dark',
    {
      'lg:w-120 lg:min-h-140 md:w-full': size === 'large',
      'lg:w-70 lg:min-h-70': size === 'small',
    },
  )}
>
```

**With this:**
```tsx
<article
  className={cn(
    'group relative flex flex-col gap-4 p-6 max-sm:p-4',
    // Glassmorphism & modern background
    'bg-white/95 backdrop-blur-sm',
    // Softer border
    'border border-gray-200/60',
    // Contemporary corners
    'rounded-2xl',
    // Multi-layer shadow for depth
    'shadow-[0_4px_24px_-6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.02)]',
    // Smooth transitions
    'transition-all duration-500 ease-out',
    // Enhanced hover state with Pastel Green glow
    'hover:shadow-[0_20px_40px_-12px_rgba(119,221,135,0.25),0_8px_16px_-8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(119,221,135,0.1)]',
    'hover:-translate-y-2',
    'hover:border-[#77dd87]/30',
    'hover:scale-[1.02]',
    // Keyboard focus
    'focus-within:ring-2 focus-within:ring-[#77dd87] focus-within:ring-offset-2',
    // Cursor
    'cursor-pointer',
    'max-sm:w-full text-text-dark',
    {
      'lg:w-120 lg:min-h-140 md:w-full': size === 'large',
      'lg:w-70 lg:min-h-70': size === 'small',
    },
  )}
  aria-label={`Project: ${title}`}
>
```

**Key Changes:**
- Changed `<div>` to `<article>` for semantic HTML
- Added `group` class for child hover effects
- Changed `p-4` to `p-6` for better spacing (desktop)
- Replaced harsh border-2 border-[#333] with softer border-gray-200/60
- Added glassmorphism: bg-white/95 backdrop-blur-sm
- Upgraded to rounded-2xl (16px corners)
- Multi-layer shadow with Pastel Green glow on hover
- Slower transition: duration-500
- Added scale effect: hover:scale-[1.02]
- Added focus-within for keyboard navigation
- Added aria-label for screen readers

---

### 2. Thumbnail Enhancement

**Location:** ProjectCard.tsx, line 55-63

**Replace this:**
```tsx
<div className="relative w-full aspect-video overflow-hidden rounded-lg border-2 border-[#2D2D2D]">
  <Image
    alt={`${title} project thumbnail`}
    src={`${CDN_BASE}/${thumbnail}`}
    fill
    className="object-cover"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
</div>
```

**With this:**
```tsx
<div className="relative w-full aspect-video overflow-hidden rounded-xl group/thumb">
  {/* Gradient overlay on hover */}
  <div className="absolute inset-0 bg-gradient-to-t from-[#77dd87]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

  {/* Shine effect on hover */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 bg-gradient-to-br from-white/0 via-white/20 to-white/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

  {/* Featured badge */}
  {project.featured && (
    <div className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-full bg-[#77dd87] text-white text-xs font-bold uppercase tracking-wider shadow-lg">
      <span className="sr-only">Featured project - </span>
      Featured
    </div>
  )}

  {/* Image with zoom on card hover */}
  <Image
    alt={`${title} project thumbnail`}
    src={`${CDN_BASE}/${thumbnail}`}
    fill
    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
</div>
```

**Key Changes:**
- Removed harsh border-2 border-[#2D2D2D]
- Added group/thumb for nested hover control
- Added gradient overlay (Pastel Green tint on hover)
- Added shine effect (diagonal sweep animation)
- Added Featured badge (if project.featured is true)
- Image zooms to 110% on card hover
- Longer duration: duration-700 for smooth zoom

---

### 3. Typography Hierarchy Enhancement

**Location:** ProjectCard.tsx, line 73-80

**Replace this:**
```tsx
<div className="flex flex-col gap-2 flex-1">
  <h3 className="font-bold text-lg text-text-dark">{title}</h3>
  {description && size === 'large' && (
    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
      {description}
    </p>
  )}
</div>
```

**With this:**
```tsx
<div className="flex flex-col gap-3 flex-1">
  <h3 className="font-bold text-xl md:text-2xl text-text-dark leading-tight group-hover:text-[#77dd87] transition-colors duration-300">
    {title}
  </h3>
  {description && size === 'large' && (
    <p className="text-base text-gray-600 leading-relaxed line-clamp-3 font-light">
      {description}
    </p>
  )}
</div>
```

**Key Changes:**
- Gap increased: gap-2 → gap-3 (12px breathing room)
- Title size increased: text-lg → text-xl md:text-2xl (responsive)
- Title hover effect: group-hover:text-[#77dd87] (cohesion with brand)
- Added leading-tight for better title line height
- Description size increased: text-sm → text-base (16px)
- Added font-light to description for elegance
- Line clamp increased: line-clamp-2 → line-clamp-3 (more context)

---

### 4. Links Section - Button Style

**Location:** ProjectCard.tsx, line 83-112

**Replace this:**
```tsx
<div className="flex items-center gap-3 pt-2 border-t border-gray-200">
  {githubUrl && (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-text-dark hover:text-[#77dd87] transition-colors duration-200"
      aria-label={`View ${title} on GitHub`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      <span className="text-sm font-medium">GitHub</span>
    </a>
  )}
  {liveUrl && (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-text-dark hover:text-[#77dd87] transition-colors duration-200"
      aria-label={`Visit ${title} live site`}
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
      <span className="text-sm font-medium">Live Demo</span>
    </a>
  )}
</div>
```

**With this:**
```tsx
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-4 mt-auto">
  {githubUrl && (
    <a
      href={githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/link flex items-center justify-center gap-2',
        // Button-like styling
        'px-4 py-2.5 rounded-lg',
        // Subtle background
        'bg-gray-50 border border-gray-200',
        // Smooth transitions
        'transition-all duration-300',
        // Enhanced hover state
        'hover:bg-[#77dd87] hover:border-[#77dd87]',
        'hover:shadow-md hover:shadow-[#77dd87]/20',
        'hover:-translate-y-0.5',
        // Text styling
        'text-sm font-semibold text-text-dark',
        'hover:text-white',
        // Focus state
        'focus:outline-none focus:ring-2 focus:ring-[#77dd87] focus:ring-offset-2',
        // Responsive
        'w-full sm:w-auto',
      )}
      aria-label={`View ${title} on GitHub`}
    >
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover/link:scale-110"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
      <span>GitHub</span>
    </a>
  )}
  {liveUrl && (
    <a
      href={liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group/link flex items-center justify-center gap-2',
        // Primary button style
        'px-4 py-2.5 rounded-lg',
        // Pastel Green background
        'bg-[#77dd87] border border-[#77dd87]',
        // Smooth transitions
        'transition-all duration-300',
        // Enhanced hover state
        'hover:bg-[#5fd070] hover:border-[#5fd070]',
        'hover:shadow-lg hover:shadow-[#77dd87]/30',
        'hover:-translate-y-0.5 hover:scale-105',
        // Text styling
        'text-sm font-semibold text-white',
        // Focus state
        'focus:outline-none focus:ring-2 focus:ring-[#77dd87] focus:ring-offset-2',
        // Responsive
        'w-full sm:w-auto',
      )}
      aria-label={`Visit ${title} live site`}
    >
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover/link:rotate-12"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
      <span>Live Demo</span>
    </a>
  )}
</div>
```

**Key Changes:**
- Removed border-t divider for cleaner flow
- Changed to flex-col on mobile, flex-row on sm+ screens
- Both links styled as buttons with padding and rounded corners
- GitHub: Secondary style (gray → Pastel Green on hover)
- Live Demo: Primary style (Pastel Green background)
- Icon animations: scale-110 for GitHub, rotate-12 for Live Demo
- Added proper focus states for keyboard navigation
- Full width on mobile, auto width on desktop
- Added justify-center for centered text/icons
- Increased pt-2 → pt-4 for better separation
- Added mt-auto to push links to bottom

---

### 5. Tech Stack Badges Enhancement

**Location:** TechStackBadges.tsx, line 79-109

**Replace this:**
```tsx
<div
  key={tech}
  className={cn(
    'flex items-center gap-2 bg-white border-l-4 border-l-[#77dd87]',
    'transition-all duration-300 hover:scale-105',
    {
      'px-3 py-1.5': variant === 'default',
      'px-2 py-1': variant === 'compact',
    },
  )}
  title={techData.name}
>
  <div
    className={cn({
      'w-5 h-5': variant === 'default',
      'w-4 h-4': variant === 'compact',
    })}
    dangerouslySetInnerHTML={{ __html: techData.icon.svg }}
  />
  {showLabels && (
    <span
      className={cn('font-semibold text-text-dark uppercase', {
        'text-xs': variant === 'default',
        'text-[10px]': variant === 'compact',
      })}
    >
      {techData.name}
    </span>
  )}
</div>
```

**With this:**
```tsx
<div
  key={tech}
  className={cn(
    'group/badge flex items-center gap-1.5',
    // Modern pill design
    'rounded-full',
    // Gradient background with Pastel Green accent
    'bg-gradient-to-r from-[#77dd87]/10 to-[#77dd87]/5',
    // Subtle border
    'border border-[#77dd87]/20',
    // Shadow for depth
    'shadow-sm',
    // Smooth transitions
    'transition-all duration-300',
    // Enhanced hover state
    'hover:shadow-md hover:border-[#77dd87]/40 hover:scale-105',
    'hover:bg-gradient-to-r hover:from-[#77dd87]/15 hover:to-[#77dd87]/10',
    {
      'px-3 py-1.5': variant === 'default',
      'px-2.5 py-1': variant === 'compact',
    },
  )}
  title={techData.name}
>
  {/* Icon with brand color */}
  <div
    className={cn(
      'transition-all duration-300',
      'group-hover/badge:brightness-110',
      {
        'w-5 h-5': variant === 'default',
        'w-4 h-4': variant === 'compact',
      }
    )}
    style={{ color: `#${techData.icon.hex}` }}
    dangerouslySetInnerHTML={{ __html: techData.icon.svg }}
  />
  {showLabels && (
    <span
      className={cn(
        'font-semibold text-text-dark transition-colors duration-300',
        'group-hover/badge:text-[#77dd87]',
        {
          'text-xs': variant === 'default',
          'text-[11px]': variant === 'compact',
        }
      )}
    >
      {techData.name}
    </span>
  )}
</div>
```

**Key Changes:**
- Changed from flag design to modern pill design (rounded-full)
- Added gradient background: from-[#77dd87]/10 to-[#77dd87]/5
- Removed border-l-4, added full border with Pastel Green tint
- Added shadow-sm for subtle depth
- Icons now show in brand colors: style={{ color: `#${techData.icon.hex}` }}
- Text turns Pastel Green on hover
- Icons brighten on hover (brightness-110)
- Improved compact text size: 10px → 11px (better readability)
- Gap reduced: gap-2 → gap-1.5 (tighter in pill design)

---

## Import Requirements

Make sure these imports are at the top of ProjectCard.tsx:

```tsx
import { CDN_BASE } from '@/app/config/cdn';
import { cn } from '@/app/utils';
import Image from 'next/image';
import { TechStackBadges } from '@/components/shared';
```

No new imports needed - all functionality uses existing utilities.

---

## Testing Checklist

After implementation, verify:

### Visual Testing
- [ ] Cards have glassmorphism effect (subtle transparency)
- [ ] Hover creates Pastel Green glow shadow
- [ ] Cards lift and scale smoothly on hover
- [ ] Thumbnails zoom to 110% on card hover
- [ ] Shine effect sweeps across thumbnail on hover
- [ ] Featured badge appears if project.featured is true
- [ ] Title turns Pastel Green on card hover
- [ ] Tech badges are pill-shaped with gradient background
- [ ] Tech badge icons show in brand colors
- [ ] Links are styled as buttons (GitHub: gray, Live Demo: Pastel Green)
- [ ] Link icons animate on hover (scale/rotate)

### Responsive Testing
- [ ] Mobile (375px): Buttons stack vertically and go full-width
- [ ] Tablet (768px): Layout adapts correctly
- [ ] Desktop (1920px): Full hover effects work smoothly

### Accessibility Testing
- [ ] Keyboard navigation: Tab through cards and links
- [ ] Focus states visible (ring-2 ring-[#77dd87])
- [ ] Screen reader: aria-label reads correctly
- [ ] Color contrast: All text meets WCAG AA (4.5:1 minimum)
- [ ] Touch targets: All buttons minimum 44x44px

### Performance Testing
- [ ] Smooth animations (no jank)
- [ ] No layout shift on hover
- [ ] Images load efficiently (Next.js Image optimization)

---

## Browser Support

Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Mobile Chrome (Android)

All modern browsers support:
- CSS backdrop-filter (glassmorphism)
- Multi-layer box-shadow
- CSS transforms (scale, translate)
- Gradient backgrounds

---

## Performance Notes

- Use GPU-accelerated properties: `transform`, `opacity`
- Avoid animating: `width`, `height`, `margin`, `padding`
- `backdrop-blur-sm` is performant on modern devices
- Keep transition durations reasonable (300ms-700ms)

---

## Accessibility Notes

### Keyboard Navigation Flow
1. Tab to card (card gets focus-within ring)
2. Tab to first link (GitHub button)
3. Tab to second link (Live Demo button)
4. Tab to next card

### Screen Reader Experience
- Card announces: "Project: [Title]"
- Featured badge announces: "Featured project - Featured"
- Links announce: "View [Title] on GitHub" / "Visit [Title] live site"

---

## Common Issues & Solutions

### Issue: Glassmorphism not visible
**Solution:** Ensure parent has background (ProjectSection has grid background)

### Issue: Hover glow not showing
**Solution:** Check shadow syntax - must use rgba() format correctly

### Issue: Links not stacking on mobile
**Solution:** Verify flex-col sm:flex-row is applied to container

### Issue: Icons not showing brand colors
**Solution:** Ensure style={{ color: `#${techData.icon.hex}` }} is applied

### Issue: Animations feel slow
**Solution:** Adjust duration values (start with duration-300)

---

## Phase 2 Preview (Future Enhancement)

After Phase 1 is complete and tested, Phase 2 will add:
- Staggered card entrance animations
- Project category filters
- Star count display with animation
- "View More" button for pagination
- Skeleton loading states

**For now, focus on Phase 1 implementation.**

---

## Questions or Issues?

If any Tailwind classes don't work or requirements are unclear:
1. Check Tailwind documentation for correct syntax
2. Verify arbitrary values use square brackets correctly
3. Test in isolation first, then integrate
4. Refer back to design review document for context

**Ready to implement!** 🚀
