## Project Overview

This repository is a modular Next.js App Router project organized by features. Each domain (e.g., `auth`, `post`) encapsulates its UI, hooks, services, state, and types, while shared utilities and UI primitives live under `src/shared` and `src/lib`.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view the app.

## Tech Stack

- **Next.js App Router**: Routing, layouts, streaming, and server components
- **TypeScript**: Static typing
- **Axios**: HTTP client via `src/lib/axiosClient.ts`
- **React Query (TanStack Query)**: Data fetching/caching via `src/lib/queryClient.ts`
- **PostCSS**: See `postcss.config.mjs`

## Folder Structure and Responsibilities

```
/ (repo root)
  components.json
  next.config.ts
  package.json
  postcss.config.mjs
  tsconfig.json
  /public
  /src
    /app
      /dashboard
        errorr.tsx
        layout.tsx
        loading.tsx
        page.tsx
      favicon.ico
      globals.css
      layout.tsx
      page.tsx
      providers.tsx
    /components
      /ui
        button.tsx
    /features
      /auth
        /components
          LoginForm.tsx
        /hooks
          useLogin.ts
        /services
          authService.ts
        /store
          authStore.ts
        types.ts
      /post
        /components
          PostItem.tsx
          PostList.tsx
        /hooks
          usePosts.ts
        /services
          postService.ts
        /store
          postStore.ts
        types.ts
    /lib
      axiosClient.ts
      queryClient.ts
      utils.ts
    /shared
      /components
        /layout
          Header.tsx
          Sidebar.tsx
        /ui
          Button.tsx
          Input.tsx
      /hooks
        useDebounce.ts
        useToggle.ts
      /utils
        fetchers.ts
        formatDate.ts
```

### Root files

- `components.json`: Configuration for UI components tooling (e.g., shadcn/ui). Helps generate or configure components.
- `next.config.ts`: Next.js configuration (images, redirects, experimental flags, etc.).
- `package.json`: Scripts and dependencies.
- `postcss.config.mjs`: PostCSS plugins configuration.
- `tsconfig.json`: TypeScript compiler settings and path aliases.
- `public/`: Static assets served at `/` (e.g., `public/file.svg` → `/file.svg`).

### `src/app` (App Router)

- `layout.tsx`: Root layout applied to all routes (global HTML skeleton, fonts, and providers).
- `globals.css`: Global CSS.
- `providers.tsx`: Central place to mount context providers (e.g., React Query `QueryClientProvider`).
- `page.tsx`: Home page route (`/`).
- `dashboard/`: Nested route for `/dashboard`.
  - `layout.tsx`: Dashboard-specific layout (wraps all nested pages).
  - `page.tsx`: Dashboard index page.
  - `loading.tsx`: Route-level loading UI for streaming/suspense.
  - `errorr.tsx`: Route-level error boundary UI for `/dashboard`.

### `src/components/ui`

Local UI primitives scoped to the app (e.g., `button.tsx`). Prefer `src/shared/components/ui` for reusable primitives across features.

### `src/features/*` (Feature Modules)

Each feature directory encapsulates all domain logic and UI, following a predictable structure:

- `components/`: Feature-specific components composed with shared UI primitives.
- `hooks/`: React hooks for the feature (e.g., mutation/query hooks, local logic).
- `services/`: Low-level API clients for the feature (e.g., axios calls).
- `store/`: Local state management for the feature (e.g., Zustand, signals, or context).
- `types.ts`: TypeScript types/models for the feature domain.

#### `auth` feature

- `components/LoginForm.tsx`: Authentication form UI.
- `hooks/useLogin.ts`: Encapsulates login logic (e.g., form handling, mutation via `authService`).
- `services/authService.ts`: Auth API calls using `axiosClient`.
- `store/authStore.ts`: Client-side auth/session state.
- `types.ts`: Auth-related types (e.g., `User`, `LoginPayload`).

#### `post` feature

- `components/PostList.tsx` / `PostItem.tsx`: Post UI components.
- `hooks/usePosts.ts`: Data fetching/caching hooks, typically backed by React Query.
- `services/postService.ts`: Post API calls using `axiosClient`.
- `store/postStore.ts`: UI or client cache state not handled by React Query.
- `types.ts`: Post-related types (e.g., `Post`, `CreatePostPayload`).

### `src/lib`

- `axiosClient.ts`: Pre-configured Axios instance (base URL, interceptors, headers).
- `queryClient.ts`: React Query `QueryClient` instance and config (retry, stale times, etc.).
- `utils.ts`: Cross-cutting helpers not tied to a specific feature.

### `src/shared`

Reusable, feature-agnostic building blocks:

- `components/layout/`: Layout-level pieces like `Header` and `Sidebar` used across routes.
- `components/ui/`: Reusable UI primitives (`Button`, `Input`).
- `hooks/`: Generic hooks (`useDebounce`, `useToggle`).
- `utils/`: Utilities (`fetchers` helpers, `formatDate`).

## Data Flow and Responsibilities

- **Services**: Call HTTP endpoints using `axiosClient`. They return typed data and throw errors.
- **Hooks**: Orchestrate data fetching/caching (React Query) or mutations; compose services; expose a React-friendly API.
- **Store**: Holds client UI state not well-modeled by server cache (e.g., filters, modals, ephemeral UI flags).
- **Components**: Dumb-ish UI that renders props/state from hooks and stores.

## Conventions

- **Feature-first**: Add new domains under `src/features/<domain>`.
- **Types**: Co-locate types with the feature (`types.ts`). Export from index if needed.
- **HTTP**: Use `src/lib/axiosClient.ts`. Do not instantiate Axios ad hoc.
- **Queries**: Centralize QueryClient config in `src/lib/queryClient.ts` and use feature hooks.
- **Shared UI**: Put cross-feature components in `src/shared/components`.

## Adding a New Feature (Example: "comment")

1. Create `src/features/comment/` with subfolders: `components`, `hooks`, `services`, `store`, `types.ts`.
2. Implement `services/commentService.ts` using `axiosClient`.
3. Create hooks (e.g., `useComments.ts`, `useCreateComment.ts`) using React Query.
4. Build UI in `components/` and compose shared primitives from `src/shared/components/ui`.
5. Wire into a route in `src/app` (page or nested route) and render the feature components.

## Scripts

- `dev`: Start the development server.
- `build`: Production build.
- `start`: Run the production server.
- `lint`: Lint codebase if configured.

