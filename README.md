# QA Bootcamp Week 2 Starter

This is the starting point for Week 2 of the QA bootcamp. During the week you will use it to practise:

- TypeScript
- Playwright (UI testing)
- Postman (API testing)
- The Toolshop REST API

There are no tests in this repo. You will write them during the week.

## Prerequisites

Install these before you start:

- [Node.js](https://nodejs.org/) (the current LTS version)
- [Git](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)

## Setup

Run these steps in order from a terminal.

1. Clone the repo and open the folder:

   ```bash
   git clone <repo-url>
   cd qa-bootcamp-week2-starter
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Install the Chromium browser for Playwright:

   ```bash
   npx playwright install chromium
   ```

4. Copy `.env.example` to `.env`:

   ```bash
   cp .env.example .env
   ```

   `.env` already contains the Toolshop website URL (`TOOLSHOP_URL`) and the Toolshop API URL (`TOOLSHOP_API_URL`). Only change them if your trainer gives you different URLs.

5. Check that your setup works:

   ```bash
   npm run check
   ```

   This sends a GET request to the Toolshop API's `/products` endpoint (no login needed). If everything is set up correctly, it prints your Node version, the HTTP status (200), the number of products, and a last line that says `PASS`.

> **Warning:** never commit `.env`. It is where your own settings and, later in the course, your secrets (keys, tokens, passwords) live. It is listed in `.gitignore` so Git ignores it. Do not remove it from there.

## Folders

| Folder     | What it is for |
|------------|----------------|
| `tests/`   | Your Playwright tests. It is empty for now; you will add tests during the week. |
| `scripts/` | Helper scripts. `check.ts` checks your setup and is run by `npm run check`. |

## Scripts

- `npm run check`: checks your `.env` and that you can reach the Toolshop API.
- `npm test`: runs the Playwright tests in `tests/`.


## Day 6: TypeScript basics and profile validator

- `src/ts-basics/`: one file per TypeScript topic from the tutorial (first program, tuples, functions, objects, type aliases, union types, optional chaining). Run any of them with `npx tsx src/ts-basics/<file>.ts`.
- `src/profile-validator.ts`: a `UserProfile` type with an optional `settings` object, three test users and an `isNotified` function that returns `false` when settings or notifications are missing, without crashing. Run it with `npx tsx src/profile-validator.ts`.

## Running the test suite (3 steps)

1. Install: `npm install`, then `npx playwright install chromium`
2. Copy `.env.example` to `.env` (Windows PowerShell: `Copy-Item .env.example .env`, Mac/Linux: `cp .env.example .env`)
3. Run all the tests: `npm test`

Expected: 7 tests pass.

### What's in the suite
- `tests/toolshop.spec.ts`: 3 UI tests (home page title, pliers search, invalid login)
- `tests/search-page.spec.ts`: the pliers search test through the `SearchPage` page object (`pages/SearchPage.ts`)
- `tests/api-products.spec.ts`: GET /products checks status 200 and a total of 50
- `tests/api-cart.spec.ts`: creates a cart, adds a product and reads it back, and checks that an unknown cart gives 404. Each cart is deleted afterwards, even if the test fails.

### Not included
I did not write the optional Cucumber scenario. `features/cart.feature` is written in Given/When/Then but is not connected to step definitions.