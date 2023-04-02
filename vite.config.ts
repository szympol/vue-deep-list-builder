import { defineConfig } from 'vite';
import type { InlineConfig } from 'vitest';

import commonConfig from './vite.common-config';

const vitestConfig = {
  define: {
    'import.meta.vitest': 'undefined',
  },
  test: {
    reporters: ['default', 'junit'],
    outputFile: './junit.xml',
    coverage: {
      reporter: ['text', 'json-summary', 'html', 'cobertura', 'text-summary'],
      exclude: ['src/mockServer/**', 'src/**/__tests__/**'],
    },
    globals: true,
    includeSource: [
      'src/**/*.{js,jsx,ts,tsx,vue}',
      'utils/**/*.{js,jsx,ts,tsx,vue}',
    ],
    exclude: [
      'visual.test.ts',
      'node_modules',
      'dist',
      '.idea',
      '.git',
      '.cache',
      'e2e-tests',
    ],
    environment: 'jsdom',
  } as InlineConfig,
};

export default defineConfig({
  ...commonConfig,
  ...vitestConfig,
});
