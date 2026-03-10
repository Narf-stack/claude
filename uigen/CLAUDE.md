# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run setup        # Initial setup: install deps + prisma generate + migrate
npm run dev          # Start dev server with Turbopack (localhost:3000)
npm run dev:daemon   # Run dev server in background, logs to logs.txt
npm run build        # Production build
npm run test         # Run Vitest unit tests
npm run lint         # ESLint
npm run db:reset     # Reset database (destructive)
```

All npm scripts use `NODE_OPTIONS='--require ./node-compat.cjs'` for Node compatibility.

## Architecture

**UIGen** is a Next.js 15 (App Router) full-stack app where users describe React components in natural language and get live previews. Key flows:

1. User sends prompt → `/api/chat` route streams response from Claude (Anthropic via Vercel AI SDK)
2. Claude uses AI tools (`str_replace_editor`, `file_manager`) to create/edit virtual files
3. Virtual file system state is held in `FileSystemContext` and rendered live in `PreviewFrame`
4. Authenticated users can persist projects to SQLite via Prisma

### Key directories

- `src/app/` — Pages and API routes. `[projectId]/page.tsx` is the main workspace. `api/chat/route.ts` handles streaming AI responses.
- `src/lib/` — Core logic: `file-system.ts` (in-memory VFS), `auth.ts` (JWT/bcrypt), `provider.ts` (Claude setup with mock fallback), `contexts/` (React state), `tools/` (AI tool definitions), `prompts/` (system prompt)
- `src/components/` — Feature components: `chat/`, `editor/`, `preview/`, `auth/`
- `src/actions/` — Next.js server actions for project CRUD and auth
- `prisma/` — SQLite schema: `User` and `Project` models (projects store messages + virtual files as JSON)

### Mock provider

When `ANTHROPIC_API_KEY` is absent, `lib/provider.ts` falls back to a `MockLanguageModel` that generates sample components, enabling UI development without API costs.

### Virtual File System

`lib/file-system.ts` is a pure in-memory VFS with full CRUD and path operations. It serializes to JSON for database storage. The AI tools write to it; `PreviewFrame` renders from it using Babel standalone.

### Auth

JWT-based (HS256, 7-day sessions), bcrypt passwords, session cookies. Anonymous usage is supported — projects are ephemeral unless the user signs in.

## Environment

- `ANTHROPIC_API_KEY` — Optional; mock provider used if absent
- `JWT_SECRET` — Defaults to `"development-secret-key"` in dev
- Database: SQLite at `prisma/dev.db`

## Tests

Tests live in `__tests__/` subdirectories alongside source files. Run a single test file:

```bash
npm run test -- src/components/chat/__tests__/ChatInterface.test.tsx
```
