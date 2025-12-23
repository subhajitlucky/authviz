# AuthViz - Authentication & Authorization Visual Lab

A premium, visual-first educational microsite focused entirely on Authentication and Authorization concepts. Learn JWT, OAuth2, sessions, tokens, and modern auth flows through interactive animations and simulations.

## Features

### Interactive Learning
- **Concepts Explorer** - Browse 22+ authentication concepts with real-world analogies
- **Visual Concept Maps** - Concepts grouped by category (Basics, Tokens, OAuth2, Access Control, Security)
- **Progressive Difficulty** - Learn from beginner to advanced topics

### Auth Lab Playground
- **JWT Engine** - Simulate login, token generation, and API verification
- **OAuth2 Flow Visualizer** - Watch the authorization code flow step-by-step
- **Token Inspector** - Decode and inspect JWT header, payload, and signature
- **Security Lab** - Test what happens with expired, tampered, or missing-scope tokens

### Visual Design
- Animated flows showing how auth works internally
- Dark/Light theme toggle
- Clean, premium UI without text walls
- Accessible keyboard navigation

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **shadcn/ui** for components
- **Framer Motion** for animations
- **React Router** for navigation

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd authviz

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Access the App

Open http://localhost:5173 in your browser after running `npm run dev`.

## What is Simulated

This is a **frontend-only educational tool**. All authentication flows are simulated in the browser:

- **JWT Generation**: Creates mock tokens with configurable claims (no real cryptographic signing)
- **Token Storage**: Uses browser memory/localStorage for demo purposes
- **OAuth2 Flow**: Animated visualization of the authorization code flow (no real auth server)
- **Token Verification**: Simulated validation logic (no real server-side verification)

## Security Disclaimer

> **This is an educational tool only. Do NOT use any code or patterns from this site in production applications.**

### Limitations of Frontend-Only Auth

1. **No Real Security**: All tokens and auth flows are simulated for learning purposes
2. **No Backend Validation**: Real servers must validate tokens server-side
3. **Client-Side Storage**: In production, use HTTP-only cookies, not localStorage
4. **No Token Revocation**: Real systems need server-side token blacklisting
5. **HTTPS Required**: Production auth requires HTTPS everywhere

### Real Auth Best Practices (Not Simulated Here)

- Store tokens in HTTP-only cookies or secure storage
- Use HTTPS for all auth-related requests
- Implement proper CSRF protection
- Use secure session management on the server
- Validate tokens server-side with proper cryptographic verification
- Implement token rotation and refresh token invalidation

## Project Structure

```
authviz/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── Header.tsx    # Navigation header
│   │   ├── Layout.tsx    # Page layout wrapper
│   │   └── ThemeToggle.tsx # Dark/Light mode toggle
│   ├── pages/
│   │   ├── HomePage.tsx       # Landing page
│   │   ├── ConceptsPage.tsx   # Concept explorer
│   │   ├── ConceptDetailPage.tsx # Individual concept view
│   │   └── LabPage.tsx        # Interactive playground
│   ├── data/
│   │   └── concepts.ts   # All auth concepts with details
│   ├── lib/
│   │   ├── utils.ts      # Utility functions
│   │   └── ThemeProvider.tsx # Theme context provider
│   ├── App.tsx           # Main app with routing
│   └── main.tsx          # Entry point
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## Available Concepts

| Category | Topics |
|----------|--------|
| Basics | Authentication vs Authorization, Sessions vs Tokens, Cookies, Stateless Auth |
| Tokens | JWT Structure, Signing vs Encryption, Access/Refresh Tokens, Bearer Tokens, Token Expiry |
| OAuth2 | OAuth2 Overview, Roles, Grant Types, Auth Code Flow, PKCE, Scopes, SSO, Client Credentials |
| Access Control | RBAC, ABAC |
| Security | CSRF, XSS & Token Theft, Logout & Revocation |

## Accessibility

- Keyboard navigation supported
- ARIA labels on interactive elements
- Respects `prefers-reduced-motion` preference
- High contrast color scheme in both themes

## License

MIT License - Feel free to use for educational purposes.

## Contributing

Contributions welcome! Add new concepts, improve visualizations, or fix bugs.

---

Built with the goal of making authentication and authorization intuitive through motion, diagrams, and interaction.
