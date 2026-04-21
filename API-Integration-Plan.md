# API Integration Plan

This is a verified starting plan for connecting the Next.js frontend to the ASP.NET backend without inventing unsupported data.

## Phase 1: Define the shared API contract

- Use the backend response wrapper `ApiResponse<T>` as the standard client shape.
- Create one frontend API entry point for requests and token handling.
- Keep the base URL configurable so local dev and Docker Compose both work.

## Phase 2: Connect public museum browsing

Replace static JSON reads in these places with real `GET` calls:

- `src/components/FeaturedArtifacts/FeaturedArtifacts.jsx`
- `src/components/Categories/Categories.jsx`
- `src/app/ViewAllCategories/page.jsx`
- `src/app/ViewAllCategories/[id]/page.jsx`
- `src/app/artifacts/[id]/page.tsx`

Backend endpoints to use:

- `GET /api/artifacts`
- `GET /api/artifacts/{id}`
- `GET /api/categories`
- `GET /api/categories/{id}`
- `GET /api/eras`
- `GET /api/materials`
- `GET /api/tags`

## Phase 3: Connect authentication

Wire the auth screens to the backend endpoints in this order:

1. Register with `POST /api/auth/register`.
2. Request OTP with `POST /api/auth/send-otp`.
3. Verify email with `POST /api/auth/verify-otp`.
4. Sign in with `POST /api/auth/login`.
5. Store access and refresh tokens in one centralized client flow.
6. Add refresh handling with `POST /api/auth/refresh-token`.

Files involved:

- `src/components/Signin/Signin.jsx`
- `src/components/Signup/Signup.jsx`

## Phase 4: Decide what stays local for now

The backend currently has no verified endpoints for these frontend features, so they should not be force-mapped yet:

- saved artifacts
- liked artifacts
- artifact ratings
- dashboard metrics
- admin UI actions in the static dashboard pages

Recommended approach:

- keep them local until the backend exposes real endpoints, or
- add backend support first, then wire the frontend.

## Phase 5: Handle the Next.js chat route separately

- `src/app/api/chat/route.js` is not part of the ASP.NET backend.
- Decide whether to keep it as a frontend-local AI route or migrate it later.
- Do not mix it into the museum REST integration work unless that is an explicit requirement.

## Suggested Implementation Order

1. Add the shared API client and typed request helpers.
2. Connect artifacts and categories first because they already match backend resources.
3. Replace sign-in and sign-up dummy logic with real auth calls.
4. Review favorites/likes/admin dashboards after the core API wiring is stable.

## Risks To Watch

- The current frontend uses localStorage for user-facing state, so moving to API-backed auth may affect navigation and hydration behavior.
- The backend resource authorization is not perfectly uniform across all controllers, so each route should be verified against the actual response code before the UI depends on it.
- Some UI areas are still static mock dashboards; they should not be treated as real backend data until verified.
