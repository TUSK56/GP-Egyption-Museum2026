# Frontend API Integration Points

This document lists the frontend places that currently use static data, localStorage, or dummy auth behavior and therefore need API wiring.

## Verified Current State

The frontend is a Next.js 16 App Router app. The museum content is still largely static, and there is no shared backend API client in the inspected source files.

## Static Museum Data That Needs API Replacement

These files currently import local JSON data instead of calling the backend:

- `src/Data/artifacts.json`
- `src/Data/categories.json`
- `src/components/FeaturedArtifacts/FeaturedArtifacts.jsx`
- `src/components/Categories/Categories.jsx`
- `src/app/ViewAllCategories/page.jsx`
- `src/app/ViewAllCategories/[id]/page.jsx`
- `src/app/artifacts/[id]/page.tsx`

## LocalStorage-Based Favorites / Likes Flow

These files store artifact state in browser storage instead of a backend service:

- `src/components/Navbar/Navbar.jsx`
- `src/components/Categories/Categories.jsx`
- `src/app/ViewAllCategories/[id]/page.jsx`
- `src/app/artifacts/[id]/page.tsx`
- `src/app/favorites/page.tsx`
- `src/app/Love/page.tsx`

Observed localStorage keys:

- `saved_artifacts`
- `liked_artifacts`
- `userName`
- `isLoggedIn`

## Auth Pages That Need Backend Wiring

These pages are currently dummy or local-only flows and should be connected to `/api/auth`:

- `src/components/Signin/Signin.jsx`
- `src/components/Signup/Signup.jsx`

Current behavior in code:

- Sign-in uses hardcoded credentials in the component.
- Sign-up only validates locally and then stores browser state.
- No backend login/register call is currently made in the inspected files.

## Admin Pages That Are Still Static

These admin pages currently use hardcoded arrays and UI-only actions:

- `src/app/(admin)/dashboard/page.tsx`
- `src/app/(admin)/Users/page.tsx`
- `src/app/(admin)/admincategories/page.tsx`
- `src/app/(admin)/HistoricalEras/page.tsx`

## Frontend Route That Is Not the Backend API

- `src/app/api/chat/route.js` is a Next.js API route.
- It uses `@ai-sdk/google` and `streamText`.
- It is separate from the ASP.NET backend API and should be treated as a frontend-local route unless you intentionally migrate it later.

## Practical Integration Targets

If backend wiring starts now, the first safe targets are:

1. Public browsing pages that can read museum data from `GET /api/artifacts`, `GET /api/categories`, `GET /api/eras`, `GET /api/materials`, and `GET /api/tags`.
2. Sign-in and sign-up pages that can call `/api/auth/login`, `/api/auth/register`, `/api/auth/send-otp`, `/api/auth/verify-otp`, and `/api/auth/refresh-token`.
3. Detail and collection pages that should stop depending on `artifacts.json`.

## Gaps To Resolve Before Full Wiring

The backend API does not currently expose verified endpoints for:

- favorites saved in browser storage
- liked items saved in browser storage
- artifact ratings
- dashboard analytics values used by the admin dashboard UI

Those flows need a separate backend decision before they can be fully migrated.
