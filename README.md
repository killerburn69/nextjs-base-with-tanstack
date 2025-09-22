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
- **Redux Toolkit**: App state with feature slices in `src/features/*/store`
- **RTK Query**: Data fetching/caching via `createApi` services in features
- **next-themes**: Theme switching via `ThemeProvider`
- **Axios**: Optional HTTP client via `src/lib/axiosClient.ts` (for custom flows)
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
- `providers.tsx`: Central place to mount context providers (Redux `Provider`, `ThemeProvider`).
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
- `hooks/`: Optional custom hooks for view logic (not required with RTK Query).
- `services/`: RTK Query API definitions via `createApi` (e.g., `authApi`, `postApi`).
- `store/`: Redux slices for UI/client state for the feature.
- `types.ts`: TypeScript types/models for the feature domain.

#### `auth` feature

- `components/LoginForm.tsx`: Authentication form UI.
- `services/authApi.ts`: RTK Query API (e.g., `useLoginMutation`, `useMeQuery`).
- `store/authSlice.ts`: Client-side auth/session state (e.g., `setCredentials`, `logout`).
- `types.ts`: Auth-related types (e.g., `User`, `LoginPayload`).

#### `post` feature

- `components/PostList.tsx` / `PostItem.tsx`: Post UI components.
- `services/postApi.ts`: RTK Query API (e.g., `useGetPostsQuery`).
- `store/postSlice.ts`: UI state such as `selectedPostId`.
- `types.ts`: Post-related types (e.g., `Post`, `CreatePostPayload`).

### `src/lib`

- `axiosClient.ts`: Pre-configured Axios instance (base URL, interceptors, headers). Use when RTK Query isn't a fit.
- `queryClient.ts`: (If you opt into TanStack Query). Not used when relying solely on RTK Query.
- `utils.ts`: Cross-cutting helpers not tied to a specific feature.

### `src/shared`

Reusable, feature-agnostic building blocks:

- `components/layout/`: Layout-level pieces like `Header` and `Sidebar` used across routes.
- `components/ui/`: Reusable UI primitives (`Button`, `Input`).
- `hooks/`: Generic hooks (`useDebounce`, `useToggle`).
- `utils/`: Utilities (`fetchers` helpers, `formatDate`).

## Data Flow and Responsibilities

- **RTK Query services**: Define endpoints with `createApi` using `fetchBaseQuery`; generate React hooks.
- **Slices (store)**: Hold client UI state and auth/session info not from server cache.
- **Axios services**: Alternative to RTK Query for custom flows (shared interceptors, refresh logic).
- **Components**: Render state from RTK Query hooks and slices.

### Global Store and Providers

- `src/store/index.ts`: Configures Redux store, registers slices and RTK Query APIs, and middleware. Exposes `RootState` and `AppDispatch` types.
- `src/app/providers.tsx`: Wraps the app with Redux `Provider` and `ThemeProvider`.

Quick usage:

```tsx
// Using an RTK Query hook
import { useGetPostsQuery } from "@/features/post/services/postApi";

export function PostListContainer() {
  const { data, isLoading, error } = useGetPostsQuery();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
```

```tsx
// Dispatching a slice action
import { useDispatch } from "react-redux";
import { selectPost } from "@/features/post/store/postSlice";

export function SelectButton({ id }: { id: string }) {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(selectPost(id))}>Select</button>;
}
```

## Conventions

- **Feature-first**: Add new domains under `src/features/<domain>`.
- **Types**: Co-locate types with the feature (`types.ts`). Export from index if needed.
- **HTTP**: Prefer RTK Query `createApi` in `services/`. Use `axiosClient` only when needed.
- **Queries**: Define endpoints per feature API; avoid ad hoc fetch calls.
- **Shared UI**: Put cross-feature components in `src/shared/components`.

## Adding a New Feature (Example: "comment")

1. Create `src/features/comment/` with subfolders: `components`, `hooks`, `services`, `store`, `types.ts`.
2. Implement `services/commentApi.ts` with `createApi` and define endpoints.
3. Add a Redux slice under `store/` for UI state if needed.
4. Build UI in `components/` and compose shared primitives from `src/shared/components/ui`.
5. Register the API reducer and middleware in `src/store/index.ts`.
6. Wire into a route in `src/app` and render the feature components.

## Environment

- `NEXT_PUBLIC_API_URL`: Base URL for API requests (used by RTK Query and `axiosClient`).

## Scripts

- `dev`: Start the development server.
- `build`: Production build.
- `start`: Run the production server.
- `lint`: Lint codebase if configured.

