import { defineConfig, mergeConfig } from 'vite';

import viteConfig from './vite.config';

const consoleErrorDefault = console.error;
const consoleErrorTemp = console.error;

const restoreConsoleError = () => {
  console.error = consoleErrorDefault;
};

const sanityCheckList: string[] = ['ReferenceError'];

let hasError = false;

console.error = function (...args) {
  const errorMessage = args[0].toString() as string;

  const hasErrorType = sanityCheckList.some((element) => {
    return errorMessage.includes(element);
  });

  if (hasErrorType) {
    console.log(`Error: ${errorMessage}`);
    hasError = true;
  }

  consoleErrorTemp.apply(console, args);
};

const libConfig = {
  build: {
    outDir: 'dist-ssg',
  },
  ssgOptions: {
    entry: 'src/main-ssg.ts',
    onFinished() {
      restoreConsoleError();
      if (hasError) {
        process.exit(1);
      }
    },
  },
};

export default defineConfig({
  ...mergeConfig(viteConfig, libConfig),
});
