import { test as base } from '@playwright/test';
import { setTimeout } from 'node:timers/promises';
import { lintFile } from './lint';

type MyFixtures = {
  scriptDelay: void;
  lint: void;
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
  lint: [
    async ({}, use, testInfo) => {
      const {errorCount, resultText} = await lintFile(testInfo.file);
      if (errorCount > 0) {
        testInfo.status = 'failed';
        testInfo.errors.push({
          message: `Should not have lint error\n${resultText}`,
          errorContext: resultText,
        });
      }
      
      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';

