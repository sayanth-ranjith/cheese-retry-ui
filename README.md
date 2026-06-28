# 🧀 Cheese Retry — UI

A single-page React + TypeScript documentation site for the [cheese-retry](https://github.com/sayanth-ranjith/cheese-retry) Java library.

## ✨ What's inside

- Dark / light mode (persisted in localStorage, respects system preference)
- Interactive **retry simulator** — configure attempts, delay, strategy, and watch it run in real time
- Syntax-highlighted code examples with one-click copy
- Backoff strategy visualizer (Fixed vs Exponential)
- Fully responsive — works on mobile, tablet, and desktop
- Accessible — keyboard focus visible, reduced motion respected

## 🗂️ Folder Structure

```
cheese-retry-ui/
├── public/
│   └── index.html
└── src/
    ├── components/
    │   ├── layout/          # Navbar.tsx, Footer.tsx
    │   ├── sections/        # HeroSection, FeaturesSection, QuickStartSection,
    │   │                    # SimulatorSection, BackoffSection
    │   └── ui/              # CodeBlock.tsx, ThemeToggle.tsx
    ├── constants/
    │   └── content.ts       # All static content (copy, code snippets)
    ├── hooks/
    │   ├── useTheme.ts
    │   ├── useCopyToClipboard.ts
    │   └── useRetrySimulator.ts
    ├── styles/
    │   └── globals.css      # Design tokens, reset, shared utilities
    ├── types/
    │   ├── theme.ts
    │   └── content.ts
    ├── App.tsx
    └── index.tsx
```

## 🚀 How to run

### Prerequisites

- **Node.js** v18 or higher  
- **npm** v9 or higher (ships with Node)

Check your versions:
```bash
node -v   # should print v18.x.x or higher
npm -v    # should print 9.x.x or higher
```

### 1 — Install dependencies

```bash
cd cheese-retry-ui
npm install
```

### 2 — Start the dev server

```bash
npm start
```

The app opens automatically at **http://localhost:3000**.  
The page hot-reloads whenever you save a file.

### 3 — Build for production

```bash
npm run build
```

Output goes to `build/` — a fully static bundle ready to deploy to Netlify, Vercel, GitHub Pages, or any CDN.

### 4 — Run tests

```bash
npm test
```

## 🎨 Design tokens

| Token | Value | Why |
|---|---|---|
| Display & body font | Plus Jakarta Sans | Friendly but sharp — suits the library's approachable tone |
| Mono font | JetBrains Mono | Developer-native; used for all code, labels, and data values |
| Accent colour | `#F0A500` (amber) | Warm cheese-yellow — the one bold choice, used sparingly |
| Dark background | `#0D1117` | GitHub-style deep navy, immediately familiar to developers |
| Light background | `#FFFFFF` with `#F6F8FA` surfaces | Clean and readable |

## 📦 Key dependencies

| Package | Purpose |
|---|---|
| `react-syntax-highlighter` | Code block highlighting (vscDarkPlus / vs themes) |
| `lucide-react` | Icons (Copy, Check, Sun, Moon, Menu, Play, RotateCcw) |
| TypeScript | End-to-end type safety across all components and hooks |

## 📄 License

MIT — same as the cheese-retry library itself.
