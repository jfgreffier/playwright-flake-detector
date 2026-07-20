# Playwright flake detector

Experimental fixture for Playwright to make flaky tests surface, by creating artificially bad conditions.

This fixture can help you detect:

- hydration issues
- missing await on action and web-first assertions
- explicit wait with `waitForTimeout`

## Usage

```ts
import { test, expect } from 'playwright-flake-detector';

test('example', async ({ page }) => {
  // ...
});
```

## Contribute

I don't accept contributions for now

Run tests

```bash
npx playwright test
```

Test burn in

```bash
npx playwright test --repeat-each=10
```

npm publication is performed in CI. np is quite useful for everything else (bumping version, perform checks, prepare the release).
```bash
npx np --no-publish
```
