// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import checker from 'vite-plugin-checker';

// https://astro.build/config
export default defineConfig({
  site: 'https://ramigs.dev',
  trailingSlash: 'always',
  integrations: [vue()],
  vite: {
    plugins: [
      checker({
        enableBuild: false,
        typescript: true,
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint .',
        },
      }),
    ],
  },
});
