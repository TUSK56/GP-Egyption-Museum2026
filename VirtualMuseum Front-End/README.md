# 3D Virtual Museum — Frontend

Next.js application for the **3D Virtual Museum** project. It talks to the **Virtual Museum Backend API** for authentication and museum content.

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ (LTS recommended)
- npm, yarn, pnpm, or bun
- Backend API running locally or deployed (see backend README)

## Backend API

The ASP.NET Core API lives in the sibling folder:

`../VirtualMuseum Back-End/`

- Default local API: http://localhost:5209  
- Swagger: http://localhost:5209/swagger  

Point the frontend at that base URL using environment variables (below). The backend must list your frontend origin under **`Cors:Origins`** in `appsettings.json` (e.g. `http://localhost:3000`).

## Getting started

Install dependencies:

```bash
npm install
```

Create **`.env.local`** in the project root (adjust the URL to match your API):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5209
```

Use the same scheme and host your browser will use; avoid mixing `localhost` and `127.0.0.1` unless both are added to CORS on the API.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build |
| `npm run start` | Run production server (after `build`) |
| `npm run lint` | ESLint |

Package manager equivalents: `yarn dev`, `pnpm dev`, `bun dev`, etc.

## Auth notes (integration with backend)

- **Email/password:** register → verify OTP (`/api/auth/send-otp`, `/api/auth/verify-otp`) → login (`/api/auth/login`).  
- **Google:** obtain an ID token from Google Identity Services (or your OAuth flow) and send it to **`POST /api/auth/google-login`** as `{ "idToken": "..." }`.  
- **Admin actions** (creating/updating/deleting artifacts, eras, categories, materials, tags; managing users): the logged-in user must have JWT role **`Admin`**. Send `Authorization: Bearer <accessToken>` on those requests.

Refer to **`VirtualMuseum Back-End/README.md`** for full route list and payloads.

## Tech stack

This project was bootstrapped with [Next.js](https://nextjs.org) (`create-next-app`). It uses the [App Router](https://nextjs.org/docs/app), [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts), and can be deployed on [Vercel](https://vercel.com/) or any Node host.

## Learn more

- [Next.js documentation](https://nextjs.org/docs)  
- [Next.js deployment](https://nextjs.org/docs/app/building-your-application/deploying)
