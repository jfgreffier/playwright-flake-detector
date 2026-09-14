import { test as base } from '@playwright/test';
import { setTimeout } from 'node:timers/promises';
import { lintFile } from './lint';

const DEFAULT_LINT = true;
const DEFAULT_SCRIPT_DELAY = 100;

type MyOptions = {
  flakeDetectorOptions: {
    lint?: boolean;
    scriptDelay?: number;
  };
};

type MyFixtures = {
  scriptDelay: void;
  lint: void;
};

export const test = base.extend<MyOptions & MyFixtures>({
  flakeDetectorOptions: [
    { lint: DEFAULT_LINT, scriptDelay: DEFAULT_SCRIPT_DELAY },
    { option: true },
  ],
  scriptDelay: [
    async ({ context, flakeDetectorOptions }, use) => {
      const scriptDelay =
        flakeDetectorOptions.scriptDelay ?? DEFAULT_SCRIPT_DELAY;
      if (scriptDelay) {
        await context.route('**/*', async (route) => {
          if (route.request().resourceType() === 'script') {
            await setTimeout(scriptDelay);
          }
          await route.continue();
        });
      }

      await use();
    },
    { auto: true },
  ],
  lint: [
    async ({ flakeDetectorOptions }, use, testInfo) => {
      if (flakeDetectorOptions.lint) {
        const { errorCount, resultText } = await lintFile(testInfo.file);
        if (errorCount > 0) {
          testInfo.status = 'failed';
          testInfo.errors.push({
            message: `Should not have lint error\n${resultText}`,
            errorContext: resultText,
          });
        }
      }

      await use();
    },
    { auto: true },
  ],
});

export { expect } from '@playwright/test';
