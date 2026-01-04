# About/Personal Story Section - Design Specification

**Version:** 1.0
**Last Updated:** January 3, 2026
**Status:** Ready for Implementation
**Priority:** HIGH (Next after Featured Projects)

---

## Overview

The About/Personal Story Section completes the trust and credibility ladder after the Hero and Featured Projects sections. It humanizes the portfolio by sharing Stephen's unique career journey, national service milestone, and learning philosophy.

**Strategic Purpose:**
- Build emotional connection and trust
- Answer recruiter questions (cultural fit, availability, motivation)
- Demonstrate communication skills through storytelling
- Improve SEO with keyword-rich narrative content
- Increase time on site and conversion rates

---

## Content Structure

### Section Title
```
About Me
The Journey Behind the Code
```

**Typography:**
- "About Me": `text-4xl md:text-5xl font-bold text-text-dark`
- "The Journey Behind the Code": `text-lg md:text-xl font-light text-gray-600`
- "Code" gets Pastel Green accent: `text-[#77dd87]`

### Four Main Content Blocks

#### 1. Opening Hook (2-3 sentences)
**Purpose:** Immediately establish who you are, availability, and mission

**Content Template:**
```
I'm a software engineer specializing in full-stack development with a
passion for building exceptional user experiences. After completing my
national service in September 2025, I'm actively seeking opportunities
to contribute to innovative teams. My mission is to craft digital
products that are not only technically robust but also delightfully
intuitive.
```

**Layout:**
- Desktop: Two-column (profile photo left, text right)
- Mobile: Single column (photo top, text below)
- Photo optional (can use placeholder from hero)

**Styling:**
```tsx
<div className="flex flex-col md:flex-row gap-8 items-center">
  {/* Profile photo - optional */}
  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden
                  ring-4 ring-[#77dd87] shadow-xl shadow-[#77dd77]/20">
    <Image src="/profile.jpg" alt="Stephen Ko" fill />
  </div>

  {/* Opening text */}
  <div className="flex-1 text-base md:text-lg leading-relaxed text-gray-700">
    {/* Content here */}
  </div>
</div>
```

---

#### 2. Timeline Journey (5-7 milestones)

**Purpose:** Visual storytelling of career progression from 2018 to 2026

**Timeline Events (User to provide specific details):**

1. **2018 - The Beginning**
   - First exposure to HTML/CSS
   - Curiosity sparked for web development

2. **2019-2020 - Building Foundation**
   - Learned React, JavaScript fundamentals
   - First full-stack projects

3. **2021-2022 - Expanding Horizons**
   - TypeScript, modern build tools
   - DevOps and deployment pipelines

4. **2023-2024 - Mastery Phase**
   - Complex applications, team collaboration
   - UI/UX design principles

5. **2024-2025 - National Service & Growth**
   - Completed national service (Sept 2025)
   - Continued learning, built this portfolio

6. **2026 - Ready for Impact**
   - Fresh mindset, hungry to contribute
   - Seeking team to make meaningful impact

**Visual Design:**

**Desktop (Horizontal Timeline):**
```
2018 ─────→ 2019 ─────→ 2021 ─────→ 2023 ─────→ 2025 ─────→ 2026
  •            •            •            •            •            •
Beginning   Foundation  Expanding   Mastery    Service    Ready
```

**Mobile (Vertical Timeline):**
```
2018
  •  The Beginning
  │
2019
  •  Building Foundation
  │
2021
  •  Expanding Horizons
  ⋮
```

**Component Structure:**
```tsx
<div className="relative">
  {/* Timeline container - horizontal on desktop, vertical on mobile */}
  <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-4">
    {timelineEvents.map((event, index) => (
      <TimelineItem
        key={event.year}
        year={event.year}
        title={event.title}
        description={event.description}
        index={index}
      />
    ))}
  </div>

  {/* Connecting line - Pastel Green gradient */}
  <div className="absolute top-8 left-8 right-8 h-1 bg-gradient-to-r
                  from-[#77dd87]/20 via-[#77dd87] to-[#77dd87]/20
                  hidden md:block -z-10" />
</div>
```

**TimelineItem Component:**
```tsx
interface TimelineItemProps {
  year: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ year, title, description, index }) => {
  return (
    <div className="flex flex-row md:flex-col items-start md:items-center gap-4 md:gap-2
                    opacity-0 animate-fadeInUp"
         style={{ animationDelay: `${index * 150}ms` }}>
      {/* Year badge */}
      <div className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-full
                      bg-gradient-to-br from-[#77dd87] to-[#5fd070]
                      flex items-center justify-center
                      shadow-lg shadow-[#77dd87]/30
                      text-white font-bold text-lg md:text-xl">
        {year}
      </div>

      {/* Content */}
      <div className="flex-1 md:text-center">
        <h4 className="font-semibold text-base md:text-lg text-text-dark mb-1">
          {title}
        </h4>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
```

**Animation:**
```css
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

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .animate-fadeInUp {
    animation: fadeInStatic 0.01ms forwards;
  }
}
```

---

#### 3. Learning Philosophy (Pull Quote)

**Purpose:** Highlight growth mindset and continuous learning ethos

**Content Template (User to customize):**
```
"This portfolio itself is a testament to continuous learning. Every
project, every line of code, represents not just what I've built, but
what I've learned along the way. I believe the best developers are
perpetual students—curious, humble, and always pushing boundaries."
```

**Visual Design:**
```tsx
<div className="relative max-w-3xl mx-auto my-16 p-8 md:p-12
                bg-gradient-to-br from-[#77dd87]/5 to-white
                border-l-4 border-[#77dd87]
                rounded-r-2xl
                shadow-xl shadow-[#77dd87]/10">
  {/* Quote icon */}
  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#77dd87]
                  rounded-full flex items-center justify-center
                  shadow-lg shadow-[#77dd87]/30">
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
    </svg>
  </div>

  {/* Quote text */}
  <blockquote className="text-lg md:text-xl font-light text-gray-700
                         leading-relaxed italic mb-4">
    {philosophyText}
  </blockquote>

  {/* Attribution */}
  <cite className="block text-sm md:text-base font-semibold
                   text-[#77dd87] not-italic">
    — Learning Philosophy
  </cite>
</div>
```

**Optional: Links to Certifications/Publications**
```tsx
<div className="flex flex-wrap gap-4 mt-6 justify-center">
  <a href="#" className="inline-flex items-center gap-2 px-4 py-2
                         bg-white border border-gray-200 rounded-lg
                         hover:border-[#77dd87] hover:shadow-md
                         transition-all duration-300">
    <CertificateIcon className="w-5 h-5 text-[#77dd87]" />
    <span className="text-sm font-medium">View Certifications</span>
  </a>
</div>
```

---

#### 4. What Drives Me (Closing Statement)

**Purpose:** Add personality, passion, and forward-looking energy

**Content Template (User to customize):**
```
I'm driven by the challenge of turning complex problems into elegant
solutions. There's nothing quite like the moment when a user interface
clicks perfectly, or when clean architecture makes a codebase sing.
I'm excited to join a team where I can contribute my skills while
continuing to grow alongside talented engineers.
```

**Styling:**
```tsx
<div className="max-w-2xl mx-auto text-center">
  <h3 className="text-2xl md:text-3xl font-bold text-text-dark mb-4">
    What Drives Me
  </h3>
  <p className="text-base md:text-lg leading-relaxed text-gray-700">
    {drivingForceText}
  </p>
</div>
```

---

## Complete Layout Structure

```tsx
<section
  id="about"
  className="relative bg-white py-24 md:py-32 px-6 md:px-12"
  aria-label="About Stephen Ko"
>
  <div className="max-w-4xl mx-auto">
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-text-dark mb-4">
        About Me
      </h2>
      <p className="text-lg md:text-xl font-light text-gray-600">
        The Journey Behind the{' '}
        <span className="text-[#77dd87]">Code</span>
      </p>

      {/* Decorative divider */}
      <div className="mt-8 w-24 h-1 mx-auto
                      bg-gradient-to-r from-transparent via-[#77dd87] to-transparent
                      rounded-full" />
    </div>

    {/* 1. Opening Hook */}
    <div className="mb-20">
      {/* Two-column layout: photo + text */}
    </div>

    {/* 2. Timeline Journey */}
    <div className="mb-20">
      <h3 className="text-2xl md:text-3xl font-bold text-text-dark
                     text-center mb-12">
        My Journey
      </h3>
      {/* Timeline component */}
    </div>

    {/* 3. Learning Philosophy (Pull Quote) */}
    <div className="mb-20">
      {/* Pull quote box */}
    </div>

    {/* 4. What Drives Me */}
    <div>
      {/* Closing statement */}
    </div>
  </div>
</section>
```

---

## Design System Alignment

### Colors
- **Background:** White (`bg-white`)
- **Headings:** Text Dark (`text-text-dark` / `#2D2D2D`)
- **Body Text:** Gray-600 (`text-gray-600`) and Gray-700 (`text-gray-700`)
- **Accents:** Pastel Green (`text-[#77dd87]` / `bg-[#77dd87]`)
- **Timeline Dots:** Pastel Green gradient (`from-[#77dd87] to-[#5fd070]`)
- **Pull Quote Background:** `bg-gradient-to-br from-[#77dd87]/5 to-white`
- **Borders:** Pastel Green (`border-[#77dd87]`)

### Typography
- **Font Family:** Inter (weights: 300, 400, 600, 700, 900)
- **Section Title:** `text-4xl md:text-5xl font-bold`
- **Subtitle:** `text-lg md:text-xl font-light`
- **Timeline Years:** `text-lg md:text-xl font-bold`
- **Timeline Titles:** `text-base md:text-lg font-semibold`
- **Body Text:** `text-base md:text-lg leading-relaxed`
- **Pull Quote:** `text-lg md:text-xl font-light italic`

### Spacing
- **Section Padding:** `py-24 md:py-32` (96px mobile, 128px desktop)
- **Content Max Width:** `max-w-4xl` (896px for readability)
- **Between Blocks:** `mb-16` to `mb-20` (64-80px)
- **Internal Gaps:** `gap-8 md:gap-12` (32-48px)

### Shadows
- **Timeline Dots:** `shadow-lg shadow-[#77dd87]/30`
- **Pull Quote:** `shadow-xl shadow-[#77dd87]/10`
- **Profile Photo:** `shadow-xl shadow-[#77dd87]/20`

### Responsive Breakpoints
- **Mobile (<768px):** Single column, vertical timeline, full-width elements
- **Tablet (768-1023px):** Optimized spacing, larger typography
- **Desktop (≥1024px):** Horizontal timeline, two-column opening layout

---

## Accessibility Requirements

### Semantic HTML
```tsx
<section id="about" aria-label="About Stephen Ko">
  <h2>About Me</h2>
  <article>
    <h3>My Journey</h3>
    <ol> {/* Timeline as ordered list */}
      <li>
        <time dateTime="2018">2018</time>
        <h4>The Beginning</h4>
        <p>Description...</p>
      </li>
    </ol>
  </article>

  <blockquote cite="Stephen Ko">
    <p>Learning philosophy quote...</p>
    <cite>— Learning Philosophy</cite>
  </blockquote>
</section>
```

### WCAG AA Compliance
- **Color Contrast:**
  - Text Dark on White: 13.5:1 (AAA) ✅
  - Gray-700 on White: 7.2:1 (AAA) ✅
  - Gray-600 on White: 5.5:1 (AA) ✅
  - Pastel Green used only for accents, not small text

### Keyboard Navigation
- All interactive elements (links to certifications) focusable
- Focus indicators visible with Pastel Green ring
- Logical tab order (top to bottom)

### Screen Reader Support
- Proper heading hierarchy (h2 → h3 → h4)
- `aria-label` on section for context
- Timeline uses semantic `<time>` elements with `dateTime` attribute
- Decorative elements marked `aria-hidden="true"`

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Animations & Interactions

### Scroll-Triggered Animations

**Timeline Items:**
- Fade in and slide up sequentially
- 150ms delay between each item
- Triggered when scrolling into viewport

**Implementation:**
```tsx
// Using Intersection Observer or framer-motion
const { ref, inView } = useInView({
  threshold: 0.2,
  triggerOnce: true,
});

return (
  <div ref={ref} className={inView ? 'animate-fadeInUp' : 'opacity-0'}>
    {/* Timeline item content */}
  </div>
);
```

### Hover States

**Timeline Year Badges:**
```css
.timeline-badge {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 20px 40px rgba(119, 221, 135, 0.4);
}
```

**Certification Links:**
```css
.cert-link {
  transition: all 0.3s ease;
}

.cert-link:hover {
  border-color: #77dd87;
  box-shadow: 0 4px 12px rgba(119, 221, 135, 0.15);
  transform: translateY(-2px);
}
```

---

## Component Architecture

### File Structure
```
/components/AboutSection/
  ├── AboutSection.tsx        # Main section container
  ├── TimelineItem.tsx        # Individual timeline event
  ├── Timeline.tsx            # Timeline wrapper with connecting line
  ├── PullQuote.tsx           # Philosophy quote box
  └── index.ts                # Barrel export

/types/
  └── about.ts                # TypeScript interfaces
```

### TypeScript Interfaces

```typescript
// types/about.ts
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface AboutContent {
  openingHook: string;
  timelineEvents: TimelineEvent[];
  learningPhilosophy: string;
  whatDrivesMe: string;
  profilePhotoUrl?: string;
  certifications?: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}
```

### Props Interface

```typescript
// components/AboutSection/AboutSection.tsx
interface AboutSectionProps {
  content: AboutContent;
  showProfilePhoto?: boolean;
  animateOnScroll?: boolean;
}

const AboutSection: React.FC<AboutSectionProps> = ({
  content,
  showProfilePhoto = false,
  animateOnScroll = true,
}) => {
  // Component implementation
};
```

---

## Content Requirements (User Input Needed)

Before implementation, gather from user:

### 1. Opening Hook (2-3 sentences)
- Who you are professionally
- Current availability status (completed national service Sept 2025)
- Core mission/value proposition

### 2. Timeline Events (5-7 milestones)
For each event, provide:
- **Year:** (e.g., "2018", "2019-2020", "2023")
- **Title:** (e.g., "The Beginning", "Building Foundation")
- **Description:** (1-2 sentences explaining what happened)

### 3. Learning Philosophy (2-4 sentences)
- Personal approach to learning and growth
- What the portfolio represents
- Core beliefs about development

### 4. What Drives Me (2-3 sentences)
- Passion points (problem-solving, UX, clean code)
- What excites you about the field
- Forward-looking goals

### 5. Optional Assets
- Profile photo (if different from hero section)
- Links to certifications/publications
- Awards or recognitions

---

## Implementation Checklist

### Phase 1: Component Setup (4-6 hours)
- [ ] Create AboutSection component structure
- [ ] Create TimelineItem component
- [ ] Create Timeline wrapper with connecting line
- [ ] Create PullQuote component
- [ ] Set up TypeScript interfaces
- [ ] Create mock/placeholder content for testing

### Phase 2: Styling & Layout (4-6 hours)
- [ ] Implement section header with gradient divider
- [ ] Build two-column opening layout (photo + text)
- [ ] Style timeline (horizontal desktop, vertical mobile)
- [ ] Design pull quote box with glassmorphism
- [ ] Add "What Drives Me" closing section
- [ ] Ensure Pastel Green theme consistency
- [ ] Test responsive breakpoints

### Phase 3: Animations & Interactions (2-3 hours)
- [ ] Add scroll-triggered fade-in animations
- [ ] Sequential timeline item reveals
- [ ] Hover states for timeline badges
- [ ] Link hover effects (if certifications included)
- [ ] Test `prefers-reduced-motion` support
- [ ] Verify 60fps smooth animations

### Phase 4: Accessibility & Polish (2-3 hours)
- [ ] Semantic HTML (section, article, time, blockquote)
- [ ] ARIA labels and roles
- [ ] Keyboard navigation testing
- [ ] Screen reader testing
- [ ] Color contrast verification (WCAG AA)
- [ ] Focus indicator styling

### Phase 5: Content Integration (1-2 hours)
- [ ] Replace mock content with user-provided copy
- [ ] Add profile photo (if available)
- [ ] Insert certification links (if provided)
- [ ] Proofread all text content
- [ ] Verify timeline chronology

### Phase 6: Testing & QA (2-3 hours)
- [ ] Visual testing on mobile (375px)
- [ ] Visual testing on tablet (768px)
- [ ] Visual testing on desktop (1920px)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Performance audit (Lighthouse)
- [ ] Accessibility audit
- [ ] Final polish and bug fixes

---

## Performance Targets

### Lighthouse Scores
- **Performance:** ≥90
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Core Web Vitals
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### Optimization Strategies
- Lazy load images below the fold
- Use Next.js `<Image>` component with responsive sizes
- Minimize animation JavaScript (prefer CSS animations)
- Use Intersection Observer for scroll animations
- Defer non-critical content loading

---

## SEO Considerations

### Keywords to Include
- "software engineer"
- "full-stack developer"
- "React developer"
- "TypeScript specialist"
- "available for hire"
- "completed national service"
- "South Korea" (if applicable)

### Structured Data (Schema.org)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Stephen Ko (Gi Hun Ko)",
  "jobTitle": "Software Engineer",
  "description": "Full-stack developer specializing in React, TypeScript, and modern web technologies",
  "url": "https://stephenghk.com",
  "alumniOf": "National Service (2024-2025)",
  "knowsAbout": ["React", "TypeScript", "Next.js", "DevOps", "UI/UX Design"]
}
```

### Meta Tags
```html
<meta name="description" content="About Stephen Ko - Software engineer with a passion for building exceptional web experiences. Available for opportunities after completing national service." />
<meta property="og:title" content="About Me - Stephen Ko" />
<meta property="og:description" content="My journey from curious beginner to proficient full-stack developer" />
```

---

## Success Metrics

### User Engagement
- **Time on Site:** Target +45% increase
- **Scroll Depth:** Target 85%+ reaching bottom of About section
- **Bounce Rate:** Target reduction to <40%

### Conversion
- **Contact Form Submissions:** Target +60% increase
- **Link Clicks:** Track certification/publication link engagement

### SEO Impact
- **Organic Traffic:** Monitor increase from story keywords
- **Page Rank:** Improved ranking for "software engineer available [location]"

---

## Estimated Timeline

**Total Implementation:** 3-4 days

**Breakdown:**
- **Day 1:** Component setup, layout structure, mock content (8 hours)
- **Day 2:** Styling, responsive design, animations (8 hours)
- **Day 3:** Accessibility, content integration, testing (6-8 hours)
- **Day 4 (optional):** Polish, bug fixes, final QA (2-4 hours)

---

## Review & Approval

### Design Review (by @ui-ux-designer)
- [ ] Visual hierarchy flows naturally
- [ ] Pastel Green theme maintained
- [ ] Typography scale is readable and elegant
- [ ] Spacing and balance are professional
- [ ] Animations are smooth and purposeful

### Implementation Review (by @frontend-dev)
- [ ] Code is clean and maintainable
- [ ] TypeScript types are comprehensive
- [ ] Components are reusable
- [ ] Performance targets met
- [ ] Accessibility standards achieved

### User Acceptance
- [ ] Content accurately represents personal story
- [ ] Timeline events are chronologically correct
- [ ] Tone and voice feel authentic
- [ ] All information is up-to-date
- [ ] Ready for production deployment

---

## Future Enhancements (Post-v1.0)

### Potential Additions
- **Interactive Timeline:** Click events to expand details
- **Photo Gallery:** Showcase work environment, team photos
- **Skills Visualization:** Integrate tech proficiency chart
- **Testimonials:** Add recommendations from colleagues
- **Blog Integration:** Link to technical writing or tutorials
- **Video Introduction:** Embed 30-60 second personal intro video

---

## Related Documents

- **Design System:** `.claude/context/DESIGN_SYSTEM.md`
- **Project Status:** `.claude/context/PROJECT_STATUS.md`
- **Implementation Priorities:** `.claude/context/IMPLEMENTATION_PRIORITIES.md`
- **Hero Section Review:** `.claude/context/hero-section-review-v2.0.md`
- **Project Cards Review:** `.claude/context/project-cards-implementation-review.md`

---

**Document Version:** 1.0
**Created By:** @ui-ux-designer
**For Implementation By:** @frontend-dev
**Last Updated:** January 3, 2026
**Status:** ✅ Ready for Development
