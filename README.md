# Foliohub

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Foliohub** is a single-page web application that lets you explore any public GitHub profile instantly. Enter a GitHub username into the search bar and the app fetches live data directly from the GitHub API, presenting a clean profile card that includes the user's avatar, display name, bio, follower count, following count, and total public repository count.

Below the profile card, Foliohub renders a dynamic list of all the user's public repositories as clickable buttons. Each button opens the corresponding repository page on GitHub in a new tab, giving you one-click access to any project on that account.

If the searched username does not exist or the request fails, the app immediately surfaces an alert so you always know what happened.

The application is built with vanilla TypeScript (no framework) on top of Vite, styled with TailwindCSS, and communicates with the GitHub REST API through Axios. State is managed with a custom lightweight pub/sub store, and the full codebase is covered by a Jest + Testing Library test suite with a 70 % coverage threshold enforced on every run.

## Technologies used

1. Typescript
2. TailwindCSS
3. CSS3
4. HTML5
5. Vite

## Libraries used

#### Dependencies

```
"axios": "^1.7.9"
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"msw": "^2.10.4"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"undici": "^7.25.0"
"vite": "^7.1.5"
```

## Getting Started

With the stack above installed locally, follow these steps to run the app:

1. Clone the repository
2. Navigate to the project folder
3. Copy `.env.example` to `.env` so Vite can resolve the GitHub API base URL
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app is running locally, you can verify behavior with the included Jest + Testing Library suite.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch, guarding the codebase against regressions before any change reaches `main`.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│   lint-and-audit     │─▶│     testing      │─▶│      build       │
│  eslint · tsc check  │  │  jest (jsdom)    │  │ tsc + vite build │
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

The jobs are chained with `needs:`, so a failure in any earlier job short-circuits the rest of the pipeline.

### Validation jobs (run on every PR and push)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint over the whole project) and `npm run type-check` (`tsc --noEmit`). This is the first gate: style, lint rules, and TypeScript type errors must be clean.
2. **`testing`** — runs the full Jest + Testing Library suite with `npm run test`. Tests execute under `jest-environment-jsdom`, so DOM components, pages, services, stores and helpers are all exercised headlessly.
3. **`build`** — runs `npm run build`, which is `tsc -p tsconfig.app.json && vite build`. This guarantees the production bundle compiles cleanly with strict TypeScript settings before the change is merged.

All three jobs run on `ubuntu-latest`, pin the Node.js version through [`.nvmrc`](.nvmrc) via `actions/setup-node`, and cache the npm store to speed up subsequent runs.

### Skipping CI

If you need to push a change to `main` without triggering the pipeline (for example, edits limited to documentation that you have already validated locally), append GitHub's standard `[skip ci]` marker to the commit message:

```bash
git commit -m "docs: fix typo in README [skip ci]"
```

> **Note:** use `[skip ci]` sparingly — every other change should go through the full pipeline.

### Where the build outputs live

| Output                                           | Location                                                    |
| ------------------------------------------------ | ----------------------------------------------------------- |
| Validation logs (lint, type-check, tests, build) | **Actions** tab on GitHub                                   |
| Production bundle (`dist/`)                      | Ephemeral, inside the runner — not published as an artifact |

This project does not produce a release artifact from CI: the bundle is rebuilt by whichever environment deploys the app (e.g. a static host or preview environment). The CI pipeline's job is purely to prove that the bundle _can_ be built from a clean checkout.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm run test

# build
npm run build
```

## Security Audit

Beyond the test suite, dependency vulnerabilities are tracked separately via npm's built-in audit tool.

#### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/foliohub`](https://www.diegolibonati.com.ar/#/project/foliohub)
