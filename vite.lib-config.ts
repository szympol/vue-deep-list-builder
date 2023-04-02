import path from 'path';

import { defineConfig, mergeConfig } from 'vite';
import type { UserConfigExport } from 'vite';
import dts from 'vite-plugin-dts';

import { name as packageName } from './package.json';
import { kebabCaseToPascalCase } from './src/utils/string-converters';
import commonConfig from './vite.common-config';

const libConfig: UserConfigExport = {
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: kebabCaseToPascalCase(packageName),
      formats: ['es', 'cjs', 'umd', 'iife'],
      fileName: (format) => {
        if (format === 'iife') {
          return `${packageName}.min.js`;
        }

        if (format === 'es') {
          return `${packageName}.esm.js`;
        }

        return `${packageName}.${format}.js`;
      },
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // Add external deps here
        globals: {
          vue: 'Vue',
        },
        exports: 'named',
      },
    },
  },
  plugins: [
    dts({
      outputDir: 'lib/types',
    }),
  ],
};

export default defineConfig({
  ...mergeConfig(commonConfig, libConfig),
});
