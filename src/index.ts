import { test as base } from '@playwright/test';
import { setTimeout } from 'node:timers/promises';

type MyFixtures = {
  scriptDelay: void;
};

export const test = base.extend<MyFixtures>({
  scriptDelay: [
    async ({ context }, use) => {
      await context.route('**/*', async (route) => {
        if (route.request().resourceType() === 'script') {
          await setTimeout(100);
        }
        await route.continue();
      });
      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
