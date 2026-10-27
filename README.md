# playwright-qa

Playwright Test suite in TypeScript, using the Page Object Model.

## Layout

```
app/                  Sample login page, served locally by the config's webServer
pages/                Page objects (locators as readonly properties)
tests/                Specs (assertions live here)
playwright.config.ts  baseURL from BASE_URL, trace on first retry, HTML report
```

## Run

```bash
npm ci
npx playwright install --with-deps chromium
npm test                  # all tests
npm run test:smoke        # @smoke only
npm run test:regression   # @regression only
npm run report            # open the HTML report
```

By default the config starts the sample app on `http://localhost:4173`. To test a deployed app, set `BASE_URL`:

```bash
BASE_URL=<app-url> npx playwright test
```

## Conventions

- Locators: `getByRole`, `getByLabel`, `getByText`, `getByTestId` first. CSS only as a last resort, no positional XPath.
- Web-first assertions (`await expect(locator)...`). No `waitForTimeout` or other hard waits.
- Tag tests with `{ tag: '@smoke' }` or `{ tag: '@regression' }`.
- Each test title or `describe` references a story or requirement ID (`US-n`, `REQ-n`, or `TBC-n` until one exists).
- Secrets come from environment variables, never from code.
