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
- **Deployment**: Vercel
- **State Management**: Jotai
- **API**: GraphQL Server connected with MongoDB
- **Version Control**: GitHub

## Project Goals
- Showcase personal projects and skills
- Maintain clean, modern design
- Ensure responsive across all devices
- Optimize for performance and SEO
- Best frontend development practices with a11y and i18n Support

## Default Subagent
Use the `frontend-dev` subagent for UI/UX work, component development, and styling tasks.

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

## Key Directories
- `/src/app` - Next.js app router pages and apis (backend for frontend)
- `/src/components` - React components
- `/src/styles` - Global styles and Tailwind config
- `/src/models` - DTO models for GraphQL with MongoDB
- `/src/store` - Jotai Atom States
- `/public` - Static assets

## Design Principles
- Mobile-first responsive design
- Accessible (WCAG 2.1 AA)
- Fast page loads (<3s FCP)
- Clean, professional aesthetic

## Using MCP Servers

### Playwright MCP
Use for:
- Visual regression testing
- Screenshot comparisons
- Cross-browser testing
- Accessibility auditing
- Responsive design verification

Example: "Use Playwright to navigate to the homepage and take a screenshot of the hero section"

### Sequential Thinking MCP
Use for:
- Complex feature planning
- Architecture decisions
- Debugging complex issues
- Refactoring strategies

Example: "Use sequential thinking to plan the implementation of a new blog section"