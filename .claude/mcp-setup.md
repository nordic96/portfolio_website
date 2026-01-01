# MCP Server Setup Guide

## Prerequisites

Both MCP servers run via `npx`, so you only need:
- Node.js 18+ installed
- npm or yarn

No additional installation required - they'll be downloaded on first use.

## Playwright MCP

### Configuration
- **Browser**: Chromium (default)
- **Headless**: Yes (can be changed in mcp.json)

### Available Actions
- `playwright_navigate` - Navigate to URLs
- `playwright_screenshot` - Capture screenshots
- `playwright_click` - Click elements
- `playwright_fill` - Fill form inputs
- `playwright_evaluate` - Run JavaScript in browser

### Common Use Cases
```bash
# Navigate to local dev server
Navigate to http://localhost:3000

# Screenshot the entire page
Take a screenshot of the current page

# Screenshot specific viewport sizes
Take a screenshot at mobile width (375px)
Take a screenshot at tablet width (768px)
Take a screenshot at desktop width (1440px)

# Test specific components
Navigate to http://localhost:3000, scroll to #projects section, and screenshot it
```

## Sequential Thinking MCP

### Configuration
No special configuration needed.

### Available Actions
- `create_thinking` - Start a new thinking session
- `add_thought` - Add thoughts to the session
- `get_thinking` - Retrieve thinking session

### Common Use Cases
```bash
# Plan a new feature
Use sequential thinking to plan implementing a contact form:
- Requirements analysis
- Component design
- State management strategy
- Validation approach
- API integration
- Error handling

# Debug complex issues
Use sequential thinking to debug why the navigation is flickering:
- Identify symptoms
- Trace component lifecycle
- Check state updates
- Examine CSS transitions
- Test solutions iteratively

# Architectural decisions
Use sequential thinking to decide on the best approach for image optimization:
- Evaluate Next.js Image component
- Consider CDN options
- Analyze bundle impact
- Compare loading strategies
- Make recommendation
```

## Troubleshooting

### Playwright Issues
- **Server not running**: Ensure `npm run dev` is active before using Playwright
- **Port conflicts**: Check that port 3000 is available
- **Browser launch fails**: Try setting `PLAYWRIGHT_BROWSER=firefox` in mcp.json

### Sequential Thinking Issues
- Sessions are temporary and don't persist between Claude Code sessions
- Use thinking for planning, not for storing long-term project info

## Testing MCP Setup

After setup, test each MCP:

1. **Test Playwright**:
```
   Start the dev server, then use Playwright to navigate to localhost:3000 and take a screenshot
```

2. **Test Sequential Thinking**:
```
   Use sequential thinking to break down how we should approach adding a new portfolio item component
```