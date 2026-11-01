<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# ImpactPulse

Next.js 16 app (App Router, single package). All source is in `src/`. README is stock create-next-app boilerplate — trust this file instead.

## Commands (verified)

- npm only (package-lock.json; no yarn/pnpm lockfile).
- `npm run dev` — Turbopack dev server on :3000.
- `npm run lint` — ESLint 9 flat config. Single file: `npm run lint -- src/app/page.tsx`.
- `npm run build` — also runs the TypeScript check (no separate typecheck script). Use lint → build for verification. `npx tsc --noEmit` works if you want just types.
- No test framework is configured.
- **Known baseline lint failures** (not yours, don't "fix" unless asked): `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` — vendored shadcn code predates these compiler-era rules.

## Toolchain quirks (agents trained on older stacks will get these wrong)

- **React Compiler is ON** (`reactCompiler: true` in `next.config.ts`). Do not hand-memoize (`useMemo`, `useCallback`, `React.memo`) — the compiler handles it, and the react-hooks/ compiler-era lint rules treat violations as errors. Follow Rules of React strictly; compiler punishes conditional/impure render logic.
- **Cache Components is ON** (`cacheComponents: true`). Reading dynamic data (cookies, headers, uncached fetches) without the appropriate Suspense/`use cache` pattern fails the build, not just lint. When in doubt, read `node_modules/next/dist/docs/01-app/02-guides/` — `cacheComponents` and `partialPrefetching` are not stable-API Next features you know.
- **Tailwind CSS v4 via Turbopack**: no `tailwind.config.*`, no PostCSS file. The Tailwind plugin is wired through `turbopack.rules` in `next.config.ts`; theme tokens/variants live in `src/app/globals.css` via `@theme`. Add colors/spacing there, not in a config file.
- **shadcn is the "base-nova" style** (`components.json`): primitives come from `@base-ui/react`, **not Radix**. There is no `asChild` — use Base UI's `render` prop. Component APIs differ from the Radix shadcn you know; read the existing component in `src/components/ui/` before using it.
- Generate new UI with `npx shadcn add <component>` — it reads `components.json` and writes to `src/components/ui/`. `src/components/ui/*` is generator output; also contains non-standard extras (code-block, message, questionnaire, etc.) built on the same primitives.
- `components.json` (Base UI) and `@base-ui/react` itself are the ground truth for this UI kit's API — the @shadcn/react components you may know are Radix-based and wrong here.
- `cn` is imported from the `"cn"` package (not `@/lib/utils`); `src/lib/utils.ts` is just a re-export for generator compatibility.
- `@/*` path alias = `src/*` (`next-env.d.ts` and `.next/types/**` inject Next's ambient types — don't delete them from `tsconfig.json` `include`).
