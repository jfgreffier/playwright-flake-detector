# Playwright flake detector

Experimental fixture for Playwright to make flaky tests surface, by creating artificially bad conditions.

This fixture can help you detect:

- hydration issues

## Usage

```ts
import { test, expect } from 'playwright-flake-detector';

test('example', async ({ page }) => {
  // ...
});
```

## Contribute

I don't accept contributions for now
