// import type { InlineConfig } from 'vitest';

import { fileURLToPath } from 'node:url';

import { type InlineConfig, mergeConfig } from 'vite';
import { configDefaults, defineConfig } from 'vitest/config';

import viteConfig from './vite.config';

const vitestConfig = {
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    reporters: ['default', 'junit'],
    outputFile: './junit.xml',
    coverage: {
      reporter: ['text', 'json-summary', 'html', 'cobertura', 'text-summary'],
      exclude: ['src/**/__tests__/**'],
    },
    globals: true,
    includeSource: [
      'src/**/*.{js,jsx,ts,tsx,vue}',
      'utils/**/*.{js,jsx,ts,tsx,vue}',
    ],
    exclude: [...configDefaults.exclude, 'visual.test.ts', 'e2e-tests'],
    environment: 'jsdom',
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
} as InlineConfig;

export default mergeConfig(
  viteConfig,
  defineConfig({
    ...vitestConfig,
  }),
);
