// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import vue from '@astrojs/vue';
import checker from 'vite-plugin-checker';

// https://astro.build/config
export default defineConfig({
  site: 'https://ramigs.dev',
  trailingSlash: 'always',
  integrations: [vue()],
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-ibm-plex-sans',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            weight: 400,
            style: 'normal',
            src: ['./src/assets/fonts/ibm-plex-sans/IBMPlexSans-Regular.woff2'],
          },
          {
            weight: 600,
            style: 'normal',
            src: [
              './src/assets/fonts/ibm-plex-sans/IBMPlexSans-SemiBold.woff2',
            ],
          },
          {
            weight: 700,
            style: 'normal',
            src: ['./src/assets/fonts/ibm-plex-sans/IBMPlexSans-Bold.woff2'],
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [
      checker({
        enableBuild: false,
        typescript: true,
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint .',
        },
        stylelint: {
          lintCommand: 'stylelint "**/*.{css,vue,astro}"',
        },
      }),
    ],
  },
});
