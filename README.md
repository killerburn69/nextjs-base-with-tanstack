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
- **redux-saga**: Side effects and async flows
- **Axios**: HTTP client via `src/lib/axiosClient.ts`
- **next-themes**: Theme switching via `ThemeProvider`
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
- `hooks/`: React hooks for the feature (view logic; dispatch/select helpers).
- `services/`: Low-level API clients for the feature (e.g., axios calls).
- `store/`: Redux slices, sagas, and actions for the feature.
- `types.ts`: TypeScript types/models for the feature domain.

#### `auth` feature

- `components/LoginForm.tsx`: Authentication form UI.
- `hooks/useLogin.ts`: Encapsulates login logic; dispatches actions handled by sagas.
- `services/authService.ts`: Auth API calls using `axiosClient`.
- `store/authSlice.ts`: Client-side auth/session state (e.g., `setCredentials`, `logout`).
- `store/authSaga.ts`: Handles side effects (e.g., login, refresh, logout flows).
- `types.ts`: Auth-related types (e.g., `User`, `LoginPayload`).

#### `post` feature

- `components/PostList.tsx` / `PostItem.tsx`: Post UI components.
- `hooks/usePosts.ts`: Data fetching hook that dispatches `fetchPostsRequest` and selects state.
- `services/postService.ts`: Post API calls using `axiosClient`.
- `store/postSlice.ts`: UI state such as `selectedPostId`, posts list, loading, error.
- `store/postSaga.ts`: Handles `fetchPostsRequest` by calling the service and dispatching success/failure.
- `types.ts`: Post-related types (e.g., `Post`, `CreatePostPayload`).

### `src/lib`

- `axiosClient.ts`: Pre-configured Axios instance (base URL, interceptors, headers, refresh token logic).
- `queryClient.ts`: (Optional) TanStack Query setup if you choose to use it elsewhere.
- `utils.ts`: Cross-cutting helpers not tied to a specific feature.

### `src/shared`

Reusable, feature-agnostic building blocks:

- `components/layout/`: Layout-level pieces like `Header` and `Sidebar` used across routes.
- `components/ui/`: Reusable UI primitives (`Button`, `Input`).
- `hooks/`: Generic hooks (`useDebounce`, `useToggle`).
- `utils/`: Utilities (`fetchers` helpers, `formatDate`).

## Data Flow and Responsibilities

- **Slices (store)**: Define state and reducers for each feature.
- **Sagas**: Watch dispatched actions, call `services/*`, and dispatch success/failure actions.
- **Services**: Call HTTP endpoints using `axiosClient`. They return typed data or throw errors.
- **Hooks**: Compose dispatch/select logic for components.
- **Components**: Render state from slices via selectors and trigger actions.

### Global Store and Providers

- `src/store/index.ts`: Configures Redux store, attaches feature reducers, and wires `redux-saga` middleware. Exposes `RootState` and `AppDispatch` types.
- `src/store/rootSaga.ts`: Root saga that forks feature sagas.
- `src/app/providers.tsx`: Wraps the app with Redux `Provider` and `ThemeProvider`.

Quick usage:

```tsx
// Select and dispatch
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { fetchPostsRequest } from "@/features/post/store/postSlice";

export function PostListContainer() {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector((s) => s.post);
  React.useEffect(() => { dispatch(fetchPostsRequest()); }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed: {error}</div>;
  return <pre>{JSON.stringify(items, null, 2)}</pre>;
}
```

## Conventions

- **Feature-first**: Add new domains under `src/features/<domain>`.
- **Types**: Co-locate types with the feature (`types.ts`). Export from index if needed.
- **HTTP**: Use `src/lib/axiosClient.ts`. Do not instantiate Axios ad hoc.
- **Actions**: Keep side effects in sagas, state changes in reducers.
- **Selectors**: Use typed hooks `useAppSelector` and `useAppDispatch`.
- **Shared UI**: Put cross-feature components in `src/shared/components`.

## Adding a New Feature (Example: "comment")

1. Create `src/features/comment/` with subfolders: `components`, `hooks`, `services`, `store`, `types.ts`.
2. Implement `services/commentService.ts` using `axiosClient`.
3. Create a slice in `store/` (state, reducers, actions) and a saga to handle async.
4. Build UI in `components/` and compose shared primitives from `src/shared/components/ui`.
5. Register the slice reducer and fork the saga in `src/store/index.ts` and `src/store/rootSaga.ts`.
6. Wire into a route in `src/app` and render the feature components.

## Environment

- `NEXT_PUBLIC_API_URL`: Base URL for API requests (used by `axiosClient`).

## Scripts

- `dev`: Start the development server.
- `build`: Production build.
- `start`: Run the production server.
- `lint`: Lint codebase if configured.

