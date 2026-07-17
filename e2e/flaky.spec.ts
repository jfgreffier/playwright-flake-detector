import { test, expect } from '../src/index';

// This test fails when Playwright is faster than hydration
test('broken hydration: click is lost', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  await page.getByRole('button', { name: 'Click me' }).click();

  await expect(page.getByText('success')).toBeVisible();
});

// This test randomly fails depending on the excecution environment
test('no await', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  expect(page.getByText('Flake demo')).toBeVisible();
  await page.waitForTimeout(17);
});
