# FocusAI Task Management Frontend

A modern React + TypeScript + Vite application for AI-assisted task management, deep work planning, and productivity analytics. This repository contains the frontend client (SPA) that integrates with a backend API via `VITE_API_URL`.

## Overview

- **Social OAuth**: Google and GitHub (unified redirect flow)
- Role-based routing with admin auto-redirect
- Task management UI with proper date input handling
- PDF export (iframe-based, popup-safe)
- Landing page with Features, Analytics, and Contact sections
- Legal and Support pages (Privacy, Terms, Cookies, Help, FAQ, Contact, Roadmap)

## Tech Stack

- React 18, TypeScript, Vite
- React Router v6
- Axios with interceptors (`withCredentials`, auth header)
- Redux store (Provider wired in `main.tsx`)
- CSS: global styles in `src/styles/global.css`

## Project Structure

```
src/
  api/              # Axios config and API modules
  assets/           # Static assets
  components/       # Reusable UI components
  context/          # AuthContext
  layout/           # Layout components
  pages/            # Route pages (user/admin/legal/support)
  routes/           # Route configurations
  styles/           # Global CSS
  utils/            # Utilities
```

## Prerequisites

- Node.js 18+ and npm
- Backend API running locally or in the cloud

## Environment

Create a `.env` file in the project root:

```
VITE_API_URL=http://localhost:5000/api
```

Notes:
- The frontend reads `VITE_API_URL` in `src/api/axiosConfig.ts`.
- OAuth redirects must be configured on the backend for your deployment domains.

## Getting Started (Development)

```bash
npm install
npm run dev
```

The dev server runs on port 5173 by default. Ensure your backend CORS allows `http://localhost:5173` with credentials.

## Build & Preview

```bash
npm run build
npm run preview
```

Build output is generated to `dist/`.

## Routing

Public routes are registered in `src/routes/UserRoutes.tsx`:
- Legal: `/legal/privacy`, `/legal/terms`, `/legal/cookies` (also `/pages/PrivacyPolicy`, `/pages/TermsOfService`, `/pages/CookiePolicy`)
- Support: `/support/help`, `/support/faq`, `/support/contact`, `/support/roadmap` (also `/pages/HelpCenter`, `/pages/FAQ`, `/pages/ContactSupport`, `/pages/Roadmap`)

Protected routes (tasks, calendar, AI dashboard, profile) are nested under `UserLayout` and guarded by `ProtectedRoute`.

## Deployment

Below are step-by-step guides for three popular providers. The build configuration is the same for all:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL` (set to your production backend URL)

### Deploy to Vercel

1. Push your repo to GitHub.
2. Log in to Vercel and “Import Project”.
3. Framework preset: “Vite”.
4. Set Environment Variable `VITE_API_URL` to your backend URL.
5. Build & Output: auto-detected (`npm run build`, `dist`).
6. After deployment, add OAuth Redirect URIs on your providers to match your Vercel domain (e.g., `https://your-app.vercel.app/auth-callback`).



## OAuth Configuration Checklist

- Frontend domain authorized in each provider (Google/GitHub)
- Redirect URI points to `/auth-callback` (or provider-specific callback you expose)
- Backend CORS allows your deployed domain with `credentials: true`

## PDF Export

The client uses a hidden iframe to render and print PDFs, avoiding popup blockers. This runs entirely in the browser without `window.open()`.

## Date Inputs

HTML date inputs accept `yyyy-MM-dd`. The app normalizes ISO timestamps to this format before populating inputs to prevent browser validation warnings.

## Troubleshooting

- Dev server fails with Exit Code 1: check `.env` and ensure `VITE_API_URL` is reachable.
- 401 responses clear auth and redirect to `/login` automatically (see `axiosConfig.ts`).
- SPA routes 404 on production: add a SPA redirect rule (Netlify `_redirects`) or provider’s SPA setting.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Acknowledgements

Built with React, Vite, and TypeScript. OAuth via backend providers. Analytics and AI features are evolving based on user feedback.
