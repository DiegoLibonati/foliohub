# Foliohub

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

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
"autoprefixer": "^10.4.16"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"postcss": "^8.4.33"
"prettier": "^3.8.1"
"tailwindcss": "^3.4.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.5"
```

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/foliohub`](https://www.diegolibonati.com.ar/#/project/foliohub)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
