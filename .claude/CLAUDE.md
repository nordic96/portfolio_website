# Stephen's Portfolio Website

## Project Overview
Personal portfolio website built with Next.js, React, TypeScript, and Tailwind CSS.
Deployed on Vercel at https://stephenghk.com

## MCP Servers Enabled
- **Playwright MCP**: Visual browser automation for testing and debugging UI
- **Sequential Thinking MCP**: Breaking down complex problems into structured thinking steps

## Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **UI**: React 18+ with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Material UI Icons (Google Icons)
- **Deployment**: Vercel
- **State Management**: Jotai
- **API**: GraphQL Server connected with MongoDB
- **Version Control**: GitHub

## MCP Servers Enabled
- **Playwright MCP**: Visual browser automation for testing and debugging UI
- **Sequential Thinking MCP**: Breaking down complex problems into structured thinking steps

## Subagents

### @ui-ux-designer
**Role**: Design analysis, conceptual design, and UX recommendations
**When to use**:
- Analyzing current design and UX
- Creating new design concepts
- Reviewing implemented features
- Providing design specifications
- Accessibility audits

### @frontend-dev
**Role**: Implementation of designs and features
**When to use**:
- Building components from design specs
- Refactoring existing code
- Performance optimization
- TypeScript implementation
- Tailwind styling

## Collaborative Workflow

### Design-to-Development Process

1. **Discovery & Analysis** (@ui-ux-designer)
```
   @ui-ux-designer Please analyze the current homepage and identify 
   top 3 UX improvements we should prioritize
```

2. **Design Specifications** (@ui-ux-designer)
```
   @ui-ux-designer Create detailed design specs for the hero section 
   revamp, including responsive behavior
```

3. **Implementation** (@frontend-dev)
```
   @frontend-dev Implement the hero section based on the design specs 
   from @ui-ux-designer
```

4. **Review & Iterate** (@ui-ux-designer)
```
   @ui-ux-designer Review the implemented hero section and provide 
   feedback on the execution
```

### Handoff Format
When @ui-ux-designer provides specs, @frontend-dev expects:
- Specific Tailwind utility classes or design tokens
- Exact spacing values (px, rem)
- Color codes from existing palette
- Component hierarchy and structure
- Responsive breakpoint behaviors
- Accessibility requirements

## Project Goals
- Showcase projects and skills effectively
- Create memorable, professional first impression
- Ensure exceptional mobile experience
- Optimize for performance and SEO
- Maintain accessibility standards (WCAG AA minimum)

## Development Commands
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking
- `npm run start` - Start production server

## Key Directories
- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/styles` - Global styles and Tailwind config
- `/public` - Static assets

## Design System (To be defined by @ui-ux-designer)
- **Colors**: Refer to Colour Theme & Consistency Section for Colour Palatte of the project
- **Typography**: Use Roboto as prime font
- **Spacing Scale**: [TBD]
- **Component Patterns**: [TBD]

## Current Site Analysis Needed
- [ ] Hero section UX and visual impact
- [ ] Projects showcase discoverability
- [ ] Navigation effectiveness
- [ ] Mobile experience
- [ ] Loading performance
- [ ] Accessibility compliance
- [ ] Overall information architecture

## Using MCP Servers

### Playwright MCP
Use for:
- Visual design audits (@ui-ux-designer)
- Screenshot comparisons before/after (@both)
- Responsive design verification (@both)
- Accessibility testing (@ui-ux-designer)
- Implementation verification (@frontend-dev)

### Sequential Thinking MCP
Use for:
- Design problem breakdown (@ui-ux-designer)
- Complex feature planning (@both)
- Architecture decisions (@frontend-dev)
- User journey mapping (@ui-ux-designer)

## Communication Between Agents

### @ui-ux-designer → @frontend-dev
- Design specifications with Tailwind context
- Visual references (screenshots, diagrams)
- Interaction specifications
- Accessibility requirements

### @frontend-dev → @ui-ux-designer
- Implementation questions/clarifications
- Technical constraints/limitations
- Completed work for review
- Alternative approaches for feedback

## Example Multi-Agent Workflow
```
User: I want to revamp my hero section

Step 1:
@ui-ux-designer analyze the current hero section on localhost:3000 
and provide design recommendations

Step 2: (after receiving design specs)
@frontend-dev implement the hero section redesign according to the 
specs from @ui-ux-designer

Step 3: (after implementation)
@ui-ux-designer review the implemented hero section and provide 
feedback on design execution

Step 4: (if needed)
@frontend-dev make the refinements suggested by @ui-ux-designer
```

### Colour Theme & Consistency
- BlueDianne #1f5b5b [Primary]
- Bilbao #367012 [Secondary]
- Copper #b68b3b