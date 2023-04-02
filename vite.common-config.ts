import { fileURLToPath, URL as Url } from 'node:url';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import type {
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-core/dist/compiler-core';
import type { UserConfigExport } from 'vite';
import banner from 'vite-plugin-banner';
import { checker } from 'vite-plugin-checker';
import commonjs from 'vite-plugin-commonjs';
import vitePluginImp from 'vite-plugin-imp';

import pkg from './package.json';

/* eslint-disable max-len */
const nameAscii = `
██╗   ██╗██╗   ██╗███████╗██████╗ ███████╗███████╗██████╗ ██╗     ██╗███████╗████████╗██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗ 
██║   ██║██║   ██║██╔════╝██╔══██╗██╔════╝██╔════╝██╔══██╗██║     ██║██╔════╝╚══██╔══╝██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗
██║   ██║██║   ██║█████╗  ██║  ██║█████╗  █████╗  ██████╔╝██║     ██║███████╗   ██║   ██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝
╚██╗ ██╔╝██║   ██║██╔══╝  ██║  ██║██╔══╝  ██╔══╝  ██╔═══╝ ██║     ██║╚════██║   ██║   ██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗
 ╚████╔╝ ╚██████╔╝███████╗██████╔╝███████╗███████╗██║     ███████╗██║███████║   ██║   ██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║
  ╚═══╝   ╚═════╝ ╚══════╝╚═════╝ ╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝╚══════╝   ╚═╝   ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝
`;
/* eslint-enable max-len */

const bannerContent = `/**\n * name: ${pkg.name}\n * version: v${pkg.version}
 * description: ${pkg.description}\n * author: ${pkg.author.name}\n * homepage: ${pkg.homepage}\n ${nameAscii}\n */`;

const removeAttributeFromNode =
  (attributeName: string) => (node: RootNode | TemplateChildNode) => {
    if (process.env.NODE_ENV !== 'production') return;

    if (node.type === 1 /*NodeTypes.ELEMENT*/) {
      for (let i = 0; i < node.props.length; i++) {
        const p = node.props[i];

        if (
          p &&
          p.type === 6 /*NodeTypes.ATTRIBUTE*/ &&
          p.name === attributeName
        ) {
          node.props.splice(i, 1);
          i--;
        }
      }
    }
  };

const commonConfig: UserConfigExport = {
  plugins: [
    vue({
      template: {
        compilerOptions: {
          nodeTransforms: [removeAttributeFromNode('data-testid')],
        },
      },
    }),
    vueJsx(),
    vitePluginImp(),
    banner(bannerContent),
    checker({
      vueTsc: true,
      eslint: {
        lintCommand: 'eslint "./src/**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}"',
      },
    }),
    commonjs(),
  ],
  build: {
    commonjsOptions: {
      include: [/.js$/],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new Url('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
  },
};

export default commonConfig;
