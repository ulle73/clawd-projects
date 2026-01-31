# Personal Dashboard (MVP)

A lightweight React dashboard for productivity, revenue ideas, and healthy eating.

## Features
- **Kanban Board**: Track tasks with drag-and-drop.
- **Revenue Ideas**: Daily/weekly suggestions for small AI-driven projects.
- **Recipes**: Daily meal suggestions (no fish, onion, or garlic).
- **Projects**: Lists active projects in the workspace.
- **Admin Panel**: Debug gateway status and export local state.

## Tech Stack
- React 18
- Vite
- LocalStorage for persistence
- CSS variables for styling

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) in your browser.

## Testing
Run basic headless checks:
```bash
npm test
```

## Constraints
- Local-first (localStorage).
- Dietary: No fish, onion, or garlic in recipes.
- Single-page application.
