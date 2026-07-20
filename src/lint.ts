import { ESLint } from 'eslint';
import playwright from 'eslint-plugin-playwright';

export async function lintFile(filePath: string): Promise<{ errorCount: number; resultText: string}> {
  const eslint = new ESLint({
    overrideConfigFile: true,
    overrideConfig: [
      {
        files: ['**/*.ts'],
        plugins: { playwright },
        rules: {
          'playwright/missing-playwright-await': 'error',
          'playwright/no-wait-for-timeout': 'error',
        },
      },
    ],
  });
  const results = await eslint.lintFiles([filePath]);
  const errorCount = results[0] ? results[0].errorCount : 0
  const formatter = await eslint.loadFormatter('stylish');
  const resultText = await formatter.format(results);

  return { errorCount , resultText };
}
