# AGENTS.md

ApexSociety: React Native app built with Expo, with a map, events and crews. It also builds for the web (GitHub Pages). Owner rules (personas, 150-line file limit, strict props, no `any`, `pnpm type-check` before every change, Plan -> Act -> Validate) are in `agents.md`; follow both.

## Stack

- React Native and Expo, TypeScript (strict), React Navigation, react-native-maps, react-native-web
- pnpm 10 (`pnpm-lock.yaml`), Jest, ESLint, Husky

## Commands

```bash
pnpm install
pnpm start            # Expo dev server
pnpm android | pnpm ios | pnpm web
pnpm type-check       # tsc --noEmit
pnpm lint             # eslint .
pnpm test             # jest
pnpm test:ci          # jest --ci --coverage
pnpm build:web        # expo export -p web
pnpm build:gh-pages   # web build for GitHub Pages + 404 copy
pnpm test:e2e         # build:web, then e2e/run-e2e.mjs
scripts/validate.sh   # full suite: install, lint, type-check, tests
```

`preweb`, `prebuild:web` and `prebuild:gh-pages` regenerate HTML metadata, sitemap and security.txt before the build.

## Structure

- `src/screens/` - one file per screen; `MapScreen.native.tsx` and `MapScreen.web.tsx` split by platform
- `src/components/` - UI, including `MapScreen/` (13 files), `tuning/` and `WebLanding/`
- `src/hooks/`, `src/context/` - app state and logic
- `src/navigation/`, `src/theme/`, `src/types/`, `src/constants/`, `src/data/`, `src/utils/`
- `__tests__/` - Jest suites
- `e2e/` - browser run against the web build, with screenshots
- `scripts/` - build helpers (metadata, sitemap, 404 copy)
- `.github/workflows/` - `validate.yml` (lint, type-check, test), `deploy.yml` (GitHub Pages on push to `main`), `sast.yml`, `security.yml`

## Conventions

- Test coverage target is 80%. It is not enforced: `jest.config.js` has no `coverageThreshold`.
- At least two reviewers before merge (process rule kept from the previous AGENTS.md).
- Check `package.json` for dependency compatibility before adding a library.
- Platform-specific code uses the `.native.tsx` and `.web.tsx` suffixes.

<!-- base-actions-main-policy -->
## GitHub Actions — padrão obrigatório (@main)

- Referencie as actions internas sempre pelo branch, nunca por SHA:
  - `uses: juninmd/base-actions/<action>@main`
  - `uses: juninmd/base-actions/.github/workflows/<arquivo>.yml@main`
- Não fixe `@<sha>` em `juninmd/base-actions`: a atualização é centralizada no
  `main` e passa a valer no próximo run.
- PRs cujos checks não iniciam por billing/spending limit são mesclados pelo bot central
  `juninmd/base-actions/.github/workflows/auto-merge-billing-blocked.yml`.
  Para impedir o merge automático de um PR, aplique a label `do-not-merge`.

## Gotchas

- Two agent docs exist at the root: `AGENTS.md` (this file) and `agents.md` (owner rules). Names differ only by case, which collides on case-insensitive filesystems (macOS, Windows). Keep them distinct until the owner merges them.
- Never commit keystores (`.jks`, `.p12`, `.keystore`) or `*.mobileprovision`; they are ignored in `.gitignore`.
- `.agent/` holds Android build rules for release work; read `.agent/rules/android_build.md` before changing signing or CI.
