# Stephen Ko's Portfolio Website

![CI badge](https://github.com/nordic96/portfolio_website/actions/workflows/npm_build.yml/badge.svg)
![Code Analysis badge](https://github.com/nordic96/portfolio_website/actions/workflows/codeql-analysis.yml/badge.svg)

A modern, responsive portfolio website built with Next.js 16 and React 19, featuring a Night Sky theme design with glassmorphism effects and smooth animations.

**Live Site:** [stephenghk.com](https://stephenghk.com)

![Application Screenshot](./docs/img/thumbnail.png)

## Features

- **Night Sky Theme** - Beautiful gradient background with star field animation
- **Live Project Previews** - Interactive iPhone frame mockups with live iframe content
- **Glassmorphism UI** - Modern frosted glass card effects
- **Internationalization** - English and Korean language support via next-intl
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Accessibility** - ARIA labels, semantic HTML, and reduced motion support
- **Calligraphy Signature** - Animated signature reveal effect

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| i18n | next-intl |
| UI Components | MUI (Material UI) |
| Icons | simple-icons, MUI Icons |
| Fonts | Poppins, Roboto |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone the repository
git clone https://github.com/nordic96/portfolio_website.git
cd portfolio_website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Git Hooks (Husky)

This project uses Husky for automated quality checks:

- **Pre-commit**: Runs linting and tests
- **Pre-push**: Runs production build

## Project Structure

```
portfolio_website/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   └── [locale]/     # Internationalized routes
│   ├── components/       # React components
│   ├── styles/           # Global styles and base styles
│   └── i18n/             # Internationalization config
├── public/               # Static assets
├── messages/             # Translation files (en.json, ko.json)
└── docs/                 # Documentation and images
```

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

**Stephen Ko** - Frontend Software Engineer based in Singapore

- LinkedIn: [linkedin.com/in/gihunko](https://linkedin.com/in/gihunko)
- GitHub: [github.com/nordic96](https://github.com/nordic96)
